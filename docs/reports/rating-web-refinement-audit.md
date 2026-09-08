# Rating Stars Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Decision: ADR 0235

## Outcome

A11 Rating is now The Gallery's single canonical passive rating display. It
combines the useful former A11 and V2 capabilities: a required target-supplied
`0..5` half-step value, required localized accessible label, optional localized
count, and `default | lg` presentation. The shared renderer fails closed for
invalid required composition, adds no neutral runtime, and is used unchanged by
Exhibit, Studio, Review Summary, Review, and the temporary deprecated V2
migration page.

V2 Star Rating is deprecated before v1 and owns no alias or implementation.
Star Input remains the independent interactive field. The candidate is ready
for explicit human visual/stability review but is not promoted to `stable`.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive half-step projection; not input, aggregate, formatter, provider, link, live status, or normalizer. |
| Anatomy | pass | Ordinary root, one named star image, five decorative shape-distinct stars, optional independent count. |
| States and sizes | pass | `0`, half steps, `5`, omitted/present count, `default | lg`, light/dark/forced colors, RTL, reduced motion. |
| Public API | pass | Only `ratingValue`, `accessibleLabel`, optional `reviewCount`, and optional `size`; no incoherent internals exposed. |
| Strict composition | pass | Invalid step, missing value, blank label, and unsupported size emit no root. |
| Accessibility | pass | One image name, hidden glyphs, shape plus color, no focus/keyboard/pointer/live-region behavior. |
| Responsive/content | pass | Four viewports, long Arabic RTL count, wrapping, omitted content, 200% zoom, no component overflow. |
| Runtime/assets | pass | Zero component JS, listeners, observers, timers, requests, animations, layout reads, or assets. |
| Canonical dependencies | pass | Review Summary and Review compose `.rating`; no `.star-rating*` selector remains. |
| Cross-target mapping | pass | Neutral Web and Shopify implemented; future framework/Figma/native mappings documented. |
| Exhibit/Studio parity | pass | One `RatingArtwork` renderer and one fixture produce exact canonical root DOM. |
| Performance | pass | Primitives `10,547/10,547 B` gzip; Rating slice `1,551 B` raw / `598 B` gzip; zero runtime. |
| Human stability review | pending | Final star form, color, sizes, spacing, count hierarchy, and composed appearance require owner approval. |

## Browser Evidence

- Exhibit and Studio initial roots are exact matches and contain five decorative
  stars, one `role="img"` labelled `3.5 out of 5 stars`, optional `24 reviews`,
  and zero focusables.
- Canonical cases pass for `0`, `0.5`, `3.5`, and `5`; large mode computes to
  24px. Count omission removes the element. Invalid `3.7`, blank label, and
  missing value emit no root.
- The deprecated Exhibit and Studio routes emit the same canonical root, with
  zero `.star-rating`, `.star-rating__stars`, or `.star-rating__star` matches.
- Review Summary and Review each render `.rating[data-rating="4.5"]` with
  matching localized image text and zero legacy selectors.
- Long Arabic RTL content has no stage or Rating overflow. At effective 200%
  zoom the Rating remains contained inside the preview stage.
- Dark and forced-color projections remain legible and shape-distinct. Reduced
  motion finds zero animations and transitions.
- One Playwright session, one tab, and one managed Gallery server were used.
  Final console count is zero errors and zero warnings; cleanup/assert-clean
  confirms the server, port, browser, and session are closed.

## Source And Adapter Result

- `components/css/primitives.css` owns the only canonical selectors and two
  sizes. Redundant flex-item declarations were removed to keep the family at
  its unchanged ceiling.
- `RatingArtwork.tsx` performs strict composition and supplies the one shared
  Exhibit/Studio DOM. This site renderer is evidence tooling, not neutral
  component runtime.
- `components/css/reviews.css`, Review Summary, and Review depend on
  canonical Rating; the former V2 CSS block is removed.
- Shopify's `rating.liquid` maps official Rating metadata, validates compatible
  scale/value data, owns the deliberate nearest-half projection, localizes
  visible and accessible copy, supports `default | lg`, and renders five states.
- Generated Web and Shopify adapters are rebuilt from canonical sources. No
  generated file is treated as source.

## Performance

| Surface | Result |
| --- | ---: |
| Rating CSS slice | `1,551 B` raw / `598 B` gzip-9 |
| Primitives family | `10,547 / 10,547 B` |
| Rating component runtime | `0 B` |

The Primitives family passes with zero headroom. Existing documented global CSS
and runtime gaps remain program-level constraints and are not attributed to
Rating or hidden by a budget increase.

## Remaining Human Review

1. Approve or revise accent, empty outline, half fill, `default`/`lg` scale,
   gaps, count hierarchy, and baseline alignment.
2. Review standalone Rating plus Review Summary and Review compositions.
3. Confirm the documentation fixture; it is not a semantic default.
4. Keep provider normalization, rounding, missing/zero, aggregation, structured
   data, navigation, and announcements target-owned.
5. Do not promote to `stable` without explicit owner approval.

`site/dist` was not rebuilt or modified.
