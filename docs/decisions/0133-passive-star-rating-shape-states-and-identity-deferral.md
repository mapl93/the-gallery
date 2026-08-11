# 0133. Passive Star Rating Shape States And Identity Deferral

> Deprecation note: ADR 0235 migrates this V2 half-step value and size behavior
> into canonical A11 Rating. V2 now owns only a temporary pre-v1 migration
> record and no independent implementation.

Status: Accepted

Date: 2026-07-15

## Context

V2 Star Rating entered component refinement as the Review family's read-only
projection of a supplied `0..5` half-step value. Its neutral Web root already
exposed one image role and accessible label, but every state used the same solid
star shape. The half state clipped the only SVG to its inline-start half, leaving
no complete outline behind it. Filled/empty meaning therefore depended primarily
on color and became ambiguous in monochrome and forced colors.

Canonical CSS also used a Button background token for filled stars, a structural
border token for empty stars, and private physical-pixel geometry. Studio and
Exhibit shared one renderer, while the MDX fallback still documented a generic
root plus legacy `is-filled`/`is-half` markers.

ADR 0085 accepts Star Rating as a passive half-step projection and keeps Star
Input distinct. ADR 0110 separately leaves the identity of A11 compact Rating
Stars versus V2 richer Star Rating unresolved. Correcting V2's existing
semantics and presentation does not require settling that architecture choice.

## Decision

- V2 remains a passive five-star image for this refinement. It owns no value
  entry, focus, keyboard, pointer, controlled/uncontrolled lifecycle, live
  region, calculation, normalization, formatting or provider behavior.
- The public API remains required `ratingValue` (`0..5`, step `0.5`), required
  localized `label`, and optional `size` (`default` or `lg`).
- The target supplies one valid value, one truthful label and exactly five
  `empty`, `half` or `full` state containers atomically.
- The root is the single `role="img"` owner. Every star container is decorative
  and hides its icon subtree from assistive technology.
- Empty uses a complete outline, full uses a solid fill, and half layers an
  inline-start clipped solid fill over a complete outline. Shape and color both
  distinguish the three states.
- Canonical state markup uses `data-state="empty|half|full"`; the legacy
  `data-filled`, `.is-filled` and `.is-half` selectors are removed rather than
  retained as hidden aliases in this `pilot` contract.
- Filled and empty visuals reference `--color-text-accent` and
  `--color-text-secondary`. Star sizes are private `1rem` and `1.5rem`; the
  `0.125rem` gap and 50% partial-fill geometry remain private.
- The site renderer may use Lucide as the accepted Studio-only icon fixture. No
  Lucide name, dependency or SVG path enters the target-agnostic contract.
- Exhibit and Studio continue to mount the same `ReviewsStudio` renderer,
  semantic properties and initial fixture. MDX mirrors the reviewed anatomy as
  fallback/static evidence.
- Web, Webflow and Shopify consume regenerated canonical CSS. Shopify remains
  planned for V2 because a second dedicated Liquid rating projection would
  pre-empt the A11/V2 identity and provider-policy decisions.
- Contract version advances to `0.3.0` and remains `pilot`.

## Architecture Boundary

This decision does not approve the coexistence of two passive rating contracts.
V2 therefore remains technically refined but excluded from the human stability
review queue until the owner chooses one of these explicit directions:

1. retain A11 as a compact primitive and V2 as a richer review display, with a
   stable cross-target use-case boundary; or
2. consolidate the displays and deliberately migrate the surviving registry,
   contract, CSS, renderer, docs, Studio and target-adapter API.

This decision also does not define how a Review Summary `0.1` aggregate is
projected into V2's half-step anatomy. Provider scale, missing data, rounding,
normalization, structured data and update announcement remain target/architecture
decisions. The neutral component does not introduce a silent rounding rule.

## Performance

Star Rating adds no listener, observer, timer, formatter, request, animation,
layout read, asset or neutral component JavaScript. Reviews family CSS remains
under its permanent `3.7 KiB` gzip ceiling. Complete Neutral Web component CSS
and the shared runtime retain their existing program-level budget exceptions;
this decision does not increase either ceiling.

## Open Human Boundary

This decision intentionally does not approve:

- V2 retention versus consolidation with A11;
- accent color, outline weight, full/half/empty shape treatment, default/large
  size, gap, alignment or visual hierarchy inside composed review components;
- non-five-point scales, precision other than `0.5`, missing or invalid values;
- provider, aggregation, normalization, review-link, structured-data or dynamic
  announcement policy;
- a dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- Assistive technology receives one concise rating image instead of redundant
  star graphics.
- Full, half and empty meaning survives color loss and forced colors.
- The half state communicates a partial value without visually deleting the
  unfilled portion of the star.
- Button and border tokens no longer leak unrelated semantics into rating data.
- The shared renderer remains zero-runtime at the component layer and presents
  exact Exhibit/Studio markup parity.
- Owner architecture input, component-specific Figma artwork and human visual
  review remain required before a readiness or stability claim.
