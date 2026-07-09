import { docsPath } from '../../config/site';
import { siteConfig } from '../../config/site';

/** Outbound URLs — never hand-build in components. */
export const keymodLinks = {
  crowdSupply: siteConfig.links.keymodCrowdsupply,
  crowdSupplyIcon: '/keymod/badges/crowd-supply-icon.svg',
  openSourceInitiative: '/keymod/badges/open-source-initiative.svg',
  openSourceHardware: '/keymod/badges/open-source-hardware.svg',
  keycmd:
    'https://openterface.com/keycmd/?utm_source=openterfaceapps/?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-to-keycmd#keycmdutm_medium=keymod-landingapps/?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-to-keycmd#keycmdutm_campaign=keymod-to-keycmd',
  docs:
    `${docsPath('/products/keymod/')}?utm_source=openterface&utm_medium=landing&utm_campaign=keymod-landing-v2`,
  discord: 'https://discord.gg/sFTU7O8Xe3',
  forum:
    'https://forum.openterface.com?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-firmware-roadmap',
  forumFooter:
    'https://forum.openterface.com?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-footer',
  minikvm: '/minikvm/',
  kvmgo: '/kvmgo/',
  gamepadTutorial:
    `${docsPath('/tutorial/keymod/08-gamepad/')}?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-game-zone`,
  gamepadDemo: 'https://www.instagram.com/p/DY7XsRIBQi6/',
  /** Temporary POV demos — @techxartisan / curated IG until final video assets ship. */
  keymodIntroReel: 'https://www.instagram.com/reel/DUH77BoiarV/',
  homelabKeyboardDemo: 'https://www.instagram.com/p/DZGUTGAM45Z/',
  composeSendDemo: 'https://www.instagram.com/p/DZNZVbUBBxD/',
  composeSendCodeReel: 'https://www.instagram.com/techxartisan/reel/DYXUmH2zSzD/',
  composeSendBatchRenameDemo: 'https://x.com/TechxArtisan/status/2057121671400554849',
  presentationTutorial:
    `${docsPath('/tutorial/keymod/10-presentation/')}?utm_source=openterface&utm_medium=keymod-landing&utm_campaign=keymod-pov-demo`,
} as const;