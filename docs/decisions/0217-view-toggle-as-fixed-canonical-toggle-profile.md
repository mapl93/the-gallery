# 0217. View Toggle As A Fixed Canonical Toggle Profile

Status: Superseded by ADR 0247

Date: 2026-07-18

## Context

E5 Grid / List View Toggle independently duplicated canonical Toggle's group,
button, hover, focus, selected, disabled, transition and runtime-facing state
contract. It mirrored the current value on root `data-view`, accepted a second
`.is-active` selected alias, used physical separator geometry and hardcoded
English Grid/List accessible names that were absent from the public API.

ADR 0076 already accepts a named Grid/List group with synchronized
`aria-pressed`, one active view, whole-group disabled state and primary-action
selection. ADR 0062 and the refined Toggle contract already establish native
buttons, exactly one pressed item, ordinary Tab order, Space/Enter activation,
progressive exclusive selection and target ownership of item effects and
persistence. E5 needs a fixed Collection profile over that implementation, not
a parallel toggle primitive.

WAI-ARIA APG also documents a meaningful alternative: controls whose choices
are mutually exclusive can use radio-group semantics and arrow navigation.
Radix Toggle Group defaults to roving focus. Changing E5 to that model would
change the accepted keyboard, value and form contract and cannot be inferred
as a technical cleanup.

## Decision

- E5 composes canonical Toggle directly. Its Web root carries
  `.toggle-group.view-toggle`; each native button carries
  `.toggle.view-toggle__btn`.
- E5 has exactly two fixed item identities in stable order:
  `data-view-value="grid"` followed by `data-view-value="list"`.
- Item identity is not current state. The root has no `data-view` state mirror,
  and E5 has no `.is-active` or other selected alias.
- One `activeView` value projects atomically to opposing `aria-pressed` values
  on the two buttons. Exactly one is true whenever the component renders.
- The public semantic API is required non-empty `groupLabel`, `gridLabel` and
  `listLabel`, optional `activeView` defaulting to Grid, and optional whole-group
  `disabled` defaulting false.
- Grid/List labels remain stable when selection changes. Target-supplied icons
  are passive, hidden from accessible naming and are not public icon-library or
  icon-choice properties.
- Missing group or item labels fails closed in the shared docs renderer and must
  fail validation in production adapters. Invalid current values normalize to
  Grid only at the validated adapter boundary; they never produce zero or two
  selected items.
- Canonical Toggle owns native activation, pressed/default/hover/focus/disabled
  presentation, motion reduction and progressive exclusive synchronization.
  E5 CSS owns only joined outer boundary, logical separator, compact cell and
  icon geometry, logical corners and focus stacking.
- The accepted keyboard model remains ordinary native-button Tab order plus
  Space/Enter. E5 adds no arrows, roving tabindex, Toolbar or form semantics.
- Native/static Web may use Toggle's existing uncontrolled progressive
  enhancement after authored initialization. Framework targets may expose one
  controlled value/change callback or an uncontrolled default, but must retain
  one value owner and update both pressed projections atomically.
- The target collection coordinator owns applying Grid/List to results,
  initial-mode policy, filter/sort/pagination/scroll coordination, URL/history,
  storage/account persistence, loading/error lifecycle, analytics and any
  result announcement or focus change.
- E5 adds no component-specific neutral listener, observer, timer, request,
  formatter, storage access, layout read, asset or transition coordinator.
- Shopify remains planned until an owning collection section proves localized
  Liquid markup, result-mode mapping, merchant/editor policy, optional
  persistence and live-store behavior. Copied CSS is not target readiness.
- Exhibit and Studio mount one `ViewToggleArtwork`, one fixture, one canonical
  class composition and the same interaction path. The MDX Preview is a matching
  static fallback, not a second implementation.
- E5 remains `pilot`; automated evidence cannot promote it to `stable`.

## Open Human Boundary

This decision intentionally does not approve:

- migration from the accepted pressed-button model to canonical Segmented
  Control/native Radio semantics, arrow navigation or a submitted form value;
- whether E5 is present when one layout is available;
- initial mode, URL, storage, account, server, analytics, announcement, focus or
  scroll policy;
- the target result DOM/class/template contract or production Shopify surface;
- final cell/touch size, icon geometry, boundary, radius, separator, focus,
  hover, selected or coarse-pointer treatment;
- current registered Figma nodes as E5-specific visual evidence; or
- promotion from `pilot` to `stable` without explicit human review.

The supported architecture alternatives are an explicit future migration to
canonical Segmented Control/native Radio, or omission when a target cannot
truthfully coordinate both layouts. Neither alternative is silently selected by
this refinement.

## Consequences

- Higher-level Collection surfaces consume one canonical pressed-button
  implementation instead of a visually similar E5 fork.
- Required localized item labels close the previous inaccessible target API gap.
- Fixed item values give targets stable event identity without duplicating the
  current value on the root.
- Logical geometry and unclipped canonical focus improve RTL and keyboard
  resilience while preserving the recognizable compact two-cell candidate.
- E5 CSS and runtime become smaller and easier to certify; fixes to Toggle state,
  focus and motion propagate automatically.
- APG radio semantics, target persistence/result architecture, Shopify
  integration, final visuals, E5-specific Figma evidence and explicit stability
  approval remain visible decisions rather than implementation assumptions.

## References

- <https://www.w3.org/WAI/ARIA/apg/patterns/button/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/>
- <https://open-ui.org/components/press-button.explainer/>
- <https://www.radix-ui.com/primitives/docs/components/toggle-group>
- <https://polaris-react.shopify.com/components/actions/button-group>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates/collection>
