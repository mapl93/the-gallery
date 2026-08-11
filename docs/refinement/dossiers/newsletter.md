# Component Dossier: Newsletter Signup

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation and future-target boundary

Contract: `components/contracts/newsletter.contract.json`

## Recommendation

Keep G2 Newsletter Signup as a thin, passive context and layout composition
around one native email form built from canonical Input and Button. Newsletter
should own a required visible title, optional explanatory copy, required form
placement, optional frequency/privacy note, intrinsic responsive layout and an
optional target-owned response hook. It must not mirror Input value/validity or
Button activation/busy state.

The neutral contract leaves pending, success, error, retry, duplicate
suppression, provider, consent storage and response placement to the consuming
target. The owner accepted that boundary as G2-A in ADR 0251. Neutral G2 is
therefore truthful and complete without a universal response lifecycle.

The docs target may intercept a valid submit only as a local fixture and must
announce that no subscription was sent. Shopify may use its real
`{% form 'customer' %}` lifecycle, server errors and confirmed success because
those are target-native facts rather than neutral defaults.

## Purpose And Limits

- Gives visitors a short, clearly labelled way to provide one email address for
  target-defined updates.
- States what the subscriber can expect and may include a concise frequency,
  privacy, unsubscribe or consent note authored by the target.
- Supports a single native email field and one canonical submit action by
  default; additional fields require a different accepted product contract.
- Owns section context, copy hierarchy, form placement and responsive
  composition only.
- Input owns visible label, native value/default value, name, autocomplete,
  required/type constraints, validity, messages, focus and disabled/read-only
  behavior.
- Button owns submit activation, label, focus, disabled and busy treatment.
- Targets own action/method, service/provider, transport, pending, confirmed
  success, errors, retry, duplicate handling, preservation/reset, analytics,
  consent evidence, privacy, retention and response focus/announcement policy.
- It is not a marketing automation client, contact form, account creation form,
  popup, consent manager, preferences center, campaign scheduler or generic
  Form replacement.

## Current Gallery Baseline

- Registry identity `G2`, category `marketing`, dependencies Input and Button,
  dependency depth `1` and review order `83`.
- Contract `0.2.0`, `pilot`: seven anatomy parts, one presentation, one resting
  state, four semantic properties and two behavior requirements.
- The contract correctly says response ownership belongs to the consuming
  target, but its Shopify adapter remains marked `planned` despite a dedicated
  Liquid section being present.
- `MarketingStudio` is shared by Exhibit and Studio, but it always renders the
  required title, allows the required form to be removed while retaining the
  section, and treats a form-level simulated result as the Input's associated
  message.
- The docs fixture claims “You are on the preview list” without performing any
  request. That is a false success assertion.
- The form-level feedback begins as `role="status"` even though it is only
  static field guidance, and it remains associated to Email through
  `aria-describedby` after submission.
- The controlled docs email value is legitimate target-local fixture state;
  it must not be described as G2's controlled API or exported to neutral
  runtime.
- Canonical CSS applies flexible sizing to `.newsletter__input`, the native
  field, instead of to the composed `.input` root. Studio privately repairs the
  dependency boundary with `.newsletter__form > .input` CSS.
- On a narrow container, the viewport media query changes the form to a column
  while Studio's `flex-basis: 16rem` becomes a vertical basis. Existing mobile
  evidence shows a large empty band between the field and Button.
- The form responds to browser viewport width rather than its component
  container. An embedded narrow Newsletter in a wide viewport stays in the
  wrong layout.
- Title, description and note typography are incomplete: hardcoded physical
  margins and font sizes omit semantic line height, weight, body family and
  logical wrapping rules.
- The `500px` content measure, `8/12/24px` spacing and viewport breakpoint are
  unclassified internal values.
- The MDX static preview uses the same broad anatomy but is a separate markup
  example. Primary Exhibit/Studio parity already resolves through one
  `MarketingStudio` renderer.
- Shopify renders a real customer form, but `.newsletter__form` is placed on an
  inner `div` rather than the native form, so contract and target DOM disagree.
- Shopify uses only an `aria-label` instead of the canonical visible Input
  label/anatomy, has non-unique `newsletter-form` ids, hardcodes English copy,
  and does not present platform errors or confirmed success.
- The registered Figma file/frame/inspector are the generic Button/Studio shell,
  not Newsletter-specific art. They do not approve G2 measure, hierarchy,
  density, field treatment or responsive composition.
- Existing before evidence covers Exhibit and Studio at mobile and desktop in
  `output/playwright/parity/marketing/newsletter-*.png`.
- Deterministic baseline gzip is `451 B` for the G2 CSS slice, `3,615 B` for
  Marketing, `67,363 B` for generated Neutral Web component CSS and `10,501 B`
  for shared runtime. G2 owns no neutral JavaScript or asset.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML forms](https://html.spec.whatwg.org/multipage/forms.html) | Native forms, named controls, email state, constraint validation, implicit submission and target-configured action/method already define the base platform contract. | Use one native form and native email owner; do not create a G2 value or validation store. |
| [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) | Accessible forms use concise inputs, visible associated labels, instructions, validation and clear result notifications. | Keep one visible Email label and collect only the required address. |
| [WAI input validation](https://www.w3.org/WAI/tutorials/forms/validation/) | Native `required` and email constraints provide useful browser validation; custom/server validation still needs accessible messaging. | Preserve native constraints; target errors must remain associated and textual. |
| [WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Success/error feedback must be concise, clear and truthful; inline errors should identify and describe the relevant field. | A docs-only preview cannot claim subscription success. Target response placement/timing remains explicit. |
| [APG pattern inventory](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines widgets such as Button and alert/status patterns but no Newsletter widget or custom email-field keyboard model. | Prefer native form/Input/Button semantics; do not invent ARIA or keyboard behavior. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | Open UI catalogs cross-system form controls and field anatomy but no interoperable Newsletter composite. | The stable boundary is composition of native controls, not a new cross-target state machine. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Radix composes Field, Label, Control, Message and Submit over native constraint validity and supports client/server responses separately. | Framework targets may add form conveniences without making Newsletter a second field owner. |
| [Polaris web components](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components) | Polaris separates Form, Email field and Button, preserving specialized validation and implicit submission. | Compose canonical dependencies and leave target processing to the target surface. |
| [Shopify customer form](https://shopify.dev/docs/api/liquid/tags/form#form-customer) | Shopify documents the `customer` form specifically for newsletter email collection and supplies a real endpoint/lifecycle. | Implement the Shopify projection through target-native Liquid rather than neutral JS or a simulated service. |
| [Shopify email consent](https://shopify.dev/docs/storefronts/themes/customer-engagement/email-consent) | Shopify's newsletter mapping uses the customer form and `contact[email]`. | Keep platform field names and consent behavior in Shopify, not the neutral API. |

The evidence agrees on native composition and truthful feedback. It does not
select The Gallery's provider, consent model, lifecycle, final visual direction
or whether target success replaces the form.

## Mature-System Comparison

- HTML supplies the value, validity, submission and keyboard model; Newsletter
  needs no custom ARIA role.
- APG has no Newsletter widget because this is a semantic form composition, not
  a novel interactive control.
- Open UI's stable comparative boundary is the form control, not a campaign
  service composite.
- Radix Form makes validation/message composition convenient but remains
  framework-specific and does not choose a newsletter provider or response UX.
- Polaris separates Form, Email field and Button, supporting the same canonical
  dependency boundary accepted by The Gallery.
- Shopify supplies a complete target-native customer form and server response.
  That supports a real adapter while preserving a target-agnostic base.

## Owner Reference Analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. The registered reference is the generic
`02 / Component Detail - Studio` Button pilot rather than a Newsletter
composition. It establishes only the shared Exhibit/Studio methodology and
semantic property grouping.

The repository candidate therefore needs human approval for the `32rem`
proposed measure, section inset/rhythm, centered hierarchy, field/Button row,
narrow stacked treatment, title/body/note scale and surface color. No Figma
evidence currently authorizes those aesthetic choices.

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Direction |
| --- | --- | --- | --- | --- |
| Root | yes | title-labelled `section.newsletter` | Newsletter + target | Omit when required title or form composition is missing. |
| Content | yes | `.newsletter__content` | Newsletter | Intrinsic bounded layout; no landmark role. |
| Title | yes | contextual native heading | target | Non-empty visible render precondition; target selects heading rank/id. |
| Description | no | paragraph | target | Omit independently when empty. |
| Form | yes | native `form.newsletter__form` | target + Newsletter placement | Named by visible title; target owns action/method/lifecycle. |
| Input | yes | complete canonical `.input` with visible label/control/native Email | Input | `.newsletter__input` is a sizing hook on the native field only. |
| Action | yes | canonical Button submit | Button | Explicit `type="submit"`; no duplicate state API. |
| Note | no | paragraph `.newsletter__note` | target | Frequency/privacy/consent context; may describe Email when relevant. |
| Response | no | `.newsletter__status` with timing-appropriate semantics | target | No neutral property/state; confirmed result only. |

## Variant, State, Mode, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One centered intrinsic composition; no G2 modifier. |
| Required content | Non-empty title plus complete native form; missing either omits G2. |
| Optional content | Description and note omit without empty wrappers or layout gaps. |
| Input default/hover/focus/disabled/read-only/error/success/warning | Inherited from canonical Input; not duplicated on Newsletter. |
| Button idle/hover/focus/disabled/busy | Inherited from canonical Button and target lifecycle. |
| Native invalid | Browser email/required constraints; target may add associated Input error text. |
| Pending/success/error/retry | Target-owned under ADR 0251; no neutral state machine. |
| Controlled/uncontrolled | Native field or framework Input adapter owns value; G2 owns no aggregate value. |
| Theme | Semantic primary/secondary text and surface tokens. |
| Forced colors | Input/Button dependencies retain system control/focus treatment; copy remains CanvasText. |
| Reduced motion | G2 authors no motion; dependencies retain accepted fallbacks. |
| RTL | Logical layout and wrap; email retains appropriate bidirectional behavior. |
| Responsive | Root-container width, not viewport or Studio override. Row when sufficient; one column when narrow. |

Invalid composition includes an empty required title, a missing form, a
placeholder-only label, unnamed Email control, non-email field type, nested
forms, form-level response used as a field error, false success, G2-owned value
or validation state, and viewport-only responsive behavior.

## Public API And State Ownership

Retain the narrow four-property neutral API:

- `title` — required non-empty visible heading content.
- `description` — optional contextual copy.
- `form` — required native composition built from canonical Input and Button.
- `note` — optional target-authored frequency/privacy/consent context.

No `email`, `value`, `defaultValue`, `name`, `label`, `placeholder`, `required`,
`autocomplete`, `validation`, `message`, `disabled`, `busy`, `pending`,
`success`, `error`, `retry`, `provider`, `endpoint`, `method`, `consent`,
`breakpoint`, `measure`, `alignment`, `gap`, `columns` or event belongs on G2.
These are child-, target- or private-composition facts.

The neutral component has no controlled/uncontrolled strategy. On Web, the
native Email field owns current/default value and form reset. React/Angular may
control that child Input or use its default value; G2 must not mirror another
email store. Shopify owns the platform form object and server lifecycle.

## Token And Hardcoded-Value Audit

| Current fact | Direction |
| --- | --- |
| Surface and primary/secondary text | Existing public semantic color tokens remain appropriate. |
| H3 and body sizes | Add their existing semantic line-height/weight/family companions so typography is complete. |
| Section/container spacing | Keep as public system inputs. Use existing element gap for internal rhythm. |
| `500px` content width | Convert to private `32rem` readable/form measure; do not expose as API. |
| `8/12/24px` gaps/margins | Replace with existing semantic element gap or private composition only where necessary. |
| `639px` viewport breakpoint | Replace with private root-container threshold; not a consumer property. |
| Input flexible basis in Studio CSS | Move component placement to canonical Newsletter CSS and remove site repair. |
| Absolute type line heights under text-only enlargement | Retain semantic line-height tokens as the normal baseline and add private relative minimums so 200% authored type cannot overlap. |

`--color-text-disabled` should not remain a Newsletter public token merely
because Input consumes disabled colors; dependency tokens stay owned by Input.
No new token or token layer is required.

## Responsive And Content Test Plan

- Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900`, XL `1536x960`.
- Direct roots at approximately `200`, `320`, `520`, `700` and `900px` inside
  an unrelated wide viewport.
- Short canonical copy, long localized title/description/note, Arabic RTL,
  long unbroken token and effective 200% text size.
- Empty optional description and note; required empty title and removed form.
- Empty, malformed and valid Email submissions; Enter and Button activation;
  focus-visible; native reset/value behavior.
- Target-local confirmed preview message must state that no request occurred and
  clear when editing resumes.
- Light, dark, forced colors and reduced motion.
- Exact normalized Exhibit/Studio DOM and computed-style parity.
- Shopify server error, preserved value, confirmed success, localized labels,
  unique ids and editor schema.

## Performance Budget

- G2 remains a passive composition with `0 B` neutral component runtime.
- Baseline G2 CSS slice is `451 B` gzip (`967 B` raw).
- The current whole-program snapshot places Marketing at `4,782 / 4,198 B`
  gzip and Neutral Web CSS at `71,754 / 65,536 B`; both gaps are documented by
  the global performance ledger and are not G2 deltas.
- Shared runtime is currently `22,807 / 8,192 B`. G2 contributes `0 B` and
  adds no runtime gap.
- No listener, observer, timer, request, client, bundled asset or layout read
  belongs to neutral G2. Docs-local controlled state and Shopify form processing
  are target behavior, not adapter bundle runtime.

## Target Translation

- Neutral Web: titled native section, bounded content, native form, canonical
  Input/Button, optional note/status hook and zero G2 runtime.
- Shopify: localized `customer` form, platform field name/tags, visible label,
  native error association, confirmed success, unique ids, schema content and
  zero G2 script.
- Webflow: platform form service with canonical class/dependency presentation;
  provider and result surface remain target-native.
- React/Angular: thin layout wrapper; child Input may be controlled or
  uncontrolled and target handles submit/result state.
- Figma: title/description/form/note slots and semantic appearance tokens after
  a corrected component-specific visual reference; no provider or lifecycle.
- SwiftUI/Compose: native Email field, action and platform service/result
  lifecycle rather than copied DOM or CSS geometry.

## Target And Human Boundary

ADR 0251 decides that the complete response lifecycle stays target-owned. The
following are consequently not neutral G2 properties:

- whether a confirmed result replaces the form, renders inline, navigates or
  uses another target-native surface;
- provider, endpoint, double opt-in, duplicate handling, consent evidence,
  privacy, retention, CAPTCHA, throttling, analytics or reset/preservation;
- final measure, responsive threshold, section rhythm, typography, surface,
  Button width/alignment, field icon, label/hint/note hierarchy or copy; or
- promotion from `pilot` to `stable`.

Human review must still approve the visual candidate and each live target must
prove its provider, consent and result behavior. Those gates do not reopen the
neutral ownership decision.

## Certification Plan

1. Record the technical refinement in ADR 0164 and the accepted target-owned
   response boundary in ADR 0251.
2. Advance the contract without adding response state or an aggregate value.
3. Make required composition, truthful docs feedback and canonical dependency
   ownership coherent in the shared renderer.
4. Move responsive/form placement out of Studio CSS into canonical Marketing
   CSS and complete typography/logical containment.
5. Bring Shopify's existing customer form into contract parity with localized
   native errors/success and unique ids.
6. Regenerate Web/Shopify/Webflow copied outputs required by source changes.
7. Capture before/after, four viewport, direct-container, interaction,
   accessibility and special-mode evidence in one bounded local phase.
8. Validate contracts, Studio, docs, adapters, parity, budgets and resource
   cleanup.
9. After the owner accepts target-owned response lifecycle, enter the human
   review queue without changing the `pilot` contract status.

## Implemented Result

Completed on 2026-07-16 without promoting the contract from `pilot`:

- Contract `0.3.0` now defines strict title/form render preconditions, optional
  target-owned response anatomy, one native Email value/validity owner and an
  explicit form-result boundary.
- Exhibit and Studio use the same `MarketingStudio` renderer, fixture, native
  form, canonical Input/Button markup and target-local truthful preview result.
  Normalized outer HTML is exactly equal at `1,188` characters with FNV-1a
  `a0ff61a7`.
- Canonical Marketing CSS owns the complete intrinsic composition. Direct
  `200/320/520px` roots stack the form, `700/900px` roots use two columns, and
  every measured root/content pair is contained.
- Text-only enlargement exposed overlapping absolute token line heights during
  visual QA. Private `max(token, relative-em-floor)` safeguards now resolve the
  200% title/body/caption profiles to `56/67.2px`, `32/48px` and `24/32px`
  without changing normal token output.
- Empty title omits the component; the required Form control cannot be removed;
  optional description/note omit independently. Empty and malformed native
  submissions focus Email; valid Button and Enter submission produce only the
  truthful docs result, preserve value and keep that form result out of the
  field's `aria-describedby`.
- Light title/body/Button contrast measures `16.44:1`, `7.17:1` and `10.37:1`;
  dark measures `14.5:1`, `10.21:1` and `17.93:1`. Forced colors preserves the
  focused `2px` system outline, and reduced motion reports zero component,
  Input and Button animation/transition duration.
- Shopify now has a localized unique `customer` form with canonical Input and
  Button composition, preserved Email, associated server error, confirmed
  success, editor content settings and no Newsletter JavaScript.
- Final G2 CSS remains `2,250 B` raw / `696 B` gzip. The current whole-program
  snapshot places Marketing at `4,782 / 4,198 B`, Neutral Web CSS at
  `71,754 / 65,536 B` and shared runtime at `22,807 / 8,192 B`; those documented
  later-program gaps are not G2 deltas. G2 still adds `0 B` runtime.
- Four paired viewports plus interaction, dark, forced-colors, reduced-motion,
  Arabic RTL/long and effective-200%-text evidence are stored under
  `output/playwright/batch83-newsletter/after/`. The four historical baseline
  images remain under `output/playwright/parity/marketing/`.

Technical refinement and the owner-selected G2-A architecture are reconciled.
The component is `human-review-ready` and remains `pilot`; final visual
approval, live provider/consent/result proof and corrected G2-specific reference
evidence remain required before any `stable` promotion.
