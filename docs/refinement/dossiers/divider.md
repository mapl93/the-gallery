# Component Dossier: Divider

Status: `stable`

Target reviewed: Neutral Web

Contract: `components/contracts/divider.contract.json`

## Recommendation

Retain two visual variants, `default` and `decorative`, plus independent
`orientation` and `semantics` properties. Divider must have zero external
margin; the composing parent owns all surrounding spacing. Studio presents
`semantics` as the plain-language control `Purpose: Visual only | Semantic`.
Purpose intentionally does not change appearance.

## Purpose And Limits

- Divider creates visual separation or communicates a structural/thematic break.
- Default is a subtle `1px` rule; Decorative is a stronger `2px` rule.
- A Visual-only divider is hidden from assistive technology.
- A Semantic separator is exposed to assistive technology; vertical structure
  also exposes vertical orientation.
- Divider does not own surrounding content, spacing, group labels, drag handles,
  resizing, progress, or menu-item semantics.

## Current Gallery Baseline

- Registry identity: `A14`, primitive, no dependencies.
- Contract: `0.4.0`, `pilot`; one anatomy part, two variants, one size, one
  state, one behavior rule, three properties, and two public tokens.
- Canonical CSS supports horizontal/vertical axes and Default/Decorative visual
  styles with zero external margin in either orientation.
- Exhibit and Studio mount the same registered renderer and initial fixture.
- Decorative semantics map to `aria-hidden="true"`; structural vertical use maps
  `aria-orientation="vertical"` on the same rule.
- Forced colors resolves the rule to the `CanvasText` system color.
- The generic design reference points at the Button pilot frame and is not
  Divider-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: `hr`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element) | `hr` represents a paragraph-level thematic break. | Use native `hr` only when its structural meaning is appropriate; hide visual-only use. |
| [WAI-ARIA 1.2: separator](https://www.w3.org/TR/wai-aria/#separator) | Separator orientation defaults to horizontal; vertical separators need explicit orientation. | Map visual vertical orientation to `aria-orientation="vertical"` when exposed. |
| [Radix Separator](https://www.radix-ui.com/primitives/docs/components/separator) | Orientation and decorative semantics are independent. | Gallery keeps axis and purpose independent from visual style. |

Native HTML and the normative ARIA separator role are the controlling evidence.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | visual-only `hr` hidden from AT, semantic `hr`, or `role="separator"` | Divider | Axis, visual treatment, and semantic exposure live on the same node. |

The parent layout owns the available length and all surrounding spacing. Section
and heading structure must remain meaningful without the line.

## Variant, Size, State, And Mode Matrix

- Variants: Default and Decorative.
- Orientation: Horizontal default or Vertical.
- Purpose: Visual only default or Semantic.
- Size: one default thickness; Decorative uses a thicker rule.
- Modes: light/dark, forced colors, narrow/wide containers, horizontal/vertical.
- No interaction, keyboard, disabled, motion, controlled state, or runtime mode.

Variant, orientation, and purpose remain orthogonal. Purpose has no visual
effect, and spacing is not a Divider variant or property.

## Public API And State Ownership

`variant` selects visual presentation, `orientation` selects the axis, and
`semantics` selects accessibility-tree exposure. Studio relabels the latter as
`Purpose` without changing the public property or values. No arbitrary color,
thickness, margin, width, or height belongs in the semantic API. Divider has no
controlled/uncontrolled state or event.

## Token And Value Audit

- Public color: `--color-border-subtle`, `--color-border-decorative`.
- Literal `1px` / `2px` thickness is private component geometry.
- External margin is always zero; surrounding gap tokens belong to the parent.
- No private custom property or runtime asset is required.

## Visual And Content Audit

Divider has no content. Evidence covers visibility in light/dark, both
thicknesses, horizontal and bounded vertical layouts, purpose parity, zero
external margins, forced colors, and overflow. Localized and long-text cases do
not apply.

## Accessibility And Interaction

Visual-only rules use `aria-hidden="true"`. Semantic horizontal rules use native
separator semantics; semantic vertical rules additionally expose
`aria-orientation="vertical"`. There is no focus, keyboard, name, announcement,
or reduced-motion requirement. A line must not be the only indication of a
section or group boundary.

## Responsive And Performance

The axis and available parent determine layout; there is no viewport API or
media query. Divider adds no JS, observer, listener, timer, network request, or
asset. It belongs to the primitives family budget.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `hr` or separator role; data and ARIA orientation on one node. | Implemented in the shared docs renderer and neutral Web adapter. |
| Shopify | Native Liquid `hr`/separator with canonical classes. | Canonical CSS adapter exists; target-specific visual evidence remains broader adapter work. |
| React / Angular | Thin host element with conditional `aria-hidden` / `aria-orientation`. | Contract-ready; no packaged adapter certified. |
| Figma | Variant, orientation, and purpose properties; purpose has no visual effect. | Component-specific owner reference absent. |
| SwiftUI / Compose | Divider plus accessibility visibility/orientation mapping. | Conceptual mapping only. |

## Exhibit And Studio Parity

ADR 0087 makes Exhibit and Studio consume the same registered Divider renderer,
contract, Studio definition, and initial fixture. Exhibit removes the inspector;
it does not substitute MDX markup or a separate implementation.

## Findings And Direction

| Finding | Status | Resolution |
| --- | --- | --- |
| Default and Section looked identical because Section only changed margin. | resolved | ADR 0281 removes Section and assigns all external spacing to the parent layout. |
| `Meaning: Decorative | Structural` was not understandable in Studio. | resolved | Studio now presents `Purpose: Visual only | Semantic` and documents that purpose has no visual effect. |
| Vertical structural separator needs explicit ARIA orientation. | resolved | Visual and accessibility axes map together. |
| Vertical `height: 100%` depends on parent height. | verified | The bounded Studio fixture establishes the available cross-axis length. |
| Authored background can disappear in forced colors. | resolved | Canonical forced-colors styling uses `CanvasText`. |

## Evidence And Validation

- Exhibit and Studio use the same registered renderer and initial fixture.
- Default visual-only markup is `<hr class="divider" aria-hidden="true">`.
- Default and Decorative are `1px` and `2px`; both have zero external margin.
- Purpose changes only semantic exposure, not computed visual styling.
- Semantic vertical DOM exposes `aria-orientation="vertical"` and no
  `aria-hidden`; Visual only exposes `aria-hidden="true"`.
- Full current results: `docs/reports/divider-web-refinement-audit.md`.

## Risks And Open Questions

- Human visual review closed on 2026-08-25 with explicit approval of the
  complete Divider after the Studio control and preview-alignment corrections.
- Framework, Figma, and native target artifacts are not yet certified outputs.
- There is no remaining Divider API decision about section spacing; ADR 0281 is
  accepted and supersedes that earlier open question.

## Readiness Decision

Approved `stable` by the owner on 2026-08-25. The reviewed Default/Decorative
styles, horizontal/vertical orientation, parent-owned spacing, Visual
only/Semantic purpose, Exhibit/Studio parity, Light/Dark presentation, forced
colors behavior, and target projections remain the v1 baseline.
