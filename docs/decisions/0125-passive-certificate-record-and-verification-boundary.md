# 0125. Passive Certificate Record And Verification Boundary

Status: Accepted

Date: 2026-07-14

## Context

ADR 0080 established that Certificate exposes visible identity fields and
target-owned detail, signature, and verification slots. Targets retain
ownership of certificate records, destinations, and authenticity guarantees.
The initial web source did not fully encode that boundary: verification-link
presentation lived partly in docs-site CSS, metadata responsiveness depended on
the viewport, and the Shopify snippet generated a third-party QR from the
product URL, described it as authenticity verification, and rendered the
product vendor as a signature.

HTML provides native article, heading, description-list, and link semantics for
the presentational surface. Credential, data-integrity, identifier, and digital-
signature standards demonstrate that authenticity or verification requires an
explicit issuer/proof/trust model; a QR image or product URL alone cannot provide
that model. The repository still has an open architecture question about which
target owns certificate records, verification destinations, and guarantees.

## Decision

- Certificate is a passive self-contained record presented as a native article
  associated with its visible contextual heading.
- Only the visible record title is required. Label, attribution, detail groups,
  decorative divider, signature, and verification composition are optional and
  omitted completely when absent.
- Target-owned details use a native `dl` with repeated direct `div` groups that
  contain one `dt` and one `dd`.
- Verification is an ordinary descriptive native link rendered only when a
  target supplies a real destination. Optional QR or other media may appear
  inside that link but never carries the only link purpose.
- Redundant verification media is hidden from the accessible name when adjacent
  visible text already identifies the destination.
- The neutral component and its adapters do not generate QR services,
  verification URLs, credential status, issuer trust, proof semantics,
  signatures, authenticity claims, or network requests.
- A target-authored attribution is not silently converted into a signature.
- The existing six semantic properties remain the public API: `label`, `title`,
  `artist`, `details`, `signature`, and `verification`. Record schemas and proof
  fields remain composition/data concerns until the open architecture decision
  is resolved.
- The metadata grid responds to the Certificate's own inline size through a
  container query. Card measure, inset, border/rule geometry, tracking, media
  size, columns, and threshold remain private composition.
- Canonical source owns complete typography, description-list resets,
  verification-link layout, hover/focus, forced-color behavior, and content
  containment. Exhibit and Studio consume the same renderer and fixture.
- Shopify keeps the current product/metafield mapping as a target fact, localizes
  its labels, and accepts optional explicit signature and verification inputs.
  It no longer synthesizes either one.
- The contract remains `pilot`; automated and visual evidence make it ready for
  human review but cannot promote it to `stable`.

## Open Architecture Boundary

This decision intentionally does not determine:

- which Shopify metafield/metaobject or external service is the authoritative
  certificate record;
- what makes a record verifiable or revocable;
- where a QR/digital link resolves;
- which target may make legal, commercial, cryptographic, or authenticity
  guarantees; or
- whether future printable/downloadable credentials need a separate component.

Those choices require explicit owner and target-architecture input. Their
absence does not block a truthful passive presentation or omission of
verification when no real destination exists.

## Consequences

- Neutral Web, docs and Shopify share native record semantics without a widget
  runtime or synthetic trust signal.
- A consumer can present any authoritative target record through stable semantic
  slots while retaining its own schema, proof and service boundaries.
- Text-only verification remains fully operable when optional media fails or is
  absent, and a record remains meaningful without JavaScript or network access.
- Existing consumers that relied on `.coa__qr` as the whole verification region
  should move the native link to `.coa__verification` and use `.coa__qr` only for
  optional media.
- Shopify no longer makes an external QR-service request or claims that a product
  page proves authenticity. A real target destination must be supplied before a
  verification link appears.
- Owner review is still required for the archival surface, centered type,
  decorative rule, type hierarchy, spacing, verification-mark treatment, and
  any eventual certificate-record architecture.
