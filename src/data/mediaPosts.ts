import type { MediaPostEntry } from '../lib/youtube';

/**
 * @deprecated All social posts are in Openterface_assets social-posts.csv.
 * See lib/social-posts.ts and socialPosts.generated.ts.
 */
export const legacyMediaPosts: MediaPostEntry[] = [];

/** @deprecated Use socialPosts from lib/social-posts. */
export const mediaPosts = legacyMediaPosts;
