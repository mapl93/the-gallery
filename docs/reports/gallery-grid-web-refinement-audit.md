# Gallery Grid Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-15

Component: Gallery Grid (`S5`, review order `165`)

## Outcome

Gallery Grid is now a passive, finite, target-owned media list with truthful
conditional root semantics, native list structure, strict invalid omission,
component-owned responsive geometry and no neutral runtime. The default Grid
uses a private uniform crop and row-major tracks; Masonry preserves natural
media proportions in source-flow CSS columns. Neither variant invents an APG
widget or target activation lifecycle.

Exhibit and Studio render the same fixture, DOM, variants and canonical CSS.
Studio no longer owns columns, media heights, masonry behavior or responsive
thresholds. A dedicated localized Shopify Section Adapter maps the accepted
slot to reorderable image blocks with explicit image semantics. ADR 0149
records the durable boundary.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Root semantics | Every root was an unnamed `section` | Titled named `section`; untitled generic `div` | pass |
| Required composition | Missing items left a `169px` empty section | Missing required slot yields root count `0` | pass |
| Collection semantics | Generic `div` wrappers; MDX used a different `figure` model | Native `ul`/`li` in renderer and MDX | pass |
| Passive interaction | Four unnamed focus stops and `scale(1.03)` with no action | Zero passive focus stops, no S5 motion; native descendant focus only | pass |
| Responsive ownership | Source, viewport, generic container and Studio rules competed | One named component container and one canonical implementation | pass |
| Grid geometry | Auto-fill/natural rows produced unstable tall layouts | Private `4 / 5` crop with explicit one-to-four track steps | pass candidate |
| Masonry geometry | Competing viewport/Studio columns and forced heights | Natural-ratio source-flow columns with intact items | pass candidate |
| Values and typography | `24px`/`280px`/`8px`, physical dimensions, incomplete H2 type | Semantic spacing/type/color/radius tokens and logical geometry | pass |
| Parity | Shared branch but host CSS changed layout | Exact normalized root DOM and component layout in both views | pass |
| Shopify | CSS-ready without dedicated Liquid/schema/data | Localized ready Section Adapter with block data | pass |

## Contract And API

Contract `0.3.0` remains `pilot`. The public surface stays intentionally small:

- `variant` — optional `grid | masonry`, default `grid`; maps only the
  established modifier.
- `title` — optional non-empty visible contextual heading. The target chooses
  native heading rank. Empty content omits the header and uses a generic root.
- `items` — required slot containing one or more complete, source-ordered,
  target-owned native list-item compositions.

S5 exposes no columns, breakpoint, gap, crop, ratio, fit, focal point, radius,
image source, alt shortcut, caption, item record, destination, Lightbox,
selection, loading, pagination, heading level, animation, editor object or
event. It has no controlled/uncontrolled state. Media and any legitimate
interaction remain target-owned.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Passive finite image-led list; selection, Lightbox, commerce and feeds stay outside S5. |
| Anatomy and composition | `pass` | Conditional root/header/title plus required native list and repeated target-owned item. |
| Variants and modes | `pass` | Grid/Masonry, titled/untitled, complete/invalid, passive/target-interactive boundaries are explicit. |
| Public API | `pass` | Three semantic properties; geometry and target image/editor data remain private or target-owned. |
| State ownership | `pass` | No local store, selection, focus controller, keyboard model or data lifecycle. |
| Tokens and values | `pass` | Eleven existing semantic public references; private geometry is documented. |
| Visual system | `pass` for candidate | Four paired viewports, direct roots, both variants, counts and special modes; aesthetics await owner approval. |
| Accessibility | `pass` | Conditional labelled section, native list, contextual alternatives, stable order and zero passive focus. |
| Interaction | `pass` | Synthetic native link receives focus and Enter activation; S5 adds no fake interaction. |
| Motion | `pass` | No component animation/transition; global reduced-motion clamp remains effective. |
| Responsive behavior | `pass` | Named inline-size container, logical geometry, no viewport/Studio authority or visual reorder. |
| Content resilience | `pass` | One/two/seven, untitled/invalid, RTL/localized, unbroken, narrow and mixed-ratio cases contain. |
| Runtime and assets | `pass` locally / global gap | Zero S5 JS/assets; Sections ceiling passes; global Web/runtime exceptions remain explicit. |
| Cross-target translation | `pass` for Web/Shopify | Generated Web/Webflow/Shopify CSS is synchronized; Shopify section is ready. |
| Documentation parity | `pass` | Exact normalized Exhibit/Studio subtree, one fixture and matching native MDX composition. |
| Verification | `pass` | Validators, official Liquid, browser matrix, budgets, copies, console, diff and clean `site/dist` pass. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-64/`.
- Baseline and final each include eight paired viewport captures at Mobile
  `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL `1536x960`. Thirty-
  three final captures additionally cover both variants, direct roots,
  one/two/seven items, titleless/invalid composition, native link focus, light,
  dark, forced colors, reduced motion, localized RTL and unbroken content.
- Final Exhibit/Studio roots normalize to `1,073` characters and FNV-1a
  `1d528e87` across all four paired viewports. The raw per-mount React title id
  differs, but each `aria-labelledby` relation is correct.
- Final fixture semantics are named `SECTION`, `UL`, four `LI`, four contextual
  image alternatives and zero focusable descendants.
- Grid response is one track at Mobile; three at Tablet; two at both Desktop
  stages; two at XL Exhibit and three at XL Studio. Direct roots prove one/two/
  three/four tracks at `200/520/900/1120px`, with no horizontal overflow.
- One, two and seven items remain finite without empty auto-fill tracks.
  Masonry preserves natural ratios, uses one visual column at direct
  `200/260/520px`, three at `900px`, and keeps DOM source order.
- Untitled output is a `DIV` with no header or labelling attribute. The invalid
  omission harness yields root count `0`, matching the renderer's null branch.
- A synthetic target-native link is the only focus stop, matches
  `:focus-visible`, receives a `2px` solid outline with `2px` offset, and
  activates with Enter to `#gallery-evidence`. No media transform is applied.
- Title contrast is `17.93:1` light and `17.18:1` dark. Forced colors resolves
  title text to system black. Reduced motion reports no animation name and only
  the global `0.00001s` safety clamp.
- Arabic RTL at `320px` and an unbroken title at effective `200px` report no
  horizontal overflow. The unbroken title wraps with `overflow-wrap: anywhere`.
- An isolated component session reports zero console errors and zero warnings.
  The ordinary development shell only reports the unrelated missing favicon.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,857 B` | `6,855 B` | `6,861 B` | pass; `2 B` reduction, `6 B` remaining |
| Neutral Web component CSS | `67,868 B` | `67,874 B` | `65,536 B` | existing gap is `2,338 B`; `6 B` batch delta |
| Shared neutral runtime | `10,589 B` | `10,589 B` | `8,192 B` | existing gap; `0 B` added |

S5 adds no listener, observer, timer, request, layout read, formatter, custom
element, JavaScript or asset. Canonical, Webflow and Shopify Sections CSS copies
are SHA-256-identical (`7af67cddc1a2ee902bc9324744a022765822e30cf80d8400d0c91d518efa66da`).

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced passive native composition. |
| Shopify | `implemented`, `ready: true`, section-adapter; all required maturity layers ready. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical. |
| React / Angular | Planned thin optional-title, variant and required-children/list composition with no local store. |
| Figma | Generic Studio shell reference only; crop, density and hierarchy require owner review. |
| SwiftUI / Compose | Documented target-native adaptive collection preserving logical data order and media semantics. |

Shopify adapter metrics after the batch are 61 target-ready components, 31
dedicated Liquid-ready components and 22/22 ready section schemas. S5 has two
section settings, three block settings, a preset, no dead or undeclared
settings, responsive image output and no section JavaScript.

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
- official Shopify Liquid validation, artifact `gallery-grid-s5-batch64`,
  revision 1, for the Section Adapter and two schema locale files
- real Chromium responsive, content, variant, theme, contrast, forced-color,
  reduced-motion, semantics, focus, native activation and effective-zoom matrix
- source/generated-copy identity checks
- `git diff --check`
- clean `site/dist` status

Global certification, Exhibit/Studio, refinement and dependency reports are
regenerated after this report and recorded in Batch 64.

## Human Review Queue

1. Approve the private `4 / 5` Grid crop and `22rem`/`40rem`/`60rem`
   one-to-four-track balance.
2. Approve the maximum-three `13rem` Masonry composition, source-flow visual
   reading, element gap, radius and image hierarchy.
3. Decide whether S5 retains its Masonry variant, narrows to regular Grid or
   later defers that presentation to Masonry Gallery.
4. Confirm the three-property neutral API and minimal five-setting Shopify
   surface.
5. Confirm that navigation, Lightbox and selection remain target profiles
   rather than S5 defaults.
6. Add component-specific Figma examples after browser visual approval.

## Readiness

`ready for human review`: semantic, visual-candidate, responsive, content,
interaction, runtime, documentation and Web/Shopify evidence is complete.
Human review must approve aesthetics, API and the long-term Masonry boundary
before any stability promotion. Contract remains `pilot`; no `stable`
promotion was made.
