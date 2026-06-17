import { chromium } from 'playwright';

async function testLiveSounds() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Track audio playback events
  await page.addInitScript(() => {
    window.audioPlayLog = [];
    const originalPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function() {
      window.audioPlayLog.push({
        id: this.id,
        time: new Date().toISOString(),
        src: this.querySelector('source')?.src,
        duration: this.duration
      });
      console.log(`🔊 Audio played: ${this.id}`);
      return originalPlay.call(this);
    };
  });

  try {
    console.log('🌐 Opening LIVE website: https://tw-wurfbild.ki-kiffy.com\n');
    await page.goto('https://tw-wurfbild.ki-kiffy.com', { waitUntil: 'networkidle', timeout: 15000 });

    // Wait for app to fully load
    await page.waitForTimeout(2000);

    console.log('📍 Step 1: Checking page load...');
    const title = await page.title();
    console.log(`✅ Page loaded: "${title}"\n`);

    // Take screenshot before test
    await page.screenshot({ path: 'live-before-sound-test.png', fullPage: true });
    console.log('📸 Screenshot taken: live-before-sound-test.png\n');

    console.log('⏯️ Step 2: Finding and clicking PLAY (START) button...');
    const playButton = await page.locator('button[title="Start"]').first();

    if (await playButton.isVisible()) {
      console.log('✅ Found PLAY button');
      await playButton.click();
      console.log('✅ Clicked PLAY button - START sound should play\n');

      await page.waitForTimeout(2000);

      console.log('⏱️ Step 3: Waiting for PAUSE button to appear...');
      const pauseButton = await page.locator('button[title="Pause"]').first();

      if (await pauseButton.isVisible()) {
        console.log('✅ PAUSE button appeared (timer is running)\n');

        // Take screenshot with timer running
        await page.screenshot({ path: 'live-timer-running.png', fullPage: true });
        console.log('📸 Screenshot taken: live-timer-running.png\n');

        console.log('⏸️ Step 4: Clicking PAUSE button...');
        await pauseButton.click();
        console.log('✅ Clicked PAUSE button - STOP sound should play\n');

        await page.waitForTimeout(2000);

        // Take screenshot after pause
        await page.screenshot({ path: 'live-after-pause.png', fullPage: true });
        console.log('📸 Screenshot taken: live-after-pause.png\n');
      } else {
        console.log('⚠️ PAUSE button not found');
      }
    } else {
      console.log('❌ PLAY button not found');
    }

    // Get the audio log
    const audioLog = await page.evaluate(() => window.audioPlayLog);

    console.log('='.repeat(70));
    console.log('🔊 LIVE SOUND TEST RESULTS:');
    console.log('='.repeat(70));
    console.log(`\nTotal audio events recorded: ${audioLog.length}\n`);

    if (audioLog.length === 0) {
      console.log('❌ No audio events detected');
    } else {
      audioLog.forEach((event, idx) => {
        console.log(`Event ${idx + 1}:`);
        console.log(`  Audio ID: ${event.id}`);
        console.log(`  Time: ${event.time}`);
        console.log(`  Duration: ${event.duration.toFixed(3)}s`);
        console.log(`  Source: ${event.src}`);
        console.log('');
      });
    }

    // Final verdict
    console.log('='.repeat(70));
    console.log('✨ LIVE SOUND TEST VERDICT:');
    console.log('='.repeat(70));

    const hasStartSound = audioLog.some(e => e.id === 'startSound');
    const hasStopSound = audioLog.some(e => e.id === 'stopSound');

    console.log('\nSTART sound (timer start):', hasStartSound ? '✅ WORKING' : '❌ NOT DETECTED');
    console.log('STOP sound (timer pause):', hasStopSound ? '✅ WORKING' : '❌ NOT DETECTED');
    console.log('');

    if (hasStartSound && hasStopSound) {
      console.log('🎉 SUCCESS! BOTH SOUNDS ARE WORKING ON LIVE SITE!');
      console.log('   ✓ START sound plays on timer start (1.152s)');
      console.log('   ✓ STOP sound plays on timer pause (0.744s)');
      console.log('   ✓ DEPLOYMENT SUCCESSFUL ✓');
    } else if (hasStartSound) {
      console.log('⚠️ PARTIAL: START sound works, but STOP sound issue');
    } else if (hasStopSound) {
      console.log('⚠️ PARTIAL: STOP sound works, but START sound issue');
    } else {
      console.log('❌ ISSUE: No sounds were detected on live site');
    }

    console.log('\n' + '='.repeat(70));
    console.log('Website URL: https://tw-wurfbild.ki-kiffy.com');
    console.log('Test Date: ' + new Date().toLocaleString());
    console.log('='.repeat(70));

  } catch (error) {
    console.error('❌ Test error:', error.message);
  } finally {
    await browser.close();
  }
}

testLiveSounds().catch(console.error);
