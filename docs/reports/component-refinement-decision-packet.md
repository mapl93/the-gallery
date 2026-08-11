# Component Refinement v1 Architecture Decision Packet

Status: `owner-decisions-recorded`

Snapshot: 2026-07-19

Owner resolution: [component refinement owner decision responses](../refinement/owner-decision-responses.md).
The recommendations below remain the historical proposal and evidence packet;
the linked response ledger is authoritative wherever the accepted direction
differs.

This packet consolidates the twelve components whose final candidate cannot be
implemented coherently without an explicit product or architecture decision. It
does not repeat ordinary visual-review questions and it does not promote any
component to `stable`.

## Program Position

| Program fact | Current evidence |
| --- | ---: |
| Registry components | 183 |
| Automated web gates passing | 183 |
| Dossiers present and researched | 183 |
| Components prepared for human review | 116 |
| Refined components still carrying narrower human decisions | 55 |
| Components blocked before final implementation | 12 |
| Human-approved stable components | 1 |

The four packets cover all 67 components still outside the human-review queue:

| Packet | Component coverage | Decision class |
| --- | ---: | --- |
| 01 — Architecture blockers | 12, plus the dependent S1 identity outcome | Implementation-blocking architecture/product decision |
| 02 — Commerce Core | 18 | Narrow semantic, commercial or target decision |
| 03 — Marketing, Cart And Account | 16 | Narrow semantic, commercial, provider or target decision |
| 04 — Content, Ceramics And Sections | 21, including S1 | Narrow content, claim, architecture or target decision |
| **Unique total** | **67** | **Complete current owner-decision queue** |

S1 is counted only in Packet 04's 21 refined components; Packet 01 owns its
shared G1/S1 architecture choice and therefore lists it only as a dependency.

The twelve rows below are the only components still marked
`researched-decision-needed`. Ten remain unchanged and two retain a documented
baseline conflict. Their research, standards comparison, alternatives, target
translation and correction registers are complete. Implementation is paused
because selecting a direction would otherwise resolve owner decisions by
assumption.

Approving a recommendation authorizes the corresponding ADR and implementation
candidate. It does **not** approve final artwork, target-specific commercial or
legal policy, or `stable` status. Those gates remain explicit.

## Shared Rules Included In Every Recommendation

- The repo remains the source of truth.
- Neutral source remains independent of React, Shopify, Figma and future
  targets.
- Composed components consume canonical components and do not duplicate their
  markup, focus model, value owner or runtime.
- Exhibit and Studio use one renderer, fixture and implementation.
- Target data, policy, providers, routing, persistence and business truth stay
  outside the neutral component unless explicitly stated below.
- Public API exposes stable semantic choices only. Geometry, timing internals,
  clone counts, selectors and other composition details remain private.
- No recommendation includes automatic promotion to `stable`.

## Recommended Package

### H7 — Pin Input / OTP

**Recommended decision (`H7-A`): one native full-code owner.** Use one
`input[type="text"]` as the sole value, name, required, validity, FormData,
autofill, paste, event and reset owner. Visual cells derive from that string and
are not separate fields or mirrored hidden owners.

The v1 semantic scope included in this recommendation is:

- required explicit `length` rather than a guessed universal code length;
- `numeric | alphanumeric` character set;
- native `autocomplete="one-time-code"`, `inputmode`, pattern and length
  mapping;
- controlled and uncontrolled adapters over the same complete string; and
- no masking, separators, auto-submit, verification, resend timer, WebOTP
  request or completion callback in v1.

Alternative `H7-B` retains multiple one-character inputs and requires a new
cross-target submission/autofill convention. A mirrored hidden owner is
rejected because it creates two sources of truth.

Evidence: [dossier](../refinement/dossiers/pin-input.md) and
[audit](pin-input-web-refinement-audit.md).

### G1 + S1 — Hero Identity

**Recommended decision (`G1-A`): one canonical public `hero` component.** Keep
the consumer-facing slug `hero`, adopt S1's already-refined passive structure
and container-responsive layout as its foundation, and make G1's background
media treatment one explicit profile. Migrate the Shopify section to that one
identity and deprecate `hero-section` through a documented pre-v1 migration;
do not maintain two permanent aliases.

The v1 package keeps passive background, split, text-only and fullscreen layout
profiles. Parallax and slideshow remain outside the certifiable v1 API until a
separate runtime decision supplies complete scroll or carousel behavior. Media
classification, heading rank, destinations, loading and playback stay
target-owned.

Alternative `G1-B` retains both components with a strict public selection rule:
G1 as a single-layout storefront campaign banner and S1 as a multi-layout
page-builder section, with one declared composition direction and one adapter
owner. Alternative `G1-C` keeps `hero-section` as the sole identity and removes
G1.

Evidence: [dossier](../refinement/dossiers/hero.md),
[audit](hero-web-refinement-audit.md), and
[ADR 0145](../decisions/0145-passive-container-responsive-hero-and-open-identity-boundary.md).

### G4 — Marketing Popup

**Recommended decision (`G4-A`): a Marketing Popup profile of canonical
Modal.** Modal owns overlay, surface, accessible name, open lifecycle, focus,
inertness, Escape, restoration, scroll partition and canonical Close Button.
Popup owns only optional media, concise campaign content, canonical actions and
the Default/Split arrangements.

Slide is deferred until a separate Modal-placement versus Sheet/Drawer decision
exists. Email capture is ordinary target-authored Form/Input/Button content;
provider, consent, submission and feedback never become Popup properties. Web
frameworks may expose `open/defaultOpen/onOpenChange` as adapters over Modal's
single owner.

Alternative `G4-B` defines and certifies a second complete generic Popup
lifecycle. Alternative `G4-C` removes the public Popup identity and documents a
Modal recipe.

Evidence: [dossier](../refinement/dossiers/popup.md),
[audit](popup-web-refinement-audit.md), and
[ADR 0166](../decisions/0166-marketing-popup-modal-profile-and-open-ownership-deferral.md).

### G7 — Countdown

**Recommended decision (`G7-A`): controlled remaining-time projection.** The
target supplies ordered localized segments, one complete accessible phrase and
an explicit `running | paused | expired` lifecycle. The neutral component owns
only segment presentation and never reads a clock, parses a deadline, schedules
ticks, corrects drift or performs expiry side effects.

Default, Inline and Cards remain presentation candidates for later visual
approval. The target controls which units exist and supplies zeroes explicitly;
the base does not collapse units or require seconds. At expiry the safe default
is a retained zero projection with an explicit localized expired phrase. A
target may instead supply replacement content or explicitly omit the component;
there is no implicit redirect, disablement or disappearance.

Alternative `G7-B` creates a neutral deadline/clock runtime and requires a new
runtime budget. Alternative `G7-C` renames the component as a static Duration
display. Optional deadline metadata is allowed only when it cannot become a
second calculator.

Evidence: [dossier](../refinement/dossiers/countdown.md),
[audit](countdown-web-refinement-audit.md), and
[ADR 0169](../decisions/0169-controlled-countdown-projection-and-expiration-deferral.md).

### G9 — Consent Manager

**Recommended decision (`G9-A`): replace the ambiguous Cookie Consent identity
with a controlled Consent Manager composition.** Use a non-modal first layer
that reserves layout space rather than covering page focus, and canonical Modal
for detailed preferences. Require a visible localized title/description, real
policy Link and explicit Accept, Reject and Customize requests with equal
decision access. Closed content is omitted or natively unavailable.

The target is the only owner of jurisdiction, legal copy, categories, current
values, provider, persistence, resource blocking, withdrawal, errors and audit
evidence. Preferences compose canonical choice controls and Modal; the neutral
component never reads or writes cookies/storage. Rename the public component to
`Consent Manager`; preserve the old `cookie-consent` identity only as a
documented migration path, not a second implementation.

Alternative `G9-B` is a passive Cookie Notice with policy Link and optional
dismiss request but no consent claim. Alternative `G9-C` removes the neutral
component and provides target/provider recipes only.

Evidence: [dossier](../refinement/dossiers/cookie-consent.md),
[audit](cookie-consent-web-refinement-audit.md), and
[ADR 0171](../decisions/0171-controlled-consent-manager-and-provider-boundary-deferral.md).

### G11 — Announcement Extended

**Recommended decision (`G11-A`): narrow and rename it to Dismissible
Announcement.** Compose canonical Announcement Bar and Close Button, require a
non-empty target-owned message and localized dismiss label, expose one
controlled visible projection and one dismiss request, and omit/natively hide
the root when closed. Eligibility, scheduling, persistence, reappearance,
analytics and post-removal focus destination remain target-owned.

Remove Countdown and Rotating from the v1 contract. A future Announcement with
Countdown composes G7 only after G7 is accepted. A future rotating announcement
requires a separately approved autoplay-capable Carousel service. These
capabilities are not arbitrary booleans on G11.

Alternative `G11-B` deprecates G11 and uses the static canonical Announcement
Bar directly. Alternative `G11-C` is a discriminated campaign union and remains
blocked on Countdown and Carousel decisions. Alternative `G11-D` uses
target-only recipes.

Evidence: [dossier](../refinement/dossiers/announcement-extended.md),
[audit](announcement-extended-web-refinement-audit.md), and
[ADR 0173](../decisions/0173-announcement-extended-controlled-dismissal-and-capability-deferral.md).

### L4 — Reading Progress

**Recommended decision (`L4-A`): decorative article-position indicator.** The
target supplies one bounded `0..100` article-relative value. L4 renders a
passive `aria-hidden` track/fill, uses logical-start transform scaling, has no
transition between scroll samples and adds no listener, observer, timer or
measurement runtime. The host owns fixed/sticky/in-flow placement, safe areas,
header coordination and stacking.

This component does not claim task completion, comprehension, time remaining or
scrollbar behavior. Headings, landmarks and Table of Contents remain the
accessible navigation model.

Alternative `L4-B` composes canonical Progress with a required accessible name
when the product explicitly treats reading as task completion. A dual semantic
mode is not recommended.

Evidence: [dossier](../refinement/dossiers/reading-progress.md) and
[audit](reading-progress-web-refinement-audit.md).

### L7 — Filter Bar

**Accepted decision (`L7-B`): compact in-place filtering.** Render one native
visible choice group and never a `nav`, destination link or
`aria-current="page"`. Single mode composes canonical radio-backed Segmented
Control and accepts at most one selected value. Multiple mode composes
canonical Checkboxes. One controlled selected-value collection is
authoritative and every accepted change requests immediate commitment.

Capable Web and Shopify targets reflect committed selection in a target-chosen
query parameter and own reload/Back/Forward synchronization, results,
cancellation, pending/error/empty states, announcements, focus, pagination
reset and push-versus-replace policy. The neutral contract fixes no parameter
name, router or serialization. E3 becomes the separate full multi-group Filter
Panel; Category/Collection names are not retained as permanent aliases.

Evidence: [dossier](../refinement/dossiers/filter-bar.md) and
[audit](filter-bar-web-refinement-audit.md).

### L9 — Share Actions

**Accepted decision (`L9-A`): one canonical named Share Actions group.** Use
the registry-backed `.share-buttons` family, require a non-empty localized group
label and at least one target-supplied canonical Button or anchor Button, and
support only semantic `inline | stacked` layout. Migrate the duplicate `.share`
family. Fixed placement belongs to a separate Share Rail or page host.

Native Share, Clipboard, provider URLs, payload, capability checks, pending,
true success/failure feedback, analytics and security policy remain target
behavior. The neutral group has zero runtime and no Toolbar/roving-focus
semantics. Public `sticky` is removed before v1; fixed placement belongs to the
host or a separately reviewed Share Rail.

Alternative `L9-B` is one first-class native Share action with a target
fallback. Alternative `L9-C` makes a separately registered Share Rail the
primary identity. Keeping both CSS families is rejected.

Evidence: [dossier](../refinement/dossiers/share-buttons.md) and
[audit](share-buttons-web-refinement-audit.md).

### S12 — Logo Bar

**Recommended decision (`S12-A`): static-only Logo Bar for v1.** Render an
optional visible heading plus one native list, preserving authored order, of informative,
decorative or functional marks, with native Links only for real destinations.
Omit the component when no valid marks remain. Asset truth, alternative-text
intent, destinations, claims and ordering remain target-owned.

Remove/defer the public `marquee` variant. Mark dimensions, gap, muted
treatment and wrapping geometry remain private pending component-specific
visual approval. Neutral runtime, duplication, timers and layout reads remain
zero. A later moving Logo Bar may compose the accepted S18 Marquee contract
rather than duplicate motion.

Alternative `S12-B` immediately composes the shared S18 enhancement after both
decisions are accepted. Alternative `S12-C` permits target-only motion and gives
up cross-target motion parity.

Evidence: [dossier](../refinement/dossiers/logo-bar.md) and
[audit](logo-bar-web-refinement-audit.md).

### S17 — Before / After

**Recommended decision (`S17-A`): interactive image comparison composed from
canonical Slider.** One native `input[type="range"]` is the sole value, focus,
form, pointer, touch and keyboard owner. Its value drives the clipped media
layer and visual divider. Add `slider` as a dependency; remove the opaque
`control` slot.

The v1 range is horizontal, `0..100`, default `50`, step `1`, with one required
accessible comparison label, required before/after media, optional visible
state labels/description and native `input/change/reset`. Logical direction
follows writing mode. Missing required media omits the complete root. No custom
drag engine, animation, polling or layout loop is introduced.

Alternative `S17-B` renames the component to passive Before / After Comparison,
removes the interactive-looking handle and all value/control claims, and keeps
zero runtime. Target-owned optional interactivity is rejected.

Evidence: [dossier](../refinement/dossiers/before-after.md) and
[audit](before-after-web-refinement-audit.md).

### S18 — Marquee

**Recommended decision (`S18-A`): shared neutral progressive Marquee
enhancement.** Source contains one authoritative native list. Enhanced visual
copies are implementation-owned, bounded, `aria-hidden` and non-interactive.
Automatic motion composes one canonical Button for persistent Pause/Resume;
hover pauses temporarily and focus entry leaves motion paused until explicit
resume. Reduced motion, failed enhancement and no-JavaScript output are readable
static lists.

The v1 API permits `presentation: static | auto`, logical
`direction: forward | reverse` and semantic `pace: slow | default | fast`.
`static` is the non-surprising default; `auto` is explicit opt-in. Pause state
persists only for the component lifetime unless a target controls the same
state. Items are passive non-essential text in v1. Raw duration, gap, clone
count, travel and iteration remain private. CSS owns per-frame animation; no
per-frame JavaScript, polling, network or component assets are allowed.

Alternative `S18-B` renames the component to static Text Strip and removes all
motion claims. Alternative `S18-C` delegates motion to each target and gives up
cross-target behavioral parity.

Evidence: [dossier](../refinement/dossiers/marquee.md) and
[audit](marquee-web-refinement-audit.md).

## Approval And Exception Format

The complete recommended package can be accepted with:

> Approve H7-A, G1-A, G4-A, G7-A, G9-A, G11-A, L4-A, L7-A, L9-A, S12-A,
> S17-A and S18-A for implementation candidates. This is not stable or visual
> approval.

An exception can be concise, for example:

> Approve the recommended package except G1-B and S18-B.

If a custom direction is desired, identify only the component and changed
boundary. All unaffected shared rules and recommended decisions remain intact.

## Work Unlocked By Approval

For each approved decision, the next dependency-ordered batch will:

1. record the final accepted ADR or amend the accepted deferral ADR;
2. reconcile registry identity/dependencies, contract, canonical CSS/runtime,
   Studio metadata, renderer, MDX and target mappings;
3. regenerate only the affected Web, Shopify and Webflow copied/generated
   outputs;
4. validate controlled/uncontrolled ownership, semantics, keyboard, focus,
   contrast, reduced motion, responsive/container behavior, localization,
   extreme content and runtime budgets;
5. produce paired Exhibit/Studio Mobile, Tablet, Desktop and XL evidence with
   one bounded server, one headless browser session and one tab;
6. clean every evidence resource immediately after use; and
7. leave every contract `pilot` until explicit human stability review.

The separate set of 55 technically refined components retains its existing
component-level visual, commercial, target or domain questions. Those will be
consolidated by family after these twelve architecture identities stop blocking
the dependency graph.

The first dependency-ordered family packet is now available at
[`component-refinement-decision-packet-02-commerce-core.md`](component-refinement-decision-packet-02-commerce-core.md).
The next family packet covers Marketing, Cart and Account at
[`component-refinement-decision-packet-03-marketing-cart-account.md`](component-refinement-decision-packet-03-marketing-cart-account.md).
The final family packet covers Blog, Ceramics and Sections at
[`component-refinement-decision-packet-04-content-sections.md`](component-refinement-decision-packet-04-content-sections.md).
