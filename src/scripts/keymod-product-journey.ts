const ROOT_SELECTOR = '[data-km-journey]';
const DRAG_THRESHOLD_PX = 5;

function updateScrollHints(root: HTMLElement): void {
  const viewport = root.querySelector<HTMLElement>('[data-km-journey-viewport]');
  const hint = root.querySelector<HTMLElement>('[data-km-journey-hint]');
  if (!viewport || !hint) return;

  const canScrollLeft = viewport.scrollLeft > 8;
  hint.hidden = !canScrollLeft;
  root.classList.toggle('km-journey--can-scroll-left', canScrollLeft);

  const maxScroll = viewport.scrollWidth - viewport.clientWidth;
  root.classList.toggle('km-journey--can-scroll-right', maxScroll - viewport.scrollLeft > 8);
}

function scrollToAnchor(root: HTMLElement): void {
  const viewport = root.querySelector<HTMLElement>('[data-km-journey-viewport]');
  const anchor = root.querySelector<HTMLElement>('[data-km-journey-scroll-anchor]');
  if (!viewport) return;

  const styles = getComputedStyle(viewport);
  const paddingLeft = parseFloat(styles.paddingInlineStart) || 0;
  const targetLeft = anchor ? anchor.offsetLeft - paddingLeft : 0;

  viewport.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: 'auto',
  });
}

function bindDragScroll(viewport: HTMLElement): void {
  let startX = 0;
  let startScrollLeft = 0;
  let isDragging = false;
  let didDrag = false;
  let activePointerId: number | null = null;

  const endDrag = (event: PointerEvent): void => {
    if (activePointerId !== null && event.pointerId !== activePointerId) return;

    if (isDragging) {
      viewport.classList.remove('km-journey__viewport--dragging');
      try {
        viewport.releasePointerCapture(event.pointerId);
      } catch {
        /* pointer may already be released */
      }
    }

    isDragging = false;
    activePointerId = null;
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;

    startX = event.clientX;
    startScrollLeft = viewport.scrollLeft;
    isDragging = false;
    didDrag = false;
    activePointerId = event.pointerId;
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (activePointerId !== event.pointerId) return;

    const deltaX = event.clientX - startX;
    if (!isDragging) {
      if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;

      isDragging = true;
      didDrag = true;
      viewport.classList.add('km-journey__viewport--dragging');
      viewport.setPointerCapture(event.pointerId);
    }

    event.preventDefault();
    viewport.scrollLeft = startScrollLeft - deltaX;
  };

  const onPointerUp = (event: PointerEvent): void => {
    endDrag(event);
  };

  const onPointerCancel = (event: PointerEvent): void => {
    endDrag(event);
  };

  const onClick = (event: MouseEvent): void => {
    if (!didDrag) return;
    didDrag = false;
    event.preventDefault();
    event.stopPropagation();
  };

  viewport.addEventListener('pointerdown', onPointerDown);
  viewport.addEventListener('pointermove', onPointerMove);
  viewport.addEventListener('pointerup', onPointerUp);
  viewport.addEventListener('pointercancel', onPointerCancel);
  viewport.addEventListener('click', onClick, true);
}

function bindJourney(root: HTMLElement): void {
  if (root.dataset.kmJourneyBound === 'true') return;
  root.dataset.kmJourneyBound = 'true';

  const viewport = root.querySelector<HTMLElement>('[data-km-journey-viewport]');
  if (!viewport) return;

  const onScroll = () => updateScrollHints(root);
  viewport.addEventListener('scroll', onScroll, { passive: true });

  const resizeObserver = new ResizeObserver(() => {
    updateScrollHints(root);
  });
  resizeObserver.observe(viewport);

  bindDragScroll(viewport);

  requestAnimationFrame(() => {
    scrollToAnchor(root);
    requestAnimationFrame(() => updateScrollHints(root));
  });
}

export function initKeymodProductJourney(): void {
  document.querySelectorAll<HTMLElement>(ROOT_SELECTOR).forEach(bindJourney);
}
