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

test('crowdsupply_click fires after consent when clicking carousel CTA', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('#cookie-consent-accept').click();
  await page.waitForFunction(() => typeof window.__openterfaceAnalytics?.track === 'function');

  await expect(page.locator('[data-analytics-event="crowdsupply_click"]').first()).toBeVisible();
  await page.locator('[data-analytics-event="crowdsupply_click"]').first().click({ modifiers: ['Meta'] });

  await expect
    .poll(async () =>
      page.evaluate(() => {
        const dl = window.dataLayer || [];
        return dl.some(
          (e: { 0?: string; 1?: string; 2?: { product?: string } }) =>
            e?.[0] === 'event' &&
            e?.[1] === 'crowdsupply_click' &&
            Boolean(e?.[2]?.product),
        );
      }),
    )
    .toBe(true);
});

test('crowdsupply_click includes landing UTM params', async ({ page }) => {
  await page.goto(
    '/?utm_source=test_instagram&utm_medium=social&utm_campaign=p0_test&utm_content=story',
    { waitUntil: 'domcontentloaded' },
  );
  await page.locator('#cookie-consent-accept').click();
  await expect(page.locator('[data-analytics-event="crowdsupply_click"]').first()).toBeVisible();
  await page.locator('[data-analytics-event="crowdsupply_click"]').first().click({ modifiers: ['Meta'] });

  await expect
    .poll(async () =>
      page.evaluate(() => {
        const dl = window.dataLayer || [];
        const hit = dl.find(
          (e: { 0?: string; 1?: string; 2?: Record<string, string> }) =>
            e?.[0] === 'event' && e?.[1] === 'crowdsupply_click',
        );
        return hit?.[2]?.utm_source === 'test_instagram' && hit?.[2]?.utm_campaign === 'p0_test';
      }),
    )
    .toBe(true);
});

test('analytics events do not fire before consent', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.locator('[data-analytics-event="crowdsupply_click"]').first().click();

  const hasClickEvent = await page.evaluate(() => {
    const dl = window.dataLayer || [];
    return dl.some(
      (e: { 0?: string; 1?: string }) => e?.[0] === 'event' && e?.[1] === 'crowdsupply_click',
    );
  });
  expect(hasClickEvent).toBe(false);
});

test('locale switch href preserves landing UTMs without _gl', async ({ page }) => {
  await page.goto(
    '/?utm_source=test_instagram&utm_campaign=p0_test&_gl=1*linker*noise',
    { waitUntil: 'domcontentloaded' },
  );

  const deLink = page.locator('a[data-locale-switch][href*="de.openterface.com"]').first();
  await expect(deLink).not.toHaveCount(0);

  const href = await deLink.getAttribute('href');
  expect(href).toContain('utm_source=test_instagram');
  expect(href).toContain('utm_campaign=p0_test');
  expect(href).not.toContain('_gl=');
});
