# 0304. Choice Control Visual Customization

Status: Implemented; visual stability remains subject to owner review

Date: 2026-09-08

## Decision

Continue ADR 0293 with Checkbox, Radio and Switch. Preserve their native state,
validation variants, established sizes and shared visual defaults. Add 17 public
source tokens in the existing component layer for previously hidden decisions:

| Component | New decisions | Defaults |
| --- | --- | --- |
| Checkbox | Border width; indicator size; default and validation indicator colors | 1.5px; 14px; primary Button foreground and gray 900 |
| Radio | Border width; selected-dot inset | 1.5px; 4px |
| Switch | Width, height and thumb size for default/small/large; border width; thumb inset | 44/24/18px, 36/20/14px, 52/28/22px; 1px; 2px |

Expose the existing shared Input focus width/offset tokens in all three controls,
retaining 4px/0px. Label family and the existing Body weight become explicit;
`--typo-body-weight` is an output alias to the existing semantic role, not a new
source value. Existing size, label-gap, radius, color, opacity and motion APIs
remain available. Switch adds the previously missing Off surface and Hover
border controls. Its size-specific controls follow the selected size.

Contracts own the public token inventory; Studio references it and Exhibit uses
that same metadata. Simulated focus consumes canonical private color derivations
and public geometry, rather than restating dimensions or overriding resting
border contrast. Selection and validation remain independent.

## Rendering and compatibility

Screenshot review found the old white mark invisible against the nearly white
selected surface in Dark. The default indicator now aliases the primary Button
foreground, following the selected surface across themes; Validation retains
gray 900. This is a targeted visibility correction, not a new visual variant.

Checkbox's existing Check/Minus geometry becomes a CSS mask on the native
appearance-none control. Its color and size are public; path shape and stroke
geometry remain the accepted fixed indicator design. No markup, icon-library
runtime or selection logic is added. Forced colors hides the mask and restores
the native control.

Radio retains its inset-shadow dot. Increasing dot inset reduces the visible dot;
the consumer must keep it smaller than half the control's available interior.
Switch computes checked thumb placement from the actual track interior, thumb
size and inset, so border edits preserve equal space on both sides, including
RTL. The inset is inline only; the thumb remains vertically centered. Consumers must
keep width large enough for the thumb, two borders and two insets, and height
large enough for the thumb and two borders. Incompatible overrides are not
normalized silently.

Shared input icon size/gap aliases remain public for compatibility with existing
Checkbox/Radio and label-gap consumers. This batch does not rename that API.
Private border/label color mixes remain 60%/70%/55% inputs to a rendered color;
controls edit their documented inputs, not a promise of exact final color.
Roundness, disabled opacity, motion and thumb shadow continue to use shared roles.

Structural layout, centering, wrapping, hidden native Switch input geometry,
continuous border style, icon paths and forced-color system colors remain CSS.
There are no new size variants, validation meanings, token layers or modes.

## Composition

The existing contact composition now uses the shared Checkbox, Radio and Switch
renderers. Radio chooses the deferred reply preference, Checkbox adds optional
care notes, and Switch immediately shows visit information. Switch has no form
name because this local display preference is not submitted request data. The
composition owns validation, feedback, local preview and reset; no data is sent.

## Acceptance

- Source resolves in all eight matrices with migration parity.
- Public tokens reach CSS, contracts, registry and shared Exhibit/Studio controls.
- Non-default edits and Reset work; default geometry is preserved in Light/Dark.
- Native keyboard selection, mutual exclusion, form values, required/disabled,
  mixed Checkbox, immediate Switch effect and reset remain intact.
- Focus, reduced motion, forced colors, long labels and Switch RTL are checked.
- Web and Shopify generated assets agree with source. No remote deployment or
  automatic stable promotion is implied.
