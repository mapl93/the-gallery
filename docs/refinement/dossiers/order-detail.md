# Component Dossier: Order Detail

Status: `human-review-ready`

Target under review: Neutral Web passive single-order composition and
documented canonical-or-native target handoff

Contract: `components/contracts/order-detail.contract.json`

## Recommendation

Define U5 as a passive, title-labelled section for one authoritative order.
Keep the four semantic properties accepted by ADR 0078: required `title` and
optional `meta`, `tracking`, and `lineItems` slots. Order identifiers, dates,
financial and fulfillment truth, tracking stages, carrier events, estimated
delivery, prices, taxes, discounts, refunds, addresses, records, routes, and
lifecycle remain target-owned content inside those slots, not new root
properties.

Render the complete neutral shell only when `title` is non-empty. Use a native
`section.order-detail[aria-labelledby]`, a context-appropriate heading carrying
`.order-detail__title`, and an optional metadata region. A docs fixture may use
`time[datetime]`, but date formatting is not U5 behavior and heading rank stays
with the target context.

Replace the parallel `.order-tracking` anatomy and visual state system with a
canonical `Steps` composition inside `tracking` only when the provider supplies
a trustworthy finite ordered milestone model. U5 does not acquire a progress
state API: the target provides the ordered records and projects them to
canonical completed/current/upcoming Steps semantics. At most one item is
current, completed meaning has non-color text, and `aria-current="step"` remains
owned by Steps. Non-linear or uncertain provider facts use ordinary target-
authored semantic status content instead of inferred progress.

Keep purchased products as a canonical read-only Cart Line Item list. Quantity
is content in the details region, not a Quantity Selector. Do not include
remove, save-for-later, or cart-quantity mutation controls. Product navigation,
when useful and still available, remains the native Link inside Cart Line Item
and target routing owns its outcome.

U5 has no controlled/uncontrolled state and adds no neutral runtime. Its CSS
owns only named-container layout, section rhythm, heading/meta placement, and
content containment. Canonical Steps and Cart Line Item own their anatomy,
status visuals, list semantics, focus behavior, forced-colors behavior, and
dependency tokens.

Owner decision U5-A and ADR 0262 accept provider-trusted Steps plus explicitly
read-only Cart Line Item composition. ADR 0260 supplies the accepted canonical-
or-native account handoff. Contract maturity remains `pilot`; final visuals and
live protected-data/provider integration remain required before cross-target
readiness or `stable`.

## Purpose And Limits

- Presents the principal summary for one order within an account or supported
  order-status context.
- Gives the complete composition a descriptive heading and stable relationship
  to optional metadata, progress, and purchased items.
- Allows targets to supply localized and already-formatted order copy, dates,
  statuses, prices, quantities, destinations, and target-native records.
- Is not an authentication or authorization gate, order query, state machine,
  carrier tracker, ETA calculator, formatter, router, refund/return controller,
  cart, payment surface, telemetry client, or live-update coordinator.
- Does not prescribe a universal order-stage inventory, or collapse financial,
  fulfillment, return, and refund truth into one synthetic state.
- Does not own loading, error, unavailable, redacted, expired-session, or
  not-found UI. Targets compose those lifecycle surfaces outside passive U5.
- Does not expose addresses, payment details, totals, actions, tracking URLs,
  or fulfillment groups because no accepted U5 properties currently define
  those regions.

## Repository Baseline Before Refinement

- Registry and contract declare direct Badge and Cart Line Item dependencies.
  U5 does not currently compose Badge, while its bespoke tracking anatomy
  duplicates canonical Steps indicators, connectors, current/completed states,
  typography, colors, radius, and responsive responsibility.
- Contract `0.1.0`, `pilot`, declares ten anatomy parts, three states, three
  behaviors, four properties, and a target-owned tracking slot. It does not name
  the root from the required title, require a non-empty title, compose Steps,
  define missing-content behavior, clarify heading rank, preserve native dates,
  isolate formatted commerce content, or assign external lifecycle ownership.
- Studio builds a local `section` with `h2`, generic tracking `div`s, and a
  canonical Cart Line Item list. MDX independently builds an `article` with
  `h1`, separate fixture text, the same bespoke tracking classes, and serialized
  Cart Line Item markup. Exhibit and Studio therefore do not share exact U5
  implementation or fixture.
- Account CSS uses physical width/height/left/right/top properties, hardcoded
  `16px`, `24px`, `32px`, `20px`, `10px`, `2px`, `3px`, and `8px` values,
  calculated type, numeric weight, a success-color halo, and the complete
  duplicate progress visual system. U5 itself has no named container; a
  Studio-only container query changes the header instead.
- Existing Mobile/Desktop evidence shows only the default composition. It does
  not certify exact DOM/style parity, metadata/tracking/items omission, blank
  required title, native ordered progress, current/completed non-color meaning,
  read-only line items, keyboard Link focus/activation, Tablet/XL, direct narrow
  containers, localized/RTL/unbroken content, effective 200-percent reflow,
  dark mode, forced colors, or reduced motion.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` resolve to the generic Button Component Detail/Studio shell. They
  contain Button label/type/size/state/layout controls, not U5 anatomy or owner
  visual approval.
- Shopify copies Account CSS but has no selected latest-account extension,
  headless Customer Account API view, authenticated order mapping, explicit
  deprecated Liquid compatibility profile, or target evidence. CSS presence is
  not Order Detail readiness.
- Deterministic baseline: U5 CSS slice `2,045 B` raw / `709 B` gzip; Account CSS
  `15,956 B` raw / `3,009 B` gzip against the permanent `3,072 B` family
  ceiling; generated Web component CSS `508,191 B` raw / `68,458 B` gzip
  against the existing `65,536 B` program ceiling; shared runtime `53,811 B`
  raw / `10,501 B` gzip. U5 adds no neutral runtime.
- Baseline Account CSS SHA-256 is
  `721d0c165f9c2283e9561963e9bcf385956f3109c1be90eb28651dcd79f20cf7`.
  Baseline Exhibit/Studio Desktop SHA-256 values are
  `392f667b8bc9aa43a21f57f5072e2df4b50c3f8681dc3a442a3c58b9e9aa3df9`
  and `ccb8e856ee105cfbe6fdf3c1133734563aaa819c036cec5ed278e6a9abf75754`;
  Mobile values are
  `31c6e4fe1a595f1e57164b80b0748ca0a2e7ed1af9afb59a62d15c2297390b8a`
  and `ed408b4585d1d07e92aa1c54c3bc97eb9a203811e0b9bde5248f8ccd65117874`.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) and [G141 headings](https://www.w3.org/WAI/WCAG22/Techniques/general/G141) | Visual grouping and sections should have programmatically determinable structure; descriptive headings help navigation. | Name the U5 section from its required visible title and preserve semantic child collections. |
| [HTML `ol`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) | An ordered list represents items whose intentional order changes meaning. | Tracking stages use canonical Steps' native `ol/li` rather than generic divs. |
| [HTML `time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) | `time` couples visible content to a machine-readable `datetime`. | Target fixtures can preserve semantic order dates without making formatting part of U5. |
| [WAI-ARIA `aria-current`](https://www.w3.org/TR/wai-aria-1.3/#aria-current) | `step` identifies the current item in a step-based process and authors should mark only one current item in a set. | Reuse canonical Steps and never create a second U5 current-index API. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines no Order Detail or Stepper widget with a dedicated keyboard model. | U5 stays passive and uses native section/list/Link behavior; no roving focus or custom role. |
| [Open UI components](https://open-ui.org/components/) | The current inventory establishes no interoperable order-detail or commerce-tracking element. | Keep target truth in composition instead of inventing a custom element/state taxonomy. |
| [Radix Themes Data List](https://www.radix-ui.com/themes/docs/components/data-list) | Mature metadata presentation composes native key/value structure with canonical Badge and Link leaves. | Optional U5 metadata can compose mature leaves; the parent should not flatten every record into props or restyle dependencies. |
| [Shopify Order status page](https://shopify.dev/docs/apps/build/customer-accounts/order-status-page) | Shopify's hosted page owns viewing, managing, and tracking one order, with unauthenticated, pre-authenticated, and fully authenticated disclosure levels. | A Shopify mapping must respect platform authentication/redaction instead of treating neutral U5 as a universal public theme page. |
| [Shopify Order status targets](https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/order-status) | Hosted Order status already includes line items, fulfillment progress, customer information, and payment status plus defined extension targets. | Current-account extensions are target-native additions, not copied neutral DOM replacing the hosted page. |
| [Shopify theme templates](https://shopify.dev/docs/storefronts/themes/architecture/templates) | `customers/order` and the other legacy customer templates are deprecated because current customer accounts operate independently of themes. | Do not create a default modern Liquid customer-order template. |
| [Shopify Liquid `order`](https://shopify.dev/docs/api/liquid/objects/order) | Explicit legacy compatibility can access order URLs, localized financial/fulfillment labels, line items, and formatted money inputs. | A versioned deprecated profile is technically possible but must be selected explicitly and must not define neutral status truth. |

The references agree on descriptive semantic structure, an intentionally
ordered progress sequence, one current step, readable non-color status, native
date/list semantics, dependency composition, target-owned order data, and
security-aware disclosure. They do not agree on one universal tracking-stage
inventory, one combined commerce status, one heading rank, one metadata schema,
or one Shopify implementation profile.

## Matches, Differences, And Direction

- Keep required `title` and optional `meta`, `tracking`, and `lineItems`; do not
  add stage, current index, order date, order number, status, address, total,
  action, loading, error, or breakpoint properties.
- Require a trimmed title. Missing title omits the complete renderer rather than
  creating an unnamed section or visually titled generic div.
- Use `section.order-detail[aria-labelledby]`; the target selects the heading
  rank appropriate to its page outline. The docs renderer uses `h2` inside its
  existing Component Detail context.
- Let metadata accept target-owned semantic content. The fixture uses a native
  date, while target status Badges or key/value structures remain optional
  composition and do not make Badge a required U5 dependency.
- Map `tracking` to `ol.steps.order-detail__tracking`, using canonical Steps
  completed/current/upcoming semantics. The labels, descriptions, stage count,
  and current projection stay target data.
- Map `lineItems` to `section.order-detail__items[aria-label]` containing
  `ul.cart-lines` and canonical read-only Cart Line Item records. Item quantity
  is display content, not an editable control.
- Use a named inline-size container. Root rhythm and a private header threshold
  respond to U5 width, not viewport width or Studio-only overrides.
- Remove all `.order-tracking*` CSS and tokens. Steps owns connector, indicator,
  state, typography, color, radius, forced colors, overflow, and motion policy.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root | yes when valid | `section.order-detail[aria-labelledby]` | U5 semantic grouping/container |
| Header | yes | `header.order-detail__header` | U5 title/meta layout |
| Title | yes | context-appropriate heading `.order-detail__title[id]` | U5 label + target heading rank/copy |
| Metadata | no | `.order-detail__meta` semantic slot | target content; native/dependency leaves |
| Tracking | no | `ol.steps.order-detail__tracking[aria-label]` | canonical Steps + target records/truth |
| Items region | no | `section.order-detail__items[aria-label]` | U5 grouping + target accessible name |
| Items list | conditional | `ul.cart-lines` | canonical Cart Line Item collection profile |
| Purchased row | conditional/repeated | `li.cart-line` | canonical Cart Line Item + target data |

## State, Variant, Size, And Content Matrix

| Dimension | Direction |
| --- | --- |
| Visual variant | One neutral U5 profile; no public visual variant. |
| Size | One intrinsic profile; header stacking threshold is private container composition. |
| Required content | Non-empty title renders U5; blank/missing title omits the complete component. |
| Optional regions | Metadata, tracking, and line items are independently present/absent; empty wrappers are omitted. |
| Tracking projection | Target records become canonical completed/current/upcoming Steps; zero or one current item. |
| Purchased items | One or more complete read-only Cart Line Item records; no cart mutation controls. |
| Dependency interaction | Steps is passive; any product Link keeps native Cart Line Item behavior and target routing. |
| Lifecycle | Loading, redacted, error, unavailable, not-found, expired, and live-update states remain external composition. |
| Content stress | Short, long, localized, RTL, unbroken, 200px container, effective 200 percent, and large formatted values must remain contained. |

## Public API And Controlled State

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `title` | string | required non-empty | Visible section title/accessibility source; target supplies localized text and heading rank. |
| `meta` | slot | optional | Target-owned semantic date/status/supporting metadata. |
| `tracking` | slot | optional | Target-owned records projected through canonical Steps. |
| `lineItems` | slot | optional | Read-only canonical Cart Line Item collection. |

U5 has no controlled/uncontrolled state. The target owns authoritative order,
authentication/disclosure state, financial and fulfillment truth, tracking
updates, carrier events, routing, and lifecycle. Steps receives a controlled
projection but stores no second current stage. Native Links own activation and
the target owns navigation/focus/feedback after activation.

## Tokens, Runtime, And Performance Direction

- Retain only U5-owned layout, title, and metadata tokens: section/container
  spacing, heading family/size/line-height, body-small size/line-height, and
  primary/secondary text colors.
- Remove success, border, surface, and radius tokens used solely by the parallel
  tracking visual system. Canonical Steps already declares its public tokens.
- Private custom properties may name U5 region/header gaps and a container
  threshold. Do not expose breakpoint, alignment, padding split, heading rank,
  connector, dot size, or tracking colors as properties or public tokens.
- Passive neutral runtime budget is `0 B`: no listener, observer, timer, fetch,
  auth SDK, state mapper, formatter, tracker, or live region.
- Account family ceiling remains `3,072 B` gzip. U5 begins with only `63 B`
  headroom, so deleting the duplicated tracking implementation is required
  before adding semantic/container rules.

## Accessibility And Responsive Requirements

- Name the section from its required visible title via `aria-labelledby`; avoid
  duplicate hidden labels and do not render a blank-titled landmark.
- Preserve context-correct heading hierarchy. The component contract does not
  hardcode a universal `h1` or use ARIA heading roles.
- Preserve `time[datetime]` whenever target metadata represents a date/time.
- Use canonical native `ol/li` Steps with no custom Step role, no `aria-selected`,
  no roving tabindex, and at most one `aria-current="step"`.
- Ensure completed/current meaning is readable without connector/indicator
  color; decorative icons remain hidden from assistive technology.
- Keep purchased products in native `ul/li`, with descriptive product Links
  only when a valid destination exists. Do not expose cart mutation controls.
- Keep DOM/reading order title, metadata, tracking, items at every container
  width. Header layout may stack visually without CSS reordering.
- Preserve Steps' internal horizontal overflow when the target keeps horizontal
  orientation in a very narrow container; the page itself must not overflow.
- Forced colors and reduced motion remain dependency-owned; U5 adds no motion.
- Targets must protect sensitive fields and enforce the correct authorization or
  redaction level before providing any U5 content.

## Cross-Target Translation

| Target | Translation | Readiness boundary |
| --- | --- | --- |
| Neutral Web | Labelled passive section, semantic metadata, canonical Steps and Cart Line Item composition. | Implementable and browser-certifiable with zero U5 runtime. |
| Shopify v1 theme/current accounts | Shopify-hosted Order status page. | Accepted intentional native handoff; neutral U5 does not replace the hosted page and makes no parity claim. |
| Shopify customer-account extension | Target-native supported Order status extension or controlled full-page surface. | May project U5 semantics when it owns the view; packaging, disclosure, APIs and target evidence remain required. |
| Shopify headless | Canonical U5 view fed by Customer Account API/order state with an explicit authentication/redaction policy. | Valid target-controlled projection; data, disclosure, routes, formatting, progress truth and lifecycle remain integration-owned. |
| Shopify legacy compatibility | Explicit deprecated `customers/order` profile using Liquid order fields, localized labels, line items and money filters. | Separately versioned compatibility only; never the v1 default or automatic fallback. |
| Webflow / Framer | Canonical CSS projection plus project-owned secure account/data/router provider. | Visual composition available; order data and lifecycle remain target-owned. |
| React / Angular / Hydrogen | Thin semantic wrapper composed from framework adapters for Steps and Cart Line Item over external state. | Contract-ready; no framework dependency or second state store in base source. |
| Figma | Auto-layout section using canonical Steps and Cart Line Item instances. | Planned; registered Button nodes are not U5 artwork or visual approval. |
| SwiftUI / Compose | Native titled detail group, ordered progress, and read-only purchased-item list. | Conceptual; preserve native navigation/list/accessibility and platform data security. |

## Risks, Alternatives, And Remaining Integration

1. Targets must prove that any Steps sequence is a trustworthy provider model.
   Partial, split, pickup, digital, cancelled, returned and refunded orders may
   require ordinary status content instead of a linear composition.
2. Targets must place financial and fulfillment facts truthfully in metadata or
   another target-owned composition when they are not part of a trustworthy
   ordered milestone model.
3. Shopify v1 theme translation is resolved as hosted Order status handoff.
   Extension, headless and compatibility profiles still require independent
   authentication, redaction, packaging, data, routing and evidence work.
4. Human review must approve title/meta hierarchy, spacing, tracking density,
   horizontal narrow behavior, Cart Line Item density, responsive threshold,
   fixture language, and corrected U5-specific Figma artwork.
5. Targets must define authorization/redaction, loading/error/not-found/expired
   behavior, carrier freshness, date/currency/tax/refund formatting, real product
   destinations, disclosure, focus, announcements, privacy, telemetry, and
   analytics.

Alternative A is the recommended passive titled section with canonical Steps
and Cart Line Item composition. Alternative B keeps bespoke tracking anatomy;
it is rejected because it duplicates a certified dependency and creates two
state/token/accessibility systems. Alternative C removes tracking entirely and
lets each target build arbitrary content; it preserves freedom but loses a
useful canonical composition direction. Alternative D makes U5 a complete order
domain model with flattened properties; it is rejected without product and
architecture approval because target order schemas and disclosure policies are
not stable across platforms.

## Planned Certification Evidence

- Exact shared Exhibit/Studio renderer, fixture, normalized DOM, and equal-width
  computed-style parity.
- Required-title omission; independent metadata/tracking/line-items omission;
  canonical ordered progress; at most one current step; readable completed
  meaning; semantic date; native purchased-items list; no mutation controls.
- Native product-Link keyboard focus/activation with site-only feedback outside
  U5, no U5 live region, and no custom progress keyboard model.
- Mobile, Tablet, Desktop, XL, direct narrow/wide component widths, localized
  RTL/unbroken 200px content, and effective 200-percent reflow.
- Light/dark contrast, forced colors, reduced motion, page/component overflow,
  console, and target-generated-copy identity.
- Contract, Studio, docs, registry, dependency graph, neutral Web, Shopify
  adapter, official Shopify theme validation, temporary production build,
  performance hashes, `site/dist` cleanliness, and owned-resource cleanup.

## Certification Result

- The shared `OrderDetailArtwork` now supplies exact normalized Exhibit/Studio
  DOM. At an equal `480px` root width, complete computed-style signatures are
  identical.
- The default fixture exposes one title-labelled section, semantic date, native
  four-item Steps sequence, two readable completed stages, one current stage,
  one native purchased-items list, one product Link, zero mutation controls,
  and zero U5 live regions.
- Keyboard-operable Studio controls verify independent metadata, tracking, and
  line-item omission; title-only remains valid, a blank required title omits U5,
  and Reset restores the full fixture.
- Product activation preserves native Link behavior and produces site-only
  feedback outside U5. Chromium's native overflow-container focus reaches Steps
  before the Link without an author tabindex or custom progress keyboard model.
- Mobile, Tablet, Desktop, XL, direct `320px`, localized RTL/unbroken `200px`,
  effective 200 percent, light/dark contrast, forced colors, reduced motion,
  and component/document overflow checks pass. Narrow Steps overflow remains
  dependency-owned and does not overflow the page.
- U5 shrinks from `2,045 B` raw / `709 B` gzip to `1,414 B` raw / `535 B`
  gzip. Current Account CSS is `2,853 B` gzip against the `3,072 B` ceiling,
  leaving `219 B` headroom. U5 adds `0 B` runtime.
- Canonical, Webflow, and Shopify Account CSS are byte-identical. Neutral Web,
  Shopify, contracts, Studio, docs, TypeScript, static previews, temporary
  production build, official Shopify validation, `site/dist` cleanliness, and
  evidence-resource cleanup pass.
- U5 is `human-review-ready` and remains `pilot`: live protected-data/provider
  integration, final visual review, and corrected component-specific owner
  artwork remain pending. Current Account CSS is `2,853 / 3,072 B` gzip with
  `219 B` headroom; U5 remains `1,414 B` raw / `535 B` gzip and adds `0 B`
  runtime.
