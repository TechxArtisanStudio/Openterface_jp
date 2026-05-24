/** Client-side sort/filter for the video catalog page. */

type CatalogVideoData = {
  videoId: string;
  url: string;
  title: string;
  author: string;
  channelAvatar: string;
  thumbnail: string;
  date: string;
  views: number;
  viewsFormatted: string;
  language: string;
  product: string;
  zIndex: number;
};

type CatalogConfig = {
  locale: string;
  knownProducts: string[];
  productLabels: Record<string, string>;
  languageLabels: Record<string, string>;
  viewsLabel: string;
  emptyResults: string;
};

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

function applyUrlState(
  sortEl: HTMLSelectElement | null,
  productEl: HTMLSelectElement | null,
  languageEl: HTMLSelectElement | null,
): void {
  const sp = new URLSearchParams(window.location.search);
  const p = sp.get('p') ?? '';
  const l = sp.get('l') ?? '';
  const s = sp.get('s') ?? '';

  if (sortEl && (s === 'newest' || s === 'oldest' || s === 'views')) sortEl.value = s;
  if (productEl && p && hasOption(productEl, p)) productEl.value = p;
  if (languageEl && l && hasOption(languageEl, l)) languageEl.value = l;
}

function syncUrlFromState(
  sortEl: HTMLSelectElement | null,
  productEl: HTMLSelectElement | null,
  languageEl: HTMLSelectElement | null,
): void {
  const url = new URL(window.location.href);
  const sp = url.searchParams;
  const p = productEl?.value ?? '';
  const l = languageEl?.value ?? '';
  const s = sortEl?.value ?? 'newest';

  if (p) sp.set('p', p);
  else sp.delete('p');
  if (l) sp.set('l', l);
  else sp.delete('l');
  if (s && s !== 'newest') sp.set('s', s);
  else sp.delete('s');

  const qs = sp.toString();
  window.history.replaceState(null, '', `${url.pathname}${qs ? `?${qs}` : ''}${url.hash}`);
}

function compareVideos(
  a: CatalogVideoData,
  b: CatalogVideoData,
  sortMode: string,
  locale: string,
  prioritizeLocale: boolean,
): number {
  if (prioritizeLocale) {
    const aMatch = a.language?.toLowerCase() === locale.toLowerCase();
    const bMatch = b.language?.toLowerCase() === locale.toLowerCase();
    if (aMatch !== bMatch) return aMatch ? -1 : 1;
    if (aMatch && bMatch && a.zIndex !== b.zIndex) return b.zIndex - a.zIndex;
  }

  if (sortMode === 'views') {
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

function renderCard(video: CatalogVideoData, config: CatalogConfig): HTMLElement {
  const article = document.createElement('article');
  article.className = 'video-catalog-card group';
  article.dataset.videoId = video.videoId;
  article.dataset.date = video.date;
  article.dataset.views = String(video.views);
  article.dataset.product = video.product;
  article.dataset.language = video.language;

  const productLabel = video.product
    ? `<span class="video-catalog-tag video-catalog-tag--product">${config.productLabels[video.product] ?? video.product}</span>`
    : '';
  const langLabel = video.language
    ? `<span class="video-catalog-tag video-catalog-tag--lang">${config.languageLabels[video.language] ?? video.language.toUpperCase()}</span>`
    : '';

  const avatar = video.channelAvatar
    ? `<img src="${video.channelAvatar}" alt="" width="22" height="22" class="h-[22px] w-[22px] shrink-0 rounded-full bg-gray-100 object-cover ring-1 ring-gray-200/80" loading="lazy" decoding="async" />`
    : '';

  const metaDate = video.date ? ` · ${video.date}` : '';

  article.innerHTML = `
    <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="block h-full">
      <div class="video-catalog-thumb relative aspect-video overflow-hidden rounded-xl bg-gray-200 shadow-sm ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-primary-dark/30">
        <img src="${video.thumbnail}" alt="" width="480" height="270" class="h-full w-full object-cover" loading="lazy" decoding="async" />
        <span class="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/15" aria-hidden="true">
          <span class="flex h-11 w-11 scale-90 items-center justify-center rounded-full bg-black/65 text-white opacity-0 shadow-lg transition group-hover:scale-100 group-hover:opacity-100">
            <svg class="ml-0.5 h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </span>
      </div>
      <div class="mt-3 flex flex-col gap-2">
        <h2 class="line-clamp-2 text-base font-semibold leading-snug text-ink group-hover:text-primary-dark">${video.title}</h2>
        <div class="flex flex-wrap gap-1.5">${productLabel}${langLabel}</div>
        <div class="flex items-center gap-2">
          ${avatar}
          <span class="min-w-0 truncate text-sm text-muted">${video.author}</span>
        </div>
        <p class="text-xs text-muted/90">${video.viewsFormatted} ${config.viewsLabel}${metaDate}</p>
      </div>
    </a>
  `;

  const img = article.querySelector('img[alt=""]');
  if (img instanceof HTMLImageElement) img.alt = video.title;

  return article;
}

export function initVideoCatalog(root: HTMLElement, videos: CatalogVideoData[], config: CatalogConfig): void {
  const grid = root.querySelector<HTMLElement>('[data-video-grid]');
  const sortEl = root.querySelector<HTMLSelectElement>('[data-sort]');
  const productEl = root.querySelector<HTMLSelectElement>('[data-filter-product]');
  const languageEl = root.querySelector<HTMLSelectElement>('[data-filter-language]');
  const visibleEl = root.querySelector('[data-results-visible]');
  const totalEl = root.querySelector('[data-results-total]');
  const emptyEl = root.querySelector<HTMLElement>('[data-empty-state]');
  const statTotal = root.querySelector('[data-stat-total]');
  const statLangs = root.querySelector('[data-stat-languages]');
  const statProducts = root.querySelector('[data-stat-products]');

  if (!grid) return;

  const allVideos = [...videos];
  const locale = config.locale;

  if (statTotal) statTotal.textContent = String(allVideos.length);
  if (statLangs) statLangs.textContent = String(uniqSorted(allVideos.map((v) => v.language)).length);
  if (statProducts) statProducts.textContent = String(uniqSorted(allVideos.map((v) => v.product)).length);
  if (totalEl) totalEl.textContent = String(allVideos.length);

  const productsFromCards = allVideos.map((v) => v.product).filter(Boolean);
  const allProducts = uniqSorted([...config.knownProducts, ...productsFromCards]);
  populateSelect(
    productEl,
    allProducts.map((p) => ({ value: p, label: config.productLabels[p] ?? p })),
  );

  const langMap = new Map<string, string>();
  for (const v of allVideos) {
    if (v.language) langMap.set(v.language, config.languageLabels[v.language] ?? v.language.toUpperCase());
  }
  populateSelect(
    languageEl,
    Array.from(langMap.entries())
      .map(([code, name]) => ({ value: code, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })),
  );

  applyUrlState(sortEl, productEl, languageEl);

  function apply(): void {
    const sortMode = sortEl?.value ?? 'newest';
    const wantProduct = productEl?.value ?? '';
    const wantLanguage = languageEl?.value ?? '';
    const prioritizeLocale = !wantLanguage && Boolean(locale);

    let filtered = allVideos.filter((v) => {
      if (wantProduct && v.product !== wantProduct) return false;
      if (wantLanguage && v.language !== wantLanguage) return false;
      return true;
    });

    filtered = [...filtered].sort((a, b) =>
      compareVideos(a, b, sortMode, locale, prioritizeLocale),
    );

    grid.innerHTML = '';
    const frag = document.createDocumentFragment();
    for (const video of filtered) frag.appendChild(renderCard(video, config));
    grid.appendChild(frag);

    if (visibleEl) visibleEl.textContent = String(filtered.length);
    if (emptyEl) emptyEl.hidden = filtered.length > 0;
  }

  function applyAndSync(): void {
    apply();
    syncUrlFromState(sortEl, productEl, languageEl);
  }

  sortEl?.addEventListener('change', applyAndSync);
  productEl?.addEventListener('change', applyAndSync);
  languageEl?.addEventListener('change', applyAndSync);

  apply();
}
