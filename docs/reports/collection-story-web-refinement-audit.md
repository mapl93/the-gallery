# Collection Story Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Collection Story (`F4`)

## Outcome

Collection Story is reconciled as a passive, named editorial section with a
required narrative, optional media, optional editorial label, optional native
quotation and target-owned actions. Its media split follows the component
container rather than the page viewport, appears only when media exists and
keeps media first in source order when the wide visual layout is reversed.
Contract, registry, canonical CSS, MDX, shared Exhibit/Studio renderer, Studio
metadata, Shopify Liquid/locales, generated Web/Shopify/Webflow adapters,
dossier, ADR, open questions and browser evidence agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual proposal. Storytelling CSS is `74 B` over its family ceiling
and the neutral component bundle is `702 B` over its permanent `64 KiB` ceiling;
these are explicit gaps, not silent budget increases.

## Research And Decision

- HTML and WAI guidance support one thematic native section associated with its
  visible contextual heading, logical heading structure and target-authored
  informative/decorative image alternatives.
- Native `blockquote` is reserved for text quoted from another source;
  attribution, if later required, remains separate target composition.
- Open UI has no settled compound Card anatomy. Radix and Polaris reinforce
  explicit media/content/action composition instead of a whole-surface widget,
  navigation landmark or React-specific polymorphic API.
- Shopify sections and `image_picker` support localized merchant configuration,
  conditional anatomy, stored alternative text and focal-point-aware rendering.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and
  inspector `1020:480`, found the generic Studio/Button prototype, not Collection
  Story artwork. No ratio, split, typography, quotation or spacing decision was
  inferred from it.

ADR 0126 records the safe boundary: a named passive section, required inner
layout, explicit media-present modifier, intrinsic responsive split,
source-order-safe reversal, target-owned media/actions, native quotation,
complete canonical styling and zero neutral runtime. ADR 0080 still requires
human/product review before a formal Button dependency is added.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: ten anatomy parts, one variant, one size,
  two documented states, nine behaviors, seven semantic properties,
  twenty-five public tokens and no inferred dependency.
- The target supplies one unique heading `id` and matching section
  `aria-labelledby`. Heading rank stays contextual; optional anatomy is omitted
  instead of rendered empty.
- `.collection-story` establishes the named inline-size container. The required
  `.collection-story__layout` stays one column by default, while
  `.collection-story__layout--with-media` resolves to two equal minmax columns
  only above the private `42rem` content-box threshold.
- `.collection-story--reversed` changes only wide visual placement. Media stays
  before content in the DOM and accessibility sequence.
- Media uses a private `4:3` candidate ratio and source-owned containment;
  targets own asset, contextual alt/decorative intent, crop, focal point and
  loading.
- Label, title, article body and quotation use complete semantic typography
  pairs. Source-strength title rules, logical quote geometry, reset margins,
  resilient wrapping and capped narrative measure prevent host leakage.
- Actions are an ordinary group, not a `nav`. The fixture uses a native anchor
  with canonical Button classes; component JS does not intercept activation.
- Site-only Collection Story layout/padding/rhythm rules are removed. Exhibit
  and Studio use the same `StorytellingStudio` renderer and fixture.
- Shopify conditionally emits image/layout modifier together, preserves
  merchant image metadata, supports decorative intent, localizes its schema and
  fallbacks, and reports `implemented`, `section-adapter`, `ready: true`.

## Browser Evidence

### Parity And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) produce exact initial Exhibit/Studio `outerHTML` parity. Clean
  component HTML is `1,128` characters.
- Exhibit root widths are `310/688/532/536px`; Studio widths are
  `310/688/644/704px`. Each initial instance stays in one column because the
  actual container content box is below `42rem`, with no page overflow.
- A separate `900px` root produces two `341.84px` columns. Wide reversal retains
  DOM order `media -> content` and computed visual orders `2/0`; a `640px` root
  remains one column.
- Removing media removes the layout modifier and leaves one content child in a
  single `715.69px` column. No empty track or wrapper remains.
- The initial accessibility result exposes one named section, one informative
  image, one contextual H2, one native quotation and one native link. There is
  no nested navigation landmark.

### Optional Content And Keyboard

- The real Studio media control produces zero media nodes, zero media modifier
  and one layout child. Empty label/quotation plus disabled actions produce zero
  corresponding wrappers while required title and body remain.
- Sequential keyboard focus yields a `2px` solid primary outline with `2px`
  offset. Enter dispatches one native link click, retains focus and preserves
  the real `#collection-works` destination.
- The action group has no composite-widget key model or custom focus movement;
  target-supplied links/buttons keep their native behavior.

### Content, Themes, Reflow, And Preferences

- Long Arabic/Latin RTL content and an unbroken identifier stay inside a
  `320px` root. The logical `3px` quotation rule moves to inline-start and no
  component or page overflow appears.
- An isolated 200% CSS reflow probe uses a `320px` CSS root rendered at `640px`
  physical width and keeps `scrollWidth === clientWidth`.
- Light contrast is `17.93:1` title, `7.81:1` body, `5.85:1` label/quote and
  `10.37:1` action. Dark contrast is `17.18:1`, `12.09:1`, `9.94:1` and
  `17.93:1` respectively.
- Forced colors resolves the quotation rule to `CanvasText` and preserves a
  solid `2px` system focus outline. Reduced motion resolves the canonical action
  transition to `0s`; Collection Story authors no animation.
- Final inspection reports zero component-originated errors or warnings. A
  fresh site session records one unrelated shell-level `/favicon.ico` 404.

Four before images, eight final viewport images and eight special-state images
live under `output/playwright/refinement-batch-41/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Named native section, intrinsic layout, optional image, contextual heading, rich content, native quotation and target actions. | Implemented, generated and validated; no component runtime. |
| Shopify | Localized merchant section, conditional image/split, stored alt/decorative intent, focal point, rich text, unique heading association and canonical action. | `implemented`, `section-adapter`, maturity `ready: true`; Liquid/locales validated. |
| Webflow | Canonical target-agnostic CSS copy. | Source/generated identity verified. |
| React / Angular | Passive semantic slots; target supplies heading element/id, media and real destinations. | Direction documented; packages planned. |
| Figma | Default/reversed, with/without media, narrow/wide, themes, localized and focus examples. | Planned; registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Target-native image/text/quotation/action composition. | Conceptual; media data/loading and action lifecycle remain target-owned. |

## Performance And Risks

- Storytelling CSS is `4,374 B / 4.2 KiB`, a `74 B` exception and `154 B`
  increase from the pre-refinement baseline.
- Complete neutral Web component CSS is `66,238 B / 64 KiB`, a `702 B` overage
  and `213 B` increase from Batch 40. The ceiling remains binding; shared-bundle
  optimization or an explicit owner decision is required before program-level
  v1 certification.
- Current shared runtime is `10,501 B / 8 KiB`, the existing `2,309 B`
  exception. Collection Story adds `0 B` runtime, listener, observer, timer,
  request or component asset.
- Human review must approve the private `4:3` media ratio, crop, large radius,
  equal wide columns, threshold, section inset, narrative measure, type
  hierarchy, vertical rhythm, quotation rule/accent pairing and action emphasis.
- Button remains target-owned composition until the owner separately approves a
  formal dependency. Public columns, threshold, ratio, alignment, surface,
  density, heading rank and action style remain intentionally absent.

## Validation

Registry/docs, DTCG/Web component-token compatibility, 183 contracts, 183
Studio definitions, Neutral Web, Shopify and Webflow output generation/
validation, mandatory Shopify documentation search and five-file official
validation, source/generated CSS identity, structural certification, static
Preview audit, exact Exhibit/Studio parity, four viewport modes, real Studio
optional omission, native keyboard activation, constrained-host split/reversal,
localized/extreme RTL content, isolated 200% reflow, light/dark contrast, forced
colors, reduced motion, deterministic gzip, global refinement audit, temporary
site build outside `site/dist`, diff checks, component-console inspection and explicit
`site/dist` cleanliness comprise Batch 41. The console gate is scoped to
component-originated entries because the shell-level favicon request remains.
`site/dist` is not rebuilt or
modified.
