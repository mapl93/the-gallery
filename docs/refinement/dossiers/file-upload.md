# Component Dossier: File Upload / Dropzone

Status: `human-review-ready`

Target reviewed: Neutral Web native file input with dropzone presentation

Contract: `components/contracts/file-upload.contract.json`

## Recommendation

Keep one native `input[type="file"]` as the sole selection/form owner and let the
entire visible dropzone label activate it. Drag-and-drop is progressive input,
not a separate value store. The neutral source should synchronize drag presence,
selected file names/count, disabled/focus/validation presentation, native events,
and reset; it must not upload, fetch, validate byte size, generate object URLs,
or own persistence. Preview content and remove/upload progress stay target-owned.

## Purpose And Limits

- Selects one or more local files for a form or target-owned upload workflow.
- Pointer click, keyboard activation, and the system picker remain the universal
  path; drag-and-drop is an optional enhancement.
- `accept` is a picker hint, not authoritative MIME/extension or security
  validation. Visible size/type guidance is authored content.
- The component does not send files, retry requests, scan content, persist data,
  generate thumbnails, revoke object URLs, or define server error policy.
- Optional previews reflect target-owned selected/uploaded data and are not the
  native form owner.

## Pre-Refinement Gallery Baseline

- Registry `H6`; contract `0.2.0`, `pilot`: seven anatomy parts, four variants,
  one size, three states, three behaviors, five properties, and twenty-five
  public token references.
- The native input covers the surface and opens the system picker, but `name`,
  `required`, `capture`, selected-file status, reset, disabled presentation, and
  native event ownership are absent from the public contract.
- Drag-active state exists only in Studio local React state; Exhibit has no
  shared enhancement. A drop is prevented in Studio without updating the native
  FileList, so the visual state and file owner can diverge.
- Exhibit uses a div plus nested label while Studio uses the root label itself;
  their fixtures and anatomy are not yet identical.
- Default boundary contrast, long filenames/instructions, special media, and
  mobile containment have not been certified. The invisible native input causes
  a static-audit warning because its intentional pointer ownership is undocumented.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML File Upload state](https://html.spec.whatwg.org/multipage/input.html#file-upload-state-(type=file)) | The native control owns a `FileList`, single/multiple selection, picker activation, form value, events, and user-agent drag/drop updates. | Keep the native FileList as the only selection owner. |
| [Open UI File explainer](https://open-ui.org/components/file/) | Common anatomy is selector button plus selection label; one Tab stop, form integration, file names/count, and RTL are expected. Preview/removal behavior is explicitly unspecified. | Keep selection status neutral and leave preview/removal lifecycle to targets. |
| [Open UI File research](https://open-ui.org/components/file.research/) | Default, selected, multiple, disabled, and file-list concepts recur across systems. | Expand states without inventing an upload service. |
| [Shopify Drop zone](https://shopify.dev/docs/api/app-home/web-components/forms/drop-zone) | Mature API exposes label, accessibility label, accept, multiple, required, disabled, error, input/change, and rejected-drop events; upload remains consumer-owned. | Add native form properties and keep server work outside the base. |
| [Carbon File Uploader](https://carbondesignsystem.com/components/file-uploader/usage/) | Click and drop are equivalent paths; focus returns after the picker; filenames, removal, loading, success, and error need clear states. | Preserve picker focus and document target-owned file-list actions/status. |

## Recommended Ownership And API Direction

- Required anatomy: root label/dropzone, native file input, primary instruction,
  and visible polite selected-file status. Hint is optional; preview content is
  target-owned.
- Public concepts: `label`, `hint`, localized `emptyStatus`, `variant`, `name`,
  `accept`, `multiple`, `capture`, `required`, `disabled`, and `describedBy`.
- Native `files`, `input`, `change`, `cancel`, FormData, validity, and reset remain
  authoritative. The base may read file names/count for status but never mirrors
  or serializes file bodies.
- Drag state is derived from active file drag events and clears on leave/drop;
  the user agent/native input remains responsible for changing FileList.
- Targets may render preview/remove/progress entries from their own lifecycle, but
  must synchronize removal back to the native selection or clearly own a
  separate already-uploaded asset list.

## Alternatives And Non-Decisions

1. A visible native unstyled file control is the simplest fallback but does not
   provide the accepted dropzone presentation; the hidden input stays focusable.
2. Programmatically assigning dropped `DataTransfer.files` is possible in some
   engines but duplicates user-agent behavior and is not required for v1.
3. File-size validation, MIME sniffing, upload progress, removal, previews,
   directories, camera UX, and server persistence remain target decisions.

## Implemented And Verified Result

- Contract `0.3.0`: eight anatomy parts, four variants, one size, seven states,
  four behaviors, eleven semantic properties, and thirty-one public token
  references. Visible label/hint/empty status and native name/accept/multiple/
  required/capture/disabled semantics are explicit.
- One full-surface native file input remains the only FileList, picker, form,
  validity, and reset owner. A browser probe selected a real PNG, announced its
  exact filename, submitted the same `File`, changed value-missing from true to
  false, and reset to zero files plus the localized authored empty status.
- Multiple selection announces the exact two file names rather than embedding an
  English count. The shared enhancer only reads names, toggles selected/drag
  classes, and restores status on reset; it does not prevent drag defaults or
  assign a DataTransfer FileList.
- Light passive boundary measures `3.07:1`, focused boundary `10.37:1`, primary
  text `17.93:1`, and hint `7.81:1`. Dark passive/focused boundaries measure
  `5.22:1`/`17.93:1`; primary/hint text measure `16.67:1`/`12.09:1`.
- Disabled pointer/hover suppression, `0s` reduced-motion transition, forced
  system boundary/Highlight focus, and a `322px` RTL long localized/unbroken
  fixture with zero overflow pass.
- Exhibit and Studio use byte-identical canonical stage markup (`990`
  characters) and the same empty fixture. Eight captures cover both surfaces at
  Mobile, Tablet, Desktop, and XL; dark focus, selected focus, and extreme RTL
  evidence supplement them.
- No fetch, upload transport, FileReader, object URL, polling, continuous layout
  work, preview generation, or bundled asset was added. The bounded enhancer
  adds `529 B` gzip, below the per-behavior `1 KiB` delta budget.

## Current Risks And Human Questions

1. Human approval is needed for dashed boundary, 32px padding, icon, text/hint
   hierarchy, drag treatment, selected-file status, validation, and focus.
2. No File Upload-specific owner visual reference is registered.
3. Preview cards, per-file removal/errors, progress, and single-upload replacement
   are target-owned until a future compositional contract is accepted.

## Readiness Decision

Ready for explicit human review. The contract remains `pilot`; no visual
approval or `stable` promotion is implied.
