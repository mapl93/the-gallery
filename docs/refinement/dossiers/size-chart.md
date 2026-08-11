# Component Dossier: Size Chart

Status: `human-review-ready`

Date: 2026-07-20

Registry: `D7` / `size-chart`

Accepted direction: D7-A / ADRs 0213 and 0242

## Recommendation

Keep Size Chart as a thin product-domain profile over canonical Modal, Data
Table and optional Segmented Control. Present one complete target-authored
static table at a time inside the same centered Modal at every Web viewport.
When two presentations exist, such as centimetres and inches, replace the
entire table with another independently authored table; do not calculate one
from the other.

The neutral component owns product intent, localized trigger/title/dismiss
copy, required chart composition, optional presentation controls, optional
notes and semantic open state. It does not own a universal row/column schema,
raw measurements, conversion, rounding, fit logic, preference persistence,
Dimensions synchronization, a second overlay or a separate table system.

Shopify uses the approved bounded target schema: one merchant-owned
`custom.size_chart` Product metafield references a reusable chart record with
one required and one optional complete three-column presentation. Each table
has at most twenty complete row records. This target limit does not become
neutral API.

## Purpose And Limits

- Gives product-context users an on-demand reference before selection or
  purchase.
- Presents a captioned matrix with explicit row/column relationships, visible
  units and target-owned qualifiers.
- May include localized method, approximation, tolerance, fit or handmade-
  variation notes.
- Does not select a variant, recommend fit, validate body measurements, mutate
  commerce state or guarantee equivalence between presentations.
- Does not parse, calculate, convert, round, localize, persist, synchronize or
  announce measurement values.
- Does not expose Modal width, overlay opacity, padding, breakpoint, sticky
  headers, row hover, column count or icon geometry as public properties.
- A very large or structurally different matrix requires an inline, dedicated,
  full-screen or other target presentation. D7 does not virtualize, transpose
  or restructure a native table at a breakpoint.

## Repository And Owner Evidence

- The repo remains the source of truth; Figma and target platforms are
  evidence/adapters.
- ADR 0034 requires semantic contract ownership, shared docs rendering and
  explicit human review before `stable`.
- ADR 0205 established complete target-formatted measurement sets for
  Dimensions rather than implicit neutral conversion.
- ADR 0213 removed D7's duplicate overlay, unit-button and table systems and
  accepted canonical Modal/Data Table/Segmented Control composition.
- The owner selected D7-A: complete target-authored tables, centered Modal at
  every Web viewport, no narrow Sheet substitution, and a bounded Shopify
  metaobject reference.
- ADR 0242 records that decision and the large-matrix boundary.
- Historical Figma nodes registered for this component are generic Studio
  traces, not D7-specific final visual approval. No owner Size Chart artwork
  was provided.

## Standards And Mature-System Evidence

| Source | Relevant evidence | Direction for The Gallery |
| --- | --- | --- |
| [WAI-ARIA APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | A modal makes outside content inert, moves focus inside, contains Tab, closes on Escape, restores focus and has visible dismissal. Structured content can focus a static start and omit `aria-describedby`. | Compose canonical Modal, focus the visible title and preserve native structure rather than flattening the chart into one description. |
| [W3C H102 native dialog](https://www.w3.org/WAI/WCAG22/Techniques/html/H102) | Native modal dialog supplies platform modality and Escape behavior. | Shopify maps the target lifecycle to `<dialog>.showModal()` while D7 remains target-independent. |
| [WAI Tables tutorial](https://www.w3.org/WAI/tutorials/tables/) | Captions and scoped headers preserve dataset and row/column context. | Require a static canonical Data Table with caption, column headers and row headers. |
| [WAI responsive table tips](https://www.w3.org/WAI/tutorials/tables/tips/) | Narrow tables must remain reachable without destroying relationships. | Keep the canonical named focusable overflow owner; do not transform the table structure. |
| [WAI-ARIA APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | Same-name native radios provide one value and standard Arrow/Space behavior. | Optional presentation choice composes Segmented Control rather than independent pressed buttons. |
| [Open UI Dialog research](https://open-ui.org/components/dialog.research/) | Systems converge on labelled dialog concepts but vary visually. | Reuse Modal anatomy and keep geometry private. |
| [Open UI Table](https://open-ui.org/components/table/) | Static tables are not interactive grids. | Do not add `role="grid"` or cell keyboard navigation. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Composable Trigger/Overlay/Content/Title/Close plus controlled/uncontrolled state. | Framework targets may expose `open/onOpenChange` or `defaultOpen` through canonical Modal. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | One string value, native form propagation and keyboard navigation. | Selected presentation belongs to the target's Segmented Control state, not a D7 boolean. |
| [Polaris Modal](https://polaris-react.shopify.com/components/internal-only/modal) | Modal is a secondary, explicitly invoked task surface with title and activator lifecycle. | Keep Size Chart concise and explicitly invoked. |
| [Shopify metaobjects](https://shopify.dev/docs/apps/build/metaobjects) | Reusable size charts are a documented custom-data use case and Product metafields can reference records. | Use a merchant-owned reusable record with explicit definition, localization and Liquid mapping. |

Consensus supports one labelled modal lifecycle, a native static table and one
exclusive optional presentation value. The owner decisions resolve the project-
specific points on complete tables, Web modality and Shopify bounds.

## Anatomy And Composition

| Part | Required | Owner |
| --- | --- | --- |
| `.size-chart` | yes | D7 product-profile root; no landmark/widget role |
| `.size-chart__trigger.btn.btn--link` | yes | D7 content plus canonical Button/Modal invoker |
| `.size-chart__overlay.modal-overlay` | while open | canonical Modal overlay; native Shopify dialog owner |
| `.size-chart__dialog.modal` | while open | canonical Modal visual surface |
| `.modal__title` | yes while open | visible accessible-name source and initial focus target |
| `.modal__close.close-btn` | yes while open | canonical visible dismissal |
| `.size-chart__content.modal__body` | yes while open | intrinsic D7 composition flow |
| `.size-chart__units.segmented` | optional | canonical Segmented Control plus target-selected presentation |
| `.size-chart__chart.table-wrapper > .table` | yes | canonical Data Table plus complete target-authored values |
| `.size-chart__notes` | optional | target-authored ordinary prose; no live region by default |

## State And Mode Matrix

| State/mode | Contract |
| --- | --- |
| Closed | Root and named canonical trigger only. |
| Open | Centered named Modal with required complete chart. |
| One presentation | No empty unit-control region; primary chart shown. |
| Two presentations | Same-name radios own exactly one selected value and switch complete authored panels. |
| Notes absent/present | Notes subtree omits cleanly or follows the table. |
| Missing title/labels/chart | Complete D7 omits rather than exposing an unusable shell. |
| Mobile/Tablet/Desktop/XL Web | Same centered Modal profile; no Sheet substitution. |
| Large matrix | Different target presentation; no D7 virtualization or structural mutation. |
| Controlled/uncontrolled | Target may expose controlled `open/onOpenChange` or uncontrolled `defaultOpen`; there is no second D7 state store. |
| RTL/localized/200% | Logical layout wraps; independently formatted values use `bdi`; named table overflow remains reachable. |
| Dark/forced colors/reduced motion | Canonical dependencies own contrast, boundaries, focus and motion reduction. |

## Public API

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `triggerLabel` | string | required | Visible localized modal invoker label. |
| `title` | string | required | Visible localized Modal title and accessible name. |
| `dismissLabel` | string | required | Contextual accessible name for visible dismissal. |
| `chart` | slot | required | One complete canonical static Data Table. |
| `unitControls` | slot | optional | Canonical Segmented Control coordinated by the target. |
| `notes` | slot | optional | Verified localized guidance or qualification prose. |
| `open` | boolean | optional, default `false` | Semantic presentation state; target/Modal owns lifecycle. |

Rows, columns, raw values, unit inventory, conversion factor, precision,
formatter, locale, tolerance, recommendation, persistence, width, placement,
Sheet mode and announcement remain outside the public API.

## Tokens, CSS And Runtime

D7 uses only five public references already present in the neutral target:

- `--color-text-secondary`;
- `--space-layout-element-gap`;
- `--font-family-body`;
- `--typo-body-sm-size`;
- `--typo-body-sm-line-height`.

Modal, Button, Close Button, Segmented Control and Data Table own all other
visual values. D7 adds intrinsic containment, notes flow and native-dialog
normalization. The native dialog keeps the canonical opacity transition but
makes `visibility` immediate so the static title can receive focus after
`showModal()`; reduced motion still removes the transition.

Neutral D7 adds zero JavaScript. Shopify adds one target-only custom element
definition with no request, observer, timer, storage, conversion catalogue or
layout read. Row rendering is bounded at twenty per presentation.

## Target Translation

| Target | Mapping |
| --- | --- |
| Neutral Web | Centered canonical Modal plus optional Segmented Control and required Data Table; target owns lifecycle. |
| React docs target | Shared `SizeChartArtwork`, `ModalArtwork`, `SegmentedControlArtwork` and `DataTableArtwork` serve Exhibit and Studio. |
| Shopify | `custom.size_chart` reference, bounded merchant-owned row/chart definitions, `size-chart.liquid`, native `<dialog>` lifecycle and optional Main Product block. |
| Webflow / Framer | CMS supplies complete chart/notes; target provides modal and optional panel coordination. |
| React / Angular / Hydrogen | Thin composition over target-native canonical primitives; target owns open and selected presentation. |
| Figma | Closed/open, one/two presentations, notes absent/present and narrow/wide visual states; D7-specific owner artwork remains pending. |
| SwiftUI / Compose | Native modal/dialog plus accessible table/list equivalent and exclusive choice; data formatting remains target-owned. |

The complete Shopify definition/write/read sequence is documented in
`docs/adapters/shopify-size-chart-custom-data.md`.

## Evidence Result

The renewed evidence at
`output/playwright/refinement-product/size-chart-0242/` proves:

- eight sequential Exhibit/Studio Mobile, Tablet, Desktop and XL captures;
- zero dialog/document overflow and exact centered geometry at all eight;
- exact normalized Exhibit/Studio DOM hash `026a6f84`;
- title focus, native radio Arrow behavior and complete-table replacement;
- one caption, three column headers, three row headers and zero grid roles;
- dark, forced-color, reduced-motion, RTL and effective-200-percent modes;
- a styled Shopify native-dialog harness with outside inertness, root scroll
  lock, title focus, complete panel switch, Escape/backdrop dismissal and
  invoker/scroll restoration; and
- zero page errors, console errors or evidence failures.

The final phase used one managed server, one `gallery-refinement` headless
session and one tab. Cleanup left port 4173 free and the clean-resource gate
passing.

## Remaining Risks And Questions

1. Human review must approve the link trigger, modal width/chrome, unit-control
   placement, table density, caption treatment, notes hierarchy and narrow
   visual candidate.
2. D7-specific owner/Figma artwork is still absent.
3. Provision the merchant-owned definitions against a real store only after
   checking for a pre-existing incompatible `custom.size_chart` definition.
4. Exercise real merchant records, translation workflow, Product association,
   Theme Editor block add/remove/reorder and storefront lifecycle before
   Shopify release.
5. Larger or non-three-column merchant matrices need a separately designed
   target presentation rather than expansion by assumption.

## Readiness Decision

`human-review-ready`. The D7-A data boundary, centered Web modality, canonical
composition, Shopify target schema/lifecycle, accessibility, responsive
behavior, performance and Exhibit/Studio parity are reconciled. The contract
remains `pilot`; final human visual approval is pending and no `stable`
promotion is made.
