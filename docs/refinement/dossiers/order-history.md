# Component Dossier: Order History

Status: `human-review-ready`

Target under review: Neutral Web passive order-history list and documented
canonical-or-native target handoff

Contract: `components/contracts/order-history.contract.json`

## Recommendation

Define U4 as a passive optionally named container for one required non-empty
native list of target-owned order summaries. Each summary contains one
descriptive canonical Link, one semantic `time`, one canonical Badge carrying a
readable target-provided status label, and one already-formatted total. Keep
querying, authentication, authorization, sorting, filtering, pagination,
loading, empty/error/expired-session behavior, routes, navigation, date/currency
formatting, status derivation, analytics, and announcements in the target.

Preserve the two accepted semantic properties from ADR 0078: optional `label`
and required `orders`. Order identifiers, URLs, dates, status values, Badge
variants, totals, item count, and order are repeated target data inside the
composition slot, not new root properties. U4 has no controlled/uncontrolled
state and adds no neutral runtime.

When `label` is non-empty, render a native `section.order-list[aria-label]`.
When the label is blank, render an ordinary `div.order-list` so U4 does not add
an unnamed section. Inside either root, use `ul.order-list__items` and
`li.order-row`. Do not apply table or grid roles: the rows are responsive visual
summaries and do not need composite keyboard behavior or column-header
relationships. Use visible Link labels such as `Order #1048`, a machine-readable
`datetime`, readable Badge text, and bidirectional isolation for formatted
totals.

Remove U4-specific Link focus/hover styling and status colors. Canonical Link
owns navigation interaction; canonical Badge owns semantic visual variants.
Names such as pending, shipped, delivered, and cancelled remain target values,
not U4 states. The root becomes a named inline-size container with private
one-, two-, and four-area row arrangements based on component width.

Owner decision U4-A and ADR 0261 accept authoritative target-formatted summaries:
financial and fulfillment facts stay distinct in target data, while each U4 row
receives one truthful localized Badge summary. ADR 0260 supplies the accepted
canonical-or-native target handoff. Contract maturity remains `pilot`; final
visual and live protected-data review are still required before `stable` or
target readiness.

## Purpose And Limits

- Presents a compact authenticated history of customer orders and direct
  destinations to order detail.
- Supports an optional accessible container name and a required complete
  target-owned collection of summaries.
- Allows targets to provide localized visible order labels, real URLs,
  machine-readable and human-readable dates, readable status copy, appropriate
  Badge variants, formatted totals, count, ordering, and pagination context.
- Is not an order query, account/session gate, authorization layer, status
  normalizer, financial/fulfillment state machine, router, formatter, paginator,
  telemetry client, or live-update service.
- Does not prescribe whether financial and fulfillment states become one label,
  multiple badges, an order-progress composition, or a target-native status
  presentation outside U4.
- Does not own an empty state. With no accepted `emptyState` property, targets
  compose canonical Empty State or other lifecycle UI instead of rendering an
  empty/deceptive U4 list.

## Repository Baseline Before Refinement

- Registry U4 depends only on Badge even though the fixture navigates with a
  bespoke anchor. U4 duplicates canonical Link color, hover, focus, font weight,
  and decoration behavior.
- Contract `0.1.0`, `pilot`, declares six anatomy parts, seven states, three
  behaviors, two properties, and target-specific pending/shipped/delivered/
  cancelled status classes. It does not specify native list semantics,
  conditional root semantics, machine-readable dates, canonical Link ownership,
  content resilience, forced colors, reduced motion, target lifecycle ownership,
  or a named container.
- Account Studio constructs a local `section`/`article` tree. It uses plain
  spans for dates, omits canonical Badge and Link classes, silently prevents
  navigation, and can leave an unnamed empty section. MDX separately constructs
  another tree with `time`, `.badge`, status modifiers, and different fixture
  records. Exhibit and Studio therefore do not share exact implementation.
- Account CSS mixes a viewport query with an anonymous container query and
  duplicates two-track rules. It hardcodes pixel gaps/padding, numeric font
  weights, calculated type scales, target status taxonomy, feedback color mixes,
  Badge radius, Link focus, and Link hover.
- Existing Mobile/Desktop evidence shows only default fixtures. It does not
  certify Tablet/XL, exact DOM/style identity, native list relationships,
  optional-name omission, required-content omission, destination activation,
  descriptive visible Link names, long/localized/unbroken content, RTL, a 200px
  container, effective 200-percent reflow, dark mode, forced colors, reduced
  motion, or canonical dependency composition.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` resolve to the generic Button Component Detail/Studio shell. They
  are not U4 artwork or owner approval.
- Shopify has copied Account CSS but no selected U4 Liquid, hosted-account
  extension, Customer Account API integration, authenticated order mapping, or
  target evidence. CSS availability must not be reported as Shopify readiness.
- Deterministic baseline: U4 CSS slice `2,259 B` raw / `675 B` gzip; Account CSS
  `16,231 B` raw / `2,999 B` gzip against its permanent `3,072 B` family ceiling;
  generated Web component CSS `508,466 B` raw / `68,372 B` gzip against the
  existing `65,536 B` program ceiling; shared runtime `53,811 B` raw / `10,501 B`
  gzip. U4 adds no neutral runtime.
- Baseline U4 CSS SHA-256 is
  `0e017ff4c620d9138cf0c86d57a17c4f021973e8ebb24a622d74fe33eece4d2f`.
  Baseline Exhibit/Studio Desktop SHA-256 values are
  `5775c3b0073cdebd097c6b174c1a21ccb02007cab200642784f84c4f34568905`
  and `a9fa9af16ab9236bce90575e86de1da254aedc449b8745d400661085ffb672d3`;
  Mobile values are
  `a26f4ae463c561a3a14c17919ccf2e1e20d4cd993f2974861c0edf4cc469256a`
  and `872ee6933a7fba9daf352645e48698c55e0bb1762ae537cc2f06e6b01d38f614`.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships) | Visual grouping and relationships should be programmatically determinable through appropriate structure. | Use a native list/list-item relationship for repeated order summaries instead of unrelated articles or divs. |
| [WCAG 2.4.4 Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Each Link purpose must be determinable from its text or programmatic context; meaningful text helps users navigating lists of Links. | Prefer visible `Order #1048` over a visually ambiguous `#1048` patched only with a hidden name. |
| [HTML `time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) | `time` exposes a machine-readable date/time through `datetime` while retaining localized visible content. | Targets provide both localized `dateLabel` and conforming `dateTime`; U4 preserves native semantics. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) and [Grid pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) | APG has no order-history widget; ARIA grid introduces managed directional keyboard interaction. | Preserve native list/Link keyboard behavior. CSS Grid is presentation only. |
| [Open UI List research](https://open-ui.org/components/list.research/) | Lists can contain compound content and sections of text; Open UI does not establish an order-history status or commerce lifecycle API. | Treat each order as compound native list content and keep commerce state target-owned. |
| [Radix Themes Data List](https://www.radix-ui.com/themes/docs/components/data-list) | Mature systems compose semantic key/value structures with canonical Link and Badge rather than teaching the parent their visuals. | Reuse Link and Badge; do not reproduce their color, radius, focus, or interaction rules in U4. |
| [Shopify customer-account apps](https://shopify.dev/docs/apps/build/customer-accounts) | Current customer accounts include a hosted Order index containing the customer's order list and defined extension points. | Latest Shopify accounts already own the primary order-index lifecycle; U4 is not a universal theme-owned replacement. |
| [Shopify customer-account targets](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets) | Order-index blocks/actions are app extension targets within Shopify-managed accounts. | Extension packaging and native Polaris web components form a distinct target profile, not copied neutral HTML. |
| [Shopify theme templates](https://shopify.dev/docs/storefronts/themes/architecture/templates) | Customer accounts operate independently of themes; legacy customer templates are deprecated. | Do not add a current default `customers/account` Liquid implementation. Explicit compatibility may use Liquid only as a selected legacy profile. |
| [Shopify Liquid `customer`](https://shopify.dev/docs/api/liquid/objects/customer) and [`order`](https://shopify.dev/docs/api/liquid/objects/order) | Legacy Liquid exposes paginated customer orders, order URLs, and localized financial/fulfillment labels. | A versioned compatibility adapter can map target data without defining a neutral taxonomy, but is not selected by this batch. |

The references agree on semantic grouping, meaningful native Links, readable
status text, target-owned order data, and composition from lower-level
primitives. They do not define one universal order-status taxonomy, one-row
versus table semantics for every context, or one Shopify implementation profile.

## Matches, Differences, And Direction

- Keep `label` optional and `orders` required; do not add public status, count,
  sort, filter, pagination, loading, empty, column, or breakpoint properties.
- Require a complete non-empty order collection. Omit the complete renderer when
  the required slot is absent, empty, duplicated by identifier, or incomplete.
- Use `section[aria-label]` only with a trimmed accessible name; otherwise use an
  ordinary `div` so optional naming does not create an unnamed section.
- Render `ul.order-list__items` and `li.order-row`. Do not add `role=list`,
  `role=table`, `role=grid`, roving tabindex, or arrow-key handling.
- Compose `.link.order-row__number` with descriptive visible localized text and
  a real target URL. The docs site may intercept navigation and report demo
  feedback outside U4; neutral U4 owns no callback state.
- Compose `.badge.order-row__status` and map target truth to Badge's `info`,
  `success`, `warning`, or `error` visual projection. The target label remains
  readable text. Do not expose those projections as U4 variants/states.
- Use `time.order-row__date[datetime]` and wrap formatted total text in `bdi`.
  Targets own locale, calendar, time zone, currency, tax, discounts, refunds,
  and display precision.
- Use `container: order-history / inline-size`. At narrow widths each row stacks
  in logical reading order; at intermediate widths number/total and date/status
  form two tracks; at wide widths all four areas share one row.
- Use semantic public tokens for U4 layout, type, border, and copy. Keep area
  assignment and `24rem`/`40rem` thresholds private. Link and Badge own their
  public interaction/visual tokens.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | `section.order-list[aria-label]` or `div.order-list` | U4 semantics/container |
| Items | yes | `ul.order-list__items` | U4 native collection |
| Row | one or more | `li.order-row` | U4 visual summary arrangement |
| Number/destination | yes per row | `a.link.order-row__number[href]` | canonical Link + target data |
| Date | yes per row | `time.order-row__date[datetime]` | native HTML + target formatting |
| Status | yes per row | `span.badge.order-row__status` | canonical Badge + target truth |
| Total | yes per row | `span.order-row__total > bdi` | U4 placement + target formatting |

## State, Variant, Size, And Content Matrix

| Dimension | Direction |
| --- | --- |
| Visual variant | One neutral profile; no public U4 visual variant. |
| Size | One intrinsic profile; row area changes are private container composition. |
| Named/unnamed | Optional non-empty `label` selects a named section; blank/omitted label selects an ordinary div. |
| Collection | One or more complete unique records; absent/empty/incomplete records omit the complete renderer. |
| Status projection | Canonical Badge variant is target-provided visual meaning; status taxonomy is not U4 state. |
| Dependency interaction | Link owns hover/focus/activation; Badge is passive and owns its semantic visual treatment. |
| Lifecycle | Loading, error, empty, expired, refreshing, pagination, and live updates remain target composition outside U4. |
| Content stress | Short, long, localized, RTL, unbroken, 200px container, effective 200 percent, and large formatted totals must remain contained. |

## Public API And Controlled State

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `label` | string | optional | Accessible name only; blank means no section semantics. |
| `orders` | slot | required | Complete target-owned native order-list composition. |

U4 has no controlled/uncontrolled state. Native Link owns activation semantics;
the target owns navigation and any resulting loading/focus/feedback. The data
layer owns collection freshness, sorting, pagination, and updates. Canonical
Badge is passive and does not own commerce state.

## Tokens, Runtime, And Performance Direction

- Remove U4-owned Link accent/focus tokens and feedback/radius tokens because
  canonical Link and Badge already own those decisions.
- Retain only U4 layout, border, text, type, and stack spacing tokens used by the
  root, list, row, date, and total.
- Private custom properties may name row padding/gaps and internal thresholds;
  do not turn composition math into public API.
- Passive neutral runtime budget is `0 B`: no listener, observer, timer, order
  fetch, auth SDK, status mapper, formatter, paginator, or live region.
- Account family ceiling remains `3,072 B` gzip. U4 should reclaim duplicated
  Link/Badge/status/viewport rules so it does not consume the remaining `73 B`.

## Accessibility And Responsive Requirements

- Preserve native `ul/li`, `a[href]`, and `time[datetime]` semantics.
- Ensure visible Link text identifies the order destination without relying on
  a hidden label, adjacent text, or position alone.
- Keep one ordinary Tab stop per order Link and preserve Enter plus modified
  native Link activation. Add no row click handler or nested interactive surface.
- Expose status through readable localized text; never use Badge color alone.
- Keep visible and DOM reading order number, date, status, total at every
  container width. CSS area movement must not alter focus/reading order.
- Omit an unnamed section and omit the complete renderer on missing required
  collection content. Targets own a real empty-state alternative.
- Preserve canonical Link forced-color focus and Badge forced-color boundaries;
  U4 adds no motion, so reduced-motion mode has nothing to suppress locally.
- Protect order history, destinations, and personally identifying commerce data
  with target authentication and authorization.

## Cross-Target Translation

| Target | Translation | Readiness boundary |
| --- | --- | --- |
| Neutral Web | Conditional named container, native list/items, canonical Link/Badge, `time`, formatted total. | Implementable with zero U4 runtime. |
| Shopify v1 theme/current accounts | Shopify-hosted Order index. | Accepted intentional native handoff; U4 does not replace the hosted list through theme Liquid and makes no parity claim. |
| Shopify customer-account extension | Target-native full-page or supported extension surface. | May project U4 semantics only when it owns the rendered list; app packaging and target evidence remain required. |
| Shopify headless | Canonical U4 view fed by Customer Account API state and supported order destinations. | Valid target-controlled projection; auth/data/routes/status/formatting/lifecycle stay integration-owned. |
| Shopify legacy compatibility | Paginated `customer.orders`, `order.customer_url`, and localized target status labels. | Separately versioned deprecated compatibility only; never the v1 default or automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus target account/data/router provider. | Visual composition available; secure data/navigation integration remains target-owned. |
| React / Angular / Hydrogen | Repeated composition over external query/router/account state. | Contract-ready; no framework dependency in base source. |
| Figma | Auto-layout list composed from canonical Link and Badge instances. | Planned; registered Button nodes are not U4 artwork or visual approval. |
| SwiftUI / Compose | Native list rows, navigation links, dates, status labels, and formatted totals. | Conceptual; preserve platform navigation/list/accessibility semantics. |

## Risks, Alternatives, And Remaining Integration

1. Human review must approve row density, separators, alignment, typography,
   Badge projection, stacked/two-track/four-area thresholds, localized fixture
   content, and the neutral visual candidate without U4-specific owner artwork.
2. Shopify v1 theme translation is resolved as hosted Order index handoff.
   Extensions, headless projection and compatibility still require independent
   packaging, data, route, editor, security and evidence work.
3. Targets must author the one readable Badge summary from their separate
   financial and fulfillment facts, including cancelled, refunded, partially
   fulfilled and returned combinations. If one summary is insufficient, the
   target must use a richer composition outside U4; U4 never infers a taxonomy.
4. Targets must define sorting, pagination, limits, loading/error/empty/expired
   behavior, real destination policy, date/currency formatting, privacy,
   telemetry, analytics, live updates, and post-navigation focus.
5. A semantic table is an alternative for contexts with explicit column headers
   and comparison tasks. The compact account summary has no accepted headers and
   stacks by container, so a native list is recommended. Promoting column labels
   would require product/content and visual review.

Alternative A is the recommended passive native list with conditional root and
canonical Link/Badge composition. Alternative B is a semantic table with
visible or programmatically complete headers, appropriate only if column
comparison becomes a product requirement. Alternative C makes each row one
whole-row Link; it would complicate text selection, nested status semantics, and
future actions, so explicit Link composition remains preferred. Alternative D
adds order querying/status normalization/pagination to U4, coupling the neutral
component to account and commerce architecture, and is not recommended.

## Readiness Decision

Neutral implementation, dependency reconciliation, generated adapters, four-
viewports-plus-special-modes evidence, performance measurement, the detailed
audit, authoritative-summary policy and canonical-or-native target handoff are
complete. U4 is `human-review-ready`; final visuals, live protected-data target
integration, list-versus-table product review, and corrected U4-specific owner
artwork remain pending. Current Account CSS is `2,853 / 3,072 B` gzip with
`219 B` headroom, while U4 remains `1,984 B` raw / `665 B` gzip and adds `0 B`
runtime. U4 stays `pilot`; no automatic `stable` promotion is allowed.
