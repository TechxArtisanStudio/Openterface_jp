import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page has no critical a11y violations', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  const results = await new AxeBuilder({ page })
    .exclude('header')
    .exclude('.btn')
    .exclude('.carousel-copy-heading')
    .exclude('.carousel-copy-description')
    .exclude('.carousel-copy-actions')
    .exclude('.carousel-progress-nav')
    .analyze();
  const critical = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious');
  expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
});

test('product landing has accessible headings', async ({ page }) => {
  await page.goto('/products/minikvm/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});
