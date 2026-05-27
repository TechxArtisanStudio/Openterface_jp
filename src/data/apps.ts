import { docsPath, siteConfig } from '../config/site';

export interface AppPlatform {
  name: string;
  description: string;
  docsHref: string;
  downloadLabel: string;
}

export interface KeyCmdMode {
  title: string;
  description: string;
}

export const appHubCards = [
  {
    title: 'KVM Control',
    slug: 'kvm',
    href: '/kvm/',
    description:
      'Host apps for Mini-KVM, KVM-GO, and uConsole KVM Extension — keyboard, video, and mouse over USB with BIOS-level access.',
    highlights: ['Windows · macOS · Linux · Android', 'Open source on GitHub', 'Screen capture & text transfer'],
  },
  {
    title: 'KeyCmd',
    slug: 'keycmd',
    href: '/keycmd/',
    description:
      'Turn your phone or tablet into a keyboard, trackpad, and gamepad for any computer — over USB or Bluetooth with KeyMod hardware.',
    highlights: ['Android & iPadOS beta', 'Shortcut Hub & macros', 'Works with KeyMod, Mini-KVM, KVM-GO'],
  },
] as const;

export const kvmFeatures = [
  'Keyboard, video, and mouse pass-through over USB',
  'BIOS-level access — boot menus and firmware without network KVM',
  'Text transfer via simulated keystrokes (ASCII)',
  'Switchable USB port on supported hardware',
  'Fully open-source host apps on GitHub',
];

export const kvmPlatforms: AppPlatform[] = [
  {
    name: 'Windows',
    description: 'Cross-platform QT host app — installer and portable EXE builds.',
    docsHref: docsPath('/app/kvm/'),
    downloadLabel: 'Downloads on docs',
  },
  {
    name: 'macOS',
    description: 'Native macOS app with App Store and portable DMG options.',
    docsHref: docsPath('/app/kvm/'),
    downloadLabel: 'Downloads on docs',
  },
  {
    name: 'Linux',
    description: 'DEB, RPM, and AppImage packages for AMD64 and ARM64.',
    docsHref: docsPath('/app/kvm/'),
    downloadLabel: 'Downloads on docs',
  },
  {
    name: 'Android',
    description: 'Mobile KVM host for on-the-go access via USB-C.',
    docsHref: docsPath('/app/kvm/'),
    downloadLabel: 'Google Play & APK on docs',
  },
];

export const keycmdModes: KeyCmdMode[] = [
  {
    title: 'Basic',
    description: 'Full-screen keyboard with long-press repeat, key preview, and numpad.',
  },
  {
    title: 'Pro',
    description: 'Composite layout with Shortcut Hub strips, split keyboard, and IME support.',
  },
  {
    title: 'Gamepad',
    description: 'Virtual controller with customizable preset layouts and multi-touchpad support.',
  },
  {
    title: 'Presentation',
    description: 'Slide remote control with timer for Google Slides and other presentation apps.',
  },
  {
    title: 'Voice',
    description: 'Speech-to-keyboard input powered by Whisper API — hands-free typing.',
  },
];

export const keycmdHardware = [
  { name: 'KeyMod Series', href: '/keymod/' },
  { name: 'Mini-KVM', href: '/minikvm/' },
  { name: 'KVM-GO Series', href: '/kvmgo/' },
];

export const appDocsLinks = {
  overview: docsPath('/app/kvm/'),
  updates: docsPath('/app/updates/'),
  keycmdFaq: docsPath('/app/keycmd/faq/'),
  keycmdApk: siteConfig.links.keycmdAndroidApk,
  shop: siteConfig.links.shop,
};
