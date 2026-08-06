import { catalogVideos } from '../data/catalogVideos.ts';
import type { CatalogVideo } from './youtube.ts';
import {
  getKeymodCommunityCardsFromSocialPosts,
  type KeymodCommunityCardView,
} from './social-posts.ts';

export const KEYMOD_YOUTUBE_REVIEW_LIMIT = 6;

export function catalogVideoToKeymodCommunityCard(video: CatalogVideo): KeymodCommunityCardView {
  return {
    id: video.videoId || video.url,
    platform: 'youtube',
    format: video.format,
    externalUrl: video.url,
    thumbnail: video.thumbnail,
    author: video.author,
    title: video.title,
    excerpt: video.title,
    date: video.date || undefined,
    authorAvatar: video.channelAvatar || undefined,
    likeCount: video.likeCount,
    commentCount: video.commentCount,
    viewsFormatted: video.viewsFormatted,
  };
}

function parseDate(dateStr: string | undefined): number {
  if (!dateStr?.trim()) return 0;
  const t = Date.parse(dateStr.trim());
  return Number.isFinite(t) ? t : 0;
}

function sortKeymodVideos(candidates: CatalogVideo[], locale: string): CatalogVideo[] {
  const lang = locale.toLowerCase();
  return [...candidates].sort((a, b) => {
    const langMatch = (v: CatalogVideo) => (v.language?.toLowerCase() === lang ? 1 : 0);
    const keyA = [-langMatch(a), -(a.zIndex ?? 0), -(a.views ?? 0), -parseDate(a.date)] as const;
    const keyB = [-langMatch(b), -(b.zIndex ?? 0), -(b.views ?? 0), -parseDate(b.date)] as const;
    for (let i = 0; i < 4; i++) {
      if (keyA[i] !== keyB[i]) return keyA[i] - keyB[i];
    }
    return 0;
  });
}

/** KeyMod landing #youtube-reviews — long-form YouTube reviews from youtube.csv. */
export function getKeymodYouTubeReviewCards(
  locale = 'en',
  limit = KEYMOD_YOUTUBE_REVIEW_LIMIT,
): KeymodCommunityCardView[] {
  const candidates = catalogVideos.filter(
    (v) => v.product === 'keymod' && v.format === 'long',
  );
  return sortKeymodVideos(candidates, locale).slice(0, limit).map(catalogVideoToKeymodCommunityCard);
}

/** KeyMod YouTube Shorts from youtube.csv (product=keymod, format=short). */
export function getKeymodYouTubeShortCards(locale = 'en'): KeymodCommunityCardView[] {
  const candidates = catalogVideos.filter(
    (v) => v.product === 'keymod' && v.format === 'short',
  );
  return sortKeymodVideos(candidates, locale).map(catalogVideoToKeymodCommunityCard);
}

/**
 * KeyMod landing #social-proof — Instagram UGC + YouTube Shorts,
 * merged and sorted newest-first by date.
 */
export function getKeymodLandingUgcCards(locale = 'en'): KeymodCommunityCardView[] {
  const igCards = getKeymodCommunityCardsFromSocialPosts();
  const shortCards = getKeymodYouTubeShortCards(locale);
  const seen = new Set<string>();
  const merged: KeymodCommunityCardView[] = [];

  for (const card of [...igCards, ...shortCards]) {
    const key = card.externalUrl || card.id;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(card);
  }

  return merged.sort((a, b) => {
    const da = parseDate(a.date);
    const db = parseDate(b.date);
    if (da === 0 && db !== 0) return 1;
    if (db === 0 && da !== 0) return -1;
    return db - da;
  });
}
