# 0082. Sections Semantic Source And Runtime Boundaries

Status: Accepted

Date: 2026-07-12

## Context

The nineteen Section contracts were created mechanically in ADR 0027. They
matched registry identity and broad CSS selectors, but they did not expose
reviewed semantic properties and frequently described presentation selectors as
component states. Reversed layouts, masonry, full-width media, feature spans,
before and after labels, and marquee presentation were all represented as states
even when they were options or anatomy.

Canonical Section CSS also lacked consistent border-box sizing, width and media
containment, container-aware child layouts, visible focus, touch targets,
non-hover disclosure, and reduced-motion handling. Some cursor and hover rules
implied activation or dragging even though no neutral behavior decision exists.

The family includes several product boundaries that cannot be resolved from CSS,
registry descriptions, or documentation fixtures. This decision improves the
non-blocked semantic source while keeping those boundaries open.

## Decision

### The Section family remains a pilot

Hero Section, Featured Collection, Image with Text, Multicolumn, Gallery Grid,
Lookbook, Video Section, Brand Story, FAQ Section, Contact Form, Stats Counter,
Logo Bar, Comparison Table, Shipping Info, Rich Text Section, Instagram Feed,
Before / After, Marquee, and Collage Section advance to contract version `0.2.0`
and remain `pilot`.

The contracts expose only semantic content, slots, registry-backed variants,
native attributes, and neutral-web mappings established by current source facts.
No automated result promotes these components to `stable`.

### Parent sections expose composition slots

- Hero Section exposes target-owned media, overlay, action, and slide slots.
  Parallax and slideshow remain presentation hooks rather than complete runtime
  behavior.
- Featured Collection exposes ordered Product Card compositions. Targets own
  product sourcing, ordering, limits, freshness, and collection destinations.
- Image with Text exposes target-owned media and body content plus a
  Button-composed action.
- Multicolumn, Gallery Grid, Lookbook, Stats Counter, Shipping Info, Instagram
  Feed, Marquee, and Collage Section expose ordered repeated content as slots
  rather than inventing structured item schemas in the current property model.
- Video Section exposes target-owned media and an optional native play-intent
  action without claiming playback ownership.
- Brand Story and Rich Text Section expose semantic narrative slots.
- FAQ Section composes Accordion and does not duplicate expansion, keyboard, or
  panel behavior.
- Contact Form composes native form content from Input, Textarea, and Button and
  does not recreate their semantic properties or states.
- Comparison Table exposes a target-owned native table composition rather than
  flattening rows and columns into parent properties.
- Before / After originally exposed two media slots, visible labels, and an
  optional target-owned control slot without defining a slider value model.
  ADR 0233 supersedes that boundary with required matched media, a required
  localized label, and canonical Slider composition.

Repeated children retain dependency ownership. Parent sections control layout and
placement only; Product Card, Button, Accordion, Input, Textarea, and any future
composed dependency continue to own their content, validation, focus, disabled,
busy, and activation behavior.

### Contact fields preserve field conventions

Contact Form does not add field selectors or validation states. Composed Input
and Textarea instances preserve their established label, message, native value,
disabled, hover, focus-visible, and Default, Error, Success, and Warning
obligations. Error alone maps to `aria-invalid="true"`; every message remains
programmatically associated and every validation family covers equivalent
anatomy.

Select is not in Contact Form's current registry dependency list, and registry is
outside this decision's ownership. If a target places Select in the form slot, it
must preserve the Select contract rather than borrowing or duplicating Input
behavior. Adding Select as a formal dependency requires a separate registry-owned
reconciliation.

### Mechanical anatomy, options, and states are corrected

- Registry variants map to their existing modifier classes. Default presentations
  that require no modifier keep a null class mapping.
- Variant selectors are removed from `states`.
- Lookbook wide and tall cells plus Collage feature items are item-level layout
  anatomy, not states.
- Before and after labels are anatomy, not mutually exclusive states.
- Stats `data-animate` remains a presentation hook, not a public animated state.
- Real states record resting, hover, focus-within, focus-visible, and pause
  presentation only where canonical CSS implements them.

### Neutral-web CSS receives bounded hardening

Canonical Section CSS now uses existing public tokens only and adds:

- Scoped border-box sizing and inline-size containment.
- Minimum-width and long-text containment for grid and flexible children.
- Bounded media and responsive child grids with viewport and container-query
  coverage.
- Visible focus for section-owned links, optional controls, rich-text links, and
  target-owned interactive descendants.
- Existing touch-target sizing for the featured link and Lookbook hotspots.
  ADR 0233 later gives Before / After one canonical native Slider thumb rather
  than an opaque optional control surface.
- Focus-within and non-hover caption or metadata disclosure for Gallery Grid,
  Lookbook, Instagram Feed, and Collage Section.
- Reduced-motion fallbacks for parallax hints, image scaling, captions, hotspots,
  logo motion, metric transitions, social overlays, collage transitions, and
  marquee motion.
- Static wrapping fallbacks for animated Logo Bar and Marquee tracks.

Pointer cursors are removed from passive Gallery Grid items and Lookbook
hotspots. This ADR originally kept the Before / After divider passive; ADR 0233
supersedes that provisional boundary by composing the canonical native Slider
while keeping the divider decorative.

## Open Product Boundaries

The following questions are intentionally unresolved and block affected
components from `stable`.

### Media playback, parallax, and slideshow navigation

- Which layer owns Video Section media loading, playback state, controls,
  autoplay policy, captions, transcripts, errors, and external-player APIs?
- Does Hero parallax use a shared neutral enhancement or target-specific scroll
  behavior?
- Which layer owns Hero slideshow navigation, current-slide state, focus order,
  announcements, timing, pause controls, and media playback within slides?

### Before / After interaction

ADR 0233 resolves this boundary. S17 is one horizontal interactive comparison;
one canonical native `input[type="range"]` owns value, focus, pointer, touch,
keyboard, form and reset behavior on a fixed `0..100`, step `1` scale. The
canonical Slider enhancement synchronizes one private progress variable used by
the logical clip and decorative divider. No second drag engine exists.

### Marquee content and motion

ADRs 0231 and 0232 resolve this boundary with one progressively enhanced
canonical Marquee, one authored semantic list, one inert visual copy, a
canonical Pause/Resume Button, logical direction, semantic
distance-normalized pace, and static reduced-motion/no-enhancement fallback.
Logo Bar defaults to a static native mark list and composes that lifecycle only
when its consumer explicitly selects `marquee`; it has no second motion owner.
Critical information must remain available outside continuously moving content.
Exact Marquee velocities and Logo Bar artwork remain human-review questions,
not architecture gaps.

### Social feeds and data fetching

- Which target owns Instagram provider authorization, fetching, caching,
  consent, rate limits, freshness, failures, empty states, and stale content?
- Are social metrics part of the semantic component or optional target-formatted
  metadata?
- Are feed items passive media, profile or post links, another action, or a
  target-specific mix?

### Navigation and activation

- Are Gallery Grid, Lookbook, Instagram Feed, and Collage items passive, native
  links, Lightbox triggers, commerce disclosures, or target-specific mixtures?
- Which layer owns hotspot destinations, popovers, selection, focus movement, and
  result synchronization?
- Which optional section actions are always navigation and which may become
  commands in a target adapter?

### Repeated commerce items and live values

- Which target owns Featured Collection product queries, sorting, limits,
  availability, pricing freshness, loading, empty, and error states?
- Does spotlight always emphasize the first supplied record, or should emphasis
  become item metadata in a future structured property model?
- Which layer owns Stats count-up calculation, observation timing, number
  formatting, live updates, and announcements?

## Consequences

- Section adapters can consume explicit semantic content and composition regions
  without inventing target data objects or runtime behavior.
- Parent contracts preserve dependency ownership and avoid duplicating field,
  action, accordion, and commerce-item APIs.
- Responsive, focus, touch, and reduced-motion behavior is materially stronger
  while remaining target-agnostic and token-backed.
- Human browser review and resolution of the listed product boundaries remain
  required before any affected Section contract can become `stable`.
- No registry, Open Questions, MDX, Studio, JavaScript, generated adapter,
  Shopify, or `site/dist` file is changed by this decision.
