import XLSX from 'xlsx';
import fs from 'fs';

// Test data
const testData = [
  { time: '00:10', torwart: 'TW 1', gegenspieler: '5', wurfposition: 'LA', macroZone: '1', microZone: '2', ergebnis: 'tor' },
  { time: '00:15', torwart: 'TW 2', gegenspieler: '7', wurfposition: 'RM', macroZone: '5', microZone: '5', ergebnis: 'gehalten' },
  { time: '00:20', torwart: 'TW 1', gegenspieler: '9', wurfposition: 'RA', macroZone: '9', microZone: '8', ergebnis: 'vorbei' }
];

// Test 1: Standard format with German column names
console.log('Creating test files...');

// File 1: Standard .xlsx
const ws1 = XLSX.utils.json_to_sheet(testData);
const wb1 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb1, ws1, 'Würfe');
XLSX.writeFile(wb1, 'test_standard.xlsx');
console.log('✓ test_standard.xlsx created');

// File 2: Same data with different column names (English/variations)
const testData2 = [
  { Zeit: '00:10', TW: 'TW 1', Opponent: '5', Pos: 'LA', Grob: '1', Fein: '2', Result: 'tor' },
  { Zeit: '00:15', TW: 'TW 2', Opponent: '7', Pos: 'RM', Grob: '5', Fein: '5', Result: 'gehalten' },
];
const ws2 = XLSX.utils.json_to_sheet(testData2);
const wb2 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb2, ws2, 'Data');
XLSX.writeFile(wb2, 'test_variation.xlsx');
console.log('✓ test_variation.xlsx created');

// File 3: .xls format (older Excel)
const testData3 = [
  { time: '00:25', torwart: 'TW 3', gegenspieler: '3', wurfposition: 'KM', macroZone: '5', microZone: '4', ergebnis: 'tor' },
];
const ws3 = XLSX.utils.json_to_sheet(testData3);
const wb3 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb3, ws3, 'Sheet1');
XLSX.writeFile(wb3, 'test_old_format.xls');
console.log('✓ test_old_format.xls created');

// File 4: CSV format
const csvContent = `time,torwart,gegenspieler,wurfposition,macroZone,microZone,ergebnis
00:30,TW 1,4,7m,7,9,tor
00:35,TW 2,8,TG,9,9,vorbei`;
fs.writeFileSync('test_csv.csv', csvContent);
console.log('✓ test_csv.csv created');

// File 5: Case insensitive headers
const testData5 = [
  { TIME: '00:40', TORWART: 'TW 1', GEGENSPIELER: '2', WURFPOSITION: 'RL', MACROZONE: '2', MICROZONE: '3', ERGEBNIS: 'gehalten' },
];
const ws5 = XLSX.utils.json_to_sheet(testData5);
const wb5 = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb5, ws5, 'Daten');
XLSX.writeFile(wb5, 'test_uppercase.xlsx');
console.log('✓ test_uppercase.xlsx created');

console.log('\n✅ All test files created successfully!');
console.log('Available test files:');
console.log('  - test_standard.xlsx (standard format)');
console.log('  - test_variation.xlsx (different column names)');
console.log('  - test_old_format.xls (older Excel format)');
console.log('  - test_csv.csv (CSV format)');
console.log('  - test_uppercase.xlsx (uppercase headers)');
