# Studio Inspector Canonical Control Audit

Status: Implemented and browser-verified

Date: 2026-08-25

Decision: `docs/decisions/0282-studio-inspector-canonical-control-dogfooding.md`

## Result

Every metadata-driven `segmented` control in Studio Customize now renders the
shared `SegmentedControlArtwork` instead of a site-owned imitation. The change
applies to `83` controls across `63` component panels.

## Root Cause

The previous inspector emitted a `28px`-high `div` with `role="radiogroup"` and
selected Segmented Control class names. It omitted the canonical `fieldset`,
visible `legend`, and `.segmented__options` wrapper. Public option labels retained
their correct `44px` minimum height, so three roots beginning only `34px` apart
overlapped by `10px` each.

## Corrected Composition

The shared renderer now owns:

- Native `fieldset` and visible `legend`.
- Same-name native radio inputs.
- Canonical options, item, input, and label classes.
- Public neutral Web adapter styling and interaction behavior.
- Controlled selection callbacks back into the component-specific Studio.

Studio owns only the inspector arrangement: equal option widths, `10px` between
the `64px` label column and the full-width right control column, horizontal
composition for two-to-four concise choices, and compact Select presentation
for sets longer than four. The shared native legend remains available to
assistive technology and is visually hidden because the row already presents
the same group label.

## Browser Evidence

### Divider

- Variant, Orientation, and Purpose each render as a `FIELDSET` with the full
  canonical anatomy.
- Their option surfaces and Rule each measure exactly `236 x 28px`, with the
  same left edge at `411px` and right edge at `647px` in the inspected panel.
- The visible row labels occupy the independent `64px` left column and are
  vertically centered against their controls. Variant, Orientation, and Purpose
  begin at `248px`, `282px`, and `316px`, respectively, so their `28px` surfaces
  remain separated and never enter the next row.
- `Semantic` remains on one line inside its segment.
- Clicking Decorative checks the native radio and changes the shared preview
  class from `.divider` to `.divider.divider--decorative`.
- The same dimensions and interaction hold in Light and Dark.

### Image With Text

- The five-option Variant set uses the compact native Select presentation.
- Its Select measures the same `236 x 28px` as the Divider option surfaces and
  Rule control, begins at the same right-column edge, and remains vertically
  centered against the left-column Variant label in Light and Dark.

## Validation

- `npm run validate:docs`
- `npm run audit:exhibit-studio`
- temporary production docs build outside `site/dist`
- `git diff --check`
- `npm run evidence:cleanup`
- `npm run evidence:assert-clean`

The docs app still imports `platforms/web/index.css`. No component contract
status changed, `site/dist` was not rebuilt, and no commit or push was made.
