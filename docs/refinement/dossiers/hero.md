# Component Dossier: Hero

Status: `human-review-ready`

Target reviewed: Neutral Web, Shopify and future-target translation

Contract: `components/contracts/hero.contract.json` (`0.3.0`, `pilot`)

Decision: `docs/decisions/0223-unified-hero-layout-media-and-rotation-contract.md`

## Recommendation And Accepted Direction

Use G1 `hero` as the single public Hero. It now combines the useful layout
profiles from the former S1 Hero Section with G1's Shopify ownership and adds
the complete parallax and slideshow behavior selected by the owner. S1 remains
only as a deprecated pre-v1 migration record and has no independent CSS,
renderer, fixture, runtime or adapter.

The candidate is ready for human stability review, not `stable`. Human review
must still approve crop, type scale, overlay strength, content measure, action
hierarchy and the visual rhythm of each layout and control arrangement.

## Purpose And Limits

- Introduces a page, collection, campaign or editorial destination with one
  required visible heading, optional context and copy, optional classified
  media, and optional canonical actions.
- Owns `full`, `split` and `text-only` layouts independently from `default` or
  `fullscreen` height and `none`, `parallax` or `slideshow` media behavior.
- Owns slideshow selection, optional autoplay, loop policy, visible controls,
  discrete position status and visual current-slide timing feedback.
- Owns only progressive visual parallax; unsupported browsers keep static media.
- Does not own heading rank, destination analytics, CMS data, media crop/focal
  point, loading priority, video consent, captions, transcripts or commerce
  consequences. Those remain target responsibilities.
- Does not turn internal offsets, overlay alpha, copy measure, z-index or
  slideshow bookkeeping into public API.

## Research And Mature-System Comparison

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [HTML sections](https://html.spec.whatwg.org/dev/sections.html) | A section is a thematic grouping normally identified by a heading; no Hero role exists. | Require non-empty visible title and let the host choose heading rank. |
| [WAI image decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) | Decorative, informative and text-redundant images need different alternatives. | Targets classify every Hero media item; the atmospheric fixture is decorative. |
| [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | Auto-rotation needs visible stop/restart, stops on focus and hover, and exposes truthful controls and current slide. | Real buttons, real slides, opt-in autoplay, focus/hover pause and polite discrete status are canonical behavior. |
| [Open UI Carousel research](https://open-ui.org/components/carousel.research/) | Navigation, indicators, autoplay, interval, wrapping and touch scrolling are distinct semantic choices. | Expose bounded `navigation`, `autoplay`, `autoplayInterval` and `loop` properties; keep touch scroll supplementary. |
| [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Non-essential movement that starts automatically must be controllable. | Autoplay defaults off and, when enabled, always renders Pause/Play. |
| [Radix Primitives](https://www.radix-ui.com/primitives) | Radix supplies behavior/composition primitives rather than a storefront Hero. | Compose canonical Button, Icon Button and Carousel rather than importing a framework identity. |
| [Shopify section schema](https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema) and [`video_tag`](https://shopify.dev/docs/api/liquid/filters/video_tag) | Shopify owns merchant settings, blocks and target-native media options. | Map editor settings and image-slide blocks to the same neutral contract; retain target ownership of video policy. |

Open UI and mature systems do not define one universal Hero API. Their
agreement is strongest around native heading/media semantics, explicit carousel
controls and target-owned content. The Gallery's differentiator remains the
editorial, container-responsive composition.

## Owner Reference Analysis

The registered Figma reference is the generic Studio shell, not Hero-specific
art direction. Repository visuals are therefore a review candidate, not a
claim of pixel parity with owner-supplied Hero artwork. The final visual choices
listed above remain deliberately open for human review.

## Anatomy And Composition

| Part | Required | Semantic owner | Notes |
| --- | --- | --- | --- |
| Root / inner | yes | Hero + host | Labelled contextual section and named container; omit when title is empty. |
| Media | no | target | One classified media item or slideshow track; absent in text-only. |
| Track / slides | slideshow | Carousel + target records | Focusable native scroll-snap viewport and real ordered groups; never cloned. |
| Overlay | no | Hero presentation | Visual-only scrim nested inside present media. |
| Content / title | yes | Hero + host | Stable source order; host selects native heading level. |
| Label / description | no | target content | Omit cleanly when empty. |
| Actions | no | canonical Button | Hero owns placement, not activation or destination. |
| Previous / next | conditional | canonical Icon Button | Shown for `both` or `arrows`; disabled at finite endpoints. |
| Indicators | conditional | Carousel dots | Direct native-button selection; one indicator mirrors current slide. |
| Rotation control | autoplay | canonical Icon Button | Visible Pause/Play with localized labels. |
| Progress | autoplay | Hero visual | One aria-hidden bar synchronized with the active slide. |
| Status | slideshow | Hero accessibility | Polite localized status updated only on discrete slide changes. |

## State, Variant, Size And Mode Matrix

| Axis | Values / behavior |
| --- | --- |
| Layout | `full` default; `split` columns that stack from container width; `text-only` derives media and motion absent. |
| Height | `default` intrinsic; `fullscreen` uses `100vh` fallback and `100dvh`. |
| Media behavior | `none`, progressive CSS `parallax`, or JS-enhanced `slideshow`. |
| Navigation | `both` default, `arrows`, or `indicators`; touch scrolling remains available. |
| Loop | `true` default wraps logical indices; `false` disables endpoint controls and stops autoplay at the final slide. |
| Autoplay | `false` default; `playing` or `paused` only when explicitly enabled. |
| Pause reasons | User, pointer hover, focus-within, hidden document and reduced motion. Manual selection never restarts implicitly. |
| Timing | 6000ms default, bounded 3000–12000ms; bar advances, freezes and resets with the same lifecycle. |
| Special modes | Reduced motion removes autoplay, progress, smooth scrolling and parallax; forced colors removes decorative media/scrim and preserves controls. |
| Responsive evidence | Mobile 390x844, Tablet 768x1024, Desktop 1280x800, XL 1600x1000 and narrow embedded containers. |

Invalid combinations derive coherently: text-only removes media/overlay/slides;
no media removes overlay; autoplay without a valid slideshow has no runtime;
empty required title omits the composition.

## Public API And State Ownership

The 19 semantic properties are:

- presentation: `layout`, `height`, `mediaBehavior`;
- content/composition: `label`, required `title`, `description`, `media`,
  `overlay`, `actions`, `slides`;
- slideshow: `autoplay` (`false`), `loop` (`true`), `navigation` (`both`) and
  `autoplayInterval` (`6000`, bounded 3000–12000);
- localization: `previousLabel`, `nextLabel`, `pauseLabel`, `playLabel` and
  `statusTemplate` with `{current}` and `{total}`.

Static neutral Web progressively owns current-slide and autoplay state after
initialization and emits `herochange` and `heroplaybackchange`. A stateful React,
Angular or native adapter may control the same semantic values and events, but
must keep the real controls, track and slides. Private timers, pause reasons,
scroll-settling flags and progress animation state are not public properties.

## Token And Value Audit

- Public tokens cover semantic surfaces, primary/inverse text, focus border,
  overlay opacity, heading/body/caption typography and layout spacing.
- Component-private `--_hero-*` values own content measures, intrinsic heights,
  media height, control inset and active interval.
- The former hardcoded scrim color is replaced by semantic overlay opacity.
- Container units and dynamic viewport units are compositional CSS values, not
  consumer properties.
- The narrow-container title scale and mobile control band remain private
  responsive composition and prevent action/control overlap.

## Accessibility And Content Resilience

- Native buttons retain keyboard and focus behavior; the Hero root does not
  intercept arrow keys.
- Each real slide is a named group; one slide and its matching indicator expose
  current state. Position changes update one polite status.
- Hover and focus-within pause autoplay. Hidden documents schedule no rotation;
  visibility restoration recomputes from current state.
- Reduced motion suppresses automatic rotation, progress and parallax. The
  continuously changing bar is `aria-hidden`.
- Each authored slide still needs target-level contrast verification.
- Final evidence covers normal copy, long localized Spanish, text-only,
  parallax, optional parts, narrow containers and all four required viewports.

## Runtime, Assets And Targets

- `theme.js` uses one bounded progressive enhancer, real-slide index changes,
  native scroll events and one active timeout only while autoplay can advance.
- No slide clones, network requests, media preloads or per-instance observers
  are created by Hero.
- Neutral Web is implemented through canonical CSS plus shared `theme.js`.
- Shopify is implemented as one target-native section with editor settings,
  image-slide blocks, localized labels and the shared runtime.
- React/Angular should be thin state adapters over the same DOM/behavior
  contract. Figma maps semantic properties but owns no runtime. SwiftUI/Compose
  need native paging and accessibility equivalents.

## Risks And Human Review Questions

- Marketing CSS now exceeds its fixed family budget by 1137 B; ADR 0223 is the
  explicit gap evidence and the ceiling was not raised.
- Real merchant slides can invalidate contrast or crop even when the component
  mechanics pass.
- Scroll-driven parallax support varies; the static fallback is intentional.
- Human review must approve full/split/text-only composition, fullscreen use,
  mobile control density, timing-bar prominence and action hierarchy.
- No component is promoted to `stable` by this dossier.

## Evidence

- Final 16-view matrix and special modes:
  `output/playwright/refinement-marketing/hero-0223/`.
- Earlier parity captures remain baseline evidence under
  `output/playwright/parity/marketing/` and `output/playwright/parity/sections/`.
- Detailed implementation and validation results:
  `docs/reports/hero-web-refinement-audit.md`.
