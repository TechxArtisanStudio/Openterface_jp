/** Client-side sort/filter for the /media/ hub — multi-section layout. */

import { MEDIA_SECTIONS } from '../lib/media-sections';

type MediaFormat = 'long' | 'short' | 'post' | 'testimonial' | 'coverage';

type MediaCatalogEntry = {
  id: string;
  format: MediaFormat;
  title: string;
  author: string;
  date: string;
  product?: string;
  language?: string;
  app?: string;
  url?: string;
  videoId?: string;
  thumbnail?: string;
  channelAvatar?: string;
  views?: number;
  viewsFormatted?: string;
  zIndex?: number;
  excerpt?: string;
  platform?: string;
  externalUrl?: string;
  sample?: boolean;
  outlet?: string;
  outletUrl?: string;
  logoUrl?: string;
  quote?: string;
};

type MediaCatalogConfig = {
  locale: string;
  knownProducts: string[];
  knownApps: string[];
  productLabels: Record<string, string>;
  appLabels: Record<string, string>;
  languageLabels: Record<string, string>;
  viewsLabel: string;
  emptyResults: string;
  sampleBadge: string;
  readOriginal: string;
  readArticle: string;
  platformLabels: Record<string, string>;
};

const VIDEO_FORMATS = new Set<MediaFormat>(['long', 'short']);

function parseDateTime(iso: string): number {
  if (!iso?.trim()) return 0;
  const t = Date.parse(iso.trim());
  return Number.isFinite(t) ? t : 0;
}

function uniqSorted(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' }),
  );
}

function hasOption(select: HTMLSelectElement, value: string): boolean {
  return Array.from(select.options).some((o) => o.value === value);
}

function populateSelect(
  select: HTMLSelectElement | null,
  options: { value: string; label: string }[],
): void {
  if (!select) return;
  const first = select.querySelector('option');
  select.innerHTML = '';
  if (first) select.appendChild(first);
  for (const opt of options) {
    const el = document.createElement('option');
    el.value = opt.value;
    el.textContent = opt.label;
    select.appendChild(el);
  }
}

function readUrlState(): { product: string; language: string; sort: string; format: string; app: string } {
  const sp = new URLSearchParams(window.location.search);
  return {
    product: sp.get('product') ?? sp.get('p') ?? '',
    language: sp.get('l') ?? '',
    sort: sp.get('s') ?? 'newest',
    format: sp.get('format') ?? '',
    app: sp.get('app') ?? '',
  };
}

function syncUrlFromState(state: {
  product: string;
  language: string;
  sort: string;
  format: string;
  app: string;
}): void {
  const url = new URL(window.location.href);
  const sp = url.searchParams;

  if (state.product) sp.set('product', state.product);
  else {
    sp.delete('product');
    sp.delete('p');
  }
  if (state.language) sp.set('l', state.language);
  else sp.delete('l');
  if (state.sort && state.sort !== 'newest') sp.set('s', state.sort);
  else sp.delete('s');
  if (state.format) sp.set('format', state.format);
  else sp.delete('format');
  if (state.app) sp.set('app', state.app);
  else sp.delete('app');

  const qs = sp.toString();
  window.history.replaceState(null, '', `${url.pathname}${qs ? `?${qs}` : ''}${url.hash}`);
}

/** Sort within a single section bucket (views sort applies to videos only). */
function compareEntries(
  a: MediaCatalogEntry,
  b: MediaCatalogEntry,
  sortMode: string,
  locale: string,
  prioritizeLocale: boolean,
): number {
  if (prioritizeLocale) {
    const aMatch = a.language?.toLowerCase() === locale.toLowerCase();
    const bMatch = b.language?.toLowerCase() === locale.toLowerCase();
    if (aMatch !== bMatch) return aMatch ? -1 : 1;
    if (aMatch && bMatch && (a.zIndex ?? 0) !== (b.zIndex ?? 0)) return (b.zIndex ?? 0) - (a.zIndex ?? 0);
  }

  if (sortMode === 'views' && VIDEO_FORMATS.has(a.format) && VIDEO_FORMATS.has(b.format)) {
    const va = a.views || 0;
    const vb = b.views || 0;
    if (va === 0 && vb !== 0) return 1;
    if (vb === 0 && va !== 0) return -1;
    if (vb !== va) return vb - va;
    return parseDateTime(b.date) - parseDateTime(a.date);
  }

  const da = parseDateTime(a.date);
  const db = parseDateTime(b.date);
  if (da === 0 && db !== 0) return sortMode === 'oldest' ? -1 : 1;
  if (db === 0 && da !== 0) return sortMode === 'oldest' ? 1 : -1;
  return sortMode === 'oldest' ? da - db : db - da;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderVideoCard(entry: MediaCatalogEntry, config: MediaCatalogConfig): HTMLElement {
  const article = document.createElement('article');
  article.className = 'media-catalog-card media-catalog-card--video group';
  article.dataset.entryId = entry.id;
  article.dataset.format = entry.format;
  article.dataset.date = entry.date;
  article.dataset.views = String(entry.views ?? 0);
  article.dataset.product = entry.product ?? '';
  article.dataset.language = entry.language ?? '';
  article.dataset.app = entry.app ?? '';

  const aspectClass = entry.format === 'short' ? 'aspect-[9/16] max-h-80 mx-auto' : 'aspect-video';
  const productLabel = entry.product
    ? `<span class="media-catalog-tag media-catalog-tag--product">${escapeHtml(config.productLabels[entry.product] ?? entry.product)}</span>`
    : '';
  const langLabel = entry.language
    ? `<span class="media-catalog-tag media-catalog-tag--lang">${escapeHtml(config.languageLabels[entry.language] ?? entry.language.toUpperCase())}</span>`
    : '';
  const appLabel = entry.app
    ? `<span class="media-catalog-tag media-catalog-tag--app">${escapeHtml(config.appLabels[entry.app] ?? entry.app)}</span>`
    : '';
  const avatar = entry.channelAvatar
    ? `<img src="${escapeHtml(entry.channelAvatar)}" alt="" width="22" height="22" class="h-[22px] w-[22px] shrink-0 rounded-full bg-gray-100 object-cover ring-1 ring-gray-200/80" loading="lazy" decoding="async" />`
    : '';
  const metaDate = entry.date ? ` · ${escapeHtml(entry.date)}` : '';
  const viewsLine =
    entry.viewsFormatted && VIDEO_FORMATS.has(entry.format)
      ? `<p class="text-xs text-muted/90">${escapeHtml(entry.viewsFormatted)} ${escapeHtml(config.viewsLabel)}${metaDate}</p>`
      : entry.date
        ? `<p class="text-xs text-muted/90">${escapeHtml(entry.date)}</p>`
        : '';

  article.innerHTML = `
    <a href="${escapeHtml(entry.url ?? '#')}" target="_blank" rel="noopener noreferrer" class="block h-full">
      <div class="media-catalog-thumb relative ${aspectClass} overflow-hidden rounded-xl bg-gray-200 shadow-sm ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-primary-dark/30">
        <img src="${escapeHtml(entry.thumbnail ?? '')}" alt="" width="480" height="270" class="h-full w-full object-cover" loading="lazy" decoding="async" />
        <span class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/15" aria-hidden="true">
          <span class="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-black/65 text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
            <svg class="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </span>
      </div>
      <div class="mt-3 flex flex-col gap-2">
        <h3 class="line-clamp-2 text-base font-semibold leading-snug text-ink group-hover:text-primary-dark">${escapeHtml(entry.title)}</h3>
        <div class="flex flex-wrap gap-1.5">${productLabel}${appLabel}${langLabel}</div>
        <div class="flex items-center gap-2">${avatar}<span class="min-w-0 truncate text-sm text-muted">${escapeHtml(entry.author)}</span></div>
        ${viewsLine}
      </div>
    </a>
  `;

  const img = article.querySelector('img[alt=""]');
  if (img instanceof HTMLImageElement) img.alt = entry.title;

  return article;
}

function renderCoverageCard(entry: MediaCatalogEntry, config: MediaCatalogConfig): HTMLElement {
  const article = document.createElement('article');
  article.className = 'media-catalog-card media-catalog-card--coverage group';
  article.dataset.entryId = entry.id;
  article.dataset.format = entry.format;
  article.dataset.date = entry.date;
  article.dataset.product = entry.product ?? '';
  article.dataset.language = entry.language ?? '';
  article.dataset.app = entry.app ?? '';

  const logo = entry.logoUrl
    ? `<img src="${escapeHtml(entry.logoUrl)}" alt="" width="28" height="28" class="h-7 w-7 shrink-0 rounded-full bg-gray-100 object-cover ring-1 ring-gray-200/80" loading="lazy" decoding="async" />`
    : '';
  const productLabel = entry.product
    ? `<div class="mt-2 flex flex-wrap gap-1.5"><span class="media-catalog-tag media-catalog-tag--product">${escapeHtml(config.productLabels[entry.product] ?? entry.product)}</span></div>`
    : '';
  const quote = escapeHtml(entry.quote ?? entry.excerpt ?? '');

  article.innerHTML = `
    <a href="${escapeHtml(entry.externalUrl ?? '#')}" target="_blank" rel="noopener noreferrer" class="media-coverage-card card flex h-full gap-3 hover:border-primary-dark hover:shadow-md">
      ${logo}
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-ink">${escapeHtml(entry.outlet ?? entry.title)}</p>
        <p class="text-xs text-muted">${escapeHtml(entry.author)}</p>
        <p class="mt-2 line-clamp-3 text-sm text-muted italic">"${quote}"</p>
        ${productLabel}
        <p class="mt-2 text-sm font-semibold text-primary-dark">${escapeHtml(config.readArticle)}</p>
      </div>
    </a>
  `;

  return article;
}

function renderPostCard(entry: MediaCatalogEntry, config: MediaCatalogConfig): HTMLElement {
  const article = document.createElement('article');
  article.className = 'media-catalog-card media-catalog-card--post group';
  article.dataset.entryId = entry.id;
  article.dataset.format = entry.format;
  article.dataset.date = entry.date;
  article.dataset.product = entry.product ?? '';
  article.dataset.language = entry.language ?? '';
  article.dataset.app = entry.app ?? '';

  const platform = entry.platform
    ? config.platformLabels[entry.platform] ?? entry.platform
    : entry.format === 'testimonial'
      ? 'Testimonial'
      : 'Social';
  const productLabel = entry.product
    ? `<span class="media-catalog-tag media-catalog-tag--product">${escapeHtml(config.productLabels[entry.product] ?? entry.product)}</span>`
    : '';
  const cta = entry.externalUrl
    ? `<p class="mt-3 text-sm font-semibold text-primary-dark">${escapeHtml(config.readOriginal)}</p>`
    : '';
  const wrapperOpen = entry.externalUrl
    ? `<a href="${escapeHtml(entry.externalUrl)}" target="_blank" rel="noopener noreferrer" class="card block h-full hover:border-primary-dark hover:shadow-md">`
    : '<div class="card block h-full">';
  const wrapperClose = entry.externalUrl ? '</a>' : '</div>';
  const titleClass = entry.externalUrl
    ? 'mt-3 line-clamp-2 text-base font-semibold leading-snug text-ink group-hover:text-primary-dark'
    : 'mt-3 line-clamp-2 text-base font-semibold leading-snug text-ink';

  article.innerHTML = `
    ${wrapperOpen}
      <div class="flex items-start justify-between gap-2">
        <span class="text-xs font-bold uppercase tracking-wide text-muted">${escapeHtml(platform)}</span>
      </div>
      <h3 class="${titleClass}">${escapeHtml(entry.title)}</h3>
      <p class="mt-2 line-clamp-3 text-sm text-muted">${escapeHtml(entry.excerpt ?? '')}</p>
      <div class="mt-3 flex flex-wrap gap-1.5">${productLabel}</div>
      <p class="mt-3 text-sm text-muted">${escapeHtml(entry.author)}${entry.date ? ` · ${escapeHtml(entry.date)}` : ''}</p>
      ${cta}
    ${wrapperClose}
  `;

  return article;
}

function renderEntry(entry: MediaCatalogEntry, config: MediaCatalogConfig): HTMLElement {
  if (VIDEO_FORMATS.has(entry.format)) return renderVideoCard(entry, config);
  if (entry.format === 'coverage') return renderCoverageCard(entry, config);
  return renderPostCard(entry, config);
}

export function initMediaCatalog(
  root: HTMLElement,
  entries: MediaCatalogEntry[],
  config: MediaCatalogConfig,
): void {
  const sortEl = root.querySelector<HTMLSelectElement>('[data-sort]');
  const productEl = root.querySelector<HTMLSelectElement>('[data-filter-product]');
  const appEl = root.querySelector<HTMLSelectElement>('[data-filter-app]');
  const languageEl = root.querySelector<HTMLSelectElement>('[data-filter-language]');
  const formatChips = root.querySelectorAll<HTMLButtonElement>('[data-format-chip]');
  const visibleEl = root.querySelector('[data-results-visible]');
  const totalEl = root.querySelector('[data-results-total]');
  const emptyEl = root.querySelector<HTMLElement>('[data-empty-state]');
  const statTotal = root.querySelector('[data-stat-total]');
  const statLangs = root.querySelector('[data-stat-languages]');
  const statProducts = root.querySelector('[data-stat-products]');

  const allEntries = [...entries];
  const locale = config.locale;
  let activeFormat = '';

  if (statTotal) statTotal.textContent = String(allEntries.length);
  if (statLangs) statLangs.textContent = String(uniqSorted(allEntries.map((e) => e.language ?? '')).length);
  if (statProducts) statProducts.textContent = String(uniqSorted(allEntries.map((e) => e.product ?? '')).length);
  if (totalEl) totalEl.textContent = String(allEntries.length);

  populateSelect(
    productEl,
    uniqSorted([...config.knownProducts, ...allEntries.map((e) => e.product ?? '')]).map((p) => ({
      value: p,
      label: config.productLabels[p] ?? p,
    })),
  );

  populateSelect(
    appEl,
    config.knownApps.map((a) => ({ value: a, label: config.appLabels[a] ?? a })),
  );

  const langMap = new Map<string, string>();
  for (const e of allEntries) {
    if (e.language) langMap.set(e.language, config.languageLabels[e.language] ?? e.language.toUpperCase());
  }
  populateSelect(
    languageEl,
    Array.from(langMap.entries())
      .map(([code, name]) => ({ value: code, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })),
  );

  function applyUrlToControls(): void {
    const state = readUrlState();
    activeFormat = state.format;
    if (sortEl && (state.sort === 'newest' || state.sort === 'oldest' || state.sort === 'views')) {
      sortEl.value = state.sort;
    }
    if (productEl && state.product && hasOption(productEl, state.product)) productEl.value = state.product;
    if (appEl && state.app && hasOption(appEl, state.app)) appEl.value = state.app;
    if (languageEl && state.language && hasOption(languageEl, state.language)) {
      languageEl.value = state.language;
    }
    formatChips.forEach((chip) => {
      const chipFormat = chip.dataset.formatChip ?? '';
      const selected = chipFormat === activeFormat;
      chip.setAttribute('aria-pressed', selected ? 'true' : 'false');
      chip.classList.toggle('media-format-chip--active', selected);
    });
  }

  function currentState() {
    return {
      product: productEl?.value ?? '',
      language: languageEl?.value ?? '',
      sort: sortEl?.value ?? 'newest',
      format: activeFormat,
      app: appEl?.value ?? '',
    };
  }

  function apply(): void {
    const state = currentState();
    const prioritizeLocale = !state.language && Boolean(locale);

    let filtered = allEntries.filter((e) => {
      if (state.format && e.format !== state.format) return false;
      if (state.product && e.product !== state.product) return false;
      if (state.app && e.app !== state.app) return false;
      if (state.language && e.language !== state.language) return false;
      return true;
    });

    let visibleCount = 0;

    for (const { format } of MEDIA_SECTIONS) {
      const sectionEl = root.querySelector<HTMLElement>(`[data-media-section="${format}"]`);
      const gridEl = sectionEl?.querySelector<HTMLElement>(`[data-media-grid="${format}"]`);
      if (!sectionEl || !gridEl) continue;

      const bucket = filtered
        .filter((e) => e.format === format)
        .sort((a, b) => compareEntries(a, b, state.sort, locale, prioritizeLocale));

      const showSection =
        bucket.length > 0 && (!state.format || state.format === format);
      sectionEl.hidden = !showSection;

      gridEl.innerHTML = '';
      if (showSection) {
        const frag = document.createDocumentFragment();
        for (const entry of bucket) frag.appendChild(renderEntry(entry, config));
        gridEl.appendChild(frag);
        visibleCount += bucket.length;
      }
    }

    if (visibleEl) visibleEl.textContent = String(visibleCount);
    if (emptyEl) emptyEl.hidden = visibleCount > 0;
  }

  function applyAndSync(): void {
    apply();
    syncUrlFromState(currentState());
  }

  applyUrlToControls();
  apply();

  sortEl?.addEventListener('change', applyAndSync);
  productEl?.addEventListener('change', applyAndSync);
  appEl?.addEventListener('change', applyAndSync);
  languageEl?.addEventListener('change', applyAndSync);

  formatChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      activeFormat = chip.dataset.formatChip ?? '';
      formatChips.forEach((c) => {
        const selected = (c.dataset.formatChip ?? '') === activeFormat;
        c.setAttribute('aria-pressed', selected ? 'true' : 'false');
        c.classList.toggle('media-format-chip--active', selected);
      });
      applyAndSync();
    });
  });
}
