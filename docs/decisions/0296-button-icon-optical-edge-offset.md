# 0296. Button Icon Optical Edge Offset

Status: Owner approved

Date: 2026-09-08

## Context

The contact composition's Button had equal 20 px CSS padding. Its 20 px
ArrowRight SVG adds approximately 3.33 px between its visible stroke and its
outer viewBox edge. The owner requested compensation on the icon side to make
the result appear balanced. This is a visual refinement of ADR 0294.

## Decision

- Add `component.button.iconEdgeOffset`, exposed as
  `--space-button-icon-edge-offset`, with a 3.333333 px default. It is a public
  design choice in the existing component layer, editable in Studio and listed
  in Exhibit. Zero restores the previous spacing.
- Subtract the correction from inline-start padding when a direct leading icon
  exists, and from inline-end padding when a direct trailing icon exists.
  With both icons, compensate both sides. Use logical properties for RTL.
- Preserve SVG paths, viewBoxes, icon dimensions and text/icon gap. Text-only,
  icon-only and Link buttons retain their existing spacing.
- During loading, the generated circle is inset within a replaced icon's slot.
  Its margins preserve the slot's original outer size and prevent replacement
  from changing the Button's width or label position. A spinner added on a side
  without an icon retains its original size and may expand the button as before.
- Clamp the correction at zero, available horizontal padding and half the icon
  size minus spinner stroke. Those bounds are private geometry safeguards.

## Limits

The default is calibrated for the current ArrowRight fixture, not inferred from
arbitrary SVG artwork. Other shapes or icon sizes may need a token override.
Both sides share the same design value; this does not claim equal painted
insets for two different icons. Figma and Shopify editor integration remain
separate checkpoints. Existing consumer copies require explicitly adopting the
updated CSS and tokens. Legacy targets without this new alias fall back to zero.

## Acceptance

1. Token source, generated web/Shopify output, contract, registry and Studio agree.
2. Default contact button has 20 px text-side padding and about 16.67 px
   icon-side padding, retaining its 46 px default height.
3. Leading, trailing and both-icon compositions work in LTR and RTL; zero,
   positive and extreme overrides stay bounded.
4. Loading replacement preserves outer width, height and label position.
5. Studio edits and reset affect the real component; Exhibit lists the control.
6. Browser evidence resources are closed after local validation. Visual approval
   remains with the owner.

## Local evidence

- Source/legacy parity, eight-matrix catalogue (368 paths / 2944 comparisons),
  contracts, Studio, docs, web and Shopify adapter validators passed.
- Chromium: contact form in Light/Dark at 390 and 1200 px retains 46 px Button
  height and no horizontal overflow. Desktop padding is 20 / 16.6667 px; the
  calculated painted arrow edge is 20.99 px from the Button's outer edge.
  Mobile uses its existing 16 px base padding and 18 px icon; the fixed optical
  correction remains adjustable and is not presented as an exact SVG measurement.
- 450 temporary DOM fixture combinations exercise three sizes, five variants,
  five icon compositions, two directions and three loading placements. All 270
  cases that replace an existing icon preserve width, height and label position
  within 0.07 px. Added spinners retain the existing expansion behavior.
- Overrides of 0, 6, 100 and -10 px exercise restoration, customization and bounds.
  Real Studio editing/reset and the Exhibit reference passed.
- Screenshot: `output/playwright/contact-optical-button-light.png`.
  Browser and managed server are closed; evidence cleanup gate passed.
- Safari, Firefox and Figma/Shopify remote rendering were not tested in this step.
