import { test, expect } from '@playwright/test';

test('home page loads and has carousel', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.locator('#home-carousel .carousel-slide').first()).toBeVisible({ timeout: 10000 });
  await expect(page.locator('h1').first()).toBeVisible();
});

test('home page has YouTube video strip with external links', async ({ page }) => {
  await page.goto('/', { waitUntil: 'commit', timeout: 15000 });
  const strip = page.getByRole('region', { name: 'Community videos on YouTube' });
  await expect(strip).toBeVisible({ timeout: 10000 });
  const youtubeLinks = strip.locator('a[href*="youtube.com/watch"]');
  await expect(youtubeLinks.first()).toBeVisible();
  expect(await youtubeLinks.count()).toBeGreaterThanOrEqual(5);
});

test('product landing has single h1', async ({ page }) => {
  await page.goto('/minikvm/', { waitUntil: 'commit', timeout: 15000 });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});

test('flat product routes return 200', async ({ page }) => {
  for (const route of ['/products/', '/minikvm/', '/kvmgo/', '/keymod/', '/kvmext/', '/accessories/']) {
    const response = await page.goto(route, { waitUntil: 'commit', timeout: 15000 });
    expect(response?.status()).toBe(200);
  }
});
