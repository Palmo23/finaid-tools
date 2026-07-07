# Design System Guidelines & Constraints (DESIGN.md)

This document is the source of truth for the Stockton University Financial Aid Toolkit design language. All coding agents and developers must strictly adhere to these rules.

---

## 1. Core Visual Configuration (Dials)

We follow a trust-first, service-oriented design system:
*   **`DESIGN_VARIANCE: 3`** (Clean, predictable, highly symmetrical grid/container layout)
*   **`MOTION_INTENSITY: 2`** (Minimal animation. Only subtle transitions for hovers and step-by-step navigation)
*   **`VISUAL_DENSITY: 5`** (Clear form inputs, easy-to-read typography, legible tables with comfortable spacing)

---

## 2. Branding & Colors

Always use Stockton University's official brand colors. Avoid default system/framework palettes (like standard Tailwind blue, slate, or violet).

*   **Primary Brand Color (Stockton Blue)**: `#0069AA` (used for header backgrounds, primary headings, primary buttons, and strong accents)
*   **Secondary/Accent Color (Stockton Gold)**: `#FFC423` (used for warning borders, active highlights, key borders, and decorative accents)
*   **Deep Dark/Text**: `#1D2733` (high contrast near-black for body copy)
*   **Muted Text**: `#5D6B7C` (for captions, descriptions, and labels)
*   **Primary Background**: `#F4F6F8` (light grey/slate for pages)
*   **Card Background**: `#FFFFFF` (pure white for cards and form panels)
*   **Borders**: `#D8E2EE` (thin, light grey for grid lines and panels)

### Color Calibration Rules
*   **Color Consistency Lock**: The selected accent and brand colors are locked. Never introduce random new colors (like purple, orange, or teal) unless it is a specific system state (Success `#1D9E75`, Warning `#D87A00`, Error `#E53E3E`).
*   **Button Contrast**: Every CTA and button must pass WCAG AA contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text). White text is only allowed on dark blue buttons; dark text on gold buttons.

---

## 3. Typography & Spacing

*   **Font Family**: A clean, accessible sans-serif font pairing:
    *   Primary Sans-serif: **Outfit** or **Inter** (loaded via Google Fonts or standard system fallbacks: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`)
    *   Code/Monospace: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
*   **Scale**:
    *   Display/H1: `2rem` to `2.5rem` (`32px` to `40px`)
    *   H2: `1.5rem` (`24px`)
    *   H3: `1.15rem` (`18.4px`)
    *   Body text: `1rem` (`16px`) with a readable line height of `1.5` to `1.6`.
    *   Max paragraph width: `70ch` to `75ch` (max character length per line) to prevent layout fatigue.
*   **Border Radius Scale**:
    *   Standard Card & Form Panel: `12px` (medium-soft)
    *   Buttons, Badges, & Inputs: `6px` (slightly crisper)
    *   Never mix all-pill and all-square elements randomly.

---

## 4. Header & Navigation Constraints

*   **Unified Header**: All calculators and reference pages must share the same blue header styling:
    *   Background: `--stockton-blue` (`#0069AA`)
    *   Bottom Border: `4px solid var(--stockton-gold)` (`#FFC423`)
    *   Left side: Stockton University Logo (`images/STK-primary-logo_web.png` filtered white using `filter: brightness(0) invert(1)`) + Title text.
    *   Right side (for calculators/guides): A clean, accessible "Back to Toolkit" link.
*   **Header Height**: The header must have a fixed height or padding constraint: maximum `80px` on desktop (typically `64-72px` height) to avoid eating up screen real estate.
*   **One-Line Nav**: Navigation links or headers must never wrap to two lines on desktop viewports.

---

## 5. Forms, Inputs, and Calculators

*   **Label Above Input**: Labels must always be stacked vertically above the inputs.
*   **Form Contrast**: Placeholder texts must have at least `4.5:1` contrast against inputs. Focus rings must use `--stockton-blue` with clear visual feedback.
*   **No Placeholders as Labels**: Input fields must always have explicit label elements for accessibility.
*   **Calculators Density**: Use clean grids to separate inputs from estimation summaries. The final results should be clearly highlighted in an accented, high-visibility card.

---

## 6. Layout Discipline (Anti-Slop)

*   **Hero Discipline**: The main hero section of any page must fit fully within the initial desktop viewport (no scroll required to see the primary action/results).
*   **Layout Repetition**: Do not repeat the same section layout multiple times on the same page. Use alternating grids, columns, and full-width containers to maintain visual rhythm.
*   **Eyebrow Restraint**: Uppercase, wide-spaced eyebrow labels above headings are limited to a maximum of 1 eyebrow per 3 sections to avoid looking templated.
*   **No Banned AI Tropes**:
    *   No neon mesh/aurora gradients.
    *   No card-in-card nested layers with heavy blurred drop-shadows. Use thin borders (`1px solid var(--border-color)`) or negative space instead.
    *   All buttons must trigger tactile visual feedback on press/active states (`transform: scale(0.98)`).
