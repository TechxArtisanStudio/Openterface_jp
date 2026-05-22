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

export function pickHomeVideos(rows: YouTubeCsvRow[], locale: string, limit = 10): HomeVideo[] {
  const sorted = sortVideos(rows, locale);
  return sorted.slice(0, limit).map(rowToHomeVideo);
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
