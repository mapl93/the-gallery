# 0161. Issued Gift Card Credential And Target-Owned Capabilities

Status: Accepted

Date: 2026-07-16

## Context

P2 Gift Card Page presents an already-issued stored-value credential. Its
initial neutral implementation nested a second `main` inside the documentation
site, did not reject incomplete required content, duplicated Button styling,
mounted live regions only after an action, exposed inert navigation, treated
printing as a neutral behavior and enabled an ambiguous generic form by
default. Shopify, meanwhile, requires a dedicated non-JSON gift-card template
and supplies real balance, lifecycle, QR and wallet data through its
`gift_card` object.

WAI-ARIA APG and Open UI define no gift-card widget. Native document, Button,
link, figure, description-list and status semantics therefore remain the
interoperable basis. ADR 0084 already keeps gift-card commerce workflows with
the target and retains an optional form boundary without defining its purpose.

## Decision

- P2 is an issued-card credential composition, not a purchase form, redemption
  engine, balance service, account store, ledger, wallet provider, print
  service or QR generator.
- A valid composition requires non-empty `issuer`, target-formatted `balance`,
  `heading`, `instructions`, `codeLabel` and visible selectable `code`.
  Incomplete required content omits the component.
- Optional `visual`, `copyLabel`, `details`, `actions`, `qr` and `form` slots
  expose useful target composition without claiming their backing services.
  The pilot contract therefore has twelve properties.
- The optional form remains only as ADR 0084's pilot compatibility boundary.
  It is absent from the default fixture and does not acquire a neutral purpose,
  endpoint or result lifecycle. Whether it belongs in the stable API remains a
  human architecture decision.
- Copy and all other actions compose canonical Button. Navigation uses a
  native anchor with Button presentation. Optional form fields compose
  canonical Input and retain native names and constraint validation.
- The visible code remains selectable independently of clipboard support.
  Targets attempt clipboard access only after native activation and update a
  pre-existing polite status region with success or selection-fallback text.
- QR media is a figure with visible purpose text. Its generated graphic is
  assistive-hidden because the same code remains readable text.
- Exhibit and Studio share the same renderer and fixture as a contextual
  labelled `section` inside the documentation main. Standalone targets own
  their one document-level main landmark.
- P2 uses logical properties and a named inline-size container. Card ratio,
  split ratio, measures, tracking and breakpoints stay private composition.
  Studio owns fixture artwork only, not parallel layout or behavior.
- P2 adds zero neutral runtime, listener, request, timer, observer, formatter or
  asset. The permanent Pages + Coming Soon ceiling remains `5.3 KiB`
  (`5,427 B`) gzip.
- Shopify implements a dedicated `templates/gift_card.liquid` document. It maps
  the platform object, current balance, lifecycle, expiration, QR identifier,
  Apple Wallet URL, code and shop identity, and isolates copy, QR and print
  behavior in a target-only asset.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  may prepare human review but cannot approve final visual values or stability.

## Target Translation

- Neutral Web renders supplied content and optional target capabilities with
  native semantics and canonical Button/Input dependencies.
- Shopify owns the complete gift-card document, real `gift_card` data, QR
  generation, Wallet capability, localized lifecycle facts and printing.
- Webflow consumes source-identical P2 CSS. React and Angular remain thin
  semantic wrappers with target callbacks. Figma is a visual target. SwiftUI
  and Compose translate to native credential, copy, QR and wallet primitives.

## Open Human Boundary

This decision does not approve the final split, ratio, artwork, scrim,
typography, spacing, code treatment, QR placement, action hierarchy or copy. It
does not decide whether the form survives into the stable API, add dedicated
detail properties, define purchase/redemption/balance services, approve the
registered generic Button Figma frame as P2 evidence or promote P2 to stable.

## Consequences

- Required issued-card information and optional capabilities now have explicit
  semantic ownership.
- Button/Input markup and behavior are no longer duplicated by the page.
- Documentation parity no longer creates an invalid nested main landmark.
- Shopify can satisfy its platform-specific gift-card requirements without
  leaking Liquid objects or target runtime into neutral Web.
- ADR 0084 remains authoritative for the unresolved form and workflow boundary;
  this ADR refines the issued-card API without resolving those open decisions.
