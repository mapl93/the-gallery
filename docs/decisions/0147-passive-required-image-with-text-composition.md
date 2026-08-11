# 0147. Passive Required Image with Text Composition

Status: Accepted

Date: 2026-07-15

## Context

S3 Image with Text exposed five useful presentations over target-owned media and
narrative content, but its implementation did not enforce the required media,
title, or body. The thematic section was unnamed, empty title content continued
to render, Studio cancelled a fragment action, portrait fixture dimensions made
stacked sections unbounded, and Overlay inherited inverse color only on a
wrapper while its explicit child tokens remained dark over imagery.

Canonical CSS also competed with viewport and site-stage breakpoints. Studio
owned minimum heights and the Overlay measure. Shopify had copied CSS but no
dedicated merchant-editable Section Adapter. HTML document/image semantics,
accepted Button composition, ADR 0082, and the refinement configurability test
already establish the relevant ownership boundaries.

## Decision

- Image with Text is a passive thematic section. Target-owned media, a
  non-empty visible title, and non-empty narrative body are required as one
  complete composition; invalid input omits the section.
- The visible contextual heading names the native `section` through
  `aria-labelledby`. Targets choose the appropriate heading rank.
- Media remains a target-owned native slot. Its owner supplies source,
  intrinsic dimensions, responsive sources, loading, art direction, focal
  point, and either an informative alternative or decorative empty alternative.
- Eyebrow and one complete Button-composed action are optional. Button and the
  target own focus, activation, destination/result, disabled/busy lifecycle,
  and analytics. S3 does not duplicate action behavior.
- Default, Reversed, Stacked, Overlay, and Offset remain the supported public
  presentations. Every variant preserves media then narrative in DOM/source
  order; Reversed changes only wide visual placement and returns to media-first
  when stacked.
- One named component container owns responsive composition. Viewport and
  site-only S3 breakpoint, height, order, measure, and crop rules are removed.
- Media ratio, content measure, split threshold, padding curve, Overlay block
  size, scrim geometry, and Offset density are private CSS composition. The
  initial `4 / 3` ratio is a human-review candidate, not public configuration or
  an approved identity decision.
- Overlay applies the inverse semantic foreground family explicitly to its text
  anatomy over an invariant scrim and provides a system-color fallback in
  forced-colors mode.
- S3 has no controlled/uncontrolled store, focus model, Arrow-key behavior,
  live region, autoplay, timer, authored motion, observer, or neutral runtime.
- Exhibit and Studio share the same Sections renderer, fixture, validity rule,
  native semantics, Button-composed destination, and initial state. Site CSS may
  provide fixture media but not S3 implementation behavior.
- Shopify owns a dedicated addable Section Adapter with merchant image,
  decorative classification/alternative, eyebrow, required heading/rich text,
  a complete optional button pair, and the five presentation choices. It uses
  native responsive image helpers and focal-point data; editor settings do not
  become neutral properties automatically.
- The contract remains `pilot`. Automated evidence can prepare S3 for review
  but cannot approve its crop, density, Overlay treatment, or promote it to
  `stable`.

## Consequences

- Web becomes a named, strict, container-responsive, framework-free passive
  composition with truthful navigation and zero component runtime.
- Missing required content no longer produces empty headings, incomplete
  sections, or false preview evidence.
- Media and narrative source order stays stable across responsive states and
  targets; the visual Reversed option does not alter reading order.
- Shopify can be measured through Liquid, schema, data, behavior, editor
  preview, and translation layers without leaking Shopify image objects into
  neutral source.
- Human review must approve the private `4 / 3` crop, Default/Reversed balance,
  Stacked rhythm, Offset inset/radius, Overlay height/scrim, and the five-mode
  hierarchy before stability.
- Interactive video/media, media-provider policy, heading-rank composition,
  rich-text sanitization, navigation results, analytics, and content governance
  remain explicit target or child-contract responsibilities.
