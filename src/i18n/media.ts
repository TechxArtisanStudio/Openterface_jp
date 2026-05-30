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
  formatCoverage: string;
  formatChipsAria: string;
  sampleBadge: string;
  readOriginal: string;
  readArticle: string;
  pressHeading: string;
  platformX: string;
  platformThreads: string;
  platformInstagram: string;
  platformBluesky: string;
  platformReddit: string;
  platformBlog: string;
  platformLinkedin: string;
  platformGithub: string;
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
  formatCoverage: 'Press',
  formatChipsAria: 'Filter by media format',
  sampleBadge: 'Sample',
  readOriginal: 'Read original →',
  readArticle: 'Read article →',
  pressHeading: 'In the press',
  platformX: 'X',
  platformThreads: 'Threads',
  platformInstagram: 'Instagram',
  platformBluesky: 'Bluesky',
  platformReddit: 'Reddit',
  platformBlog: 'Blog',
  platformLinkedin: 'LinkedIn',
  platformGithub: 'GitHub',
};

const translations: Record<string, MediaStrings> = {
  nl: { ...en, title: "Media", controlsAria: "Media-catalogusfilters", emptyResults: "Geen media komt overeen met de huidige filters." },
  pl: { ...en, title: "Media", controlsAria: "Filtry katalogu mediów", emptyResults: "Brak mediów pasujących do filtrów." },
  tr: { ...en, title: "Medya", controlsAria: "Medya kataloğu filtreleri", emptyResults: "Mevcut filtrelerle eşleşen medya yok." },
  ar: { ...en, title: "الوسائط", controlsAria: "مرشحات كatalog الوسائط", emptyResults: "لا توجد وسائط تطابق المرشحات الحالية." },
  ru: { ...en, title: "Медиа", controlsAria: "Фильтры медиакаталога", emptyResults: "Нет медиа по текущим фильтрам." },
  tw: { ...en, title: "媒體", controlsAria: "媒體目錄篩選", emptyResults: "沒有符合目前篩選的媒體。" },
  hk: { ...en, title: "媒體", controlsAria: "媒體目錄篩選", emptyResults: "沒有符合目前篩選的媒體。" },
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
