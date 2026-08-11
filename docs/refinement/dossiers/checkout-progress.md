# Component Dossier: Checkout Progress Indicator

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify Checkout UI Extension boundary and
future-target translation

Contract: `components/contracts/checkout-progress.contract.json`

## Recommendation

Define Checkout Progress as a passive checkout-context profile of canonical
Steps. Render a presentation-only wrapper around the same labelled native
ordered list, item, indicator, content, title and status anatomy owned by Steps.
Require a non-empty accessible sequence label and a non-empty ordered step slot;
omit the complete profile when either requirement is absent.

The target supplies every step in checkout order and projects its status as
completed, current or upcoming. At most one item uses
`aria-current="step"`. Completion must remain available as text and a visible
check or equivalent non-color cue. The page title or primary heading should
also communicate the current checkout stage; P4 supplements that context and
does not replace it.

Keep the accepted wide horizontal presentation and stack the canonical items
at narrow component widths. P4 may hide decorative connectors in that narrow
profile instead of consuming Steps' private geometry. It must not create a
second indicator, state, token or runtime implementation. Extract one docs-only
Steps artwork renderer so Exhibit and Studio exercise identical canonical DOM,
fixture state and status text.

Do not add links, buttons, click handlers, route availability, visited state,
validation gates, persistence, announcements or checkout-state synchronization.
Completed-step navigation remains an explicit open product and architecture
decision. A future target may compose canonical Link or Button only after it
owns saving, availability, routing, focus and error behavior.

Do not add a Shopify theme Liquid implementation. Shopify's native checkout is
customized through Checkout UI extensions, not arbitrary theme markup; those
extensions cannot access the checkout DOM or render arbitrary HTML/CSS and the
current component catalogue exposes a percentage Progress indicator rather
than a step sequence. Record P4 as a planned checkout-extension translation
until a supported target, state source and composition are approved.

## Purpose And Limits

- Communicates the buyer's location in a known, ordered checkout sequence.
- Distinguishes completed, current and upcoming stages without color alone.
- Owns the checkout-context wrapper and a narrow component-driven layout
  profile over canonical Steps.
- Canonical Steps owns list anatomy, status presentation, horizontal geometry,
  forced colors, source order and zero-runtime behavior.
- The target owns step labels, count, status, current-stage truth, page title,
  primary heading, form data, validation, availability, saving, routes,
  navigation, history, focus, announcements and analytics.
- It is not determinate percentage Progress, a loading indicator, a checkout
  form, breadcrumb, tablist, wizard controller, state machine or route map.

## Pre-Refinement Gallery Baseline

- Registry `P4`, category `pages`, no dependencies; contract `0.2.0`, `pilot`;
  five independent anatomy parts, four states, three behaviors, two properties
  and 11 duplicated public tokens.
- P4 recreates canonical Steps indicators, connectors, labels, state colors and
  responsive layout instead of declaring the existing Steps dependency.
- The shared renderer emits an empty labelled list when `accessibleLabel` is
  empty or the required `steps` slot is disabled.
- Completed state uses an icon with its own accessible name but no canonical
  visible/visually-hidden Steps state text; current and upcoming labels have a
  separate DOM from the Steps implementation.
- CSS uses physical properties, hardcoded pixel dimensions and spacing,
  fallback token values and a viewport media query.
- Studio adds a second, earlier container breakpoint and duplicates the full
  narrow orientation rules, so Exhibit and Studio do not share one visual
  implementation.
- The MDX fallback uses the independent P4 anatomy and represents completion
  with the text `Cart, complete` but retains the number `1` as its indicator.
- Shopify is described as planned Liquid/CSS even though theme Liquid cannot
  own the native checkout surface.
- Deterministic baseline is `808 B` gzip for the P4 slice, `3,270 B` for Pages,
  `4,099 B` for Pages + Coming Soon, `67,626 B` for Neutral Web component CSS
  and `10,501 B` for shared neutral runtime. P4 contributes no JavaScript.

Before visual evidence will be stored in
`output/playwright/refinement/checkout-progress/before/` using one bounded
Mobile and Desktop Exhibit/Studio phase. The browser and server must close
immediately after capture.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI multi-page forms](https://www.w3.org/WAI/tutorials/forms/multi-page/) | A known step count can use an ordered step-by-step indicator; current and completed meaning is also exposed as text. Page title and main heading provide complementary progress context. | Use a labelled ordered list, explicit status text and no custom widget. P4 does not replace the host title/heading. |
| [HTML Standard: `ol`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) | `ol` represents items whose intentional order changes document meaning. | Checkout stages remain native list items in source order at every size. |
| [WAI-ARIA `aria-current`](https://www.w3.org/TR/wai-aria-1.3/#aria-current) | The `step` token identifies the current item within a step-based process. | Apply `aria-current="step"` to at most one item and never use selected/checked semantics. |
| [WCAG 2.2: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Color cannot be the only visual means of conveying state. | Completion needs a check or equivalent visible cue plus textual meaning. |
| [Open UI component research](https://open-ui.org/components/) | The current Open UI inventory defines no Stepper or checkout-progress component. | Keep the native-list profile and avoid inventing a custom element/ARIA widget model. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) and [Radix inventory](https://www.radix-ui.com/primitives) | Radix emphasizes composing accessible leaf primitives and does not publish a Stepper primitive; its Progress treatment represents a task value rather than named stages. | Compose canonical Steps and keep navigation leaves target-owned instead of creating React-specific state. |
| [Polaris components](https://polaris-react.shopify.com/components) and [Progress bar](https://polaris-react.shopify.com/components/feedback-indicators/progress-bar) | Polaris exposes numeric Progress for task completion and no checkout-step sequence in its component inventory. | Do not substitute percentage Progress for named, stable checkout stages. |
| [Shopify Checkout UI extensions](https://shopify.dev/docs/api/checkout-ui-extensions/latest/index) | Checkout extension targets and APIs own supported checkout customization; information, shipping and payment-step extensions have platform limits. | A Shopify translation needs an explicit extension target and platform-owned checkout data, not theme Liquid. |
| [Shopify Checkout web components](https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components) | Extensions cannot access the real checkout DOM, render arbitrary HTML or override component CSS; Shopify supplies only its supported elements. | P4's neutral DOM/CSS cannot be copied into native checkout. Record a planned target-native composition instead. |

### WAI-ARIA APG and Open UI scope

WAI-ARIA APG defines interactive widgets but no stepper pattern. A passive
checkout sequence requires native ordered-list semantics and the global
`aria-current` state, not `tablist`, `menu`, `navigation`, roving focus or arrow
key handling. Open UI likewise has no interoperable Stepper anatomy. The
absence of a widget reinforces the accepted passive Steps contract; it does
not authorize a new role or keyboard model.

### Mature-system comparison

- WAI and the HTML Standard align with Gallery's canonical Steps direction:
  ordered items, explicit current/completed meaning and source-order stability.
- Radix offers composition guidance rather than a Stepper primitive. Its leaf
  ownership model supports reusing Steps and composing Link/Button only when a
  target actually owns navigation.
- Polaris and Shopify Checkout provide percentage Progress, not named stage
  anatomy. Percentage is useful for an amount completed but loses the semantic
  labels and stable sequence P4 exists to communicate.
- Shopify's checkout extension environment is deliberately constrained. A
  truthful adapter cannot claim that copied theme Liquid or neutral CSS controls
  the native information, shipping and payment steps.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. All current Studio definitions share those ids. Prior
direct inspection in this refinement program established that they show the
generic Button detail shell and Button controls, not checkout stages, current
or completed states, narrow stacking, long labels or P4-specific tokens. The
repository candidate is therefore the visual proposal for human review; no P4
aesthetic approval is inferred.

## Recommended Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root profile | yes | passive `div.checkout-progress` | P4 | Omitted when label or steps are absent; owns named inline-size containment only. |
| Ordered list | yes | canonical `ol.steps.checkout-progress__list[aria-label]` | Steps / target | The list, not the wrapper, carries the accessible name. |
| Item | yes/repeated | canonical `li.steps__item` | Steps / target | Preserves target-supplied checkout order. |
| Connector | no/generated | canonical decorative pseudo-element | Steps | Visible in the wide profile; may be omitted in narrow stacking. |
| Indicator | yes | canonical `span.steps__indicator` | Steps / target | Number, check or equivalent non-color cue. |
| Content | yes | canonical `span.steps__content` | Steps | Groups visible title and optional description/state. |
| Title | yes | canonical visible `span.steps__title` | target | Localized checkout-stage name. |
| Description | no | canonical `span.steps__description` | target | Optional supporting content, not a P4-specific API. |
| State text | conditional | canonical visible or visually-hidden `span.steps__state` | target | Required for completed meaning; current is also conveyed by `aria-current`. |

## Variant, State, Size, And Mode Matrix

- Variant/size: one checkout-context profile. Wide orientation is horizontal;
  narrow orientation stacks by the P4 container without changing source order.
- Required composition: non-empty `accessibleLabel` and non-empty ordered
  `steps`; missing either omits the complete wrapper/list.
- Status: upcoming, completed and current; at most one current item. A sequence
  without a current item is allowed only when the target truthfully represents
  a pre-start or completed process.
- Count/content: known finite stages with short, long, localized, RTL and
  unbroken labels. P4 does not expose a maximum count; targets must avoid
  presenting a sequence too dense to remain understandable.
- Navigation: passive in v1. No step enters the Tab order and no P4 keyboard
  command exists.
- Responsive: canonical horizontal Steps at wider component widths; intrinsic
  stacked rows with hidden decorative connectors at narrow component widths.
- Modes: light, dark, forced colors, reduced motion, keyboard, touch, screen
  reader, user styles, effective 200% text and 400% zoom. P4 owns no motion.

## Public API And State Ownership

Keep two semantic properties for contract `0.3.0`:

- `accessibleLabel` - required non-empty localized name for the ordered list.
- `steps` - required non-empty ordered canonical Steps composition whose target
  records supply title, optional description and completed/current/upcoming
  status.

Do not expose current index, status mutation, completed count, percentage,
step-link URL, click handler, route availability, validation, persistence,
automatic orientation, breakpoint, connector visibility, indicator size,
measure, alignment, colors, spacing or animation as P4 properties.

P4 has no controlled/uncontrolled state. Targets project their authoritative
checkout state into ordered content. Framework adapters may receive controlled
data but must not retain a second current step or emit synthetic state changes.

## Token And Value Audit

- Remove the 11 duplicated P4 public token declarations. Canonical Steps owns
  indicator, connector, title, description, state, radius, typography and
  status colors.
- Let P4 expose no visual token of its own. Container threshold, maximum measure
  and narrow row rhythm are private composition details.
- Replace physical dimensions and viewport queries with logical properties and
  one named inline-size container.
- Narrow P4 layout must not consume canonical Steps' private `--_` geometry.
  Hide the decorative connector and arrange public canonical parts instead.
- Remove fallback token values and Studio-only duplicated geometry.
- Add no hardcoded color, component token, asset, listener, observer, timer,
  request, formatter, layout read, state store or neutral runtime.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Passive wrapper plus canonical labelled Steps list and target-supplied status projection. | Safe to implement and browser-certify now; zero component runtime. |
| Shopify | Future Checkout UI extension using supported Shopify components/data at an approved target; native checkout progress may remain platform-owned. | Planned; theme Liquid is not applicable and no extension target/state contract is approved. |
| Webflow | Source-identical Pages and Layout CSS with authored canonical Steps markup and project-owned checkout state. | CSS projection only; checkout lifecycle remains project-owned. |
| React / Angular | Thin P4 wrapper around canonical Steps adapter and controlled target records. | Planned; no internal current state or routing. |
| Figma | Approved instance/profile of canonical Steps with checkout labels and wide/narrow examples. | Planned; registered nodes are generic Button evidence. |
| SwiftUI / Compose | Target-native ordered checkout-stage presentation with equivalent current/completed semantics. | Planned; navigation and state remain application-owned. |

## Responsive And Performance Direction

- Use a passive wrapper as the named inline-size container and keep the labelled
  canonical `ol` as its descendant.
- Keep wide canonical Steps untouched. Below the private P4 threshold, stack
  items, align indicator/content in logical row order and hide connectors.
- Preserve DOM/source order, visible labels and status text in RTL and every
  layout. No CSS reordering or viewport-specific markup.
- P4 owns zero neutral runtime, events, observers, requests, timers, generated
  ids, state, navigation, validation or authored motion.
- Permanent Pages + Coming Soon ceiling remains `5.3 KiB` (`5,427 B`). Baseline
  is `4,099 B`, leaving `1,328 B`; replacing duplicate state CSS with a profile
  should reduce rather than consume this room.

## Alternatives And Open Decisions

1. **Keep independent P4 anatomy and styling.** Rejected for v1 because it
   duplicates certified Steps DOM, states, tokens, responsive rules and Studio
   renderer without adding a semantic checkout capability.
2. **Use determinate percentage Progress.** Rejected because named stable stages
   and their order are the purpose of P4; a numeric amount is an adjacent
   primitive with different semantics.
3. **Make completed steps navigable.** Potentially useful and recommended by WAI
   only when data is saved, but it requires explicit saving, availability,
   routing, validation, focus and error ownership. It remains open.
4. **Promote automatic container orientation to canonical Steps.** Not assumed.
   Steps' future automatic-orientation API remains an accepted open question;
   P4 owns only its narrower checkout profile.
5. **Build Shopify theme Liquid.** Rejected because theme markup does not own the
   native checkout surface. A supported Checkout UI Extension design requires a
   separate target decision.

## Human Review Boundary

Human review must approve reusing canonical Steps visual language in checkout,
the wrapper/list composition, wide measure, narrow connector-free stacking,
status emphasis, long-label rhythm and the two-property API. It must also decide
whether completed steps ever become navigable, which targets support that
behavior, whether canonical Steps later gains automatic orientation and how a
Shopify checkout extension should map or defer to platform-owned progress.

No `stable` promotion is permitted without that explicit review.

## Refinement Outcome And Evidence

- Contract `0.3.0` now declares canonical Steps as P4's sole dependency,
  requires a non-empty list name and ordered slot, records target ownership and
  remains `pilot`.
- `StepsArtwork` is the one docs-only canonical renderer used by Steps and P4;
  Exhibit and Studio emit exactly equal P4 `outerHTML` at `1,000` characters.
- The initial 11 duplicate P4 tokens and complete parallel indicator/connector/
  state CSS are removed. P4 owns only its wrapper, private measure and intrinsic
  connector-free narrow arrangement.
- Studio no longer contains any P4-specific layout or icon-size override. Its
  semantic controls are the same two required contract properties.
- Browser evidence confirms one labelled native ordered list, three list items,
  one current item, completion text, a visible check and zero P4 interactive
  descendants. Empty label input omits the complete root; the required step
  control remains non-disableable in Studio.
- Direct `200/320/520/1120px` hosts remain exactly contained. The first two use
  stacked rows with hidden connectors; the latter use canonical horizontal
  Steps, with the `1120px` host bounded to the private `640px` measure.
- Arabic RTL/long content remains `320/320px`; effective 200% type remains
  `688/688px`; no probe causes document overflow.
- Light/dark contrast passes for upcoming text (`7.81:1` / `12.09:1`), current
  text (`17.93:1` / `17.18:1`) and the completed indicator (`10.37:1` /
  `17.93:1`). Forced colors exposes system highlight/boundaries; reduced motion
  reports `0s` transition and animation durations.
- Four before and 13 final screenshots are stored under
  `output/playwright/refinement/checkout-progress/`. The one browser and server
  used in each phase were closed immediately; port `4173` is free and
  `site/dist` is untouched.
- P4 CSS falls from `808 B` to `405 B` gzip. Pages falls from `3,270 B` to
  `2,960 B`; Pages + Coming Soon from `4,099 B` to `3,785 B`, leaving `1,642 B`
  below its `5,427 B` ceiling. Neutral Web CSS falls from `67,626 B` to
  `67,363 B`; shared runtime remains `10,501 B` and P4 adds zero JavaScript.
- Canonical, Webflow and Shopify Pages CSS share SHA-256
  `137847f972c17fb41055fd9f234d8d50da14d74d6c1f5fe08f11aa385a582482`.
- Neutral Web and Shopify adapters validate. Shopify intentionally remains a
  planned Checkout UI Extension profile; no misleading theme Liquid was added.

## Readiness

`human-review-ready`: research, canonical dependency composition, source and
target documentation, responsive/accessibility evidence, performance audit and
component-scoped automated gates are complete for stability review. The
contract remains `pilot`; no `stable` promotion was made.
