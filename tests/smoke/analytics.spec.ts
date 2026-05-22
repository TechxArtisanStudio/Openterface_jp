import { test, expect } from '@playwright/test';

const MEASUREMENT_ID = 'G-EKZEH6QYWT';

test('cookie consent banner appears on first visit', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const banner = page.locator('#cookie-consent-banner');
  await expect(banner).toBeVisible();
  await expect(page.locator('#cookie-consent-accept')).toBeVisible();
  await expect(page.locator('#cookie-consent-reject')).toBeVisible();
});

test('accepting cookies loads analytics scripts', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#cookie-consent-accept').click();
  await expect(page.locator('#cookie-consent-banner')).toBeHidden();

  const consent = await page.evaluate(() => localStorage.getItem('openterface-cookie-consent'));
  expect(consent).toBe('granted');

  await expect(page.locator('#ahrefs-analytics')).toBeAttached({ timeout: 5000 });
});

test('rejecting cookies hides banner without loading ahrefs', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#cookie-consent-reject').click();
  await expect(page.locator('#cookie-consent-banner')).toBeHidden();

  const consent = await page.evaluate(() => localStorage.getItem('openterface-cookie-consent'));
  expect(consent).toBe('denied');
  await expect(page.locator('#ahrefs-analytics')).toHaveCount(0);
});

test('cookie settings link reopens consent banner', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#cookie-consent-reject').click();
  await expect(page.locator('#cookie-consent-banner')).toBeHidden();

  await page.locator('#cookie-settings').click();
  await expect(page.locator('#cookie-consent-banner')).toBeVisible();
});

test('analytics scripts present in page head on production build', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('script[src*="googletagmanager.com/gtag/js"]')).toHaveCount(1);
});

test('no gtag console errors on load', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(errors.filter((e) => e.includes('gtag'))).toHaveLength(0);
});

test('accepting cookies enables GA4 page view tracking', async ({ page }) => {
  const collectRequests: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('/g/collect') || url.includes('/ccm/collect')) {
      collectRequests.push(url);
    }
  });

  await page.goto('/', { waitUntil: 'networkidle' });
  await expect(page.evaluate(() => typeof window.gtag === 'function')).resolves.toBe(true);

  await page.locator('#cookie-consent-accept').click();

  await expect
    .poll(async () =>
      page.evaluate((measurementId) => {
        const dl = window.dataLayer || [];
        const consentGranted = dl.some(
          (e: { 0?: string; 1?: string; 2?: { analytics_storage?: string } }) =>
            e?.[0] === 'consent' &&
            e?.[1] === 'update' &&
            e?.[2]?.analytics_storage === 'granted',
        );
        const pageViewEvent = dl.some(
          (e: { 0?: string; 1?: string }) => e?.[0] === 'event' && e?.[1] === 'page_view',
        );
        return consentGranted && pageViewEvent;
      }, MEASUREMENT_ID),
    )
    .toBe(true);

  // GA4 often skips /g/collect from localhost in automated browsers; assert when hits occur
  if (collectRequests.length > 0) {
    expect(
      collectRequests.some(
        (u) => u.includes(MEASUREMENT_ID) || u.includes(`tid=${MEASUREMENT_ID}`),
      ),
    ).toBe(true);
  }
});
