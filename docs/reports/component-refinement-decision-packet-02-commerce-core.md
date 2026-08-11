# Component Refinement v1 Decision Packet 02: Commerce Core

Status: `owner-decisions-recorded`

Snapshot: 2026-07-19

Owner resolution: [component refinement owner decision responses](../refinement/owner-decision-responses.md).
The recommendations below remain the historical proposal and evidence packet;
the linked response ledger is authoritative wherever the accepted direction
differs.

This packet consolidates the remaining human decisions for the earliest
dependency families after the twelve architecture blockers: four primitives,
nine Product components, four Collection components and the related Reviews
rating display. All eighteen implementations already have final technical
candidates and four-viewport evidence. These choices decide whether those
candidates can enter the human stability-review queue; they do not promote any
contract to `stable`.

The shared rules and approval meaning from
[`component-refinement-decision-packet.md`](component-refinement-decision-packet.md)
apply here unchanged.

## Primitive Decisions

### A22 — Progress

**Recommended (`A22-A`): split visible and accessible value text.** Keep Bar and
Circle determinate, and Bar-only Indeterminate. Add a compact visible value
property for the fixed Circle interior and keep a separate localized
`aria-valuetext` for the complete accessible meaning. Neither value is
truncated, scaled unpredictably or reused as the other's fallback.

Alternative `A22-B` restricts the existing `valueText` to compact copy and
documents that constraint. Alternative `A22-C` hides or responsively scales
long visible text, which risks obscuring meaning.

Evidence: [dossier](../refinement/dossiers/progress.md) and
[audit](progress-web-refinement-audit.md).

### A11 + V2 — Passive Rating Displays

**Recommended (`A11-A`): consolidate the two passive displays into canonical
`rating`.** Keep A11's consumer-facing identity, absorb V2's target-supplied
half-step value, required localized label and `default | lg` presentation, and
retain an optional passive localized review count. Deprecate `star-rating`
through a documented migration. Star Input remains the separate interactive
native radio group.

The target owns provider-scale normalization, rounding, missing/zero policy,
aggregate synchronization, structured data and whether the review count becomes
an adjacent Link. The neutral display remains passive and runtime-free.

Alternative `A11-B` retains both only with a permanent selection rule: A11 is a
compact commerce projection and V2 is a richer Reviews projection. Category
membership alone is not a sufficient boundary.

Evidence: [A11 dossier](../refinement/dossiers/rating.md),
[A11 audit](rating-web-refinement-audit.md),
[V2 dossier](../refinement/dossiers/star-rating.md), and
[V2 audit](star-rating-web-refinement-audit.md).

### A13 — Empty State

**Recommended (`A13-A`): target-owned contextual heading rank.** Keep required
title content in the neutral anatomy, but let each page, panel, dialog or
section adapter provide the appropriate native heading element. Do not expose a
visual `headingLevel` Studio control and do not demote the title to ordinary
text. The optional recovery action remains one canonical Button-or-Link slot.

Alternative `A13-B` adds a cross-target heading-level property. Alternative
`A13-C` removes heading semantics from the component and requires every host to
label the surrounding region independently.

Evidence: [dossier](../refinement/dossiers/empty-state.md) and
[audit](empty-state-web-refinement-audit.md).

### A15 — Avatar

**Recommended (`A15-A`): explicit image-or-initials composition with
target-owned fallback.** The target supplies either context-appropriate native
image markup or pre-derived one/two-grapheme initials. Image loading, failure,
responsive sources, CDN transformation and initials derivation stay in the
target. Use a discrete semantic type step for each accepted 32/40/56/80px size;
do not inherit one fixed 15px value.

Alternative `A15-B` defines formal image-plus-fallback parts and a neutral
loading/error lifecycle. Alternative `A15-C` exposes a public content mode.
Either alternative expands component state and target mapping substantially.

Evidence: [dossier](../refinement/dossiers/avatar.md) and
[audit](avatar-web-refinement-audit.md).

## Product Decisions

### D1 — Product Card

**Recommended (`D1-A`): bounded semantic media ratios.** Keep `square` as the
default and add `portrait` as the only additional v1 ratio. Do not expose an
arbitrary numeric ratio. Grids, sliders and recommendations consume the same
property; targets own image sources, focal point, missing-media fallback,
responsive delivery and loading priority. The current repository candidate is
the provisional visual reference for human review.

Alternative `D1-B` keeps square only. Alternative `D1-C` makes portrait the
single default. A reusable cross-target media slot may be designed later; v1
does not encode Web URLs or Shopify image objects in neutral source.

Evidence: [dossier](../refinement/dossiers/product-card.md) and
[audit](product-card-web-refinement-audit.md).

### D2 — Product Gallery

**Recommended (`D2-A`): image-only finite gallery for v1.** Keep one featured
image, direct named thumbnail Buttons and compact pagination. On narrow
containers use compact pagination as the visible selector; on larger containers
use thumbnails, rather than rendering both control sets simultaneously.
Lightbox is optional target composition and is not required by D2. Zoom, pan,
swipe, autoplay, loop, video, 3D and AR remain later product capabilities.

Neutral Web retains its bounded progressive enhancement. Framework targets may
offer controlled current id and uncontrolled initial id over the same state,
without running the DOM enhancement at the same time.

Alternative `D2-B` requires canonical Lightbox in v1. Alternative `D2-C`
requires rich Shopify media parity before review and therefore expands the
cross-target contract.

Evidence: [dossier](../refinement/dossiers/product-gallery.md) and
[audit](product-gallery-web-refinement-audit.md).

### D3 — Product Info

**Recommended (`D3-A`): selected-variant projection under one product
coordinator.** Product Info stays passive. Before a selection resolves, Price
may show a target-formatted product range; afterward it shows the selected
variant Price. One page/Quick View coordinator atomically owns Price, SKU,
inventory, availability, media, URL, structured data and at most one localized
update status.

Rich description remains target-sanitized content. Shopify v1 should map the
candidate through merchant-reorderable theme blocks/app-block-compatible Main
Product composition before target-ready status, but that editor architecture
does not enter the neutral component API. The repository candidate is the
provisional visual reference.

Alternative `D3-B` always shows product-level range Price. Alternative `D3-C`
always requires a selected variant before rendering Price.

Evidence: [dossier](../refinement/dossiers/product-info.md) and
[audit](product-info-web-refinement-audit.md).

### D4 — Variant Selector

**Recommended (`D4-A`): inspectable commercial unavailability.** Sold-out
values remain selectable so the target can explain and coordinate them;
nonexistent combinations and genuinely unusable values use native `disabled`.
One product coordinator owns combination resolution and every dependent
surface. The legend keeps the selected value visibly present; each swatch still
has a complete accessible label, without tooltip-only naming.

Shopify high-variant/combined-listing live behavior is a target maturity gate,
not a reason to weaken the neutral native-radio contract. The repository
candidate is the provisional visual reference.

Alternative `D4-B` disables every non-purchasable value. Alternative `D4-C`
allows policy per target, but must preserve the contract distinction between
commercial unavailability and native disabled state.

Evidence: [dossier](../refinement/dossiers/variant-selector.md) and
[audit](variant-selector-web-refinement-audit.md).

### D5 — Product Form

**Recommended (`D5-A`): native submission baseline plus optional target Ajax
enhancement.** The real form and FormData always work without JavaScript. A
target may progressively intercept submission to update Cart Drawer/sections,
but it owns pending, error, retry, focus, announcements, rollback and cart-count
synchronization. One product coordinator also owns the resolved merchandise id
and dependent product state.

Exclude accelerated checkout and generic supplementary-field slots from the
neutral v1 contract. Selling plans, personalization, uploads, gifts and preorder
flows enter only through separately accepted canonical compositions. The target
may omit Quantity or fix it to one for one-of-one work. The repository candidate
is the provisional visual reference.

Alternative `D5-B` requires Ajax as the only v1 path. Alternative `D5-C` expands
v1 with accelerated checkout or generic custom fields and needs a separate
product contract.

Evidence: [dossier](../refinement/dossiers/product-form.md) and
[audit](product-form-web-refinement-audit.md).

### D7 — Size Chart

**Recommended (`D7-A`): target-authored complete tables in canonical Modal.**
Keep the current Modal/Data Table/optional Segmented Control profile. Targets
supply complete localized measurement tables and units; neutral source performs
no conversion, rounding or fit calculation. Web v1 remains a centered Modal at
all sizes rather than silently becoming a Sheet. Inline charts are separate
target composition.

For Shopify, use a product-referenced metaobject containing complete chart
records and notes. Define a bounded editor schema per merchant vertical rather
than a universal apparel/footwear/object converter. Very large matrices must use
a different target presentation rather than forcing the modal to virtualize or
restructure data.

Alternative `D7-B` stores one numeric dataset and adds a shared converter.
Alternative `D7-C` stores the chart directly in section blocks. Alternative
`D7-D` allows target-specific Modal/Sheet presentation and gives up exact mode
parity.

Evidence: [dossier](../refinement/dossiers/size-chart.md) and
[audit](size-chart-web-refinement-audit.md).

### D8 — Back In Stock

**Recommended (`D8-A`): target/provider-backed selected-variant request.** Bind
the form to the current variant and market. “Back in stock” means the selected
provider later confirms the variant is purchasable under that market's policy;
preorder, backorder, incoming and reserved states are not silently equivalent.
Marketing consent remains separate from service-notification consent.

The target owns provider, verification, idempotency, abuse limits, retention,
delivery, retry and unsubscribe. After confirmed success, keep the form present
but disabled with truthful adjacent status so focus is not lost; error keeps the
form available for retry. Shopify v1 should use an app/provider block rather
than a theme-owned notification database.

Alternative `D8-B` binds requests to the product rather than variant.
Alternative `D8-C` excludes this component from Shopify v1 until a provider is
selected.

Evidence: [dossier](../refinement/dossiers/back-in-stock.md) and
[audit](back-in-stock-web-refinement-audit.md).

### D9 — Pickup Location Selector + D9a — Store Locator

**Accepted (`D9-C`): split transactional pickup selection from general branch
discovery.** Pickup Location Selector searches target-supplied locations that
are eligible for the exact current product, variant and market. One canonical
Radio group emits a stable selected location id as pickup intent; selection
does not reserve inventory or promise fulfilment. Product Form, Cart or Checkout
owns final confirmation and stale-intent repair.

Store Locator reuses the manual-search lifecycle for general branch discovery
without product context. It exposes complete native list/article/address/Link
content and never selects a transactional or preferred store. Both require a
complete list, keep manual search available, request geolocation only after an
explicit action and may compose a synchronized map only as progressive content.
Providers, geocoding, permissions, map services, ordering, requests and target
integration remain outside neutral source. ADR 0244 records the accepted split.

Evidence: [Pickup Location Selector dossier](../refinement/dossiers/pickup-location-selector.md),
[Pickup Location Selector audit](pickup-location-selector-web-refinement-audit.md),
[Store Locator dossier](../refinement/dossiers/store-locator.md), and
[Store Locator audit](store-locator-web-refinement-audit.md).

### D10 — Subscription Option

**Accepted (`D10-A`): one-time plus explicit recurring allocations.** A
named purchase-options Fieldset contains a one-time Radio and one Radio per
eligible recurring allocation/selling-plan choice. One-time is the default when
available; subscription-only products omit that nonexistent choice and must
still provide at least two meaningful options or use a simpler non-radio
presentation.

The target owns selling-plan groups, eligibility, payload conversion and stale
selection clearing. Price copy must explicitly identify checkout charge,
per-delivery amount and cadence. Savings render only when the target supplies a
verified localized calculation. Terms remain visible target-authored content;
selected detail stays inline for v1. Shopify maps native selling-plan
allocations through the product coordinator. ADR 0246 records the accepted
group architecture and supersedes the provisional ADR 0216 model.

Alternative `D10-B` uses one Radio for a recurring group plus nested Select.
Alternative `D10-C` creates a higher-level Purchase Options component for dense
multi-group offerings.

Evidence: [dossier](../refinement/dossiers/subscription-option.md) and
[audit](subscription-option-web-refinement-audit.md).

## Collection Decisions

### E3 — Filter Panel

**Accepted (`E3-A` plus configurable commitment): one canonical form/control
tree rendered as an adjacent panel or Drawer.** The public identity migrates
from Collection Filters to domain-neutral Filter Panel without a permanent
alias. Its owning container selects an adjacent non-modal panel when coherent
and canonical modal Drawer when constrained; viewport width alone and duplicate
desktop/mobile forms are prohibited.

`immediate | manual` is the accepted semantic commit policy, with `immediate`
as default. Immediate change requests are committed; Manual maintains one draft
projection with canonical Apply/Cancel, where Cancel restores committed values
without URL mutation. Capable Web/Shopify targets own query parameters,
URL/history, requests, results/status, focus and pagination reset. Groups remain
always visible in v1, while sort and result count belong to the parent
collection composition.

Historical alternatives kept inline expansion at every width, a manual-only
policy or a wholly target-specific shell. ADR 0250 records the owner resolution
and supersedes ADR 0121's deferrals.

Evidence: [dossier](../refinement/dossiers/filter-panel.md) and
[audit](filter-panel-web-refinement-audit.md).

### E5 — View Toggle

**Accepted (`E5-B`): canonical Segmented Control/native Radio.** Keep fixed
Grid/List identities, one Tab entry point, logical arrow navigation, one
target-owned `activeView`, and an icon plus visible text in each joined segment.
Omit E5 whenever only one layout is real. Grid is the neutral initial default
unless the target explicitly supplies a merchant, URL or account preference.
Neutral source stores nothing and emits no result status; the target coordinator
preserves filters/sort/pagination and owns any useful localized announcement.

Historical recommendation `E5-A` retained pressed Toggle Buttons. `E5-C` omits
E5 from Shopify v1. Owner resolution selects `E5-B`.

Evidence: [dossier](../refinement/dossiers/view-toggle.md) and
[audit](view-toggle-web-refinement-audit.md).

### E6 — Collection Promo

**Accepted (`E6-A`): first-party editorial promo with optional explicit
CTA.** Keep one passive article inside a real Collection Grid item. The target
owns eligible pages, insertion index and frequency. Sponsored/paid promotions
are excluded from neutral v1. `span-2` is available only when the parent grid
has at least two coherent tracks. A complete CTA label/href pair is optional;
the title and whole card remain passive.

Shopify maps E6 as an explicit Collection Grid block/record that does not alter
product pagination or counts. Heading rank and destination metadata remain
target-owned.

Historical alternative `E6-B` requires one destination. Alternative `E6-C` makes the whole
article one native Link only if no other interaction can ever appear.
Alternative `E6-D` omits inline promos from targets that cannot preserve source
order and pagination truth. Owner resolution selects `E6-A`.

Evidence: [dossier](../refinement/dossiers/collection-promo.md) and
[audit](collection-promo-web-refinement-audit.md).

### E7 — Empty Collection

**Accepted (`E7-A`): retain the zero-visual-delta Collection profile over
Empty State.** The target supplies truthful resolved-empty copy and one optional
Button-or-Link recovery. No public cause enum is added. Source inventory empty,
filtered/search zero and merchandising exclusion remain target lifecycle facts;
the target atomically controls Grid/Pagination/filter visibility, URL/history,
status and focus. Heading rank inherits `A13-A`.

The component does not create an automatic live region. A qualifying dynamic
transition may update one pre-existing target status. Shopify must distinguish
empty inventory from filtered no-results in its source data before rendering.

Historical alternative `E7-B` collapses the registry component into direct Empty State
documentation. Alternative `E7-C` adds cause-specific variants only after every
target's truth and recovery contract is accepted. Owner resolution selects
`E7-A` without a public cause enum.

Evidence: [dossier](../refinement/dossiers/empty-collection.md) and
[audit](empty-collection-web-refinement-audit.md).

## Approval And Exception Format

The recommended commerce-core package can be accepted with:

> Approve decision packet 02 recommendations A22-A, A11-A, A13-A, A15-A,
> D1-A, D2-A, D3-A, D4-A, D5-A, D7-A, D8-A, D9-A, D10-A, E3-A, E5-B,
> E6-A and E7-A for human-review candidates. This is not stable or final visual
> approval.

An exception may name only the changed choices, for example:

> Approve packet 02 except D1-B and E5-B.

Approval authorizes the final ADR/reconciliation work and moves each technically
complete candidate into the human review queue when its evidence remains valid.
Visual approval still happens component by component, and target integrations
remain at their truthful maturity rather than being reported as complete by
association.
