import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

const KVMEXT_SHOP =
  'https://shop.techxartisan.com/products/openterface-kvm-ext-for-uconsole';

/**
 * KVM Extension (uConsole) marketing payload — Phase 1F flat landing at /kvmext/.
 * Sourced from docs/products/kvmext/ (index, features).
 */
export const kvmextProduct: Product = {
  slug: 'uconsole-kvm-extension',
  title: 'Openterface KVM Extension for uConsole',
  slogan: 'Transform Your uConsole into a Portable KVM Console',
  subtitle: 'Plug in. Take Control. Anywhere.',
  status: 'oshwa',
  description:
    'Replaces the 4G/LTE modem in your Clockwork uConsole expansion slot with direct HDMI input and USB HID control. Manage headless devices on the go — no external monitor, keyboard, or network configuration required.',
  seoDescription:
    'Openterface KVM Extension turns the Clockwork uConsole into a portable KVM console. HDMI capture, USB HID, BIOS-level access, OSHWA certified open hardware.',
  keywords:
    'uConsole KVM, KVM extension, portable KVM, Clockwork uConsole, HDMI KVM, USB HID, headless control, OSHWA',
  heroImage:
    'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
  heroImages: [
    'https://assets.openterface.com/images/uconsole-kvm-extension/uconsole-kvm-extension-1.webp',
    'https://assets.openterface.com/images/product/openterface-kvm-uconsole-extension.webp',
  ],
  buyLabel: 'Order NOW',
  buyHref: KVMEXT_SHOP,
  painPoints: [
    'Portable consoles lack integrated KVM for headless targets',
    'Field technicians carry separate monitors and keyboards for every fix',
    'Network KVM needs configuration — useless when the target is offline',
  ],
  solutions: [
    'Native uConsole expansion board — screen and keyboard already built in',
    'Direct HDMI + USB HID with no software on the target device',
    'OSHWA-certified open hardware with full install and setup docs',
  ],
  hwFeatures: [
    {
      title: 'Direct HDMI + USB HID',
      description:
        'Leverage the uConsole screen and controls with HDMI capture and full keyboard/mouse emulation.',
    },
    {
      title: '4G/LTE slot form factor',
      description: '37 × 77 mm PCB — drops into the uConsole expansion bay, no external cables to the host.',
    },
    {
      title: 'BIOS-level access',
      description: 'Reach firmware, boot menus, and recovery screens without network dependencies.',
    },
    {
      title: 'Switchable USB 2.0 port',
      description: 'Share USB storage between uConsole and target via the host app.',
    },
    {
      title: 'Network-free control',
      description: 'Stable headless access via HDMI capture and HID — no IP setup required.',
    },
    {
      title: 'OSHWA certified',
      description: 'Open Source Hardware Association UID CN000021 — schematics and firmware published.',
    },
  ],
  swFeatures: [
    {
      title: 'Openterface host apps',
      description: 'Same trusted QT stack as Mini-KVM and KVM-GO — macOS, Windows, Linux, Android.',
    },
    {
      title: 'Text transfer',
      description: 'Send usernames, passwords, and code snippets via simulated keystrokes (ASCII).',
    },
    {
      title: 'Setup guides on docs',
      description: 'Step-by-step hardware installation and software setup walkthroughs.',
    },
  ],
  specs: [
    { label: 'Compatibility', value: 'Clockwork uConsole (4G/LTE expansion slot)' },
    { label: 'Dimensions', value: '37 × 77 mm · 1.0 mm PCB' },
    { label: 'Video input', value: 'Up to 4K @ 30 Hz (HDMI)' },
    { label: 'Video output', value: '1080p @ 30 Hz, <140 ms latency' },
    { label: 'Certification', value: 'OSHWA UID CN000021' },
    { label: 'Target software', value: 'None required — plug and play' },
  ],
  useCases: ['Portable datacenter tool', 'Maker & homelab on the go'],
  useCaseCards: [
    {
      title: 'Portable datacenter tool',
      description: 'Walk racks with your uConsole — one device for display, keyboard, and KVM.',
      href: docsPath('/products/kvmext/'),
    },
    {
      title: 'Maker & homelab on the go',
      description: 'Configure headless SBCs, NAS nodes, and lab gear from a pocketable console.',
      href: docsPath('/products/kvmext/features/'),
    },
    {
      title: 'Field IT & MSP visits',
      description: 'BIOS access and quick fixes without hauling a crash cart.',
    },
    {
      title: 'Network-free troubleshooting',
      description: 'When the target has no IP — HDMI + HID still works.',
      href: docsPath('/products/kvmext/connect-to-target/'),
    },
  ],
  useCasesDocsHref: docsPath('/products/kvmext/'),
  specsDocsHref: docsPath('/products/kvmext/features/'),
  docsOverviewHref: docsPath('/products/kvmext/'),
  videoProductSlug: 'uconsole-kvm-extension',
  videoSectionTitle: 'Installation & community demos',
  latestNewsHref: `${siteConfig.links.news}/products/kvmext/2025-08-28-oshwa-certification/`,
  latestNewsTitle: 'OSHWA certification achieved',
  latestNewsSubtitle: 'Official Open Source Hardware Association certification for the uConsole KVM Extension.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: 'Features', href: docsPath('/products/kvmext/features/') },
    { label: "What's in the Box", href: docsPath('/products/kvmext/whats-in-the-box/') },
    { label: 'Hardware Installation', href: docsPath('/products/kvmext/hardware-installation/') },
    { label: 'Software Setup', href: docsPath('/products/kvmext/software-setup/') },
    { label: 'How to Connect', href: docsPath('/products/kvmext/connect-to-target/') },
    { label: 'FAQs', href: docsPath('/products/kvmext/faq/') },
  ],
  legacyBase: '/products/kvmext/',
};
