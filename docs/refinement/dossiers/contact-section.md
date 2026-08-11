# Component Dossier: Contact Form

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/contact-section.contract.json`

## Recommendation

Keep Contact Form as a container-responsive context wrapper around one required
native form composed from canonical Input, Textarea, and Button. S10 should own
only an optional introduction, optional contact details, a required accessible
form label, form placement, and neutral section rhythm. Each field keeps its
native value, name, constraints, validation, message, disabled/read-only state,
focus, and controlled/uncontrolled strategy. The target owns action, method,
submission, pending, success, error, retry, anti-abuse, persistence, and
provider policy.

Render a native `section` named by a non-empty visible title; otherwise render a
generic `div`. Omit the optional information column when title, description,
and details are all absent. Omit the complete component when its required form
composition or required accessible form label is absent. Contact details should
use a native list and actionable `mailto:`/`tel:` links; `address` is appropriate
only when the supplied details are relevant contact information for the owning
document or article.

The docs fixture should remain a truthful, non-networked demonstration: native
constraint validation runs first, successful local interception announces that
the preview did not send a message, and both fields retain stable submitted
names. Shopify can implement the real service lifecycle with
`{% form 'contact' %}`, platform field names, translated success/error output,
and canonical CSS classes without target JavaScript.

No parallel field API, form value object, validation state, target endpoint,
breakpoint, layout mode, or service status belongs on S10. Human review must
approve the final measure, two-column balance, density, typography, detail
icons/links, and form treatment before stability promotion.

## Purpose And Limits

- Gives one page section a clear route for contacting the relevant merchant,
  gallery, studio, maker, or service.
- Places optional contextual copy and contact channels beside one short native
  form focused on a single contact purpose.
- Supports general enquiries, work availability, commissions, appointments,
  order questions, and similar target-defined contact intents.
- Does not become a CRM, inbox, chat widget, support-ticket system, appointment
  scheduler, review form, commission workflow, newsletter signup, authentication
  form, checkout form, or generic Form replacement.
- Does not define provider, endpoint, HTTP method, CAPTCHA, consent, attachment,
  rate-limit, analytics, retention, privacy, moderation, or spam policy.
- Does not promise delivery or success without a confirmed target response.
- Content governance, localization, field selection, required/optional policy,
  sanitization, validation copy, data handling, and response focus are
  target-owned.

## Current Gallery Baseline

- Registry identity `S10`, category `sections`, selector `.contact-section`,
  dependencies Input, Textarea, and Button, dependency depth `2`, and review
  order `170`.
- Contract `0.2.0`, `pilot`: root/grid/info/title/text/detail/form anatomy;
  properties `title`, `description`, optional `details`, and required `form`;
  dependency-owned field/action behavior; seven partial public tokens; Web CSS
  implemented; Shopify planned.
- CSS applies full physical `--space-layout-container` padding to the root,
  fixes two equal columns plus `48px` gap, uses a viewport breakpoint, hardcodes
  `32/24/20/16/12/2px`, contains an empty rule, and omits complete body/heading
  typography and native margin resets.
- At an XL viewport, a direct `320px` root resolves to `160px` inline padding on
  both sides. Its grid has a `0px` track and the specimen grows to more than
  `3,900px` tall. Studio's container override masks this canonical failure.
- The docs form has no accessible landmark name, and its email/textarea have no
  submitted `name` or `autocomplete` values. Contact details are passive spans,
  including the email address.
- Native required/email constraint validation correctly blocks the local submit
  and focuses email first. On a valid local submission, the fixture falsely
  announces that the message “was received”; it associates that form-level
  status only to email and leaves Message disconnected.
- The optional information wrapper is always emitted, even when all its content
  is absent. The root is always an unnamed native `section`.
- Exhibit and Studio already resolve the same `SectionsStudio` renderer and
  fixture, so both views share the same incomplete DOM and behavior.
- Studio exposes `title`, `description`, optional details, required form, and
  three appearance controls. Site CSS duplicates canonical width containment,
  Textarea height/resize, message margin, and the responsive column switch.
- Shopify has copied CSS only. The adapter manifest reports `css-ready`, missing
  Liquid/data, and target behavior work.
- The Studio design reference is incorrect: frame `943:7` and inspector
  `1020:480` both render the Button pilot rather than Contact Form. It cannot be
  used as S10 aesthetic evidence.
- Before evidence is under
  `output/playwright/batch69-contact-section/before/` for Exhibit/Studio at
  Mobile, Tablet, Desktop, and XL, valid submission, and a direct narrow root.
- Deterministic level-9 baseline gzip is Sections `6,822 B`, generated neutral
  Web component CSS `67,097 B`, and shared runtime `10,501 B`. Sections has a
  permanent `6,861 B` ceiling and only `39 B` headroom; S10 runtime budget is
  `0 B`.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML forms](https://html.spec.whatwg.org/multipage/forms.html) | Native forms construct submitted entries from named controls, provide constraint validation, support explicit input types and `autocomplete`, and preserve implicit submission. | S10 composes one native form with stable names and native constraints; it must not mirror a second form value/validity model. |
| [HTML textarea](https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element) | Textarea owns its name, current/default value, autocomplete, form association and constraint-validation API. | Message remains canonical Textarea with one native value owner. |
| [HTML section and address](https://html.spec.whatwg.org/multipage/sections.html) | A section is thematic content normally identified by a heading; `address` represents relevant contact information for the nearest article/body and not arbitrary metadata. | Use a titled section or generic div; use `address` only for genuine contact details and native links. |
| [WAI forms tutorial](https://www.w3.org/WAI/tutorials/forms/) | Accessible forms use visible associated labels, concise instructions, native grouping/controls, validation, and clear user notifications. | Preserve complete Input/Textarea anatomy and show only necessary fields. |
| [WAI validation](https://www.w3.org/WAI/tutorials/forms/validation/) | Native required/type validation is useful, required status must also be visible, and server validation remains necessary. | Keep native validation in the neutral fixture; targets own complete error policy and security. |
| [WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Submission outcomes must be concise and truthful; multiple errors benefit from a linked summary before the form. | Never claim receipt in a non-networked preview; target success/error timing and focus remain explicit. |
| [Open UI Text Input research](https://open-ui.org/components/inputtext.research/) | Open UI catalogs field naming/anatomy but defines no interoperable Contact Form composite. | Reuse canonical fields; do not invent a cross-target contact widget state machine. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Form composes Field/Label/Control/Message/Submit over native validity and supports client/server validation. | Framework targets may add conveniences at child/form adapters without making S10 a second validation owner. |
| [Polaris Form and fields](https://shopify.dev/docs/api/checkout-ui-extensions/latest/web-components/forms/form) | Mature APIs group related specialized fields, preserve implicit submission, use one submit action, and keep target processing explicit. | A short email/message fixture is sufficient; additional fields remain target policy. |
| [Shopify contact form](https://shopify.dev/docs/storefronts/themes/customer-engagement/add-contact-form) | Shopify supplies `{% form 'contact' %}`, requires `contact[email]`, supports uniquely named optional fields, `form.errors`, and native required attributes. | Implement a target-native Liquid section rather than a simulated endpoint or neutral script. |

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | titled `section.contact-section`; otherwise `div.contact-section` | Contact Form / target | Titled root is named by its visible heading. |
| Grid | yes | `.contact-section__grid` | Contact Form | Intrinsic information/form layout; visual order equals source order. |
| Information | no | `.contact-section__info` | Contact Form | Omitted when all optional introduction/details are absent. |
| Header | no | `header.contact-section__header` | Contact Form | Contains title/description only when present. |
| Title | no | contextual heading `.contact-section__title` | Contact Form / target | Target-unique id names the titled section. |
| Description | no | paragraph `.contact-section__text` | Contact Form | Supporting content; does not name an untitled root. |
| Details | no | `address.contact-section__details > ul` or semantically equivalent list | target | Only relevant contact information; order stays authored. |
| Detail | no, repeated | `li.contact-section__detail` | target | Email/telephone are native links; decorative icons are hidden. |
| Form | yes | `form.contact-section__form` | target + dependencies | Receives the required accessible `formLabel`; action/lifecycle are target-owned. |
| Fields | target-required | canonical Input/Textarea anatomy | Input / Textarea | Stable names, visible labels, values, constraints and messages stay on native controls. |
| Action | target-required | canonical Button submit action | Button | Explicit `type="submit"`; busy/disabled remain Button/target policy. |
| Response | no | `.contact-section__status` with timing-appropriate status/alert semantics | target | Success/error is truthful and must not be repurposed as one field's description. |

## Variant, State, Mode, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One intrinsic optional-info plus required-form layout; no S10 variant modifier. |
| Titled | Native named section plus optional description/details. |
| Untitled | Generic div; required form label still names the form landmark. |
| No information | Grid contains only the form and expands it across the available composition. |
| Missing form or form label | Omit the complete component. |
| Field default/hover/focus/disabled/read-only/error/success/warning | Inherited from Input/Textarea; never duplicated on `.contact-section`. |
| Submit idle/busy/disabled | Inherited from Button and target lifecycle. |
| Native invalid | Browser/target constraint validation; target may add associated messages and an error summary. |
| Pending/success/error/retry | Target-owned; response must match confirmed service state. |
| Controlled/uncontrolled | Per-child native/framework strategy; S10 owns no aggregate value object. |
| Theme/forced colors | Semantic dependency and S10 text/focus tokens. |
| Reduced motion | S10 authors no motion; dependencies retain their accepted fallbacks. |
| RTL | Logical layout and source order; email may retain natural bidirectional behavior. |
| Responsive | Component-container width, not viewport or Studio-only overrides. |

Unsupported combinations include an unnamed required form, unnamed controls,
fields without submitted names, placeholder-only labels, false success, a
form-level status associated to only one field, nested forms, duplicated
validation properties, S10-owned field values, hidden critical instructions,
arbitrary content inside `address`, visual reordering, viewport-only stacking,
and provider or privacy policy promoted into the neutral contract.

## Public API And Ownership

- `title` — optional trimmed visible string; when present it creates and names a
  thematic section. Target chooses contextual heading rank and unique id.
- `description` — optional trimmed supporting string; independently omitted.
- `formLabel` — required non-empty localized string naming the native form
  landmark across targets. It does not replace visible field labels.
- `details` — optional target-owned contact-detail list composition with native
  actionable links and appropriate contact semantics.
- `form` — required target-owned native form composition built from canonical
  Input, Textarea, and Button.
- S10 exposes no field collection, field type, label, name, placeholder,
  required, autocomplete, min/max length, validation variant, message, value,
  error, busy, submitted, endpoint, method, provider, CAPTCHA, consent,
  breakpoint, column count, measure, alignment, icon, or response-state
  property.
- S10 has no events and no controlled/uncontrolled strategy. Child controls and
  the target form adapter remain the sole value and lifecycle owners.

## Token And Value Direction

- Complete S10-owned public tokens cover title/body typography and text colors,
  section/grid/form spacing, focus for native detail links, and inherited child
  contracts used by the composed result.
- Root maximum measure and minimum column measure are private `rem`
  containment constraints, not semantic consumer options.
- Replace hardcoded physical gaps and padding with existing
  `--space-layout-*` tokens. The parent may neutralize the canonical Input
  outer margin at the composition boundary, but does not expose or consume
  Input's private spacing variable.
- Use logical dimensions and a container-relative inline inset curve that keeps
  a real content track in narrow roots.
- Detail icon geometry, structural zeroes, percentages, auto-fit threshold,
  and intrinsic grid behavior remain private implementation details.
- Do not expose Textarea resize/line bounds, Input padding, Button size, or child
  validation colors through S10; those remain dependency-owned APIs.

## Responsive And Performance

- Test direct roots at `200`, `320`, `520`, `900`, and `1120px`, plus docs
  Mobile, Tablet, Desktop, and XL.
- Require `scrollWidth === clientWidth`, a non-zero form track, stable source/tab
  order, and no viewport-only or Studio-owned S10 layout rule.
- Neutral S10 runtime budget is exactly `0 B`: no listener, observer, request,
  timer, layout read, custom element, hydration, or asset.
- The docs target may use React state to demonstrate controlled child values and
  a truthful intercepted preview. That state is target evidence, not neutral
  runtime or a Contact Form store.
- Shopify uses the platform contact form lifecycle with zero S10 JavaScript.
- Sections remains capped at `6,861 B` deterministic gzip. S10 must recover or
  preserve family space rather than raise the ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Conditional section/div, optional information/list, named native form, canonical Input/Textarea/Button, native validation. | Implemented, generated, validated, and browser-evidenced. |
| Shopify | Localized addable section using `{% form 'contact' %}`, platform names, errors/success and canonical classes. | Implemented and target-ready; official validation passed. |
| Webflow | Canonical CSS plus target-native form integration and response handling. | Canonical CSS regenerated and source-identical; service integration remains target-owned. |
| React / Angular | Thin context wrapper; children may be controlled/uncontrolled individually; one target submit lifecycle. | Planned. |
| Figma | Optional introduction/details plus field/action instances and documented state examples; no submission claim. | Planned; current S10 trace points to Button and must be replaced by owner evidence. |
| SwiftUI / Compose | Native form/field/action composition with platform validation and service lifecycle. | Planned. |

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Direct `320px` root collapses the content track to `0px`. | high | Move inline spacing to a container-relative inner curve and use an intrinsic grid. | implementation |
| Form has no accessible name and controls have no submitted names. | high | Add required `formLabel`; provide stable field names and native attributes in fixtures/targets. | standards / implementation |
| Preview falsely claims message receipt. | high | Announce explicitly that preview interception sends nothing; real targets report confirmed outcomes only. | accepted standards / implementation |
| Email detail is passive text. | medium | Use a native `mailto:` link inside an ordered contact-detail list. | implementation |
| Root/info wrappers persist without semantic content. | medium | Conditional section/div, header/info omission, and strict required-form validity. | implementation |
| Site CSS owns canonical containment/textarea/responsive repairs. | medium | Reconcile source CSS and remove S10-specific Studio repairs. | implementation |
| Token/type audit contains physical hardcodes and UA margin drift. | medium | Use complete semantic typography/logical spacing and scoped BEM resets. | implementation |
| Shopify has no contact integration. | high | Add localized `{% form 'contact' %}` section with target response/errors. | target adapter |
| Figma traceability resolves to Button rather than S10. | review risk | Do not infer aesthetic direction; request a corrected owner node for final visual review. | owner |

## Final Implementation And Evidence

- Contract `0.3.0` keeps S10 at `pilot`, declares the required `formLabel`,
  conditional root semantics, dependency ownership, truthful response
  lifecycle, zero neutral runtime and Web/Shopify adapter mappings.
- `SectionsStudio` is the single Exhibit/Studio renderer and fixture. Its
  normalized roots are exactly equal at `1,426` characters with FNV-1a
  `22e93afa`; field values remain child-controlled demonstration state rather
  than S10 API.
- The default output contains one named native form, one actionable email link,
  named required email/message controls, email autocomplete, canonical
  Textarea line bounds and a canonical submit Button. Empty and malformed email
  submission focus Email through native validity. Valid interception reports
  `Preview only: no message was sent.` and editing clears that response.
- Clearing title changes the root from `section` to `div` and removes
  `aria-labelledby`. Clearing title, description and details removes the
  information wrapper. Clearing the required form label removes the complete
  component.
- Direct roots at `200/320/520/900/1120px` remain exact width with non-zero form
  tracks (`136/256/456/391.5/466px`) and no inline overflow. The intrinsic grid
  switches from one to two tracks without viewport or Studio CSS authority.
- Arabic RTL plus a long unbroken address at `320px`, and effective 200% type at
  `320px`, retain equal client/scroll widths and a `256px` form track.
- Light primary/secondary contrast is `17.93:1` / `7.81:1`; dark is
  `17.18:1` / `12.09:1`. Forced colors preserves system text/focus, the detail
  link has a visible `2px` focus outline and reduced motion has no S10 animation
  (`0.00001s` dependency safety clamp only).
- Evidence lives under `output/playwright/batch69-contact-section/`: ten
  baseline images and seventeen final responsive, submission, omission,
  direct-width, theme, focus, forced-color, RTL/extreme and zoom captures.
- Sections CSS finishes at `6,859 B` deterministic gzip against the unchanged
  `6,861 B` ceiling (`+37 B` from the `6,822 B` baseline; `2 B` remain). Neutral
  Web component CSS is `67,140 B` (`+43 B`, existing `1,604 B` global gap) and
  shared runtime remains `10,501 B` (`0 B` delta).
- Canonical, Shopify and Webflow Sections CSS are byte-identical at SHA-256
  `fe82a446fb4fc74760b1d998aae3504d454529ee0086a9e86c917d6085e1393c`.
  Shopify reports S10 `implemented`/target-ready and the official validator
  passed all six requested files as artifact `contact-section-s10-batch69`,
  revision 1.

## Risks And Open Questions

- Blocking owner decision for `stable`: approve the visual candidate and confirm
  Contact Form's separate product value relative to composing Form directly.
- Provide or approve a corrected S10-specific Figma frame; current traceability
  points to Button and cannot certify Contact Form aesthetics.
- Human review should decide the final maximum measure, column balance,
  information/form rhythm, title scale, detail icon treatment, link style,
  field density, and action width.
- Field inventory is target-owned. The docs fixture uses email and message;
  Shopify may expose optional name/telephone while keeping email/message
  required. This must not become a fixed neutral field schema.
- Provider, anti-spam, privacy/consent, retention, error-summary, pending focus,
  retry, duplicate submission, analytics, and abuse policy remain target/product
  decisions.
- Existing global neutral CSS and runtime budgets already have documented
  program gaps. This batch must report real deltas without changing ceilings.

## Readiness Decision

`ready for human review`. Research, contract, canonical Web implementation,
target-native Shopify projection, synchronized adapters, responsive and
accessibility evidence, permanent performance budget, documentation and the
review report are complete. Final aesthetics, product identity, service policy
and corrected S10-specific Figma evidence remain owner decisions. The component
stays `pilot`; no `stable` promotion was made.
