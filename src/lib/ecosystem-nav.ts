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
  const productsChildren: NavItem[] = [
    { label: labels.keymodSeries, href: marketingHref(surface, locale, '/keymod/') },
    { label: labels.kvmGoSeries, href: marketingHref(surface, locale, '/kvmgo/') },
    { label: labels.miniKvm, href: marketingHref(surface, locale, '/minikvm/') },
    { label: labels.kvmExt, href: marketingHref(surface, locale, '/kvmext/') },
    { label: labels.accessories, href: marketingHref(surface, locale, '/accessories/') },
  ];

  const appsChildren: NavItem[] = [
    { label: labels.kvmControl, href: marketingHref(surface, locale, '/kvm/') },
    { label: labels.keycmd, href: marketingHref(surface, locale, '/keycmd/') },
  ];

  const docsHref = surface === 'docs' ? docsPath() : docsPath();
  const newsHref = surface === 'news' ? newsPath() : newsPath();

  return [
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
    { label: labels.docs, href: docsHref },
    { label: labels.media, href: marketingHref(surface, locale, '/media/') },
    { label: labels.news, href: newsHref },
    {
      label: labels.forum,
      href: siteConfig.links.forum,
      external: true,
      badge: labels.forumNewBadge,
    },
  ];
}
