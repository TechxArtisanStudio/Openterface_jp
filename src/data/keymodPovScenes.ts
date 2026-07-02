/** POV Stage — pre-composited scene layers + artboard geometry (SSOT). */

export type PovRect = { x: number; y: number; w: number; h: number };

export type KeymodPovPhoneLayout = 'landscape' | 'portrait';

export type KeymodPovSceneId =
  | 'keyboard'
  | 'touchpad'
  | 'km-pro'
  | 'compose-send'
  | 'gamepad'
  | 'presentation'
  | 'terminal'
  | 'ai-chat';

export type KeymodPovScene = {
  id: KeymodPovSceneId;
  /** Flask icon — experimental / preview feature. */
  experimental?: boolean;
  /** When true, tab is omitted from POV stage (scroll-spy may still use the scene). */
  povTabHidden?: boolean;
  /** Monitor bezel + screen content (pre-composited). */
  monitorSrc: string;
  /** Hands + phone UI (pre-composited). */
  phoneSrc: string;
  phoneLayout: KeymodPovPhoneLayout;
};

/** Shared KVM dongle on desk — unchanged from original prop stack. */
export const KEYMOD_POV_PC_SRC = '/keymod/rebirth/pov/pc-with-keymod.webp';

type PovLayerSpec = PovRect & {
  /** hero = monitor (center stage); interactive = PC + phone cluster */
  group: 'hero' | 'interactive';
};

/** Artboard coordinates for composite layers (1938×1695 source space). */
export const KEYMOD_POV_LAYOUT = {
  artboard: { w: 1938, h: 1695 },
  /** Monitor+screen — hero, nudged down from tabs. */
  monitor: { x: -160, y: 35, w: 1240, h: 694, group: 'hero' as const },
  /** Original pc-with-keymod.webp placement (exact). */
  pc: { x: 472, y: 1345, w: 578, h: 298, group: 'interactive' as const },
  /** Original hands-phone position — SSOT for phone bottom baseline. */
  phoneLandscape: { x: 969, y: 1296, w: 969, h: 399, group: 'interactive' as const },
  /** Single-hand portrait — width matches landscape cluster; taller box for hand scale. */
  phonePortrait: { x: 0, y: 0, w: 969, h: 650, group: 'interactive' as const },
};

export const keymodPovScenes: KeymodPovScene[] = [
  {
    id: 'keyboard',
    monitorSrc: '/keymod/rebirth/modes/pov/keyboard-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/keyboard-phone.webp',
    phoneLayout: 'landscape',
  },
  {
    id: 'touchpad',
    monitorSrc: '/keymod/rebirth/modes/pov/touchpad-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/touchpad-phone.webp',
    phoneLayout: 'portrait',
  },
  {
    id: 'km-pro',
    monitorSrc: '/keymod/rebirth/modes/pov/km-pro-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/km-pro-phone.webp',
    phoneLayout: 'landscape',
  },
  {
    id: 'compose-send',
    monitorSrc: '/keymod/rebirth/modes/pov/compose-send-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/compose-send-phone.webp',
    phoneLayout: 'portrait',
  },
  {
    id: 'gamepad',
    monitorSrc: '/keymod/rebirth/modes/pov/gamepad-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/gamepad-phone.webp',
    phoneLayout: 'landscape',
  },
  {
    id: 'presentation',
    monitorSrc: '/keymod/rebirth/modes/pov/presentation-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/presentation-phone.webp',
    phoneLayout: 'portrait',
  },
  {
    id: 'terminal',
    experimental: true,
    monitorSrc: '/keymod/rebirth/modes/pov/terminal-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/terminal-phone.webp',
    phoneLayout: 'portrait',
  },
  {
    id: 'ai-chat',
    experimental: true,
    monitorSrc: '/keymod/rebirth/modes/pov/ai-chat-monitor.webp',
    phoneSrc: '/keymod/rebirth/modes/pov/ai-chat-phone.webp',
    phoneLayout: 'portrait',
  },
];

export const keymodPovVisibleTabScenes = keymodPovScenes.filter((s) => !s.povTabHidden);

/** Scene ids allowed in POV autoplay, tabs, and scroll-spy (respects povTabHidden). */
export const keymodPovAutoplaySceneIds = new Set(keymodPovVisibleTabScenes.map((s) => s.id));

export function isKeymodPovAutoplayScene(id: KeymodPovSceneId): boolean {
  return keymodPovAutoplaySceneIds.has(id);
}

export function povPhoneRectForScene(scene: KeymodPovScene): PovLayerSpec {
  return scene.phoneLayout === 'portrait'
    ? KEYMOD_POV_LAYOUT.phonePortrait
    : KEYMOD_POV_LAYOUT.phoneLandscape;
}

/** Source artboard → browser display (center monitor, tighten vertical rhythm). */
export const KEYMOD_POV_VIEW = {
  w: 2921,
  h: 1175,
  /** Left inset so monitor frame sits at horizontal center of the view. */
  contentOffsetX: 983,
  /** Extra shift for PC + phone cluster (negative = left). */
  interactiveOffsetX: -700,
  /** Lift layers below the monitor without changing their aspect ratio. */
  yPivot: 752,
  yLiftBelowPivot: 530,
};

function mapPovDisplayY(y: number): number {
  if (y <= KEYMOD_POV_VIEW.yPivot) return y;
  return y - KEYMOD_POV_VIEW.yLiftBelowPivot;
}

function mapPovDisplayX(rect: PovLayerSpec): number {
  const base = rect.x + KEYMOD_POV_VIEW.contentOffsetX;
  if (rect.group === 'interactive') {
    return base + KEYMOD_POV_VIEW.interactiveOffsetX;
  }
  return base;
}

function povDisplayPercent(rect: PovLayerSpec) {
  const y = mapPovDisplayY(rect.y);
  const x = mapPovDisplayX(rect);
  const { w, h } = KEYMOD_POV_VIEW;

  return {
    left: (x / w) * 100,
    top: (y / h) * 100,
    width: (rect.w / w) * 100,
    height: (rect.h / h) * 100,
  };
}

export function povRectToCssVars(prefix: string, rect: PovLayerSpec): Record<string, string> {
  const y = mapPovDisplayY(rect.y);
  const x = mapPovDisplayX(rect);
  const { w, h } = KEYMOD_POV_VIEW;

  return {
    [`--pov-${prefix}-left-base`]: `${(x / w) * 100}%`,
    [`--pov-${prefix}-top-base`]: `${(y / h) * 100}%`,
    [`--pov-${prefix}-w-base`]: `${(rect.w / w) * 100}%`,
    [`--pov-${prefix}-h-base`]: `${(rect.h / h) * 100}%`,
  };
}

export function povArtboardCssVars(): Record<string, string> {
  const land = KEYMOD_POV_LAYOUT.phoneLandscape;
  const port = KEYMOD_POV_LAYOUT.phonePortrait;
  const landPct = povDisplayPercent(land);
  const phoneBottom = 100 - landPct.top - landPct.height;
  const phoneCenterX = landPct.left + landPct.width / 2;

  return {
    ...povRectToCssVars('mon', KEYMOD_POV_LAYOUT.monitor),
    ...povRectToCssVars('pc', KEYMOD_POV_LAYOUT.pc),
    '--pov-ph-land-left-base': `${landPct.left}%`,
    '--pov-ph-land-top-base': `${landPct.top}%`,
    '--pov-ph-land-w-base': `${landPct.width}%`,
    '--pov-ph-land-h-base': `${landPct.height}%`,
    '--pov-ph-bottom-base': `${phoneBottom}%`,
    '--pov-ph-center-x': `${phoneCenterX}%`,
    '--pov-ph-port-w-base': `${landPct.width}%`,
    '--pov-ph-port-h-base': `${(port.h / KEYMOD_POV_VIEW.h) * 100}%`,
    '--pov-view-w': String(KEYMOD_POV_VIEW.w),
    '--pov-view-h': String(KEYMOD_POV_VIEW.h),
  };
}

/** @deprecated Use povRectToCssVars — kept for any external callers */
export function povRectToDisplayPercent(rect: PovLayerSpec) {
  const y = mapPovDisplayY(rect.y);
  const x = mapPovDisplayX(rect);
  const { w, h } = KEYMOD_POV_VIEW;

  return {
    left: `${(x / w) * 100}%`,
    top: `${(y / h) * 100}%`,
    width: `${(rect.w / w) * 100}%`,
    height: `${(rect.h / h) * 100}%`,
  };
}
