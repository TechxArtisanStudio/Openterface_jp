import type { Page } from '@playwright/test';

/** CI preview uses 127.0.0.1 — AnalyticsHead stubs third-party scripts on non-production hosts. */
export async function isLocalPreview(page: Page): Promise<boolean> {
  return page.evaluate(() => /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname));
}
