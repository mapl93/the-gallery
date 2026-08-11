# Component Dossier: Image with Text

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/image-text.contract.json`

## Recommendation

Keep Image with Text as a passive, complete media-and-narrative section. Require
target-owned media, a visible contextual title, and a non-empty narrative body;
keep eyebrow and one Button-composed action optional. Preserve the accepted
`default`, `reversed`, `stacked`, `overlay`, and `offset` presentations while
making their geometry container-responsive and their source order invariant.

The neutral component must not own image selection, art direction, focal point,
heading rank, rich-text sanitization, destination routing, analytics, loading,
or editor lifecycle. The media owner decides whether an image is informative or
decorative and supplies the corresponding alternative. Button owns action
focus, activation, busy, and disabled semantics; Image with Text only places the
complete action slot.

Use a bounded private media ratio and overlay block size as review candidates,
not public configuration. This resolves the current unbounded portrait growth
without turning crop, height, breakpoint, scrim geometry, or content measure
into cross-target API. Human review must approve those candidates and all five
presentations before any stability promotion.

## Purpose And Limits

- Pairs one target-owned visual with a short editorial or commercial narrative
  in a thematic page-builder section.
- Supports ordinary split, visually reversed split, always-stacked, overlay,
  and contained offset presentations without changing content semantics.
- Use Hero for a primary campaign surface, Product Card for a product record,
  Gallery for multiple images, and Rich Text for prose without required media.
- The root does not become a card, widget, disclosure, carousel, or form.
- The component owns no query, media loading state, video controls, image
  lightbox, action result, navigation state, analytics, or live announcements.
- Missing media, title, or body is an invalid composition. A target omits the
  section until the required content is complete.

## Current Gallery Baseline

- Registry identity `S3`, category `sections`, selector `.image-text`, direct
  dependency Button, dependency depth `1`, and review order `163`.
- Contract `0.2.0`, `pilot`: seven anatomy parts, five variants, one size, one
  state, three behaviors, six properties, ten public tokens, Web implemented,
  and Shopify planned.
- The renderer emits a thematic `section` without an accessible relationship to
  its required title. An empty title still leaves an empty `h2` and the section
  continues to render.
- Required `media` and `body` appear as disabled Studio switches rather than a
  clearly documented validity rule. The renderer itself still accepts their
  absence.
- The Studio action points to `#material` and cancels native activation. It is
  therefore not truthful navigation evidence for the Button-composed slot.
- Canonical CSS starts as a two-column grid but duplicates a viewport and a
  container breakpoint, uses physical width/height/order, and contains
  hardcoded `48px`, `8px`, `16px`, `24px`, `600`, `1.65`, `0.1em`, and an
  `rgba()` scrim.
- The media has no bounded ratio. The portrait fixture expands to a 2:3 block:
  `736x1,104px` at Tablet and `1,120x1,680px` in wide Stacked evidence.
- Overlay assigns inverse color only to the content wrapper. Explicit child
  tokens win in the cascade: the title remains `rgb(23 23 23)` and eyebrow/body
  remain `rgb(82 82 82)` over imagery. The half-opacity gradient is a hardcoded
  local value.
- Site-only Studio CSS supplies `420px`/`300px` media minimums, a `460px`
  overlay minimum, a `620px` content measure, and its own `720px` response. It
  therefore owns candidate behavior and visual decisions absent from source.
- The registered Figma nodes (`k3axoTaF87g17fBRgJ0PMY`, `943:7`, `1020:480`)
  are the generic Studio/Button shell already inspected in adjacent dossiers;
  they provide no S3-specific crop, density, scrim, or hierarchy evidence.
- Shopify has copied section CSS but no dedicated `sections/image-text.liquid`;
  its adapter manifest reports planned contract support and missing native
  Liquid/data/editor composition.
- Baseline deterministic gzip: Sections `6,464 B`, Neutral Web component CSS
  `66,551 B`, shared runtime `10,501 B`. The passive S3 change must add `0 B`
  runtime and keep the Sections family under its `6.7 KiB` ceiling.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `section`](https://html.spec.whatwg.org/dev/sections.html#the-section-element) | A `section` is a thematic grouping normally identified by a heading, not a generic styling wrapper. | Require a visible title and connect the root to it; omit incomplete compositions. |
| [HTML images](https://html.spec.whatwg.org/multipage/images.html) | Native `img` carries source, dimensions, loading and alternative-text semantics; its text alternative depends on image purpose. | Keep source/art direction target-owned and preserve native image semantics. |
| [WAI informative images](https://www.w3.org/WAI/tutorials/images/informative/) | Informative images need concise alternatives conveying their purpose; decorative images use an empty alternative. | The media slot exposes no universal default alt. Targets must classify and label the supplied media. |
| [WAI page sections](https://www.w3.org/WAI/tutorials/page-structure/sections/) | Explicit headings identify page regions and support navigation and comprehension. | Name the thematic root from its required visible heading without adding a widget role. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Mature systems disagree on media/image-overlay anatomy and higher-level card composition. | Do not promote one external compound component API into S3; retain Gallery's accepted section boundary. |
| [Open UI Image research](https://open-ui.org/components/image.research) | Cross-system image concepts include source, alt, fit, ratio and alignment, but no stable Image-with-Text standard exists. | Keep target media facts native and ratio/crop as private candidate composition rather than public semantic API. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Radix composes behavior onto consumer-owned elements instead of duplicating leaf controls. | Compose the accepted Button contract and do not create a local action implementation. |
| [Radix Aspect Ratio](https://www.radix-ui.com/primitives/docs/components/aspect-ratio) | Aspect ratio can bound responsive media independently from the media implementation. | A private bounded ratio is a valid neutral layout mechanism; it does not need to become S3 public API. |
| [Polaris Media Card](https://polaris-react.shopify.com/components/layout-and-structure/media-card) | Polaris treats media as enhancement to text that should remain understandable, with title/body/actions around a visual. | Preserve a complete narrative and avoid adopting Polaris admin/dismiss behavior or markup. |
| [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#image_picker) | `image_picker` supplies merchant-selected image data, including alt/focal-point facts usable by Liquid image helpers. | Shopify owns merchant media selection and responsive image generation, not the neutral contract. |
| [Dawn Image with Text](https://github.com/Shopify/dawn/blob/main/sections/image-with-text.liquid) | Dawn composes selected image, heading, text and button blocks with target-specific editor and responsive options. | Reuse only the target-data pattern; retain Gallery classes, five variants, minimal semantic settings, and visual identity. |

No APG widget pattern applies. S3 has no composite focus model or keyboard
controller; native document, image, heading, link, and Button semantics are the
appropriate baseline.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `section` named by visible title | Image with Text/target | Holds one complete media/narrative composition. |
| Media | yes | native media, usually `img` | Target | Informative or decorative semantics are explicit; target owns source, dimensions, loading, and focal point. |
| Content | yes | generic grouping | Image with Text | Preserves content measure and placement; introduces no landmark. |
| Eyebrow | no | short text, normally `p` | Target | Context only; never substitutes for the title. |
| Title | yes | contextual heading | Target | Fixtures use `h2`; its id names the root. |
| Body | yes | target-owned rich-content slot | Target | One or more meaningful prose nodes; sanitization remains target-owned. |
| Action | no | canonical Button composition | Button/target | Render only as a complete label/destination or valid command supplied by the target. |

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Default | Media then narrative in source; stacked in narrow containers and split in sufficiently wide containers. |
| Reversed | Same source order; content appears first visually only in wide split mode and returns to media-first when stacked. |
| Stacked | One column at every width with bounded media; content remains after media. |
| Overlay | Media fills a bounded section; an invariant semantic scrim and explicit inverse child colors protect text. |
| Offset | Contained split/stack composition with canonical section inset, grid gap, and rounded media. |
| Size | One intrinsic size. Ratio, block size, measure, threshold, padding curve, and scrim geometry are private composition. |
| Complete | Required media, title, and body present; optional eyebrow/action collapse without blank rhythm. |
| Incomplete | Invalid rendered section; target omits it rather than emitting an unnamed/empty region. |
| Theme | Light/dark through semantic text/surface tokens; Overlay uses the inverse semantic family. |
| Forced colors | Content remains readable over an opaque system surface; native image remains available. |
| Reduced motion | No authored component motion or runtime. |
| RTL | Logical spacing and inline axes; narrative reading/source order does not reverse. |
| Responsive | Named component container only; no viewport or docs-stage implementation rule. |

Unsupported combinations include missing media/title/body, an empty heading,
copied Button behavior, fake/cancelled navigation, visually reordered DOM,
interactive media without its own target contract, overlay text using ordinary
foreground tokens, arbitrary merchant CSS controls, and a target-specific media
object promoted into the neutral property schema.

## Public API And State Ownership

- `variant` — optional enum, default `default`; `default`, `reversed`, `stacked`,
  `overlay`, or `offset`.
- `media` — required target-owned slot. Target decides native element, source,
  intrinsic dimensions, alternative, loading, responsive sources, and focal
  point.
- `eyebrow` — optional short contextual string.
- `title` — required non-empty visible heading content. Native adapters choose
  the appropriate page-level heading rank.
- `body` — required non-empty narrative rich-content slot.
- `action` — optional complete Button-composed slot. Target owns navigation or
  command semantics, destination/result, analytics, disabled, and busy state.
- The component exposes no `alt`, `src`, `ratio`, `objectFit`, focal point,
  heading level, content width, breakpoint, padding, overlay opacity, alignment,
  loading, or editor setting as neutral semantic API.
- It has no controlled/uncontrolled state. Interactive media and action
  lifecycles remain controlled by their target-owned child contracts.

## Token And Value Audit

- S3 owns section/container spacing, title/body/eyebrow typography and colors,
  inverse Overlay text, and Offset media radius.
- Button owns action color, typography, focus, sizing, transition and busy state.
- Complete title references must include H2 family, size, weight and line-height;
  body and eyebrow use accepted body/caption scales rather than calculations or
  numeric font weights.
- Use `--space-layout-element-gap` for internal rhythm and existing section,
  container, grid-gap, touch-target, inverse-text, surface, radius, and scrim
  opacity semantics where their ownership is real.
- Private `--_image-text-*` variables may express media ratio, content measure,
  overlay minimum block size, scrim color and padding curve. They are not public
  customization API.
- Structural zeroes, grid fractions, order values, `minmax(0, 1fr)`, ratio
  integers, stacking indexes, and private `rem`/container thresholds are
  containment rules, not token candidates.

## Visual And Content Audit

- Baseline evidence under `output/playwright/refinement-batch-62/before/` shows
  an attractive source image but an uncontrolled portrait crop that dominates
  Mobile/Tablet and makes Stacked nearly two thousand pixels tall at `1120px`.
- Default balances two equal columns at `1120px`, but the media height is driven
  by the source aspect ratio rather than a component composition rule.
- Overlay visibly fails: dark title/body sit on a variable photograph because
  wrapper inheritance is overridden by child token declarations.
- Use a private `4 / 3` media candidate for this refinement pass. The ratio is a
  reviewable visual choice, not an accepted public option or identity decision.
- Preserve a restrained text measure, intrinsic wrapping, `overflow-wrap`, and
  optional-part collapse. Test short, empty, long English, Spanish, mixed-script,
  URL-like, and unbroken content.
- The source fixture is evidence only; it is not the component's default media,
  crop, alt, or content.

## Accessibility And Interaction

- A non-empty visible heading names the thematic section with
  `aria-labelledby`; do not add `role=region` unless a target has a real landmark
  need.
- Informative images receive meaningful alternatives; decorative images use
  `alt=""`. Do not duplicate adjacent narrative in the alternative.
- Preserve media then content in DOM order for every variant. Reversed affects
  wide visual placement only and resets when stacked.
- The optional action uses a native link for navigation or native button for a
  command through canonical Button composition. Do not cancel fixture
  activation.
- Overlay uses explicit inverse foregrounds over an invariant scrim and a
  system-color fallback in forced-colors mode.
- S3 adds no focus stop, Arrow-key behavior, live region, drag, autoplay,
  timeout, or motion. Button/target child behavior remains in ordinary Tab order.

## Responsive And Performance

- Name the root `image-text` container and use logical inline/block properties.
- Stack Default/Reversed/Offset until the component itself reaches the accepted
  private split threshold; Stacked never splits and Overlay keeps one layer.
- Test Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900`, and XL
  `1536x960` in Exhibit and Studio, plus `1120px` direct roots for all variants.
- Passive runtime budget is `0 B`: no listeners, observers, timers, network
  requests, layout reads, image loaders, or component controller.
- One media asset is target-owned and outside S3 bundle accounting. Adapters
  must preserve intrinsic dimensions and responsive-image policies to avoid
  layout shift and oversized downloads.
- Sections family ceiling is `6.7 KiB` gzip. Replacing duplicate rules with one
  canonical container implementation should remain within that ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named native section, target media, content grouping, optional eyebrow, contextual heading, rich body and Button-composed action; CSS-only variants. | Baseline implemented but semantically/visually incomplete. |
| Shopify | Addable `image-text` section with image picker, decorative classification, eyebrow, heading, rich text, complete optional button pair, and five-variant setting; Liquid generates responsive media. | Planned; dedicated Liquid/schema/locales are missing. |
| React / Angular | Required media/title/body, optional eyebrow/action and variant; framework owns heading/media/action elements and data lifecycle. | Planned; no local state. |
| Figma | Media frame plus narrative stack and optional canonical Button instance across five presentations. | Registered reference is generic; final crop, density and overlay need owner review. |
| SwiftUI / Compose | Target image with accessibility description plus semantic heading/body/action stack; layout variants map to target-native adaptive containers. | Conceptual; navigation/media loading remain target-native. |

## Exhibit And Studio Parity

- Exhibit and Studio already share `SectionsStudio`, the contract, one Studio
  definition, and one fixture state.
- The shared branch must enforce required composition, generate one title id,
  name the root, use a truthful media alternative, and provide a real action
  destination without cancelling activation.
- Use the same fixture and exact render branch in both modes; no duplicate
  Exhibit-only or Studio-only markup.
- Remove site-only S3 height, overlay measure, breakpoint, and reversed-order
  rules. Site CSS may provide the fixture image only.
- Update the MDX fallback to mirror the required named composition and real
  action destination without deleting secondary editorial guidance.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Required title does not name the thematic root and empty title still renders. | high | Require/trim title, omit invalid composition, wire `aria-labelledby`. | implementation |
| Media/body requiredness is not enforced by renderer. | high | Treat missing media/title/body as invalid and omit S3. | accepted contract / implementation |
| Studio CTA is fake and activation is cancelled. | high | Use a real destination and native Button-composed link behavior. | implementation |
| Overlay inherits inverse color only on wrapper while children remain dark. | high | Apply inverse tokens explicitly and use invariant semantic scrim geometry. | implementation |
| Unbounded portrait media creates extreme section heights. | high | Add private bounded ratio candidate and direct-root evidence. | visual candidate / owner review |
| Viewport, container and site-only responsive systems compete. | high | Keep one named canonical container system and remove site behavior. | implementation |
| CSS hardcodes typography, rhythm and scrim values. | medium | Replace semantic values with existing tokens and isolate structural/private values. | implementation |
| Shopify has no native section adapter. | high | Add minimal Liquid/schema/locales using responsive image helpers and complete content rules. | implementation |
| Five variant aesthetics and `4 / 3` crop are not owner-approved. | visual | Provide paired/special evidence; keep `pilot` and request explicit human review later. | owner |

## Evidence And Validation

Baseline artifacts contain eight paired viewport screenshots and five wide
variant captures under `output/playwright/refinement-batch-62/before/`.
Measurements prove:

- every paired root is unnamed (`aria-labelledby: null`);
- empty title leaves a rendered empty `h2`;
- action destination is `#material`, and activation leaves the URL unchanged;
- portrait media reaches `1.5x` its inline size and dominates every stacked
  render;
- Overlay wrapper computes inverse white, but title computes `rgb(23 23 23)`
  and eyebrow/body compute `rgb(82 82 82)`;
- Exhibit and Studio geometry matches only when root widths match, while the
  candidate response still depends on site-only CSS.

Final artifacts under `output/playwright/refinement-batch-62/after/` contain
eight paired viewport captures, five wide variants and seven special captures.
Measurements prove:

- Exhibit and Studio root DOM is exactly equal at `737` characters with FNV-1a
  `aafe8637` across all four paired viewports.
- Missing media/title/body yields root count `0`; empty eyebrow/action yields
  part count `0` while the complete root remains.
- Default/Reversed changes from one `767px` track to two `384px` tracks at
  `768px`; Reversed retains DOM `[media, content]` and changes only media order.
- Wide Default/Reversed is `1120x420px`, Stacked media is `1120x840px`, Overlay
  is `1120x650px`, and Offset is `1120x502px`.
- All Overlay text computes inverse white; forced colors preserves visible
  media then system-color content; Mobile Overlay contains at `358x384px`.
- Pointer and Enter reach `/components/material-library`; focus is `2px` solid
  with `2px` offset.
- Light title/body contrast is `17.93:1`/`7.81:1`; conservative Overlay contrast
  is `5.74:1`.
- Arabic/Spanish RTL, unbroken Mobile and effective `288px` cases report no
  overflowing root or descendant. Dark, reduced motion and console checks pass.
- Final deterministic gzip is Sections `6,743 B`, Neutral Web CSS `66,850 B`,
  shared runtime `10,501 B`; S3 adds `0 B` runtime and Sections retains `118 B`
  under its ceiling.
- Shopify reports S3 `implemented`, `ready: true`, nine used settings, no dead
  settings, one preset and all maturity layers ready. Official Liquid artifact
  `image-text-s3-batch62` revision 1 passes.
- Contract, Studio, docs, Web/Shopify adapters, Webflow/Shopify source-copy
  identity, static previews, diff and clean `site/dist` checks pass.

See `docs/reports/image-text-web-refinement-audit.md`,
`docs/reports/refinement-batch-62.md`, and ADR 0147 for the durable result.

## Risks And Open Questions

- Owner must approve the private `4 / 3` crop candidate, split density, Offset
  inset, Overlay block size/scrim, and five-variant hierarchy before stability.
- Some target content may require video or other interactive media. That remains
  a separate child/target contract and must not be inferred from the generic
  `media` slot in this batch.
- Shopify's image alt comes from merchant media metadata unless the merchant
  marks it decorative. Editorial quality remains a target/content governance
  responsibility.
- Heading rank depends on page context; every adapter must expose/compose an
  appropriate native heading without turning rank into a visual variant.
- S3 remains `pilot` and `human-review-ready` at most until explicit human
  approval; automated evidence cannot promote it to `stable`.
