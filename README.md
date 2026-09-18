# Stockton Financial Aid Toolkit

The **Stockton Financial Aid Toolkit** is a client-side suite of calculators and reference guides built for students and counselors at the Stockton University Office of Financial Aid.

Hosted directly on **GitHub Pages**: zero backend, zero build requirements, and static asset delivery.

---

## 🛠️ Tools Included

### Calculators
- **Estimated Aid Calculator (2026–2027)** (`calculators/estimated-aid-2026-2027.html`): Estimates academic year financial aid packages including NJ TAG, Federal Pell Grant, and Direct Subsidized/Unsubsidized Loans with 1.057% origination fee deductions.
- **Pell Eligibility Calculator** (`calculators/Pell_Eligibility_Calculator.html`): Evaluates Federal Pell Grant eligibility, enrollment intensity proration, and Lifetime Eligibility Used (LEU).
- **Loan Proration Calculator** (`calculators/loan-proration.html`): Computes required federal Direct Loan proration for graduating undergraduate seniors.
- **Summer Aid Estimator** (`calculators/summer-2025-aid.html`): Estimates summer tuition costs and TAG/Pell grant eligibility.
- **OBBBA Financial Aid Guide** (`calculators/obbba-financial-aid-guide.html`): Comprehensive reference on upcoming federal financial aid legislative changes.

### Reference
- **EOF Guide** (`reference/eof.html`): Pure semantic HTML reference guide for Stockton's Educational Opportunity Fund (EOF) program, eligibility criteria, and summer academy schedules.

---

## 📐 Architecture & Shared Modules

- **Centralized Math & Schedules** (`js/finaid-core.js`): Single source of truth for 2026–2027 HESAA TAG brackets, Pell formulas, loan fee calculations, and proration formulas.
- **Unified Brand Design** (`css/stockton-theme.css`): Stockton University brand tokens (`#0069AA` Stockton Blue, `#FFC423` Stockton Gold), accessible form styles, and responsive cards.
- **GitHub Pages Configuration** (`.nojekyll`): Ensures pure static asset serving without Jekyll processing.

---

## 🧪 Testing

To verify financial aid calculations against official HESAA and Title IV charts:

```bash
node tests/finaid-core.test.js
```

---

## 📄 License & Brand Guidelines

Stockton University Office of Financial Aid. Use only approved Stockton marks and colors per official institutional brand guidelines.