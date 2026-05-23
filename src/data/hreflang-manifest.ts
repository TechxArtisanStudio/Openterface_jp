/** Cross-subdomain hreflang cluster for Astro marketing pages (all 10 locales). */
export const localeHosts: Record<string, string> = {
  en: 'https://en.openterface.com',
  de: 'https://de.openterface.com',
  es: 'https://es.openterface.com',
  fr: 'https://fr.openterface.com',
  it: 'https://it.openterface.com',
  ja: 'https://jp.openterface.com',
  ko: 'https://ko.openterface.com',
  pt: 'https://pt.openterface.com',
  ro: 'https://ro.openterface.com',
  zh: 'https://zh.openterface.com',
};

export const marketingPaths = [
  '/',
  '/about/',
  '/videos/',
  '/use-cases/',
  '/products/keymod/',
  '/products/kvm-go/',
  '/products/minikvm/',
  '/products/uconsole-kvm-extension/',
  '/products/accessories/',
] as const;

export function normalizePath(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function getHreflangAlternates(canonicalPath: string): { lang: string; href: string }[] {
  const normalized = normalizePath(canonicalPath);
  if (!(marketingPaths as readonly string[]).includes(normalized)) return [];
  return Object.entries(localeHosts).map(([lang, host]) => ({
    lang,
    href: new URL(normalized, host).href,
  }));
}

export function getXDefaultUrl(canonicalPath: string): string | null {
  const normalized = normalizePath(canonicalPath);
  if (!(marketingPaths as readonly string[]).includes(normalized)) return null;
  return new URL(normalized, localeHosts.en).href;
}
