# 0192. Passive Account Settings Sections And Target-Owned Persistence

Status: Accepted

Date: 2026-07-17

## Context

Account Settings exposed only a target-owned `sections` slot but rendered its
root as one global Form and assigned both `submit` and `change` behavior to U9.
Account Studio always displayed `Save changes`, placed two Switches behind that
action, omitted submission names from every control, reproduced Input and
Switch markup locally, and announced that settings were saved even though the
docs target performed no account mutation. MDX serialized a different section
inventory and control tree.

The existing Switch contract defines an immediate binary setting. Open UI's
Switch explainer and current Polaris customer-account Switch guidance likewise
distinguish immediate Switch behavior from a deferred Checkbox/Form choice.
HTML Form supplies native successful-control, validation, submitter, reset, and
submission semantics only when an actual Form boundary is selected. HTML
section represents a thematic headed group, while a generic `div` is appropriate
for a wrapper that exists only to arrange those groups.

Targets do not share one account schema or persistence surface. A Web app may
save globally, independently by section, or immediately by control. Current
Shopify hosted profiles, Profile/full-page extensions, Customer Account API
mutations, consent mutations, headless services, and compatibility Liquid are
different architectures with different data, authorization, error, and
lifecycle requirements.

## Decision

- U9 is a passive account-preference section shell. It is not a Form, customer
  schema, authentication gate, request client, persistence adapter, validation
  engine, dirty-state tracker, status region, router, consent ledger, telemetry
  client, or analytics client.
- The Web root is `div.account-settings`. It supplies only logical maximum
  measure, containment, overflow resilience, and section rhythm. A target may
  wrap the root in one canonical Form or place independent Forms inside selected
  sections.
- Required `sections` remains the only public property. Section records,
  titles, descriptions, controls, actions, order, writable fields, save mode,
  and target APIs do not become U9 properties.
- Every child is a native `section.account-settings__section` labelled by one
  non-empty visible contextual heading with a unique ID. Optional visible
  description content has a stable ID. Heading rank remains target/context
  owned.
- Section header, content, and optional control-group classes are composition
  parts. Targets choose whether a related control set uses Fieldset/legend or a
  labelled group. U9 adds no application role or keyboard model.
- U9 has no root `submit`, `change`, controlled value, live region, or
  persistence behavior. Form, Input, Button, Switch, and other canonical
  dependencies retain their native events and controlled/uncontrolled
  strategies.
- Switch remains immediate. A target must not put an immediate Switch behind an
  undifferentiated Save action. A deferred binary selection uses Checkbox or
  another semantically appropriate canonical control inside the owning Form.
- Targets own global versus per-section persistence, writable account truth,
  dirty state, requests, pending/disabled state, validation and user errors,
  optimistic or confirmed updates, retries/conflicts, authentication expiry,
  consent, focus, announcements, refresh, audit history, telemetry, and
  analytics.
- U9 explicitly composes canonical Form, Input, Button, and Switch in the docs
  fixture. Account Studio uses shared Input and Switch artwork and canonical
  Form/Button class contracts instead of copied control anatomy.
- The docs fixture demonstrates one profile Form and one immediate
  notifications group. It is not a default persistence model. Intercepted
  actions update site-only controlled preview state and announce adjacent,
  honest messages that no account data was saved.
- U9 uses one named inline-size container, logical dimensions, private
  maximum-measure/rhythm variables, existing semantic tokens, and no neutral
  runtime. Studio does not override width, control grid, Switch order, icons, or
  action layout.
- Shopify remains `planned`. Current profile/full-page extension, headless
  Customer Account API, explicit compatibility, and omission are separate
  profiles requiring owner selection. Copied theme CSS is not target readiness.
- Registered Figma nodes remain traceability only because they resolve to
  generic Button Studio shells rather than U9 artwork or owner visual approval.
- Contract advances to `0.2.0`, adds Form to common composition dependencies,
  remains `pilot`, and cannot become `stable` without explicit human review.

## Consequences

- U9 no longer promises mutually incompatible save behaviors or misrepresents a
  local docs interaction as persisted customer data.
- Global, section-specific, and immediate target strategies remain possible
  without changing the neutral shell API.
- Form and control semantics, values, validation, focus, motion, forced colors,
  and responsive behavior stay with their canonical owners and can inherit
  future fixes across Exhibit, Studio, Web, and targets.
- Removing U9-specific Studio reordering makes the composed Switch identical to
  its canonical implementation; final aesthetic approval remains human work.
- Shopify and other targets cannot claim readiness until a real account/profile
  architecture, data schema, consent model, and lifecycle are selected and
  evidenced.
- Human review still decides the target section inventory and persistence
  boundaries, immediate/deferred control choices, final measure/divider/rhythm,
  fixture copy, Shopify profile, and corrected U9-specific design evidence.

## References

- <https://html.spec.whatwg.org/multipage/sections.html#the-section-element>
- <https://html.spec.whatwg.org/multipage/forms.html#the-form-element>
- <https://www.w3.org/WAI/tutorials/forms/>
- <https://www.w3.org/WAI/tutorials/forms/grouping/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/switch/>
- <https://open-ui.org/components/switch.explainer/>
- <https://www.radix-ui.com/primitives/docs/components/switch>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/forms/form>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/forms/switch>
- <https://shopify.dev/docs/api/customer/latest/mutations/customerupdate>
