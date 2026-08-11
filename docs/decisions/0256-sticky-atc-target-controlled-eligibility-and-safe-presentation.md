# ADR 0256: Sticky ATC Target-Controlled Eligibility And Safe Presentation

- Status: Accepted
- Date: 2026-07-21
- Owners: The Gallery
- Scope: K9 Sticky Add-to-Cart eligibility, Product Form association, fixed-surface
  safety, target ownership, docs evidence, Shopify projection, and future targets
- Supersedes: the unresolved product and architecture boundary in ADR 0181

## Context

ADR 0181 established the correct neutral implementation: K9 is a passive
composition of canonical Price and Button whose external submitter is associated
with the one existing native Product Form. It intentionally left the visibility
trigger, product coordinator, fixed-surface policy, target purchase lifecycle,
and final visual direction open for owner review.

The owner selected K9-A. The stable product boundary is not a second form or a
component-owned observer. K9 is a target-controlled secondary submitter that is
useful only after the main Product Form action is no longer usefully visible and
the target has resolved a purchasable product state.

## Decision

- K9 remains a passive secondary submitter for the one canonical Product Form.
  On Web, its canonical Button uses native `type="submit"` plus `form` association
  and keeps the target-provided activated-submitter name and value.
- The target controls semantic visibility. It may expose K9 only while the main
  Product Form action is no longer usefully visible and the resolved product
  state is eligible for purchase. Exact observation signals, thresholds, and
  hysteresis are target implementation policy, not K9 properties.
- A target omits K9 when it cannot establish a valid Product Form association or
  coherent product state. If the coordinated state becomes unavailable while
  the surface is present, the target either omits it or projects the native
  unavailable Button state; it never starts a second commerce path.
- One target product coordinator owns selected merchandise, quantity, selling
  plan, Price, availability, Product Form identity, visibility observation,
  pending/result/error state, cart refresh, deliberate feedback, analytics, and
  focus. K9 owns none of this business state.
- Neutral source adds no `IntersectionObserver`, scroll listener, timer, request,
  cart client, focus manager, or autonomous visibility runtime. Its neutral
  runtime budget remains `0 B`.
- Hidden Web output remains `inert`, accessibility-hidden, non-interactive, and
  visually unavailable. Targets may instead omit the subtree entirely.
- Every fixed target mapping must account for safe-area insets, reserve enough
  block-end content or scroll space, and coordinate other viewport-edge
  surfaces so K9 never completely covers a focused control or checkout-critical
  content. The target owns virtual-keyboard and effective-zoom policy.
- Internal geometry, container threshold, image treatment, surface chrome,
  wrapping, action width, stacking offset, and movement remain private. K9 adds
  no public visual token and no new semantic property.
- The existing shared Exhibit/Studio artwork is the review candidate. It proves
  one real native Product Form association, canonical Price/Button composition,
  hidden exclusion, unavailable/pending projections, container response, focus,
  reflow, forced colors, reduced motion, and target-owned result feedback.
- Shopify's product-context Liquid may provide the initial composition and form
  association. It remains non-target-ready until a real Main Product consumer
  proves live option/quantity synchronization, eligibility observation,
  native/Ajax purchase outcomes, feedback, focus, safe areas, collisions, and
  editor behavior.
- The contract advances to `0.3.0` and remains `pilot`. Passing automated
  evidence may make K9 ready for human review but cannot promote it to `stable`.

## Accessibility And Runtime Requirements

- The external submitter must preserve native Product Form constraint
  validation, activated-submitter semantics, successful entries, and FormData.
- Hidden output cannot remain keyboard reachable or exposed to assistive
  technology; visual translation alone is insufficient.
- Pending work uses canonical Button busy and disabled semantics while preserving
  the localized visible action label. Result announcement and focus remain in
  the one target purchase lifecycle; K9 is not a live region.
- Fixed presentation must pass keyboard focus visibility, effective 200 percent
  reflow, logical direction, reduced motion, forced colors, short viewport,
  safe-area, and fixed-surface collision checks in each target that enables it.

## Consequences

- Consumers receive one purchase submission path and one coordinated product
  state even when the action is presented in two locations.
- Targets can choose platform-appropriate observation and collision mechanics
  without leaking viewport algorithms into the stable component API.
- The neutral implementation is now ready for human visual review because its
  product and architecture boundary is accepted. Target production readiness
  still depends on proving the target-owned lifecycle.

## Not Approved

This decision does not approve:

- a second Product Form, mirrored named controls, local variant state, direct
  cart request, inferred success state, or duplicate status announcement;
- an always-visible sticky purchase surface independent of the primary action;
- a neutral observer, page-scroll policy, universal z-index stack, or global
  fixed-surface manager;
- Shopify readiness from static Liquid validation alone;
- final surface height, shadow, image treatment, narrow composition, or motion;
  or
- promotion from `pilot` to `stable`.
