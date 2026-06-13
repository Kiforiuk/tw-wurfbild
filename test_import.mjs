import { chromium } from 'playwright';
import path from 'path';
import XLSX from 'xlsx';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 10000 });

    console.log('Waiting for Import button...');
    const importButton = page.locator('label[for="import-file"]');
    await importButton.waitFor({ state: 'visible', timeout: 5000 });
    console.log('✓ Import button found');

    // Verify the input element has the correct id
    const fileInput = page.locator('input[id="import-file"]');
    const inputCount = await fileInput.count();
    console.log(`Found ${inputCount} input element(s) with id="import-file"`);

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

    // Wait for the alert
    await page.waitForTimeout(2000);

    if (dialogMessage.includes('importiert')) {
      console.log('✅ SUCCESS: Import functionality works!');
      console.log('   Dialog confirmed:', dialogMessage);
    } else if (dialogMessage) {
      console.log('⚠️  Dialog appeared but unexpected message:', dialogMessage);
    } else {
      console.log('⚠️  No import dialog appeared');
    }

  } catch (error) {
    console.error('❌ TEST FAILED:', error.message);
  } finally {
    await browser.close();
  }
})();
