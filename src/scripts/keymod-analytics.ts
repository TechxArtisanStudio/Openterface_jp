/** Session-scoped GA4 helpers for /keymod/ landing engagement. */

const SESSION_PREFIX = 'km-analytics:';

function trackKeymod(eventName: string, params: Record<string, string>): void {
  window.__openterfaceAnalytics?.track?.(eventName, params);
}

function oncePerSession(key: string): boolean {
  const storageKey = `${SESSION_PREFIX}${key}`;
  if (sessionStorage.getItem(storageKey)) return false;
  sessionStorage.setItem(storageKey, '1');
  return true;
}

export function trackKeymodOnce(eventName: string, sessionKey: string, params: Record<string, string>): void {
  if (!oncePerSession(sessionKey)) return;
  trackKeymod(eventName, params);
}

export function trackKeymodZoneView(zone: string): void {
  trackKeymodOnce('keymod_zone_view', `zone:${zone}`, { zone, product: 'keymod' });
}

export function trackKeymodTheaterNav(zone: string): void {
  trackKeymodOnce('keymod_theater_nav', `nav:${zone}`, { zone, product: 'keymod' });
}

export function trackKeymodPovTab(scene: string): void {
  trackKeymodOnce('keymod_pov_tab', `pov:${scene}`, { scene, product: 'keymod' });
}

export function initKeymodScrollDepth(): void {
  if (!document.body.classList.contains('keymod-landing')) return;

  const thresholds = [25, 50, 75, 100];
  let maxReported = 0;

  const report = (): void => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const height = doc.scrollHeight - doc.clientHeight;
    if (height <= 0) return;

    const percent = Math.min(100, Math.round((scrollTop / height) * 100));
    for (const threshold of thresholds) {
      if (percent >= threshold && threshold > maxReported) {
        maxReported = threshold;
        trackKeymodOnce('scroll_depth', `scroll:${threshold}`, {
          percent: String(threshold),
          product: 'keymod',
        });
      }
    }
  };

  window.addEventListener('scroll', report, { passive: true });
  report();
}

export function initKeymodZoneObservers(): void {
  const zones = document.querySelectorAll<HTMLElement>('[data-km-zone]');
  if (zones.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const zone = entry.target.getAttribute('data-km-zone');
        if (zone) trackKeymodZoneView(zone);
      }
    },
    { threshold: 0.35 },
  );

  zones.forEach((el) => observer.observe(el));
}
