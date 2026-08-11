# Context Menu Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Context Menu now consumes the canonical Dropdown Menu implementation and proves
pointer/keyboard invocation, real coordinates, 8px boundary clamping, grouped
commands, disabled and danger states, roving focus, typeahead, dismissal, and
focus restoration. Coordinates, collision/portal policy, long press, command
execution, checkable items, radio items, and submenus remain target or future
product scope.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Secondary immediate commands with a visible alternative; not navigation, Select, or arbitrary Popover content. |
| Anatomy and composition | pass | Invocation target, named menu, inherited group/label/item/icon/shortcut/separator parts. |
| Variants, sizes, states | pass | One bounded surface; inherited default/danger items and open/highlight/focus/disabled states. |
| Public API and ownership | pass | Only `open`; invocation geometry, collection data, execution, collision, and restoration remain target-owned. |
| Tokens and visual system | pass | Twenty-one existing public references; min/max geometry, inset, and scroll bounds stay private. |
| Accessibility and motion | pass | Shift+F10/Menu entry, roving focus, typeahead, disabled non-activation, Escape restoration, and `0s` reduced motion. |
| Responsive/content resilience | pass | Four viewports plus Arabic RTL, long labels, dark/forced colors, and exact edge clamping. |
| Runtime and assets | pass | `0 B` neutral runtime delta; bounded listeners exist only in the target-local shared renderer while open. |
| Cross-target translation | pass | Web menu lifecycle and Shopify/framework/Figma/native boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0103, contract/docs/Studio/registry, one renderer/fixture, before/after evidence, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 7 anatomy parts, 1 variant, 1 size, 5 states,
  6 behaviors, 1 property, and 21 public token references.
- The shared renderer exposes one trigger-named menu, two labelled command
  groups, one separator, three enabled commands, and one programmatically
  disabled command using the inherited Dropdown Menu parts.
- Shift+F10 focuses `Copy reference`. Arrow navigation can land on disabled
  `Export record`; Enter leaves the menu open and emits no action. Printable `r`
  typeahead reaches `Remove record`. Escape closes and restores
  `Artwork actions`.
- Pointer coordinates at the owning anchor's lower edge produce exactly `8px`
  right and bottom insets. Outside interaction, selection, scroll, and resize
  use the same bounded dismissal/restoration lifecycle.
- Light normal/label/danger contrast is `17.93:1`/`7.81:1`/`8.05:1`; dark is
  `17.18:1`/`12.09:1`/`10.03:1`. The unavailable command is intentionally
  `2.91:1` light and `5.08:1` dark, is announced disabled, and never activates.
  Highlighted command text is `16.44:1` light and `14.5:1` dark.
- The surface transition computes `0s` under reduced motion. Forced colors
  preserves the surface boundary, focused command, separator, disabled state,
  and destructive distinction.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized RTL, keyboard focus, reduced motion, dark, forced colors, and
  clamped-placement captures supplement two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Context invoker + named ARIA menu using canonical Dropdown Menu focus/command behavior. | CSS and target-local lifecycle evidenced; production collision/top-layer service remains target-owned. |
| Shopify | Host action menu where available or Liquid command collection plus bounded controller and visible fallback. | Shared CSS ships; dedicated Liquid/runtime remains planned. |
| React / Angular | Controlled/uncontrolled open, invocation point, command collection/events, roving focus/typeahead, and positioning provider. | Strategy documented; adapter not certified. |
| Figma | Open/closed surface with inherited groups/items/separator and disabled/danger states. | Studio validates; no runtime ownership. |
| SwiftUI / Compose | Native contextual-menu mapping with disabled/destructive equivalents and an alternative action path. | Conceptual mapping only. |

## Performance And Risks

- Context Menu adds no neutral JavaScript. Batch 18 Layout is the documented
  `6,357 B / 4.8 KiB` exception (`1,442 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `62,893 B / 64 KiB`.
- Human review must approve width, density, radius/shadow, focus/hover balance,
  danger color, disabled opacity, and whether the repository render is the visual
  reference.
- Production targets still choose long-press policy, collision/portal hosting,
  command execution, disabled-item focus policy, and visible fallback actions.
- Checkable/radio items, submenus, navigation, and very large command sets remain
  outside v1 rather than being inferred from Radix or platform APIs.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, APG DOM/keyboard/focus/
dismissal, contrast/RTL/content/special-media probes, four-viewport visual
evidence, TypeScript, structural/parity/static-preview/refinement audits,
temporary docs build, deterministic performance, diff checks, and `site/dist`
verification are included in Batch 18.
