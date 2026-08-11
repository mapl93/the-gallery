# 0151. Passive Video Figure And Target-Owned Player

Status: Accepted

Date: 2026-07-15

## Context

S7 Video Section is a contained or full-width media composition. ADR 0082
accepts target-owned media and previously exposed an optional native
play-intent action while leaving loading, playback, controls, captions,
transcripts, errors, autoplay and external-player APIs unresolved.

The shared Exhibit/Studio fixture nevertheless rendered a focusable play button
over a poster without a handler, controlled element, state or result. Click did
nothing. Canonical MDX displayed the same control while warning consumers not
to interpret it as playback evidence. Studio exposed the no-op action and label
as semantic configuration, and site CSS repaired missing control styles outside
the target-agnostic source.

ADR 0142 already resolved the same conflict for Studio Tour: target-owned media
does not authorize a dead player control. HTML media, WAI guidance, Open UI
invoker research, Polaris Video Thumbnail behavior and Shopify media APIs
support a truthful target boundary without selecting a universal player.

## Decision

- Video Section remains a `pilot` passive media-figure composition.
- Contract version advances to `0.3.0`.
- The public neutral API is `variant`, required `media`, and optional `caption`.
- The root is a native `figure`; a supplied caption is native `figcaption`.
  Missing required media omits the root and an empty caption omits only
  `figcaption`.
- `contained` and `fullwidth` remain the two registry-backed presentations.
  The initial `16 / 9` wrapper ratio, crop, radius, caption alignment and rhythm
  are private visual candidates rather than public configuration.
- The neutral `playAction` and `playLabel` properties, play anatomy, state,
  styling, icon, fixture markup and Studio controls are removed without
  compatibility aliases.
- A target may supply a passive poster, native `<video controls>`, consent-aware
  embed or complete accessible player inside `media`. That target/player owns
  media records, sources, poster, loading/preload, controls, playback state,
  tracks, synchronized captions, descriptions, transcript, errors,
  privacy/consent, autoplay policy, focus, events and analytics.
- A custom play surface is permitted only inside a complete target player that
  connects it to a real result and satisfies the owning player contract. S7
  itself does not own external control state or media commands.
- Visible `figcaption` is editorial context and is never described as a
  substitute for synchronized captions, description or transcript.
- Canonical CSS becomes self-sufficient, uses logical properties and existing
  semantic tokens, bounds section padding with the existing grid-gap role for
  narrow embedding, and authors no interaction or motion. Site-owned S7 repair
  rules are removed.
- Exhibit and Studio use the same renderer, fixture, strict omission rule,
  native DOM and canonical CSS. Their passive fixture has zero focus stops.
- Shopify retains copied CSS and `planned` adapter status. A dedicated section
  is not created until an explicit target decision selects hosted video,
  external providers, decorative muted motion, meaningful narrated media or a
  supported combination plus captions/transcript, consent, autoplay, error and
  fallback policy.
- Neutral S7 adds no state, listener, observer, request, timer, promise, media
  API call, layout measurement, custom element, player bundle or asset.
- Automated evidence may prepare S7 for human review but cannot approve its
  visual candidate or promote it to `stable`.

## External Evidence

- The HTML Standard defines native media sources, poster, preload, controls,
  autoplay, timed tracks, playback promises, events and user-agent policy as a
  coordinated media lifecycle.
- WAI media guidance requires keyboard-accessible, visibly focused, labelled,
  sufficiently contrasted players and applicable captions, descriptions and
  transcripts; it recommends established accessible players over casually
  recreating one.
- Open UI's future media invoker commands target a concrete video/audio element
  and remain subject to autoplay policy. They do not define an interoperable
  standalone player or authorize an unbound play button.
- Radix Aspect Ratio constrains arbitrary content but does not own media
  semantics or playback.
- Polaris Video Thumbnail is explicitly interactive and opens a real modal or
  full-screen player.
- Shopify provides distinct hosted `video` and external `video_url` settings,
  and `video_tag` can render hosted sources/poster/preload attributes. Those
  APIs demonstrate viable target profiles but do not select one for The
  Gallery or supply its content-accessibility policy.

These sources establish semantic and functional obligations. They do not
select The Gallery's final visual identity, player, provider, media policy or
target schema.

## Figma Evidence

The registered file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
`1020:480` are shared Studio-shell references. They contain no component-
specific Video Section media, player, responsive presentation or state matrix.
They establish traceability only, not visual approval.

## Target Translation

- Neutral Web renders native figure/wrapper/media/caption composition and no
  playback behavior.
- Webflow consumes the canonical CSS with target-authored media/player markup.
- React and Angular remain thin wrappers around required media children; player
  state belongs to the selected child implementation.
- Shopify can later choose hosted `video` + `video_tag`, an external provider
  profile, or separate sections only after the target decision records
  accessibility, privacy, loading and fallback obligations.
- Figma maps the approved shell/presentation after browser review; player chrome
  belongs to a selected target profile.
- SwiftUI and Compose embed their native media/player semantics rather than
  copying DOM or private CSS.

## Performance

Passive neutral S7 has a `0 B` component-runtime budget. It owns no player
bundle, request, media preload, listener, observer, timer, playback loop,
formatter, layout read or asset. A future target player must define its own
network/runtime budget and lifecycle cleanup.

Sections remains subject to the permanent `6,861 B` gzip ceiling. Removing the
false control should fund complete passive media/caption styling without
raising the ceiling. Full Neutral Web and shared runtime keep their existing
global gaps explicit; S7 must add `0 B` to runtime.

## Open Product, Architecture, And Human Boundary

This decision intentionally does not choose:

- hosted, external, decorative, narrated, live or mixed media support per
  target;
- a shared cross-target Player contract or dependency;
- source/media record schema, provider precedence or fallback;
- captions, descriptions, transcript, consent/privacy, loading/preload,
  autoplay, errors, analytics or localization policy;
- target player controls, events or controlled/uncontrolled state API;
- final aspect ratio, crop, radius, caption type/alignment/rhythm or full-width
  edge treatment;
- a Shopify Liquid/schema/data/editor implementation;
- component-specific Figma variants; or
- promotion from `pilot` to `stable`.

## Consequences

- Neutral Web no longer exposes a focusable control that cannot fulfill its
  name.
- The required media slot remains maximally useful across targets without
  importing one framework, provider, player or data model into the source.
- Exhibit, Studio and MDX demonstrate the same truthful passive composition.
- Target players can be complete and accessible without duplicating or
  conflicting with section-owned playback state.
- Shopify's missing player/profile decision remains visible instead of being
  hidden by a superficially ready section.
- Human review can evaluate the shell, API and documented target boundary while
  separately deciding the product/player profile required for cross-target
  stability.
