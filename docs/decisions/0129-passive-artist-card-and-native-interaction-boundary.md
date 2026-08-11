# 0129. Passive Artist Card And Native Interaction Boundary

Status: Accepted

Date: 2026-07-14

## Context

ADR 0080 exposed Artist Card's portrait, badge, name, medium, location and piece
count without deciding whether every instance is navigational, optionally
interactive or passive. The initial shared Exhibit/Studio fixture was a passive
`article`, but canonical CSS applied portrait zoom to every hovered card and
outlined the root through broad `:focus-within`. The visual treatment therefore
promised interaction the semantic root did not provide.

The optional over-media label duplicated padding, typography, colors and radius
already owned by canonical Badge. Optional metadata elements also remained in
the shared DOM when empty, canonical typography relied on host defaults, and
the MDX fallback claimed a meaningful portrait through a transparent image.

HTML provides a stable passive `article` and native link/button activation.
Open UI does not define one universal Card anatomy or whole-card interaction
model. Radix likewise treats Card as passive composition until consumers
delegate to a native element. WAI image guidance makes alternative text depend
on the image's purpose. Shopify can emit responsive image markup from target
image data, but it does not supply a universal artist model or destination.

The registered Figma reference is the generic Button Studio pilot and provides
no Artist Card-specific visual evidence.

## Decision

- The shared Artist Card candidate is a passive `article.artist-card`.
- The neutral contract exposes no `href`, destination, activation, event,
  controlled value or framework callback.
- A target may use one native `a[href].artist-card` or
  `button.artist-card` root only when it owns one coherent destination or
  action, an accessible name and no nested interactive descendants.
- Pointer cursor, portrait hover/focus motion and root focus styling apply only
  to those native interactive roots. A passive root has no hover/focus promise,
  tabindex, click/keyboard handler or neutral runtime.
- The optional badge composes canonical `.badge.artist-card__badge`. Badge owns
  label typography, padding, shape, color and special-mode treatment; Artist
  Card owns only its logical overlay position.
- Badge is rendered only with a present portrait. Medium, location and piece
  count elements are omitted when their values are absent.
- The public semantic properties remain `portrait`, `badge`, `name`,
  `medium`, `location` and `pieceCount`. Name remains required; count
  localization/pluralization remains target-owned.
- Portrait source, intrinsic dimensions, responsive candidates, crop/focal
  data, loading priority and informative-versus-decorative alternative text
  remain target-owned.
- Canonical CSS owns complete typography, margin resets, logical positioning,
  text containment, image block sizing, reduced motion and the native-root
  focus boundary.
- The current `3 / 4` portrait ratio, medium portrait radius, overlay inset,
  metadata micro-rhythm, `1.03` interactive image scale and 2px focus geometry
  remain private candidates pending human visual review.
- Generic Card is not a dependency. The current flat portrait-plus-metadata
  candidate does not use Card surface, body or footer anatomy; adopting that
  visual shell requires explicit owner review.
- Exhibit and Studio continue to use one renderer, fixture, passive root and
  exact initial markup. Site CSS may own fixture width/artwork, but it does not
  repair canonical text presentation.
- Shopify receives the exact generated CSS and canonical Badge class. Dedicated
  Liquid, schema, artist data, destination and responsive portrait markup remain
  planned until an artist target model is accepted. The neutral component
  requires no JavaScript.
- The contract advances to `0.2.0` and remains `pilot`. Automated evidence
  may make it ready for human review; only explicit human approval may promote
  it to `stable`.

## Open Human And Target Boundaries

This decision intentionally does not approve:

- always-passive, always-linked or target-selectable activation as the final
  v1 product policy;
- canonical Card surface composition;
- a public ratio, crop, focal point, density, size, metadata-layout or
  destination property;
- a universal portrait-alt formula or Web-specific media URL;
- Shopify metafield/metaobject definitions, merchant schema, routes,
  destination policy, responsive widths or loading priority;
- the private portrait ratio/radius, Badge inset, typography, spacing and motion
  as final visual values.

These choices require explicit owner, visual, architecture or target review.
Their absence does not block a truthful passive candidate with conditional
native interaction hooks.

## Consequences

- Passive Artist Cards no longer look clickable merely because a pointer hovers
  them, and they create no unexplained focus boundary.
- Targets can opt into native link or button semantics without a framework
  dependency or duplicated CSS branch.
- Badge presentation and forced-color behavior have one canonical source.
- Optional content does not leave empty semantic or layout nodes.
- Exhibit, Studio, the MDX fallback and generated Web/Shopify CSS express one
  dependency and one passive default.
- Artist Card remains zero-runtime and container-sized by its parent layout.
- Shopify remains honestly `css-ready` until its artist data and destination
  model are accepted.
- Human review is still required for the visual candidate, interaction policy,
  Card-shell question and all private compositional values before `stable`.
