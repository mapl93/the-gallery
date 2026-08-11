# Order History Web Refinement Audit

Status: Human-review-ready; live protected-data target integration and human
visual review remain required; remains `pilot`

Date: 2026-07-17

## Outcome

Order History is now a passive, optionally named native order-summary list
composed from canonical Link and Badge. U4 owns only conditional root semantics,
the native collection, row arrangement, semantic date/total placement, and
intrinsic container response. Targets retain authentication, authorization,
order queries, sorting/filtering/pagination, loading/empty/error/expired states,
financial and fulfillment truth, status projection, date/currency formatting,
destinations, navigation, announcements, focus, telemetry, and analytics.

The neutral implementation adds no U4 runtime. Exhibit and Studio render the
same `OrderHistoryArtwork`, fixture, canonical classes, semantic dates, and
two-property API. Owner decision U4-A and ADR 0261 accept one authoritative
target-formatted summary per row without a universal status enum. ADR 0260
resolves current Shopify themes as hosted Order-index handoff while controlled
extension/headless views remain distinct projections and classic Liquid remains
separately versioned compatibility. No speculative universal customer-account
Liquid template was created, and no visual approval or `stable` promotion is
implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive order-summary collection; not an account/order query, auth/session gate, status state machine, formatter, router, paginator, telemetry client, or lifecycle coordinator. |
| Anatomy and composition | pass | Conditional named root, required native list, one or more complete native list items, canonical Link/Badge, semantic `time`, and bidirectionally isolated formatted total. |
| Variants, sizes, and states | pass | One neutral profile; named/unnamed root, required-content omission, one/two/four private areas, dependency interaction, narrow/localized, and external target lifecycle are defined. Target status values are not U4 states. |
| Public API and ownership | pass | Two accepted properties remain: optional `label` and required `orders`; repeated records, statuses, variants, routes, count, pagination, lifecycle, and visual internals were not flattened into API. |
| Tokens and hardcoded values | pass | Eleven stable U4 color/spacing/type tokens; private row gaps and `24rem`/`40rem` thresholds remain internal. Link/Badge own focus, hover, motion, status colors, type, and radius. |
| Accessibility and motion | pass | Conditional section/div semantics, native `ul/li`, descriptive native Links, `time[datetime]`, readable Badge text, stable DOM order, three logical focus stops, no grid/table roles or internal live region, visible forced-color focus, and zero reduced-motion activity. |
| Responsive/content resilience | pass | Mobile/Tablet/Desktop/XL, direct 520px and 720px containers, localized RTL/unbroken 200px, and 640px effective-200-percent checks stay contained. |
| Runtime and assets | pass | `0 B` U4 runtime delta; no listener, observer, timer, fetch, account SDK, status mapper, formatter, router, or target asset. |
| Cross-target translation | pass with target gaps | Canonical projection versus hosted/native handoff is accepted; Shopify remains `planned` until a real target profile is implemented and evidenced. |
| Documentation and verification | pass | Dossier, ADR 0187, contract, registry, CSS, shared renderer, Studio, MDX, adapter notes, before/after evidence, automated validators, and matrices agree. |

## Standards And Reference Direction

- WCAG Info and Relationships supports native grouping for repeated compound
  summaries: <https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships>.
- WCAG Link Purpose supports descriptive visible order destination text rather
  than ambiguous numbers patched only by hidden labels:
  <https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html>.
- HTML `time` separates localized visible copy from a machine-readable
  `datetime` value:
  <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>.
- APG defines no Order History widget. Its Grid pattern would add a composite
  keyboard model that this visual list does not need:
  <https://www.w3.org/WAI/ARIA/apg/patterns/> and
  <https://www.w3.org/WAI/ARIA/apg/patterns/grid/>.
- Open UI List research accepts compound content inside list items but defines
  no commerce lifecycle/status taxonomy:
  <https://open-ui.org/components/list.research/>.
- Radix Data List demonstrates mature Link/Badge composition rather than parent-
  owned dependency visuals:
  <https://www.radix-ui.com/themes/docs/components/data-list>.
- Shopify documents a hosted current Order index and customer-account extension
  targets, while customer account theme templates are deprecated:
  <https://shopify.dev/docs/apps/build/customer-accounts>,
  <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets>,
  and <https://shopify.dev/docs/storefronts/themes/architecture/templates>.
- Shopify Liquid still exposes `customer.orders`, order URLs, and localized
  status labels for an explicitly selected compatibility profile:
  <https://shopify.dev/docs/api/liquid/objects/customer> and
  <https://shopify.dev/docs/api/liquid/objects/order>.

## Contract And Browser Evidence

- Contract `0.3.0` declares Link and Badge dependencies, seven anatomy parts,
  five observed/composed states, nine behavior rules, two semantic properties,
  one intrinsic profile, eleven U4 public tokens, and explicit target ownership.
- Browser inspection finds one named `SECTION`, one native `UL`, three native
  `LI` rows, three `a.link[href]` destinations, three `time[datetime]`, three
  canonical passive Badges, three `bdi` totals, zero grid/table roles, and zero
  live regions inside U4.
- Visible Link names are `Order #1048`, `Order #1032`, and `Order #1017`.
  Datetimes are `2026-07-08`, `2026-06-21`, and `2026-05-14`; status text stays
  visible independently of Badge color.
- Clicking the first Link produces explicit site-only Status text outside U4:
  `Demo navigation to Order #1048 selected. No route changed.` The fixture URL
  remains unchanged intentionally while the neutral Link keeps a real `href`.
- A real keyboard Tab from a temporary preceding sentinel reaches the first
  order Link. Normal and forced-color focus are solid `2px` outlines with `2px`
  offset. U4 has exactly three focusable surfaces.
- Blank optional `label` changes the root to `DIV`, removes `aria-label`, keeps
  the native list/three rows, and clears stale site feedback. The required
  Orders Studio control is disabled, and renderer validation omits the complete
  artwork for missing, empty, duplicate-ID, or incomplete records.
- Exhibit and Studio serialize exact identical normalized U4 DOM. Their page
  chrome gives different available widths at some viewports; when both roots
  are forced to the same `520px` component width, the complete computed-style
  signature is identical.
- One-, two-, and four-area layouts were observed. A direct `720px` root has
  four tracks, `clientWidth === scrollWidth === 720`, and no document overflow
  in the widened harness.
- Mobile, Tablet, Desktop, and XL have no U4 or document overflow. Long
  localized RTL plus unbroken content at exactly `200px` remains contained. A
  640px viewport equivalent to 200-percent reflow from 1280px also remains
  contained.
- Light contrast measures `5.89:1` for Link, `7.81:1` for date, `17.93:1` for
  total, and at least `13.11:1` for Badge text. Dark measures `9.74:1`,
  `12.09:1`, `17.18:1`, and at least `4.91:1` respectively.
- Forced colors preserves canonical Link focus and Badge boundaries. Reduced
  motion reports zero non-zero transitions/animations and zero running
  animations in the tested subtree.
- Eighteen final images, four retained baseline images, and machine-readable
  measurements/interactions/parity live in
  `output/playwright/refinement-batch-96/`.
- Evidence used one named headless Playwright session, one tab, and one managed
  docs server. Final console reports zero errors and zero warnings; cleanup
  closed all owned resources and left port 4173 free.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Conditional named container, native order list, canonical Link/Badge, semantic date, and formatted total. | Implemented and evidenced with zero U4 runtime. |
| Shopify v1 theme/current accounts | Shopify-owned hosted Order index. | Accepted native handoff; `planned`, `ready:false`, intentional U4 omission, and no parity claim. |
| Shopify customer-account extension | Authenticated target-native full-page or supported extension surface. | May project U4 semantics when it owns the list; packaging, placement, APIs and lifecycle remain target work. |
| Headless Shopify | Canonical U4 view fed by Customer Account API state and supported destinations. | Valid target-controlled projection; auth, data, status truth, formatting, routes, pagination, feedback and lifecycle remain integration-owned. |
| Deprecated-account compatibility | Explicit separately versioned Liquid profile using paginated `customer.orders`, order URLs and localized target labels. | Not the v1 default and never an automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus target membership/account provider and real routes. | Visual composition available; secure data/navigation integration remains target-owned. |
| React / Angular / Hydrogen | Shared dependency composition over external query/router/account state. | Contract-ready; no framework dependency in base source. |
| Figma | Canonical Link and Badge instances in auto layout. | Planned; registered generic Button nodes are not U4 visual approval. |
| SwiftUI / Compose | Native list rows, navigation links, dates, status labels, and formatted totals. | Conceptual; preserve native navigation/list/accessibility conventions. |

Source-identical Account CSS passed official Shopify validation as artifact
`u4-order-history-shopify-20260717`, revision 1. U4 remains `css-ready`,
`ready:false`; the current global Shopify target-ready count is 90.

## Performance And Risks

- U4 CSS changes from `2,259 B` raw / `675 B` gzip to `1,984 B` raw /
  `665 B` gzip. It removes duplicated Link/Badge/status/viewport rules while
  adding complete native-list and named-container area layout.
- Current Account CSS is `2,853 / 3,072 B` gzip with `219 B` headroom.
- Current neutral component CSS is `71,884 / 65,536 B`; its existing program
  gap remains documented and U4 contributes no new CSS in this reconciliation.
- Shared runtime is `22,807 / 8,192 B`; U4 adds `0 B` and Shopify U4 adds no
  target JavaScript.
- Canonical, Webflow, and Shopify Account CSS are byte-identical. Account CSS
  SHA-256 is
  `721d0c165f9c2283e9561963e9bcf385956f3109c1be90eb28651dcd79f20cf7`;
  the U4 slice SHA-256 is
  `4e048d82755306f12d74e9d7ad4548d33d61f7819849b1508e70bfca418db1c2`.
- Account CSS retains `219 B` compressed headroom. Later U5-U9 work must
  continue reclaiming duplicate family rules or request an explicit budget
  revision rather than silently exceeding the family ceiling.
- The target must author a truthful one-Badge summary from separate financial
  and fulfillment facts. A richer status composition is required outside U4
  when that summary would lose necessary meaning.
- The Shopify profile policy is resolved; live hosted, extension, headless or
  compatibility proof remains target-specific integration work.
- Human review must approve row density, separators, typography, alignment,
  Badge projection, breakpoints, fixture copy, list versus table product needs,
  and corrected U4-specific artwork.
- Targets must define authentication/authorization, querying, sorting,
  filtering, pagination/limits, loading/error/empty/expired behavior, real
  destinations, dates/currency/tax/refund formatting, privacy, live updates,
  announcements, focus, telemetry, and analytics.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, 254 static
previews, Neutral Web adapter, Shopify adapter, official Shopify validation,
native semantics/activation/focus, exact normalized Exhibit/Studio DOM and
same-container styles, four viewports, direct two/four-area containers,
localized RTL/200px, effective 200 percent, light/dark contrast, forced colors,
reduced motion, deterministic performance, generated-copy identity, temporary
production build, visual inspection, diff checks, `site/dist` cleanliness, and
owned-resource cleanup are included.

## Readiness Decision

`human-review-ready`. Safe neutral semantic, canonical, responsive,
performance, adapter-boundary, authoritative-summary policy, and evidence work
is complete. Live protected-data target integration, final visuals, list/table
product review, and corrected U4-specific artwork remain pending. U4 remains
`pilot`; no automatic `stable` promotion was made.
