# Refinement Batch 89 — Quick View

Status: Refined; architecture and product decisions required

Date: 2026-07-17

Component: Quick View (`K8`, dependency order `102`)

## Outcome

Batch 89 converts K8 from a static card-like approximation into the product
profile of canonical Modal. The implementation now composes canonical Product
Gallery, Price, native Product Form and native Link while keeping the neutral
source independent of React, Shopify and any target product coordinator.

Exhibit and Studio use the same `ModalArtwork`, `ProductGalleryArtwork`,
`PriceArtwork` and `ProductFormArtwork` composition and the same fixture. The
extracted artwork also replaces duplicate implementations in the standalone
Modal, Product Gallery and Product Form previews.

## Delivered

- Permanent K8 dossier, detailed audit and ADR 0180.
- Contract `0.2.0`, registry, Studio metadata, MDX and Cart CSS reconciliation.
- Canonical Modal lifecycle in the docs target with title focus, keyboard
  containment, Escape/backdrop close and focus restoration.
- Strict semantic composition: required title/dismiss/Gallery/Price, coherent
  optional Link pair, optional native Product Form and invalid-root omission.
- Private `42rem` container query with stable source order and no viewport
  breakpoint, duplicated gallery/price/form/link styling or description clamp.
- Target-native Shopify snippet and optional Product Form class hook, localized
  labels and official Liquid validation; target lifecycle remains explicitly
  incomplete.
- Mobile/Tablet/Desktop/XL per mode plus closed, Link-only, submitted, focus,
  dark, forced colors, reduced motion, long RTL and effective 200 percent
  evidence.
- Regenerated Neutral Web, Webflow and Shopify component adapters;
  `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; static preview audit reports zero errors.
- Exhibit and Studio have one exact normalized `2,441`-character dialog subtree
  with one Modal, Gallery, Price, native Form and native Link.
- Title initial focus, Close → Form → Link → Close keyboard loop,
  reverse loop, Escape, backdrop, trigger restoration and one form Status pass.
- Link-only and closed states pass. Blank title, one-sided Link and no
  continuation omit the invalid dialog.
- Container response produces one or two columns according to actual preview
  width, including Tablet two-column and narrower Desktop one-column behavior.
  All four viewports, RTL long content and effective 200 percent avoid
  horizontal overflow.
- Light/dark contrast, visible 2px/2px focus, forced colors and reduced motion
  pass. The browser remained one headless session, one tab and one server; final
  cleanup leaves port 4173 free.
- Shopify detects K8 Liquid/data composition but correctly reports
  `ready:false` and `needs-target-work`; no false target-ready promotion occurs.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K8 CSS slice | `566 B` | `494 B` | component observation | `-72 B`; canonical dependencies replace duplicates |
| Cart CSS | `3,007 B` | `3,030 B` | `3,072 B` | pass; `42 B` headroom |
| Neutral Web component CSS | `67,861 B` | `67,930 B` | `65,536 B` | existing program gap `2,394 B`; batch compression delta `+69 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K8 delta `0 B` |
| Shopify K8 runtime | `0 B` added | `0 B` added | target observation | Liquid composition only; target coordinator deferred |

Cart CSS SHA-256 is
`0bb4edca691b36ad854fe30ac4ed8a59a4c67f63cadd7e26cb9d570cbe6a1e35`;
K8 slice SHA-256 is
`3c02f5070efd5485dd7a466731e5a04cdbd51fff678ecd73659b5feba364eceb`.

## Risks And Open Questions

- The owner must select the shared product coordinator and its selected-option,
  purchasable-merchandise, Price/media/availability/URL, quantity, pending,
  result and localized Status ownership.
- Shopify still needs an invocation/loading strategy and live proof for rich
  media, high variants, selected variant synchronization, purchase/error/Cart
  Drawer lifecycle, editor preview and focus outcomes.
- Product policy must decide whether Quick View always includes Product Form,
  permits Link-only presentation or excludes complex/one-of-one products.
- Mobile centered modal versus bottom sheet versus full-screen dialog remains an
  aesthetic/product decision. Width, ratio, spacing, vendor hierarchy, action
  hierarchy and scrolling await owner visual review.
- Product Gallery rich-media/Lightbox scope and Product Form coordinator are
  inherited architecture blockers; this batch keeps them visible.
- Generic Figma nodes are traceability only, not K8-specific visual evidence.

## Readiness Decision

`refined-decision-needed`. The safe semantic, canonical, responsive, adapter and
evidence work is complete, but K8 is intentionally not marked ready for human
stability review until the product/target architecture and visual decisions
above receive explicit owner input. Contract remains `pilot`; no stability
promotion was made.
