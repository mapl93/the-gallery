# Component Dossier: Video Section

Status: `human-review-ready`

Target reviewed: Neutral Web with documented Shopify boundary

Contract: `components/contracts/video-section.contract.json`

## Recommendation

Keep Video Section as a passive, framework-independent media figure: one
required target-owned media composition, one optional visible caption, and the
existing `contained` or `fullwidth` presentation. Remove the neutral
`playAction` and `playLabel` API, the inert play button in Exhibit/Studio, and
the source CSS that styles a control without implementing a result.

The target may place a native `<video controls>`, an accessible third-party
player, a consent-aware external embed, or a passive poster inside the media
slot. Whichever target chooses an interactive profile owns the complete media
lifecycle: sources, loading, poster, controls, playback state, captions,
descriptions, transcript, errors, privacy/consent, autoplay policy, focus,
events and analytics. A custom play surface is valid only when it invokes that
real media implementation.

Use native `figure`/`figcaption` in the canonical fixture and omit the root when
the required media slot is absent. Preserve the private `16 / 9` crop and
contained/full-width radius as review candidates, not public player API. Keep
the shared neutral component at `0 B` runtime.

Do not create a dedicated Shopify video section in this batch. Shopify provides
a hosted-video setting and `video_tag`, so a target-native profile is feasible,
but the repository has not accepted whether v1 supports hosted video, external
providers, decorative muted motion, meaningful narrated media, captions,
transcripts, consent or combinations of those modes. Copied CSS and the
documented mapping remain truthful; Liquid/schema implementation stays blocked
on that explicit product/architecture decision.

## Purpose And Limits

- Frames one self-contained piece of target-owned media and optional contextual
  caption inside an editorial section composition.
- `contained` supplies page rhythm and rounded media; `fullwidth` supplies an
  edge-to-edge media surface.
- Video Section owns only root/media/caption composition, intrinsic containment,
  the private candidate aspect ratio, caption presentation and variant styling.
- The target owns media type, source records, poster, responsive resources,
  loading/preload, player, controls, tracks, playback state, transcript,
  description, provider, consent, errors, localization and analytics.
- It is not a player, Video Thumbnail, Lightbox, Modal, consent manager, CDN
  adapter, media record, autoplay controller, playlist, livestream or analytics
  surface.
- It owns no current time, duration, buffered range, volume, mute, fullscreen,
  picture-in-picture, captions menu, selected track, loading/error state,
  controlled/uncontrolled store or media event API.

## Current Video Section Baseline

- Registry identity `S7`, category `sections`, selector `.video-section`, no
  dependencies, dependency depth `0`, and review order `167`.
- Registry describes a “video player section with poster, play button, and
  caption,” although ADR 0082 explicitly leaves playback, loading, controls,
  captions, transcripts, errors, autoplay and external-player APIs open.
- Contract `0.2.0`, `pilot`: five anatomy parts, two variants, one generic size,
  three states, one behavior, five properties, nine public tokens, Web
  implemented and Shopify planned.
- Exhibit and Studio share `SectionsStudio`, one fixture and one render branch.
  Their DOM is exactly `803` characters with FNV-1a `7835173b` at all four
  paired viewports.
- Every shared fixture emits a native `figure`, image poster, visible caption
  and one focusable play button. The button has the accessible name “Play the
  studio film” but no handler, target relationship, state or result.
- Focus and click leave the button focused with unchanged class and no
  `aria-pressed`; no media is loaded, shown or controlled. This is a false
  functional promise despite structural interaction reports marking it pass.
- Mobile Exhibit/Studio roots are both `358x283.63px` with a
  `322.22x181.23px` wrapper. Tablet is `736x514.02px` with
  `662.41x372.59px` media.
- Desktop host widths diverge by available container: Exhibit is
  `420x315.02px` with `378x212.63px` media and Studio is `532x382.19px` with
  `478.81x269.33px` media. XL is `584x415.8px` versus `752x524.34px`.
  The private `16 / 9` ratio remains coherent; there is no component-responsive
  mode to justify a public breakpoint API.
- Canonical CSS hardcodes `64px`, `24px`, `16px`, physical dimensions/insets,
  white rgba, and a scale transition. Caption typography lacks family, weight
  and line-height. Root figure margin is reset only by site-owned Studio CSS.
- Site CSS owns the missing control border/color reset and poster minimum size,
  so the target-agnostic source is not visually self-sufficient.
- MDX repeats the inert button and simultaneously warns consumers not to treat
  it as evidence of playback. Its own recommended markup therefore contradicts
  its guidance.
- The Studio definition exposes `playAction` and `playLabel` as configurable
  semantics even though no supported configuration can produce a functioning
  neutral action.
- All 183 Studio definitions reference the same generic Figma file/frame/
  inspector nodes (`k3axoTaF87g17fBRgJ0PMY`, `943:7`, `1020:480`). They do not
  approve S7 controls, media profile, aspect ratio, radius, caption, density or
  visual identity.
- Shopify has copied Sections CSS but no dedicated Liquid, schema, media data
  mapping, controls, captions or transcript policy. Its adapter remains
  `css-ready`, not a target-native player implementation.
- Eight paired baseline captures plus focus evidence live under
  `output/playwright/refinement-batch-66/before/`.
- Deterministic gzip baseline is Sections `6,814 B`, Neutral Web component CSS
  `66,941 B`, and shared runtime `10,492 B`. Sections has a `6,861 B` ceiling;
  S7 must add `0 B` runtime and should simplify CSS.

## External Evidence

| Source | Relevant evidence | Video Section implication |
| --- | --- | --- |
| [HTML media elements](https://html.spec.whatwg.org/multipage/media.html) | Native video owns sources, poster, preload, controls, autoplay, tracks, playback promises and media events. Authors are encouraged to avoid automatic playback and let user agents honor preferences. | A real player is a lifecycle, not an overlaid decorative button. Keep media implementation target-owned and prefer native controls when the selected profile allows them. |
| [WAI media players](https://www.w3.org/WAI/media/av/player/) | Accessible players need keyboard operation, visible focus, labels, control contrast and additional media accessibility support; WAI recommends using an established accessible player over inventing one casually. | Do not certify a visual control independently of the player it controls. Target evidence must cover the complete player. |
| [WAI audio/video accessibility](https://www.w3.org/WAI/media/av/) | Meaningful media may require captions, descriptions, transcripts and an accessible player depending on its content. | A visible figure caption is editorial context, not a substitute for synchronized captions, description or transcript. |
| [Open UI Invoker Commands future explainer](https://open-ui.org/components/future-invokers.explainer/) | Proposed `play`, `pause`, `play-pause` and mute commands explicitly invoke a concrete media element and remain subject to autoplay policy. | External play UI needs an actual invokee and behavioral contract; a no-op button is invalid. The proposal is not an interoperable v1 player primitive. |
| [Radix Aspect Ratio](https://www.radix-ui.com/primitives/docs/components/aspect-ratio) | Aspect Ratio constrains arbitrary supplied content but does not provide playback, media records or accessibility tracks. | Treat `16 / 9` as private layout composition, not evidence of a player API or React dependency. |
| [Polaris media components](https://polaris-react.shopify.com/components/images-and-icons) | Polaris Video Thumbnail is explicitly clickable and opens a real video player in a modal or full screen. | A play thumbnail must have an implemented destination/result; the neutral fixture cannot copy only its appearance. |
| [Shopify video settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#video) | Shopify can supply a hosted-video object through a target-native editor setting; external providers use a different `video_url` setting. | Hosted and external modes are materially different target profiles and should not be conflated without an accepted product decision. |
| [Shopify `video_tag`](https://shopify.dev/docs/api/liquid/filters/video_tag) | Shopify can render hosted sources, poster, preload metadata and target attributes from a video object. | A future Shopify adapter can own a complete hosted-video projection, but captions/transcript/content policy still require an explicit target decision and evidence. |

There is no WAI-ARIA APG Video Section pattern. Native media semantics and the
selected player's own keyboard model apply. Open UI lists prior video naming
and future invoker research, but it does not define an interoperable player
component that The Gallery can adopt as neutral behavior.

## Mature-System And Owner-Reference Comparison

- HTML and WAI establish the reliable core: use a real media element/player,
  expose complete controls and media alternatives, and respect user policy.
- Open UI reinforces that an external media command needs a concrete media
  target. Its explainer does not authorize a standalone play-intent slot.
- Radix provides only a layout primitive. It is useful evidence for keeping
  ratio separate from playback, not for adding React-specific APIs.
- Polaris Video Thumbnail owns real activation into a player. The Gallery's
  baseline copied the recognizable circle but omitted the result.
- Shopify can own hosted or external media records in a dedicated adapter. The
  target still needs an accepted supported-mode and accessibility policy.
- The registered Figma nodes are generic Studio shell references. No S7-
  specific owner reference selects final ratio, crop, radius, caption treatment,
  player chrome or edge-to-edge behavior.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | native `figure` | Video Section | Groups one self-contained target media composition and optional visible caption. |
| Wrapper | yes | generic grouping | Video Section | Owns private ratio, containment, radius and fallback surface. |
| Media | yes | target-native media subtree | Target | Passive poster, native video, iframe or complete player; receives `.video-section__media` for containment. |
| Caption | no | native `figcaption` | Target / Video Section | Editorial context; never substitutes for synchronized captions or transcript. |

The removed play surface is not retained as a compatibility alias. A target
player may render its own complete native/custom controls inside `media`; those
controls belong to that target/player contract.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | `contained` default; `fullwidth` maps to `.video-section--fullwidth`. |
| Size | One intrinsic size; private `16 / 9` wrapper candidate. |
| Complete | Required non-empty target media plus optional caption. |
| Missing media | Invalid composition; omit root. |
| Passive poster | Zero focus stops, cursor, hover behavior, event or playback claim. |
| Native video/player | Entire target subtree owns controls, states, keyboard, names, tracks, errors and events. |
| Caption absent | Omit `figcaption`; media accessibility obligations remain unchanged. |
| Theme | Semantic fallback surface and caption text tokens. |
| Forced colors | Passive wrapper/caption remain visible; target player proves its own control affordances. |
| Reduced motion | S7 authors no motion; target playback/autoplay honors its own policy and user preference. |
| RTL | Logical section/caption geometry; media timeline direction remains player-owned. |
| Responsive | Intrinsic inline containment and fixed private ratio; no viewport/Studio breakpoint or runtime measurement. |

## Public API And State Ownership

- `variant` — optional `contained | fullwidth`, default `contained`.
- `media` — required target-owned composition placed inside the wrapper.
- `caption` — optional visible contextual string rendered as `figcaption`.
- Remove `playAction` and `playLabel`. Neither can be validated independently
  of the media target and event/result it controls.
- Do not expose source URL, provider, poster, aspect ratio, object fit, radius,
  preload, autoplay, loop, muted, controls, tracks, transcript, consent,
  loading, error, current time, duration, volume, fullscreen, heading level,
  editor object or analytics through the neutral section API.
- S7 has no controlled/uncontrolled strategy. State belongs to the selected
  target player. A future shared player would require its own contract and ADR.

## Token And Value Audit

- Keep existing public section/container, grid-gap and element-gap spacing,
  media radius, fallback surface and secondary text color.
- Complete caption typography with the existing caption family, weight, size
  and line-height tokens; use the existing element gap for logical separation.
- Remove focus, full-radius, transition and easing token dependencies with the
  obsolete play control.
- Convert physical padding, width/height and margin to logical properties.
- Private visual candidates: `16 / 9` aspect ratio and structural zeros. Do not
  expose them before human visual approval or invent a media-ratio token.
- Contained/fullwidth radius is already an accepted registry presentation.
  Final radius, caption alignment and crop remain owner-review decisions.

## Visual And Content Audit

- The current media ratio behaves coherently at all paired widths, but no owner
  reference approves it as final identity. Keep it private and reviewable.
- The centered caption is readable but incomplete typographically; long and
  localized content needs wrapping evidence at narrow effective widths.
- Test short, long, empty and unbroken captions; informative/decorative poster;
  very wide/tall media; passive image; native target video/player fixture;
  absent media; contained/fullwidth; light/dark; RTL; forced colors and
  effective 200% layout.
- A passive poster must never carry a play cursor/icon. An interactive target
  player must expose a real result and prove its controls separately.

## Accessibility And Interaction

- Use native `figure`/`figcaption` for the self-contained composition.
- Informative posters/images need contextual alternatives; decorative or
  redundant images use empty alternatives. The target decides based on content.
- Figure caption is visible context only. Meaningful audio/video still needs the
  applicable synchronized captions, descriptions, transcript and accessible
  player support.
- Passive fixture has zero focus stops and no action semantics. Do not add a
  button, role, tabindex, `aria-label`, pressed state or live region without a
  real behavior contract.
- A target-native player owns Tab order, Space/Enter/Arrow behavior, visible
  focus, control names, status/error communication and autoplay restrictions.
- No APG composite pattern, roving tabindex, focus trap, restoration, live
  announcement, timer, observer or key handler belongs to passive S7.

## Responsive And Performance

- Rely on shared inline-size containment; the wrapper fills available space and
  keeps the private aspect ratio. S7 has no responsive mode or breakpoint.
- Test paired Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL
  `1536x960`, plus direct `200/260/520/900/1120px` roots and both variants.
- Neutral runtime budget is exactly `0 B`: no listener, observer, request,
  timer, promise, media API call, layout read, custom element or bundled asset.
- Target media loading and player bundles need their own budgets. A future
  Shopify adapter should default to platform-hosted output where accepted and
  report media/network costs separately from the CSS shell.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native figure/wrapper, required target media slot, optional figcaption and presentation class. | Implemented, generated, validated and browser-evidenced; target player remains external. |
| Shopify | Potential `video` setting + `video_tag` hosted profile, or separate `video_url` provider profile. | CSS copied; dedicated section intentionally blocked on supported mode, accessibility and consent decisions. |
| Webflow | Canonical target-agnostic CSS plus target-authored semantic media/player subtree. | Copied output; target player policy remains external. |
| React / Angular | Thin figure wrapper accepting required media children and optional caption; player state stays in child. | Planned composition; no local section store. |
| Figma | Contained/fullwidth media shell and caption specimens; player chrome belongs to a selected target profile. | Generic shell traceability only; no S7-specific approval. |
| SwiftUI / Compose | Native media view/player embedded in figure-like editorial composition. | Conceptual; target owns lifecycle and accessibility. |

## Exhibit And Studio Parity

- Exhibit and Studio share `SectionsStudio`, one fixture, contract, Studio
  definition, required-media rule, native DOM and canonical CSS.
- The branch enforces required media and emits the same passive native figure,
  wrapper, media class and optional caption in both modes.
- The unused Play icon import, action fixture values and site-only Video Section
  margin, poster and control patches are removed; canonical CSS is
  self-sufficient.
- Studio retains semantic `variant`, `media` and `caption` controls. It no longer
  advertises an action configuration that cannot work.
- MDX mirrors the same passive composition and documents how a complete target
  player replaces the fixture media without expanding the section API.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Play button is focusable but has no handler/result. | high | Remove from neutral fixture and API; real controls belong inside target media. | accepted precedent / implementation |
| Contract exposes action/label independently of a player. | high | Remove both properties; do not preserve aliases. | architecture boundary / ADR |
| MDX warns against trusting the same dead control it renders. | high | Use passive figure example and truthful target-player guidance. | implementation |
| Missing required media leaves a figure/caption shell. | high | Omit invalid composition. | contract implementation |
| Desktop container spacing collapses media at direct `200–260px`. | high | Bound section padding with the existing grid-gap token; retain equal client/scroll widths. | implementation |
| Physical hardcodes and incomplete caption type. | medium | Logical properties, existing semantic tokens, private ratio. | implementation / human visual review |
| Site CSS repairs canonical control/media styling. | high | Remove obsolete target patches after canonical source is complete. | implementation |
| Hosted vs external vs decorative media is unresolved. | architecture | Document target choices; do not create Shopify schema by assumption. | owner / target |
| Captions/transcript/content policy is unresolved. | accessibility/product | Require selected target profile to own complete alternatives. | owner / target |
| Figma reference is generic. | human review | Browser candidate first; component-specific Figma after approval. | owner |

## Evidence And Validation Plan

Baseline evidence under `output/playwright/refinement-batch-66/before/` covers:

- exact Exhibit/Studio DOM equality (`803`, `7835173b`);
- one no-op focus stop, contextual name and unchanged click state;
- Mobile/Tablet/Desktop/XL media/root geometry;
- source hardcodes, site patches, Shopify missing layers and generic Figma refs;
- Sections/Web/runtime gzip `6,814/66,941/10,492 B`.

Final evidence under `output/playwright/refinement-batch-66/after/` contains 21
captures: eight paired viewports plus direct roots, fullwidth, empty/long
caption, target-native video controls, themes, forced colors/reduced motion and
RTL/unbroken content.

- Exhibit and Studio use the exact same `368`-character subtree and FNV-1a
  `0a0adb12` at all paired viewports. Every root is a native `figure` containing
  one wrapper, informative image and native `figcaption`, with zero buttons and
  zero passive focus stops.
- Mobile roots are `358x287.38px` with `326x183.38px` media; Tablet is
  `736x532.19px` with `691.84x389.16px`. Desktop is
  `420x330.25px` Exhibit and `532x403.72px` Studio; XL is
  `584x438.53px` and `752x550.88px`. Every root has equal client/scroll width.
- Direct `200/260/520/900/1120px` roots remain exact-width, use bounded `32px`
  padding under desktop tokens and preserve `136/196/456/836/1056px` useful
  media widths. The initial zero-width media failure found during evidence was
  corrected before final capture.
- `fullwidth` resolves zero padding and zero radius at `736px`. Empty caption
  leaves one valid root and zero captions; required Media is disabled in Studio.
  A long localized caption wraps to `64px` at Mobile with no overflow.
- A synthetic target-owned `<video controls>` fills `472x265.5px` inside a
  `520px` instance and is the sole player focus surface. It validates slot/CSS
  composition only; player behavior and content alternatives remain target
  obligations.
- Unbroken Arabic at `200px` resolves `overflow-wrap:anywhere`, `152px` caption
  width, equal client/scroll width and logical RTL flow.
- Caption contrast is `7.81:1` light and `12.09:1` dark. Forced colors resolves
  Canvas/CanvasText; S7 owns no transition or animation beyond the global
  `0.00001s` safety clamp.
- A fresh isolated browser reports zero errors and zero warnings. Canonical,
  Webflow and Shopify Sections CSS are SHA-256-identical
  (`dcb948a4151d2a108ae047af1513f6c4aa6253e7c1e87debc9857c0ba24972d6`).
- Final deterministic gzip is Sections `6,758 B`, generated Web component CSS
  `66,920 B`, and shared runtime `10,501 B`. Against the prior batch report this
  is `-56 B`, `-21 B`, and `+9 B`; S7 itself adds no JavaScript behavior.
- Shopify remains truthfully `css-ready`, `ready: false`, with Liquid/data and
  player behavior missing by decision. Official Shopify validation passes
  revision 1 for artifact `video-section-s7-batch66` on the copied Sections
  asset.

## Risks And Open Questions

- Human review must approve the private `16 / 9` ratio, crop, contained radius,
  full-width edge behavior, caption typography/alignment/rhythm and final visual
  identity.
- Owner/architecture input must select supported Shopify modes: hosted video,
  YouTube/Vimeo, decorative muted autoplay, meaningful narrated media, or a
  combination with explicit precedence and fallback.
- The selected target profile must define captions, descriptions, transcript,
  consent/privacy, loading/preload, autoplay, errors and analytics. A visible
  `figcaption` cannot satisfy those media requirements by itself.
- If a shared cross-target Player is desired, it needs a separate canonical
  contract, dependency and ADR; it must not be smuggled into S7 as styling.
- Component remains `pilot`; automated evidence may reach
  `human-review-ready`, never `stable`, without explicit owner approval.

## Readiness Decision

`ready for human review`: the neutral media-shell boundary, strict omission,
passive semantics, responsive containment, public API, zero-runtime behavior,
Exhibit/Studio parity, cross-target mapping, browser evidence, performance and
documentation are reconciled. Human review must approve the visual candidate
and choose the Shopify/player product profile before cross-target stability.
Contract remains `pilot`; no `stable` promotion was made.
