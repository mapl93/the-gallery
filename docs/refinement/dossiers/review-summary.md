# Component Dossier: Review Summary

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/review-summary.contract.json`

## ADR 0235 Canonical Rating Update (2026-07-20)

The owner has resolved the former A11/V2 identity question. Review Summary now
declares and composes canonical A11 Rating; V2 Star Rating is deprecated and
owns no selector or implementation. Contract `0.4.0` also separates the exact
aggregate `ratingValue` (`0.1` step) from required target-supplied
`ratingDisplayValue` (`0.5` step) passed to Rating. Neutral Web never rounds one
into the other. The final migration probe renders `.rating[data-rating="4.5"]`
and zero legacy `.star-rating*` selectors.

Any later reference in this historical dossier to an open A11/V2 decision,
missing dependency, or V2 as the canonical child is superseded by ADR 0235.
The prior research and Review Summary visual/accessibility evidence remain
valid. Human visual review and provider/aggregation policy remain pending.

## Recommendation

Refine Review Summary as a passive, self-contained `figure` whose required
`figcaption` contains the target-formatted score, one canonical read-only Star
Rating projection, and the visible review count. Represent the optional
target-owned distribution as a labelled native list whose visible bucket labels
and counts remain the complete textual equivalent of the bars. Let the
composition switch from stacked to split layout from its own inline size and
remove passive fill animation.

This direction corrects semantics, responsive ownership, token use, motion and
Exhibit/Studio parity without choosing a provider, aggregation algorithm, rating
normalization rule or Shopify data model. It also does not settle whether A11
Rating and V2 Star Rating remain separate. The formal registry dependency stays
unchanged until that accepted architecture question is answered.

The repository candidate can be prepared for human review without an owner
decision. The score hierarchy, accent fill, track thickness, split threshold and
wide alignment remain visual candidates for human approval. Review Summary must
remain `pilot` until that review.

## Purpose And Limits

- Summarize a target-supplied aggregate rating and total review count.
- Optionally compare target-supplied rating buckets without requiring a charting
  runtime or interaction model.
- Preserve readable values when CSS, color, stars or distribution bars are
  unavailable.
- Use Star Rating for the read-only visual rating projection; do not use Star
  Input, which owns native value entry.
- Do not calculate averages, rounding, scale normalization, bucket counts,
  percentages, missing values or synchronization.
- Do not own provider records, fetching, moderation, filtering, sorting,
  structured data, links, review navigation or live announcements.
- Do not expose bar geometry, column threshold, internal gaps or chart styling as
  semantic public API.

## Current Gallery Baseline

- Registry: `V1`, `review-summary`, category `reviews`, no formal dependencies.
- Contract: `0.2.0`, `pilot`, 11 anatomy parts, six semantic properties, one
  default state, two behaviors and 12 public token references.
- ADR 0085 already requires read-only contexts to compose Star Rating and keeps
  aggregation/distribution target-owned. It also defers formal review-family
  dependency reconciliation.
- ADR 0110 leaves the long-term identity of A11 Rating versus V2 Star Rating to
  an owner architecture decision.
- Canonical source uses a flex row with a `639px` viewport query, while the docs
  site adds a separate `520px` container repair. The candidate therefore has two
  responsive authorities.
- The root is a labelled `section` and the nested Star Rating repeats the same
  rating label as `role="img"`, producing a duplicate accessible name.
- Distribution rows are generic `div` elements. Their visible labels and counts
  are sufficient, but the group has no semantic list structure and its label is
  fixture-only rather than contract-owned.
- The fill uses a Button background token and animates `width`, even though the
  neutral component is passive and owns no update behavior.
- Private geometry is expressed as unexplained `4/6/8/100/639px` literals; type
  families, weights and line heights are incomplete.
- Exhibit and Studio already mount one `ReviewsStudio` renderer and initial
  fixture. Baseline parity is exact across Mobile, Tablet, Desktop and XL.
- Neutral Web is implemented. Shopify receives copied CSS but has no accepted
  review provider or data model, so a target-native Liquid projection is not yet
  source-backed.
- Baseline canonical Reviews CSS is `3,323 B` gzip against the `3.7 KiB` family
  ceiling. Review Summary adds no component JavaScript, assets or network work.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `figure` and `figcaption`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) | A figure is self-contained flow content and may be associated with one caption. | Treat the aggregate plus optional distribution as one self-contained data figure; place the required textual summary in its caption. |
| [HTML `meter`](https://html.spec.whatwg.org/multipage/form-elements.html#the-meter-element) | `meter` represents one scalar measurement within a known range and still requires textual representation. | A single aggregate could use `meter`, but Review Summary also owns target-defined repeated buckets. Do not introduce native meters until scale and target mappings are accepted. |
| [WAI complex images](https://www.w3.org/WAI/tutorials/images/complex/) | Charts need a concise description and a complete text equivalent for the represented data. | Visible bucket labels and counts are authoritative; tracks and fills can remain hidden from assistive technology. |
| [WCAG Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Color must not be the only visual means of conveying information. | Bar width is supported by visible label/count text; no bucket meaning depends on hue alone. |
| [WCAG Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Essential graphical objects require sufficient contrast, while equivalent visible text can make the graphic non-essential. | Keep the textual equivalent complete, preserve track/fill distinction in themes and forced colors, and evaluate accent fill visually without making it the only carrier of data. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines no Review Summary widget pattern. | Add no custom role, keyboard model, focus management, controlled state or live region to the passive core. |
| [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix provides accessible interactive primitives but no aggregate review-summary primitive. | Compose native structure and the canonical Gallery rating projection rather than importing a React widget abstraction. |
| [Polaris components](https://polaris-react.shopify.com/components) | Polaris exposes progress indicators for task completion, not a review-distribution contract. | Do not reuse progress semantics for target-owned review buckets or copy admin-specific API. |
| [MUI Rating](https://mui.com/material-ui/react-rating/) | Its read-only Rating exposes one image-like accessible label and differentiates icon shapes in addition to color. | Keep one accessible Star Rating owner inside the summary and avoid duplicating its label on the figure root. |
| [Shopify `rating` object](https://shopify.dev/docs/api/liquid/objects/rating) | Shopify can expose rating value plus minimum and maximum scale, but not a universal review provider or distribution model. | A future adapter can project target data, but Review Summary must not invent provider records, counts or merchant-entered aggregate fields now. |

## Reference Comparison

| Concern | Gallery baseline | Mature/standards signal | Recommended Gallery direction |
| --- | --- | --- | --- |
| Semantic root | Labelled `section` | Self-contained figure plus textual equivalent | `figure` with required `figcaption`; no synthetic landmark. |
| Rating name | Root and nested image repeat it | Read-only rating owns one image-like label | Star Rating is the single accessible rating projection; visible numeric score is decorative duplication. |
| Distribution | Generic rows with visual tracks | Complex graphics require a complete text equivalent | Labelled native list; every row exposes visible bucket label and count. |
| Interactivity | None | No APG widget exists | Remain passive, unfocusable and uncontrolled. |
| Responsiveness | Viewport query plus site repair | Components should adapt to their containing context | One canonical inline-size container and private split threshold. |
| Motion | Width transition | Passive aggregate has no component-owned update lifecycle | Remove transition and component motion API. |
| Data ownership | Target-supplied | Shopify/provider models vary | Preserve explicit supplied values and slots; no calculation or fetch. |
| Composition | Optional Star Rating, no dependency edge | ADR 0085 requires read-only contexts to compose Star Rating | Require the reviewed composition while preserving the open formal dependency question. |

## Anatomy And Composition

| Part | Required | Recommended semantic owner |
| --- | --- | --- |
| Root | yes | Self-contained `figure.review-summary`. |
| Average | yes | `figcaption.review-summary__average`. |
| Score | yes | Visible target-formatted text, hidden from the accessibility tree because Star Rating owns the equivalent rating label. |
| Star Rating | yes in the reviewed candidate | Canonical `.star-rating` read-only projection with one accessible label. |
| Count | yes | Visible ordinary text after the rating projection. |
| Distribution | no | Labelled `ul.review-summary__bars`. |
| Row | when distribution exists | `li.review-summary__bar-row`. |
| Label/count | per row | Visible ordinary text and complete equivalent for the bar. |
| Track/fill | per row | Passive visual spans hidden from assistive technology; target supplies the bounded inline size. |

The score, rating and count remain together in the caption. The distribution
follows in source order. Narrow and wide modes must never visually reorder those
regions.

## Variants, States And Modes

| Dimension | Values | Ownership |
| --- | --- | --- |
| Variant | `default` | One visual candidate; no source-backed alternative. |
| Size | `default` | Intrinsic stacked/split behavior, not a consumer size option. |
| Distribution | `without-distribution`, `with-distribution` | Derived from optional slot presence. |
| Theme | light, dark, forced colors | Token/system-color projection. |
| Motion | normal, reduced | Identical; the passive core has no motion. |
| Width | stacked, split | Derived from component inline size. |
| Direction | LTR, RTL | Logical layout; star sequence remains LTR inside Star Rating. |

There is no hover, pressed, selected, pending, disabled, busy, error, empty,
controlled or uncontrolled component state. Zero reviews is a truthful supplied
value, not an interactive empty state; targets decide whether to render or omit
the summary when no aggregate exists.

## Public API Recommendation

| Property | Type | Requirement | Direction |
| --- | --- | --- | --- |
| `ratingValue` | number `0..5` | required | Preserve as target-supplied data attribute and Star Rating input. |
| `scoreLabel` | string | required | Preserve as visible localized score. |
| `ratingLabel` | string | required | Map only to the composed Star Rating accessible label. |
| `reviewCount` | non-negative integer | required | Preserve as target-supplied data attribute. |
| `reviewCountLabel` | string | required | Preserve as visible localized text. |
| `distribution` | slot | optional | Preserve target-owned rows and fill proportions. |
| `distributionLabel` | string | required | Add a localized accessible name for the optional distribution list; unused when the slot is omitted. |

Do not add events, value setters, scale normalization, bucket arrays, percentage
calculation, formatting callbacks, provider identifiers, links, loading state or
framework-controlled state. Distribution records remain composition because the
row schema and scale are not yet accepted cross-target API.

## Tokens And Literal Audit

- Public semantic references: primary/secondary text, accent data fill, subtle
  border, secondary surface, full radius, element rhythm and the existing
  heading/body/caption typography decisions.
- Private composition: score-to-stars gap, rows gap, row columns/gap, track
  thickness, average minimum measure and split threshold.
- Native/semantic literals: one physical CSS pixel for a subtle separator.
- Remove the Button background token: review data is not a Button state.
- Remove the motion token: the component owns no transition.
- Expose no new Review Summary-specific public custom property.

## Accessibility And Interaction

- One canonical Star Rating owns the aggregate accessible value and scale.
- Numeric score remains visible but is `aria-hidden` to avoid duplicate speech.
- Review count remains visible and independently readable.
- Optional distribution is a labelled list with a visible label and count in
  every row; bars are supplemental and hidden from assistive technology.
- No custom role, landmark, heading, live region, focus stop or keyboard model.
- With CSS disabled, caption, rating label, count and distribution text preserve
  reading order and meaning.
- In forced colors, preserve a visible separator and track/fill distinction; the
  data remains understandable even if the graphical distinction is reduced.
- No motion means normal and reduced-motion modes are behaviorally identical.

## Responsive And Content Test Matrix

- Mobile `390 x 844`, Tablet `768 x 1024`, Desktop `1280 x 800`, XL
  `1600 x 1000`, each in Exhibit and Studio.
- Narrow embedded and wide component containers independent of viewport.
- Short `5.0` / `1 review`, localized long labels, zero reviews, maximum rating,
  low rating, long unbroken count text, RTL wrapper and 200% zoom-equivalent
  narrow width.
- Distribution omitted, one row, five rows, zero-count rows and deliberately
  uneven target-supplied widths.
- Light, dark, forced colors, normal motion and reduced motion.
- Verify no focusable descendants, horizontal overflow, source-order change,
  duplicate accessible name, listener, observer, timer, request or bundled asset.

## Cross-Target Translation

- Neutral Web: native figure/caption/list anatomy plus canonical CSS and composed
  Star Rating. Target code supplies values and inline fill sizes.
- Shopify: remain CSS-ready/planned until an accepted provider or metafield model
  supplies truthful aggregate, scale, count, labels and distribution. A future
  Liquid adapter should use Shopify/partner data and locale keys, not merchant
  free-text fields pretending to be computed review data.
- React/Angular: render the same passive semantic tree. Props are supplied values
  and composition; no controlled/uncontrolled lifecycle exists.
- Figma: expose semantic content, distribution visibility and reviewed public
  tokens. Do not expose provider, calculation or private bar geometry.
- SwiftUI/Compose: map to one accessibility element for rating, ordinary count
  text and an optional labelled data list; use native layout adaptation rather
  than copying DOM details.

## Exhibit And Studio Parity

- Keep one `ReviewsStudio` renderer, definition and initial fixture for both
  surfaces.
- Add `distributionLabel` to the shared fixture and semantic inspector controls.
- Remove the motion control because Review Summary has no accepted motion API.
- MDX remains fallback/source documentation and must mirror figure, caption,
  composed Star Rating and list anatomy.
- The generic Figma frame contains no Review Summary evidence; it is traceability
  context, not visual approval.

## Performance Budget

- Reviews family: baseline `3,323 B` gzip; v1 ceiling `3.7 KiB` (`3,788 B`).
- Passive component runtime: `0 B` component JS and no listener, observer, timer,
  formatter, network request, layout read or animation loop.
- Canonical assets: `0` bundled requests.
- DOM/work: linear in target-supplied distribution rows; large datasets and
  virtualization are outside the component.
- Neutral Web total and shared runtime currently exceed their original program
  ceilings due to previously recorded program-wide work. This batch must report
  its measured delta and add no Review Summary runtime.

## Decision Ledger

### Source-backed corrections accepted for this batch

- Native figure/caption/list semantics.
- One accessible Star Rating owner and no duplicate root label.
- Required localized distribution label when the optional list is rendered.
- Canonical container-responsive layout.
- Passive, motion-free core and semantic accent fill.
- Complete typography and private geometry classification.
- Shared Exhibit/Studio/MDX anatomy and fixture.

### Deliberately unresolved

- A11 Rating versus V2 Star Rating retention or consolidation.
- Formal registry dependency reconciliation for Review Summary.
- Provider, data model, aggregation, normalization, missing-value and update
  policy.
- Shopify section/snippet/block shape before truthful target data exists.
- Structured review data and review-destination navigation.
- Human visual approval of score hierarchy, fill/track treatment, split and
  spacing.

## Risks And Human Review

- Requiring V2 Star Rating in the reviewed anatomy while leaving the registry
  edge empty is an explicit temporary architecture boundary, not proof of no
  dependency.
- `distributionLabel` is required even when the optional slot is absent because
  the current contract schema has no conditional requirement. Targets may omit
  it from markup when no distribution is rendered.
- Target-supplied fill sizes can contradict counts. The neutral component cannot
  validate provider truth without an accepted row data contract.
- A target that updates aggregates in place may need announcements, but that
  lifecycle must be owned outside this passive component.
- Human review must approve visual hierarchy, density, bar contrast, track
  thickness and the stacked/split threshold before stability promotion.

## Proposed Certification Result

After the source, contract, documentation, adapters, four-viewport evidence,
special-mode checks and content stress tests are reconciled, Review Summary may
become `human-review-ready`. It must remain `pilot`; only explicit human approval
can promote it to `stable`.
