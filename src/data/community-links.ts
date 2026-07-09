export interface CommunityLink {
  name: string;
  description: string;
  href: string;
  group: 'chat' | 'social' | 'support';
}

/** Canonical Discord invite — keep in sync with keymod links and JSON-LD sameAs. */
export const DISCORD_INVITE_URL = 'https://discord.gg/sFTU7O8Xe3';

export const communityLinks: CommunityLink[] = [
  {
    name: 'Discord',
    description: 'Real-time chat with the team and community.',
    href: DISCORD_INVITE_URL,
    group: 'chat',
  },
  {
    name: 'Reddit',
    description: 'Discussions, questions, and user support on r/Openterface_miniKVM.',
    href: 'https://www.reddit.com/r/Openterface_miniKVM/',
    group: 'chat',
  },
  {
    name: 'Forum',
    description: 'Long-form threads and product support.',
    href: 'https://forum.openterface.com/',
    group: 'chat',
  },
  {
    name: 'X (Twitter)',
    description: 'Product updates, tips, and announcements.',
    href: 'https://x.com/TechxArtisan',
    group: 'social',
  },
  {
    name: 'Threads',
    description: 'Short updates and community highlights.',
    href: 'https://www.threads.net/@techxartisan',
    group: 'social',
  },
  {
    name: 'YouTube',
    description: 'Demos, reviews, and setup guides.',
    href: 'https://www.youtube.com/@TechxArtisan',
    group: 'social',
  },
  {
    name: 'GitHub',
    description: 'Open-source hardware and software repositories.',
    href: 'https://github.com/TechxArtisan',
    group: 'support',
  },
];

export const footerSocialLinks = communityLinks.filter((link) => link.name !== 'Forum');

export function socialHrefWithUtm(href: string): string {
  try {
    const url = new URL(href);
    url.searchParams.set('utm_source', 'openterface');
    url.searchParams.set('utm_medium', 'footer');
    return url.toString();
  } catch {
    return href;
  }
}
