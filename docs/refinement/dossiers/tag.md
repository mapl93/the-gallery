# Component Dossier: Tag

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/tag.contract.json`

## Recommendation

Keep Tag as a compact, target-owned value label with one optional native remove
button. A passive Tag is ordinary inline content; when removal is offered, the
remove control requires a non-empty contextual accessible label. Activation
requests removal, but the target owns the actual data/DOM update, the next focus
destination, and any result announcement.

Retain the accepted `label`, `removeAction`, `removeLabel`, and
`removalDisabled` properties. Make `removeLabel` conditionally required whenever
`removeAction` is present and omit the control when a valid name is unavailable.
Do not add selection, toggle, click-whole-chip, Backspace/Delete, editing, link,
avatar, arbitrary icon, tone, or size APIs to this primitive; those are separate
interactive-chip, Tags Input, or target-native navigation contracts.

## Purpose And Limits

- Represents one user- or system-supplied keyword, category, filter value, or
  compact attribute.
- Optionally lets the user request removal through an integrated, named action.
- Not a Badge/status, Button, Link, selectable chip, toggle, multi-value field,
  tokenization engine, autocomplete, or collection controller.
- Does not own the tag array, removal mutation, asynchronous result, focus
  destination, announcement string, validation, duplicate policy, ordering,
  serialization, or keyboard editing model.
- Tags Input may compose Tag later and owns input/list behavior; Tag must not
  pre-empt that component's collection semantics.

## Gallery Baseline Before This Batch

- Registry `A8`, Primitives, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS renders a full-radius outlined label with optional 20px native
  remove button and a fixed CSS-mask X using Lucide geometry.
- The remove action supports native disabled, hover, and focus-visible states;
  hover runs for every pointer type and forced colors only remaps the glyph.
- Typography uses body-size calculations and a raw line height instead of the
  accepted body-small role. Physical width/height/max-width properties are used
  instead of logical equivalents.
- The label can wrap unbroken content and the root has `max-width: 100%`, but
  narrow/RTL/zoom behavior and the exact 24px target have not been evidenced.
- Studio can render an unnamed button when `removeAction=true` and
  `removeLabel` is empty. Its demo removes the focused control and shows a live
  message without moving focus to a deliberate surviving target.
- Exhibit and Studio already share `LabelPrimitiveStudio` and one fixture.
  Studio's shared Gallery frame is not component-specific visual approval.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Buttons need an accessible label; native activation expectations are Enter and Space. Focus usually remains when context remains, or moves to a logical starting point after a context change. | Use a native named button and let the target choose a surviving focus destination after removal. |
| [WCAG 2.2 target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | Pointer targets should contain a 24 by 24 CSS-pixel area unless an exception applies. | Preserve and measure the integrated remove target at no less than 24 by 24 CSS px. |
| [WCAG 2.2 status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) | Visible results of an action that do not move focus may require programmatic status semantics, while unnecessary live regions can become chatty. | The target may announce a removal result; Tag itself must not hardcode announcement wording or a live region. |
| [Open UI Tag research](https://open-ui.org/components/tag/) | Prior art includes closable, filter, checkable, link, disabled, size, color, avatar, and truncation concepts, but does not establish one interoperable web primitive. | Keep Gallery's removable-label scope narrow and split selection/navigation/field behavior into dedicated contracts. |
| [Shopify Polaris Tag](https://polaris-react.shopify.com/components/selection-and-input/tag) | Tags are merchant-supplied keywords. Removal uses a contextually labelled native button with Tab, Enter, and Space; after removal, focus should move to the next logical element. | Confirms native removal semantics, conditional accessible naming, and target-owned focus management. |
| [Shopify Polaris Chip](https://shopify.dev/docs/api/app-home/web-components/typography-and-content/chip) | Separates passive Chip from clickable/removable Chip and recommends concise scannable labels. | Confirms that whole-root click/selection should not be silently added to Gallery Tag. |

## Matches, Differences, And Direction

- Gallery already matches the native button, contextual `aria-label`, fixed X,
  disabled state, compact label, and target-owned removal boundary.
- Gallery's current property combinations allow an incoherent unnamed control;
  conditional validity must be explicit in contract and renderer.
- Polaris React combines several mutually exclusive clickable/link/removable
  modes. Gallery deliberately keeps only passive + optional removal so its base
  contract translates cleanly across targets.
- Open UI documents naming and feature variance, not a platform behavior model.
  It supports splitting selection, navigation, and input composition rather
  than accreting them into Tag.
- Direction: named native removal, deliberate target-local focus proof, 24px
  target, logical/forced-color CSS, semantic body-small type, and zero neutral
  JavaScript.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `span` | Tag | Passive inline grouping; not one large button. |
| Label | yes | text content | target | Non-empty, visible, localized, and resilient to long content. |
| Remove action | no | native `button type="button"` | Tag/target | Rendered only with a valid contextual name. |
| Remove indicator | generated | decorative CSS mask | Tag | Fixed X geometry; no runtime icon dependency. |

A collection, text input, list semantics, add action, restore action, and live
result are fixture/consumer composition and never Tag anatomy.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Composition | Passive label or label + remove action. |
| Size | One compact root; remove target at least 24 by 24 CSS px. |
| Remove state | Default, fine-pointer hover, focus-visible, and native disabled. |
| Content | Short, long, localized, RTL, and unbroken label; empty label invalid. |
| Configuration validity | `removeAction=false` ignores removal fields; `true` requires non-empty `removeLabel`. |
| Removal lifecycle | Target-controlled request, update, focus destination, and optional announcement. |
| Forced colors | Root boundary, glyph, focus, and disabled affordance remain perceivable. |
| Reduced motion | No animation or transition. |

Whole-tag click, selection, pressed state, editable mode, link mode, drag reorder,
Backspace/Delete handling, and implicit DOM removal are unsupported.

## Public API And State Ownership

- `label` — required non-empty visible value.
- `removeAction` — optional removal-action slot/availability flag.
- `removeLabel` — conditionally required non-empty contextual accessible name
  when `removeAction` is present, for example “Remove Stoneware filter”.
- `removalDisabled` — default `false`; maps to native `disabled` on the remove
  button and has no effect when no action exists.
- Activation emits/forwards one target-native removal request. The target owns
  controlled data, DOM reconciliation, pending/error policy, focus, and any live
  result. Tag has no neutral uncontrolled mode.

## Token And Value Audit

- Existing public tokens cover secondary surface/text, subtle/focus borders,
  body typography, a 20px input icon size, full radius, and disabled opacity.
- Map text to accepted body-small size and line height instead of derived body
  calculations. Preserve `--space-input-icon-size` as the 24px action target.
- Add a private 24px accessibility floor around the accepted 20px icon-size
  token; the repository has no accepted compact-target semantic token and the
  44px general touch-target token would erase Tag's integrated compact anatomy.
- Background, text, border, focus, remove size, and directional padding aliases
  are private composition contracts. Local 4/8/12px spacing, 1px border, 2px
  focus geometry, 14px glyph, and mask path stay private.
- Do not expose remove opacity, icon choice, radius, padding, or focus geometry
  as public API.

## Visual And Content Audit

- Preserve the restrained secondary pill, subtle outline, compact body-small
  type, and integrated X as the human-review candidate.
- Passive and removable Tags must align on the same baseline. The optional
  control must not cause root overflow or collapse the label below useful width.
- Long/unbroken/localized values wrap within the container; concise authoring is
  still preferred for scanability.
- Verify the X remains crisp at normal/high density and understandable in dark
  and forced-colors modes without relying on Lucide at runtime.

## Accessibility And Interaction

- Passive Tag has no role, focusability, or keyboard behavior.
- Removal is a native `button type="button"` with a non-empty contextual name,
  standard Tab/Shift+Tab/Enter/Space behavior, visible focus, and native
  `disabled`. No custom key handler is needed.
- Do not bind Backspace/Delete at Tag level; Tags Input may define its own field
  editing model later.
- After removal, the target moves focus to a logical surviving control/value or
  input. If it displays a result without moving focus, it may use a target-owned
  status region with localized content.
- The 24px action is the minimum v1 pointer target; visual size and spacing still
  require human review.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus passive/removable/disabled,
  real hover/focus, keyboard activation and focus destination, missing-name
  invalidity, long/unbroken/localized/RTL content, dark, forced colors, and 200%
  zoom/narrow containment.
- Neutral component runtime budget is `0 B`: no listener, key handler, state
  store, timer, observer, request, or measurement ships in `components/js`.
- Batch 21 starts at Primitives `10,268 B`, Web component CSS `63,981 B`, and
  shared runtime `10,321 B` deterministic gzip. Primitives retains `279 B`
  before its permanent `10.3 KiB` ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Passive `span` + optional named native button; target event/focus lifecycle. | CSS, native behavior, validity, focus and resilience evidenced. |
| Shopify | Passive Liquid tag; removable link only when removal is navigation, otherwise Button + target controller. | Canonical copied CSS and collection navigation mapping validated; Tags Input remains next. |
| React / Angular | Controlled label/action props; callback requests removal; consumer reconciles and manages focus. | Planned; no neutral framework state. |
| Figma | Passive/removable/disabled compositions and action states. | Studio metadata exists; visual approval pending. |
| SwiftUI / Compose | Text capsule with optional native remove control/action. | Conceptual; accessibility announcement/focus APIs remain adapter-specific. |

## Exhibit And Studio Parity

`LabelPrimitiveStudio` and one fixture serve both modes. Invalid unnamed removal
now degrades to a passive Tag, and the fixture moves focus to a canonical Button
destination after removal and back to the restored action. That proof remains
target lifecycle evidence, not a Tag dependency or neutral behavior promise.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| An unnamed remove button can be rendered. | critical | Require a non-empty contextual name and omit invalid action markup. | implementation |
| Removal demo loses its deliberate focus target. | high | Prove target-owned focus movement to a surviving canonical control. | implementation/fixture |
| Forced-colors only maps the X glyph. | high | Map root boundary, glyph, focus, and disabled affordance to system colors. | implementation |
| Typography and geometry use derived/physical properties. | medium | Use body-small tokens and logical sizing. | implementation |
| Hover is not restricted to a fine pointer. | medium | Gate purely visual hover enhancement to hover-capable fine pointers. | implementation |
| Density, radius, palette, and 24px target need visual approval. | human review | Preserve as candidate; do not promote. | owner |

## Risks And Open Questions

1. Surface, outline, pill radius, compact spacing, X weight, opacity, and exact
   pointer target require human visual approval.
2. Tags Input must later decide collection semantics, add/remove announcements,
   deletion keys, validation, duplicate policy, and focus order without changing
   this primitive's passive/removal boundary by assumption.
3. Selectable, clickable, linked, editable, draggable, avatar, tone, and icon
   variants require separate evidence and architecture decisions if requested.

## Implementation And Verification

- Contract `0.3.0`, registry, MDX, Studio `0.2.0`, canonical Primitives CSS and
  one shared renderer/fixture now describe the same conditional-name and target-
  owned removal/focus boundary.
- Body-small typography, logical geometry, a private 24px action floor, fine-
  pointer hover and complete system-color treatment replace derived type, 20px
  physical sizing, unconditional hover and partial forced colors.
- The action measures `24×24px`, has one contextual name and native disabled
  behavior. Whitespace-only `removeLabel` produces zero remove Buttons. Enter
  and Space both move focus to the surviving target-owned Restore Button; the
  restored action regains focus deliberately.
- Text/surface contrast is `7.17:1` light and `10.21:1` dark. A long Arabic RTL
  value at 320px stays inside `256×50px` with zero page/internal overflow.
- Eight canonical after images cover Exhibit/Studio × 390/768/1280/1600; seven
  focus/invalid/removal/disabled/localized/dark/forced-color images and two
  before images provide comparison evidence.
- Neutral runtime delta is `0 B`. Final deterministic gzip is Primitives
  `10,356 B`, Web component CSS `64,070 B`, and shared runtime `10,321 B`.

## Readiness Decision

Implementation, documentation, evidence, automated validation, and target
translation are complete for explicit human review. Visual approval and Tags
Input collection policy remain pending. The contract stays `pilot`.
