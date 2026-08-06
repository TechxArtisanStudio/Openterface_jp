/**
 * YouTube Data API v3 statistics fetch (views / likes / comments).
 * Requires process.env.YOUTUBE_API_KEY. Without a key, returns an empty Map.
 */

const API_URL = 'https://www.googleapis.com/youtube/v3/videos';
const BATCH_SIZE = 50;

/**
 * @typedef {{ views?: number, likeCount?: number, commentCount?: number }} YouTubeStats
 */

/**
 * @param {string[]} videoIds
 * @param {{ apiKey?: string, fetchImpl?: typeof fetch }} [opts]
 * @returns {Promise<Map<string, YouTubeStats>>}
 */
export async function fetchYouTubeStatistics(videoIds, opts = {}) {
  const apiKey = opts.apiKey ?? process.env.YOUTUBE_API_KEY ?? '';
  const fetchImpl = opts.fetchImpl ?? globalThis.fetch;
  const result = new Map();

  const ids = [...new Set(videoIds.filter(Boolean))];
  if (ids.length === 0) return result;

  if (!apiKey) {
    console.warn('⚠ YOUTUBE_API_KEY not set — skipping YouTube statistics enrich');
    return result;
  }

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const url = new URL(API_URL);
    url.searchParams.set('part', 'statistics');
    url.searchParams.set('id', batch.join(','));
    url.searchParams.set('key', apiKey);

    try {
      const res = await fetchImpl(url.toString(), { signal: AbortSignal.timeout(20000) });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.warn(`⚠ YouTube API HTTP ${res.status}: ${body.slice(0, 200)}`);
        continue;
      }
      const data = await res.json();
      for (const item of data.items ?? []) {
        const id = item.id;
        const s = item.statistics ?? {};
        const views = s.viewCount != null ? parseInt(s.viewCount, 10) : undefined;
        const likeCount = s.likeCount != null ? parseInt(s.likeCount, 10) : undefined;
        const commentCount = s.commentCount != null ? parseInt(s.commentCount, 10) : undefined;
        result.set(id, {
          ...(Number.isFinite(views) ? { views } : {}),
          ...(Number.isFinite(likeCount) ? { likeCount } : {}),
          ...(Number.isFinite(commentCount) ? { commentCount } : {}),
        });
      }
    } catch (err) {
      console.warn(`⚠ YouTube API fetch failed: ${err.message}`);
    }
  }

  return result;
}
