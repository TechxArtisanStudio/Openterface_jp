import type { MediaPostEntry } from '../lib/youtube';

/** Curated social posts — sample placeholders until real links are added to the CMS/sync pipeline. */
export const mediaSampleEntries: MediaPostEntry[] = [
  {
    id: 'sample-post-kvmgo-campaign',
    format: 'post',
    title: 'KVM-GO crowdfunding milestone reactions',
    excerpt:
      'Sample card — community posts about the KVM-GO campaign will appear here as link-out cards (X, Threads, Instagram).',
    author: '@TechxArtisan',
    platform: 'x',
    externalUrl: 'https://x.com/TechxArtisan',
    date: '2025-12-30',
    product: 'kvm-go',
    language: 'en',
    sample: true,
  },
  {
    id: 'sample-post-minikvm-review',
    format: 'post',
    title: 'Mini-KVM review thread roundup',
    excerpt:
      'Sample card — short-form social posts linking to creator reviews and unboxings (no embedded player).',
    author: 'Community',
    platform: 'threads',
    externalUrl: 'https://www.threads.net/@techxartisan',
    date: '2024-06-15',
    product: 'minikvm',
    language: 'en',
    sample: true,
  },
  {
    id: 'sample-testimonial-keymod-beta',
    format: 'testimonial',
    title: '“KeyMod saved my kiosk visit”',
    excerpt:
      'Sample testimonial — quote cards with links to original posts or videos from beta testers.',
    author: 'Beta tester (sample)',
    platform: 'instagram',
    externalUrl: 'https://www.instagram.com/techxartisan/',
    date: '2026-01-10',
    product: 'keymod',
    app: 'keycmd',
    language: 'en',
    sample: true,
  },
];
