import { trackKeymodTheaterNav } from './keymod-analytics';

type KmNavTheme = 'default' | 'ops' | 'agent' | 'game';

let navEl: HTMLElement | null = null;
let zoneEls: HTMLElement[] = [];
let rafId: number | null = null;
let boundOnScroll: (() => void) | null = null;
let boundOnResize: (() => void) | null = null;

function getNavHeight(): number {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--km-nav-height').trim();
  if (raw.endsWith('rem')) {
    const rem = parseFloat(raw);
    const rootFont = parseFloat(getComputedStyle(root).fontSize) || 16;
    return rem * rootFont;
  }
  if (raw.endsWith('px')) return parseFloat(raw);
  return 72;
}

/**
 * Theme activates when the sticky nav bottom edge (activation line) sits
 * inside a zone — not when the zone merely enters the lower viewport.
 */
function resolveActiveTheme(): KmNavTheme {
  const activationY = navEl ? navEl.getBoundingClientRect().bottom : getNavHeight();

  for (const zone of zoneEls) {
    const name = zone.getAttribute('data-km-zone');
    if (name !== 'ops' && name !== 'agent' && name !== 'game') continue;

    const { top, bottom } = zone.getBoundingClientRect();
    if (top <= activationY && bottom > activationY) {
      return name;
    }
  }

  return 'default';
}

function applyTheme(theme: KmNavTheme): void {
  if (!navEl) return;
  if (navEl.dataset.kmNavTheme === theme) return;
  navEl.dataset.kmNavTheme = theme;
  document.body.dataset.kmActiveZone = theme;
  if (theme === 'ops' || theme === 'agent' || theme === 'game') {
    trackKeymodTheaterNav(theme);
  }
}

function updateTheme(): void {
  applyTheme(resolveActiveTheme());
}

function scheduleUpdate(): void {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    updateTheme();
  });
}

function teardown(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  if (boundOnScroll) {
    window.removeEventListener('scroll', boundOnScroll);
    boundOnScroll = null;
  }
  if (boundOnResize) {
    window.removeEventListener('resize', boundOnResize);
    boundOnResize = null;
  }
  navEl = null;
  zoneEls = [];
}

export function initKeymodZoneNav(): void {
  teardown();

  const nav = document.querySelector<HTMLElement>('.km-nav');
  const zones = [...document.querySelectorAll<HTMLElement>('[data-km-zone]')];
  if (!nav || zones.length === 0) return;

  navEl = nav;
  zoneEls = zones;

  boundOnScroll = scheduleUpdate;
  boundOnResize = scheduleUpdate;

  window.addEventListener('scroll', boundOnScroll, { passive: true });
  window.addEventListener('resize', boundOnResize, { passive: true });

  applyTheme('default');
  updateTheme();
}
