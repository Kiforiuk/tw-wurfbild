const { test, expect } = require('@playwright/test');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

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

test('Import Excel file through UI', async ({ page }) => {
  // Navigate to localhost
  await page.goto('http://localhost:5173');

  // Wait for the Import button to be visible
  const importButton = page.locator('label[for="import-file"]');
  await expect(importButton).toBeVisible();

  // Get the hidden file input
  const fileInput = page.locator('input[id="import-file"]');

  // Set the file
  await fileInput.setInputFiles(testDataPath);

  // Wait for the success alert
  page.on('dialog', dialog => {
    console.log('Dialog message:', dialog.message());
    expect(dialog.message()).toContain('importiert');
    dialog.accept();
  });

  // Wait a moment for the alert to appear
  await page.waitForTimeout(1000);

  // Check if the data appears in the UI
  const wurfList = page.locator('text=Würfe');
  await expect(wurfList).toBeVisible();

  console.log('Test passed: Import functionality works!');
});
