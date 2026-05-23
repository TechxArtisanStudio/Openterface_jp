export const UTM_PARAM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
] as const;

export type UtmParamKey = (typeof UTM_PARAM_KEYS)[number];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __openterfaceAnalyticsConfig?: { siteLocale: string; storageKey: string };
    __openterfaceAnalytics?: {
      grant: () => void;
      deny: () => void;
      showBanner: () => void;
      track?: (eventName: string, params?: Record<string, string | undefined>) => void;
    };
  }
}

export function getLandingUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const search = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of UTM_PARAM_KEYS) {
    const value = search.get(key);
    if (value) out[key] = value;
  }
  return out;
}

export function hasAnalyticsConsent(storageKey: string): boolean {
  return localStorage.getItem(storageKey) === 'granted';
}

export function trackEvent(
  eventName: string,
  storageKey: string,
  siteLocale: string,
  params: Record<string, string | undefined> = {},
): void {
  if (!hasAnalyticsConsent(storageKey)) return;
  if (typeof window.gtag !== 'function') return;

  const payload: Record<string, string> = {
    site_locale: siteLocale,
    ...getLandingUtmParams(),
  };

  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== '') payload[key] = value;
  }

  window.gtag('event', eventName, payload);
}

export function initAnalyticsEvents(siteLocale: string, storageKey: string): void {
  const track = (eventName: string, params?: Record<string, string | undefined>) => {
    trackEvent(eventName, storageKey, siteLocale, params);
  };

  if (window.__openterfaceAnalytics) {
    window.__openterfaceAnalytics.track = track;
  } else {
    window.__openterfaceAnalytics = {
      grant: () => {},
      deny: () => {},
      showBanner: () => {},
      track,
    };
  }

  document.addEventListener('click', (event) => {
    const target = (event.target as Element | null)?.closest('[data-analytics-event]');
    if (!target || !(target instanceof HTMLElement)) return;

    const eventName = target.dataset.analyticsEvent;
    if (!eventName) return;

    const linkUrl =
      target instanceof HTMLAnchorElement
        ? target.href
        : target.closest('a') instanceof HTMLAnchorElement
          ? (target.closest('a') as HTMLAnchorElement).href
          : undefined;

    track(eventName, {
      product: target.dataset.analyticsProduct,
      link_url: linkUrl,
      placement: target.dataset.analyticsPlacement,
    });
  });
}
