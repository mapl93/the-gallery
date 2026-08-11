# Checkout Progress Indicator Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Checkout Progress Indicator (`P4`, dependency order `183`)

Contract: `components/contracts/checkout-progress.contract.json` `0.3.0`, `pilot`

## Outcome

P4 is now a passive checkout-context profile of canonical Steps instead of a
second stepper implementation. A valid rendering requires a non-empty localized
list name and ordered stage content. The target supplies completed, current and
upcoming truth; P4 owns no routing, navigation, validation, persistence,
announcements or checkout-state lifecycle.

Exhibit and Studio share one `StepsArtwork` renderer, fixture, omission rules,
DOM and canonical CSS. Wide P4 uses horizontal Steps; a named P4 container
stacks public canonical parts and hides decorative connectors at narrow widths.
Shopify is truthfully documented as a future Checkout UI Extension profile,
not a theme Liquid surface. No component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One passive named checkout-stage sequence; no progress percentage, form, route map, wizard controller or state machine. |
| Anatomy | pass | Passive wrapper plus canonical ordered list, item, connector, indicator, content, title, optional description and status text. |
| Required content | pass | Empty accessible label omits the complete root; required Steps composition cannot be disabled in Studio and source omission remains strict. |
| Variants, states and sizes | pass | One P4 profile over canonical upcoming/completed/current Steps; wide horizontal and private narrow stack are bounded. |
| Public API | pass | Two semantic properties: `accessibleLabel` and `steps`; no duplicate visual, layout, state or callback API. |
| State ownership | pass | P4 has no controlled/uncontrolled value. The target projects one authoritative checkout state. |
| Canonical dependencies | pass | Direct Steps dependency; shared renderer and canonical anatomy replace parallel status/indicator/connector code. |
| Ordered semantics | pass | Native labelled `OL`, three `LI` items, exactly one `aria-current="step"`, completed state text and visible check. |
| Keyboard and focus | pass | Zero interactive descendants or P4 focus stops; no custom keyboard model. |
| Non-color state | pass | Completed check plus hidden text; current uses indicator content, `aria-current` and title emphasis. |
| Responsive behavior | pass | Direct `200/320/520/1120px` probes contain exactly; narrow rows hide connectors and wide rows retain canonical Steps. |
| Content resilience | pass | Arabic RTL/long, effective 200% type, private wide measure and narrow component width remain contained. |
| Theme and modes | pass | Light/dark contrast passes; forced colors uses system highlight/boundaries; reduced motion resolves to `0s`. |
| DOM / CSS / runtime | pass | P4 adds no listener, observer, request, timer, route, formatter, asset, animation or neutral JavaScript. |
| Exhibit / Studio parity | pass | Initial complete P4 `outerHTML` is exactly equal at `1,000` characters from the same renderer and fixture. |
| Generated targets | pass | Neutral Web validates; canonical, Webflow and Shopify Pages CSS are SHA-256-identical. |
| Shopify boundary | pass | Contract records planned Checkout UI Extension translation and adds no false native-checkout theme Liquid. |
| Human stability | pending | Visual reuse, narrow treatment, two-property API, navigation and target-specific mappings require explicit owner review. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Dependency | No dependency despite duplicating Steps. | Direct canonical Steps profile. |
| DOM | Independent P4 step/indicator/label anatomy. | Passive P4 wrapper around canonical Steps ordered-list anatomy. |
| Required composition | Could leave an unnamed or empty ordered list. | Missing name or stages omits the complete component. |
| Completion | Studio icon had its own accessible name; fallback used `Cart, complete`. | One decorative check plus canonical `steps__state` text. |
| Responsive | Viewport query plus a second Studio-only container breakpoint. | One named P4 component container; Studio owns no geometry. |
| Tokens | Eleven duplicated visual tokens. | No P4 visual token; canonical Steps owns appearance. |
| Shopify | Planned Liquid/CSS implied theme control. | Planned target-native Checkout UI Extension profile; theme Liquid is not applicable. |

Baseline evidence is in
`output/playwright/refinement/checkout-progress/before/` (paired Mobile/Desktop
Exhibit and Studio).

After evidence is in
`output/playwright/refinement/checkout-progress/after/` (`13` PNGs): paired
Exhibit/Studio Mobile, Tablet, Desktop and XL plus Arabic RTL/long, effective
200% type, dark, forced-colors and reduced-motion captures.

## DOM And Responsive Evidence

The initial shared fixture emits one passive `DIV.checkout-progress`, one
`OL.steps.checkout-progress__list` named `Checkout progress`, three canonical
list items, one current item, one completed state text, a decorative check and
zero interactive descendants. Exhibit and Studio normalized outer HTML is
exactly equal at `1,000` characters.

Clearing the accessible-label field yields zero P4 roots and restoring it
yields one. Studio keeps the required Steps slot control disabled, preventing
an incomplete consumer-facing composition.

| Requested host | Root client/scroll | List client/scroll | Layout | Connector | Result |
| --- | ---: | ---: | --- | --- | --- |
| `200px` | `200/200` | `200/200` | list column, items row | hidden | contained |
| `320px` | `320/320` | `320/320` | list column, items row | hidden | contained |
| `520px` | `520/520` | `520/520` | canonical horizontal | visible | contained |
| `1120px` | `640/640` | `640/640` | canonical horizontal | visible | bounded/contained |

All probes leave the `1440/1440px` document contained. Long Arabic at a
`320px` P4 measure remains `320/320px`, uses RTL and stacks in source order.
Effective 200% root type remains `688/688px` inside a `768/768px` document.

## Accessibility And Visual Modes

- The component is native list structure, not an ARIA widget. It uses no Step
  role, `progressbar`, `tablist`, selected, checked or orientation semantics.
- The current item alone has `aria-current="step"`. Completed meaning is exposed
  through the check shape and equivalent state text, not color alone.
- Light contrast is `7.81:1` for upcoming text, `17.93:1` for current text and
  `10.37:1` for the completed indicator. Dark contrast is `12.09:1`, `17.18:1`
  and `17.93:1` respectively.
- Forced colors exposes system Highlight/HighlightText indicators and CanvasText
  connectors/boundaries. Reduced motion reports `0s` transition and animation
  durations.
- Fresh final console inspection reports zero errors and zero warnings.

These choices follow [WAI multi-page form guidance](https://www.w3.org/WAI/tutorials/forms/multi-page/),
the HTML [`ol`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element)
definition, ARIA [`aria-current`](https://www.w3.org/TR/wai-aria-1.3/#aria-current),
[WCAG use of color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html),
[Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition),
[Polaris Progress](https://polaris-react.shopify.com/components/feedback-indicators/progress-bar)
and Shopify's constrained [Checkout UI web components](https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components).
WAI-ARIA APG and Open UI define no Stepper widget, so P4 adds no custom role or
keyboard behavior.

## Tokens, CSS And Performance

P4 exposes no visual token of its own. Canonical Steps owns status colors,
indicator/connector geometry, radius and typography. The private `40rem` measure
and `30rem` container threshold remain composition details.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| P4 slice | `808 B` | `405 B` | family-bound | `-403 B`; duplicate stepper styles removed |
| Pages CSS | `3,270 B` | `2,960 B` | family-bound | `-310 B` |
| Pages + Coming Soon | `4,099 B` | `3,785 B` | `5,427 B` | pass; `1,642 B` remaining, `-314 B` |
| Neutral Web component CSS | `67,626 B` | `67,363 B` | `65,536 B` | existing gap becomes `1,827 B`; batch delta `-263 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; P4 delta `0 B` |

Canonical, Webflow and Shopify Pages CSS share SHA-256
`137847f972c17fb41055fd9f234d8d50da14d74d6c1f5fe08f11aa385a582482`.
Neutral Web component CSS is
`a0d058544c4ad823f31a2fb48a469dd4d7b86ffcf6a89e52ea6e8dd85d06e184`.
Shared runtime remains
`1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero-runtime. |
| Webflow | Source-identical Pages CSS plus canonical Layout CSS; project owns checkout state/navigation. |
| Shopify | Planned Checkout UI Extension profile; theme Liquid is intentionally not added for native checkout. |
| React / Angular | Documented thin profile over canonical Steps and controlled target records; planned. |
| Figma | Planned; registered `943:7` and `1020:480` nodes are generic Button evidence, not P4 approval. |
| SwiftUI / Compose | Documented target-native ordered/current/completed translation; planned. |

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run audit:previews:static`
- `npm run audit:exhibit-studio`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- temporary Vite production build in
  `output/build/refinement-batch-82-site/`
- Chromium Mobile/Tablet/Desktop/XL, direct 200–1120px hosts, strict label
  omission, native semantics, required composition, Arabic RTL/long, effective
  200%, light/dark contrast, forced colors, reduced motion, normalized DOM
  parity and console
- deterministic gzip/hash identity, TypeScript, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Risks And Human Review Queue

1. Approve or revise canonical Steps' visual reuse, P4 measure, wide rhythm,
   narrow connector-free stack, density and status emphasis.
2. Confirm the two-property API and absence of P4-owned current index, events,
   routes, validation, layout and visual token controls.
3. Decide whether completed stages may navigate, in which targets and who owns
   saving, availability, validation, routing, history, focus, errors and
   announcements.
4. Decide whether canonical Steps later gains automatic container orientation
   or keeps it in contextual profiles.
5. Select a Shopify Checkout UI Extension target/data/composition or explicitly
   defer to platform-owned checkout progress.
6. Supply P4-specific Figma/reference artwork and real checkout-content
   extremes; current nodes are generic Button shell evidence only.
7. Review existing total Web CSS/runtime gaps separately. P4 reduces CSS and
   adds no neutral runtime.

## Readiness

`human-review-ready`: research, canonical implementation, truthful target
translation, responsive/accessibility evidence, documentation and component-
scoped automated gates are complete for stability review. Contract remains
`pilot`; no `stable` promotion was made.
