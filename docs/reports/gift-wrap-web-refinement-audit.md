# Gift Wrap Option Web Refinement Audit

Status: `human-review-ready`; contract remains `pilot`

Date: 2026-07-21

## Outcome

Gift Wrap Option is one native Checkbox label with an optional complete
canonical Price. Checkbox owns checkedness, keyboard, focus, disabled state,
native form value, and reset. Price owns monetary parts, target formatting, and
bidirectional isolation. K11 owns only their cart-specific arrangement and the
boundary to a target-owned commercial mutation.

Owner-selected K11-A and ADR 0257 resolve the prior commercial-model blocker:
targets map confirmed selection to exactly one explicit order-level sellable
gift-wrap line at quantity one. The configured service remains truthful in cart
totals, checkout, tax, discounts, refunds, fulfillment, and order records,
including an explicit canonical zero Price when it is free.

Neutral Web adds no K11 runtime and its renderer is unchanged from Batch 92.
Exhibit and Studio serialize the same renderer and fixture. Shopify now has a
validated implementation candidate: global opt-in and dedicated product
configuration, one shared Cart Page/Cart Drawer Liquid snippet, canonical Price,
localized feedback, suppressed service quantity editing, and a target-only Ajax
coordinator that reconciles every surface from authoritative cart snapshots.

Shopify deliberately remains `planned` and `ready:false`. Static Liquid plus a
mocked Ajax lifecycle cannot prove live section/Drawer totals refresh, real
merchant configuration, eligibility, inventory/tax/fulfillment policy, editor
behavior, or production error handling. No visual approval or `stable`
promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One optional order-level sellable service request; not a message field, style selector, price engine, cart store, request client, inventory service, Status, or analytics owner. |
| Anatomy and composition | pass | One wrapping native Checkbox label, canonical control and label parts, required visible K11 label, and optional complete canonical Price. |
| Variants, sizes, and states | pass | One intrinsic presentation; unchecked/checked, enabled/disabled, price present/absent, focus, invalid blank-label omission, and target idle/pending/confirmed/failed boundary are defined. |
| Public API and ownership | pass | Seven stable semantic properties: `label`, `selected`, `price`, `name`, `value`, `disabled`, and `describedBy`; commerce data and live reconciliation remain target-owned. |
| Tokens and hardcoded values | pass | Zero K11 public visual tokens; existing semantic spacing, border, radius, weight, Body Small, and secondary text compose the private presentation. |
| Accessibility and motion | pass | Native label activation, click/Space, accessible name, form value/reset, visible focus, forced colors, no neutral live region, and zero K11 motion. Target pending disables and marks busy; target failure alerts and restores focus. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL, RTL at `200px`, effective `200%` scale, dark, forced colors, and reduced motion remain evidenced from the unchanged neutral renderer. |
| Runtime and assets | pass | `0 B` neutral K11 runtime. Shopify runtime is target-only, conditionally loaded, abortable, and owns no neutral API. |
| Cross-target translation | conditional | Neutral Web and CSS projections pass. Shopify Liquid and mocked Ajax behavior pass, but live cart-surface refresh and commerce proof remain required. |
| Documentation and verification | pass | Dossier, ADRs 0183/0257, contract `0.3.0`, registry, CSS, renderer, Studio, MDX, target files, evidence, adapters, and matrices agree. |

## Neutral Contract And Browser Evidence

- Contract `0.3.0` declares Checkbox and Price dependencies, five anatomy parts,
  five states, five behaviors, seven semantic properties, one intrinsic
  variant/size profile, and zero public visual tokens.
- Browser inspection from Batch 92 finds exactly one wrapping `LABEL`, one
  `input[type="checkbox"]`, canonical `.checkbox__label`, one optional complete
  `.price`, and zero Status/Alert/live-region descendants.
- Exhibit and Studio produce byte-identical K11 subtrees and matching computed
  root, control, label, and price styles. The shared fixture includes native
  `name="gift_wrap"` and `value="selected"` only as neutral example data.
- Pointer activation, Space, native FormData inclusion/omission, form reset,
  selected/disabled projection, optional Price omission, and blank required
  label omission pass.
- The accessible tree exposes one named checkbox. Removing Price preserves the
  visible label as the valid name; a price alone can never name the choice.
- Light and dark contrast, a solid canonical Checkbox focus indication, forced
  colors, zero motion, four natural viewports, `200px` RTL, and effective `200%`
  zoom all pass without horizontal overflow.
- Eighteen final images remain in
  `output/playwright/refinement-batch-92/`: eight Exhibit/Studio viewport
  captures plus selected, focus, disabled, no-price, dark, forced colors,
  reduced motion, RTL/200px, and effective-zoom states. The canonical markup,
  CSS, renderer, fixture, and Studio surface did not change in Batch 141, so
  regenerating identical screenshots would add process cost without new visual
  evidence.

## Shopify Implementation And Runtime Evidence

The target implementation adds:

- `config/settings_schema.json`: merchant opt-in plus one dedicated product
  picker whose configured product must have exactly one variant;
- `snippets/gift-wrap.liquid`: the shared Cart Page/Cart Drawer candidate using
  canonical Checkbox and Price markup, real variant availability and explicit
  current price;
- `sections/main-cart.liquid` and `snippets/cart-drawer.liquid`: shared
  invocation and quantity-editor suppression for the service merchandise line;
- `assets/gift-wrap.js`: locale-aware authoritative read/add/update/read
  coordination, quantity-one normalization, cross-surface reconciliation,
  abort/cancellation, pending, deliberate success, visible error, and focus
  recovery; and
- English and Spanish target messages plus conditional loading from
  `layout/theme.liquid` only when the feature and product are configured.

The final isolated Chromium run in
`output/playwright/refinement-batch-141/shopify-runtime-summary.json` uses one
context and one page and proves:

- both Cart Page and Cart Drawer start unchecked from an empty authoritative
  cart;
- selecting once uses locale-aware `/fr/cart.js`, `/fr/cart/add.js`, then
  `/fr/cart.js`, creates exactly one variant `4242` line at quantity one, and
  reconciles both surfaces;
- a repeated selected request performs only authoritative reads and does not
  add or update an already normalized cart;
- deselection updates every matching line key to zero and reconciles both
  surfaces unchecked;
- two external matching lines with quantity above one normalize to one line at
  quantity one on the next selected request;
- pending marks the source wrapper `aria-busy`, disables its Checkbox, and
  preserves requested checkedness until confirmation;
- a simulated `422` mutation failure re-reads the authoritative empty cart,
  restores both surfaces unchecked, shows a visible `role="alert"`, and returns
  focus to the source Checkbox; and
- there are zero console errors, page errors, or failed assertions, and the
  browser closes in `finally`.

Two preliminary harness runs exposed test-control issues rather than component
failures: Playwright's high-level `check()` waited through the intentional
pending disable, then an `about:blank` URL base could not resolve the mocked
locale route. Both browsers also closed in `finally`; the final harness uses a
native change dispatch and a deterministic test origin.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Wrapping native Checkbox label with optional canonical Price. | Implemented and evidenced with zero K11 runtime. |
| Shopify | Dedicated single-variant product plus shared Liquid and target-only Ajax coordinator mapping authoritative cart state to one line at quantity one. | Candidate implemented and statically/mocked validated; `planned`, `ready:false` until live section/Drawer and commerce proof. |
| Webflow / Framer | Native checkbox/CSS projection plus configured target form or event integration. | CSS/static semantics available; persistence and commercial model require target configuration. |
| React / Angular / Hydrogen | Controlled or uncontrolled Checkbox composition with optional canonical Price and external mutation. | Contract-ready; no framework dependency in base source. |
| Figma | Canonical Checkbox and Price instances with selected and disabled profiles. | Planned; registered nodes are generic Button shells, not K11 artwork or approval. |
| SwiftUI / Compose | Native checkbox/toggle row with target-formatted price content. | Conceptual; sellable-service state and results remain application-owned. |

Shopify's official Cart Ajax API supplies locale-aware cart reads, additions,
and line-key updates; the product setting supplies the merchant-selected
product; and Liquid `line_item` exposes variant identity and line keys. The
seven changed theme files pass official Theme Check as artifact
`k11-gift-wrap-dedicated-line-batch141`, revision 1. The generated adapter now
detects 60 dedicated Liquid templates globally, while K11 correctly remains
non-ready because its contract behavior still requires live target work.

## Performance And Risks

- K11 CSS remains `579 B` raw / `326 B` gzip and its neutral runtime delta is
  `0 B`.
- The permanent audit records Cart at `3,057 / 3,072 B`, leaving `15 B`
  headroom. The K11 slice SHA-256 remains
  `2241500ff18f5866ddfffb7f96db889dab2b95e1e3b90cec011cdada267ea462`.
- The Shopify-only coordinator is `6,582 B` raw / `2,211 B` gzip and is loaded
  only when the global feature and product are configured. It does not enter
  the neutral shared runtime.
- The existing program gaps remain `71,891 / 65,536 B` for neutral component
  CSS and `22,807 / 8,192 B` for shared runtime; K11 adds neither neutral CSS nor
  neutral JavaScript in this batch.
- The merchant must configure and maintain the dedicated product's Price,
  channel visibility, inventory, tax, shipping, fulfillment, refund, discount,
  and localization policies.
- Product policy still owns empty-cart, digital-only/mixed-cart eligibility,
  default selection, service deletion, free-service policy, and any future
  message or style components.
- Live Shopify must refresh visible merchandise, totals, item count, Cart Page,
  and Cart Drawer from the confirmed payload. The coordinator emits
  `tg:cart-updated`, but the repository still lacks a proven shared surface
  refresh consumer.
- External integrations can create duplicates or quantity above one. The UI
  suppresses direct quantity editing and normalizes selected requests, but
  production integrations must preserve the invariant too.
- Human review must approve border, padding, label/price hierarchy, Checkbox
  alignment, disabled treatment, cart placement, zero-price treatment, and the
  neutral candidate without K11-specific owner artwork.

## Validation

- registry, source tokens, 183 contracts, 183 Studio definitions and 1,019
  semantic properties: pass;
- 254 static previews and all 183 structural component gates: pass;
- exact unchanged neutral Exhibit/Studio evidence from Batch 92: retained;
- final Shopify mocked lifecycle: zero failures/errors, one context/page,
  browser closed;
- official Theme Check: seven files pass;
- Neutral Web adapter: 183 components and 19 CSS source files, valid;
- Shopify adapter: 183 components, 90 target-ready globally, 60 dedicated
  Liquid templates, 34/34 schema-ready and 17 CSS assets, valid with documented
  planned-contract warnings;
- TypeScript: pass;
- external docs build: 2,508 modules into
  `/tmp/the-gallery-site-k11-batch-141`, with no `site/dist` rebuild;
- refinement matrix: `155 / 183` ready for human review, `28` remaining;
- performance audit: 18 surfaces, 10 pass, 8 documented gaps, zero undocumented
  gaps; and
- `evidence:cleanup` plus `evidence:assert-clean`: Gallery URL unresponsive,
  port `4173` free, managed server stopped, and stable Playwright session closed.

Human visual review, live Shopify lifecycle proof, and explicit stability review
remain pending. No `stable` promotion is claimed.
