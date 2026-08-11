# Component Dossier: Command Palette

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/command-palette.contract.json`

## Recommendation

Keep Command Palette as a target-composed Modal containing an editable Combobox
with a named Listbox of commands. Reuse canonical Modal overlay/panel and Close
Button anatomy instead of maintaining duplicate dialog chrome. On open, focus the
search input; keep DOM focus there while `aria-activedescendant` tracks one
highlighted option; exclude options from the page Tab sequence; preserve native
text editing and IME composition; activate with Enter/pointer; trap Tab only
within modal controls; and close/restore on Escape, visible close, backdrop policy
or command execution.

Retain only `open` and `query` as scalar semantic properties. Command inventory,
grouping, filtering/ranking, highlight, execution, global shortcut scope,
announcements and async results are target/application data and behavior. Do not
make a public property for every search algorithm, shortcut or modal geometry.

## Purpose And Limits

- Lets users quickly find and run application commands or navigate to known
  destinations without remembering their location.
- Optimized for keyboard use while remaining fully operable by pointer/touch.
- A modal command surface, not a general site search page, persistent Combobox,
  navigation menu, arbitrary form dialog or source of hidden-only functionality.
- v1 supports one query, labelled command groups, icons, shortcut hints,
  highlighted/disabled items, an empty result and optional footer help.
- Ranking algorithms, recent history, nested pages, async providers and global
  command registration remain application/adapter concerns.

## Gallery Baseline Before This Batch

- Registry `B13`, Layout, depends on refined Modal; contract `0.2.0`, `pilot`.
- Canonical CSS duplicates overlay and panel presentation already owned by Modal,
  uses viewport-relative hardcoded geometry, and lacks a close part, input focus
  wrapper, disabled state, forced colors and component-specific reduced motion.
- `OverlaySearchMediaStudio` opens by default and filters three commands, but has
  no trigger reference, initial input focus, restoration, global Command/Control+K,
  Tab containment, backdrop dismissal or visible close action.
- The input declares Combobox relationships but lacks a complete accessible name,
  `aria-autocomplete`, IME-safe filtering and a labelled result group.
- Result Buttons with `role="option"` remain in the page Tab sequence and the site
  stylesheet duplicates canonical item presentation.
- The Studio design reference is shared rather than component-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Outside content is inert; focus enters, Tab/Shift+Tab remain inside, Escape closes, the dialog is named, focus returns logically, and a visible close action is strongly recommended. | Consume canonical Modal lifecycle and Close Button rather than treating the overlay as visual-only. |
| [WAI-ARIA APG Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) | Editable Combobox keeps DOM focus in the input while `aria-activedescendant` references a Listbox option; popup descendants are excluded from page Tab order and native text editing is preserved. | Result options use active-descendant navigation, not independently tabbable Buttons. |
| [WAI-ARIA APG Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) | A Listbox owns options, may contain named groups, and must not embed interactive descendants inside an option. | Model each command result as one option/action surface with no nested controls. |
| [Open UI Combobox explainer](https://open-ui.org/components/combobox.explainer/) | The active proposal is still resolving editable input, popup, selection and accessibility composition. | Use standards-based current ARIA composition; do not freeze draft native syntax into the neutral contract. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Separates Root, Trigger, Portal, Overlay, Content, Title, Description and Close with controlled/uncontrolled state and focus/dismiss callbacks. | Command Palette should compose the accepted Modal dependency and leave portal/lifecycle mechanics to targets. |
| [cmdk](https://github.com/dip/cmdk) | A mature command-menu implementation composes Radix Dialog, exposes root/input/list/group/item/empty/loading parts, controlled selection and optional filtering/loop behavior; keybind scope is consumer-owned. | Gallery anatomy is broadly aligned; keep filtering, ranking and global shortcuts outside neutral scalar API. |
| [GitHub Command Palette](https://docs.github.com/en/get-started/accessibility/github-command-palette) | A production command palette opens globally, supports search/navigation/command execution and is optimized around keyboard access. | A discoverable shortcut is valuable evidence, but exact keys and command inventory remain target policy. |

## Matches, Differences, And Direction

- Gallery already identifies the correct Modal dependency and Combobox/Listbox
  relationships.
- It differs by duplicating Modal visual implementation and failing the actual
  modal and active-descendant focus lifecycle.
- Query is already the correct public semantic value; inventory, ranking and
  execution are absent from the neutral API as they should be.
- Direction: canonical composition and target behavior refinement, without
  inventing a cross-target global command registry.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Overlay | yes | modal backdrop | Modal | Blocks outside interaction while open. |
| Dialog panel | yes | named `role="dialog"`, `aria-modal="true"` | Modal | Command Palette adds search/results inside canonical panel. |
| Title | yes | visible or visually hidden heading | Consumer | Provides the accessible dialog name. |
| Input wrapper | yes | neutral row | Command Palette | Owns optional search icon, input and canonical close control. |
| Search icon | no | decorative | Consumer | Never replaces the input name. |
| Input | yes | editable `role="combobox"` | Command Palette/target | Controls and highlights Listbox options. |
| Close | yes | canonical Close Button | Modal/Close Button | Visible, named dismiss path; no new scalar property. |
| Results | yes | named `role="listbox"` | Command Palette | Scrollable; excluded from page Tab sequence. |
| Group | no | named `role="group"` | Consumer | Owns related options and a label. |
| Group label | no | non-interactive text | Consumer | Names a result group. |
| Item | yes | `role="option"`, `tabindex="-1"` | Consumer/target | One command action, no nested interactive descendants. |
| Icon/label/shortcut | optional | presentational content | Consumer | Label supplies option name; hint is real only if wired. |
| Status/empty | no | polite status + visible text | Target/consumer | Announces meaningful result/empty changes without stealing focus. |
| Footer | no | passive help | Consumer | Describes real controls only. |

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One modal command surface. |
| Size | One bounded responsive panel; geometry remains private. |
| Closed | Overlay hidden/inert, trigger or logical prior focus available. |
| Open | Modal active, input focused, background inert in the target. |
| Query empty/non-empty | Full or filtered inventory; query remains controlled/uncontrolled per adapter. |
| Results | Available, highlighted, disabled, empty and optionally loading target state. |
| Highlight | Exactly one visible enabled option referenced by `aria-activedescendant`; none when empty. |
| Keyboard | Command/Control+K target shortcut, arrows, Home/End, Enter, Escape, Tab containment. |
| IME | Composition text updates visibly while filtering/activation waits for committed input. |
| RTL/localized | Logical icon/shortcut layout, wrapping labels, bounded scroll and no viewport overflow. |
| Reduced motion | Modal/panel transitions removed. |
| Forced colors | Overlay/panel boundary, input focus, option highlight, disabled and close focus persist. |

## Public API And State Ownership

- `open`: optional controlled state; adapters may expose `defaultOpen` and
  `openChange` requests.
- `query`: current editable search string; adapters may expose controlled or
  uncontrolled input updates while preserving composition events.
- Command inventory, value IDs, keywords, groups, disabled state, icons,
  shortcuts and callbacks are collection data/slots, not root scalar properties.
- Filtering, ranking, looping, async loading, recent history, result announcement
  cadence, shortcut scope, routing and execution remain target/application logic.
- Modal portal, scroll lock, inerting, initial-focus mechanics and restoration are
  inherited target services rather than neutral properties.

## Token And Value Audit

- The component should consume canonical Modal surface, border, radius, shadow,
  overlay, z-index and transition tokens rather than redeclare panel chrome.
- Command-specific tokens are existing primary/secondary/disabled text, secondary
  surface, subtle border, focus color, body/caption typography, spacing, small
  radius, transition and easing tokens actually referenced by CSS.
- Current `20vh`, `560px`, `320px`, `8/10/12/16px` and calculated type sizes are
  private composition. Replace with semantic tokens/private bounds where
  available; do not expose them as public customization API.

## Accessibility And Interaction

- Opening focuses the named search input. The modal traps Tab/Shift+Tab among the
  input and visible close control and restores the invoker/logical prior focus.
- Input exposes `role="combobox"`, `aria-autocomplete="list"`, expanded state,
  controls relationship and active descendant. The Listbox and groups are named.
- Options use `tabindex="-1"`; input keeps DOM focus. ArrowUp/Down and Home/End
  change highlight, Enter executes, pointer hover/click synchronizes highlight
  and action, and disabled commands never execute.
- Preserve standard text-editing keys and do not filter/activate against partial
  IME composition. Escape closes; backdrop dismissal follows the accepted docs
  target policy; visible Close always works.
- A pre-existing polite status may announce important empty/result changes. Avoid
  excessive per-keystroke speech; exact debounce and result-count copy are target
  decisions.
- Shortcut hints receive `aria-keyshortcuts` only when real. A global shortcut
  must not intercept editable contexts or browser/platform-reserved behavior
  indiscriminately.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus open/closed, keyboard highlight,
  empty, disabled, long localized RTL, dark, forced colors and reduced motion.
- Results scroll inside the bounded panel; the page and preview container do not
  overflow. Long names wrap/truncate by documented policy without losing the
  accessible name.
- Filtering is linear for the small fixture; production targets define inventory
  budgets, async/virtualization thresholds and ranking. No work runs while closed
  beyond the scoped shortcut listener required by the owning target.
- Batch 18 begins at Layout `5,845 B`, Web component CSS `62,398 B` and shared
  runtime `10,321 B` deterministic gzip. Neutral runtime delta target is `0 B`.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Canonical Modal + editable Combobox/Listbox active-descendant controller; target shortcut, filter and command executor. | CSS and target-local lifecycle evidenced; production portal/inert/shortcut/command services remain target-owned. |
| Shopify | Prefer host Modal/search/list primitives in admin surfaces; themes compose Liquid data with scoped JS when appropriate. | Planned; no global theme command registry. |
| React / Angular | Controlled/uncontrolled open/query, command collection, highlight, filter, select/open events and target Dialog service. | Planned. |
| Figma | Modal panel plus query, groups, item/empty/highlight/disabled states and responsive widths. | Planned. |
| SwiftUI / Compose | Native searchable modal/command surface where available, preserving focus, dismissal and action semantics. | Planned. |

## Exhibit And Studio Parity

`OverlaySearchMediaStudio` is the single renderer and fixture. Exhibit and Studio
now share canonical Modal composition, query/filter state, grouped commands,
highlight/empty/disabled behavior, visible close and target-local keyboard
lifecycle. Site CSS contains preview containment only, not duplicate item or
panel presentation.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Command Palette duplicates Modal overlay/panel chrome. | resolved | Composes canonical `.modal-overlay`, `.modal`, and inherited Close Button classes. | implementation |
| Current dialog has no real focus entry, trap, dismissal or restoration. | resolved | The shared target renderer provides the accepted Modal lifecycle. | implementation |
| Result Buttons are independently tabbable despite active-descendant Combobox. | resolved | Results are non-nested `role=option` surfaces with `tabindex=-1`. | implementation |
| Input/group naming and IME filtering are incomplete. | resolved | Explicit relationships, labelled groups and composition-safe state are present and evidenced. | implementation |
| Site CSS duplicates canonical item styling. | resolved | Presentation is canonical; site CSS retains containment only. | implementation |
| Global command registry/ranking/shortcut policy is unaccepted. | non-blocking | Keep target/application-owned. | owner/architecture later |

## Evidence And Validation

- Fifteen after images include eight canonical Exhibit/Studio × four-viewport
  captures plus RTL/long, dark, forced-colors, reduced-motion, close-focus,
  empty, and 20-result overflow cases; two live desktop before images remain.
- Opening focuses the input; End highlights the last enabled command; Enter
  closes/restores; Control+K reopens; Tab/Shift+Tab cycle input and Close;
  disabled selection stays open; backdrop closes/restores.
- IME composition retains four results until commit, then produces zero options,
  no stale active descendant, and one `No commands found.` status. Twenty options
  measure `320/1,046px` client/scroll height with internal overflow.
- Input/label/selected contrast is `17.93:1`/`7.81:1`/`16.44:1` light and
  `17.18:1`/`12.09:1`/`14.5:1` dark. Focus is a `3px` primary outline;
  overlay/panel reduced-motion durations are `0s`; browser errors/warnings are 0.
- Contract `0.3.0`, registry, Studio metadata, MDX, canonical/copied CSS, Neutral
  Web, Shopify, TypeScript, program audits and temporary docs build pass in
  Batch 18. Deterministic gzip ends at Layout `6,357 B`, Web components
  `62,893 B`, runtime `10,321 B` with a `0 B` runtime delta.

## Risks And Open Questions

1. Exact panel position, width, radius, shadow, overlay, input chrome, result
   density and highlight balance lack a component-specific owner reference and
   require human visual approval.
2. Production global shortcut coordination and mutual exclusion with other
   overlays remain part of the open target overlay-service architecture.
3. Large inventories need target-specific ranking, async and virtualization
   budgets; v1 neutral source must not pretend one algorithm fits all targets.
4. Whether command-result semantics should expose navigation destinations versus
   immediate actions depends on each inventory; no nested link/button is allowed
   inside an option.

## Readiness Decision

Implementation, cross-target documentation, browser evidence and automated
validation are complete for explicit human review. Visual approval, production
overlay/command-service certification and any `stable` promotion remain pending.
The contract stays `pilot`.
