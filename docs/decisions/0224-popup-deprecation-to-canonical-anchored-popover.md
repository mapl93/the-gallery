# ADR 0224: Popup Deprecation To Canonical Anchored Popover

- Status: Accepted
- Date: 2026-07-20
- Supersedes the open choice in ADR 0166
- Related: ADR 0102, ADR 0220 and `docs/refinement/owner-decision-responses.md`

## Context

G4 Popup duplicated overlay, surface, dismissal and visibility concerns while
its Studio fixture behaved as a centered modal dialog. The owner clarified that
the intended component is contextual floating content anchored to its trigger,
matching the interaction model demonstrated by the supplied shadcn/ui Popover
reference. That identity already exists as canonical B9 Popover.

Modal remains useful for marketing campaigns that genuinely block the page,
but that is a composition recipe using canonical Modal, not the meaning of G4.

## Decision

- B9 Popover is the sole canonical non-modal anchored floating-surface
  implementation. It owns the trigger/panel relationship, portable/native open
  state, light dismissal obligations and natural focus behavior.
- G4 `popup` becomes a deprecated pre-v1 migration record. It points to
  `.popover`, shares the same `FloatingMenuStudio` renderer, fixture and Studio
  metadata shape, and owns no independent CSS, runtime or target adapter.
- `.popup-overlay`, `.popup`, `.popup__*`, `.popup--split` and `.popup--slide`
  are removed from canonical Marketing CSS. No compatibility selectors are
  retained.
- The former Popup API is removed. The migration contract mirrors only
  canonical `open`; trigger, title, arbitrary concise content and optional arrow
  remain composition rather than scalar G4 properties.
- The default trigger is the visual anchor. Placement, side/alignment, offset,
  collision, portal/top-layer use and content-derived role remain target
  services, consistent with canonical Popover.
- The surface is non-modal: it has no backdrop, `aria-modal`, inertness, scroll
  lock or focus trap. It closes on Escape, outside interaction and repeated
  trigger activation while preserving natural Tab order.
- Concise marketing content and small target-composed forms may use Popover.
  Page-blocking campaigns, mandatory decisions and long workflows use canonical
  Modal. Menu-like actions use Dropdown Menu.

## Consequences

- The 183-component inventory retains G4 only so migration is explicit; the
  deprecated identity cannot be promoted to `stable`.
- Exhibit and Studio for both B9 and G4 demonstrate the same anchored
  Dimensions fixture, including interactive content and closed focus removal.
- Removing duplicated G4 CSS reduces Marketing-family output without adding
  neutral runtime.
- Shopify and future targets expose canonical Popover or Modal according to
  semantics; they do not publish a G4 adapter.
- Human review applies to canonical Popover surface, anchor geometry and focus
  policy. It does not approve a second Popup visual identity.
