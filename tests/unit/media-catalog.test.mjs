import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { getSocialPostsForMedia, socialPostToMediaCatalogEntry } from '../../src/lib/social-posts.ts';

describe('mediaCatalog social integration', () => {
  it('includes KeyMod posts from social-posts.csv', () => {
    const entries = getSocialPostsForMedia('keymod').map(socialPostToMediaCatalogEntry);
    assert.equal(entries.length, 8);
    assert.ok(entries.some((e) => e.id === 'ig-463n7-homelab'));
  });

  it('includes migrated Mini-KVM and KVM-GO legacy ids', () => {
    const ids = getSocialPostsForMedia().map((p) => p.id);
    assert.ok(ids.includes('post-bluesky-isa-freeman'));
    assert.ok(ids.includes('post-x-cnxsoft-kvmgo'));
    assert.equal(new Set(ids).size, ids.length);
  });
});
