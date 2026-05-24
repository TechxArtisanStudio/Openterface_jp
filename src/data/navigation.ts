import { legacyPath, newsPath } from '../config/site';

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
  { label: 'FAQ', href: legacyPath('/faq/'), external: true },
  { label: 'アプリ', href: legacyPath('/app/overview/'), external: true },
  { label: 'チュートリアル', href: legacyPath('/tutorial/'), external: true },
  { label: 'サポート', href: legacyPath('/support/'), external: true },
  { label: 'ニュース', href: newsPath(), external: true },
  { label: '会社概要', href: '/about/' },
];
