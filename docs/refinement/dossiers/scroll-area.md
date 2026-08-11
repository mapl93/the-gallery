# Component Dossier: Scroll Area

Status: `research-complete`

Target reviewed: Neutral Web

Contract: `components/contracts/scroll-area.contract.json`

## Recommendation

Keep Scroll Area as one native scroll container with progressive standard CSS
scrollbar styling. Do not create custom scrollbar DOM, drag handlers, hidden
thumb state, orientation properties, or a JavaScript position mirror. When
overflow content is not otherwise reachable through focusable descendants, the
consumer makes the container focusable and gives it a meaningful accessible
name/region role. Add a canonical focus-visible boundary and let forced colors
restore the user agent scrollbar palette.

Retain `label` as the only optional semantic property. Bounds, axis, content,
padding, scroll position, restoration, end affordances, and scroll events remain
consumer/target layout decisions. A short/non-overflowing region should not add
an unnecessary Tab stop solely because the class is present.

## Purpose And Limits

- Contains content whose available block or inline space is intentionally
  bounded while preserving native scrolling.
- Supports pointer, touch, wheel, trackpad, scrollbar, and platform keyboard
  behavior without custom key handling.
- Not a virtual list, infinite loader, Carousel, drag surface, scroll spy,
  custom cross-platform scrollbar component, or source of layout bounds.
- v1 styles the native scrollbar progressively and never makes the scrollbar the
  only content-discovery affordance.

## Gallery Baseline Before This Batch

- Registry `B16`, Layout, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS uses `overflow:auto`, standard thin `scrollbar-width/color`, and
  WebKit pseudo-elements with a hardcoded 6px thickness.
- There is no focus-visible treatment, forced-colors reset, coarse-pointer
  accommodation, or documented non-overflow omission rule.
- The renderer supplies `tabindex=0` and `aria-label` but no explicit named
  region semantics. It proves only vertical overflow and does not exercise
  horizontal, empty, short, extreme, RTL, or nested-focus content.
- The component correctly adds no runtime; content typography, padding, border,
  radius, and bounds are site fixture presentation rather than component API.
- The Studio design reference is shared rather than component-specific.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [CSS Overflow Level 3](https://www.w3.org/TR/css-overflow/) | A scroll container exposes a scrollport and native user/script scrolling whose origin follows writing mode. | Preserve native overflow and avoid a physical position model in neutral source. |
| [CSS Scrollbars Level 1](https://www.w3.org/TR/css-scrollbars-1/) | Standard scope is color and thickness; exact internal scrollbar structure is intentionally out of scope, prefixed pseudo-elements are non-standard, and custom colors need contrast. | Standard properties are primary; WebKit styling is best-effort enhancement, not contract anatomy consumers rely on. |
| [Radix Scroll Area](https://www.radix-ui.com/primitives/docs/components/scroll-area) | Radix augments native scrolling and explicitly avoids transform-positioned content; keyboard behavior remains native and platform-specific. | Gallery's simpler CSS-only boundary is preferable until a real custom-scrollbar requirement exists. |
| [Shopify ScrollBox](https://shopify.dev/docs/api/pos-ui-extensions/2026-01-rc/polaris-web-components/layout-and-structure/scrollbox) | Shopify exposes a bounded host scroll container for long lists and modal content while the target owns dimensions and content. | Shopify should map to host ScrollBox where available or the shared native class, not copy WebKit internals. |
| [Shopify Polaris Web Components](https://shopify.dev/docs/api/polaris/using-polaris-web-components) | Target components own accessibility and container-responsive layout within their surface. | Bounds/responsive values remain adapter/consumer layout, not neutral Scroll Area properties. |

## Matches, Differences, And Direction

- Native scrolling and the absence of custom runtime are aligned with standards
  and Radix's stated accessibility rationale.
- Treating WebKit pseudo-elements as named anatomy overstates their portability;
  keep them generated implementation details.
- Focus and forced-color behavior are the blocking gaps. Orientation, type,
  scrollbar visibility timers, and scroll position should not enter public API.
- Direction: one root, standard-first styling, conditional semantics, clear
  focus, platform behavior, and evidence across both axes.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root/viewport | yes | native scroll container; named `role="region"` only when useful | Scroll Area/consumer | `tabindex=0` only when keyboard access is otherwise absent. |
| Content | yes | normal authored descendants | Consumer | DOM/focus order remains unchanged. |
| Scrollbar | generated | user-agent control | Platform | Standard styling is progressive. |
| Track/thumb | generated | user-agent control | Platform | WebKit pseudo-elements are optional implementation hooks, not portable slots. |

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One native scroll area; bounds and scrollbar platform metrics are not component properties. |
| Axis | Block, inline, or both derive from content/bounds and writing mode. |
| Overflowing | Native scrollbar/gesture/keyboard access; focus boundary when root is tabbable. |
| Not overflowing | No forced scrollbar and no unnecessary Tab stop/region landmark. |
| Empty | Omit the scroll region or render a meaningful consumer empty state; do not expose a blank named landmark. |
| RTL | Native inline origin and scrollbar placement; no physical position mirroring code. |
| Coarse pointer | Native touch scrolling; avoid forcing a thin mouse-oriented scrollbar. |
| Forced colors | `scrollbar-color:auto` and system focus boundary. |
| Reduced motion | Not applicable; no authored motion or runtime. |

## Public API And State Ownership

- `label`: optional accessible name when a focusable/landmark scroll region lacks
  an adequate surrounding label. Empty string omits the name.
- Consumer markup owns `role="region"`, `aria-labelledby`, and `tabindex` based
  on context and actual overflow; an adapter may derive these from `label`.
- Bounds, axis, padding, content, initial/restored position, end shadows, scroll
  events, infinite loading, virtualization, and programmatic controls are target
  composition/behavior.

## Token And Value Audit

- Existing subtle/default border colors and full radius style native scrollbars;
  the focus boundary additionally needs the accepted focus-border token.
- Six pixels is a private WebKit enhancement, not public size API. Coarse pointer
  should return to platform `auto` rather than invent a large tokenized thumb.
- Fixture border, radius, padding, headings, text, width, and height remain site-
  owned evidence and are not Scroll Area token references.
- No component-scoped public token is justified.

## Accessibility And Interaction

- Native scroll operations remain untouched; no Arrow/Page/Home/End listeners
  replace platform behavior.
- Add a visible focus ring when the root is tabbable. Nested focusable content
  keeps normal DOM order and can scroll into view through native focus behavior.
- Name/landmark semantics are contextual to avoid noisy generic regions.
- Custom scrollbar color is never the only boundary and returns to system colors
  under forced-color preferences.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus keyboard/page scrolling,
  focus, horizontal/both-axis extremes, short/empty behavior, RTL, dark, forced
  colors, coarse pointer, and nested focus content.
- Passive runtime remains `0 B`: no listener, observer, timer, request, asset,
  transform, or position mirror.
- Batch 19 begins at Layout `6,357 B`, Web component CSS `62,893 B`, and shared
  runtime `10,321 B` deterministic gzip. Layout is already `1,442 B` over the
  provisional `4.8 KiB` ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native overflow container with standard-first scrollbar styling and conditional region/focus semantics. | CSS exists; focus/special-media refinement pending. |
| Shopify | Host ScrollBox where available or Liquid container with shared class and target-owned bounds. | Shared class mapping implemented. |
| React / Angular | Native element/ref plus optional label and consumer scroll callbacks. | Planned; no custom position state required. |
| Figma | Bounded viewport/content examples; scrollbar is platform evidence, not a semantic component slot. | Planned. |
| SwiftUI / Compose | Native ScrollView with target axes, labels, and indicators. | Planned. |

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Focusable region has no focus-visible boundary. | high | Add accepted focus-token outline. | implementation |
| Forced colors retains author scrollbar colors. | high | Restore `scrollbar-color:auto` and system focus. | implementation |
| Contract overstates WebKit pseudo-elements as portable anatomy. | medium | Mark them generated/platform-owned and center the root/content contract. | implementation |
| Renderer proves only vertical mouse-style overflow. | medium | Add real keyboard, both-axis, nested-focus, RTL, and special-media evidence. | implementation |
| Custom DOM scrollbar/orientation/size API is unsupported by requirements. | non-blocking | Keep CSS-only native v1. | owner/product later |

## Risks And Open Questions

1. Exact scrollbar tint/thickness and focus boundary lack a component-specific
   owner visual and need human review across platforms that expose scrollbars.
2. A future always-visible custom scrollbar, end shadows, or restoration API
   would require a new product/runtime decision and must not be inferred from
   Radix.
3. Target accessibility heuristics for automatically adding a Tab stop/region
   from measured overflow remain adapter policy; neutral HTML stays contextual.

## Readiness Decision

Research complete. Implementation, evidence, automated validation, and explicit
human review remain required. The contract stays `pilot`.
