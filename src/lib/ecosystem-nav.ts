import { docsPath, newsPath, siteConfig } from '../config/site';
import { surfaceMarketingHost } from '../config/surface-urls';
import type { SiteLocale } from './locale';

export type EcosystemSurface = 'marketing' | 'docs' | 'news';

export interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  badge?: string;
  children?: NavItem[];
  /** Marketing header: rich hover mega-menu instead of a plain dropdown. */
  megaMenu?: 'products' | 'apps';
}

export interface EcosystemNavLabels {
  products: string;
  allProducts: string;
  keymodSeries: string;
  kvmGoSeries: string;
  miniKvm: string;
  kvmExt: string;
  accessories: string;
  apps: string;
  allApps: string;
  kvmControl: string;
  keycmd: string;
  docs: string;
  /** Short CTA on product mega-menu cards, e.g. "Docs →". */
  productDocs: string;
  /** Hub link in mega-menu footers and mobile accordion. */
  allDocumentation: string;
  media: string;
  news: string;
  forum: string;
  forumNewBadge: string;
}

function joinUrl(host: string, path: string): string {
  const base = host.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.endsWith('/') ? `${base}${normalized}` : `${base}${normalized}/`;
}

function marketingHref(surface: EcosystemSurface, locale: SiteLocale, path: string): string {
  if (surface === 'marketing') {
    return path.startsWith('/') ? path : `/${path}`;
  }
  return joinUrl(surfaceMarketingHost(locale), path);
}

export function buildEcosystemNav(
  surface: EcosystemSurface,
  locale: SiteLocale,
  labels: EcosystemNavLabels,
): NavItem[] {
  const docsHubHref = docsPath();
  const newsHref = newsPath();

  const productsChildren: NavItem[] = [
    { label: labels.keymodSeries, href: marketingHref(surface, locale, '/keymod/') },
    { label: labels.kvmGoSeries, href: marketingHref(surface, locale, '/kvmgo/') },
    { label: labels.miniKvm, href: marketingHref(surface, locale, '/minikvm/') },
    { label: labels.kvmExt, href: marketingHref(surface, locale, '/kvmext/') },
    { label: labels.accessories, href: marketingHref(surface, locale, '/accessories/') },
    { label: labels.allDocumentation, href: docsHubHref, external: true },
  ];

  const appsChildren: NavItem[] = [
    { label: labels.kvmControl, href: marketingHref(surface, locale, '/kvm/') },
    { label: labels.keycmd, href: marketingHref(surface, locale, '/keycmd/') },
    { label: labels.allDocumentation, href: docsHubHref, external: true },
  ];

  const items: NavItem[] = [
    {
      label: labels.products,
      children: productsChildren,
      megaMenu: surface === 'marketing' ? 'products' : undefined,
    },
    {
      label: labels.apps,
      children: appsChildren,
      megaMenu: surface === 'marketing' ? 'apps' : undefined,
    },
    { label: labels.media, href: marketingHref(surface, locale, '/media/') },
  ];

  // Docs hub stays top-level on the docs surface; marketing nests it under Products/Apps.
  if (surface === 'docs') {
    items.push({ label: labels.docs, href: docsHubHref });
  }

  items.push(
    { label: labels.news, href: newsHref },
    {
      label: labels.forum,
      href: siteConfig.links.forum,
      external: true,
      badge: labels.forumNewBadge,
    },
  );

  return items;
}
