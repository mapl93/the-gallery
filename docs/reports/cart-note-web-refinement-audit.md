# Cart Note Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-17

## Outcome

Cart Note is now one native progressive disclosure containing one required
canonical Textarea. Static Web receives disclosure semantics, keyboard
activation, hidden-content behavior, and value preservation from
`details/summary` with no K10 runtime. The target owns note persistence,
requests, result feedback, focus after cart refresh, and cart-drawer policy.

Shopify provides an opt-in, localized cart-page implementation that initializes
from `cart.note` and submits one `textarea[name="note"]` inside the native cart
form. Exhibit and Studio share the same renderer and fixture. No visual approval
or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Cart-level unstructured note only; not a gift-message workflow, validator, store, request client, status region, or cart-refresh controller. |
| Anatomy and composition | pass | Native Details root, first-child Summary, and one required complete canonical Textarea; invalid blank-label/absent-field composition omits the root. |
| Variants, sizes, and states | pass | One intrinsic presentation; initial closed/open state, native live disclosure state, Textarea states, and target persistence boundary are defined. |
| Public API and ownership | pass | Required `toggleLabel`, optional initial `expanded`, and required `field`; Textarea owns every native value/field property. |
| Tokens and hardcoded values | pass | Zero K10 public visual tokens; existing link-action text, Body Small, focus, and logical spacing semantics compose the private presentation. |
| Accessibility and motion | pass | Native disclosure, Enter/Space, first-child Summary, associated visible label, preserved value/node, closed focus exclusion, visible focus, no internal live region, and no component motion. |
| Responsive/content resilience | pass | Shared renderer at Mobile/Tablet/Desktop/XL, localized long RTL at `200px`, and effective `200%` visual scale without root or stage overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no K10 listener, observer, timer, request, service, or asset. |
| Cross-target translation | pass for reviewed surfaces | Neutral Web and Shopify cart page are implemented; Webflow CSS copies exactly; Ajax cart drawer and future frameworks retain explicit target ownership. |
| Documentation and verification | pass | Dossier, ADR 0182, contract, registry, CSS, shared renderers, Studio, MDX, Liquid, adapters, evidence, and matrices agree. |

## Contract And Browser Evidence

- Contract `0.2.0` declares Textarea as its only dependency, three required
  anatomy parts, three states, five behaviors, three semantic properties, and
  zero public visual tokens.
- Browser inspection finds exactly one `DETAILS`, first child `SUMMARY`, one
  `.cart-note__field`, one `textarea[name="note"]`, one associated visible
  label, and zero Status/Alert/live-region descendants.
- Exhibit and Studio each serialize a `468`-character subtree. After normalizing
  only React's generated field id (`_r_0_` versus `_r_2_`), they are exact.
- Enter closes and Space reopens the focused Summary. Closed content remains in
  the DOM but is not painted or reachable by Tab; reopening makes the Textarea
  the next focus target.
- Editing, collapse, and reopen preserve the exact Textarea node and the value
  `Leave at the side entrance — gracias.`. Native FormData produces the sole
  record `{ note: "Leave at the side entrance — gracias." }`.
- A whitespace-only toggle label produces zero K10 roots and zero Textareas.
  The required Textarea Studio slot is intentionally non-removable.
- Mobile, Tablet, Desktop, and XL roots remain intrinsically contained. The
  localized RTL stress fixture is exactly `200px` wide without root/stage
  overflow; effective page scale `2` leaves the `326px` Mobile root and stage
  contained.
- Initial evidence exposed the former orange toggle at `3.56:1`. The reconciled
  link-action semantic measures `17.93:1` on light; dark resolves to
  `rgb(250,250,250)` on `rgb(23,23,23)`. Keyboard focus is solid `2px` with a
  `2px` offset. Forced colors keeps the outline, and reduced motion reports
  `0s` transitions.
- Fifteen final images in `output/playwright/refinement-batch-91/` cover eight
  Exhibit/Studio viewport captures plus closed, focus, dark, forced colors,
  reduced motion, RTL/200px, and effective-zoom states. The only console error
  is the pre-existing docs-site `/favicon.ico` 404; K10 emits none.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Native `details/summary` around one canonical Textarea. | Implemented and evidenced with zero K10 runtime. |
| Shopify | Optional Main Cart setting, localized snippet, initial `cart.note`, and sole `textarea[name="note"]` in the cart form. | Official validation passes; generated maturity is `implemented`, `ready:true`. Ajax Cart Drawer remains separate work. |
| Webflow / Framer | Native disclosure/CSS projection plus target form or event integration. | Webflow Cart CSS is source-identical; persistence is target configuration. |
| React / Angular / Hydrogen | Initial or controlled `open` state plus one controlled/uncontrolled Textarea; cart mutation stays outside K10. | Contract-ready; no framework dependency in base source. |
| Figma | Open/closed disclosure composed from one canonical Textarea instance. | Planned; registered nodes are generic Button shells, not K10 approval. |
| SwiftUI / Compose | Native disclosure group and multiline editor. | Conceptual; persistence and result feedback stay application-owned. |

The Shopify Liquid workflow used current cart-note guidance and validated the
six changed theme files as artifact `k10-cart-note-shopify-20260717`, revision
1. The adapter now reports 51 dedicated Liquid templates and 79 target-ready
components.

## Performance And Risks

- K10 CSS changes from `547 B` raw / `326 B` gzip to `571 B` raw / `329 B`
  gzip, a `+3 B` component compression delta.
- Complete Cart CSS changes from `15,952 B` raw / `3,064 B` gzip to
  `15,976 B` raw / `3,057 B` gzip. It passes the permanent `3,072 B` ceiling
  with `15 B` headroom and improves family compression by `7 B`.
- Complete Web component CSS changes from `506,631 B` raw / `67,996 B` gzip to
  `506,655 B` raw / `67,991 B` gzip. The existing program gap is `2,455 B`
  above the `65,536 B` ceiling; K10 improves compression by `5 B`.
- Shared neutral runtime remains `53,811 B` raw / `10,501 B` gzip, so K10 adds
  `0 B`. Shopify K10 adds no target JavaScript.
- Canonical, Webflow, and Shopify Cart CSS are byte-identical. Cart SHA-256 is
  `348b82115f04bc9bfda221cca782a0381542b4f8b88c3d504f1d2e4b1e3ea855`;
  K10 slice SHA-256 is
  `eb851ebee18e1c3cbf3b8e56a374ec862a544fa957a34aeeeb2c2e02f3c7d8bc`.
- Human review must approve marker and toggle prominence, underline, spacing,
  field measure, placement relative to totals/checkout, merchant availability,
  default expansion, and the supplied neutral candidate without K10-specific
  owner artwork.
- Product targets must decide submit/blur/debounce timing, maximum length,
  accepted content, errors/retry/status/focus, stale refresh handling,
  analytics, and whether Cart Drawer parity is required.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, static
previews, Web/component tokens, Neutral Web adapter, Shopify adapter, official
Liquid validation, native disclosure/keyboard/value/FormData/focus semantics,
invalid omission, exact normalized Exhibit/Studio parity, four viewports,
localized RTL/200px, effective 200% scale, light/dark contrast, focus, forced
colors, reduced motion, deterministic performance, generated-copy identity,
diff checks, `site/dist` cleanliness, and owned-resource cleanup are included.
