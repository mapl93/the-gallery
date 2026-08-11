# Component Dossier: Commission Form

Status: `human-review-ready`

Date: 2026-07-18

Registry: `R8` / `commission-form`

Dependency order: 133, phase 6 (Composed components), depth 1 before refinement

## Recommendation

Keep Commission Form as a product-specific composition profile around
target-owned form controls and workflow. Its stable semantic surface is an
optional visible title, optional introductory guidance, one required non-empty
field slot, optional canonical File Upload composition and optional canonical
Button actions. Do not define a universal commission record, field inventory,
consent policy, validation service, upload transport or downstream workflow.

On Web, a standalone consumer should use a real `form`, stable named native
controls, explicit button types, native constraint validation unless the target
owns a complete replacement, and one target-owned submission lifecycle. A
consumer embedding R8 inside another form may use a neutral composition
container and must not nest forms. This boundary is already implied by ADR 0083
and the current contract; whether R8 formally depends on canonical Form remains
an architecture decision rather than an assumption.

The docs fixture should be a truthful local demonstration, not a fake remote
submission. It may use sample name, email, project brief and optional image
fields solely as evidence. It should compose the canonical Input, Textarea,
File Upload and Button renderers, preserve names/required/type/autocomplete,
derive selected filenames from the one native `FileList`, use native reset, and
announce a concise local-only result. Those fixture fields are not public
defaults or a required commercial schema.

Remove the legacy R8 upload label and local upload icon/layout rules because
canonical File Upload owns instruction, hint, selected status, icon, focus,
disabled and validation states. Move narrow action stacking into R8's canonical
container response, not Studio or viewport CSS. Use complete type shorthands,
logical geometry, private measure/threshold values and existing semantic tokens.

Owner decision 62 accepts `R8-A`: the target owns the Form root and submission
lifecycle; standalone consumers wrap R8 in canonical Form/native semantics,
embedded consumers reuse their owning Form, and reference upload renders only
with a verified secure backend path. R8 remains `pilot`; domain, consent/
privacy, submission, upload, Shopify, visual/Figma and explicit human stability
approval remain production/human gates.

## Current Gallery Result

- `CommissionFormArtwork` and `buildCommissionFormFixture` are the only
  interactive Exhibit/Studio implementation and fixture. The required fields
  slot fails closed; title, introduction, upload and actions omit independently
  without empty shells or dangling accessible references.
- The standalone docs candidate is a real named and described `form`. Its sample
  inventory composes canonical Input, Textarea, File Upload and Button classes
  with stable names, required attributes, semantic email type, autocomplete,
  exact JPEG/PNG picker guidance, explicit submitter data and native reset.
- The sample fields remain fixture evidence, not R8 API or commercial defaults.
  Native constraint validation focuses the first invalid control, invalid email
  blocks submission, FormData contains the intended five entries, Enter submits,
  and the result truthfully states that nothing was submitted or uploaded.
- `FileUploadArtwork` is now the shared canonical docs renderer consumed by the
  File Upload Studio pilot and R8. One native FileList owns the value; selected
  status is announced, long filenames wrap, and reset clears both FileList and
  visible status without a second value owner.
- R8 CSS owns only intrinsic composition: complete semantic typography,
  deterministic logical spacing, a private measure and component-container
  action stacking. It removes legacy upload internals, physical geometry,
  viewport response and Studio-only R8 anatomy overrides.
- Final evidence covers eight paired natural viewports, required/optional
  omission, native invalid/valid/Enter/reset paths, keyboard source order,
  selected file, direct `200/320/520/640px` roots, long filename, localized RTL,
  effective 200% text, user spacing, light/dark, forced colors and reduced
  motion. Every measured root, part and document overflow is zero.
- Minimum measured text/control contrast is `7.81:1`. Reduced-motion inspection
  finds zero active R8 motion and forced colors preserve focused Input and
  Button boundaries.
- At one normalized `640px` host, Exhibit and Studio have identical DOM hash
  `ad0948aa`, style hash `6e900c67` and zero overflow. The parity check also
  caught and required regeneration of the stale Web adapter before passing.
- The R8 CSS slice remains byte-identical to Batch 117 at `1,695 B` raw /
  `566 B` gzip, SHA-256
  `333c2eaf95aca275ce9d30e840c23c1f55bb128753aa56fe60c988a61d6aaabf`.
  Current Ceramics CSS is `36,881 B` raw / `5,345 B` gzip, retaining `82 B`
  under its fixed `5,427 B` family ceiling. R8 adds zero neutral JavaScript.
- Web, Webflow and Shopify CSS projections are source-aligned. No Liquid form,
  field schema, endpoint, upload service or product workflow was invented.
- ADR 0208 plus owner decision 62 record the neutral composition and target-
  owned Form-root boundary. Field/domain/privacy/upload/submission/Shopify
  ownership, final visuals, R8-specific Figma evidence and explicit stability
  approval remain production/human gates; R8 is ready for that review and stays
  `pilot`.

## Purpose And Limits

- Provides a recognizable introduction and layout for requesting custom work.
- Composes target-chosen canonical fields in logical reading/tab order.
- May compose one optional reference-file control and explicit submit/reset or
  secondary actions.
- May use a native form boundary when it is the standalone form owner.
- Does not prescribe customer identity fields, commission attributes, budget,
  deadlines, dimensions, materials, shipping, accessibility needs, consent,
  agreements or eligibility.
- Does not decide which inputs are required, collect excessive personal data,
  validate business feasibility, quote price/timing or accept a commission.
- Does not upload files, validate type/size/content, create object URLs, scan
  media, persist drafts, send email, notify staff or create CRM/order records.
- Does not own pending/success/error response timing, focus placement,
  deduplication, retries, idempotency, authentication or abuse protection.
- Does not expose measure, padding, columns, action stacking, upload geometry or
  dependency validation variants as Commission Form properties.

## Accepted Source Facts

- The repository is the source of truth; Figma remains a target/evidence source.
- ADR 0083 accepts R8 as introduction/layout composition over canonical Input,
  Textarea, File Upload and Button, with workflow ownership left to targets.
- The `0.2.0` pilot contract exposes optional `title`, `intro`,
  `referenceUpload` and `actions`, plus required `fields`.
- Canonical Input, Textarea and File Upload already own visible labels,
  descriptions, native values/FileList, required/disabled state, Default/Error/
  Success/Warning validation and focus. Button owns action semantics, disabled
  and busy behavior.
- Canonical Form separately owns a native form root, named controls, FormData,
  submitter/reset/validation behavior, error-summary composition and target-
  owned submission policy. R8 does not currently declare Form as a dependency.
- Exhibit and Studio resolve the same registered Ceramics renderer, but R8
  remains inline in that family renderer and the MDX fallback uses separate
  fields, values and validation states.
- All 183 Studio metadata files reference generic Figma nodes (`943:7`,
  `1020:480`); they are not R8-specific approval.

## Baseline Implementation Audit

### Contract, DOM And Runtime

- Studio uses a real `form` and local React state for Name, Commission request,
  selected filename and feedback. Submission is prevented and truthfully says
  nothing was submitted.
- The two text controls have no `name`, `required`, `autocomplete` or semantic
  email type, so native FormData/constraint behavior cannot support even the
  local sample. Custom submit logic checks name/request after submission rather
  than using the already accepted dependency properties.
- The local `TextField` duplicates canonical Input renderer anatomy. Textarea
  recreates canonical markup rather than consuming `TextareaArtwork`.
- File Upload recreates canonical markup but omits the required visible status,
  stable ids/associations, named field and exact accepted-format guidance. Its
  `accept="image/*"` is broader than the static MDX JPEG/PNG fixture.
- The Clear button is `type="button"` and manually resets four React states;
  native form reset and FileList reset are not exercised.
- Feedback uses a polite status and correctly identifies the result as local,
  but that target-owned result markup is a Studio-specific class outside the R8
  contract.
- When the required `fields` Studio toggle is off, the renderer can leave a
  header, upload and actions rather than fail closed.
- The static MDX fallback includes Name, invalid Email, successful Request and
  warning File Upload fixtures, while runtime uses Name/Request in Default state.
  The two sources disagree on inventory, validation and copy.
- R8 itself adds no neutral listener. Canonical File Upload shared runtime owns
  bounded drag presence and selected filename reflection; the docs fixture adds
  local React event/state only for evidence.

### CSS And Tokens

- Root layout hardcodes `600px`, header spacing `24px`, title spacing `8px`,
  icon size `32px` and another `8px` margin.
- It uses physical `max-width`, `margin`, `padding`, `margin-bottom`, `width`,
  `height`, `min-width` and `margin-top` instead of logical properties.
- Heading and body set only family/size/color, inheriting line-height and weight
  from the host instead of owning complete semantic typography.
- R8 styles File Upload icon and a legacy upload label even though canonical
  File Upload owns those parts.
- A global `639px` viewport rule alters R8 padding; Studio separately owns its
  `640px` measure, upload flow, feedback, and a `440px` action breakpoint. The
  source component does not own its complete container response.
- The baseline R8 slice is `1,134 B` raw / `454 B` gzip, SHA-256
  `14c38c54f5a241f2bc9be30a029c318e16a4f0a8c24bdcddfed2081be176b276`.
- After R7, Ceramics CSS is `32,427 B` raw / `4,903 B` gzip with `524 B`
  beneath its `5,427 B` ceiling. Neutral Web component CSS is `522,259 B` raw /
  `70,434 B` gzip. Shared runtime is `53,811 B` raw / `10,565 B` gzip.

### Documentation And Fixtures

- Documentation correctly says the target owns field inventory, consent,
  submission, persistence, notifications and downstream work.
- The MDX sample demonstrates all dependency validation families at once,
  which is useful for a composition audit but reads as an incoherent real form
  state and differs from the interactive renderer.
- The runtime sample lacks an email/reply field while its success copy says the
  request was received from a name; there is no complete contact path.
- The reference copy says “Image files” while the actual accept contract differs
  across runtime and fallback and no maximum-size/transport policy exists.
- The inspector exposes the correct five semantic properties and does not
  promote individual fields or workflow states to R8 API.

### Baseline Visual Evidence

Four captures under `output/playwright/parity/ceramics/` show:

- `commission-form-exhibit-mobile.png`
- `commission-form-exhibit-desktop.png`
- `commission-form-studio-mobile.png`
- `commission-form-studio-desktop.png`

The useful identity is a restrained single-column request form: serif contextual
heading, brief introduction, generous field rhythm, large reference dropzone and
one clear primary action with a secondary Clear action. Mobile uses full-width
controls/actions; desktop keeps a bounded measure.

The baseline also has excessive internal block padding, different Exhibit/
Studio fixtures, incomplete visible file status, inconsistent action evidence
at crop boundaries and no R8-specific proof for errors, success/pending,
required indicators, reset, selected file, long localized content, RTL,
effective 200% text, forced colors or reduced motion.

## External Research

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) | Prefer short forms that ask only what the process needs; use labels, groups, instructions, validation and notifications. | R8 must not freeze an excessive universal commission inventory; targets own necessary fields and policies. |
| [WAI Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/) | Visible `label` explicitly associated by `for`/`id` is the preferred general pattern. | Canonical dependencies must remain the label/control owners; placeholder is not the label. |
| [WAI User Notification](https://www.w3.org/WAI/tutorials/forms/notifications/) | Submission success/error requires concise clear feedback; multi-error summaries should identify and link affected fields, and dynamic errors may require alert semantics. | R8 exposes no universal result state; each target owns timing, summary, announcement and focus while the local fixture truthfully demonstrates a polite non-network result. |
| [WHATWG form controls](https://html.spec.whatwg.org/multipage/forms.html) | Named form-associated controls construct the submitted entry list and retain native submitter, reset and constraint-validation behavior. | A standalone Web target uses a real form, stable names, explicit button types and native reset/validation unless it owns a complete replacement. |
| [WHATWG File Upload state](https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file)) | One native file input owns the selected `FileList`; `accept` is a picker hint, not server validation; `required`, input and change apply. | R8 composes canonical File Upload and never mirrors a second file value, claims validation from `accept`, or invents transport. |
| [Open UI File explainer](https://open-ui.org/components/file/) | Native file input is the platform control for selecting local files and may or may not participate in form submission. | Preserve the native control as the access/value owner and keep dropzone visuals/transport independently bounded. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Field/Label/Control/Message compose around native validity and server errors; composition with every other primitive is not universally solved. | Gallery should preserve canonical field ownership and avoid an R8 parallel validation API; formal Form dependency remains explicit architecture work. |
| [Polaris Web Components](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components) | Shopify exposes target-specific Form, fields, Drop Zone and Button; Form enables implicit Enter submission. | A Shopify Admin target translates to its native components, not copied Web markup. |
| [Polaris Drop Zone](https://shopify.dev/docs/api/app-home/web-components/forms/drop-zone) | Drop Zone exposes label, accept, multiple, required, disabled, error and file events, while consumers implement validation/upload lifecycle. | Target component choice does not move file policy, transport or results into R8. |
| [Shopify contact form](https://shopify.dev/docs/storefronts/themes/customer-engagement/add-contact-form) | Storefront contact uses `{% form 'contact' %}`; email is required and additional fields use unique `contact[...]` names. | A future storefront target may map an approved commission intake to contact, but exact fields and response handling need approval. |
| [Shopify Liquid `form`](https://shopify.dev/docs/api/liquid/tags/form) | Liquid generates target-specific form endpoints/hidden inputs and exposes contact form type. | Do not hand-invent the endpoint or hidden contract; use Liquid-native form composition when approved. |

WAI-ARIA APG has no “commission form” widget pattern. Native HTML and the
canonical control contracts provide the semantics; ARIA supplements dynamic
feedback only when the target timing requires it.

## Coincidences, Differences And Direction

### Coincidences

- Repository contracts and standards agree that native form controls remain the
  value, validation, label, submission and reset foundation.
- ADR 0083, Radix and Polaris all favor composition of field/action parts rather
  than one product form duplicating every dependency state.
- WAI and the current contract agree that field inventory and result workflow
  must be contextual, minimal and target owned.
- Open UI, HTML and canonical File Upload agree on one native FileList owner and
  separation of picker hints from actual upload validation/transport.

### Differences Or Gaps

- Current runtime duplicates Input/Textarea/File Upload renderers and omits
  native names/requirements while the MDX fallback shows different fields.
- The required fields slot does not currently fail closed.
- Current Clear behavior bypasses native reset semantics.
- Source and Studio split the component measure, upload layout and narrow-action
  response; CSS is physical and partially hardcoded.
- Shopify Admin Drop Zone and storefront contact form are distinct surfaces;
  neither authorizes one assumed cross-target upload backend.
- Generic Figma pointers cannot approve R8 visuals or workflow states.

### Recommended Direction

- Extract `CommissionFormArtwork` plus one local evidence fixture consumed by
  the registered Exhibit/Studio renderer; keep MDX fallback aligned.
- Return `null` without required field composition; allow title, intro, upload
  and actions to omit independently only when fields remain.
- Compose `InputArtwork`, `TextareaArtwork`, a shared canonical
  `FileUploadArtwork` and native Button elements/classes. Refactor the File
  Upload Studio pilot to consume the same artwork if safely bounded.
- Give the local fixture stable names, required attributes, email type,
  autocomplete, exact JPEG/PNG accept guidance and explicit action types.
- Use native submit/constraint validation and native reset; React may derive
  visible values/status for the docs preview but must not create a second
  FileList or claim remote success.
- Keep result feedback target-owned and truthfully local. Do not add R8
  validation, pending, success or error variants/properties.
- Replace physical/hardcoded R8 layout with logical CSS, complete typography,
  private measure/threshold and component-container action response. Remove
  R8-owned upload icon/label styling and Studio anatomy overrides.
- Preserve the restrained hierarchy, broad dropzone and clear action order as a
  human-review candidate without treating current spacing/measure as approved.

## Proposed Anatomy

| Part | Required | Semantic form | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes with fields | standalone native `form` or neutral host container | target/R8 | Never nest forms; accessible form landmark only when context supplies a useful name. |
| Header | optional | `header` | R8 | Omit when title and intro are empty. |
| Title | optional | contextual `h2`-`h6` | target | May name a standalone form/section. |
| Intro | optional | `p` | target | Concise instructions before affected controls; may describe root. |
| Fields | required non-empty | logical slot | target/dependencies | Canonical named controls in reading/tab order. |
| Reference upload | optional | canonical File Upload | File Upload/target | One native FileList; visible accept/size/policy guidance. |
| Actions | optional | canonical Buttons with explicit native types | Button/target | Submit/reset/cancel semantics remain truthful. |
| Result/error summary | target-owned | status/alert/summary chosen by lifecycle | target/Form | Not R8 property or state until workflow is approved. |

## State, Variant, Size And Mode Matrix

| Dimension | Safe scope |
| --- | --- |
| Default | Target-owned canonical fields and optional upload/actions. |
| Native invalid | Dependency/native control state; R8 does not duplicate. |
| Target error/success/warning | Dependency or target workflow state; not an R8 variant. |
| Pending/submitted/failed | Target submission lifecycle; Button busy/disabled and result feedback compose externally. |
| Empty required fields slot | Omit the complete R8 root. |
| Title/intro absent | Omit empty header and dangling name/description references. |
| Upload/actions absent | Fields remain complete; omit empty regions. |
| One/many fields | Preserve logical source/tab order and grow vertically. |
| Narrow/wide | Component measure and actions respond to actual inline size. |
| LTR/RTL/localized | Logical geometry and complete wrapping; controls retain target language/direction. |
| Light/dark/forced colors | Dependencies and semantic tokens own control boundaries/focus; R8 text remains readable. |
| Reduced motion | R8 owns no motion; dependency motion preferences remain canonical. |
| Controlled/uncontrolled | Target chooses one value owner per control; native FileList is never controlled/mirrored. |

## Public API Direction

Retain:

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `title` | string | optional | Visible contextual form heading. |
| `intro` | string | optional | Visible target-authored guidance. |
| `fields` | slot | required non-empty | Canonical target-owned controls in logical order. |
| `referenceUpload` | slot | optional | Canonical File Upload composition. |
| `actions` | slot | optional | Canonical Button actions with truthful native types. |

Do not expose a universal field array, customer schema, budget/deadline enums,
consent toggle, validation variant, submit callback, endpoint, method, encoding,
pending/success/error, retry, notification, upload type/size, columns, measure,
padding or action stacking as R8 properties. Targets and dependencies own them.

## Token And CSS Direction

- Remove R8 references used only to restyle File Upload internals.
- Use existing primary/secondary text, heading/body typography and layout
  spacing; include complete weight and line-height tokens.
- Reset header/title/intro margins deterministically and use logical properties.
- Keep form measure and narrow action threshold private.
- Use a named component container so action stacking responds to actual R8
  width, not viewport or docs-stage width.
- Keep field/upload/action children `min-inline-size: 0`; let dependencies own
  focus, validation, disabled, busy, hover and forced-color styling.
- Add no R8 transition, animation, listener, observer or request.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Standalone real form or non-nested host container, named canonical controls, native validation/reset/FormData and target-owned submission. |
| Shopify Storefront | Planned. Approve commission field inventory and whether Liquid contact can represent it; use `{% form 'contact' %}`, `contact[...]`, target errors/success and a separate verified file path if needed. |
| Shopify Admin | Use target-native Polaris Form/fields/Drop Zone/Button only for an approved admin workflow. |
| Webflow | Native form/CMS or integration chosen by target; preserve named controls and explicit privacy/upload policy. |
| React/Angular | Thin composition over canonical controls; controlled or uncontrolled per field, never both; target owns async lifecycle. |
| Figma | Future component models title/intro, field density, upload/action omission, narrow/wide and dependency validation/result compositions; generic nodes are not approval. |
| SwiftUI/Compose/future | Native Form/TextField/editor/file-picker/button equivalents with target-owned submission and file security. |

## Evidence And Validation Plan

- Preserve four current Desktop/Mobile captures as before evidence.
- Capture paired Exhibit/Studio Mobile, Tablet, Desktop and XL with one bounded
  server/browser/page lifecycle after the final CSS change.
- Verify one shared renderer/fixture, strict fields omission, optional header/
  upload/actions, stable labels/names/types/autocomplete, canonical ancestry,
  exact accepted-file guidance and zero duplicate FileList owners.
- Verify native required validation prevents incomplete submit; keyboard Enter
  uses the intended submitter; a valid local preview emits one polite truthful
  status; native reset restores text/FileList/status without extra focus moves.
- Verify short/long/localized/RTL/extreme content, selected long filename,
  upload absent, actions absent, one/many fields, direct narrow roots, effective
  200% text, user spacing, light/dark, forced colors and reduced motion.
- Validate contracts, registry/dependencies, Studio, docs, static previews,
  generated Web/Shopify adapters, Exhibit/Studio parity, component/refinement
  audits, JSON, diff hygiene, target CSS copy parity and production build outside
  `site/dist`.

## Risks And Open Questions

1. Which fields are required for v1, which are optional, and which team owns
   schema, labels, examples, localization and changes over time?
2. What personal or sensitive data may be collected, what consent/privacy/
   retention/deletion policy applies, and where are those disclosures shown?
3. Who owns feasibility validation, pricing/budget, deadlines, revisions,
   materials, dimensions, shipping, accessibility needs and commercial terms?
4. Which endpoint/service owns submission, idempotency, duplicate prevention,
   abuse protection, authentication, persistence, CRM/email notifications,
   retries, status and focus behavior?
5. Which file types/sizes/counts are allowed, who validates/scans/stores/deletes
   them, how are failures/retries represented and are local previews permitted?
6. Should R8 formally depend on canonical Form, or remain a profile that can be
   embedded inside a target-owned form without nesting? Which first consumer
   determines that boundary?
7. Can Shopify storefront contact represent the approved commission fields and
   responses? If reference files are required, which verified app/backend path
   owns upload and attachment rather than assuming Liquid support?
8. Is the restrained one-column candidate, measure, internal padding, title/
   intro scale, dropzone prominence and action order approved, and where is
   R8-specific Figma evidence across all states/modes?

Owner decision 62 confirms the implemented `R8-A` boundary without selecting a
commission business workflow. The shared dependency composition, strict
omission, native standalone fixture, embeddable Form ownership and conditional
secure-upload boundary are ready for explicit human review. Production field,
privacy, provider, upload, target and visual questions remain visible; R8 stays
`pilot` until explicit stability approval.
