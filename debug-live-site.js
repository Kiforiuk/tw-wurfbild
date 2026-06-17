import { chromium } from 'playwright';

async function debugLiveSite() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const errors = [];
  const logs = [];

  page.on('console', msg => {
    const logEntry = `[${msg.type()}] ${msg.text()}`;
    logs.push(logEntry);
    console.log(logEntry);
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      errors.push(`HTTP ${response.status()}: ${response.url()}`);
    }
  });

  try {
    console.log('🔍 Debugging https://tw-wurfbild.ki-kiffy.com\n');

    console.log('📡 Loading website...');
    const response = await page.goto('https://tw-wurfbild.ki-kiffy.com', { waitUntil: 'domcontentloaded' });
    console.log(`HTTP Status: ${response?.status()}\n`);

    await page.waitForTimeout(3000);

    console.log('📝 Checking page content...');
    const htmlContent = await page.content();
    const hasReactRoot = htmlContent.includes('id="root"');
    const hasTitle = htmlContent.includes('Handball');
    const hasScript = htmlContent.includes('script');

    console.log(`  Has <div id="root">: ${hasReactRoot ? '✅' : '❌'}`);
    console.log(`  Has title "Handball": ${hasTitle ? '✅' : '❌'}`);
    console.log(`  Has scripts: ${hasScript ? '✅' : '❌'}`);
    console.log('');

    console.log('🔎 Checking for JavaScript errors...');
    const pageErrors = await page.evaluate(() => {
      return {
        hasErrors: !!window._pageErrors,
        errorCount: window._pageErrors?.length || 0
      };
    });
    console.log(`  Page errors: ${pageErrors.errorCount}\n`);

    console.log('🎯 Checking for specific elements...');
    const hasButtons = await page.locator('button').count();
    const hasTimer = await page.locator('[class*="timer"]').count();
    const hasHeaderText = await page.locator('text=Handball TW Analyse').count();

    console.log(`  Total buttons found: ${hasButtons}`);
    console.log(`  Timer elements: ${hasTimer}`);
    console.log(`  Header text present: ${hasHeaderText > 0 ? '✅' : '❌'}`);
    console.log('');

    console.log('📊 Network errors detected:');
    if (errors.length === 0) {
      console.log('  ✅ No 4xx/5xx errors\n');
    } else {
      errors.forEach(err => console.log(`  ❌ ${err}`));
      console.log('');
    }

    console.log('📋 Console logs summary:');
    console.log(`  Total messages: ${logs.length}\n`);

    // Take screenshot of actual page
    await page.screenshot({ path: 'debug-live-content.png', fullPage: true });
    console.log('📸 Screenshot saved: debug-live-content.png\n');

    // Check if it's a build/deployment issue
    const pageSource = htmlContent.substring(0, 500);
    console.log('🔍 First 500 chars of page source:');
    console.log(pageSource);
    console.log('\n');

    // Try to find the actual issue
    if (!hasReactRoot) {
      console.log('❌ ISSUE FOUND: React root element missing!');
      console.log('   Possible causes:');
      console.log('   1. GitHub Pages deployment incomplete');
      console.log('   2. Service Worker serving old/broken version');
      console.log('   3. index.html not deployed correctly');
    } else if (hasButtons === 0) {
      console.log('⚠️ No buttons found - app may not be rendering');
    } else {
      console.log('✅ App elements found - checking audio specifically...');

      const hasAudio = await page.locator('audio').count();
      const hasStartSound = await page.locator('#startSound').count();
      const hasStopSound = await page.locator('#stopSound').count();

      console.log(`  Audio elements: ${hasAudio}`);
      console.log(`  #startSound: ${hasStartSound > 0 ? '✅' : '❌'}`);
      console.log(`  #stopSound: ${hasStopSound > 0 ? '✅' : '❌'}`);
    }

  } catch (error) {
    console.error('❌ Error during debug:', error.message);
  } finally {
    await browser.close();
  }
}

debugLiveSite().catch(console.error);
