# 0095. Native Swatch And File Selection Ownership

Status: Accepted

Date: 2026-07-13

## Context

Color Picker and File Upload had target-agnostic CSS contracts but incomplete
native ownership. Color Picker lacked a group question, stable submitted option
values, required-group semantics, adequate targets, and a selected cue independent
from authored color. File Upload visually covered a native input but did not expose
complete form semantics or one shared selected-file/drag-state path; Studio also
prevented drop without updating the native FileList.

The same dependency batch includes Pin Input. Its accepted initial contract in ADR
0021 uses multiple one-character native inputs, while current HTML autofill and
platform evidence favors one complete-code native input with derived visual cells.
Changing that owner would amend accepted architecture, so it cannot be inferred as
part of this decision.

## Decision

- Color Picker is a specialized authored-option Swatch Group, not an arbitrary
  `input[type="color"]` editor.
- Its root is a native `fieldset` with a visible `legend`. Each option is a
  wrapping visible label around one same-name native radio with a stable submitted
  value.
- Static `checked` establishes an uncontrolled default. Native radio behavior owns
  mutual exclusion, focus, Arrow/Space, `input`/`change`, required validity,
  FormData, and reset. Framework targets control one group value rather than
  independent option booleans.
- The accepted `24px`, `32px`, and `40px` fills sit within at least a `44px`
  activation target. A selected double boundary is independent from fill color;
  the optional check is passive and never the only selected cue.
- Option fills remain authored target data. Image cropping, unavailable-product
  treatment, price/media recomputation, and free-form color authoring are not part
  of the neutral contract.
- File Upload keeps exactly one native `input[type="file"]` as the picker,
  FileList, form value, validity, event, and reset owner. The input covers the
  visible label/dropzone activation surface.
- Visible primary instruction supplies the accessible name. Authored guidance
  explains type/size policy, and a required polite visible status begins with a
  localized empty label and derives selected file names from the native FileList.
- `accept` and `capture` remain native hints, not validation or security policy.
  Server validation, upload transport, retry/progress, persistence, previews,
  removal, object URL creation/revocation, and directory policy remain target-owned.
- The shared File Upload enhancer may read native file names, toggle selected and
  drag-presence classes, and restore authored empty status after native form reset.
  It must not prevent native drop, assign DataTransfer files, synthesize value
  events, mirror file bodies, create previews, poll, observe continuously, or make
  network requests.
- Both components reuse existing public field/surface/action/type/radius/motion/
  opacity tokens. Contrast mixes, target geometry, wrapping, and status weight are
  private composition rather than new public tokens.
- Exhibit and Studio consume the same renderer, fixture, native owners, and
  canonical markup. Site-only fixture colors and Lucide artwork remain presentation
  data and never enter target-agnostic contracts.
- Pin Input remains unchanged under ADR 0021 until the owner explicitly chooses
  between the current multiple-input model and the recommended single native
  complete-code owner. No hidden mirrored value is an acceptable compromise.

## Performance Exception

After the Color Picker and File Upload refinement, canonical Forms CSS measures
`7,931 B` gzip against the unchanged `6.4 KiB` family ceiling. Shared runtime
measures `10,283 B` against the unchanged `8 KiB` ceiling. The complete Neutral
Web component CSS bundle measures `59,762 B` and remains below `64 KiB`.

ADR 0094 already records measured Forms/runtime exceptions for Slider, Combobox,
and Date Picker. This batch does not inherit an automatic allowance: it records
its own deltas and rationale.

- Color Picker adds no runtime.
- File Upload adds `529 B` gzip to the shared runtime, below the permanent `1 KiB`
  per-new-behavior delta ceiling.
- Forms CSS adds `617 B` gzip for two complete state/responsive/special-media
  surfaces. Moving rules to another family or site stylesheet would only hide the
  source cost and is rejected.
- Neither component adds a bundled asset or network request.

The absolute family/runtime gaps remain visible for later modularization or source
reduction. This explanation permits human-review readiness under ADR 0088; it does
not change the ceilings or decide a new runtime distribution architecture.

## Consequences

- Neutral Web and Shopify generated adapters receive the same native owners,
  classes, and bounded File Upload enhancer. Dedicated Liquid/editor data mapping
  remains target work.
- React and Angular can map one color group value and one native FileList without
  hidden mirrors. Figma maps semantic properties and states but owns no form state.
- SwiftUI and Compose use their nearest native single-choice and document-picker
  owners; exact drag/capture availability follows each platform.
- Color labels and File Upload empty status are required authored/localized content.
  Empty required content is invalid configuration rather than a blank UI state.
- Visual target/fill proportions, selected rings/checks, dashed dropzone, icon,
  padding, type hierarchy, validation, and focus still require explicit human
  approval before either contract may become `stable`.
- Pin Input remains an explicit open architecture question and is not ready for
  human stability review in this batch.
