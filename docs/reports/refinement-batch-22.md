# Component Refinement Batch 22

Status: Tags Input complete for human review

Date: 2026-07-14

Components: Tags Input

## Outcome

Tags Input is prepared for explicit human stability review. Its dossier,
accepted component boundary, canonical Field Wrapper + Tag composition, native
draft semantics, controlled request policy, shared Exhibit/Studio renderer and
fixture, contract, Studio metadata, registry, MDX, generated/copied targets,
browser behavior, responsive/special-media evidence, and individual report are
reconciled.

The base field now commits only through Enter after IME composition and removes
only through a named canonical Tag action. The target owns the value collection,
duplicate/domain validation, localized status, persistence, focus result, and
form serialization. The component does not claim a Combobox without a popup or
ship neutral collection JavaScript. It remains `pilot`; Button is still the only
human-approved component. `site/dist` was not rebuilt or modified.

## Research And Decision

- WAI-ARIA APG Combobox/keyboard guidance, WCAG status/target-size criteria,
  Open UI Tag research, React Spectrum TagGroup, Material UI multiple-value
  Autocomplete, and current Shopify Text Field/Chip separation establish the
  draft/collection/removal boundaries.
- ADR 0107 adopts a controlled free-text composition and rejects duplicated Tag
  markup, dormant popup ARIA, implicit comma/blur commits, immediate empty-
  Backspace deletion, neutral data state, and target serialization assumptions.
- Contract, registry, MDX, Studio metadata, shared renderer, canonical CSS and
  generated targets describe the same anatomy, properties, states, request
  policy, and adapter gaps.

## Browser Evidence Summary

- The rendered label is explicitly associated with the native draft field. The
  field has no widget/popup ARIA; the empty atomic status is pre-mounted.
- Two canonical Tags replace all local tag copies. Named remove Buttons are
  exactly `24×24px`; read-only omits them and disabled uses native attributes.
- Enter adds, clears draft, announces count, and preserves focus. Duplicate
  input stays editable and is announced. Comma remains punctuation, empty
  Backspace is non-destructive, composing Enter is ignored, and explicit removal
  returns focus to the field.
- Error alone exposes `aria-invalid`; Error, Success, and Warning preserve
  distinct focused border/ring families. Field contrast is `17.93:1` light and
  `11.06:1` dark; canonical Tag contrast is `7.17:1`/`10.21:1`.
- Three Arabic/mixed-direction values at 390px, and the 200% CSS-zoom probe,
  maintain equal root/control/document client and scroll widths. Forced colors
  use system boundaries and reduced motion resolves transitions to `0s`.
- Exhibit and Studio normalized markup is identical at 954 characters.
- Twenty-two after images include eight canonical Exhibit/Studio × Mobile/
  Tablet/Desktop/XL captures plus empty, real focus, validation, availability,
  status, localized/RTL, dark, forced-colors and zoom evidence. Two desktop
  before images preserve the prior duplicated 16px-removal baseline.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Forms CSS | `9,615 B` | `6.4 KiB` | existing documented exception (`3,062 B` over) |
| Shared neutral runtime | `10,321 B` | `8 KiB` | existing documented exception; unchanged |
| Batch 22 runtime delta | `0 B` | `0 B` target-owned collection | pass |
| Neutral Web components CSS | `64,392 B` | `64 KiB` | pass (`1,144 B` headroom) |

Relative to the Batch 22 baseline, Forms and complete Web component CSS each add
`322 B`; neutral runtime adds `0 B`. The delta covers canonical composition,
logical containment, validation/read-only/disabled states, reduced motion,
forced colors, and the private status region. It does not reset either existing
exception.

## Validation

- Registry/docs, DTCG source, 183 contracts, and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; copied Forms CSS and shared
  JS are byte-identical to canonical source. Shopify's 24 existing non-blocking
  maturity warnings remain backlog.
- Structural certification passes 183/183 with one stable contract and zero
  manifest drift. Exhibit/Studio parity is 183/183 shared with complete visual/
  interaction coverage. All static previews and the refinement audit pass.
- TypeScript, a complete Vite build into `/tmp`, native browser semantics/
  interaction/content/responsive/special-media probes, component-console checks,
  deterministic gzip, generated-copy comparisons, syntax/diff checks, and
  explicit `site/dist` cleanliness pass.

## Remaining Human Risks And Open Input

1. Approve label/control spacing, field density/height, surface and border
   strength, Tag alignment, row gap/wrapping, focus thickness, draft baseline,
   required marker, and Error/Success/Warning palettes.
2. Suggestions must compose the complete Combobox contract or become a separate
   constrained multi-select; v1 does not imply that architecture.
3. Comma/semicolon, blur, paste splitting, Backspace navigation/deletion,
   duplicate normalization, allowed characters, limits, async validation,
   identity, ordering, drag and truncation remain explicit target/product work.
4. Shopify needs a concrete product/metafield/filter/form owner before choosing
   target state and repeated-input/FormData/JSON/URL/navigation serialization.
5. No component-specific owner visual references are registered; accept the
   repository render or provide replacement evidence.
6. Forms and shared runtime remain above provisional ceilings; this batch adds
   `322 B` CSS and `0 B` runtime and does not reset those exceptions.
7. Pin Input still requires the owner choice between one full-code native input
   with derived cells and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 63 dossiers,
and 60 components ready for human review. Only Button is human-approved; Tags
Input remains `pilot` pending explicit review. The next dependency-safe component
is Price (review order 64); Cart Drawer follows after Price at review order 65.
