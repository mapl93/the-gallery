# 0207. Canonical Workshop Summary Composition

Status: Accepted

Date: 2026-07-18

Owner confirmation: decision 61, 2026-08-11

## Context

R7 Workshop Listing exposed one required target-owned workshop slot and kept
booking behavior outside the contract, but its implementation duplicated Card,
Price, availability-status and Button presentation. The runtime renderer used
direct articles without native list semantics, a hardcoded hidden section name,
plain spans for price/status, a plain schedule `div`, and a no-op “View details”
button. Selecting Full disabled that button even though details navigation may
remain useful for waitlists, cancellation or future sessions.

The inline Studio fixture and MDX fallback also disagreed on content and time
markup. Canonical CSS fixed media height and duplicated Card hover/transition
behavior, while Studio supplied its own grid, media, padding and breakpoint
rules.

HTML already supplies list, article, heading, time and link semantics. Open UI
records no consensus card anatomy across mature systems. The Gallery already
has canonical Card, Price, Badge and Button components, and the repository has
no approved universal workshop schema, schedule service, capacity model,
booking workflow, Shopify resource or R7-specific Figma evidence.

## Decision

- Neutral R7 is a passive target-authored workshop-summary list. It does not
  define, fetch, sort, filter, validate, localize, reserve, purchase or persist
  workshop records.
- Required records render as native `ul > li > article`. Each valid article has
  stable identity, a non-empty visible contextual heading and explicit
  heading association. Invalid and duplicate-identity peers omit; no valid
  peers omit the complete root.
- The article composes canonical Card media/body/footer anatomy. Optional price
  composes canonical Price, optional availability composes passive canonical
  Badge, and optional action composes canonical Button on the native element
  required by its semantics.
- Schedule is complete target-localized text. Native `time[datetime]` is used
  only when the target supplies a corresponding valid machine-readable value.
  R7 does not calculate occurrences, recurrence, time zones or localization.
- A details destination is a native anchor with the workshop title included in
  its accessible name. Full availability does not automatically disable that
  destination or imply the availability of a booking action.
- Booking, registration, reservation locks, waitlists, authentication, payment,
  cancellation, errors, confirmation, capacity freshness and any live
  announcement remain target workflows.
- `WorkshopListingArtwork` and `buildWorkshopListingFixture` are the single
  registered Exhibit/Studio renderer and fixture path. Sample fields and links
  are docs evidence, not a target-agnostic record schema or component defaults.
- Canonical CSS owns only R7 list/grid, editorial hierarchy, media ratio,
  intrinsic wrapping and footer arrangement. Card owns surface/elevation/
  hover/motion, Price owns currency markup, Badge owns status treatment and
  Button owns link/action focus and interaction.
- The public semantic surface remains one required non-empty `workshops` slot.
  Columns, density, media crop, schedule fields, currency, capacity thresholds,
  action callbacks, heading rank and booking services stay outside R7 API.
- R7 owns no controlled/uncontrolled value, widget role, roving focus, keyboard
  model, event, live region, request, observer, timer, persistence, animation or
  neutral JavaScript.
- R7 remains `pilot`; automated evidence cannot promote it to `stable`.

## Consequences

- Exhibit and Studio use exact shared workshop records and semantics, while the
  MDX fallback remains structurally aligned for audit and no-JavaScript docs.
- Assistive technologies receive native collection/article/time/link structure
  without a fabricated grid widget or whole-card interactive wrapper.
- A full workshop can retain an independently valid details destination; a real
  booking action can later express a separately verified state.
- Canonical primitives remove duplicate markup, tokens, focus, hover, motion,
  currency and availability styling from R7.
- Media-absent, sparse, one-record and footer-free summaries remain possible,
  while empty required data cannot create placeholder cards.
- Workshop record/schema, recurrence/time-zone/localization, price/tax/refund,
  capacity/waitlist/freshness, booking workflow, Shopify mapping, final visuals,
  R7-specific Figma evidence and human approval remain explicit open questions.
