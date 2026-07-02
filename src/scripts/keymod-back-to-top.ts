type KmZoneTheme = 'default' | 'ops' | 'game';

let btnEl: HTMLButtonElement | null = null;
let zoneEls: HTMLElement[] = [];
let cookieBannerEl: HTMLElement | null = null;
let rafId: number | null = null;
let boundOnScroll: (() => void) | null = null;
let boundOnResize: (() => void) | null = null;
let boundOnClick: (() => void) | null = null;
let cookieObserver: MutationObserver | null = null;

const SCROLL_THRESHOLD_RATIO = 0.75;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getScrollThreshold(): number {
  return window.innerHeight * SCROLL_THRESHOLD_RATIO;
}

function isCookieBannerVisible(): boolean {
  if (!cookieBannerEl) return false;
  return !cookieBannerEl.hidden && cookieBannerEl.getAttribute('aria-hidden') !== 'true';
}

/**
 * Activation line at the floating button center — switches theme as soon as
 * the fixed control sits inside a theater zone, ahead of the sticky nav.
 */
function getButtonActivationY(): number {
  if (!btnEl) return window.innerHeight - 40;

  const rect = btnEl.getBoundingClientRect();
  if (rect.height > 0) {
    return rect.top + rect.height / 2;
  }

  const styles = getComputedStyle(btnEl);
  const bottom = parseFloat(styles.bottom) || 20;
  const height = parseFloat(styles.height) || 40;
  return window.innerHeight - bottom - height / 2;
}

function resolveButtonZoneTheme(): KmZoneTheme {
  const activationY = getButtonActivationY();

  for (const zone of zoneEls) {
    const name = zone.getAttribute('data-km-zone');
    if (name !== 'ops' && name !== 'game') continue;

    const { top, bottom } = zone.getBoundingClientRect();
    if (top <= activationY && bottom > activationY) {
      return name;
    }
  }

  return 'default';
}

function updateCookieOffset(): void {
  if (!btnEl) return;
  if (isCookieBannerVisible()) {
    btnEl.dataset.cookieVisible = '';
  } else {
    delete btnEl.dataset.cookieVisible;
  }
}

function updateZoneTheme(): void {
  if (!btnEl) return;
  const theme = resolveButtonZoneTheme();
  if (btnEl.dataset.kmZoneTheme === theme) return;
  btnEl.dataset.kmZoneTheme = theme;
}

function updateVisibility(): void {
  if (!btnEl) return;

  const shouldShow = window.scrollY > getScrollThreshold();

  if (shouldShow) {
    btnEl.hidden = false;
    btnEl.dataset.visible = '';
  } else {
    delete btnEl.dataset.visible;
    btnEl.hidden = true;
  }
}

function update(): void {
  updateVisibility();
  updateCookieOffset();
  updateZoneTheme();
}

function scheduleUpdate(): void {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    update();
  });
}

function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
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
  if (boundOnClick && btnEl) {
    btnEl.removeEventListener('click', boundOnClick);
    boundOnClick = null;
  }
  if (cookieObserver) {
    cookieObserver.disconnect();
    cookieObserver = null;
  }
  btnEl = null;
  zoneEls = [];
  cookieBannerEl = null;
}

export function initKeymodBackToTop(): void {
  teardown();

  const btn = document.querySelector<HTMLButtonElement>('.km-back-to-top');
  const zones = [...document.querySelectorAll<HTMLElement>('[data-km-zone]')];
  if (!btn) return;

  btnEl = btn;
  zoneEls = zones;
  cookieBannerEl = document.getElementById('cookie-consent-banner');

  boundOnScroll = scheduleUpdate;
  boundOnResize = scheduleUpdate;
  boundOnClick = scrollToTop;

  window.addEventListener('scroll', boundOnScroll, { passive: true });
  window.addEventListener('resize', boundOnResize, { passive: true });
  btnEl.addEventListener('click', boundOnClick);

  if (cookieBannerEl) {
    cookieObserver = new MutationObserver(scheduleUpdate);
    cookieObserver.observe(cookieBannerEl, {
      attributes: true,
      attributeFilter: ['hidden', 'aria-hidden'],
    });
  }

  update();
}
