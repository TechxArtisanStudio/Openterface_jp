import {
  isKeymodPovAutoplayScene,
  keymodPovAutoplaySceneIds,
  type KeymodPovSceneId,
} from '../data/keymodPovScenes';
import { createModeCycle, KEYMOD_POV_USER_RESUME_MS, type ModeCycleController } from './keymod-mode-cycle';
import { trackKeymodPovTab } from './keymod-analytics';

let stageEl: HTMLElement | null = null;
let cycle: ModeCycleController | null = null;
let intersectionObserver: IntersectionObserver | null = null;
let stageVisible = false;
let boundTabClick: ((e: Event) => void) | null = null;
let boundJumpClick: ((e: Event) => void) | null = null;
let boundScroll: (() => void) | null = null;
let scrollRaf: number | null = null;
let scrollSpyLockedUntil = 0;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getSceneOrder(stage: HTMLElement): KeymodPovSceneId[] {
  return [...stage.querySelectorAll<HTMLButtonElement>('[data-pov-tab]')]
    .map((tab) => tab.dataset.povTab)
    .filter((id): id is KeymodPovSceneId => Boolean(id && isKeymodPovAutoplayScene(id as KeymodPovSceneId)));
}

function advanceScene(): void {
  if (!stageEl) return;
  const order = getSceneOrder(stageEl);
  const current = stageEl.dataset.activeScene as KeymodPovSceneId | undefined;
  if (!current || order.length === 0) return;
  const idx = order.indexOf(current);
  const next = order[(idx + 1) % order.length];
  setActiveScene(stageEl, next, { fromCycle: true });
}

function setActiveScene(
  stage: HTMLElement,
  sceneId: KeymodPovSceneId,
  opts: { fromUser?: boolean; fromCycle?: boolean; fromScrollSpy?: boolean } = {},
): void {
  if (!isKeymodPovAutoplayScene(sceneId)) return;

  const { fromUser = false, fromScrollSpy = false } = opts;

  if (fromUser) {
    scrollSpyLockedUntil = Date.now() + KEYMOD_POV_USER_RESUME_MS;
    cycle?.pauseForUser();
  } else if (fromScrollSpy) {
    cycle?.pauseForUser();
  }

  stage.dataset.activeScene = sceneId;

  stage.querySelectorAll<HTMLButtonElement>('[data-pov-tab]').forEach((tab) => {
    const active = tab.dataset.povTab === sceneId;
    tab.classList.toggle('km-pov-stage__tab--active', active);
    tab.setAttribute('aria-selected', active ? 'true' : 'false');
    if (active) {
      stage.querySelector('#km-pov-stage-panel')?.setAttribute('aria-labelledby', tab.id);
    }
  });

  stage.querySelectorAll<HTMLElement>('[data-pov-scene]').forEach((layer) => {
    layer.classList.toggle('km-pov-stage__layer--active', layer.dataset.povScene === sceneId);
  });

  stage.querySelectorAll<HTMLElement>('[data-pov-summary]').forEach((pane) => {
    const active = pane.dataset.povSummary === sceneId;
    pane.classList.toggle('km-pov-stage__summary-pane--active', active);
    pane.setAttribute('aria-hidden', active ? 'false' : 'true');
  });
}

function onTabClick(e: Event): void {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-pov-tab]');
  if (!btn || !stageEl) return;
  const sceneId = btn.dataset.povTab as KeymodPovSceneId | undefined;
  if (!sceneId || sceneId === stageEl.dataset.activeScene) return;
  setActiveScene(stageEl, sceneId, { fromUser: true });
  trackKeymodPovTab(sceneId);
}

function onJumpClick(e: Event): void {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-theater-jump]');
  if (!btn || !stageEl) return;
  const sceneId = btn.dataset.theaterJump as KeymodPovSceneId | undefined;
  if (!sceneId) return;
  e.preventDefault();
  stageEl.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  setActiveScene(stageEl, sceneId, { fromUser: true });
  trackKeymodPovTab(sceneId);
}

function resolveSceneFromScroll(): KeymodPovSceneId | null {
  if (!stageEl) return null;
  const activationY = window.innerHeight * 0.35;
  const linked = [...document.querySelectorAll<HTMLElement>('[data-theater-scene]')];
  let best: { id: KeymodPovSceneId; dist: number } | null = null;

  for (const el of linked) {
    const id = el.dataset.theaterScene as KeymodPovSceneId | undefined;
    if (!id || !keymodPovAutoplaySceneIds.has(id)) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= activationY && rect.bottom > activationY) {
      return id;
    }
    const dist = Math.abs(rect.top - activationY);
    if (!best || dist < best.dist) {
      best = { id, dist };
    }
  }

  return best?.id ?? null;
}

function onScroll(): void {
  if (Date.now() < scrollSpyLockedUntil) return;
  if (scrollRaf !== null) return;
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = null;
    if (!stageEl) return;
    const sceneId = resolveSceneFromScroll();
    if (sceneId && sceneId !== stageEl.dataset.activeScene) {
      setActiveScene(stageEl, sceneId, { fromScrollSpy: true });
    }
  });
}

function preloadSceneImages(): void {
  const urls = new Set<string>();
  document.querySelectorAll<HTMLImageElement>('.km-pov-stage__layer-img').forEach((img) => {
    if (img.src) urls.add(img.src);
  });
  urls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function maybeStartCycle(): void {
  if (stageVisible && !prefersReducedMotion()) {
    cycle?.start();
  }
}

function teardown(): void {
  if (boundTabClick && stageEl) {
    stageEl.removeEventListener('click', boundTabClick);
  }
  if (boundJumpClick) {
    document.removeEventListener('click', boundJumpClick);
  }
  if (boundScroll) {
    window.removeEventListener('scroll', boundScroll);
  }
  if (scrollRaf !== null) {
    cancelAnimationFrame(scrollRaf);
    scrollRaf = null;
  }
  intersectionObserver?.disconnect();
  intersectionObserver = null;
  cycle?.destroy();
  cycle = null;
  stageVisible = false;
  stageEl = null;
  boundTabClick = null;
  boundJumpClick = null;
  boundScroll = null;
}

export function initKeymodPovStage(): void {
  teardown();

  const stage = document.querySelector<HTMLElement>('[data-km-pov-stage]');
  if (!stage) return;

  stageEl = stage;
  boundTabClick = onTabClick;
  boundJumpClick = onJumpClick;
  boundScroll = onScroll;

  cycle = createModeCycle({
    onAdvance: advanceScene,
    isEnabled: () => stageVisible,
    userResumeMs: KEYMOD_POV_USER_RESUME_MS,
  });

  stage.addEventListener('click', boundTabClick);
  document.addEventListener('click', boundJumpClick);
  window.addEventListener('scroll', boundScroll, { passive: true });

  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const entry = entries.find((e) => e.target === stage);
      if (!entry) return;
      stageVisible = entry.isIntersecting;
      if (stageVisible) {
        maybeStartCycle();
      } else {
        cycle?.stop();
      }
    },
    { threshold: 0.35 },
  );
  intersectionObserver.observe(stage);

  preloadSceneImages();
  maybeStartCycle();
}

function boot(): void {
  initKeymodPovStage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodPovStage);
