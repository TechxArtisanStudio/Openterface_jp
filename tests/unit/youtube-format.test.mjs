import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { inferVideoFormat, resolveVideoFormat, rowToCatalogVideo } from '../../src/lib/youtube.ts';

function baseRow(overrides = {}) {
  return {
    youtube_url: 'https://www.youtube.com/watch?v=nl24-rPjOr8',
    title: 'Beta Testing The Openterface Keymod',
    author_name: 'Valleytech',
    thumbnail_url: '',
    video_thumbnail_url: 'https://i.ytimg.com/vi/nl24-rPjOr8/hqdefault.jpg',
    date: '2026-06-05',
    views: '100',
    z_index: '38',
    language: 'en',
    product: 'keymod',
    ...overrides,
  };
}

describe('resolveVideoFormat', () => {
  it('infers short from /shorts/ URL when format column blank', () => {
    assert.equal(inferVideoFormat('https://www.youtube.com/shorts/abc123'), 'short');
    assert.equal(resolveVideoFormat('https://www.youtube.com/shorts/abc123'), 'short');
    assert.equal(resolveVideoFormat('https://www.youtube.com/shorts/abc123', ''), 'short');
  });

  it('infers long from watch?v= URL when format column blank', () => {
    assert.equal(resolveVideoFormat('https://www.youtube.com/watch?v=nl24-rPjOr8'), 'long');
  });

  it('honors explicit format=short on watch?v= URL', () => {
    assert.equal(
      resolveVideoFormat('https://www.youtube.com/watch?v=nl24-rPjOr8', 'short'),
      'short',
    );
  });

  it('honors explicit format=long on /shorts/ URL', () => {
    assert.equal(resolveVideoFormat('https://www.youtube.com/shorts/abc123', 'long'), 'long');
  });
});

describe('rowToCatalogVideo format override', () => {
  it('uses format=short from CSV even when URL is watch?v=', () => {
    const video = rowToCatalogVideo(baseRow({ format: 'short' }));
    assert.equal(video.format, 'short');
    assert.equal(video.product, 'keymod');
  });

  it('falls back to URL inference when format blank', () => {
    const video = rowToCatalogVideo(baseRow({ format: '' }));
    assert.equal(video.format, 'long');
  });

  it('maps like_count and comment_count from CSV', () => {
    const video = rowToCatalogVideo(
      baseRow({ format: 'short', like_count: '421', comment_count: '17' }),
    );
    assert.equal(video.likeCount, 421);
    assert.equal(video.commentCount, 17);
    assert.equal(video.viewsFormatted, '100');
  });

  it('omits likeCount/commentCount when blank', () => {
    const video = rowToCatalogVideo(baseRow({ like_count: '', comment_count: '' }));
    assert.equal(video.likeCount, undefined);
    assert.equal(video.commentCount, undefined);
  });
});
