import { chromium } from '@playwright/test';

async function testMobile() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone size
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  await page.goto('http://localhost:5173');

  // Wait for app to load
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({ path: 'mobile-view.png', fullPage: true });

  console.log('✅ Mobile screenshot saved to mobile-view.png');
  console.log('Viewport: 375x667 (iPhone)');

  // Check for common issues
  const buttons = await page.locator('button').count();
  const inputs = await page.locator('input, select').count();

  console.log(`Found ${buttons} buttons and ${inputs} inputs`);

  await browser.close();
}

testMobile().catch(console.error);
