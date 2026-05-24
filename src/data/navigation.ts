import { docsPath, newsPath, siteConfig } from '../config/site';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: 'ホーム', href: '/' },
  {
    label: '製品',
    href: '#',
    children: [
      { label: 'KeyMod シリーズ', href: '/products/keymod/' },
      { label: 'KVM-GO シリーズ', href: '/products/kvm-go/' },
      { label: 'Mini-KVM', href: '/products/minikvm/' },
      { label: 'uConsole KVM Extension', href: '/products/uconsole-kvm-extension/' },
      { label: 'アクセサリー', href: '/products/accessories/' },
    ],
  },
  { label: 'ビデオ', href: '/videos/' },
  { label: '活用事例', href: '/use-cases/' },
  { label: '会社概要', href: '/about/' },
  { label: 'ドキュメント', href: docsPath(), external: true },
  { label: 'ニュース', href: newsPath(), external: true },
  { label: 'ショップ', href: siteConfig.links.shop, external: true },
];
