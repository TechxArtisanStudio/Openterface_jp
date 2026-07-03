import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  getKeymodLandingSocialPosts,
  getSocialPostsForMedia,
  socialPosts,
} from '../../src/lib/social-posts.ts';

describe('social-posts generated data', () => {
  it('includes rows from social-posts.csv across products', () => {
    assert.equal(socialPosts.length, 20);
    assert.ok(socialPosts.some((p) => p.product === 'keymod'));
    assert.ok(socialPosts.some((p) => p.product === 'minikvm'));
    assert.ok(socialPosts.some((p) => p.product === 'kvm-go'));
  });

  it('getKeymodLandingSocialPosts returns featured keymod placements sorted', () => {
    const landing = getKeymodLandingSocialPosts();
    assert.equal(landing.length, 6);
    assert.ok(landing.every((p) => p.featuredPlacements.includes('keymod')));
    assert.equal(landing[0].id, 'ig-463n7-homelab');
    assert.ok(landing.every((p) => p.likeCount != null && p.commentCount != null));
    assert.ok(landing.every((p) => p.authorAvatar?.startsWith('/images/social-posts/avatars/')));
    assert.ok(landing.every((p) => !p.excerpt?.includes(' likes, ')));
  });

  it('getSocialPostsForMedia filters by product', () => {
    assert.equal(getSocialPostsForMedia('minikvm').length, 7);
    assert.equal(getSocialPostsForMedia('kvm-go').length, 5);
    assert.equal(getSocialPostsForMedia('keymod').length, 8);
  });
});
