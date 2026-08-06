import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getKeymodLandingUgcCards,
  getKeymodYouTubeReviewCards,
  getKeymodYouTubeShortCards,
  KEYMOD_YOUTUBE_REVIEW_LIMIT,
} from '../../src/lib/keymod-landing-media.ts';

describe('keymod landing YouTube reviews', () => {
  it('returns only keymod long-form videos', () => {
    const cards = getKeymodYouTubeReviewCards('en');
    assert.ok(cards.length <= KEYMOD_YOUTUBE_REVIEW_LIMIT);
    assert.ok(cards.every((c) => c.platform === 'youtube'));
    assert.ok(cards.every((c) => c.format === 'long'));
    assert.ok(cards.every((c) => c.externalUrl.includes('youtube.com')));
  });

  it('excludes short-format videos from reviews', () => {
    const reviews = getKeymodYouTubeReviewCards('en');
    const shorts = getKeymodYouTubeShortCards('en');
    const shortIds = new Set(shorts.map((c) => c.id));
    assert.ok(reviews.every((c) => !shortIds.has(c.id)));
  });

  it('maps review cards with thumbnail and author', () => {
    const cards = getKeymodYouTubeReviewCards('en');
    if (cards.length === 0) return;
    const [first] = cards;
    assert.ok(first.thumbnail.startsWith('http'));
    assert.ok(first.author.length > 0);
    assert.ok(first.title?.length);
  });
});

describe('keymod landing UGC merge', () => {
  it('includes YouTube Shorts in UGC but not in reviews', () => {
    const shorts = getKeymodYouTubeShortCards('en');
    const ugc = getKeymodLandingUgcCards('en');
    const reviews = getKeymodYouTubeReviewCards('en');

    for (const short of shorts) {
      assert.ok(
        ugc.some((c) => c.id === short.id),
        `expected short ${short.id} in UGC`,
      );
      assert.ok(
        !reviews.some((c) => c.id === short.id),
        `expected short ${short.id} not in reviews`,
      );
    }
  });

  it('sorts merged UGC newest-first by date', () => {
    const ugc = getKeymodLandingUgcCards('en');
    assert.ok(ugc.length > 0);
    const dated = ugc.filter((c) => c.date?.trim());
    for (let i = 1; i < dated.length; i++) {
      const prev = Date.parse(dated[i - 1].date);
      const curr = Date.parse(dated[i].date);
      assert.ok(prev >= curr, `expected ${dated[i - 1].date} >= ${dated[i].date}`);
    }
  });

  it('includes Instagram featured posts', () => {
    const ugc = getKeymodLandingUgcCards('en');
    assert.ok(ugc.some((c) => c.platform === 'instagram'));
  });
});
