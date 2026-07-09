/** Types and helpers for YouTube CSV data (used by sync script via duplicated logic in .mjs). */

export type YouTubeCsvRow = {
  youtube_url: string;
  title: string;
  author_name: string;
  thumbnail_url: string;
  video_thumbnail_url: string;
  date: string;
  views: string;
  z_index: string;
  language: string;
  product: string;
};

export type HomeVideo = {
  url: string;
  title: string;
  author: string;
  channelAvatar: string;
  thumbnail: string;
  date: string;
  views: number;
  viewsFormatted: string;
};

export type MediaFormat = 'long' | 'short' | 'post' | 'coverage';

export type MediaApp = 'kvm' | 'keycmd';

export type SocialPlatform =
  | 'x'
  | 'threads'
  | 'instagram'
  | 'bluesky'
  | 'reddit'
  | 'blog'
  | 'linkedin'
  | 'github'
  | 'other';

export type MediaCoverageEntry = {
  id: string;
  outlet: string;
  outletUrl: string;
  logoUrl?: string;
  author: string;
  quote: string;
  articleUrl: string;
  date?: string;
  product?: string;
  language?: string;
};

export type CatalogVideo = HomeVideo & {
  videoId: string;
  language: string;
  product: string;
  zIndex: number;
  /** YouTube long-form vs Shorts; defaults to `long` when omitted in legacy data. */
  format: 'long' | 'short';
  app?: MediaApp;
};

export type MediaPostEntry = {
  id: string;
  format: 'post';
  title: string;
  excerpt: string;
  author: string;
  platform?: SocialPlatform;
  externalUrl?: string;
  date: string;
  product?: string;
  language?: string;
  app?: MediaApp;
  /** Card preview image (prefer assets.openterface.com CDN). */
  thumbnail?: string;
  /** Optional author avatar shown in the meta row. */
  channelAvatar?: string;
  /** Sample placeholder until real social posts are curated. */
  sample?: boolean;
};

/** Unified catalog row for /videos/ Media hub (YouTube + link-out posts). */
export type MediaCatalogEntry = {
  id: string;
  format: MediaFormat;
  title: string;
  author: string;
  date: string;
  product?: string;
  language?: string;
  app?: MediaApp;
  url?: string;
  videoId?: string;
  thumbnail?: string;
  channelAvatar?: string;
  views?: number;
  viewsFormatted?: string;
  zIndex?: number;
  excerpt?: string;
  platform?: SocialPlatform;
  externalUrl?: string;
  sample?: boolean;
  outlet?: string;
  outletUrl?: string;
  logoUrl?: string;
  quote?: string;
};

/** Stable product slugs from youtube.csv → display labels in filter UI. */
export const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  minikvm: 'Mini-KVM',
  'kvm-go': 'KVM-GO',
  'uconsole-kvm-extension': 'uConsole KVM Extension',
  keymod: 'KeyMod Series',
};

export const KNOWN_PRODUCTS = ['minikvm', 'kvm-go', 'uconsole-kvm-extension', 'keymod'] as const;

export const KNOWN_APPS: MediaApp[] = ['kvm', 'keycmd'];

export const APP_DISPLAY_NAMES: Record<MediaApp, string> = {
  kvm: 'Openterface KVM',
  keycmd: 'KeyCmd',
};

export function inferVideoFormat(url: string): 'long' | 'short' {
  const u = url.toLowerCase();
  if (u.includes('/shorts/') || u.includes('youtube.com/shorts')) return 'short';
  return 'long';
}

export function catalogVideoToMediaEntry(video: CatalogVideo): MediaCatalogEntry {
  return {
    id: video.videoId || video.url,
    format: video.format ?? 'long',
    title: video.title,
    author: video.author,
    date: video.date,
    product: video.product || undefined,
    language: video.language || undefined,
    app: video.app,
    url: video.url,
    videoId: video.videoId,
    thumbnail: video.thumbnail,
    channelAvatar: video.channelAvatar,
    views: video.views,
    viewsFormatted: video.viewsFormatted,
    zIndex: video.zIndex,
  };
}

export function mediaPostToCatalogEntry(post: MediaPostEntry): MediaCatalogEntry {
  return {
    id: post.id,
    format: post.format,
    title: post.title,
    author: post.author,
    date: post.date,
    product: post.product,
    language: post.language,
    app: post.app,
    excerpt: post.excerpt,
    platform: post.platform,
    externalUrl: post.externalUrl,
    thumbnail: post.thumbnail,
    channelAvatar: post.channelAvatar,
    sample: post.sample,
  };
}

export function mediaCoverageToCatalogEntry(entry: MediaCoverageEntry): MediaCatalogEntry {
  return {
    id: entry.id,
    format: 'coverage',
    title: entry.outlet,
    author: entry.author,
    date: entry.date ?? '',
    product: entry.product,
    language: entry.language,
    excerpt: entry.quote,
    quote: entry.quote,
    externalUrl: entry.articleUrl,
    outlet: entry.outlet,
    outletUrl: entry.outletUrl,
    logoUrl: entry.logoUrl,
  };
}

export const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  en: 'English',
  zh: 'Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  fr: 'French',
  de: 'German',
  it: 'Italian',
  es: 'Spanish',
  pt: 'Portuguese',
  ro: 'Romanian',
  nl: 'Dutch',
  no: 'Norwegian',
};

export const PLATFORM_DISPLAY_NAMES: Record<SocialPlatform, string> = {
  x: 'X',
  threads: 'Threads',
  instagram: 'Instagram',
  bluesky: 'Bluesky',
  reddit: 'Reddit',
  blog: 'Blog',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  other: 'Web',
};

export function languageDisplayName(code: string): string {
  const c = code?.trim().toLowerCase();
  if (!c) return '';
  return LANGUAGE_DISPLAY_NAMES[c] ?? c.toUpperCase();
}

export function productDisplayName(slug: string): string {
  const s = slug?.trim();
  if (!s) return '';
  return PRODUCT_DISPLAY_NAMES[s] ?? s;
}

export function extractVideoId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return '';
}

export function formatViews(views: string): string {
  if (!views?.trim()) return '0';
  const n = parseInt(views, 10);
  if (Number.isNaN(n)) return '0';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function parseDateForSort(dateStr: string): number {
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

export function rowToHomeVideo(row: YouTubeCsvRow): HomeVideo {
  const url = row.youtube_url?.trim() ?? '';
  const videoId = extractVideoId(url);
  let thumbnail = row.video_thumbnail_url?.trim() ?? '';
  if (!thumbnail && videoId) {
    thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

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

export function sortVideos(rows: YouTubeCsvRow[], targetLanguage?: string): YouTubeCsvRow[] {
  const lang = targetLanguage?.toLowerCase();

  return [...rows].sort((a, b) => {
    const langMatch = (row: YouTubeCsvRow) =>
      lang && row.language?.trim().toLowerCase() === lang ? 1 : 0;

    const zIndex = (row: YouTubeCsvRow) => {
      const z = parseInt(row.z_index?.trim() ?? '0', 10);
      return Number.isNaN(z) ? 0 : z;
    };

    const views = (row: YouTubeCsvRow) => {
      const v = parseInt(row.views?.trim() ?? '0', 10);
      return Number.isNaN(v) ? 0 : v;
    };

    const date = (row: YouTubeCsvRow) => parseDateForSort(row.date ?? '');

    const keyA = [-langMatch(a), -zIndex(a), -views(a), -date(a)] as const;
    const keyB = [-langMatch(b), -zIndex(b), -views(b), -date(b)] as const;

    for (let i = 0; i < 4; i++) {
      if (keyA[i] !== keyB[i]) return keyA[i] - keyB[i];
    }
    return 0;
  });
}

export function rowToCatalogVideo(row: YouTubeCsvRow): CatalogVideo {
  const base = rowToHomeVideo(row);
  const url = row.youtube_url?.trim() ?? '';
  const zRaw = parseInt(row.z_index?.trim() ?? '0', 10);
  return {
    ...base,
    videoId: extractVideoId(url),
    language: row.language?.trim().toLowerCase() ?? '',
    product: row.product?.trim() ?? '',
    zIndex: Number.isNaN(zRaw) ? 0 : zRaw,
    format: inferVideoFormat(url),
  };
}

export function pickHomeVideos(rows: YouTubeCsvRow[], locale: string, limit = 10): HomeVideo[] {
  const sorted = sortVideos(rows, locale);
  return sorted.slice(0, limit).map(rowToHomeVideo);
}

export function pickCatalogVideos(rows: YouTubeCsvRow[], locale: string): CatalogVideo[] {
  return sortVideos(rows, locale).map(rowToCatalogVideo);
}

/** Parse CSV text with quoted fields (RFC-style). */
export function parseCsv(text: string): YouTubeCsvRow[] {
  const lines: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || (c === '\r' && next === '\n')) {
      row.push(field);
      if (row.some((cell) => cell.length > 0)) lines.push(row);
      row = [];
      field = '';
      if (c === '\r') i++;
    } else if (c !== '\r') {
      field += c;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((cell) => cell.length > 0)) lines.push(row);
  }

  if (lines.length < 2) return [];

  const headers = lines[0].map((h) => h.trim());
  return lines.slice(1).map((cells) => {
    const record: Record<string, string> = {};
    headers.forEach((h, idx) => {
      record[h] = cells[idx] ?? '';
    });
    return record as YouTubeCsvRow;
  });
}
