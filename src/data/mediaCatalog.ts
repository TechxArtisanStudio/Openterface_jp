import { catalogVideos } from './catalogVideos';
import { mediaCoverage } from './mediaCoverage';
import { mediaTestimonials } from './mediaTestimonials';
import {
  catalogVideoToMediaEntry,
  mediaCoverageToCatalogEntry,
  mediaPostToCatalogEntry,
  type MediaCatalogEntry,
} from '../lib/youtube';
import { getSocialPostsForMedia, socialPostToMediaCatalogEntry } from '../lib/social-posts';

/** Social posts from social-posts.csv (SSOT). */
const socialCatalog = getSocialPostsForMedia().map(socialPostToMediaCatalogEntry);

/** Full Media hub catalog: YouTube + press + social posts + testimonials. */
export const mediaCatalog: MediaCatalogEntry[] = [
  ...catalogVideos.map(catalogVideoToMediaEntry),
  ...mediaCoverage.map(mediaCoverageToCatalogEntry),
  ...socialCatalog,
  ...mediaTestimonials.map(mediaPostToCatalogEntry),
];
