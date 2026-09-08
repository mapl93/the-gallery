# 0135. Self-Contained Review And Provider-Owned Actions

Status: Accepted

Renamed by ADR 0285. The accepted component is now Review (`V4`); its semantic
and provider boundaries remain unchanged.

Date: 2026-07-15

## Context

V4 Review entered component refinement with the provider boundary accepted
by ADR 0085 and a canonical V2 Star Rating dependency. Its shared renderer
already presented a complete review candidate, but several semantics diverged
from its contract and MDX fallback:

- localized visible date text had no independently supplied machine value;
- Studio fixed the optional review title to `h2` while MDX used `h3`;
- an avatar repeated adjacent author identity with invented scene description;
- photo items were generic elements inside a labelled generic group;
- the helpfulness count was not associated with its button in Studio;
- a direct gallery reply created an unnamed complementary `aside`; and
- MDX duplicated removed Star Rating `is-filled` markup.

Canonical CSS also inherited some typography from its host, hardcoded body and
reply line heights, and applied `object-fit` to a non-replaced photo container.
The Reviews family was only 38 deterministic gzip bytes below its permanent
ceiling, so safe semantic refinement could not silently expand the budget.

Shopify officially identifies product reviews and star ratings as dynamic-source
app-block use cases. The repository still has no accepted review provider,
record model, verification source, moderation workflow or helpfulness endpoint.

## Decision

- One Review is one native `article` containing one independently
  meaningful target-supplied review record.
- Required source order remains author metadata, one canonical passive Star
  Rating and review body. Optional title, media, action and reply content follow
  their logical reading order without visual reordering.
- When a title exists, its target-owned unique id may label the article. Native
  heading rank remains contextual and is not added as a neutral public property.
  The docs target uses `h3` consistently in Exhibit, Studio and MDX.
- Visible localized `date` and optional machine-readable `dateTime` are separate
  target values. Review performs no parsing, formatting or timezone work.
- `photosLabel` names the optional native `ul`; repeated `li` items contain
  passive images by default. Targets may supply a native link or button, but
  Review does not select or implement Lightbox, Modal or navigation.
- Avatar alternative text remains part of the target-owned media slot. The
  shared fixture uses empty alternative text because adjacent author text
  already identifies the reviewer.
- Verification remains readable target-owned text. Icons are decorative and
  cannot establish truth.
- Helpfulness remains an optional native `button type="button"` with a stable
  visible label, projected boolean `aria-pressed`, native disabled state and one
  native activation request. When a supplied count also exists, it is associated
  with `aria-describedby`.
- The static neutral Web component does not mutate helpfulness state. Studio may
  demonstrate local state; framework/provider targets may control state and own
  authentication, persistence, optimistic updates, rollback, deduplication and
  count synchronization.
- The helpfulness count is ordinary target-formatted text, not a live region or
  component-confirmed update.
- A direct reply remains ordinary grouped content inside the article. It does
  not create an `aside`, region, disclosure, thread, status or moderation flow.
- Review continues to compose the current V2 Star Rating dependency. This
  decision does not resolve V2 versus A11 Rating identity or provider scale
  policy.
- Complete H3, body, caption and supporting typography uses existing public
  tokens. Avatar/photo dimensions, internal gaps and reply padding remain
  private composition values. The ineffective container `object-fit` is removed.
- Exhibit and Studio continue to mount one `ReviewsStudio` renderer, definition
  and initial fixture. MDX mirrors the reviewed semantic anatomy and canonical
  Star Rating state markup.
- Web, Webflow and Shopify consume regenerated canonical CSS. Shopify remains
  CSS-ready/planned; a provider theme app block, not theme-owned placeholder
  review records, must supply data, localization and actions.
- Contract version advances to `0.3.0` and remains `pilot`.

## Performance

Review adds no neutral component listener, observer, timer, request,
formatter, layout read, animation or asset. The Studio-only demonstration click
handler is not target runtime.

The permanent Reviews family ceiling remains `3.7 KiB` gzip, total Neutral Web
component CSS remains `64 KiB`, and shared runtime remains `8 KiB`. Measured
post-refinement sizes and program exceptions are recorded in Batch 50; this
decision does not raise a ceiling or hide an existing overage.

## Open Human And Target Boundary

This decision intentionally does not approve:

- reviewer/title/body hierarchy, density, photo size/crop/scroll treatment,
  helpfulness emphasis, reply surface or separator treatment;
- presence or placement of avatar, verification, title, photos, helpfulness or
  reply content in any product;
- heading rank outside the docs target;
- A11 Rating versus V2 Star Rating retention or consolidation;
- provider, review schema, scale, rounding, structured data, authentication,
  verification, moderation, localization, persistence or analytics policy;
- photo activation, lightbox or enlarged-media behavior;
- dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- Assistive technology receives one self-contained review, one accessible rating
  value, truthful optional time semantics, one named photo list, one described
  pressed button and no unnecessary complementary landmark.
- Targets can translate the same content and request boundaries without copying
  React state, Shopify provider or Figma assumptions into neutral source.
- Missing optional content leaves no empty landmarks, inferred labels or fake
  machine values.
- Heading ownership stays contextual without adding a consumer option that can
  create invalid document hierarchy.
- Human visual review, component-specific Figma artwork and explicit target
  policy remain required before stability.
