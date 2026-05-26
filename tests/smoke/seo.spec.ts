import { test, expect } from '@playwright/test';

const SITE_HOST = process.env.SITE_HOST || 'openterface.com';

const OG_LOCALE_BY_HOST: Record<string, string> = {
  'openterface.com': 'en_US',
  'en.openterface.com': 'en_US',
  'de.openterface.com': 'de_DE',
  'es.openterface.com': 'es_ES',
  'fr.openterface.com': 'fr_FR',
  'it.openterface.com': 'it_IT',
  'jp.openterface.com': 'ja_JP',
  'kr.openterface.com': 'ko_KR',
  'pt.openterface.com': 'pt_PT',
  'ro.openterface.com': 'ro_RO',
  'cn.openterface.com': 'zh_CN',
  'hk.openterface.com': 'zh_HK',
  'tw.openterface.com': 'zh_TW',
  'ru.openterface.com': 'ru_RU',
  'ar.openterface.com': 'ar_SA',
  'tr.openterface.com': 'tr_TR',
  'pl.openterface.com': 'pl_PL',
  'nl.openterface.com': 'nl_NL',
};

const EXPECTED_OG_LOCALE = OG_LOCALE_BY_HOST[SITE_HOST] ?? 'en_US';

const EXPECTED_ROUTES = [
  '/',
  '/about/',
  '/videos/',
  '/use-cases/',
  '/products/keymod/',
  '/products/kvm-go/',
  '/products/minikvm/',
  '/products/uconsole-kvm-extension/',
  '/products/accessories/',
];

test('robots.txt is valid', async ({ request }) => {
  const res = await request.get('/robots.txt');
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('User-agent: *');
  expect(body).toContain(`Sitemap: https://${SITE_HOST}/sitemap-index.xml`);
});

test('sitemap index links to sitemap-0.xml', async ({ request }) => {
  const res = await request.get('/sitemap-index.xml');
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('sitemap-0.xml');
});

test('sitemap-0.xml lists marketing routes and excludes 404', async ({ request }) => {
  const res = await request.get('/sitemap-0.xml');
  expect(res.status()).toBe(200);
  const body = await res.text();
  for (const route of EXPECTED_ROUTES) {
    expect(body).toContain(`https://${SITE_HOST}${route}`);
  }
  expect(body).not.toContain('/404');
});

test('home page has cross-locale hreflang alternates', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const hreflangLinks = page.locator('link[rel="alternate"][hreflang]');
  expect(await hreflangLinks.count()).toBeGreaterThanOrEqual(10);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    'href',
    'https://openterface.com/',
  );
});

test('home page title does not duplicate brand suffix', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const title = await page.title();
  expect(title).not.toMatch(/^Openterface \| .+ \| Openterface$/);
});

test('home page has Open Graph and Twitter social meta', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', EXPECTED_OG_LOCALE);
  await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveCount(16);
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute('content', /.+/);
  await expect(page.locator('meta[name="twitter:site"]')).toHaveAttribute('content', '@TechxArtisan');
  await expect(page.locator('meta[name="twitter:url"]')).toHaveAttribute(
    'content',
    `https://${SITE_HOST}/`,
  );
});

test('product page has Product JSON-LD and og:type product', async ({ page }) => {
  await page.goto('/products/keymod/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'product');
  const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const productLd = jsonLdScripts.find((text) => text.includes('"@type":"Product"'));
  expect(productLd).toBeTruthy();
  const product = JSON.parse(productLd!);
  expect(product['@type']).toBe('Product');
  expect(String(product.name)).toMatch(/KeyMod/i);
  expect(String(product.url)).toContain('/products/keymod/');
});

test('home page has Organization and WebSite JSON-LD', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const jsonLdScripts = await page.locator('script[type="application/ld+json"]').allTextContents();
  const siteLd = jsonLdScripts.find(
    (text) => text.includes('"@type":"Organization"') && text.includes('"@type":"WebSite"'),
  );
  expect(siteLd).toBeTruthy();
});

test('home page og:image includes width and height', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1280');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '960');
});

test('home page has apple-touch-icon', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/images/favicon.png');
});
