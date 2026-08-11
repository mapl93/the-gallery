# Component Dossier: Cart Page

Status: `human-review-ready`

Date: 2026-07-21

Registry: `K1` / `cart-page`

Dependency order: 97, phase 6 (Composed components), depth 2

## Recommendation

Refine K1 as the named populated-cart composition of canonical Cart Line Item
and Cart Summary, not as a target-agnostic cart store, calculation engine,
mutation client, checkout router or empty-cart state machine. Require a
non-empty contextual title, an ordered non-empty canonical line collection and
one valid canonical summary. Keep the visible target-formatted count optional.
Render Continue Shopping only when both its visible label and real target-owned
destination are present.

Use one heading-labelled native `section.cart-page`, a semantic header, and one
private layout wrapper containing neutral item and summary regions. The wrapper
allows the two-column response to use K1's own named container rather than the
browser viewport. Do not add landmark roles to the neutral item/summary wrappers:
the native line list and named Cart Summary already expose their own structure.
Heading rank remains target-context markup: the docs renderer uses H2 while a
full storefront page uses H1.

Extract a docs-only `CartPageArtwork` for the K1 shell and feed it the already
canonical `CartLineItemArtwork` and `CartSummaryArtwork`. Exhibit and Studio then
share the exact K1 renderer, fixture and dependency subtrees. Required Studio
slots remain visible but non-removable; invalid title or missing required slots
omit the complete renderer rather than exposing an unnamed or incomplete page.

Remove the current Studio grid/padding overrides and the Shopify section's
parallel inline layout/sticky CSS. Canonical K1 owns intrinsic layout, header
presentation and the semantic `summaryPlacement: sticky | flow` mapping. Sticky
is the default request, but canonical CSS and each target must degrade it to
flow whenever component width, viewport height, target chrome or focus safety
cannot be satisfied. Targets own outer page gutters, forms, the real
header/safe-area offset, mutation lifecycle, coherent snapshot refresh, status
messages, error recovery, focus after removal, checkout navigation and
analytics.

Keep the current dependencies `cart-line-item` and `cart-summary`. The accepted
owner direction keeps canonical `Cart Empty` outside K1; when `cart.empty?` or
the last line is removed, the target atomically replaces K1 with that mutually
exclusive composition.

K1 remains `pilot`. ADR 0254 resolves the populated/empty and sticky/flow API
direction. Target runtime, Shopify live-store proof, final visuals,
component-specific Figma evidence and explicit human approval remain open.

## Purpose And Limits

- Presents one coherent populated-cart snapshot at page scale.
- Names the composition with a visible target-context heading.
- May expose a complete target-formatted item-count string from the same
  snapshot.
- May expose one complete ordinary link back to a target-selected shopping
  destination.
- Requires an ordered canonical Cart Line Item collection and one canonical
  Cart Summary from the same confirmed snapshot.
- Owns only header presentation, intrinsic arrangement and dependency slots.
- Does not own raw cart records, money, quantity arithmetic, discounts, tax,
  duty, shipping, currency, inventory, selling plans or remote-product policy.
- Does not fetch, persist, retry, roll back, reconcile or announce mutations.
- Does not define one universal form shape, Ajax protocol, framework store,
  provider SDK, checkout URL, navigation transition or analytics event.
- Owns only the semantic sticky/flow request and safe intrinsic fallback; the
  actual target chrome offset and certification remain target-owned.
- Does not render an empty page, loading skeleton, error surface, recovery
  action or checkout result without an explicit future composition decision.
- Does not expose grid columns, sidebar width, breakpoint, padding, alignment,
  sticky offset, available height, collision behavior or heading rank as public
  properties.

## Accepted Source Facts

- The repository is the source of truth; Figma is evidence and a future target.
- Registry K1 already declares `cart-line-item` and `cart-summary` dependencies.
- ADR 0174 establishes Cart Line Item as the canonical record consumed by Cart
  Page and assigns data, mutation, pending/error/status and focus to targets.
- ADR 0175 establishes Cart Summary as the passive target-controlled snapshot
  and checkout handoff; it explicitly assigns any sticky placement to Cart Page
  or another target without approving a default sticky behavior.
- ADR 0254 records the later owner decision: K1 remains populated-only and adds
  semantic `summaryPlacement`, default sticky, with explicit flow and truthful
  target fallback.
- Cart Line Item and Cart Summary are both technically refined, container
  responsive, zero-runtime and ready for visual human review.
- The current K1 contract requires `title`, `lineItems` and `summary`, while
  keeping `count` and Continue Shopping optional.
- Cart Empty is a separate canonical component. Shopify selects it when
  `cart.empty?` outside `.cart-page`; no accepted decision says K1 owns that
  branch.
- The component-refinement goal requires canonical composition, shared
  Exhibit/Studio implementation and container-based response.
- K1's registered Figma frame `943:7` and inspector `1020:480` are generic
  Button/Studio references rather than component-specific Cart Page artwork.

## Baseline Implementation Audit

### Identity, DOM And API

- `renderCartPage()` directly emits `section.cart-page` without an accessible
  name or heading relationship. Its nested `section.cart-page__items` also has
  no heading and is sectioning markup used only as a layout container.
- The title is not trimmed or gated, so a blank H2 and unnamed root can render.
- Required `lineItems` and `summary` Studio controls can both be disabled,
  allowing an incomplete populated-cart shell despite the contract.
- Continue Shopping renders when only the label exists and substitutes
  `#collection` when `continueHref` is blank. The preview therefore invents a
  destination rather than requiring a complete link composition.
- The optional count is visible snapshot content but the contract's `liveTotals`
  behavior implies K1 owns update announcements. Current code supplies no such
  behavior, and blindly making the count live would duplicate target statuses.
- K1 correctly calls the shared Cart Line Item and Cart Summary render paths;
  it does not duplicate their child markup in Studio. It lacks a reusable K1
  shell component, so page semantics and validation remain embedded in the
  family renderer.
- Cart Page adds no neutral listener, request or store. Child preview callbacks
  and statuses belong to dependency fixtures and the docs target.

### CSS, Tokens And Responsive Behavior

- Canonical `.cart-page` is the grid itself and switches columns through
  `@media (min-width: 1024px)`, so response follows the viewport rather than the
  component's available inline size.
- Studio replaces canonical columns with `minmax(0, 1fr) minmax(260px, 320px)`,
  removes K1 padding, changes the gap and adds separate container/media
  fallbacks. Exhibit and Studio therefore do not share one visual implementation.
- Canonical K1 applies page gutters internally through
  `--space-layout-container`, while Studio and Shopify both neutralize or
  replace that ownership. Outer target containers should own page gutters.
- The header uses physical `margin-bottom: 16px`; the wide summary column is a
  hardcoded `380px`; focus is a hardcoded `4px` outline with zero offset.
- Title/count/link typography omits accepted weight, line height and body-family
  roles. The continue link removes its underline until hover and depends on a
  runtime color mix without a forced-colors rule.
- K1 baseline CSS is `1,082 B` raw / `490 B` deterministic gzip, SHA-256
  `5de8fe426e8f76cef4fa53387deab763ceb0de5793a3251d51ccd1f12e9c20d1`.
- Complete Cart CSS is `15,968 B` raw / `3,028 B` gzip against the permanent
  `3,072 B` ceiling, leaving only `44 B` by the current deterministic measure.
  Neutral Web component CSS is `523,581 B` raw / `69,847 B`; shared runtime is
  `53,811 B` raw / `10,501 B`.

### Shopify Target

- `main-cart.liquid` correctly branches on `cart.empty?`, uses a native cart
  form for populated content, loops `cart.items`, and consumes canonical line,
  summary, note and discount snippets.
- Its H1 sits outside `.cart-page`, so the component root does not own the title,
  count or Continue Shopping anatomy declared by the contract.
- The section omits K1's visible item count and continue-shopping link.
- A section-local `<style>` redefines grid columns, summary surface, radius,
  padding and a hardcoded `top: 100px` sticky offset. This forks canonical CSS
  and reintroduces behavior Cart Summary intentionally removed.
- Shopify's official cart guidance requires real cart data, quantities/removal,
  totals, checkout form submission, discounts, notes/properties and coherent
  refresh. Theme Store requirements additionally cover tax-inclusive messaging,
  selling plans, unit pricing and accelerated checkout. Those are target
  completeness obligations, not neutral K1 properties.
- The section remains honestly `planned` because runtime/editor/live-store
  behavior is not proven, despite existing dedicated Liquid and schema.

### Documentation And Visual Baseline

- MDX describes the correct dependency boundary and paired Continue Shopping
  values but its fallback uses `H1`, `aside`, a direct grid without a named root
  or private layout wrapper, and copied dependency markup.
- Studio exposes required slots as ordinary removable toggles and publishes only
  a subset of the broad contract token inventory.
- Four preserved parity captures show coherent populated-cart content but
  visible Exhibit/Studio divergence. Mobile happens to stack; desktop Exhibit
  and Studio use different canvas widths, grid ownership, line geometry and
  summary proportions.
- The baseline does not prove blank required title, missing required slots,
  incomplete Continue Shopping values, target-confirmed status ownership,
  direct narrow/wide containers, exact normalized parity, RTL/localized/extreme
  content, 200% text, text spacing, dark, forced colors or reduced motion.

## External Research

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WHATWG section semantics](https://html.spec.whatwg.org/dev/sections.html#the-section-element) | `section` is a thematic grouping, typically with a heading, and must not replace a generic layout `div`. | Name the K1 root from its visible title; use neutral wrappers for items/layout rather than unnamed nested sections. |
| [WCAG 2.2 status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | A changed complete cart-count string may be a status; announcing only a number loses context and excessive live regions become chatty. | Keep count as snapshot content; a dynamic target announces one complete confirmed cart result once rather than making every total/count live. |
| [WAI form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Submission success and error feedback must be clear and programmatically available. | Mutation/checkout targets own pending, error, success, retry and focus; K1 must document the slot boundary without faking results. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | No cart or cart-page browser primitive is defined. | Use native section/list/form/link/button semantics and canonical Gallery dependencies; do not invent a cart widget role. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix publishes behavior primitives but no cart/page primitive. | No headless cart store, roving focus or controlled widget abstraction belongs in base K1. |
| [Polaris web components](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components) | Polaris provides Page, Section, Grid, Link, Button and feedback primitives whose availability depends on target context. | Keep K1 as semantic composition; targets choose page shell, grid and status services without leaking Polaris into base. |
| [Shopify cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart) | Cart templates use real cart/line data, form submission, quantities/removal, discounts, notes/attributes and target checkout behavior. | Shopify maps its authoritative objects and native form into canonical K1/K2/K3 classes; these raw objects are not universal properties. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements#cart-page-requirements) | A sellable theme must cover line details, total, tax-inclusive notice, checkout submission, coherent refresh, quantities, empty messaging, notes, selling plans, discounts and accelerated checkout. | Treat Shopify maturity as target certification; do not claim K1 target-ready from CSS/Liquid presence alone. |

WAI-ARIA APG defines no Cart Page interaction pattern. K1 is a document
composition containing ordinary dependency controls, so it gains no composite
role, arrow-key model, roving tabindex, selection state or focus trap.

## Mature-System Comparison And Convergence

Convergence:

- HTML, WAI, Shopify and existing Gallery dependencies favor native structural
  semantics and target-owned commerce truth.
- Open UI and Radix provide no evidence for a universal cart widget.
- Polaris and Shopify show that page shell, data, form, checkout and feedback
  capabilities depend on the target surface.
- Gallery already has canonical line and summary components, so K1 should own
  only their page-level composition.

Differences and gaps:

- Baseline K1 exposes an unnamed section and an unnamed nested section.
- It permits invalid required-slot omission and creates a false fallback link.
- Its responsive behavior is viewport-based and its Studio/Shopify layouts fork
  canonical CSS.
- The contract conflates visible snapshot count with live update ownership.
- Shopify implements more target requirements than K1 should expose, but still
  lacks canonical K1 header anatomy and retains unapproved sticky CSS.
- No component-specific visual reference approves the current proportions or
  the final sticky/flow treatment; that remains human visual review.

## Candidate Anatomy

| Part | Required | Semantic form | Owner |
| --- | --- | --- | --- |
| Root | yes | `section.cart-page[aria-labelledby]` | K1 |
| Header | yes | `header.cart-page__header` | K1 |
| Title | yes | visible contextual heading `.cart-page__title[id]` | target + K1 |
| Count | optional | complete text `.cart-page__count` | target snapshot |
| Continue link | optional/complete | native `a.cart-page__continue[href]` | target destination + K1 |
| Layout | yes/private | neutral `div.cart-page__layout` | K1 |
| Items region | yes | neutral `div.cart-page__items` | K1 |
| Line collection | yes/non-empty | canonical `ul.cart-lines > li.cart-line` | Cart Line Item + target |
| Summary region | yes | neutral `div.cart-page__summary` | K1 |
| Summary | yes | canonical named `.cart-summary` section | Cart Summary + target |

The layout wrapper is required implementation anatomy but not a semantic public
slot. K1 does not add an `aside` landmark, form, live region, status, Empty
State, note, discount, upsell or recommendation slot by inference.

## State, Variant, Size And Mode Matrix

| Dimension | Safe scope |
| --- | --- |
| Default populated | Named root, required title, non-empty canonical line collection and valid canonical summary. |
| Count omitted | Header remains named and balanced; no empty count node. |
| Continue omitted | Both label and destination absent; no empty/fallback link. |
| Incomplete Continue | Omit link when either label or destination is blank. |
| Invalid title | Omit complete K1 renderer. |
| Missing lines or summary | Omit complete docs renderer; production target must choose loading/error/empty recovery. |
| Quantity/remove/save update | Target owns request, coherent snapshot replacement, status and focus; K1 only re-renders supplied dependencies. |
| Checkout disabled/busy | Canonical Cart Summary/Button state; K1 adds no parallel page state. |
| Empty cart | Accepted separate target branch composing canonical Cart Empty; K1 is atomically replaced. |
| Narrow | Header and dependencies wrap; layout remains one column from K1 container. |
| Wide | Items and summary form two intrinsic tracks from K1 container. |
| Default sticky | Sticky is requested only in a wide/tall capable context; tall summary content is bounded and internally reachable. |
| Explicit flow | Same canonical summary and source order with `.cart-page--summary-flow`. |
| Short/zoomed/incapable | Target and canonical guards degrade sticky to flow without neutral runtime. |
| LTR/RTL/localized | Logical source order remains header, items, summary; values remain target-formatted. |
| Long/unbroken/200%/spacing | Root, header and child regions contain content without horizontal component overflow. |
| Light/dark/forced colors | Semantic text/link/focus tokens and canonical dependency treatments remain visible. |
| Reduced motion | K1 has no animation or transition. |

## Public API And State Ownership

- `title`: required non-empty visible cart title and root-name source.
- `count`: optional complete target-formatted snapshot string such as “2 items.”
- `continueLabel`: optional visible link purpose; valid only with
  `continueHref`.
- `continueHref`: optional real target-owned shopping destination; valid only
  with `continueLabel`.
- `lineItems`: required non-empty ordered canonical Cart Line Item composition.
- `summary`: required valid canonical Cart Summary composition from the same
  snapshot.

Do not expose `items`, raw prices, currency, quantity state, subtotal, total,
discounts, taxes, shipping, checkout URL, status text, loading/error booleans,
sticky offset, columns, sidebar width, breakpoint, form method, Ajax endpoint or
provider objects as K1 properties. Those belong to dependencies or targets.

K1 has no independent controlled/uncontrolled state. A framework target treats
the complete cart snapshot as controlled input and replaces it after confirmed
mutations. Native forms may reload the document; Ajax targets preserve/restore
focus and announce one contextual result. K1 never maintains a second local
cart truth.

## Token, Runtime And Performance Direction

- Retain only stable semantic header/link/spacing tokens already used by K1;
  private track width, header rhythm and container threshold remain internal.
- Remove target-owned page padding and every Studio/Shopify layout override.
- Use complete existing heading/body typography roles, logical geometry,
  ordinary underlined link treatment and canonical focus tokens.
- Fund the inner-container response within the permanent `3,072 B` Cart-family
  ceiling. Do not raise the family budget to accommodate duplicate rules.
- K1 adds `0 B` neutral JavaScript: no store, formatter, listener, observer,
  request, timer, sticky measurement, animation or provider SDK.
- Shared dependency interactions remain target/docs work and must not be counted
  as K1 runtime ownership.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Named populated-cart section + header + container-responsive layout + canonical K2/K3 composition. | Safe to implement now; target state remains external. |
| Shopify | `cart`/`line_item` data, native cart form, canonical snippets, localized header/count/link and target branch to Cart Empty. | Dedicated Liquid exists; canonical anatomy/layout reconciliation is safe, runtime/editor/live-store proof remains planned. |
| React / Angular / Hydrogen | Controlled cart snapshot, canonical child adapters and target router/fetcher/action/status lifecycle. | Planned; no neutral store or raw schema. |
| Figma | Named header plus populated one/two-column shell containing canonical K2/K3 instances and optional count/link states. | Planned; generic current nodes are insufficient. |
| SwiftUI / Compose | Native page title, cart-line collection, summary/payment surface and platform state/announcements. | Conceptual; commerce data and checkout stay target-native. |

## Owner Decision Reconciliation

The owner selected K1-A and clarified its presentation policy:

- K1 is populated-only; Cart Empty remains a mutually exclusive target branch.
- The stable semantic choice is `summaryPlacement: sticky | flow`, defaulting
  to sticky.
- Both modes consume the same canonical summary and target snapshot.
- Narrow, short, zoomed or incapable contexts and targets fall back to flow.
- The target owns the true header/safe-area offset, available height, collision
  boundary, focus safety and production evidence.
- K1 gains no status slot. One target coordinator continues to own mutation
  results and announcements.

ADR 0254 records these choices. The alternatives are no longer implementation
blockers.

## Human Review Boundary

Human review must approve title/count/link hierarchy, page rhythm, wide track
proportions, sticky and flow presentation, narrow/short fallback and
relationship to target gutters. Shopify must prove coherent
quantity/removal refresh, total/tax/discount/selling-plan/unit-price coverage,
checkout, accelerated-payment behavior, editor placement choice, header offset,
zoom and focus safety in a live target. Component-specific Figma evidence
remains absent. No `stable` promotion is permitted without explicit approval.

## Current Gallery Result

K1 now implements the accepted populated-cart and placement boundary under ADRs
0212 and 0254:

- `CartPageArtwork` is the single docs renderer consumed by Exhibit and
  Studio. It trims authored strings, rejects a blank required title or missing
  required dependency composition, names a native section from its visible
  heading, isolates the optional count with `bdi`, and emits Continue Shopping
  only when label and destination are both complete.
- The shared fixture composes the existing canonical Cart Line Item and Cart
  Summary renderers. Required Studio slots remain checked and disabled.
- The target fixture demonstrates a coherent confirmed update: quantity
  `1 -> 2`, count `1 item -> 2 items`, and estimated total
  `$120.00 USD -> $240.00 USD`. K1 itself still owns no cart state or
  calculation.
- Canonical CSS now owns complete title/count/link typography and focus,
  logical wrapping, neutral layout regions, a named inline-size container and
  a private `56rem` one/two-column threshold.
- `summaryPlacement` defaults to sticky and maps explicit flow to
  `.cart-page--summary-flow`. Sticky applies only for a sufficiently wide
  component and tall viewport, uses a target-overridable private safe offset,
  bounds tall content to available dynamic viewport height, and otherwise
  degrades to flow without JavaScript or source reordering.
- The viewport breakpoint, root page padding, physical header margin and all
  Cart Page-specific Studio layout overrides are removed.
- Shopify's populated branch maps the native cart form, real cart items,
  localized plural count, real all-products destination and canonical line/
  summary snippets into the same K1 anatomy. Cart Note, explicit update,
  Discount Field and Cart Empty remain target composition outside the K1 root.
- Shopify's editor exposes sticky and flow, maps its owned Gallery Header plus
  safe-area offset, and reuses canonical CSS rather than restoring the removed
  hardcoded `top: 100px` fork. English and Spanish settings validate.

Final browser evidence under `output/playwright/refinement-batch-121/` and the
placement-specific `output/playwright/refinement-batch-138/` proves:

- eight natural Exhibit/Studio captures across mobile, tablet, desktop and XL;
- zero root, visible-descendant or natural-document overflow;
- direct `280/560/895/896/1000/1200px` component widths, with the exact
  one-to-two-column switch between `895px` and `896px`;
- blank-title, omitted-count and incomplete-link failure-closed behavior;
- required dependency controls that cannot create an invalid Studio state;
- native keyboard focus with a solid `2px` outline and `3px` offset;
- the coherent local target update without competing live regions;
- localized RTL, extreme unbroken content, effective 200% text, user text
  spacing, dark, forced-colors and reduced-motion modes;
- light contrast of `17.93:1` title, `7.81:1` count and `5.88:1` link,
  plus dark contrast of `17.18:1`, `12.09:1` and `9.95:1`;
- exact normalized Exhibit/Studio DOM hash `fc1a107e` and internal-style
  hash `10ad07e1` in the prior full-mode baseline;
- batch 138's exact normalized default-tree hash `f6099acc` in both Exhibit and
  Studio;
- sticky as the selected default, explicit flow as `position: static`, and
  automatic flow fallback at `895px` component width or `500px` viewport
  height;
- sticky activation at `896px` by `900px`, plus a bounded `2,897px` summary
  whose focused Checkout remains visible after internal scrolling; and
- one page, no console/page errors, no K1 script and a clean server/browser
  resource gate.

The final K1 slice is `2,537 B` raw / `814 B` deterministic gzip. The complete
Cart family is `17,085 B` raw / `3,047 B` deterministic gzip; the permanent
auditor measures `3,057 / 3,072 B`, retaining `15 B` of headroom without a
budget increase. Source, Webflow and Shopify Cart CSS copies are byte-identical.

All structural, source, adapter, TypeScript, Vite, Exhibit/Studio and automated
readiness gates pass. Shopify Liquid validation passes for the section and both
locales, but the adapter remains honestly `planned` until runtime, Theme
Editor and live-store behavior are proven.

K1 therefore closes as `human-review-ready`, not `stable`. The accepted
populated-only and sticky/flow direction is implemented. Human review must
still approve final visual proportions and both placements; Shopify production
behavior, component-specific Figma evidence and explicit stability approval
remain pending.
