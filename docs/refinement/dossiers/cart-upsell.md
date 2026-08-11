# Component Dossier: Cart Upsell

Status: `human-review-ready`

Target reviewed: Neutral Web, cart composition, and Shopify translation boundary

Contract: `components/contracts/cart-upsell.contract.json`

## Recommendation

Define Cart Upsell as a named recommendation region containing one native list
of target-authored product summaries. K6 owns the compact container, list and
item layout. The target owns recommendation source, ranking, truthfulness,
availability, product destinations, variant selection, price formatting, cart
mutation, pending/error/success state, status announcements, analytics and
refresh policy.

Keep the required public API to a non-empty `title` and a non-empty semantic
`items` slot. Remove global `addLabel` and `addDisabled`: those values cannot
describe a heterogeneous list and can produce one unavailable state for every
recommendation. Each target-authored item may instead compose canonical Link
for a truthful destination, contextual canonical Button when one-click addition
is truthful, and canonical Price when price content is shown. Navigation-only
recommendations remain valid when a product requires variant selection or the
target does not support direct add.

Use `section[aria-labelledby]`, a visible heading, `ul`, and `li`. Do not add a
custom widget role, selection model, roving focus, carousel, automatic rotation,
live region or neutral runtime. Omit the complete region when the title is blank
or the item slot is empty. A target result-status surface sits outside K6 and
announces only confirmed cart outcomes without moving focus.

## Purpose And Limits

- Presents a small, clearly identified set of related, complementary or
  manually curated product recommendations near a cart context.
- Supports compact product identity, optional media, optional truthful
  destination, optional target-formatted Price and optional target-supported
  Button action per item.
- Allows different item capabilities in the same list. One item may support a
  direct add while another requires navigation and variant selection.
- Preserves recommendation tracking parameters in target-supplied destinations;
  K6 does not reconstruct product URLs.
- Is not a recommendation engine, ranking model, personalization service,
  “frequently bought together” proof, bundle, automatic discount, cart store,
  product record, price formatter, variant picker, inventory authority, form,
  status region, analytics system or network client.
- Does not promise relevance, availability, addability, savings or compatibility.
  Visible copy and available controls must reflect authoritative target truth.
- Does not own placement relative to checkout, cart lines, totals or drawers.
  The parent cart surface controls order and avoids obstructing the primary path.

## Baseline Before Refinement

- Registry `K6`, Cart, dependency depth `1`, review order `100`, depends only on
  Button. Contract `0.1.0`, `pilot`, exposes four properties, nine anatomy parts,
  one state and two behavior entries.
- `title` and `items` correctly establish a high-level composition boundary, but
  global `addLabel` and `addDisabled` incorrectly apply one action contract to
  every item. The contract requires an action even when a target cannot safely
  add a product without variant selection.
- Although `items` is a slot, the contract duplicates price anatomy with
  `.cart-upsell__item-price` and does not declare canonical Price as a dependency.
  The fixture renders a raw currency string rather than Price's target-formatted,
  labelled and bidirectionally isolated markup.
- Studio and MDX duplicate the recommendation row. Studio uses an unnamed
  `section`, a generic `div` collection, an `article` item, one global disabled
  flag, local optimistic “Added” state and an English live status inside K6.
  The renderer does not have a reusable Cart Upsell artwork boundary.
- The current action has a contextual accessible name only in MDX. Studio's
  visible “Add” is also its accessible name, so repeated recommendations would
  expose indistinguishable controls. Neither contract nor renderer models
  per-item busy state or target-confirmed result/error ownership.
- CSS owns external `margin-top`, physical width/height/margin properties, raw
  `12/16/48px` values, calculated typography, hardcoded weights, a generic flex
  collection and no narrow-container reflow. It does not reset list semantics,
  preserve long strings, style title links, expose forced-colors borders or
  constrain the actual component by its container.
- Existing Mobile/Desktop images show a useful low-emphasis bordered card,
  compact 48px media, a concise identity/price stack and one supporting action.
  The composition fits the two recorded viewports and Exhibit/Studio appear
  visually aligned. Tablet, XL, multiple items, navigation-only, unavailable,
  busy/error, long/localized/unbroken content, no-media/no-price, 200px
  container, RTL, dark, forced colors, reduced motion and 200% zoom evidence are
  absent.
- Studio references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
  inspector `1020:480`. Existing repository evidence identifies these as generic
  Button/Studio nodes, not K6-specific owner visual approval.
- Deterministic level-9 baseline is K6 CSS slice `943 B` raw / `391 B` gzip,
  complete Cart CSS `15,340 B` raw / `3,005 B` gzip, complete Web component CSS
  `506,019 B` raw / `67,838 B` gzip, and shared runtime `53,811 B` raw /
  `10,501 B` gzip. K6 adds no neutral runtime or asset. Cart has `67 B` remaining
  under its `3,072 B` family ceiling, so any semantic and responsive repair must
  be funded by simplifying the existing slice.

## Current Gallery Result

- Contract `0.2.0` remains `pilot`, exposes only required `title` and `items`,
  removes collection-wide `addLabel`/`addDisabled`, and adds canonical Link and
  Price beside Button. Registry, docs, Studio and both generated adapters agree.
- `CartUpsellArtwork` is the one Exhibit/Studio implementation. A non-empty
  heading names a native `section`; recommendations render as `ul > li`; title,
  Price and action consume canonical Link, Price and Button classes.
- The docs fixture renders decorative adjacent media, one truthful product
  destination, labelled Price and contextual add request. Confirmed feedback is
  a sibling target status, not K6 content. Activation leaves focus on the Button
  and does not disable or relabel it optimistically.
- Blank title omits the complete root. The required Studio item slot is present,
  checked and non-removable; targets omit K6 rather than rendering it with zero
  valid items. Optional media, Price and action collapse cleanly in a
  navigation-only 200px stress composition.
- Physical values, calculated type, external margin and raw price markup are
  gone. Logical properties, semantic tokens and intrinsic flex wrapping respond
  to actual available inline size without viewport breakpoints or component JS.
- Exhibit and Studio emit one byte-identical `958`-character subtree. The root
  has no widget/live/tabindex semantics; one heading relationship, native list,
  decorative image, canonical Link/Price/Button and contextual accessible name
  are present.
- Final evidence comprises sixteen images: both modes at Mobile, Tablet,
  Desktop and XL plus localized RTL 200px, navigation-only 200px, three items,
  dark, reduced motion, forced colors, effective 200% zoom and focus-visible.
  No tested composition overflows and the final console has zero errors/warnings.
- Final deterministic size is K6 `1,717 B` raw / `524 B` gzip, Cart `16,114 B`
  raw / `3,072 B` gzip, Web component CSS `506,793 B` raw / `67,914 B` gzip,
  and shared runtime `53,811 B` raw / `10,501 B` gzip. K6 adds `133 B` gzip,
  Cart adds `67 B` and reaches—but does not exceed—its family ceiling; neutral
  runtime delta remains `0 B`.
- Shopify stays explicitly `planned`. No Liquid implementation was invented:
  recommendation source/context, cart placement, item limit, variant/add policy,
  merchant settings, tracking, refresh/status and editor/live-store proof remain
  owner/target decisions.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI APG Landmark Regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) | A `section` becomes a region when it has an accessible name; a visible heading can supply that name through `aria-labelledby`. Excess landmarks reduce usefulness. | Use one named section only when the non-empty recommendation collection renders; do not create an empty or unnamed landmark. |
| [WAI APG accessible names](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Repeated action controls need distinguishing accessible names, with the verb and unique object context presented clearly. | Each optional item action needs a name such as “Add Celadon incense holder”, not one global “Add” API. |
| [HTML `ul`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ul-element) | `ul` represents an unordered list of items and uses `li` children. | Recommendations are one native list; no generic collection container or custom list role is necessary. |
| [HTML `section`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | `section` represents a thematic grouping, typically identified by a heading. | The visible recommendation title and its items form one thematic cart subsection. |
| [Open UI List research](https://open-ui.org/components/list.research/) | List items can be compound surfaces containing images and multiple text sections. | K6 can keep a compact compound item without turning it into a custom selectable widget. |
| [Open UI Button research](https://open-ui.org/components/button/) | Mature systems converge on Button as the ordinary activation primitive; Open UI has no commerce upsell control. | Compose canonical Button for supported add requests rather than inventing K6 activation semantics. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Radix composes primitive behavior into consumer elements while preserving the consumer's semantic responsibility. Radix has no upsell primitive. | K6 composes existing Gallery primitives and leaves target links/actions/data outside a universal headless commerce API. |
| [Polaris Resource List](https://polaris-react.shopify.com/components/lists/resource-list) | A resource list receives items and a per-item renderer, supports custom content and actions, and leaves sorting/filtering/network behavior to the consumer. | One semantic items slot is more durable than mirroring a product object or exposing list-wide action state. Polaris React is historical/deprecated evidence, not a target dependency. |
| [Shopify Product Recommendations API](https://shopify.dev/docs/api/ajax/reference/product-recommendations) | Shopify can return JSON or section HTML for related/complementary products; results and tracking URLs are target-generated and the valid limit is target-specific. | Shopify chooses source, intent, limit, tracking URL and render lifecycle. K6 only receives semantic item composition. |
| [Shopify Liquid `recommendations`](https://shopify.dev/docs/api/liquid/objects/recommendations) | The recommendations object yields products only in a section rendered through the recommendation/section APIs. | A Shopify adapter needs target-native section/request ownership; a neutral static snippet cannot pretend the object exists in every cart context. |
| [Shopify product template](https://shopify.dev/docs/storefronts/themes/architecture/templates/product/overview) | Product purchase requires a product form and variant selection; recommendations are optional and use the Ajax recommendations API. | Do not infer that every recommended product can be added with one generic button or first-variant choice. |

WAI-ARIA APG, Open UI and Radix define no Cart Upsell widget pattern. Standards
and mature systems converge on ordinary named regions, lists, links, buttons and
target-owned data/action behavior. Shopify provides a recommendation source but
does not make its API or product object a cross-target component contract.

## Matches, Differences, And Direction

- ADR 0077 already keeps recommendation data in `items` and gives the target
  ownership of add behavior. Refinement preserves that boundary while moving
  action label/state inside each target-authored item, where heterogeneous
  capability can be represented coherently.
- The baseline visual hierarchy—quiet bordered surface, concise heading, compact
  media/info/action row—is retained. Native structure, logical layout and
  canonical dependency markup change underneath it.
- Polaris' per-item rendering reinforces `items` as the stable API but its admin
  navigation/selection features do not belong to this storefront composition.
- Radix's `asChild` is framework-specific evidence for composition, not an API
  to copy into the neutral contract. Gallery slots express the same ownership
  boundary without depending on React.
- “Frequently bought together” is allowed only when supplied as truthful
  target copy backed by the recommendation source. K6 does not expose a claim
  variant or automatically add multiple products.
- Direct add is optional. A target may link to product details, compose its own
  variant selection, or omit the action; K6 does not silently choose the first
  variant or disable every row through one collection-wide boolean.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when items exist | `section.cart-upsell[aria-labelledby]` | Cart Upsell/target | Named thematic region; omitted with blank title or no items. |
| Title | yes | heading with unique `id` | target/K6 | Non-empty localized name; heading rank follows page context. |
| Items | yes | `ul.cart-upsell__items` | Cart Upsell | Non-empty native unordered list; no selection/widget semantics. |
| Item | per recommendation | `li.cart-upsell__item` | Cart Upsell/target | Stable target item identity; not `article` by default. |
| Media | optional | `img.cart-upsell__item-image` | target | Decorative when adjacent identity repeats it; informative only when it adds meaning. |
| Information | yes | generic wrapper | Cart Upsell | Bounds identity and optional Price without adding a named group. |
| Item title | yes | text or one native link | target | Non-empty identity; truthful target URL may preserve recommendation tracking. |
| Price | optional | canonical Price | Price/target | Complete target-formatted text; no raw amount/currency logic in K6. |
| Action | optional | canonical Button | Button/target | Only for a truthful supported request; contextual accessible name and per-item unavailable/busy state. |
| Result status | target composition | external status/error surface | parent/target | Confirmed result/error and cart count/totals; not owned by K6. |

No badge, vendor, rating, quantity, compare checkbox, bundle total, savings,
carousel controls, pagination, dismiss action, timer or status region belongs to
the required anatomy. Richer product summaries should use or compose a Product
Card outside this deliberately compact cart-row profile.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral recommendation-region composition. Related/complementary/manual are data/copy intent, not visual variants. |
| Size | One intrinsic compact layout with container-responsive item reflow. Parent owns available inline size and placement. |
| Collection | One or multiple items; entire K6 omitted for zero valid items. No empty-state UI inside the recommendation region. |
| Item content | Required identity; optional media, destination, Price and Button. Items may expose different capabilities. |
| Navigation | Linked identity when destination is truthful; plain identity otherwise. Preserve target tracking URL. |
| Action | Omitted, idle, unavailable or target-pending per item; confirmed success/error belongs to target state/status. |
| Price | Omitted, default, on-sale, range or unit expression through canonical Price and target-formatted strings. |
| Content stress | Short, long localized, unbroken identifier, mixed direction, long currency/range/unit text and contextual action names. |
| Environment | Light/dark, forced colors, reduced motion, 200% zoom, RTL/mixed currency, 200px through wide containers and Mobile/Tablet/Desktop/XL viewports. |

Invalid or incoherent states include a blank region title, empty rendered list,
generic `div` collection, `article` used only for styling, blank item identity,
raw unisolated price text, repeated “Add” accessible names, first-variant
assumptions, a global disabled flag applied to heterogeneous rows, local success
before target confirmation, stale price/availability, or K6 announcing every
cart refresh itself.

## Public API And State Ownership

Recommended semantic API:

- `title` — required non-empty localized recommendation-region title.
- `items` — required non-empty semantic slot containing target-authored native
  list items that compose Price, Button, links and media as applicable.

Remove `addLabel` and `addDisabled`. They are pilot API and express per-item
capability at the wrong collection scope; no compatibility alias is warranted.
Per-item data, labels, accessible names, availability and pending state remain
inside the target-authored slot and canonical dependency contracts.

K6 is a controlled projection of target truth but owns no independent state. It
emits no neutral event. Static Web can submit target forms or use page links;
Shopify can use Liquid plus Ajax/section rendering; React/Angular can bind stores
and callbacks; native targets bind their own commerce services. K6 adds no
uncontrolled recommendation list, selection, optimistic add, cache, request,
retry, hydration, formatter, live region, focus relocation or analytics.

Do not expose recommendation intent/source/ranking, product IDs/objects, limit,
variant strategy, raw amount/currency/locale, URL construction, inventory,
tracking parameters, add result, cart count/totals, status copy, retry, carousel,
layout columns, media size, gap, breakpoint or external margin as neutral API.

## Token And Value Audit

- K6 should own only its primary surface, subtle border, primary/secondary text,
  focus/accent treatment for an optional title link, medium/small radii, compact
  element rhythm, Body Small item type and a heading role appropriate to the
  retained visual hierarchy.
- Canonical Price owns value isolation, current/compare/unit semantics and price
  typography. Canonical Button owns variants, sizes, focus, disabled and busy
  behavior. K6 must not copy those states or public tokens into new markup.
- Use private item media size, internal gap and narrow-container threshold.
  These are compositional values and fail the public configurability test.
- Remove external margin, physical properties, raw pixel spacing/dimensions,
  calculated font sizes and hardcoded weights. Use logical properties and
  existing semantic type/spacing/weight tokens.
- Cart CSS must remain at or below `3,072 B` gzip. K6 keeps `0 B` neutral runtime
  and no component asset/request budget.

## Visual And Content Audit

- Preserve the baseline's restrained bordered card, compact media, clear title,
  concise two-line identity/price stack and low-emphasis supporting action.
- The parent controls external spacing. K6 uses no `margin-block-start` because
  the same component can appear in a drawer, page, summary or other target flow.
- One item should remain visually balanced at baseline widths; multiple items
  need consistent rhythm without turning the region into a dense admin table.
- Long identity and Price content wrap without clipping or forcing the Button
  outside the container. At narrow container widths, the action receives a full
  row rather than reducing identity to an unusable sliver.
- Missing media and missing Price must collapse cleanly. Navigation-only items
  must not look disabled merely because no add action renders.
- Human review must approve border/surface contrast, heading hierarchy, media
  scale, canonical Price prominence, compact Button treatment, row density,
  narrow reflow and the absence of promotional decoration.

## Accessibility And Interaction

- The root is a named `section` only when valid content exists. Its visible
  heading supplies the accessible name through a unique `aria-labelledby` ID.
- Items use native list semantics. No `role=list`, `role=group`, `listbox`,
  selection state or custom arrow-key model is added.
- A title destination is a native link. An add request is a native canonical
  Button. Tab order follows DOM order; K6 adds no roving focus or focus trap.
- Each repeated action has a contextual accessible name including product
  identity. Visible concise labels may remain, but generic accessible names are
  invalid when multiple actions exist.
- Per-item unavailable and pending states use canonical Button semantics.
  Targets do not unmount or relabel controls optimistically before their chosen
  confirmation/error policy resolves.
- Media alternative text follows content meaning. Adjacent redundant product
  media uses `alt=""`; unique informational media receives concise target text.
- K6 is not a live region. The target announces confirmed cart changes/errors in
  one deliberate external status surface and updates totals/count without
  unexpected focus movement.
- K6 owns no motion. Reduced motion is therefore not a special state; any target
  loading or transition behavior must respect its owning component/policy.
- Forced colors must retain the K6 boundary and native link/Button affordances;
  color is not the only indicator of availability or action result.

## Responsive And Performance

- Items use intrinsic flex wrapping from their actual available inline size,
  not viewport breakpoints, so the same markup works in cart page, drawer and
  embedded summary widths without publishing a layout mode.
- Root/list/item/info/title/Price all retain `min-inline-size: 0`; identity and
  target-formatted values use safe wrapping. Media keeps a stable private square.
- At narrow widths, media/identity share the first row and an optional action
  reflows below. Without media, information uses the full first row. Omitting
  Price or action produces no reserved blank column.
- Zero neutral JavaScript, listeners, observers, requests, timers and assets.
  Target-owned commerce behavior is excluded from the component budget.
- K6 CSS is `524 B` gzip, a `133 B` increase that funds native list resets,
  logical wrapping, safe content sizing, semantic type and canonical composition.
  Cart reaches the permanent `3,072 B` family ceiling without exceeding it;
  Web CSS/runtime program overages remain explicit existing exceptions.

## Cross-Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Implemented as semantic HTML plus canonical Link/Price/Button CSS; consumers provide IDs, items and target behavior. |
| Shopify | Planned target-native section/snippet/controller composition. Product Recommendations API can supply related/complementary results only in its valid context; merchant/manual cart upsells need a separate data source. Preserve returned tracking URLs and never infer an addable variant. |
| React / Angular | Controlled title and item render/composition. Parent store owns data, callbacks, pending/results, status and focus. No Gallery cart store. |
| SwiftUI / Compose | Native labelled section/list with target product summary, navigation and optional action; target commerce service owns async state. |
| Figma | Planned visual component with region title plus repeatable item slot and optional media/Price/Button parts. Current registered nodes are not K6 approval. |

Do not create a Shopify implementation in this batch unless the target's cart
recommendation source, placement and variant/add policy are already accepted.
Shopify's official product recommendation object is section-request scoped and
primarily documented for product context; choosing manual cart upsells versus a
recommendation request is a commercial/architecture decision, not a neutral K6
default.

## Verification Result

- Structural pass: contract schema, registry dependency graph, Studio metadata,
  canonical docs, Web adapter build/validation, Shopify adapter validation,
  component audit and refinement-program regeneration.
- Static DOM pass: one named section, one heading relationship, `ul > li`, one
  canonical Price, one canonical Button, contextual action name, no root live/
  widget/tabindex, blank-title omission and required non-empty item composition.
- Interaction pass: Link then Button keyboard order, focus retained on Button,
  contextual action name and target-confirmed status outside K6.
- Content pass: one/three items, no media, no Price, navigation-only, direct add,
  long content, localized RTL, long currency and blank-title invalid composition.
- Visual pass: exact Exhibit/Studio parity at Mobile, Tablet, Desktop and XL plus
  200px, dark, forced colors, reduced motion, effective 200% zoom and focus.
- Performance pass: deterministic K6/Cart/Web CSS and shared runtime measured;
  no neutral JS or asset delta, Cart at but not over ceiling.
- Lifecycle pass: bounded headless `gallery-refinement`, one tab, cleanup and
  clean resource assertion; `site/dist` remained untouched.

## Open Questions And Human Review

No unresolved decision blocks neutral implementation. Human review is still
required for surface contrast, title/Price hierarchy, media scale, action
emphasis, compact density and narrow reflow. The owner must separately decide
Shopify cart recommendation source, placement, maximum item count, variant/add
policy and any merchant editor settings before a target-native Shopify K6 can
move beyond `planned`.

K6 remains `pilot` regardless of automated results. This dossier is
`human-review-ready`; only explicit human review can promote the contract to
`stable`.
