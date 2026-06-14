import { chromium } from '@playwright/test';

async function testViews() {
  const browser = await chromium.launch({ headless: true });

  // Test desktop view
  console.log('📱 Testing Desktop View (1920x1080)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const desktopPage = await desktopContext.newPage();
  await desktopPage.goto('http://localhost:5173');
  await desktopPage.waitForLoadState('networkidle');
  await desktopPage.screenshot({ path: 'desktop-view.png', fullPage: false });
  console.log('✅ Desktop screenshot saved');
  await desktopContext.close();

  // Test tablet view
  console.log('📱 Testing Tablet View (768x1024)...');
  const tabletContext = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    isMobile: true,
    hasTouch: true,
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('http://localhost:5173');
  await tabletPage.waitForLoadState('networkidle');
  await tabletPage.screenshot({ path: 'tablet-view.png', fullPage: false });
  console.log('✅ Tablet screenshot saved');
  await tabletContext.close();

  // Test different mobile devices
  console.log('📱 Testing Mobile View (375x667 - iPhone)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173');
  await mobilePage.waitForLoadState('networkidle');

  // Test button sizes
  const buttons = await mobilePage.locator('button').count();
  const selects = await mobilePage.locator('select').count();

  // Get button size info
  const firstButton = mobilePage.locator('button').first();
  const buttonBox = await firstButton.boundingBox();

  console.log(`  Buttons: ${buttons}, Selects: ${selects}`);
  if (buttonBox) {
    console.log(`  First button size: ${buttonBox.width}x${buttonBox.height}px`);
    console.log(`  ✅ ${buttonBox.height >= 44 ? 'Touch target size OK' : 'Touch target too small'} (min 44px recommended)`);
  }

  await mobilePage.screenshot({ path: 'mobile-view.png', fullPage: true });
  console.log('✅ Mobile full page screenshot saved');
  await mobileContext.close();

  await browser.close();
  console.log('\n✨ All tests completed successfully!');
}

testViews().catch(console.error);
