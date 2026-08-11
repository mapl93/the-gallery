# 0164. Native Newsletter Composition And Open Response Lifecycle

Status: Accepted

Date: 2026-07-16

Superseded in part by ADR 0251, which accepts target-owned response lifecycle
for neutral Newsletter v1.

## Context

G2 Newsletter Signup already declared Input and Button dependencies and a
target-owned submission response boundary in its pilot contract, but the
implementation did not honor that boundary consistently.

The shared docs renderer allowed a required form to disappear while leaving an
empty Newsletter section, always emitted an empty required title, and announced
that an address was “on the preview list” without sending a request. The same
form-level simulated result was also used as Email field guidance.

Canonical Marketing CSS applied flexible sizing to the native Email field
instead of the canonical Input root. Studio added private CSS to repair that
composition. When the viewport media query stacked the form, the repaired
`16rem` flex basis became vertical and produced a large empty gap before the
Button. Embedded components also followed browser viewport width instead of
their own container.

Shopify already had a real `customer` form, but its native form did not own the
`.newsletter__form` contract class, it used a visually hidden-only accessible
name instead of canonical Input anatomy, reused a fixed id, hardcoded English
interface copy and omitted server errors and confirmed success. The contract
therefore reported Shopify as planned despite a dedicated section.

ADR 0081 intentionally leaves Newsletter pending/success/error/retry ownership
open. This decision must refine only the stable native composition and must not
turn one target's response into a neutral state machine.

## Decision

- Newsletter remains a separately discoverable `pilot` Marketing composition.
- Contract version advances to `0.3.0` and retains four semantic properties:
  required `title`, optional `description`, required `form` composition and
  optional target-authored `note`.
- A non-empty visible title and a complete form are render preconditions.
  Invalid required composition is omitted instead of producing an unnamed or
  empty section.
- The root is a native title-labelled section. The form is a native form named
  by the same visible heading; it does not require a duplicate public label.
- The form composes one complete canonical Input and one canonical submit
  Button. Input remains the only Email value, default value, name, autocomplete,
  constraint, validity, message, focus and disabled/read-only owner. Button
  remains the activation, disabled, busy and focus owner.
- G2 owns no aggregate controlled/uncontrolled model, value, validation state,
  event, provider or response lifecycle.
- `.newsletter__status` is an optional target-owned form-result hook. It adds no
  neutral property or state. Timing-appropriate status/alert semantics and
  truthful content remain target responsibilities.
- Form-level response feedback is never reused as the Email field's guidance or
  validation message.
- The shared docs fixture controls the child Email only for local evidence. A
  valid intercepted submit performs no request and truthfully announces
  `Preview only: no subscription was sent.` Editing clears that target-local
  result. Native required/email validation runs before the handler.
- Canonical CSS owns Input/Button placement, complete typography, logical
  containment, private `32rem` measure and root-container response. Studio-only
  Newsletter form/status repair CSS is removed.
- A root at or below the private container threshold stacks the form and makes
  the Button full width. A sufficiently wide root uses an Input/Button row.
  Browser viewport width does not decide the layout.
- Existing semantic tokens supply surface, text, complete H3/body/caption type,
  section inset and element rhythm. Private measure/threshold are not promoted
  to consumer API. Newsletter stops claiming Input's disabled color token.
- Semantic line-height tokens remain the normal baseline; private relative
  `em` minimums prevent overlap when consumers enlarge only the title, body or
  caption size to 200%. These safeguards are composition internals, not API.
- Shopify's existing section becomes the implemented target adapter. It uses a
  localized unique native `customer` form, platform field names, visible Input
  label, preserved value, associated server error, confirmed success, merchant
  title/description/note settings and zero Newsletter JavaScript.
- The Newsletter-specific pending/success/error/retry product question remains
  open. This decision recommends target ownership for v1 based on the accepted
  Gallery form pattern, but does not approve that architecture without owner
  input.
- Exhibit and Studio continue to use one `MarketingStudio` renderer, fixture,
  target-local child state, initial DOM and canonical CSS.
- No generated docs output under `site/dist` is rebuilt.

## External Evidence

- HTML supplies native Email value, constraint validation, form-data,
  submission and implicit keyboard behavior.
- WAI form guidance requires visible associated labels, concise necessary
  fields, accessible validation and truthful result notifications.
- APG defines no Newsletter widget or custom keyboard model.
- Open UI compares field/control anatomy but defines no interoperable Newsletter
  service composite.
- Radix Form composes label, control, message and submit over native validity
  while keeping client/server results distinct.
- Polaris separates Form, Email field and Button and leaves processing to its
  target surface.
- Shopify documents the `customer` form specifically for newsletter email
  capture and platform `contact[email]` mapping.

These sources support native dependency composition and target processing. They
do not approve The Gallery's visual candidate, provider, consent model or final
response lifecycle.

## Performance

Newsletter retains a `0 B` neutral component-runtime budget. It owns no
listener, observer, timer, request, client, formatter, custom element or bundled
asset. Native form/constraint behavior and target submission require no neutral
script.

Marketing remains subject to its permanent `4.1 KiB` (`4,198 B`) gzip ceiling.
The global Neutral Web CSS and shared runtime keep their existing explicitly
reported program-level gaps; this decision does not raise either ceiling.

## Target Translation

- Neutral Web maps the title-labelled section, native form, canonical
  Input/Button, optional note and optional target result hook.
- Shopify maps the platform customer endpoint, field name/tags, localization,
  server error, confirmed success and merchant content settings.
- Webflow uses its form service with canonical dependency presentation.
- React and Angular may control the child Input or use its native/default value;
  the target handles one form submit and result lifecycle.
- Figma maps approved content/form/note slots and semantic appearance tokens
  only after a corrected component-specific visual reference exists.
- SwiftUI and Compose use native Email entry, action, validation and service
  lifecycle rather than copied DOM/private geometry.

## Open Product And Human Boundary

This decision intentionally does not approve:

- neutral versus target ownership of pending, success, error, retry and
  duplicate-submission state;
- inline, replacement, navigation or other result placement;
- provider, endpoint, double opt-in, consent evidence, privacy, retention,
  CAPTCHA, throttling, analytics, reset/preservation or error-summary policy;
- final measure, threshold, inset, hierarchy, type, surface, field icon,
  Button width/alignment, note/status treatment or copy;
- the current Figma trace, which points to Button rather than G2; or
- promotion from `pilot` to `stable`.

## Consequences

- G2 has one native value/validity owner and one target submission owner rather
  than mirrored state.
- Docs no longer make a false commercial success claim.
- Input/Button placement and narrow behavior are canonical and intrinsic rather
  than Studio- or viewport-owned.
- Shopify becomes a truthful target-native implementation without contaminating
  the base contract with Liquid or provider state.
- The remaining Newsletter response decision and final visual approval stay
  visible and block human stability-review readiness.
