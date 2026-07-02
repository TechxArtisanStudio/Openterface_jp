let carouselEl: HTMLElement | null = null;
let trackEl: HTMLElement | null = null;
let resizeObserver: ResizeObserver | null = null;
let layoutMediaQuery: MediaQueryList | null = null;
let boundLayoutChange: (() => void) | null = null;
let boundKeydown: ((e: KeyboardEvent) => void) | null = null;
let boundClick: ((e: Event) => void) | null = null;
let dualLayout = true;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getSlides(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('[data-km-game-slide]')];
}

function getDots(root: HTMLElement): HTMLButtonElement[] {
  return [...root.querySelectorAll<HTMLButtonElement>('[data-km-game-dot]')];
}

function getPrevBtn(root: HTMLElement): HTMLButtonElement | null {
  return root.querySelector('[data-km-game-prev]');
}

function getNextBtn(root: HTMLElement): HTMLButtonElement | null {
  return root.querySelector('[data-km-game-next]');
}

function getCaptionEl(root: HTMLElement): HTMLElement | null {
  return root.querySelector('[data-km-game-caption]');
}

function getActiveIndex(root: HTMLElement): number {
  const raw = root.dataset.activeSlide;
  const index = raw ? parseInt(raw, 10) : 0;
  return Number.isNaN(index) ? 0 : index;
}

function getMaxIndex(slideCount: number): number {
  if (slideCount <= 1) return 0;
  return slideCount - 1;
}

function clampIndex(index: number, slideCount: number): number {
  return Math.min(Math.max(0, index), getMaxIndex(slideCount));
}

function updateSlideStates(root: HTMLElement, activeIndex: number): void {
  const slides = getSlides(root);

  slides.forEach((slide, i) => {
    slide.classList.remove(
      'km-game-carousel__slide--lead',
      'km-game-carousel__slide--mate',
      'km-game-carousel__slide--peek',
      'km-game-carousel__slide--far',
    );

    if (dualLayout) {
      const isTailSolo = activeIndex === slides.length - 1;

      if (isTailSolo) {
        if (i === activeIndex) slide.classList.add('km-game-carousel__slide--lead');
        else if (i === activeIndex - 1) slide.classList.add('km-game-carousel__slide--peek');
        else slide.classList.add('km-game-carousel__slide--far');
      } else if (i === activeIndex) {
        slide.classList.add('km-game-carousel__slide--lead');
      } else if (i === activeIndex + 1) {
        slide.classList.add('km-game-carousel__slide--mate');
      } else if (i === activeIndex - 1 || i === activeIndex + 2) {
        slide.classList.add('km-game-carousel__slide--peek');
      } else {
        slide.classList.add('km-game-carousel__slide--far');
      }
    } else if (i === activeIndex) {
      slide.classList.add('km-game-carousel__slide--lead');
    } else if (i === activeIndex - 1 || i === activeIndex + 1) {
      slide.classList.add('km-game-carousel__slide--peek');
    } else {
      slide.classList.add('km-game-carousel__slide--far');
    }
  });
}

function updateTrackOffset(): void {
  if (!carouselEl || !trackEl) return;

  const slides = getSlides(carouselEl);
  if (slides.length === 0) return;

  const activeIndex = getActiveIndex(carouselEl);
  const slide = slides[0];
  const gap = parseFloat(getComputedStyle(trackEl).gap) || 0;
  const slideWidth = slide.offsetWidth;
  const offset = activeIndex * (slideWidth + gap);

  trackEl.style.transform = `translate3d(${-offset}px, 0, 0)`;
}

function updateNavState(root: HTMLElement, activeIndex: number, slideCount: number): void {
  const prevBtn = getPrevBtn(root);
  const nextBtn = getNextBtn(root);
  const maxIndex = getMaxIndex(slideCount);

  if (prevBtn) prevBtn.disabled = activeIndex <= 0;
  if (nextBtn) nextBtn.disabled = activeIndex >= maxIndex;
}

function setSlide(root: HTMLElement, index: number): void {
  const slides = getSlides(root);
  const dots = getDots(root);
  const captionEl = getCaptionEl(root);
  if (slides.length === 0) return;

  const next = clampIndex(index, slides.length);

  root.dataset.activeSlide = String(next);
  updateSlideStates(root, next);
  updateTrackOffset();
  updateNavState(root, next, slides.length);

  dots.forEach((dot, i) => {
    const active = i === next;
    dot.classList.toggle('km-game-carousel__dot--active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });

  if (captionEl) {
    const lead = slides[next];
    const hasMate = dualLayout && next < slides.length - 1;
    const mate = hasMate ? slides[next + 1] : null;
    const leadCaption = lead?.dataset.caption ?? '';
    const mateCaption = mate?.dataset.caption ?? '';
    captionEl.textContent =
      mate && mateCaption ? `${leadCaption} · ${mateCaption}` : leadCaption;
  }
}

function onCarouselClick(e: Event): void {
  if (!carouselEl) return;
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const prevBtn = target.closest<HTMLButtonElement>('[data-km-game-prev]');
  const nextBtn = target.closest<HTMLButtonElement>('[data-km-game-next]');
  const dotBtn = target.closest<HTMLButtonElement>('[data-km-game-dot]');
  const slideBtn = target.closest<HTMLElement>('[data-km-game-slide]');

  if (prevBtn && !prevBtn.disabled) {
    setSlide(carouselEl, getActiveIndex(carouselEl) - 1);
    return;
  }

  if (nextBtn && !nextBtn.disabled) {
    setSlide(carouselEl, getActiveIndex(carouselEl) + 1);
    return;
  }

  if (dotBtn && dotBtn.dataset.kmGameDot !== undefined) {
    const index = parseInt(dotBtn.dataset.kmGameDot, 10);
    if (!Number.isNaN(index)) setSlide(carouselEl, index);
    return;
  }

  if (slideBtn && slideBtn.dataset.slideIndex !== undefined) {
    const index = parseInt(slideBtn.dataset.slideIndex, 10);
    if (!Number.isNaN(index)) setSlide(carouselEl, index);
  }
}

function onCarouselKeydown(e: KeyboardEvent): void {
  if (!carouselEl) return;

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    setSlide(carouselEl, getActiveIndex(carouselEl) - 1);
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    setSlide(carouselEl, getActiveIndex(carouselEl) + 1);
  }
}

function syncLayoutMode(root: HTMLElement): void {
  dualLayout = window.matchMedia('(min-width: 768px)').matches;
  root.classList.toggle('km-game-carousel--dual', dualLayout);
  root.classList.toggle('km-game-carousel--single', !dualLayout);
  setSlide(root, clampIndex(getActiveIndex(root), getSlides(root).length));
}

function teardown(): void {
  resizeObserver?.disconnect();
  resizeObserver = null;

  if (layoutMediaQuery && boundLayoutChange) {
    layoutMediaQuery.removeEventListener('change', boundLayoutChange);
  }
  layoutMediaQuery = null;
  boundLayoutChange = null;

  if (carouselEl && boundClick) {
    carouselEl.removeEventListener('click', boundClick);
  }
  if (carouselEl && boundKeydown) {
    carouselEl.removeEventListener('keydown', boundKeydown);
  }

  carouselEl = null;
  trackEl = null;
  boundClick = null;
  boundKeydown = null;
}

export function initKeymodGameEditorCarousel(): void {
  teardown();

  const root = document.querySelector<HTMLElement>('[data-km-game-carousel]');
  if (!root) return;

  carouselEl = root;
  trackEl = root.querySelector('[data-km-game-track]');
  if (!trackEl) return;

  if (prefersReducedMotion()) {
    root.classList.add('km-game-carousel--reduced-motion');
  }

  boundClick = onCarouselClick;
  boundKeydown = onCarouselKeydown;
  root.addEventListener('click', boundClick);
  root.addEventListener('keydown', boundKeydown);

  resizeObserver = new ResizeObserver(() => {
    updateTrackOffset();
  });
  resizeObserver.observe(root);

  syncLayoutMode(root);

  layoutMediaQuery = window.matchMedia('(min-width: 768px)');
  boundLayoutChange = () => {
    if (carouselEl) syncLayoutMode(carouselEl);
  };
  layoutMediaQuery.addEventListener('change', boundLayoutChange);
}

function boot(): void {
  initKeymodGameEditorCarousel();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodGameEditorCarousel);
