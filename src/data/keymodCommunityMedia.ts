import type { SocialPlatform } from '../lib/youtube';
import { catalogVideos } from './catalogVideos';

export type KeymodCommunityFormat = 'long' | 'short' | 'post' | 'reel';

export type KeymodCommunityItemDef = {
  id: string;
  source: 'youtube' | 'social';
  /** When source=youtube — matches catalogVideos[].videoId */
  catalogVideoId?: string;
  platform?: SocialPlatform;
  format: KeymodCommunityFormat;
  externalUrl?: string;
  thumbnail?: string;
  author?: string;
  excerpt?: string;
  scenarioTag?: string;
  date?: string;
  featured: boolean;
  sort: number;
};

export type KeymodCommunityCard = {
  id: string;
  platform: SocialPlatform | 'youtube';
  format: KeymodCommunityFormat;
  externalUrl: string;
  thumbnail: string;
  author: string;
  excerpt?: string;
  scenarioTag?: string;
  title?: string;
};

/**
 * KeyMod landing community strip — hybrid SSOT.
 * YouTube: reference catalogVideos (product=keymod rows in youtube.csv).
 * Social: CDN/local thumbnail + outbound link (no runtime embed).
 */
export const keymodCommunityFeed: KeymodCommunityItemDef[] = [
  {
    id: 'ig-463n7-homelab',
    source: 'social',
    platform: 'instagram',
    format: 'post',
    externalUrl: 'https://www.instagram.com/p/DZGUTGAM45Z/',
    thumbnail: '/keymod/rebirth/social/homelab.webp',
    author: '@463n7',
    excerpt:
      'Just popped this dongle in and launched the app. Full keyboard and touchpad without hunting for a USB cable.',
    scenarioTag: 'Homelab',
    featured: true,
    sort: 10,
  },
  {
    id: 'ig-463n7-reel',
    source: 'social',
    platform: 'instagram',
    format: 'reel',
    externalUrl: 'https://www.instagram.com/463n7/reel/DY7svOSsuXn/',
    thumbnail: '/keymod/rebirth/modes/km-compose-send.webp',
    author: '@463n7',
    scenarioTag: 'Demo reel',
    featured: true,
    sort: 20,
  },
  {
    id: 'ig-m0use-edc',
    source: 'social',
    platform: 'instagram',
    format: 'post',
    externalUrl: 'https://www.instagram.com/p/DZLkGaZAbky/',
    thumbnail: '/keymod/rebirth/social/edc-tester.webp',
    author: '@_m0usem0use_',
    excerpt: 'KeyMod is always in my bag: a full keyboard and trackpad when I need it.',
    scenarioTag: 'EDC',
    featured: true,
    sort: 30,
  },
  {
    id: 'ig-cybermax560',
    source: 'social',
    platform: 'instagram',
    format: 'reel',
    externalUrl: 'https://www.instagram.com/reel/DZRsM93P-mU/',
    thumbnail: '/keymod/rebirth/social/beta-1.webp',
    author: '@cybermax560',
    featured: true,
    sort: 40,
  },
  {
    id: 'ig-nester-1',
    source: 'social',
    platform: 'instagram',
    format: 'post',
    externalUrl: 'https://www.instagram.com/p/DZS5VTIHOLg/',
    thumbnail: '/keymod/rebirth/modes/km-basic-keyboard.webp',
    author: '@nester.3d2a',
    featured: true,
    sort: 50,
  },
  {
    id: 'ig-nester-2',
    source: 'social',
    platform: 'instagram',
    format: 'post',
    externalUrl: 'https://www.instagram.com/p/DZieZfUnACg/',
    thumbnail: '/keymod/rebirth/modes/scenario-kiosk.webp',
    author: '@nester.3d2a',
    featured: true,
    sort: 60,
  },
  // Official demos — not on landing strip; available for /media/ sync later
  {
    id: 'ig-txa-compose',
    source: 'social',
    platform: 'instagram',
    format: 'post',
    externalUrl: 'https://www.instagram.com/p/DZNZVbUBBxD/',
    thumbnail: '/keymod/rebirth/modes/km-compose-send.webp',
    author: '@techxartisan',
    excerpt: 'Paste on phone, tap Send, and the laptop types it in automatically.',
    scenarioTag: 'Compose & Send',
    featured: false,
    sort: 70,
  },
  {
    id: 'ig-txa-gamepad',
    source: 'social',
    platform: 'instagram',
    format: 'post',
    externalUrl: 'https://www.instagram.com/p/DY7XsRIBQi6/',
    thumbnail: '/keymod/rebirth/modes/gamepad-minecraft.webp',
    author: '@techxartisan',
    excerpt: 'Minecraft with KeyCmd gamepad, demo with KVM-GO. Same mode on KeyMod.',
    scenarioTag: 'Gamepad',
    featured: false,
    sort: 80,
  },
  // YouTube — enable when product=keymod rows exist in youtube.csv:
  // {
  //   id: 'yt-example',
  //   source: 'youtube',
  //   catalogVideoId: 'XXXXXXXXXXX',
  //   format: 'short',
  //   scenarioTag: 'Review',
  //   featured: true,
  //   sort: 5,
  // },
];

function resolveCommunityItem(item: KeymodCommunityItemDef): KeymodCommunityCard | null {
  if (item.source === 'youtube') {
    if (!item.catalogVideoId) return null;
    const video = catalogVideos.find((v) => v.videoId === item.catalogVideoId);
    if (!video) return null;
    return {
      id: item.id,
      platform: 'youtube',
      format: video.format === 'short' ? 'short' : 'long',
      externalUrl: video.url,
      thumbnail: video.thumbnail,
      author: video.author,
      excerpt: item.excerpt,
      scenarioTag: item.scenarioTag,
      title: video.title,
    };
  }

  if (!item.externalUrl || !item.thumbnail || !item.author) return null;

  return {
    id: item.id,
    platform: item.platform ?? 'instagram',
    format: item.format,
    externalUrl: item.externalUrl,
    thumbnail: item.thumbnail,
    author: item.author,
    excerpt: item.excerpt,
    scenarioTag: item.scenarioTag,
  };
}

/** Featured cards for KeyMod landing #social-proof — sorted by `sort`. */
export function getKeymodCommunityCards(): KeymodCommunityCard[] {
  return keymodCommunityFeed
    .filter((item) => item.featured)
    .sort((a, b) => a.sort - b.sort)
    .map(resolveCommunityItem)
    .filter((card): card is KeymodCommunityCard => card !== null);
}
