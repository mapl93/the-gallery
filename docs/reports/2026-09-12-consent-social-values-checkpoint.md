# Consent Manager and Social Proof visual-value checkpoint

Date: 2026-09-12. Baseline: `6aa5c85`. ADR 0393.

Seventeen source roles expose existing geometry: fourteen for Consent Manager,
three for Social Proof. Shared dimensions/spacing remain live. New metadata
exposes meaningful component values and previously uncovered public type roles.
The two composition contracts keep their behavior and target boundaries.

## Evidence

`output/playwright/consent-social-values/` retains baseline CSS, harness, results
and inspected component screenshots.

The before/after fixture clones the real Studio markup, strips fixture-only
classes, and uses the page's loaded styles. Five widths (240/320/600/900/1200)
and both themes preserve canonical dimensions, gaps, padding, borders and type.
This is an isolated markup/CSS comparison, not a fresh CLI consumer installation.
A narrow RTL Consent Manager fixture has no container overflow.

Actual Studio checks:

- Banner padding/main gap become 64px while internal content gap independently
  becomes 8px. Preferences max-width becomes 480px and preference gap 16px.
- Customize opens the canonical Modal; Escape closes it and restores trigger
  focus after the component's scheduled frame. Reject closes controlled content.
- Social Proof image becomes 76px from a 60px base plus half the 32px spacing
  base. Timestamp gap becomes 16px. Reset and dismissal work; no live/status
  role is introduced. Exhibit exposes the new controls on both pages.

The initial browser check caught a real Studio defect: an old image fixture
class forced 48px despite the correct 76px resolved variable. That class was
removed from the renderer, along with the unused fixture CSS. Studio now uses
the same adaptive image sizing as the canonical component. TypeScript and docs
validation pass after this correction. An earlier focus assertion was moved
after the already-scheduled Modal focus-restoration frame; no runtime patch.

Web/Shopify outputs, source catalogue and docs/contracts/Studio validate. The
Shopify build preserves intentional Social Proof omission. No hosted provider,
consent mutation, customer event, data persistence, upload or certification
promotion was tested or performed. All failed and successful browser phases
closed owned resources; final resource gate is clean.
