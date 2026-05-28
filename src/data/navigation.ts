import { docsPath, newsPath, siteConfig } from '../config/site';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: "製品",
    href: '/products/',
    children: [
      { label: "すべての製品", href: '/products/' },
      { label: 'KeyMod Series', href: '/keymod/' },
      { label: 'KVM-GO Series', href: '/kvmgo/' },
      { label: 'Mini-KVM', href: '/minikvm/' },
      { label: 'uConsole KVM Extension', href: '/kvmext/' },
      { label: "アクセサリー", href: '/accessories/' },
    ],
  },
  {
    label: "アプリ",
    href: '/app/',
    children: [
      { label: "すべてのアプリ", href: '/app/' },
      { label: "KVM コントロール", href: '/kvm/' },
      { label: 'KeyCmd', href: '/keycmd/' },
    ],
  },
  { label: "メディア", href: '/videos/' },
  { label: "会社概要", href: '/about/' },
  { label: "ドキュメント", href: docsPath(), external: true },
  { label: "ニュース", href: newsPath(), external: true },
  { label: "ショップ", href: siteConfig.links.shop, external: true },
];
