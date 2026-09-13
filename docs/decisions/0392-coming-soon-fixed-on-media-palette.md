# ADR 0392: Coming Soon Fixed On-Media Palette

Status: Accepted

Date: 2026-09-12

The owner selected A: white text over the existing darkened media in both themes.
Coming Soon replaces its theme-relative inverse text reference with
`component.coming-soon.onMedia`, anchored to `{color.gray.0}`. Its public alias is
`--color-coming-soon-on-media`. The global inverse token stays available elsewhere.

Expose the existing scrim tint through `{color.overlay}` and a component alias,
its final opacity (0.78) and muted text opacity (0.86) as public component values.
The start opacity retains the existing shared semantic scrim role. Studio and
Exhibit expose these controls; source values, contracts and registry remain the
single inventory. The explicit opacity values preserve the owner-reviewed image.

Non-media primary/secondary colors, canonical Input/Button/Link ownership,
forced colors and native behavior remain. No new mode, layer, target or stable
promotion. Source geometry and typography do not change in this checkpoint.

Copy-and-own consumers adopt generated CSS/tokens explicitly and move intentional
Coming Soon-only inverse overrides to the new media-text role. Custom palettes
and opacity combinations still require contrast review. Web and Shopify outputs
are regenerated; hosted Shopify testing is separate.
