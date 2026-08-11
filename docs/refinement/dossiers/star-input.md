# Component Dossier: Star Rating Interactive

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/star-input.contract.json`

## Recommendation

Retain V3 Star Input as the Review family's distinct integer value-entry
control. Use one native fieldset and five named radios in ascending one-through-
five DOM and visual order. Add real localized choice text, outline-versus-fill
state shape, native fieldset disabled behavior, symmetric validation families,
and an explicit native/uncontrolled versus framework-controlled lifecycle.

Do not generalize the control into an arbitrary scale, add half-star input, copy
a framework radio-group implementation, or invent a Shopify review workflow.
Those are product and target decisions. The current strict candidate can enter
human visual review because its unresolved provider boundaries are explicit and
do not change the component's native control semantics.

## Purpose And Limits

- Collect exactly one integer rating from `1` through `5`.
- Present five spatially ordered star choices with 44px activation targets.
- Preserve a visible question and localized name for every choice.
- Participate in native mutual exclusion, required validation, form data and
  reset behavior.
- Support no initial selection or exactly one initial/current value.
- Expose Default, Error, Success, Warning, checked, hover, focus-visible,
  required, and disabled semantics.
- Remain usable without component JavaScript.
- Do not display passive ratings; V2 Star Rating owns that candidate.
- Do not own provider records, aggregation, normalization, persistence,
  authentication, consent, moderation, transport, retries, response states, or
  post-submit focus.
- Do not expose icon source, SVG path, icon size, selector mechanics, star gap,
  focus geometry, or private color composition as consumer API.

## Current Gallery Baseline

- Registry identity: `V3`, `star-input`, category `reviews`, no dependencies.
- Contract baseline: `0.2.0`, `pilot`, native fieldset, legend, five labels,
  hidden radios, optional indicators and six semantic properties.
- ADR 0085 already accepts a distinct native integer input with arrow keys,
  required validation, form reset, submission, touch-sized labels, and no
  provider ownership.
- The baseline DOM was ascending `1..5`, but root `direction: rtl` placed their
  left coordinates at `983, 939, 895, 851, 807` in Desktop Studio. Source and
  visual order therefore disagreed.
- The fieldset itself was `inline-flex`; its floated legend and choices did not
  have an explicit layout boundary.
- Accessible names were English `aria-label` strings. There was no readable
  fallback content when CSS was unavailable.
- All indicators were solid stars; selected and unselected state depended on
  color. Forced colors collapsed both to system text color.
- The component had no Error, Success, or Warning variants despite ADRs 0049,
  0050, and 0051.
- Disabled was duplicated on every radio instead of using the native group
  boundary.
- Exhibit and Studio already shared `ReviewsStudio` and an initial value of `4`.
- Neutral Web was implemented. Shopify and Webflow received CSS copies only;
  no review-provider form was accepted.
- Batch 48 Reviews CSS was `3,426 B` gzip with `362 B` headroom.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Rating Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-rating/) | Rating is a radio-group pattern; Tab enters the checked/first item, Space checks, and arrows move/check next or previous. It calls out visible focus, pointer affordance and high-contrast-safe star/focus treatment. | Preserve native radio focus and ordered arrow movement; project focus onto the star label and test forced colors. |
| [WAI-ARIA APG Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | One labelled group owns mutually exclusive choices and one checked item. | Keep one question and five readable choice names. Native HTML supplies the behavior instead of a roving-tabindex script. |
| [WHATWG Radio Button state](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)) | Shared form owner, tree and non-empty name define the group; one checked radio excludes the others; required applies to the group; input/change are native. | One shared name and one checked value are non-negotiable. Keep native form lifecycle. |
| [WHATWG Fieldset and Legend](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element) | Legend captions the fieldset; disabled fieldset disables descendant controls outside its first legend. | Use the fieldset as group label and disabled owner. |
| [Open UI Radio Button research](https://open-ui.org/components/radio-button.research/) | Research shifted the boundary from standalone radio to the radio-button group and describes the radios as group parts. | Treat Star Input as one group contract, not five independent components. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | Exposes controlled/uncontrolled value, change, name, required, disabled, orientation/direction and keyboard navigation. | Document one controlled group value or one uncontrolled default; do not copy React primitives into base markup. |
| [Shopify Polaris Choice List](https://shopify.dev/docs/api/app-home/web-components/forms/choice-list) | Exposes label, name, values, group disabled, error/details, change/input and selected/default-selected paths. | Group-level state and feedback are stable concepts; Shopify Admin markup is not a storefront review adapter. |
| [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA minimum is 24px; larger targets reduce accidental activation. | Preserve the existing 44px target for each adjacent star. |
| [WCAG 2.2 Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) | A star control may use a rectangular focus perimeter around the focused star; solid outlines are a robust technique. | Keep a high-contrast bounding-box ring projected from the native radio. |

## Reference Comparison

| Concern | Gallery baseline | Standards/mature signal | Recommended Gallery direction |
| --- | --- | --- | --- |
| Group owner | Fieldset and legend | Labelled exclusive group | Preserve native fieldset/legend. |
| Order | DOM `1..5`, visual `5..1` | Next/previous depends on coherent item order | Ascending DOM and visual order; fixed LTR quantitative row. |
| Value state | One checked native radio | One selected group value | Preserve exactly zero or one checked item. |
| Lifecycle | Controlled Studio fixture, native contract | Native/default and controlled modes are both mature | Static Web uses checked default; frameworks control one group value or stay uncontrolled. |
| Choice name | English `aria-label` | Every item needs a readable localized name | Required visually hidden text content, decorative icon. |
| Visual state | Same solid shape, different color | High contrast and non-color distinction | Complete outline empty; solid fill selected/preview. |
| Validation | Default only | Accepted Gallery field rule and Polaris feedback | Default/Error/Success/Warning, message association, aria-invalid only Error. |
| Disabled | Attribute repeated on five radios | Native group disabled exists | Map public disabled to fieldset. |
| Target API | CSS-only | Provider/workflow varies | Web implemented; storefront workflow remains target-owned. |

## Anatomy And Composition

| Part | Required | Semantic/visual owner |
| --- | --- | --- |
| Root | yes | Native `.star-input` fieldset; group disabled, validation class, value evidence and description reference. |
| Legend | yes | Visible localized question. |
| Choices | yes | `.star-input__choices`; ascending fixed one-through-five row. |
| Choice | exactly five | Touch-sized native label for one value. |
| Radio | exactly five | Native exclusive value, focus, keyboard, required, form and reset behavior. |
| Choice label | exactly five | Localized text such as `4 stars`; visually hidden but accessible and CSS-fallback readable. |
| Indicator | exactly five | Decorative target-owned star glyph; outline or filled shape. |
| Feedback | outside root | Visible supporting/validation text owned by the containing form composition and referenced by `describedBy`. |

Star Input has no Button, Radio primitive, Star Rating, icon-library, provider,
or form-composition dependency. Rebuilding it from the A6 Radio component would
duplicate nested labels and the star-specific cumulative projection. It instead
shares the accepted native radio semantics and token families.

## Variants, States And Modes

| Dimension | Values | Ownership |
| --- | --- | --- |
| Validation | `default`, `error`, `success`, `warning` | Public semantic variant independent from selection. |
| Value | none, `1`, `2`, `3`, `4`, `5` | Target/default or one controlled group value. |
| Pointer | resting, fine-pointer preview | CSS only; coarse input has no hover-only dependency. |
| Focus | one native radio | Projected visible ring on its label. |
| Availability | enabled, disabled | Native fieldset state. |
| Requirement | optional, required | Native named-radio constraint validation. |
| Theme | light, dark, forced colors | Semantic/system-color projection. |
| Motion | normal, reduced | Color transition only; removed under reduced motion. |
| Direction | localized legend; fixed LTR scale row | Quantitative one-through-five order remains coherent in RTL contexts. |

There is no loading, busy, pending, pressed, expanded, open, half-value, clear,
empty-message, provider-error, success-response, or submission state on Star
Input. The surrounding Review Form or target workflow owns those concepts.

## Public API Recommendation

| Property/event | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `label` | string | required | Visible localized rating question. |
| `name` | string | required | Shared non-empty native form name. |
| `value` | integer `1..5` | optional | Exactly one current/initial group value; no implicit normalization. |
| `variant` | `default \| error \| success \| warning` | optional | Validation family independent from checked value. |
| `required` | boolean | optional | Native group constraint validation. |
| `disabled` | boolean | optional | Native fieldset disabled state. |
| `describedBy` | ID reference | optional | Supporting or validation feedback relationship. |
| `change` | native event / target callback | when interactive | Reports the newly checked group value. |

Choice labels are required localized repeated content in target markup rather
than five public string properties or one English pluralization template.
Consumers must supply the correct language forms. Do not expose star count,
scale, step, half value, icon name, size, gap, colors, provider id, formatter,
submission callback, or five independent checked flags.

## Token And Literal Audit

- Default uses existing input unfocused, hover and focused-outer border families,
  Button primary fill for the committed selection, and primary text for legend.
- Error, Success and Warning reuse accepted input inner-border, label and
  focused-outer families. Hover preserves the active family.
- `--space-layout-touch-target` owns each 44px choice; `--space-input-icon-gap`
  owns legend-to-row spacing.
- `--typo-body-sm-size` and `--typo-body-sm-line-height` own legend type.
- `--radius-sm`, motion transition and disabled opacity are existing public
  dependencies.
- Private `--_star-input-*` variables compose colors only. They are not public
  customization API.
- The decorative star remains a private 28px artwork decision inside a 44px
  target. Zero inter-star gap and a 4px source focus outline are private
  composition, not new tokens.

## Accessibility And Interaction

- Accessibility snapshot exposes one group named `Your rating` and five radios
  named `1 star` through `5 stars`; decorative SVGs add no image noise.
- Tab enters the checked radio; Space activates an unchecked radio; Right/Down
  move and check the next value; Left/Up move and check the previous value.
- Browser testing from value `4` moves Right to `5` and Left back to `4` with
  focus and checked state synchronized.
- Every label is `44x44px` at all canonical viewports.
- Error sets `aria-invalid`; Success and Warning do not. All validation families
  retain associated visible feedback and matching focus color.
- Fieldset disabled makes all five radios disabled, unfocusable and absent from
  successful form data.
- Required with no checked value is invalid; any checked group value satisfies
  the requirement and serializes the shared name/value pair.
- Forced colors keeps outline versus fill shape and system focus color.
- Reduced motion removes the only color transition.

## Responsive And Content Test Matrix

- Exhibit and Studio at `390x844`, `768x1024`, `1280x800`, and `1600x1000`.
- Values none, `1`, `4`, and `5`; Default/Error/Success/Warning.
- Required empty and satisfied; enabled and disabled.
- Pointer hover on lower and higher values; keyboard focus and arrow wrap.
- Short label, long localized label, Arabic RTL label, empty supporting text and
  long unbroken supporting text.
- Narrow `220px` host, document overflow, 200% root font scale, light/dark,
  forced colors, and reduced motion.
- Verify exact Exhibit/Studio root DOM, five radios, five real labels, one shared
  name, ordered positions, form data, reset semantics, touch targets, no runtime
  listener/observer/timer and no new asset.

## Cross-Target Translation

- Neutral Web: native fieldset/legend, five labelled radios and decorative icons;
  no component JS. Static markup owns default checkedness and the browser owns
  live state.
- Shopify: generated Reviews CSS is available. Liquid can render the native
  group, localized labels and server-supplied checked value, but no review form
  is target-ready until provider/workflow decisions exist.
- Webflow: canonical CSS copy is available; form service, naming and success
  handling stay site-owned.
- React/Angular: `value + onChange` for controlled use or one default value for
  uncontrolled use. Handle form reset deliberately in controlled mode.
- Figma: model one group label, five values, outline/filled states and four
  validation families. Current nodes `943:7` and `1020:480` are generic Studio
  shell/inspector frames, not approved component artwork.
- SwiftUI/Compose: native exclusive selection with one labelled group and five
  localized choice labels; target owns validation announcement and form flow.

## Exhibit And Studio Parity

- One registered `ReviewsStudio` renderer and one fixture serve both modes.
- The renderer emits the same StarInput helper, native root, choices, labels,
  value, validation class and associated feedback.
- Studio exposes exactly the seven semantic properties and existing public token
  dependencies. It does not expose icon source or private selector geometry.
- MDX mirrors the reviewed anatomy as fallback/static evidence.
- Figma inspection confirms only generic shell references, so no visual value is
  promoted from Figma into canonical source.

## Performance Budget

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,724 B` | `3.7 KiB` | pass (`64 B` remaining; `+298 B` from Batch 48) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; Star Input adds `0 B`) |
| Neutral Web components CSS | `67,376 B` | `64 KiB` | current program gap (`1,840 B` over) |

No ceiling changes. The family budget increase pays for three validation color
maps, explicit ordered layout, visible-label fallback, shape distinction and
focus verification. Removing those to manufacture more headroom would violate
accepted field and accessibility decisions.

## Risks And Open Questions

| Risk/question | Status | Required action |
| --- | --- | --- |
| Filled/outline shape, primary color, focus weight and spacing lack human approval. | human visual gap | Review four-viewport and special-mode evidence. |
| No component-specific Figma artwork exists. | human visual gap | Create target artwork after browser candidate approval. |
| Provider, authentication, moderation and submission remain open. | target-owned | Decide in Review Form/Shopify adapter work, not Star Input. |
| Non-five-point, half-step or clearable input may be desired later. | product decision | Explicitly revise value model; do not infer from passive V2. |
| Localized singular/plural labels are target content. | integration risk | Require five truthful localized label strings in every adapter. |
| Controlled adapters can defeat native reset if state is not synchronized. | implementation risk | Document and test one group reset policy per framework target. |
| Reviews CSS has only 64 B headroom. | performance risk | Keep later Review refinements bounded; do not raise the ceiling silently. |
| Global Web CSS/runtime already exceed provisional ceilings. | program gap | Preserve existing exceptions and attribute no runtime to Star Input. |

## Evidence And Validation

- Eight paired baseline screenshots show the reversed visual order in
  Exhibit/Studio at four canonical viewports; one additional exploratory mobile
  capture remains beside them.
- Final evidence covers the same eight views plus validation, value, hover,
  focus, disabled, required, RTL, dark, forced-colors, reduced-motion, narrow and
  200% scale cases under `output/playwright/refinement-batch-49/`.
- Browser inspection verifies ascending positions, five `44x44px` labels, one
  named group, five real choice names, arrow-key selection, validation
  relationships, native disabled/required/form behavior, zero overflow and
  exact shared-root parity.
- Registry/docs, tokens, 183 contracts, 183 Studio definitions, Neutral Web,
  generated target CSS, Shopify validation, parity/static/refinement audits,
  TypeScript, temporary docs build, deterministic gzip, source/generated
  identity, diff checks and `site/dist` cleanliness form the release gate.
- Contract remains `pilot`; readiness means prepared for explicit human review,
  not stable.
