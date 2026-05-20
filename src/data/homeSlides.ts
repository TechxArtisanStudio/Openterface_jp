import { siteConfig } from '../config/site';

export interface HomeSlide {
  id: number;
  category: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  images?: string[];
  primaryCta?: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string; external?: boolean };
  funding?: { amount: string; date: string; backers: string };
  progressSmall: string;
  progressLarge: string;
}

export const homeSlides: HomeSlide[] = [
  {
    id: 1,
    category: 'KeyMod Series',
    headline: 'Turn Your Phone into a Mini Keyboard',
    description:
      'A compact USB + Bluetooth HID emulator that turns your phone into a portable keyboard and trackpad. Plug and play, 100% open source. Perfect for kiosks, smart TVs, and quick workflow shortcuts.',
    image: 'https://assets2.openterface.com/images/keymod/2in1.webp',
    imageAlt: 'Openterface KeyMod Series',
    images: [
      'https://assets2.openterface.com/images/keymod/2in1.webp',
      'https://assets2.openterface.com/images/keymod/keymod.webp',
      'https://assets2.openterface.com/images/keymod/feature.webp',
    ],
    primaryCta: { label: 'Support NOW', href: siteConfig.links.keymodCrowdsupply, external: true },
    secondaryCta: { label: 'View Product', href: '/products/keymod/' },
    progressSmall: 'KeyMod Series',
    progressLarge: 'Turn Your Phone into a Mini Keyboard',
  },
  {
    id: 2,
    category: 'KVM-GO Series',
    headline: 'The Ultra-Compact KVM That Fits on Keychain',
    description:
      'Designed to fit on your keychain and save your day in a snap, this next-generation KVM-over-USB gadget is built for rapid IT operations in the field.',
    image: 'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
    imageAlt: 'KVM-GO Series',
    images: [
      'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
      'https://assets.openterface.com/images/cover/kvm-go-triple-2.webp',
    ],
    primaryCta: { label: 'Pre-Order NOW', href: siteConfig.links.kvmgoPurchase, external: true },
    secondaryCta: { label: 'View Product', href: '/products/kvm-go/' },
    funding: { amount: '$101,548', date: 'Funded on Dec 30, 2025', backers: '478' },
    progressSmall: 'KVM-GO Series',
    progressLarge: 'The Ultra-Compact KVM That Fits on Your Keychain',
  },
  {
    id: 3,
    category: 'Mini-KVM Series',
    headline: 'The Compact KVM Solution for Professionals',
    description:
      'A compact, feature-rich, open-source KVM-over-USB solution that simplifies your tech life with on-the-fly IT tasks and troubleshooting.',
    image: 'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
    imageAlt: 'Openterface Mini-KVM',
    images: [
      'https://assets.openterface.com/images/cover/mini-kvm-toolkit.webp',
      'https://assets.openterface.com/images/cover/mini-kvm.webp',
    ],
    primaryCta: { label: 'Order NOW', href: siteConfig.links.minikvmPurchase, external: true },
    secondaryCta: { label: 'View Product', href: '/products/minikvm/' },
    funding: { amount: '$505,471', date: 'Funded on Jun 13, 2024', backers: '3,775' },
    progressSmall: 'Mini-KVM Series',
    progressLarge: 'The Compact KVM Solution for Professionals',
  },
  {
    id: 4,
    category: 'TxA Shop',
    headline: 'Complete Your Setup with Premium Accessories',
    description:
      'Explore our range of essential accessories including video adapters, high-speed cables, and storage solutions. Enhance your Openterface experience with quality accessories designed for professionals.',
    image: 'https://assets.openterface.com/images/cover.webp',
    imageAlt: 'TxA Shop Accessories',
    primaryCta: { label: 'Shop NOW', href: siteConfig.links.shop, external: true },
    secondaryCta: { label: 'View Accessories', href: '/products/accessories/' },
    progressSmall: 'TxA Shop',
    progressLarge: 'Complete Your Setup with Premium Accessories',
  },
];

export const homeSeo = {
  title: 'Openterface | Ultra-Compact KVM Solutions for IT Professionals',
  description:
    'Discover Openterface - Ultra-compact KVM-over-USB solutions including KVM-GO Series (keychain-sized), Mini-KVM Series, and uConsole KVM Extension.',
  keywords:
    'KVM-over-USB, KVM switch, portable KVM, USB KVM, headless server management, KVM-GO, Mini-KVM, KeyMod',
};
