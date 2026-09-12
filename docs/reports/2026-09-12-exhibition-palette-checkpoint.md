# Exhibition Page palette checkpoint

Date: 2026-09-12

Decision: ADR 0353. Owner selected darkened media and white text in both themes.

## Delivered

Two source colors alias existing system values: white `color.gray.0` for media
text and black `color.overlay` for the scrim. The shared scrim opacity remains
0.6. Both colors are public in contract, registry, Studio and Exhibit. The old
inverse role is removed from this component's inventory only. No-media styling,
geometry, native semantics, runtime and pilot status remain unchanged.

Web and Shopify assets are regenerated from source. A fresh CLI-installed
Exhibition-only consumer supplies the browser comparison, with the preceding
checkpoint's canonical CSS available as a comparison stylesheet.

## Local evidence

- 712 element comparisons at viewport widths 320, 600, 900 and 1200, both themes,
  with and without media: geometry agrees within 0.02 CSS px. All no-media
  foreground/background colors agree. Every media case resolves white text,
  black scrim and opacity 0.6.
- Actual Studio image `gallery-interior.jpg`, hero 656 × 459.1875 CSS px:
  minimum contrast 5.741836:1 in label/title/location regions and 6.040239:1
  in the dates region, in BOTH themes. Previously dark-theme dates never
  exceeded 2.968068:1. Canvas measurement applies the actual cover crop and
  computed overlay color/opacity, then samples each text bounding rectangle;
  it is not a screenshot glyph-mask or screen-reader test.
- Studio changes text to #f0e0d0, scrim to #123456 and opacity to 0.8; computed
  styles confirm all three. Reset restores white text. This custom probe proves
  editability, not the accessibility of arbitrary author colors.
- Forced colors hides the scrim and presents black text on white Canvas in the
  tested browser. Exhibit displays both new names from shared metadata.
- Light and dark screenshots visually inspected. Ignored evidence lives at
  `output/playwright/exhibition-palette/`; temporary public fixture removed.
  The single owned browser/server closed, resource gate passed and process
  inspection found no remaining test browser/runtime processes.

## Validation and limits

Web and Shopify adapter builds/validation, docs/contracts/Studio/CLI checks,
source catalogue, certification/refinement inventories and target performance
inventory pass. Catalogue: 1,105 paths across eight matrices (8,840 resolved
rows). Component maturity remains 5 stable, 173 pilot, 4 deprecated. Performance
inventory remains advisory where Shopify guidance is exceeded; no target
performance or hosted Shopify certification is claimed.

No new source modes, JavaScript, Shopify Liquid, upload, installation of tools,
Figma work, site/dist build or promotion to stable. Existing copied consumers
must adopt CSS and tokens together and migrate an intentional media inverse-text
override to `--color-exhibition-media-text`. Target content/crops/custom colors
still require contextual review. Other pending Exhibition composition decisions
remain in OPEN-QUESTIONS; this closes only the palette blocker.
