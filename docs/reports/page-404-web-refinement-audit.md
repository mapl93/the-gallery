# 404 Page Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: 404 Page (`P1`, dependency order `180`)

Contract: `components/contracts/page-404.contract.json` `0.4.0`, `pilot`

ADR 0236 update (2026-07-20): the standalone 404 host owns contextual H1 and
Shopify now supplies it explicitly through canonical Empty State. Historical
fixed-H3/open-heading wording below is superseded; visual and target recovery
review remain pending.

## Outcome

P1 is now a truthful missing-resource composition instead of a page-specific
restyling of fields, actions and links. A valid renderer requires a non-empty
visible heading, non-empty explanation and at least one useful recovery path.
The explanatory core composes canonical Empty State; search composes Input and
Button; every destination composes Button or Link. The server/target retains
HTTP status, cache, router, search, records, localization and analytics.

The shared Exhibit/Studio renderer now uses a labelled contextual `section`
inside the docs site's existing `main`, eliminating the nested-main defect.
Recovery URLs are real, search feedback is explicitly local, suggestions are a
native list, responsive behavior is component-container-driven and P1 owns no
neutral runtime. Shopify retains its JSON 404 template and layout-owned main,
while its section now maps localized P1/Input/Button/Empty State classes and a
real Shopify search action. No component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Missing-resource communication and recovery only; no HTTP, cache, router, service-error, search, recommendation or analytics ownership. |
| Anatomy | pass | Contextual root, canonical Empty State core, optional decorative illustration/code, required heading/message, optional canonical primary action, search, recovery navigation and native suggestion list. |
| Required content | pass | Empty heading or message omits the complete renderer; removing search, recovery Links and suggestions also omits it. |
| Variants, states and sizes | pass | One intrinsic profile; optional illustration/code/search/recovery/suggestions combinations and dependency-owned field/action/link states are explicitly bounded. |
| Public API | pass | Seven semantic properties; lifecycle, data, service, layout and dependency-state internals remain absent. |
| State ownership | pass | P1 has no store. Canonical Input/target retain controlled/uncontrolled value and target request/result state. |
| Canonical dependencies | pass | Direct Empty State, Input, Button and Link dependencies; duplicate field/action/link focus, hover, radius, touch and transition CSS removed. |
| Document semantics | pass | Exactly one visible document `main`; component root is `SECTION`, code is redundant/hidden, search is named, query is `q`, suggestions are `UL`/`LI`. |
| Search behavior | pass | Empty submission preserves native required validation and focuses the field; a valid query produces truthful local feedback without claiming a request. |
| Navigation | pass | Zero fragment placeholders; activating Browse components reaches `/components` and native history returns to Studio. |
| Keyboard and focus | pass | Input → visible Search Button → Browse components follows DOM order with canonical solid focus outlines. |
| Responsive behavior | pass | Direct `200/320/520/1120px` hosts are contained; search stacks at narrow content width and becomes inline when space permits. |
| Content resilience | pass | Short fixture, invalid empty content, Arabic RTL/long/unbroken copy and effective 200% type remain contained. |
| Theme and modes | pass | Light/dark contrast passes after token transition; forced colors exposes system boundaries; reduced motion reports `0s` dependency transitions and zero animations. |
| DOM / CSS / runtime | pass | No P1 listener, observer, timer, request, formatter, router, animation, asset or neutral JavaScript. |
| Exhibit / Studio parity | pass | Normalized complete component outer HTML is exactly equal from the same renderer/fixture. |
| Generated targets | pass | Neutral Web validates; canonical, Webflow and Shopify Pages CSS are SHA-256-identical. |
| Shopify target | pass | Scoped Shopify Theme Check reports zero offenses; ADR 0236 maps the standalone Empty State heading to H1 explicitly. |
| Human stability | pending | Visual composition, seven-property API, recovery rule, heading translation and corrected P1 Figma evidence require explicit approval. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Root | Nested `<main>` inside the docs `<main>`. | Labelled contextual `section`; standalone target supplies the only document main. |
| Explanation | Page-specific heading/message styles. | Canonical Empty State title/message composition plus optional redundant code. |
| Search | Hidden-only label, raw input, icon-only raw action and site-only status. | Visible canonical Input label/message, named native search field and visible canonical Button. |
| Recovery | Cancelled `#home` / `#collection` fragments. | Primary Button destination plus real canonical Links. |
| Suggestions | Generic div and cancelled fragments with Studio-only cards. | Labelled native `ul`/`li` containing real canonical Links and canonical CSS. |
| Responsive | Viewport query plus Studio-only P1 breakpoints/geometry. | One named P1 container and intrinsic suggestion tracks. |
| Runtime | Local preview state surrounded page-specific presentation. | Only target-owned Studio query demonstration remains; neutral P1 contributes `0 B`. |
| Shopify | Generic wrapper and Empty State only. | Canonical P1 root/core/code/search classes, localized settings/copy and real Shopify search. |

Before evidence remains in `output/playwright/parity/pages/page-404-*.png`
(Mobile/Desktop Exhibit and Studio baseline).

After evidence is in `output/playwright/refinement/page-404/after/` (`13`
PNGs): paired Exhibit/Studio Mobile, Tablet, Desktop and XL plus Arabic
RTL/long, effective 200% type, dark, forced-colors and reduced-motion captures.

## DOM, Interaction And Responsive Evidence

The final shared fixture emits:

- one contextual `SECTION` within exactly one visible document `main` and no
  nested main;
- one decorative icon, one redundant `aria-hidden="true"` code, one H2 and one
  explanatory paragraph in canonical Empty State;
- one primary native destination, one named search form, visible Input label,
  `input[type="search"][name="q"][required]`, associated message and native
  submit Button;
- one named navigation with two real Links; and
- one labelled `SECTION`, one `UL`, three `LI` and three real suggestion Links.

The valid query `celadon vessels` yields
`Preview only: "celadon vessels" was captured locally. No request was sent.`
without changing the page URL. Empty submission reports native
`valueMissing: true`, remains invalid and focuses the search field. Activating
Browse components reaches `/components`; browser history returns to
`/components/page-404?view=studio`.

| Direct host | Root client/scroll | Search tracks | Suggestion tracks | Result |
| ---: | ---: | --- | --- | --- |
| `200px` | `200/200` | `136px` | `136px` | stacked; contained |
| `320px` | `320/320` | `256px` | `256px` | stacked; contained |
| `520px` | `520/520` | `456px` | `222px 222px` | stacked search, two suggestions; contained |
| `1120px` | `1120/1120` | `431.672px 132.328px` | three `269.3px` content tracks | inline search, three suggestions; contained |

At the docs XL Exhibit context, capping component inline padding by the actual
element gap corrects the initial finding where responsive layout gutter tokens
consumed `160px` per side of a `536px` artwork. The final same context uses
`32px` per side; Studio's wider host presents the inline search. Both are the
same container-driven implementation.

Clearing the required heading yields zero `.page-404` roots. Turning off all
three recovery slots also yields zero roots. Arabic RTL text including an
unbroken string remains `704/704px`; effective 200% type remains `644/644px`.
Normalizing only React `useId` values makes Exhibit and Studio complete outer
HTML equal at `3,423` characters.

## Accessibility And Visual Modes

- The visible heading communicates absence; the optional numeric code does not
  duplicate speech output. Decorative Package Search artwork is hidden.
- Search has both a landmark name and visible field label. Associated guidance
  remains present before submission and becomes a polite truthful status only
  after local target feedback exists.
- Recovery purpose is clear from native destination text. There are zero
  missing-fragment or cancelled navigation fixtures.
- Keyboard order from the search field reaches Search and Browse components;
  both report a solid canonical focus outline.
- Final light contrast ratios are heading `17.93:1`, message `7.81:1`, Link
  `5.89:1`, suggestion Link `5.40:1`, Button `10.37:1`. After the normal token
  transition, dark Links reach `9.94:1` on the page and `8.39:1` on suggestion
  surfaces; heading/message are `17.18:1` / `12.09:1`.
- Forced colors resolves the heading to system black and the Button border to a
  system link color in the test environment. Reduced motion reports `0s` for
  Button/Input/Link transitions and zero descendant animations.
- Fresh final console inspection reports zero warnings and zero errors.

These choices follow [RFC 9110 404 semantics](https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.5),
the [HTML `main` requirement](https://html.spec.whatwg.org/multipage/grouping-content.html#the-main-element),
[HTML search structure](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element),
[WAI heading guidance](https://www.w3.org/WAI/tutorials/page-structure/headings/),
[APG landmarks](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/),
[WCAG link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html),
the [Shopify 404 template contract](https://shopify.dev/docs/storefronts/themes/architecture/templates/404),
[Polaris Empty State](https://polaris-react.shopify.com/components/layout-and-structure/empty-state)
and [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition).
Open UI has no interoperable 404 widget, so no custom role or universal router
API is added.

## Tokens, CSS And Performance

The contract exposes 13 existing page-owned tokens for secondary text,
suggestion surface/border, H4/heading type, small radius and semantic
gutter/section/element/stack/touch spacing. It no longer exposes Input border/
focus, Button color, Link accent or transition/easing tokens; their canonical
owners retain them.

Private composition retains the `44rem` core, `36rem` search and `52rem`
suggestion measures, `clamp(4rem, 18cqi, 7.5rem)` code size and `30rem` search
stack threshold. They remain reviewable visual decisions rather than consumer
API.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Pages CSS | `2,502 B` | `2,677 B` | family-bound | `+175 B` funds native list, dependency layout and container response |
| Pages + Coming Soon | `3,503 B` | `3,632 B` | `5,427 B` | pass; `1,795 B` remaining, `+129 B` |
| Neutral Web component CSS | `67,007 B` | `67,099 B` | `65,536 B` | existing program gap becomes `1,563 B`; batch delta `+92 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; P1 delta `0 B` |

Canonical, Webflow and Shopify Pages CSS share SHA-256
`0687af5e1825bf7b6ba40b027fce5979010efb7b98c99f7f0c135703871ae07e`.
Shared runtime remains SHA-256
`1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero-runtime. |
| Webflow | Source-identical Pages CSS; hosting/router/search/data remain project-owned. |
| Shopify | Existing JSON 404 template and layout main plus localized P1/Empty State/Input/Button composition and real `routes.search_url`; scoped Theme Check has zero offenses. |
| React / Angular | Documented thin contextual/native wrapper; planned, with no P1 state store. |
| Figma | Planned; registered nodes `943:7` and `1020:480` are generic Button/Studio evidence, not P1 approval. |
| SwiftUI / Compose | Documented native unavailable-content/search/navigation translation; planned. |

The full repository Shopify Theme Check still reports four pre-existing errors
and warnings confined to `_legacy/*` plus a missing `artist_profile` schema
translation. The isolated P1 artifact at
`output/shopify-check/page404-batch79/theme-check.json` is `[]`; P1 introduces
no Shopify offense. The global baseline is not represented as a P1 pass.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- temporary Vite production build in
  `output/build/refinement-batch-79-site/`
- Shopify CLI `3.92.1` scoped Theme Check with zero offenses; global baseline
  findings recorded separately
- Chromium Mobile/Tablet/Desktop/XL, direct 200–1120px hosts, required/optional
  omission, native invalid/valid search, truthful feedback, real navigation,
  keyboard focus, RTL/long/unbroken, effective 200%, light/dark contrast,
  forced colors, reduced motion, normalized DOM parity and console
- source/generated CSS/runtime identity, deterministic gzip, `git diff --check`,
  resource cleanup and tracked `site/dist` verification

## Risks And Human Review Queue

1. Approve or revise centered hierarchy, code/illustration scale, measures,
   spacing, primary action, search arrangement and suggestion presentation.
2. Confirm the seven-property API and the relational rule requiring at least
   one recovery path.
3. Confirm target ownership of actual HTTP/cache/router/search/records/
   localization/analytics and choose real copy/destinations per product.
4. Preserve ADR 0236 contextual heading ownership in future targets; Shopify
   explicitly supplies H1 for this standalone page.
5. Supply P1-specific Figma/reference artwork; current nodes are generic Button
   shell evidence only.
6. Review existing global Web CSS/runtime and full-theme Shopify baseline gaps
   separately. P1 adds no runtime and remains within its family budget.

## Readiness

`human-review-ready`: research, canonical implementation, target translation,
responsive/interaction/accessibility evidence, documentation and component-
scoped automated gates are complete for stability review. Contract remains
`pilot`; no `stable` promotion was made.
