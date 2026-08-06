#!/usr/bin/env node
/**
 * Fetch youtube.csv and generate src/data/homeVideos.ts + catalogVideos.ts.
 * Optionally enriches views/likes/comments via YouTube Data API (YOUTUBE_API_KEY).
 */
import { access, readFile, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchYouTubeStatistics } from './lib/youtube/fetch-statistics.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT = join(ROOT, 'src/data/homeVideos.ts');
const CATALOG_OUT = join(ROOT, 'src/data/catalogVideos.ts');

function resolveLocale() {
  if (process.env.SITE_LOCALE) return process.env.SITE_LOCALE;
  try {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
    if (pkg.siteLocale) return pkg.siteLocale;
  } catch {
    /* ignore */
  }
  return 'en';
}

const LOCALE = resolveLocale();
const LIMIT = 10;

const CSV_URL = 'https://assets.openterface.com/data/youtube.csv';
const LOCAL_FALLBACKS = [
  join(ROOT, '../../Openterface_assets/src/data/youtube.csv'),
  join(ROOT, '../../../Openterface_assets/src/data/youtube.csv'),
];

function extractVideoId(url) {
  for (const pattern of [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ]) {
    const m = url.match(pattern);
    if (m) return m[1];
  }
  return '';
}

function formatViews(views) {
  if (!views?.trim()) return '0';
  const n = parseInt(views, 10);
  if (Number.isNaN(n)) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function parseDateForSort(dateStr) {
  if (!dateStr?.trim()) return 0;
  const s = dateStr.trim().split(/\s/)[0];
  if (s.includes('-')) {
    const t = Date.parse(s);
    return Number.isNaN(t) ? 0 : t;
  }
  if (s.includes('/')) {
    const [y, m, d] = s.split('/').map(Number);
    if (y && m && d) return new Date(y, m - 1, d).getTime();
  }
  return 0;
}

function parseCsv(text) {
  const lines = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') inQuotes = false;
      else field += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || (c === '\r' && next === '\n')) {
      row.push(field);
      if (row.some((cell) => cell.length > 0)) lines.push(row);
      row = [];
      field = '';
      if (c === '\r') i++;
    } else if (c !== '\r') field += c;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.length > 0)) lines.push(row);
  }
  if (lines.length < 2) return { headers: [], rows: [] };
  const headers = lines[0].map((h) => h.trim());
  const rows = lines.slice(1).map((cells) => {
    const record = {};
    headers.forEach((h, idx) => {
      record[h] = cells[idx] ?? '';
    });
    return record;
  });
  return { headers, rows };
}

function ensureHeader(headers, name) {
  if (!headers.includes(name)) headers.push(name);
}

function escapeCsvField(value) {
  const s = value == null ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function serializeCsv(headers, rows) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((h) => escapeCsvField(row[h] ?? '')).join(','));
  }
  return `${lines.join('\n')}\n`;
}

function sortVideos(rows, targetLanguage) {
  const lang = targetLanguage?.toLowerCase();
  return [...rows].sort((a, b) => {
    const langMatch = (r) => (lang && r.language?.trim().toLowerCase() === lang ? 1 : 0);
    const zIndex = (r) => {
      const z = parseInt(r.z_index?.trim() ?? '0', 10);
      return Number.isNaN(z) ? 0 : z;
    };
    const views = (r) => {
      const v = parseInt(r.views?.trim() ?? '0', 10);
      return Number.isNaN(v) ? 0 : v;
    };
    const date = (r) => parseDateForSort(r.date ?? '');
    const keyA = [-langMatch(a), -zIndex(a), -views(a), -date(a)];
    const keyB = [-langMatch(b), -zIndex(b), -views(b), -date(b)];
    for (let i = 0; i < 4; i++) {
      if (keyA[i] !== keyB[i]) return keyA[i] - keyB[i];
    }
    return 0;
  });
}

function rowToHomeVideo(row) {
  const url = row.youtube_url?.trim() ?? '';
  const videoId = extractVideoId(url);
  let thumbnail = row.video_thumbnail_url?.trim() ?? '';
  if (!thumbnail && videoId) thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const viewsRaw = row.views?.trim() ?? '0';
  const views = parseInt(viewsRaw, 10) || 0;
  return {
    url,
    title: row.title?.trim() ?? 'Untitled',
    author: row.author_name?.trim() || 'Unknown',
    channelAvatar: row.thumbnail_url?.trim() ?? '',
    thumbnail,
    date: row.date?.trim().split(/\s/)[0] ?? '',
    views,
    viewsFormatted: formatViews(viewsRaw),
  };
}

function resolveVideoFormat(url, explicit) {
  const f = explicit?.trim().toLowerCase();
  if (f === 'short' || f === 'long') return f;
  const lower = url.toLowerCase();
  if (lower.includes('/shorts/') || lower.includes('youtube.com/shorts')) return 'short';
  return 'long';
}

function rowToCatalogVideo(row) {
  const base = rowToHomeVideo(row);
  const url = row.youtube_url?.trim() ?? '';
  const zRaw = parseInt(row.z_index?.trim() ?? '0', 10);
  const likeRaw = parseInt(row.like_count?.trim() ?? '', 10);
  const commentRaw = parseInt(row.comment_count?.trim() ?? '', 10);
  return {
    ...base,
    videoId: extractVideoId(url),
    language: row.language?.trim().toLowerCase() ?? '',
    product: row.product?.trim() ?? '',
    zIndex: Number.isNaN(zRaw) ? 0 : zRaw,
    format: resolveVideoFormat(url, row.format),
    ...(Number.isFinite(likeRaw) ? { likeCount: likeRaw } : {}),
    ...(Number.isFinite(commentRaw) ? { commentCount: commentRaw } : {}),
  };
}

async function loadCsv() {
  for (const path of LOCAL_FALLBACKS) {
    try {
      const text = await readFile(path, 'utf8');
      console.log(`✓ Using local CSV: ${path}`);
      return { text, path };
    } catch {
      /* try next */
    }
  }

  try {
    const res = await fetch(CSV_URL, { signal: AbortSignal.timeout(15000) });
    if (res.ok) {
      console.log(`✓ Fetched ${CSV_URL}`);
      return { text: await res.text(), path: null };
    }
    console.warn(`⚠ HTTP ${res.status} from CDN`);
  } catch (err) {
    console.warn(`⚠ Fetch failed (${err.message})`);
  }

  throw new Error('Could not load youtube.csv from local fallback or CDN');
}

function applyStatistics(rows, statsById) {
  let updated = 0;
  for (const row of rows) {
    const id = extractVideoId(row.youtube_url?.trim() ?? '');
    if (!id) continue;
    const stats = statsById.get(id);
    if (!stats) continue;
    if (stats.views != null) row.views = String(stats.views);
    if (stats.likeCount != null) row.like_count = String(stats.likeCount);
    if (stats.commentCount != null) row.comment_count = String(stats.commentCount);
    updated++;
  }
  return updated;
}

async function main() {
  const { text: csvText, path: localCsvPath } = await loadCsv();
  const { headers, rows } = parseCsv(csvText);
  ensureHeader(headers, 'like_count');
  ensureHeader(headers, 'comment_count');
  ensureHeader(headers, 'format');

  const videoIds = rows.map((r) => extractVideoId(r.youtube_url?.trim() ?? '')).filter(Boolean);
  const statsById = await fetchYouTubeStatistics(videoIds);
  if (statsById.size > 0) {
    const n = applyStatistics(rows, statsById);
    console.log(`✓ Enriched ${n} rows with YouTube statistics`);
  }

  if (localCsvPath) {
    try {
      await access(dirname(localCsvPath));
      await writeFile(localCsvPath, serializeCsv(headers, rows), 'utf8');
      console.log(`✓ Wrote enriched CSV: ${localCsvPath}`);
    } catch (err) {
      console.warn(`⚠ Skipping CSV write (${err.message})`);
    }
  }

  const sorted = sortVideos(rows, LOCALE);
  const videos = sorted.slice(0, LIMIT).map(rowToHomeVideo);
  const duplicated = [...videos, ...videos];
  const catalog = sorted.map(rowToCatalogVideo);

  const ts = `// AUTO-GENERATED by scripts/sync-home-videos.mjs — do not edit manually
// locale: ${LOCALE} | generated: ${new Date().toISOString()}

import type { HomeVideo } from '../lib/youtube';

export const homeVideosLocale = '${LOCALE}' as const;

/** Top ${LIMIT} videos for homepage strip (duplicated for seamless scroll). */
export const homeVideos: HomeVideo[] = ${JSON.stringify(duplicated, null, 2)} as HomeVideo[];
`;

  const catalogTs = `// AUTO-GENERATED by scripts/sync-home-videos.mjs — do not edit manually
// locale: ${LOCALE} | generated: ${new Date().toISOString()}

import type { CatalogVideo } from '../lib/youtube';

export const catalogVideosLocale = '${LOCALE}' as const;

/** Full YouTube catalog (${catalog.length} videos), locale-prioritized at build time. */
export const catalogVideos: CatalogVideo[] = ${JSON.stringify(catalog, null, 2)} as CatalogVideo[];
`;

  await writeFile(OUT, ts, 'utf8');
  await writeFile(CATALOG_OUT, catalogTs, 'utf8');
  console.log(`✓ Wrote ${OUT} (${videos.length} videos × 2 for loop, locale=${LOCALE})`);
  console.log(`✓ Wrote ${CATALOG_OUT} (${catalog.length} videos, locale=${LOCALE})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
