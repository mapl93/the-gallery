# Component Dossier: Divider

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/divider.contract.json`

## Recommendation

Retain the accepted `variant`, `orientation`, and `semantics` properties. Fix the
vertical structural mapping so visual and accessible orientation agree, prefer
native semantic fallback over a decorative-only abstraction, and verify vertical
stretching and forced colors. Do not decide whether `decorative` and `section`
remain exclusive variants or become orthogonal modifiers: that contract question
is already explicit in `docs/OPEN-QUESTIONS.md`.

## Purpose And Limits

- Divider creates visual separation or communicates a structural/thematic break.
- It is appropriate between adjacent content when whitespace alone is
  insufficient; it is not a substitute for headings, sections, lists, or layout.
- Decorative presentation is hidden from assistive technology.
- Structural presentation is exposed as a separator; vertical structure must
  expose vertical orientation.
- Divider does not own surrounding content, group labels, spacing layout, drag
  handles, resizing, progress, or menu-item semantics.

## Current Gallery Baseline

- Registry identity: `A14`, primitive, no dependencies.
- Contract: `0.3.0`, `pilot`; one anatomy part, three variants, one size, one
  state, one behavior rule, three properties, and four public tokens.
- Canonical CSS supports horizontal/vertical axes and Default, Decorative, and
  Section presentation.
- Shared Exhibit/Studio renderer uses one `<hr>` fixture. Decorative semantics
  map to `aria-hidden="true"`.
- Vertical presentation maps both `data-orientation="vertical"` and, when
  structural, `aria-orientation="vertical"`; decorative use remains hidden.
- Forced colors resolves the rule to the `CanvasText` system color instead of
  allowing its authored background to collapse into the canvas.
- The generic design reference points at the Button pilot frame and is not
  Divider-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: `hr`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-hr-element) | `hr` represents a paragraph-level thematic break, not arbitrary decorative layout. | Use native `hr` only when its structural meaning is appropriate; hide decorative use. |
| [WAI-ARIA 1.2: separator](https://www.w3.org/TR/wai-aria/#separator) | Separator orientation defaults to horizontal; vertical separators need explicit orientation. | Map visual vertical orientation to `aria-orientation="vertical"` when exposed. |
| [Radix Separator](https://www.radix-ui.com/primitives/docs/components/separator) | Exposes orientation and decorative semantics independently. | Gallery's semantic surface is aligned; visual variant remains Gallery-owned. |
| [Radix Themes Separator](https://www.radix-ui.com/themes/docs/components/separator) | Adds size/color/margin presentation over the primitive. | Gallery should keep reviewed token controls without exposing every margin or color as semantic API. |
| [Shopify Polaris components](https://shopify.dev/docs/api/app-home/web-components) | Divider is a layout/structure primitive for clear visual separation. | Shopify can map to native/target separator presentation without changing Gallery semantics. |

Open UI and APG do not define a richer Divider widget pattern. Native HTML and
the normative ARIA separator role are the controlling evidence.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | decorative `hr` hidden from AT, semantic `hr`, or `role="separator"` | Divider | Axis, visual treatment, and semantic exposure live on the same node. |

The surrounding layout owns cross-axis size for a vertical divider. Section and
heading structure must remain meaningful without the line.

## Variant, Size, State, And Mode Matrix

- Variants: Default, Decorative, Section.
- Orientation: Horizontal default or Vertical.
- Semantics: Decorative default or Structural.
- Size: one default thickness; Decorative currently uses a thicker rule.
- Modes: light/dark, forced colors, narrow/wide containers, horizontal/vertical.
- No interaction, keyboard, disabled, motion, controlled state, or runtime mode.
- Open contract decision: Decorative emphasis and Section spacing are currently
  exclusive variant choices even though they describe different axes.

## Public API And State Ownership

The three existing properties are understandable, cross-target, and validable.
`variant` selects existing visual presentation; `orientation` selects the axis;
`semantics` selects accessibility-tree exposure. No color picker, arbitrary
thickness, margin, width, or height belongs in semantic API. The parent layout
owns the available length. Divider has no controlled/uncontrolled state or event.

## Token And Value Audit

- Public color: `--color-border-subtle`, `--color-border-decorative`.
- Public spacing: `--space-layout-element-gap`,
  `--space-layout-section-gap`.
- Literal `1px` / `2px` thickness is current component geometry. It should not
  become public solely because it is a literal.
- No private custom property is currently required; there is no runtime asset.

## Visual And Content Audit

Divider has no content. Evidence must cover visibility on light/dark and forced
colors, the two thicknesses, both spacing modes, vertical stretch inside a
bounded flex container, and zero overflow at all four viewports. Empty content is
the valid component shape; localized and long-text cases are not applicable.

## Accessibility And Interaction

Decorative rules remain `aria-hidden="true"`. Structural horizontal rules use
native or separator semantics; structural vertical rules must expose
`aria-orientation="vertical"`. There is no focus, keyboard, name, announcement,
or reduced-motion requirement. A line must not be the only indication of a
section or group boundary.

## Responsive And Performance

The axis and available container determine layout; there is no viewport API or
media query. Divider adds no JS, observer, listener, timer, network request, or
asset. It belongs to the primitives family budget.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `hr` or separator role; data and ARIA orientation on one node. | Vertical ARIA mapping pending. |
| Shopify | Native Liquid `hr`/separator with canonical classes. | CSS adapter exists; target visual evidence pending. |
| React / Angular | Thin host element with conditional `aria-hidden` / `aria-orientation`. | Contract-ready; no packaged adapter certified. |
| Figma | Variant, orientation, and semantics properties; semantics has no visual effect. | Component-specific owner reference absent. |
| SwiftUI / Compose | Divider plus accessibility visibility/orientation mapping. | Conceptual mapping only. |

## Exhibit And Studio Parity

ADR 0087 mounts the same Divider renderer and fixture in Exhibit and Studio.
Studio adds controls and stage sizing only. The renderer must map vertical ARIA
orientation on the same node used by both views.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Vertical structural separator lacked `aria-orientation="vertical"`. | resolved | Visual and accessibility axes now map together. | implementation |
| Vertical `height: 100%` depends on explicit parent height. | verified | The bounded Studio flex fixture stretches to `192px`; the parent continues to own available length. | implementation |
| Authored background disappeared in forced colors. | resolved | The canonical forced-colors rule resolves to black `CanvasText` on the white system canvas. | implementation |
| Decorative and Section may be orthogonal rather than exclusive. | decision-needed | Preserve current API and present alternatives; do not change without owner/architecture input. | owner / architecture |
| No Divider-specific visual reference exists. | review input | Approve repository render or supply a reference at human review. | owner |

## Evidence And Validation

- Exhibit and Studio share identical default markup and fixture:
  `<hr class="divider" aria-hidden="true">`.
- Eight final screenshots cover Exhibit and Studio at `390 x 844`, `768 x 1024`,
  `1280 x 800`, and `1600 x 1000` under
  `output/playwright/refinement-batch-02/`.
- The six orientation/variant combinations were measured. Horizontal rules are
  `1px`/`2px`; vertical rules are `1px`/`2px x 192px`; Section spacing resolves
  to `96px` on the active axis and default spacing to `32px`.
- Structural vertical DOM exposes `aria-orientation="vertical"` and no
  `aria-hidden`; Decorative exposes `aria-hidden="true"` and no redundant ARIA
  orientation.
- Forced-colors before/after evidence is
  `divider-vertical-structural-forced-colors-desktop.png` and
  `divider-vertical-structural-forced-colors-desktop-after.png`.
- Full results: `docs/reports/divider-web-refinement-audit.md`.

## Risks And Open Questions

- Blocking public API decision: keep `default | decorative | section` exclusive,
  or split visual emphasis from section spacing.
- Visual approval input: no component-specific reference is registered.
- Non-blocking target debt: framework/Figma/native target artifacts are not yet
  certified outputs.

## Readiness Decision

Ready for human review, not `stable`. The implementation and evidence gates are
complete. Human review must approve the current visual treatment and decide
whether emphasis and section spacing remain mutually exclusive variants.
