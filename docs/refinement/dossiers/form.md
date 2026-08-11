# Component Dossier: Form

Status: `human-review-ready`

Target under review: Neutral Web native form composition and responsive layout

Contract: `components/contracts/form.contract.json`

## Recommendation

Use a real `<form>` as the Web root and keep it a composition/layout primitive,
not a validation framework or request client. It arranges canonical Field
Wrapper and Button children, preserves native entry-list/submission/reset and
constraint-validation behavior, and offers optional actions and a linked error
summary. Responsive columns must follow the form container without changing
source or tab order. Submission, pending state, validation logic, server errors,
and error-summary focus timing remain target-owned per ADR 0074.

## Purpose And Limits

- Groups related named controls into a native submission/reset boundary.
- Provides optional sections, headings, responsive rows, canonical action
  composition, and a top-level summary for multiple validation errors.
- It is not a field abstraction, schema validator, data client, async-state
  machine, router, analytics layer, or server-error translator.
- Field Wrapper owns labels/descriptions/inline feedback; controls own native
  values and validity; Button owns action presentation and activation semantics.
- Figma represents layout/states only. Shopify and application adapters own
  platform-specific submission lifecycles.

## Pre-Refinement Gallery Baseline

- Registry `H15`; contract `0.2.0`, `pilot`: twelve anatomy parts, one variant,
  one size, five states, five behaviors, and five properties.
- Root anatomy permits a “form-like” wrapper even though Web behavior claims
  native submission. Content composition is implicit rather than a required
  slot/property.
- Rows switch by viewport media query instead of the component container.
  Sections use external margins; action rows do not wrap/stack safely.
- Error summary is always `role="alert"`, lacks a focus target, uses low-level
  hardcoded type math, and has no special-media handling.
- Exhibit inputs have no names; Studio prevents submission but likewise cannot
  produce meaningful `FormData`. The error fixture marks a field invalid without
  associated inline feedback.
- Exhibit and Studio do not share exact markup/fixture output, and no native
  reset, validation, linked-summary focus, localized content, or narrow-container
  evidence exists.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML forms](https://html.spec.whatwg.org/multipage/forms.html) | Native forms own form-associated controls, entry lists, submitter semantics, constraint validation, `requestSubmit()`, reset, and autocomplete. | Require a real `<form>` on Web and preserve native events/data. |
| [WAI form validation](https://www.w3.org/WAI/tutorials/forms/validation/) | Client validation helps but does not replace server validation; errors must be understandable and associated. | Keep validation policy target-owned and compose canonical field feedback. |
| [WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Error summaries can list messages and link directly to corresponding controls. | Provide semantic summary anatomy and stable anchor targets. |
| [WCAG Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) | Errors must identify the item and explain the problem in text; native validation may focus the first invalid control. | Do not rely on tone alone and preserve native validation unless fully replaced. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | A mature React primitive composes native constraint validation, fields/messages, server errors, and managed first-invalid focus, but notes composition limitations with other primitives. | Adopt the native evidence, not the framework-specific validation/state layer. |
| [Shopify Form](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components/forms/form) | Polaris targets retain implicit submit/reset and named fields, while App Home intentionally processes submission programmatically rather than by HTTP. | Keep base semantics stable and let each target translate submission ownership. |
| Open UI catalogue | No finalized generic Form custom-element proposal supersedes the HTML form contract. | Treat HTML as the cross-target evidence source. |

## Recommended Anatomy, States, And API

- Required: native root and content composition slot. Optional: section,
  section title, responsive row, actions, error summary, summary title/list/item,
  and summary links.
- Preserve one visual variant and size. States are structural: default,
  one/two/three-column rows, actions present, error summary present, native
  invalid submission, and target-owned pending/disabled presentation.
- Preserve accepted properties: `columns`, optional `errorSummary`, optional
  `actions`, `noValidate`, and `autocomplete`; add only the missing required
  content slot needed to state composition ownership.
- Do not add `action`, `method`, request state, validation schema, or server-error
  object in this batch: ADR 0074 deliberately keeps submission and validation
  logic target-owned even though native Web attributes/events are preserved.
- `columns` controls capacity, not DOM order. One column remains the narrow
  fallback; two and three activate only when the form container can support
  them.

## Behavior And Accessibility Direction

- Native submit includes the activated submitter and runs constraint validation
  unless `noValidate` is explicitly true. Buttons use explicit submit/reset/
  button types. Static documentation prevents navigation only at its site
  boundary, not in canonical form semantics.
- All fixture controls must be named, labels associated, and invalid fields
  linked to inline feedback. Form reset restores native default values.
- Error summary contains a text heading and list of anchors. The target decides
  when to insert/announce it and when to focus the summary or first invalid
  control; static presence alone does not force an alert.
- Use container queries, `minmax(0, 1fr)`, resilient action wrapping/stacking,
  logical spacing, accepted type tokens, forced-colors boundaries, and no motion
  unless later target behavior introduces it.
- Long labels, values, error text, translated buttons, RTL, empty optional
  sections, and extreme content must not overflow or reorder reading flow.

## Controlled And Target Translation

- The base Form has no controlled value object. Each named native control owns
  its own current/default value and participates in `FormData`.
- React/Angular adapters may coordinate state but must preserve form-associated
  names, submitter, validation, reset, and native event semantics where possible.
- Shopify theme Liquid can emit a native form; App Home's `s-form` maps submit
  to programmatic persistence. Figma models composition only. SwiftUI/Compose
  map form grouping/actions/validation summary to platform containers and target
  submit handlers.

## Alternatives And Non-Decisions

1. A generic `<div role="form">` does not provide native form data, submitter,
   validation, or reset and is not the neutral Web implementation.
2. Encoding an async mutation state machine would make the base target-specific.
3. Always announcing a static summary as an alert can duplicate information;
   timing/focus belongs to the target validation lifecycle.
4. Viewport breakpoints make embedded forms brittle; container capacity is the
   accepted responsive basis for certification.
5. Schema-generated fields, multi-step forms, autosave, dirty tracking, and
   request retry require separate product/architecture decisions.

## Implemented Result

- Contract `0.3.0` now defines 12 anatomy parts, 1 variant, 1 size, 6 states,
  6 behaviors, 6 semantic properties, and 9 existing public token references.
  The Web root and required content slot are explicit; validation/submission
  timing remains target-owned and the contract remains `pilot`.
- The shared renderer emits one real native form with named canonical fields,
  canonical Button actions, autocomplete, optional linked error summary, and
  exact Exhibit/Studio fixture parity. The docs boundary alone prevents route
  navigation; canonical semantics still expose the submitter and form data.
- Canonical CSS now establishes a named inline-size container, activates two or
  three columns only from `640px` of component capacity, uses `minmax(0, 1fr)`,
  wraps actions, and stacks full-width actions below `399px` without reordering.
  The summary is focusable by target policy but is not a live region by default.
- Internal flow, type, surface, validation, forced-color, and reduced-motion
  rules use existing public tokens and private composition values; no new public
  token or runtime was added.

## Certification Evidence

- Baseline form data is `name=Avery+Stone&email=avery%40example.com`; passing the
  activated Save submitter adds `intent=save`. Reset restores `Avery Stone`.
  Native validity passes by default; the Error fixture fails validity, connects
  `aria-invalid`/`aria-describedby` to its message, and lets the summary anchor
  focus the email field. `noValidate` and autocomplete map directly.
- A detached `800px` container produced three `256px` tracks. At `320px`, the
  row becomes one `320px` track and both actions become full-width in a column.
  A `326px` localized RTL fixture has equal client/scroll width and preserves
  source order.
- Exhibit and Studio canonical markup is byte-identical at 919 characters.
  Eight canonical images
  cover both surfaces at Mobile/Tablet/Desktop/XL; dark, focused error summary,
  three-column XL, extreme RTL, and forced-colors images supplement the labeled
  reconstructed desktop baseline.
- Light summary title/link contrast is `7.24:1`, its boundary is `6.21:1`, and
  the heading is `17.93:1`. Dark equivalents are `9.05:1`, `8.64:1`, and
  `17.18:1`. Forced colors resolves summary text/background/boundary to system
  colors; the component introduces no motion.
- Form adds no listener, observer, request, timer, value mirror, or component
  runtime. Its CSS cost is included in the documented Forms-family exception.

## Current Risks And Human Questions

1. Human review must approve section hierarchy, dividers, row/action gaps,
   narrow stacking, error summary surface, and linked-error presentation.
2. No Form-specific owner visual reference exists beyond the generic Studio
   frame; visual comparison therefore uses repository identity and external
   evidence only.
3. Screen-reader announcement and focus strategy still require target-level
   manual testing because insertion timing is outside the static component.
4. Pending/disabled submission, server error reconciliation, multi-step flows,
   and HTTP versus programmatic persistence remain explicitly outside v1 base.

## Readiness Decision

Ready for explicit human review with the contract still `pilot`. Readiness does
not imply visual approval or promotion to `stable`.
