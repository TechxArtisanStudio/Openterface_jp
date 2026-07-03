import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getKeymodLandingSocialPosts,
  getSocialPostsForMedia,
  landingRankScore,
  recencyScore,
  socialPosts,
} from '../../src/lib/social-posts.ts';

describe('social-posts generated data', () => {
  it('includes rows from social-posts.csv across products', () => {
    assert.equal(socialPosts.length, 20);
    assert.ok(socialPosts.some((p) => p.product === 'keymod'));
    assert.ok(socialPosts.some((p) => p.product === 'minikvm'));
    assert.ok(socialPosts.some((p) => p.product === 'kvm-go'));
  });

  it('getKeymodLandingSocialPosts returns featured keymod placements ranked by score', () => {
    const landing = getKeymodLandingSocialPosts();
    assert.equal(landing.length, 6);
    assert.ok(landing.every((p) => p.featuredPlacements.includes('keymod')));
    assert.equal(landing[0].id, 'ig-nester-1');
    const maxLikes = Math.max(...landing.map((p) => p.likeCount ?? 0));
    const nowMs = Date.now();
    for (let i = 1; i < landing.length; i++) {
      const prev = landingRankScore(landing[i - 1], maxLikes, nowMs);
      const curr = landingRankScore(landing[i], maxLikes, nowMs);
      assert.ok(prev >= curr);
    }
    assert.ok(landing.every((p) => p.likeCount != null && p.commentCount != null));
    assert.ok(landing.every((p) => p.authorAvatar?.startsWith('/images/social-posts/avatars/')));
    assert.ok(landing.every((p) => !p.excerpt?.includes(' likes, ')));
  });

  it('recencyScore decays with age', () => {
    const now = Date.parse('2026-07-03');
    assert.ok(recencyScore('2026-07-01', now) > recencyScore('2026-01-01', now));
    assert.equal(recencyScore(undefined, now), 0.35);
  });

  it('getSocialPostsForMedia filters by product', () => {
    assert.equal(getSocialPostsForMedia('minikvm').length, 7);
    assert.equal(getSocialPostsForMedia('kvm-go').length, 5);
    assert.equal(getSocialPostsForMedia('keymod').length, 8);
  });
});
