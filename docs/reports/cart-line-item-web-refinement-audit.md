# Cart Line Item Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-16

## Outcome

Cart Line Item is now the canonical target-controlled commerce record consumed
by K2, Cart Page, Cart Drawer and Order Detail. It uses native list semantics,
requires product identity and canonical Price, optionally composes media,
destination, details, Quantity Selector and Button actions, responds to its
container, and adds no neutral state service or runtime.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Presents one target line record; is not a cart store, formatter, inventory model, mutation client, status owner, summary, page or Drawer. |
| Anatomy and composition | pass | Native `ul.cart-lines > li.cart-line`; required title and Price; optional media, destination, details, Quantity, remove and save actions. |
| Variants, sizes and states | pass | One semantic line; editable/read-only through optional slots; linked/plain title; media/no-media; sale Price; container-responsive compact mode. |
| Public API and ownership | pass | Eight stable semantic properties; target owns records, IDs, money, constraints, mutations, pending/errors, persistence, status and post-removal focus. |
| Tokens and visual system | pass | Existing semantic border/text/type/radius/spacing/touch tokens; geometry, media size, gaps, weight and 36rem threshold remain private. |
| Accessibility and motion | pass | Native list/link/button/number semantics, one product destination, contextual names, target-owned status, visible focus, forced colors and zero neutral motion. |
| Responsive/content resilience | pass | Exhibit/Studio at Mobile/Tablet/Desktop/XL plus long localized read-only omission, dark, reduced motion and forced colors without overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, store, request, formatter, timer, animation or new asset. |
| Cross-target translation | pass | Neutral Web and shared Shopify Liquid implemented; framework, Figma and native ownership documented without raw universal cart data. |
| Documentation and verification | pass | Dossier, ADR 0174, amended ADR 0109, contract, registry, CSS, Studio, MDX, consumers, adapters, evidence and reports agree. |

## Contract And Browser Evidence

- Contract `0.2.0` declares three canonical dependencies, 11 anatomy parts,
  eight semantic properties, six behaviors, one default size/variant and a
  container-responsive compact state.
- The default accessibility tree contains one list/listitem, one title link,
  canonical Price labels, one named Quantity group/spinbutton and contextual
  Remove/Save Buttons. Adjacent repeated media is decorative.
- Omitting media, destination, details, Quantity and both actions leaves a valid
  list item with plain localized title and required Price; no empty grid column,
  false link or disabled placeholder control remains.
- Native increment changes quantity from `1` to `2` once. Save produces a
  disabled result label and target-owned status; Remove produces a target-owned
  status and restore action. K2 does not claim persistence or mutation policy.
- The 36rem named-container threshold keeps actions on a coherent row in wide
  page use and reflows media/info/Price in narrow Drawer use. Mobile Cart Drawer
  keeps its body independently scrollable while the summary remains outside.
- Eight canonical images cover Exhibit/Studio x Mobile/Tablet/Desktop/XL.
  Additional images cover long localized read-only composition, save/remove
  results, dark plus reduced motion, forced colors, and Cart Drawer Mobile/
  Desktop regression. Prior parity Mobile/Desktop images preserve the baseline.
- Final console inspection reports zero errors and zero warnings. The managed
  Playwright session and docs server were then closed; port 4173 is free.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native collection/record, semantic slots, canonical Price/Quantity/Button CSS and target callbacks/forms. | Implemented and evidenced; target cart/status services remain external. |
| Shopify | Shared `cart-line-item.liquid`, `line_item` data, properties/discounts/selling plan, money filters, native quantity/removal form and contextual labels. | Main Cart and Cart Drawer consume one snippet; runtime/editor/store proof remains planned. |
| React / Angular / Hydrogen | Controlled record/store plus async target actions and adapter-native dependency composition. | Boundary documented; no neutral store, fetcher or raw amount API added. |
| Figma | Optional slots, editable/read-only, linked/plain, sale/current Price and compact/wide composition. | Studio validates semantic presentation; final visuals await owner review. |
| SwiftUI / Compose | Native list row, formatted money, optional stepper/actions and platform target state/announcements. | Conceptual mapping; platform state/focus behavior remains native. |

## Performance And Risks

- Final K2 CSS slice is `997 B` gzip. Complete Cart CSS is `3,021 B / 3 KiB`,
  leaving `51 B`; it grows `383 B` from the K2 baseline while replacing duplicate
  consumer markup and behavior.
- Complete Web component CSS is `67,755 B / 64 KiB`, an existing `2,219 B`
  program gap, but Batch 83 reduces it by `55 B`. Global CSS falls from the
  prior Cart Drawer candidate's `4,668 B` to `4,351 B` by deleting parallel line
  CSS. Shared runtime stays `10,501 B / 8 KiB`; K2 delta is `0 B`.
- Human review must approve media scale/crop, density, title/Price hierarchy,
  separator, action treatment, wide balance and compact threshold.
- Production targets must choose mutation/pending/error/rollback, status cadence,
  post-removal focus and save-for-later persistence. Shopify must prove form or
  Ajax/Section Rendering behavior before target-ready promotion.
- No owner-provided component-specific visual reference is registered; review
  the repository candidate or supply replacement evidence.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, official Liquid files,
semantic DOM, quantity/save/remove interactions, localized optional omission,
dark/forced-colors/reduced-motion, four-viewport evidence, TypeScript,
structural/parity/static-preview/refinement audits, deterministic performance,
generated-copy identity, diff checks, component console, `site/dist` cleanliness
and the owned-resource gate are included in Batch 83.
