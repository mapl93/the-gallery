# Component Dossier: Cart Summary

Status: `human-review-ready`

Target reviewed: Neutral Web, Cart Page composition, Studio, and Shopify cart
surfaces

Contract: `components/contracts/cart-summary.contract.json`

## Recommendation

Define Cart Summary as a passive, target-controlled named section containing an
association list of complete target-formatted totals, one required primary
checkout Button, an optional concise expectation note, and an optional
target-native express-checkout slot. The summary presents one coherent commerce
snapshot; it does not calculate, format, fetch, announce or persist anything.

Use `section.cart-summary` named by its visible heading, and
`dl.cart-summary__rows` with one `div.cart-summary__row` containing `dt` and `dd`
for each name/value pair. Require at least one total row. Keep monetary or
non-monetary values as complete target strings inside `bdi`; canonical Price is
not the right dependency because a cart summary can contain shipping states,
discount descriptions and legally qualified totals rather than a product price.

Keep the accepted `title`, `rows`, `note`, `checkoutLabel`,
`checkoutDisabled`, and `express` properties. Add `checkoutBusy` by composing
the already accepted Button pending contract. Do not expose row count, raw
amounts, currency, tax/shipping booleans, discount records, payment providers,
sticky offset, columns, divider label or provider markup as neutral API.

Remove sticky positioning from K3 itself. Stickiness and obstruction avoidance
depend on the parent page/header/scroll container and belong to Cart Page or the
target. Cart Drawer retains its intentionally isolated compact summary under ADR
0109 and must not start depending on K3.

## Purpose And Limits

- Summarizes a target-owned cart snapshot immediately before checkout.
- Presents complete subtotal, discount, shipping/tax/duty and total facts in a
  readable label/value relationship.
- Provides the primary checkout handoff and can compose target-native express
  checkout actions without inspecting or styling their internal provider DOM.
- Supports a concise target-authored expectation/legal note when totals are not
  final until checkout.
- Is not Cart Page, Cart Drawer, checkout, Order Summary, Price, Discount Field,
  shipping estimator, tax/duty engine, formatter, cart store, payment-provider
  selector, consent step, fraud/risk decision, network client or live region.
- Does not promise that subtotal, shipping, tax, duties and total are all known
  or all present. The target renders only truthful rows from one snapshot.
- Does not decide whether checkout is a form submission, link, host component,
  redirect, SDK call or native navigation action.

Use Cart Drawer’s compact summary for its modal footer and Cart Summary for the
full cart-page decision surface. A future read-only order/invoice summary needs
separate purpose and action rules rather than omitting K3 checkout ad hoc.

## Current Gallery Baseline

- Registry `K3`, Cart, depends on Button; contract `0.1.0`, `pilot`, with six
  semantic properties and a planned Shopify mapping.
- Canonical CSS makes every summary sticky at physical `top: 80px`, which leaks
  Header/scroll-container ownership into the primitive. Studio neutralizes this
  with a docs-only `position: static` override, so consumer and evidence behavior
  differ.
- The root is an `aside`, although the order summary is primary cart content,
  not tangential complementary content. Rows use generic `div`/`span` markup
  rather than a description/association list; values lack direction isolation.
- Required rows and total-row anatomy are not structurally connected: `rows`
  can be toggled off while checkout and a note remain. The required title and
  checkout label are not trimmed/omitted when invalid.
- Title, rows and total omit complete line-height/family mappings. The note and
  express separator use calculated `0.75` type; spacing, padding and sticky
  offset are raw pixels. Values use tabular numerals but no complete type role.
- The express slot toggle invents hardcoded English “or” and a generic Button;
  no provider is implied by the contract. Checkout demonstrates disabled but
  not the canonical Button busy state or a target-owned result/error boundary.
- Exhibit and Studio share `CartStudio`, but Cart Page calls the same local
  `renderSummary(false)` rather than a reusable target artwork component. MDX
  copies separate generic markup and omits express composition.
- Shopify Main Cart embeds a partial `.cart-summary` with a class name not in the
  contract (`cart-summary__total`), then places unlocalized note and Buttons
  outside it with inline styles. It shows `cart.total_price` as “Subtotal,” does
  not expose cart-level discounts or accelerated checkout, and duplicates the
  summary instead of using a dedicated target-native snippet.
- Current Mobile/Desktop parity images show a compact grey card with title,
  three generic rows, primary Button, note and express Button. Tablet, XL,
  narrow-container, localized/RTL/long currency, missing optional content,
  disabled/busy, dark, forced colors, reduced motion and zoom evidence are absent.
- Registered Figma nodes `943:7` and `1020:480` are reused by many unrelated
  components and have already been identified as Button/Studio evidence. They
  are not component-specific K3 visual approval.
- Deterministic level-9 baseline is K3 CSS slice `1,458 B` raw / `541 B` gzip,
  complete Cart CSS `3,021 B` gzip against a `3.0 KiB` ceiling, complete Web
  component CSS `67,755 B` against `64 KiB`, and shared runtime `10,501 B`
  against `8 KiB`. K3 adds no neutral runtime or asset.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `dl`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element) | `dl` represents name/value groups; each group may be wrapped in `div` with `dt` followed by `dd`. | Render summary facts as a native association list rather than generic rows or a table. |
| [HTML `section`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | A section represents a thematic grouping and normally has a heading. | Use a visible-heading named section; do not imply tangential `aside` semantics. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Updated cart-result text shown without moving focus must be programmatically determinable; announcing only a changed number can lose context. | The parent target owns one contextual status such as “Cart total updated to …”; K3 rows themselves are not live regions. |
| [WCAG 2.2 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) | Sequential focus must preserve meaning and operability. | Keep the primary checkout before optional express actions in DOM/focus order and do not visually reorder provider controls. |
| [WAI-ARIA APG pattern index](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines Button and widgets but no cart-summary widget. | Use native section/list/Button semantics; add no summary widget role or custom keyboard model. |
| [Open UI component research](https://open-ui.org/components/) | The inspected catalogue does not define a stable cart-summary/checkout-summary control. | Do not freeze an emerging raw cart/payment API into the neutral contract. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix covers low-level behavioral primitives and open composition, not commerce totals or checkout. | Compose canonical Button and target slots; do not invent a Radix-like cart state primitive. |
| [Polaris components](https://polaris-react.shopify.com/components) | Polaris exposes Button, Card and Description List for admin composition but no storefront cart summary. | Description-list structure and action hierarchy are relevant; admin API/visuals are not copied. |
| [Shopify cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart) | Cart templates must use the cart object, show discounts, support native cart form checkout and expose line updates/removal. | Shopify maps real cart truth and a `name="checkout"` submit into K3; neutral source owns no form endpoint. |
| [Shopify Liquid `cart`](https://shopify.dev/docs/api/liquid/objects/cart) | `items_subtotal_price`, `total_discount`, `total_price`, tax/duty/shipping flags and discount applications have distinct meanings. | Do not relabel total as subtotal; render complete formatted target facts and preserve legal/estimate qualifications. |
| [Shopify accelerated checkout](https://shopify.dev/docs/storefronts/themes/pricing-payments/accelerated-checkout) | Cart express actions use provider-owned objects/custom elements with closed shadow DOM and supported outer custom properties. | Keep `express` as opaque target-native composition; never inspect, restyle or event-track provider internals. |
| [Shopify Dawn cart footer](https://github.com/Shopify/dawn/blob/main/sections/main-cart-footer.liquid) | A mature theme separates discounts, estimated total, tax/duty/shipping qualification, primary checkout and provider actions. | Adopt data completeness and target ownership, not Dawn markup, settings breadth or visual identity. |

Standards and mature systems converge on semantic name/value presentation plus a
target checkout action, but not on a universal raw monetary/cart schema.

## Matches, Differences, And Direction

- ADR 0077 already accepts a heading, repeated rows, optional note, primary
  checkout, disabled state and optional express slot. Refinement preserves that
  public boundary and only composes Button’s accepted busy state.
- A native description list matches both HTML and Polaris information-pair
  patterns. A table would overstate column/table navigation for a short set of
  heterogeneous cart facts.
- Price is deliberately not added as a dependency: Product Price owns current,
  compare-at and unit semantics, while K3 values may be “Free,” “Calculated at
  checkout,” a named discount, or an estimated total with currency/legal text.
- `bdi` isolates complete target-formatted values without promoting currency,
  locale, amount or formatter properties.
- Express checkout is provider-owned. The slot carries its complete target DOM,
  accessible names and lifecycle; any visible separator is fixture/target
  content, not a neutral provider label or generated default.
- Sticky behavior is useful in Cart Page but incoherent in Drawer, embedded or
  independently scrolling hosts. Parent/target ownership avoids a public sticky
  flag and a hardcoded global-header offset.
- Cart Drawer’s compact summary remains isolated by ADR 0109. Reusing K3 there
  would reintroduce the import-order/ownership collision already resolved.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `section.cart-summary` | Cart Summary | Named by visible title; no `aside`, widget role or live region. |
| Title | yes | `h2.cart-summary__title` or context-correct heading | target | Required non-empty name; heading level adapts to document outline. |
| Rows | yes | `dl.cart-summary__rows` | Cart Summary/target | One coherent target snapshot; at least a total row. |
| Row | one or more | `div.cart-summary__row` | target | Native `dt`/`dd` group; rows omitted when unknown, not filled with invented zeroes. |
| Label | per row | `dt.cart-summary__label` | target | Complete localized meaning such as Subtotal, Discount or Estimated total. |
| Value | per row | `dd.cart-summary__value > bdi` | target | Complete formatted/qualified string; no raw amount. |
| Total row | yes | `.cart-summary__row--total` | target | Visually emphasized but semantically still a name/value pair. |
| Note | optional | `p.cart-summary__note` | target | Concise tax/duty/shipping/checkout expectation; may contain target link if slot-authored in a future reviewed API. |
| Checkout | yes | canonical Button | Button/target | Primary handoff; target owns submit/link/SDK/navigation behavior and result. |
| Express | optional | `.cart-summary__express` slot | provider/target | Opaque provider-native actions, labels, state and lifecycle. |
| Divider | optional within express composition | `.cart-summary__divider` | target fixture | Visible localized separator when useful; not required and not generated by API. |
| Status/error | target composition | target status/error region | parent/target | Pending/error/result context belongs outside stable totals or in the target form. |

## Variant, Size, State, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral summary. Estimated/final, discount/tax/shipping combinations are row content, not style variants. |
| Size | One intrinsic container-responsive composition; parent controls measure and sticky placement. |
| Rows | Required total; optional subtotal, one/many discounts, shipping, tax, duties, credit or other truthful facts. |
| Checkout | Available, disabled with visible reason, or busy through canonical Button. Error/result belongs to the target. |
| Express | Absent or one opaque target/provider slot; zero/one/many provider actions are provider-owned. |
| Note | Omitted or concise localized expectation/legal qualification; long policy content is linked/placed elsewhere. |
| Content stress | Short, long localized labels, long currency/range strings, negative discounts, “Free,” pending estimate, many rows and unbroken reference text. |
| Environment | Light, dark, forced colors, reduced motion, 200% zoom, LTR/RTL/mixed currency, 200px to wide parent containers. |

Invalid/incoherent states include blank title or checkout label, rows without a
total, generic `span` pairs, raw amounts, stale values from different snapshots,
disabled checkout without an explanation, busy action that remains activatable,
provider controls without names, the same checkout action duplicated, automatic
live announcements on every amount, or component-owned sticky offset.

## Public API And State Ownership

- `title` — required non-empty visible section name.
- `rows` — required semantic composition slot containing at least one total
  name/value group. Complete rows remain target content, not raw neutral data.
- `note` — optional concise expectation/qualification string.
- `checkoutLabel` — required non-empty visible primary action label.
- `checkoutDisabled` — optional `false`; composes canonical Button disabled
  behavior while the target supplies a visible reason.
- `checkoutBusy` — optional `false`; composes canonical Button busy/disabled
  behavior during a target checkout request.
- `express` — optional opaque target-native express-checkout slot.

Do not expose `subtotal`, `discounts`, `shipping`, `tax`, `duties`, `total`, raw
amounts, currency, locale, formatter, estimate flags, provider names, provider
button count, checkout URL, form ID, sticky, offset, columns, padding, divider
label, status, error, retry or analytics at the neutral layer.

The complete snapshot and checkout action are controlled by the target. Static
HTML may submit a named cart form; Shopify may submit or re-render sections;
framework/custom storefronts bind a cart/fetcher/router; native targets navigate
through platform checkout services. K3 owns no uncontrolled totals, formatter,
calculation, request, provider SDK, cache, status queue or focus movement.

## Token And Value Audit

- Reconcile to existing secondary surface, primary/secondary text, subtle border,
  large radius, element-gap, Body/Body Small/H4 size and line-height, heading/body
  families and accepted semibold/bold weights. Do not create a K3 token layer.
- Remove the unused disabled text token; Button owns disabled/busy presentation.
- Replace calculated `0.75` typography with complete Body Small size/line-height
  and complete all title/row/note family/line-height pairs.
- Keep row gap, padding subdivisions, total emphasis, divider geometry, wrapping,
  numeric feature and compact threshold private.
- Eliminate physical `top`, `margin-top`, `padding-top`, `height` and text-align
  where logical properties apply. Parent sticky offset is not a token/API.
- The exact surface, radius, 24px padding, 16px/12px/8px rhythm, weights and
  divider treatment require owner visual review; reuse semantic values/private
  calculations rather than publishing each choice.

## Accessibility, Responsive, And Runtime Direction

- A named native section and `dl`/`dt`/`dd` expose structure without ARIA. Do not
  add `role="group"`, table roles, `aria-label` to the value list, roving focus,
  or a custom cart-summary widget.
- Preserve label then value DOM order for every row. Use logical grid alignment,
  safe wrapping, `min-inline-size: 0`, `overflow-wrap` and `bdi` for mixed
  direction. A narrow named container may stack a row without reordering it.
- Checkout composes canonical Button focus, disabled and busy behavior. Keep the
  primary action before optional express controls in DOM order.
- Parent/target status reports cart update or checkout results once with context;
  do not put `aria-live` on totals or individual values. When totals update while
  checkout retains focus, the action stays stable and operable.
- K3 owns no motion. Reduced motion affects only composed target/provider actions.
  Forced colors must retain total/divider boundaries and Button focus.
- Passive layout adds `0 B` neutral JavaScript: no listener, observer, timer,
  formatter, provider SDK, network request, sticky measurement or animation loop.
- Test direct containers near 200/320/420/760px, required 390/768/1280/1600
  outer viewports, long localized/RTL/mixed values, effective 200% zoom, dark,
  forced colors and provider-slot overflow.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named section + native association list + canonical Button + opaque express slot; target controls snapshot and handoff. | Implemented and evidenced in Exhibit and Studio; production target state remains external. |
| Shopify | `cart.items_subtotal_price`, discount applications/`total_discount`, `total_price`, tax/shipping qualification, native `name="checkout"`, and provider-owned additional checkout buttons. | Shared localized snippet implemented and officially validated; runtime/editor/live-store proof remains planned. |
| React / Angular / Hydrogen | Controlled cart snapshot and checkout promise/router/fetcher; semantic strings render without a second formatter. | Planned; no neutral store/provider SDK. |
| Figma | Row records, required total, optional note, disabled/busy primary Button and opaque express region across narrow/wide content. | Generic nodes are incorrect; component-specific visual evidence and approval are absent. |
| SwiftUI / Compose | Native named section/list pairs, formatted strings, primary progress-capable action and platform express/payment surface. | Planned; checkout, announcements and provider UI remain platform-owned. |

## Exhibit And Studio Parity

`CartSummaryArtwork` is now the actual docs-target implementation used by K3 and
Cart Page. Exhibit and Studio keep one fixture, renderer, DOM and CSS; Studio
metadata controls only the reviewed semantic properties/tokens. Representative
rows and express Button remain fixture content, not defaults or provider
promises.

MDX Preview is a static fallback using the same named section, native
association-list anatomy and canonical Button classes. It creates no independent
checkout behavior.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Generic rows lose native label/value relationships. | critical | Use `dl` with grouped `dt`/`dd` and complete target strings. | implementation/contract |
| Main Cart labels total as subtotal and leaves K3 actions outside the component. | critical | Map distinct Shopify cart facts into one dedicated K3 snippet/form composition. | target implementation |
| K3 owns a hardcoded sticky offset while Studio disables it. | high | Remove component stickiness; parent/target owns placement and obstruction avoidance. | architecture boundary/implementation |
| Cart Page and K3 share a local helper, not a reusable artwork component; MDX copies markup. | high | Extract one `CartSummaryArtwork` and reconcile fallback anatomy. | implementation |
| Express fixture hardcodes English “or” and generic provider behavior. | high | Keep the slot opaque; separator/provider content stays target fixture data. | target/fixture |
| Checkout has disabled but not canonical busy composition. | high | Add `checkoutBusy`, preserve label and prevent duplicate activation through Button. | accepted dependency extension |
| Title/checkout can be blank and rows can omit the required total. | high | Trim/gate required content and preserve required rows in Studio; invalid target input omits the root. | implementation/validation |
| Type, spacing and physical properties are incomplete/hardcoded. | medium | Use existing complete semantic roles, logical CSS and private composition values. | implementation/human review |
| K3-specific visual reference is absent. | human review | Preserve a coherent repository candidate and request owner visual approval after gates pass. | owner |

## Evidence And Validation Result

- Fifteen after images cover Exhibit and Studio at 390x844, 768x1024, 1280x800
  and 1600x1000 plus checkout result, busy, minimal, long localized RTL at a
  200px container, dark/reduced motion, forced colors and effective 200% zoom.
- Exhibit and Studio serialize to the same 1,024-character canonical summary
  subtree. The accessibility tree exposes the named region, heading, three
  term/definition pairs and two Buttons with no summary live region.
- Busy checkout is disabled with `aria-busy="true"` and the canonical Button
  spinner. Removing note and express leaves one valid list and one checkout
  Button. A missing required title omits the root instead of emitting an unnamed
  section.
- The 200px RTL fixture reports equal client/scroll widths for root, stage and
  document. Effective 200% zoom also reports no horizontal document or root
  overflow. Dark and forced-colors evidence preserve boundaries and hierarchy;
  reduced motion reports zero summary transition duration.
- Checkout fires once and produces a target-owned status outside K3. Final
  component console inspection reports zero errors and zero warnings.
- Contract, Studio, docs, Neutral Web, Shopify, official Liquid, TypeScript,
  parity/static-preview/refinement, deterministic gzip, generated-copy identity,
  diff, `site/dist` and resource-cleanup gates are recorded in Batch 84.

## Risks And Open Questions

1. Owner visual review must approve surface, radius, title/total hierarchy, row
   density, note strength, checkout prominence, express separation, narrow
   stacking and parent sticky treatment.
2. Targets must define when totals are estimated/final, tax/duty/shipping
   qualification, currency display, discount naming/order, snapshot consistency,
   stale/pending/error policy and one contextual announcement channel.
3. Checkout handoff, duplicate-submit prevention, error recovery, focus after
   redirect failure and analytics remain target behavior. `checkoutBusy` only
   maps the accepted Button state.
4. Express checkout remains provider-native. Shopify provider HTML uses a closed
   shadow DOM; other targets may use SDK/native surfaces or omit the slot.
5. Cart Page must later decide sticky placement, offset, focus-obscuration and
   narrow ordering as a parent-layout decision. K3 exposes no sticky property.
6. Shopify needs truthful tax/duty/shipping localization and editor/live-store
   proof before its adapter can move beyond `planned`.
7. Neutral Web CSS/runtime already exceed program ceilings and Cart CSS has only
   `9 B` headroom after K3. K3 remains zero-runtime; later Cart work must recover
   family budget before adding CSS.

## Readiness Decision

`human-review-ready`. Research, native association-list semantics, shared
renderer, parent-owned placement, canonical Button composition, Shopify mapping,
cross-target evidence and component-scoped gates are complete. The contract
remains `pilot`; human visual approval is still pending and no `stable`
promotion was made.
