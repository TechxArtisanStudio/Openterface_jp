import { keycmdDownloadSection, kvmDownloadSection, type AppDownloadSection } from './apps';

export const APP_LOGO_PLACEHOLDER = 'https://assets.openterface.com/images/app-logo.webp';

export const appsMegaMenuSections: AppDownloadSection[] = [kvmDownloadSection, keycmdDownloadSection];

export function appFlatPath(id: string): string {
  return `/${id}/`;
}

export interface CuratedPlatformTile {
  name: string;
  href?: string;
  label?: string;
  comingSoon?: boolean;
  external?: boolean;
}

export function platformSlug(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

function shortDownloadLabel(label: string): string {
  if (/install from app store/i.test(label)) return 'App Store';
  if (/install from google play/i.test(label)) return 'Google Play';
  if (/portable dmg/i.test(label)) return 'Portable DMG';
  if (/installer/i.test(label)) return 'Installer';
  if (/beta apk/i.test(label)) return 'Beta APK';
  if (/portable exe/i.test(label)) return 'Portable EXE';
  const stripped = label.replace(/^download\s+/i, '').replace(/\s+v[\d.]+.*$/i, '').trim();
  return stripped || label;
}

export function getCuratedTiles(section: AppDownloadSection): CuratedPlatformTile[] {
  return section.platforms.map((platform) => {
    if (platform.downloads.length === 0) {
      return { name: platform.name, comingSoon: true };
    }

    if (section.id === 'kvm' && platform.name === 'Linux') {
      return {
        name: platform.name,
        href: `${appFlatPath(section.id)}#linux`,
        label: 'All Linux packages',
        external: false,
      };
    }

    const primary = platform.downloads[0];
    return {
      name: platform.name,
      href: primary.href,
      label: shortDownloadLabel(primary.label),
      external: primary.external,
    };
  });
}
