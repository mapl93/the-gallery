# Component Dossier: Collection Story

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify section translation

Contract: `components/contracts/collection-story.contract.json`

## Recommendation

Keep Collection Story as a passive, thematic editorial section associated with
its visible contextual heading. Preserve the accepted media-first source order,
required title and narrative, optional label, optional quotation, optional
target-owned actions, and boolean wide-layout reversal from ADR 0080. Reversal
must change visual placement only; it must never reorder the DOM or become an
interaction state.

Use an inner layout wrapper driven by the component's own inline size. The
media/text split should appear only when media is present and the host can
support two readable columns. Without media, narrative content should occupy a
single capped measure rather than reserve an empty column. Media keeps one
private `4:3` candidate ratio and target-authored crop, focal point, loading and
alternative text. The repository candidate remains a visual proposal for human
review because the registered Figma frame contains only the generic Button
Studio prototype.

Keep actions as a target-owned composition slot. The docs fixture and Shopify
translation may consume canonical Button classes, but ADR 0080 explicitly makes
new public dependencies a human/product decision; this refinement must not add
a Button dependency by inference. Do not expose column count, breakpoint,
measure, crop, quote-rule geometry, alignment, surface, density or heading rank
as public properties.

## Purpose And Limits

- Explains why a set of works belongs together through one focused editorial
  narrative, supporting media and an optional quotation.
- Primary contexts are collection landing pages, exhibition/editorial commerce
  pages, maker stories and campaign sections.
- Collection Story owns semantic grouping, source order, intrinsic layout,
  resilient omission, visual hierarchy, content containment and target-neutral
  styling.
- The target owns actual collection data, heading rank/id, rich narrative,
  media asset, alt/decorative intent, focal point, loading, link destinations,
  action markup, analytics and localization.
- It is not a Card, article record, product grid, carousel, lightbox, CMS schema,
  navigation landmark or source of collection state.
- No component JavaScript, controlled/uncontrolled state, events, live region,
  focus movement, observer, timer or reduced-motion branch is required.

## Pre-Refinement Gallery Baseline

- Registry `F4`, category `storytelling`, no dependencies; contract `0.1.0`,
  `pilot`; nine anatomy parts, one variant/size/state, one behavior, seven
  properties and seventeen public tokens.
- ADR 0080 already accepts `reversed` as a boolean layout property and requires
  visual reversal without source-order mutation. It leaves no Collection Story
  interaction or data-model question open, but requires human/product review
  before adding dependencies.
- Canonical CSS makes the root itself a grid and switches at the page viewport
  `768px` breakpoint. A narrow embedded instance can therefore receive the wide
  split while a wider instance can be forced back to one column by docs-only
  overrides.
- At baseline, Mobile renders a `310px` one-column section; Tablet renders a
  `688px` two-column section; Desktop and XL render only `532–536px` but rely on
  a site-only container override to restore one column. The component does not
  own consistent host-width behavior.
- Shopify always emits `.collection-story__media`, even when no image exists,
  so wide layouts reserve an empty column. It replaces merchant image alt with
  the title, ignores the merchant focal point, uses viewport-based `sizes`, and
  emits unlabelled section markup.
- The shared Exhibit/Studio renderer uses a named section and native
  `blockquote`, but it uses a hard-coded English `nav` landmark for one ordinary
  target action. The action slot does not require a navigation landmark.
- The MDX fallback lacks the inner layout wrapper and section association, uses
  a `span` for the label, and its action does not consume a canonical Button
  class. The renderer and fallback therefore describe different anatomy.
- The canonical source leaves paragraph, label and blockquote margins partly to
  the host; title, label, body and quotation typography use incomplete token
  pairs; quotation geometry uses physical `padding-left`/`border-left`.
- `--_story-bg` is unused. Media image display/containment and long title/label
  wrapping are incomplete. Site CSS supplies padding, gap and rich-text rhythm
  required to reproduce the current docs rendering.
- Existing evidence covers the default fixture at four viewport widths but not
  exact Exhibit/Studio markup parity, source-order reversal, no-media layout,
  optional omission, long/empty/localized content, RTL, zoom, themes, forced
  colors, action focus or source/generated identity.
- Baseline deterministic gzip is `4,220 B` for Storytelling CSS against a
  `4.2 KiB` ceiling, `66,025 B` for all neutral component CSS against `64 KiB`,
  and `10,492 B` for shared neutral runtime against the existing `8 KiB`
  exception. Collection Story itself adds no runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML section](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | `section` represents a thematic grouping, typically with a heading, and is not a generic styling container. | Use a native section only because the visible title names one coherent collection narrative. |
| [WAI page structure](https://www.w3.org/WAI/tutorials/page-structure/) and [H101](https://www.w3.org/WAI/WCAG21/Techniques/html/H101) | Logical headings and labelled semantic regions support orientation; a `section` becomes a landmark only when it has an accessible name. | Associate the section with its visible contextual heading using a target-unique id; do not add a redundant English label. |
| [HTML blockquote](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element) | `blockquote` is for content quoted from another source; attribution belongs outside the quoted content. | Keep `inspiration` optional and require ordinary text instead when the content is merely emphasis rather than a quotation. Future attribution must be a separate target composition. |
| [WAI alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) | Informative images need a brief contextual description; redundant or decorative images need empty alt. | Keep alt meaning target-owned and never derive it automatically from the collection title. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Card implementations vary across media, actions, interactivity, size and anatomy; the research inventory has no settled anatomy. | Collection Story should not inherit a generic Card role/API or whole-surface interaction model. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Radix separates a generic content container, media inset and optional interactive `asChild` behavior. | Preserve explicit media/content/action composition; do not make the entire Story interactive or import React-specific polymorphism. |
| [Polaris Media card](https://shopify.dev/docs/api/app-home/patterns/compositions/media-card) | Polaris composes media, heading and actions from primitives and makes interactivity explicit on the relevant element. | Use explicit native media/content/actions and canonical action primitives; do not imply navigation on the passive section. |
| [Shopify sections](https://shopify.dev/docs/storefronts/themes/architecture/sections), [section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema), and [input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings) | Sections are merchant-editable modules; text-bearing settings are translatable; `image_picker` preserves merchant alt and focal-point data. | Map accepted properties to localized schema, omit empty anatomy, preserve image metadata and keep the section addable in the editor. |

### Mature-system comparison

- HTML and WAI define the semantic core: one thematic section, contextual
  heading, meaningful source order, contextual image alternatives and real
  quotation markup.
- Open UI does not provide consensus for a compound editorial story anatomy.
  Its Card evidence is variance, not a reason to add Card states or variants.
- Radix and Polaris both compose media, content and explicit actions from
  smaller primitives. Their APIs are target-specific; The Gallery keeps stable
  semantic slots and native elements rather than React polymorphism or Polaris
  layout properties.
- No source establishes controlled state, selection, dismissal, whole-card
  activation, navigation landmark semantics or component runtime.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct read-only inspection shows the generic Studio
shell and Button pilot: `Button`, `Customize`, and Content, Presentation, Layout
and Appearance inspector groups. It contains no Collection Story artwork,
editorial media, narrative measure, quotation, action, reversed layout,
responsive state or visual evidence. It validates inspector organization only.
The repository candidate remains the visual proposal for human review; no
Collection Story aesthetic is inferred from that frame.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | named `section.collection-story` | Collection Story / target | Associated with its visible title through a target-unique id. |
| Layout | yes | `.collection-story__layout` generic wrapper | Collection Story | Owns intrinsic one/two-column composition; no semantic role. |
| Media | no | `.collection-story__media` generic wrapper | target | Omitted completely when absent; never reserves an empty column. |
| Media image | conditional | native `img` or target media | target | Informative or empty alt according to context; target owns crop/focal point/loading. |
| Content | yes | `.collection-story__content` generic wrapper | Collection Story / target | Contains the complete narrative in meaningful source order. |
| Label | no | paragraph/text | target | Editorial eyebrow; omitted when empty. |
| Title | yes | contextual heading | target | Visible section name; class does not mandate a fixed heading rank. |
| Text | yes | rich-content wrapper | target | At least one meaningful narrative block; direct-child rhythm is canonical. |
| Inspiration | no | native `blockquote` only for a real quotation | target | Omitted when absent; attribution, if any, is separate target content. |
| Actions | no | ordinary action-group wrapper | target | Links/buttons with real semantics; not automatically a `nav` landmark. |

## Variant, Size, State, And Mode Matrix

- Variant/size/state: one default passive editorial presentation and one default
  state. `reversed` is a boolean layout property, not a variant or state.
- Required content: non-empty contextual title and meaningful body content.
  Media, label, quotation and actions are independently optional and omitted
  rather than left as empty wrappers.
- Layout: one column without media or in narrow hosts; two readable columns
  only when media exists and the component inline size can support them.
- Reversal: default media then content; reversed visual order at the intrinsic
  wide threshold; DOM/accessibility order remains media then content.
- Media: informative, decorative, absent and failed-media cases. Narrative and
  action meaning remain complete without the image.
- Content extremes: short and multi-paragraph body, long headings, long
  unbroken strings, localized scripts, RTL, quotation absent/present, zero/one/
  multiple actions and 200% zoom.
- Themes/preferences: source light/dark semantic colors; forced colors preserve
  visible quotation structure and action focus; reduced motion has no authored
  component motion.

## Public API And State Ownership

Keep the seven accepted semantic properties:

- `reversed` — optional boolean visual-placement property; `false` by default.
- `media` — optional target-owned media composition and metadata.
- `label` — optional editorial eyebrow.
- `title` — required visible collection-story heading.
- `body` — required target-owned narrative rich content.
- `inspiration` — optional quotation string rendered as quotation markup only
  when it is genuinely quoted content.
- `actions` — optional target-owned action composition with real destinations
  and native controls.

Do not add `headingLevel`, `imageRatio`, `imagePosition`, `focalPoint`, `columns`,
`breakpoint`, `contentWidth`, `alignment`, `surface`, `density`, `quoteStyle`,
`actionStyle`, `href`, `onAction`, `selected`, `loading` or `dismissible` to the
neutral API. Collection Story is passive and has no controlled/uncontrolled
strategy. Targets own content records and action lifecycles.

## Token And Value Audit

- Public color: surface, primary/secondary/accent text, decorative border and
  focus border only if canonical action composition requires it through the
  action primitive. The unused surface private variable must either be applied
  intentionally or removed.
- Public typography: body family with complete caption/body/paragraph pairs,
  heading family with complete h2 pair, and accent family with complete h4 pair.
- Public spacing: section gap, container inset, grid gap and element gap. Root
  block/inline inset and internal rhythm are private compositions derived from
  those tokens.
- Public radius: large media radius.
- `4:3` media ratio, private narrative measure, two-column threshold, quote rule
  width, label tracking and host-relative inset cap remain implementation
  details rather than independent consumer controls.
- Replace incomplete typography, literal physical quote geometry and site-only
  rhythm with complete existing token pairs and logical canonical CSS.

## Accessibility And Interaction

- Use a contextual native heading and associate the section with it using
  target-unique `id`/`aria-labelledby` values.
- Preserve media-first DOM order under reversal. Do not use CSS order to change
  the accessibility/source sequence.
- Give informative media useful target-authored alt and decorative/redundant
  media empty alt. Do not synthesize alt from the title.
- Use `blockquote` only for text quoted from another source. If targets add an
  attribution, keep it outside the blockquote and explicitly related by the
  target composition.
- Actions retain their native link/button roles, destinations, keyboard
  behavior and focus treatments. Do not use `nav` for a single ordinary CTA or
  add custom key handling.
- Meaning must survive CSS, media and JavaScript absence. Long localized content
  and 200% zoom must remain contained without page-level horizontal overflow.

## Responsive And Performance

- Make `.collection-story` a named inline-size container and put the grid on
  `.collection-story__layout`, allowing the child to respond to root width.
- Add a media-presence modifier on the layout instead of relying on `:has()` or
  leaving an empty grid track. Wide split/reversal applies only to that modifier.
- Use logical padding/borders, `min-width: 0`, complete wrapping and capped
  narrative measure. The component responds to its host, not the page viewport.
- DOM/work is constant in the shell and proportional only to target-authored
  rich content/actions. There are no listeners, observers, layout reads,
  requests, timers, animations or component assets.
- Neutral runtime contribution remains `0 B`. Target image loading and action
  analytics are adapter/data concerns.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named section, inner intrinsic layout, optional native media, contextual heading, rich content, native quotation and target action group. | Implemented, generated and validated; no component runtime. |
| Shopify | Merchant-editable section settings map media/text/quote/action/reversal, preserving image alt/focal point and omitting empty anatomy. | `implemented`, `section-adapter`, maturity `ready: true`; Liquid and locales pass the official validator. |
| Webflow | Canonical target-agnostic CSS copy. | Source/generated identity verified. |
| React / Angular | Passive component accepting semantic content/slots; adapter supplies unique heading id and native action elements. | Planned; no state service or lifecycle required. |
| Figma | Default/reversed, with/without media, short/long/localized, narrow/wide, light/dark and action-focus examples. | Planned; registered reference is unrelated generic Button artwork. |
| SwiftUI / Compose | Native labelled content section with target media, quotation styling and native links/buttons. | Conceptual; layout responds to target container and actions remain target-owned. |

## Exhibit And Studio Parity

- Keep one `StorytellingStudio` renderer, one fixture and exact initial
  `outerHTML` in Exhibit and Studio at Mobile, Tablet, Desktop and XL.
- Use the same named section, inner layout/media-presence modifier, content,
  quotation and ordinary action-group markup in both modes.
- Special evidence covers reversed order, no media, no label, no quotation, no
  actions, long/localized content, narrow/wide hosts and real action focus.
- Studio exposes only the seven accepted semantic properties and validated
  source tokens. It must not expose private ratio, measure, columns, threshold,
  alignment, quote geometry or surface choices.
- Remove Collection Story presentation overrides from site CSS so both modes and
  every target receive the canonical implementation directly.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Responsive split depends on page viewport and docs-only correction. | high | Add named inline-size container plus inner layout wrapper. | implementable now |
| Shopify emits empty media and discards merchant alt/focal point. | high | Omit absent media; use image metadata and `image_tag`; localize the schema. | implementable now |
| Ordinary CTA is exposed as a hard-coded English navigation landmark. | high | Use an ordinary action-group wrapper and native action semantics. | implementable now |
| MDX, renderer and Shopify disagree on anatomy and labelling. | high | Reconcile named section, inner layout, omission and action markup across targets. | implementable now |
| Typography/rhythm leak host styles and quote geometry is physical. | medium | Apply complete tokens, resets, logical properties and canonical rich-text rhythm. | implementable now |
| Button is visually consumed but not a declared dependency. | product boundary | Keep `actions` target-owned and document fixture composition; ADR 0080 requires human/product review before a dependency addition. | owner/product |
| No component-specific Figma artwork exists. | human review | Present repository before/after evidence and request approval of media ratio, split, measure, hierarchy and quotation treatment. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: ten anatomy parts, one variant, one size,
  two documented states, nine passive behaviors, seven semantic properties,
  twenty-five public tokens and no inferred canonical dependency.
- Canonical CSS now owns the named inline-size container, required layout,
  media-present split, source-order-safe reversal, complete semantic typography,
  logical quotation rule, rich-text rhythm, wrapping, forced-color boundary and
  private composition values. The docs-only Collection Story corrections are
  removed.
- Exhibit and Studio share one `StorytellingStudio` renderer and fixture. Their
  initial `outerHTML` is exact in Mobile, Tablet, Desktop and XL; clean component
  markup is `1,128` characters.
- Shopify conditionally emits media and the corresponding layout modifier,
  preserves merchant alt/decorative intent and focal point, uses a unique
  section/heading association, localizes schema/fallback strings and emits a
  canonical Button action only with a destination.
- The registry, MDX, Studio metadata, source contract, generated Web/Shopify
  manifests, adapter docs, ADR 0126 and open human questions describe the same
  anatomy and target boundary.

## Browser Evidence

- Standard root widths are `310/688/532/536px` in Exhibit and
  `310/688/644/704px` in Studio. Each responds to its real content box, stays in
  one readable column at those host widths and produces zero page overflow.
- An isolated `900px` root resolves two `341.84px` columns. Reversal keeps media
  first in DOM and applies computed visual orders `2/0`; a `640px` root remains
  one column. Removing media also removes the modifier and leaves one content
  child/column.
- Studio omission produces zero media/modifier, and independent empty label,
  quotation and action values produce zero optional wrappers. Required title and
  narrative remain.
- The initial accessibility result is one named native section, one informative
  image, one contextual heading, one native quotation and one real link, with no
  navigation landmark. Enter dispatches one native link click and preserves
  focus.
- Sequential keyboard focus resolves a `2px` solid primary outline with `2px`
  offset. Long Arabic/Latin RTL content, an unbroken identifier and the isolated
  200% reflow probe keep `scrollWidth === clientWidth`.
- Light contrast is `17.93:1` title, `7.81:1` body, `5.85:1` accent and
  `10.37:1` action. Dark contrast is `17.18:1`, `12.09:1`, `9.94:1` and
  `17.93:1`. Forced colors preserves the quotation boundary and a solid system
  focus outline; reduced motion resolves action transition to `0s` with no
  animation.
- Four before, eight viewport-after and eight special-state images live under
  `output/playwright/refinement-batch-41/`. Final inspection has zero
  component-originated errors or warnings; a fresh site session records the
  existing shell-level `/favicon.ico` 404.

## Performance Result

- Storytelling CSS is `4,374 B / 4.2 KiB` deterministic gzip, a `74 B` family
  exception and `154 B` increase from the pre-refinement baseline.
- Complete neutral Web component CSS is `66,238 B / 64 KiB`, a `702 B` program
  gap and `213 B` increase from Batch 40. The ceiling remains unchanged.
- Current shared neutral runtime is `10,501 B / 8 KiB`, the existing `2,309 B`
  exception. Collection Story adds `0 B` runtime, listener, observer, timer,
  request or component asset.

## Validation Result

- Registry/docs, source tokens, 183 contracts, 183 Studio definitions, neutral
  Web, Shopify and Webflow adapter checks pass.
- Mandatory Shopify documentation search plus official full-theme validation
  pass for the changed section, storefront locales and schema locale files.
- Static Preview audit, structural certification, exact Exhibit/Studio initial
  markup parity and source/generated CSS identity are included in the final gate.
- Four viewport modes, constrained-host one/two-column behavior, reversal source
  order, optional omission, native action focus, long/localized RTL content,
  200% zoom, light/dark contrast, forced colors and reduced motion pass.
- Deterministic family/global gzip, runtime contribution, temporary site build,
  diff checks, component-console inspection and explicit `site/dist` cleanliness
  complete the final Batch 41 gate.

## Remaining Human Review

- Approve or revise the private `4:3` media ratio, crop treatment, large radius,
  equal wide columns and intrinsic split threshold.
- Approve or revise section inset, narrative measure, title/body/label scale,
  vertical rhythm, quotation rule and accent pairing.
- Approve or revise primary Button use in the fixture and outline Button use in
  Shopify; decide separately whether Button becomes a formal public dependency.
- Confirm that layout columns, threshold, media ratio/position, alignment,
  surface, density, heading rank and action style remain outside the v1 API.
- Do not promote the contract to `stable` without explicit human approval.
