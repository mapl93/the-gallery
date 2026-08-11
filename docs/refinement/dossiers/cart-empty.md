# Component Dossier: Cart Empty

Status: `human-review-ready`

ADR 0236 update (2026-07-20): the inherited heading boundary is resolved.
Cart Empty receives a contextual native heading from its host; rank is not a K7
property. Shopify main cart now supplies H1 through canonical Empty State.
Historical open/fixed-H3 wording below is superseded; live cart transition and
human visual review remain pending.

Date: 2026-07-17

Registry: `K7` / `cart-empty`

Dependency order: 101, phase 6 (Composed components), refined depth 1

Target reviewed: Neutral Web cart profile and Shopify cart-empty translation

Contract: `components/contracts/cart-empty.contract.json`

## Recommendation

Define Cart Empty as the commerce-context profile of canonical Empty State. The
Web root layers `.cart-empty` on `.empty-state`; icon, title and message use the
canonical Empty State parts; and the optional recovery destination composes one
native Link with canonical Button presentation. K7 must not retain a second
cart-specific empty-state DOM, visual token set, focus model, announcement
surface or runtime.

Keep the existing semantic properties because they are understandable and
stable across targets: optional decorative `icon`, required non-empty `title`,
optional `message`, and the optional coherent navigation pair `actionLabel` plus
`href`. Render the action only when both strings are non-empty. The pair maps
into Empty State's one canonical action slot; it does not make Empty State own a
destination or event policy.

Use an ordinary grouping root and a contextual native heading selected by the
target. Under ADR 0236 the docs fixture uses H2 and Shopify main cart uses H1;
K7 consumes the heading element its cart-page or drawer target supplies without
adding a heading property. Static Cart Empty is not a live region.
When removal of the final line changes an already open cart, the parent cart
coordinator owns one pre-existing localized Status message, focus recovery and
replacement of stale line, summary and checkout content.

Shopify already has authoritative `cart.empty?` / `cart.item_count`, localized
cart strings, the canonical `empty-state` snippet and the locale-safe
`routes.all_products_collection_url`. A dedicated `cart-empty` translation
snippet can therefore expose the K7 target artifact while delegating all markup
to canonical Empty State. The inherited snippet H3 remains the known A13
heading-rank gap; K7 must not solve it by assumption.

## Purpose And Limits

- Replaces the cart line, totals and checkout composition after the target has
  authoritatively resolved that the cart contains no line items.
- Explains the cart-specific absence with a required visible title and optional
  concise next-step message.
- May expose one truthful navigation destination back to shopping through a
  native Link with canonical Button presentation.
- May include one decorative icon that reinforces but never supplies the
  meaning of the visible title.
- Is not the cart state store, removal command, cart counter, drawer, page,
  loading/error view, recommendation surface, checkout policy, notification,
  status live region, focus manager, route transition or analytics owner.
- Does not infer that the cart is empty from missing fixture content. The target
  supplies the resolved state from its authoritative cart model.
- Does not keep line items, totals, discount fields, checkout controls or stale
  focusable descendants visible beside the empty replacement.

## Baseline Audit

- Registry K7 depends on `empty-state` and `button`, but its contract `0.1.0`,
  CSS, Studio renderer and MDX fallback duplicate a complete parallel
  `.cart-empty__icon`, title, message and action implementation.
- The 596-byte / 321-byte-gzip K7 CSS slice repeats A13's layout, icon, title,
  message and spacing decisions. It also contains raw `16px`, `64px` and `8px`,
  physical width/height/max-width/margin properties, inherited line height and
  weight, and no container-specific resilience.
- Cart CSS is already exactly at its provisional 3,072-byte gzip ceiling.
  Removing duplicated K7 presentation is required before later Cart work can
  consume any family budget.
- The contract says the action is optional but models `actionLabel` and `href`
  independently without defining the valid pair. Studio renders label-only with
  an invented `#collection` fallback, creating a destination the consumer did
  not supply.
- Studio renders a `section` that is neither labelled nor needed as a landmark.
  Static content receives no live role, which is correct, but the contract does
  not document dynamic Status ownership or replacement of stale cart content.
- The icon is hidden from assistive technology, and the native anchor is
  keyboard reachable. The title can be cleared into an empty heading despite
  being required.
- Exhibit and Studio currently share the large `CartStudio` switch, but K7 has
  no reusable renderer and does not consume the renderer used by canonical
  Empty State. Visual parity therefore proves duplicated output, not canonical
  implementation parity.
- Existing Mobile and Desktop evidence shows a quiet centered hierarchy with a
  64px package icon, prominent heading, concise message and one primary-looking
  recovery Link. No owner-specific image is stored or attached; generic Figma
  node IDs are traceability metadata, not inspectable K7 approval.
- Shopify `main-cart.liquid` already branches on `cart.item_count`, renders the
  canonical Empty State snippet, and has localized `cart.empty`,
  `cart.empty_message` and `cart.continue_shopping` strings. It currently uses
  hardcoded English copy and `/collections/all`, and does not emit the K7
  `.cart-empty` profile hook.
- Baseline deterministic level-9 gzip: K7 slice `321 B`, Cart CSS `3,072 B`,
  complete Neutral Web component CSS `67,914 B`, shared runtime `10,501 B`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interaction patterns for widgets and landmarks but no Empty State or Cart Empty widget. | K7 is ordinary semantic content, not a custom role or keyboard model. |
| [WCAG status-message understanding](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | A cart update can qualify as a status message when content changes without taking focus; the complete contextual text should be exposed. | The parent cart target owns a pre-existing localized Status output for a qualifying final-removal transition. Static K7 does not become `role=status`. |
| [WAI failure F103](https://www.w3.org/WAI/WCAG22/Techniques/failures/F103.html) | Dynamically inserted outcome/state text that does not take focus must be programmatically determinable when it meets the status-message definition. | Target evidence must cover the transition, not only the final static K7 DOM. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | The cross-system inventory contains controls such as dialog, listbox, progress and tabs but no standardized Empty State control. | There is no platform anatomy or behavior proposal to override the canonical passive composition. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | Radix focuses on unstyled behavioral primitives for common ARIA patterns and exposes no Empty State primitive. | K7 does not need a headless runtime primitive; native content plus canonical Link is sufficient. |
| [Polaris React Empty State](https://polaris-react.shopify.com/components/layout-and-structure/empty-state) | Polaris uses heading/content, decorative imagery, primary/secondary actions and page-level guidance; it recommends one clear primary action. | The anatomy is comparable, but K7 deliberately keeps one recovery action and no full-width/image API. Polaris's admin scope is comparative evidence, not Gallery source. |
| [Shopify POS EmptyState](https://shopify.dev/docs/api/pos-ui-extensions/2026-01/web-components/layout-and-structure/emptystate) | Current target API separates heading/subheading properties from graphic, primary-action and secondary-actions slots, with Button or Link actions. | Confirms cross-target stability of content plus composed action. Gallery keeps one action and its existing decorative icon slot. |
| [Shopify Liquid cart object](https://shopify.dev/docs/api/liquid/objects/cart) | `cart.empty?` is authoritative when no items exist and `item_count` exposes the cart count. | Shopify decides when K7 renders; neutral source never derives cart truth. |
| [Shopify Liquid routes object](https://shopify.dev/docs/api/liquid/objects/routes) | `routes.all_products_collection_url` avoids hardcoded routes and supports locale-aware URL policy. | The default Shopify recovery destination should use the route object rather than `/collections/all`. |
| [Shopify translate filter](https://shopify.dev/docs/api/liquid/filters/translate) | `t` resolves storefront strings from locale files. | Existing cart locale keys should supply K7 copy instead of hardcoded English. |

Open UI, WAI-ARIA APG and Radix provide no Cart Empty-specific pattern. This is
agreement by absence of a widget contract, not permission to invent a role.

## Candidate Anatomy And Composition

| Part | Required | Semantic element / class | Owner |
| --- | --- | --- | --- |
| Root profile | yes | ordinary `div.empty-state.cart-empty`; no role, focus or live semantics | Cart Empty context + Empty State presentation |
| Icon | no | canonical `.empty-state__icon[aria-hidden=true]` | Empty State slot / target visual |
| Title | yes | contextual native heading with `.empty-state__title` and non-empty text | target heading structure + K7 content |
| Message | no | canonical paragraph `.empty-state__message` | K7 content through Empty State |
| Recovery action | no | one native `a.btn[href]` in Empty State's action slot | target destination + canonical Link/Button presentation |
| Cart status | outside | pre-existing target `role=status` output when the transition qualifies | cart coordinator |
| Replaced content | outside | prior line, summary, discount and checkout composition removed or hidden as one state transition | cart coordinator |

The `.cart-empty` hook adds domain identity only. It owns no child classes,
visual declarations or interaction behavior.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One canonical centered Empty State profile; no K7 visual variant. |
| Size | No public K7 size; inherited Empty State responds to its container and token modes. |
| Resolved state | Target-controlled `empty`; K7 has no loading, error or non-empty state. |
| Content | Required non-empty title; icon and message independently optional; action label and href present together or both omitted. |
| Action | Native navigation only in v1; no command callback, disabled or loading state owned by K7. |
| Theme | Inherited semantic Empty State and Button colors in light/dark modes. |
| Direction/localization | Logical inherited layout, safe wrapping, translated copy and target-supplied URL. |
| Forced colors/reduced motion | Inherited canonical content/focus visibility; K7 adds no motion. |
| Dynamic transition | Parent removes stale cart UI, preserves or deliberately relocates focus, and announces a concise status when required. |

Invalid combinations are blank title, label without destination, destination
without label, a meaningful icon hidden as decorative, multiple recovery
actions, stale checkout controls beside K7, or a static root made into a live
region.

## Public API And Ownership

- `icon` — optional decorative slot. It is hidden because the visible title
  carries the state meaning.
- `title` — required non-empty visible cart-empty heading content. Heading rank
  remains target-context ownership.
- `message` — optional concise target-authored recovery guidance.
- `actionLabel` — optional non-empty recovery Link label; renders only with
  non-empty `href`.
- `href` — optional target-owned recovery destination; renders only with
  non-empty `actionLabel`.

There is no variant, size, cart count, cart record, controlled/uncontrolled
state, event, status text, focus target, live-region mode, recommendation,
heading-level property or internal default destination. Targets own cart truth,
copy localization, URL policy, transition coordination, announcements, focus,
history, analytics and replacement content.

## Token And Value Audit

- K7 should expose no visual token of its own. All current color, spacing and
  typography references are inherited through canonical Empty State and Button.
- Delete the duplicated K7 hardcoded `16px`, `64px`, `8px`, physical sizing and
  inherited incomplete type declarations instead of translating them into new
  component tokens.
- Keep Empty State's icon size, centered alignment, measures and inline-padding
  cap private to that canonical component.
- Keep Button's surface, focus, padding, typography, border and motion policy
  inside Button. The K7 action adds no margin or private action style.
- Do not expose icon scale, alignment, line measure, block padding, gap, Button
  variant or action placement in Studio.

## Content, Responsive, And Extreme Cases

- Test full composition, title only, title/message, icon/title and title/action.
- Test label-only and href-only invalid pairs; neither may leave a dead or
  invented action.
- Test blank required title; the entire invalid profile should be omitted rather
  than leaving an empty heading.
- Test short, long, unbroken, localized RTL and mixed-direction copy in a 200px
  container and Mobile/Tablet/Desktop/XL.
- Test a long action label and locale-aware URL without horizontal overflow.
- Test light/dark, forced colors, reduced motion, keyboard focus, Enter
  activation and effective 200 percent zoom.
- Test that optional parts leave no empty wrappers and that the final-removal
  integration removes stale lines/totals/actions. The docs fixture can prove
  static structure; live target integration remains a target certification.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | `.empty-state.cart-empty`, canonical parts and one native `a.btn[href]`. | Implemented and browser-evidenced with zero K7 runtime. |
| Shopify | `cart.empty?` selects the branch; a dedicated translation snippet maps existing localized strings and the route object into canonical Empty State with `.cart-empty`. | Implemented and adapter-ready. Fixed inherited H3 remains an A13 gap; live Ajax/drawer transition evidence remains target work. |
| Webflow / Framer | Apply the profile and canonical classes to copied markup; destination remains target content. | Generated Cart CSS copy is byte-identical to canonical source. |
| React / Angular | Controlled cart store selects the profile and composes canonical Empty State/Link; one parent effect owns status/focus. | Contract-ready; no local state wrapper. |
| Figma | Instance/profile of Empty State with optional icon/message/action presence and cart-specific sample copy. | Planned. Generic trace IDs are not visual approval. |
| SwiftUI / Compose | Native content-unavailable composition with optional navigation action and target cart-state coordinator. | Conceptual; native accessibility announcements/focus remain target-owned. |

## Performance Budget

- K7 neutral runtime budget: `0 B`; no script is justified.
- K7 CSS direction: remove the 321-byte-gzip duplicate slice and retain only a
  domain hook already represented in the Cart source.
- Cart family ceiling: `3,072 B` gzip. This batch should recover material
  headroom rather than consume it.
- Complete Web CSS/runtime existing program gaps must not increase.
- Shopify adds no K7-specific script; Liquid reuses the existing Empty State
  snippet and cart target facts.

## Risks And Open Questions

- Blocking neutral technical decisions: none.
- ADR 0236 resolves host-owned contextual heading rank; K7 does not add a
  competing `headingLevel` API.
- Human review must approve icon choice/tone/scale, centered hierarchy, spacing,
  message measure, primary Button emphasis and narrow/localized balance.
- Product/target owners still choose final recovery copy and destination,
  whether recommendations appear near the empty state, and exact focus/status
  behavior after an Ajax final-line removal.
- Shopify live drawer/Ajax replacement and editor-preview behavior require
  target integration evidence beyond the static main-cart Liquid branch.
- Generic Figma node IDs cannot certify K7 artwork; inspectable owner reference
  remains absent.

## Implemented Result

- ADR 0179 and contract `0.2.0` define K7 as a canonical Empty State profile
  with no public visual tokens and zero neutral runtime.
- The obsolete K7 icon/title/message/action child classes and 521 raw CSS bytes
  are removed. The 75-byte source slice retains only the `.cart-empty`
  containment hook; all visible presentation comes from Empty State and Button.
- `EmptyStateArtwork` is now the one docs-target canonical renderer consumed by
  both A13 and `CartEmptyArtwork`. Exhibit and Studio consume the same K7
  renderer and fixture.
- Blank required title omits the complete root. Label-only and href-only inputs
  omit the complete action and never create an empty or synthetic Link.
- Studio exposes the five semantic content properties and no inherited/private
  presentation controls. MDX uses canonical classes and documents transition
  ownership, coherent action pairing and cross-target mapping.
- Shopify adds a dedicated LiquidDoc `cart-empty` translation snippet that
  delegates markup to `empty-state`. Main cart selects it with `cart.empty?`,
  existing locale strings and `routes.all_products_collection_url`.
- Neutral Web, Webflow and Shopify adapters are regenerated; Shopify reports K7
  implemented/ready and raises the target-ready inventory to 78.

## Verification Result

- Exhibit and Studio serialize identical 1,009-character K7 subtrees in all
  four viewport checks. The root is `DIV.empty-state.cart-empty`, with no role,
  `aria-live` or `tabindex`, one H2, one hidden decorative icon, one native Link,
  and zero obsolete `.cart-empty__*` parts.
- Mobile root is `326/326px`, Tablet `520/520px`, Desktop Exhibit `516/516px`
  and Studio `520/520px`, and XL `520/520px`; each document has equal client and
  scroll width.
- A real 200px parent container yields root `200/200px`, 40px canonical inline
  padding, and RTL/unbroken title, message and action widths equal to their
  scroll widths. The extreme wrapping is contained and remains a human visual
  review item.
- Title-only produces one child H2, no icon/message/action and zero focusables.
  Blank title produces zero root and zero empty headings. Both one-sided action
  combinations produce zero action Links.
- Keyboard focus shows a solid 2px outline with 2px offset. Enter keeps the
  docs fixture URL and focus stable, proving native Link activation reaches the
  target handler without K7 state.
- Light contrast is 17.93:1 title, 7.81:1 message and 10.37:1 Button. Dark is
  17.18:1, 12.09:1 and 16.96:1. Forced colors exposes system foreground/Link
  colors plus a 2px outline; reduced motion yields no animation and 0s Button
  transition.
- Effective 200 percent layout at an 800 CSS-pixel viewport is `800/800px`
  document width with root and every part locally contained.
- Sixteen final images live under `output/playwright/refinement-batch-88/`;
  four earlier before images remain under `output/playwright/parity/cart/`.
- K7 falls from `596 B / 321 B gzip` to `75 B / 89 B gzip`. Cart falls from
  `16,114 B / 3,072 B gzip` to `15,593 B / 3,007 B gzip`, recovering 65 B below
  its ceiling. Web CSS falls from `67,914 B` to `67,861 B` gzip; runtime stays
  `10,501 B` gzip.
- Canonical, Webflow and Shopify Cart CSS are byte-identical with SHA-256
  `ec6fe1f7732aa4c939a3a669f06ec8fa0669652ccbec901cce06a47a69a43f6a`.
- Contract, Studio, docs, TypeScript, static preview, token compatibility,
  Web/Shopify adapter, Liquid skill, generated-copy, diff and resource gates
  pass. `site/dist` remains untouched.

## Readiness Decision

`human-review-ready`: research, canonical composition, API coherence, Web and
Shopify translation, shared renderer, four viewports, special modes,
performance and automated gates are complete. K7 remains `pilot`; only explicit
human review can approve the visual treatment and promote stability. The
inherited A13 heading decision and live Ajax/drawer transition proof remain
explicit target/architecture work rather than K7 implementation blockers.
