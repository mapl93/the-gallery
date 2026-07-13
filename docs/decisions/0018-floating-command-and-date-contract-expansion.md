# 0018. Floating Command And Date Contract Expansion

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

After the first docs-visible interactive contracts, the next requested expansion was:

1. Tooltip.
2. Dropdown Menu.
3. Command Palette.
4. Date Picker.
5. Context Menu.

This order extends the contract layer into generated helper text, command menus, context-triggered menus, modal command search, and calendar-based form controls.

## Decision

Add five more validated component contracts:

```text
components/contracts/tooltip.contract.json
components/contracts/dropdown-menu.contract.json
components/contracts/context-menu.contract.json
components/contracts/command-palette.contract.json
components/contracts/date-picker.contract.json
```

Also align the matching registry token metadata and MDX API references so docs reflect the actual CSS adapter selectors.

## Contract Notes

Tooltip captures:

- Generated bubble and arrow anatomy through `::before` and `::after`.
- `aria-label` as the current web adapter content source.
- Hover and focus-visible visibility behavior.
- A non-interactive content requirement.

Dropdown Menu captures:

- Root, menu, item, icon, shortcut, separator, and label anatomy.
- Open, highlighted, hover, disabled, and danger item states.
- Trigger relationship, menu semantics, keyboard navigation, and dismissal behavior.

Context Menu captures:

- Fixed-position context menu surface.
- Inherited Dropdown Menu item anatomy.
- Pointer and keyboard context invocation.
- Viewport-aware positioning and dismissal behavior.

Command Palette captures:

- Modal-like overlay, panel, search input, grouped results, command items, shortcut hints, empty state, and footer anatomy.
- Open and highlighted item states.
- Command shortcut, filtering, active result, and dialog-like accessibility requirements.

Date Picker captures:

- Calendar surface, header, month/year label, navigation controls, weekday row, grid, and day anatomy.
- Today, selected, outside-month, hover, and disabled day states.
- Input relationship, calendar grid semantics, month navigation, and day keyboard behavior.

## Consequences

- The contract layer now validates nineteen components.
- More high-behavior components have explicit target-agnostic interaction requirements before React, Shopify, Figma, SwiftUI, or Compose adapters are built.
- The docs now correct older API references such as `.date-picker` and `.dropdown-menu` to the actual CSS adapter selectors: `.datepicker` and `.dropdown`.
- Dropdown Menu's `danger` registry variant is documented as item-level destructive styling through `.dropdown__item--danger`.

## Follow-Up Work

- Continue contract expansion into remaining layout interactions and advanced form controls.
- Decide whether contracts remain hand-authored validation metadata, become generation source, or become a hybrid.
- Add target-specific install/copy guidance from contract adapter metadata.
