# Component Dossier: Bottom Navigation Bar

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/bottom-nav.contract.json`

## Recommendation

Keep Bottom Navigation as a fixed, safe-area-aware mobile `nav` containing one
native list of persistent destination links. Every destination keeps a visible
label, optional decorative icon, exactly one current-page marker when applicable,
and an optional compact count indicator whose value is incorporated into the
link's accessible name. Preserve normal link Tab/Enter behavior; do not expose
Tabs, `tablist`, roving focus, controlled panels, or an action toolbar.

Retain the accepted `label` and target-owned `items` slot. Route selection,
destination inventory/order, current-page truth, icon source, count formatting,
dynamic announcement, body offset, fixed/sticky placement, and breakpoint policy
remain target responsibilities. The current five-destination fixture is evidence,
not a public default or validation rule.

## Purpose And Limits

- Keeps a small set of high-priority mobile destinations consistently reachable
  near the bottom edge.
- Suitable for stable page destinations such as Home, Browse, Saved, Orders, or
  Cart when the target chooses them.
- Not Tabs (it navigates), a command toolbar, floating action area, checkout
  progression, browser chrome, or a replacement for the full site hierarchy.
- Does not own router history, page content, route matching, authentication,
  wishlist/cart services, body padding, keyboard viewport avoidance, or platform
  app-shell persistence.
- Targets with too many, volatile, permission-dependent, or long destinations
  should choose a different information architecture rather than horizontal
  overflow or silently hiding routes.

## Gallery Baseline Before This Batch

- Registry `C8`, Global, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS renders only below a 767px viewport threshold, fixed to physical
  bottom/left/right with hardcoded `z-index: 90`, one flex item per direct link,
  44px minimum targets, safe-area padding, current/hover color, visible focus,
  optional compact count, and reduced motion.
- Markup places anchors directly in `nav` without a native list. Current state
  differs from default only by color; the 10px label and 10/16/24px count/icon
  values are hardcoded without documented private/public classification.
- Hover styling is active on touch-capable devices, and badge positioning uses
  physical `right`. There is no forced-colors treatment or explicit LTR numeric
  direction.
- Fixture badge `aria-label` participates as a descendant in the link name.
  Dynamic changes have no clear single accessible-name owner; counts should be
  mirrored into the link name and the visual badge hidden from duplicate name
  calculation without becoming an unconditional live region.
- Site CSS recreates icon sizing and narrow-item padding. The preview forces the
  fixed component visible and contains it, which is valid fixture responsibility;
  reusable item geometry belongs in canonical CSS.
- Studio's shared frame is not component-specific owner approval. It supports a
  neutral bar, icon-over-label arrangement, current emphasis, and compact count,
  not the final destination policy or a platform-native tab-bar clone.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI navigation landmark example](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html) | Native `nav` identifies destination links; multiple navigation landmarks need useful names and native lists communicate grouping. | Use required concise label and `ul > li > a` structure. |
| [WAI landmark pattern](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) | Landmarks identify high-level page structure and have no special arrow-key model. | Preserve normal Link keyboard behavior; do not claim tab/menu semantics. |
| [WCAG Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | Pointer targets need at least 24×24 CSS px or sufficient spacing; larger targets benefit touch and motor access. | Retain Gallery's stronger existing 44px minimum across the full item surface. |
| [Android Navigation Bar](https://developer.android.com/develop/ui/compose/components/navigation-bar) | Platform navigation bars map each visible item to a destination while navigation/controller state owns selection and content. | Keep route/current truth outside neutral presentation and map to platform-native components on native targets. |
| [Apple Tab Bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) | Stable bottom destinations pair symbols with text labels and should not appear unpredictably. | Keep visible labels and stable target-owned inventory; do not copy native tab semantics into Web. |
| [Polaris Navigation](https://polaris-react.shopify.com/components/deprecated/navigation) | Route matching, selection, labels, icons, badges, and nested records belong to the app navigation data model; the component is deprecated/admin-specific. | Use as evidence for target-owned route data, not as a storefront API or visual template. |

## Matches, Differences, And Direction

- Gallery already has a labelled native navigation landmark, real links, visible
  labels, current-page markup, large targets, safe-area support, and target-owned
  destination/count data.
- Native list structure, non-color current meaning, logical geometry, explicit
  count naming, semantic typography, forced colors, and canonical responsive
  ownership are the principal gaps.
- Native mobile frameworks call analogous surfaces tab bars/navigation bars, but
  Web destinations remain ordinary links rather than tab-controlled panels.
- Direction: one list, one current route, stable labelled links, no local router,
  no neutral runtime, and no standalone Badge composition.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | labelled `nav` | Bottom Navigation/target | Fixed Web default; target owns page-shell offset and visibility policy. |
| List | yes | `ul` | Bottom Navigation | One flat destination inventory. |
| Entry | yes | `li` | target | Normal source order. |
| Item | yes | native `a` | target | Entire item is the target; may carry `aria-current="page"`. |
| Icon | no | decorative SVG/image | target | Hidden from name when visible label is sufficient. |
| Label | yes | visible text | target | Concise localized destination name. |
| Count indicator | no | visual text hidden from duplicate name calculation | target | Link accessible name includes equivalent count; not live by default. |

The compact `.bottom-nav__badge` is not canonical Badge composition. Badge is a
standalone passive semantic label with its own visible meaning/variants, whereas
this indicator is positioned navigation metadata whose equivalent meaning belongs
in the containing link name. A future general notification-indicator primitive
would require a separate accepted contract.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One mobile bottom bar and one touch density. |
| Destination | Default, fine-pointer hover, focus-visible, current page. |
| Current | Zero before route resolution or exactly one current destination; never multiple. |
| Count | Omitted, zero policy, single/multiple digits, bounded `99+`-style target formatting; no live default. |
| Inventory | Small stable flat set; current fixture proves five. Overflow/More behavior is not accepted. |
| Narrow/content | Labels wrap visibly within items; no page or bar inline overflow. |
| Safe area | Logical bottom inset extends the surface without reducing the 44px target. |
| RTL | Source order and meaning remain authored; logical count placement and numeric LTR direction. |
| Reduced motion | Color/indicator transitions removed. |
| Forced colors | Boundary, current text/indicator, focus, icons, and count remain distinguishable. |

Hidden-label, icon-only, floating, centered-action, scrollable, expandable,
translucent, and automatic overflow/More configurations are unsupported v1
modes.

## Public API And State Ownership

- `label` — required accessible name for this navigation landmark. Avoid adding
  the word “navigation” when it would produce repetitive announcements.
- `items` — required target-owned native destination list including labels,
  routes, icons, current-page state, and optional count metadata.
- The router/target is the sole controlled current owner and authors
  `aria-current="page"`; Bottom Navigation has no uncontrolled selection state.
- Native navigation activation is the event surface. There is no synthetic
  `onValueChange`, panel relationship, roving index, or arrow-key handling.
- Target state formats count text, mirrors it into the destination's accessible
  name, chooses update announcements, and coordinates Cart Drawer/Header badges.

## Token And Value Audit

- Existing public tokens cover surface, primary/secondary text, subtle/focus
  border, error/current metadata color, full radius, touch target, caption
  typography, sticky z-index, transition, and easing.
- Replace hardcoded layer order with `--z-sticky`, use caption size/line-height
  for labels/counts, and use logical safe-area/edge/count positioning.
- Icon 24px, count minimum/height, private item gaps/padding, 1px boundary, focus
  thickness, current marker geometry, weight, and 48rem visibility threshold are
  private composition facts, not public consumer controls.
- No new component token or runtime is justified. Count foreground may require a
  private on-accent literal until the repository accepts a semantic on-feedback
  token; forced colors must replace it with system colors.

## Visual And Content Audit

- Preserve the neutral fixed surface, quiet top divider, centered icon-over-label
  rhythm, compact count, and full-width equal distribution as the review candidate.
- Add a non-color current cue through label weight and a private indicator shape;
  do not depend on icon color alone.
- Test missing icon, missing count, one/two/three-digit count, `99+`, short and
  long localized labels, four/five items, and unbroken text without overlap.
- Keep the complete label visible; targets should shorten destination copy rather
  than truncate the only visible name.

## Accessibility And Interaction

- Use `nav > ul > li > a`, one useful landmark label, normal Tab order, Enter
  navigation, and truthful `aria-current="page"`.
- Decorative icons and visual count text are hidden from duplicate accessible-
  name calculation. The link name includes count meaning when present.
- Do not add `role="tablist"`, `role="toolbar"`, `menuitem`, roving tabindex, or
  arrow-key listeners.
- Keep each whole item at least 44px high and expose a visible 2px focus boundary
  that remains distinguishable from current/hover states.
- Dynamic count announcements are target policy; the base must not make every
  cart/wishlist update a competing live region.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus 320px, four/five items,
  missing count/icon, `99+`, keyboard focus, route-current changes, long/
  localized/RTL labels, dark, reduced motion, forced colors, safe-area override,
  content-bottom overlap simulation, and page-width containment.
- Base runtime budget is `0 B`: no listener, observer, timer, request, router,
  resize measurement, or count subscription ships in neutral JS.
- Batch 20 begins at Global `4,028 B`, Web component CSS `63,507 B`, and shared
  runtime `10,321 B` deterministic gzip. Global is already `239 B` over its
  permanent `3.7 KiB` ceiling; total Web CSS has `2,029 B` headroom.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Fixed labelled nav/list/link surface with safe area and target route/count state. | CSS exists; semantic, current, RTL and special-media refinement pending. |
| Shopify | Liquid menu/routes plus cart/customer state and theme/page-shell body offset. | Planned; destination policy and synchronized services unresolved. |
| React / Angular | Router-derived native links, current state, target count store, and page-shell offset. | Planned; no component-local selection owner. |
| Figma | Default/current/focus/count states, four/five destinations, safe-area and long-label examples. | Studio metadata exists; routes/announcements excluded. |
| SwiftUI / Compose | Native TabView/NavigationBar with platform destination state and badge APIs where equivalent. | Conceptual mapping; native semantics replace Web DOM. |

## Exhibit And Studio Parity

The existing `GlobalStudio` renderer and one fixture serve both views. Refinement
should render the same native list/entries/links, include count meaning on the
Cart link, and remove site-owned icon/item geometry while retaining only the
phone-surface containment that keeps a fixed component visible in documentation.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Destination collection lacks native list semantics. | high | Add canonical list/entry anatomy and shared markup. | implementation |
| Current state relies on color. | high | Add visible text-weight/private indicator cue and forced-color mapping. | implementation |
| Count has an ambiguous accessible-name owner. | high | Mirror count in link name; hide visual indicator from duplicate calculation; no live default. | implementation/target data |
| Physical geometry/hardcoded type and z-index reduce portability. | medium | Use logical properties plus accepted caption/sticky tokens. | implementation |
| Site CSS recreates reusable item/icon geometry. | medium | Move reusable rules to canonical CSS; retain fixture containment only. | implementation |
| Destinations, breakpoint and body offset lack product consensus. | non-blocking for neutral surface | Keep explicit target/owner boundaries under ADR 0086. | owner/target later |

## Risks And Open Questions

1. Height, icon size/stroke, label scale/wrapping, current indicator, count
   geometry, divider, surface/shadow, and safe-area rhythm need human approval.
2. Destination inventory/order, maximum count, overflow/More policy, visibility
   threshold, body offset, and Cart/Header synchronization remain target choices.
3. If a target wants action Buttons, transient tabs, or a raised central action,
   it needs a separate semantic composition rather than widening this nav silently.

## Implementation And Verification

- Contract `0.3.0`, registry, semantic MDX, Studio `0.2.0`, canonical Global
  CSS, and one shared Exhibit/Studio renderer now describe the same native
  destination list and target-owned route/count boundary.
- Canonical CSS adds list/entry anatomy, logical fixed/safe-area/count geometry,
  sticky layer and caption tokens, 44px whole-link targets, non-color current
  treatment, fine-pointer hover, visible focus, reduced motion, and system
  forced-color mappings. Site CSS retains only phone-surface containment.
- Live evidence covers Exhibit/Studio at 390/768/1280/1600, a 320px Arabic/RTL-
  safe long-label and `99+` case, missing icon/count, a 24px safe-area override,
  dark, forced colors, reduced motion, current route, and keyboard focus.
- The fixture exposes one labelled landmark, one list, five entries/links, one
  current page, one `Cart, 2 items` link name, and an `aria-hidden` visual count.
  Measured targets remain 58–90px high and no case creates page inline overflow.
- Neutral runtime delta is `0 B`. Final deterministic gzip is Global `4,470 B`,
  Web component CSS `63,981 B`, and shared runtime `10,321 B`; the Global family
  exception and remaining Web headroom are recorded in ADR 0105.

## Readiness Decision

Implementation, documentation, evidence, automated validation, and target
translation are complete for explicit human review. Visual approval and open
target policies remain pending. The contract stays `pilot`.
