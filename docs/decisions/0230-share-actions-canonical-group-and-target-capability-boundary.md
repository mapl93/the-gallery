# ADR 0230: Share Actions Canonical Group And Target Capability Boundary

Status: Accepted

Date: 2026-07-20

## Context

L9 exposed two overlapping CSS families. Registry-backed `.share-buttons`
offered inline and misleadingly named sticky layout, while unregistered
`.share` duplicated Button surface/focus/icon behavior and fixed itself to a
physical viewport position. Runtime markup was unnamed, Email was rendered as
an action button, providers and asynchronous results had no truthful owner, and
Exhibit/Studio did not use a dedicated fail-closed renderer.

The owner selected decision `L9-A`: one canonical named Share Actions group, a
hybrid curated-plus-custom action model, omission of unavailable actions, and
target ownership of provider/native/copy execution.

## Decision

1. The public component name is Share Actions. The registry slug and canonical
   root remain `share-buttons` / `.share-buttons`.
2. The unregistered `.share` family and every duplicate control/fixed-placement
   rule are deleted. There is no permanent pre-v1 alias.
3. Public layouts are `inline | stacked`. Neither layout promises sticky or
   fixed placement. A page host or separately reviewed Share Rail owns it.
4. The valid base is a non-empty localized `role="group"` name plus at least one
   target-capable canonical Button or anchor Button action. Invalid content
   fails closed.
5. The accepted semantic built-in ids are `native`, `copy`, `email`,
   `whatsapp`, `facebook`, `x`, `pinterest`, `linkedin`, `telegram`, `reddit`,
   `instagram`, `threads`, and `tiktok`. Arbitrary custom actions may be mixed
   into the same ordered composition. Nothing renders by default.
6. A semantic id requests adapter resolution; it does not define a provider
   URL, icon, label, support claim or fallback. The current target omits an
   action it cannot truthfully perform.
7. Native Share and Copy are native Buttons. Provider/email/custom
   destinations are anchors only when a real target-supplied href exists.
8. Targets own payload, canonical resource data, encoding, capabilities,
   permissions, provider APIs/SDKs, popup and `target`/`rel` security, promise
   success/cancel/error, fallback, feedback/announcement, analytics and cleanup.
   The neutral group adds zero runtime and never fabricates success.
9. Instagram and TikTok remain target-capability actions. Generic Web cannot
   promise them; Native Share remains a separate explicit action.
10. Exhibit and Studio consume the same `ShareActionsArtwork`, fixture and
    canonical implementation. Generic Figma references are not visual approval.

## Consequences

- L9 depends on canonical Button and owns only named grouping and intrinsic
  layout.
- Ordinary Tab/Enter/Space behavior remains intact; there is no Toolbar, menu,
  roving focus or selection state.
- Provider integrations can evolve independently without changing the neutral
  contract or pretending one Web URL is cross-target truth.
- A future fixed rail requires its own host/component decision and collision,
  safe-area, focus-obscuration, mobile and print evidence.
- The contract remains `pilot`; concrete target consumers, final visuals,
  provider revalidation, Figma evidence and explicit human review are required
  before stability promotion.
