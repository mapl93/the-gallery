# 0084. Page Semantic Source And Open Boundaries

Status: Accepted

Date: 2026-07-12

Superseded in part by ADR 0144 for Coming Soon: X1 is now the public page only,
password access is an independent Shopify target surface, direct Input/Button/
Link dependencies are recorded, and password presentation hooks are removed.
The Countdown question remains open.

## Context

Coming Soon, 404 Page, Gift Card, Policy Page, and Checkout Progress had
structurally valid pilot contracts, but their anatomy was mechanically broad and
they did not expose reviewed semantic properties. The shared `pages.css` source
also lacked consistent containment, focus, touch-target, narrow-viewport, and
reduced-motion safeguards.

These page compositions sit near target-owned systems: authentication,
newsletter services, gift-card commerce, legal-content management, and checkout
routing. Improving the neutral source must not assign those systems to the page
components by inference.

## Decision

### The page family remains a pilot

All five contracts advance to `0.2.0` and remain `pilot`. Their semantic APIs are
limited to source-backed text, attributes, and composition slots. Automated
validation does not promote any contract to `stable`.

### Coming Soon exposes composition, not authentication

Coming Soon exposes optional background media, brand content, editorial text,
social links, a form region, password-access presentation hooks, and footer
content. Its password trigger and overlay classes remain CSS evidence only.

The consuming target or a dialog dependency owns authentication, visibility,
focus trapping, dismissal, backdrop behavior, and focus restoration. The
contract does not introduce an authentication mode, password value property, or
authorization result state.

Coming Soon does not gain countdown anatomy or behavior. Whether it composes the
standalone Countdown component and who owns timer calculation remain open.

ADR 0144 later removes the password presentation hooks entirely after
repository and Shopify target evidence confirms an independent password
template. This historical decision no longer authorizes those hooks.

### Value-entry forms compose canonical field validation

Coming Soon and Gift Card form slots use native forms and compose canonical
Input and Button anatomy. Their value-entry fields preserve Input's visible
label, associated message, Default, Error, Success, Warning, hover,
focus-visible, disabled, `aria-invalid`, and `aria-describedby` obligations.

The page contracts do not duplicate field variants or assign submission
backends, pending state, response placement, retry behavior, or endpoints.
Registry dependency changes are outside this decision's ownership, so no formal
dependency inventory is added by this pass.

Gift Card receives optional `.gift-card__form` and `.gift-card__field` layout
hooks. They size an otherwise target-owned form without defining whether it
checks, redeems, purchases, or performs another operation.

### Recovery and commerce data remain target-owned

404 Page exposes explanatory content plus optional illustration, search,
recovery-link, and suggestion slots. Search handling, routes, and suggested
records remain target-owned.

Gift Card exposes target-formatted amount and balance strings, a selectable
code, copy-action naming, target-owned actions, QR media, and the optional form
slot. It does not calculate balance, refresh commerce data, or define purchase
or redemption behavior.

### Policy content is one semantic document slot

Policy Page exposes title, optional visible update date, optional table of
contents, and required semantic body content. The target preserves headings,
lists, links, tables, media, dates, and in-page identifiers. The contract does
not define a CMS schema, revision system, localization pipeline, policy type
inventory, or source API.

### Checkout Progress is informational

Checkout Progress exposes an accessible sequence label and a required ordered
step slot. Targets supply complete, current, and upcoming statuses. Only the
current step uses `aria-current="step"`, and completion requires a non-color
cue.

The contract does not make steps links or buttons and does not own routing,
visited state, checkout state synchronization, or navigation availability.

ADR 0163 later refines this boundary by making P4 a passive checkout-context
profile of canonical Steps, requiring strict label/content omission, using a
named component container for narrow stacking and recording Shopify native
checkout as a future Checkout UI Extension mapping rather than theme Liquid.
It does not resolve completed-step navigation or checkout-state ownership.

### Neutral-web CSS receives bounded hardening

Canonical `pages.css` now uses existing public tokens to:

- contain long text, codes, media, rich policy content, and flexible regions;
- expose visible focus on fields, buttons, and links;
- retain minimum touch targets for page actions;
- stack Gift Card actions and Checkout Progress safely at narrow widths;
- keep Checkout Progress labels visible in source order; and
- remove page-owned transitions under reduced motion.

No new token, variant, JavaScript behavior, target adapter, or generated output
is introduced.

## Open Product Questions

The following questions remain unresolved and block affected contracts from
promotion to `stable`.

### Password and authentication ownership

- Resolved for neutral X1 by ADR 0144: password access is a separate
  target-native surface and not Coming Soon anatomy.
- Password authentication, security, errors, lockout, dialog/inline UX, focus,
  dismissal, and restoration remain owned and reviewed by that target surface.

### Countdown behavior

- Does Coming Soon compose Countdown at all?
- Which layer owns target time, time zone, cadence, correction, expiration, and
  post-expiration content?

### Gift-card workflows

- Which target owns balance lookup, freshness, and account association?
- Are redemption, balance checking, purchase, adding to a wallet, and printing
  separate capabilities, and which of them belong on this page?
- What action or form, if any, is valid as a target-agnostic default?

### Policy CMS model

- Which system supplies policy content, revisions, effective dates,
  localization, table-of-contents data, and stable section identifiers?
- Are policy types and required metadata shared across targets or entirely
  target-specific?

### Checkout routing and navigation

- Is Checkout Progress always informational, or may completed steps become
  navigable in some targets?
- Which layer owns route availability, transitions, visited state, validation
  gates, and synchronization with checkout state?

## Consequences

- Page contracts now expose useful neutral-web semantics without freezing
  authentication, timer, commerce, CMS, or routing decisions.
- Coming Soon and Gift Card forms share the established field-validation
  contract instead of inventing page-specific validation variants.
- Narrow page compositions remain contained and keyboard focus is visible on
  the owned `pages.css` interaction surfaces.
- Registry, Open Questions, MDX, Studio, JavaScript, target adapters, Shopify,
  and `site/dist` remain unchanged by this decision.
