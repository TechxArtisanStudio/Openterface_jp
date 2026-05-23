import { test, expect } from '@playwright/test';

const SITE_HOST = process.env.SITE_HOST || 'jp.openterface.com';

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
  expect(await hreflangLinks.count()).toBeGreaterThanOrEqual(11);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
    'href',
    'https://en.openterface.com/',
  );
});

test('home page title does not duplicate brand suffix', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const title = await page.title();
  expect(title).not.toMatch(/^Openterface \| .+ \| Openterface$/);
});

test('home page has Open Graph and Twitter social meta', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
  await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveCount(9);
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
  expect(productLd).toContain('Openterface KeyMod Series');
});
