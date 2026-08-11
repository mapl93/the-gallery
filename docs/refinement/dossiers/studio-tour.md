# Component Dossier: Studio Tour Section

Status: `human-review-ready`

Target reviewed: Neutral Web with documented Shopify and future-target translation

Contract: `components/contracts/studio-tour.contract.json`

## Recommendation

Treat Studio Tour as a contextual profile of canonical Process Timeline rather
than a second ordered-step implementation. Require a non-empty visible heading
and at least one step whenever the component renders. Layer the
`.studio-tour` context hook on the canonical `.process-timeline` root and reuse
its native `ol`/`li`, numbering, media, typography, intrinsic overflow, focus,
forced-colors, RTL, and zero-runtime behavior.

Keep only the tour-specific editorial introduction (`eyebrow`, `heading`, and
`intro`) plus one optional target-owned supplementary-media slot. The neutral
fixture must present that slot passively as an image and caption. Remove the
current full-surface play Button because it has no playback behavior and
therefore advertises an action that does not exist. A target may later place a
native accessible video or a complete target-native player in the slot after
provider, consent, loading, captions, transcript, playback, modal, and analytics
ownership is accepted.

Do not compose canonical Steps: Studio Tour has no current/completed/upcoming
state, navigation, controlled value, progress meaning, or step-change events.
Do not compose the unrefined Video Section or invent a generic media-player
contract. Keep the existing media-policy question open.

## Purpose And Limits

- Presents an ordered editorial walkthrough of a working studio, place, or
  making environment.
- Primary contexts are artist and maker profiles, studio stories, collection
  narratives, and target-native commerce editorial sections.
- Studio Tour owns its contextual introduction and optional supplementary-media
  placement. Canonical Process Timeline owns the ordered sequence presentation.
- The target owns tour records, localization, heading rank, images, alternative
  text, focal points, media type, provider, privacy/consent, loading, captions,
  transcripts, playback, modal presentation, analytics, and destinations.
- It is not a progress Stepper, Carousel, virtual tour engine, map, booking flow,
  media player, consent manager, CMS record schema, or analytics integration.
- No component JavaScript, selection, controlled/uncontrolled state, events,
  observers, timers, requests, animation, auto-advance, or autoplay is required.

## Pre-Refinement Gallery Baseline

- Registry `R13`, category `ceramics`, no dependencies; contract `0.2.0`,
  `pilot`; fourteen anatomy parts, one variant/size/state, two behaviors, five
  properties, and seventeen public tokens.
- ADR 0083 accepts ordered tour records and optional media while explicitly
  leaving media type and provider/consent/loading/playback/captions/modal/
  analytics ownership open.
- Canonical CSS independently recreates ordered step layout, numbering, media,
  typography, spacing, and responsive behavior even though Process Timeline
  already owns that job and completed technical refinement under ADR 0124.
- The two-step fixture is too small to exercise the three-track wide case or
  narrow overflow. Site-only Studio CSS changes the grid at a viewport query,
  resets the list, and supplies media sizing, so the canonical source does not
  fully determine the artwork.
- The root always has `aria-labelledby="tour-..."`; clearing the optional
  heading in Studio leaves a dangling reference. Browser evidence measured
  `headingCount: 0` and `labelExists: false`.
- The optional media fixture is an image covered by a native Button labelled
  "Local preview of studio tour media". Activation only leaves focus on the
  Button: it starts no video, changes no state, and reveals no player.
- Passive step images scale on hover even though the step is not interactive.
  The motion suggests clickability and adds transition/reduced-motion CSS with
  no semantic benefit.
- The contract exposes video-specific poster and play anatomy despite saying
  that playback is not implied. Its focus, touch-target, transition, and easing
  tokens exist only for the inert fixture action.
- Baseline Exhibit and Studio use the same renderer and fixture, but their host
  widths yield different one/two-column arrangements. Existing evidence covers
  Mobile and Desktop only and has no long, empty, localized, extreme, heading-
  omitted, media-omitted, forced-colors, RTL, zoom, or source/generated checks.
- Deterministic gzip baseline is `4,708 B` for Ceramics CSS against the permanent
  `5.3 KiB` (`5,427 B`) family ceiling, `67,148 B` for generated neutral
  component CSS, and `10,501 B` for shared runtime. Studio Tour itself adds no
  neutral runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML ordered-list standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-ol-element) | `ol` represents intentionally ordered items and direct `li` children retain compound flow content. | Reuse canonical Process Timeline's native ordered structure and preserve authored source order at every width. |
| [Open UI List research](https://open-ui.org/components/list.research/) | Ordered lists may contain compound text, icons, images, and other sections; no interoperable Studio Tour widget is defined. | Keep Studio Tour as Gallery editorial composition over native list semantics, not a new ARIA widget. |
| [Polaris Ordered List](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/ordered-list) | Ordered lists suit procedures and sequences; direct items may contain rich content and parallel concise structure improves scanning. | Keep every target step a direct item with parallel title, optional image, and optional description. |
| [HTML figure/figcaption](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) | A self-contained image or video may be grouped with one caption as part of the surrounding flow. | The supplementary fixture can be a passive `figure`; a caption is optional and target-authored rather than a player label. |
| [HTML video and media controls](https://html.spec.whatwg.org/multipage/media.html#the-video-element) | Native video defines poster, loading/preload, controls, text-track and playback behavior; `controls` requests a complete user-agent interface. | A poster-like image plus inert custom Button is not a video. Real video belongs to a complete target implementation. |
| [WAI audio/video accessibility](https://www.w3.org/WAI/media/av/) | Accessible media can require captions, descriptions, transcripts, accessible players, and control over playback. | Keep these responsibilities explicit and target-owned; do not certify a decorative play icon as accessible playback. |
| [Polaris Video Thumbnail](https://polaris-react.shopify.com/components/images-and-icons/video-thumbnail) | The mature component is explicitly clickable, keyboard accessible, named with useful duration, and triggers a real player in a modal or full screen. | The Gallery should expose a playback action only when the target supplies the corresponding player lifecycle. |

### Mature-system comparison

- Open UI and Polaris converge on native ordered compound items; neither defines
  a target-neutral studio-tour component.
- Canonical Gallery Process Timeline already provides the ordered narrative
  model, native overflow, source order, media omission, and zero-runtime
  boundary needed here. Studio context does not justify another step model.
- Canonical Steps is intentionally excluded because it owns progress/current
  state rather than passive editorial sequence.
- Radix publishes no Studio Tour or Timeline primitive. Its lower-level
  primitives do not justify a target-neutral media player or duplicate list.
- Polaris Video Thumbnail proves that a play surface is a behavioral contract,
  not decoration. Its modal/full-screen lifecycle remains target-specific and
  is not copied into The Gallery.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct API inspection and screenshot review show the
generic `02 / Component Detail - Studio` shell, the Button pilot, and generic
Content/Presentation/Layout/Appearance inspector rows. The frame contains no
Studio Tour artwork, steps, media, responsive examples, or component-specific
properties. It validates the inspector organization only. The repository
candidate remains the visual proposal for human review; no tour aesthetic is
inferred from the unrelated frame.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Context root | yes | named `section.studio-tour.process-timeline` | Studio Tour / target | Omitted entirely unless heading and steps are present; labelled by the visible heading. |
| Header | yes | `header.studio-tour__header` | Studio Tour | Contains the required heading and any optional introduction. |
| Eyebrow | no | paragraph/phrasing content | target | Editorial label only; never substitutes for the heading. |
| Heading | yes | contextual heading with canonical `.process-timeline__title` | target | Labels the root and ordered lane through a unique id; rank belongs to the document. |
| Intro | no | paragraph/rich text | target | Concise context before the ordered walkthrough. |
| Track | yes | canonical focusable native `ol.process-timeline__track` | Process Timeline / target | Required ordered lane labelled by the same visible heading. |
| Step | repeated, at least one | direct canonical `li.process-step` | target | Authored order is meaningful and canonical. |
| Step number | yes | canonical visual text, `aria-hidden="true"` | Process Timeline | Native list semantics expose order; the marker is not spoken twice. |
| Step media | no | canonical `.process-step__image` | target | Omitted when absent; does not carry sequence alone. |
| Step title | yes | contextual heading | target | Required concise step name. |
| Step description | no | paragraph/rich text | target | Omitted completely when empty. |
| Supplementary media | no | `figure.studio-tour__media` or target-equivalent slot | Studio Tour / target | Passive fixture; target may substitute a complete accessible native player after policy. |
| Media asset | conditional | native image, video, or target player | target | Image alt, intrinsic size, loading, controls, tracks, privacy, and requests are target-owned. |
| Media caption | no | `figcaption.studio-tour__media-caption` | target | Describes the self-contained media; omitted when empty. |

## Variant, Size, State, And Mode Matrix

- Variant/size: one default contextual profile; Process Timeline owns track size
  and overflow. Grid/list toggles, orientation, density, alignment, connector
  visibility, marker style, and media ratio are not public properties.
- Required composition: non-empty heading plus at least one step. Invalid or
  empty required composition is omitted instead of emitting an unnamed/empty
  section.
- Introduction: heading only; eyebrow + heading; heading + intro; or all three.
- Step content: required title with optional informative/decorative/missing image
  and optional/missing description. Meaning survives without media.
- Supplementary media: absent; passive informative image with optional caption;
  or a complete target-native accessible player after policy. An inert poster
  action is not an accepted state.
- Repeated/content extremes: one, three, eight and target maximum steps; short,
  long, empty optional, localized, RTL, unbroken, and zoomed content.
- Themes/assistive modes: light, dark, forced colors, reduced motion, keyboard,
  touch, screen reader, 200% zoom, and no-hover input.
- Controlled/uncontrolled: none. The component is passive and has no selected,
  current, open, playing, modal, loading, or completion value.

## Public API And State Ownership

Expose only five semantic properties:

- `eyebrow` — optional editorial label.
- `heading` — required visible tour heading and root/track label.
- `intro` — optional contextual introduction.
- `steps` — required target-owned canonical Process Timeline composition.
- `media` — optional target-owned supplementary-media composition; no media
  type, provider, playback, modal, or loading behavior is implied.

Do not add `items`, `currentStep`, `activeStep`, `orientation`, `columns`,
`density`, `imageRatio`, `showNumbers`, `showConnectors`, `videoUrl`, `provider`,
`poster`, `autoplay`, `muted`, `loop`, `controls`, `playing`, `onPlay`,
`onStepChange`, or `onComplete`. Step/media records and every interactive media
lifecycle belong to targets.

## Token And Value Audit

- Process Timeline retains all step, marker, focus, track, connector, media,
  spacing, and responsive tokens. Studio Tour must not repeat them.
- Studio Tour keeps only secondary text, complete caption/body typography,
  element/section spacing, and the supplementary-media radius needed by its own
  introduction and media slot.
- Remove focus, touch-target, transition, easing, statement-surface, full-radius,
  step-title and step-media tokens from the profile; they belong to the
  dependency or the removed fake action.
- Eyebrow tracking, supplementary `16/9` crop, intro measure, and any media
  maximum are private composition decisions, not stable cross-target API.
- Replace physical width/height/margins with logical properties and complete
  semantic typography pairs. Remove literal fallback token values and site-only
  source behavior.

## Accessibility And Interaction

- Render only with a non-empty visible heading and at least one direct ordered
  item. Reference one target-unique heading id from both root and lane.
- Preserve canonical `ol`/`li`, native scrolling, visible focus, source order,
  RTL, forced-colors, and no custom keyboard handlers.
- Keep visible numbering hidden from assistive technology because native list
  semantics expose position.
- Informative images require useful target-authored alternatives; decorative
  images use empty `alt`; optional wrappers disappear when content is absent.
- Remove the inert playback Button and all hover/focus behavior attached only to
  it. Passive media creates no Tab stop.
- A later real player must provide accessible controls, keyboard access,
  captions, descriptions and transcripts as applicable, and must not autoplay
  or fetch third-party media by neutral-contract assumption.
- No authored motion remains in the profile. Process Timeline itself adds no
  animation or smooth scrolling.

## Responsive And Performance

- Reuse Process Timeline's one intrinsic equal-track lane. Tracks distribute
  available inline space and overflow only inside their named lane when they do
  not fit; no Studio Tour viewport query or duplicate grid is needed.
- The introduction and supplementary media use logical measurements and inherit
  the actual host width. The page/root must not overflow at Mobile, Tablet,
  Desktop, XL, localization, RTL, or zoom.
- DOM/work is linear in target-supplied steps and media. The profile owns no
  listener, observer, timer, request, formatter, state store, layout read,
  transform, custom control, icon, or neutral asset.
- Neutral runtime contribution remains `0 B`. Target images and real media
  requests remain data/adapter concerns.
- Permanent Ceramics-family budget remains `5.3 KiB` (`5,427 B`) gzip. This
  refinement should reduce CSS by deleting the duplicate step and fake-player
  rules; it creates no new runtime ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Named contextual section layered on Process Timeline, canonical ordered lane/items, optional introduction, and passive/target-owned supplementary media. | Implemented, generated, validated and browser-evidenced; no neutral runtime. |
| Shopify | Dedicated section or contextual composition of Process Timeline blocks plus optional editorial settings/media. Merchant records, schema, media type, consent/loading and player policy remain unresolved. | Canonical CSS/assets/manifests synchronized and validated; dedicated Liquid remains planned. |
| React / Angular | Thin profile around the canonical Process Timeline projection; render `null` for missing heading/steps and accept target-owned intro/media slots. | Planned; no independent state coordinator. |
| Figma | Instance/profile of reviewed Process Timeline with tour eyebrow/intro and optional passive media example. | Planned; registered reference is generic Button artwork. |
| SwiftUI / Compose | Contextual heading/introduction plus target-native ordered accessible group and optional target-native media. | Conceptual; target owns media lifecycle and records. |

## Exhibit And Studio Parity

- Exhibit and Studio must keep one `CeramicsStudio` renderer, one fixture and
  identical initial component outerHTML.
- The review fixture should use three canonical steps to exercise the wide lane,
  include informative images/descriptions, and show passive supplementary media
  with a caption and no focusable action.
- Special evidence must cover heading omission (component omitted), media
  omission, long/localized content, repeated steps, narrow overflow, RTL, zoom,
  themes, forced colors, keyboard lane focus, and source/generated identity.
- Studio exposes only the five semantic properties and profile-owned tokens.
  Dependency-owned step appearance and fake-player focus/motion controls are not
  duplicated in profile metadata.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Studio Tour duplicates the certified Process Timeline sequence. | high | Make it a contextual profile and register `process-timeline` as its dependency. | implementable now from accepted composition architecture |
| Optional heading can leave `aria-labelledby` dangling. | high | Require non-empty heading for the rendered profile; omit invalid composition. | implementable semantic correction; human review remains |
| Media Button is focusable but performs no action. | high | Remove it and present passive media until a real target player exists. | implementable now; provider policy remains open |
| Contract exposes video/play anatomy while denying playback behavior. | high | Replace video-specific anatomy with a generic supplementary-media slot. | implementable now |
| Passive images move on hover. | medium | Inherit motion-free canonical Process Timeline media. | implementable now |
| Site CSS supplies component layout/list/media behavior. | high | Remove Studio Tour-specific site overrides and consume canonical source CSS. | implementable now |
| Only two steps are exercised. | medium | Use three canonical steps plus repeated/extreme special evidence. | implementable now |
| No component-specific Figma artwork exists. | human review | Present the repository candidate and request aesthetic approval. | owner |
| Media type, record schema and target service ownership remain open. | product/architecture | Keep documented; do not create a generic player or Shopify schema. | owner/target team |

## Refinement Result

- Contract `0.3.0` remains `pilot`; registry and contract now declare the direct
  `process-timeline` dependency.
- MDX and the shared Exhibit/Studio renderer use the canonical Process Timeline
  anatomy. The renderer omits missing required composition, and the obsolete
  Lucide Play icon/import and inert playback surface are removed.
- Canonical CSS keeps only the tour introduction and passive supplementary
  media. Duplicated step/grid/motion/focus/player rules and Studio-only source
  behavior are removed.
- Initial Exhibit and Studio component DOM is byte-identical at `2,269`
  characters with SHA-256
  `a7ca742852433da9944f6bc3d9711d2e0c02113f117f2bf905fc88fd1cb972fb`.
- Batch 57 covers paired Mobile/Tablet/Desktop/XL plus required/optional
  omission, keyboard lane scrolling, long localization, full Arabic RTL, 200%
  zoom, dark/reduced-motion and forced-color evidence.
- Ceramics CSS falls from `4,708 B` to `4,459 B` deterministic gzip; generated
  Web component CSS falls from `67,148 B` to `66,947 B`; neutral runtime remains
  `10,501 B` with `0 B` added by Studio Tour.
- The permanent audit is
  `docs/reports/studio-tour-web-refinement-audit.md`; ADR 0142 records the
  accepted contextual-profile boundary. `site/dist` was not rebuilt and no
  stability promotion was made.

## Remaining Human Review

- Approve or revise inheritance of Process Timeline's one-row lane, marker,
  connector, `4:3` step media, focus treatment, narrow overflow and snap.
- Approve or revise tour introduction measure, alignment, typography and rhythm.
- Approve or revise supplementary-media presence, `16:9` crop, radius, caption
  treatment and relationship to the ordered steps.
- Confirm that heading remains required and that grid/list, orientation,
  density, columns, marker/connector visibility, step-media ratio, player
  controls, provider and playback state remain absent from the v1 profile API.
- Select supported media types and target ownership before any interactive
  player or dedicated Shopify media schema is certified.
