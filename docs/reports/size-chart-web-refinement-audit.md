# Size Chart Web Refinement Audit

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Decision: D7-A / [ADR 0242](../decisions/0242-centered-size-chart-and-bounded-shopify-records.md)

Dossier: [Size Chart](../refinement/dossiers/size-chart.md)

## Outcome

Size Chart is ready for human stability review as a centered product-reference
Modal over canonical Data Table and optional Segmented Control. It consumes one
complete target-authored table at a time and performs no conversion, rounding,
fit calculation, persistence or structural responsive transformation.

The owner-approved Web presentation remains centered on Mobile, Tablet,
Desktop and XL. Shopify now has a target-native Main Product block, strict
Liquid omission, a bounded merchant-owned `custom.size_chart` metaobject
mapping, localized strings and a native-dialog controller. The controller owns
modality, title focus, scroll lock, dismissal, restoration and complete-panel
selection without leaking into neutral runtime.

Automated, browser and adapter gates pass. Human visual approval, D7-specific
Figma evidence and live-store definition/editor proof remain pending. No
`stable` promotion is made.

## Certification Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Secondary product reference only; no recommendation, commerce mutation or universal measurement engine. |
| Anatomy/slots | pass | One D7 root, canonical trigger/Modal, required table, optional presentation control and notes. |
| States/modes | pass | Closed/open, one/two presentations, notes absent/present, invalid omission and fixed centered Web mode. |
| Public API | pass | Seven semantic properties; no internal geometry, data schema or conversion API. |
| Canonical composition | pass | Modal, Close Button, Segmented Control and Data Table own their markup/behavior/presentation. |
| Controlled/uncontrolled | pass | Neutral `open`; targets may expose controlled or default lifecycle without a second store. |
| Accessibility | pass | Named modal, static-title focus, no flattened description, native radios/table, named overflow, Escape/backdrop and invoker restoration. |
| Responsive/content | pass | Eight viewports, RTL, effective 200 percent text, forced colors and reduced motion. |
| Exhibit/Studio parity | pass | Exact normalized DOM hash `026a6f84` from one renderer/fixture. |
| Shopify | implementation candidate pass | Bounded custom-data contract, Liquid, locales, Main Product block and target-only native-dialog controller. |
| Performance | pass for Product/D7 | Product `4,837 B` gzip under `5,324 B`; D7 neutral runtime delta zero. |
| Human review | pending | Final visual values, D7-specific owner/Figma reference and live Shopify integration. |

## Accepted Implementation

- Contract `0.3.0` records the centered Web Modal at every viewport, complete
  authored-table replacement and large-matrix boundary.
- `SizeChartArtwork` remains the shared Exhibit/Studio renderer and composes
  canonical dependency renderers.
- D7 CSS contains only intrinsic flow, supporting notes and native-dialog
  normalization. Native `visibility` becomes immediate while opacity retains
  canonical entrance motion so initial focus is deterministic.
- Shopify `size-chart.liquid` reads the Product reference and fails closed
  unless title, primary label/caption/headers and one complete primary row are
  present.
- Optional Shopify secondary controls appear only when their complete label,
  caption, headers and valid rows exist.
- Shopify renders at most twenty rows per complete presentation, escapes text,
  isolates values with `bdi`, uses captions/scoped headers and adds no live
  region or conversion.
- `size-chart.js` defines one target-only `tg-size-chart` custom element. Native
  `<dialog>` supplies top-layer modality/Tab containment; the controller adds
  canonical state flags, title focus, exact root-scroll restoration, visible
  close/backdrop/Escape lifecycle and authored-panel switching.
- Main Product exposes one optional Size Chart block and loads the controller.
  Products without a valid reference render no empty wrapper.
- English and Spanish target strings cover trigger, close, presentation legend
  and named scroll region.

## Shopify Custom Data

The approved target model is documented in
`docs/adapters/shopify-size-chart-custom-data.md` in required operational order:

1. create `gallery_size_chart_row`, `gallery_size_chart` and the Product
   `custom.size_chart` definition;
2. create complete row/chart entries and assign the Product reference; and
3. retrieve through Liquid `.value` and render the canonical snippet.

One required primary and one optional secondary table each carry independently
localized labels, caption, three headers and row display values. The row/chart
definition IDs are validated through Shopify reference validations. Existing
merchant definitions must be inspected before provisioning; the documentation
does not authorize blind mutation of a store.

## Interaction And Accessibility Evidence

The final manifest is
`output/playwright/refinement-product/size-chart-0242/manifest.json`.

- Docs target initial focus is the static visible title.
- ArrowRight changes CM to IN with exactly one same-name selected radio and all
  six cells replaced by independently authored imperial values.
- The component adds zero live regions and zero grid roles.
- The visible structure contains one named Modal, one Close Button, one
  fieldset, one caption, three column headers and three row headers.
- Shopify opens a real `:modal` top-layer dialog, makes outside hit-testing
  belong to the dialog, locks root scroll and settles exactly at the viewport
  center on mobile.
- Shopify title focus is deterministic; no accidental reflected `title`
  attribute is created on the custom element.
- Shopify switches the complete primary/secondary panels without calculation.
- Escape and backdrop both close, restore the exact invoker and restore the
  prior root overflow value.
- Forced colors retains readable CM text, `2px` selected boundary, `3px` focus
  boundary and table border. Reduced motion has zero active transitions across
  four inspected parts.
- RTL and effective 200 percent text have zero dialog/document overflow and
  retain a keyboard-reachable table owner.

## Responsive And Visual Evidence

Paired final captures cover:

- Mobile `390x844`;
- Tablet `768x1024`;
- Desktop `1440x1000`; and
- XL `1920x1200`.

All eight have `0px` dialog/document horizontal overflow and `0px` horizontal
and vertical center delta after entrance motion settles. Special captures cover
dark, forced colors, RTL, effective 200 percent text and the actual styled
Shopify native-dialog target at:

`output/playwright/refinement-product/size-chart-0242/`.

Visual inspection confirms that the Shopify harness uses generated Web tokens
and canonical component CSS rather than an unstyled proxy. The final target
capture shows the centered surface, obscuring overlay, exclusive choice,
captioned table and supporting notes.

## CSS, Runtime And Budgets

Deterministic level-9 gzip measurements:

| Artifact | Raw | Gzip | Result |
| --- | ---: | ---: | --- |
| D7 CSS slice | `1,222 B` | `448 B` | Intrinsic/notes/native-dialog only. |
| Product family CSS | `29,355 B` | `4,837 B` | Pass; `487 B` under `5,324 B`. |
| Neutral component CSS | audit surface | `71,037 B` | Existing documented `5,501 B` program gap. |
| Shared neutral runtime | audit surface | `21,633 B` | Existing documented `13,441 B` program gap; D7 delta zero. |
| Shopify Size Chart controller | `3,701 B` | `1,004 B` | Target-only; no request/observer/timer/storage. |
| Shopify Size Chart Liquid | `8,449 B` | `1,693 B` | Target-only bounded rendering. |

No ceiling was raised. The performance audit reports 18 surfaces, 10 passing
and 8 documented gaps, with zero undocumented gaps.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Implemented CSS/composition contract; target owns lifecycle. |
| React docs target | Implemented shared renderer/fixture with exact Exhibit/Studio parity. |
| Shopify | Implementation candidate is target-ready in generated adapter; live merchant/editor evidence pending. |
| Webflow / Framer | CSS projection ready; CMS/runtime adapter not certified. |
| React / Angular / Hydrogen | Translation documented; no distributable framework adapter certified. |
| Figma | Planned; current generic nodes are not D7 visual approval. |
| SwiftUI / Compose | Conceptual native translation only. |

Shopify adapter validation advances to `88` target-ready components and `59`
dedicated Liquid templates; Size Chart introduces no Shopify validation
warning.

## Validation

Passing gates include JSON parsing, JavaScript syntax, 183 contracts, 183
Studio definitions, registry/docs, refinement decisions, Neutral Web adapter,
Shopify adapter, public token compatibility, browser evidence and clean
resource lifecycle. Theme Check reports no Size Chart/Main Product/locales
finding; its exit remains non-zero only for the pre-existing
`artist-profile.liquid` schema-locale and `_legacy` missing-template baseline.

`site/dist` was not rebuilt or modified.

## Remaining Risks

- Human review of trigger, modal width/chrome, selector placement, caption/table
  density, notes hierarchy and narrow visual balance.
- D7-specific owner/Figma artwork.
- Live Shopify definition provisioning, Product association, real translations,
  Theme Editor add/remove/reorder and storefront use.
- Separate design work for larger or non-three-column target matrices.

## Readiness Decision

Size Chart is `human-review-ready`. D7-A's complete-table boundary, centered Web
mode, canonical composition, target-native Shopify authoring/lifecycle,
accessibility, responsive behavior, parity and performance are reconciled.
Human visual review remains pending; the contract stays `pilot` and no
`stable` promotion is authorized.
