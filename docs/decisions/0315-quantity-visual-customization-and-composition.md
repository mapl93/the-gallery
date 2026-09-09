# 0315. Quantity Visual Customization And Composition

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with Quantity Selector, preserving the separate Number Input
contract. Expose seven source decisions: value width 48px, horizontal/vertical
padding 4/4px, separator width 1px, icon size 16px, action width following Button's
46px minimum, and unitless value line height 1.5. Reuse Input outer border/focus
width/offset and Body weight; all 39 public roles have Studio/Exhibit controls.

Treat the shared Button minimum as the outer control height, as already accepted
for Number Input in ADR 0306. Subtract the outer borders from the actions' minimum
height and stretch them with the native field. This corrects the default 48px
outer height to the owner-requested 46px shared density. Action width remains
independently editable and typography/padding may require a taller control.
Keep the compact wrapper at its intrinsic width inside a grid parent, so the
border does not stretch into unused space beyond the increment action.
Logical separator placement, input centering, native spin suppression and fixed
SVG paths stay implementation mechanics. Colors retain the existing 60% default
and 70% validation mixes, with primary text as the other editable input.

Remove the always-hidden native spinner from the interaction-state list; retain
its CSS and anatomy. Keep mode, constraints, native validity, readOnly and disabled
properties unchanged. The field remains the sole numeric owner, with inventory,
cart persistence and server responses owned by the target.

Studio composes the complete shared Field Wrapper for label and feedback. Its
default preview no longer replaces the canonical mixed border with an unmodified
color. Simulated hover/focus changes the private border input so separators follow
the same selected treatment; expose the outer focus color separately from the
inner-border control. These simulated views do not replace real keyboard checks.

The shared site Quantity artwork delegates stepping to the canonical enhancer and
uses its data hooks and native input events to update the controlled value. Remove
the second stepping implementation that omitted DOM input/change events. Repeated
prop updates synchronize the same node without installing duplicate listeners.
Exhibit, Studio and composed Product/Cart artwork consume this same renderer.

## Acceptance and adoption

Verify defaults and the intentional 2px height correction, all new overrides/reset,
units, border/focus/color propagation, large values, narrow/RTL containers and
validation. Exercise native button/keyboard stepping, exact event count, min/max,
readOnly, disabled, FormData and reset in a CLI consumer and real compositions.
Keep forced-color and reduced-motion coverage and document engine limitations.

Generate Web and Shopify outputs. Consumers adopt compatible CSS/tokens/runtime
explicitly; this does not update existing copies or publish a hosted theme.
Contract remains pilot, with no new platform, package, source format or Figma work.
