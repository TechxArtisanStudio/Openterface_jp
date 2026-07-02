import { createModeCycle, type ModeCycleController } from './keymod-mode-cycle';

const DRAW_MS = 650;
const INTRO_MS = 1400;
const TEASE_MS = 480;
const SCROLL_SETTLE_MS = 560;

let disposeSpotlight: (() => void) | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function scrollStationToCenter(scrollEl: HTMLElement, station: HTMLElement): void {
  const left = station.offsetLeft - (scrollEl.clientWidth - station.offsetWidth) / 2;
  scrollEl.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
}

function updateSpotlightPosition(rail: HTMLElement, station: HTMLElement): void {
  const lineEl = rail.querySelector<HTMLElement>('.km-hero-rail__line');
  const anchor =
    station.querySelector<HTMLElement>('.km-hero-rail__icon-wrap') ?? station;
  const lineRect = lineEl?.getBoundingClientRect();
  const anchorRect = anchor.getBoundingClientRect();
  if (!lineRect || lineRect.width <= 0) return;

  const centerX = anchorRect.left + anchorRect.width / 2 - lineRect.left;
  const pct = Math.max(0, Math.min(100, (centerX / lineRect.width) * 100));
  rail.style.setProperty('--km-spotlight-pct', `${pct}%`);
}

export function initKeymodHeroSpotlight(): void {
  disposeSpotlight?.();

  const rail = document.querySelector<HTMLElement>('[data-km-hero-rail]');
  if (!rail) return;

  const stations = [...rail.querySelectorAll<HTMLElement>('[data-km-rail-station]')];
  if (stations.length === 0) return;

  const teaseEl = rail.querySelector<HTMLElement>('[data-km-rail-caption]');
  const scrollEl = rail.querySelector<HTMLElement>('[data-km-rail-scroll]');
  if (!scrollEl) return;

  const abort = new AbortController();
  const { signal } = abort;

  let activeIndex = 0;
  let cycle: ModeCycleController | null = null;
  let drawTimer: ReturnType<typeof setTimeout> | null = null;
  let introTimer: ReturnType<typeof setTimeout> | null = null;
  let scrollSyncTimer: ReturnType<typeof setTimeout> | null = null;
  let scrollRaf = 0;

  const syncUserPausedFlag = (): void => {
    rail.dataset.userPaused = cycle?.isPausedForUser() ? 'true' : '';
  };

  const updateTease = (text: string): void => {
    if (!teaseEl || teaseEl.textContent === text) return;
    teaseEl.dataset.changing = 'true';
    window.setTimeout(() => {
      if (signal.aborted) return;
      teaseEl.textContent = text;
      teaseEl.dataset.changing = 'false';
    }, TEASE_MS / 2);
  };

  const setActive = (index: number, opts?: { scroll?: boolean }): void => {
    activeIndex = ((index % stations.length) + stations.length) % stations.length;
    const station = stations[activeIndex];

    rail.dataset.activeIndex = String(activeIndex);
    stations.forEach((el, i) => {
      el.dataset.active = i === activeIndex ? 'true' : 'false';
    });

    if (station.dataset.kmTease) updateTease(station.dataset.kmTease);

    if (opts?.scroll !== false) {
      scrollStationToCenter(scrollEl, station);
    }
    updateSpotlightPosition(rail, station);
  };

  const syncSpotlight = (): void => {
    const station = stations[activeIndex];
    if (station) updateSpotlightPosition(rail, station);
  };

  cycle = createModeCycle({
    onAdvance: () => setActive(activeIndex + 1),
  });

  const onUserInteract = (): void => {
    cycle?.pauseForUser();
    syncUserPausedFlag();
    window.setTimeout(syncUserPausedFlag, 50);
  };

  const onResize = (): void => {
    const station = stations[activeIndex];
    if (!station) return;
    scrollStationToCenter(scrollEl, station);
    updateSpotlightPosition(rail, station);
  };

  const onScroll = (): void => {
    cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(syncSpotlight);
    if (scrollSyncTimer !== null) clearTimeout(scrollSyncTimer);
    scrollSyncTimer = setTimeout(syncSpotlight, SCROLL_SETTLE_MS);
  };

  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const onMotionChange = (): void => {
    if (!motionQuery.matches) return;
    if (drawTimer !== null) clearTimeout(drawTimer);
    if (introTimer !== null) clearTimeout(introTimer);
    cycle?.destroy();
    cycle = null;
    rail.dataset.motion = 'reduced';
    setActive(activeIndex, { scroll: false });
  };

  stations.forEach((station, index) => {
    station.addEventListener(
      'click',
      () => {
        onUserInteract();
        setActive(index);
      },
      { signal },
    );
  });
  window.addEventListener('resize', onResize, { passive: true, signal });
  scrollEl.addEventListener('scroll', onScroll, { passive: true, signal });
  motionQuery.addEventListener('change', onMotionChange, { signal });

  disposeSpotlight = (): void => {
    abort.abort();
    cycle?.destroy();
    cycle = null;
    if (drawTimer !== null) clearTimeout(drawTimer);
    if (introTimer !== null) clearTimeout(introTimer);
    if (scrollSyncTimer !== null) clearTimeout(scrollSyncTimer);
    cancelAnimationFrame(scrollRaf);
    rail.dataset.userPaused = '';
    rail.dataset.drawn = 'false';
  };

  if (prefersReducedMotion()) {
    rail.dataset.motion = 'reduced';
    setActive(0, { scroll: false });
    rail.dataset.drawn = 'true';
    return;
  }

  rail.dataset.motion = 'full';
  rail.dataset.userPaused = '';
  setActive(0, { scroll: false });

  drawTimer = setTimeout(() => {
    if (signal.aborted) return;
    rail.dataset.drawn = 'true';
    updateSpotlightPosition(rail, stations[0]);
    introTimer = setTimeout(() => {
      if (signal.aborted) return;
      cycle?.start();
      syncUserPausedFlag();
    }, INTRO_MS);
  }, DRAW_MS);
}

document.addEventListener('astro:page-load', initKeymodHeroSpotlight);
initKeymodHeroSpotlight();
