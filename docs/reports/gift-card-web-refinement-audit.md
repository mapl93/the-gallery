# Gift Card Page Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Gift Card Page (`P2`, dependency order `181`)

Contract: `components/contracts/gift-card.contract.json` `0.3.0`, `pilot`

## Outcome

P2 is now a truthful issued-card credential rather than a generic commerce
page. It requires issuer, target-formatted remaining balance, heading,
instructions, visible code label and selectable code. Optional decorative
media, copy, details, actions, QR and the existing pilot form boundary remain
explicit target capabilities. P2 does not purchase, redeem, refresh, associate,
print, calculate, generate QR data or own a balance service.

The shared Exhibit/Studio renderer is a labelled contextual `section` inside
the documentation site's one `main`. Copy and navigation compose canonical
Button, the optional form composes canonical Input/Button, feedback containers
exist before updates, URLs are real and the generic form is absent by default.
Responsive behavior is component-container-driven and Studio owns only fixture
media, not parallel layout or behavior.

Shopify now has a target-native non-JSON `gift_card.liquid` document mapping
the real object, balance, lifecycle, expiration, QR identifier, Apple Wallet
URL, code and shop identity. QR, copy and print live in a target-only asset. No
component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Issued credential only; purchase, redemption, freshness, account, wallet, print, QR generation and ledgers remain target-owned. |
| Anatomy | pass | Contextual root, intrinsic layout, card surface/media/content, required textual core, labelled code group, optional copy/details/actions/QR/form. |
| Required content | pass | Empty issuer, balance, heading, instructions, code label or code independently produces zero P2 roots. |
| Optional content | pass | Visual, copy, details, actions, QR and form can all be absent while the required credential remains coherent. |
| Variants, states and sizes | pass | One intrinsic issued-card profile with explicit optional-capability states and canonical dependency states. |
| Public API | pass | Twelve semantic pilot properties; no currency arithmetic, lifecycle store, QR payload, endpoints, layout measures or dependency internals. |
| State ownership | pass | P2 owns no neutral store; target owns supplied data, clipboard result and optional form service state. |
| Canonical dependencies | pass | Direct Button/Input dependencies; duplicated action/field focus, hover, touch, disabled, radius and motion CSS removed. |
| Document semantics | pass | Exactly one document `main`; P2 root is `SECTION`, details are `DL`, QR is `FIGURE`, code is native/selectable. |
| Copy behavior | pass | Visible native Button; pre-existing polite status; success and permission-denied selection fallback both verified. |
| Form behavior | pass | Absent by default; when enabled it has a visible label, `name="gift_card_code"`, native required validation and truthful local feedback. |
| Navigation | pass | Browse is a real `/components` anchor; activation and browser-history return pass. |
| Keyboard and focus | pass | Copy → Browse follows DOM order; keyboard return exposes canonical `2px solid` focus outline. |
| Responsive behavior | pass | Direct `200/320/520/1120px` hosts are contained and the split appears only from component width. |
| Content resilience | pass | Short, optional-empty, required-empty, Arabic RTL/long/unbroken and effective 200% content remain contained. |
| Theme and modes | pass | Token contrast, media-independent card scrim, forced colors and zero-motion behavior verified. |
| DOM / CSS / runtime | pass | P2 adds no neutral listener, request, timer, observer, formatter, animation, asset or JavaScript. |
| Exhibit / Studio parity | pass | Normalized complete outer HTML is exactly equal from the same renderer and fixture. |
| Generated targets | pass | Neutral Web validates; canonical, Webflow and Shopify Pages CSS are SHA-256-identical. |
| Shopify target | pass | Dedicated localized template/runtime; scoped Shopify CLI Theme Check reports zero offenses. |
| Human stability | pending | Visual composition, twelve-property API, pilot form retention and P2-specific Figma evidence require explicit approval. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Root | Nested `<main>` in the docs main. | Labelled contextual `section`; standalone target owns the document main. |
| Required content | Visual/amount/heading/code shell rendered when other essential content was empty. | Six non-empty render preconditions omit the complete invalid component. |
| Card | Media and literal scrim/text values carried the message. | Tokenized coherent no-media surface; issuer/balance are text and the solid 60% scrim zone guarantees contrast over arbitrary media. |
| Copy | Icon-only presentation, duplicated Button CSS and late-mounted status. | Visible canonical Button, selectable code and pre-existing polite success/fallback status. |
| Details / QR | Generic facts and an announced Lucide QR glyph. | Native description list and figure; graphic is hidden because the visible code is equivalent, caption explains purpose. |
| Actions | Cancelled `#browse` and neutral `window.print`. | Real native destination; wallet/print exist only in Shopify target behavior. |
| Form | Ambiguous default form without name/required and with `noValidate`. | Absent default pilot slot; enabled fixture uses named required canonical Input and native constraints. |
| Responsive | Viewport query plus Studio-only fork. | One named P2 inline-size container; narrow code/actions stack intrinsically. |
| Shopify | CSS-only, no issued-card template. | Dedicated localized document, object mapping, QR, Wallet, copy and print target asset. |

Before evidence is in `output/playwright/refinement/gift-card/before/`: paired
Mobile and Desktop Exhibit/Studio captures.

After evidence is in `output/playwright/refinement/gift-card/after/` (`13`
PNGs): paired Exhibit/Studio Mobile, Tablet, Desktop and XL plus Arabic
RTL/long, effective 200% type, dark, forced-colors and reduced-motion captures.

## DOM, Interaction And Responsive Evidence

The final shared fixture emits one contextual `SECTION` inside exactly one
visible document `main`, no nested main, one decorative image with empty alt,
one required issuer/balance/heading/instructions/code-label/code set, a native
selectable code, one canonical copy Button with a pre-existing status, one
`DL`, one real native destination and one QR `FIGURE` with assistive-hidden
graphic and visible caption.

Normalizing only React `useId` values makes Exhibit and Studio outer HTML
exactly equal at `2,860` characters. Clearing each of the six required strings
independently yields zero `.gift-card` roots. Disabling every optional slot and
clearing `copyLabel` preserves the root while visual/copy/details/actions/QR/
form are absent.

Copy succeeds with `Gift card code copied.`. With Clipboard permission forced
to reject, the exact visible `GALLERY-7K4P-92M` text becomes the document
selection and feedback reads `Gift card code selected. Copy it with your device
command.`. Keyboard focus then reaches the real `/components` anchor; activating
it reaches that route and native history returns to
`/components/gift-card?view=studio`.

Enabling the pilot form by keyboard yields a named required field with native
`valueMissing: true`. Empty submission focuses the field and leaves the
pre-existing status empty. Submitting `GALLERY-VALID` produces
`Local preview received GALLERY-VALID. No commerce request was sent.` without
claiming a target call.

| Direct test host | Root client/scroll | Layout tracks | Code tracks | Result |
| ---: | ---: | --- | --- | --- |
| `200px` | `200/200` | `136px` | `102px` | stacked; contained |
| `320px` | `320/320` | `256px` | `222px` | stacked; contained |
| `520px` | `520/520` | `456px` | `422px` | stacked; contained |
| `1120px` | `1072/1072` after host padding | `439.188px 536.812px` | inline | split; contained |

Arabic RTL/long/unbroken content remains `688/688px`; its long code remains
`371/371px`. Effective 200% type remains `644/644px` and the code remains
`544/544px`. The card text region occupies at most `74.7%` from the bottom at
Mobile and less at Tablet/Desktop/XL and 200%, so it remains completely inside
the solid first 75% of the contrast scrim.

## Accessibility And Visual Modes

- Issuer, balance and instructions remain real text; optional artwork is
  decorative and cannot become the accessible name or sole data source.
- Copy, navigation and the optional form use native controls and canonical
  focus/keyboard ownership. The visible code remains independently selectable.
- Copy and form statuses exist before text updates and do not move focus.
- Details use native terms/descriptions. QR purpose is visible while its
  generated graphic is redundant and assistive-hidden.
- Light heading/secondary token pairs are `17.93:1` / `7.81:1`; dark pairs are
  `17.18:1` / `12.09:1` after the token transition.
- The card's 60% primary-text-color scrim is solid beneath the complete text
  region. Its mathematical worst case is `5.74:1` for white text over an
  originally white light-mode image and `6.06:1` for dark text over an
  originally black dark-mode image.
- Forced colors resolves the card to system Canvas/CanvasText with a visible
  system border. Reduced motion reports `0s` for P2 and Button animation and
  transition durations.
- A post-load Exhibit/Studio interaction listener captured zero new console
  errors. The dev server's one initial `/favicon.ico` 404 is unrelated baseline
  noise.

These choices follow the [HTML `main` requirement](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element),
[HTML forms](https://html.spec.whatwg.org/multipage/forms.html),
[WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/),
[WCAG status failure F103](https://www.w3.org/WAI/WCAG22/Techniques/failures/F103.html),
[ARIA22](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22),
the [Clipboard API](https://w3c.github.io/clipboard-apis/#dom-clipboard-writetext),
[Shopify gift-card templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/gift-card-liquid),
the [Shopify gift_card object](https://shopify.dev/docs/api/liquid/objects/gift_card),
[Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements#gift-card-page-requirements),
[Polaris Button](https://polaris-react.shopify.com/components/actions/button)
and [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition).
Open UI has no interoperable gift-card component, so no custom role or
universal ledger API is added.

## Tokens, CSS And Performance

The contract exposes 30 existing page-owned color, spacing, radius, shadow,
opacity and typography tokens. It no longer exposes Button/Input focus, color,
touch or transition internals. Card/content measures, aspect ratio, split
ratio, code tracking, scrim composition and container thresholds remain
private `--_` values.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| P2 slice | `1,099 B` | `1,499 B` | component-accounted | `+400 B` funds semantics, optional regions and intrinsic response |
| Pages CSS | `2,656 B` | `2,939 B` | family-accounted | `+283 B` after removing duplicate action/field CSS |
| Pages + Coming Soon | `3,632 B` | `3,783 B` | `5,427 B` | pass; `1,644 B` remaining, `+151 B` |
| Neutral Web component CSS | `67,099 B` | `67,304 B` | `65,536 B` | existing program gap becomes `1,768 B`; batch delta `+205 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; P2 delta `0 B` |
| Shopify P2 target runtime | `0 B` | `594 B` | target-only | QR/copy/print; excluded from neutral runtime |

Canonical, Webflow and Shopify Pages CSS share SHA-256
`5e291258cb404407e93f5b1c2d80fc6294b128e6f8b76301ee14316a910b9267`.
Shared runtime remains SHA-256
`1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a`.
Shopify `gift-card.js` is `1,754 B` raw / `594 B` gzip and SHA-256
`eb69f54b47e503f75a41ed02e7e8e420b0e2e81344f70ac9ad85b1d12e0e9b7c`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero-runtime. |
| Webflow | Source-identical Pages CSS; issued-card data and capabilities remain project-owned. |
| Shopify | Dedicated localized `gift_card.liquid`, real object mapping, required 120px QR, conditional Apple Wallet, shop identity and target runtime; scoped Theme Check is clean. |
| React / Angular | Documented thin semantic wrapper with target clipboard/form callbacks; planned. |
| Figma | Planned; registered `943:7` and `1020:480` nodes are generic Button/Studio evidence, not P2 approval. |
| SwiftUI / Compose | Documented native credential/copy/QR/wallet translation; planned. |

The full Shopify theme check still reports four pre-existing errors and 55
warnings confined to `_legacy/*`, `artist-profile.liquid` and the canonical
Logo snippet. The isolated P2 artifact at
`output/shopify-check/gift-card-batch80/theme-check.json` is `[]`; P2 introduces
no Shopify offense. The global baseline is not represented as a P2 pass.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run audit:previews:static`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- temporary Vite production build in
  `output/build/refinement-batch-80-site/`
- Shopify CLI `3.92.1` scoped Theme Check with zero offenses; global baseline
  findings recorded separately
- Chromium Mobile/Tablet/Desktop/XL, direct 200–1120px hosts, required/optional
  omission, copy success/fallback, real navigation, keyboard focus, native
  invalid/valid pilot form, RTL/long/unbroken, effective 200%, light/dark,
  forced colors, reduced motion, normalized DOM parity and post-load console
- deterministic gzip/hash identity, TypeScript, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Risks And Human Review Queue

1. Approve or revise card ratio/crop/scrim, split/stack composition, typography,
   code treatment, QR placement, measures, spacing and action hierarchy.
2. Confirm the six-field required core and twelve-property pilot API.
3. Decide whether the generic `form` slot remains in stable v1 or is removed
   until a specific workflow is accepted.
4. Decide whether status, expiration, initial value or recipient information
   deserve dedicated future properties rather than the `details` slot.
5. Keep purchase, redemption, balance freshness, account association, Wallet,
   print, QR payload and services target-owned; choose final copy/actions per
   product target.
6. Supply P2-specific Figma/reference artwork; current nodes are generic Button
   shell evidence only.
7. Review the existing global Web CSS/runtime and full-theme Shopify baseline
   gaps separately. P2 adds no neutral runtime and remains inside its family
   budget.

## Readiness

`human-review-ready`: research, canonical implementation, target translation,
responsive/interaction/accessibility evidence, documentation and component-
scoped automated gates are complete for stability review. Contract remains
`pilot`; no `stable` promotion was made. The global audit now records 121
dossiers, 104 human-review-ready components and 137 dependency edges across all
183 components.
