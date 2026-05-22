import { test, expect } from '@playwright/test';

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
