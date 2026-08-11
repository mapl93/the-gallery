# Component Dossier: Free Shipping Bar

Status: `human-review-ready`

Target reviewed: Neutral Web, cart composition, and Shopify translation boundary

Contract: `components/contracts/free-shipping-bar.contract.json`

## Recommendation

Define Free Shipping Bar as a passive commerce message plus the determinate Bar
profile of canonical Progress. The target supplies one complete localized
message, one required accessible progress name, the current qualifying amount,
the positive threshold, and optional localized value text. K5 clamps the
visual/accessibility projection to `0..max` and derives the achieved state from
`value >= max`; it does not accept a second boolean that can contradict the
range.

Rename generic `text` to semantic `message`, add required `accessibleLabel` and
optional `valueText`, and remove `achieved`. Use a passive `div` root, a visible
`p.shipping-bar__message`, and canonical `.progress`, `.progress__track`, and
`.progress__bar` anatomy. Do not make the root a region or live region. The
target announces only meaningful eligibility transitions in its cart status
surface, rather than every amount update.

Keep the neutral implementation independent of a currency, formatter, cart
store, threshold source, qualifying subtotal policy, shipping zone, customer,
market, discount, tax or delivery rule. Shopify may receive a parameter-driven
snippet, but choosing `cart.items_subtotal_price`, `cart.total_price`, another
amount, and a merchant threshold is a commercial/product decision that cannot
be inferred in K5.

## Purpose And Limits

- Communicates measurable cart progress toward a target-owned free-shipping
  threshold and a complete achieved/not-achieved message.
- Supports below-threshold, exact-threshold and above-threshold values through
  one determinate range; it is never indeterminate.
- Makes money-like progress understandable through target-localized visible
  copy and optional `aria-valuetext`, without teaching the component currency.
- Can be placed in a cart page, drawer or another target-owned cart surface;
  the parent owns placement, external spacing and update lifecycle.
- Is not a shipping-rate calculator, eligibility engine, subtotal/total owner,
  formatter, promotion banner, Meter, task loader, cart status, announcement
  manager, checkout guarantee, geographic rule or analytics surface.
- Does not claim that a full visual track independently proves eligibility.
  Targets with exceptional eligibility rules must project a coherent range and
  complete message, such as setting value to max after authoritative success.
- Does not decide whether discounts, taxes, duties, subscriptions, gift cards,
  excluded products, customer segments, markets or shipping destinations count.

## Baseline Before Refinement

- Registry `K5`, Cart, dependency depth `1`, review order `99`, depends on
  Progress. Contract `0.1.0`, `pilot`, exposes four properties, four anatomy
  parts, two states and two behaviors.
- Despite declaring Progress, K5 duplicates a private track/fill implementation
  with different `4px` height, border token, success fill and width transition.
  It does not consume the canonical Progress DOM or CSS contract.
- Studio renders an unnamed `section`, hardcodes the English accessible name
  “Free shipping progress”, and duplicates track/fill markup. MDX duplicates a
  second version. The component has no reusable artwork renderer.
- `text` is generic, cannot identify the accessible progressbar, and differs
  visually between fixtures (`<strong>$30 away</strong>` in MDX versus plain
  text in Studio). `valueText` is absent even though raw monetary subunits or
  amounts are not meaningful percentages by themselves.
- `achieved` can be true below the threshold or false above it. Studio resolves
  the contradiction ad hoc with `achieved || value >= max`, while adapters can
  still emit incoherent state. The CSS success color and full track can imply a
  claim that the visible message does not make.
- Negative/non-finite values and invalid max are repaired only in Studio, not
  documented as a stable composition rule. Required blank content is not
  rejected. The component is always controlled target truth but the contract
  does not say so.
- CSS owns external `margin-bottom`, physical width/height/margins, raw
  `4/8/12/16px`, calculated `0.875` typography, hardcoded weight `600`, a
  component-private progress variable and duplicated transition behavior.
- Existing Mobile/Desktop images show a useful centered low-emphasis message
  and slim green track on a quiet secondary surface. Mobile has ample wrapping
  width; Desktop shows the bar isolated from the documentation column. Tablet,
  XL, exact/above threshold, empty/invalid values, localized/RTL, 200px
  container, dark, forced colors, reduced motion and 200% zoom evidence are
  absent.
- Studio references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
  inspector `1020:480`. Existing repository evidence identifies these as
  generic Button/Studio nodes, not K5-specific owner visual approval. There is
  no component-specific owner reference to override the repository candidate.
- Deterministic level-9 baseline is K5 CSS slice `920 B` raw / `423 B` gzip,
  complete Cart CSS `15,416 B` raw / `3,062 B` gzip, complete Web component CSS
  `506,095 B` raw / `67,871 B` gzip, and shared runtime `53,811 B` raw /
  `10,501 B` gzip. K5 adds no neutral runtime or asset. Only `10 B` remains in
  the Cart family ceiling, so canonical reuse must recover rather than spend.

## Current Gallery Result

- Contract `0.2.0` keeps `pilot`, requires `message`, `accessibleLabel`, `value`
  and positive `max`, adds optional `valueText`, and removes generic `text` plus
  contradictory `achieved` without compatibility aliases.
- `FreeShippingBarArtwork` is the single Exhibit/Studio implementation and
  consumes the new shared `ProgressArtwork`. The canonical Progress Studio also
  consumes that renderer, so K5 no longer owns a parallel track, bar, range,
  circle, indeterminate, motion or forced-colors implementation.
- Default output is a passive `DIV` with a complete paragraph and one named
  canonical progressbar. It has no role, live attribute, tabindex, event or
  visible duplicate value line. Optional `valueText` remains available as
  localized `aria-valuetext`.
- Exact and above-max inputs derive `.shipping-bar--achieved`, clamp ARIA and
  width to max, and below-min input clamps both to zero. Blank required message
  or name, non-finite value/max and non-positive max emit no K5 output.
- Canonical CSS now owns progress geometry, primary fill, track, radius,
  transition, reduced motion and forced colors. K5 owns only a bordered primary
  surface, complete message, intrinsic rhythm and derived achieved emphasis.
- A dedicated Shopify snippet accepts only value, max, message, accessible label
  and optional value text. It passed the official Liquid validator and is not
  rendered by Main Cart; no subtotal, total, threshold, setting, placement,
  refresh or announcement decision was invented.
- Final deterministic size is K5 `844 B` raw / `411 B` gzip, Cart `15,340 B`
  raw / `3,005 B` gzip, Web component CSS `506,019 B` raw / `67,838 B` gzip,
  and shared runtime `53,811 B` raw / `10,501 B` gzip. K5 recovers `12 B` gzip,
  Cart recovers `57 B` and now has `67 B` of family headroom; neutral runtime
  delta remains `0 B`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA 1.2 `progressbar`](https://www.w3.org/TR/wai-aria/#progressbar) | Progressbar is read-only, requires an accessible name, keeps determinate values inside the declared range, and is generally announced as a percentage unless `aria-valuetext` supplies a meaningful alternative. | Require a localized accessible name, clamp values, and allow localized monetary value text. Do not make K5 interactive. |
| [HTML `progress`](https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element) | Native progress represents task completion, uses a non-negative value and positive max, and distinguishes determinate from indeterminate by presence of value. | Reuse the determinate canonical Progress invariant; K5 does not add an indeterminate commerce state. |
| [Radix Progress](https://www.radix-ui.com/primitives/docs/components/progress) | Radix separates Root and Indicator, accepts value/max/value-label calculation, and derives loading/complete state data from the range. | K5 should compose one canonical root/track/bar and derive achieved state, not expose parallel track/fill or a contradictory boolean. |
| [Polaris Progress Bar](https://polaris-react.shopify.com/components/feedback-indicators/progress-bar) | Polaris exposes numeric progress, size, tone, animation and an accessible label for task completion. | K5 consumes one fixed Gallery Progress profile; generic size, tone and animation do not become commerce API. |
| [Shopify Liquid `cart`](https://shopify.dev/docs/api/liquid/objects/cart) | `items_subtotal_price` is after line-item discounts but excludes cart discounts/shipping, while `total_price` is after discounts; both use presentment-currency subunits. | Shopify has multiple legitimate monetary inputs. The target/merchant must choose the qualifying amount, threshold and formatted copy; K5 stays parameter-driven. |

Open UI currently has no standalone Progress or free-shipping component proposal
that supersedes the web-platform and ARIA range model. Standards and mature
systems converge on readonly determinate progress, but they do not define a
universal commerce eligibility calculation.

## Matches, Differences, And Direction

- ADR 0063 and the refined A22 Progress contract already establish a controlled
  determinate Bar with required accessible name, value/min/max and optional
  localized value text. K5 fixes min at zero and does not expose variant,
  visible Progress label or indeterminate state.
- Existing K5 hierarchy—message above a quiet slim track—is retained. Canonical
  Progress supplies the track/bar mechanics; K5 supplies the commerce surface,
  message placement and achieved text emphasis.
- Success is a derived semantic state used only for optional emphasis. The
  message must carry “qualified” meaning; green or 100% width cannot do so.
- K5 itself remains passive and silent. The cart target may announce a single
  meaningful threshold crossing; frequent amount updates are not a K5 live
  region.
- A dedicated target component is justified because it binds complete commerce
  copy to a constrained Progress profile. It is not justification for copying
  Progress markup, tokens, motion or state ownership.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `div.shipping-bar` | Free Shipping Bar | Passive grouping; no unnamed region or live semantics. |
| Message | yes | `p.shipping-bar__message` | target/K5 | Complete localized below/achieved message; text carries status. |
| Progress | yes | `.progress.shipping-bar__progress[role=progressbar]` | canonical Progress | Required localized name; fixed min zero; current/max controlled. |
| Track | yes | `.progress__track` | canonical Progress | Presentation only; no K5 duplicate class. |
| Bar | yes | `.progress__bar` | canonical Progress | Clamped percentage; supporting visual only. |

No icon, amount fragment, currency symbol, remaining-value slot, dismiss action,
link, heading, tooltip or status region belongs to the required anatomy.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | One neutral free-shipping progress composition. Tone is not consumer configurable. |
| Size | One intrinsic width; parent controls available inline size and placement. |
| Progress | Determinate only, min `0`, finite positive max, clamped current value. |
| Threshold | Below, exact and above. Exact/above derive `.shipping-bar--achieved`; no independent state input. |
| Content | Short, long, localized, RTL/mixed-direction and extreme message/value text. Blank required names/messages are invalid composition. |
| Environment | Light/dark, forced colors, reduced motion, 200% zoom, 200px through wide containers and Mobile/Tablet/Desktop/XL viewports. |

Invalid/incoherent states include blank message or accessible name, non-finite
value, non-finite/non-positive max, a current ARIA value outside the range,
indeterminate K5, independently authored achieved state, a full track with a
below-threshold message, repeated announcement on every update, or deriving
commerce truth from CSS width.

## Public API And State Ownership

- `message` — required non-empty complete localized threshold/achieved message.
- `accessibleLabel` — required non-empty localized accessible name for the
  progressbar; not hardcoded English and not inferred from presentation.
- `value` — required finite number, minimum zero, default `0`; target-owned
  qualifying amount projected to the canonical range.
- `max` — required finite number greater than zero, default `100`; target-owned
  threshold in the same unit as value.
- `valueText` — optional localized human-readable current/threshold meaning for
  assistive technology, especially when raw values represent money.

Remove `text` and `achieved`. The old names/model are pilot API and encode the
wrong semantics; no compatibility alias is warranted. `value`, `max`, `message`
and `valueText` are controlled target truth. K5 has no user-editable or
uncontrolled state and emits no neutral event. Targets recalculate and rerender
after authoritative cart changes.

Do not expose min, Progress variant/size/tone/animation, fill percentage,
currency, formatter, remaining amount, threshold source, eligible product
rules, discounts/tax/duty policy, shipping zone/rate, customer/market/channel,
request cadence, status copy, announcement, analytics or external placement.

## Token And Value Audit

- K5 should own only its secondary surface, primary/secondary message colors,
  semantic Body Small type, medium radius and layout spacing. Canonical Progress
  retains its public track/fill/radius/motion tokens.
- The achieved modifier may strengthen text with the existing body strong
  weight, but must not publish a success-color configuration surface or rely on
  color. Prefer the same primary text family in all modes.
- Root padding, message gap and text alignment are private composition values
  derived from existing semantic spacing/type tokens.
- Remove K5 track/fill color, radius, transition and easing declarations from
  the contract because they belong to its dependency. Remove raw dimensions,
  physical properties, external margin and private fill variable.
- Cart CSS must remain at or below `3,072 B` gzip. Reusing canonical Progress
  should reduce the K5 slice and preserve `0 B` neutral runtime.

## Visual And Content Audit

- Preserve the baseline's centered compact message, quiet secondary card and
  low-profile horizontal progress. Do not introduce an icon or promotional CTA.
- Use semantic Body Small typography and safe wrapping. The complete message
  should remain readable at 200px without overflow or artificial truncation.
- Achieved emphasis can use strong text weight while the message explicitly
  states eligibility. Below and achieved compositions keep identical geometry
  to prevent layout shift.
- Optional `valueText` is accessibility metadata, not a second mandatory visible
  line; duplicate visible currency strings would add noise beside the message.
- Human review must approve surface contrast, centered alignment, density,
  Progress primary fill within a commerce context, achieved emphasis and the
  absence of a success color/icon.

## Accessibility And Interaction

- K5 is readonly and not focusable. It has no keyboard interaction, pointer
  action, dismissal or focus-management contract.
- The canonical Progress root requires an author-provided accessible name and
  synchronized `aria-valuemin=0`, `aria-valuemax`, `aria-valuenow`, and optional
  localized `aria-valuetext`.
- Clamp visual and ARIA current value together. Do not expose raw above-max or
  negative values while rendering a different percentage.
- Visible message must distinguish remaining versus achieved state in text.
  Color, weight and width are supporting cues only.
- K5 root is not `role=status`, `aria-live` or an unnamed `section`. Target cart
  logic announces one meaningful eligibility change in an appropriate external
  status region and avoids frequent minor updates.
- Canonical Progress already removes its transition under reduced motion and
  uses system colors in forced-colors mode. K5 adds no motion.

## Responsive And Performance

- Intrinsic block layout is sufficient; K5 does not need a container query.
  Message and Progress consume available inline size and wrap without DOM
  reordering.
- Test direct containers near 200/320/520/760px and outer 390/768/1440/1920
  viewports, exact and above threshold, long localized/RTL text, raw extremes,
  dark, forced colors, reduced motion and effective 200% zoom.
- Neutral runtime budget is `0 B`: one percentage calculation during target
  render only. No listener, observer, timer, formatter, cart request, store,
  custom element, asset or hydration requirement belongs in K5.
- Shopify snippet should be server-rendered and parameter-driven. It must add no
  target JS until a target-owned cart refresh architecture is selected and
  measured.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Passive root/message plus canonical determinate Progress Bar; target supplies controlled values and copy. | Implemented and evidenced with zero neutral runtime. |
| Shopify | Parameter-driven Liquid snippet receiving value, max, message, accessible label and optional value text. | Official Liquid validation passes. It is intentionally not placed or connected to a cart amount; contract remains planned until those product decisions and live/editor proof exist. |
| React / Angular / Hydrogen | Stateless composition of canonical Progress with derived achieved modifier and target cart/store inputs. | Planned; no framework/store dependency in neutral source. |
| Figma | Below/exact/above, short/long/localized and narrow/wide compositions using canonical Progress Bar. | Generic referenced nodes are not K5 visual approval; owner review remains required. |
| SwiftUI / Compose | Passive text plus native linear progress indicator with localized accessibility value. | Planned; shipping calculation and announcements stay platform/target-owned. |

## Exhibit And Studio Parity

Extract one shared `ProgressArtwork` for the actual canonical docs-target Bar and
Circle renderer, then one `FreeShippingBarArtwork` that composes its Bar profile.
Cart Studio may own fixture edits, but renderer validation, derived state,
markup and classes must be shared. MDX should render that same artwork through
the docs renderer rather than maintaining a second HTML string.

Studio exposes only message, accessible label, value, max and optional value
text. Achieved remains an observable state derived by editing value/max, not a
toggle property. Progress appearance tokens remain owned by the Progress Studio;
K5 Studio may expose only its surface/text/type/radius composition tokens.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| K5 declares Progress but duplicates track/fill DOM, CSS, tokens and motion. | high | Compose canonical Progress Bar and extract one shared artwork renderer. | implementation/dependency |
| Hardcoded English accessible name is not public or localizable. | high | Add required `accessibleLabel`; reject blank composition. | contract/accessibility |
| Independent `achieved` can contradict value/max. | high | Remove it and derive state from the clamped range. | contract/implementation |
| Monetary meaning is announced as a generic percentage. | high | Add optional localized `valueText` and keep complete visible message. | contract/accessibility |
| Shopify contract assumes subtotal/shop settings without selecting the correct commerce truth. | architecture/product input | Provide only parameter-driven translation; defer amount, threshold, placement and refresh policy. | owner/target |
| Raw dimensions, type calculation, weight, external margin and private fill variable duplicate semantic owners. | medium | Reconcile to semantic tokens, logical properties and canonical Progress. | implementation |
| No K5-specific owner visual reference exists. | human review | Preserve coherent repository direction and request explicit visual approval after evidence. | owner |

## Evidence And Validation Result

- Exhibit and Studio emit an identical `439`-character `.shipping-bar` subtree
  from one renderer and one fixture. One browser, one tab and one headless
  `gallery-refinement` session were used throughout the final phase.
- Default semantics are passive `DIV`, no root role/live/tabindex, named
  `progressbar`, range `0..100`, current `65`, localized value text, canonical
  Progress classes and `65%` width. The progressbar has no visible duplicate
  text line.
- Exact threshold produces the explicit achieved message, modifier, value `100`
  and `100%` width. Input `135` clamps both accessible and visual values to
  `100`; input `-10` clamps both to `0`. Max `0` and blank message each emit zero
  component roots.
- Mobile, Tablet, Desktop and XL widths resolve to `324/324`, `518/518`,
  `518/518` and `518/518` client/scroll pixels. Localized RTL at a direct
  `200px` stage resolves to `198/198`. Effective 200% evidence resolves the
  component to `518/518` and the document to `720/720` without overflow.
- Default message contrast is `7.81:1`; primary fill against its track is
  `9.51:1`. Dark tokens resolve to distinct surface/text/border values. Reduced
  motion produces `0s` transition and no animation; forced colors produces
  distinct system track/fill colors.
- Fourteen final images cover Exhibit/Studio at four viewports plus achieved,
  localized RTL narrow, dark, reduced motion, forced colors and effective 200%
  zoom. Before Mobile/Desktop evidence remains under
  `output/playwright/parity/cart/`; final evidence is under
  `output/playwright/refinement/free-shipping-bar/final/`.
- The current page reports zero browser errors/warnings. Contracts, Studio,
  registry/docs, TypeScript, static previews, Neutral Web, Shopify, official
  Liquid, generated-copy identity, performance, parity/refinement audits,
  diff checks, `site/dist` cleanliness and the owned-resource gate form the
  final automated suite.

## Risks And Open Questions

1. Owner visual review must approve surface, alignment, density, canonical
   primary fill, achieved emphasis and removal of success-only color.
2. Each commerce target must define the qualifying amount, threshold, excluded
   items, discounts/tax/duty/gift-card treatment, market/currency, destination,
   exact achieved wording, placement and update/announcement cadence.
3. If eligibility can be granted independently of the amount, the target must
   project a coherent achieved range; the neutral component will not accept a
   contradictory override.
4. Shopify needs a selected source of truth, settings ownership, cart refresh
   architecture, editor composition and live-store proof before target-ready
   promotion.
5. Progress Circle's separate long-visible-value question does not block K5,
   which consumes only the validated Bar profile.
6. Total Web CSS/runtime still exceed program ceilings. Cart now has `67 B`
   headroom after K5 recovered `57 B`; later family work should preserve or
   increase it and avoid neutral runtime.

## Readiness Decision

`human-review-ready`. Canonical dependency composition, derived range state,
localized semantics, responsive/special-mode evidence, parameter-driven
Shopify translation and component-scoped gates are complete without inventing
a commerce policy. Contract stays `pilot`; only explicit human review can
authorize stability.
