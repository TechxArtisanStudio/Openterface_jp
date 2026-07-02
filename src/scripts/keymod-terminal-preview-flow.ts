import {
  TERMINAL_DEMO_CHUNKS,
  TERMINAL_DEMO_SESSION_HTML,
  TERMINAL_DEMO_TRANSPORT,
  type TerminalDemoTransport,
} from '../data/keymodTerminalDemo';

const AUTO_DELAY_MS = 2500;
const COMPLETE_HOLD_MS = 8000;
const INTERSECTION_THRESHOLD = 0.35;

type FlowState = 'overlay' | 'connecting' | 'streaming' | 'complete';

let rootEl: HTMLElement | null = null;
let state: FlowState = 'overlay';
let inView = false;
let reducedMotion = false;
let observer: IntersectionObserver | null = null;
let clickAbort: AbortController | null = null;
let autoTimer: number | null = null;
let startTimer: number | null = null;
let chunkTimer: number | null = null;
let completeTimer: number | null = null;
let userPickedTransport = false;
let activeTransport: TerminalDemoTransport | null = null;
let chunkIndex = 0;
let accumulatedHtml = '';

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function q<T extends Element>(sel: string): T | null {
  return rootEl?.querySelector<T>(sel) ?? null;
}

function clearTimers(): void {
  if (autoTimer !== null) {
    window.clearTimeout(autoTimer);
    autoTimer = null;
  }
  if (startTimer !== null) {
    window.clearTimeout(startTimer);
    startTimer = null;
  }
  if (chunkTimer !== null) {
    window.clearTimeout(chunkTimer);
    chunkTimer = null;
  }
  if (completeTimer !== null) {
    window.clearTimeout(completeTimer);
    completeTimer = null;
  }
}

function statusLabel(key: 'disconnected' | 'connecting' | 'connected'): string {
  if (!rootEl) return '';
  if (key === 'disconnected') return rootEl.dataset.statusDisconnected ?? 'Disconnected';
  if (key === 'connecting') return rootEl.dataset.statusConnecting ?? 'Connecting…';
  return rootEl.dataset.statusConnected ?? 'Connected';
}

function transportLabel(transport: TerminalDemoTransport): string {
  if (!rootEl) return transport;
  return transport === 'ble'
    ? (rootEl.dataset.transportBle ?? 'Bluetooth')
    : (rootEl.dataset.transportUsb ?? 'USB');
}

function outputHost(): HTMLElement | null {
  return q<HTMLElement>('[data-km-terminal-output]')?.parentElement ?? null;
}

function scrollOutputToBottom(): void {
  const host = outputHost();
  if (host) host.scrollTop = host.scrollHeight;
}

function ensureCursor(): HTMLElement | null {
  const host = outputHost();
  if (!host) return null;

  let cursor = q<HTMLElement>('[data-km-terminal-cursor]');
  if (!cursor) {
    cursor = document.createElement('span');
    cursor.className = 'km-terminal-flow__cursor';
    cursor.dataset.kmTerminalCursor = '';
    cursor.setAttribute('aria-hidden', 'true');
    host.appendChild(cursor);
  } else if (cursor.parentElement !== host) {
    host.appendChild(cursor);
  }

  return cursor;
}

function updateHeader(): void {
  const header = q<HTMLElement>('[data-km-terminal-header]');
  if (!header) return;
  header.hidden = state === 'overlay';
}

function updateCursor(): void {
  const cursor = ensureCursor();
  if (!cursor) return;
  const show = state === 'streaming' || state === 'complete';
  cursor.hidden = !show;
}

function setState(next: FlowState): void {
  state = next;
  if (!rootEl) return;

  rootEl.dataset.flowState = next;
  rootEl.classList.toggle('km-terminal-flow--overlay', next === 'overlay');
  rootEl.classList.toggle('km-terminal-flow--connecting', next === 'connecting');
  rootEl.classList.toggle('km-terminal-flow--streaming', next === 'streaming');
  rootEl.classList.toggle('km-terminal-flow--complete', next === 'complete');

  const overlay = q<HTMLElement>('[data-km-terminal-overlay]');
  if (overlay) overlay.hidden = next !== 'overlay';

  const status = q<HTMLElement>('[data-km-terminal-status]');
  const host = q<HTMLElement>('[data-km-terminal-host]');
  const badge = q<HTMLElement>('[data-km-terminal-badge]');

  if (status) {
    if (next === 'overlay') status.textContent = statusLabel('disconnected');
    else if (next === 'connecting') status.textContent = statusLabel('connecting');
    else status.textContent = statusLabel('connected');
  }

  if (host) host.hidden = next === 'overlay';
  if (badge) badge.hidden = next === 'overlay' || next === 'connecting';

  updateHeader();
  updateCursor();
  updateBlePulse();
}

function updateBlePulse(): void {
  if (!rootEl) return;
  const bleBtn = q<HTMLElement>('[data-km-terminal-demo-ble]');
  const showPulse = state === 'overlay' && inView && !userPickedTransport && !reducedMotion;
  if (bleBtn) bleBtn.classList.toggle('km-terminal-flow__demo-btn--pulse', showPulse);
}

function setTransportBadge(transport: TerminalDemoTransport): void {
  const badge = q<HTMLElement>('[data-km-terminal-badge]');
  const icon = q<HTMLImageElement>('[data-km-terminal-badge-icon]');
  const label = q<HTMLElement>('[data-km-terminal-badge-label]');
  if (!badge || !icon || !label) return;

  if (transport === 'ble') {
    icon.src = '/keymod/icons/compose/ic-bluetooth-connected.svg';
    icon.hidden = false;
  } else {
    icon.src = '/keymod/icons/terminal/ic-usb.svg';
    icon.hidden = false;
  }
  label.textContent = transportLabel(transport);
}

function clearOutput(): void {
  accumulatedHtml = '';
  const output = q<HTMLElement>('[data-km-terminal-output]');
  if (output) output.innerHTML = '';
  ensureCursor();
}

function resetToOverlay(): void {
  clearTimers();
  activeTransport = null;
  chunkIndex = 0;
  clearOutput();
  setTransportBadge('ble');
  setState('overlay');
  const live = q<HTMLElement>('[data-km-terminal-live]');
  if (live) live.textContent = '';
}

function scheduleAutoStart(): void {
  if (!inView || reducedMotion || userPickedTransport || state !== 'overlay') return;
  clearTimers();
  updateBlePulse();
  autoTimer = window.setTimeout(() => {
    autoTimer = null;
    if (state === 'overlay' && inView && !userPickedTransport) startDemo('ble', true);
  }, AUTO_DELAY_MS);
}

function feedNextChunk(): void {
  if (!rootEl || !activeTransport || state !== 'streaming') return;

  const chunks = TERMINAL_DEMO_CHUNKS[activeTransport];
  const output = q<HTMLElement>('[data-km-terminal-output]');
  if (!output || chunkIndex >= chunks.length) {
    finishDemo();
    return;
  }

  accumulatedHtml += chunks[chunkIndex];
  output.innerHTML = accumulatedHtml;
  chunkIndex += 1;
  ensureCursor();
  scrollOutputToBottom();

  if (chunkIndex >= chunks.length) {
    finishDemo();
    return;
  }

  const delay = TERMINAL_DEMO_TRANSPORT[activeTransport].chunkDelayMs;
  chunkTimer = window.setTimeout(feedNextChunk, delay);
}

function finishDemo(): void {
  chunkTimer = null;
  setState('complete');
  scrollOutputToBottom();
  const live = q<HTMLElement>('[data-km-terminal-live]');
  if (live) live.textContent = 'Terminal preview complete';

  completeTimer = window.setTimeout(() => {
    completeTimer = null;
    if (!inView) {
      resetToOverlay();
      return;
    }
    resetToOverlay();
    scheduleAutoStart();
  }, COMPLETE_HOLD_MS);
}

function startDemo(transport: TerminalDemoTransport, auto = false): void {
  if (reducedMotion || !rootEl) return;
  if (!auto) userPickedTransport = true;

  clearTimers();
  activeTransport = transport;
  chunkIndex = 0;
  clearOutput();
  setTransportBadge(transport);
  setState('connecting');
  updateBlePulse();

  const live = q<HTMLElement>('[data-km-terminal-live]');
  if (live) live.textContent = `Starting ${transportLabel(transport)} preview demo`;

  const { startDelayMs } = TERMINAL_DEMO_TRANSPORT[transport];
  startTimer = window.setTimeout(() => {
    startTimer = null;
    if (!rootEl || state !== 'connecting') return;
    setState('streaming');
    feedNextChunk();
  }, startDelayMs);
}

function showStaticComplete(): void {
  if (!rootEl) return;
  const output = q<HTMLElement>('[data-km-terminal-output]');
  if (output) output.innerHTML = TERMINAL_DEMO_SESSION_HTML;
  setTransportBadge('ble');
  setState('complete');
  ensureCursor();
  scrollOutputToBottom();
  const overlay = q<HTMLElement>('[data-km-terminal-overlay]');
  if (overlay) overlay.hidden = true;
  const host = q<HTMLElement>('[data-km-terminal-host]');
  const badge = q<HTMLElement>('[data-km-terminal-badge]');
  if (host) host.hidden = false;
  if (badge) badge.hidden = false;
}

function onRootClick(event: MouseEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target || !rootEl || reducedMotion) return;

  if (target.closest('[data-km-terminal-demo-ble]')) {
    startDemo('ble');
    return;
  }
  if (target.closest('[data-km-terminal-demo-usb]')) {
    startDemo('usb');
  }
}

function bindRoot(root: HTMLElement): void {
  if (rootEl === root) return;
  unbindRoot();

  rootEl = root;
  reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    root.classList.add('km-terminal-flow--reduced-motion');
    showStaticComplete();
    return;
  }

  clickAbort = new AbortController();
  root.addEventListener('click', onRootClick, { signal: clickAbort.signal });

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      inView = Boolean(entry?.isIntersecting);
      if (inView) {
        if (state === 'overlay') scheduleAutoStart();
      } else {
        userPickedTransport = false;
        resetToOverlay();
      }
      updateBlePulse();
    },
    { threshold: INTERSECTION_THRESHOLD },
  );
  observer.observe(root);

  resetToOverlay();
}

function unbindRoot(): void {
  clearTimers();
  observer?.disconnect();
  observer = null;
  clickAbort?.abort();
  clickAbort = null;
  rootEl = null;
  state = 'overlay';
  inView = false;
  userPickedTransport = false;
  activeTransport = null;
  chunkIndex = 0;
  accumulatedHtml = '';
}

export function initKeymodTerminalPreviewFlow(): void {
  const root = document.querySelector<HTMLElement>('[data-km-terminal-flow]');
  if (!root) {
    unbindRoot();
    return;
  }
  bindRoot(root);
}

function boot(): void {
  initKeymodTerminalPreviewFlow();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodTerminalPreviewFlow);
