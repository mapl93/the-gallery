# 0211. Certificate Details As A Canonical Certificate Profile

Status: Superseded by ADR 0245

Date: 2026-07-18

The owner later accepted removal of this duplicate registry identity. ADR 0245
migrates the remaining responsibility directly to canonical Certificate.

## Context

Certificate Details entered refinement as a second certificate card. It had a
separate section root, visual surface, heading, two-column field grid,
decorative check seal, QR-only media region, public tokens, responsive rules,
Studio overrides and renderer. Its optional title could leave a dangling
`aria-labelledby`, its required details could be disabled, and the example QR
had no destination or textual function.

Canonical Certificate had already completed technical refinement under ADR
0125. It defines the same bounded record-presentation job as a named native
article with a visible contextual title, native description-list details,
optional signature and optional target-owned descriptive verification link.
Its QR or other media is redundant inside the link; the component does not
generate a service or assert authenticity, validity, proof, status or trust.

ADR 0083 correctly left R11's certificate record, QR destination and
verification guarantee target-owned, but it predated reconciliation with the
canonical F3 implementation. The program requires composed components to
consume canonical components rather than duplicate markup or behavior.

## Decision

- R11 remains a distinct Ceramics-context registry entry for now, but becomes a
  contextual profile of canonical `Certificate`.
- Registry and contract add `certificate` as the sole direct dependency.
- The Web root layers `.certificate-details` on the same native `.coa` article.
  Every visible child uses canonical `.coa__title`, `.coa__divider`,
  `.coa__details`, `.coa__detail`, `.coa__detail-label`,
  `.coa__detail-value`, `.coa__verification`, `.coa__qr`, and `.coa__verify`
  anatomy.
- The obsolete `.certificate-details__icon`, `__title`, `__grid`, `__field`,
  `__label`, `__value`, and `__qr` child API is removed rather than preserved
  as a compatibility alias.
- The decorative check seal is removed. R11 does not expose or generate a
  verification, approval or authenticity status.
- The isolated `qr` property is replaced by optional `verification`: a complete
  canonical native link with real target-owned destination and descriptive
  visible text. Optional QR or other media is redundant inside that same link.
- `title` becomes required and non-empty. `details` remains required and must
  contain at least one complete target-owned name-value pair. Invalid docs
  compositions omit the complete renderer instead of exposing an unnamed or
  empty certificate shell.
- R11 adds no visual token, variant, size, focus rule, responsive breakpoint,
  neutral event, state store or runtime. Certificate owns all presentation,
  intrinsic response, interaction and accessibility treatment.
- One docs-only `CertificateArtwork` renderer is extracted from the already
  reviewed F3 implementation and consumed by both F3 and R11. Each slug keeps
  one explicit fixture; Exhibit and Studio mount the same renderer and fixture.
- The contract advances to `0.3.0` and remains `pilot`.

## External Evidence

- HTML defines `dl` for name-value groups and permits direct `div` groupings.
- WAI link-purpose guidance requires a link's destination/action to be
  determinable from text or context; functional-image guidance allows
  redundant linked media to be excluded from the accessible name.
- W3C Verifiable Credentials separates issuer, subject, claims, securing
  mechanisms and verifier policy, so a visual card, check seal or QR cannot
  independently establish authenticity or validity.
- Open UI defines no Certificate or Certificate Details primitive.
- Radix publishes no certificate primitive; its behavior-rich WAI components do
  not justify state or keyboard infrastructure here.
- Polaris exposes generic layout, link, image and text building blocks rather
  than a certificate widget.
- Shopify metafields and metaobjects require an explicit structured-data model;
  presentation must not invent a merchant schema or verification URL.

These sources support the accepted canonical Certificate boundary. They do not
authorize a separate R11 certificate widget or select a proof service.

## Figma And Visual Evidence

R11's registered file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector
`1020:480` show the generic Button/Studio shell, not Certificate Details
artwork. The repository baseline shows an outlined white card with an orange
check seal, serif heading, metadata and oversized QR-like graphic. That visual
is useful before evidence but cannot establish a separate canonical identity,
verification meaning or final approval.

The candidate profile deliberately inherits canonical Certificate's archival
surface, type hierarchy, detail rhythm, intrinsic breakpoint and verification
link. Human review must approve that reuse in the Ceramics context.

## Performance

The profile adds no listener, observer, request, timer, state store, formatter,
QR generator, layout read, focus manager, animation or asset. Removing the
duplicate R11 child CSS and Studio overrides reduces the Ceramics-family and
complete Web CSS. Canonical Certificate retains its existing performance
budget; R11 creates no new visual or runtime ceiling.

## Target Boundary

- Neutral Web uses one canonical Certificate tree plus the R11 context hook.
- Shopify requires an approved certificate metafield, metaobject, app record or
  other authoritative source. It may map that data into the existing canonical
  Certificate snippet/profile, but this decision does not authorize a generic
  schema, generated QR, product-URL claim or verification service.
- React and Angular use a thin profile around canonical Certificate with
  target-owned details and optional native verification link.
- Figma should use an instance/profile of canonical Certificate with Ceramics
  content and omitted/text/media verification examples after human review.
- SwiftUI and Compose use equivalent target-native record presentation. Digital
  credential proof, trust and revocation are separate architecture.

## Open Human And Architecture Boundary

This decision intentionally does not approve:

- retaining R11 as a separate registry identity for v1 versus consolidating it
  completely into F3;
- redefining R11 as a generic metadata surface or a genuinely distinct compact
  Certificate variant;
- final archival surface, border, centered hierarchy, typography, density,
  intrinsic threshold, verification-media size or link treatment;
- certificate record schema, issuer/subject model, authority, proof,
  signatures, status/revocation, privacy or verification service;
- QR destination/generation, Shopify namespace/source, editor integration or
  production target behavior;
- dedicated Figma, React, Angular, SwiftUI or Compose implementation; or
- promotion from `pilot` to `stable`.

## Consequences

- The repository has one semantic, visual and accessibility source for
  certificate records.
- R11 consumers retain a Ceramics-context slug while receiving canonical
  article naming, description-list semantics, intrinsic response, focus,
  forced-color and reduced-motion behavior.
- Misleading check-seal and QR-only APIs disappear before v1.
- The formal dependency graph records the actual composition.
- Ceramics CSS, Studio CSS and public configuration shrink.
- Record and verification architecture can vary by target without forking the
  neutral Certificate implementation.
- Human review and explicit stability approval remain required.
