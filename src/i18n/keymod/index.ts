import { siteConfig } from '../../config/site';
import { en } from './en';
import { de } from './de';
import { es } from './es';
import { fr } from './fr';
import { it } from './it';
import { ja } from './ja';
import { ko } from './ko';
import { pt } from './pt';
import { ro } from './ro';
import { zh } from './zh';
import { hk } from './hk';
import { tw } from './tw';
import { ru } from './ru';
import { ar } from './ar';
import { tr } from './tr';
import { pl } from './pl';
import { nl } from './nl';
import type { KeymodLandingStrings } from './types';

export * from './types';
export * from './links';

const translations: Record<string, KeymodLandingStrings> = {
    en,
  de,
  es,
  fr,
  it,
  ja,
  ko,
  pt,
  ro,
  zh,
  hk,
  tw,
  ru,
  ar,
  tr,
  pl,
  nl
};

export function getKeymodLanding(locale = siteConfig.locale): KeymodLandingStrings {
  return translations[locale] ?? en;
}

export const keymodLanding = getKeymodLanding();
