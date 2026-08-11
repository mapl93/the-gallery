# Component Dossier: Header

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify boundary audit

Contract: `components/contracts/header.contract.json`

## Recommendation

Keep Header as a sticky site masthead and composition boundary, not a global
navigation controller. Require brand content and a home destination; preserve
optional labelled primary navigation, target-owned action inventory, cart count,
and mobile trigger. Compose every action from canonical Button or native Link,
use `.header__action` only for local positioning, and evaluate the already
accepted 768px/48rem compact-to-expanded threshold against Header's own inline
size through a container query.

Do not decide action priority, navigation hierarchy, overlay coordination,
search, account, cart, mega-menu, or mobile-menu services in this component.
ADR 0086 and the Global open questions continue to own those boundaries.

## Purpose And Limits

- Identifies the site, returns to its home destination, exposes primary
  navigation when space allows, and groups high-priority global actions.
- Useful once per page shell as top-level site-oriented content.
- Not the owner of menus, search results, cart data, authentication, wishlist,
  localization, routing, overlay focus, scroll lock, or analytics.
- A top-level `<header>` supplies the banner landmark natively. A Header rendered
  inside docs, an article, section, or application subview is not a page banner.
- The target owns whether the root is sticky in its shell, but the canonical
  default remains sticky because that is the accepted Gallery baseline.

## Gallery Baseline Before This Batch

- Registry `C1`, Global, Button dependency; contract `0.2.0`, `pilot`.
- CSS used a viewport media query at 768px, so a narrow embedded Header could
  reveal desktop navigation based on the outer viewport rather than its own
  available width.
- The action group had no canonical positioning hook. Cart badge placement
  depended on an inline `position: relative` in Shopify and on site-only Button
  styling in Studio.
- Studio search/account/cart actions visually recreated icon buttons instead of
  consuming the canonical Button component.
- Navigation links were slightly below the shared 44px target, physical
  top/right/bottom properties reduced RTL portability, and the logo fixture
  supplied a redundant accessible label despite visible brand text.
- Shopify has a dedicated section and data mapping, but its shared search/cart/
  mobile runtime remains incomplete and is intentionally not solved ahead of
  the dependent overlay batches.
- The owner Studio reference is a generic frame. It supports retaining the
  Gallery wordmark, restrained underline, neutral border, and icon-action
  composition, not choosing new action priorities or a new navigation model.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) | A top-level body-scoped `header` implies `banner`; `nav` implies `navigation`; repeated landmarks need useful distinct labels. | Use native header/nav and avoid redundant role names in labels or `role="banner"`. |
| [WAI banner example](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html) | A page normally has one top-level banner containing site identity and site-oriented tools. | Treat Header as page-shell composition, not a repeatable section header. |
| [Open UI Navigation Bar explainer](https://open-ui.org/components/navigation-bar.explainer/) | Navigation bars with disclosures remain an early proposal; it explicitly separates page navigation from application menubars and draws from disclosure patterns. | Keep ordinary links now and leave rich/mega-menu behavior target-owned. |
| [Radix Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu) | Decomposes root/list/item/trigger/content/link and controls advanced popup/focus behavior. | Do not copy that React API into Header; compose a future Mega Menu adapter when accepted. |
| [Shopify section groups](https://shopify.dev/docs/storefronts/themes/architecture/section-groups) | Header groups can contain reorderable Header and Announcement sections and support contextual market overrides. | Shopify owns merchant schema, ordering, market context, and data; neutral Header owns classes and semantics. |
| [Shopify theme performance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/index) | Prefer HTML/CSS, minimize framework/runtime code, and load behavior progressively. | Keep base Header at `0 B` component JS; overlay services load/execute only when targets provide them. |
| [WCAG Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum) | Sticky headers must not fully cover the focused component. | Page shells own scroll padding/offset because Header cannot know surrounding layout. |

Polaris React's former Top Bar/Frame navigation is deprecated and admin-specific.
It is evidence against treating an application shell API as the neutral
storefront Header contract.

## Anatomy And Canonical Composition

| Part | Required | Semantic element | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | body-scoped `header` when used globally | Header | Sticky/container composition. |
| Logo | yes | native `a` with text or image | target | Identifies and links home. |
| Navigation | no | labelled `nav` | target | Contains native destination links. |
| Navigation link | no | `a` | target | May carry `aria-current="page"`. |
| Actions | no | neutral grouping `div` | Header | Layout only, no toolbar key model. |
| Action | no | canonical Button or native Link | dependency/target | Adds `.header__action` positioning hook. |
| Cart count | no | hidden-from-name visual badge | Header/target | Count is mirrored in action name. |
| Mobile trigger | no | canonical Button | dependency/target | Gains expanded/control semantics only when connected. |

Header does not duplicate Button markup, hover, focus, active, disabled, icon,
or target-size behavior.

## State, Variant, Size, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One sticky/default masthead and one default density. |
| Navigation | default, hover, focus-visible, current page. |
| Compact | below Header-container 48rem: nav hidden, optional trigger visible. |
| Expanded | at/above Header-container 48rem: nav visible, trigger hidden. |
| Actions | canonical Button/Link states owned by dependencies. |
| Cart count | absent, zero/empty, single/multiple digits, target formatted. |
| Long content | brand, nav and actions remain contained; target prioritizes actions. |
| RTL | logical sticky/border/badge positioning and inherited reading order. |
| Reduced motion | navigation transition removed; Button follows its own rule. |
| Forced colors | border/current/focus/badge remain visible in system colors. |

Centered, transparent, overlay, split-row, logo-only, mega-menu, locale/currency,
and announcement-integrated variants are not accepted Header modes.

## Public API And Ownership

- `logo` — required brand slot.
- `logoHref` — required home destination.
- `logoLabel` — optional only when visible text/image alternative is insufficient.
- `navigationLabel` — optional accessible name for primary navigation.
- `navigation` — optional target-owned destination slot.
- `actions` — optional canonical Button/native Link slot.
- `cartCount` — optional target-formatted visible count mirrored in action name.
- `mobileMenuTrigger` — optional canonical Button connected by a target runtime.
- Header has no controlled/uncontrolled state. Connected targets own open/value
  state for Mobile Menu, Drawer, Search Overlay, Cart Drawer, and Mega Menu.
- Header emits no synthetic global event. Native Button/Link activation reaches
  the target controller directly.

## Token And Hardcoded-Value Audit

- Public Header tokens cover surface/border/focus/text, inherited Button colors,
  container/touch/element spacing, heading/body typography and line height,
  sticky z-index, badge radius, and navigation transition/easing.
- Private: 4rem minimum masthead height, 48rem composition threshold, 8/24px
  local gaps, 32px image height, 18px badge geometry, 11px badge type, 2px
  underline/focus, and weights. These are concrete current visual facts, not
  cross-target semantic API.
- The 48rem value preserves the old 768px threshold; only its reference frame
  changes from viewport to component container.
- Badge positioning moved from physical top/right and Shopify inline style to a
  reusable logical `.header__action` hook.
- No new public component token or neutral runtime was introduced.

## Accessibility And Interaction

- Use one top-level Header/banner per page document; nested demos avoid manually
  assigning banner role.
- Give primary navigation a concise purpose label and mark the current
  destination with `aria-current="page"` where applicable.
- Use native links for destinations and native/canonical Buttons for actions.
  `.header__actions` is not an ARIA toolbar and retains normal Tab order.
- A connected mobile trigger synchronizes `aria-expanded` and `aria-controls`;
  the unconnected docs fixture is only an action-composition example.
- Include cart quantity in the cart action accessible name; hide the decorative
  badge from duplicate name calculation. Dynamic update timing is cart policy.
- The page shell must preserve focused/fragment content below a sticky Header.

## Responsive And Performance

- Test 320/768/1440/1920, narrow embedded containers at wide viewports, long
  localized brand/nav labels, zero and multi-digit cart counts, action omission,
  RTL, dark, reduced motion, forced colors, zoom, and horizontal overflow.
- The base component runtime budget is `0 B`; Header owns no listeners,
  observers, timers, polling, requests, provider, or layout-read loop.
- Canonical Global CSS uses the permanent `3.7 KiB` gzip family ceiling and the
  complete Neutral Web bundle uses `64 KiB`. Any excess is a documented review
  gap, not permission to change the rubric.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native header/nav/links plus canonical Buttons; container CSS owns composition. | Base CSS/renderer implemented; page-shell services target-owned. |
| Shopify | Section maps shop logo, menu, routes and cart count; Buttons carry Header hook. | Markup present; search/cart/mobile runtime and action priority remain planned target work. |
| React / Angular | Slots/children for brand, nav and actions; routers derive current; overlay controllers own state. | Planned. |
| Figma | Masthead/logo/nav/actions/count/trigger anatomy and compact/expanded states. | Studio metadata validates; action priority is not a variant. |
| SwiftUI / Compose | Platform top app/site bar composition with native navigation/action semantics. | Conceptual mapping; not a direct sticky-web translation. |

## Exhibit And Studio Parity

The single `GlobalStudio` renderer and one fixture serve Exhibit and Studio.
Search, account, cart, and menu actions now consume canonical Button classes and
icons; the cart badge uses the shared positioning hook; visible brand text names
the home link without a redundant fixture label.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Viewport breakpoint failed embedded Header composition. | high | Preserve 48rem threshold as a Header container query. | implementation |
| Studio recreated icon buttons outside Button. | high | Compose canonical Button and keep site fixture classes non-visual. | implementation |
| Cart badge required target inline positioning. | high | Add neutral `.header__action` hook and logical inset. | implementation |
| Sticky focus offset cannot be solved inside Header alone. | medium | Document page-shell responsibility and test visibility. | target |
| Action priority and overlay runtime remain unresolved. | non-blocking for base review | Keep explicit under ADR 0086/Open Questions. | owner/architecture later |

## Evidence And Validation

- Contemporary before: Exhibit and Studio desktop captures under
  `output/playwright/refinement-batch-15/before/`.
- After: eight canonical Exhibit/Studio × Mobile/Tablet/Desktop/XL captures plus
  expanded 900px host, localized RTL nav overflow, dark keyboard focus, and
  forced-colors/reduced-motion evidence under
  `output/playwright/refinement-batch-15/after/`.
- Compact mobile keeps root `358/358px`; expanded host keeps root `900/900px`,
  exposes a `491px` nav, and hides the menu trigger. Localized RTL keeps root
  `900/900px` while nav owns `552/760px` visible/scroll width.
- Light logo/current/normal/badge contrast is
  `17.93:1`/`17.93:1`/`7.81:1`/`10.37:1`. The measured `3.56:1` orange current
  text gap was corrected by using primary text with an accent underline.
- Global CSS is `3,624 B / 3.7 KiB`; Header adds `0 B` neutral runtime. Contracts,
  Studio, docs/registry, public tokens, Web/Shopify adapters, copy parity,
  TypeScript, temporary Vite build, program audits, deterministic gzip, diff
  checks, and `site/dist` cleanliness pass in Batch 15.

## Risks And Open Questions

1. Action inventory and priority by breakpoint remain owner decisions.
2. Search, cart, mobile navigation, and mega-menu controllers remain target
   architecture; the current Shopify shared runtime is not certified here.
3. Sticky offset, multi-row behavior, nav scrolling, height, wordmark scale,
   border, underline, icon treatment, and badge geometry need human review.
4. A future Section Group architecture may compose Announcement and Header in a
   shared sticky shell; this batch does not assume it.

## Readiness Decision

Ready for explicit human review of the neutral masthead composition. Container
response, canonical dependencies, semantics, content resilience, accessibility,
target boundaries, evidence, and validation are reconciled. Visual approval and
production global-service architecture remain open; the contract stays `pilot`.
