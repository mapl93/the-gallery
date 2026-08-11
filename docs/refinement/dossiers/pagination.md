# Component Dossier: Pagination

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify collection translation

Contract: `components/contracts/pagination.contract.json`

## Recommendation

Keep Pagination as a passive, named navigation landmark for a bounded set of
result pages. Its Web anatomy should be `nav > ul > li`, with native anchors for
available destinations, one non-interactive current-page indicator marked with
`aria-current="page"`, and hidden non-interactive ellipses for skipped ranges.
Previous and next destinations should be omitted at real boundaries instead of
leaving focusable anchors with `aria-disabled="true"`.

Compose canonical Link on every destination, keep the current page as text, and
let the target supply the ordered page window and URLs through `pageItems`.
`currentPage` remains a semantic projection used by Studio and adapters; it does
not authorize a neutral paging algorithm or local state store. Native Web and
Shopify use URL navigation as the source of truth. Framework adapters may expose
a controlled current page plus navigation request, but must preserve a real
destination whenever navigation is possible.

The current restrained primary-current / quiet-destination visual treatment can
advance to human review. Review must still approve page density, wrap behavior,
directional icon treatment, and the inherited primary-action color before
`stable` promotion. No new product or architecture decision is required for the
safe neutral contract.

## Purpose And Limits

- Moves between discrete pages of one ordered, bounded result collection.
- Primary contexts are collection, search, account history, article, and other
  finite server- or target-paginated result surfaces.
- Pagination owns the navigation landmark, ordered destination presentation,
  current-page indication, directional destinations, ellipsis treatment, focus
  visibility, and wrap-safe control layout.
- The target owns result data, total pages, page-window calculation, URL or
  cursor translation, filter/sort preservation, request/cancellation, loading,
  errors, result replacement, scrolling, focus restoration, announcements,
  analytics, prefetch, and browser history.
- Collection Grid owns result layout; Filters owns query controls; Empty
  Collection owns no-result recovery.
- It is not tabs, a carousel indicator, an APG composite widget, infinite
  scrolling, “load more,” or Review Pagination's action-oriented provider flow.
- When there is only one page, the target should omit Pagination entirely.

## Current Gallery Baseline

- Registry `E4`, category `collection`, no dependencies; contract `0.1.0`,
  `pilot`; one default variant and size, four anatomy parts, five states, two
  behaviors, three properties and thirteen public tokens.
- The shared renderer places links and spans directly inside `nav`; assistive
  technology receives no explicit list structure or item count.
- Studio hard-codes four numbered pages, always appends an ellipsis with no last
  destination, and keeps previous/next anchors in the tab order at boundaries
  with `aria-disabled="true"` and `pointer-events: none`.
- Direct browser evidence at page one and page four confirms those unavailable
  anchors remain `tabIndex=0`. At the initial page three the root is `326px`
  wide in the Mobile Studio; the existing non-wrapping row has no narrow-
  container recovery.
- Current-page selection is fixture-controlled and prevents link navigation.
  This is acceptable only as Studio evidence; the neutral contract must retain
  native URLs and must not require JavaScript.
- `.pagination__link` animates background without a reduced-motion override.
  The transition and easing tokens are therefore public despite adding no
  essential semantic value.
- MDX recommends disabling boundary links and conditionally retaining them,
  while the Shopify implementation already omits them. The two targets describe
  different boundary behavior.
- Shopify has real `paginate.previous`, `paginate.parts`, current, ellipsis and
  `paginate.next` Liquid mapping, but the contract incorrectly marks the adapter
  `planned`. The markup lacks list/item anatomy and localized numeric-page
  accessible labels.
- Existing parity screenshots cover only Mobile and Desktop. They do not prove
  Tablet/XL, first/middle/last/single-page states, long page numbers, localized
  labels, narrow wrapping, RTL, dark mode, forced colors or reduced motion.
- The complete neutral Web CSS has only `5 B` gzip headroom, so refinement must
  remove obsolete transition/disabled styling while adding structure.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI navigation menu structure](https://www.w3.org/WAI/tutorials/menus/structure/) | Native navigation is commonly represented as a list; the current page may be non-interactive text, and `aria-current="page"` is appropriate when a current link remains. | Use list semantics and preserve the existing non-link current page without inventing a widget role. |
| [WAI ARIA26](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA26) | `aria-current` identifies the one visually current item in a related set. | Exactly one current page must be exposed; ellipses and directional links are never current. |
| [APG Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Native `a[href]` is strongly preferred because it supplies navigation, Enter activation, context menus and browser behavior. | Page destinations remain real native links; actions and synthetic link roles are excluded from the neutral Web baseline. |
| [APG keyboard interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) | Disabled elements should leave sequential focus when nearby controls make the unavailable action inferable; focusable `aria-disabled` is mainly useful in composites where discoverability is required. | Omit previous/next links at boundaries instead of exposing dead focus stops in an ordinary navigation list. |
| [W3C Design System Pagination](https://design-system.w3.org/components/pagination.html) | Uses a uniquely named `nav`, a native list, page links, ellipses and one `aria-current="page"` item. | Confirms list anatomy and current-page semantics, while its fully linked current page remains an alternative rather than a requirement. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | Pagination appears as a cross-system research name but has no standardized Open UI component or browser primitive. | Do not invent a cross-browser Pagination role, element, page-window algorithm or controlled-state protocol. |
| [Radix Primitives inventory](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix provides behavior-heavy ARIA primitives but no Pagination primitive. | Ordinary link/list composition is sufficient; a React runtime primitive is not required. |
| [Polaris Pagination](https://polaris-react.shopify.com/components/navigation/pagination) | Supports previous/next URLs or callbacks, availability flags, labels and platform-specific presentation; it disables unavailable directional actions. | Preserve URL-first navigation and target-owned availability, but do not import the admin-only button model or mobile infinite-scroll policy. |
| [Shopify Liquid `paginate`](https://shopify.dev/docs/api/liquid/tags/paginate) and [`paginate` object](https://shopify.dev/docs/api/liquid/objects/paginate) | `collection.products` can be split into pages; the object supplies current page, total pages, previous, next and parts. | Shopify owns page generation and URLs and can map every neutral anatomy part without client runtime. |
| [Shopify Dawn Pagination](https://github.com/Shopify/dawn/blob/main/snippets/pagination.liquid) | Dawn uses a named navigation list, real previous/next/page URLs, localized numeric-page labels and target-owned `paginate.parts`. | Adopt the source-backed Liquid data mapping and list anatomy without copying Dawn's current-link or visual API. |

### Owner reference analysis

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct inspection shows the generic Studio shell and
Button pilot, not Pagination artwork. It supports the shared inspector layout
only and provides no evidence for page density, current treatment, ellipsis,
directional icons, narrow wrapping or boundary states. The repository candidate
therefore remains the visual proposal for human review; no Pagination aesthetic
was inferred from unrelated artwork.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named `nav.pagination` | Pagination | One landmark for one result set; label is localized and distinguishes other navigation landmarks. |
| List | yes | `ul.pagination__list` | Pagination | Ordered DOM sequence with native list grouping; page numbers themselves carry the order. |
| Item | yes | repeated `li.pagination__item` | Pagination / target | Contains exactly one destination, current indicator or ellipsis. |
| Link | optional/repeated | canonical `a.link.pagination__link[href]` | Link / target | Used for previous, next and available page destinations. |
| Current | exactly one when rendered | `span.pagination__current[aria-current=page]` | Pagination / target | Non-interactive current-page text; not a disabled pseudo-link. |
| Ellipsis | optional/repeated | hidden `span.pagination__ellipsis` | Pagination / target | Visual skipped-range marker; item and text are non-interactive and absent from the accessibility tree. |
| Directional content | optional | localized text or decorative icon inside Link | target | Icon-only links require localized accessible names and direction-aware art. |

Pagination composes canonical Link for every destination. It does not recreate
Link's href, activation, context-menu or relationship behavior. Its page-control
geometry and current/ellipsis treatments remain Pagination-owned because they
are not general inline-link variants.

## Variant, Size, State, And Mode Matrix

- Variant/size: one default visual treatment and one touch-friendly size. Page
  density and compact modes are not accepted public variants.
- Result size: zero/one page omits the component; two pages; short finite set;
  long set with one or more target-supplied ellipses; very high page numbers.
- Position: first page omits previous; middle page exposes both directions; last
  page omits next; exactly one item is current in every rendered set.
- Destination state: default, hover and focus-visible. Visited styling is not
  separately authored; browser history remains available without reducing
  contrast.
- Current state: one non-focusable primary surface; it has no hover, focus,
  disabled or activation state.
- Ellipsis state: passive, hidden from assistive technology, never focusable and
  never rendered as a link.
- Pending/error/result replacement: target lifecycle, not a visual state of the
  navigation source. A target may set surrounding busy/status semantics without
  converting links into a local store.
- Responsive: keep the ordered set visible and allow row wrapping inside the
  actual container. Hiding page destinations, switching to previous/next only,
  or changing the page window is target policy, not CSS.
- Themes: semantic colors inherit light/dark tokens. Forced colors must retain
  visible links, current distinction and focus. Removing the decorative
  transition makes reduced-motion state equivalent by construction.
- RTL: DOM page order remains ascending; target-provided directional icons must
  mirror while previous/next meanings and accessible names remain localized.

## Public API And State Ownership

Keep the existing three semantic properties:

- `label` — required localized non-empty navigation-landmark name.
- `currentPage` — required positive integer projection of the page represented
  by the one current item; Web may expose `data-current-page` for inspection.
- `pageItems` — required ordered composition slot containing native list items,
  destination URLs, one current item and optional ellipses.

Do not add `totalPages`, `windowSize`, `siblingCount`, `boundaryCount`,
`showFirst`, `showLast`, `compact`, `mobileMode`, `loading`, `scrollTo`,
`focusTarget` or URL-format properties. `pageItems` already carries the output
of those target decisions without making one algorithm canonical.

Static Web and Shopify have no uncontrolled local state: the current URL/query
and rendered result page are the source of truth. A React/Angular adapter may
accept controlled `currentPage` plus target-supplied items and a navigation
request, or render ordinary server URLs. It must not retain a second internal
page index that can disagree with URL, results or `aria-current`.

Native `click` is not a component event contract. Link activation, modified
click, open-in-new-context and history behavior remain native. A client target
may intercept the same links, but then owns request cancellation, pending state,
result replacement, focus, scroll, announcements and URL/history reconciliation.

## Token And Value Audit

- Public color tokens: `--color-text-secondary`,
  `--color-surface-secondary`, `--color-text-disabled`,
  `--color-button-primary-bg-default`, and
  `--color-button-primary-text-default`.
- Hover text, focus color, outline geometry, transition and reduced-motion
  handling remain canonical Link responsibilities rather than duplicate
  Pagination tokens or rules.
- Public spacing: `--space-button-min-height` owns the minimum interactive target
  and `--space-layout-section-gap` owns vertical placement.
- Public radius and typography remain `--radius-md` and `--typo-body-size`.
- Transition/easing tokens are removed. Navigation does not need animated hover,
  and instant feedback eliminates a reduced-motion exception while recovering
  CSS budget.
- Hardcoded `4px` gap, `12px` link padding, `8px` ellipsis padding and weight
  `600` remain private local composition. The repository has no narrower
  accepted semantic token that improves those relationships.
- List reset, item reset, wrap, destination geometry and current emphasis remain
  private CSS. Page-window size and item count are target data, not tokens.
- Collection-family budget is `2.5 KiB` gzip and total component CSS is `64 KiB`.
  The refinement must remain within both ceilings and may not reset them.

## Visual And Content Audit

- Preserve the quiet secondary destinations, neutral hover, strong current-page
  disk, medium radius, semantic minimum-target token and centered gallery
  rhythm. The current source modes resolve to `44px` on Mobile/Tablet and `40px`
  on Desktop/XL; both exceed the WCAG 2.2 minimum and remain a human-review
  density decision.
- Add native list/item wrappers without adding visible chrome.
- Use the real ellipsis glyph (`…`) in source examples. It is a visible skipped-
  range mark, not three characters, a disabled link or an action.
- Test two-digit and five-digit page labels, long localized previous/next names,
  mixed-script landmark labels, empty/invalid target input rejection, first/
  middle/last positions, short and long page sets, and multiple ellipses.
- A narrow container may wrap the ordered list without clipping, horizontal
  scrolling or viewport assumptions. Targets that want a smaller page window
  must calculate different `pageItems`; CSS must not silently hide semantics.
- Human review must approve current-page color, link/current radius, target size,
  `4px` gap, ellipsis rhythm, one- versus two-row narrow layouts, directional
  icon style, and the absence of a compact variant.

## Accessibility And Interaction

- Use one specifically named native navigation landmark and a native list.
- Use `a[href]` for every available destination. Tab traverses links in DOM
  order; Enter and modified activation remain browser-native. Do not add roving
  tabindex or arrow-key behavior.
- Mark exactly one non-interactive current indicator with
  `aria-current="page"`. Do not expose it as a disabled link.
- Omit previous/next links at boundaries. Do not use `aria-disabled` as a CSS-
  only substitute for removing navigation behavior.
- Hide ellipsis items from the accessibility tree and never make them focusable.
- Icon-only directional links require localized accessible names. Decorative
  SVGs are hidden. Visible directional text needs no duplicate `aria-label`.
- Preserve a visible focus ring with sufficient contrast in light, dark and
  forced-colors modes. Minimum interactive geometry remains owned by
  `--space-button-min-height` rather than a Pagination hardcode.
- If a client replaces results without full navigation, it owns one useful
  result announcement plus deterministic focus/scroll behavior. Pagination must
  not add a competing live region.

## Responsive And Performance

- The list uses intrinsic flex wrapping, so response follows the actual
  container and requires no viewport or container-query threshold.
- No page item is hidden by CSS. Visual and accessibility order stay equal.
- DOM/work are linear in supplied `pageItems`; targets must keep the page window
  finite. Rendering all 25,000 Shopify pages is invalid target input even though
  the platform can represent that range.
- Neutral runtime remains `0 B`: no listener, observer, state store, request,
  formatter, history mutation, focus manager or scroll behavior is added.
- Pagination loads no assets. Directional SVGs are target-provided and decorative.
- Removing transition and dead-disabled rules funds list/reset/wrap semantics
  under the exhausted global CSS ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named `nav`, `ul/li`, canonical native Links, one current span, hidden ellipses, target-supplied URLs/window, wrap-safe CSS. | Implemented without neutral runtime; full evidence required. |
| Shopify | `paginate.previous`, `paginate.parts`, `paginate.current_page`, `paginate.next`, localized link names and native URLs inside the collection section. | Real adapter exists; list anatomy and labels can be reconciled and validated now. |
| React / Angular | Server links or controlled page projection plus target-owned navigation request/result lifecycle; no internal duplicate page state. | Semantic adapter planned. |
| Figma | First/middle/last, short/long window, current, ellipsis, focus and one-/two-row narrow examples. | Planned; registered reference is generic Button artwork. |
| SwiftUI / Compose | Target-native page navigation or platform paging convention with equivalent current/destination meaning. | Conceptual; infinite scrolling is a separate target/product mode. |

## Exhibit And Studio Parity

- Exhibit and Studio must keep one CollectionStudio renderer, one fixture and
  identical initial outerHTML.
- The shared fixture should demonstrate a ten-page target-owned window, initial
  middle state, real list/item anatomy, canonical Links, omitted boundary
  destinations, one current item and one or two ellipses as appropriate.
- Studio may control `currentPage` only to exercise target-controlled evidence.
  It must clamp to the fixture total and update the rendered page window without
  suggesting that neutral Web owns the algorithm.
- The required `pageItems` slot remains visible and is not a useful on/off
  control. Appearance controls may reference only existing public tokens.
- Site-only icon sizing and fixture click interception may support evidence but
  must not become neutral runtime or a second rendering path.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Boundary anchors remain focusable with `aria-disabled`. | high | Omit unavailable previous/next destinations. | implementation |
| Navigation sequence lacks native list/item structure. | high | Add required `ul/li` anatomy across Web, Studio, MDX and Shopify. | implementation |
| Four-page fixture always shows a trailing ellipsis with no last page. | high | Use a coherent finite page-window fixture with target-owned first/current/neighbors/last output. | implementation |
| Pagination does not compose canonical Link. | medium | Add Link dependency and class composition for every destination. | implementation |
| Background transition ignores reduced motion. | medium | Remove decorative transition and public transition/easing tokens. | implementation |
| Non-wrapping row exceeds a narrow artwork root. | medium | Use intrinsic list wrapping; never hide page items in CSS. | implementation |
| Shopify is implemented but contract says planned. | medium | Reconcile status only after Liquid/theme validation passes. | implementation |
| Numeric Shopify page links have no localized contextual names. | medium | Add localized `Page {{ number }}` labels. | implementation / localization |
| Owner reference is unrelated generic Button artwork. | review | Present the repository candidate and explicit visual checklist to the human reviewer. | owner / design |
| URL/history/result/focus/scroll/status lifecycle varies by target. | architectural boundary | Keep it target-owned; add no neutral runtime or algorithm. | target / application |

## Certification Direction

Pagination may be marked `human-review-ready` after contract, canonical CSS,
shared renderer, MDX, registry, Shopify Liquid/locales, generated adapters,
four-viewport parity, first/middle/last/single-page, keyboard/focus, localized/
extreme/RTL, themes, forced-colors, reduced-motion, overflow, performance and
build validation all pass. It must remain `pilot` and cannot become `stable`
without explicit human approval.
