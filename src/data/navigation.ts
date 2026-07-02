import { siteConfig } from '../config/site';
import { buildEcosystemNav, type NavItem } from '../lib/ecosystem-nav';
import * as navModule from '../i18n/nav';

export type { NavItem };

const navLabels =
  'localeNavLabels' in navModule && siteConfig.locale !== 'en'
    ? navModule.localeNavLabels
    : navModule.enNavLabels;

export const mainNav: NavItem[] = buildEcosystemNav('marketing', siteConfig.locale, navLabels);
