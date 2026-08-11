# Write-a-Review Form Refinement Dossier

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

Registry: `V7` / `review-form`

Dependency order: 154, phase 6 (Composed components), depth 2 after dependency reconciliation (baseline depth 1)

## Purpose

Review Form composes one native review-entry transaction from canonical Gallery
controls. Its neutral value is the relationship between a rating question,
optional title, required review-body composition, optional classification and
file-selection controls, a submit action, and optional target response content.

It does not select a review provider, endpoint, authentication model,
verification policy, moderation queue, accepted file policy, consent model,
anti-abuse mechanism, persistence strategy, optimistic lifecycle, error copy,
success destination, analytics schema, or post-submit reset behavior.

The component is not a generic Form replacement, field implementation, upload
transport, review record, provider widget, CAPTCHA, or moderation interface.

## Accepted Source Facts

- ADR 0085 establishes the native form boundary and the composition of Star
  Input, Input, Textarea, File Upload, Select, and Button.
- ADRs 0052, 0089, 0092, 0095, and 0134 keep value, name, native constraint,
  label, message, selection, reset, and controlled/uncontrolled ownership in
  the composed controls.
- ADR 0097 keeps endpoint, validation orchestration, submission, pending state,
  response errors, success, persistence, and reset target-owned for form
  compositions.
- ADR 0035 keeps submit, disabled, busy and accessible loading presentation in
  Button.
- The repo is the source of truth. Figma is evidence and a future target.
- Exhibit and Studio must mount one renderer and one initial fixture.
- No component may move from `pilot` without explicit human approval.

## Baseline Audit

- Contract `0.2.0` names all six composed components but formally declares only
  `star-input` as a dependency. Registry and generated dependency graph repeat
  that incomplete edge set.
- The shared renderer is already a native `form`, and Exhibit and Studio mount
  the same `ReviewsStudio` implementation and initial fixture.
- Star Input is a canonical native required radio group. Input, Textarea, Select,
  File Upload and Button are rendered using their canonical class families.
- The Input help message has no `id`, and its field has no `aria-describedby`.
  The Select success message has the same missing association.
- The File Upload renderer uses a `div.file-upload` plus a nested label, folds
  selected-file feedback into help text, and omits the required
  `.file-upload__status`. This diverges from ADR 0095, the File Upload contract,
  and the Review Form MDX fallback.
- The fixture's image-only `accept` policy is not identified as a docs-target
  example. It can be mistaken for a neutral review default.
- Submit is a native request that the Studio fixture intercepts locally. Its
  response copy truthfully says that nothing was uploaded or submitted, but
  the lifecycle must remain explicitly fixture-only.
- `.review-form__input`, `__textarea`, `__label`, `__photo-upload`,
  `__photo-previews`, and `__photo-preview` are unused legacy selectors outside
  canonical CSS. They duplicate or imply field/media ownership that the
  accepted composition boundary rejects.
- The intrinsic max width and grid layout contain the candidate at all four
  viewports. Baseline root scroll width equals client width.
- Eight paired baseline images cover Exhibit and Studio at Mobile, Tablet,
  Desktop and XL under `output/playwright/refinement-batch-53/before/`.
- Baseline Reviews CSS is `3,787 B` deterministic level-9 metadata-free gzip
  against the permanent `3.7 KiB` (`3,788 B`) ceiling. Review Form adds no
  neutral runtime beyond the independently canonical child enhancers.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| HTML forms and constraint validation | Successful controls require stable names; native required constraints run before submission; invalid controls emit `invalid`; form data includes native file values. | Keep one native `form`, native submit, native names, and child-owned constraints. Do not replace platform form behavior with a Review Form state engine. |
| WAI Forms Tutorial | Every control needs a programmatic label; related controls use fieldset/legend; instructions and validation feedback must be associated; user-visible status must describe real results. | Preserve canonical child labels and descriptions. Keep the composed status optional and target-owned. |
| WAI validation and notifications | Required state should be visible and native; inline feedback can use `aria-describedby`; dynamic aggregate errors may use an alert and focus strategy when deliberately implemented. | Associate every visible field message. Do not make static fixture guidance an alert or invent an aggregate error-summary lifecycle. |
| Open UI text/file research | Form controls retain native name/value behavior; file selection exposes one focusable input, a contextual label, selected-file feedback, `accept`, `multiple`, and required constraints. | Compose the accepted File Upload anatomy and one selected-file status. Keep accepted formats and upload policy target-owned. |
| Radix Form | A mature API composes root, field, label, control, message, validity and submit while building on native constraint validation and supporting client/server cases. | Composition is useful evidence, but The Gallery must reuse its existing canonical controls rather than import a framework-specific field layer. |
| Polaris form controls | Mature target APIs expose names, labels, details, errors, native-style required/disabled values, standard events, and controlled/default values; specialized file selection remains a separate control. | Keep Review Form's public API at slot and submit-request level. Field value/state APIs remain in the children. |

References:

- <https://html.spec.whatwg.org/multipage/forms.html#the-form-element>
- <https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-submission-2>
- <https://www.w3.org/WAI/tutorials/forms/>
- <https://www.w3.org/WAI/tutorials/forms/validation/>
- <https://www.w3.org/WAI/tutorials/forms/notifications/>
- <https://open-ui.org/components/inputtext.research/>
- <https://open-ui.org/components/file/>
- <https://www.radix-ui.com/primitives/docs/components/form>
- <https://shopify.dev/docs/api/app-home/web-components>
- <https://shopify.dev/docs/api/app-home/web-components/forms/text-field>
- <https://shopify.dev/docs/api/polaris/using-polaris-web-components>

## Owner Visual References

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Direct read-only inspection confirms that both nodes
remain the generic Button component-detail shell and Studio inspector, not
Review Form artwork. They support the editorial shell and metadata-driven
inspector direction only. No form width, hierarchy, field order, state,
spacing, color, upload treatment or action treatment can be promoted from them.

## Convergence And Differences

Consensus:

- one review transaction is one native form;
- every successful control needs a stable non-empty name;
- each composed control owns its accessible name, value and validation state;
- review-level layout must not duplicate child control markup or behavior;
- File Upload keeps one native file input and selected-file feedback;
- native constraint validation is useful but never replaces server validation;
- a submit event is not proof of successful persistence;
- pending, success, errors, moderation and reset require target workflow data;
- controlled frameworks own one live value per control, while static Web may
  use native defaults and events;
- the form must remain usable without the Select/File Upload enhancements.

Differences that remain product, provider or target decisions:

- required versus optional title, body, classification and photos;
- field labels, instructions, validation text and localized option inventory;
- accepted file types, count, size, dimensions, consent and removal/previews;
- provider endpoint, request encoding, authentication and anti-abuse controls;
- synchronous versus asynchronous validation and aggregate error summaries;
- pending, retry, offline, draft, autosave, success, redirect and reset behavior;
- verification/moderation statements and review policy links;
- heading/context around the form and whether the form needs its own name;
- final Figma, Shopify, React, Angular, SwiftUI and Compose presentation.

## Recommended Direction

Keep `.review-form` as the native form and expose only semantic slot composition:
required Star Input, required Textarea, required submit Button, and optional
Input, File Upload, Select, structural fields/group wrappers, and target status.

Reconcile the formal dependency graph to the already accepted and rendered
canonical children: `star-input`, `input`, `textarea`, `file-upload`, `select`,
and `button`. This is registry-owned source alignment, not a new product API.

Make every visible child message programmatically associated. Render File
Upload with its accepted label-root anatomy and independent polite status. Keep
`accept="image/*"` only as an explicitly labelled documentation-fixture policy.
Retain the local intercepted submit demonstration, but state clearly that it
validates form composition and does not upload or persist.

Delete unused legacy Review Form field/photo selectors instead of preserving a
second markup contract. Keep width, grid spacing and action wrapping private.
Do not add provider fields, aggregate validation, asynchronous state, reset,
upload previews or dedicated Shopify Liquid without accepted target policy.

## Alternatives Requiring A Decision

1. **Provider-backed review adapter.** Requires provider, schema, endpoint,
   authentication, verification, moderation, anti-abuse and error contracts.
2. **Photo review workflow.** Requires accepted file policy, consent, upload
   transport, progress, removal, previews, failure and moderation decisions.
3. **Review policy disclosure.** Requires approved content, placement and legal
   ownership before adding a required slot or link.
4. **Aggregate error summary.** Requires validation timing, error ordering,
   focus destination, live-region behavior and localization policy.
5. **Autosave/draft mode.** Requires persistence, privacy, expiration, recovery
   and conflict behavior.

The current repo does not contain enough product evidence to select these.

## Candidate Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root | yes | Native `form`, optionally named by context or `aria-label` | Review Form |
| Fields | no | Structural layout group | Review Form |
| Rating | yes | Canonical native Star Input fieldset/radio group | Star Input |
| Title | no | Canonical Input | Input |
| Body | yes | Canonical Textarea composed through Input | Textarea / Input |
| Classification | no | Canonical native/enhanced Select | Select |
| Photo selection | no | Canonical File Upload | File Upload |
| Actions | yes | Structural action wrapper | Review Form |
| Submit | yes | Canonical Button rendered as native submit | Button |
| Status | no | Target-owned response content/live behavior | Target |

## State And Mode Matrix

| Mode/state | Neutral expectation |
| --- | --- |
| Default | Native form and composed controls; no provider or transport assumption. |
| Native validation | Child constraints prevent submit and retain focus/feedback semantics. |
| Child Error / Success / Warning | Child owns palette, message, `aria-invalid` and description relationship. |
| File empty / selected | File Upload status states no selection or target-safe selected filename; no upload claim. |
| Submit request | One native submit event after child constraints; target decides whether to intercept. |
| Pending | Target drives canonical Button busy/disabled state and truthful status. |
| Server error | Target associates field errors and/or deliberately implements a named summary. |
| Success | Target announces confirmed persistence and chooses reset/redirect; neutral source cannot infer it. |
| Disabled | Individual child controls and Button own native disabled state; no form-level pseudo-disabled state. |
| Empty optional slots | Omit nodes without empty regions or invented defaults. |
| Long/localized content | Labels, messages, options, filenames and response text wrap without root overflow. |
| Narrow container | One-column intrinsic layout; actions wrap. |
| RTL | DOM order stays logical; child controls own direction-sensitive behavior. |
| Reduced motion | Review Form adds no motion; child motion follows canonical tokens/media query. |
| Forced colors | Native controls and canonical child focus/validation remain perceivable. |

## Public API And State Ownership

Keep the semantic API narrow:

- `label`: optional accessible form name when surrounding context is
  insufficient;
- `rating`: required Star Input slot;
- `textField`: optional Input slot;
- `reviewBody`: required Textarea slot;
- `photoUpload`: optional File Upload slot;
- `classification`: optional Select slot;
- `submitAction`: required Button slot;
- `status`: optional target-owned response slot;
- native `submit`: the only Review Form event boundary.

Do not expose max width, field gap, action gap, child variants, child values,
file constraints, upload progress, provider IDs, moderation states, pending or
success as Review Form properties.

Static Web uses child-native initial values and form data. React/Angular targets
may control one value per child and handle one submit request. They must not keep
a second Review Form copy of child values. Target workflow state may control
Button busy and response content after a real request starts.

## Token And Hardcoded Audit

Existing Review Form public tokens cover:

- layout gap and field-group gap;
- action gap;
- secondary response text;
- small response typography.

The root max inline size of `600px` is private form composition, not a stable
cross-target consumer decision. Child colors, type, dimensions, iconography,
borders, focus, validation and disabled values remain in the child contracts.

Unused legacy field/photo selectors should be removed. No token is added for
each private wrapper value. The fixed Reviews CSS ceiling remains `3,788 B`;
refinement must recover or preserve bytes rather than raise it silently.

## Responsive And Content Evidence Plan

- paired Exhibit/Studio screenshots at 390, 768, 1440 and 1728px;
- intrinsic hosts at 280px, 420px and 640px;
- all optional slots present, all optional slots absent, and target status;
- empty, short, long localized and extreme labels/messages/filenames/options;
- native form data, required validation and reset semantics of child controls;
- Star Input arrows, Select keyboard behavior and File Upload selection status;
- fine-pointer hover, keyboard focus, 200% type, RTL, dark, forced colors and
  reduced motion;
- exact Exhibit/Studio root DOM parity;
- static fallback syntax, source/generated CSS identity and deterministic gzip.

## Cross-Target Translation

| Target | Translation |
| --- | --- |
| Neutral Web | Native form plus canonical child markup; child enhancers remain progressive and independently owned. |
| Shopify | Provider theme app block or app proxy owns data, endpoint, authentication, files, moderation and response lifecycle while consuming generated CSS. |
| Webflow | Native form/project integration plus canonical classes; provider and upload behavior remain external. |
| React / Angular | Controlled or uncontrolled child values plus one submit request; no parallel field implementation. |
| Figma | Form layout and reviewed child instances after component-specific artwork exists; no provider state machine. |
| SwiftUI / Compose | Native form-like layout with target-native rating, fields, picker and submit action; target owns asynchronous lifecycle. |

## Performance Budget

- Reviews CSS: `3,788 B` deterministic metadata-free gzip ceiling.
- Review Form orchestration runtime: `0 B` listeners, observers, timers,
  requests, formatters and layout reads beyond child-owned progressive
  enhancement and the docs-only submit demonstration.
- Neutral Review Form assets: `0 B`; the Studio Upload icon is site-only.
- File bytes and upload/network budgets are target-owned and require an
  explicit provider policy before production integration.
- Global Neutral Web CSS/runtime exceptions remain visible program gaps and are
  not budget increases.

## Risks And Open Questions

| Risk/question | Boundary | Required action |
| --- | --- | --- |
| Provider and endpoint are unselected. | product/target | Choose provider, schema, auth, transport and lifecycle before integration. |
| Required field policy is unknown. | product/content | Decide per target; do not infer from the docs fixture. |
| File policy is unknown. | target/security | Define formats, count, size, dimensions, consent, scanning, moderation and failures. |
| Validation summary is unknown. | product/accessibility | Decide timing, ordering, focus and announcement before adding one. |
| Successful submission behavior is unknown. | product/target | Define confirmation, reset, redirect, retry and draft behavior. |
| No component-specific Figma artwork exists. | human visual | Approve browser candidate before creating the Figma target. |
| Reviews CSS has 1 B baseline headroom. | performance | Remove dead source or hold size; never raise the ceiling implicitly. |
| Child dependency graph is incomplete. | architecture/source alignment | Reconcile registry and contract to actual canonical composition in this batch. |

## Readiness Boundary

Technical readiness requires exact canonical child composition, complete formal
dependencies, native form data and constraints, associated messages, truthful
File Upload and submit feedback, optional-slot/content/special-mode evidence,
generated adapter identity, budgets and a durable report. It does not select a
provider, required-field policy, file policy, validation summary, submission
lifecycle, component-specific Figma artwork or `stable` status.

## Implemented Result And Evidence

- Contract `0.3.0`, registry, canonical renderer, Studio metadata and MDX now
  share the six formal canonical dependencies and one native form boundary.
- Input and Select guidance is associated in both native and enhanced output.
  File Upload is one canonical label-root surface with one named native input,
  visible docs-only policy, independent polite status and selected class.
- The shared initial fixture exposes ten programmatically focusable elements and
  six sequential Tab stops: the checked radio, title, body, enhanced Select,
  file input and submit Button. ArrowRight selects rating five; End selects the
  final Select option; native file selection announces `textured-vase.jpg`.
- `FormData` contains rating, title, body, classification and the native JPEG
  `File`. Inspector reset restores rating four, initial text/topic, zero files,
  empty-file status and empty response feedback.
- With no selected rating, native constraint validation blocks submit, keeps the
  response empty and focuses the first radio.
- The optional-slot candidate omits title, File Upload, Select and status without
  empty nodes while retaining required rating, body and submit composition.
- Exhibit and Studio root `outerHTML` is byte-identical at 390, 768, 1440 and
  1728px with SHA-256
  `754ca255a850f5dd9699faf7697827454c96ff967603be6857f277f81733e9ad`.
- A 280px RTL host at 200% root type contains long Arabic/German labels, values,
  messages, file policy and action text with root `scrollWidth === clientWidth`
  and no visible descendant overflow. Only intentionally clipped one-pixel Star
  Input accessible labels report internal scroll width.
- Light text contrast is at least `5.34:1`; dark is at least `12.03:1` for the
  sampled child labels/messages/status. Forced colors retains native borders and
  focused File Upload outline. File Upload, Select, Button and Star Input
  transitions resolve to `0s` under reduced motion.
- Seventeen final images and eight baseline images live under
  `output/playwright/refinement-batch-53/`.
- Final Reviews CSS is `3,697 B` deterministic gzip against the unchanged
  `3,788 B` ceiling, recovering `90 B` from baseline. Review Form adds `0 B`
  neutral orchestration runtime.
- Neutral Web, Shopify and Webflow consume byte-identical Reviews CSS. Shopify's
  official validator passed artifact `review-form-batch-53` revision 1. No
  provider Liquid or placeholder review workflow was invented.

Human review must still approve the 600px width, hierarchy, required-rating
label, child validation mixture, upload surface/copy, action emphasis and all
spacing. Provider, required-field policy, file policy, validation summary,
submission lifecycle, moderation and component-specific Figma artwork remain
product, target, architecture or human decisions.
