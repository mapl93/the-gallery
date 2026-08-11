# Component Dossier: Store Pickup Availability

> Historical migration evidence only. ADR 0244 removes this identity and
> replaces it with Pickup Location Selector plus Store Locator. Do not use this
> dossier as current D9 guidance.

Status: `refined-decision-needed`

Date: 2026-07-18

Registry: `D9` / `store-pickup`

Dependency order: 139, phase 6 (Composed components), current depth 0; recommended direct dependency `accordion`

## Recommendation

Keep Store Pickup as a product-context profile that presents one target-owned
availability snapshot for the currently selected product/variant across one or
more pickup locations. Compose the canonical Accordion as one disclosure item:
its heading, native Button trigger, `aria-expanded`, `aria-controls`, native
hidden panel, focus, indicator and reduced-motion behavior must remain owned by
Accordion. D9 should own only the pickup summary composition, native location
list, readable status records and contextual location typography/rhythm.

Add one required `locations` slot. The current public API can toggle visibility
but cannot supply the component's defining data, leaving Studio fixtures as
implicit implementation. The slot should contain one or more valid native list
items with a non-empty location name and readable availability statement.
Address/readiness/hours and decorative status media remain target-authored
record content, not a universal location schema or a second public field API.

Keep `toggleLabel`, `locations` and `expanded` as the complete stable candidate
API. Stateful targets may expose `expanded/onExpandedChange` and
`defaultExpanded`; there must be one logical owner. Static targets may translate
the canonical Accordion profile to native `details/summary` where the accepted
Accordion contract allows it, but the docs target should exercise the canonical
Button/hidden-panel implementation instead of maintaining another disclosure.

Do not turn D9 into a pickup selector, store locator, geocoder, map, routing
surface, checkout delivery-method choice, inventory engine or live region.
Product/variant synchronization, loading/error/empty policy, availability data,
proximity ordering, status announcements and stale-request handling remain the
product coordinator/target boundary. Shopify already defines variant-scoped
store availability, transfer-backed availability and pickup time; The Gallery
must not reinterpret those values or infer inventory from quantity.

Retain the current quiet top-boundary visual as the repository candidate by
layering D9's root profile on canonical Accordion rather than cloning its child
styles. Use logical properties and intrinsic wrapping. Keep D9 `pilot`; after
implementation it should be `refined-decision-needed`, because record scope,
ordering, target update lifecycle, selection/navigation, Shopify integration,
final visuals and D9-specific owner evidence remain open.

## Purpose, Use Cases And Limits

### Purpose

Give a shopper an optional, compact way to inspect whether the current
merchandise selection can be picked up at useful physical locations, together
with target-authored readiness, address or hours context.

### In scope

- a localized visible disclosure label;
- one synchronized collapsed/expanded disclosure state;
- one or more target-owned pickup-location records;
- a non-empty visible location name and readable availability statement per
  valid record;
- optional target-authored readiness/address/hours/supporting content;
- optional decorative summary/status icons that never carry meaning alone;
- controlled/uncontrolled translation without mirrored state;
- intrinsic narrow/wide wrapping, RTL, zoom, text spacing and special colors;
- replacement of the current availability snapshot by a target coordinator;
  and
- Web, Shopify, framework, native and Figma translation boundaries.

### Out of scope

- choosing a pickup location for cart or checkout;
- changing the selected variant, quantity or delivery method;
- geolocation permission, postal-code search, distance calculation, maps,
  directions or route planning;
- deciding which inventory is sellable, transferable, oversellable, reserved
  or actually on hand;
- fetching, caching, aborting, retrying or announcing variant availability;
- universal location IDs, coordinates, address records, opening-hours schemas,
  time zones, holiday closures or distance units;
- loading skeleton, generic empty/error state or stale-data policy;
- links, calls, booking, reservation or “hold for pickup” actions;
- modal/drawer location browsing or long-list virtualization;
- analytics or personalization; and
- a production Shopify section/provider without target-native proof.

## Accepted Repository Facts

- ADR 0075 defines Store Pickup as a synchronized disclosure whose root state,
  trigger `aria-expanded` and content visibility change together.
- ADR 0099 establishes canonical Accordion anatomy, true hidden panels, target
  coordination, optional native-details translation and zero neutral runtime.
- Accordion already provides one shared docs renderer and a target-agnostic
  contract; D9 currently declares no dependency and duplicates that behavior.
- The repository is source of truth; Figma is a target. Registered nodes
  `943:7` and `1020:480` are reused generic Product/Button/Studio references,
  not D9-specific visual approval.
- Product/variant selection and Shopify pickup IDs belong to target adapters,
  not neutral component contracts.
- No contract may become `stable` without explicit human review.

## Baseline Audit

### Current anatomy and behavior

- `.store-pickup` is a generic `section` carrying redundant
  `aria-expanded` in the docs renderer.
- `.store-pickup__toggle` is a native Button with `aria-expanded` and
  `aria-controls`, but it is not the only child of a contextual heading.
- `.store-pickup__content` uses CSS `display:none/block` driven by root
  `aria-expanded`; it does not consume canonical Accordion's native `hidden`
  panel contract.
- the chevron, focus, transition, trigger layout and disclosure visibility are
  parallel implementations of Accordion;
- location records are generic `div`s rather than a native list;
- location name uses another `div`; detail and hours are visually meaningful
  but structurally ungrouped;
- available/unavailable icons are decorative and paired with text in the
  fixture, but their modifier classes carry the only status-state selectors;
- Studio owns one local `expanded` boolean and two hardcoded locations; and
- Exhibit and Studio happen to call the same inline `renderStorePickup`
  function, but there is no extracted shared component/fixture boundary.

### API and target gaps

- `toggleLabel` and `expanded` are the only properties; location content is
  absent from public composition despite being required anatomy.
- The contract describes availability states but exposes no coherent record or
  slot through which targets can supply them.
- Empty/missing locations still allow an empty disclosure in principle.
- No event/lifecycle guidance covers controlled/uncontrolled target mappings.
- No variant identity, replacement timing, stale response, loading, error or
  announcement boundary is documented.
- Shopify has copied CSS only: no Liquid, section container, variant refresh,
  localization, editor behavior or live store evidence.

### CSS and token findings

- D9 uses hardcoded `16px`, `8px`, `20px`, `12px`, `2px`, `4px` and raw
  `font-weight:600` instead of semantic tokens or private derivations.
- physical `width`, `text-align:left`, `margin-top`, `padding-top` and
  `border-top` do not express RTL/logical layout intent;
- D9 duplicates Accordion trigger/focus/indicator/transition/visibility CSS;
- fallback token values in `var(--typo-body-sm-size, .875rem)` and
  `var(--typo-caption-size, .75rem)` hide missing token contracts; and
- the D9 slice is `1,777 B` raw / `589 B` deterministic level-9 gzip.

Baseline family/program measurements:

| Artifact | Raw | Gzip | SHA-256 |
| --- | ---: | ---: | --- |
| D9 slice | `1,777 B` | `589 B` | `134bc293fe177dcf90203f37c1016e6bae5a52edbb5d464266ca9abac6b0dcae` |
| Product family | `29,764 B` | `4,805 B` | `da824f4c9bd913f8ee1022aa667ba0a2f65e37ff83086dc4884ed175203e96a3` |
| Neutral Web components | `517,968 B` | `69,349 B` | `46ec2001c9405bf2a2ed471bca34247880574ea0c830aa34483dd7ad69e371c6` |
| Shared runtime | `53,811 B` | `10,501 B` | `1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a` |

The Product-family ceiling is `5,324 B` gzip, leaving `519 B` headroom.
Neutral Web and runtime retain existing program gaps of `3,813 B` and `2,309 B`
to their permanent ceilings; D9 must reduce rather than widen them. D9 neutral
runtime budget is `0 B`.

## Primary Evidence And Comparison

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI-ARIA APG Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) | A disclosure has a Button and controlled content; Enter/Space activate; `aria-expanded` tracks visibility; `aria-controls` is optional. | Reuse canonical Accordion Button/panel synchronization rather than a parallel D9 disclosure. |
| [WAI-ARIA APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) | Each header Button belongs to a heading, controls one panel and exposes state. | Add contextual heading and native hidden panel through the accepted Accordion dependency. |
| [Open UI Accordion research](https://open-ui.org/components/accordion.research/) | Accordion is a sequence of disclosures; systems disagree about exclusive policies. | D9 is one disclosure item and needs no new group-policy API. |
| [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) | Root/Item/Header/Trigger/Content composition, controlled/uncontrolled values, RTL and disabled behavior are separate concerns. | Match composition and one-state-owner translation without importing framework-shaped APIs. |
| [Shopify Polaris Disclosure](https://shopify.dev/docs/api/customer-account-ui-extensions/2025-07/ui-components/typography-and-content/disclosure) | Shopify's Disclosure hides long content behind a control and applies the WAI-ARIA Accordion pattern. | Confirms disclosure semantics, not a Gallery-specific field/action clone. |
| [Shopify pickup-availability theme guide](https://shopify.dev/docs/storefronts/themes/delivery-fulfillment/pickup-availability) | Availability is variant-scoped, rendered per location and refreshed when variant selection changes; current availability and address are shown. | Target coordinator owns variant identity, request/replacement and location data; D9 renders the supplied snapshot. |
| [Shopify StoreAvailability](https://shopify.dev/docs/api/storefront/latest/objects/StoreAvailability) | Record exposes availability, location and pickup time; `available` may be true with zero on-hand stock because transfers/oversell rules apply. | Never infer availability from quantity or redefine Shopify business semantics. |
| [WCAG 2.2 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) | Disclosure expansion itself does not require a live region; dynamic result/loading text may be a status message when it changes without focus. | D9 owns no live region. Target update coordinator supplies truthful status when its asynchronous lifecycle requires one. |

### Coincidences

- Sources converge on one visible disclosure control and one synchronized
  content region.
- Canonical composition separates disclosure mechanics from target-owned
  availability data.
- Controlled/uncontrolled convenience is adapter-level; one state owner is
  required.
- Pickup availability is scoped to a selected merchandise record, not a static
  product-global truth.
- Readable text, not icon/color alone, carries availability meaning.

### Differences and non-consensus

- APG Button/panel and native `details/summary` are both valid target
  translations; the repository's canonical Accordion already preserves this
  choice.
- Shopify offers concrete variant/location fields, but those are not a
  cross-target neutral schema.
- Sources do not establish one location ordering, maximum count, default open
  state, map/modal treatment, address/hours format or live-update announcement.
- Current registered Figma evidence does not establish a D9-specific visual.

## Recommended Anatomy

| Part | Required | Candidate mapping | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `.store-pickup.accordion` | D9 + Accordion | One generic product-context disclosure group; no redundant root `aria-expanded`. |
| Item | yes | `.accordion__item` | Accordion | One item only in v1. |
| Heading | yes | `.accordion__heading` | Accordion/consumer context | Contextual heading; trigger is its only child. |
| Trigger | yes | `.accordion__trigger` | Accordion + target label | Native Button with stable IDs, `aria-expanded` and `aria-controls`. |
| Summary media | no | site/target slot inside trigger label | target fixture | Decorative or redundant; never sole accessible name/status. |
| Indicator | no | `.accordion__icon` | Accordion | Decorative expansion state. |
| Panel | yes | `.accordion__panel[hidden]` | Accordion | Truly hidden while collapsed; region semantics omitted for one modest panel. |
| Content | yes | `.accordion__content` | Accordion | Flow wrapper. |
| Locations | yes | `ul.store-pickup__locations` | D9 + target slot | One or more valid current-snapshot records. |
| Location | repeated | `li.store-pickup__location` | D9 + target | Required name and readable availability. |
| Status media | no | `.store-pickup__status-icon` | target fixture | Decorative reinforcement with available/unavailable modifier. |
| Location content | yes | `.store-pickup__location-content` | D9 | Logical flow wrapper. |
| Name | yes per record | `.store-pickup__location-name` | target | Visible non-empty location identity. |
| Availability | yes per record | `.store-pickup__availability` | target | Plain-language current record status. |
| Details | no | `.store-pickup__details` | target | Address, distance, instruction or qualification; no universal schema. |
| Hours | no | `.store-pickup__hours` | target | Localized target-authored hours/readiness context. |

## Recommended Public API And State Matrix

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `toggleLabel` | string | required non-empty | Visible localized disclosure label/summary. |
| `locations` | slot | required complete | Native list of one or more valid target-owned location availability records. |
| `expanded` | boolean | optional, default false | Current disclosure state for controlled targets; stateful adapters may also expose default/change conveniences. |

| State or mode | Expected behavior |
| --- | --- |
| Collapsed | Trigger `aria-expanded=false`; panel has native `hidden`; no descendants render or enter focus order. |
| Expanded | Trigger `aria-expanded=true`; panel visible; trigger remains focused after activation. |
| Available record | Readable availability text plus optional decorative available icon; no quantity inference. |
| Unavailable record | Readable unavailable/qualification text plus optional decorative unavailable icon. |
| Missing label or locations | Shared docs renderer omits the complete D9 root. |
| Dynamic target refresh | Coordinator replaces complete target snapshot and handles loading/error/stale request/status policy outside D9. |
| Narrow/long/RTL | Logical wrapping preserves icon, name, status and supporting text without horizontal overflow. |
| Reduced motion | Accordion disables indicator/trigger transitions; D9 adds none. |

D9 should expose no availability boolean, location ID, coordinates, quantity,
pickup-time enum, address schema, hours schema, distance, current variant,
endpoint, loading, error, empty, maximum count, sort, breakpoint, icon name,
color, focus, animation or panel geometry property.

## Token And Performance Direction

- Accordion owns disclosure boundary, trigger, text, focus, indicator, hidden
  panel, transition, reduced-motion and forced-color tokens.
- D9 owns only location-list rhythm, status-media color and supporting
  location typography.
- Replace raw lengths/weight with existing Product/Layout semantic tokens and
  private derived values; no new component token layer.
- Use logical properties, `min-inline-size:0`, native list reset and intrinsic
  wrapping; no viewport media query is required.
- D9 CSS must not exceed its `589 B` gzip baseline and the Product family must
  remain below its fixed ceiling after the richer native-list anatomy lands.
- D9 runtime remains `0 B`; docs React state is evidence only.

## Cross-Target Translation

| Target | Translation | Current direction |
| --- | --- | --- |
| Neutral Web | One canonical Accordion item plus target-authored location list; target coordinates live state/data. | Source refinement can proceed with zero neutral runtime. |
| Static Web/Webflow | APG Button/hidden panel or semantics-preserving native details adapter; CMS supplies snapshot. | CSS projection possible; refresh/provider behavior target-owned. |
| Shopify theme | Variant store availabilities supply current records; target section/container and variant coordinator replace rendered snapshot. | Planned; no Liquid/section JS/editor/live-store claim yet. |
| Hydrogen/React/Angular | Controlled/uncontrolled disclosure composition; product coordinator supplies selected-variant snapshot and update status. | Planned; no framework dependency in base. |
| Figma | Collapsed/expanded plus mixed available/unavailable records and narrow wrapping through Accordion child instance. | Planned; registered generic nodes are not D9 approval. |
| SwiftUI/Compose/future | Native disclosure group and native list; application inventory service supplies localized records. | Conceptual mapping only. |

## Risks And Open Questions

1. Is D9 bound to selected variant, product, market, selling plan, quantity,
   location permission or another record, and who owns synchronization?
2. Which availability provider is authoritative per target, and how are
   transfer-backed, oversellable, preorderable, stale or reserved states named?
3. Which records are shown and ordered: nearest, available-first, merchant
   priority, alphabetic, market-filtered or user-selected?
4. What target policy covers loading, empty, partial, error, abort, retry,
   stale-response suppression and dynamic status announcements?
5. Are address, distance, hours, holiday closures, readiness, directions,
   phone and instructions permitted, required or interactive?
6. Does v1 remain a modest inline disclosure, or must long lists open a
   Modal/Drawer/store locator? No evidence currently authorizes that expansion.
7. Is native `details/summary` preferred by any production target, or should
   all stateful targets use the canonical Accordion Button/panel contract?
8. What exact Shopify section/container/variant-change integration, localization
   and editor behavior is intended?
9. The owner must approve boundary, density, label hierarchy, icon treatment,
   record rhythm, expanded default and D9-specific visual/Figma evidence before
   stability review.

## Planned Evidence

- Preserve the existing paired Mobile/Desktop parity captures as the baseline,
  then create final Exhibit/Studio Mobile, Tablet, Desktop and XL captures.
- Prove one shared D9 renderer/fixture and exact normalized internal DOM/style
  parity while allowing documentation-shell geometry.
- Verify heading/Button/IDs/`aria-expanded`/`aria-controls`/native `hidden`,
  click, Enter, Space, focus retention and collapsed focus exclusion.
- Verify required label/locations fail closed and optional record fields omit
  without empty nodes.
- Verify native list anatomy, readable status text and zero live regions.
- Exercise short, long, one/many, localized, RTL, unbroken, 200% text and user
  spacing content at direct narrow/wide component widths.
- Measure light/dark contrast, forced colors and reduced motion.
- Validate contract, Studio, docs, audits, CSS copies, adapters, deterministic
  gzip/SHA and external Vite build without touching `site/dist`.

## Implemented Result And Readiness

D9 now implements the recommended direction. `StorePickupArtwork` is the one
shared Exhibit/Studio renderer and site-only fixture boundary. It composes one
`AccordionArtwork` item, fails closed for missing required label or all valid
records, emits a native `ul`/`li` snapshot with required text-complete status,
omits optional fields cleanly and keeps expansion in one target owner. The old
root state, local toggle/content classes, CSS-driven visibility, generic record
`div`s and duplicated disclosure styling were removed.

The final evidence phase passed with empty failure, console-error and page-error
arrays across eight paired natural viewports; direct 200/320/520/720px hosts;
one/eight records; click/Enter/Space and hidden-focus behavior; exact normalized
DOM and non-geometric computed-style parity; light/dark text contrast; forced
colors; reduced motion; RTL; effective 200% text; user spacing; and extreme
localized content. Visual inspection confirms coherent hierarchy and no
clipping. Browser/server cleanup passed with port 4173 free.

D9 preserves its `589 B` component gzip baseline, adds zero neutral runtime and
leaves Product at `4,857 B` gzip, `467 B` below its fixed ceiling. The richer
record anatomy adds `52 B` to Product-family gzip and `6 B` to the already-open
neutral Web program gap; this is reported rather than hidden.

The implementation is technically refined but not stability-review ready.
Snapshot identity, provider truth, location ordering, asynchronous lifecycle,
selection/long-list scope, Shopify integration, final visual direction and
D9-specific owner/Figma evidence remain unresolved. D9 therefore stays
`pilot`, `refined-decision-needed` and explicitly not `stable`.
