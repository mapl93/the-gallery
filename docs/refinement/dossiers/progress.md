# Component Dossier: Progress Bar / Circle

Status: `human-review-ready`

Target reviewed: Neutral Web and target-owned progress calculation

Contract: `components/contracts/progress.contract.json` (`0.4.0`)

## Recommendation

Retain ADR 0063's read-only determinate Bar/Circle and Bar-only Indeterminate
model, with ADR 0234's independent value channels. `displayValue` is optional,
visible and intentionally compact; `valueText` is independently optional and
maps only to `aria-valuetext`. Neither property is derived from the other.
Targets continue to own calculation, localization, lifecycle and update cadence.

The semantic, responsive, accessibility, runtime and cross-target work is ready
for human review. Final Bar/Circle proportions, hierarchy, fill treatment and
compact value typography remain owner visual-review decisions. The contract
stays `pilot` until that review is explicit.

## Purpose And Limits

- Represents completion of one task; it is not a static gauge or editable
  value.
- Determinate owns a finite min/max/current relationship. Bar and Circle expose
  that relationship as a named `progressbar`.
- Indeterminate signals unknown completion without claiming a number, is
  available only for Bar and omits all determinate value presentation.
- Targets own range calculation, localization, update and announcement cadence,
  busy-region lifecycle, cancellation, errors and persistence.
- It is not Meter, Slider, Spinner, Reading Progress, Checkout Progress or a
  task-step sequence.

## Research Comparison

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [WAI-ARIA 1.2 progressbar](https://www.w3.org/TR/wai-aria/#progressbar) | Progressbar is read-only; determinate values stay within range; unknown values omit `aria-valuenow`; the updated region owns authoritative `aria-busy`. | Preserve a required accessible operation name, valid range semantics and truthful unknown state. |
| [HTML progress](https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element) | Native progress distinguishes determinate value from indeterminate absence and constrains the range. | Keep equivalent invariants even though Gallery's Bar/Circle artwork is custom. |
| [Radix Progress](https://www.radix-ui.com/primitives/docs/components/progress) | Root/Indicator anatomy, controlled numeric value or null, max and accessible value-label calculation. | Gallery aligns on controlled read-only state; Circle and independent visible copy are deliberate Gallery additions. |
| [Polaris Progress Bar](https://polaris-react.shopify.com/components/feedback-indicators/progress-bar) | Numeric progress with size/tone/motion; unknown or page-loading cases are routed to other feedback patterns. | Keep A22 narrowly scoped to measurable task progress plus one explicit Bar-only unknown state. |

Open UI currently has no standalone Progress proposal that replaces the web
platform and ARIA semantics above.

## Accepted Contract Direction

- Required: a non-empty localized `accessibleLabel`.
- Determinate required composition: finite `value`, finite `min`/`max`, and
  `max > min`. The renderer clamps a finite value to the authored range.
- Invalid required composition emits no Progress root; it does not fabricate a
  name, value or range.
- Optional `label` is visible Bar operation copy.
- Optional `displayValue` is the only visible value content for Bar and Circle.
- Optional `valueText` is the complete localized accessible description and
  maps only to `aria-valuetext`.
- `displayValue` and `valueText` do not copy, fall back, truncate, scale or
  derive from one another.
- `variant` is Bar or Circle. `indeterminate` is orthogonal but valid only with
  Bar; Studio repairs that combination atomically.
- Progress is target-controlled and read-only, so controlled/uncontrolled user
  input strategy is not applicable.

## Anatomy And States

- Bar: root, optional label row, optional visible operation label, optional
  compact value, required track and fill.
- Circle: root, decorative SVG track/fill and optional compact value.
- Determinate: min/max/now, optional accessible value description and computed
  visual proportion.
- Indeterminate: Bar, `aria-busy="true"`, no `aria-valuenow`, no
  `aria-valuetext`, no `displayValue` and no determinate inline width.
- Value-only combinations are independent: visible-only, accessible-only, both
  and neither all remain truthful determinate states.

## Token, CSS, Runtime And Performance Audit

- Public tokens: semantic track/fill/text colors, full radius, base/out motion,
  Body Small label type and Caption circle type.
- Private composition: `6px` track, `48px` Circle, `4px` stroke, gaps, weight
  and indeterminate geometry.
- No hardcoded brand color or public component token was introduced.
- A22 canonical CSS slice is `2,397 B` raw / `816 B` gzip, SHA-256
  `4adb4e5efe5b941b3dd48e3e865ee5b3986fb6e452a18ae6f416b0f4301430ef`.
- The semantic split changes no canonical CSS and adds `0 B` neutral runtime.
  The renderer is docs-site composition, not target runtime.
- The Primitives family remains within its fixed ceiling with `9 B` gzip
  headroom at the current audit. A22 owns no request, timer, observer, storage,
  asset or event listener.

## Accessibility And Resilience Result

- The initial fixture is one named `progressbar` with range `0..100`, current
  `65`, visible `65%` and accessible `65 percent complete`.
- The four independent value combinations were browser-verified. Accessible-only
  text never appears visually; display-only text never creates
  `aria-valuetext`.
- A localized long `valueText` with Circle `displayValue="72%"` keeps the
  Circle exactly `48 x 48px` with `0px` root and document overflow.
- Blank accessible name, missing determinate value, invalid range and
  Circle+Indeterminate each emit zero roots in the live renderer harness.
- Values below/above range clamp to `0%`/`100%` and matching `aria-valuenow`.
- Indeterminate has no false numeric/textual value. Reduced motion changes its
  computed animation from `progress-indeterminate` to `none`.
- Mobile `320px` localized RTL, dark, forced colors and a 200% zoom stress pass
  without component or document overflow.
- The component is passive and has zero focusable surfaces; keyboard activation
  and focus ownership are not applicable.

## Exhibit, Studio And Target Translation

- Exhibit and Studio use `FeedbackDisplayStudio` and the same
  `ProgressArtwork` fixture. Initial root DOM is byte-identical (`414` tested
  characters).
- Eight paired screenshots cover Mobile `390 x 844`, Tablet `768 x 1024`,
  Desktop `1280 x 800` and XL `1600 x 1000`; six additional captures cover
  Circle long accessible text, Indeterminate/reduced motion, dark, forced
  colors, RTL extreme content and 200% zoom.
- Neutral Web and Shopify use read-only progress semantics and canonical CSS;
  target logic supplies values and updates. Free Shipping Bar now passes its
  localized accessible value without a site-only visibility switch.
- React/Angular expose a controlled finite value or explicit Bar-only unknown
  state. Figma maps the two shapes and state constraints. Native targets may use
  platform indicators while preserving known/unknown state and the independent
  visible/accessibility content decisions.

## Risks And Human Review Questions

- Approve or revise Bar track thickness, label hierarchy, fill tone, radius and
  transition treatment.
- Approve or revise Circle diameter, stroke, cap, compact-value typography and
  alignment.
- Review the two shapes in real target context with representative operation
  names and target colors.
- Complete the explicit human stability review. No `stable` promotion is
  authorized by this dossier.

## Readiness Decision

`human-review-ready`. Purpose, anatomy, state matrix, semantic API, strict
composition, accessibility, localization, responsive behavior, performance,
target boundaries and Exhibit/Studio parity are reconciled. Only explicit human
visual/stability review remains; contract status is still `pilot`.
