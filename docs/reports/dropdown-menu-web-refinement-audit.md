# Dropdown Menu Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Dropdown Menu is now a Button-triggered immediate-command composite with a named
menu, labelled groups, separators, roving focus, Arrow/Home/End navigation,
printable typeahead, disabled and destructive commands, non-trapping Tab exit,
and complete dismissal/restoration evidence. Checkable items, radio groups,
submenus, navigation and positioning services remain outside v1.

No visual approval, broader menu API, or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Compact immediate commands; navigation, selection, arbitrary content and nested/checkable breadth are excluded. |
| Anatomy and composition | pass | Trigger, named menu, optional labelled groups/labels/icons/shortcuts/separator and required command items. |
| Variants, sizes, states | pass | Default/danger items; open/highlight/focus/disabled plus RTL/localized, dark and special-media modes. |
| Public API and ownership | pass | Only `open` and per-item `itemVariant`; collection data/events and positioning stay target-owned. |
| Tokens and visual system | pass | Twenty-one existing public references; menu geometry, padding, icon/shortcut gaps and letter spacing remain private. |
| Accessibility and motion | pass | APG relationship, one roving tab stop, full keyboard/dismissal lifecycle, disabled non-activation and `0s` motion. |
| Responsive/content resilience | pass | 390px Arabic RTL proof; long item grows vertically with equal root/menu widths and no inline overflow. |
| Runtime and assets | pass | `0 B` neutral Dropdown runtime; target-local renderer behavior adds no source listener or framework dependency. |
| Cross-target translation | pass | Web menu composite and Shopify/framework/Figma/native menu boundaries are documented. |
| Documentation and verification | pass | Dossier, ADR 0102, contract/docs/Studio/registry, one renderer/fixture, before/after evidence and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 8 anatomy parts, 2 item variants, 1 size, 6 states,
  7 behaviors, 2 properties and 21 public token references.
- The shared renderer exposes one trigger-named menu, two groups, one separator,
  four commands and initial `tabindex` values `[0,-1,-1,-1]`.
- ArrowDown opens/focuses the first command; subsequent arrows, Home and End move
  within the composite; `e` typeahead reaches the disabled Export command.
  Enter on it does not close or activate. Escape restores Actions.
- Tab and Shift+Tab close and continue to the actual next/previous focusable
  element rather than trapping or dropping focus on the body. Selection and
  outside pointer interaction close; completed keyboard dismissal restores the
  trigger.
- At 390px, Arabic RTL content keeps the stage `358/358px` and menu
  `278/278px` client/scroll width. The longest item grows to `62px`; remaining
  rows stay `40px`; coarse-pointer CSS raises the minimum to the shared touch
  target.
- Light normal/danger contrast is `17.93:1`/`8.05:1`; dark is
  `17.18:1`/`10.03:1`. The intentionally unavailable command is `2.91:1` light
  and `5.08:1` dark, remains programmatically disabled and never activates.
  Focus is `17.93:1` light and `17.18:1` dark.
- Menu and item reduced-motion duration is `0s`; forced colors preserves the
  menu boundary, item focus, separator, disabled and destructive distinctions.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized RTL, dark, forced-colors, reduced-motion, focus and disabled-focus
  captures supplement two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native Button plus named ARIA menu composite; portable state and target focus/position service. | CSS/renderer behavior evidenced; native Popover may host the surface. |
| Shopify | Host action-list/menu where present, otherwise Liquid collection plus bounded controller. | Shared CSS ships; dedicated Liquid/runtime remains planned. |
| React / Angular | Controlled/uncontrolled open, item collection, select/change events, roving focus/typeahead and target positioning. | Strategy documented; adapter not certified. |
| Figma | Trigger/menu/group/label/item/separator anatomy and open/highlighted/disabled/danger states. | Studio validates; no runtime/command ownership. |
| SwiftUI / Compose | Native Menu/DropdownMenu with disabled/destructive equivalents. | Conceptual mapping only. |

## Performance And Risks

- Dropdown Menu adds no neutral JS. Batch 17 Layout is the documented
  `5,845 B / 4.8 KiB` exception (`930 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `62,398 B / 64 KiB`.
- Human review must approve width, density, typography, icon/shortcut alignment,
  radius/shadow, hover/focus balance, destructive color and disabled opacity.
- Target owners still choose placement/collision/portal behavior, command
  execution and whether disabled items participate in composite focus.
- Checkable items, radio groups and submenus require an explicit future product
  decision and are not implied by mature external APIs.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, APG DOM/keyboard/focus/
dismissal, contrast/RTL/content/overflow/special-media probes, four-viewport
visual evidence, TypeScript, structural/parity/static-preview/refinement audits,
temporary docs build, deterministic performance, diff checks and `site/dist`
verification are included in Batch 17.
