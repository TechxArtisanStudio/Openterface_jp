import { catalogVideos } from './catalogVideos';
import { mediaSampleEntries } from './mediaSamples';
import {
  catalogVideoToMediaEntry,
  mediaPostToCatalogEntry,
  type MediaCatalogEntry,
} from '../lib/youtube';

/** Full Media hub catalog: YouTube entries + curated social posts. */
export const mediaCatalog: MediaCatalogEntry[] = [
  ...catalogVideos.map(catalogVideoToMediaEntry),
  ...mediaSampleEntries.map(mediaPostToCatalogEntry),
];
