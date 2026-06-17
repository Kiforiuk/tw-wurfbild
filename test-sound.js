import { chromium } from 'playwright';

async function testSounds() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // Enable console logging
  const page = await context.newPage();

  // Collect console messages
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`[${msg.type()}] ${msg.text()}`);
  });

  try {
    console.log('🎮 Opening app at http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    console.log('⏳ Waiting for app to load...');
    await page.waitForSelector('button', { timeout: 5000 });

    console.log('\n📸 Taking screenshot of app...');
    await page.screenshot({ path: 'app-startup.png', fullPage: true });

    // Wait for page to be fully interactive
    await page.waitForTimeout(2000);

    console.log('\n🔊 Testing SOUND 1: Timer START...');
    console.log('Looking for timer START button...');

    // Find and click the play button (timer start)
    const playButton = await page.locator('button').filter({ has: page.locator('[class*="Play"]') }).first();
    const allButtons = await page.locator('button').all();

    console.log(`Found ${allButtons.length} buttons on page`);

    // Try to find and click play button
    for (let i = 0; i < Math.min(5, allButtons.length); i++) {
      const btn = allButtons[i];
      const text = await btn.textContent();
      console.log(`Button ${i}: ${text?.trim() || '(icon)'}`);
    }

    // Look for the play button specifically
    const playBtn = await page.locator('button').filter({ has: page.locator('svg') }).first();
    if (playBtn) {
      console.log('🎬 Clicking PLAY button (timer start)...');
      await playBtn.click();
      await page.waitForTimeout(1000);
      console.log('✅ PLAY button clicked - sound should play');
    }

    await page.screenshot({ path: 'app-after-play.png', fullPage: true });

    console.log('\n⏸️ Testing SOUND 2: Timer STOP (Pause)...');
    await page.waitForTimeout(1000);

    // Click pause button
    const allBtns = await page.locator('button').all();
    for (let i = 0; i < Math.min(10, allBtns.length); i++) {
      const btn = allBtns[i];
      const text = await btn.textContent();
      if (text?.includes('|') || text?.includes('⏸')) {
        console.log(`Found pause button at index ${i}`);
        await btn.click();
        await page.waitForTimeout(1000);
        console.log('✅ PAUSE button clicked - sound should play');
        break;
      }
    }

    await page.screenshot({ path: 'app-after-pause.png', fullPage: true });

    console.log('\n📊 Console Output Summary:');
    consoleLogs.forEach(log => console.log('  ' + log));

    console.log('\n✨ Test complete! Check app-*.png files for screenshots.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testSounds().catch(console.error);
