# Refinement Batch 90 — Sticky Add-to-Cart Bar

Status: Refined; architecture and product decisions required

Date: 2026-07-17

Component: Sticky Add-to-Cart Bar (`K9`, dependency order `103`)

## Outcome

Batch 90 converts K9 from a static viewport bar with raw Price text and a local
Added simulation into a passive composition of canonical Price, canonical
Button, and one existing Product Form. The action is a native external
submitter; target commerce state and result feedback remain outside K9.

Exhibit and Studio now use the same `StickyAtcArtwork`, renderer, and fixture.
The neutral base remains independent of React and Shopify and adds no runtime.

## Delivered

- Permanent K9 dossier, detailed audit, and ADR 0181.
- Contract `0.2.0`, registry, Studio metadata, MDX, and Cart CSS reconciliation.
- Required native Product Form reference, canonical Price slot, canonical
  external submit Button, unavailable/pending projections, and invalid omission.
- Hidden `inert`/accessibility exclusion, private named-container response,
  intact narrow wrapping, and no duplicated local result state.
- Target-native Shopify snippet with official validation; live target lifecycle
  remains explicitly incomplete.
- Mobile/Tablet/Desktop/XL per mode plus submitted, unavailable, pending,
  hidden, focus, dark, forced colors, reduced motion, RTL, 200px, and effective
  200 percent evidence.
- Regenerated Neutral Web, Webflow, and Shopify component adapters;
  `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; the static preview audit reports zero errors.
- Exhibit and Studio have one exact `810`-character subtree containing one
  Price and one external submit Button, with no duplicated form inside K9.
- Native form ownership, successful submitter data, external result Status,
  unavailable, pending, hidden exclusion, optional slots, and invalid omission
  pass.
- Container response produces the expected mobile stacked action and wider
  one-row composition. Mobile, Tablet, Desktop, XL, 200px, RTL, and effective
  200 percent all avoid horizontal overflow.
- Light/dark contrast, visible 2px/2px focus, forced colors, and reduced motion
  pass. Final console errors are zero.
- Shopify detects K9 Liquid/data composition but correctly reports
  `ready:false` and `needs-target-work`; no false target-ready promotion occurs.
- The browser remained one headless session, one tab, and one server; final
  cleanup leaves port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K9 CSS slice | `511 B` | `716 B` | component observation | `+205 B`; semantic exclusion and intrinsic layout added |
| Cart CSS | `3,030 B` | `3,064 B` | `3,072 B` | pass; `8 B` headroom |
| Neutral Web component CSS | `67,930 B` | `67,996 B` | `65,536 B` | existing program gap `2,460 B`; batch delta `+66 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K9 delta `0 B` |
| Shopify K9 runtime | `0 B` added | `0 B` added | target observation | Liquid composition only; target coordinator deferred |

Cart CSS SHA-256 is
`0101698f61e1d2485cbb0c325fbfb9e66e12706aae7009d5f24ead1781860aef`;
K9 slice SHA-256 is
`5c7bb7fa9fb6bfd54e7536978b2a89718637c89d56cad86b28b5558c5fa61c58`.

## Risks And Open Questions

- The owner must select the shared product coordinator and its selected-option,
  merchandise, quantity, selling-plan, Price/media/availability/URL,
  pending/result, cart refresh, feedback, focus, and localized Status ownership.
- Visibility signal, hysteresis, safe-area offsets, scroll padding, virtual
  keyboard behavior, and collision order with Bottom Nav, Cookie Consent, Cart
  Drawer, chat, and other fixed surfaces remain open.
- Shopify still needs native-versus-Ajax policy and live proof of synchronization,
  availability, purchase/error/refresh lifecycle, editor preview, and invocation.
- Effective-zoom/short-viewport policy and final image, spacing, hierarchy,
  shadow, action width, motion, and stacking require owner review.
- Generic Figma Button nodes are traceability only, not K9-specific visual
  evidence. This constrained the batch to a neutral candidate rather than an
  inferred owner aesthetic.

## Readiness Decision

`refined-decision-needed`. Safe semantic, canonical, responsive, adapter, and
evidence work is complete, but K9 is intentionally not marked ready for human
stability review until the architecture/product and visual decisions above
receive explicit owner input. Contract remains `pilot`; no stability promotion
was made.
