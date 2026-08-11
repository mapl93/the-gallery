# Cart Summary Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-16

## Outcome

Cart Summary is now a passive, target-controlled named section that presents one
coherent cart snapshot through native name/value relationships, composes the
canonical Button for checkout, accepts an opaque express-checkout slot, responds
to its own container and adds no neutral state service or runtime.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Presents a target-owned cart snapshot and checkout handoff; is not a formatter, calculator, cart store, status owner, payment provider, page, Drawer or checkout. |
| Anatomy and composition | pass | Named native section, visible heading, required `dl` with grouped `dt`/`dd`, emphasized total, optional note, canonical checkout Button and opaque express slot. |
| Variants, sizes and states | pass | One semantic summary; truthful target rows; optional note/express; available, disabled and busy checkout; intrinsic container response. |
| Public API and ownership | pass | Seven semantic properties; target owns formatted facts, snapshot consistency, qualifications, handoff, pending/errors, provider UI, announcements and focus. |
| Tokens and visual system | pass | Existing semantic surface/text/border/type/radius/spacing tokens; row geometry, rhythm, emphasis and 20rem threshold remain private. |
| Accessibility and motion | pass | Native section/list/Button semantics, label-before-value order, `bdi`, canonical busy/focus behavior, no K3 live region and no neutral motion. |
| Responsive/content resilience | pass | Exhibit/Studio at Mobile/Tablet/Desktop/XL plus 200px localized RTL, minimal composition, dark, reduced motion, forced colors and 200% zoom without overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, formatter, request, provider SDK, timer, sticky measurement, animation or asset. |
| Cross-target translation | pass | Neutral Web and dedicated Shopify Liquid implemented; framework, Figma and native ownership documented without a raw universal money/cart API. |
| Documentation and verification | pass | Dossier, ADR 0175, contract, registry, CSS, shared renderer, Studio, MDX, Cart Page, Shopify, adapters, evidence and reports agree. |

## Contract And Browser Evidence

- Contract `0.2.0` declares Button as its only canonical dependency, 11 anatomy
  parts, seven semantic properties, six behaviors, one default variant/size and
  a narrow container-responsive state.
- The accessibility tree contains one region named by its heading, one native
  description list with three term/definition pairs, primary checkout and the
  optional express Button. K3 adds no widget role, keyboard model or live region.
- Exhibit and Studio render an identical 1,024-character canonical subtree from
  `CartSummaryArtwork`. Cart Page consumes the same renderer and fixture.
- Busy checkout is disabled with `aria-busy="true"` and the canonical Button
  spinner. Checkout activates once and reports through a target-owned status.
- Removing note and express leaves a valid required list and checkout Button.
  Blank required title omits the root rather than emitting an unnamed section.
- A 200px RTL/Arabic fixture and effective 200% zoom both keep component and
  document client/scroll widths equal. Dark, reduced-motion and forced-colors
  modes preserve hierarchy and boundaries.
- Fifteen images cover Exhibit/Studio at four viewports and all special modes.
  Final console inspection reports zero errors and zero warnings. The managed
  Playwright session and server are closed; port 4173 is free.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named section, native association list, complete target-formatted strings, canonical Button and opaque express slot. | Implemented and evidenced; snapshot, checkout and status services remain external. |
| Shopify | Shared `cart-summary.liquid`, `items_subtotal_price`, cart-level discount, `total_price`, localized qualification, native `name="checkout"` and provider additional checkout buttons. | Main Cart consumes one localized snippet; official Liquid validation passes; runtime/editor/live-store proof remains planned. |
| React / Angular / Hydrogen | Controlled snapshot plus target router/fetcher/promise and contextual status. | Boundary documented; no neutral cart store, formatter or SDK added. |
| Figma | Required total, optional rows/note, disabled/busy Button and opaque express region across narrow/wide composition. | Studio validates semantic presentation; final visuals await owner review. |
| SwiftUI / Compose | Native named grouping, formatted strings, progress-capable primary action and platform payment surface. | Conceptual mapping; checkout, announcements and provider UI remain platform-native. |

## Performance And Risks

- Final K3 CSS slice is `622 B` gzip, `+81 B` from its baseline. Complete Cart
  CSS is `3,063 B / 3 KiB`, leaving `9 B`; the batch adds `42 B` to the family.
- Complete Web component CSS is `67,821 B / 64 KiB`, an existing `2,285 B`
  program gap and a `+66 B` batch delta. Global CSS remains `4,351 B`, and
  shared runtime remains `10,501 B / 8 KiB`; K3 runtime delta is `0 B`.
- Human review must approve surface, radius, title/total hierarchy, density,
  note strength, checkout prominence, express separation, narrow stacking and
  parent sticky placement.
- Production targets must choose estimate/final policy, tax/duty/shipping
  qualification, currency and discount presentation, snapshot consistency,
  pending/errors, announcement cadence, checkout recovery and analytics.
- Provider UI remains target-native and opaque. Shopify must prove actual cart
  form or Ajax/Section Rendering behavior and editor/live-store operation before
  target-ready promotion.
- No component-specific owner visual reference is registered; review this
  repository candidate or supply replacement evidence.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, official Liquid files,
semantic DOM, checkout result/busy/minimal/invalid states, localized RTL narrow
content, dark/forced-colors/reduced-motion, 200% zoom, four-viewport evidence,
TypeScript, structural/parity/static-preview/refinement audits, deterministic
performance, generated-copy identity, diff checks, component console,
`site/dist` cleanliness and the owned-resource gate are included in Batch 84.
