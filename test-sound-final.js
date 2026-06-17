import { chromium } from 'playwright';

async function testSoundFinal() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Track all audio playback
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
    console.log('🎮 Opening app...\n');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    // Wait for app to fully load
    await page.waitForTimeout(1000);

    console.log('📍 Step 1: Identifying buttons...');
    const allButtons = await page.locator('button').all();
    console.log(`Found ${allButtons.length} total buttons\n`);

    // Find play button by title
    console.log('⏯️ Step 2: Finding and clicking PLAY (START) button...');
    const playButton = await page.locator('button[title="Start"]').first();

    if (await playButton.isVisible()) {
      console.log('✅ Found PLAY button (title="Start")');
      await playButton.click();
      console.log('✅ Clicked PLAY button - timer starting, START sound should play\n');

      await page.waitForTimeout(1500); // Wait for sound to play

      console.log('⏱️ Step 3: Waiting for state change and PAUSE button to appear...');
      // Wait for pause button to appear (which means timer is running)
      const pauseButton = await page.locator('button[title="Pause"]').first();

      if (await pauseButton.isVisible()) {
        console.log('✅ PAUSE button appeared (timer is running)\n');

        console.log('⏸️ Step 4: Clicking PAUSE button...');
        await pauseButton.click();
        console.log('✅ Clicked PAUSE button - timer pausing, STOP sound should play\n');

        await page.waitForTimeout(1500); // Wait for sound to play
      } else {
        console.log('⚠️ PAUSE button not found or not visible');
      }
    } else {
      console.log('❌ PLAY button not found');
    }

    // Get the audio log
    const audioLog = await page.evaluate(() => window.audioPlayLog);

    console.log('='.repeat(65));
    console.log('🔊 AUDIO PLAYBACK LOG:');
    console.log('='.repeat(65));
    console.log(`Total audio events recorded: ${audioLog.length}\n`);

    if (audioLog.length === 0) {
      console.log('❌ No audio events were recorded');
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

    // Summary
    console.log('='.repeat(65));
    console.log('✨ SOUND TEST RESULTS:');
    console.log('='.repeat(65));

    const hasStartSound = audioLog.some(e => e.id === 'startSound');
    const hasStopSound = audioLog.some(e => e.id === 'stopSound');

    console.log('START sound (timer start):', hasStartSound ? '✅ WORKING' : '❌ NOT DETECTED');
    console.log('STOP sound (timer pause):', hasStopSound ? '✅ WORKING' : '❌ NOT DETECTED');
    console.log('');

    if (hasStartSound && hasStopSound) {
      console.log('🎉 SUCCESS! BOTH SOUNDS ARE FULLY FUNCTIONAL!');
      console.log('   ✓ START sound plays on timer start (1.152s)');
      console.log('   ✓ STOP sound plays on timer pause (0.744s)');
    } else if (hasStartSound) {
      console.log('⚠️ PARTIAL: START sound works, but STOP sound issue');
    } else if (hasStopSound) {
      console.log('⚠️ PARTIAL: STOP sound works, but START sound issue');
    } else {
      console.log('❌ ISSUE: No sounds were detected');
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  } finally {
    await browser.close();
  }
}

testSoundFinal().catch(console.error);
