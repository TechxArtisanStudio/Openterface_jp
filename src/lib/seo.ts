import { localeHosts } from '../data/hreflang-manifest';

/** Open Graph locale codes (Facebook format). */
export const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
  ja: 'ja_JP',
  ko: 'ko_KR',
  pt: 'pt_PT',
  ro: 'ro_RO',
  zh: 'zh_CN',
};

export const TWITTER_SITE = '@TechxArtisan';

/** Avoid duplicate brand suffix when title already includes site name (e.g. home SEO titles). */
export function buildPageTitle(title: string, siteName: string): string {
  if (title === siteName || title.includes(siteName)) return title;
  return `${title} | ${siteName}`;
}

export function getOgLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] ?? locale;
}

export function getOgLocaleAlternates(currentLocale: string): string[] {
  return Object.keys(localeHosts)
    .filter((lang) => lang !== currentLocale)
    .map((lang) => getOgLocale(lang));
}

/** Per-route share images for pages without product-specific art. */
export const pageOgImages = {
  videos: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
  useCases: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
} as const;
