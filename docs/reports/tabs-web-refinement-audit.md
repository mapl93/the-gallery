# Tabs Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Tabs now declares a labelled horizontal tab set with one selected enabled tab,
roving focus, automatic/manual activation, disabled-item skipping, paired hidden
panels, direction-aware keys, and a panel focus path. The shared docs renderer
demonstrates the behavior without adding neutral runtime or promising vertical,
routed, closable, lazy, or dynamic modes.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Local content-layer navigation; app bars, routes, workflows and unsupported richer modes remain excluded. |
| Anatomy and composition | pass | Root, labelled scrollable list, native tabs and paired panels. |
| Variants, sizes, states | pass | Horizontal/default; default/hover/selected/focus/disabled/hidden; automatic/manual activation. |
| Public API and ownership | pass | Required label/items plus per-item selected/disabled and activation mode; targets own value lifecycle. |
| Tokens and visual system | pass | Thirteen existing public references; border width, padding and selected mix remain private composition. |
| Accessibility and motion | pass | Bidirectional relationships, one selected/roving item, disabled skip, RTL keys, panel Tab path, special media. |
| Responsive/content resilience | pass | List owns horizontal overflow; localized RTL 320px keeps root/stage free of inline overflow. |
| Runtime and assets | pass | `0 B` neutral runtime; no observer, timer, provider, request, continuous read or asset. |
| Cross-target translation | pass | Web, Shopify host/theme, frameworks, Figma and native boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0099, shared renderer, reconstructed before/live after evidence, adapters and this report. |

## Contract And Ownership

- Contract `0.3.0`: 4 anatomy parts, 1 variant, 1 size, 6 states,
  7 behaviors, 5 properties, and 13 public token references.
- The neutral API describes `label`, repeated items, per-item `selected` and
  `disabled`, and `automatic|manual` activation. Targets translate those facts
  to one controlled/uncontrolled value owner and emit selection changes.
- One enabled tab has `tabindex=0`; every inactive panel has `hidden`; the
  visible text panel has `tabindex=0`. Dynamic panel focus strategies remain
  target-aware when a better first focusable descendant exists.
- Horizontal v1 deliberately excludes vertical, routing, closing/reordering,
  lazy data, persistence, and overflow-menu APIs.

## Browser And Visual Evidence

- Automatic ArrowRight selects/focuses Shipping and displays its panel. When
  Shipping becomes disabled, selection falls back to Overview and navigation
  skips the unavailable item.
- In manual mode ArrowLeft moves focus from Details to Overview while selection
  and visible panel remain Details; Enter then selects Overview.
- With `dir=rtl`, ArrowRight from Overview moves focus to Details while manual
  selection remains Overview. Enter followed by Tab places focus on the selected
  `tabpanel` with the correct `aria-labelledby`.
- Exactly one selected tab and one visible panel survive all probes. At 320px,
  the list is `256px` wide with `1192px` scroll content while root and stage keep
  equal client/scroll widths; localized labels remain single line.
- Selected text contrast is `5.89:1` light and `9.94:1` dark; panel text is
  `17.93:1` light and `17.18:1` dark.
- Eight canonical captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  dark, manual-disabled RTL, localized 320px overflow, and forced-colors/
  reduced-motion captures supplement them.
- Two desktop baseline images are explicitly reconstructed from pre-edit source;
  the failed first live capture is not represented as real evidence.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | APG tablist/tabs/panels plus target roving selection handler. | CSS/docs behavior evidenced; production handler pending. |
| Shopify | Host Tabs when semantics match, otherwise Liquid structure plus theme runtime. | Generated CSS synchronized; host/theme testing pending. |
| React / Angular | Controlled/uncontrolled selected value, activation mode, disabled items and change events. | Strategy documented; adapter not certified. |
| Figma | List/tab/panel anatomy and selected/focus/hover/disabled states. | Studio metadata validates; no keyboard ownership. |
| SwiftUI / Compose | Native local-content tab selection, not app-level navigation bars. | Conceptual mapping only. |

## Performance And Risks

- Batch 14 adds no neutral JS. Layout is `5,144 B` gzip with the documented
  `229 B` provisional exception; full Web components are `60,996 B / 64 KiB`.
- Human review must approve underline weight/color, tab spacing/height, selected
  text mix, focus ring, panel gap, scrollbar/overflow affordance, and disabled
  treatment.
- Vertical/routed/closable/lazy/dynamic modes, active-tab scroll-into-view,
  production host/framework behavior, and device assistive-technology testing
  remain open.

## Validation

Contracts, Studio, docs/registry, public-token compatibility, synchronized
Web/Webflow/Shopify outputs, automatic/manual/disabled/RTL/roving/panel-focus/
localized-overflow/contrast/special-media probes, four-viewport visual evidence,
TypeScript, structural/parity/static-preview/refinement audits, temporary docs
build, deterministic performance, diff checks, and `site/dist` verification are
included in Batch 14.
