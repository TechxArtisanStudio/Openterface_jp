/** Query params preserved when switching locale (UTMs, ads, app filters). */
const LOCALE_SWITCH_QUERY_KEYS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'gclid',
  'fbclid',
  'product',
  'sort',
  'lang',
  'l',
]);

/** GA linker noise stripped on cross-locale navigation. */
const LOCALE_SWITCH_STRIP_KEYS = new Set(['_gl', '_ga', '_gac', '_gid']);

/** Return whitelisted query string for locale-switch hrefs (`?foo=bar` or ``). */
export function preserveQueryForLocaleSwitch(search: string): string {
  if (!search) return '';
  const raw = search.startsWith('?') ? search.slice(1) : search;
  if (!raw) return '';

  const params = new URLSearchParams(raw);
  for (const key of [...params.keys()]) {
    if (LOCALE_SWITCH_STRIP_KEYS.has(key) || !LOCALE_SWITCH_QUERY_KEYS.has(key)) {
      params.delete(key);
    }
  }

  const out = params.toString();
  return out ? `?${out}` : '';
}

/** Client-side: attach preserved query params to locale-switch links missing a query string. */
export function applyPreservedQueryToLocaleLinks(): void {
  const search = preserveQueryForLocaleSwitch(window.location.search);
  if (!search) return;

  document.querySelectorAll('a[data-locale-switch]').forEach((node) => {
    const href = node.getAttribute('href');
    if (href && !href.includes('?')) {
      node.setAttribute('href', href + search);
    }
  });
}
