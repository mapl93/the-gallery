# 0173. Announcement Extended Controlled Dismissal And Capability Deferral

> Follow-up: ADR 0227 supersedes this pre-owner recommendation. The owner chose
> one canonical C2 Announcement Bar with exclusive Static, Countdown and
> Rotating modes, orthogonal controlled dismissal, shared Carousel rotation,
> and deprecation of G11 before v1.

Status: Accepted

Date: 2026-07-16

## Context

G11 Announcement Bar (Extended) entered refinement as one registry component
with Countdown, Rotating and Dismissible variants. Those labels do not describe
three presentations of one stable semantic component. They require different
anatomies, state owners, accessibility obligations, runtimes and target
translations.

The current contract requires the Countdown root but exposes no mode, message,
countdown value or controlled visibility. Studio defaults to Rotating, hardcodes
one English message, and applies CSS that translates the single row through
three fixed positions. The bar is therefore blank during most of its infinite
loop. Rotation has no persistent pause control, current-message state, manual
navigation or focus/hover lifecycle. Dismissal duplicates Close Button styling
and relies on site-local visibility/reappearance state that is absent from the
contract. Countdown does not compose canonical G7 and presents a fixed example
as if it were functional.

Accepted ADR 0100 already defines C2 Announcement Bar as one static, wrapping,
neutral message with an optional native Link and optional intentional landmark.
ADR 0169 leaves G7's time source and expiration architecture open. ADR 0104
limits Carousel v1 to finite user-controlled navigation without autoplay. ADRs
0081 and 0086 deliberately leave G11 capability composition unresolved.

Narrowing, deprecating or redefining G11 changes its public product identity,
dependencies, API, documentation and every target adapter. That choice cannot
be inferred during technical refinement.

## Decision

- G11 remains `pilot` and `researched-decision-needed`. No contract, registry,
  canonical CSS, renderer, Studio metadata, target adapter or generated output
  changes in this decision-only pass.
- The current three-variant component is not a certifiable v1 contract.
  Countdown, rotation and dismissal must not be exposed as freely combinable
  booleans or treated as presentation-only CSS.
- If G11 remains separately discoverable, the recommended v1 identity is a
  controlled **Dismissible Announcement** profile that composes canonical C2
  Announcement Bar and canonical Close Button.
- That profile has one target-owned message, an optional native Link, an
  optional intentional region label, a required localized dismiss label,
  controlled visible/hidden projection and one semantic dismiss-request event.
- Empty required content omits the root. Hidden content is unmounted or natively
  unavailable. Static/default content has no `alert`, `status` or live-region
  semantics.
- The neutral profile owns no eligibility, campaign selection, scheduling,
  persistence, analytics, reappearance, focus destination, provider or storage.
  The surrounding target owns those policies and must keep critical information
  available outside a dismissible surface.
- Announcement with Countdown becomes a higher-level composition of C2 and G7
  only after the owner accepts G7's source model, current-value projection,
  cadence, synchronization and expiry result. G11 does not calculate time.
- Rotating Announcements remain unsupported in neutral v1. A future product must
  compose an explicitly accepted autoplay-capable Carousel service with
  previous/next navigation, current state, durable pause/restart, focus and hover
  suspension, reduced-motion behavior and a complete announcement policy.
- Static-only/deprecate G11, a discriminated campaign union and target-only
  recipes remain explicit alternatives for owner selection.
- Existing Mobile/Desktop captures remain baseline-only evidence. They show one
  static first frame and do not certify countdown, rotation, dismissal,
  localization, zoom, focus, target placement or lifecycle.
- No `stable` promotion or readiness for human stability review is implied.

## External Constraints

- WAI-ARIA APG Carousel requires a stop/restart control for auto-rotation,
  suspension while keyboard focus is inside, no automatic restart after focus
  leaves, and suspension on hover.
- WCAG 2.2.2 requires users to pause, stop, hide or control the frequency of
  non-essential moving or auto-updating parallel content. G11's infinite
  eight-second loop does not meet that model.
- Open UI documents divergent Carousel autoplay, interval, control and event
  APIs rather than one stable cross-system Announcement contract.
- Radix exposes no primitive that combines announcements, timers, rotation and
  campaign state.
- Shopify Checkout Announcement and Polaris Banner demonstrate target-owned
  dismissal/visibility surfaces; neither establishes neutral storefront
  countdown or rotation parity.
- Shopify storefront section groups place Announcement Bar content with the
  Header and theme editor. The current static layout insertion is not sufficient
  evidence for modern target readiness.
- Shopify Theme Store and FTC guidance make false or resetting countdowns and
  misleading urgency unacceptable. A real source and expiry policy are required
  before any countdown target can be certified.

These sources constrain conformance and target architecture but do not choose
The Gallery's component identity.

## Recommended API Boundary After Approval

The candidate controlled profile is deliberately small:

- required composed `message` content;
- optional native Link content inherited from Announcement Bar;
- optional non-empty `label` only when an intentional named region is needed;
- required non-empty localized `dismissLabel`;
- controlled `visible`; and
- one `dismiss` request/event.

Placement, z-index, persistence key, storage duration, campaign id, analytics,
close size/icon, animation, countdown values, cadence, slide count and focus
destination are target facts or private composition, not neutral public API.

## State And Focus Boundary

- The target is the only visibility owner; the component has no uncontrolled
  persistence fallback or automatic reappearance.
- A dismiss request does not claim that storage or a provider operation
  succeeded. Pending/error behavior is introduced only if a selected target
  persistence service requires it.
- The target must choose a safe next focus destination when removing a focused
  Close Button would otherwise strand focus. The neutral component cannot infer
  surrounding page structure.
- Critical legal, consent, checkout, payment or safety information cannot depend
  solely on a dismissible announcement.

## Performance

The current G11 CSS slice is `1,750 B` raw / `730 B` deterministic gzip. The
Marketing family is `19,840 B` raw / `4,194 B` gzip against its permanent
`4,198 B` ceiling, leaving `4 B`. Neutral Web component CSS is `67,810 B` gzip
against `65,536 B`, and shared runtime is `10,501 B` gzip against `8,192 B`;
those are existing program gaps.

G11 has no JavaScript selector today, but `announcement-rotate 8s infinite` is
continuous authored compositor work. The recommended profile must retain a
`0 B` neutral timer/provider/storage/network budget and recover CSS by removing
the loop and duplicated close treatment. Countdown and autoplay services need
separate accepted budgets and complete cleanup obligations.

## Target Boundary

- Neutral Web maps the recommended profile to canonical Announcement Bar and
  Close Button without a clock, carousel, storage or provider.
- Shopify storefront requires a Header section-group composition, localized
  merchant/market data and an explicit dismissal/persistence policy before it
  can be target-ready.
- Shopify Checkout or app/customer surfaces should use the available host
  Announcement/Banner semantics for that target rather than copying storefront
  DOM.
- React and Angular may expose thin controlled adapters over one application
  campaign-state owner.
- Webflow and Framer remain static C2 by default unless a target state service is
  explicitly accepted.
- Figma represents static visible/hidden/dismiss states only and never claims a
  functioning timer, rotation or persistence lifecycle.
- SwiftUI and Compose use native top-message surfaces while preserving the same
  controlled state and target-owned campaign boundary.

## Open Owner Choice

Choose one v1 identity:

1. static-only v1 and deprecate G11;
2. controlled Dismissible Announcement — recommended if G11 remains;
3. discriminated `dismissible | countdown | rotating` campaign union after all
   required service decisions; or
4. target-only recipes with no neutral G11.

Then select dismissal lifecycle/persistence/focus policy, whether Countdown may
compose after G7 is accepted, whether autoplay rotation is a real product
requirement, legal capability combinations, the first Shopify surface, Header
section-group migration and G11-specific visual evidence.

## Consequences

- The present broken loop and contradictory defaults remain visible as a
  baseline defect rather than being hidden behind a guessed API.
- Work can continue to later components without repeatedly researching G11.
- G11 cannot enter human stability review until its identity is selected and
  the retained capability is implemented and evidenced across targets.
- A future implementation has explicit canonical dependencies and exit tests
  instead of three unrelated CSS modifiers.

## Evidence Considered

- <https://www.w3.org/WAI/ARIA/apg/patterns/carousel/>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://open-ui.org/components/carousel.research/>
- <https://www.radix-ui.com/primitives>
- <https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components/feedback-and-status-indicators/announcement>
- <https://shopify.dev/docs/api/app-home/web-components/feedback-and-status-indicators/banner>
- <https://shopify.dev/docs/storefronts/themes/architecture/section-groups>
- <https://shopify.dev/docs/storefronts/themes/store/requirements>
- <https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf>
