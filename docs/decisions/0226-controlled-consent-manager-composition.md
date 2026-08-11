# ADR 0226: Controlled Consent Manager Composition

- Status: Accepted
- Date: 2026-07-20
- Resolves the open identity and composition choices in ADR 0171
- Related: ADR 0220 and `docs/refinement/owner-decision-responses.md`

## Context

G9 entered refinement as “Cookie Consent” while its registry promised a GDPR
banner and preferences modal, its contract exposed one generic message/actions
slot, its renderer supplied neither Accept nor Reject, and its CSS moved a
focusable fixed surface offscreen with a transform. It was simultaneously an
incomplete notice, consent mechanism and preference editor.

The owner selected G9-A: a controlled Consent Manager composition. Consent is a
target/legal/provider state, not a CSS state. Official privacy guidance requires
a meaningful positive choice and easy access to refuse non-essential use. APG
requires a complete named, focus-contained, dismissible and focus-restoring
modal lifecycle. Shopify's Customer Privacy API already owns region-derived
banner eligibility, visitor consent, permitted processing and consent mutation.
Those sources constrain the component but do not define universal copy,
categories, placement, provider or persistence.

## Decision

- The public component name becomes **Consent Manager**. The registry slug
  `cookie-consent` remains only as a documented pre-v1 migration identifier; no
  parallel Cookie Consent implementation remains.
- The first layer is a controlled, visible-title section in normal document
  flow. It exposes a localized description, a real canonical policy Link and
  explicit canonical Button requests for Accept, Reject and Customize.
- Accept, Reject and Customize receive equal interaction access. Presentation
  may be refined after human review, but the contract cannot collapse Reject
  into a second layer or infer consent from dismissal, silence, scrolling or
  continued use.
- Detailed preferences compose canonical Modal, including its complete naming,
  initial-focus, Tab/Shift+Tab, Escape, close and focus-restoration lifecycle.
  Consent Manager adds no second overlay or focus manager.
- Preference records and values are target-supplied through canonical choice
  controls. The component defines no universal categories, required cookies,
  defaults, legal basis or value persistence.
- `open`, `preferencesOpen` and `busy` are controlled target projections.
  Closed content is omitted or uses native `hidden`; transform-only hiding is
  removed. Optional feedback is a target slot because pending, result, error,
  retry and announcement semantics depend on real provider outcomes.
- Neutral Web request behavior is native Button activation/callback composition.
  The base performs no provider call, network request, cookie/storage access,
  region lookup, resource blocking, analytics, audit recording or compliance
  claim.
- Fixed/sticky placement is not a component property. A target choosing it owns
  page reservation, safe areas, header/footer collisions, stacking and
  focus-not-obscured evidence.
- G9 remains `pilot`; this ADR authorizes an implementation candidate for human
  review, not legal approval, visual approval or stability promotion.

## Public Contract

Stable cross-target content inputs are `title`, `description`, `policyLabel`,
`policyHref`, `acceptLabel`, `rejectLabel`, `customizeLabel`,
`preferencesTitle`, optional `preferencesDescription`,
`closePreferencesLabel`, and `saveLabel`. Composition inputs are required
target-owned `preferences` and optional target-owned `feedback`. Controlled
state inputs are `open`, `preferencesOpen`, and `busy`.

Accept, Reject, Customize, Save and Close are semantic requests/outputs, not
consent values. Category identifiers, provider payloads, cookies, storage keys,
jurisdiction, error codes, timestamps and audit records are intentionally not
component properties.

## Canonical Dependencies

- Button owns native activation, focus, disabled and loading presentation.
- Link owns navigation and focus presentation for the policy destination.
- Modal owns the detailed-preferences overlay and focus lifecycle, including
  canonical Close Button composition.
- Checkbox is the certified choice-control example. Targets may map an accepted
  category semantic to another canonical choice control without adding a G9
  field implementation.

G9 CSS provides only first-layer and preferences-content layout around these
dependencies.

## Performance And Lifecycle

The neutral implementation retains zero provider, storage, network and consent
runtime. Request callbacks belong to target/framework adapters. The fixed,
transform-driven banner transition and duplicated preference-control fragments
are removed. The final G9 slice is `3,412 B` raw / `903 B` deterministic gzip;
Marketing changes from `5,073 B` to `5,162 B` gzip and generated Neutral Web
component CSS from `69,242 B` to `69,401 B`. Permanent ceilings are not raised;
both program gaps remain documented in the global performance report.

## Target Translation

- Neutral Web uses semantic HTML, canonical CSS and native target-bound Button
  handlers with zero Consent Manager runtime.
- Shopify remains planned until an explicit target surface is selected. That
  adapter must project `shouldShowBanner`, visitor consent, allowed processing
  and `setTrackingConsent` results from Shopify Customer Privacy rather than
  setting its own cookies or deriving geography.
- React and Angular expose controlled props and callbacks around the same
  composition; they do not create an uncontrolled consent store.
- Figma represents first-layer, busy, closed and preferences-open visuals only.
- SwiftUI and Compose map the target privacy service to native modal and choice
  controls; web-cookie categories do not transfer automatically.

## Consequences

- The component is honest about what presentation can and cannot certify.
- Closed-state focus leakage and fixed-placement obstruction are removed from
  canonical source.
- Exhibit and Studio can demonstrate target-controlled requests and canonical
  dependencies without presenting fixture categories as defaults.
- The first Shopify/provider surface, legal copy and final visual hierarchy
  remain explicit target/human decisions.

## Evidence Considered

- <https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/>
- <https://html.spec.whatwg.org/multipage/interaction.html#the-dialog-element>
- <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html>
- <https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/>
- <https://shopify.dev/docs/api/customer-privacy>
