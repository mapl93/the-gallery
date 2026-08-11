# ADR 0179: Cart Empty As Canonical Empty State Profile

> Update (2026-07-20): ADR 0236 resolves the inherited heading boundary.
> Cart Empty receives contextual native heading markup from its host; heading
> rank is not a K7 property. Shopify main cart supplies H1.

Status: Accepted

Date: 2026-07-17

## Context

K7 declared Empty State and Button dependencies but duplicated the complete
empty-state DOM and visual CSS through `.cart-empty__icon`, title, message and
action classes. Studio invented `#collection` when an action label was present
without a destination, while Shopify already rendered the canonical Empty State
snippet from authoritative cart state but did not expose the K7 profile hook or
use existing locale and route facts.

Canonical Empty State already owns the accepted passive resolved-absence
composition: ordinary root, required visible title, optional decorative icon
and message, one Button-or-Link action slot, container resilience, and
target-owned lifecycle, announcements, focus and contextual heading markup.
Maintaining a second K7 implementation violates canonical composition and
consumes Cart family budget at its ceiling.

## Decision

- Cart Empty is a commerce-context profile of canonical Empty State.
- Web layers `.cart-empty` on `.empty-state`. Icon, title and message use only
  canonical Empty State part classes. K7 owns no child-class or visual-token API.
- The optional recovery destination is one native Link with canonical Button
  presentation. Existing semantic properties remain `actionLabel` and `href`;
  the action renders only when both trimmed values are non-empty.
- K7 never invents a fallback URL, command callback, disabled/loading action,
  second action, cart record, result state, event, focus target or live-region
  property.
- The static root is an ordinary grouping element. The target chooses a native
  contextual heading. K7 does not resolve Empty State's open cross-context
  heading-rank decision or add a `headingLevel` property.
- The parent cart coordinator owns authoritative empty truth, atomic replacement
  of lines/totals/discount/checkout composition, qualifying localized Status
  output, focus recovery, history, analytics and future Ajax/drawer lifecycle.
- The docs target extracts one `EmptyStateArtwork`; both canonical Empty State
  and `CartEmptyArtwork` consume it. Exhibit and Studio use the same K7 renderer
  and fixture.
- Shopify exposes a dedicated `cart-empty` translation snippet that delegates
  markup to the existing Empty State snippet. Main cart consumes it with
  localized cart strings and `routes.all_products_collection_url`. The inherited
  fixed-H3 snippet gap remains governed by the existing Empty State decision.
- The obsolete K7 child classes and their duplicated declarations are removed
  without pre-v1 compatibility aliases.

## Alternatives Considered

### Keep The Parallel Cart Empty Implementation

Rejected. It leaves two sources for the same anatomy, typography, spacing,
responsive behavior and action treatment, while the declared Empty State
dependency remains nominal.

### Replace `actionLabel` And `href` With A Generic Action Slot

Not selected for K7 v1. Empty State already provides the generic slot. K7's
domain contract intentionally describes one cross-target recovery navigation,
and a validated label/destination pair is more useful to Shopify, Webflow and
native adapters than unconstrained composition. A broader command/multiple-
action API would require product evidence.

### Add Cart Empty Heading Or Announcement Properties

Rejected. Heading rank depends on surrounding page/drawer structure and is the
existing canonical Empty State architecture question. Announcements and focus
depend on the cart transition, not the final static presentation.

## Consequences

- Cart Empty inherits improvements and human review applied to canonical Empty
  State and Button instead of drifting independently.
- K7 adds zero neutral runtime and materially reduces Cart CSS.
- Invalid blank-title and one-sided action states can be omitted deterministically
  without synthetic content or destinations.
- Shopify has a concrete target-native mapping without adding a second snippet.
- Human review still must approve icon, centered hierarchy, rhythm, action
  emphasis and localized/narrow balance. The contract remains `pilot`; this ADR
  does not promote it to `stable`.
- Live Shopify Ajax/drawer transition evidence and the inherited Empty State H3
  gap remain explicit target and architecture work.
