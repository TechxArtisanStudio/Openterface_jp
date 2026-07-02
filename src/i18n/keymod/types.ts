import type { KeymodPovSceneId } from '../../data/keymodPovScenes';

export type KeymodDemoLink = { label: string; href: string; description?: string };

export type KeymodPovTabs = Record<KeymodPovSceneId, string>;

export type KeymodTimelineStatus = 'done' | 'pivot' | 'upcoming';

export type KeymodTimelineMilestone = {
  id: string;
  status: KeymodTimelineStatus;
  title: string;
  lead?: string;
  timingLabel?: string;
  href?: string;
  badge?: string;
  variant?: 'beta';
};

export type KeymodProductJourney = {
  eyebrow: string;
  title: string;
  subtitle: string;
  scrollHint: string;
  nowLabel: string;
  nowSublabel: string;
  milestones: KeymodTimelineMilestone[];
};

export type KeymodFirmwareRoadmap = {
  eyebrow: string;
  title: string;
  subtitle: string;
  chipsLabel: string;
  chips: string[];
  forumPrompt: string;
  forumCta: string;
  forumNewBadge: string;
};

/** @deprecated Use KeymodProductJourney */
export type KeymodProductTimeline = KeymodProductJourney;

export type ComposeTargetScenario = 'terminal' | 'markdown' | 'browser' | 'apiKey';

export type KeymodLandingStrings = {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    docs: string;
    preLaunchCta: string;
  };
  povTabs: KeymodPovTabs;
  hero: {
    productName: string;
    tagline: string;
    equationPlus: string;
    equationEquals: string;
    headline?: string;
    lead: string;
    docsCta: string;
    preLaunchCta: string;
  };
  whatItIs: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: { title: string; body: string }[];
  };
  skuCompare: {
    eyebrow: string;
    title: string;
    stackLine: string;
    crowdSupplyCta: string;
    mini: { name: string; port: string; audience: string; connect: string; tagline: string };
    plus: { name: string; port: string; audience: string; connect: string; tagline: string };
  };
  scenarios: {
    eyebrow: string;
    title: string;
    items: { title: string; body: string; imageLabel: string }[];
  };
  modesTheater: {
    eyebrow: string;
    title: string;
    subtitleLines: [string, string];
    basic: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    touchpad: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    kmPro: { badge: string; title: string; lead: string; body: string; mediaLabel: string };
    composeSend: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    proTerminal: { badge: string; title: string; lead: string; body: string; mediaLabel: string };
    opsZone: {
      eyebrow: string;
      intro: { title: string; body: string };
      compose: {
        badge: string;
        title: string;
        body: string;
        demoLinks?: KeymodDemoLink[];
        demoText: string;
        terminalPrompt: string;
        targets: {
          terminal: { title: string };
          markdown: { title: string };
          browser: { title: string };
          apiKey: { title: string; fieldLabel: string; buttonLabel: string };
        };
        sendLabel: string;
        bridgeLabel: string;
        stopLabel: string;
        autoSendHint: string;
        interactiveDemoLabel: string;
        progressRemainingLabel: string;
        savedTextsTitle: string;
        loadLabel: string;
        sendSelectedLabel: string;
        backLabel: string;
        openLibraryLabel: string;
        libraryHint: string;
        selectFirstHint: string;
        templates: {
          id: string;
          title: string;
          pinned: boolean;
          meta: string;
          content: string;
          scenario: ComposeTargetScenario;
          scenarioLabel: string;
        }[];
      };
      terminal: {
        badge: string;
        title: string;
        body: string;
        experimentalHint: string;
        demo: {
          interactiveDemoLabel: string;
          title: string;
          summary: string;
          statusDisconnected: string;
          statusConnecting: string;
          statusConnected: string;
          demoBleLabel: string;
          demoUsbLabel: string;
          transportBle: string;
          transportUsb: string;
          uiFidelityNote: string;
          ctrlLabel: string;
          escLabel: string;
          tabLabel: string;
        };
        usb: { label: string; body: string };
        ble: { label: string; body: string };
        notice: string;
      };
    };
    agentZone: {
      eyebrow: string;
      intro: { title: string; body: string };
      agent: {
        badge: string;
        title: string;
        body: string;
        notice: string;
        capabilities: { label: string; body: string }[];
        demo: {
          interactiveDemoLabel: string;
          overlayTitle: string;
          overlaySummary: string;
          sessionSubtitle: string;
          connectionReady: string;
          pickerHint: string;
          planLabel: string;
          actPrompt: string;
          approveLabel: string;
          editPlanLabel: string;
          cancelLabel: string;
          terminalExecutingLabel: string;
          macroExecutingLabel: string;
          uiFidelityNote: string;
        };
      };
    };
    gameZone: {
      eyebrow: string;
      presets: { title: string; body: string; layouts: { label: string; imageSrc: string; imageAlt: string }[] };
      editor: {
        title: string;
        body: string;
        panels: { imageSrc: string; imageAlt: string; caption: string }[];
      };
      share: { title: string; body: string };
    };
    gamepad: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks: KeymodDemoLink[];
    };
    presentation: {
      badge: string;
      title: string;
      lead: string;
      body: string;
      mediaLabel: string;
      demoLinks?: KeymodDemoLink[];
    };
    aiChat: { badge: string; title: string; lead: string; body: string; mediaLabel: string };
  };
  firmwareRoadmap: KeymodFirmwareRoadmap;
  productJourney: KeymodProductJourney;
  socialProof: {
    eyebrow: string;
    title: string;
    followIg: string;
    viewAllMedia: string;
    fallbackNote: string;
    viewOnInstagram: string;
    viewProfile: string;
    viewPostOnInstagram: string;
  };
  keycmdBridge: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    mediaLabel: string;
  };
  crowdSupplyCampaign: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  crowdSupplySupport: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  crowdSupplyOpensource: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    badgesLabel: string;
    osiAlt: string;
    oshAlt: string;
  };
  productLine: {
    eyebrow: string;
    title: string;
    body: string;
    minikvmCta: string;
    kvmgoCta: string;
  };
  subscribe: {
    eyebrow: string;
    title: string;
    description: string;
    benefits: string[];
    submitLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    footnote: string;
    crowdSupplyPrompt: string;
    crowdSupplyLink: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    ctaPrimary: string;
    ctaKeycmd: string;
    forumCta: string;
    discordCta: string;
    forumNewBadge: string;
    legal: string;
  };
};
