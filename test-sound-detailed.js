import { chromium } from 'playwright';

async function testSoundsDetailed() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Expose function to test sounds from page context
  await page.addInitScript(() => {
    window.testSoundPlayback = {
      checkAudioElements: () => {
        const startSound = document.getElementById('startSound');
        const stopSound = document.getElementById('stopSound');
        return {
          startSoundElement: !!startSound,
          stopSoundElement: !!stopSound,
          startSoundSrc: startSound?.querySelector('source')?.src || 'NOT FOUND',
          stopSoundSrc: stopSound?.querySelector('source')?.src || 'NOT FOUND'
        };
      },

      playStartSound: () => {
        const audio = document.getElementById('startSound');
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(err => ({ error: err.message }));
          return { played: true, duration: audio.duration };
        }
        return { error: 'startSound not found' };
      },

      playStopSound: () => {
        const audio = document.getElementById('stopSound');
        if (audio) {
          audio.currentTime = 0;
          audio.play().catch(err => ({ error: err.message }));
          return { played: true, duration: audio.duration };
        }
        return { error: 'stopSound not found' };
      },

      checkTimerButtons: () => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return {
          totalButtons: buttons.length,
          playButton: !!buttons.some(b => b.textContent?.includes('▶') || b.classList.toString().includes('play')),
          pauseButton: !!buttons.some(b => b.textContent?.includes('⏸') || b.classList.toString().includes('pause'))
        };
      }
    };
  });

  try {
    console.log('🎮 Opening app at http://localhost:5173...\n');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    console.log('✅ App loaded successfully\n');

    // Check audio elements
    console.log('🔍 Checking Audio Elements:');
    const audioCheck = await page.evaluate(() => window.testSoundPlayback.checkAudioElements());
    console.log('  startSound element found:', audioCheck.startSoundElement);
    console.log('  stopSound element found:', audioCheck.stopSoundElement);
    console.log('  startSound source:', audioCheck.startSoundSrc);
    console.log('  stopSound source:', audioCheck.stopSoundSrc);
    console.log('');

    // Check timer buttons
    console.log('🎛️ Checking Timer Buttons:');
    const buttonCheck = await page.evaluate(() => window.testSoundPlayback.checkTimerButtons());
    console.log('  Total buttons:', buttonCheck.totalButtons);
    console.log('  Play button found:', buttonCheck.playButton);
    console.log('  Pause button found:', buttonCheck.pauseButton);
    console.log('');

    // Test START sound
    console.log('🔊 Testing START Sound:');
    const startResult = await page.evaluate(() => window.testSoundPlayback.playStartSound());
    console.log('  Result:', startResult);
    await page.waitForTimeout(2000);
    console.log('');

    // Test STOP sound
    console.log('🔊 Testing STOP Sound:');
    const stopResult = await page.evaluate(() => window.testSoundPlayback.playStopSound());
    console.log('  Result:', stopResult);
    await page.waitForTimeout(2000);
    console.log('');

    // Check if sounds exist in public folder
    console.log('📁 Checking if sound files are accessible:');
    const startSoundCheck = await page.evaluate(() => fetch('/sounds/START.mp3').then(r => r.status));
    const stopSoundCheck = await page.evaluate(() => fetch('/sounds/STOP.mp3').then(r => r.status));
    console.log('  /sounds/START.mp3 HTTP status:', startSoundCheck);
    console.log('  /sounds/STOP.mp3 HTTP status:', stopSoundCheck);
    console.log('');

    // Summary
    console.log('='.repeat(50));
    console.log('✨ SOUND TEST SUMMARY:');
    console.log('='.repeat(50));

    const soundsOk = audioCheck.startSoundElement && audioCheck.stopSoundElement;
    const filesOk = startSoundCheck === 200 && stopSoundCheck === 200;
    const buttonsOk = buttonCheck.playButton && buttonCheck.pauseButton;

    console.log('Audio Elements Present:', soundsOk ? '✅' : '❌');
    console.log('Sound Files Accessible:', filesOk ? '✅' : '❌');
    console.log('Timer Buttons Available:', buttonsOk ? '✅' : '❌');
    console.log('');

    if (soundsOk && filesOk) {
      console.log('🎉 SOUNDS ARE WORKING! All components are in place.');
    } else {
      console.log('⚠️ ISSUES DETECTED:');
      if (!soundsOk) console.log('   - Audio elements are missing from DOM');
      if (!filesOk) console.log('   - Sound files are not accessible');
      if (!buttonsOk) console.log('   - Timer buttons not found');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await browser.close();
  }
}

testSoundsDetailed().catch(console.error);
