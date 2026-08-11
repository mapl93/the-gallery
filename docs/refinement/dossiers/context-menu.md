# Component Dossier: Context Menu

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/context-menu.contract.json`

## Recommendation

Keep Context Menu as a context-triggered list of immediate commands that consumes
the canonical Dropdown Menu group, label, item, icon, shortcut and separator
parts. Complete the APG menu lifecycle in the shared target renderer: open at the
pointer invocation point or next to the keyboard invoker, clamp to the owning
viewport, move focus into the menu, use roving focus and optional typeahead,
prevent disabled activation, and close on selection, Escape, outside interaction,
scroll or resize while restoring focus appropriately.

Retain `open` as the only scalar semantic property. Invocation coordinates,
collision, portal/top-layer strategy and focus restoration are target services;
they cannot be made coherent by additional booleans or placement enums in the
neutral source. Keep v1 to immediate commands. Checkable/radio items, submenus,
long-press policy and navigation links would widen accepted product scope.

## Purpose And Limits

- Presents commands relevant to the object or region where a context action was
  invoked.
- Supports pointer `contextmenu`, Shift+F10 and the platform Menu key; a visible
  alternative must expose any critical action.
- Reuses Dropdown Menu command anatomy and behavior instead of defining a second
  menu-item language.
- Not a navigation menu, Select, Combobox, arbitrary Popover or sole access path
  to destructive/essential functionality.
- v1 supports labelled groups, immediate default/danger commands, optional icons
  and shortcut hints, separators and disabled state.

## Gallery Baseline Before This Batch

- Registry `B12`, Layout, depends on refined Dropdown Menu; contract `0.2.0`,
  `pilot`.
- Canonical CSS supplies a fixed hidden/open surface and inherits Dropdown Menu
  item styles, but has no pointer-event lock, bounded scroll geometry, reduced
  motion, forced-colors treatment or open transform.
- Surface width and padding are hardcoded; target coordinates and viewport
  clamping are not demonstrated.
- `FloatingMenuStudio` can toggle visibility from a Button, but has no context
  event coordinates, Menu-key entry, connected surface ref, focus entry,
  roving/typeahead behavior, restoration or Context Menu dismissal service.
- The fixture has three plain commands and does not prove groups, disabled,
  danger, separators or shortcut hints.
- The Studio design reference is shared rather than component-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Menu and Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) | A context-specific menu can be opened with Shift+F10; arrow/Home/End navigation, printable typeahead, Escape and activation behavior follow the menu composite model. | Consume the refined Dropdown Menu focus model instead of making each command an independent Tab stop. |
| [WAI-ARIA APG Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) | Context-menu shortcuts and pointer interaction must keep focus and visual active state synchronized. | Keyboard placement derives from the invoker and closing restores a logical focus owner. |
| [Open UI Menu Elements explainer](https://open-ui.org/components/menu.explainer/) | The active proposal models application commands as menuitems in labelled groups, expects one menu Tab stop, focus entry, arrows, Escape restoration and activation closure; native context-menu support is still proposal work. | Treat future native menu elements as progressive enhancement, not a current cross-target contract. |
| [Radix Context Menu](https://www.radix-ui.com/primitives/docs/components/context-menu) | Root/Trigger/Portal/Content/Group/Label/Item/Separator composition includes disabled state, roving focus, typeahead, collision handling and long-press support. | Adopt stable command/group/focus semantics; leave portal, collision, touch and broader item modes to targets. |
| [Radix releases](https://www.radix-ui.com/primitives/docs/overview/releases) | Controlled `open` is intended mainly for observing and closing because interaction coordinates are required to open correctly. | The neutral `open` property cannot replace target-owned invocation geometry. |
| [Shopify App Home](https://shopify.dev/docs/apps/build/app-home) | Polaris provides framework-agnostic menu/action compositions inside target surfaces rather than a portable context-menu DOM contract. | Shopify adapters should use host menu capabilities where present and retain visible alternatives for critical actions. |

## Matches, Differences, And Direction

- Gallery already has the right dependency: Context Menu inherits the canonical
  Dropdown Menu parts rather than duplicating their visual or semantic contract.
- It differs from the evidence in invocation, focus and dismissal correctness;
  current Studio visibility is not a functional context menu.
- The current surface does not prove boundary collision, long/localized content,
  disabled/danger commands or special-media states.
- Direction: finish target behavior and surface containment without widening the
  neutral API or adding a second menu item implementation.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Invocation region | yes | focusable target with normal primary action | Consumer/target | Receives pointer or keyboard context invocation; not a new visual part. |
| Surface | yes | named `role="menu"` | Context Menu | Positioned near the invocation point and bounded by the owning viewport. |
| Group | no | `role="group"` | Dropdown Menu | Owns related menuitems and optional label. |
| Label | no | non-focusable group text | Consumer | Labels the inherited group through `aria-labelledby`. |
| Item | yes | `role="menuitem"` | Dropdown Menu/consumer | Immediate command; one roving Tab stop. |
| Item icon | no | decorative | Consumer | Inherited; accessible command name remains textual. |
| Shortcut | no | presentational hint | Consumer | Announced as `aria-keyshortcuts` only when implemented. |
| Separator | no | `role="separator"` | Dropdown Menu | Inherited, static and unfocusable. |

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One surface; inherited item `default` and `danger`. |
| Size | One bounded compact density; coarse-pointer items inherit Dropdown Menu minimum target policy. |
| Closed | Hidden from pointer and accessibility interaction. |
| Open | Visible at an invocation coordinate, clamped within the owning viewport. |
| Highlighted/focus | Inherited roving menuitem state and visible focus. |
| Disabled | Focus policy may vary by target, but activation is always prevented and state exposed. |
| Pointer | Native `contextmenu` opens near pointer; the original browser menu is suppressed only when the custom replacement is usable. |
| Keyboard | Shift+F10/Menu opens near the focused invoker and focuses the first enabled item. |
| RTL | Logical item layout and shortcut order; physical viewport coordinates remain target geometry. |
| Narrow/localized | Surface width/height clamp, scrolling is internal, labels wrap without page overflow. |
| Reduced motion | Open/close transition removed. |
| Forced colors | Surface boundary, separator, focus, disabled and danger distinctions persist. |

## Public API And State Ownership

- `open`: optional controlled state. Targets may expose `defaultOpen` and an
  `openChange` request while preserving the same meaning.
- Command collection content, group labels, icons, shortcuts, disabled and item
  variants are inherited slots/data from Dropdown Menu, not new root scalars.
- Context coordinates, side/align, available size, portal/top layer, collision,
  scroll/resize tracking, typeahead timing and focus return are target services.
- Pointer and keyboard invocation must share one lifecycle, but keyboard opening
  uses invoker geometry instead of a synthetic arbitrary coordinate.

## Token And Value Audit

- Existing inherited tokens cover surface, hover, subtle border, primary,
  secondary, disabled and error text, radius, shadow, modal z-layer, motion,
  easing and semantic body/caption typography.
- Context Menu should declare the exact inherited Dropdown Menu tokens it
  consumes. No component-scoped public token is justified.
- Current `180px` and `4px` are private surface geometry. Replace with existing
  spacing tokens/private derivations where possible, document the remaining
  minimum width, and add safe viewport bounds without exposing them as API.

## Accessibility And Interaction

- Keep the invocation region focusable and operable by its normal primary action.
  Critical commands remain available elsewhere.
- Pointer context invocation records the pointer coordinate; Shift+F10/Menu uses
  the focused invoker rectangle. Both open a named menu and focus the first
  enabled command.
- ArrowUp/Down wrap, Home/End jump, optional printable typeahead matches visible
  command text, Enter/Space activates, and disabled commands never activate.
- Escape closes and restores focus. Selection closes and restores logical focus;
  outside interaction, scroll and resize close without leaving hidden focus.
- Tab/Shift+Tab close and continue document order; Context Menu is not a focus
  trap. Pointer movement may update the highlighted item consistently.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus pointer and keyboard entry,
  viewport-edge clamping, disabled/danger, long localized RTL, dark, forced
  colors and reduced motion.
- Closed state installs no continuous geometry loop. Open state may attach bounded
  target listeners and must release them on close/unmount.
- Batch 18 begins at Layout `5,845 B`, Web component CSS `62,398 B` and shared
  runtime `10,321 B` deterministic gzip. Layout is `930 B` over the provisional
  `4.8 KiB` family ceiling.
- Neutral runtime delta target is `0 B`; target-local Studio behavior proves the
  lifecycle without adding a global framework-dependent service.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `contextmenu`/Shift+F10/Menu invoker + named `role="menu"`, inherited roving menuitems and target collision/dismiss service. | CSS and target-local lifecycle evidenced; production collision/top-layer service remains target-owned. |
| Shopify | Prefer host action-menu capability where available; themes use bounded JS and visible fallback actions. | Planned; no dedicated Liquid primitive. |
| React / Angular | Controlled/uncontrolled open, invocation point, collection, select/open events, roving focus/typeahead and positioning provider. | Planned. |
| Figma | Open/closed surface plus inherited group/item/label/separator and item states. | Planned. |
| SwiftUI / Compose | Native contextual menu mapping, preserving disabled/destructive semantics and alternative access. | Planned. |

## Exhibit And Studio Parity

`FloatingMenuStudio` is the single renderer and fixture for both views. It now
demonstrates pointer and keyboard invocation, labelled groups, default, disabled
and danger commands, shortcut hints, viewport clamping and dismissal without
site-only restyling of canonical menu parts.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Current renderer only toggles visibility and cannot operate as a menu composite. | resolved | Reuses the refined Dropdown Menu focus/typeahead lifecycle with a connected surface ref. | implementation |
| Pointer and keyboard invocation lack real geometry and clamping. | resolved | Target renderer records pointer or invoker coordinates and clamps to an 8px inset while open. | implementation |
| Dismissal/restoration listeners omit Context Menu. | resolved | Selection, Escape, outside, scroll and resize cleanup share one bounded lifecycle. | implementation |
| Surface lacks bounded/special-media treatment. | resolved | Canonical containment, reduced-motion and forced-colors styles are present and evidenced. | implementation |
| Checkable/radio/submenu/long-press breadth is unaccepted. | non-blocking | Keep immediate commands only in v1. | owner/product later |

## Evidence And Validation

- Fourteen after images include eight canonical Exhibit/Studio × four-viewport
  captures plus RTL/long, keyboard-focus, reduced-motion, dark, forced-colors,
  and edge-clamping cases; two live desktop before images are retained.
- Shift+F10 focuses `Copy reference`; two ArrowDown presses reach disabled
  `Export record`; Enter does not activate or close; `r` typeahead reaches
  `Remove record`; Escape restores `Artwork actions`.
- A pointer invocation at the owning anchor edge clamps to exact `8px` right and
  bottom insets. Reduced-motion duration is `0s`; browser errors/warnings are 0.
- Normal/label/danger contrast is `17.93:1`/`7.81:1`/`8.05:1` light and
  `17.18:1`/`12.09:1`/`10.03:1` dark. Disabled text is intentionally
  `2.91:1` light and `5.08:1` dark while remaining unavailable and inert.
- Contract `0.3.0`, registry, Studio metadata, MDX, canonical/copied CSS, Neutral
  Web, Shopify, TypeScript, program audits and temporary docs build pass in
  Batch 18. Deterministic gzip ends at Layout `6,357 B`, Web components
  `62,893 B`, runtime `10,321 B` with a `0 B` runtime delta.

## Risks And Open Questions

1. Exact surface width, density, radius, shadow and danger balance lack a
   component-specific owner visual and require human approval.
2. Long-press replacement on touch can conflict with native selection and browser
   behavior; it remains target policy, not a neutral requirement.
3. Native future menu elements and CSS anchor positioning are emerging evidence,
   not an interoperable cross-target baseline.

## Readiness Decision

Implementation, cross-target documentation, browser evidence and automated
validation are complete for explicit human review. Visual approval, production
target-service certification and any `stable` promotion remain pending. The
contract stays `pilot`.
