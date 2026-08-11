# Component Dossier: Pin Input / OTP

Status: `human-review-ready`

Target reviewed: Neutral Web one-time-code entry

Contract: `components/contracts/pin-input.contract.json`

Accepted decision: [ADR 0222](../../decisions/0222-pin-input-independent-native-segment-ownership.md)

## Direction For The Gallery

Pin Input uses the owner-selected multi-input model: every visible cell is a
real, independently clickable and focusable native text input. There is no
hidden full-code input. Every segment receives the same non-empty `name`, so
static Web preserves the ordered code with `FormData.getAll(name)` and a target
can join the values when its service expects one string.

This deliberately differs from the earlier single-owner research
recommendation. The shared Web enhancement coordinates the real cells without
creating another value owner: numeric filtering, advance, empty Backspace,
logical horizontal arrows, paste/autofill distribution, filled/complete state
and form reset. Completion never submits or verifies the code.

## Purpose And Limits

- Captures one short numeric verification or access code while preserving
  leading zeroes.
- It is not a numeric quantity, password manager, virtual keyboard,
  authenticator, resend timer, delivery channel or verification workflow.
- v1 is numeric. Alphanumeric, masking and secret-credential modes are not
  inferred by ADR 0222.
- Segment count is authored by the real input collection; no separate public
  `length` property can disagree with the DOM.
- OTP autofill is progressive. Manual typing, direct focus and paste remain
  complete fallback paths.

## Evidence And Reconciliation

| Source | Evidence | Gallery direction |
| --- | --- | --- |
| [HTML autofill tokens](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-detail-tokens) | `one-time-code` is the standardized autofill detail token. | Put it on the first real segment and progressively distribute multi-character input across the same cells. |
| [SMS OTP form best practices](https://web.dev/articles/sms-otp-form) | Codes are strings and numeric keyboard hints belong on text inputs. | Use `type=text`, numeric `inputmode`/pattern and preserve leading zeroes. |
| [Apple domain-bound code AutoFill](https://developer.apple.com/documentation/security/enabling-autofill-for-domain-bound-sms-codes) | Web AutoFill is associated with `autocomplete=one-time-code`. | Treat autofill as an enhancement, never the only entry path. |
| [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG has no OTP/PIN composite pattern. | Preserve ordinary native input and Tab behavior; do not invent roving tabindex or a custom widget role. |
| [Chakra Pin Input](https://chakra-ui.com/docs/components/pin-input) | Mature systems coordinate cell entry, paste, OTP and completion. | Reuse the interaction evidence, but retain Gallery's explicit real-segment ownership rather than copying a hidden-owner architecture. |

## Certified Anatomy

- Required: `.field.pin-input` group, visible `.pin-input__legend`, ordered
  `.pin-input__fields`, and real `.pin-input__field` inputs.
- Optional: canonical Field Wrapper description and one current feedback slot.
- Each input uses `type=text`, `maxlength=1`, numeric input mode/pattern, the
  same `name`, a localized positional accessible name and shared description
  linkage.
- The first segment owns `autocomplete=one-time-code`; subsequent cells use
  `autocomplete=off`.
- No hidden input, mirrored string value, duplicate markup or target-specific
  dependency exists in the base implementation.

## State, Variant And Mode Matrix

| Axis | Supported candidate behavior |
| --- | --- |
| Validation | Default, Error, Success and Warning preserve their color family during hover and focus. |
| Native state | Default, focused, filled, complete, disabled and read-only. |
| Requiredness | Every segment is natively required and the visible label receives the canonical marker. |
| Completion | Derived only when every real cell has one accepted character; it does not submit, blur, redirect or announce. |
| Direction | Ordinary Tab order plus LTR/RTL-aware horizontal arrow movement. |
| Motion | Short tokenized transitions; duration is removed under reduced motion. |
| Forced colors | Native canvas/text/highlight colors preserve focus and disabled distinction. |
| Responsive | 48x56 cells with an 8px gap; at a container of 320px or less, descendants use 44x52 and 6px, then wrap without page overflow. |

## Public API And Ownership

The stable semantic surface is `label`, `variant`, `name`, `required`,
`disabled`, `readOnly`, `invalid`, `describedBy`, optional `description` and
optional `feedback`. Cell dimensions, gap, accepted-character filter,
completion derivation and focus coordination remain private composition.

Static Web is uncontrolled after initial native values. Stateful adapters may
control one ordered segment collection or expose its uncontrolled initial
collection, but must bind the same real inputs. The base emits/retains native
input behavior and does not own network requests, verification state or result
announcements.

## Tokens And Runtime Audit

- Twenty-five public semantic token references cover text, default/validation/
  disabled field colors, radius, motion, opacity and typography.
- Cell geometry and gap are component-private `--_pin-*` variables.
- No visual hardcoded color, shadow or typography value was introduced.
- The only hardcoded dimensions are the bounded private 48x56 / 44x52 cell
  geometry and 8 / 6px gap accepted as compositional detail pending human
  visual review.
- One shared enhancer is discovered through the existing root observer. It
  creates no per-instance observer, timer, request or hidden field.

## Interaction And Responsive Evidence

Final evidence lives in
`output/playwright/refinement-forms/pin-input-0222/`:

- paired Exhibit and Studio screenshots at 390x844, 768x1024, 1280x800 and
  1600x1000;
- a localized long-label/description mobile stress screenshot;
- direct focus on the third cell and accepted typing advanced focus to the
  fourth;
- non-numeric input was filtered;
- paste distributed `123456` to the six real cells;
- `FormData.getAll('verificationCode')` returned the ordered six values and
  joined to `123456`;
- RTL ArrowLeft moved from cell 3 to 4 and ArrowRight returned to cell 3;
- native reset emptied every field and changed `data-complete` from `true` to
  `false`;
- a 280px container had `clientWidth === scrollWidth`, 44x52 cells, 6px gap and
  two rows; and
- browser console evidence contained no errors or warnings.

## Target Translation

- Neutral Web uses canonical CSS plus `components/js/theme.js` and repeated
  native names.
- Shopify may copy the canonical CSS/runtime but remains `planned` until a
  target-native customer flow supplies Liquid markup, purpose, endpoint and
  localized result handling.
- React and future stateful adapters project an ordered value collection onto
  the same native segment owners; they must not add a hidden full-code owner.
- Figma owns only presentation states and cell composition, not submission or
  verification behavior.

## Risks And Human Questions

1. Human review must approve the cell geometry, gap, typography, filled border,
   validation/focus hierarchy and two-row narrow treatment.
2. Real SMS AutoFill distribution varies by browser/OS and still requires a
   device-level human smoke test; manual typing and paste are certified fallbacks.
3. Numeric-only v1 is intentionally narrow. A future alphanumeric or masked
   mode requires a separate semantic decision rather than an internal flag.
4. Forms CSS and shared runtime remain above their fixed family/global budgets;
   the overages are explicit program risks, not silently accepted increases.

## Readiness Decision

The candidate is implementation-, documentation-, interaction- and
cross-target-contract complete for human stability review. It remains `pilot`;
only explicit human approval can promote it to `stable`.
