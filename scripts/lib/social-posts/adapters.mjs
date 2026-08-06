import { curlGetText, hasProxyEnv } from './curl-fetch.mjs';
import {
  parseInstagramOgDescription,
  usernameFromInstagramPostUrl,
} from './parse-instagram-og.mjs';

/** Instagram serves og:image to Meta/crawler UAs only. */
const IG_CRAWLER_UA = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';

export function parseFeaturedPlacements(value) {
  const raw = (value ?? '').trim();
  if (!raw || raw === 'media-only') return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export function parseSort(value) {
  const n = parseInt(String(value ?? '0'), 10);
  return Number.isNaN(n) ? 0 : n;
}

function firstMeta(html, property) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m?.[1]) return m[1].replace(/&amp;/g, '&');
  }
  return '';
}

async function fetchInstagramHtml(url) {
  if (hasProxyEnv()) {
    return curlGetText(url, IG_CRAWLER_UA);
  }
  const res = await fetch(url, {
    headers: { 'User-Agent': IG_CRAWLER_UA, Accept: 'text/html' },
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

export async function fetchInstagramMeta(url) {
  const html = await fetchInstagramHtml(url);
  const ogUrl = firstMeta(html, 'og:url');
  const ogDescription = firstMeta(html, 'og:description');
  const parsed = parseInstagramOgDescription(ogDescription);
  const username = parsed.username || usernameFromInstagramPostUrl(ogUrl);

  return {
    thumbnailUrl: firstMeta(html, 'og:image'),
    ogDescription,
    likeCount: parsed.likeCount,
    commentCount: parsed.commentCount,
    postedAt: parsed.postedAt,
    username,
    title: firstMeta(html, 'og:title'),
    excerpt: ogDescription,
    author: username ? `@${username}` : '',
  };
}

/** Profile page og:image is the user's avatar. */
export async function fetchInstagramProfileAvatar(username, cache) {
  const handle = username?.replace(/^@/, '').trim();
  if (!handle) return '';
  if (cache?.has(handle)) return cache.get(handle);

  const profileUrl = `https://www.instagram.com/${handle}/`;
  const html = await fetchInstagramHtml(profileUrl);
  const avatarUrl = firstMeta(html, 'og:image');
  cache?.set(handle, avatarUrl);
  return avatarUrl;
}

export async function fetchXMeta(url) {
  const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=true`;
  const res = await fetch(oembedUrl, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`oEmbed HTTP ${res.status}`);
  const data = await res.json();
  return {
    thumbnailUrl: '',
    title: data.author_name ? `Post by ${data.author_name}` : '',
    excerpt: data.html?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() ?? '',
    author: data.author_name ? `@${data.author_name}` : '',
  };
}

export async function fetchBlueskyMeta(url) {
  const res = await fetch(
    `https://embed.bsky.app/oembed?url=${encodeURIComponent(url)}`,
    { signal: AbortSignal.timeout(15000) },
  );
  if (!res.ok) throw new Error(`oEmbed HTTP ${res.status}`);
  const data = await res.json();
  return {
    thumbnailUrl: data.thumbnail_url ?? '',
    title: data.title ?? '',
    excerpt: data.title ?? '',
    author: data.author_name ?? '',
  };
}

export async function fetchSocialMeta(platform, url) {
  switch (platform) {
    case 'instagram':
      return fetchInstagramMeta(url);
    case 'x':
      return fetchXMeta(url);
    case 'bluesky':
      return fetchBlueskyMeta(url);
    default:
      throw new Error(`No adapter for platform: ${platform}`);
  }
}
