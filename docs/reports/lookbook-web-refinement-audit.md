# Lookbook Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-15

Component: Lookbook (`S6`, review order `166`)

## Outcome

Lookbook is now a passive, finite, source-ordered editorial composition with
truthful conditional root semantics, native ordered-list and figure anatomy,
persistent captions, target-owned native activation and no neutral runtime.
One named component container owns its private asymmetric geometry.

Exhibit and Studio use the same fixture, DOM and canonical CSS. A localized
Shopify Section Adapter maps complete reorderable image blocks and an optional
native product-link hotspot without creating a neutral commerce model. ADR 0150
records the durable boundary.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Root semantics | Every root was an unnamed `section` | Titled named `section`; untitled generic `div` | pass |
| Required composition | Missing items left an empty root | Missing required slot yields root count `0` | pass |
| Sequence semantics | Generic `div` collection/cells | Native `ol`/`li` and target `figure`/`figcaption` | pass |
| Passive interaction | Four unnamed tab stops, zoom and empty pulsing hotspot | Zero passive focus, no motion; native target action only | pass |
| Caption access | Hidden until hover/focus | Persistent opacity `1` in every mode | pass |
| Responsive ownership | Viewport, generic and Studio rules competed | One named component container | pass |
| Narrow content | Desktop token padding overflowed at direct `200px` | Bounded existing padding pattern; no overflow | pass |
| Theme contrast | Fixed black scrim plus inverse token failed dark mode | Adaptive semantic pair: worst case `4.69:1` light, `6.06:1` dark | pass candidate |
| Parity | Shared branch but host CSS changed geometry | Exact normalized subtree and canonical layout | pass |
| Shopify | CSS-ready without Liquid/schema/data | Localized `ready: true` Section Adapter | pass |

## Contract And API

Contract `0.3.0` remains `pilot` with two semantic properties:

- `title` — optional non-empty contextual heading and thematic-section name.
- `items` — required source-ordered target-owned native item compositions.

S6 exposes no columns, thresholds, rows, spans, gap, crop, ratio, image record,
caption string, opacity, product, URL, coordinates, disclosure, loading,
heading level, animation, editor object or event. It has no
controlled/uncontrolled store. Disclosure delegates to canonical Popover or a
complete target-native equivalent.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Passive finite editorial sequence; target action and data remain outside S6. |
| Anatomy and composition | `pass` | Conditional root/header/title plus required ordered list, cells and target figures. |
| Variants and modes | `pass` | Default plus item wide/tall; titled/untitled, complete/invalid and target-action profiles explicit. |
| Public API | `pass` | Two semantic properties; all geometry and target data remain private/owned. |
| State ownership | `pass` | No local store, selection, focus controller or disclosure lifecycle. |
| Tokens and values | `pass` | Nineteen existing public references; scrim/geometry remain documented private candidates. |
| Visual system | `pass` for candidate | Four paired viewports, direct roots, counts, themes and extremes; aesthetics await owner approval. |
| Accessibility | `pass` | Named section, ordered list, figures/captions, stable order and zero passive focus. |
| Interaction | `pass` | Synthetic native product link has name, 44px target, focus and Enter activation. |
| Motion | `pass` | Pulse, zoom and transitions removed; global reduced-motion clamp verified. |
| Responsive behavior | `pass` | One named inline-size container; no viewport/Studio geometry or reorder. |
| Content resilience | `pass` | One/two/seven, empty caption, untitled/invalid, RTL, unbroken and `200px` contain. |
| Runtime and assets | `pass` locally / global gap | Zero S6 JS/assets; Sections family budget passes. |
| Cross-target translation | `pass` for Web/Shopify | Web/Webflow/Shopify CSS synchronized; Shopify section fully ready. |
| Documentation parity | `pass` | Exact normalized Exhibit/Studio subtree and matching MDX composition. |
| Verification | `pass` | Validators, official Liquid, browser matrix, budgets, copies, console, diff and clean `site/dist`. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-65/` with nine
  baseline and 26 final captures.
- Exhibit and Studio normalize to `2,156` characters and FNV-1a `1d32498f`
  across Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL
  `1536x960`.
- Default roots contain a valid named `SECTION`, `OL`, six `LI`, six
  `figure`/`figcaption`, six contextual alternatives and zero focus stops.
- Root widths/tracks are `358/2`, `736/4`, Exhibit Desktop `420/2`, Studio
  Desktop `532/2`, Exhibit XL `584/2` and Studio XL `752/4`; none overflow.
- Direct `200/260/520/900/1120px` roots resolve one/one/two/four/four tracks.
  One/two/seven items, empty caption, titleless and invalid cases remain
  coherent and source ordered.
- A synthetic target product link is the only focus stop, measures `44x44px`,
  has a localized-style accessible name, a `2px`/`2px` focus treatment and
  reaches `#lookbook-product` by Enter.
- Title contrast is `17.93:1` light and `17.18:1` dark. Caption worst-case
  contrast is `4.69:1` light and `6.06:1` dark. Forced colors preserves caption
  and hotspot; reduced motion reports no S6 animation or transition.
- Arabic RTL and unbroken `200px` localized content have equal client/scroll
  width and `overflow-wrap: anywhere`. The final console has zero errors and
  zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,855 B` | `6,814 B` | `6,861 B` | pass; `41 B` reduction, `47 B` remaining |
| Neutral Web component CSS | `67,874 B` | `66,941 B` | `65,536 B` | existing gap `1,405 B`; synchronized target delta `-933 B` |
| Shared neutral runtime | `10,589 B` | `10,492 B` | `8,192 B` | existing gap; synchronized target delta `-97 B`; S6 adds `0 B` |

S6 adds no listener, observer, timer, request, measurement, formatter, custom
element, JavaScript or asset. Canonical, Webflow and Shopify Sections CSS are
SHA-256-identical (`fd468c549ea9c9e30c47b97a1fc7fbc4f76fbf33d4547e6d24f62d08766047f1`).

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced passive composition. |
| Shopify | `implemented`, `ready: true`, section adapter with all required maturity layers ready. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical. |
| React / Angular | Planned thin optional-title/required-children composition with no local store. |
| Figma | Generic Studio shell traceability only; density and caption identity need owner review. |
| SwiftUI / Compose | Documented native adaptive ordered collection with target-owned routing/media. |

Shopify metrics after the batch are 62 target-ready components, 32 dedicated
Liquid-ready components and 23/23 ready section schemas. S6 has one section
setting, eight block settings, a preset, no dead/undeclared settings, responsive
image output and no section JavaScript. Official validation passes revision 2
for artifact `lookbook-s6-batch65` across Liquid, runtime locales and schema
locales.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify:components`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- official Shopify Liquid validation, artifact `lookbook-s6-batch65`, revision 2
- Chromium semantics, viewport, direct-root, count, theme, contrast,
  forced-color, reduced-motion, focus, activation, RTL and effective-zoom matrix
- source/generated identity, `git diff --check` and clean `site/dist` status

## Human Review Queue

1. Approve the one/two/four-track thresholds, clamped rows, wide/tall spans and
   sparse editorial rhythm.
2. Approve edge gap, media crop, caption padding/type and adaptive light/dark
   scrim treatment.
3. Confirm the two-property neutral API and that opacity/coordinates remain
   private or target-owned.
4. Confirm product link, Popover disclosure and Lightbox remain explicit target
   profiles rather than one S6 default.
5. Approve the Shopify eight-setting block surface and maximum 12 blocks.
6. Add component-specific Figma examples after browser visual approval.

## Readiness

`ready for human review`: semantic, visual-candidate, responsive, content,
interaction, runtime, documentation and Web/Shopify evidence is complete.
Human review must approve aesthetics, API and activation profiles before any
stability promotion. Contract remains `pilot`; no `stable` promotion was made.
