import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

/**
 * KVM-GO marketing payload — cloned from Mini-KVM template (Phase 1D).
 * Sourced from docs/products/kvmgo/ (index, features, reviews, use-cases).
 */
export const kvmgoProduct: Product = {
  slug: 'kvm-go',
  title: 'Openterface KVM-GO Series',
  slogan: 'Ultra-Compact KVM That Fits on Your Keychain',
  subtitle: 'For Critical Tech Moments — Plug. Control. Go.',
  status: 'pre-order',
  description:
    'The next-generation KVM-over-USB solution with built-in video connectors (HDMI, DisplayPort, or VGA). Ultra-compact, keychain-sized, and built for rapid IT operations in data centers, server rooms, and the field — no loose video cables required.',
  seoDescription:
    'Control headless computers with Openterface KVM-GO. Built-in HDMI/DP/VGA connectors, keychain-sized, 4K-capable KVM-over-USB for IT professionals.',
  keywords:
    'KVM-GO, KVM over USB, ultra-compact KVM, keychain KVM, 4K KVM, built-in HDMI, MicroSD KVM, headless control',
  heroImage: 'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
  heroImages: [
    'https://assets.openterface.com/images/cover/kvm-go-triple.webp',
    'https://assets.openterface.com/images/cover/kvm-go-triple-2.webp',
  ],
  buyLabel: 'Pre-Order NOW',
  buyHref: siteConfig.links.kvmgoPurchase,
  funding: { amount: '$101,548', date: 'Funded on Dec 30, 2025', backers: '478' },
  painPoints: [
    'Traditional KVM gear is bulky and requires separate video cables',
    'Emergency server access in the field needs a pocket-sized tool',
    'Headless troubleshooting without network access is slow',
  ],
  solutions: [
    'Built-in male HDMI, DisplayPort, or VGA connectors — no loose cables',
    'Keychain form factor (~25 g) always within reach',
    'KVM-over-USB with sub-second startup — no network or target drivers',
  ],
  hwFeatures: [
    {
      title: 'Keychain-sized design',
      description: '18 × 18 × 55 mm aluminum body — fits in your pocket, not a crash cart.',
    },
    {
      title: 'Built-in video connectors',
      description: 'Direct plug-in HDMI, DisplayPort, or VGA male connectors — zero cable hunt.',
    },
    {
      title: '4K video capture',
      description: 'Up to 4096×2160 @ 60 Hz input; default 1080p@60 for stability (4K experimental).',
    },
    {
      title: 'MicroSD slot',
      description: 'Switchable storage for OS images, tools, and file transfer between host and target.',
    },
    {
      title: 'BIOS-level access',
      description: 'Reach firmware, boot menus, and recovery screens without network KVM.',
    },
    {
      title: 'Sub-second startup',
      description: 'Hardware ready in under 1 second — immediate troubleshooting in the field.',
    },
  ],
  swFeatures: [
    {
      title: 'Cross-platform host apps',
      description: 'macOS, Windows, Linux, Android, and Chrome web app support.',
    },
    {
      title: 'Text transfer',
      description: 'Send usernames, passwords, and code via simulated keystrokes (ASCII).',
    },
    {
      title: 'Open source',
      description: 'Fully open hardware and software — transparent, community-driven stack.',
    },
  ],
  specs: [
    { label: 'Size', value: '18 × 18 × 55 mm (~25 g)' },
    { label: 'Models', value: 'HDMI · DisplayPort · VGA (in development)' },
    { label: 'Video input', value: 'Up to 4K @ 60 Hz (YUV420)' },
    { label: 'Video output', value: 'Up to 4K @ 60 Hz (MJPEG)' },
    { label: 'Storage', value: 'MicroSD slot for host/target file transfer' },
    { label: 'Power', value: 'USB-C powered (no external supply)' },
  ],
  useCases: [
    'Data center walk-throughs',
    'Headless device setup',
    'Field IT and homelab rescue',
    'Travel EDC toolkit',
    'Legacy VGA rack access',
    'Maker faire & bench demos',
  ],
  useCaseCards: [
    {
      title: 'Data center & server rooms',
      description: 'Replace rolling crash carts with a keychain KVM that plugs straight in.',
      href: docsPath('/products/kvmgo/use-cases/'),
    },
    {
      title: 'EDC field toolkit',
      description: 'Always in your bag — built-in connector means one less cable to forget.',
      href: docsPath('/products/kvmgo/use-cases/'),
    },
    {
      title: 'Headless homelab rescue',
      description: 'Configure NAS, SBC, and lab nodes without a spare monitor.',
    },
    {
      title: 'Legacy VGA systems',
      description: 'VGA model targets older racks and industrial gear (in development).',
      href: docsPath('/products/kvmgo/features/'),
    },
    {
      title: 'BIOS & firmware access',
      description: 'Boot menus and recovery screens with no network dependency.',
      href: docsPath('/products/kvmgo/features/'),
    },
    {
      title: 'MicroSD OS installs',
      description: 'Switchable storage for imaging and portable recovery tools.',
      href: docsPath('/products/kvmgo/microsd-switch/'),
    },
  ],
  useCasesDocsHref: docsPath('/products/kvmgo/use-cases/'),
  specsDocsHref: docsPath('/products/kvmgo/features/'),
  docsOverviewHref: docsPath('/products/kvmgo/'),
  videoProductSlug: 'kvm-go',
  videoSectionTitle: 'Community reviews & demos',
  socialProofTitle: 'What press & early users say',
  socialProof: [
    {
      quote:
        'Small enough to fit on a keychain, Openterface KVM-GO is a tiny, open-source hardware KVM-over-USB gadget with HDMI, DisplayPort, or VGA connectors.',
      author: 'Jean-Luc Aufranc — CNX Software',
      href: 'https://www.cnx-software.com/2026/01/05/openterface-kvm-go-an-ultra-compact-kvm-over-usb-solution-with-hdmi-dp-or-vga-video-input/',
    },
    {
      quote:
        "Openterface's KVM-GO is a pocket-sized, open source tool for hardware-level access to headless computers.",
      author: 'Hackster News',
      href: 'https://www.hackster.io/news/a-kvm-that-fits-on-your-keychain-e2adb39f7a2b',
    },
    {
      quote:
        'Following the nearly half-million dollar crowdfunding success of the Mini-KVM, Openterface is back with the KVM-GO — a tiny KVM that reduces cable clutter.',
      author: 'Notebookcheck',
      href: 'https://www.notebookcheck.net/KVM-GO-Openterface-is-back-with-a-more-compact-and-refined-KVM.1196402.0.html',
    },
    {
      quote:
        'Keychain-friendly KVM-over-USB gadget comes in a smaller form factor but with upgraded 4K60-capable internals.',
      author: 'Hackster News',
      href: 'https://www.hackster.io/news/techxartisan-is-back-with-a-smaller-yet-more-powerful-openterface-the-openterface-kvm-go-26174b2d11c0',
    },
  ],
  latestNewsHref: 'https://news.openterface.com/',
  latestNewsTitle: 'Latest KVM-GO updates',
  latestNewsSubtitle: 'Production milestones, app releases, and community news.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: 'Features', href: docsPath('/products/kvmgo/features/') },
    { label: 'Beta Quick Start', href: docsPath('/products/kvmgo/beta-quick-start/') },
    { label: 'How to Connect', href: docsPath('/products/kvmgo/how-to-connect/') },
    { label: 'MicroSD Switch', href: docsPath('/products/kvmgo/microsd-switch/') },
    { label: 'Reviews & Media', href: docsPath('/products/kvmgo/reviews/') },
    { label: 'FAQs', href: docsPath('/products/kvmgo/faq/') },
  ],
  legacyBase: '/products/kvmgo/',
};
