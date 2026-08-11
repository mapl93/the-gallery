# Component Refinement v1 Decision Packet 04: Content, Ceramics, And Sections

Status: `owner-decisions-recorded`

Snapshot: 2026-07-19

Owner resolution: [component refinement owner decision responses](../refinement/owner-decision-responses.md).
The recommendations below remain the historical proposal and evidence packet;
the linked response ledger is authoritative wherever the accepted direction
differs.

This packet consolidates the remaining human decisions for eight Blog
components, eleven Ceramics components and two Section components. Their safe
neutral candidates, dossiers, audits and four-viewport evidence already exist.
Approval moves those candidates into the human stability-review queue; it does
not approve final artwork, factual claims, content records, providers, booking
or submission services, and it does not promote a contract to `stable`.

The shared rules and approval meaning from
[`component-refinement-decision-packet.md`](component-refinement-decision-packet.md)
apply unchanged. S1 Hero Section does not introduce another decision here: it
inherits the G1/S1 identity choice in that packet. The other twenty decisions
below close the narrower boundaries carried by these twenty components.

## Blog Decisions

### L1 — Article Card

**Recommended (`L1-A`): one passive article summary with one title Link.**
Media remains non-interactive, category remains a passive canonical Badge, and
metadata stays target-formatted. Canonical Skeleton is an external loading
composition rather than an Article Card variant. Keep the standard candidate
unframed for v1; targets may place it in canonical Card only as an explicit
composition. Full content remains unclamped by default.

Alternative `L1-B` combines media and title in one native Link only when the
complete composition guarantees no conflicting interactive descendants.
Alternative `L1-C` keeps Skeleton as a formal Article Card state and therefore
requires a replacement/busy lifecycle. Whole-card JavaScript delegation is not
accepted.

Evidence: [dossier](../refinement/dossiers/article-card.md) and
[audit](article-card-web-refinement-audit.md).

### L2 — Article Hero

**Recommended (`L2-A`): retain Full, Split and Text Only with a safe no-media
fallback.** A missing image never hides or inverts the required title; Full and
Split collapse to readable normal-flow content. Keep the neutral root unframed.
Targets own heading rank, crop/focal point, loading priority, category/author
Links, metadata inventory/order and localized duration policy.

Alternative `L2-B` rejects Full or Split at the target boundary when media is
missing. Alternative `L2-C` removes Full from v1 until a target supplies a
tested crop and contrast-safe-area contract.

Evidence: [dossier](../refinement/dossiers/article-hero.md) and
[audit](article-hero-web-refinement-audit.md).

### L3 — Article Body / Prose

**Recommended (`L3-A`): L3 is the sole canonical `.prose` owner.** Foundations
may supply tokens but must not maintain a second selector implementation.
Commerce islands inside prose compose canonical Product Card and Price inside
an explicitly prose-excluded wrapper. True full-bleed media belongs to the host
layout outside `.prose`. Passive authored callouts remain ordinary content;
targets compose Alert only for content whose timing and importance require it.

Keep legacy pull-quote/callout aliases for one pre-v1 migration cycle and then
remove them before the public v1 contract freezes.

Alternative `L3-B` moves `.prose` to Foundations and makes L3 an explicit
extension consumer. Alternative `L3-C` removes commerce embeds and full-bleed
content from L3 entirely.

Evidence: [dossier](../refinement/dossiers/article-body.md) and
[audit](article-body-web-refinement-audit.md).

### L5 — Table Of Contents

**Recommended (`L5-A`): target-authored structured headings and fragment ids.**
The target supplies ordered nested records whose Links resolve to unique ids;
neutral source does not parse rich HTML or generate ids. Sticky placement is a
host integration with real header/safe-area offsets. Automatic current-section
tracking is optional target behavior over one shared reading-state service and
uses `aria-current="location"`; static targets omit current state.

Shopify v1 exposes L5 only when its article source provides structured heading
records or a verified preprocessing step. It does not parse arbitrary merchant
HTML in neutral runtime.

Alternative `L5-B` keeps only the in-flow static presentation. Alternative
`L5-C` defines one required cross-target heading parser/current-section service.

Evidence: [dossier](../refinement/dossiers/table-of-contents.md) and
[audit](table-of-contents-web-refinement-audit.md).

### L6 — Author Card

**Recommended (`L6-A`): one passive person composition with host-owned context.**
The neutral root remains a `div`; the article host chooses `footer`, `aside`, a
contact-only `address`, heading rank and author-profile Link. Full and Compact
remain presentation variants. Multi-author presentation is a separate host
collection, not a hidden L6 mode.

Shopify's first basic mapping may use its article-author record for public name
and approved biography/avatar data. Public email is omitted by default; social
and homepage destinations render only when explicitly supplied and approved.

Alternative `L6-B` makes the root a fixed article `footer`. Alternative `L6-C`
expands L6 into a multi-author collection and requires a new record/composition
contract.

Evidence: [dossier](../refinement/dossiers/author-card.md) and
[audit](author-card-web-refinement-audit.md).

### L8 — Blog Sidebar

**Recommended (`L8-A`): use the public name “Blog Sidebar” and retain selector
aliases only for migration.** L8 is one named `aside` containing target modules.
The initial v1 profile supports Recent Articles and Topics as native Link lists;
target Search is optional only when a real search owner supplies the complete
form/results lifecycle. Navigation topics do not compose passive Tag.

Module order, limits and headings are target page-composition data, not L8 root
properties. Shopify may start with Recent Articles and Topics; Newsletter and
Search remain separate canonical/target compositions.

Alternative `L8-B` retains the legacy “Blog Sidebar / Tag Cloud” name.
Alternative `L8-C` formalizes every module as a root property, which is not
recommended because it freezes one CMS inventory into neutral source.

Evidence: [dossier](../refinement/dossiers/blog-sidebar.md) and
[audit](blog-sidebar-web-refinement-audit.md).

### L10 — Related Articles

**Recommended (`L10-A`): a target-curated set of at most three canonical
Article Cards.** The target excludes the current article and duplicates, keeps
source order, and omits the complete section when no truthful recommendations
exist. The first Shopify profile uses explicit merchant-curated article
references; inferred tag/personalized ranking remains a later target policy.

Place L10 after the primary article content and before Comments in the v1
article composition. The host may position Author Card and Share Actions around
that boundary without changing L10. Previous/Next Article Navigation remains a
separate future component or target composition; `.article-nav` is not L10.

Alternative `L10-B` uses tag-based deterministic selection with explicit
current/duplicate filtering. Alternative `L10-C` registers Article Navigation
as a separate component now. Personalization is excluded until privacy,
explanation, cache and analytics policy exist.

Evidence: [dossier](../refinement/dossiers/related-articles.md) and
[audit](related-articles-web-refinement-audit.md).

### L11 — Comments

**Recommended (`L11-A`): finite target-owned discussion with a two-level visual
reply limit.** An empty valid discussion composes canonical Empty State. Native
ordered lists preserve thread order; deeper replies are flattened into the
second visible level with an explicit reply-to label. Oldest-first is the v1
default; a target may add canonical Select and numbered Pagination for other
verified orders. Infinite Feed semantics are excluded.

Replies require the target's authenticated composer and moderation lifecycle.
Reactions are excluded from v1. Shopify's first mapping may use its flat native
comments/form model and therefore omits replies and reactions. Targets own
sanitization, permissions, pending/result feedback, focus restoration, count
and pagination truth.

Alternative `L11-B` supports arbitrarily nested threads with disclosure.
Alternative `L11-C` omits the empty shell until the first comment exists.
Alternative `L11-D` adds persistent reaction Toggles and their provider state.

Evidence: [dossier](../refinement/dossiers/comments.md) and
[audit](comments-web-refinement-audit.md).

## Ceramics Family Boundary

Every recommended R-family component is a presentation of target-owned records.
The target owns provenance, revisions, localization, rights, applicability,
measurement and claim review. Neutral source does not create a universal
ceramics CMS schema or infer safety, sustainability, food-contact,
authenticity, scarcity, availability or technical equivalence. Shopify
implementations remain `planned` until an approved first consumer and record
mapping exist; a metaobject/metafield projection is a target option, not the
neutral source language.

### R1 — Material Library

**Recommended (`R1-A`): passive reference collection.** Keep one optional
introduction plus a required unordered list of named material articles with
optional media, classification, description and canonical passive Tags. No
selection, filtering, comparison or navigation belongs to R1. A future Shopify
consumer may project curated material metaobjects after vocabulary, claims,
rights and product relationships are approved.

Alternative `R1-B` makes each material a profile destination through canonical
Link. Alternative `R1-C` turns the component into a selectable/filterable
catalogue and requires a separate interaction/data contract.

Evidence: [dossier](../refinement/dossiers/material-library.md) and
[audit](material-library-web-refinement-audit.md).

### R2 — Glaze Guide

**Recommended (`R2-A`): passive named sample collection plus optional featured
detail.** A sample is not selected merely because it is featured. Visible name
remains the durable identity independent of color. R2 owns no product-option,
filter or detail-synchronization state.

When glaze becomes a purchasable option, the product target composes canonical
Radio/Variant Selector outside this passive guide and owns availability,
validation and selected-variant synchronization.

Alternative `R2-B` makes R2 a complete native radio-group product choice.
Alternative `R2-C` uses a Listbox only for a genuinely option-list interaction.

Evidence: [dossier](../refinement/dossiers/glaze-guide.md) and
[audit](glaze-guide-web-refinement-audit.md).

### R3 — Technique Explainer

**Recommended (`R3-A`): passive ordered editorial sequence.** Native list order
is authoritative; visible decimal ordinals are derived presentation. Each step
has required name/text and optional supporting media. Branches, optional paths,
task completion, navigation, duration, tools, warnings and video remain
target-authored extensions or separate canonical compositions.

Alternative `R3-B` defines richer structured step records with materials,
duration, safety and media types. Alternative `R3-C` changes the component into
an interactive Stepper/Carousel, which requires a separate behavior contract.

Evidence: [dossier](../refinement/dossiers/technique-explainer.md) and
[audit](technique-explainer-web-refinement-audit.md).

### R4 — Care Instructions

**Recommended (`R4-A`): passive unordered guidance with homogeneous
`default | do | dont` presentation.** Each item carries complete visible
localized meaning; color/icon never supplies “recommended” or “avoid” alone.
Targets may author friendlier visible vocabulary such as Recommended/Avoid
without changing the stable API. Safety or legal warnings compose separately
through reviewed Alert/rich content.

Alternative `R4-B` renames the public variants to `recommended | avoid` in a
breaking contract. Alternative `R4-C` permits mixed tone per item and requires
explicit grouping/accessible wording rules.

Evidence: [dossier](../refinement/dossiers/care-instructions.md) and
[audit](care-instructions-web-refinement-audit.md).

### R5 — Dimensions

**Recommended (`R5-A`): target-formatted measurement sets, never neutral
conversion.** One native description list presents the active complete values.
Optional unit choice composes canonical Segmented Control with native radios;
the target swaps one coherent preformatted set and owns precision, rounding,
locale, tolerance and persistence. A diagram only supplements visible values.

Alternative `R5-B` exposes raw canonical quantities plus a neutral converter.
Alternative `R5-C` omits unit choice and lets each target select one locale-
appropriate fixed set.

Evidence: [dossier](../refinement/dossiers/dimensions.md) and
[audit](dimensions-web-refinement-audit.md).

### R6 — Kiln / Firing Info

**Recommended (`R6-A`): passive arbitrary technical fact list.** Targets supply
complete qualified formatted values and source order. R6 does not define a
fixed firing schema, convert units or infer equivalence between cone and one
temperature. Safety instructions and provenance Links are separate reviewed
content compositions.

Alternative `R6-B` standardizes a v1 ceramics firing record with required
fields and units. Alternative `R6-C` expands to a schedule table/disclosure and
requires new anatomy and dependencies.

Evidence: [dossier](../refinement/dossiers/firing-info.md) and
[audit](firing-info-web-refinement-audit.md).

### R7 — Workshop Listing

**Recommended (`R7-A`): discovery-only workshop summaries.** Each native
article may show target-formatted schedule, media, level/format, description,
canonical Price, passive availability Badge and a real details Link styled as
Button. R7 does not book, reserve, waitlist, authenticate or take payment. A
full workshop may still link to useful details.

Shopify may render R7 only after an event source owns timezone, recurrence,
money, capacity and freshness. Registration navigates to a separately certified
target flow.

Alternative `R7-B` includes a direct registration request and requires the full
booking lifecycle. Alternative `R7-C` omits Price/availability from neutral v1.

Evidence: [dossier](../refinement/dossiers/workshop-listing.md) and
[audit](workshop-listing-web-refinement-audit.md).

### R8 — Commission Form

**Recommended (`R8-A`): embeddable commission-intake composition, with the
target owning Form.** Keep R8's required canonical field slot plus optional
title, guidance, File Upload and Button actions. A standalone consumer wraps it
in canonical Form/native form semantics; an embedded consumer does not create a
nested form. Do not add Form as a mandatory direct dependency or expose a
universal field/customer/consent/submission schema.

Shopify contact may be used only after fields, privacy, retention and response
policy are approved. Reference uploads require a verified app/backend path and
are omitted when only Liquid contact is available.

Alternative `R8-B` makes R8 always standalone and formally composes canonical
Form as the root. Alternative `R8-C` defines a fixed v1 commission schema and
provider lifecycle.

Evidence: [dossier](../refinement/dossiers/commission-form.md) and
[audit](commission-form-web-refinement-audit.md).

### R9 — Maker's Mark

**Recommended (`R9-A`): passive attribution, not proof.** Require visible maker
identity and allow optional stamp media, studio text and target-formatted year.
The generic root gains contextual `aside`, `address` or Link semantics only from
its host. Stamp alternatives depend on whether the media adds information or
repeats the adjacent name. R9 makes no authenticity/provenance claim.

Alternative `R9-B` adds one canonical maker-profile Link. Alternative `R9-C`
defines a verified maker/provenance record and requires an authority/proof
service.

Evidence: [dossier](../refinement/dossiers/makers-mark.md) and
[audit](makers-mark-web-refinement-audit.md).

### R10 — Edition / Numbering

**Recommended (`R10-A`): passive target-formatted edition statement.** Label,
number and total remain opaque localized strings; R10 does not parse, compare,
derive scarcity or claim authenticity/inventory. The statement stays separate
from canonical Badge because it is structured edition metadata rather than a
status or classification.

Alternative `R10-B` composes the designation as a separately styled canonical
Badge plus number/total text. Alternative `R10-C` defines a cross-target proof
taxonomy and numeric validation model.

Evidence: [dossier](../refinement/dossiers/edition-badge.md) and
[audit](edition-badge-web-refinement-audit.md).

### R11 — Certificate Details

**Accepted for removal (`R11-B`): migrate every consumer to canonical
Certificate.** Certificate Details duplicated Certificate without a distinct
contract, visual language or proof model. The registry identity, contract,
Studio route, MDX page and CSS alias are removed; no compatibility selector or
permanent Ceramics profile survives. Existing historical evidence remains only
as migration provenance. ADR 0245 records the removal, which offsets the D9a
addition and preserves the canonical inventory at 183 components.

Evidence: [ADR 0245](../decisions/0245-remove-duplicate-certificate-details-registry-profile.md)
and the canonical [Certificate audit](certificate-web-refinement-audit.md).

## Section Decisions

### S1 — Hero Section

S1 is resolved only by the G1/S1 identity decision in the primary packet.
Applying recommended `G1-A` keeps public `hero`, migrates S1's refined passive
layout into that canonical implementation and deprecates `hero-section` before
v1. Choosing `G1-B` or `G1-C` changes the S1 outcome accordingly. This packet
does not create a competing S1 code.

Evidence: [dossier](../refinement/dossiers/hero-section.md),
[audit](hero-section-web-refinement-audit.md), and
[primary decision packet](component-refinement-decision-packet.md).

### S13 — Comparison Table

**Recommended (`S13-A`): passive canonical Data Table plus a bounded
two-offering Shopify profile.** Repeated merchant rows supply one row label and
two complete target-formatted values. The neutral parent owns only optional
section title, measure and comparison emphasis; Data Table remains the sole
table/overflow/focus owner. More than two offerings require a later
metaobject-backed matrix or developer composition.

A highlighted column is visual emphasis only. “Recommended”, savings, best
value or other commercial claims must appear as explicit target-owned text with
their own approved policy; background color never communicates the claim alone.

Alternative `S13-B` uses an arbitrary metaobject-backed Shopify matrix.
Alternative `S13-C` keeps Shopify developer-composed only. Alternative `S13-D`
adds selectable plans/actions and requires a separate interactive contract.

Evidence: [dossier](../refinement/dossiers/comparison-table.md) and
[audit](comparison-table-web-refinement-audit.md).

## Approval And Exception Format

The recommended packet can be accepted with:

> Approve decision packet 04 recommendations L1-A, L2-A, L3-A, L5-A, L6-A,
> L8-A, L10-A, L11-A, R1-A through R11-A and S13-A, and apply G1-A to S1.
> This is not stable, final visual, factual-claim, provider or commercial-flow
> approval.

An exception may name only changed choices, for example:

> Approve packet 04 except L10-B, R7-B and R11-B; keep G1-A for S1.

Approval authorizes the corresponding ADR/reconciliation work and lets each
technically complete neutral candidate enter human review while every target
retains its truthful implemented/planned/omitted maturity. Component-specific
visual approval, record authority, claims, privacy/legal policy and real target
integration remain explicit later gates.
