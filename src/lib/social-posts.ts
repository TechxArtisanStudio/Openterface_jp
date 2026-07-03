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
  fetchStatus: 'ok' | 'manual' | 'failed' | 'pending' | string;
};

import { socialPosts, socialPostsGeneratedAt } from '../data/socialPosts.generated.ts';

export { socialPosts, socialPostsGeneratedAt };

function bySort(a: SocialPost, b: SocialPost): number {
  return a.sort - b.sort || a.id.localeCompare(b.id);
}

/** Posts flagged for a product landing strip (featured_placements contains slug). */
export function getSocialPostsForLanding(productSlug: string, limit?: number): SocialPost[] {
  const list = socialPosts
    .filter((p) => p.featuredPlacements.includes(productSlug))
    .sort(bySort);
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
  };
}

/** Card view for KeyMod landing community strip. */
export type KeymodCommunityCardView = ReturnType<typeof socialPostToKeymodCommunityCard>;

export function getKeymodCommunityCardsFromSocialPosts(): KeymodCommunityCardView[] {
  return getKeymodLandingSocialPosts().map(socialPostToKeymodCommunityCard);
}
