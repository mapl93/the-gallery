# 0081. Marketing Semantic Source Pilot

Status: Accepted

Date: 2026-07-12

## Context

The eleven Marketing contracts were created mechanically in ADR 0027. They
described registry identity, broad CSS anatomy, and generic target-data behavior,
but they did not yet expose reviewed semantic properties or accurately separate
presentation options from interaction states.

Canonical Marketing CSS also had several neutral-web maturity gaps:

- Variant classes were present without explicit contract mappings.
- Repeated testimonial, trust-badge, cookie-preference, and announcement anatomy
  was incomplete.
- The Payment Icons small modifier was described as a state even though it changes
  icon size.
- Narrow viewports could compress or overflow forms, popup content, countdowns,
  notifications, and action groups.
- Marketing-owned dismiss actions lacked consistent touch targets and visible
  keyboard focus.
- Timed transitions and animations did not consistently honor reduced motion.

Several related product boundaries are still intentionally open. This pass must
improve the non-blocked semantic source without resolving them by assumption.

## Decision

### The Marketing family remains a pilot

Hero, Newsletter, Testimonials, Popup, Trust Badges, Payment Icons, Countdown,
Urgency, Cookie Consent, Social Proof, and Announcement Bar Extended advance to
contract version `0.2.0` but remain `pilot`.

The contracts now include only semantic properties and neutral-web mappings
supported by current CSS, registry dependencies, and canonical examples. Content,
slots, option classes, visibility attributes, dismiss labels, and native-element
attributes are mapped explicitly where the ownership surface is established.

### Anatomy and presentation are explicit

- Hero records media, overlay, named content, and Button-composed actions.
- Newsletter records its native form and Input/Button composition boundary.
- Testimonials records repeated cards, quote content, author identity, and
  optional Avatar composition.
- Popup records the overlay, dialog surface, body, optional media, and dismiss
  action.
- Trust Badges records repeated passive statements and optional icons.
- Payment Icons records raster and vector marks.
- Countdown records repeated value-and-unit segments and optional separators.
- Urgency records generated and supplied visual cues without treating variants as
  interaction states.
- Cookie Consent records banner and preference-layout anatomy without defining a
  consent model.
- Social Proof records message, time, image, and dismiss anatomy.
- Announcement Bar Extended records countdown, rotating-slide, and dismissible
  extension anatomy.

Class-backed Popup, Trust Badges, Countdown, Urgency, and Announcement extensions
now declare their actual modifier classes. Presentation variants are not repeated
as states merely because a CSS selector exists.

### Payment Icons small is a size capability

`.payment-icons--sm` changes icon height from the standard treatment to the
existing small treatment. It is not an interaction state.

The registry does not currently declare a Payment Icons size list and is outside
this decision's edit scope. To preserve registry validation, the contract removes
small from `states` and exposes it as the mapped boolean `small` size capability.
A future registry-owned reconciliation may normalize this into the shared
`sizes` option list without changing the underlying CSS fact.

### Dependency contracts retain their own state ownership

Newsletter composes Input and Button rather than recreating their state models.
Its contract explicitly requires composed Input fields to preserve label and
message association plus Default, Error, Success, Warning, hover, focus-visible,
and disabled obligations. Newsletter does not invent duplicate field selectors
or validation behavior.

Hero actions compose Button. Testimonials may compose Avatar. Popup dismissal
follows Close Button obligations. Cookie actions compose Button. Announcement
extensions preserve Announcement Bar semantics.

Popup does not gain an Input dependency or email property in this decision.

### Neutral-web CSS receives bounded hardening

Canonical Marketing CSS now:

- Constrains flexible content and long text on narrow viewports.
- Wraps or stacks Newsletter, Cookie Consent, Trust Badges, Countdown, and
  Announcement content where required.
- Contains Popup and Social Proof within the viewport.
- Correctly applies compact Trust Badge typography to repeated badge items.
- Gives popup, social-proof, and announcement dismiss buttons the existing touch
  target size and visible focus treatment.
- Gives the Cookie Consent policy link visible keyboard focus.
- Fits direct Social Proof images as well as nested image content.
- Disables Marketing transitions, urgency pulses, and announcement rotation when
  `prefers-reduced-motion: reduce` is active.

No new design token is introduced. The changes use existing public tokens and
component-private values already established by the source.

### Exhibit trigger and geometry ownership stay unchanged

Popup, Cookie Consent, and Social Proof use the accepted Exhibit convention:

1. The primary artwork starts visible.
2. Its sibling trigger is hidden while the artwork is visible.
3. Dismissal hides the artwork and reveals that sibling trigger so the visitor
   can reopen it.

This is documentation-product interaction, not a target-agnostic component
default. Exhibit staging, containment, and preview geometry remain site-owned.
Canonical Marketing CSS and contracts must not absorb `tg-preview-*` classes or
derive public properties from that fixture behavior.

Cookie Consent and Social Proof retain unambiguous `data-visible` presentation
mappings. Popup retains the two currently implemented `data-open` selectors but
does not expose a semantic `open` property until its attribute surface is decided.

## Unresolved Product Questions

These questions remain open and block promotion of the affected contracts from
`pilot` to `stable`:

### Newsletter response ownership

- Does submission feedback replace the form, render inline, navigate, or remain
  entirely target-specific?
- Which layer owns pending, success, error, retry, and duplicate-submission state?

### Popup email ownership and visibility surface

- Is email capture part of Popup, an optional Input composition, or owned only by
  target content?
- Does `data-open` canonically belong on `.popup-overlay`, `.popup`, or vary by
  presentation?

### Countdown calculation and expiration

- Which layer owns target time, time zone, tick cadence, clock correction, and
  server/client synchronization?
- What renders or happens when the countdown expires?

### Urgency default and data truth

- Is any urgency presentation a valid product default, or must every target select
  one explicitly from verified data?
- Which target data and thresholds substantiate low stock, selling fast, viewer
  count, and recent sale claims?

The pilot contract requires an explicit mapped variant and truthful text. It does
not answer those product questions.

### Cookie preference model

- Which categories exist, which are required, what are their defaults, and what
  control type represents them?
- Which layer stores consent, blocks resources, handles withdrawal, and satisfies
  jurisdiction-specific requirements?

### Announcement capability composition and rotation

- Are countdown, rotation, and dismissal exclusive variants, orthogonal
  capabilities, or a constrained combination?
- How many messages may rotate, at what cadence, with what pause and controls, and
  how is the current message exposed to assistive technology?

The existing CSS rotation remains presentation evidence only, not a complete
behavior contract.

## Consequences

- Marketing contracts are materially more useful to neutral-web adapters without
  claiming unresolved product behavior.
- Runtime calculation, persistence, queueing, submission response, focus
  management, and data verification remain target responsibilities where noted.
- Passing structural validation is still insufficient for `stable`; browser and
  human review remain required by the certification policy.
- No registry, Studio, MDX, JavaScript, target adapter, Shopify Liquid, or generated
  docs output is changed by this decision.
