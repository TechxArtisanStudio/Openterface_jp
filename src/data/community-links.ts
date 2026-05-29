export interface CommunityLink {
  name: string;
  description: string;
  href: string;
  group: 'chat' | 'social' | 'support';
}

export const communityLinks: CommunityLink[] = [
  {
    name: 'Discord',
    description: 'Real-time chat with the team and community.',
    href: 'https://discord.gg/ruuxSHz',
    group: 'chat',
  },
  {
    name: 'Reddit',
    description: 'Discussions, questions, and user support on r/TechxArtisan.',
    href: 'https://www.reddit.com/r/TechxArtisan/',
    group: 'chat',
  },
  {
    name: 'Forum',
    description: 'Long-form threads and product support.',
    href: 'https://forum.openterface.com',
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
