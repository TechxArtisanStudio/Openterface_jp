import { docsPath, siteConfig } from '../config/site';

/** Bump when docs app-versions.generated.json changes (qt / android). */
export const appReleaseVersions = {
  qt: '0.5.25',
  android: 'v1.2.2',
} as const;

const qtBase = `https://github.com/TechxArtisanStudio/Openterface_QT/releases/download/${appReleaseVersions.qt}`;
const androidApk = `https://github.com/TechxArtisanStudio/Openterface_Android/releases/download/${appReleaseVersions.android}/OpenterfaceAndroid-release.apk`;

export interface AppDownloadLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface AppPlatformDownloads {
  name: string;
  description: string;
  downloads: AppDownloadLink[];
  repo?: AppDownloadLink;
}

export interface AppDownloadSection {
  id: string;
  title: string;
  description: string;
  storyHref: string;
  storyLabel: string;
  docsHref: string;
  docsLabel: string;
  platforms: AppPlatformDownloads[];
}

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
    title: 'Openterface KVM',
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

export const kvmDownloadSection: AppDownloadSection = {
  id: 'kvm-control',
  title: 'Openterface KVM',
  description:
    'Host apps for Mini-KVM, KVM-GO, and uConsole KVM Extension — keyboard, video, and mouse over USB.',
  storyHref: '/kvm/',
  storyLabel: 'Openterface KVM overview →',
  docsHref: docsPath('/app/kvm/'),
  docsLabel: 'Install guides & FAQs on docs →',
  platforms: [
    {
      name: 'Windows',
      description: 'Cross-platform QT host — installer and portable EXE.',
      downloads: [
        {
          label: `Download ${appReleaseVersions.qt} Installer`,
          href: `${qtBase}/openterfaceQT_windows_amd64_installer.exe`,
          external: true,
        },
        {
          label: `Download ${appReleaseVersions.qt} Portable EXE`,
          href: `${qtBase}/openterfaceQT_windows_amd64_portable.exe`,
          external: true,
        },
      ],
      repo: {
        label: 'Openterface_QT',
        href: 'https://github.com/TechxArtisanStudio/Openterface_QT',
        external: true,
      },
    },
    {
      name: 'macOS',
      description: 'Native macOS app — App Store and portable DMG.',
      downloads: [
        {
          label: 'Install from App Store',
          href: 'https://apps.apple.com/us/app/openterface-mini-kvm/id6478481082',
          external: true,
        },
        {
          label: 'Download portable DMG',
          href: 'https://github.com/TechxArtisanStudio/Openterface_MacOS/releases',
          external: true,
        },
      ],
      repo: {
        label: 'Openterface_MacOS',
        href: 'https://github.com/TechxArtisanStudio/Openterface_MacOS',
        external: true,
      },
    },
    {
      name: 'Linux',
      description: 'DEB, RPM, and AppImage for AMD64 and ARM64.',
      downloads: [
        {
          label: `${appReleaseVersions.qt} AMD64 DEB`,
          href: `${qtBase}/openterfaceQT_linux_amd64.deb`,
          external: true,
        },
        {
          label: `${appReleaseVersions.qt} AMD64 RPM`,
          href: `${qtBase}/openterfaceQT_linux_amd64.rpm`,
          external: true,
        },
        {
          label: `${appReleaseVersions.qt} AMD64 AppImage`,
          href: `${qtBase}/openterfaceQT_linux_amd64.AppImage`,
          external: true,
        },
        {
          label: `${appReleaseVersions.qt} ARM64 DEB`,
          href: `${qtBase}/openterfaceQT_linux_arm64.deb`,
          external: true,
        },
        {
          label: `${appReleaseVersions.qt} ARM64 AppImage`,
          href: `${qtBase}/openterfaceQT_linux_arm64.AppImage`,
          external: true,
        },
      ],
      repo: {
        label: 'Openterface_QT',
        href: 'https://github.com/TechxArtisanStudio/Openterface_QT',
        external: true,
      },
    },
    {
      name: 'Android',
      description: 'Mobile KVM host via USB-C.',
      downloads: [
        {
          label: 'Install from Google Play',
          href: 'https://play.google.com/store/apps/details?id=com.openterface.AOS',
          external: true,
        },
        {
          label: `Download ${appReleaseVersions.android} APK`,
          href: androidApk,
          external: true,
        },
      ],
      repo: {
        label: 'Openterface_Android',
        href: 'https://github.com/TechxArtisanStudio/Openterface_Android',
        external: true,
      },
    },
  ],
};

export const keycmdDownloadSection: AppDownloadSection = {
  id: 'keycmd',
  title: 'KeyCmd',
  description:
    'Turn your phone or tablet into a keyboard, trackpad, and gamepad — with KeyMod, Mini-KVM, or KVM-GO.',
  storyHref: '/keycmd/',
  storyLabel: 'KeyCmd overview →',
  docsHref: docsPath('/app/keycmd/'),
  docsLabel: 'Install guides & FAQs on docs →',
  platforms: [
    {
      name: 'Android',
      description: 'Beta APK with keyboard, trackpad, gamepad, macros, and voice input.',
      downloads: [
        {
          label: 'Download beta APK (v0.19)',
          href: siteConfig.links.keycmdAndroidApk,
          external: true,
        },
      ],
    },
    {
      name: 'iOS / iPadOS',
      description: 'KeyCmd for iPhone and iPad — Bluetooth LE or USB-C.',
      downloads: [],
    },
  ],
};

export const appDownloadSections: AppDownloadSection[] = [kvmDownloadSection, keycmdDownloadSection];

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
