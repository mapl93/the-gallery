# 0142. Studio Tour As A Process Timeline Profile

Status: Accepted

Date: 2026-07-15

## Context

Studio Tour entered refinement as a second ordered-narrative implementation. It
defined its own grid, step media, number, title, description, hover motion,
responsive rule, video poster and full-surface play Button. Its contract said
that playback was target-owned, but the shared fixture still exposed a
focusable playback action with no handler. Clearing the optional heading left
the root's `aria-labelledby` pointing to an element that no longer existed.

Canonical Process Timeline had already completed technical refinement under ADR
0124. It owns the same ordered narrative job through a named native section,
visible contextual title, `ol`/`li` source order, numbered markers, optional step
media/descriptions, intrinsic narrow overflow, keyboard focus, RTL, forced
colors and zero component runtime.

ADR 0083 accepts ordered Studio Tour records and optional media, but explicitly
leaves media type, provider, consent, loading, playback, captions, modal
presentation and analytics open. No accepted decision authorizes a neutral
player, a Shopify record schema, or a fake player control.

## Decision

- Studio Tour becomes a contextual profile of canonical Process Timeline.
- Registry and contract add `process-timeline` as the sole direct dependency.
- The Web root layers `.studio-tour` on `.process-timeline`. The visible heading,
  ordered lane and every step use canonical Process Timeline anatomy.
- Studio Tour keeps only its contextual header, optional eyebrow, required
  heading, optional intro, and optional supplementary-media composition.
- A valid rendered profile requires a non-empty visible heading and at least one
  ordered step. Invalid required composition is omitted rather than producing
  an unnamed or empty section.
- Root and ordered lane reference one target-unique id on the visible heading.
  Heading rank remains target/document-owned.
- The obsolete Studio Tour step, video poster and play child APIs are removed
  rather than preserved as compatibility aliases.
- The neutral supplementary-media fixture is a passive native `figure` with an
  informative image and caption. It adds no focus stop or playback claim.
- The target may replace the passive asset with native video or a complete
  accessible target-native player only after it owns media type, provider,
  privacy/consent, loading, controls, captions, descriptions, transcripts,
  playback, modal presentation and analytics.
- The full-surface inert play Button and its Lucide Play icon are removed.
- Passive step-image hover scaling is removed by consuming canonical
  Process Timeline's motion-free media treatment.
- Site-only Studio Tour list, grid, padding and media rules are removed. Exhibit
  and Studio consume one `CeramicsStudio` renderer, fixture and canonical source
  implementation.
- The fixture expands from two to three ordered steps and keeps passive
  supplementary media so wide and narrow compositions are reviewable.
- Studio Tour adds no controlled/uncontrolled state, selection, current step,
  progress, events, listeners, observers, timers, requests, player, animation,
  icon, or neutral asset.
- Contract version advances to `0.3.0` and remains `pilot`.

## External Evidence

- The HTML ordered-list model represents intentionally ordered compound items
  with direct list-item children.
- Open UI List research records ordered compound list content but no
  interoperable Studio Tour widget.
- Current Polaris Ordered List guidance uses ordered lists for sequences and
  recommends parallel, concise item structure.
- HTML `figure` and `figcaption` support self-contained images or video with an
  optional caption inside the surrounding flow.
- Native HTML video defines poster, loading, controls, tracks and playback as a
  real media lifecycle rather than a decorative action surface.
- WAI media guidance requires accessible players and, depending on content,
  captions, descriptions and transcripts.
- Polaris Video Thumbnail is explicitly interactive, keyboard accessible and
  wired to a real modal/full-screen player, reinforcing that a play surface is
  a behavioral contract.

These sources support native ordered composition, passive supplementary media
and removal of the inert action. They do not choose The Gallery's visual
identity, media provider, record schema or player architecture.

## Figma Evidence

The registered file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector
`1020:480` are the generic Button/Studio shell. Direct API inspection and
screenshot review found no Studio Tour artwork, steps, media, responsive state
or component-specific controls. No tour density, marker, connector, media ratio
or player treatment is inferred from those nodes.

## Performance

Studio Tour adds no neutral runtime. Removing duplicate step layout, hover
motion, fake-player styling, focus/touch rules and the docs-only override reduces
Ceramics-family and complete Web CSS. Canonical Process Timeline retains its
existing performance budget and runtime boundary.

The permanent Ceramics-family ceiling remains `5.3 KiB` (`5,427 B`) gzip. This
decision creates no new runtime ceiling; target media requests and decoding
remain adapter/data concerns.

## Target Boundary

- Neutral Web uses one canonical Process Timeline tree plus Studio Tour context,
  introduction and optional passive/target-owned supplementary media.
- Shopify may use a dedicated section or contextual composition of Process
  Timeline blocks after merchant record schema and media policy are selected.
  This decision does not authorize a generic Liquid player or embed.
- React and Angular use a thin profile around their canonical Process Timeline
  projection and render nothing for invalid required composition.
- Figma uses an instance/profile of reviewed Process Timeline with contextual
  introduction and optional passive media after human visual approval.
- SwiftUI and Compose use target-native ordered accessible groups and
  target-native media while preserving the same ownership boundary.

## Open Human And Product Boundary

This decision intentionally does not approve:

- final Process Timeline lane, marker, connector, step-media ratio, overflow or
  snap appearance in the Studio Tour context;
- final introduction measure, typography, alignment, rhythm, supplementary-media
  ratio, radius or caption treatment;
- grid/list, orientation, density, columns, marker/connector visibility or
  media-ratio configuration;
- Studio Tour record schema, normalization, localization or CMS ownership;
- supported media types, provider, privacy/consent, loading, controls, captions,
  descriptions, transcripts, playback, modal, analytics or fallback policy;
- dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- The repository has one ordered editorial sequence implementation instead of
  a ceramics-specific fork.
- The formal dependency graph records canonical composition.
- The Web candidate no longer exposes a dead playback control or dangling
  heading reference.
- Exhibit and Studio share the same renderer, fixture, markup, interaction and
  source CSS.
- Media remains a truthful, explicit target boundary rather than a visual
  placeholder mistaken for completed functionality.
- Human visual review, media/product decisions and explicit stability approval
  remain required.
