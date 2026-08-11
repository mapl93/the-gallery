# Component Dossier: Address Form

Status: `human-review-ready`

Target under review: Neutral Web canonical Form specialization with documented
native handoff for Shopify current accounts

Contract: `components/contracts/address-form.contract.json`

## Recommendation

Define U7 as a native `form.form.address-form` specialization that consumes
canonical Form and supplies only localized address composition plus responsive
layout. Keep the two properties accepted by ADR
0078: required `fields` composition and optional `actions` composition. Field
inventory, labels, names, values, autocomplete purpose, requiredness,
locale-specific ordering, validation messages, mutation state, routes, and
result feedback remain child-control or target concerns rather than becoming
Address Form properties.

The required field composition must be complete enough for the selected target
address model and use canonical Input and Select controls. Every successful
control needs a stable submission `name`, an explicit visible label, and the
correct standardized autocomplete purpose. The docs fixture demonstrates four
required text fields and one required country Select; that inventory is an
example, not a universal address schema. It uses `address-line1` for its one-line
street input and `country-name` for country-name option values.

Preserve native form constraint validation and explicit submit. Do not submit
on blur, change, or country selection. A target that adds server or custom
validation must identify each error in canonical field text, associate it with
its control, and compose a linked canonical Form error summary when an overview
is useful. The target moves focus to that summary or the first invalid control.
Success,
failure, pending, authentication expiry, and cancellation feedback stay outside
U7; the docs site can announce intercepted fixture actions outside the form.

Use canonical Form, Button, and Select instead of reproducing their semantics or
state inside Account Studio. Submit remains explicit. Cancel is optional target
navigation or close composition using Button `type="button"` or Link semantics;
it never means reset. The docs fixture preserves its draft values and reports
only that navigation/closure was requested.

Make layout container-driven with one shared inline-size container carrying the
`form` and `address-form` names. Canonical Form retains its root/action behavior;
U7's compact two-column rows collapse from the same available inline size while
DOM and focus order remain unchanged. Keep maximum measure and thresholds
private. Expose only the semantic spacing tokens consumed by U7; add no public
column, width, breakpoint, field-count, alignment, action-order, validation, or
mutation properties.

Owner decision U7-A and ADR 0264 resolve the architecture boundary: U7 formally
depends on canonical Form and keeps direct Input, Select, and Button dependencies
for its target-composed controls. The same decision resolves locale-specific
target schemas, explicit submission, non-reset cancellation, field-addressable
errors, and useful canonical Form summaries without adding new root properties.

Contract maturity remains `pilot`. U7 is ready for human stability review of the
candidate, but localized protected-mutation integration, target error/focus
evidence, final visuals, and corrected U7-specific design evidence remain before
cross-target implementation readiness or `stable`.

## Purpose And Limits

- Collects a target-defined postal/customer address through a native form
  boundary.
- Arranges canonical address fields through canonical Form section/row/action
  hooks with an optional responsive compact two-column profile.
- Preserves native form serialization, validation, submission, focus order,
  autofill purpose, and child-control semantics.
- Is not an address schema, locale formatter, postal validator, geocoder,
  deduplicator, authentication gate, customer API client, mutation coordinator,
  optimistic-state store, error generator, router, confirmation dialog,
  telemetry client, or live region. It may compose canonical Form's summary.
- Does not prescribe billing versus shipping scope, country/state dependency,
  field inventory, requiredness, field names, endpoint shape, create versus edit
  mode, or the target's actual navigation/close destination.
- Does not own pending, success, failure, offline, unauthorized, expired,
  conflict, or rate-limit presentation. Targets compose those surfaces outside
  U7 and connect errors to the canonical fields that own them.

## Repository Baseline Before Refinement

- Registry and contract `0.1.0`, `pilot`, declare Input, Select, and Button plus
  only `fields` and `actions`. The contract does not require a native form root,
  successful-control names, complete field composition, explicit submission,
  external lifecycle ownership, or named container behavior.
- Account Studio locally reimplements Input and the enhanced Select DOM,
  keyboard handling, indicators, option state, and native fallback instead of
  consuming the canonical renderers. The MDX fallback serializes another form.
  Runtime Exhibit and Studio share the registered Account Studio renderer, but
  U7 has no isolated shared renderer/fixture and its fallback differs.
- Studio Input fields have no `name`, so `FormData` omits them. Its single-line
  address field uses `street-address`; the static fallback uses
  `address-line1`. The fallback country Select uses `autocomplete=country` with
  country-code values, while Studio uses `country-name` with country-name
  values. Requiredness also differs.
- The Studio fixture intercepts submit and always renders an empty live region
  inside the form. Cancel only changes that message and does not actually reset
  the controlled values. Neither target behavior belongs to passive U7.
- Account CSS hardcodes `560px`, `16px`, `8px`, and `639px`, uses physical
  `max-width`/`margin-top`, has an unnamed container, and duplicates the row
  collapse in both viewport and container queries. Studio CSS overrides the
  same grid at `540px`, adds a second `400px` action transformation, and reverses
  visual action order independently of DOM order.
- Existing Mobile/Desktop baseline evidence covers only the initial fixture. It
  does not certify successful serialization, empty required fields, native
  invalid focus, explicit submit, optional action omission, reset isolation,
  Select keyboard behavior, narrow direct containers, Tablet/XL, localized/RTL
  labels, long/unbroken content, effective 200-percent reflow, dark mode, forced
  colors, or reduced motion.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` resolve to the generic Button Component Detail/Studio shell. They
  contain Button label/type/size/state controls, not U7 anatomy or owner visual
  approval.
- Shopify copies Account CSS but has no selected current customer-account form,
  authenticated Customer Account API mapping, explicit deprecated Liquid
  compatibility profile, or target evidence. CSS presence is not Address Form
  readiness.
- Deterministic baseline at gzip level 9: U7 CSS slice `563 B` raw / `282 B`
  gzip; Account CSS `15,366 B` raw / `2,871 B` gzip against the permanent
  `3,072 B` family ceiling; generated Web component CSS `507,601 B` raw /
  `68,366 B` gzip against the existing `65,536 B` program ceiling; shared
  runtime `53,811 B` raw / `10,501 B` gzip. U7 adds no neutral runtime.
- Baseline U7 CSS SHA-256 is
  `f62ae184f8eb448087e0f96392a2ea5c855de67e86587e7391ab37f445463f6d`.
  Baseline Exhibit/Studio Desktop SHA-256 values are
  `2bf6431699556f4b111f41686ec1a049ae8f2a1e9862c01754381a5606ecdfbd`
  and
  `761d8520e9322a26c2b3b74cf38208fe029f7fba63a0adf48c096bd3183bf087`;
  Mobile values are
  `af136b19065ee76abd7a168544b637e66bedfe928d5917c189cbe33d80343a88`
  and
  `2270ebc9fd5c1b0ee5b18d71bc834553a9001d98e0e5fc14a043f7f5e34a5d48`.
  They do not constitute visual approval.

## Standards And Mature-System Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML forms](https://html.spec.whatwg.org/multipage/forms.html) | A form contains controls; successful controls require submission names; native `required` constraint validation prevents invalid submission and fires `invalid`; autocomplete declares the value's purpose independently of control type. | Keep a real form boundary, stable child names, native validation, explicit submit, and standardized autofill purposes. |
| [WCAG Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) | Correct autocomplete tokens make common personal-data purposes programmatically determinable and can reduce memory and manual-entry burden. | Target-owned address fields must supply correct autocomplete tokens; U7 must not replace or guess them. |
| [WAI label technique H44](https://www.w3.org/WAI/WCAG22/Techniques/html/H44) | Explicit `label[for]` and control `id` associations provide visible labels and larger activation areas for relevant controls. | Canonical Input/Select labels remain explicit and visible; the layout wrapper does not synthesize labels. |
| [WCAG Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) and [WAI form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Automatically detected errors must identify the item and describe the problem in text; field errors may use `aria-describedby`, and focus on the first invalid field is useful after submission. | Validation belongs to child fields/target response; U7 owns neither generic error styling nor an always-live message. |
| [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) | Native controls, grouping, validation, notifications, and progressive enhancement preserve robust form behavior. | Compose canonical form controls and enhance only the Select dependency; do not add a parent keyboard model. |
| [Open UI customizable Select](https://open-ui.org/components/customizableselect/) | Native Select remains the semantic/value source; custom implementations can reduce performance, reliability, and accessibility, while standardized enhancement preserves platform behavior. | Country remains canonical Select with a native successful control; U7 must not duplicate trigger/listbox behavior. |
| [Radix Themes Text Field](https://www.radix-ui.com/themes/docs/components/text-field) and [Select](https://www.radix-ui.com/themes/docs/components/select) | Mature systems expose leaf control composition, values, names, required/disabled state, and controlled/uncontrolled behavior at the field level. | Input/Select keep their semantic APIs and state; Address Form receives composition slots rather than flattened field props. |
| [Shopify Polaris Text Field](https://polaris-react.shopify.com/components/selection-and-input/text-field) | Polaris associates visible labels, autocomplete, errors, and field-specific input behavior at Text Field rather than Form Layout. | Keep label, autocomplete, validation, and value ownership on canonical fields; the shell only arranges them. |
| [Shopify Customer API `customerAddressCreate`](https://shopify.dev/docs/api/customer/latest/mutations/customerAddressCreate) | Current authenticated customer-address creation accepts target-specific fields, optional default truth, and returns field-addressable user errors. | Shopify/headless targets map their own address model and mutation errors; neutral U7 cannot hardcode Shopify fields or lifecycle. |

The references agree on a native form/value boundary, visible labels, stable
submission names, correct input-purpose metadata, leaf-owned validation and
state, explicit submission, and target-owned mutation handling. They do not
define one universal address-field inventory, locale order, requiredness,
country/province dependency, cancellation policy, mutation feedback placement,
or Shopify implementation profile.

## Matches, Differences, And Direction

- Keep only required `fields` and optional `actions`; do not add first name,
  family name, street, city, country, region, postal code, field count, mode,
  action labels, endpoint, pending, error, success, columns, or breakpoint props.
- Require valid target composition rather than silently rendering a form with no
  successful controls. The docs-only renderer validates its fixture descriptor;
  neutral contracts still describe an open slot.
- Use `form.form.address-form`, `.form__section.address-form__fields`, optional
  `.form__row.address-form__row`, optional `.form__error-summary`, and optional
  `.form__actions.address-form__actions`. Do not add ARIA form roles or a custom
  keyboard model.
- Compose shared canonical Input and Select renderers plus canonical Button
  classes. The docs target may carry controlled fixture state, but U7 itself has
  no controlled/uncontrolled value API.
- Preserve native `FormData`, required constraint validation, submit activation,
  Tab order, and Select keyboard behavior. No change/blur auto-submit.
- Put docs success/cancel announcements outside U7. Target validation and
  mutation user errors remain connected to the affected child fields and may
  use the canonical Form error summary inside the composition.
- Use `container-name: form address-form`, one inline-size container, logical
  dimensions, `minmax(0, 1fr)`, and tokenized U7 gaps. Remove viewport
  duplication and all Studio-only U7 responsive rules.
- Keep one neutral visual profile. Maximum measure and row/action thresholds are
  private composition, not public customization API.

## Anatomy And Ownership

| Part | Required | Web mapping | Owner |
| --- | --- | --- | --- |
| Root/form | yes when fields are complete | `form.form.address-form` | canonical Form native boundary + U7 localized layout; target action/method lifecycle |
| Fields | yes | `.form__section.address-form__fields` | canonical Form section + target field inventory + U7 vertical composition |
| Row | optional | `.form__row.address-form__row` | canonical Form row + U7 compact response without semantic grouping |
| Input controls | target-defined | canonical `.input` | Input + target label/name/value/autocomplete/validation |
| Choice controls | target-defined | canonical `.select` | Select + target options/name/value/autocomplete/validation |
| Error summary | optional when useful | `.form__error-summary` within the field composition | canonical Form presentation + target insertion/link/focus lifecycle |
| Actions | optional | `.form__actions.address-form__actions` | canonical Form placement + Button/Link + target submit/cancel policy |
| Mutation feedback | never internal anatomy | adjacent target composition | target protected mutation and announcement lifecycle |

## State, Variant, Size, And Content Matrix

| Dimension | Direction |
| --- | --- |
| Visual variant | One neutral shell; field variants remain Input/Select state. |
| Size | One intrinsic max-measure profile; layout changes by named container. |
| Required fields slot | Complete target-defined successful controls; absent/invalid composition omits the docs-only complete renderer. |
| Actions | Optional canonical Form action row. Submit is explicit; Cancel requests target navigation/close and never resets implicitly. |
| Native validity | Required empty controls block submit; browser focuses/reports according to native behavior. |
| Server/custom errors | Target maps textual errors to canonical child messages and a linked Form summary when useful; no U7 validation state. |
| Submission | Explicit submit only; successful controls serialize by name. |
| Mutation lifecycle | Pending, success, failure, conflict, auth expiry, and recovery stay outside U7. |
| Content stress | Short, long, empty, localized, RTL, mixed direction, unbroken, 200px container, effective 200 percent, and target-specific field inventories remain contained. |

## Public API And Controlled State

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `fields` | slot | required | Complete localized canonical address controls with labels, names, values, autocomplete, validation, and optional linked Form summary. |
| `actions` | slot | optional | Canonical explicit submit plus optional navigation/close cancellation that never implies reset. |

U7 has no controlled/uncontrolled data state. Input and Select own their native or
adapter-specific value strategies; the target owns form data, create/edit mode,
validation, authentication, mutation/pending state, cancellation, routing,
feedback, analytics, and refresh. U7 only preserves their native DOM and layout
relationship.

## Tokens, Runtime, And Performance Direction

- Expose only the semantic spacing tokens consumed directly by U7: field stack
  and row inline gap. Canonical Form owns action spacing and boundary treatment.
  Do not expose maximum measure, query thresholds, columns, action alignment, or
  dependency-private tokens.
- Use private custom properties for max measure and container thresholds. Avoid
  hardcoded public values and avoid consuming Input, Select, or Button private
  variables.
- Remove Studio-only duplicate width/query/action rules. Studio must render the
  canonical source behavior at the same direct container widths as Exhibit.
- Passive neutral runtime budget is `0 B`: no listener, observer, timer,
  validator, geocoder, auth SDK, fetch, mutation client, state store, or live
  region in U7. The existing Select dependency runtime is not duplicated.
- Account family ceiling remains `3,072 B` gzip. U7 must stay within current
  family headroom and preferably reclaim duplicated query declarations.

## Accessibility And Responsive Requirements

- Use canonical Form on a real form element and preserve explicit visible labels
  for every control.
- Give every successful control a stable non-empty `name`; keep IDs unique and
  label associations intact in repeated forms.
- Use correct autocomplete tokens for the actual value purpose. A one-line
  street field uses `address-line1`; a country-name Select uses `country-name`.
- Preserve native required validation and explicit submit. Server/custom errors
  need canonical textual field association; link a useful Form summary and focus
  it or the first invalid control after a failed custom submission.
- Keep Cancel as navigation/close with Button `type="button"` or native Link
  semantics. It must not reset, submit, or claim draft destruction implicitly.
- Keep DOM/focus order identical when rows collapse. Do not use visual order
  reversal for actions or fields.
- At 200px direct container width, effective 200-percent reflow, Mobile, Tablet,
  Desktop, and XL, rows stack without clipping and actions wrap without covering
  fields or creating horizontal page scroll.
- Long/localized labels, values, Button text, and error messages wrap without
  breaking field association or shrinking controls below their container.
- Dark mode and forced colors inherit canonical Input/Select/Button behavior;
  U7 adds no colors, focus rings, icons, borders, or motion.
- Reduced motion requires no U7 override because the passive shell adds no
  animation or transition.

## Target Translation

| Target | Translation |
| --- | --- |
| Neutral Web | Canonical Form root/section/row/actions plus canonical Input/Select/Button markup and U7 Account CSS specialization; target supplies action/method or intercepts submit. |
| React | Controlled or uncontrolled child fields remain adapter decisions; React wrapper forwards native form attributes/events without cloning child APIs. |
| Shopify current customer accounts | Hosted Profile/Addresses is an intentional native handoff; theme code does not clone it or claim U7 parity. |
| Shopify headless | Target-controlled canonical U7 maps authenticated Customer Account address inputs and field-addressable user errors; localized schema and lifecycle remain integration-owned. |
| Shopify legacy compatibility | If explicitly selected, deprecated customer-address Liquid form markup maps target fields separately; CSS copy alone is not readiness. |
| Figma | Layout component with field/action composition regions only after U7-specific owner artwork exists; current generic Button shell is not approval. |
| SwiftUI / Compose | Native Form/TextField/Picker/Button composition with target validation and mutation state; neutral DOM classes do not become platform APIs. |

## Resolved Decisions And Remaining Risks

1. **Resolved by U7-A / ADR 0264:** U7 formally composes canonical Form and
   keeps localized field schema, requiredness, validation, and mutation with the
   target. The docs inventory is evidence, not a universal default.
2. **Resolved by U7-A / ADR 0264:** Submit is explicit. Cancel is target
   navigation or close composition and never implicit reset. Targets still own
   dirty-data confirmation, destinations, closure, and deliberate focus.
3. **Resolved by ADRs 0258, 0260, and 0264:** Shopify v1 uses hosted current-
   account Profile/Addresses handoff; headless projection and separately
   versioned classic compatibility remain distinct target profiles.
4. **Integration risk:** targets must prove localized schema coverage,
   authenticated protected mutation, field-addressable errors, pending/failure
   recovery, error-summary/first-invalid focus, auth expiry, success routing, and
   announcements. Neutral U7 cannot provide that provider evidence.
5. **Human review:** final max measure, grouping, action boundary/alignment,
   spacing rhythm, row threshold, fixture language, and corrected U7-specific
   artwork remain pending. Contract stays `pilot`.

## Certification Gate Before Human Review

- Contract/registry/docs/Studio metadata agree on anatomy, dependency set, two
  properties, behaviors, tokens, and target ownership.
- Shared U7 renderer composes canonical Form/Input/Select/Button, validates its docs
  fixture, and supplies the same DOM/fixture/initial behavior to Exhibit and
  Studio; MDX remains a matching fallback.
- Browser tests cover canonical Form hooks, successful FormData serialization,
  required invalid blocking/focus, explicit submit, optional action omission,
  Cancel draft preservation/no-submit,
  country Select pointer/keyboard selection, and feedback outside U7.
- Visual evidence covers Exhibit/Studio at Mobile, Tablet, Desktop, XL, equal
  widths, 200px direct container, effective 200-percent reflow, localized/RTL,
  long/unbroken content, dark mode, forced colors, and reduced motion.
- Source CSS, generated Web/Shopify projections, contracts, docs, Studio,
  parity audits, accessibility checks, temporary docs build, performance
  budgets, diff whitespace, and evidence-resource cleanup all pass.
- Shopify remains planned until a target-controlled profile supplies live
  localized protected-mutation evidence; hosted handoff is documented but not
  parity.
- Human visual/interaction review and remaining integration risks stay explicit;
  contract status remains `pilot`.
