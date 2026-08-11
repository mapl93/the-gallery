# Component Dossier: Brand Story

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/brand-story.contract.json`

## Recommendation

Keep Brand Story as a distinct editorial identity, but implement it as a
contextual profile of canonical Image with Text rather than as a second
media-and-narrative system. The profile should consume the canonical
`.image-text` root, media, content, eyebrow, title, and body anatomy; require
target-owned media, a non-empty visible title, and a non-empty narrative body;
and add only an optional `.brand-story__signature` section footer for a real
textual attribution or editorial mark.

The dependency graph should record `image-text`. Brand Story should expose no
parallel grid, crop, type, media, or responsive implementation, no inherited
Image with Text action, and no generic layout variant. Its five semantic inputs
remain `media`, `eyebrow`, `title`, `body`, and `signature`. The profile owns no
controlled or uncontrolled state and adds no runtime.

This direction applies the repository's copy-and-own and canonical-composition
principles without collapsing the product identity. Image with Text remains the
general media-and-narrative section with five presentations and an optional
Button action. Brand Story is the narrower origin/philosophy profile using the
default canonical presentation plus optional editorial attribution. Artist
Statement remains a first-person artist-authored statement; Artist Profile
remains a biography; Collection Story remains collection-scoped narrative.

Human review must approve the inherited `4 / 3` media crop, split balance,
content density, signature treatment, and whether this profile remains
valuable as a separately discoverable component before any stability
promotion.

## Purpose And Limits

- Presents one organization, studio, or brand origin/philosophy narrative.
- Pairs one target-owned visual with a required contextual heading and rich
  narrative body.
- Allows one optional short eyebrow and one optional editorial attribution or
  mark after the narrative.
- Uses a native thematic section because a required visible heading identifies
  one coherent page section.
- Uses canonical Image with Text composition for media, content placement,
  intrinsic response, source order, type, color, and crop.
- Does not become an artist biography, first-person artist statement,
  collection narrative, hero, advertisement, card, authenticity record, or
  generic rich-text surface.
- The optional signature is editorial presentation only. It does not attest
  identity, authorship, authenticity, approval, or cryptographic proof.
- Media loading, image selection, art direction, focal point, alternative text,
  rich-text sanitization, localization, content governance, and editor state
  remain target-owned.
- Missing media, title, or body is invalid input. Targets omit the profile
  instead of emitting an unnamed or incomplete section.

## Current Gallery Baseline

- Registry identity `S8`, category `sections`, selector `.brand-story`, no
  dependency, dependency depth `0`, and review order `168`.
- Contract `0.2.0`, `pilot`: eight private Brand Story anatomy parts, one
  default variant/size/state, two behaviors, five properties, eight public
  tokens, Web `implemented`, and Shopify `planned`.
- The renderer emits a native `section`, but the required title has no `id` and
  the root has no `aria-labelledby`; the section is not named by its visible
  heading.
- The renderer does not reject an empty title or missing required media/body.
  Studio disables the required slot switches, but that UI constraint is not a
  component validity rule.
- Visible signature text receives a redundant replacement `aria-label` and is
  rendered as a generic `div` instead of ordinary visible footer content.
- Brand Story independently recreates the same media/content/eyebrow/title/body
  job already owned by canonical Image with Text. Registry and contract record
  no dependency.
- Canonical S8 CSS duplicates a two-column grid, media containment, title/body
  typography, source order, and narrow stacking. It uses hardcoded `48px`,
  `24px`, `8px`, `16px`, `24px`, `40px`, `600`, `1.65`, and `0.1em` values.
- Root padding uses `--space-layout-container` on both inline edges. Under XL
  tokens that resolves to `160px`; a direct `200px` or `260px` embedding leaves
  no usable content track and a `520px` root leaves only `200px` after padding.
- The media image is natural-ratio and unbounded. At the current `752px` Studio
  stage it occupies `676.81 x 1,015.22px`; at the `584px` Exhibit stage it
  occupies `525.63 x 788.44px`.
- A viewport breakpoint and a generic container query both stack the grid.
  Studio adds a third `sections-stage` query plus `480px`/`300px` media minimums,
  a title wrapping repair, and signature typography absent from source.
- Exhibit and Studio share the `SectionsStudio` renderer and exact initial DOM:
  `777` characters, FNV-1a `b5cf498e`, and zero focusable surfaces. The parity
  is real, but both modes share the same incomplete implementation.
- The registered Figma nodes (`k3axoTaF87g17fBRgJ0PMY`, `943:7`, and
  `1020:480`) are the shared generic Studio shell. Repository evidence contains
  no S8-specific responsive artwork, signature treatment, crop, or state
  matrix. No separate owner-supplied Brand Story visual reference is present.
- Shopify has copied S8 CSS only. Its manifest reports `css-ready`, missing
  Liquid/data/behavior, and no dedicated section.
- Baseline deterministic gzip: Sections `6,758 B`, Neutral Web component CSS
  `66,920 B`, shared runtime `10,501 B`. The permanent Sections ceiling is
  `6,861 B`, leaving `103 B`; consolidation should reduce rather than grow the
  family asset. S8's runtime budget is `0 B`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML sectioning](https://html.spec.whatwg.org/dev/sections.html#the-section-element) | A `section` represents a thematic grouping normally identified by a heading. | Keep a required visible title and associate it with the root instead of treating the layout as a generic styling wrapper. |
| [HTML footer](https://html.spec.whatwg.org/dev/sections.html#the-footer-element) | A `footer` belongs to its nearest sectioning ancestor and may contain authorship, related, or closing information. | A supplied attribution/mark can be ordinary section-footer content; it needs no synthetic role or redundant replacement label. |
| [HTML images](https://html.spec.whatwg.org/dev/images.html) | Alternative text depends on the image's purpose; decorative or redundant images can use an empty alternative. | Keep media and signature-image semantics target-owned and require an explicit informative/decorative decision. |
| [WAI page structure](https://www.w3.org/WAI/tutorials/page-structure/) | Descriptive headings and meaningful structure improve navigation and comprehension. | Name the profile from its contextual title and preserve the native document reading order. |
| [WAI image guidance](https://www.w3.org/WAI/tutorials/images/) | Image alternatives must convey purpose in context, while decorative images are ignored. | Do not create universal `alt` defaults or repeat the adjacent brand name for a redundant mark. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Systems disagree on higher-level media/content/card anatomy and do not establish a Brand Story widget. | Do not add card, selection, focus, dismissal, or action semantics to passive narrative content. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Mature systems reuse canonical primitives and keep the final native element responsible for semantics. | Consume Image with Text rather than cloning its leaf composition; keep media and footer content native and target-owned. |
| [Radix Aspect Ratio](https://www.radix-ui.com/primitives/docs/components/aspect-ratio) | Ratio is a layout constraint around arbitrary media, not a new content lifecycle. | Inherit Image with Text's private bounded ratio rather than exposing crop/ratio as S8 semantic configuration. |
| [Polaris Media Card](https://polaris-react.shopify.com/components/layout-and-structure/media-card) | Media adds context to written information, while the written content should remain understandable on its own. | Keep title/body complete and comprehensible; do not import Polaris admin actions, dismissal, card shell, or fixed `h2` API. |
| [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings) | `image_picker` returns a native image object; `image_tag` preserves intrinsic dimensions and focal points; `richtext` supplies merchant-authored markup. | Shopify should own merchant image/rich-text records and map them into the neutral composition without leaking those objects into the contract. |
| [Shopify section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema) | Section schema supplies editor settings and presets but emits no storefront markup itself. | Provide a localized addable section and keep editor settings target-specific. |

No WAI-ARIA APG widget pattern applies. Brand Story has no composite focus
model, keyboard controller, selection, disclosure, or live region. Native
section, heading, image, rich-flow, and footer semantics are sufficient.

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root profile | yes | `section.brand-story.image-text` named by the visible title | Brand Story + Image with Text | S8 adds context; Image with Text owns the layout surface. |
| Media | yes | canonical `.image-text__media` containing target-native media | Image with Text / target | Target owns source, intrinsic dimensions, responsive candidates, loading, focal point, and alt purpose. |
| Content | yes | canonical `.image-text__content` generic grouping | Image with Text | Owns placement, measure, padding, and vertical stack. |
| Eyebrow | no | canonical `.image-text__eyebrow`, normally `p` | Image with Text / target | Short context only; omitted when blank. |
| Title | yes | canonical `.image-text__title`, contextual heading | Image with Text / target | Non-empty and target-unique id names the root. |
| Body | yes | canonical `.image-text__body` rich-content grouping | Image with Text / target | At least one meaningful target-authored content node. |
| Signature | no | `.brand-story__signature`, normally section `footer` | Brand Story / target | Text or media mark; omitted when absent; no proof semantics. |

The obsolete `.brand-story__grid`, `.brand-story__media`,
`.brand-story__content`, `.brand-story__eyebrow`, `.brand-story__title`, and
`.brand-story__text` parallel anatomy should be removed rather than maintained
as compatibility aliases.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One default Brand Story profile of canonical Image with Text; no independent variant class. |
| Size | One intrinsic size; crop, split threshold, measure, inset, and signature cap remain private composition. |
| Complete | Required media/title/body plus any independently optional eyebrow/signature. |
| Incomplete | Missing media, empty trimmed title, or empty body omits the whole root. |
| Without eyebrow | Eyebrow node and rhythm are absent. |
| Without signature | Footer node and rhythm are absent. |
| Signature text | Visible target text; no redundant `aria-label`. |
| Signature image | Native target image; decorative/redundant use empty alt, informative use a useful target alternative. |
| Theme | Canonical semantic surface and foreground tokens in light/dark themes. |
| Forced colors | Native text remains visible; media stays present; no overlay or color-only meaning. |
| Reduced motion | No authored component motion or runtime. |
| RTL | Media remains first in DOM/source order; logical properties contain localized text without reversing meaning. |
| Responsive | Canonical Image with Text responds to its own available inline size; no viewport or Studio-owned S8 breakpoint. |

Unsupported combinations include incomplete required content, an unnamed
section, a decorative image with a verbose duplicate alternative, a visible
signature with a redundant replacement label, authenticity claims, inherited
Image with Text action/variants, local grid controls, independent crop/ratio,
and target-specific CMS objects promoted to the neutral contract.

## Public API And State Ownership

- `media` — required target-owned native slot. Target owns source, dimensions,
  responsive candidates, loading, crop/focal point, and informative or
  decorative alternative semantics.
- `eyebrow` — optional short contextual string; omitted when empty.
- `title` — required non-empty visible heading; target chooses heading rank and
  supplies a unique id.
- `body` — required non-empty rich-content slot; target owns sanitization,
  localization, and accepted element policy.
- `signature` — optional target-owned text or media footer content; it does not
  attest identity or authenticity.
- S8 does not expose Image with Text's `variant` or `action` properties. Those
  would broaden the profile back into the generic component it consumes.
- S8 exposes no `src`, `alt`, ratio, crop, focal point, image side, content
  width, breakpoint, padding, heading level, signature medium, signature alt,
  CMS object, event, analytics, or editor setting as neutral API.
- There is no controlled/uncontrolled strategy because the component has no
  state. Target media and content editors own their own lifecycle.

## Token And Value Audit

- Canonical Image with Text should own section surface, media surface, media
  ratio, content padding/measure, title/body/eyebrow type, colors, and response.
- Brand Story should own only signature type/color and a private media-mark cap.
- The profile contract should include every canonical token it consumes through
  composition plus signature tokens, or its adapter metadata must explicitly
  model the dependency. It must not retain the old partial eight-token list.
- Signature text can use existing heading/body semantic type values; a private
  maximum image measure is valid containment, not public configuration.
- Remove hardcoded `48px`, `24px`, `8px`, `16px`, `40px`, numeric `600`, body
  `1.65`, and duplicate tracking from the S8 block. The canonical dependency
  already owns the equivalent semantic decisions.
- Structural zeroes, grid fractions, native source order, ratio integers,
  private `rem` caps, and the inherited auto-fit minimum are implementation
  constraints rather than new token candidates.

## Visual And Content Audit

- Baseline images under `output/playwright/refinement-batch-67/before/` show a
  credible editorial fixture but unbounded portrait media dominates every docs
  stage. Mobile and desktop screenshots are all effectively one long column.
- The current split becomes visible only in a large direct root. At `1120px`,
  `160px` inline padding on each side leaves two `376px` tracks and a `48px`
  gap; the media is `376 x 564px` and the full section is `756px` tall.
- At `200px`/`260px`, XL container padding consumes all available content
  width; at `520px`, only `200px` remains. This contradicts embedded-component
  resilience even though the docs shell hides the failure.
- Inherit the reviewed Image with Text `4 / 3` crop candidate and content stack
  for this pass. That crop is not owner-approved S8 identity and remains
  explicitly pending human review.
- The signature should visually close the narrative without mimicking a
  certificate, button, handwritten proof, or interactive mark. The current
  italic heading treatment is a candidate, not semantic API.
- Test short, empty, long English, long Spanish, RTL, unbroken strings, rich
  paragraphs, target image signature, and absence of both optional parts.
- Fixture photography and copy are evidence only; they are not neutral defaults
  or bundled consumer assets.

## Accessibility And Interaction

- Render only with media, a non-empty visible title, and non-empty body.
- Associate the native section with the visible heading using one target-unique
  `aria-labelledby`/`id` pair. Do not add widget roles.
- Keep media before narrative in DOM/source order at every width.
- Informative media needs a useful target alternative and intrinsic dimensions;
  decorative or redundant media uses `alt=""`.
- Preserve semantic paragraphs, lists, quotations, links, and headings inside
  the target-owned body. `blockquote` is reserved for real quoted content.
- Render signature as visible footer content. Do not replace visible text with
  `aria-label`, synthesize authorship, or call a mark authenticated.
- A signature image uses purpose-based alternative text. A redundant visual
  mark beside equivalent visible text should be decorative.
- The passive profile adds zero focus stops, key handling, drag, selection,
  announcements, timers, animation, or runtime.

## Responsive And Performance

- Reuse canonical `.image-text` intrinsic auto-fit composition and logical
  properties; do not add a `brand-story` viewport breakpoint or Studio query.
- The root must remain contained at `200`, `260`, `520`, `900`, and `1120px`
  direct widths and at Mobile `390x844`, Tablet `820x1000`, Desktop
  `1440x1000`, and XL `1920x1200` docs viewports.
- Verify `clientWidth === scrollWidth`, no zero-width content track, stable
  source order, and readable long localized content.
- Runtime budget is `0 B`: no listener, observer, request, timer, layout read,
  component state, hydration, or custom element.
- The target owns one media request and should preserve responsive source and
  intrinsic sizing to avoid oversized downloads and layout shift.
- Sections remains capped at `6,861 B` gzip. Removing the duplicated S8 grid,
  media, type, spacing, and breakpoint rules should create headroom for the
  small signature profile instead of increasing the ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `.brand-story.image-text` named section using canonical Image with Text media/content anatomy plus optional section footer signature. | Implemented, generated, validated, browser-evidenced. |
| Shopify | Localized addable Brand Story section reusing a shared Image with Text Liquid composition; merchant image intent, title, rich body, eyebrow, and optional text/image signature remain target settings. | Implemented and `target-ready`; exact-slug inventory preserves delegated-root evidence. |
| Webflow | Canonical CSS profile with native media/rich content supplied by the target. | Generated source-identical CSS copy; markup mapping remains target-owned. |
| React / Angular | Thin profile around canonical Image with Text projection; required media/title/body, optional eyebrow/signature, no local state. | Planned. |
| Figma | Instance/profile of approved Image with Text plus optional signature slot. | Registered reference is generic; create only after browser visual approval. |
| SwiftUI / Compose | Adaptive target-native media/content composition plus optional attribution footer. | Conceptual; target owns image and document semantics. |

For Shopify, a reusable Liquid snippet should own the canonical Image with Text
validation and markup. The existing `image-text.liquid` section and the new
Brand Story section can supply target-specific settings to that snippet. This
avoids a second Liquid media/content implementation while preserving separate
editor identities and schemas.

## Exhibit And Studio Parity

- Both modes already resolve the same `SectionsStudio` renderer, Studio
  definition, fixture, initial values, and runtime branch.
- The shared branch should enforce required composition, generate one unique
  title id, use the canonical Image with Text tree, and omit empty optional
  nodes.
- Remove `docs-studio__sections-brand` behavior and presentation repairs.
  Site CSS may provide only the fixture image source/placeholder treatment.
- The MDX fallback must use the same profile classes and native semantics. It
  remains documentation/fallback source rather than a second runtime artwork.
- Final evidence confirms identical normalized root `outerHTML`, DOM signature,
  focusable count, client/scroll geometry, and initial presentation in both
  modes at every reviewed viewport. React-generated target-unique ids differ
  only because each tab remounts the shared renderer.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| S8 duplicates canonical Image with Text anatomy and behavior. | high | Make Brand Story an explicit Image with Text profile and dependency; delete parallel anatomy/CSS. | architecture already implied / this ADR |
| Required title does not name the native section. | high | Trim title, generate unique id, and connect `aria-labelledby`. | implementation |
| Required media/body/title are not enforced by the renderer. | high | Omit invalid compositions across Web and Shopify. | accepted contract / implementation |
| At a two-track tablet width, the canonical Image with Text aspect-ratio media stretches beyond its computed grid track and obscures narrative content. | high | Constrain canonical `.image-text__media` to `100%` of its track and regression-test the dependency through S8. | implementation defect |
| Narrow direct roots lose their content track to duplicated S8 padding and Image with Text's viewport-mode container minimum. | high | Remove the profile padding and bound canonical content padding between element spacing and container spacing with a `cqi` preference. | implementation |
| Natural-ratio media dominates docs stages. | high | Inherit canonical private `4 / 3` Image with Text crop candidate. | visual candidate / owner review |
| Signature text has a redundant replacement label and docs-only style. | medium | Use visible native footer content and move candidate style to canonical S8 CSS. | implementation |
| Viewport, generic container, and Studio queries compete. | high | Keep only canonical Image with Text responsive behavior. | implementation |
| Shopify has no native S8 projection and Image with Text markup is not reusable. | high | Extract a documented shared Liquid composition and add a localized Brand Story section. | implementation |
| Profile identity, inherited crop, balance, density, and signature treatment are not owner-approved. | visual/product | Provide paired and special evidence; keep `pilot` and request explicit human review later. | owner |

## Open Product, Architecture, And Human Questions

- Does the inherited `4 / 3` media crop and default split express the desired
  Brand Story identity, or should human review later approve a distinct visual
  profile without duplicating the canonical implementation?
- Should the optional signature normally be a textual attribution, visual mark,
  or omitted? The neutral slot intentionally does not choose a medium.
- Should Brand Story remain separately discoverable in v1 after consumers can
  compose Image with Text directly, or is its narrower content contract and
  Shopify editor identity sufficient product value?
- Should future brand records come from a shared CMS/metaobject model? No such
  model is introduced in this refinement.
- Which heading rank and rich-content sanitizer are appropriate in each host
  document/target?
- A raster signature cannot inherit semantic foreground color across theme
  modes. Should targets require a theme-compatible asset, provide alternate
  light/dark media, prefer signature text/inline SVG, or omit the mark?
- Component-specific Figma variants, target framework implementations, and
  stability promotion remain pending.

## Baseline Evidence

- Nine screenshots: paired Exhibit/Studio Mobile, Tablet, Desktop, and XL plus
  a direct `1120px` root in
  `output/playwright/refinement-batch-67/before/`.
- Exhibit XL: root `584 x 1,165.55px`, media `525.63 x 788.44px`, content
  `525.63 x 247.36px`, one column, no label/id, zero focusable surfaces.
- Studio XL: root `752 x 1,415.83px`, media `676.81 x 1,015.22px`, content
  `676.81 x 247.36px`, one column, no label/id, zero focusable surfaces.
- Direct root under XL tokens: inline padding `160px`; `200px` and `260px`
  requests collapse the content track, `520px` leaves a `200px` track, `900px`
  remains one column, and `1120px` produces two `376px` tracks with `48px` gap.
- Browser console contains only the known missing `/favicon.ico` request; no S8
  runtime error or warning was observed.

## Final Evidence

- Nineteen final captures under
  `output/playwright/refinement-batch-67/after/` cover paired Exhibit/Studio
  Mobile, Tablet, Desktop and XL, direct roots, no-signature composition,
  localized Spanish, RTL Arabic, signature image, dark theme and forced colors.
- Exhibit and Studio normalize to one subtree and FNV-1a `c1e58f96` at every
  paired viewport. The native section is named by its visible heading, media
  remains first in DOM, the signature is a `footer`, and focusable count is
  zero.
- At Tablet the canonical grid is exactly `394px 394px`; the media no longer
  expands to the baseline `632.95px` and no longer obscures the content track.
- Direct roots at `200`, `260`, `520`, `900`, and `1120px` have equal client and
  scroll widths, no descendant outside the root, one track through `520px`, and
  two equal tracks at `900/1120px`. Inline content padding resolves to
  `32/32/41.6/72/89.6px` under XL tokens.
- Blank trimmed title omits the complete root; disabled required Media/Body
  controls remain checked; disabling Signature omits only its footer.
- Long Spanish, Arabic RTL and unbroken Latin strings remain contained.
  Signature-image evidence is purpose-labelled and capped at `200 x 40px`.
- Light/dark semantic colors, forced-colors text, zero authored motion and a
  clean browser console pass. Raster theme contrast remains target-owned and is
  explicitly queued above rather than hidden by a destructive filter.
- Final gzip is Sections `6,731 B`, Neutral Web component CSS `66,881 B`, and
  shared runtime `10,501 B`: deltas `-27 B`, `-39 B`, and `0 B` from baseline.
  Canonical, Shopify and Webflow Sections CSS share SHA-256
  `9d9f3d6dc5e7eb5fe139225b7afa89842b946f7daa253985855c5466fb9a2b97`.
- Shopify reports Brand Story `target-ready` with Liquid, schema, data,
  behavior, template-composition and editor-preview layers ready. Official
  Shopify revision 3 passed the shared snippet, both sections, both locale files
  and generated Sections CSS; the later padding-only CSS delta passes the local
  adapter validator, while the revision 4 official runner returned no captured
  summary.

This dossier prepares S8 for human review; it is not stability approval. The
contract remains `pilot`, `site/dist` was not rebuilt, and the visual/product
questions above require explicit owner review.
