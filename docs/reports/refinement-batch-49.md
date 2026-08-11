# Component Refinement Batch 49

Status: Star Input technically refined and ready for human review

Date: 2026-07-15

Component: Star Rating (Interactive) / Star Input

## Outcome

Star Input's dossier, standards research, native ascending-scale decision,
contract, canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX,
generated adapters, browser evidence and individual audit are reconciled. The
contract remains `pilot`; no component was promoted to `stable`.

The reversed `direction: rtl` visual order is gone. DOM, visual order and native
keyboard progression are all `1` through `5`; every choice has real localized
text, every target is 44px, hover previews the intended value, and validation
composes the accepted Default/Error/Success/Warning field families. Native form
validation, serialization, reset and events remain intact with zero neutral
component runtime.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- Native fieldset/legend and shared-name radios remain the platform behavior
  source of truth.
- A choices wrapper owns fixed LTR numeric order without reversing DOM or
  localized surrounding content.
- Five visually hidden real labels replace English-only `aria-label` strings;
  decorative SVGs remain hidden.
- Outline and filled shape distinguish unselected/selected values without color
  alone. Hover now clears later committed stars before previewing the candidate.
- Default, Error, Success and Warning reuse accepted input validation/focus
  families; only Error sets `aria-invalid`.
- Required and disabled map directly to native form semantics; framework targets
  receive explicit controlled/uncontrolled and reset guidance.
- Studio exposes only stable semantic options and existing public tokens. Icon
  path, star count, scale, gap, artwork geometry and private colors stay private.
- Exhibit and Studio use one renderer and fixture; Review Form's fallback mirrors
  the same canonical Star Input anatomy.
- Web, Shopify and Webflow consume regenerated canonical CSS. Shopify remains
  CSS-ready/planned until provider and form-workflow decisions exist.
- ADR 0134 records the accepted implementation and deferred target boundaries.

## Browser Evidence Summary

- One accessible group named `Your rating` contains five named radios.
- Right/Left and wrap update focus and checked value natively and emit normal
  `input` then `change` events.
- Required-empty is invalid; selected value serializes; reset restores `4`;
  disabled excludes the group from successful form data.
- Error alone sets invalid state; Success and Warning retain descriptive feedback.
- All five labels are `44x44px`; desktop positions increase monotonically.
- Hover `2` fills `[1,2]`; hover `5` fills `[1,2,3,4,5]`.
- Exact Exhibit/Studio initial DOM holds at four canonical viewports with SHA-256
  `9d05fc9af96445a1d973a906486ff5f4986cff465e9983b32112dcb3cf290812`.
- A 220px host, long/unbroken text, Arabic RTL and 200% root font scale produce
  equal client/scroll widths and zero document overflow.
- Light and dark foreground contrasts pass their applicable text/non-text gates;
  forced colors preserves shape and 4px system focus; reduced motion is `0s`.
- Eight paired before images plus one exploratory mobile capture, eight final
  viewport images and 15 special-state images live under
  `output/playwright/refinement-batch-49/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,724 B` | `3.7 KiB` | pass (`64 B` remaining; `+298 B` from Batch 48) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; Star Input adds `0 B`) |
| Neutral Web components CSS | `67,376 B` | `64 KiB` | current gap (`1,840 B` over) |

All ceilings remain unchanged. Existing total-CSS/runtime overages stay explicit
program gaps; validation, target size and hover correctness were not removed to
manufacture a pass.

## Human Queue

Review outline/filled shape, selection and validation colors, 28px artwork
inside the 44px target, spacing, legend typography, focus weight and standalone/
composed alignment. Confirm the fixed five-point v1 boundary, then produce
component-specific Figma artwork. Provider and submission workflow remain
separate target decisions.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
copied CSS, mandatory Shopify research/official validation artifact
`star-input-batch-49` revision 1, structural/static/parity/refinement audits,
browser semantics/keyboard/form/events/states/preferences/RTL/scale/narrow
containment, source/generated identity, deterministic gzip, TypeScript, a
temporary Vite build outside `site/dist`, diff checks, zero browser errors and
`site/dist` cleanliness form the final gate.

## Program Progress

After regeneration the program contains 183 components, 109 dependency edges,
90 dossiers and 78 components ready for human review. Star Input is `refined`
and ready for review, not stable. Review Card (`V4`, review order 151) is the
next dependency-order candidate.
