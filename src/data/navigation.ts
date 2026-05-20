import { legacyPath } from '../config/site';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    href: '#',
    children: [
      { label: 'KeyMod Series', href: '/products/keymod/' },
      { label: 'KVM-GO Series', href: '/products/kvm-go/' },
      { label: 'Mini-KVM', href: '/products/minikvm/' },
      { label: 'uConsole KVM Extension', href: '/products/uconsole-kvm-extension/' },
      { label: 'Accessories', href: '/products/accessories/' },
    ],
  },
  { label: 'Videos', href: '/videos/' },
  { label: 'Use Cases', href: '/use-cases/' },
  { label: 'FAQs', href: legacyPath('/faq/'), external: true },
  { label: 'App', href: legacyPath('/app/overview/'), external: true },
  { label: 'Tutorial', href: legacyPath('/tutorial/'), external: true },
  { label: 'Support', href: legacyPath('/support/'), external: true },
  { label: 'About', href: '/about/' },
];
