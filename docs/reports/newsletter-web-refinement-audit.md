# Newsletter Web Refinement Audit

Status: `human-review-ready`; contract remains `pilot`

Date: 2026-07-16

Owner-decision reconciliation: 2026-07-21, ADR 0251

Component: Newsletter Signup (`G2`, dependency order `83`)

Contract: `components/contracts/newsletter.contract.json` `0.3.0`, `pilot`

## Outcome

Newsletter is now a thin target-agnostic composition around one native Email
form, canonical Input and canonical Button. It requires a non-empty title and
form, omits empty optional content, responds to its own container, preserves
native constraint validation and adds no neutral response state or runtime.

The shared docs fixture truthfully reports that no request was sent. Shopify
maps the same contract to its target-native customer form, localization and
server response. ADR 0251 accepts the implemented G2-A boundary: pending,
success, error, retry, duplicate, provider and consent behavior remain
target-owned. No component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Subscription layout is separate from provider, consent, persistence, duplicate, analytics and response-placement policy. |
| Anatomy and omission | pass | Required titled section/form, optional description/note/status, canonical Input/Button; empty title omits the root and required Form is not removable. |
| Public API | pass | Required `title`/`form`, optional `description`/`note`; child field and target lifecycle facts are not mirrored on G2. |
| Native semantics | pass | One named native section, one named native form, one visible labelled Email field and one submit Button. |
| Value and response ownership | pass | Email owns value/validity; target owns submission/result; form result is not field guidance or validation. |
| Keyboard and focus | pass | Empty/malformed submissions focus Email, Enter submits a valid value, and Input/Button retain visible focus treatment. |
| Responsive containment | pass | `200–520px` direct roots stack; `700–900px` roots use a row; all measured client/scroll pairs are equal. |
| Content resilience | pass | Empty optionals, Arabic RTL, unbroken text and effective 200% title/body/caption type remain contained without overlap. |
| Theme, contrast and modes | pass | Light/dark contrast exceeds text requirements; forced colors preserves system focus; reduced motion reports zero duration. |
| Exhibit / Studio parity | pass | Normalized outer HTML is exactly equal: `1,188` characters, FNV-1a `a0ff61a7`. |
| DOM / CSS / runtime | pass | No G2 listener, observer, timer, request, client, formatter, asset or neutral component runtime. |
| Generated targets | pass | Web adapter validates; canonical, Webflow and Shopify Marketing CSS are SHA-256-identical. |
| Shopify target | pass | Localized unique customer form, canonical field/action, platform name, preserved value, server error/success, editor settings and zero G2 script. |
| Human stability | ready for review | Response lifecycle ownership is accepted; final visuals, live target behavior and corrected G2-specific reference evidence remain review gates. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Required composition | Empty title and removable form could leave an invalid shell. | Empty title or missing required form omits G2; Studio prevents removal of the required form slot. |
| Input composition | Flexible sizing lived on the native field and Studio repaired the Input root privately. | Canonical CSS sizes the complete Input root; Studio has no Newsletter layout repair. |
| Responsive behavior | Viewport query plus `16rem` flex basis created a large narrow vertical gap. | One root-container query stacks the complete Input and full-width Button. |
| Submission preview | Claimed the address was on a preview list without a request. | Truthfully states `Preview only: no subscription was sent.` only after native validity passes. |
| Response semantics | Form result also described the Email field. | Optional target form result remains separate from field guidance/validation. |
| Typography | Incomplete type profiles and absolute line heights could overlap at text-only 200%. | Complete semantic profiles plus private relative line-height minimums preserve normal output and enlarged readability. |
| Shopify | Fixed ids, hidden-only label, incomplete Input, hardcoded English and no server result. | Unique localized native customer form with visible canonical Input, errors, confirmed success and merchant content. |

Before evidence: `output/playwright/parity/marketing/newsletter-*.png` (`4`
Mobile/Desktop Exhibit/Studio PNGs).

After evidence: `output/playwright/batch83-newsletter/after/` (`14` PNGs):
paired Mobile, Tablet, Desktop and XL plus valid result, Arabic RTL/long content,
effective 200% text, dark, forced colors and reduced motion.

## DOM, Interaction And Responsive Evidence

The shared initial renderer emits one `SECTION`, one H2, one `FORM`, one complete
Input, one native Email field, one submit Button, optional description/note and
no initial result. Section and form reference the same visible title. The Email
field has stable `name="email"`, `type="email"`, `autocomplete="email"`,
`required` and one note description.

Normalized Exhibit and Studio outer HTML is byte-equal after target-generated id
normalization: `1,188` characters, FNV-1a `a0ff61a7`.

| Direct root | Root client/scroll | Content client/scroll | Form tracks | Result |
| ---: | ---: | ---: | ---: | --- |
| `200px` | `200/200` | `136/136` | 1 | stacked, contained |
| `320px` | `320/320` | `256/256` | 1 | stacked, contained |
| `520px` | `520/520` | `456/456` | 1 | stacked, contained |
| `700px` | `700/700` | `512/512` | 2 | row, contained |
| `900px` | `900/900` | `512/512` | 2 | row, contained |

Interaction probes establish:

- empty submit: `valueMissing=true`, invalid and Email focused;
- `invalid-address`: `typeMismatch=true`, invalid and Email focused;
- valid Button submit: value preserved and one `role=status` result with exact
  truthful preview copy;
- editing clears the target-local form result;
- valid Enter activation submits and preserves the value;
- result id is absent from Email `aria-describedby`; and
- keyboard-focused Input/Button show `4px`/`2px` visible outlines respectively.

## Accessibility, Content And Special Modes

- Empty required title removes the component. Empty description and note remove
  their wrappers, leaving only title/form; required Form remains checked and
  disabled in Studio.
- Arabic RTL plus a long unbroken identifier at a `320px` root remains
  `320/320px`; content remains `256/256px` and the form stacks.
- Effective 200% authored type resolves title `56/67.2px`, body `32/48px` and
  caption `24/32px` font/line-height pairs. Visual QA caught and corrected the
  earlier absolute-line-height overlap before final evidence.
- Light contrast: title `16.44:1`, description/note `7.17:1`, Input `17.93:1`,
  Button `10.37:1`. Dark: title `14.5:1`, description/note `10.21:1`, Input
  `17.18:1`, Button `17.93:1`.
- Forced colors retains a visible `2px` system outline on the focused Button.
  Reduced motion reports `animation-name:none` and `0s` animation/transition
  duration for G2, Input and Button.
- Final fresh navigation reports zero console errors and zero warnings.

The direction follows native [WAI form guidance](https://www.w3.org/WAI/tutorials/forms/),
[WAI validation guidance](https://www.w3.org/WAI/tutorials/forms/validation/),
[WAI notification guidance](https://www.w3.org/WAI/tutorials/forms/notifications/)
and Shopify's target-native [customer form](https://shopify.dev/docs/api/liquid/tags/form#form-customer).
APG and Open UI define no separate Newsletter widget, so G2 adds no custom role
or keyboard model.

## Tokens, CSS And Performance

The contract exposes 17 existing semantic tokens covering surface/text,
complete H3/Body/Caption typography and section/container/element spacing.
Private composition retains the `32rem` measure, container threshold, fluid
inline inset, grid placement and relative line-height safeguards. None is a
consumer property.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| G2 CSS slice | `451 B` | `696 B` | family-owned | `+245 B`; complete responsive/type contract |
| Marketing family CSS | `3,615 B` | `3,920 B` | `4,198 B` | Batch 83 pass; current later-program snapshot is `4,782 B` |
| Neutral Web component CSS | `67,363 B` | `67,570 B` | `65,536 B` | Batch 83 gap; current later-program snapshot is `71,754 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | G2 delta `0 B`; current later-program snapshot is `22,807 B` |

Canonical, Webflow and Shopify Marketing CSS share SHA-256
`65699dd4e7a38fca15d7fc875550313911a557867a8e0b9898391c558de1de86`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero G2 runtime. |
| Webflow | Source-identical CSS; form service and response remain target-owned. |
| Shopify | Implemented localized customer-form section with platform lifecycle and zero Newsletter JavaScript. |
| React / Angular | Documented thin wrapper; child Input may be controlled/uncontrolled, target handles submit/result. |
| Figma | Planned; nodes `943:7` and `1020:480` are generic Button evidence, not G2 visual approval. |
| SwiftUI / Compose | Documented native Email/action/service/result translation; planned. |

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
- `site/node_modules/.bin/tsc --noEmit -p site/tsconfig.json`
- Chromium paired viewports, direct roots, omission, native validation, Button
  and Enter submit, value/result separation, RTL/long/200% content, contrast,
  dark, forced colors, reduced motion, exact DOM parity and console
- source/generated identity, deterministic gzip, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Human Review Queue

1. Approve or revise the `32rem` measure, container threshold, section inset,
   hierarchy, type, surface, field icon, Button width/alignment, note/status
   treatment and fixture copy.
2. Supply corrected G2-specific Figma/reference evidence; current registered
   nodes show the generic Button detail page.
3. Prove the selected target's provider, endpoint, double opt-in, consent,
   privacy, duplicate, CAPTCHA, throttling, analytics, preservation and truthful
   result behavior without promoting those facts to neutral G2 API.
4. Review the existing total Web CSS/runtime program gaps separately; G2 adds
   no neutral runtime and this reconciliation changes no CSS.

## Readiness

`human-review-ready`: technical implementation, target translation, evidence,
documentation, automated gates and the owner-selected response boundary are
complete. Visual approval and live target proof remain required. Contract stays
`pilot`; no `stable` promotion was made.
