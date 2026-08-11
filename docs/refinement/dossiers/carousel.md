# Component Dossier: Carousel / Slider

Status: `research-complete`

Target reviewed: Neutral Web

Contract: `components/contracts/carousel.contract.json`

## Recommendation

Keep Carousel v1 as a finite, user-controlled native horizontal scroll-snap
collection. Use a named carousel region, one native scroll viewport, labelled
slide groups, canonical Icon Button previous/next controls, large-hit-area dot
buttons, one `aria-current="true"` dot, and an optional stable polite status for
target-coordinated changes. Do not autoplay in the canonical implementation.

Preserve the accepted item-level `current` and `disabled` properties. Slide data,
current index, visible-page calculation, direct-scroll synchronization, status
copy, and navigation events remain target collection state. Remove the root-wide
ArrowLeft/ArrowRight interception: native track scrolling should remain intact,
while explicit buttons/dots request exact slides and synchronize derived state.
Use logical placement and element-based `scrollIntoView()` so gaps, variable
widths, RTL, reduced motion, and responsive fixtures do not depend on physical
`scrollLeft` arithmetic.

## Purpose And Limits

- Browses a compact finite set of related media or content while preserving a
  visible route to adjacent items.
- Supports touch/native pan, keyboard scrolling of the viewport, explicit
  previous/next controls, and optional direct slide-picker buttons.
- Not primary navigation, an infinite feed, Tabs, a content-hiding substitute
  for a normal list/grid, or the Product Gallery composition.
- v1 has no autoplay, loop, drag library, variable pages-per-view property,
  virtualization, lazy-loading algorithm, or provider-owned analytics.
- Essential content and actions remain reachable outside or within normal DOM
  order; offscreen slides are not removed merely to create a visual effect.

## Gallery Baseline Before This Batch

- Registry `B15`, Layout, no declared dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS provides flex scroll snap, hidden scrollbar, custom 40px nav
  controls, 8px dots, smooth scrolling, disabled opacity, and active-dot color.
- Nav controls duplicate canonical Icon Button sizing, focus, hover, disabled,
  radius, and icon treatment; dots have an 8px pointer target and no explicit
  focus-visible or forced-colors treatment.
- Physical left/right positioning and `scrollTo(left = index × clientWidth)` do
  not account for gaps, variable slide widths, or RTL scroll-offset models.
- The renderer intercepts ArrowLeft/ArrowRight on the root, including bubbled
  events from child controls, while direct touch/wheel/keyboard scrolling does
  not synchronize dots or disabled controls.
- Slides have names but no carousel/slide roles or stable live status. The MDX
  preview includes only one of three declared slides.
- The Studio design reference is shared rather than component-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | A named region/group contains labelled slides and native Buttons for previous/next; direct slide pickers are optional. Auto-rotation requires pause/resume and must stop on focus/hover. | Keep v1 user-controlled and avoid rotation/provider complexity; expose clear structure and controls. |
| [Open UI Carousel research](https://open-ui.org/components/carousel.research/) | Mature systems vary widely across dots, controls, effects, position, easing, and pause/play concepts; no interoperable native component contract is accepted. | Preserve the small Gallery property boundary and treat Open UI as research, not target syntax. |
| [CSS Scroll Snap Level 1](https://www.w3.org/TR/css-scroll-snap-1/) | Scroll snap works with touch, wheel, scrollbars, keyboard, and scripted scroll; mandatory snap can make oversized content inaccessible if authored poorly. | Preserve native scrolling, use one slide/start snap, and avoid a transform-only controller. |
| [CSS Overflow Level 3](https://www.w3.org/TR/css-overflow/) | Scroll origins follow writing mode; API offset coordinate direction is not a portable logical model. | Navigate to slide elements rather than multiplying physical `scrollLeft`. |
| [Embla options](https://www.embla-carousel.com/docs/api/options/) | Mature engines separate slides, alignment, axis, grouping, breakpoints, loop, drag, and duration, including variable-width/visible-page concerns. | These are target engine choices, not neutral v1 scalar API. |
| [Shopify Polaris references](https://shopify.dev/docs/api/polaris) | Shopify surfaces provide target-native Web Components and host patterns rather than one portable carousel DOM/API. | Shopify adapters should prefer host media/gallery patterns where available and otherwise compose native scrolling plus bounded target JS. |

## Matches, Differences, And Direction

- Native scroll snap, finite controls, and item-level current/disabled state are
  aligned with the evidence.
- Custom nav chrome, tiny dots, physical geometry, incomplete semantics, and
  unsynchronized direct scrolling are the main implementation gaps.
- APG permits several picker patterns; Gallery should retain labelled Buttons
  rather than introduce Tabs because slides stay in the DOM and the existing
  public API is already item-current rather than tab-selected.
- Direction: canonical Icon Button composition, logical CSS, native scrolling,
  target synchronization, no autoplay, and no new root configuration property.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named `role="region"`, `aria-roledescription="carousel"` | Carousel/consumer | Label describes the collection, not the current slide. |
| Track | yes | focusable native scroll container | Carousel/target | Preserves touch, wheel, scrollbar, and keyboard scrolling. |
| Slide | yes | `role="group"`, `aria-roledescription="slide"` | Consumer | Named with position and authored label when useful. |
| Nav wrapper | no | presentational | Carousel | Logical placement only. |
| Nav button | no | canonical Icon Button | Icon Button/target | Previous/next name and `aria-controls`; disabled is derived. |
| Dots | no | named group | Carousel/consumer | Direct slide choices, not a required tablist. |
| Dot | no | native Button | Carousel/target | Large target with a small visual bullet and one current state. |
| Status | no | stable polite status | Target | Announces an explicit/current slide change without moving focus. |

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One horizontal user-controlled carousel and one density; slide size is content/layout data. |
| Current | Exactly one dot current when dots exist; track, nav, status, and current index synchronize. |
| Bounds | Previous disabled at first; next disabled at last; no implicit loop. |
| Direct scrolling | Touch/wheel/keyboard scroll updates nearest current slide and derived controls. |
| RTL | Logical start/end placement and slide-element navigation; icons mirror while previous/next meaning is preserved. |
| Narrow/container | Track remains native overflow; slides may be full or consumer-sized without page overflow. |
| Reduced motion | Scripted navigation becomes instant through CSS; native user scroll remains native. |
| Forced colors | Nav boundary/focus, visible dots/current state, and disabled controls persist. |
| Autoplay | Not supported in v1; any future rotation needs an explicit accepted property/service and pause lifecycle. |

## Public API And State Ownership

- `current`: per-dot derived semantic state mapped to active class and
  `aria-current="true"`.
- `disabled`: per-navigation-control derived state mapped to native `disabled`.
- Slide collection, IDs, labels, count, current index, page grouping, loop,
  autoplay, drag physics, lazy loading, virtualization, analytics, and status
  localization remain target/consumer data and behavior.
- Targets may expose controlled/uncontrolled current index and change events, but
  they serialize to the same current dot, controls, scroll position, and status.

## Token And Value Audit

- Existing tokens cover surfaces, text, subtle/focus borders, radius, shadow,
  disabled opacity, spacing, touch target, transition, and easing.
- Nav size/focus/disabled/transition should come from Icon Button. Carousel owns
  only placement, shadow/boundary treatment, track gap, and dot visual geometry.
- The visual 8px bullet is private geometry; the interactive target uses the
  existing touch-target token. No component-scoped public token is justified.
- Smooth scroll is semantic motion behavior and must switch to `auto` under
  reduced motion.

## Accessibility And Interaction

- Name the root carousel and each slide; use native Buttons with localized names.
- Keep the track keyboard-scrollable without intercepting arrow keys on the
  whole root. Child links/buttons retain their native keyboard behavior.
- Explicit nav/dot requests move to an exact slide and synchronize current,
  disabled, and status state. Direct scrolling performs the same synchronization.
- Dots expose one current item and visible focus; disabled controls never fire.
- No autoplay means no pause control or timing listener. Future autoplay cannot
  be added silently because APG requires stop/restart, focus, hover, and reduced-
  motion policy.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus direct scroll, keyboard focus,
  last-bound disabled, RTL/long labels, dark, forced colors, reduced motion, and
  many/variable-width slides.
- One scroll listener may be target-local and animation-frame throttled; no
  observer, timer, drag engine, network request, or neutral JS is added.
- Batch 19 begins at Layout `6,357 B`, Web component CSS `62,893 B`, and shared
  runtime `10,321 B` deterministic gzip. Layout is `1,442 B` over its provisional
  `4.8 KiB` ceiling; neutral runtime delta target is `0 B`.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named region + native scroll snap + canonical controls + target index/status synchronization. | CSS exists; semantic, logical, and lifecycle refinement pending. |
| Shopify | Host product/media gallery where available or Liquid slides with native overflow and bounded JS. | Planned; no dedicated adapter. |
| React / Angular | Controlled/uncontrolled index, slide collection, change events, element refs, and optional engine adapter. | Planned. |
| Figma | Track/slide/control/dot anatomy and first/middle/last/current/disabled states. | Planned. |
| SwiftUI / Compose | Native paged horizontal scroll with labelled pages and accessibility actions. | Planned. |

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Nav controls duplicate Icon Button. | high | Compose canonical Icon Button and declare the dependency. | implementation |
| Physical offset arithmetic fails gaps/RTL/variable widths. | high | Navigate to slide elements using logical scroll-into-view. | implementation |
| Direct scroll does not synchronize current/disabled state. | high | Add bounded target-local nearest-slide synchronization. | implementation |
| Root arrow interception conflicts with native/child behavior. | high | Preserve native track keyboard scrolling; remove root interception. | implementation |
| Dots are 8px targets with incomplete focus/special-media treatment. | high | Separate large Button hit target from private visual bullet. | implementation |
| Loop/autoplay/grouping breadth is unaccepted. | non-blocking | Keep finite user-controlled v1; record future product choices. | owner/product later |

## Risks And Open Questions

1. Exact nav surface/shadow, dot size/gap, slide peek, control placement, and
   density lack a component-specific owner visual and need human approval.
2. Whether future carousels support autoplay, loop, pages-per-view, variable
   widths, or a production engine is a product/target decision.
3. Product Gallery and collection sliders may need richer media/data behavior;
   that composition must consume this primitive rather than expand it silently.

## Readiness Decision

Research complete. Implementation, evidence, automated validation, and explicit
human review remain required. The contract stays `pilot`.
