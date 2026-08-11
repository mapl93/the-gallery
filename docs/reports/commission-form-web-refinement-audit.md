# Commission Form Web Refinement Audit

Date: 2026-07-18

Batch: 117

Component: R8 `commission-form`

Status: ready for explicit human review; remains `pilot`

## Outcome

Commission Form is now a bounded composition profile for a target-owned custom
work request. It owns optional contextual introduction, one required non-empty
field region, optional reference-upload composition and optional action
composition. It does not define a commission record, universal field schema,
consent policy, endpoint, validation service, upload transport, persistence,
notification or later commercial workflow.

The standalone Web candidate uses a real form and canonical Input, Textarea,
File Upload and Button composition. Native names, required/type/autocomplete,
constraint validation, submitter, FormData, FileList and reset behavior remain
intact. The local result is deliberately truthful: it says a preview is ready
and that nothing was submitted or uploaded.

Exhibit and Studio consume one renderer and fixture. Empty required fields omit
the complete component, optional parts omit cleanly, component-container CSS
owns narrow action stacking, and R8 adds no neutral runtime. Owner decision 62
accepts `R8-A`: the target owns the Form root and submission lifecycle,
standalone consumers wrap R8 in canonical Form/native semantics, embedded
consumers reuse the owning Form, and upload appears only with a verified secure
backend path. Business fields, privacy/consent, providers, Shopify, final
visuals, component-specific Figma evidence and explicit stability approval
remain production/human gates. The contract stays `pilot`.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Product-specific intake composition only; no universal schema or workflow. |
| Anatomy and composition | pass | Native standalone form; canonical Input, Textarea, File Upload and Button descendants. |
| Required/optional content | pass | Non-empty fields required; header, upload and actions omit without shells. |
| Native behavior | pass for local fixture | Required/email validation, Enter, submitter/FormData, one FileList and native reset verified. |
| Accessibility | pass | Visible labels, stable associations, required text/attributes, source-order keyboard path, polite truthful feedback, AA contrast and canonical focus. |
| Responsive/content resilience | pass | Eight natural captures plus direct widths, long file, RTL/extreme text, 200% text and spacing with zero overflow. |
| Runtime/performance | pass for R8/Ceramics | Zero R8 neutral runtime; shared runtime unchanged; Ceramics retains `513 B` gzip headroom. |
| Exhibit/Studio parity | pass | Shared renderer/fixture and exact normalized DOM/style hashes. |
| Targets | Web implemented; others bounded | Web/Webflow/Shopify CSS projections validate; no target endpoint, schema or upload service invented. |
| Human review | required | R8-A is accepted; production fields/privacy/providers, Shopify, final visuals and explicit stability approval remain pending. |

## Anatomy, API And Ownership

The `0.2.0` contract retains five semantic properties:

| Property | Requirement | Meaning |
| --- | --- | --- |
| `title` | optional string | Visible contextual form heading. |
| `intro` | optional string | Concise target-authored guidance. |
| `fields` | required non-empty slot | Canonical named controls in logical source order. |
| `referenceUpload` | optional slot | Canonical File Upload composition. |
| `actions` | optional slot | Canonical Button actions with explicit native types. |

The standalone renderer is a `FORM` named and described by its visible title
and introduction. The verified fixture contains required Name and Email Inputs,
a required Textarea request, one optional File Upload and submit/reset Buttons.
Every control has a stable target-owned name, visible label and canonical
message relationship. The email uses `type="email"`; name and email use native
autocomplete tokens.

Without `fields`, the renderer returns no root. Empty title plus introduction
removes the entire header and accessible references. Upload and actions remove
their regions independently. A target embedding R8 inside another form must
translate the root to a non-form host rather than nest native forms.

R8 exposes no field-array object, endpoint, method, encoding, consent toggle,
validation variant, submit callback, pending/success/error state, file policy,
measure, column or action-breakpoint property. The local fixture chooses
`multipart/form-data` only because it contains a native file control; target
transport remains outside the component contract.

## Native Form, File And Reset Behavior

Submitting the untouched fixture focuses Name and reports Name, Email and
Request as invalid. With Name and Request present but an incomplete email,
submission remains blocked and focus moves to Email. No result message is
fabricated in either invalid path.

The valid path verifies one submit event with submitter `intent=preview` and
FormData entries for `name`, `email`, `request`, `reference` and `intent`.
Keyboard Enter from Email also submits through the intended native form path.
Both paths render a polite local-only result without focus theft.

Canonical File Upload owns the single native FileList. Selecting
`reference-bowl.png` produces one File, the visible selected class and the same
filename in the polite status. The JPEG/PNG `accept` value is documented as a
picker hint, not validation or security. Native reset clears all three text
values, FileList, selected status and result while focus remains on the reset
Button. No second file value, object URL, upload request or persistence exists.

## Accessibility

The focusable source order is Name, Email, Request, Reference, Preview request
and Reset. Source, visual, reading and keyboard order stay aligned at every
measured width. Visible “(required)” text accompanies native `required`; field
labels use explicit `for`/`id`; messages use `aria-describedby`; File Upload
uses visible label/hint plus a polite selected-file status.

Measured contrast after refinement:

| Content | Light | Dark |
| --- | ---: | ---: |
| Title | `17.93:1` | `17.18:1` |
| Intro / labels / messages / upload hint | `7.81:1` | `12.09:1` |
| Upload status | `17.93:1` | `17.18:1` |
| Primary action | `10.37:1` | `17.93:1` |
| Secondary action | `17.93:1` | `17.93:1` |

Forced colors preserves the focused Input outline and Button boundary.
Reduced-motion inspection finds zero active R8 motion. The target still owns
dynamic server-error summaries, linked field errors, announcement timing and
deliberate focus placement for a real submission lifecycle.

## Responsive And Extreme Content

Natural Mobile, Tablet, Desktop and XL captures pass in Exhibit and Studio.
The form remains bounded by its private measure; actions stack only when the
component's own inline size crosses its container threshold.

| Direct root | Height | Action widths | Overflow |
| ---: | ---: | --- | ---: |
| `200px` | `1,121px` | `168px`, `168px` | 0 |
| `320px` | `951px` | `288px`, `288px` | 0 |
| `520px` | `841px` | `166.89px`, `85.59px` | 0 |
| `640px` | `841px` | `166.89px`, `85.59px` | 0 |

Mixed RTL/localized/unbroken content at `240px`, a long selected filename at
`320px`, effective 200% text at `360px` and user text spacing at `320px` all
preserve zero root, visible-part and document overflow. Content remains
available without truncation or runtime measurement.

## Tokens, CSS And Canonical Composition

R8 consumes existing primary/secondary text, heading/body typography and
layout spacing tokens. The `40rem` measure and compact gap are private
composition values, not public component API.

The source uses a grid, logical geometry, deterministic margins,
`min-inline-size: 0`, complete typography and a named component container. It
removes the former `600px` physical measure, fixed header margins, local upload
icon/label styling, viewport padding and Studio-owned upload/action breakpoints.
Input, Textarea, File Upload and Button retain their own focus, validation,
disabled, busy, selected, hover, forced-color and reduced-motion contracts.

`FileUploadArtwork` is now the shared canonical documentation renderer used by
both the File Upload Studio pilot and Commission Form. React types and fixture
state remain inside the docs consumer; the target-agnostic contract and CSS do
not depend on React, Lucide, Shopify, Figma or another target.

## Exhibit And Studio Parity

`CommissionFormArtwork` and `buildCommissionFormFixture` are the sole registered
interactive Exhibit/Studio path. Eight paired natural captures contain the
same three controls, upload, actions and zero overflow.

With the same `640px` host and public tokens, both modes produce:

- DOM hash `ad0948aa`;
- style hash `6e900c67`;
- root width `640px` and zero overflow.

The initial parity pass exposed that Studio still loaded the pre-R8 generated
Web adapter. Regenerating the adapter from canonical source made DOM and style
hashes exact. This is evidence that the docs site is consuming the intended
first-party target rather than a parallel implementation.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented as standalone native form or non-nested host composition with named canonical controls, native validity/FormData/FileList/reset and target-owned async workflow. |
| Shopify Storefront | CSS projection validates. Liquid contact form, `contact[...]` field inventory, errors/success and any verified external file service remain planned pending product approval. |
| Shopify Admin | Translate an approved admin workflow to target-native Polaris Form, fields, Drop Zone and Button; do not copy Web transport assumptions. |
| Webflow | Source-identical Ceramics CSS; native form/integration and privacy/upload policy remain target choices. |
| React/Angular | Thin children projection; choose one controlled or uncontrolled value owner per field and keep FileList native. |
| Figma | Future component models header/upload/action omission, sparse/dense fields, dependency validation/result composition and narrow/wide modes; current generic nodes are not R8 approval. |
| SwiftUI/Compose/future | Use native form, field, editor, file-picker and button equivalents with target-owned submission and file security. |

No target endpoint, hidden inputs, field schema, consent policy, upload backend,
storage, virus scanning, CRM record or notification flow was invented.

## Automated And Browser Verification

Final browser evidence covers shared structure, required/optional omission,
canonical ancestry, native invalid and valid submission, Enter, submitter,
FormData, FileList selection, reset, keyboard order, four paired natural
viewports, direct intrinsic widths, localized/RTL/extreme content, long file,
effective 200% text, user spacing, contrast, dark, forced colors, reduced motion
and exact normalized parity. Console issues and page errors are empty.

The evidence lives under `output/playwright/refinement-batch-117/`: four
preserved before captures, eight natural after captures, six special captures,
the executable probe, raw results and `evidence-summary.json`.

On 2026-08-11, owner decision 62 was reconciled without changing source. The
current R8 CSS slice is byte-identical to the evidenced Batch 117 slice;
representative Mobile/Desktop and special-mode captures were re-inspected, and
current contract, Studio, docs, shared-renderer, adapter, component and
refinement audits pass. The existing complete browser matrix therefore remains
the applicable visual and interaction evidence.

The browser phases used one fixed-port managed server at a time and one
ephemeral headless Chromium process with one page. Normal Chrome and parallel
servers/browsers were never used. Every browser closed in `finally`; cleanup
confirms the URL is unresponsive, port `4173` is free, the managed server is
stopped and the evidence gate is clean.

No command wrote `site/dist`.

Final structural/build gates include:

- `npm run validate:contracts` (`183` contracts)
- `npm run validate:studio` (`183` definitions, `1,030` semantic properties,
  `1,658` public-token references and `30` icon choices)
- `npm run validate:docs` (`183` registry components and MDX pages)
- `npm run audit:previews:static` (`255` previews, zero errors)
- `npm run build:components`
- `npm run build:adapter:web` and validation (`183` components, `19` CSS
  sources)
- `npm run build:adapter:shopify` and validation (`183` components, `83`
  target-ready; known maturity warnings only)
- production Vite build outside `site/dist` (`2,480` modules)
- `npm run audit:exhibit-studio` (`183/183` shared paths and complete visual/
  interaction classification)
- `npm run audit:components` (`183/183` automated passes)
- owner-decision reconciliation audit (`180/183` ready for human review after
  R8)
- source-identical Webflow and Shopify Ceramics CSS projections
- JSON parse, `git diff --check`, `npm run evidence:cleanup` and final
  `npm run evidence:assert-clean`

## Performance Budget

The R8 slice remains byte-identical to Batch 117 at `1,695 B` raw / `566 B`
gzip, SHA-256
`333c2eaf95aca275ce9d30e840c23c1f55bb128753aa56fe60c988a61d6aaabf`.
Current Ceramics CSS is `36,881 B` raw / `5,345 B` gzip, leaving `82 B` under
its fixed `5,427 B` ceiling. Neutral Web component CSS is `540,123 B` raw /
`72,660 B` gzip and shared runtime is `117,741 B` raw / `22,807 B` gzip; those
are previously documented global gaps, while R8 itself adds zero neutral
JavaScript.

## Risks And Required Human Decisions

1. Approve the v1 field inventory, requiredness, labels, examples,
   localization, schema owner and change process.
2. Approve personal/sensitive-data boundaries, consent, privacy disclosure,
   retention, deletion and access policy.
3. Approve feasibility, budget/pricing, deadlines, revisions, materials,
   dimensions, shipping, accessibility needs and commercial-term ownership.
4. Approve endpoint/service ownership for validation, submission, idempotency,
   abuse protection, authentication, persistence, retries, notifications,
   result announcements and focus behavior.
5. Approve file types/sizes/counts, content validation, scanning, storage,
   deletion, retry/failure behavior and whether local previews are allowed.
6. Decide whether R8 formally depends on canonical Form or remains an
   embeddable profile whose target chooses the native form boundary.
7. Approve the first Shopify consumer and whether storefront contact can
   represent the intake; select a verified app/backend path if files are needed.
8. Approve final one-column measure, spacing, type scale, dropzone prominence,
   action order and R8-specific Figma evidence across states and modes.
9. Perform explicit human stability review. Automated completion does not
   authorize promotion from `pilot` to `stable`.
