# Coming Soon Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

X1 Coming Soon is now a truthful public editorial launch or maintenance page.
It no longer conflates that page with password authentication, styles duplicate
fields/actions, advertises an inert dialog, accepts invalid email, prevents
social navigation or emits dangling labels. Registry, contract `0.3.0`, source
CSS, MDX, Studio metadata, the shared renderer and target adapters now declare
the same ten-property public API and direct Input, Button and Link dependencies.

Shopify's independent password layout remains functional and target-native. It
is explicitly outside X1 certification and does not add password hooks back to
the neutral contract. Countdown is also absent until its time and expiry
lifecycle receives an explicit product/architecture decision.

The result is prepared for explicit human review, not stable. Human review must
approve the composition and visual direction, the ten-property API, the
public/password boundary and the remaining target-owned product choices.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Public launch/maintenance communication only; no authentication, scheduling, countdown, CMS, campaign, analytics or backend ownership. |
| Anatomy and composition | pass | Required labelled root and heading; optional decorative media, brand, editorial slots, social navigation, form region and footer. |
| Variants, states and modes | pass | One editorial profile; media/no-media, coherent optional omissions, valid/invalid email, light/dark, forced colors, reduced motion, RTL and intrinsic split/stack are evidenced. |
| Public API | pass | Ten semantic properties; password, countdown, layout, dependency state and service internals remain absent. |
| Controlled/uncontrolled | pass | The page owns no value/open/auth store; native inputs and target form services retain their normal controlled/uncontrolled translation. |
| Canonical dependencies | pass | Direct Input, Button and Link dependencies; no duplicated field, action, navigation, dialog or password API. |
| Tokens and visual system | pass | Semantic page tokens plus private measures/scrim/ratio; dependency tokens and hardcoded light/dark families were removed. |
| Accessibility and motion | pass | Required heading precondition, conditional labelling, decorative media, native validation, real links, keyboard order, forced colors and zero component motion pass. |
| Responsive/content resilience | pass | Four viewports plus long/unbroken Spanish, full Arabic RTL and 200% zoom remain contained without document overflow. |
| Runtime and assets | pass | Zero neutral listener, observer, timer, request, auth store, countdown loop, formatter, layout read, animation, icon or bundled asset. |
| Cross-target translation | pass | Web implemented; Shopify public page and independent password template implemented/validated; other targets documented without invented behavior. |
| Exhibit/Studio parity | pass | One renderer and fixture; initial root DOM is identical after normalizing React-generated relationship ids only. |
| Human readiness | pass | Dossier, ADR, contract, docs, targets, evidence, budgets, risks and gates complete; status remains `pilot`. |

## Contract And Implementation Result

- Contract advances from `0.2.0` to `0.3.0`, remains `pilot`, and replaces the
  old 29-part public/password surface with 16 public-page anatomy parts.
- Registry and contract declare `input`, `button` and `link` as direct
  dependencies at refinement depth 1.
- Public properties are required `heading` plus optional `backgroundMedia`,
  `brand`, `subtitle`, `body`, `socialLinks`, `formHeading`,
  `formDescription`, `form` and `footer`.
- `passwordTriggerLabel`, `passwordEntry`, password anatomy/states and inert
  preview behavior are removed without aliases. Countdown is not introduced.
- Missing required heading returns `null`. The optional form relationship is
  emitted only when its visible heading exists; an entirely empty optional
  form region is omitted.
- Background media is atmospheric with `alt=""`; required information remains
  textual. Forced colors hides that media and uses Canvas/CanvasText.
- Social destinations are visible canonical Links with real external URLs,
  `_blank` and `noopener`; activation is no longer prevented.
- The fixture uses a visible canonical Input label, native `type="email"`,
  `required`, associated status and canonical submit Button. Its success text
  states that validation passed and that no request was sent.
- Coming Soon CSS owns page composition only. Input, Button and Link retain
  field/action/navigation semantics, states, focus and tokens.
- A named inline-size container selects the two-column or editorial-first
  stacked composition. Logical dimensions replace physical and viewport-only
  behavior; narrow docs hosts receive bounded component spacing.
- Exhibit and Studio keep one `PagesStudio` renderer and one fixture. Site CSS
  supplies only stage/host/media-fixture concerns, not a second page layout.

## Browser Evidence

### Structure, Interaction And State

- Browser inspection finds one Coming Soon root, zero password controls, one
  native email form, two canonical social Links and a decorative image with an
  empty alternative.
- Instagram resolves to `https://www.instagram.com/` and Facebook to
  `https://www.facebook.com/`; both use `_blank` plus `noopener`.
- Submitting `not-an-email` leaves the normal status unchanged, reports
  `valid=false`, and exposes the browser type-mismatch message. Submitting
  `valid@example.com` reports `valid=true` and the truthful local-preview
  message `Preview only: valid@example.com passed native validation. No request
  was sent.`
- Clearing the required heading produces zero root and heading nodes. Clearing
  only the optional form heading leaves the form usable with no heading node
  and no `aria-labelledby`. Disabling the form plus clearing its heading and
  description produces zero form-region nodes.
- Keyboard order inside the composition is Instagram, Facebook, email Input
  and submit Button. Tab focus exposes canonical Link/Input/Button focus
  treatment; the email field remains the focused control in forced colors.
- No application warnings or errors appear in the final browser session.

### Parity, Content And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) have paired Exhibit/Studio before and final captures.
- Mobile root is `358/358px` and Tablet is `736/736px` in both views. Desktop
  deliberately exercises `580px` Exhibit and `692px` Studio hosts; XL
  exercises `584px` and `752px`. Every document remains exact at its viewport
  width and every root has equal client/scroll width.
- A long Spanish composition, including an unbroken compound, remains
  `736/736px` at Tablet. Fully Arabic visible content under `dir="rtl"` remains
  `358/358px` at Mobile with a `390/390px` document.
- At 200% CSS zoom the root renders at `326px`; its logical client/scroll width
  remains `163/163px` and the document remains `390/390px`.
- Exhibit and Studio raw initial roots differ only in React `useId` suffixes.
  After normalizing those host-generated ids, `outerHTML` is identical at
  `1,937` characters with SHA-256
  `e23b301977fe4646e7975a034135dd6c0a7a66d48b1a68c40b99cd69260240fc`.
- Eight baseline, eight final, six special-mode and one Figma-reference capture
  live under `output/playwright/refinement-batch-59/`.

### Contrast And User Preferences

- Without media, light contrast is `17.93:1` for heading/Link/form heading/
  label/input, `7.81:1` for secondary copy/footer and `10.37:1` for Button.
- Without media, dark contrast is `17.18:1` for primary copy/Link/label/input,
  `12.09:1` for secondary copy/footer and `17.93:1` for Button.
- With media, the canonical minimum `0.6` black scrim yields a conservative
  white-image worst case of `5.50:1` for inverse text and `4.57:1` for the
  86%-inverse secondary text. Target token changes still require contrast QA.
- Forced colors hides decorative media, supplies a Canvas background, retains
  the focused email control and leaves zero active animation. Reduced motion
  exposes zero non-zero transition/animation durations inside the composition
  and its canonical dependencies.

## External And Figma Evidence

The [HTML form-control model](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html),
[WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/),
[WAI User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
and [WAI development tips](https://www.w3.org/WAI/tips/developing/) support
native email validation, visible labels, associated feedback and empty
alternatives for decorative imagery.

The [Shopify password-template documentation](https://shopify.dev/docs/storefronts/themes/architecture/templates/password)
and [Liquid form tag](https://shopify.dev/docs/api/liquid/tags/form) distinguish
the `storefront_password` and `customer` form contracts. Polaris Form composes
field and Button owners, while [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
documents the focus/name/Escape/restoration obligations missing from the old
inert password hooks. Open UI has no Coming Soon primitive that would justify a
custom role or universal password/countdown mode.

Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector `1020:480`
contain the generic Button/Studio shell rather than Coming Soon artwork. No
page-specific layout, visual, responsive, form, password or countdown fact was
inferred. The browser candidate therefore remains a proposal for human review.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Contextual labelled page/section, decorative media, required heading, optional editorial content, canonical Links and target-owned native form. | Implemented, generated and browser-evidenced; zero neutral runtime. |
| Shopify public page | Merchant settings, required heading and customer signup using canonical Input/Button classes; theme layout owns the single `main` and skip target. | Implemented; adapter validation and Shopify Liquid revision 5 pass. |
| Shopify password page | Independent password template using `storefront_password`, canonical Modal/Close Button/Input/Button classes and target-owned focus/inertness/dismissal behavior. | Preserved and validated but explicitly outside X1 certification; security/UX review remains. |
| Webflow | Target-agnostic page CSS with the same dependency contract. | Source copy synchronized and byte-identical. |
| React / Angular | Thin document composition over Input, Button and Link with target-owned form service/state. | Contract-ready; no page store. |
| Figma | Approved page frame containing reviewed canonical dependency instances. | Planned; registered reference is unrelated generic artwork. |
| SwiftUI / Compose | Target-native full-screen document, form and navigation controls. | Conceptual; publication, auth and countdown services remain target-owned. |

Canonical, Shopify and Webflow Coming Soon CSS are byte-identical at SHA-256
`4885640f28489a3f8fbdb8afcf39e27af96157a5601c659b2dfc132d846d2f9d`.
Shared source, Neutral Web and Shopify runtime are byte-identical at SHA-256
`1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a`.

## Performance And Risks

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Coming Soon CSS | `2,184 B` | `1,370 B` | family-bound | pass; `814 B` removed |
| Pages + Coming Soon CSS | `4,178 B` | `3,503 B` | `5.3 KiB` (`5,427 B`) | pass; `675 B` removed, `1,924 B` remaining |
| Neutral Web components CSS | `67,690 B` | `66,884 B` | `64 KiB` (`65,536 B`) | existing `1,348 B` program gap; refinement removes `806 B` |
| Shared neutral runtime | `10,589 B` | `10,589 B` | `8 KiB` (`8,192 B`) | existing `2,397 B` program gap; Coming Soon adds `0 B` |

- Human review must approve split versus stack, measures, typography, rhythm,
  background crop/scrim, brand/footer placement and social/form treatment.
- The ten-property API and strict public/password split require explicit owner
  approval before stability.
- Target form purpose, consent, fields, backend, result placement, retry,
  localization, analytics, persistence and launch scheduling remain open.
- Countdown time source, timezone, cadence, correction, expiry and post-expiry
  behavior remain one unresolved product/architecture decision.
- Shopify password modal versus inline UX, authentication/errors/lockout and
  security policy require independent target review; X1 does not certify them.
- Dedicated component-specific Figma, framework and native adapters remain
  absent.
- Global Web CSS/runtime overages are existing program gaps, not budget
  increases authorized by this component.

## Validation

Registry/docs, DTCG source, 183 contracts, 183 Studio definitions, Neutral Web,
Shopify, Webflow source copies, official Shopify Liquid revision 5, source/
generated CSS/runtime identity, structural certification, static Preview audit,
normalized Exhibit/Studio parity, real navigation, native valid/invalid form
behavior, conditional required/optional omission, keyboard focus order, four
viewports, long/localized/unbroken/RTL content, 200% zoom, light/dark contrast,
forced colors, reduced motion, deterministic gzip, temporary Vite build outside
`site/dist`, refinement/parity audits, diff checks and console inspection
comprise Batch 59.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve or revise split/stack composition, measure, alignment, typography,
   spacing, image crop, scrim, brand/footer and social/form treatment.
2. Confirm the ten-property semantic API and the absence of password,
   countdown, layout, dependency-state and service properties.
3. Confirm public Coming Soon and password access remain separate surfaces in
   every target.
4. Define the public form purpose, fields, consent, backend, pending/success/
   error/retry placement, localization, analytics and persistence.
5. Decide whether Countdown is required; if so, define its complete clock,
   timezone, correction, expiry and post-expiry lifecycle before composition.
6. Review Shopify password UX/security independently, including modal versus
   inline presentation, focus/inertness/dismissal, authentication errors and
   lockout policy.
7. Create Coming Soon-specific Figma examples after browser approval and keep
   the contract `pilot` until explicit human stability approval.
