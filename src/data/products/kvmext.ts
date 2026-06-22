import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

/**
 * KVM Extension Module v2 (uConsole) marketing payload — flat landing at /kvmext/.
 * Sourced from docs/products/kvmext/ (index, features).
 */
export const kvmextProduct: Product = {
  slug: 'uconsole-kvm-extension',
  title: 'Openterface uConsole KVM Extension Module v2',
  slogan: 'Transform Your uConsole into a Portable KVM Console',
  subtitle: 'KVM. Network. SD Card. One Expansion Slot.',
  status: 'shipping',
  description:
    'Extension Module v2 plugs into your Clockwork uConsole expansion slot with HDMI KVM, dual Ethernet (100M + 1000M cards included), SD card read/write, and USB 2.0 switching — powered from the slot with no external adapter.',
  seoDescription:
    'Openterface uConsole KVM Extension Module v2: portable KVM console, dual Ethernet, SD card utility, 1080p @ 60 Hz, under 70 ms latency. Order from TechxArtisan Shop.',
  keywords:
    'uConsole KVM v2, KVM extension, portable KVM, Clockwork uConsole, Ethernet expansion, SD card, HDMI KVM, USB HID, headless control',
  heroImage: 'https://assets.openterface.com/images/product/kvmext-v2/kvmext-v2-hero-1.webp',
  heroImages: [
    'https://assets.openterface.com/images/product/kvmext-v2/kvmext-v2-hero-1.webp',
    'https://assets.openterface.com/images/product/kvmext-v2/kvmext-v2-use-case-1.webp',
    'https://assets.openterface.com/images/product/kvmext-v2/kvmext-v2-pcb-front.webp',
  ],
  buyLabel: 'Order NOW',
  buyHref: siteConfig.links.kvmextPurchase,
  painPoints: [
    'Portable consoles lack integrated KVM for headless targets',
    'Field techs carry monitors, keyboards, and card readers to every site',
    'Network KVM needs configuration — useless when the target is offline',
  ],
  solutions: [
    'Native uConsole expansion — screen, keyboard, and trackball built in',
    'KVM + Ethernet + SD card in one 77.3 × 34.7 mm module',
    'Direct HDMI + USB HID with no software on the target device',
  ],
  hwFeatures: [
    {
      title: 'Direct HDMI + USB HID',
      description:
        'View and control targets through the uConsole screen with full keyboard/mouse emulation — BIOS-level access included.',
    },
    {
      title: 'Dual Ethernet cards',
      description:
        '100M and 1000M cards included in every box. 100M works on all base boards; 1000M needs the HackerGadgets Upgrade Kit.',
    },
    {
      title: 'SD card read/write',
      description: 'Flash images, export logs, and transfer files without an external card reader.',
    },
    {
      title: 'USB 2.0 shared switching',
      description: 'Switch USB storage between uConsole and target via the host app.',
    },
    {
      title: 'Low latency 60 Hz',
      description: '1080p @ 60 Hz output with under 70 ms latency for responsive maintenance and debug.',
    },
    {
      title: 'OSHWA certified line',
      description: 'Open Source Hardware Association UID CN000021 — open schematics and host apps.',
    },
  ],
  swFeatures: [
    {
      title: 'Openterface QT on uConsole',
      description: 'Install on your uConsole for KVM, SD switching, and USB sharing — same stack as Mini-KVM and KVM-GO.',
    },
    {
      title: 'Text transfer',
      description: 'Send usernames, passwords, and code snippets via simulated keystrokes (ASCII).',
    },
    {
      title: 'Full docs on docs.openterface.com',
      description: 'Hardware install, Ethernet guide, SD card guide, and troubleshooting walkthroughs.',
    },
  ],
  specs: [
    { label: 'Compatibility', value: 'Clockwork uConsole (expansion slot)' },
    { label: 'Dimensions', value: '77.3 × 34.7 mm' },
    { label: 'Video input', value: 'Up to 4K @ 30/60 Hz (HDMI)' },
    { label: 'Video output', value: '1080p @ 60 Hz, <70 ms latency' },
    { label: 'Network', value: '100M + 1000M cards included' },
    { label: 'Target software', value: 'None required — plug and play' },
  ],
  useCases: ['Field IT & network debug', 'SD imaging on the go'],
  useCaseCards: [
    {
      title: 'Field IT & network debug',
      description: 'KVM for BIOS access plus Ethernet for SSH and web management — one pocketable device.',
      href: docsPath('/products/kvmext/use-cases/'),
    },
    {
      title: 'SD imaging on the go',
      description: 'Write OS images and move logs from your uConsole without a separate card reader.',
      href: docsPath('/products/kvmext/sd-card/'),
    },
    {
      title: 'Homelab & embedded debug',
      description: 'Configure headless SBCs and lab gear from the uConsole you already carry.',
      href: docsPath('/products/kvmext/features/'),
    },
    {
      title: 'Network-free troubleshooting',
      description: 'When the target has no IP — HDMI + HID still works.',
      href: docsPath('/products/kvmext/connect-to-target/'),
    },
  ],
  socialProofTitle: 'What early users say',
  socialProof: [
    {
      quote: 'Works flawlessly and makes the uConsole really useful!',
      author: 'Verified buyer',
      source: 'TechxArtisan Shop',
    },
    {
      quote: 'A mandatory add-on for the IT pro. No more looking for a monitor or keyboard!',
      author: 'Verified buyer',
      source: 'TechxArtisan Shop',
    },
  ],
  useCasesDocsHref: docsPath('/products/kvmext/use-cases/'),
  specsDocsHref: docsPath('/products/kvmext/features/'),
  docsOverviewHref: docsPath('/products/kvmext/'),
  videoProductSlug: 'uconsole-kvm-extension',
  videoSectionTitle: 'Installation & community demos',
  latestNewsHref: `${siteConfig.links.news}/products/kvmext/2026-06-22-extension-module-v2-launch/`,
  latestNewsTitle: 'Extension Module v2 now shipping',
  latestNewsSubtitle:
    'Dual Ethernet, SD card, 60 Hz output — the next-generation uConsole KVM expansion is available now.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: 'Features', href: docsPath('/products/kvmext/features/') },
    { label: 'Ethernet Guide', href: docsPath('/products/kvmext/ethernet/') },
    { label: 'SD Card Guide', href: docsPath('/products/kvmext/sd-card/') },
    { label: 'Purchase Options', href: docsPath('/products/kvmext/purchase-options/') },
    { label: 'Hardware Installation', href: docsPath('/products/kvmext/hardware-installation/') },
    { label: 'FAQs', href: docsPath('/products/kvmext/faq/') },
  ],
  legacyBase: '/products/kvmext/',
};
