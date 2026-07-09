import { docsPath, siteConfig } from '../config/site';
import appVersions from '../config/app-versions.generated.json';

/** Latest release tags from scripts/sync-app-versions.mjs (predev / prebuild). */
export const appReleaseVersions = {
  qt: appVersions.qt_version,
  android: appVersions.android_version,
  macos: appVersions.macos_version,
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
  docsHref: string;
  docsLabel: string;
  platforms: AppPlatformDownloads[];
}

export const kvmDownloadSection: AppDownloadSection = {
  id: 'kvm',
  title: 'Openterface KVM',
  description:
    'Host apps for Mini-KVM, KVM-GO, and uConsole KVM Extension — keyboard, video, and mouse over USB.',
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
    {
      name: 'iPadOS',
      description: 'Native iPad host app for Openterface KVM over USB-C.',
      downloads: [],
    },
    {
      name: 'Web',
      description: 'Open a browser, connect to your KVM device, and control it — no install.',
      downloads: [],
    },
  ],
};

export const keycmdDownloadSection: AppDownloadSection = {
  id: 'keycmd',
  title: 'KeyCmd',
  description:
    'Turn your phone or tablet into a keyboard, trackpad, and gamepad — with KeyMod, Mini-KVM, or KVM-GO.',
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
      name: 'iOS',
      description: 'KeyCmd for iPhone — Bluetooth LE or USB-C.',
      downloads: [],
    },
  ],
};

export const appDownloadSections: AppDownloadSection[] = [kvmDownloadSection, keycmdDownloadSection];

export const appDocsLinks = {
  overview: docsPath('/app/kvm/'),
  updates: docsPath('/app/updates/'),
  keycmdFaq: docsPath('/app/keycmd/faq/'),
  keycmdApk: siteConfig.links.keycmdAndroidApk,
  shop: siteConfig.links.shop,
};
