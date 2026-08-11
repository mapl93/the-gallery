# Command Palette Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-14

## Outcome

Command Palette now composes the canonical Modal overlay/panel and inherited
Close Button with a named editable Combobox, grouped Listbox options, active-
descendant navigation, disabled/empty states, IME-safe filtering, modal Tab
containment, scoped shortcut entry, dismissal, and focus restoration. Command
inventory, ranking, async providers, global shortcut coordination, routing, and
execution remain target/application concerns.

No visual approval, production overlay service, or `stable` promotion is
implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Fast command/navigation discovery; not general site search, a persistent Combobox, or arbitrary form dialog. |
| Anatomy and composition | pass | Canonical Modal overlay/panel/title/close plus query, status, named Listbox/group, options, empty state, and footer. |
| Variants, sizes, states | pass | One bounded modal; open/query/highlight/focus/disabled/empty/composition states. |
| Public API and ownership | pass | Only `open` and `query`; inventory, ranking, shortcut scope, announcements, routing, and execution stay target-owned. |
| Tokens and visual system | pass | Twenty-three existing public references; viewport bounds, panel size, result height, and private gaps stay internal. |
| Accessibility and motion | pass | Named modal, visible close, focus entry/trap/restore, active descendant, IME preservation, disabled non-activation, and `0s` reduced motion. |
| Responsive/content resilience | pass | Four viewports, Arabic RTL, empty results, 20-result internal scrolling, dark, forced colors, and focus evidence. |
| Runtime and assets | pass | `0 B` neutral runtime delta; linear four-item fixture and scoped target listener only. |
| Cross-target translation | pass | Modal + Combobox/Listbox mapping and target command-service boundaries documented. |
| Documentation and verification | pass | Dossier, ADR 0103, contract/docs/Studio/registry, one renderer/fixture, before/after evidence, and this report. |

## Contract And Browser Evidence

- Contract `0.3.0`: 17 anatomy parts, 1 variant, 1 size, 7 states,
  8 behaviors, 2 properties, and 23 public token references.
- Opening focuses `Search commands`. End highlights the last enabled option,
  `Studio settings`, while DOM focus stays in the input; Enter executes the
  fixture action, closes, and restores `Open command palette`.
- Control+K reopens and focuses the query. Tab moves input → Close and the next
  Tab loops to input; Shift+Tab returns to Close. Escape, visible Close, backdrop
  policy, and command execution all restore the logical invoker.
- Dispatching the disabled `Export catalogue` option leaves the dialog open.
  During IME composition, query text changes while all four options remain;
  composition commit filters to zero and the stable polite status reports
  `No commands found.` with no stale active descendant.
- A 20-option extreme fixture keeps the result viewport `320px` tall while its
  content reaches `1,046px`; `overflow-y: auto` keeps footer and page geometry
  bounded. Arabic RTL and long labels remain inside a 390px preview.
- Light input/label/selected text contrast is `17.93:1`/`7.81:1`/`16.44:1`;
  dark is `17.18:1`/`12.09:1`/`14.5:1`. Disabled text is `2.91:1` light and
  `5.08:1` dark, remains unavailable, and never executes. The focused input row
  uses a `3px` primary outline.
- Overlay and panel transitions compute `0s` under reduced motion. Forced colors
  preserves the dialog boundary, query focus, option highlight/bounds, disabled
  distinction, and visible close control.
- Eight canonical images cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized RTL, dark, forced colors, reduced motion, close focus, empty, and
  many-result captures supplement two live desktop before images.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Canonical Modal plus editable Combobox/Listbox active-descendant controller. | CSS and target-local lifecycle evidenced; production portal/inert/shortcut/command services remain target-owned. |
| Shopify | Host Modal/search/list facilities in admin or bounded Liquid data/controller when appropriate. | Shared CSS ships; no global theme command registry or dedicated adapter. |
| React / Angular | Controlled/uncontrolled open/query, command collection, filtering/events, active descendant, and Dialog service. | Strategy documented; adapter not certified. |
| Figma | Modal/search/group/item/empty/highlight/disabled states and responsive geometry. | Studio validates; no provider or execution ownership. |
| SwiftUI / Compose | Native searchable modal/command surface where equivalent. | Conceptual mapping only. |

## Performance And Risks

- Command Palette adds no neutral JavaScript. Batch 18 Layout is the documented
  `6,357 B / 4.8 KiB` exception (`1,442 B` over); shared runtime remains the
  unchanged `10,321 B` exception; complete Web CSS is `62,893 B / 64 KiB`.
- Human review must approve modal position/width, overlay opacity, radius/shadow,
  query chrome, result density, highlight balance, footer help, and whether the
  current repository render is the visual reference.
- Production targets still need a mutually exclusive overlay coordinator,
  command registry, shortcut policy, ranking/provider strategy, async/loading/
  error behavior, announcement cadence, and virtualization threshold.
- Navigation destinations versus immediate actions are inventory semantics; an
  option must not acquire nested links/buttons to represent that distinction.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, modal/Combobox/Listbox
DOM and keyboard probes, focus trap/restoration, IME, contrast/RTL/empty/overflow/
special-media probes, four-viewport evidence, TypeScript, structural/parity/
static-preview/refinement audits, temporary docs build, deterministic
performance, diff checks, and `site/dist` verification are included in Batch 18.
