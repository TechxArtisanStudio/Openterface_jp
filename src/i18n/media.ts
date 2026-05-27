/** UI strings for /videos/ Media hub — evolved from legacy videos.json */

export type MediaStrings = {
  title: string;
  subtitle: string;
  totalItems: string;
  languages: string;
  products: string;
  sortBy: string;
  sortNewest: string;
  sortOldest: string;
  sortMostViews: string;
  filterProduct: string;
  allProducts: string;
  filterApp: string;
  allApps: string;
  filterLanguage: string;
  allLanguages: string;
  showing: string;
  views: string;
  unknownChannel: string;
  controlsAria: string;
  emptyResults: string;
  formatAll: string;
  formatVideos: string;
  formatShorts: string;
  formatPosts: string;
  formatTestimonials: string;
  formatChipsAria: string;
  sampleBadge: string;
  readOriginal: string;
  platformX: string;
  platformThreads: string;
  platformInstagram: string;
};

const en: MediaStrings = {
  title: 'Media',
  subtitle:
    'Community reviews, YouTube demos, Shorts, and social posts about Openterface Mini-KVM, KVM-GO, KeyMod, and our apps — filter by format, product, and language.',
  totalItems: 'Total items',
  languages: 'Languages',
  products: 'Products',
  sortBy: 'Sort',
  sortNewest: 'Newest first',
  sortOldest: 'Oldest first',
  sortMostViews: 'Most views',
  filterProduct: 'Product',
  allProducts: 'All products',
  filterApp: 'App',
  allApps: 'All apps',
  filterLanguage: 'Language',
  allLanguages: 'All languages',
  showing: 'Showing',
  views: 'views',
  unknownChannel: 'Unknown channel',
  controlsAria: 'Media catalog filters',
  emptyResults: 'No media matches the current filters.',
  formatAll: 'All',
  formatVideos: 'Videos',
  formatShorts: 'Shorts',
  formatPosts: 'Posts',
  formatTestimonials: 'Testimonials',
  formatChipsAria: 'Filter by media format',
  sampleBadge: 'Sample',
  readOriginal: 'Read original →',
  platformX: 'X',
  platformThreads: 'Threads',
  platformInstagram: 'Instagram',
};

const translations: Record<string, MediaStrings> = {
  en,
  de: { ...en, title: 'Medien', controlsAria: 'Medienkatalog-Filter', emptyResults: 'Keine Medien entsprechen den Filtern.' },
  es: { ...en, title: 'Medios', controlsAria: 'Filtros del catálogo de medios' },
  fr: { ...en, title: 'Médias', controlsAria: 'Filtres du catalogue médias' },
  it: { ...en, title: 'Media', controlsAria: 'Filtri catalogo media' },
  ko: { ...en, title: '미디어', controlsAria: '미디어 카탈로그 필터' },
  pt: { ...en, title: 'Mídia', controlsAria: 'Filtros do catálogo de mídia' },
  ro: { ...en, title: 'Media', controlsAria: 'Filtre catalog media' },
  zh: { ...en, title: '媒体', controlsAria: '媒体目录筛选' },
  ja: { ...en, title: 'メディア', controlsAria: 'メディアカタログのフィルター' },
};

export function getMediaStrings(locale: string): MediaStrings {
  return translations[locale] ?? en;
}

/** @deprecated Use getMediaStrings */
export type VideosStrings = MediaStrings;

/** @deprecated Use getMediaStrings */
export function getVideosStrings(locale: string): MediaStrings {
  return getMediaStrings(locale);
}
