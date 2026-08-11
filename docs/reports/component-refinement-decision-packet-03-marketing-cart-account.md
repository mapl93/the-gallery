# Component Refinement v1 Decision Packet 03: Marketing, Cart, And Account

Status: `owner-decisions-recorded`

Snapshot: 2026-07-19

Owner resolution: [component refinement owner decision responses](../refinement/owner-decision-responses.md).
The recommendations below remain the historical proposal and evidence packet;
the linked response ledger is authoritative wherever the accepted direction
differs.

This packet consolidates the remaining human decisions for three Marketing,
four Cart and nine Account components. Their neutral implementations are already
technically refined. Approval moves them into the human stability-review queue;
it does not assert that a provider, commerce workflow or Shopify account surface
exists, and it does not promote any contract to `stable`.

The shared rules and approval meaning from
[`component-refinement-decision-packet.md`](component-refinement-decision-packet.md)
apply here unchanged.

## Family-Level Account Boundary

**Recommended (`U0-A`): targets own identity and account services.** Neutral
Account components remain passive shells or canonical Form/control
compositions. They never authenticate, authorize, fetch protected customer data,
persist changes, select routes or invent account status. Shopify's first v1
mapping uses the current customer-account extension/API model. Classic customer
Liquid, when maintained, is an explicitly versioned compatibility adapter rather
than the shared source architecture.

Alternative `U0-B` makes classic Shopify customer templates the first account
target. Alternative `U0-C` leaves Shopify Account components omitted while
neutral Web/framework candidates proceed.

## Marketing Decisions

### G2 — Newsletter

**Recommended (`G2-A`): target-owned response lifecycle.** Newsletter remains a
thin title/copy/privacy-note composition around canonical native Input, Form and
Button. Neutral source exposes one optional response placement but no universal
pending, success, error, retry, duplicate or provider state. The target reports
only confirmed results and owns consent, persistence and submission.

Shopify v1 maps its native customer form and server-confirmed errors/success.
The docs fixture explicitly states that no subscription was sent.

Alternative `G2-B` standardizes a neutral request/result state machine and
requires one provider-independent event and focus contract.

Evidence: [dossier](../refinement/dossiers/newsletter.md) and
[audit](newsletter-web-refinement-audit.md).

### G8 — Urgency

**Owner-selected (`G8-B`): retain all four types with target-supplied proof
contracts.** Low Stock, Selling Fast, Viewers and Recent Sale remain passive,
non-live and runtime-free. ADR 0252 records the accepted source, qualification,
freshness, privacy and omission boundary for each type. A production adapter
must prove those target facts; copied CSS or merchant-entered example copy is
not certification.

Evidence: [dossier](../refinement/dossiers/urgency.md) and
[audit](urgency-web-refinement-audit.md).

### G10 — Social Proof

**Recommended (`G10-A`): retain a passive Social Proof profile of canonical
Toast, but omit it from Shopify v1 until a provider is selected.** The profile
may show one verified, current and privacy-approved statement with optional
media/time and canonical dismissal. It has no default live role, no synthetic
identity, no queue and no neutral timing/runtime. The target owns truth,
qualification, anonymisation/consent, freshness, expiry, placement and feed
lifecycle.

Alternative `G10-B` deprecates the registry component and documents a Toast
recipe. Alternative `G10-C` changes it into an in-flow passive activity list.

Evidence: [dossier](../refinement/dossiers/social-proof.md) and
[audit](social-proof-web-refinement-audit.md).

## Cart Decisions

### K1 — Cart Page

**Owner-selected (`K1-A`): populated-cart composition with configurable safe
summary placement.** K1 requires title, a non-empty canonical Cart Line Item
collection and canonical Cart Summary. Canonical Cart Empty remains the
mutually exclusive empty-page composition outside K1. The accepted semantic
property is `summaryPlacement: sticky | flow`, defaulting to sticky. Both modes
use the same summary and cart snapshot. Narrow, short, zoomed or otherwise
incapable contexts degrade to flow; the target owns its real header/safe-area
offset, available height, collision and focus-not-obscured proof.

The target owns one coherent cart snapshot, mutations, pending/error/status,
focus after removal, count, checkout navigation and Shopify section refresh.
Continue Shopping renders only with a complete real Link.

This owner response selects the populated-only boundary and the configurable
sticky/flow API recorded by ADR 0254. It rejects an integrated empty slot and
does not expose offset, breakpoint, height or collision details as public API.

Evidence: [dossier](../refinement/dossiers/cart-page.md) and
[audit](cart-page-web-refinement-audit.md).

### K8 — Quick View

**Recommended (`K8-A`): focused Modal product profile.** Compose canonical
Modal, Product Gallery, Price, optional Product Form and a real full-details
Link. One target product coordinator owns loading, selected variant,
availability, commerce submission and feedback. Modal owns focus, dismissal,
inertness and restoration. Quick View adds no second overlay or product state.

The accepted owner response supersedes this packet's original image-only
milestone: K8 inherits D2-C's complete image, hosted-video, external-video and
model Gallery plus D5's native-form/Ajax boundary. The same Product Gallery uses
`imageDetail: none` inside Quick View, so selection and rich-media interaction
remain available without nested Lightbox. Shopify opens Quick View only when
its target can load and coordinate a complete product snapshot; otherwise it is
omitted rather than showing stale partial data.

Alternative `K8-B` makes Quick View read-only with no Product Form. Alternative
`K8-C` removes the separate component and navigates directly to product detail.

Evidence: [dossier](../refinement/dossiers/quick-view.md) and
[audit](quick-view-web-refinement-audit.md).

### K9 — Sticky Add To Cart

**Recommended (`K9-A`): target-controlled secondary submitter.** K9 appears only
when the main Product Form action is no longer usefully visible and the current
product is purchasable. Its canonical Button submits the existing form by native
`form` association; K9 never creates another form or merchandise state. The
target owns visibility observation, pending/result, safe-area reservation,
collision, analytics and focus.

Hidden K9 is omitted or natively unavailable. Neutral source adds no observer
or runtime. Shopify may implement the visibility coordinator only on a real Main
Product consumer and must reserve content space so focused controls are not
covered.

Alternative `K9-B` keeps K9 always visible. Alternative `K9-C` excludes the
fixed surface from neutral v1 and documents it as a target recipe.

Evidence: [dossier](../refinement/dossiers/sticky-atc.md) and
[audit](sticky-atc-web-refinement-audit.md).

### K11 — Gift Wrap

**Recommended (`K11-A`): one order-level sellable gift-wrap line.** The native
Checkbox requests addition/removal of one dedicated target product/variant with
quantity one. This makes the charge explicit in totals, checkout, tax, refunds
and fulfillment rather than hiding money in a cart attribute. The target owns
eligibility, line identity, idempotency, discounts, shipping/tax policy,
mutation, mixed carts and error recovery.

Neutral Gift Wrap remains one Checkbox plus optional canonical Price and emits
only native checkedness. Shopify maps the dedicated variant and reconciles the
Checkbox from the authoritative cart after each mutation.

Alternative `K11-B` uses a non-priced order-level cart attribute. Alternative
`K11-C` uses per-line properties. Alternative `K11-D` omits gift wrap from v1.

Evidence: [dossier](../refinement/dossiers/gift-wrap.md) and
[audit](gift-wrap-web-refinement-audit.md).

## Account Decisions

### U1 — Authentication Entry

**Recommended (`U1-A`): one passive authentication shell, target-selected
route.** U1 requires title and one canonical Form composition. Sign-in,
registration, MFA, passkeys and provider handoff are separate target routes or
flows, not visual variants of U1. The target owns credentials, session, generic
errors, rate limiting, redirects and analytics. Shopify follows `U0-A`.

Alternative `U1-B` standardizes distinct Login/Register variants and their
field/API requirements in neutral source.

Evidence: [dossier](../refinement/dossiers/auth-forms.md) and
[audit](auth-forms-web-refinement-audit.md).

### U2 — Password Reset

**Recommended (`U2-A`): target-controlled exclusive request and confirmed
states.** The request state composes Form/Input/Button. After a confirmed
provider response, the target replaces it with canonical Alert and moves focus
to the Alert heading/status only when replacement would otherwise strand the
user. Errors retain the form and associate field/global feedback truthfully.

The neutral shell does not expose a universal success boolean; target
composition selects one complete state. Shopify follows `U0-A`.

Alternative `U2-B` keeps the request form alongside confirmation. Alternative
`U2-C` publishes an explicit neutral state enum and transition contract.

Evidence: [dossier](../refinement/dossiers/password-reset.md) and
[audit](password-reset-web-refinement-audit.md).

### U3 — Account Dashboard

**Recommended (`U3-A`): target-owned navigation overview.** Keep one labelled
section and native list of canonical Card/Link destinations, with optional
canonical account actions. The target supplies greeting, routes, counts,
authorization and personalization; U3 has no data or navigation runtime.
Shopify maps the current customer-account home surface under `U0-A`.

Alternative `U3-B` removes U3 from neutral source and treats each target's
account home as a page composition.

Evidence: [dossier](../refinement/dossiers/account-dashboard.md) and
[audit](account-dashboard-web-refinement-audit.md).

### U4 — Order History

**Recommended (`U4-A`): passive target-formatted order list.** Each item contains
one descriptive Link, native `time`, canonical Badge with readable target status
and formatted total. Financial and fulfillment statuses remain separate target
facts projected into one localized summary; U4 does not publish a universal
status enum. Pagination, loading, empty/error and auth expiry remain host
composition. Shopify follows `U0-A`.

Alternative `U4-B` standardizes a cross-target order/status record schema.

Evidence: [dossier](../refinement/dossiers/order-history.md) and
[audit](order-history-web-refinement-audit.md).

### U5 — Order Detail

**Recommended (`U5-A`): passive authoritative-order composition.** Target-owned
meta, tracking and line-item slots remain the API. Tracking composes canonical
Steps only when the provider supplies a trustworthy ordered milestone model;
otherwise the target uses ordinary status content. Purchased items are
read-only Cart Line Items, never cart mutation controls. Shopify follows
`U0-A`.

Alternative `U5-B` defines a universal tracking-stage enum. Alternative `U5-C`
removes Steps and keeps all tracking target-native.

Evidence: [dossier](../refinement/dossiers/order-detail.md) and
[audit](order-detail-web-refinement-audit.md).

### U6 — Address Book

**Recommended (`U6-A`): explicit target-owned actions with protected delete.**
Saved addresses form one native list with at most one target-confirmed default.
Edit and Add are canonical actions. Delete requires target confirmation or an
equivalent undo path; Set Default is exposed only when the target supports it.
Mutations wait for authoritative confirmation before removing/reordering records
and deliberately restore focus/status. Shopify follows `U0-A`.

Alternative `U6-B` uses optimistic removal with mandatory undo. Alternative
`U6-C` leaves every action outside U6 as target composition.

Evidence: [dossier](../refinement/dossiers/address-book.md) and
[audit](address-book-web-refinement-audit.md).

### U7 — Address Form

**Recommended (`U7-A`): add canonical Form as a dependency while keeping the
field schema target-owned.** U7 owns only native form composition and
container-responsive layout. Targets supply locale-specific field inventory,
order, names, autocomplete, validation and mutation. Submit is explicit;
Cancel is optional navigation/close composition and never implies reset.

Server/custom errors use canonical field messages plus a useful error summary
when needed. Shopify follows `U0-A` and its platform address schema.

Alternative `U7-B` keeps the native form root without formal Form dependency.
Alternative `U7-C` standardizes one international address schema in neutral
source.

Evidence: [dossier](../refinement/dossiers/address-form.md) and
[audit](address-form-web-refinement-audit.md).

### U8 — Wishlist

**Recommended (`U8-A`): authenticated account persistence for v1.** Wishlist is
one target-controlled Product Card list. Per-card Remove is a canonical command,
not a pressed toggle. The target confirms removal, updates count/empty state,
places focus deliberately and offers undo when feasible. Anonymous local-device
wishlist and sign-in merge are deferred rather than inferred.

Shopify first maps a customer-account/headless app service under `U0-A`; a theme
with no service omits Wishlist. A future reusable Save toggle requires its own
canonical owner and controlled persistence contract.

Alternative `U8-B` is anonymous local persistence. Alternative `U8-C` is a
hybrid with sign-in merge. Alternative `U8-D` makes each Product Card action a
controlled Save toggle.

Evidence: [dossier](../refinement/dossiers/wishlist.md) and
[audit](wishlist-web-refinement-audit.md).

### U9 — Account Settings

**Recommended (`U9-A`): documented mixture by section.** Profile-like edits use
explicit canonical Forms; effects that truly apply immediately use canonical
Switch. Do not place immediate Switches behind one global Save button. Each
target owns setting inventory, dirty state, pending/error/conflict, auth expiry,
feedback and audit history. Marketing/notification consent records remain
separate policy-backed controls rather than generic booleans.

Shopify follows `U0-A`; platform-hosted settings are linked or omitted instead
of copied. The neutral U9 shell remains passive section composition.

Alternative `U9-B` uses one global Form. Alternative `U9-C` uses independent
Forms for every section. Alternative `U9-D` makes every setting immediate.

Evidence: [dossier](../refinement/dossiers/account-settings.md) and
[audit](account-settings-web-refinement-audit.md).

## Approval And Exception Format

The recommended packet can be accepted with:

> Approve decision packet 03 recommendations U0-A, G2-A, G8-B, G10-A, K1-A,
> K8-A, K9-A, K11-A and U1-A through U9-A for human-review candidates. This is
> not stable, final visual, provider or commercial-operation approval.

An exception may name only changed choices, for example:

> Approve packet 03 except K11-B and U8-C.

Approval records the chosen product/target boundaries in ADRs and permits the
existing technical candidates to enter human review when their evidence remains
valid. Provider-backed features remain omitted from a target until the target
has the actual provider and data lifecycle described by the approved boundary.
