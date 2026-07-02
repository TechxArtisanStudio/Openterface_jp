/** KeyMod landing #social-proof — official Instagram embeds (SSOT). */

export type KeymodInstagramEmbed = {
  id: string;
  /** Canonical post/reel URL without query params */
  permalink: string;
  author: string;
  format: 'post' | 'reel';
  sort: number;
};

/** Sourced from web-dev-tool/tmp/ig/share-ig.txt — Instagram embed codes. */
export const keymodInstagramEmbeds: KeymodInstagramEmbed[] = [
  {
    id: 'ig-463n7-homelab',
    permalink: 'https://www.instagram.com/p/DZGUTGAM45Z/',
    author: '@463n7',
    format: 'post',
    sort: 10,
  },
  {
    id: 'ig-463n7-reel',
    permalink: 'https://www.instagram.com/reel/DY7svOSsuXn/',
    author: '@463n7',
    format: 'reel',
    sort: 20,
  },
  {
    id: 'ig-m0use-edc',
    permalink: 'https://www.instagram.com/p/DZLkGaZAbky/',
    author: '@_m0usem0use_',
    format: 'post',
    sort: 30,
  },
  {
    id: 'ig-cybermax560',
    permalink: 'https://www.instagram.com/reel/DZRsM93P-mU/',
    author: '@cybermax560',
    format: 'reel',
    sort: 40,
  },
  {
    id: 'ig-nester-1',
    permalink: 'https://www.instagram.com/p/DZS5VTIHOLg/',
    author: '@nester.3d2a',
    format: 'post',
    sort: 50,
  },
  {
    id: 'ig-nester-2',
    permalink: 'https://www.instagram.com/p/DZieZfUnACg/',
    author: '@nester.3d2a',
    format: 'post',
    sort: 60,
  },
];

export function getKeymodInstagramEmbeds(): KeymodInstagramEmbed[] {
  return [...keymodInstagramEmbeds].sort((a, b) => a.sort - b.sort);
}
