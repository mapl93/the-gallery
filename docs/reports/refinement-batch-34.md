# Component Refinement Batch 34

Status: Collection Hero human-review-ready

Date: 2026-07-14

Components: Collection Hero

## Outcome

Collection Hero's dossier, image-derived composition decision, contract,
canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX, Shopify
section/locales, generated adapters, browser evidence, and individual audit are
reconciled. The contract remains `pilot`; no component was promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Browser Evidence Summary

- Initial Exhibit and Studio outerHTML is exactly equal at `499` characters.
  Image presence derives the class; Studio has no independent Variant control.
- Text-only mode removes image, class, image-alt control, and minimum height;
  optional nodes omit cleanly and the archival surface remains semantic.
- Long Spanish and unbroken title probes produce zero horizontal overflow at
  390px. Decorative alt remains empty; the root has no role, live region,
  interactive descendant, or component-owned focus behavior.
- Pixel-level compositing across the 1800x2700 fixture records minimum contrast
  `5.84:1` in light and `6.06:1` in dark. Forced colors hides image pixels while
  retaining the image's semantic node and uses Canvas/CanvasText.
- Four before and thirteen after/special images live under
  `output/playwright/refinement-batch-34/`. Component runtime emitted no browser
  error or warning.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Collection CSS | `2,188 B` | `2.5 KiB` | pass (`372 B` headroom; `+36 B` from baseline) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Collection Hero runtime) |
| Neutral Web components CSS | `65,475 B` | `64 KiB` | pass (`61 B` headroom; `+23 B` from Batch 33) |

## Validation

- Registry/docs, DTCG source, 183 contracts, 183 Studio definitions, and 193
  Web/component public token references pass.
- Neutral Web and Shopify adapters generate/validate. Collection Hero is an
  implemented, ready Shopify section adapter with CSS, Liquid, schema, data,
  behavior, template composition, and editor evidence.
- Shopify Liquid validation covers the section and four locale/schema files.
- Static Preview, structural certification, exact parity, semantic/content/theme
  browser probes, deterministic gzip, global refinement audit, diff checks,
  generated/source identity, and `site/dist` cleanliness pass.

## Human Review Scope

1. Approve image crop/focal result, `300px` minimum depth, title prominence,
   readable width, content rhythm, and overlay density.
2. Approve the semantic dark-theme inversion to light scrim/dark text, or request
   a future fixed on-media semantic token through the token architecture process.
3. Confirm the description remains concise plain text rather than rich hero
   content; long narrative stays outside Collection Hero.
4. Confirm Shopify's visible count should reflect `products_count` and remain
   synchronized by the owning filter/section-refresh strategy.
5. Keep focal-point API, alternate alignment/layout modes, live announcements,
   and media loading policy outside neutral v1 unless explicitly requested.

## Program Progress

After regenerating the matrix, the program contains 183 components, 106
dependency edges, 75 dossiers and 65 components ready for human review.
Collection Hero is ready for human review; only Button is human-approved. The
next dependency-safe component is Collection Grid (review order 76).
