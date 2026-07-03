import type { MediaCatalogEntry, MediaPostEntry, SocialPlatform } from './youtube';

/** Curated social post — generated from social-posts.csv via sync-social-posts.mjs */
export type SocialPost = {
  id: string;
  externalUrl: string;
  platform: SocialPlatform;
  format: 'post' | 'reel';
  product: string;
  author: string;
  title: string;
  excerpt?: string;
  scenarioTag?: string;
  language?: string;
  date?: string;
  /** Parsed from CSV featured_placements (e.g. keymod, minikvm). */
  featuredPlacements: string[];
  sort: number;
  zIndex: number;
  thumbnail: string;
  likeCount?: number;
  commentCount?: number;
  authorAvatar?: string;
  fetchStatus: 'ok' | 'manual' | 'failed' | 'pending' | string;
};

import { socialPosts, socialPostsGeneratedAt } from '../data/socialPosts.generated.ts';

export { socialPosts, socialPostsGeneratedAt };

const RECENCY_HALF_LIFE_DAYS = 90;
const MISSING_DATE_RECENCY = 0.35;
const LANDING_RECENCY_WEIGHT = 0.5;
const LANDING_LIKES_WEIGHT = 0.5;

function bySort(a: SocialPost, b: SocialPost): number {
  return a.sort - b.sort || a.id.localeCompare(b.id);
}

/** 0–1 recency score; exponential decay by post age. */
export function recencyScore(isoDate: string | undefined, nowMs: number): number {
  if (!isoDate) return MISSING_DATE_RECENCY;
  const ageDays = (nowMs - Date.parse(isoDate)) / 86_400_000;
  if (!Number.isFinite(ageDays) || ageDays < 0) return MISSING_DATE_RECENCY;
  return Math.exp(-ageDays / RECENCY_HALF_LIFE_DAYS);
}

/** Landing strip rank: 50% recency + 50% normalized likes within candidate set. */
export function landingRankScore(
  post: SocialPost,
  maxLikes: number,
  nowMs: number,
): number {
  const likesNorm = maxLikes > 0 ? (post.likeCount ?? 0) / maxLikes : 0;
  return LANDING_RECENCY_WEIGHT * recencyScore(post.date, nowMs) + LANDING_LIKES_WEIGHT * likesNorm;
}

function byLandingRank(a: SocialPost, b: SocialPost, maxLikes: number, nowMs: number): number {
  const scoreDiff = landingRankScore(b, maxLikes, nowMs) - landingRankScore(a, maxLikes, nowMs);
  if (scoreDiff !== 0) return scoreDiff;
  return bySort(a, b);
}

/** Posts flagged for a product landing strip (featured_placements contains slug). */
export function getSocialPostsForLanding(productSlug: string, limit?: number): SocialPost[] {
  const candidates = socialPosts.filter((p) => p.featuredPlacements.includes(productSlug));
  const maxLikes = Math.max(0, ...candidates.map((p) => p.likeCount ?? 0));
  const nowMs = Date.now();
  const list = [...candidates].sort((a, b) => byLandingRank(a, b, maxLikes, nowMs));
  return limit != null && limit > 0 ? list.slice(0, limit) : list;
}

/** KeyMod landing #social-proof — convenience alias. */
export function getKeymodLandingSocialPosts(limit?: number): SocialPost[] {
  return getSocialPostsForLanding('keymod', limit);
}

/** Media hub rows for one product (or all when productSlug omitted). */
export function getSocialPostsForMedia(productSlug?: string): SocialPost[] {
  const list = productSlug
    ? socialPosts.filter((p) => p.product === productSlug)
    : [...socialPosts];
  return list.sort((a, b) => b.zIndex - a.zIndex || bySort(a, b));
}

export function socialPostToMediaPostEntry(post: SocialPost): MediaPostEntry {
  return {
    id: post.id,
    format: 'post',
    title: post.title,
    excerpt: post.excerpt ?? post.title,
    author: post.author,
    platform: post.platform,
    externalUrl: post.externalUrl,
    thumbnail: post.thumbnail,
    date: post.date ?? '',
    product: post.product,
    language: post.language,
  };
}

export function socialPostToMediaCatalogEntry(post: SocialPost): MediaCatalogEntry {
  const entry = socialPostToMediaPostEntry(post);
  return {
    id: entry.id,
    format: 'post',
    title: entry.title,
    author: entry.author,
    date: entry.date,
    product: entry.product,
    language: entry.language,
    excerpt: entry.excerpt,
    platform: entry.platform,
    externalUrl: entry.externalUrl,
    thumbnail: entry.thumbnail,
    zIndex: post.zIndex,
  };
}

/** Map generated post → KeyMod community card shape (P2 UI consumer). */
export function socialPostToKeymodCommunityCard(post: SocialPost) {
  return {
    id: post.id,
    platform: post.platform,
    format: post.format,
    externalUrl: post.externalUrl,
    thumbnail: post.thumbnail,
    author: post.author,
    excerpt: post.excerpt,
    scenarioTag: post.scenarioTag,
    title: post.title,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    authorAvatar: post.authorAvatar,
  };
}

function authorInitial(author: string): string {
  const handle = author.replace(/^@/, '').trim();
  return (handle[0] ?? '?').toUpperCase();
}

export function getAuthorInitialForCard(author: string): string {
  return authorInitial(author);
}

/** Card view for KeyMod landing community strip. */
export type KeymodCommunityCardView = ReturnType<typeof socialPostToKeymodCommunityCard>;

export function getKeymodCommunityCardsFromSocialPosts(): KeymodCommunityCardView[] {
  return getKeymodLandingSocialPosts().map(socialPostToKeymodCommunityCard);
}
