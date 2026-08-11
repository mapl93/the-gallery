# Component Dossier: Coming Soon

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify public-page mapping and future-target translation

Contract: `components/contracts/coming-soon.contract.json`

## Recommendation

Certify Coming Soon as a public editorial launch/maintenance page, not as a
password page or authentication surface. Keep the required page heading,
optional decorative background, brand, editorial copy, real social
destinations, optional target-owned form composition and footer. Compose every
form control from canonical Input and Button and every social destination from
canonical Link. The page owns placement and reading order; those dependencies
own field, action and navigation semantics and interaction.

Remove password trigger, entry, modal, backdrop, close and authentication hooks
from the neutral X1 contract, CSS, Studio and documentation. The repository
already implements two distinct Shopify surfaces: the public
`sections/coming-soon.liquid` selected by `coming_soon_enabled`, and the
password-protected `templates/password.liquid` plus
`sections/password-content.liquid`. Preserve the latter as target-native work
outside this certification rather than keeping misleading neutral hooks.

Do not add Countdown. Its time source, timezone, update cadence, clock
correction, expiry and post-expiry policy remain an explicit product and
architecture question. A future accepted composition may add canonical
Countdown as a dependency, but v1 must not imply timing behavior.

Make the required heading a real render precondition. Omit the review renderer
when it is empty. Omit the optional form region when all of its content is
absent and never emit `aria-labelledby` without a present label target. Treat
background media as decorative because all essential information is required
to remain textual.

## Purpose And Limits

- Announces that a public collection, store, exhibition or service is not yet
  available and communicates what visitors can do next.
- Supports short brand/editorial content, optional real social destinations,
  an optional target-owned form and concise footer metadata.
- Coming Soon owns full-page composition, visual media contrast, responsive
  reading order and contextual spacing.
- Canonical Input owns labels, native field semantics, value, validation,
  messages, focus, disabled/read-only states and controlled/uncontrolled
  translation. Canonical Button owns submit/action semantics and states.
  Canonical Link owns navigation and focus.
- Targets own form purpose, endpoint, fields, consent, pending state,
  submission, success/error/retry placement, analytics and persistence.
- It is not authentication, password protection, authorization, account
  access, countdown timing, inventory, publication scheduling, CMS schema,
  campaign automation, social API integration or a generic landing-page
  builder.

## Pre-Refinement Gallery Baseline

- Registry `X1`, category `pages`, no dependencies; contract `0.2.0`, `pilot`;
  29 anatomy parts, seven states, three behaviors, twelve properties and 22
  public tokens.
- Registry, contract, CSS and sidebar name the component `Coming Soon /
  Password`, although the current Shopify repo already separates the public
  Coming Soon surface from the password template.
- Canonical CSS independently styles Input, Button, password trigger, modal,
  backdrop, panel and close behavior instead of composing canonical owners.
- CSS contains hardcoded white/black families, literal paddings, physical
  inset properties, a viewport breakpoint and duplicated field/action focus,
  hover, radius, touch and transition rules.
- Studio social Links point to missing fragments and prevent navigation.
  Activating them leaves the document URL unchanged.
- The `Private access` Button opens no surface and only writes a preview status.
  The password slot is inert text. The neutral artwork therefore advertises an
  API it cannot demonstrate or certify.
- The local form opts out of native validation. Submitting `not-an-email`
  produces `Thanks. not-an-email is on the local preview list.`
- Clearing the optional form heading leaves `.coming-soon__right` referencing
  a missing id. Clearing the required page heading leaves an empty heading and
  the component rendered.
- Background artwork is announced with descriptive alternative text even
  though it supplies no information beyond the complete textual page content.
- Exhibit and Studio use one `PagesStudio` renderer and fixture, but their
  current shared output preserves these semantic defects.
- The registered Figma nodes are the generic Button/Studio shell rather than a
  Coming Soon composition.
- Deterministic baseline is `2,184 B` gzip for Coming Soon CSS and `4,178 B`
  for the Pages + Coming Soon family, below the permanent `5.3 KiB` (`5,427 B`)
  ceiling. Generated Neutral Web CSS is `67,690 B` gzip and shared runtime is
  `10,589 B` gzip; Coming Soon adds no neutral component runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: form control infrastructure](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html) | Required email fields participate in native constraint validation, including missing-value and email type-mismatch states. | Preserve native `type="email"`, `required`, form submission and browser validation rather than accepting any non-empty preview value. |
| [WAI Forms Tutorial](https://www.w3.org/WAI/tutorials/forms/) | Forms need visible labels, instructions, validation and clear completion/error feedback; simple forms should request only necessary information. | Compose canonical Input and keep response lifecycle target-owned, concise and text-backed. |
| [WAI User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Submission success and errors need clear notification; associated messages may use `aria-describedby`, and dynamic overall errors may use alert semantics. | Keep Input messages associated and require the target to announce or navigate to a truthful outcome. |
| [WAI accessibility development tips](https://www.w3.org/WAI/tips/developing/) | Use explicit labels and empty alternative text for decorative images. | The review fixture uses a visible email label and `alt=""` for atmospheric background art. |
| [Shopify password template](https://shopify.dev/docs/storefronts/themes/architecture/templates/password) | Shopify's password template independently owns the storefront-password form and may also include a customer email signup form. | Keep Shopify password access as its own target-native template rather than neutral Coming Soon anatomy. |
| [Shopify Liquid form tag](https://shopify.dev/docs/api/liquid/tags/form) | `storefront_password` and `customer` are distinct form types with different submission contracts. | The public Coming Soon section maps only the customer signup; password authentication stays in the password template. |
| [Polaris Form](https://polaris-react.shopify.com/components/selection-and-input/form) | Native form semantics preserve Enter submission and compose TextField and Button rather than restyling them inside a page. | Coming Soon composes Input and Button and adds no second field/action API. |
| [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | A real dialog requires named content, open state, focus containment, Escape dismissal and focus restoration. | Removing inert password hooks is safer than implying that styling alone constitutes password-dialog support. |

Open UI has no Coming Soon or launch-page primitive to standardize this page
composition. Its absence is evidence that document structure and canonical
form/navigation primitives should remain primary; it does not justify a new
custom interaction role.

### Mature-system comparison

- HTML, WAI and Polaris converge on a native form containing labelled native
  fields and a submit control. The current local field/action CSS and
  `noValidate` preview diverge from that model.
- Shopify explicitly separates a password template from an ordinary public
  storefront page and distinguishes `storefront_password` from `customer`
  forms. The repository has already implemented the same boundary.
- Radix demonstrates why the current password hooks are not a dialog: there is
  no controlled open state, programmatic dialog name, focus containment,
  outside inertness or focus restoration in the neutral renderer.
- None of the mature sources defines a universal countdown or password mode
  for a Coming Soon page. Both require explicit product and target ownership.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct Plugin API inspection finds a `1280x720`
generic `02 / Component Detail - Studio` frame and a `344x684` generic Button
inspector. The frame contains Exhibit/Studio shell layers; the inspector shows
Button label, icon, type, size, state, padding, gap, touch target, radius and
color controls. It contains no Coming Soon page, background, editorial region,
form, social link, password surface, responsive state or page-specific token.
It validates the shared Exhibit/Studio methodology only. The repository
candidate remains the visual proposal for human review.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | standalone `main` or contextual labelled `section` in docs | Coming Soon / target | Omitted when the required heading is empty; one standalone page `main` only. |
| Background | no | decorative image/media | target | Uses empty alt; essential information stays textual. |
| Brand | no | logo or text composition | target | Does not replace the required page heading. |
| Inner layout | yes | `.coming-soon__inner` | Coming Soon | Preserves editorial-first source order at every container size. |
| Editorial region | yes | contextual container | Coming Soon / target | Contains required heading and optional copy. |
| Heading | yes | contextual page-level heading | target | Non-empty render precondition; rank follows host document. |
| Subtitle | no | paragraph | target | Concise editorial support. |
| Body | no | flow-content slot | target | Long/rich content trust and source remain target-owned. |
| Social group | no | named navigation when destinations are present | target | Contains canonical Links with real `href` values. |
| Form region | no | contextual container | Coming Soon | Emitted only for present form heading, description or form composition. |
| Form heading | no | contextual heading | target | Labels the form only when present. |
| Form description | no | paragraph | target | Instructions precede the fields they describe. |
| Form | no | native form slot | target | Composes canonical Input and Button; endpoint and response lifecycle remain target-owned. |
| Footer | no | contextual footer | target | Concise legal/brand metadata; no global site-footer ownership. |

## Variant, Size, State, And Mode Matrix

- Variant/size: one editorial full-page profile. Page width, split ratio,
  measures and breakpoint remain private composition decisions.
- Background: absent neutral surface or present decorative media with scrim and
  inverse text. Media never carries essential content.
- Brand: absent, text or target logo composition.
- Editorial content: required heading; optional subtitle/body/social Links in
  every coherent combination.
- Form region: absent; heading/description only; form only; or complete
  heading, description and native form. Label relationships exist only when
  their targets exist.
- Form dependency states: Input default/error/success/warning/hover/focus/
  disabled/read-only and Button default/hover/active/focus/disabled/loading are
  dependency-owned, not Coming Soon variants.
- Responsive: intrinsic split above the component container threshold and
  editorial-first stack below it. No Studio-only breakpoint behavior.
- Content extremes: short, long, empty optional, localized, RTL, unbroken,
  multi-paragraph and 200% zoom.
- User modes: light, dark, forced colors, reduced motion, keyboard, touch,
  screen reader and no-hover input.
- Password and Countdown are absent modes, not hidden states.

## Public API And State Ownership

Expose ten semantic properties:

- `backgroundMedia` - optional decorative full-page media slot.
- `brand` - optional logo or store-name slot.
- `heading` - required visible page heading.
- `subtitle` - optional editorial subtitle.
- `body` - optional supporting flow-content slot.
- `socialLinks` - optional canonical Link destinations.
- `formHeading` - optional visible form-region heading.
- `formDescription` - optional form instructions.
- `form` - optional native form composed from canonical Input and Button.
- `footer` - optional footer metadata/legal slot.

Remove `passwordTriggerLabel` and `passwordEntry`. Do not add `countdown`,
`launchDate`, `timezone`, `open`, `defaultOpen`, `password`, `authenticated`,
`email`, `value`, `defaultValue`, `loading`, `success`, `error`, `onSubmit`,
`onPasswordSubmit`, layout ratio, padding, breakpoint, overlay opacity or
dependency variants to the page contract.

Coming Soon has no controlled/uncontrolled store. Native inputs own live value
and native form semantics; framework targets may bind the same fields in
controlled or uncontrolled form. The target owns request and response state.

## Token And Value Audit

- Keep page-owned surface, primary/secondary/inverse text, scrim opacity,
  complete display/heading/body/caption typography and semantic container/
  section/element spacing tokens.
- Remove Button background/text/hover, feedback, border, radius, transition,
  easing and touch-target tokens from Coming Soon. Their canonical owners keep
  them.
- Replace hardcoded light/dark text families with semantic inverse tokens and
  a private palette-neutral scrim using the accepted scrim-opacity token.
- Keep component max measure, copy measure, form measure, split ratio and
  container threshold private. They are visual composition, not consumer API.
- Use logical properties and a named container query. Remove the viewport media
  query and Studio-only component layout overrides.

## Accessibility And Interaction

- Require one non-empty visible heading and omit invalid required composition.
- In standalone targets use one `main`; inside the docs page use a labelled
  `section` to avoid nested page landmarks.
- Keep atmospheric background media decorative with `alt=""` and all essential
  information in text.
- Preserve editorial-first DOM/source order when the layout becomes one column.
- Render real canonical social Links. Do not prevent activation or use missing
  fragment destinations.
- Compose a visible Input label, native `type="email"`, native `required`,
  associated message and submit-capable Button. Do not bypass native constraint
  validation in the review fixture.
- The target must expose truthful pending, success, error and retry feedback;
  the neutral page does not claim that a network request occurred.
- Omit form-region `aria-labelledby` when no heading exists; omit the whole
  region when it has no content.
- Forced colors must suppress decorative media/scrim interference and preserve
  Canvas/CanvasText legibility. Coming Soon adds no motion.

## Responsive And Performance

- Establish a named inline-size container on the root. The inner layout uses a
  private two-column ratio and stacks at the component threshold, independent
  of browser viewport or Studio host.
- Use logical padding/insets and bounded copy/form measures. Long, localized,
  RTL and unbroken content wraps without horizontal overflow.
- Page DOM and work are constant apart from target-owned slot content. Coming
  Soon owns no listener, observer, timer, request, formatter, auth store,
  countdown loop, layout read, animation, icon or neutral asset.
- Neutral runtime contribution remains `0 B`.
- Permanent Pages + Coming Soon ceiling remains `5.3 KiB` (`5,427 B`) gzip.
  Removing modal and duplicate form/action CSS should reduce the family bundle
  and creates no new runtime ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Contextual page/section with decorative media, required heading, optional editorial content, canonical Links and target-owned native form composed from Input/Button. | Implemented, generated, validated and browser-evidenced; zero neutral runtime. |
| Shopify public page | `coming_soon_enabled` selects `sections/coming-soon.liquid`; customer form maps visible Input anatomy and canonical Button, with section settings as target data. | Implemented and validated with one layout-owned `main`, valid skip target, required heading, visible labels and result semantics. |
| Shopify password page | Independent password layout/template/content using `storefront_password` and optional customer form. | Preserved and validated as a target-native surface explicitly outside X1 certification; UX/security review remains independent. |
| React / Angular | Thin composition around target document structure, Input, Button and Link with target-owned form state. | Planned; no page state store. |
| Figma | Reviewed page frame containing approved Input, Button and Link instances. | Planned; registered reference is generic Button artwork. |
| SwiftUI / Compose | Target-native full-screen editorial composition with native form/navigation components. | Conceptual; publication, password and countdown services remain target-owned. |

## Exhibit And Studio Parity

- Exhibit and Studio keep one `PagesStudio` renderer and one fixture.
- The fixture omits password content, uses real visible social destinations,
  decorative background art, canonical Input/Button form semantics and truthful
  local-preview feedback.
- Required heading omission returns no component. Form heading omission leaves
  no dangling relationship; disabling all form-region content omits the region.
- Evidence must cover four paired viewports, default/media/no-media,
  form/no-form, valid/invalid email, real Link navigation, long/localized/RTL/
  unbroken content, zoom, themes, forced colors, reduced motion, exact DOM
  parity and source/generated identity.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Neutral contract conflates public Coming Soon with Shopify password access. | high | Remove password API/CSS and preserve password as a separate target-native template. | implementable from current repo facts and official target model |
| Input and Button visual/interaction CSS is duplicated. | high | Register direct dependencies and retain only form layout at page level. | implementable from accepted composition principle |
| Password Button/slot are inert in Studio. | high | Remove them rather than preserving misleading compatibility hooks. | implementable strict correction |
| Invalid email is accepted by the local fixture. | high | Restore native required/email constraint validation and truthful local feedback. | implementable native semantic correction |
| Social Links prevent navigation to missing fragments. | high | Compose canonical Link with real destinations. | implementable now |
| Optional form heading creates a dangling label. | high | Make form labelling and the entire region conditional. | implementable semantic correction |
| Empty required heading still renders the page. | high | Omit invalid required composition. | implementable now |
| Decorative background is announced. | medium | Use empty alt because essential information is textual. | implementable now |
| CSS owns hardcoded/dependency values and viewport/Studio breakpoints. | medium | Keep only page composition tokens/private values and use a named container. | implementable now |
| No component-specific Figma artwork exists. | human review | Present the repository candidate and request aesthetic approval. | owner |
| Countdown, publication scheduling and final Shopify password UX remain open. | product/architecture | Keep explicit; do not infer them in X1. | owner/target team |

## Risks And Open Questions

- Human review must approve the split-screen versus stacked composition,
  measures, typography, scrim, brand/footer placement and social/form treatment.
- Countdown composition remains unresolved: time source, timezone, cadence,
  correction, expiry and post-expiry behavior require one complete decision.
- Target form purpose, consent, data policy, result placement, pending/retry and
  analytics remain target-owned.
- Shopify password-page modal versus inline access remains outside this batch;
  its target-specific focus/inertness/dismissal behavior needs separate review.
- Merchant heading requirements, social destinations, rich-text trust,
  localization, launch-state scheduling and editor preview policy remain
  target decisions.
- Figma, framework and native adapters remain unimplemented.
- No promotion to `stable` is permitted without explicit human review.

## Refinement Result

- Advanced the contract to `0.3.0`, kept `pilot`, renamed the component
  `Coming Soon`, and added direct `input`, `button` and `link` dependencies.
- Removed password properties, anatomy, states, CSS, Studio controls and inert
  renderer behavior without compatibility aliases. ADR 0144 records Shopify's
  independent target-native password surface and keeps Countdown open.
- Reduced the page to the ten semantic properties listed above. Missing
  required heading omits the renderer; optional form labelling and the entire
  empty form region now omit coherently.
- Replaced duplicate local field/action/navigation behavior with canonical
  Input, Button and Link composition. Social destinations are real; the review
  form preserves native required/email validation and reports truthful local
  preview feedback.
- Replaced hardcoded color families, physical layout and the viewport/Studio
  split with semantic tokens, private composition values, logical dimensions
  and one named container query.
- Updated MDX, Studio metadata, open questions, public Shopify Liquid, the
  independent Shopify password composition and generated Web/Shopify/Webflow
  adapters.

## Evidence And Validation

- Eight paired baseline and eight paired final captures cover Mobile
  `390x844`, Tablet `768x1024`, Desktop `1440x1000` and XL `1920x1200` under
  `output/playwright/refinement-batch-59/`; six special captures cover long
  Spanish, full Arabic RTL, 200% zoom, no-media light/dark and forced colors.
- Mobile and Tablet roots are `358/358px` and `736/736px` in both views.
  Desktop exercises `580px` Exhibit and `692px` Studio; XL exercises `584px`
  and `752px`. All roots and documents have equal client/scroll width.
- Long localized/unbroken content remains `736/736px`; full Arabic RTL remains
  `358/358px`; 200% zoom retains a `163/163px` logical root and a `390/390px`
  document.
- Native invalid email remains invalid with its browser type-mismatch message;
  valid email yields a truthful no-request preview status. Heading/form-region
  omission, decorative media, real Links and Link/Input/Button keyboard order
  pass.
- Exhibit and Studio initial root DOM match after normalizing React-generated
  relationship-id suffixes at `1,937` characters with SHA-256
  `e23b301977fe4646e7975a034135dd6c0a7a66d48b1a68c40b99cd69260240fc`.
- Light no-media contrast ranges from `7.81:1` to `17.93:1`; dark ranges from
  `12.09:1` to `17.93:1`. The canonical media scrim's conservative worst case
  remains `4.57:1`; forced colors hides the image and reduced motion has zero
  non-zero durations.
- Canonical, Shopify and Webflow Coming Soon CSS are byte-identical at SHA-256
  `4885640f28489a3f8fbdb8afcf39e27af96157a5601c659b2dfc132d846d2f9d`.
  Source, Web and Shopify runtime are also byte-identical; Coming Soon adds no
  component runtime.
- Coming Soon CSS falls from `2,184 B` to `1,370 B` gzip. Pages + Coming Soon
  falls from `4,178 B` to `3,503 B`, leaving `1,924 B` below its `5,427 B`
  ceiling. Neutral Web CSS improves by `806 B`; existing global CSS/runtime
  gaps remain visible rather than being reset.
- Registry/docs, 183 contracts, 183 Studio definitions, Web/Shopify adapters,
  Shopify Liquid revision 5, temporary site build, source-copy identity,
  browser evidence, program audits and diff checks pass. The permanent audit is
  `docs/reports/coming-soon-web-refinement-audit.md`.

## Readiness Decision

Coming Soon is `human-review-ready` for Neutral Web and remains `pilot`. Its
technical, semantic, responsive, accessibility, adapter and parity gates are
reconciled. Human visual/product review and explicit stability approval are
still required. Countdown, form-service policy, password-target UX/security
and dedicated future-target adapters remain deliberately unresolved.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Remaining Human Review

- Approve or revise split/stack composition, measures, alignment, typography,
  spacing, image crop, scrim, brand/footer placement and social/form treatment.
- Confirm the ten-property API and strict absence of password, countdown,
  layout, dependency-state and service controls.
- Confirm public Coming Soon and password access remain independent target
  surfaces.
- Define target form purpose, fields, consent, backend, pending/success/error/
  retry placement, localization, analytics and persistence.
- Decide whether Countdown is required and, if so, define its complete time,
  timezone, correction, expiry and post-expiry lifecycle before composition.
- Review Shopify password UX/security independently and create component-
  specific Figma examples after browser approval.
