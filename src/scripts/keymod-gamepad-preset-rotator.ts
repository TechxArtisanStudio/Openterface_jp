const AUTO_MS = 4500;

let rotatorEl: HTMLElement | null = null;
let autoTimer: number | null = null;
let boundKeydown: ((e: KeyboardEvent) => void) | null = null;
let boundClick: ((e: Event) => void) | null = null;
let boundPointerEnter: (() => void) | null = null;
let boundPointerLeave: (() => void) | null = null;
let boundFocusIn: (() => void) | null = null;
let boundFocusOut: (() => void) | null = null;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getSlides(root: HTMLElement): HTMLImageElement[] {
  return [...root.querySelectorAll<HTMLImageElement>('[data-km-preset-slide]')];
}

function getThumbs(root: HTMLElement): HTMLButtonElement[] {
  return [...root.querySelectorAll<HTMLButtonElement>('[data-km-preset-thumb]')];
}

function getLabelEl(root: HTMLElement): HTMLElement | null {
  return root.querySelector('[data-km-preset-label]');
}

function getActiveIndex(root: HTMLElement): number {
  const raw = root.dataset.activeIndex;
  const index = raw ? parseInt(raw, 10) : 0;
  return Number.isNaN(index) ? 0 : index;
}

function setActiveIndex(root: HTMLElement, index: number): void {
  const slides = getSlides(root);
  const thumbs = getThumbs(root);
  const labelEl = getLabelEl(root);
  if (slides.length === 0) return;

  const next = ((index % slides.length) + slides.length) % slides.length;
  root.dataset.activeIndex = String(next);

  slides.forEach((slide, i) => {
    slide.classList.toggle('km-preset-rotator__slide--active', i === next);
  });

  thumbs.forEach((thumb, i) => {
    const active = i === next;
    thumb.classList.toggle('km-preset-rotator__thumb--active', active);
    thumb.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  const activeSlide = slides[next];
  if (labelEl && activeSlide?.dataset.label) {
    labelEl.textContent = activeSlide.dataset.label;
  }
}

function stopAuto(): void {
  if (autoTimer !== null) {
    window.clearInterval(autoTimer);
    autoTimer = null;
  }
}

function startAuto(root: HTMLElement): void {
  stopAuto();
  if (prefersReducedMotion()) return;
  if (getSlides(root).length <= 1) return;

  autoTimer = window.setInterval(() => {
    setActiveIndex(root, getActiveIndex(root) + 1);
  }, AUTO_MS);
}

function bindRotator(root: HTMLElement): void {
  if (rotatorEl === root) return;
  unbindRotator();

  rotatorEl = root;
  if (prefersReducedMotion()) {
    root.classList.add('km-preset-rotator--reduced-motion');
  }

  boundClick = (event) => {
    const target = event.target as HTMLElement | null;
    const thumb = target?.closest<HTMLButtonElement>('[data-km-preset-thumb]');
    if (!thumb || !root.contains(thumb)) return;

    const index = parseInt(thumb.dataset.kmPresetThumb ?? '0', 10);
    if (Number.isNaN(index)) return;

    setActiveIndex(root, index);
    startAuto(root);
  };

  boundKeydown = (event) => {
    if (!root.contains(document.activeElement)) return;
    const count = getSlides(root).length;
    if (count <= 1) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setActiveIndex(root, getActiveIndex(root) + 1);
      startAuto(root);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveIndex(root, getActiveIndex(root) - 1);
      startAuto(root);
    }
  };

  boundPointerEnter = () => stopAuto();
  boundPointerLeave = () => startAuto(root);
  boundFocusIn = () => stopAuto();
  boundFocusOut = (event) => {
    const next = (event as FocusEvent).relatedTarget as Node | null;
    if (next && root.contains(next)) return;
    startAuto(root);
  };

  root.addEventListener('click', boundClick);
  root.addEventListener('keydown', boundKeydown);
  root.addEventListener('pointerenter', boundPointerEnter);
  root.addEventListener('pointerleave', boundPointerLeave);
  root.addEventListener('focusin', boundFocusIn);
  root.addEventListener('focusout', boundFocusOut);

  startAuto(root);
}

function unbindRotator(): void {
  if (!rotatorEl) return;

  if (boundClick) rotatorEl.removeEventListener('click', boundClick);
  if (boundKeydown) rotatorEl.removeEventListener('keydown', boundKeydown);
  if (boundPointerEnter) rotatorEl.removeEventListener('pointerenter', boundPointerEnter);
  if (boundPointerLeave) rotatorEl.removeEventListener('pointerleave', boundPointerLeave);
  if (boundFocusIn) rotatorEl.removeEventListener('focusin', boundFocusIn);
  if (boundFocusOut) rotatorEl.removeEventListener('focusout', boundFocusOut);

  stopAuto();
  rotatorEl = null;
  boundClick = null;
  boundKeydown = null;
  boundPointerEnter = null;
  boundPointerLeave = null;
  boundFocusIn = null;
  boundFocusOut = null;
}

export function initKeymodGamepadPresetRotator(): void {
  const root = document.querySelector<HTMLElement>('[data-km-preset-rotator]');
  if (!root) {
    unbindRotator();
    return;
  }
  bindRotator(root);
}

function boot(): void {
  initKeymodGamepadPresetRotator();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodGamepadPresetRotator);
