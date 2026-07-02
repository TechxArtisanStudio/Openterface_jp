import { initKeymodScrollDepth, initKeymodZoneObservers } from './keymod-analytics';

export function initKeymodLandingAnalytics(): void {
  initKeymodScrollDepth();
  initKeymodZoneObservers();
}

initKeymodLandingAnalytics();
document.addEventListener('astro:page-load', initKeymodLandingAnalytics);
