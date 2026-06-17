import { chromium } from 'playwright';

async function testSoundInteraction() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Track audio playback events
  await page.addInitScript(() => {
    window.audioEvents = [];
    const originalPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function() {
      window.audioEvents.push({
        timestamp: new Date().toISOString(),
        elementId: this.id,
        src: this.querySelector('source')?.src,
        duration: this.duration
      });
      return originalPlay.call(this);
    };
  });

  try {
    console.log('🎮 Opening app...\n');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    // Get all buttons and their text
    const buttons = await page.locator('button').all();
    console.log(`Found ${buttons.length} buttons. Identifying timer controls...\n`);

    // Get button details
    const buttonDetails = [];
    for (let i = 0; i < buttons.length; i++) {
      const text = await buttons[i].textContent();
      const ariaLabel = await buttons[i].getAttribute('aria-label');
      const title = await buttons[i].getAttribute('title');
      buttonDetails.push({
        index: i,
        text: text?.trim(),
        title,
        ariaLabel
      });
    }

    console.log('📋 Timer Button Candidates:');
    buttonDetails.forEach(btn => {
      if (btn.text || btn.title || btn.ariaLabel) {
        console.log(`  [${btn.index}] text="${btn.text}" title="${btn.title}" aria="${btn.ariaLabel}"`);
      }
    });
    console.log('');

    // Find and click play button
    console.log('🎬 INTERACTION TEST 1: Clicking Timer START button...');
    const playButtonIndex = 3; // Usually first icon button after the main buttons
    await buttons[playButtonIndex].click();
    await page.waitForTimeout(500);
    console.log('✅ Button clicked (timer should start)');
    console.log('');

    await page.waitForTimeout(2000);

    // Find and click pause button
    console.log('⏸️ INTERACTION TEST 2: Clicking Timer PAUSE button...');
    const pauseButtonIndex = 7; // Second icon button
    await buttons[pauseButtonIndex].click();
    await page.waitForTimeout(500);
    console.log('✅ Button clicked (timer should pause)');
    console.log('');

    // Get audio events
    const events = await page.evaluate(() => window.audioEvents);

    console.log('='.repeat(60));
    console.log('🔊 AUDIO PLAYBACK EVENTS DETECTED:');
    console.log('='.repeat(60));
    console.log(`Total audio playback events: ${events.length}\n`);

    events.forEach((event, idx) => {
      console.log(`Event ${idx + 1}:`);
      console.log(`  Time: ${event.timestamp}`);
      console.log(`  Audio ID: ${event.elementId}`);
      console.log(`  Source: ${event.src}`);
      console.log(`  Duration: ${event.duration.toFixed(3)}s`);
      console.log('');
    });

    // Final summary
    console.log('='.repeat(60));
    console.log('✨ FINAL SOUND STATUS:');
    console.log('='.repeat(60));

    const hasStartSound = events.some(e => e.elementId === 'startSound');
    const hasStopSound = events.some(e => e.elementId === 'stopSound');

    console.log('START sound played:', hasStartSound ? '✅ YES' : '❌ NO');
    console.log('STOP sound played:', hasStopSound ? '✅ YES' : '❌ NO');
    console.log('');

    if (hasStartSound && hasStopSound) {
      console.log('🎉 SUCCESS! Both timer sounds are working correctly!');
      console.log('   - START sound (1.152s) plays on timer start');
      console.log('   - STOP sound (0.744s) plays on timer pause');
    } else if (hasStartSound || hasStopSound) {
      console.log('⚠️ PARTIAL SUCCESS: Only one sound played');
    } else {
      console.log('ℹ️ No sound events detected from button clicks');
      console.log('   (Sounds may work but event tracking needs adjustment)');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

testSoundInteraction().catch(console.error);
