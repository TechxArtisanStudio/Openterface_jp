import { docsPath, siteConfig } from '../../config/site';
import type { Product } from '../products';

/**
 * KeyMod marketing payload — Phase 1E flat landing at /keymod/.
 * Sourced from docs/products/keymod/ (index, features, use-cases).
 */
export const keymodProduct: Product = {
  slug: 'keymod',
  title: 'Openterface KeyMod Series',
  slogan: 'Turn Your Phone into a Smart Keyboard',
  subtitle: 'Programmable keyboard and mouse control for tech, professionals, and gaming.',
  status: 'pre-launch',
  description:
    'A compact, programmable USB + Bluetooth HID emulator that turns your phone into a portable keyboard and trackpad console. Built on the proven HID core from Openterface Mini-KVM — plug and play, 100% open source.',
  seoDescription:
    'KeyMod Series turns your phone into a portable keyboard and trackpad. USB + Bluetooth HID emulator, open source, perfect for kiosks, smart TVs, and workflow shortcuts.',
  keywords:
    'KeyMod, HID emulator, phone keyboard, Bluetooth keyboard, USB keyboard, portable keyboard, open source, gamepad, macro',
  heroImage: 'https://assets2.openterface.com/images/keymod/2in1.webp',
  heroImages: [
    'https://assets2.openterface.com/images/keymod/2in1.webp',
    'https://assets2.openterface.com/images/keymod/keymod.webp',
    'https://assets2.openterface.com/images/keymod/feature.webp',
  ],
  buyLabel: 'Support NOW',
  buyHref: siteConfig.links.keymodCrowdsupply,
  painPoints: [
    'Carrying a full keyboard for kiosk or TV setup is impractical',
    'Workflow shortcuts need programmable macros on the go',
    'Many HID tools are closed-source with limited customization',
  ],
  solutions: [
    'Use your phone as a portable keyboard and trackpad',
    'USB for reliability, Bluetooth when cable-free matters',
    '100% open source with KeyCmd app profiles and macros',
  ],
  hwFeatures: [
    {
      title: 'Phone as keyboard & trackpad',
      description: 'Full HID keyboard and mouse from your phone — no target software required.',
    },
    {
      title: 'USB + Bluetooth dual connect',
      description: 'Wired USB for low latency; Bluetooth LE when you want a cable-free setup.',
    },
    {
      title: 'True hardware HID',
      description: 'CH9329-based emulation — proven Openterface HID core from Mini-KVM.',
    },
    {
      title: 'Compact pocket form',
      description: '2-in-1 USB A+C or dedicated USB-C variants for laptops, tablets, and phones.',
    },
    {
      title: 'Programmable buttons',
      description: 'Hardware buttons for quick profile or macro triggers in the field.',
    },
    {
      title: 'Open hardware',
      description: 'Schematics, firmware, and BOM published as the project evolves.',
    },
  ],
  swFeatures: [
    {
      title: 'KeyCmd mobile app',
      description: 'Open-source Android & iPadOS app — also works with Mini-KVM and KVM-GO.',
    },
    {
      title: 'Shortcut Hub & macros',
      description: 'App-specific profiles for Blender, KiCAD, Photoshop, VS Code, and more.',
    },
    {
      title: 'Voice & presentation',
      description: 'Speech-to-keyboard (Whisper) and slide remote modes built in.',
    },
  ],
  specs: [
    { label: 'Connectivity', value: 'USB-C (+ USB A on 2-in-1 variant) · Bluetooth HID' },
    { label: 'HID modes', value: 'Keyboard, mouse, gamepad' },
    { label: 'Target device', value: 'Plug-and-play — no software install' },
    { label: 'Host apps', value: 'KeyCmd on Android & iPadOS (beta)' },
    { label: 'Chipset', value: 'CH9329 HID emulator + Bluetooth module' },
    { label: 'License', value: 'Open source hardware & software' },
  ],
  useCases: [
    'Outdoor display computers',
    'LED signage players',
    'Kiosk configuration',
    'Smart TVs & set-top boxes',
    'Quick workflow shortcuts',
  ],
  useCaseCards: [
    {
      title: 'Outdoor display computers',
      description: 'Configure and troubleshoot outdoor PCs without carrying a keyboard.',
      href: docsPath('/products/keymod/use-cases/'),
    },
    {
      title: 'LED signage players',
      description: 'On-site updates to signage controllers — phone as full keyboard.',
      href: docsPath('/products/keymod/use-cases/'),
    },
    {
      title: 'Kiosks',
      description: 'Debug, configure, or maintain kiosks with immediate HID access.',
      href: docsPath('/products/keymod/use-cases/'),
    },
    {
      title: 'Smart TVs & set-top boxes',
      description: 'Full keyboard and trackpad when the remote is not enough.',
    },
    {
      title: 'Quick workflow shortcuts',
      description: 'Developers and IT staff — occasional input without extra gear.',
      href: docsPath('/products/keymod/use-cases/'),
    },
    {
      title: 'Portable & plug-and-play',
      description: 'Your phone is always with you; KeyMod stays compact in your bag.',
    },
  ],
  useCasesDocsHref: docsPath('/products/keymod/use-cases/'),
  specsDocsHref: docsPath('/products/keymod/features/'),
  docsOverviewHref: docsPath('/products/keymod/'),
  videoProductSlug: 'keymod',
  videoSectionTitle: 'Community reviews & demos',
  latestNewsHref: 'https://news.openterface.com/',
  latestNewsTitle: 'Latest KeyMod updates',
  latestNewsSubtitle: 'Beta releases, app updates, and pre-launch news.',
  latestNewsLabel: 'Read on Openterface News →',
  docLinks: [
    { label: 'Features', href: docsPath('/products/keymod/features/') },
    { label: "What's in the Box", href: docsPath('/products/keymod/whats-in-the-box/') },
    { label: 'How to Connect', href: docsPath('/products/keymod/how-to-connect/') },
    { label: 'Use Cases', href: docsPath('/products/keymod/use-cases/') },
    { label: 'FAQs', href: docsPath('/products/keymod/faq/') },
  ],
  legacyBase: '/products/keymod/',
};
