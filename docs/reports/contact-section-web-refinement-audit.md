# Contact Form Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-15

Component: Contact Form (`S10`, review order `170`)

## Outcome

Contact Form is now a thin container-responsive context wrapper around one
required named native form composed from canonical Input, Textarea, and Button.
It owns optional introduction/contact details, conditional section semantics,
the required form label and placement only. Fields retain their native value,
name, constraints, validation, feedback, focus and controlled/uncontrolled
strategy; the target owns submission and service policy.

Exhibit and Studio use the same `SectionsStudio` renderer and fixture. The
non-networked preview preserves native constraint validation and reports only
that no message was sent. Shopify now provides a localized addable section using
`{% form 'contact' %}`, platform field names, native preservation, translated
success/errors and zero target JavaScript.

ADR 0153 records conditional root semantics, the required `formLabel`, native
child ownership, target-owned response lifecycle, truthful preview policy,
intrinsic containment and the Shopify translation.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Root and form semantics | Always unnamed `section`; unnamed form landmark | Visible title names a `section`; otherwise `div`; required localized form name | pass |
| Field submission | Email/message lacked stable `name`; Email lacked autocomplete | `email` and `message` names, email type/autocomplete, both required | pass |
| Preview response | Falsely claimed the message was received and described only Email | Native validity first; truthful form-level status; edit clears it | pass |
| Contact detail | Email was passive text | Native `mailto:` link inside a contact-detail list | pass |
| Canonical composition | S10 placement plus site-only field/textarea repairs | Canonical Input, Textarea and Button; no S10 repair CSS in Studio | pass |
| Optional content | Empty semantic wrappers remained | Titleless root is generic; empty information omitted; invalid required label omits all | pass |
| Narrow embedding | Direct `320px` root had `160px` side padding, `0px` grid and extreme height | `256px` real track at `320px`; exact `200–1120px` roots and no overflow | pass |
| Responsive authority | Fixed columns, viewport breakpoint and Studio override | Root-owned inline-size container, intrinsic auto-fit grid and logical inset curve | pass |
| Shopify | Copied CSS only, `css-ready` | Localized target-native contact section, schema/data/errors/success/editor ready | pass |
| Runtime | Local React behavior could read as S10 submission | S10 neutral runtime `0 B`; docs-only child state and target-native service lifecycle | pass |

## Contract And API

Contract `0.3.0` remains `pilot` with one intrinsic presentation and five
properties:

- `title` — optional visible contextual heading; its presence creates and names
  a native section.
- `description` — optional supporting text, omitted independently.
- `formLabel` — required localized accessible name for the native form.
- `details` — optional target-owned contact-detail composition using appropriate
  list/address/link semantics.
- `form` — required native composition built from canonical Input, Textarea and
  Button.

S10 exposes no field records, label/name/value, validation variant, message,
busy/submitted state, endpoint, method, provider, CAPTCHA, consent, breakpoint,
column count, measure, icon, response state or event. It has no aggregate
controlled/uncontrolled model; child controls and the target form adapter remain
the sole value/lifecycle owners.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Short contact context; CRM, ticketing, scheduling, auth, commerce and provider policy excluded. |
| Anatomy and composition | `pass` | Conditional root/header/info/details plus required named form and canonical fields/action. |
| Variants and modes | `pass` | One intrinsic presentation; optional introduction/details and target response states documented. |
| Public API | `pass` | Five semantic properties; field/service/layout internals remain dependency-, target- or private-owned. |
| State ownership | `pass` | Native fields own values/validity; target owns pending/success/error/retry; S10 owns no store/events. |
| Tokens and values | `pass` | Fifteen existing public references; private measures/inset; no new component token or public child private variable. |
| Visual system | `pass` for candidate | Four paired viewports, direct roots, themes, focus, RTL/extreme and 200% type; aesthetics await owner approval. |
| Accessibility | `pass` | Named form, visible labels, stable names, native constraints, actionable contact link and truthful status. |
| Interaction | `pass` | Empty/type-invalid submission focuses Email; valid local interception is truthful; edit clears feedback. |
| Motion | `pass` | S10 authors no motion; dependency safety clamp reaches `0.00001s`. |
| Responsive behavior | `pass` | Root-owned container response at `200–1120px`; no viewport or Studio authority and no reorder. |
| Content resilience | `pass` | Optional omission, long Arabic RTL, unbroken address and effective 200% type remain contained. |
| Runtime and assets | `pass` locally / global gap | Zero S10 JS/assets/request/layout reads; Sections ceiling passes; global Web/runtime gaps remain explicit. |
| Cross-target translation | `pass` for Web/Shopify/Webflow | Generated Web, target-native Shopify and source-identical Webflow CSS; future targets documented. |
| Documentation parity | `pass` | One renderer/fixture and exact normalized Exhibit/Studio DOM hash. |
| Verification | `pass` | Source/adapters/docs/audits, official Shopify validation, browser matrix, budgets, copies and isolated build. |

## Browser Evidence

- Evidence directory: `output/playwright/batch69-contact-section/` with ten
  baseline and seventeen final images.
- Exhibit and Studio normalize to exactly `1,426` characters and FNV-1a
  `22e93afa` at Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900` and XL
  `1536x960`.
- Default semantics are one title-labelled section, one form named `Send an
  inquiry to the gallery`, one `mailto:` link, two visible labels, two named
  required native fields and one submit Button.
- Empty submit and email type mismatch leave zero false statuses and focus the
  email field. A valid local submit yields exactly `Preview only: no message was
  sent.`; neither field misuses that form-level response as `aria-describedby`,
  and editing removes it.
- Clearing the title changes the root to `DIV` with no `aria-labelledby`.
  Clearing title/description/details removes the information wrapper; clearing
  `formLabel` produces zero roots/forms.
- Direct `200/320/520/900/1120px` roots retain exact widths and form tracks of
  `136/256/456/391.5/466px`. The grid uses one track through `520px` and two at
  `900/1120px`; every root has equal client/scroll width.
- Arabic RTL with an unbroken long address remains contained at `320px` with a
  `256px` info/form track. Effective 200% type at the same root also retains
  `320/320px` client/scroll width.
- Light primary/secondary contrast is `17.93:1` / `7.81:1`; dark is
  `17.18:1` / `12.09:1`. Forced colors resolves to system colors, the native
  detail link matches `:focus-visible` with a `2px` solid outline and `2px`
  offset, and no S10 animation is present under reduced motion.
- The final browser console reports zero errors and zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,822 B` | `6,859 B` | `6,861 B` | pass; `+37 B`, `2 B` remaining |
| Neutral Web component CSS | `67,097 B` | `67,140 B` | `65,536 B` | existing gap `1,604 B`; synchronized `+43 B` delta |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; delta `0 B`; S10 adds no behavior |

Canonical, Shopify and Webflow Sections CSS are SHA-256-identical:
`fe82a446fb4fc74760b1d998aae3504d454529ee0086a9e86c917d6085e1393c`.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced canonical native composition. |
| Shopify | `implemented`, target-ready localized section with contact service, preservation, error/success output and no script. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical; service behavior remains target-native. |
| React / Angular | Planned thin context wrapper; child adapters own values and target form owns the submission lifecycle. |
| Figma | Current S10 reference incorrectly resolves to Button; corrected component evidence and final visuals are required. |
| SwiftUI / Compose | Documented optional contact context plus native fields/action and platform-owned service lifecycle. |

The Shopify adapter reports 65 target-ready components, 35 dedicated Liquid
templates and 26/26 schema-ready sections. Contact Form is `implemented`,
`ready: true`, with CSS, Liquid, schema, data, behavior, template composition
and editor-preview layers ready. Official validation passed all six requested
files for artifact `contact-section-s10-batch69`, revision 1.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- `npm run audit:components`
- `npm run audit:refinement`
- `npm run audit:exhibit-studio`
- isolated site production build outside `site/dist`
- official Shopify validation, artifact `contact-section-s10-batch69`, revision 1
- Chromium paired viewports, direct roots, omission/invalid semantics, native
  constraints/status, localized RTL/unbroken content, effective 200% type,
  light/dark contrast, focus, forced colors, reduced motion and clean console
- source/generated identity and `git diff --check`

## Human Review Queue

1. Approve the `60rem` maximum measure, `20rem` intrinsic track threshold,
   one/two-column balance, logical inset curve and information/form rhythm.
2. Approve title/body typography, details/link treatment, field density and
   full-width action treatment across Mobile through XL.
3. Confirm the five-property neutral API and Contact Form's separate
   discoverable product value relative to composing Form directly.
4. Confirm that field inventory, submission/pending/error/retry, provider,
   anti-spam, privacy/consent, retention and analytics remain target policy.
5. Supply or approve a corrected component-specific Figma frame; the current
   frame/inspector nodes both show the Button pilot.

## Readiness

`ready for human review`: neutral composition, Shopify projection, responsive
containment, semantics, interaction, accessibility, performance, parity and
documentation are complete for review. Contract remains `pilot`; no `stable`
promotion was made.
