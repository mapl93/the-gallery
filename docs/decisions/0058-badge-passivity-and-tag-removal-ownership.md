# 0058. Badge Passivity And Tag Removal Ownership

Status: Accepted

Date: 2026-07-12

## Context

Badge and Tag were visually implemented but had no reviewed semantic property
API or Studio renderer. Badge duplicated variant names as states and could be
mistaken for an interactive chip. Tag used an unnamed multiplication glyph,
had no focus or disabled treatment, and its contract claimed Backspace and
Delete behavior that the native button did not implement.

## Decision

- Badge remains a passive inline status or metadata label.
- Badge exposes `label`, `variant`, and `announceChanges`. Info is the default
  classless variant.
- `announceChanges` maps to `role="status"` and defaults to false. Static badges
  do not become live regions.
- Badge variants are presentation options, not interaction states.
- Tag separates required `.tag__label` content from an optional native
  `.tag__remove` button.
- Tag exposes `label`, `removeAction`, `removeLabel`, and `removalDisabled`.
- The remove action emits a native click request. The consuming target owns the
  state update, DOM removal, focus destination, and contextual announcement.
- Enter and Space remain native button behavior. Backspace and Delete are not
  claimed by the base Tag contract.
- Tag's fixed X indicator uses Lucide geometry embedded in canonical CSS without
  adding a runtime dependency to target adapters.
- The remove action receives visible hover, focus, and native disabled states.
- Studio toggle controls and conditional visibility may bind one optional slot
  property. This presentation capability does not change contract semantics.

## Consequences

- Badge, Tag, Button, and Link retain distinct interaction ownership.
- Adapters can render Tag removal as a native button for client-owned state or
  as target-native navigation where the target contract requires it.
- Studio can expose a single optional action without presenting it as an icon
  composition or inventing a boolean component capability.
- Future selectable chips, tag editing, keyboard-managed collections, and bulk
  deletion require separate component contracts.
