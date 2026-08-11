# Review Summary Neutral-Web Refinement Audit

Status: Ready for human review; contract remains `pilot`

Date: 2026-07-15

Component: Review Summary (`V1`)

## ADR 0235 Update (2026-07-20)

The rating-identity and dependency gaps described in the original audit are now
resolved. Review Summary contract `0.4.0` depends on canonical A11 Rating and
supplies an explicit half-step `ratingDisplayValue` separately from its exact
aggregate `ratingValue`. V2 Star Rating is deprecated, and the final browser
probe finds canonical `.rating[data-rating="4.5"]` with zero legacy selectors.
No neutral rounding path was added. Historical A11/V2-open wording below is
superseded; provider aggregation and final human visual approval remain open.

## Result

Review Summary now has a researched dossier, accepted passive-composition
decision, native figure/caption/list semantics, one accessible Star Rating
owner, intrinsic component-width layout, complete text equivalents, curated
semantic configuration, generated Web/Shopify/Webflow CSS parity, exact
Exhibit/Studio markup parity and browser evidence across the permanent rubric.

The component is prepared for human visual and stability review. It was not
promoted to `stable`. Provider/aggregation policy, Shopify data integration,
formal registry dependency reconciliation and the A11 Rating/V2 Star Rating
identity remain explicit architecture boundaries.

## Research And Decision

- The [HTML figure model](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element)
  supports one self-contained aggregate plus caption. A labelled list then
  preserves optional distribution structure without inventing a widget.
- The [WAI complex-image tutorial](https://www.w3.org/WAI/tutorials/images/complex/)
  requires a complete text equivalent for chart-like information. Visible
  bucket labels and counts remain authoritative while tracks/fills are hidden
  from assistive technology.
- [WCAG Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
  and [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
  support text-plus-graphic redundancy. The data fill also maintains measured
  track distinction in light and dark themes.
- WAI-ARIA APG, Radix and Polaris define no Review Summary widget. MUI's
  read-only Rating provides relevant single-label evidence, not a component API
  to copy.
- Shopify exposes a value/scale Rating object but no universal provider or
  distribution model. CSS is target-ready; a truthful Liquid implementation is
  not inferred.
- Direct read-only Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame
  `943:7` and inspector `1020:480` found only the generic Button Studio
  prototype and no Review Summary evidence.

ADR 0132 records the safe direction. ADR 0085 continues to own supplied-data and
Star Rating composition boundaries. ADR 0110 keeps the A11/V2 identity question
open.

## Contract And Implementation Result

- Registry description now calls Review Summary a passive aggregate with an
  optional target-supplied distribution.
- Contract `0.3.0` remains `pilot`: 11 anatomy parts, seven semantic properties,
  two distribution states, five behaviors, one default variant/size and 18
  declared public token references.
- `figure.review-summary` owns no landmark or widget role. Required
  `figcaption.review-summary__average` contains visible score, canonical Star
  Rating and visible review-count text.
- Star Rating is the single `role="img"` owner of the localized value and scale.
  The repeated visual score is `aria-hidden`; the root has no duplicate label.
- Optional distribution is a localized `ul` with five fixture `li` rows. Every
  track/fill is supplemental to visible label/count text.
- `distributionLabel` is the only new semantic property. It is required by the
  current schema and emitted only when the optional list exists.
- The average and distribution flex and wrap from private intrinsic bases. No
  Review Summary viewport query or docs-only responsive correction remains.
- Row side tracks use bounded intrinsic sizing, allowing localized and unbroken
  labels/counts to wrap while the data track retains a flexible minimum.
- Complete score/body/caption typography uses existing semantic tokens. Data
  fill uses `--color-text-accent`, not a Button state token. Geometry remains
  private.
- Passive width transition and motion token/control are removed. Review Summary
  owns no component JavaScript, event, focus, observer, timer, request,
  calculation, animation or asset.
- Shared renderer, fixture, Studio definition and MDX agree on the same semantic
  tree. Studio exposes seven semantic values/slots and curated public tokens.

## Browser Evidence

### Parity, Semantics And Four Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1280x1000`) and XL
  (`1600x1080`) produce exact initial Exhibit/Studio `outerHTML` parity with
  SHA-256 `697531db8d7f46876ab78085d5c922d1c45c8c5ceb1b59a6d807000be2ebad78`.
- The before hash was
  `ed5abc157c638b8bb2695ab24055d5d1cb1141dbeee728119493f0b793e21a9d`.
  The semantic change is intentional and documented.
- Candidate widths are `326/326`, `640/640`, `356/468` and `520/640px` for
  Exhibit/Studio. Client width equals scroll width everywhere.
- Mobile, Desktop and XL Exhibit remain stacked at their actual narrow candidate
  widths. Tablet and XL Studio resolve the split. No viewport rule participates.
- Every tree is `FIGURE > FIGCAPTION + UL`, every distribution child is `LI`,
  source order stays average then distribution, and the candidate has zero
  focusable descendants.
- Each candidate has exactly one rating image, no root accessible label, one
  hidden duplicate score, one localized list label and `0s` fill transition.

### Optional, Extreme And Intrinsic Layout

- Distribution-off leaves only the required `FIGCAPTION`; it creates no empty
  list, focus stop or overflow.
- A truthful zero candidate exposes `data-rating="0"`,
  `data-review-count="0"`, one `0 out of 5 stars` image label, zero filled stars,
  visible `0.0` / `0 reviews`, and no distribution.
- Isolated `260/320/520px` hosts yield `228/288/488px` stacked candidates.
  Isolated `640/900px` hosts yield `608/868px` split candidates. All preserve
  source order and exact client/scroll widths.
- A `228px` candidate with long unbroken score, count, row labels and row counts
  has zero root or descendant overflow; every row's client and scroll width is
  `228px`.
- A `326px` RTL Arabic candidate preserves direction, average-then-distribution
  source order and zero root/descendant overflow.

### Contrast And Preferences

- Score/supporting text measure `17.93:1 / 7.81:1` light and
  `17.18:1 / 12.09:1` dark against the rendered surface.
- Accent fill versus track measures `3.26:1` light and `6.69:1` dark. Visible
  labels/counts remain the complete data equivalent regardless.
- The subtle root separator measures `1.26:1` light and `1.73:1` dark. It is
  decorative and conveys no grouping or state required for understanding.
- Forced colors resolves score/count/fill/separator to system black on system
  white and preserves a system track border.
- Reduced motion reports zero subtree animations and no nonzero transition.
- Eight before images, eight final viewport images and twelve special/intrinsic
  images live under `output/playwright/refinement-batch-47/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native figure/caption/list, composed Star Rating and intrinsic passive CSS. | Implemented, generated and validated; values and distribution stay target-supplied. |
| Shopify | Generated canonical Reviews CSS with future provider-backed Liquid composition. | CSS-ready/planned; no false merchant aggregate, provider or JavaScript invented. Official CSS validation passes. |
| Webflow | Byte-identical canonical target-agnostic CSS. | Generated path available; CMS/provider projection remains target-owned. |
| React / Angular | Passive figure/list with supplied values and composition. | Planned; no controlled/uncontrolled lifecycle exists. |
| Figma | Semantic labels, distribution visibility and reviewed public tokens. | Planned; registered artwork has no component-specific evidence. |
| SwiftUI / Compose | One accessible rating element, ordinary count and optional labelled data list. | Conceptual; provider and formatting stay target-owned. |

Canonical `components/css/reviews.css`, Shopify `assets/reviews.css` and Webflow
`reviews.css` are byte-identical after regeneration. Shopify's full adapter still
reports 56 target-ready components, 28 dedicated Liquid templates and 19/19
schema-ready components.

## Performance And Risks

- Reviews CSS is `3,440 B / 3.7 KiB`, leaving `348 B`; this is `+117 B` from
  Batch 47 baseline.
- Complete Neutral Web component CSS is `67,943 B / 64 KiB`, a `2,407 B`
  current program gap and `+163 B` from Batch 46.
- Shared runtime is unchanged at `10,580 B / 8 KiB`, retaining the existing
  `2,388 B` exception. Review Summary adds `0 B` component runtime.
- Human review must approve score/Star Rating/count hierarchy, accent/track
  treatment, row density, alignment, private bases and wrap point.
- V2 Star Rating itself is review order 149 and inherits its own unresolved
  identity relative to A11 Rating. This batch does not pre-approve that visual
  or architecture decision.
- Formal dependency reconciliation and a provider-backed Shopify/data model
  remain separate work. Target-supplied fill sizes can contradict counts until a
  row/data contract is accepted.

All ceilings remain unchanged. Existing total-CSS/runtime overages stay explicit
program gaps rather than being hidden by new budgets.

## Validation

Registry/docs, source tokens, 183 contracts, 183 Studio definitions, Neutral
Web, Shopify and copied CSS, mandatory Shopify documentation research and
official CSS validation revision 2, exact four-viewport DOM parity, optional/
zero/extreme/RTL/intrinsic probes, light/dark contrast, forced colors, reduced
motion, deterministic gzip, source/generated identity, a temporary Vite build
outside `site/dist`, structural/static/parity/refinement audits, diff checks,
isolated final console and explicit `site/dist` cleanliness comprise Batch 47.

`site/dist` was not rebuilt or modified.

## Remaining Human Review

- Approve or revise score hierarchy, Star Rating appearance, accent fill, track
  contrast/thickness, row density, alignment, flexible bases and wrap point.
- Confirm that `distributionLabel` plus the six existing values/slots are the
  maximum coherent neutral API and that row schema, provider logic, internal
  geometry and target events remain private/target-owned.
- Decide separately whether A11 Rating and V2 Star Rating remain distinct, then
  reconcile any formal Review Summary dependency deliberately.
- Select a review provider/data/aggregation model before creating target-native
  Shopify review markup.
- Produce component-specific Figma artwork and complete human visual review.
- Do not promote the contract to `stable` without explicit human approval.
