const { chromium } = require('playwright');
const path = require('path');
const XLSX = require('xlsx');

// Create test Excel file
const testDataPath = path.join(__dirname, 'test_wurfe.xlsx');
const testData = [
  { time: '00:10', torwart: 'TW 1', gegenspieler: '5', wurfposition: 'LA', macroZone: '1', microZone: '2', ergebnis: 'tor' },
  { time: '00:15', torwart: 'TW 2', gegenspieler: '7', wurfposition: 'RM', macroZone: '5', microZone: '5', ergebnis: 'gehalten' }
];

const ws = XLSX.utils.json_to_sheet(testData);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Würfe');
XLSX.writeFile(wb, testDataPath);

console.log('Test Excel file created at:', testDataPath);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to localhost
    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    // Wait for the Import button to be visible
    console.log('Waiting for Import button...');
    const importButton = page.locator('label[for="import-file"]');
    await importButton.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✓ Import button found');

    // Get the hidden file input
    const fileInput = page.locator('input[id="import-file"]');

    // Set the file
    console.log('Setting file input...');
    await fileInput.setInputFiles(testDataPath);
    console.log('✓ File selected');

    // Wait for dialog
    let dialogMessage = '';
    page.once('dialog', async dialog => {
      dialogMessage = dialog.message();
      console.log('Dialog received:', dialogMessage);
      await dialog.accept();
    });

    // Wait a moment for the alert to appear
    await page.waitForTimeout(2000);

    if (dialogMessage.includes('importiert')) {
      console.log('✅ SUCCESS: Import functionality works!');
      console.log('   Dialog confirmed:', dialogMessage);
    } else {
      console.log('⚠️  WARNING: No import dialog or unexpected message');
    }

    // Take screenshot
    await page.screenshot({ path: 'test_import_screenshot.png' });
    console.log('Screenshot saved: test_import_screenshot.png');

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
  } finally {
    await browser.close();
  }
})();
