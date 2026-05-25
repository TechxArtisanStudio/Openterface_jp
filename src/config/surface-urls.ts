import { localeHosts as prodLocaleHosts } from '../data/hreflang-manifest';
import type { SiteLocale } from '../lib/locale';

const PROD_DOCS = 'https://docs.openterface.com';
const PROD_NEWS = 'https://news.openterface.com';

/** Dev marketing host from env (Vite requires static import.meta.env references). */
const DEV_MARKETING: Partial<Record<SiteLocale, string | undefined>> = {
  en: import.meta.env.PUBLIC_OP_DEV_MARKETING_EN,
  de: import.meta.env.PUBLIC_OP_DEV_MARKETING_DE,
  es: import.meta.env.PUBLIC_OP_DEV_MARKETING_ES,
  fr: import.meta.env.PUBLIC_OP_DEV_MARKETING_FR,
  it: import.meta.env.PUBLIC_OP_DEV_MARKETING_IT,
  ja: import.meta.env.PUBLIC_OP_DEV_MARKETING_JA,
  ko: import.meta.env.PUBLIC_OP_DEV_MARKETING_KO,
  pt: import.meta.env.PUBLIC_OP_DEV_MARKETING_PT,
  ro: import.meta.env.PUBLIC_OP_DEV_MARKETING_RO,
  zh: import.meta.env.PUBLIC_OP_DEV_MARKETING_ZH,
  hk: import.meta.env.PUBLIC_OP_DEV_MARKETING_HK,
  tw: import.meta.env.PUBLIC_OP_DEV_MARKETING_TW,
  ru: import.meta.env.PUBLIC_OP_DEV_MARKETING_RU,
  ar: import.meta.env.PUBLIC_OP_DEV_MARKETING_AR,
  tr: import.meta.env.PUBLIC_OP_DEV_MARKETING_TR,
  pl: import.meta.env.PUBLIC_OP_DEV_MARKETING_PL,
  nl: import.meta.env.PUBLIC_OP_DEV_MARKETING_NL,
};

export function surfaceDocsBase(): string {
  return import.meta.env.PUBLIC_OP_DEV_DOCS || PROD_DOCS;
}

export function surfaceNewsBase(): string {
  return import.meta.env.PUBLIC_OP_DEV_NEWS || PROD_NEWS;
}

export function surfaceMarketingHost(locale: SiteLocale): string {
  return DEV_MARKETING[locale] || prodLocaleHosts[locale] || prodLocaleHosts.en;
}

/** Locale → host map with dev overrides when OP dev stack env is set. */
export function surfaceLocaleHosts(): Record<string, string> {
  const hosts = { ...prodLocaleHosts };
  for (const locale of Object.keys(DEV_MARKETING) as SiteLocale[]) {
    const dev = DEV_MARKETING[locale];
    if (dev) hosts[locale] = dev;
  }
  return hosts;
}
