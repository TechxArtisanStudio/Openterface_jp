#!/usr/bin/env node
/**
 * Sync social-posts.csv → (optional) download thumbnails → generate socialPosts.generated.ts
 * Self-contained for CI: does not require a sibling web-dev-tool checkout.
 * When Openterface_assets is absent, loads CDN CSV and regenerates TS only (no thumb/CSV write).
 */
import { mkdir, copyFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchInstagramProfileAvatar, fetchSocialMeta } from './lib/social-posts/adapters.mjs';
import {
  cdnUrlForId,
  downloadThumbnail,
  resolveThumbnail,
} from './lib/social-posts/download-thumb.mjs';
import { generateSocialPostsTs } from './lib/social-posts/generate-ts.mjs';
import { loadSocialPostsCsv } from './lib/social-posts/load-csv.mjs';
import { instagramPostedAtToIsoDate } from './lib/social-posts/parse-instagram-posted-at.mjs';
import { getSocialPostsPaths } from './lib/social-posts/paths.mjs';
import { writeSocialPostsCsv } from './lib/social-posts/write-csv.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

function defaultMarketingRepo() {
  try {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
    if (pkg.name) return pkg.name;
  } catch {
    /* ignore */
  }
  return basename(ROOT);
}

function parseArgs(argv) {
  const opts = {
    product: '',
    ids: [],
    refreshThumbs: false,
    marketingRepo: defaultMarketingRepo(),
    dryRun: false,
  };
  for (const arg of argv) {
    if (arg === '--refresh-thumbs') opts.refreshThumbs = true;
    else if (arg === '--dry-run') opts.dryRun = true;
    else if (arg.startsWith('--product=')) opts.product = arg.slice('--product='.length).trim();
    else if (arg.startsWith('--ids=')) {
      opts.ids = arg
        .slice('--ids='.length)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg.startsWith('--repo=')) {
      opts.marketingRepo = arg.slice('--repo='.length).trim();
    }
  }
  return opts;
}

function shouldProcessRow(row, opts) {
  if (opts.ids.length > 0 && !opts.ids.includes(row.id?.trim())) return false;
  if (opts.product && row.product?.trim() !== opts.product) return false;
  return true;
}

function isHttpUrl(value) {
  return /^https?:\/\//i.test(value ?? '');
}

function ensureHeader(headers, name) {
  if (!headers.includes(name)) headers.push(name);
}

async function enrichRow(row, ctx) {
  const id = row.id.trim();
  const platform = row.platform?.trim();
  const url = row.url?.trim();
  const override = row.thumbnail_override?.trim();
  const status = row.fetch_status?.trim() || 'pending';
  const now = new Date().toISOString();
  const canWriteAssets = Boolean(ctx.assetsAvailable);

  let thumbnailUrl = '';
  let fetchStatus = status;
  let title = row.title?.trim();
  let excerpt = row.excerpt?.trim();
  let author = row.author?.trim();

  const needsThumbFetch =
    canWriteAssets &&
    (ctx.refreshThumbs ||
      status === 'pending' ||
      (status === 'failed' && !row.thumbnail_cdn?.trim()));

  const needsIgMeta =
    canWriteAssets &&
    platform === 'instagram' &&
    (ctx.refreshThumbs ||
      status === 'pending' ||
      !row.like_count?.trim() ||
      !row.author_avatar_cdn?.trim() ||
      needsThumbFetch);

  const needsMeta = needsIgMeta || (needsThumbFetch && platform !== 'instagram');

  const hasManualOverride = Boolean(override) && status === 'manual' && !ctx.refreshThumbs;

  if (hasManualOverride) {
    fetchStatus = 'manual';
    row.fetch_date = row.fetch_date || now;
    row.thumbnail_cdn = row.thumbnail_cdn?.trim() || override;
    return { row, ok: true, note: 'manual override' };
  }

  // CI / no-assets path: keep CSV fields as-is and resolve thumbnails from CDN columns.
  if (!canWriteAssets) {
    const thumb = resolveThumbnail(row, ctx.thumbCdnBase);
    return { row, ok: Boolean(thumb), note: row.fetch_status?.trim() || 'cdn' };
  }

  let meta = null;
  if (needsMeta) {
    try {
      meta = await fetchSocialMeta(platform, url);
      if (!title && meta.title && platform !== 'instagram') title = meta.title;
      if (!excerpt && meta.excerpt && platform !== 'instagram') excerpt = meta.excerpt;
      if (!author && meta.author) author = meta.author;
      if (meta.thumbnailUrl) thumbnailUrl = meta.thumbnailUrl;
      fetchStatus = thumbnailUrl || override || row.thumbnail_cdn?.trim() ? 'ok' : 'failed';

      if (platform === 'instagram') {
        if (meta.likeCount != null) row.like_count = String(meta.likeCount);
        if (meta.commentCount != null) row.comment_count = String(meta.commentCount);
        if (meta.username && !author) author = `@${meta.username}`;
        if (!row.date?.trim() && meta.postedAt) {
          const isoDate = instagramPostedAtToIsoDate(meta.postedAt);
          if (isoDate) row.date = isoDate;
        }

        const needsAvatar = ctx.refreshThumbs || !row.author_avatar_cdn?.trim();
        if (needsAvatar && meta.username) {
          try {
            const avatarSource = await fetchInstagramProfileAvatar(meta.username, ctx.avatarCache);
            if (avatarSource && isHttpUrl(avatarSource)) {
              await mkdir(ctx.avatarsDir, { recursive: true });
              const savedPath = await downloadThumbnail(avatarSource, `${ctx.avatarsDir}/${id}`);
              const ext = extname(savedPath) || '.jpg';
              await mkdir(ctx.marketingAvatarsPublicDir, { recursive: true });
              const publicPath = `${ctx.marketingAvatarsPublicDir}/${id}${ext}`;
              await copyFile(savedPath, publicPath);
              row.author_avatar_cdn = `/images/social-posts/avatars/${id}${ext}`;
            }
          } catch (err) {
            console.warn(`  ⚠ avatar ${id}: ${err.message}`);
          }
        }
      }
    } catch (err) {
      console.warn(`  ⚠ fetch meta ${id}: ${err.message}`);
      fetchStatus = override || row.thumbnail_cdn?.trim() ? 'manual' : 'failed';
    }
  }

  if (!thumbnailUrl && override) {
    if (isHttpUrl(override)) thumbnailUrl = override;
    else {
      row.thumbnail_cdn = override;
      row.fetch_status = 'manual';
      row.fetch_date = now;
      if (title) row.title = title;
      if (excerpt) row.excerpt = excerpt;
      if (author) row.author = author;
      return { row, ok: true, note: 'site-relative override' };
    }
  }

  if (thumbnailUrl && isHttpUrl(thumbnailUrl) && (needsThumbFetch || ctx.refreshThumbs)) {
    try {
      await mkdir(ctx.thumbsDir, { recursive: true });
      const destBase = `${ctx.thumbsDir}/${id}`;
      const savedPath = await downloadThumbnail(thumbnailUrl, destBase);
      const ext = extname(savedPath) || '.webp';
      row.thumbnail_cdn = cdnUrlForId(ctx.thumbCdnBase, id, ext);
      fetchStatus = 'ok';
      if (override && !isHttpUrl(override)) row.thumbnail_override = '';
    } catch (err) {
      console.warn(`  ⚠ download thumb ${id}: ${err.message}`);
      row.thumbnail_cdn = thumbnailUrl;
      fetchStatus = 'ok';
    }
  } else if (row.thumbnail_cdn?.trim()) {
    fetchStatus = fetchStatus === 'pending' ? 'manual' : fetchStatus;
  }

  if (title) row.title = title;
  if (excerpt) row.excerpt = excerpt;
  if (author) row.author = author;
  row.fetch_status = fetchStatus;
  row.fetch_date = now;
  if (!row.thumbnail_cdn?.trim() && override) row.thumbnail_cdn = override;

  const thumb = resolveThumbnail(row, ctx.thumbCdnBase);
  return { row, ok: Boolean(thumb), note: fetchStatus };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const paths = getSocialPostsPaths({
    marketingRoot: ROOT,
    marketingRepo: opts.marketingRepo,
  });

  if (!paths.assetsAvailable) {
    console.log('ℹ Openterface_assets not found — using CDN CSV (CI / standalone mode)');
  }

  const { headers, rows } = await loadSocialPostsCsv(paths.csvPath, paths.csvCdnUrl);

  for (const col of ['like_count', 'comment_count', 'author_avatar_cdn']) {
    ensureHeader(headers, col);
  }

  const ctx = {
    ...paths,
    refreshThumbs: opts.refreshThumbs,
    avatarCache: new Map(),
  };

  const stats = { ok: 0, failed: 0, skipped: 0, manual: 0 };

  for (const row of rows) {
    if (!shouldProcessRow(row, opts)) {
      stats.skipped++;
      continue;
    }

    const result = await enrichRow(row, ctx);
    if (result.note === 'manual override' || result.note === 'site-relative override') stats.manual++;
    else if (result.ok) stats.ok++;
    else stats.failed++;

    const thumb = resolveThumbnail(result.row, paths.thumbCdnBase);
    const likes = result.row.like_count ? ` ♥${result.row.like_count}` : '';
    const mark = thumb ? '✓' : '✗';
    console.log(`  ${mark} ${result.row.id} [${result.row.fetch_status}]${likes} ${basename(result.row.url)}`);
  }

  if (!opts.dryRun) {
    if (paths.assetsAvailable) {
      await writeSocialPostsCsv(paths.csvPath, headers, rows);
    } else {
      console.warn(`⚠ Skipping CSV write — assets repo not found at ${paths.assetsRoot}`);
    }
    await generateSocialPostsTs(paths.generatedTsPath, rows, paths.thumbCdnBase);
  } else {
    console.log('Dry run — CSV and TS not written');
    await generateSocialPostsTs('/tmp/socialPosts.generated.ts', rows, paths.thumbCdnBase);
  }

  console.log(
    `\nSummary: ok=${stats.ok} manual=${stats.manual} failed=${stats.failed} skipped=${stats.skipped}`,
  );
  // In CDN-only mode, missing thumbs in CSV should not fail the build.
  if (stats.failed > 0 && paths.assetsAvailable) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
