# Component Dossier: Mobile Menu

Status: `human-review-ready`

Target reviewed: Neutral Web navigation list composed with canonical Drawer

Contract: `components/contracts/mobile-menu.contract.json`

## Recommendation

Keep Mobile Menu as a labelled native navigation list of target-owned links
inside canonical Drawer. Require `ul > li > a`, preserve one optional current
destination, ordinary Tab navigation and touch-sized rows, and let Drawer own the
modal overlay lifecycle. Do not apply `menu`/`menuitem`, roving focus, arrow-key
navigation, or a duplicate `open` owner.

Nested destinations remain unresolved. Until a hierarchy/disclosure API is
accepted, v1 demonstrates direct links only and treats any chevron as decorative
fixture content rather than a promise of drill-in or submenu behavior.

## Purpose And Limits

- Presents primary/secondary site destinations in the constrained mobile shell.
- Useful as Drawer body content when Header's expanded navigation is unavailable.
- Not an application menu, command menu, menubar, Drawer implementation, route
  store, authentication panel, locale selector, or mega-menu fallback API.
- Target owns records, labels, URLs, current route, permissions, localization,
  hierarchy, navigation/close timing and breakpoint choice.
- One or more list items are required. Empty Mobile Menu is invalid and should not
  open an empty Drawer.

## Gallery Baseline Before This Batch

- Registry `C4`, Global, dependency Drawer; contract `0.2.0`, `pilot`.
- Contract marks list items optional, has no hover/focus/disabled treatment matrix,
  and describes close-after-navigation without a defined target event boundary.
- Canonical CSS provides touch height, wrapping, current color and focus, but has
  no hover/fine-pointer treatment, explicit item containment, indicator part,
  reduced-motion need, or forced-color current state.
- Shared renderer hand-builds Drawer markup with no dialog role/modal state, no
  focus entry/containment/Escape/restoration, and a bare `.drawer__close` button
  instead of canonical Close Button. This contradicts the accepted Drawer
  dependency established in ADR 0098.
- Shopify similarly leaks Header's logo class into Drawer, omits dialog naming/
  modality and uses a generic Button rather than Drawer/Close Button composition.
- The owner Studio reference is generic. It supports the current left Drawer,
  divided rows and direct-link list, not choosing nested-navigation behavior.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) | Typical site navigation uses native links and disclosure buttons, not ARIA menu roles or their complex keyboard model. | Keep direct v1 items as ordinary anchors; add disclosure only with accepted nested behavior. |
| [WAI modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | Modal containers are named, trap Tab, close with Escape, provide a visible close control, and restore focus. | Consume Drawer lifecycle rather than reimplement visibility in Mobile Menu. |
| [Open UI Navigation Bar explainer](https://open-ui.org/components/navigation-bar.explainer/) | Rich navigation/disclosure behavior remains early and explicitly distinct from application menus. | Do not infer hierarchical/mobile keyboard APIs from experimental work. |
| [Shopify theme accessibility](https://shopify.dev/docs/storefronts/themes/best-practices/accessibility) | Drawers move/contain/restore focus, support Escape, use dialog semantics, and primary menu/close targets are at least 44px. | Shopify and docs target must consume canonical Drawer/Close Button and 44px links. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Separates Root/Trigger/Portal/Overlay/Content/Title/Close and supports controlled/uncontrolled modal lifecycle. | Framework targets may compose Drawer/Dialog services around the neutral link list; do not copy React API into Mobile Menu. |

Polaris' admin navigation patterns are application-shell specific and do not
replace storefront-native links.

## Anatomy And Canonical Composition

| Part | Required | Semantic element | Owner | Notes |
| --- | --- | --- | --- | --- |
| Navigation wrapper | yes in use | labelled `nav` | target/Drawer content | Not the `.mobile-nav` root itself. |
| Root | yes | `ul` | Mobile Menu | Native list semantics. |
| Item | yes | `li` | target | One record per destination. |
| Link | yes | `a` | target | Native destination/current behavior. |
| Indicator | no | hidden icon | target fixture | Decorative unless a future accepted disclosure controls content. |

Canonical dependency: Drawer owns overlay, dialog title, dismiss action, Close
Button, body scroll, focus and controlled/uncontrolled lifecycle. Mobile Menu
adds no parallel backdrop, panel, close, `open`, portal, or document listener.

## State, Variant, Size, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One vertical touch-friendly list inside Drawer. |
| Link | default, fine-pointer hover, focus-visible, current page. |
| Drawer | open/closed, focus and dismissal are dependency states, not Mobile Menu variants. |
| Content | one/many items, long/localized/unbroken labels, current/none current. |
| RTL | logical row layout; the optional fixture chevron is not contract behavior. |
| Forced colors | dividers/current/focus remain distinct. |

Nested disclosures, accordion/drill-in stacks, back actions, section headings,
icons, badges, account/locale controls, and selected actions are unsupported v1.

## Public API And State Ownership

- `items` — required target-owned slot containing one or more native list items,
  destinations, labels and optional current-page markup.
- Mobile Menu has no `open`, `defaultOpen`, or dismissal event. Drawer/target owns
  controlled/uncontrolled visibility and emits its lifecycle changes.
- Native link activation navigates. Whether a successful activation closes the
  Drawer is target/router policy; Mobile Menu emits no competing selection event.
- Nested expansion is absent until a target-agnostic hierarchy owner is accepted.

## Token And Hardcoded-Value Audit

- Public: subtle divider, focus, primary/current accent colors, body size/line
  height, and touch target.
- Private: 12px/4px row padding, 2px focus/current underline geometry, weight,
  and optional fixture indicator size/gap. Do not expose these independently.
- Verify current/hover contrast in light/dark; keep text as the non-color source
  of destination meaning and use forced-color system values.
- Mobile Menu itself adds `0 B` JS. Drawer target evidence may use existing docs
  lifecycle but neutral runtime ownership remains Drawer/target.

## Accessibility And Interaction

- Use labelled `nav > ul > li > a`; never `role="menu"` for ordinary site links.
- Preserve native Tab/Shift+Tab/Enter and browser link behavior. No arrow-key or
  roving-tabindex model is added.
- Expose current route once with `aria-current="page"` when present.
- When shown as a modal Drawer, focus enters, stays contained, Escape/close
  dismiss, and focus returns to the trigger under Drawer/target ownership.
- Direct links need at least the accepted 44px touch target.

## Responsive, Content, And Performance

- Test Drawer at Mobile/Tablet/Desktop/XL, 320px, one/10+ items, long/localized/
  unbroken labels, RTL, no current/current, dark and forced colors.
- Root/list must match Drawer body width with no page or panel inline overflow.
- Passive list budget is `0 B`; no observer, timer, request, asset, provider or
  document listener enters Mobile Menu.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `nav > ul > li > a` inside canonical Drawer lifecycle. | CSS and shared docs lifecycle are evidenced for human review. |
| Shopify | Menu records render native links inside theme Drawer. | Dialog/title/Close/list markup aligns; production lifecycle and nested policy remain planned. |
| React / Angular | Items slot inside controlled/uncontrolled Drawer; route closes target state. | Planned. |
| Figma | List/item/link/current/focus anatomy within Drawer representation. | Studio validates; no lifecycle ownership. |
| SwiftUI / Compose | Native navigation drawer/list destinations. | Conceptual mapping only. |

## Exhibit And Studio Parity

The single `GlobalStudio` renderer and fixture serve both modes. It now composes
canonical left Drawer and Close Button, conditionally removes closed content, and
demonstrates focus entry/cycling, Escape and restoration without adding Mobile
Menu state or neutral runtime.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Renderer does not actually consume canonical Drawer lifecycle/close dependency. | resolved | Canonical Drawer/Close composition and docs-target lifecycle are shared. | implementation |
| Required list item is marked optional. | resolved | `ul/li/a` anatomy now requires one-or-more items. | implementation |
| Shopify leaks Header markup and lacks dialog semantics. | partially resolved | Canonical dialog/title/Close/nav markup aligns; target runtime remains. | implementation/target |
| Nested navigation lacks accepted ownership/API. | non-blocking for direct v1 | Keep direct links only and explicit. | owner/architecture later |

## Evidence And Validation

- Contemporary before: Exhibit and Studio desktop captures under
  `output/playwright/refinement-batch-16/before/`.
- Eight canonical after captures cover Exhibit/Studio × Mobile/Tablet/Desktop/XL;
  localized RTL, dark, forced-colors, reduced-motion and focus evidence is under
  `output/playwright/refinement-batch-16/after/`.
- Initial focus is Close; Shift+Tab wraps to Journal and Tab returns to Close.
  Escape removes all menu focusables, restores `Open mobile menu` on the next
  frame, and reopen focuses Close. ARIA menu-role count is zero.
- A 390px RTL/unbroken case keeps Drawer `358/358px`, list/link `295/295px`, and
  44px minimum row target. Light/dark contrast is `17.93:1`/`17.18:1`; reduced
  motion is `0s`; forced colors and focus remain visible.
- Contracts, docs/Studio, Web/Shopify adapters, TypeScript, structural/parity/
  static/refinement audits, temporary build, performance and `site/dist`
  cleanliness pass in Batch 16.

## Risks And Open Questions

1. Nested hierarchy/disclosure/drill-in behavior and chevron meaning remain
   owner/architecture choices.
2. Destination inventory, Header breakpoint coordination and close-after-route
   policy remain target-owned.
3. Drawer width/placement, row height, divider, current indicator and icon
   treatment require human visual approval.

## Readiness Decision

Mobile Menu is prepared for explicit human stability review and remains `pilot`.
Drawer placement/width, header/row rhythm, Close target, divider/current/focus
treatment and nested-navigation policy still need human approval.
