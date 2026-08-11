# Breadcrumb Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Breadcrumb now renders one named native navigation landmark with an ordered list,
repeatable list items, native ancestor links, hidden visual separators, and one
current item. It wraps localized and unbroken labels without hiding hierarchy or
adding a behavior-heavy collapse API.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Hierarchical location only; history, primary navigation, stepper, pagination, and collapse are excluded. |
| Anatomy and composition | pass | Required `nav > ol > li`, optional native links/separators, one current item. |
| Variants, sizes, states | pass | One default treatment; default/hover/focus/current, wrapping, RTL, dark and special media. |
| Public API and ownership | pass | Optional label and required current label; route records/URLs remain target data; no controlled state. |
| Tokens and visual system | pass | Twelve existing public references; spacing calculations and focus geometry remain private. |
| Accessibility and motion | pass | Named landmark, ordered hierarchy, hidden separators, native link keyboard behavior, contrast-safe hover/focus, reduced motion and forced colors. |
| Responsive/content resilience | pass | Full path wraps; localized unbroken mobile fixture keeps stage/root client and scroll widths equal. |
| Runtime and assets | pass | `0 B` component runtime; no listener, observer, timer, request, asset, or layout measurement. |
| Cross-target translation | pass | Web, Shopify Liquid, frameworks, Figma and native boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0100, shared renderer, before/live after evidence, synchronized adapters and this report. |

## Contract And Browser Evidence

- Contract `0.3.0` requires root/list/item/current anatomy and documents native
  hierarchy, focus, wrapping, target data, and zero-runtime behavior.
- Accessibility snapshots expose `navigation`, `list`, repeated `listitem`, two
  native links, and one current item; separators do not enter the tree.
- At a 390px viewport, the preview stage is `358px` wide and the component is
  `326px`; both retain equal client/scroll widths with an unbroken localized
  current label. `overflow-wrap: anywhere` is computed on the current item.
- Light contrast is `7.81:1` for ancestor links and `17.93:1` for current text.
  Hover text now remains primary at `17.93:1`; accent is the underline rather
  than insufficient-contrast text. Dark links/current use `#d4d4d4`/`#fafafa`
  on `#171717`.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized mobile, keyboard focus, hover, dark, and forced-colors/reduced-motion
  captures supplement them.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named `nav`, ordered list, native links, hidden separators, one current item. | Implemented and evidenced. |
| Shopify | Route objects map to the same list/item/link/separator/current classes. | Implemented; Home localization remains target work. |
| React / Angular | Router records map to native anchors/current derivation; no local selection state. | Strategy documented; adapter not certified. |
| Figma | Hierarchy, ancestor/current/focus states and wrap intent. | Studio metadata validates; no route semantics. |
| SwiftUI / Compose | Native hierarchical navigation where the target offers an equivalent. | Conceptual mapping only. |

## Performance And Risks

- Breadcrumb adds no neutral JS. Layout is `5,257 B` gzip with the documented
  `342 B` family exception; complete Web component CSS is `61,364 B / 64 KiB`.
- Human review must approve slash treatment, spacing, current weight, target
  height, focus ring, wrapping rhythm, and the choice to show the complete path.
- Any future collapse/overflow-menu policy changes accessible hierarchy and
  requires explicit product review rather than a private responsive tweak.

## Validation

Contracts, Studio, docs/registry, public-token compatibility, synchronized Web/
Webflow/Shopify outputs, DOM/accessibility/keyboard/contrast/overflow/special-
media probes, four-viewport visual evidence, TypeScript, structural/parity/
static-preview/refinement audits, temporary docs build, deterministic performance,
diff checks, and `site/dist` verification are included in Batch 15.
