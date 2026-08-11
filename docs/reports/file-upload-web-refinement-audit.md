# File Upload / Dropzone Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

File Upload now has one full-surface native file input as the only picker,
FileList, form value, validity, event, and reset owner. A bounded shared enhancer
reflects drag presence and selected file names without replacing native drop,
uploading data, validating files, or creating previews.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Selects local files; transport, security validation, persistence, progress, preview/removal, and object URLs remain target-owned. |
| Anatomy and composition | pass | Root activation surface, sole native input, optional icon/hint, required instruction/status, and optional target-owned preview/thumb. |
| Variants, sizes, states | pass | Four validation families, one size, default/hover/drag/focus/selected/disabled/required-invalid states. |
| Public API and ownership | pass | Eleven semantic properties cover visible/localized content and stable native form/picker hints. |
| Tokens and visual system | pass | Thirty-one existing public references; contrast mixes, container padding, status weight, and geometry remain private. |
| Accessibility and motion | pass | One accessible button/input, visible guidance/status, native keyboard/picker behavior, disabled/focus, reduced motion, and forced colors pass. |
| Responsive/content resilience | pass | Four viewports plus `322px` RTL localized/unbroken fixture produce zero root/page overflow. |
| Runtime and assets | exception explained | `529 B` gzip bounded enhancer delta, under the `1 KiB` behavior delta; no FileReader/object URL/network/polling/observer/assets. |
| Cross-target translation | pass | Web/Shopify native FileList mapping plus framework/Figma/native document-picker boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0095, exact shared renderer/fixture, 8 canonical captures, native FileList probes, generated adapters, and this report. |

## Contract, State, And Runtime

- Contract `0.3.0`: 8 anatomy parts, 4 variants, 1 size, 7 states,
  4 behaviors, 11 properties, and 31 public token references.
- `name`, `accept`, `multiple`, `required`, `capture`, and `disabled` map directly
  to the sole native file input. `accept`/`capture` remain hints, not validation.
- Visible instruction supplies the accessible name; hint supplies policy guidance;
  localized `emptyStatus` is restored after reset and exact native file names are
  announced through one polite visible status.
- Enhancement performs bounded event work only: read file names after native
  `input`/`change`, reset status after form reset, and toggle drag presence. It
  never prevents drag defaults, assigns files, sends data, parses bodies, or
  creates/revokes object URLs.

## Browser And Visual Evidence

- A real PNG selection produced one native `File`, the exact filename in visible
  status, `.file-upload--selected`, valid required state, and the same submitted
  FormData entry. Native reset returned zero files, the localized empty label,
  and no selected class.
- A two-file selection announced both exact names without an English count
  template. A file drag set and cleared visual drag state with
  `defaultPrevented=false` and left the native FileList untouched.
- The absolute input covers the dropzone interior; the wrapping label also owns
  its 2px boundary, so the complete visible surface activates the native picker.
- Light passive/focused boundaries measure `3.07:1`/`10.37:1`; primary/hint/
  status text measure `17.93:1`/`7.81:1`/`17.93:1`. Dark passive/focused
  boundaries measure `5.22:1`/`17.93:1`; primary/hint/status are
  `16.67:1`/`12.09:1`/`16.67:1`.
- Reduced-motion transition resolves to `0s`; forced colors produces CanvasText
  boundary and 4px Highlight focus. Disabled root/input cursors are
  `not-allowed`, opacity is `0.5`, and disabled hover is suppressed.
- A `322px` RTL Spanish fixture with long localized instruction/guidance and an
  unbroken filename has zero child/root/document overflow.
- Exhibit and Studio stage markup is byte-identical at 990 characters. Eight
  canonical after screenshots cover both views at `390x844`, `768x1024`,
  `1440x1000`, and `1920x1200`; selected-focus, dark-focus, and extreme RTL
  evidence supplement six Batch 10 before captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | One full-surface native file input, canonical CSS, and bounded name/drag/reset enhancer. | Implemented and browser-evidenced. |
| Shopify | Native Liquid file input where supported plus copied CSS/runtime hooks. | Generated adapter validates; upload endpoint/editor/data policy remains target work. |
| React / Angular | Native `files` plus `input`/`change`/`cancel`; no controlled string value or hidden mirror. | Strategy documented; adapter not yet certified. |
| Figma | Empty/selected/drag/focus/disabled/validation presentation and authored text. | Metadata validates; no runtime/FileList ownership. |
| SwiftUI / Compose | Native document/media picker with nearest platform capture/drag affordance. | Conceptual mapping only. |

## Performance

- Canonical Forms CSS: `7,931 B` gzip versus `6.4 KiB` ceiling — documented
  family exception in ADR 0095.
- Shared runtime: `10,283 B` gzip versus `8 KiB` ceiling — existing absolute
  exception; this behavior adds `529 B`, below the `1 KiB` delta ceiling.
- Neutral Web component CSS: `59,762 B` gzip versus `64 KiB` — pass.
- Bundled assets/network: zero.

## Remaining Human Risks

1. Approve dashed boundary, `32px`/narrow-container padding, icon scale, text/
   hint/status hierarchy, drag/selected treatment, validation, and focus.
2. Accept the repository render as component-specific visual evidence or provide
   a File Upload reference; the registered Studio frame is shared calibration.
3. Preview/removal/progress/error composition and single-file replacement remain
   target product decisions.

## Validation

Contracts, Studio, registry/docs, public token compatibility, Neutral Web,
Shopify, structural certification, parity, static previews, native FileList/form/
drag/RTL/special-media checks, four-viewport evidence, temporary docs build,
performance, syntax, and diff checks are included in Batch 10.
