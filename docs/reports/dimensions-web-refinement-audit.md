# Dimensions Display Web Refinement Audit

Date: 2026-08-11

Batch: 114

Component: R5 `dimensions`

Status: ready for explicit human review; remains `pilot`

## Outcome

Dimensions Display is now a target-formatted measurement presentation rather
than a hidden converter. A generic root contains an optional truthful figure,
one required native description list and an optional canonical radio-backed
Segmented Control. Each quantity remains explicit in visible text, each value
arrives as one complete preformatted string, and invalid required content fails
closed.

Exhibit and Studio consume one renderer and fixture. The docs target can choose
between two independently authored formatted fixture sets, but R5 owns no
conversion, precision, rounding, locale, persistence, announcement or second
selected-unit state. Canonical CSS owns the image containment, annotations,
measurement rows, intrinsic response and special-color boundaries.

Owner decision 59 accepts complete target-formatted sets and no neutral
conversion or mixing of converted and supplied values. Precision, rounding,
locale, tolerance, available unit sets and preference persistence are target
responsibilities. Production set mapping/provenance, measurement inventory,
qualification and stale/error policy, announcement need, diagram/media policy,
Shopify records/editor, final visual values, R5-specific design evidence and
explicit human review remain open. The contract stays `pilot` and is not
promoted to `stable`.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Presents target-formatted quantities; does not measure, convert, infer, round or localize. |
| Anatomy and composition | pass | Generic root, optional direct figure, required direct native `dl`, optional canonical Segmented Control. |
| Required/optional content | pass | Invalid peers filter; no valid measurements omit the root; visual and unit choice remain independently optional. |
| States and modes | pass for neutral scope | R5 has no selected state; the canonical radio group owns one value and the target replaces the active content set. |
| Tokens and CSS | pass | 15 existing public tokens, private compositional geometry, logical properties and no R5 Studio anatomy override. |
| Accessibility | pass | Native name/value and exclusive-choice semantics, truthful alternative, redundant hidden annotations, visible units, `bdi`, focus and keyboard. |
| Responsive/content resilience | pass | Four paired natural viewports plus `200/320/430/680px`, localization, qualifiers, RTL, unbroken content, 200% text and spacing with zero overflow. |
| Runtime/performance | pass for R5/Ceramics | Zero R5 runtime; shared runtime unchanged; Ceramics retains `535 B` gzip headroom. |
| Exhibit/Studio parity | pass | Shared renderer/fixture and exact same-host normalized DOM/style hashes. |
| Targets | Web implemented; others bounded | Web/Webflow/Shopify CSS projections validate; target-native data and interaction mapping remain planned. |
| Human review | required | Production set mapping/truth, qualifications, announcements, Shopify, final visuals and R5-specific design evidence remain open. |

## Anatomy, API And Behavior

The `0.2.0` target-agnostic contract exposes three semantic slots:

| Property | Requirement | Behavior |
| --- | --- | --- |
| `visual` | optional | Target-owned informative figure/diagram; redundant annotations may be assistive-hidden only when the text list repeats them completely. |
| `measurements` | required non-empty | One coherent active set of complete target-formatted name/value records. |
| `unitControls` | optional | Canonical Segmented Control; target owns selected value and replacement of the complete active set. |

The verified fixture produces a generic `DIV` with no role, accessible-name
attribute or tabindex. Its optional direct `FIGURE` contains one truthful image
with intrinsic dimensions and two redundant annotations hidden from assistive
technology. The direct `DL` contains three direct `DIV` groups; every group has
one `DT`, one `DD` and one `BDI` value. The optional direct `FIELDSET` has a
visible legend and two same-name native radio inputs.

Without the visual, one complete text presentation remains. Without unit
choice, the root has no focusable descendants. Without valid measurements, the
root count is zero. One measurement collapses to one complete `320px` row with
zero overflow.

## State Ownership And Interaction

R5 receives an already active content set. It owns no `value`, `defaultValue`,
selected unit, conversion factor, formatter, precision, locale, tolerance,
timer, request, persistence or live region. Canonical Segmented Control owns
controlled/uncontrolled selected-value projection, focus, keyboard, form and
change behavior; a target coordinates the selected value with content
replacement.

In Studio, `ArrowRight` from the checked `cm` radio checks and focuses `in`,
emits one native `input` and one `change` event, and replaces all three visible
values with the independently authored `4.7 in`, `9.4 in` and `3.9 in` set.
Both visual annotations change with that same set. R5 does not calculate these
strings and the measurement list is not a live region.

## Accessibility

Native `dl/div/dt/dd` structure preserves quantity/value relationships without
CSS, media or JavaScript. `bdi` isolates formatted values across bidirectional
content. Quantity names and units are visible; neither color, position nor the
image is the only carrier of information.

The optional unit choice exposes one visible group label, same-name radios and
exactly one checked value. Native Tab, Arrow and Space behavior remains owned by
the canonical dependency; R5 adds no duplicate `aria-pressed`, state attribute
or key handler. There are zero state attributes outside the control, zero live
regions and zero R5 scripts.

Measured text contrast:

| Mode | Term/legend/option | Value |
| --- | ---: | ---: |
| Light | `17.93:1` | `7.81:1` |
| Dark | `17.18:1` | `12.09:1` |

Forced colors preserves CanvasText boundaries around the visual and rows plus a
visible selected/focus treatment on the radio group. Reduced-motion inspection
finds zero active motion parts.

## Responsive And Extreme Content

Paired natural Mobile, Tablet, Desktop and XL captures pass in Exhibit and
Studio with three measurements, one checked unit and zero root, part or
document overflow. The docs presentation intentionally bounds the fixture at
`520px`; the component itself responds to its own available inline size.

Forced direct roots resolve as follows:

| Root | Regions | Measurement columns | Height | Overflow |
| ---: | ---: | ---: | ---: | ---: |
| `200px` | 1 | 1 | `598px` | 0 |
| `320px` | 1 | 2 | `616px` | 0 |
| `430px` | 1 | 2 | `629px` | 0 |
| `680px` | 2 | 2 | `298px` | 0 |

The two-region change uses intrinsic tracks on the actual component rather than
a viewport breakpoint or target mode. A `200px` RTL/unbroken stress case,
localized decimal-comma values with approximation and tolerance, effective
200% text and user text spacing all grow without horizontal overflow, overlap
or clipping.

## Tokens, CSS And Composition

R5 consumes 15 reviewed public token references for surface/text/border,
body/body-small typography, radius, shadow and layout spacing. Visual ratio,
annotation placement/line thickness and the `20rem` intrinsic region threshold
remain private implementation geometry rather than semantic API.

The source CSS uses logical properties, `min-inline-size: 0`, bounded media,
`overflow-wrap: anywhere`, deterministic native margins and a named
`dimensions` container for row stacking. R5's duplicate pressed-button styles
were removed; canonical Segmented Control owns its own tokens, focus and control
geometry. Studio retains only a docs-host width/margin boundary, not component
anatomy or response.

`DimensionsArtwork`, `buildDimensionsFixture`,
`DimensionsFixtureVisual` and `SegmentedControlArtwork` form the shared
Exhibit/Studio implementation path. React and the sample image remain docs-site
consumer concerns; neither is introduced into the target-agnostic contract or
runtime.

## Exhibit And Studio Parity

Natural Mobile and Tablet component geometry is exact across modes; Desktop and
XL use the same bounded fixture inside different docs hosts. With the same
`620px` host and public tokens, Exhibit and Studio both produce:

- DOM hash `344a7c27`;
- style hash `1629a46f`;
- `620px` component and description-list widths;
- one visible root region at that normalized fixture width;
- zero overflow.

Static parity validation additionally checks one registered renderer and
fixture rather than separate Exhibit and Studio implementations.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented with generic root, native description list, optional truthful figure, optional canonical native-radio unit choice and zero R5 JavaScript. |
| Shopify | CSS projection validates. Liquid/schema remains planned until product/variant record source, unit/precision/locale policy, merchant validation and first consumer are approved. |
| Webflow | Source-identical Ceramics CSS; CMS supplies complete formatted records and truthful media. Unit choice requires target code and verified complete sets. |
| React/Angular | Thin renderer receives active formatted records and slots; host state coordinates a canonical exclusive control with content replacement. |
| Figma | Future component models visual/control absent and present, one/many records, selected unit and narrow/wide modes; current generic registered nodes are not R5 approval. |
| SwiftUI/Compose/future | Use native labelled-value groups and platform exclusive choice while keeping conversion/formatting in data or domain services. |

No target schema, numeric model, unit inventory, precision rule, converter or
preference service was invented in canonical R5 source.

## Automated And Browser Verification

Browser evidence passes for shared structure, conditional anatomy, native radio
interaction, target content replacement, four paired natural viewports,
intrinsic widths, localized/extreme content, RTL, effective 200% text, user
spacing, contrast, forced colors, reduced motion and exact normalized parity.
There are no console issues or page errors.

Final structural/build gates pass:

- `npm run validate:contracts` (`183` contracts)
- `npm run validate:studio` (`183` definitions, `901` properties)
- `npm run validate:docs` (`183` registry components and MDX pages)
- `npm run audit:previews:static` (`251` previews, zero errors)
- `npm run build:components`
- `npm run build:adapter:web:components` (`183` components, `19` CSS sources)
- `npm run build:adapter:shopify:components` (`183` components, `83`
  target-ready, known maturity warnings only)
- production Vite build outside `site/dist` (`2475` modules)
- `npm run audit:exhibit-studio` (`183/183` shared paths and complete
  interaction classification)
- `npm run audit:components` (`183/183` automated passes, one human-approved
  stable contract and `182` pilots)
- `npm run audit:refinement` (`183/183` dossiers; current global count is
  recorded by the refinement matrix rather than this historical Batch 114 run)
- source-identical Webflow and Shopify Ceramics CSS projections
- `npm run evidence:cleanup` and `npm run evidence:assert-clean`

All browser probes and captures were rerun after the final source-CSS change.
No command wrote `site/dist`.

Evidence under `output/playwright/refinement-batch-114/` contains four preserved
before images, eight paired natural after images, seven special after images,
executable probes and `evidence-summary.json`.

The evidence lifecycle used one fixed-port managed server, one explicit
headless Chromium session, stable session `gallery-refinement` and one tab.
Exhibit, Studio, states and viewports were visited sequentially. Cleanup closed
the owned session and server; the final URL is unresponsive, port is free and
`evidence:assert-clean` passes.

## Performance

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| R5 CSS slice | `1,731 B` raw / `674 B` gzip | `3,671 B` raw / `996 B` gzip level 9 | observation baseline | exact Batch 114 source SHA; compression-method variance only |
| Ceramics CSS | `29,320 B` raw / `4,664 B` gzip | `34,028 B` raw / `4,858 B` gzip level 9 | `5,427 B` | pass; `569 B` headroom after later R-family work |
| Neutral Web component CSS | `519,152 B` raw / `70,129 B` gzip | `537,270 B` raw / `72,254 B` gzip level 9 | `65,536 B` | documented global gap; zero R5 reconciliation delta |
| Shared neutral runtime | `53,811 B` raw / `10,565 B` gzip | `117,741 B` raw / `22,807 B` gzip level 9 | `8,192 B` | documented global gap; zero R5 reconciliation delta |
| R5 listeners/observers/timers/requests | `0` | `0` | zero-runtime boundary | pass |

Final SHA-256 values:

- R5 slice: `f8ac4ef1602dcffae486c8e847343aa05396b5ea6555d25c2028e8a064523ad5`
- Ceramics CSS: `6000262b493b7e08354914ec85ad4481999303f2cf6183e2a668c6a4018ab789`
- Neutral Web component CSS: `60f96d00ec417e28130743564fde1d4fdffc983e1f84012520f47ad306062a3f`
- shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

Webflow and Shopify Ceramics CSS copies are source-identical after generated
adapter validation.

## Risks And Open Questions

1. Which production target first proves complete formatted-set mapping,
   provenance and stale/error fallback without neutral conversion or mixed
   sources?
2. Which quantities belong in v1, which are required, and how do product,
   variant, packaging and shipping dimensions remain distinct?
3. How are approximation, tolerance, uncertainty, handmade variation,
   orientation, method and significant figures communicated?
4. Which unit systems are supported, how is one chosen, and is preference
   synchronized with future Size Chart or persisted by a target?
5. Does any verified context require concise result announcement after unit
   choice, beyond native selected-radio feedback and ordinary reading?
6. Which diagrams are informative, redundant or decorative, and who guarantees
   alt text, annotation accuracy, scale, crop, rights and active-set parity?
7. Which Shopify surface consumes R5 first, and what record source, dynamic
   mapping, schema, editor validation and migration are approved?
8. Is the current 4:3 visual, annotation treatment, row styling and intrinsic
   two-region response approved, and where is R5-specific Figma evidence?

Decision 59 is reconciled and R5 is prepared for explicit human review, not
stability promotion.
