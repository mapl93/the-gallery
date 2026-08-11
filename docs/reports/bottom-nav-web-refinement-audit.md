# Bottom Navigation Bar Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Bottom Navigation is now a fixed safe-area-aware mobile destination list with
visible localized labels, optional decorative icons/counts, one router-owned
current-page state, non-color current treatment, and normal Link interaction. It
does not claim Tabs, toolbar/menu semantics, local route selection, a count
provider, body offset, or platform-native Web behavior.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Persistent small mobile destination inventory; not Tabs, a command toolbar, checkout progress, or full hierarchy. |
| Anatomy and composition | pass | Labelled nav, one native list, entries, full-target links, visible labels, optional decorative icons and compact counts. |
| Variants, sizes, states | pass | One mobile/touch mode; default/hover/focus/current/count, zero/one current, narrow/RTL/dark/special-media cases. |
| Public API and ownership | pass | Required `label` and `items`; router, inventory, counts, breakpoint, body offset and announcements remain target-owned. |
| Tokens and visual system | pass | 14 accepted public references; icon/count geometry, gaps, padding, divider and breakpoint remain private composition. |
| Accessibility and motion | pass | Native list links, useful landmark name, visible labels/focus/current, count meaning on link, no tab/menu/toolbar model, reduced motion. |
| Responsive/content resilience | pass | Four viewports plus 320px RTL/long labels/`99+`, missing icon/count and safe-area override without page overflow. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no router, listener, provider, observer, request or count subscription. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native route/count/body-shell boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0105, contract/Studio/registry/MDX, shared renderer/fixture, before/after evidence and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 7 anatomy parts, 1 variant, 1 size, 6 states,
  5 behaviors, 2 required properties, 14 public token references, and no
  canonical component dependency. The compact count is navigation metadata,
  not standalone Badge composition.
- Exhibit and Studio expose one labelled landmark, one list, five list entries
  and native links, exactly one `aria-current="page"`, and one
  `Cart, 2 items` accessible name with the visual `2` hidden from duplicate name
  calculation.
- Link targets measure `58px` high in the base fixture and `90px` at 320px with
  long labels; every case remains above 44px. Keyboard focus computes a solid
  visible outline and current meaning retains weight/underline beyond color.
- At 320px, RTL long Spanish labels and `99+` remain bounded and the count moves
  logically while its digits stay LTR. Removing one icon and the count, plus a
  simulated `24px` safe area, preserves five links, 58px targets and page width.
- Dark and forced-colors renders preserve boundary, current, icons, count and
  focus. Reduced motion reports `0s` for item and count transitions.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  320px RTL/long/count, optional-content/safe-area, dark and forced-colors
  captures supplement two contemporaneous desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Fixed labelled native destination list with target route/count state and safe area. | CSS/semantics evidenced; breakpoint/body offset/router services remain target code. |
| Shopify | Merchant menu/routes plus cart/customer state and theme page-shell offset. | Shared CSS copies correctly; dedicated Liquid/service adapter remains planned. |
| React / Angular | Router-derived native links, current marker, count store and page-shell coordination. | Strategy documented; no component-local selection owner. |
| Figma | Default/current/focus/count, four/five items, safe area and long-label states. | Studio validates presentation; routes/announcements excluded. |
| SwiftUI / Compose | Native TabView/NavigationBar equivalents with platform selection/badge APIs. | Conceptual mapping; native semantics replace Web DOM. |

## Performance And Risks

- Bottom Navigation adds no neutral runtime. Batch 20 Global is the documented
  `4,470 B / 3.7 KiB` exception (`681 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `63,981 B / 64 KiB`.
- Human review must approve bar height, icon size/stroke, label wrapping,
  current/background/underline treatment, count geometry, divider, surface and
  safe-area rhythm, or provide a component-specific visual reference.
- Destination inventory/order/maximum, overflow/More policy, breakpoint,
  fixed/sticky mode, body offset, keyboard viewport, route resolution, dynamic
  announcements and Cart/Header synchronization remain target decisions.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, native-link/list/current/
focus/RTL/content/special-media probes, four-viewport evidence, TypeScript,
structural/parity/static-preview/refinement audits, temporary docs build,
deterministic performance, diff checks, and `site/dist` verification are included
in Batch 20.
