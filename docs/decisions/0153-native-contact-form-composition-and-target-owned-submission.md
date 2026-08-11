# 0153. Native Contact Form Composition And Target-Owned Submission

Status: Accepted

Date: 2026-07-15

## Context

S10 Contact Form was a two-column visual shell with incomplete semantic and
target behavior. Its required form had no accessible name, its native controls
had no submitted names or autocomplete hints, and its email contact detail was
passive text. The docs target intercepted a valid submission and announced that
the message had been received even though no request occurred. That form-level
status was then associated only with email as if it described that field.

The canonical CSS also failed as an embedded component. At an XL viewport, a
direct `320px` root consumed `160px` of physical padding on both sides, reduced
the grid to a `0px` track, and produced an almost `4,000px` tall specimen.
Viewport and Studio-only container rules masked the source failure. Site CSS
duplicated form containment, Textarea sizing, message margin, and stacking.

ADR 0082 already establishes that Contact Form composes native form content
from Input, Textarea, and Button and must not recreate their semantic properties
or states. The refined Input, Textarea, Button, and Form contracts establish
native name/value/constraint ownership, controlled/uncontrolled boundaries,
form submission, action state, and target-owned validation response.

HTML form, section, address, label, constraint-validation, name, and autocomplete
semantics; WAI form and notification guidance; Open UI field research; Radix
Form; Polaris form/field guidance; and Shopify's documented contact form all
support a native composition. They do not define a cross-target Contact Form
widget state machine or authorize a simulated success response.

The Studio design reference cannot resolve aesthetics: both registered S10
nodes render the Button pilot. It remains evidence of an invalid trace rather
than approval of Contact Form presentation.

## Decision

- Contact Form remains a separately discoverable `pilot` section and a thin
  context wrapper around one required native form composed from canonical Input,
  Textarea, and Button.
- S10 owns optional introductory title/description, optional target-owned
  contact details, one required localized `formLabel`, form placement, and
  intrinsic section layout only.
- A non-empty title creates a native `section` named by the visible heading. An
  untitled instance uses a generic `div`. Description alone never creates an
  unnamed section landmark.
- The information wrapper is omitted when title, description, and details are
  all absent. Missing form composition or missing/blank `formLabel` invalidates
  the component and omits the complete wrapper.
- `formLabel` maps to the native form's accessible name across targets. It does
  not replace visible field labels or required-status instructions.
- Contact details are an ordered target-owned list. Email and telephone details
  use native links. An `address` wrapper is used only when the content is
  relevant contact information for the owning document/article; arbitrary
  metadata does not use `address`.
- Input and Textarea remain the only native value, name, constraint, validity,
  message, disabled/read-only, focus, and form-data owners. Button remains the
  only submit action, disabled, busy, activation, and focus owner.
- S10 exposes no field schema, aggregate form value, validation variant, error,
  endpoint, method, provider, CAPTCHA, consent, busy, success, retry, breakpoint,
  column, measure, or target-record property. It exposes no events and owns no
  controlled/uncontrolled state.
- The target owns action, method, submission, pending, confirmed success,
  failure, retry, duplicate suppression, anti-abuse, persistence, analytics,
  privacy, retention, and response focus/announcement policy.
- A target may render an optional `.contact-section__status` inside the form.
  Its semantics follow timing: confirmed asynchronous success may use status;
  dynamically presented blocking errors may use alert or a linked form error
  summary. Form-level response is never associated to only one field.
- The docs fixture uses a short email/message form with native required/type
  validation, stable names, and email autocomplete. Its target-local submit
  handler performs no request and truthfully announces that the preview did not
  send a message.
- Canonical CSS moves inline spacing from root physical padding to a bounded
  container-relative inner inset, uses an intrinsic logical grid, complete
  semantic typography, logical dimensions, and source-owned containment. S10
  viewport and Studio-only layout/field repairs are removed.
- Exhibit and Studio continue to use one `SectionsStudio` renderer, fixture,
  target-local child state, validity rule, initial DOM, and canonical CSS.
- Shopify gains a localized addable section using `{% form 'contact' %}`,
  platform field names, translated labels, server errors, confirmed success,
  canonical classes, and zero S10 JavaScript. Email and message are required;
  optional name/telephone and merchant contact details remain target settings.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  cannot approve the visual candidate, correct the missing owner reference, or
  promote S10 to `stable`.

## External Evidence

- HTML native forms construct entries from named controls, provide constraint
  validation, implicit submission, and target-configured action/method.
- HTML `section` represents thematic content normally identified by a heading;
  a generic styling wrapper should use `div`.
- HTML `address` represents relevant contact information for the nearest
  article/body and must not contain unrelated metadata.
- WAI recommends visible associated labels, concise field sets, native controls,
  clear required instructions, corrective validation, and truthful submission
  notifications.
- Open UI defines no interoperable Contact Form composite; field anatomy remains
  the stable research boundary.
- Radix Form layers field/label/control/message/submit composition on native
  validity and separates client/server validation.
- Polaris form guidance groups related specialized fields, preserves implicit
  submission, uses one submit action, and keeps processing target-owned.
- Shopify documents `{% form 'contact' %}`, `contact[email]`, unique optional
  contact field names, native required attributes, `form.errors`, and confirmed
  `posted_successfully?` state.

These sources support the semantic and ownership boundary. They do not approve
The Gallery's measure, typography, column balance, detail icons, link style,
field inventory, provider, privacy policy, or final commercial identity.

## Performance

Contact Form has a `0 B` neutral runtime budget. Native form submission,
constraint validation, field editing, autofill, and Button activation require no
S10 listener, observer, request, timer, layout read, custom element, or asset.

The docs target may use React state for controlled Input/Textarea evidence and a
truthful intercepted preview. That state is not neutral runtime and cannot be
exported as a Contact Form store. Shopify uses the platform contact lifecycle
with zero S10 JavaScript.

The permanent Sections ceiling remains `6,861 B` deterministic gzip. S10 must
recover or preserve headroom instead of raising the ceiling. Global Web CSS and
shared runtime keep their existing explicitly reported program gaps.

## Target Translation

- Neutral Web uses a conditional section/div, optional information/list,
  accessible native form, canonical fields/action, and native validation.
- Shopify uses one dedicated editor section and the platform contact form
  endpoint, field names, server errors, success state, and translations.
- Webflow uses its native form/service integration while retaining canonical
  class and child-component boundaries.
- React and Angular may control each child value or use child defaults and then
  handle one form submission. They must not mirror a second S10 value object.
- Figma presents optional contextual content and Input/Textarea/Button instances
  with documented visual states only after a corrected S10 owner frame exists.
- SwiftUI and Compose use target-native fields, validation, action, response,
  and service lifecycle.

## Open Human And Product Boundary

This decision intentionally does not approve:

- final maximum measure, column balance, density, section rhythm, typography,
  contact-detail icons, link treatment, field appearance, or action width;
- a fixed neutral field inventory beyond required canonical form composition;
- provider, endpoint, CAPTCHA, spam, consent, privacy, retention, analytics,
  duplicate-submission, error-summary, retry, or response-focus policy;
- the current Figma reference, which points to Button rather than S10;
- whether Contact Form remains a separately discoverable product after consumers
  can compose Form and fields directly;
- framework/native implementations or a shared target contact record; or
- promotion from `pilot` to `stable`.

## Consequences

- Assistive technology receives a named form landmark, visible field labels,
  stable named controls, native constraints, and truthful response status.
- Consumers retain one native value and validity owner per field and one target
  submission lifecycle instead of duplicated S10 state.
- Narrow embedded instances retain a real content track and no longer depend on
  the viewport or docs CSS for stacking.
- Exhibit and Studio remain exact projections of one renderer and fixture.
- Shopify gains a real contact integration instead of copied CSS or a simulated
  endpoint.
- The wrong Figma trace remains explicit and cannot silently certify aesthetics.
- Human review remains responsible for visual identity, product value, target
  policy, corrected reference evidence, and stability.
