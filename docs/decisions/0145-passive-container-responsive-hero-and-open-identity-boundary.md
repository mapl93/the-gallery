# 0145. Passive Container-Responsive Hero And Open Identity Boundary

> Follow-up: ADR 0223 resolves the former G1/S1 identity question in favor of
> one canonical `hero`, deprecates the independent `hero-section` identity, and
> accepts complete parallax/slideshow behavior with bounded autoplay.

Status: Accepted

Date: 2026-07-15

## Context

S1 Hero Section entered refinement with six registered presentations, but its
neutral implementation did not keep required content, media composition or
target capabilities coherent. It rendered an empty required title, allowed an
overlay without media, kept media in the text-only presentation, cancelled
fixture navigation, used a viewport breakpoint for split layout and allocated
a permanent compositor layer for parallax without implementing scroll behavior.
The slideshow fixture contained one slide inside an overflow-hidden lane and
therefore did not demonstrate its own repeated-content contract.

ADR 0082 already established that Hero parallax and slideshow are presentation
hooks. Targets own scroll synchronization, navigation, current-slide state,
focus, announcements, timing, pause policy and media playback. Refinement must
not turn those unresolved capabilities into an inferred neutral runtime.

The repository also exposes G1 Hero Banner with nearly the same
media/overlay/content/heading/action anatomy. Shopify's target-native
`sections/hero.liquid` maps G1 `.hero`; S1 `.hero-section` has copied CSS only
and remains without Liquid, schema, data or template composition. No accepted
source defines the consumer selection boundary or authorizes consolidation.

## Decision

- S1 remains a passive page-builder composition and `pilot`.
- Contract version advances to `0.3.0`; the six registry-backed variant names
  remain unchanged for compatibility and architecture review.
- A non-empty `title` is a render precondition. Invalid required composition is
  omitted instead of emitting an empty heading or a misleading label
  relationship. Native heading rank remains host-owned.
- A required `.hero-section__inner` owns layout inside a named Hero container.
  Split versus stacked presentation responds to component inline size rather
  than browser viewport or docs-only repair CSS.
- Media remains target-owned and must be classified as informative or
  decorative. The shared atmospheric review fixture is decorative and uses an
  empty alternative.
- `overlay` remains an accepted optional slot from ADR 0082, but it is valid
  only as a visual contrast layer nested inside present media. It is omitted
  with absent media and cannot cover the split content column.
- `text-only` derives media, overlay and slides as absent even when stale target
  data supplies those slots.
- Actions compose canonical Button/Link-capable markup and use genuine
  destinations. Hero owns placement only; dependencies own activation, focus,
  disabled/loading and command-versus-navigation behavior.
- Parallax remains a class hook only. Neutral source performs no transform,
  scroll observation, listener, layout read or compositor promotion.
- Slideshow retains the accepted horizontal scroll-snap presentation hook and
  repeated slide anatomy. It is not a complete carousel. A target cannot claim
  slideshow behavior until it supplies the complete navigation, visibility,
  current-state, announcement, focus, rotation, pause and media lifecycle.
- Fullscreen is the only presentation that deliberately uses dynamic viewport
  block size; the remaining layouts use bounded private container-relative
  measures.
- Decorative media and its scrim are suppressed in forced colors so content
  remains Canvas/CanvasText. S1 adds no neutral component runtime.
- G1 Hero Banner and S1 Hero Section are neither merged nor redefined here.
  Their identity and target-adapter boundary remains an explicit architecture
  decision that blocks S1 from human stability-review readiness.
- Existing Shopify `sections/hero.liquid` remains G1 target code. It is not
  renamed, duplicated or reported as an S1 adapter.

## External Evidence

- The HTML Standard assigns heading level from the surrounding section
  hierarchy rather than a visual component name.
- WAI image guidance distinguishes informative alternatives from empty
  alternatives for decorative or text-redundant images.
- The WAI-ARIA APG Carousel Pattern requires previous/next control and, for
  automatic rotation, stop/restart plus suspension on keyboard focus and
  pointer hover.
- Open UI carousel research shows that autoplay, interval, indicators,
  previous/next, keyboard, touch, pause and wrapping vary independently across
  mature systems.
- Radix and Polaris provide low-level Section, Heading, Button, Link, Image and
  composition primitives rather than a canonical storefront Hero contract.

These sources establish semantic and behavior obligations. They do not select
The Gallery's final visual direction or resolve its duplicate Hero identity.

## Figma Evidence

The registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and
inspector `1020:480` are the generic Button/Studio shell. They contain no Hero
media, content, variant or responsive composition. The reference establishes
the shared Exhibit/Studio methodology only; the repository candidate remains a
visual proposal requiring owner review.

## Performance

S1 is passive and keeps a `0 B` component-runtime budget. It owns no listener,
observer, timer, animation loop, request, formatter, media preload policy or
bundled asset. Any future accepted parallax/slideshow behavior must release
resources, avoid continuous layout reads, honor reduced motion and fit the
per-behavior `1 KiB` gzip delta ceiling or document an exception.

Sections remains subject to its permanent `6.7 KiB` (`6,861 B`) gzip ceiling
and finishes at `6,447 B`. Required container/anatomy, complete typography and
mode handling add `472 B` to the full Neutral Web CSS, whose existing ceiling
gap therefore grows to `1,820 B` and remains explicit. Shared runtime stays
unchanged at `10,589 B`; S1 adds `0 B` component runtime.

## Target Boundary

- Neutral Web maps native contextual section/heading semantics, classified
  media, media-contained scrim, editorial content and canonical actions.
- Shopify S1 remains `css-ready`. A dedicated section, G1 migration or shared
  adapter strategy requires the Hero identity decision first.
- React and Angular remain thin semantic compositions with target-owned content
  and any accepted capability state.
- Figma maps only approved layout variants, slots and semantic token controls
  after component-specific visual review.
- SwiftUI and Compose preserve native heading, media, action, accessibility and
  motion conventions rather than copying DOM or private CSS geometry.

## Open Architecture And Human Boundary

This decision intentionally does not choose:

- consolidation of S1 Hero Section and G1 Hero Banner versus a strict
  consumer-facing selection rule for retaining both;
- whether `parallax` and `slideshow` remain public S1 capabilities, move to
  separate composed components or are removed in a future breaking revision;
- the neutral/target ownership, state API and runtime for either capability;
- arbitrary overlay content beyond the current contrast-layer boundary;
- final crop, scrim strength, minimum heights, split ratio, typography, copy
  measure, alignment or action hierarchy;
- Shopify schema, data objects, section blocks, editor behavior or template
  composition for S1; or
- promotion from `pilot` to `stable`.

## Consequences

- Exhibit and Studio share one truthful required-title renderer and initial
  fixture without docs-only Hero layout repair.
- Media, scrim and text-only combinations cannot produce the former incoherent
  output in the shared implementation.
- Split response is intrinsic to the component and preserves source order.
- Action fixtures navigate normally; decorative artwork is not redundantly
  announced.
- Parallax has zero passive runtime/compositor work, while slideshow remains
  visibly incomplete until a target provides its accepted behavior.
- The S1/G1 duplication and target ownership stay visible rather than being
  hidden by a compatibility alias or duplicate Shopify section.
