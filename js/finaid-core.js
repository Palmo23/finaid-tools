/**
 * Stockton University Financial Aid Toolkit Core Module
 * Centralized financial aid constants, rate schedules, and calculation logic.
 *
 * Can be loaded via standard <script src="../js/finaid-core.js"> (creates window.FinAidCore)
 * or imported as an ES module: import { FinAidCore } from './finaid-core.js';
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FinAidCore = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // --- Constants ---
  const MAX_PELL = 7395;
  const MIN_PELL = 739.50;
  const MAX_PELL_LEU = 600; // 600% lifetime eligibility limit
  const ORIGINATION_FEE_RATE = 0.01057; // 1.057% sequestration origination fee
  const ANNUAL_CREDITS_UG = 24; // Standard undergraduate full academic year load

  // Stockton University Tuition Aid Grant (TAG) Schedule (2026-2027)
  const TAG_TABLE_2026_2027 = [
    { min: -Infinity, max: 1499, label: "Under 1500", annual: 9496, fall: 4748, spring: 4748 },
    { min: 1500, max: 2499, label: "1500 – 2499", annual: 7922, fall: 3961, spring: 3961 },
    { min: 2500, max: 3499, label: "2500 – 3499", annual: 6706, fall: 3353, spring: 3353 },
    { min: 3500, max: 4499, label: "3500 – 4499", annual: 5554, fall: 2777, spring: 2777 },
    { min: 4500, max: 5499, label: "4500 – 5499", annual: 4604, fall: 2302, spring: 2302 },
    { min: 5500, max: 6499, label: "5500 – 6499", annual: 3594, fall: 1797, spring: 1797 },
    { min: 6500, max: 7499, label: "6500 – 7499", annual: 2616, fall: 1308, spring: 1308 },
    { min: 7500, max: Infinity, label: "7500+", annual: 0, fall: 0, spring: 0 }
  ];

  // Summer 2025 TAG Table
  const TAG_TABLE_SUMMER_2025 = [
    { max: 1499, ft: 2374, tqt: 1780, ht: 1186 },
    { max: 2499, ft: 1980, tqt: 1484, ht: 990  },
    { max: 3499, ft: 1676, tqt: 1256, ht: 838  },
    { max: 4499, ft: 1388, tqt: 1040, ht: 694  },
    { max: 5499, ft: 1150, tqt: 862,  ht: 574  },
    { max: 6499, ft: 898,  tqt: 672,  ht: 448  },
    { max: 7499, ft: 654,  tqt: 490,  ht: 326  }
  ];

  // Direct Loan Limits (Senior / Undergrad)
  const LOAN_LIMITS = {
    dependent:   { subsidized: 5500, unsubsidized: 2000, total: 7500 },
    independent: { subsidized: 5500, unsubsidized: 7000, total: 12500 }
  };

  // --- Formatting Helpers ---
  function formatCurrency(val, minDecimals = 0, maxDecimals = 0) {
    if (val === null || val === undefined || isNaN(val)) return '';
    return val.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals
    });
  }

  // --- Calculation Engines ---

  /**
   * Calculate New Jersey Tuition Aid Grant (TAG) for 2026-2027
   * @param {number|string} njeiInput - New Jersey Eligibility Index
   * @returns {object|null}
   */
  function calculateTag(njeiInput) {
    if (njeiInput === '' || njeiInput === null || isNaN(Number(njeiInput))) {
      return null;
    }
    const val = Math.floor(Number(njeiInput));
    const match = TAG_TABLE_2026_2027.find(row => val >= row.min && val <= row.max);
    return match || { min: 7500, max: Infinity, label: '7500+', annual: 0, fall: 0, spring: 0 };
  }

  /**
   * Calculate Federal Pell Grant Eligibility for 2026-2027
   * @param {number|string} saiInput - Student Aid Index
   * @param {number} maxPell - Max Pell amount (defaults to 7395)
   * @param {number} minPell - Min Pell amount (defaults to 739.50)
   * @returns {object|null}
   */
  function calculatePell(saiInput, maxPell = MAX_PELL, minPell = MIN_PELL) {
    if (saiInput === '' || saiInput === null || isNaN(Number(saiInput))) {
      return null;
    }
    const sai = Math.floor(Number(saiInput));

    if (sai > maxPell) {
      return {
        annual: 0,
        fall: 0,
        spring: 0,
        status: 'ineligible',
        note: 'SAI of ' + sai + ' exceeds maximum eligibility threshold (' + maxPell + '). Not eligible for Federal Pell Grant.'
      };
    }

    if (sai <= 0) {
      const fall = Math.ceil(maxPell / 2);
      const spring = maxPell - fall;
      return {
        annual: maxPell,
        fall,
        spring,
        status: 'maximum',
        note: 'SAI ≤ 0 qualifies for the Maximum Federal Pell Grant of ' + formatCurrency(maxPell) + '.'
      };
    }

    // Calculated Pell: Max - SAI rounded to nearest $5
    const calculated = maxPell - sai;
    const rounded = Math.round(calculated / 5) * 5;

    if (rounded < minPell) {
      return {
        annual: 0,
        fall: 0,
        spring: 0,
        status: 'ineligible',
        note: 'Calculated amount (' + formatCurrency(maxPell) + ' − ' + formatCurrency(sai) + ' = ' + formatCurrency(calculated) + ') rounded to ' + formatCurrency(rounded) + ' falls below the minimum threshold of ' + formatCurrency(minPell, 2, 2) + '.'
      };
    }

    const fall = Math.ceil(rounded / 2);
    const spring = rounded - fall;

    return {
      annual: rounded,
      fall,
      spring,
      status: 'calculated',
      note: 'Calculated award: ' + formatCurrency(maxPell) + ' − ' + formatCurrency(sai) + ' = ' + formatCurrency(calculated) + ', rounded to nearest $5 = ' + formatCurrency(rounded) + '.'
    };
  }

  /**
   * Calculate Direct Loan Origination Fee and Net Disbursement
   * @param {number|string} acceptedGross - Gross loan amount accepted
   * @param {number} feeRate - Origination fee rate (defaults to 1.057%)
   * @returns {object}
   */
  function calculateLoanFees(acceptedGross, feeRate = ORIGINATION_FEE_RATE) {
    const gross = Math.max(0, Number(acceptedGross) || 0);
    if (gross <= 0) {
      return {
        annualGross: 0,
        fallGross: 0,
        springGross: 0,
        annualFee: 0,
        fallFee: 0,
        springFee: 0,
        annualNet: 0,
        fallNet: 0,
        springNet: 0
      };
    }

    const fallGross = gross / 2;
    const springGross = gross / 2;

    const fallFee = fallGross * feeRate;
    const springFee = springGross * feeRate;
    const annualFee = fallFee + springFee;

    const fallNet = fallGross - fallFee;
    const springNet = springGross - springFee;
    const annualNet = fallNet + springNet;

    return {
      annualGross: gross,
      fallGross,
      springGross,
      annualFee,
      fallFee,
      springFee,
      annualNet,
      fallNet,
      springNet
    };
  }

  /**
   * Calculate Direct Loan Proration for Graduating Senior
   * @param {number} credits - Credits enrolled in final semester (capped at 12)
   * @param {'dependent'|'independent'} dependency - Student dependency status
   * @returns {object}
   */
  function calculateLoanProration(credits, dependency) {
    const limits = LOAN_LIMITS[dependency] || LOAN_LIMITS.dependent;
    const enrolledCredits = Math.min(Math.max(1, Number(credits) || 12), 12);
    const prorationFactor = enrolledCredits / ANNUAL_CREDITS_UG;

    const proratedTotal = Math.round(prorationFactor * limits.total);
    const proratedSub = Math.round(prorationFactor * limits.subsidized);
    const proratedUnsub = Math.round(prorationFactor * limits.unsubsidized);

    return {
      credits: enrolledCredits,
      prorationFactor,
      proratedTotal,
      proratedSub,
      proratedUnsub,
      limits
    };
  }

  return {
    MAX_PELL,
    MIN_PELL,
    MAX_PELL_LEU,
    ORIGINATION_FEE_RATE,
    ANNUAL_CREDITS_UG,
    TAG_TABLE_2026_2027,
    TAG_TABLE_SUMMER_2025,
    LOAN_LIMITS,
    formatCurrency,
    calculateTag,
    calculatePell,
    calculateLoanFees,
    calculateLoanProration
  };
});
