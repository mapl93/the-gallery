# 0282. Studio Inspector Canonical Control Dogfooding

Status: Accepted

Date: 2026-08-25

## Context

Studio's metadata-driven Customize panel rendered `segmented` controls as a
site-owned `div` with `role="radiogroup"` and a subset of Segmented Control class
names. It did not use the shared `SegmentedControlArtwork` renderer or the
canonical fieldset, visible legend, and options wrapper.

The inspector also fixed that substitute root to `28px` high while the public
Segmented Control correctly preserves a `44px` minimum option height. The visible
labels therefore escaped their containers and overlapped the following Variant,
Orientation, and Purpose rows. Because the substitute lived in
`StudioInspector`, the defect was shared by every component page using that
control kind.

## Decision

- When a public Gallery control exists, Studio Customize composes its complete
  shared renderer and canonical anatomy instead of copying selected class names.
- `control.kind: "segmented"` renders `SegmentedControlArtwork`, including the
  native `fieldset`, accessible `legend`, same-name radio inputs, options
  wrapper, and canonical generated Web CSS. The compact inspector hides the
  duplicate visual legend while the row label remains visible in the common
  left column; assistive technology still receives the native group name.
- Studio metadata continues to own the group label and presentation choice;
  component contracts continue to own values and semantic defaults.
- Site-owned Studio CSS arranges the shared component in the inspector's common
  `64px + remaining width` label/control grid. The visible control surface uses
  the same `28px` compact editor density as Input, Select, and token controls;
  this site-only density does not change Segmented Control's public default.
- Customize keeps two-to-four concise choices in that right-hand control column.
  Sets longer than four use the existing compact Select presentation so every
  inspector row retains the same height and width instead of wrapping labels or
  expanding across the label column.
- Studio must not omit required native anatomy or substitute ARIA for available
  native semantics.
- The same rule applies to future inspector control work: prefer an existing
  shared Gallery artwork/renderer. A site-only primitive is allowed only when no
  public Gallery component represents that design-system tooling need, such as a
  raw token swatch editor.

## Consequences

- One implementation change fixes all `83` segmented controls across `63`
  current Customize panels.
- Inspector selection inherits the same native-radio, focus, and forced-colors
  foundations reviewed for Segmented Control while applying a dense-editor
  visual profile inside Studio only.
- The Customize panel remains site product code, but its semantic controls
  actively dogfood the neutral Web adapter rather than merely resembling it.
- No component is promoted to `stable` by this infrastructure change.
