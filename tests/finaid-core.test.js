const assert = require('node:assert');
const FinAidCore = require('../js/finaid-core.js');

console.log('Running finaid-core test suite...\n');

// 1. TAG Tests
const tagUnder1500 = FinAidCore.calculateTag(1200);
assert.strictEqual(tagUnder1500.annual, 9496);
assert.strictEqual(tagUnder1500.fall, 4748);
assert.strictEqual(tagUnder1500.spring, 4748);

const tagHighNjei = FinAidCore.calculateTag(8000);
assert.strictEqual(tagHighNjei.annual, 0);

const tagNull = FinAidCore.calculateTag('');
assert.strictEqual(tagNull, null);
console.log('✓ TAG calculations pass');

// 2. Pell Tests
const pellMax = FinAidCore.calculatePell(0);
assert.strictEqual(pellMax.status, 'maximum');
assert.strictEqual(pellMax.annual, 7395);

const pellCalculated = FinAidCore.calculatePell(1000);
assert.strictEqual(pellCalculated.status, 'calculated');
assert.strictEqual(pellCalculated.annual, 6395);

const pellBelowMin = FinAidCore.calculatePell(7000);
assert.strictEqual(pellBelowMin.status, 'ineligible');
assert.strictEqual(pellBelowMin.annual, 0);

const pellExceeds = FinAidCore.calculatePell(8000);
assert.strictEqual(pellExceeds.status, 'ineligible');
assert.strictEqual(pellExceeds.annual, 0);
console.log('✓ Federal Pell Grant calculations pass');

// 3. Loan Origination Fee Tests
const loan3500 = FinAidCore.calculateLoanFees(3500);
assert.strictEqual(loan3500.annualGross, 3500);
assert.strictEqual(loan3500.fallGross, 1750);
assert.strictEqual(FinAidCore.formatCurrency(loan3500.annualFee, 2, 2), '$37.00');
console.log('✓ Direct Loan fee deductions pass');

// 4. Loan Proration Tests
const prorationDep12 = FinAidCore.calculateLoanProration(12, 'dependent');
assert.strictEqual(prorationDep12.proratedTotal, 3750);
assert.strictEqual(prorationDep12.proratedSub, 2750);
assert.strictEqual(prorationDep12.proratedUnsub, 1000);

const prorationInd12 = FinAidCore.calculateLoanProration(12, 'independent');
assert.strictEqual(prorationInd12.proratedTotal, 6250);
assert.strictEqual(prorationInd12.proratedSub, 2750);
assert.strictEqual(prorationInd12.proratedUnsub, 3500);
console.log('✓ Loan proration calculations pass');

console.log('\nAll finaid-core tests passed successfully!');
