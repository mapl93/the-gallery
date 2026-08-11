# Component Dossier: Breadcrumb

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/breadcrumb.contract.json`

## Recommendation

Keep Breadcrumb as a passive, named navigation landmark whose path is an
ordered list of consumer-owned destinations. Require list and item anatomy,
retain `label` and `currentLabel` as the only semantic properties accepted by
ADR 0071, preserve explicit separators as hidden visual content, and let long
labels wrap rather than silently truncating or removing hierarchy.

Do not add collapse, ellipsis, history, overflow-menu, maximum-item, or
responsive replacement behavior without owner direction. Those modes change
which ancestors remain visible and therefore require product and accessibility
decisions beyond a neutral styling contract.

## Purpose And Limits

- Shows the current page's position within a hierarchical information
  architecture and provides direct links to ancestors.
- Useful before page-level content when parent destinations help orientation or
  lateral recovery.
- Not browser history, primary navigation, a stepper, pagination, or a generic
  slash-separated metadata row.
- The target owns route truth, localized labels, destination URLs, hierarchy,
  current-page derivation, and whether the current page is a link.
- One current page and at least one ordered item are required. An empty path is
  invalid and should not render a Breadcrumb.

## Gallery Baseline Before This Batch

- Registry `B8`, Layout, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS styled `.breadcrumb` itself as a wrapping flex row, but the
  shared renderer emitted sibling spans rather than the ordered list already
  shown in `docs/COMPONENTS.md` and the Shopify snippet emitted an unclassed
  `ol/li/a` subtree that did not consume the class contract.
- The contract described item wrappers as optional, had no list anatomy or
  focus-visible state, and still referenced calculated body typography.
- Long labels could wrap at the root but had no item-level intrinsic-width or
  `overflow-wrap` protection. Linked ancestors had no explicit focus ring.
- The owner reference in Studio points to the shared generic frame. It supports
  preserving the existing restrained slash treatment, not inventing a collapse
  affordance, compact variant, or alternate separator.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) | Defines a named navigation landmark, parent-page links in hierarchical order, and `aria-current="page"` when the current item is linked. It adds no composite keyboard model. | Keep native link navigation and one current page; do not add roving focus or custom keys. |
| [Open UI Breadcrumb design guide](https://open-ui.org/components/breadcrumb/) | Proposes required nav, ordered-list, and list-item anatomy with hidden visual dividers; collapse semantics remain an open discussion. | Add explicit `ol/li` anatomy and keep responsive collapse outside v1. |
| [WHATWG breadcrumb idiom](https://html.spec.whatwg.org/dev/semantics-other.html#breadcrumb-navigation) | HTML has no dedicated breadcrumb element; ordinary links inside `nav` are sufficient. | Use native HTML rather than a custom role or runtime widget. |
| [Polaris Page guidance](https://polaris-react.shopify.com/components/layout-and-structure/page) | Recommends breadcrumbs for detail pages with parents and concise destination titles, but models them at the page/title-bar layer. | Route/page adapters supply records; the neutral component remains a passive path. |

Radix has no standalone Breadcrumb primitive. That absence is useful evidence:
the pattern is native navigation composition, not a behavior-heavy controlled
widget.

## Anatomy And Composition

| Part | Required | Semantic element | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `nav` | Breadcrumb | Requires a useful accessible name. |
| List | yes | `ol` | Breadcrumb | Preserves hierarchy and item count. |
| Item | yes | `li` | consumer/target | Repeatable ordered record. |
| Link | no | `a` | consumer/target | Ancestor destination with native behavior. |
| Separator | no | hidden text/icon | Breadcrumb/target | Visual only, `aria-hidden="true"`. |
| Current | yes | text or `a` | consumer/target | Carries `aria-current="page"`. |

There is no canonical component dependency. Target link adapters may compose
the Link primitive only when they preserve native destination semantics; the
base class contract does not require that wrapper.

## State, Variant, Size, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One slash-separated treatment and one default density. |
| Link state | default, hover, and focus-visible. |
| Current state | exactly one current page, visually stronger than ancestors. |
| Layout | full path wraps within available inline size. |
| RTL | source order remains hierarchy order; logical spacing follows direction. |
| Reduced motion | link color transition removed. |
| Forced colors | link/current/separator and focus remain distinguishable. |
| Content | short, long, localized, unbroken, and multiple ancestor labels. |

Collapse, middle-item hiding, ellipsis, scrolling, overflow menus, alternate
separators, icons, and schema.org metadata are unsupported v1 extensions.

## Public API And State Ownership

- `label` — optional string, default `Breadcrumb`, used as the navigation name.
- `currentLabel` — required visible current-page label.
- Intermediate items, URLs, separator glyphs, and current-route derivation stay
  consumer-owned under ADR 0071.
- Controlled/uncontrolled state does not apply. Navigation and current state are
  derived from the target router/document rather than mutated by Breadcrumb.
- Native link activation is the only event surface. The component emits no
  selection or change event and owns no history state.

## Token And Hardcoded-Value Audit

- Public: secondary/accent/disabled/primary/focus colors, fast transition,
  standard easing, body-small family/size/line-height, element spacing, and the
  touch-target token.
- Private: quarter element gap and half element block padding are compositional
  calculations, not consumer-facing choices.
- Removed from the component: raw `8px` gap and calculated `0.875` body scale.
- Remaining `2px` focus width/offset and weight `500` follow established shared
  focus/type patterns; they remain private pending human visual review.
- No JavaScript, observer, timer, measurement, asset, network request, or hidden
  runtime owner is required.

## Accessibility And Interaction

- Name the `nav`; keep an ordered `ol/li` hierarchy; hide separators; expose one
  `aria-current="page"`.
- Native `Tab`, `Shift+Tab`, Enter, modifier-click, context menu, visited state,
  and destination semantics remain browser-owned.
- Preserve visible focus and do not add arrow-key or roving-tabindex behavior.
- Keep the complete path available at 320 CSS px and at 200%/400% zoom. If a
  future product mode hides ancestors, it must preserve orientation and access
  through an explicitly reviewed disclosure.

## Responsive And Performance

- Test Mobile/Tablet/Desktop/XL, 320px narrow width, RTL, long localized labels,
  unbroken current labels, one item, many items, dark, reduced motion, and
  forced colors.
- Neutral runtime budget is `0 B`; all behavior is native links.
- Breadcrumb belongs to Layout CSS and shares the documented ADR 0099 family
  exception. This batch must not change the `4.8 KiB` ceiling or evade the total
  `64 KiB` Neutral Web ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `nav > ol > li`, native links, hidden separators, one current item. | Implemented and browser-evidenced. |
| Shopify | Liquid derives Home, optional collection, and product from route objects using the same classes. | Structural/class parity implemented; localization of Home remains target work. |
| React / Angular | Records map to native anchors and route-derived current state; no local selection owner. | Planned. |
| Figma | Root/list/repeated item anatomy plus ancestor/current/focus states and wrap note. | Studio metadata validates; responsive collapse not represented. |
| SwiftUI / Compose | Native hierarchical navigation links or platform breadcrumb equivalent where available. | Conceptual mapping only. |

## Exhibit And Studio Parity

The single `DisclosureNavigationStudio` renderer and its three-item fixture
serve Exhibit and Studio. Both now render the ordered list, identical links,
hidden separators, current state, token controls, and long-content behavior.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Shared renderer omitted the documented ordered list. | high | Reconcile renderer, contract, MDX, and Shopify to `nav/ol/li`. | implementation |
| Shopify emitted no component part classes below root. | high | Apply canonical list/item/link/separator/current classes. | implementation |
| Keyboard focus had no explicit visual state. | medium | Add existing focus-token ring. | implementation |
| Long/current labels lacked item containment. | medium | Wrap without hiding the path. | implementation |
| Collapse and alternate separator behavior lack owner direction. | non-blocking | Keep unsupported and explicit. | owner/product later |

## Evidence And Validation

- Contemporary before: Exhibit and Studio desktop captures under
  `output/playwright/refinement-batch-15/before/`.
- After: eight canonical Exhibit/Studio × Mobile/Tablet/Desktop/XL captures plus
  localized mobile, keyboard focus, hover, dark, and forced-colors/reduced-motion
  evidence under `output/playwright/refinement-batch-15/after/`.
- Accessibility exposes named navigation, ordered list/listitems, native ancestor
  links, hidden separators, and one current item. Extreme localized mobile content
  preserves `358/358px` stage and `326/326px` component client/scroll widths.
- Light link/current contrast is `7.81:1`/`17.93:1`; hover text is `17.93:1`
  with the accent reserved for underline. Dark, focus, reduced-motion, and
  forced-color treatments remain visible.
- Contracts, Studio, docs/registry, public tokens, generated Web/Shopify adapters,
  copied CSS parity, TypeScript, temporary Vite build, program audits, deterministic
  gzip, diff checks, and `site/dist` cleanliness pass in Batch 15.

## Risks And Open Questions

1. A future mobile collapse policy changes accessible hierarchy and requires an
   explicit owner decision; v1 wraps instead.
2. Separator glyph, weight, focus ring, target height, and vertical rhythm need
   human visual approval.
3. Shopify localization and routes beyond product/collection are adapter data,
   not neutral Breadcrumb defaults.

## Readiness Decision

Ready for explicit human review. The implementation, native hierarchy, route/data
boundary, content resilience, accessibility, targets, evidence, and validation are
reconciled. Visual approval and any future collapse policy remain human decisions;
the contract stays `pilot`.
