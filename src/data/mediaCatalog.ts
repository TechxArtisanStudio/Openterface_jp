import { catalogVideos } from './catalogVideos';
import { mediaCoverage } from './mediaCoverage';
import { mediaPosts } from './mediaPosts';
import { mediaTestimonials } from './mediaTestimonials';
import {
  catalogVideoToMediaEntry,
  mediaCoverageToCatalogEntry,
  mediaPostToCatalogEntry,
  type MediaCatalogEntry,
} from '../lib/youtube';

/** Full Media hub catalog: YouTube + press + social posts (incl. quote reviews). */
export const mediaCatalog: MediaCatalogEntry[] = [
  ...catalogVideos.map(catalogVideoToMediaEntry),
  ...mediaCoverage.map(mediaCoverageToCatalogEntry),
  ...mediaPosts.map(mediaPostToCatalogEntry),
  ...mediaTestimonials.map(mediaPostToCatalogEntry),
];
