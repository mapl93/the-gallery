# Component Dossier: Mega Menu

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/mega-menu.contract.json`

## Recommendation

Keep Mega Menu as a non-modal, labelled site-navigation disclosure containing
ordinary destination links. Its canonical content should use visible labelled
groups with native lists, optional promotional links, and an optional featured-
destination list. Do not apply `menu`, `menubar`, `menuitem`, roving focus, arrow-
key navigation, or focus trapping: those patterns describe application commands,
not a website hierarchy.

Retain the accepted `label`, controlled `open`, `columns`, `promo`, and
`featured` properties. The target continues to own the external trigger,
`aria-expanded`/`aria-controls` relationship, click/hover/focus policy, pointer
intent, dismissal, focus restoration, breakpoint substitution with Mobile Menu,
route state, records, and analytics. The shared docs renderer may demonstrate one
explicit Button-triggered lifecycle, but that proof must not become neutral
runtime or an implied cross-target default.

## Purpose And Limits

- Gives users an overview of a broad site hierarchy without navigating through
  several intermediate pages.
- Supports labelled destination groups plus optional editorial/featured routes
  inside one expanded navigation surface.
- Not an application command menu, Combobox, Context Menu, modal, Drawer, search
  surface, arbitrary marketing canvas, or mobile navigation default.
- Does not own Header placement, top-level trigger inventory, hover intent,
  collision/portal strategy, mutual exclusion, routing, CMS records, permissions,
  personalization, tracking, or target breakpoints.
- Every destination remains reachable through a normal page route even if the
  disclosure behavior or JavaScript is unavailable.

## Gallery Baseline Before This Batch

- Registry `C7`, Global, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS provides a full-width absolute layer, hidden/open transitions,
  auto-fitting link columns, optional promo and featured layouts, current-page
  text, focus outlines, fine-pointer image scaling, reduced motion, and bounded
  vertical overflow.
- Positioning and badge-like layer order use physical edges and a hardcoded
  `z-index: 100`; transition aliases include a hardcoded fallback. Promo text
  uses undeclared black/white media literals and has no forced-colors fallback.
- Columns and featured destinations render as generic `div` collections rather
  than native lists. `aria-label` is applied to a generic featured wrapper, and
  fixture images duplicate visible destination names in link name calculation.
- The promo link clips its outward focus outline because the same anchor owns
  `overflow: hidden`. Current-page styling is only specified for column links.
- Narrow composition is partly recreated in site CSS instead of canonical
  container behavior. The local trigger is not connected through
  `aria-controls`, and open-state focus/Escape/restoration are not evidenced.
- Studio's file/frame reference is the shared Gallery frame rather than a
  component-specific approved visual. It supports the existing quiet white
  surface, serif group headings, editorial media, and restrained dividers, not
  a new interaction or content model.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI fly-out menus](https://www.w3.org/WAI/tutorials/menus/flyout/) | Site fly-outs expose a page hierarchy, need an operable toggle with synchronized expanded state, and should retain alternate routes to submenu destinations. Opening every submenu merely on Tab creates excessive keyboard stops. | Use an explicit target-owned disclosure trigger, normal links/Tab order, and progressive route access; do not make focus alone the neutral open rule. |
| [WAI application menus](https://www.w3.org/WAI/tutorials/menus/application-menus/) | `menu`/`menubar` roles require the additional application-menu keyboard model. | Mega Menu is website navigation and must not claim application command semantics. |
| [WAI navigation landmark example](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html) | Native `nav` identifies a group of destination links; multiple navigation regions need useful labels and lists provide structure. | Keep one concise required label and native list grouping. |
| [Open UI Invoker Commands explainer](https://open-ui.org/components/invokers.explainer/) | Invokers are Buttons connected to targets; expanded state and focus restoration are lifecycle concerns of the invoking layer. | Preserve the external trigger/controller boundary and permit progressive native invokers in adapters without making them neutral source syntax. |
| [Radix Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu) | Separates Root/List/Item/Trigger/Content/Link and owns a framework-specific popup/focus system. | Reuse the anatomy evidence, but do not copy React state, viewport, indicator, delay, or motion APIs into Gallery. |
| [Polaris Navigation](https://polaris-react.shopify.com/components/deprecated/navigation) | Groups destinations by visible sections and keeps route matching, badges, nested items, and actions in application data. The component is deprecated/admin-specific. | Grouping and current-route evidence are useful; the app-shell API is not a neutral storefront contract. |

## Matches, Differences, And Direction

- Gallery already uses a labelled `nav`, native links, controlled presentation,
  current-page state, visible focus, reduced motion, and target-owned records.
- Generic collection wrappers, duplicated image names, incomplete trigger proof,
  physical geometry, clipped focus, and missing forced-colors treatment are the
  main technical gaps.
- Radix owns a complete interaction engine; Gallery deliberately owns only the
  target-agnostic navigation surface and state mapping.
- Direction: native grouped lists, truthful link names, logical/container CSS,
  explicit open-state proof, no app-menu semantics, and no neutral JavaScript.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| External trigger | target | native Button | Header/target | Connected by `aria-controls` and synchronized `aria-expanded`; not Mega Menu anatomy. |
| Root | yes | labelled `nav` | Mega Menu/target | Non-modal navigation disclosure; controlled hidden/open state. |
| Inner | yes | neutral layout wrapper | Mega Menu | Container-responsive bounded grid. |
| Column | no | `section` or neutral group labelled by heading | target | Omitted when empty. |
| Heading | yes per column | context-appropriate heading | target | Visible group label. |
| Link list / item | yes per column | `ul > li` | target | Preserves hierarchy and normal reading order. |
| Link | yes per item | native `a` | target | May carry `aria-current="page"`. |
| Promo | no | native `a` | target | One destination; visible text is its name and media is normally decorative. |
| Featured list / entry | no | labelled `ul > li` | target | Optional destination collection. |
| Featured item | no | native `a` | target | Visible name; image normally has empty alt. |

The component has no required canonical component dependency. A target-owned
trigger may compose Button, and an optional fixture close action may compose
Close Button, but neither becomes Mega Menu anatomy until the open interaction
model is accepted.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Composition | Columns only, columns + promo, columns + featured, or all three. These are slot arrangements, not option classes. |
| Visibility | Closed/hidden and open/visible remain one controlled state. |
| Link | Default, hover on fine pointers, focus-visible, and current page. |
| Content | One/many groups, empty optional regions omitted, short/long/localized/unbroken names, editorial media error/omission. |
| Container | Wide multi-column, medium two-column, and narrow single-column bounded scroll; target may replace with Mobile Menu. |
| RTL | Logical edges and inherited DOM order; source hierarchy is not reversed. |
| Reduced motion | Layer and media transforms removed. |
| Forced colors | Root boundary, focus, current links, promo/featured structure, and images remain understandable. |
| Closed runtime | No focusable hidden content, pointer interception, observer, timer, request, or continuing work. |

Hover-only, automatic focus-open, application-menu keyboard navigation, nested
fly-outs, arbitrary panels, and modal behavior are unsupported neutral modes.

## Public API And State Ownership

- `label` — required concise accessible name for the navigation landmark.
- `open` — controlled presentation state mapped to visible class plus
  synchronized `aria-hidden`/`inert`; no internal uncontrolled owner in neutral
  source.
- `columns` — optional target-owned labelled groups and native destination lists.
- `promo` — optional target-owned editorial destination link and media.
- `featured` — optional target-owned labelled destination list and media.
- The target controller owns trigger identity, activation mode, pointer delay,
  expanded/control attributes, outside/focus/Escape dismissal, focus entry/
  restoration, breakpoint substitution, route changes, and mutual exclusion.
- Navigation uses native Link activation; Mega Menu emits no synthetic selection
  event and does not mirror target route state beyond authored `aria-current`.

## Token And Value Audit

- Existing public tokens cover surface, primary/secondary text, subtle/focus
  borders, content/gutter/touch spacing, radii, shadow, heading/body type,
  dropdown z-index, base/fast transition, and easing.
- Replace hardcoded layer order with `--z-dropdown` and fallback transition alias
  with accepted `--transition-base`; add accepted line-height references where
  text roles require them.
- Grid minimums, media aspect ratios, local gaps, weights, letter spacing, 1px
  dividers, focus geometry, and narrow thresholds remain private composition.
- Promo scrim and on-media white remain documented private literals because the
  repository has no accepted semantic on-scrim token. Forced colors replaces
  them with system colors; this batch must not invent public tokens.

## Visual And Content Audit

- Preserve the current restrained surface, quiet shadow, uppercase group labels,
  editorial 4:3 promo, and square featured media as the review candidate.
- Replace duplicate image/link names with visible destination text plus
  decorative media where no extra visual information is required.
- Keep links at readable body size/line height and ensure long labels wrap
  without forcing root/page inline overflow.
- Promo and featured media need bounded width, stable object fit, fallback-safe
  layout, and an inset focus indicator when the anchor clips content.
- Empty columns/promo/featured slots are omitted rather than leaving blank grid
  tracks or unnamed regions.

## Accessibility And Interaction

- Use native `nav`, headings, lists, and anchors; do not apply application-menu
  roles or roving focus.
- Keep normal Tab/Shift+Tab/Enter behavior. The target trigger is a Button with
  synchronized expanded/control state; open-on-hover alone is insufficient.
- Target adapters must offer Escape/intentional dismissal and preserve focus if
  they move it. A non-modal disclosure does not trap focus.
- Use `aria-current="page"` only for the actual current destination, including
  promo/featured links when applicable; visual current meaning must not rely on
  color alone.
- Closed content must be unavailable to focus and accessibility APIs. All open
  focus targets need a visible high-contrast indicator.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus closed/open, keyboard entry/
  dismissal/restoration, normal Tab order, long/empty/localized/RTL content,
  narrow/wide containers, media failure, dark, reduced motion, forced colors,
  overflow top/end, and page-width containment.
- Neutral component runtime budget is `0 B`: no listener, observer, pointer-
  intent timer, request, portal, or layout loop ships in `components/js`.
- Batch 20 begins at Global `4,028 B`, Web component CSS `63,507 B`, and shared
  runtime `10,321 B` deterministic gzip. Global is already `239 B` over its
  permanent `3.7 KiB` ceiling; the total Web bundle retains `2,029 B` headroom.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Labelled nav, grouped lists/links, controlled visibility, external disclosure controller. | CSS exists; semantic, responsive, focus and lifecycle evidence pending. |
| Shopify | Header/menu settings, nested linklists, promo/featured blocks, route truth, and bounded target controller. | Planned dedicated adapter; data schema and global controller unresolved. |
| React / Angular | Controlled `open`, slots/records, external trigger refs, dismissal/focus controller, native links. | Planned; no neutral framework API selected. |
| Figma | Closed/open, columns/promo/featured compositions, wide/narrow, hover/focus/current examples. | Studio metadata exists; interaction/provider state excluded. |
| SwiftUI / Compose | Platform navigation disclosure or alternate destination surface. | Conceptual; web fly-out DOM does not translate directly. |

## Exhibit And Studio Parity

The existing `GlobalStudio` renderer and one fixture already serve both modes.
Refinement should connect one fixture-owned Button trigger, reuse the same native
group/list/link markup, and keep site CSS limited to preview containment/media.
The renderer's target-local lifecycle is evidence, not shipped neutral behavior.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Generic wrappers omit list/group semantics. | high | Use visible labelled groups and native lists/items. | implementation |
| Trigger relationship and keyboard lifecycle are not evidenced. | high | Add one target-local Button lifecycle with controls/expanded, Escape and restoration; no trap. | implementation/target proof |
| Promo focus is clipped and special colors are incomplete. | high | Use inset focus plus system forced-color fallback. | implementation |
| Physical layer geometry and hardcoded z-index reduce portability. | medium | Use logical inset and accepted dropdown token. | implementation |
| Narrow behavior is partly site-owned. | medium | Move reusable response to canonical container CSS. | implementation |
| Hover/click/focus policy and mobile substitution lack consensus. | non-blocking for neutral surface | Keep target-owned under ADR 0086/Open Questions. | owner/architecture later |

## Risks And Open Questions

1. Surface/shadow, grid density, group typography, media ratios, promo scrim,
   current treatment, narrow stacking, and maximum height need human approval.
2. Click, hover, focus, pointer-intent delay, outside/focus dismissal, and target
   progressive-popover policy remain architecture choices.
3. Shared navigation schema, analytics, permissions, localization, promo records,
   Shopify block schema, and Header/Mobile Menu coordination remain target work.

## Implementation And Verification

- Contract `0.3.0`, registry, semantic MDX, Studio `0.2.0`, canonical Global
  CSS, and one shared Exhibit/Studio renderer now describe the same native
  grouped-link composition and target-owned controller boundary.
- The shared renderer proves an always-mounted canonical Button trigger,
  synchronized expanded/controls/hidden/inert state, Escape dismissal, focus
  restoration only when focus was inside, no trap, and immediate removal of
  closed descendants from focus.
- Canonical CSS adds logical placement, dropdown layer token, private container-
  based gutter, native list resets, 44px links, non-color current treatment,
  unclipped focus, bounded container response, reduced motion, and system
  forced-color mappings. Site CSS retains only fixture shell/media containment.
- Live evidence covers Exhibit/Studio at 390/768/1280/1600, a 320px Arabic RTL
  unbroken-string case, overflow end, empty optional slots, broken media, dark,
  forced colors, reduced motion, and keyboard close/restoration. Links remain
  44px high, the page never overflows inline, and a closed surface exposes zero
  visible tabbable descendants.
- Neutral runtime delta is `0 B`. Final deterministic gzip is Global `4,470 B`,
  Web component CSS `63,981 B`, and shared runtime `10,321 B`; the Global family
  exception and remaining Web headroom are recorded in ADR 0105.

## Readiness Decision

Implementation, documentation, evidence, automated validation, and target
translation are complete for explicit human review. Visual approval and open
target policies remain pending. The contract stays `pilot`.
