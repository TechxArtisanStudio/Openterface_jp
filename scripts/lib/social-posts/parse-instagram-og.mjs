/** Decode common HTML entities in Instagram og strings. */
export function decodeHtmlEntities(text) {
  return (text ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#064;/g, '@')
    .replace(/&#x2014;/g, '—')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

/** "{N} likes, {M} comments - {user} on {date}: \"{caption}\"" */
const IG_OG_RE = /^(\d+)\s+likes,\s+(\d+)\s+comments\s+-\s+(\S+)\s+on\s+([^:]+):/i;

export function parseInstagramOgDescription(raw) {
  if (!raw?.trim()) return {};
  const text = decodeHtmlEntities(raw.replace(/\s+/g, ' ').trim());
  const m = text.match(IG_OG_RE);
  if (!m) return {};
  return {
    likeCount: parseInt(m[1], 10),
    commentCount: parseInt(m[2], 10),
    username: m[3],
    postedAt: m[4].trim(),
  };
}

/** Extract username from post og:url, e.g. /463n7/p/SHORTCODE/ */
export function usernameFromInstagramPostUrl(ogUrl) {
  const m = ogUrl?.match(/instagram\.com\/([^/]+)\/(?:p|reel)\//i);
  if (!m) return '';
  const user = m[1];
  if (user === 'p' || user === 'reel' || user === 'tv') return '';
  return user;
}
