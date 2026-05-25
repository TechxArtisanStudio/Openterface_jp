import { marketingPaths, normalizePath } from '../data/hreflang-manifest';
import { surfaceMarketingHost } from '../config/surface-urls';

export const SUPPORTED_LOCALES = [
  'en',
  'zh',
  'ja',
  'ko',
  'de',
  'fr',
  'es',
  'it',
  'pt',
  'ro',
  'hk',
] as const;

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export const LOCALE_LABELS: Record<SiteLocale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português',
  ro: 'Română',
  hk: '繁體中文（香港）',
};

export function isSiteLocale(value: string): value is SiteLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Build cross-subdomain URL for the same marketing page when available. */
export function switchLocaleUrl(pathname: string, targetLocale: SiteLocale, search = ''): string {
  const normalized = normalizePath(pathname);
  const path =
    (marketingPaths as readonly string[]).includes(normalized) ? normalized : '/';
  const host = surfaceMarketingHost(targetLocale);
  const url = new URL(path, host);
  if (search) {
    url.search = search.startsWith('?') ? search.slice(1) : search;
  }
  return url.href;
}
