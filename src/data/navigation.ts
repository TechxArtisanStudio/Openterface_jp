import { docsPath, newsPath, siteConfig } from '../config/site';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Products',
    href: '/products/',
    children: [
      { label: 'All Products', href: '/products/' },
      { label: 'KeyMod Series', href: '/keymod/' },
      { label: 'KVM-GO Series', href: '/kvmgo/' },
      { label: 'Mini-KVM', href: '/minikvm/' },
      { label: 'uConsole KVM Extension', href: '/kvmext/' },
      { label: 'Accessories', href: '/accessories/' },
    ],
  },
  {
    label: 'Apps',
    href: '/app/',
    children: [
      { label: 'All Apps', href: '/app/' },
      { label: 'KVM Control', href: '/kvm/' },
      { label: 'KeyCmd', href: '/keycmd/' },
    ],
  },
  { label: 'Media', href: '/videos/' },
  { label: 'About', href: '/about/' },
  { label: 'Docs', href: docsPath(), external: true },
  { label: 'News', href: newsPath(), external: true },
  { label: 'Shop', href: siteConfig.links.shop, external: true },
];
