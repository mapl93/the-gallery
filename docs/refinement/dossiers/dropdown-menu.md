# Component Dossier: Dropdown Menu

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/dropdown-menu.contract.json`

## Recommendation

Keep Dropdown Menu scoped to a Button-triggered vertical list of immediate
commands. Complete the APG Menu Button contract in the shared target renderer:
focus moves into the menu on open, items use roving `tabindex`, arrows/Home/End
move focus, optional typeahead finds labels, Escape returns focus, Tab exits and
closes, outside interaction dismisses, disabled items never activate, and
selection closes the menu.

Add an explicit group part so labels and separators have valid menu structure,
and style both native and ARIA disabled mappings. Do not expand v1 to checkable
items, radio groups, submenus or navigation menus: mature systems support them,
but doing so would be a new product/API decision rather than refinement of the
accepted action-menu scope.

## Purpose And Limits

- Presents a compact set of related actions or functions from a clearly labelled
  Button trigger.
- Commands execute immediately or open a separately named flow; destructive
  items are explicit and visually distinguished.
- Not primary site navigation, a Select value picker, a Combobox result list or
  arbitrary Popover content.
- v1 supports immediate action items, optional leading icons, shortcut hints,
  labels, groups, separators, disabled state and one danger visual variant.
- Checkable items, radio choices, nested submenus and persistent toolbars remain
  outside the accepted v1 scope.

## Gallery Baseline Before This Batch

- Registry `B11`, Layout, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS exposes root, menu, item, icon, shortcut, separator, label,
  open/highlighted/hover/danger/disabled states and two item variants.
- CSS uses physical positioning/margins/text alignment, calculated type sizes,
  compact targets below the shared Button minimum, and no focus-visible,
  forced-colors or reduced-motion treatment.
- Disabled styling covers only native `:disabled`, while the contract also names
  `aria-disabled`. There is no group selector or semantic role mapping for labels
  and separators.
- `FloatingMenuStudio` supplies arrow navigation but all Button items remain in
  the Tab order, click opening leaves focus on the trigger, Escape does not
  restore focus, outside/Tab dismissal and typeahead are absent, and the label is
  a plain `div` directly under `role="menu"`.
- The Studio design reference is shared rather than component-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) | Native Button with `aria-haspopup="menu"` and synchronized `aria-expanded`; Enter/Space open and focus the first item, optional ArrowDown/ArrowUp open first/last. | The shared renderer must prove focus entry and trigger relationships, not only visibility. |
| [WAI-ARIA APG Menu and Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) | Menu is a composite: Tab does not move among items, arrows/Home/End navigate, printable typeahead is optional, Escape closes and returns focus, and activation usually closes. | Use roving focus and target-owned command coordination; avoid a list of independently tabbable buttons. |
| [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) | `menuitem` requires ownership by menu/menubar or group; `separator` distinguishes groups; `aria-disabled` expresses unavailable commands. | Add group anatomy, explicit separator role and consistent disabled mapping. |
| [Radix Dropdown Menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu) | Supports Root/Trigger/Portal/Content, labels/groups/items/separators, roving focus, typeahead, RTL, disabled/checkable/radio items, submenus and collision data. | Adopt the stable action-menu semantics; defer checkable/submenu/portal/collision breadth beyond accepted v1. |
| [Shopify Polaris Popover](https://polaris-react.shopify.com/components/overlays/popover) | Combines Popover with Action List, clearly labelled activation, first-node focus, Escape/outside/Tab dismissal and focus return. | Shopify mapping should use the host action-list/menu capability when present, not copy React structure into Liquid. |

## Matches, Differences, And Direction

- Gallery anatomy already matches the core of APG/Radix and correctly separates
  danger styling as an item-level decision.
- It differs in runtime correctness: the evidence renderer is not a valid menu
  composite despite declaring `role="menu"` and `role="menuitem"`.
- It also lacks structural groups, robust disabled styling and special-media
  states.
- Direction: complete the accepted action-menu contract and target evidence,
  without widening the public API to every Radix feature.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | neutral wrapper | Dropdown Menu | Anchors trigger and menu in simple targets. |
| Trigger | yes | native `button` | Consumer/target | Accessible name, `aria-haspopup="menu"`, expanded and controls relationship. |
| Menu | yes | `role="menu"` | Dropdown Menu | Named by trigger or explicit target label. |
| Group | no | `role="group"` | Dropdown Menu | Owns related menuitems and may be labelled. |
| Label | no | non-focusable text | Consumer | Labels a group through `aria-labelledby`; never enters roving focus. |
| Item | yes | focusable `role="menuitem"` | Consumer/target | Immediate command with accessible text. |
| Item icon | no | decorative | Consumer | `aria-hidden`; label remains textual. |
| Shortcut | no | presentational hint | Consumer | `aria-keyshortcuts` only when the shortcut actually works. |
| Separator | no | `role="separator"` | Dropdown Menu | Static, horizontal, never focusable. |

No canonical dependency is added: the trigger can use canonical Button markup,
but Dropdown Menu does not require one Button visual variant. Context Menu later
depends on and reuses these item/group parts.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | Item `default` and `danger`; root has no visual variants. |
| Size | One compact desktop density; coarse-pointer target grows to at least the shared minimum touch size. |
| Closed | Menu hidden and absent from pointer/accessibility interaction. |
| Open | Menu visible, trigger expanded, one enabled item owns roving focus. |
| Highlighted/hover | Same semantic surface family; pointer movement updates the active item without stealing focus. |
| Focus visible | System-perceivable ring independent of hover background. |
| Disabled | `aria-disabled="true"`, native `disabled` or adapter data state; cannot activate. |
| Danger | Error-family text with sufficient contrast; hover/focus preserve destructive meaning. |
| RTL | Logical positioning, padding, alignment and shortcut placement. |
| Narrow/localized | Labels/shortcuts wrap or truncate by documented policy without page overflow. |
| Reduced motion | Visibility transform/opacity transition removed. |
| Forced colors | Menu boundary, focus, separator, disabled and danger remain distinguishable with system colors. |

## Public API And State Ownership

- `open`: optional controlled state; targets may also own `defaultOpen` and emit
  `openChange` while preserving the same meaning.
- `itemVariant`: per-command `default | danger` visual mapping accepted by ADR
  0072.
- Items, labels, icons, shortcuts and group content remain collection/slot data,
  not additional scalar properties in the neutral contract.
- Targets expose command selection and dismissal events. Disabled commands emit
  no selection.
- Placement, alignment, portal, collision, modal mode and typeahead timing are
  target services. Checkable/radio/submenu APIs require a later accepted scope.

## Token And Value Audit

- Existing tokens cover surface, hover surface, subtle border, primary/disabled/
  error text, medium/small radius, large shadow, dropdown z-index, fast motion,
  default easing and body size.
- Canonical CSS already consumes secondary text without declaring it in registry
  or contract. Add the existing token plus body/caption line-height/type tokens
  only where actually used; do not create component tokens.
- Hardcoded `180px`, `4px`, `8px 12px`, `8px`, `16px`, `0.75`, `6px` and
  `0.05em` must become semantic token use where available or private documented
  geometry. Shortcut/icon/group spacing stays private.

## Accessibility And Interaction

- Native Button trigger with complete name, `aria-haspopup="menu"`, synchronized
  expanded state and stable menu relationship.
- Opening by click/Enter/Space focuses first enabled command; ArrowDown may do the
  same and ArrowUp may focus the last.
- One menuitem is tabbable at a time. ArrowUp/Down wrap; Home/End jump; optional
  printable typeahead matches item text; Escape closes and returns trigger focus.
- Tab/Shift+Tab close the menu and continue document order rather than trapping.
- Outside interaction and completed selection close. Disabled items may receive
  composite focus according to target policy but cannot activate.
- Group labels name their groups; separators use `role="separator"`; shortcut
  hints are not announced as real shortcuts unless wired through
  `aria-keyshortcuts`.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus keyboard sequence, disabled,
  danger, long localized/RTL, dark, forced colors and reduced motion.
- Target collision service clamps available height/width only while open; closed
  menus perform no background work.
- Batch 17 starts at Layout `5,257 B`, Web components `61,781 B` and shared
  runtime `10,321 B` deterministic gzip. Layout is already `342 B` over the
  provisional family ceiling.
- Neutral runtime delta target is `0 B`; target-local Studio behavior validates
  semantics without adding a framework or global listener to canonical source.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Button + named `role="menu"` composite, roving menuitems and target position/dismiss service. Native Popover API may host the surface. | CSS exists; interaction/structure refinement pending. |
| Shopify | Prefer host Popover/Action List where available; themes compose Liquid menu data and a bounded JS controller. | Planned; no dedicated Liquid primitive. |
| React / Angular | Controlled/uncontrolled open, collection items, select/open events, roving focus/typeahead and target positioning. | Planned. |
| Figma | Trigger/menu/group/item/label/separator anatomy and open/highlighted/disabled/danger states. | Planned. |
| SwiftUI / Compose | Platform Menu/DropdownMenu mapping with equivalent disabled/destructive semantics. | Planned. |

## Exhibit And Studio Parity

`FloatingMenuStudio` is the shared renderer. It must become a valid target
implementation with the same fixture in Exhibit and Studio: one labelled group,
normal/disabled/danger commands, roving focus, open/close lifecycle and no
site-only restyling of canonical menu parts.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Declared ARIA menu is not a valid roving-focus composite. | resolved | Shared target renderer completes the APG keyboard/focus lifecycle. | implementation |
| Group label is structurally unowned and separator lacks explicit semantics. | resolved | Group anatomy and ARIA mappings are canonical and evidenced. | implementation |
| Disabled contract/CSS mappings disagree. | resolved | Native, ARIA and data states share styling and cannot activate. | implementation |
| Missing focus/special-media/RTL containment. | resolved | Canonical logical geometry and system-state styling are evidenced. | implementation |
| Checkable/submenu breadth lacks accepted scope. | non-blocking | Keep v1 immediate commands only. | owner/product later |

## Evidence And Validation

- Contemporary before evidence contains Exhibit and Studio desktop captures
  under `output/playwright/refinement-batch-17/before/`.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized RTL, dark, forced-colors, reduced-motion, keyboard focus and disabled-
  focus evidence is under `output/playwright/refinement-batch-17/after/`.
- At 390px, the Arabic RTL stage remains `358/358px` and the menu `278/278px`
  client/scroll width. Long content grows the first item to `62px` while the
  remaining items retain `40px`; no root or surface inline overflow occurs.
- Light normal/danger contrast is `17.93:1`/`8.05:1`; dark is
  `17.18:1`/`10.03:1`. The intentionally unavailable command is `2.91:1` light
  and `5.08:1` dark, remains structurally disabled, and never activates. Focus
  uses the primary focus token at `17.93:1` light and `17.18:1` dark.
- Live probes confirm one named menu, two labelled/explicit groups, one
  separator, four commands, one roving tab stop, Arrow/Home/End navigation,
  printable typeahead, disabled focus without activation, Escape restoration,
  non-trapping Tab/Shift+Tab, outside dismissal and selection closure.
- Menu and item transitions compute `0s` under reduced motion; forced colors
  preserves menu, item, separator, focus, disabled and destructive distinctions.
- Contracts, docs/Studio, copied/generated adapters, TypeScript, structural/
  parity/static/refinement audits, temporary build, deterministic performance,
  diff checks and `site/dist` cleanliness are included in Batch 17.

## Risks And Open Questions

1. Exact menu density, width, shadow and danger color balance lack a
   component-specific owner visual and need human approval.
2. Whether disabled menuitems participate in focus varies across platform
   conventions; all targets must at least expose disabled state and prevent
   activation.
3. Native Popover hosting, portal strategy and collision behavior are target
   choices, not neutral DOM guarantees.

## Readiness Decision

Dropdown Menu is prepared for explicit human stability review and remains
`pilot`. Density, width, shadow, danger balance, disabled treatment, positioning
service and any checkable/radio/submenu breadth still need human or product
approval.
