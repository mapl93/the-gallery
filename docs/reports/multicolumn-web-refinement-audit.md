# Multicolumn Web Refinement Audit

Status: `human-review-ready`; technical refinement complete; remains `pilot`

Date: 2026-07-15

Component: S4 Multicolumn

Contract: `components/contracts/multicolumn.contract.json` (`0.3.0`, `pilot`)

Decision: keep Multicolumn as a passive finite list of target-owned parallel
items beneath an optional contextual heading. Name only titled thematic roots,
require a complete native list composition, preserve source order, and leave
item meaning, media, actions, and editor data with each target.

## Outcome

- A non-empty optional title names a native `section` through
  `aria-labelledby`; an untitled composition uses a generic `div`.
- Missing required `items` omits the root rather than rendering an empty
  section. The canonical fixture uses native `ul`/`li` and decorative icons.
- Generic `article` semantics and conflicting MDX ARIA-role fallbacks are
  removed. Targets retain native list choice and item-content ownership.
- Chronological steps are directed to Process Timeline; S4 no longer claims a
  process API, positional meaning, or numbered behavior.
- Intrinsic centered flex wrapping replaces `auto-fill`, the generic S4
  breakpoint, and Studio-owned one/three-column rules. The root responds to its
  own space and preserves DOM order.
- Complete semantic heading/body typography, spacing, and foreground tokens
  replace incomplete hardcoded type values. Item basis/maximum and icon size
  remain private visual candidates.
- Exhibit and Studio use the same renderer, fixture, validity rule, native DOM,
  and canonical CSS at every viewport.
- Shopify receives a localized addable Section Adapter with reorderable blocks,
  explicit image semantics, responsive image output, no dead settings, and no
  JavaScript. ADR 0148 records the permanent boundary.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Root semantics | Every root was an unlabelled `section` | Titled named `section`; untitled generic `div` | pass |
| Required composition | Missing items left an empty root | Missing required slot yields root count `0` | pass |
| Repeated semantics | Generic grid and `article` items; MDX added manual roles | Native `ul`/`li` in renderer and MDX | pass |
| Scope | Registry included process steps | Parallel passive facts; chronology routes to Process Timeline | pass |
| Responsive ownership | Canonical, generic breakpoint, and Studio column rules competed | One intrinsic component-owned wrapping layout | pass |
| Typography and values | Physical dimensions plus incomplete hardcoded type | Existing semantic type/spacing/color tokens; private geometry isolated | pass candidate |
| Parity | Shared branch but host CSS changed column behavior | Exact root DOM and one component layout in both views | pass |
| Shopify | CSS-ready with no dedicated Liquid/schema/data | Localized ready Section Adapter with block data | pass |

## Contract And API

The two-property neutral surface remains intentionally small:

- `title` — optional non-empty visible contextual heading. The target chooses
  the native heading rank. Empty title omits the header and uses a generic root.
- `items` — required slot containing one or more source-ordered target-owned
  native list-item compositions.

S4 exposes no `columns`, mobile columns, breakpoint, gap, alignment, icon name,
icon size, item minimum, item record, link, media source, heading level,
background, padding, animation, swipe behavior, editor object, or analytics
event. It has no controlled/uncontrolled store. A target owns each item's
native content and any legitimate child contract.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Passive parallel facts; Process Timeline, Stats, Logo Bar, Card collections, and Carousel stay distinct. |
| Anatomy and composition | `pass` | Optional header/title; required root/list/item composition; optional target-owned visual/title/text. |
| Variants and modes | `pass` | One passive intrinsic presentation with titled/untitled and complete/invalid semantic modes. |
| Public API | `pass` | Two semantic properties; layout geometry and target item data remain private or target-owned. |
| State ownership | `pass` | No local state, event, focus model, or controlled/uncontrolled lifecycle. |
| Tokens and values | `pass` | Complete public type/color/spacing semantics; private dimensions are documented candidates. |
| Visual system | `pass` for candidate | Four paired viewports, direct roots, item counts, and special modes; aesthetics await owner approval. |
| Accessibility | `pass` | Conditional named section, native list/items, hidden decorative visuals, stable order, and contrast. |
| Motion | `pass` | No S4 animation/runtime; inherited global durations clamp under reduced motion. |
| Responsive behavior | `pass` | Container-named intrinsic wrap without viewport/Studio behavior or visual reorder. |
| Content resilience | `pass` | One/two/many, untitled/invalid, localized RTL, unbroken, narrow, and effective-zoom cases contain. |
| Runtime and assets | `pass` locally / global gap | Zero S4 JS/assets; Sections stays within ceiling; global CSS/runtime exceptions remain explicit. |
| Cross-target translation | `pass` for Web/Shopify | Web/Webflow/Shopify CSS synchronized; dedicated Shopify section is ready. |
| Documentation parity | `pass` | Exact Exhibit/Studio subtree, one fixture, and matching native MDX composition. |
| Verification | `pass` | Validators, official Liquid, browser matrix, budgets, copies, console, diff, and clean `site/dist` pass. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-63/`.
- Baseline and final each include eight paired viewport captures at Mobile
  `390x844`, Tablet `768x1024`, Desktop `1280x900`, and XL `1536x960` in Exhibit
  and Studio. Final special captures cover dark, forced colors, untitled,
  invalid, one/two/seven items, direct roots, localized RTL, unbroken content,
  and effective 200% layout.
- Exact initial root DOM at all four paired viewports is `2,353` characters,
  FNV-1a `d8d03790`, in both views. The final root is a named `SECTION`, its grid
  is a `UL`, items are `LI`, all fixture icons are `aria-hidden`, and S4 exposes
  zero interactive descendants.
- Mobile is `358x770px` with three `320px` items in three rows. Tablet is
  `736x399.89px` with three `207.56px` items in one row. Desktop is one column
  at the `420px` Exhibit stage and two columns at the `532px` Studio stage. XL
  is two columns at `584px` and three at `752px`.
- Direct isolated roots confirm component-space response: `260px` produces
  three `201.63px` rows; `520px` produces two `222.81px` items plus one centered
  `320px` item; `900px` produces three `263.72px` items in one row.
- At a `900px` root, one item is centered at `320px`, two items are centered at
  `320px` each, and seven items wrap `3 + 3 + 1` with the last centered.
- Untitled output is a `DIV` with no `aria-labelledby` or header. Forced missing
  items yields root count `0`.
- Long Spanish/Arabic RTL content at `520px`, unbroken content at `260px`, and
  effective `179px` layout all report `scrollWidth == clientWidth` with no
  overflowing descendants.
- Light contrast is `17.93:1` for title and `7.81:1` for body. The decorative
  accent is `3.56:1`. Dark contrast is `17.18:1`, `12.09:1`, and `7.92:1`
  respectively. Forced colors resolves text to system black with no color-only
  state or meaning.
- Reduced motion reports no S4 animation name; inherited duration variables
  clamp to `0.00001s`. Accessibility inspection exposes a named region, list,
  list items, and native headings without component focus stops.
- An isolated final browser session reports zero component console errors and
  zero warnings. A normal docs development load has only the unrelated missing
  `/favicon.ico` request.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,790 B` | `6,857 B` | `6,861 B` | pass; `4 B` remaining |
| Neutral Web component CSS | `67,789 B` | `67,868 B` | `65,536 B` | existing gap is `2,332 B` |
| Shared neutral runtime | `10,589 B` | `10,589 B` | `8,192 B` | existing gap; `0 B` added |

S4 adds no listener, observer, timer, formatter, request, layout read, custom
element, JavaScript, or asset. Optional media source, intrinsic dimensions,
loading, and responsive source selection remain target-owned. Canonical,
Webflow, and Shopify Sections CSS copies are SHA-256 identical.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated, and browser-evidenced passive native composition. |
| Shopify | `implemented`, `ready: true`, section-adapter; Liquid, schema, data, behavior, template composition, and editor preview are ready. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical. |
| React / Angular | Planned thin optional-title plus required-children/list composition with no local store. |
| Figma | Generic Studio shell reference only; final S4 density/icon hierarchy requires owner review. |
| SwiftUI / Compose | Documented target-native adaptive list/grid projection with target-owned item content. |

Shopify adapter metrics after the batch are 60 target-ready components, 30
dedicated Liquid-ready components, and 21/21 ready section schemas. S4 has one
section setting, five block settings, a preset, no dead or undeclared settings,
native responsive image output, and no section JavaScript.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- official Shopify Liquid validation for the Section Adapter and two schema
  locale files, artifact `multicolumn-s4-batch63`, revision 1
- real Chromium responsive, content, theme, contrast, forced-color,
  reduced-motion, semantics, and effective-zoom matrix
- source/generated-copy identity checks
- `git diff --check`
- clean `site/dist` status

Global certification, Exhibit/Studio, refinement, and dependency reports are
regenerated after this report and recorded in Batch 63.

## Human Review Queue

1. Approve the private `12.5rem` basis, `20rem` maximum, and one/two/three-column
   balance.
2. Approve the `3rem` fixture icon scale, accent use, title/body hierarchy, and
   narrow vertical rhythm.
3. Approve centered alignment and the final readable copy measure for short,
   localized, and uneven item content.
4. Confirm the two-property neutral API and minimal six-setting Shopify surface.
5. Revisit a structured neutral item schema only if a concrete generator needs
   more than the accepted target-owned slot.
6. Define linked-card, numbered-step, or interactive-media profiles only through
   their relevant canonical contracts.
7. Create component-specific Figma examples after browser visual approval.

## Readiness

`ready for human review`: semantic, visual-candidate, responsive, content,
runtime, documentation, and Web/Shopify translation evidence is complete.
Human review must approve aesthetics and the public contract before any
stability promotion. Contract remains `pilot`; no `stable` promotion was made.
