import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { fetchYouTubeStatistics } from '../../scripts/lib/youtube/fetch-statistics.mjs';
import { catalogVideoToKeymodCommunityCard } from '../../src/lib/keymod-landing-media.ts';

describe('fetchYouTubeStatistics', () => {
  it('returns empty map when API key missing', async () => {
    const prev = process.env.YOUTUBE_API_KEY;
    delete process.env.YOUTUBE_API_KEY;
    try {
      const map = await fetchYouTubeStatistics(['nl24-rPjOr8'], { apiKey: '' });
      assert.equal(map.size, 0);
    } finally {
      if (prev != null) process.env.YOUTUBE_API_KEY = prev;
      else delete process.env.YOUTUBE_API_KEY;
    }
  });

  it('batches ids and maps statistics from API response', async () => {
    const calls = [];
    const fetchImpl = async (url) => {
      calls.push(url);
      return {
        ok: true,
        async json() {
          return {
            items: [
              {
                id: 'aaa',
                statistics: { viewCount: '1000', likeCount: '50', commentCount: '3' },
              },
              {
                id: 'bbb',
                statistics: { viewCount: '200', likeCount: '10', commentCount: '1' },
              },
            ],
          };
        },
      };
    };

    const map = await fetchYouTubeStatistics(['aaa', 'bbb', 'aaa'], {
      apiKey: 'test-key',
      fetchImpl,
    });
    assert.equal(calls.length, 1);
    assert.ok(String(calls[0]).includes('id=aaa%2Cbbb') || String(calls[0]).includes('id=aaa,bbb'));
    assert.deepEqual(map.get('aaa'), { views: 1000, likeCount: 50, commentCount: 3 });
    assert.deepEqual(map.get('bbb'), { views: 200, likeCount: 10, commentCount: 1 });
  });
});

describe('catalogVideoToKeymodCommunityCard engagement', () => {
  it('passes likes, comments, and viewsFormatted through', () => {
    const card = catalogVideoToKeymodCommunityCard({
      url: 'https://www.youtube.com/watch?v=x35Qs89WP_g',
      title: 'Keymod review',
      author: 'Reviewer',
      channelAvatar: '',
      thumbnail: 'https://i.ytimg.com/vi/x35Qs89WP_g/hqdefault.jpg',
      date: '2026-07-13',
      views: 3222,
      viewsFormatted: '3.2K',
      videoId: 'x35Qs89WP_g',
      language: 'en',
      product: 'keymod',
      zIndex: 36,
      format: 'long',
      likeCount: 120,
      commentCount: 8,
    });
    assert.equal(card.likeCount, 120);
    assert.equal(card.commentCount, 8);
    assert.equal(card.viewsFormatted, '3.2K');
    assert.equal(card.platform, 'youtube');
  });
});
