# 0144. Public Coming Soon And Independent Password Surface

Status: Accepted

Date: 2026-07-15

## Context

Coming Soon entered refinement as `Coming Soon / Password`. Its neutral contract
and CSS combined a public editorial page, customer signup form, password
trigger, modal, backdrop, close action and authentication presentation hooks.
The shared docs renderer did not implement those password hooks: its trigger
only wrote a status message and its optional entry slot rendered inert text.
Canonical CSS also restyled Input and Button instead of composing their
established contracts.

The Shopify target already contains a stronger source fact. Public Coming Soon
is selected by `coming_soon_enabled` and rendered by
`sections/coming-soon.liquid` without a password. Storefront password access is
rendered by the independent password layout/template/content and uses Shopify's
distinct `storefront_password` form. Official Shopify documentation defines the
password template and customer signup as separate form responsibilities.

ADR 0084 intentionally left password composition versus built-in ownership
open. The component-refinement goal requires canonical dependency composition,
truthful implemented APIs and no unresolved architecture hidden behind inert
controls.

## Decision

- X1 is named `Coming Soon` and represents only the public editorial launch or
  maintenance page.
- The neutral contract removes password trigger, entry, modal, backdrop, panel,
  close, title, open-state and authentication hooks without aliases.
- Shopify's password layout/template/content remains a separate target-native
  surface. It is not certified as X1 and does not add password properties back
  to the neutral page.
- Coming Soon adds direct canonical `input`, `button`, and `link` dependencies.
  The page owns only form and navigation placement. Dependencies retain value,
  validation, focus, disabled/loading, navigation and interaction semantics.
- The public API contains required `heading` plus optional
  `backgroundMedia`, `brand`, `subtitle`, `body`, `socialLinks`, `formHeading`,
  `formDescription`, `form`, and `footer`.
- A non-empty heading is a render precondition. Invalid required composition is
  omitted rather than emitted as an empty page shell.
- Background media is atmospheric and decorative. Essential information stays
  textual and decorative images use an empty alternative.
- Social destinations use canonical Link and real target-owned `href` values.
  Prevented placeholder navigation is not a contract state.
- Native forms compose Input and Button and preserve native constraint
  validation. Targets own purpose, fields, endpoint, consent, pending,
  success/error/retry, analytics, persistence and publication workflow.
- The optional form region and its label relationship exist only when relevant
  content exists. A missing optional form heading cannot create a dangling id.
- Coming Soon establishes a named inline-size container and uses logical
  properties. Container width, not browser viewport or Studio-only overrides,
  selects split versus editorial-first stacked layout.
- Countdown remains absent. Whether a future Coming Soon composition depends
  on canonical Countdown, and who owns target time, timezone, cadence,
  correction, expiry and post-expiry behavior, remains open.
- Contract version advances to `0.3.0` and remains `pilot`.

## External Evidence

- The HTML Standard preserves native missing-value and email type-mismatch
  validation for required email inputs.
- WAI form guidance requires visible labels, useful instructions, validation
  and truthful success/error notification.
- Shopify documents the password template, `storefront_password` form and
  optional customer signup as distinct target capabilities.
- Polaris form guidance composes native form, TextField and Button semantics.
- Radix Dialog demonstrates the focus, naming, containment, Escape and
  restoration obligations that inert styling hooks did not satisfy.
- Open UI has no Coming Soon primitive that would assign a new custom role or
  countdown/password mode.

These sources establish semantic and target boundaries. They do not approve The
Gallery's final page aesthetic, copy, campaign strategy or stable status.

## Figma Evidence

The registered file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
`1020:480` are the generic Button/Studio shell. Direct Plugin API inspection and
screenshot review found no Coming Soon layout, background, form, social,
password, countdown or responsive artwork. The reference supports shared
Exhibit/Studio methodology only; no component-specific visual fact is inferred.

## Performance

Coming Soon adds no neutral runtime. Removing password overlay CSS and duplicate
field/action styling reduces the Pages + Coming Soon family while canonical
Input, Button and Link retain their existing budgets and behavior.

The permanent family ceiling remains `5.3 KiB` (`5,427 B`) gzip. This decision
creates no new listener, observer, timer, request, auth store, countdown loop,
formatter, layout read, animation, icon or neutral asset.

## Target Boundary

- Neutral Web uses contextual document structure, decorative media, required
  heading, optional editorial content, canonical Links and a target-owned form
  composed from canonical Input and Button.
- Shopify public Coming Soon maps merchant settings and the customer form. The
  theme layout supplies the one `main` and a valid skip-link target.
- Shopify password access remains in its independent target template and
  composes canonical Modal, Close Button, Input and Button styling with
  target-owned focus, inertness, dismissal and form behavior.
- React and Angular use thin page composition over canonical dependencies and
  target-owned form services.
- Figma uses an approved page frame containing reviewed dependency instances
  after component-specific human visual review.
- SwiftUI and Compose use target-native document, form and navigation
  components while preserving publication, auth and countdown ownership.

## Open Human And Product Boundary

This decision intentionally does not approve:

- final split ratio, measure, alignment, typography, spacing, scrim, brand,
  social, form or footer presentation;
- target copy, campaign strategy, form purpose, fields, consent, backend,
  response placement, analytics or persistence;
- Countdown composition or its full clock and expiry lifecycle;
- Shopify password-page modal versus inline stable UX, authorization policy,
  errors, lockout or security behavior;
- launch scheduling, CMS/source ownership, localization or editor preview;
- dedicated Figma, React, Angular, SwiftUI or Compose implementation; or
- promotion from `pilot` to `stable`.

## Consequences

- Consumers see one truthful public Coming Soon contract instead of an
  authentication-shaped compatibility surface.
- The dependency graph records Input, Button and Link composition at depth 1.
- Exhibit and Studio no longer present inert password controls, missing
  fragments, invalid email success or dangling optional labels.
- Public Shopify Coming Soon preserves native labels, validation, feedback and
  skip navigation. Password access remains functional but independently scoped.
- Responsive layout is intrinsic and shared by Exhibit, Studio and targets.
- Countdown, final visual identity, form service, password UX and explicit
  stability approval remain visible decisions.
