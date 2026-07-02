declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } };
  }
}

const EMBED_SCRIPT = 'https://www.instagram.com/embed.js';
const EMBED_TIMEOUT_MS = 12000;
const SCRIPT_LOAD_TIMEOUT_MS = 10000;
const EMBED_POLL_MS = 250;

function getSocialProofRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-km-social-proof]');
}

function embedIframesReady(root: HTMLElement): boolean {
  return root.querySelectorAll('.instagram-media iframe').length > 0;
}

function showInstagramEmbeds(root: HTMLElement): void {
  const fallback = root.querySelector<HTMLElement>('[data-km-social-fallback]');
  const loading = root.querySelector<HTMLElement>('[data-km-social-loading]');

  root.classList.remove('km-social-proof--fallback-only');
  root.classList.add('km-social-proof--embeds-ready');
  if (fallback) fallback.hidden = true;
  if (loading) {
    loading.hidden = true;
    loading.setAttribute('aria-busy', 'false');
  }
  window.instgrm?.Embeds?.process();
}

function showTextFallback(root: HTMLElement): void {
  const fallback = root.querySelector<HTMLElement>('[data-km-social-fallback]');
  const loading = root.querySelector<HTMLElement>('[data-km-social-loading]');
  if (!fallback) return;

  root.classList.remove('km-social-proof--embeds-ready');
  root.classList.add('km-social-proof--fallback-only');
  fallback.hidden = false;
  if (loading) {
    loading.hidden = true;
    loading.setAttribute('aria-busy', 'false');
  }
}

function waitForEmbedIframes(root: HTMLElement, deadline: number): void {
  if (embedIframesReady(root)) {
    showInstagramEmbeds(root);
    return;
  }

  if (Date.now() >= deadline) {
    showTextFallback(root);
    return;
  }

  window.setTimeout(() => waitForEmbedIframes(root, deadline), EMBED_POLL_MS);
}

function waitForInstgrm(deadline: number): Promise<void> {
  if (window.instgrm?.Embeds) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const poll = () => {
      if (window.instgrm?.Embeds) {
        resolve();
        return;
      }
      if (Date.now() >= deadline) {
        reject(new Error('instgrm timeout'));
        return;
      }
      window.setTimeout(poll, EMBED_POLL_MS);
    };
    poll();
  });
}

function scriptIsComplete(script: HTMLScriptElement): boolean {
  return script.readyState === 'complete' || script.readyState === 'loaded';
}

function withTimeout<T>(promise: Promise<T>, ms: number, message: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error(message)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

function loadInstagramEmbedScript(): Promise<void> {
  if (window.instgrm?.Embeds) return Promise.resolve();

  const instgrmDeadline = Date.now() + SCRIPT_LOAD_TIMEOUT_MS;

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${EMBED_SCRIPT}"]`);
  if (existing) {
    if (window.instgrm?.Embeds) return Promise.resolve();

    if (scriptIsComplete(existing)) {
      return withTimeout(
        waitForInstgrm(instgrmDeadline),
        SCRIPT_LOAD_TIMEOUT_MS,
        'embed.js timeout',
      );
    }

    return withTimeout(
      new Promise<void>((resolve, reject) => {
        existing.addEventListener('load', () => {
          waitForInstgrm(instgrmDeadline).then(resolve).catch(reject);
        }, { once: true });
        existing.addEventListener('error', () => reject(new Error('embed.js failed')), { once: true });
      }),
      SCRIPT_LOAD_TIMEOUT_MS,
      'embed.js timeout',
    );
  }

  return withTimeout(
    new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = EMBED_SCRIPT;
      script.async = true;
      script.addEventListener('load', () => {
        waitForInstgrm(instgrmDeadline).then(resolve).catch(reject);
      }, { once: true });
      script.addEventListener('error', () => reject(new Error('embed.js failed')), { once: true });
      document.head.appendChild(script);
    }),
    SCRIPT_LOAD_TIMEOUT_MS,
    'embed.js timeout',
  );
}

export function initKeymodInstagramEmbeds(): void {
  const root = getSocialProofRoot();
  if (!root) return;
  if (root.classList.contains('km-social-proof--embeds-ready')) return;
  if (root.classList.contains('km-social-proof--fallback-only')) return;

  loadInstagramEmbedScript()
    .then(() => {
      window.instgrm?.Embeds?.process();
      waitForEmbedIframes(root, Date.now() + EMBED_TIMEOUT_MS);
    })
    .catch(() => {
      showTextFallback(root);
    });
}

function boot(): void {
  initKeymodInstagramEmbeds();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

document.addEventListener('astro:page-load', initKeymodInstagramEmbeds);
