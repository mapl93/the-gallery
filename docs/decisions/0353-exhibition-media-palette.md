# 0353. Exhibition Media Palette

Status: Accepted

Date: 2026-09-12

## Decision

The owner chose option A from ADR 0352: darkened photography with white text
in both themes. Two component color roles expose that pairing:
`component.exhibition-page.mediaText` aliases `color.gray.0`, and
`component.exhibition-page.scrimColor` aliases the existing `color.overlay`.
Public Web names are `--color-exhibition-media-text` and
`--color-exhibition-scrim`. Existing shared `--tg-motion-opacity-scrim` retains
its 0.6 default. The decorative, childless overlay uses background color plus
opacity so both the tint and its alpha remain editable without parsing colors.

The Exhibition contract/profile replaces its former inverse-text reference
with these two roles (57 public values, 25 component source roles). Global
inverse text and other components' theme policies do not change. No-media
statement surface/primary text and forced-color Canvas/CanvasText remain intact.
Studio and Exhibit derive their controls/reference from the same inventory.

This closes ADR 0352's blocking palette decision. It does not promote the
component from pilot, decide target-owned work/artist records or implement a
Shopify template. Changing the palette or opacity requires contextual contrast
verification. Copy-and-own consumers explicitly adopt both CSS and token output;
existing inverse-text overrides no longer control this media hero and should
move to its new public text role when that customization was intentional.

## Evidence

See `docs/reports/2026-09-12-exhibition-palette-checkpoint.md`: 712 geometry
comparisons, actual-image contrast in both themes, Studio color/opacity editing,
reset, Exhibit reference and forced-color checks. Generated Web/Shopify output
and structural validation are separate from hosted Shopify certification.
