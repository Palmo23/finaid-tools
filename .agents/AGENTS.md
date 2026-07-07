# Stockton Financial Aid Toolkit Project Rules

Always adhere to these rules when modifying or creating pages in this repository.

## 1. Design Constraints & Tokens
- **Visual Dial Configuration**: Keep visual dials locked to:
  * `DESIGN_VARIANCE: 3` (highly symmetrical, predictable layouts)
  * `MOTION_INTENSITY: 2` (very subtle hover transitions; no complex animations)
  * `VISUAL_DENSITY: 5` (clean form spacing, legible tables and inputs)
- **Official Brand Colors**:
  * Stockton Blue (Primary): `#0069AA` (used on headers, primary headings, primary buttons)
  * Stockton Gold (Accent): `#FFC423` (used on alerts, active borders, highlights)
  * Text (Charcoal): `#1D2733`
  * Background (Light Grey): `#F4F6F8`
- **Typography**:
  * Use the **Outfit** or **Inter** sans-serif font family.

## 2. Mandatory File Invariants & Paths
- **Shared Stylesheet**: Link the shared style sheet in the `<head>` of all HTML pages:
  * `<link rel="stylesheet" href="../css/stockton-theme.css">` (use correct relative path)
- **Branded Header**: Every calculator or reference page must have a top header structured exactly as follows:
  ```html
  <header>
    <div class="container header-inner">
      <div class="header-brand">
        <div class="stockton-logo">
          <img src="../images/stockton-logo.png" alt="Stockton University">
        </div>
        <div class="header-title">
          <h1>Financial Aid Toolkit</h1>
          <p>Stockton University Office of Financial Aid</p>
        </div>
      </div>
      <div class="header-nav">
        <a href="../index.html">← Back to Toolkit</a>
      </div>
    </div>
  </header>
  ```
- **Branded Footer**: Every page must have the brand-bar div above the close body tag:
  ```html
  <div class="brand-bar">
    Stockton University • Financial Aid Office • <a href="https://stockton.edu/financial-aid/">Official Website</a>
  </div>
  ```

## 3. Style Guidelines (Anti-Slop)
- Do not add internal `<style>` blocks in HTML pages; add any custom overrides inside class definitions driven by variables or inside `css/stockton-theme.css`.
- Ensure all forms have labels placed above inputs (no placeholders as labels).
- Check contrast ratios for all interactive items (buttons, links, placeholder text) to ensure WCAG AA compliance (minimum 4.5:1).
