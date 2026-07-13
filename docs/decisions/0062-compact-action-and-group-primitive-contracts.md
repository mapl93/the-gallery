# 0062. Compact Action And Group Primitive Contracts

Status: Accepted

Date: 2026-07-12

## Context

Button Group, Icon Button, Close Button, Toggle, and FAB had canonical CSS and
structurally valid pilot contracts, but no reviewed semantic properties or Studio
renderers. Their docs used generic guidance, Icon Button treated composable shape
and fill modifiers as mutually exclusive variants, Close Button claimed Escape
handling, and several native buttons had no disabled presentation.

These primitives are visually related but have different ownership boundaries:
Button Group composes complete Button children, Icon Button owns a named compact
action, Close Button requests dismissal from a containing surface, Toggle presents
a target-owned selection, and FAB exposes target-owned contextual visibility.

## Decision

- Button Group exposes `groupLabel` and the existing Default or Full layout
  variant. Child labels, variants, states, semantics, and activation remain owned
  by Button.
- Icon Button exposes `accessibleLabel`, required `icon`, `variant`, `size`,
  independent `round`, and native `disabled` properties. Default and Filled are
  variants; Round is an orthogonal boolean class.
- Icon Button, Close Button, and FAB use explicit BEM icon-slot classes while
  retaining element selectors for backward-compatible sizing.
- Close Button exposes `accessibleLabel`, required `icon`, and native `disabled`.
  It emits a native dismiss request; Escape handling, exit motion, removal, and
  focus restoration remain owned by the containing surface.
- Toggle retains the registry-established mutually exclusive group pattern.
  The contract exposes `groupLabel` and whole-group `disabled`; target-owned
  slotted buttons own labels, values, and synchronized `aria-pressed` states.
- Neutral web progressively synchronizes Toggle Group selection in regular and
  shadow-root previews. The selected item uses the primary action background and
  text tokens rather than the decorative statement color family.
- FAB exposes `accessibleLabel`, required `icon`, `visible`, and native
  `disabled`. Hidden is the source default. Scroll thresholds, contextual
  relevance, action results, and page synchronization remain target-owned.
- FAB removes transition motion when reduced motion is requested.
- Studio adds a site-only single-icon control backed by the accepted curated
  Lucide catalogue. Lucide names and dependencies remain absent from canonical
  contracts and target adapters.
- Studio examples use three generic options for grouped controls and treat sample
  labels and icons as fixtures rather than public defaults.

## Consequences

- The five components now have reviewed semantic property surfaces without
  duplicating child Button or target application state.
- Shape and presentation can compose correctly on Icon Button.
- Close Button no longer overclaims keyboard behavior owned by overlays.
- Toggle remains intentionally narrower than independent multi-select filter
  chips or a form-submitting Segmented Control.
- The contracts remain `pilot` until owner review and browser evidence satisfy
  every stable certification gate.
