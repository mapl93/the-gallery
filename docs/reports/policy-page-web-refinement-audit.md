# Policy Page Template Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Policy Page Template (`P3`, dependency order `182`)

Contract: `components/contracts/policy-page.contract.json` `0.3.0`, `pilot`

## Outcome

P3 is now one passive, self-contained legal document composition rather than a
generic rich-text page or a policy lifecycle service. A valid rendering requires
a non-empty visible title and non-empty semantic body. Optional visible update
text has an independent exact machine value, and the table of contents exists
only when it can be named and supplied with synchronized canonical Links.

The shared Exhibit/Studio renderer is a labelled contextual `article` inside the
documentation site's single `main`. It preserves target-ranked headings and
authored body semantics, responds to its own container and owns no neutral
runtime. Shopify now has a strict reusable snippet that maps one real Liquid
`policy` object's title and body without inventing a date, index, template or
route. No component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One passive legal document; no CMS, editor, policy generator, legal advice, revision, localization, consent, parser, sanitizer, source or publishing ownership. |
| Anatomy | pass | Contextual article, header, required title/body, optional date, named index, ordered list, canonical Links, semantic sections and explicit wide-content overflow hook. |
| Required content | pass | Empty title or body omits the complete root instead of leaving an unnamed or incomplete legal-document shell. |
| Variants, states and sizes | pass | One intrinsic profile; absent/visible-only/exact date, absent/present index, short/long/rich body and dependency-owned Link states are bounded. |
| Public API | pass | Six semantic properties; content lifecycle, layout, active tracking, parsing and target route internals remain private or target-owned. |
| State ownership | pass | P3 has no controlled/uncontrolled state. Native fragments and target publishing replace document data without a component store. |
| Canonical dependencies | pass | Direct canonical Link dependency; Rich Text Section remains an adjacent bounded-section profile rather than duplicated document composition. |
| Document semantics | pass | Exactly one document `main`; P3 root is a title-labelled `ARTICLE`, exact metadata is `TIME[datetime]`, the index is a named `NAV`, and linked sections are unique labelled regions. |
| Optional composition | pass | Missing index title/items omits only the index; visible-only update text remains ordinary text; machine-only input emits no false date metadata. |
| Navigation | pass | Three descriptive index Links preserve body order and the first fragment resolves to exactly one section target. |
| Keyboard and focus | pass | Canonical Link reports a solid `2px` focus outline; ordinary body Links and explicit overflow regions retain visible focus treatment. |
| Responsive behavior | pass | Viewport and direct `200/320/520/1120px` host probes remain contained; one named P3 container adapts index inset without a viewport query. |
| Content resilience | pass | Required/optional omission, long Arabic RTL labels, mixed long copy, rich lists/quotation, effective 200% type and narrow measures remain contained. |
| Theme and modes | pass | Light/dark contrast passes; forced colors exposes system boundaries; P3 has no motion and dependency transitions resolve to `0s` under reduced motion. |
| DOM / CSS / runtime | pass | No P3 listener, observer, request, timer, parser, formatter, active tracker, animation, icon, asset or neutral JavaScript. |
| Exhibit / Studio parity | pass | Normalized complete component outer HTML is exactly equal at `2,162` characters from the same renderer and fixture. |
| Generated targets | pass | Neutral Web validates; canonical, Webflow and Shopify Pages CSS are SHA-256-identical. |
| Shopify target | pass | Adapter reports `implemented` and ready; strict policy-object snippet has zero Theme Check offenses. |
| Human stability | pending | Visual composition, six-property API, content-lifecycle choices and P3-specific Figma evidence require explicit owner review. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Required document | Renderer could emit an empty title/header or body-less article. | Missing title or body omits the complete component. |
| Date | Fixture date rendered as a generic paragraph. | Visible target text and exact machine value are independent; valid pairs render native `time[datetime]`. |
| Table of contents | Could remain unnamed, removed ordered markers and duplicated Link behavior. | Optional labelled native navigation with an ordered list and canonical Link leaves. |
| Body hierarchy | Generic body with section H2s beside the contextual P3 H2. | Semantic body flow with contextual labelled sections and H3 headings in the docs host. |
| Static fallback | Nested `main`, nested body `article` and inert `href="#"`. | Contextual article inside the docs main, real destination and canonical Link markup. |
| Responsive | Viewport breakpoint, physical properties and Studio-only padding. | Logical geometry, named component container and one canonical visual implementation. |
| Rich content | Narrow prose coverage; implicit scrolling on `pre` and tables. | Lists, quotations, figures/captions, media, table cells, code and an explicit named overflow hook. |
| Shopify | CSS-only planned adapter. | Reusable strict snippet mapping the real `policy` title/body; unsupported optional data is omitted. |

Baseline evidence is in
`output/playwright/refinement/policy-page/before/` (paired Mobile/Desktop
Exhibit and Studio).

After evidence is in `output/playwright/refinement/policy-page/after/` (`13`
PNGs): paired Exhibit/Studio Mobile, Tablet, Desktop and XL plus Arabic
RTL/long, effective 200% type, dark, forced-colors and reduced-motion captures.

## DOM, Interaction And Responsive Evidence

The final shared fixture emits:

- exactly one document-level `main` and one P3 `ARTICLE` labelled by its title;
- one native `TIME` whose exact `datetime` is `2026-07-12`;
- one `NAV` labelled by the visible index heading, a native ordered list and
  three canonical Links;
- three uniquely identified semantic sections labelled by contextual H3s; and
- a target-owned body preserving paragraph, list, quotation and real Link
  content in authored order.

The first index Link reports a solid `2px` focus outline and activation changes
the fragment to `#shipping-_r_0_`, which resolves to exactly one target. There
are no cancelled fragment destinations. Turning off the index keeps one valid
root and yields zero index regions. Empty title or body yields zero roots;
visible-only update text renders a `P`, while machine-only input emits no date
node.

| Context | Root client/scroll | Document body client/scroll | Result |
| --- | ---: | ---: | --- |
| Mobile `390px` | `310/310` | `390/390` | contained |
| Tablet `768px` | `688/688` | `768/768` | contained |
| Desktop `1440px` | `644/644` | `1440/1440` | contained |
| XL `1920px` | `704/704` | `1920/1920` | contained |

Direct component hosts at `200`, `320` and `520px` remain exactly
`200/200`, `320/320` and `520/520`. A requested `1120px` host is bounded by the
private readable measure at `704/704`. No probe produces component overflow.
Long Arabic title/date/index labels remain `688/688px`; effective 200% text
leaves the document body at `768/768px`.

## Accessibility And Visual Modes

- The component is native document structure, not an ARIA application or
  custom widget. Heading rank remains contextual to the host.
- The index is omitted when it cannot have a visible accessible name. Link text
  matches the target section heading and native fragment behavior is preserved.
- The exact date is never derived from localized copy. False or incomplete date
  semantics are omitted.
- Light contrast is primary `17.93:1`, secondary `7.81:1` and index Link
  `19.22:1`. Dark contrast is primary `17.18:1`, secondary `12.09:1` and index
  Link `8.40:1` after the normal theme transition.
- Forced colors exposes system border/focus colors. Reduced motion reports `0s`
  root and Link transitions and `0s` root animation duration.
- Fresh final console inspection reports zero errors and zero warnings.

These choices follow the HTML definitions of
[`article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element),
[`nav`](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element) and
[`time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element),
[WCAG reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html),
[WCAG link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html),
[USWDS in-page navigation](https://designsystem.digital.gov/components/in-page-navigation/),
[Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition)
and Shopify's documented [`policy`](https://shopify.dev/docs/api/liquid/objects/policy)
object. WAI-ARIA APG and Open UI define no Policy Page widget, so P3 adds no
custom role, keyboard model or active-section runtime.

## Tokens, CSS And Performance

The contract exposes existing page-owned primary/secondary text, index surface,
subtle/default border, focus, heading/body type, radius and semantic spacing.
Canonical Link retains its own interactive colors, focus and transition API.

The private `46.25rem` readable measure, `5rem` section scroll offset and
`0.125rem` quotation rule remain visual composition details rather than stable
consumer properties. P3 adds no public token, hardcoded color, asset or runtime.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| P3 slice | `816 B` | `1,307 B` | family-bound | `+491 B` funds semantic flow, canonical index layout and intrinsic containment |
| Pages CSS | `2,939 B` | `3,270 B` | family-bound | `+331 B` after all P3 changes |
| Pages + Coming Soon | `3,783 B` | `4,099 B` | `5,427 B` | pass; `1,328 B` remaining, `+316 B` |
| Neutral Web component CSS | `67,304 B` | `67,626 B` | `65,536 B` | existing program gap becomes `2,090 B`; batch delta `+322 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; P3 delta `0 B` |

Canonical, Webflow and Shopify Pages CSS share SHA-256
`997b194efbab43034d9226f2f7f96802660860eec8f969f3cbff9ead42feb380`.
Neutral Web component CSS is
`16219372d22ef840da35ef4efcc46d095d1c4a1a7c48cd5cf848d4a4ec3aaec9`.
Shared runtime remains
`1e682941301520ac5a172a0b9724dc3c9f0a0bca11f042b713fec2b60375e24a`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero-runtime. |
| Webflow | Source-identical Pages CSS; trusted CMS content/date/index relationships remain project-owned. |
| Shopify | Strict reusable `policy` snippet maps real title/body, omits unsupported date/index and invents no policy route or template. |
| React / Angular | Documented thin semantic wrapper with children and optional exact date/index data; planned. |
| Figma | Planned; registered `943:7` and `1020:480` nodes are generic Button/Studio evidence, not P3 approval. |
| SwiftUI / Compose | Documented native document/heading/link translation; planned, with content and navigation target-owned. |

The complete Shopify Theme Check reports four pre-existing errors and 55
warnings outside P3. Filtering the same official check yields zero diagnostics
for `snippets/policy-page.liquid`; the global baseline is not represented as a
P3 pass.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run audit:previews:static`
- `npm run audit:exhibit-studio`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- temporary Vite production build in
  `output/build/refinement-batch-81-site/`
- Shopify CLI `3.92.1` full Theme Check filtered to zero P3 offenses; global
  baseline recorded separately
- Chromium Mobile/Tablet/Desktop/XL, direct 200–1120px hosts, required/optional
  omission, exact/visible-only date, index omission, real fragment navigation,
  keyboard focus, Arabic RTL/long, effective 200%, light/dark contrast, forced
  colors, reduced motion, normalized DOM parity and console
- deterministic gzip/hash identity, TypeScript, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Risks And Human Review Queue

1. Approve or revise article measure, title/body scale, divider, update tone,
   index surface/inset/numbering, content rhythm, quotation/table/code treatment
   and narrow-container composition.
2. Confirm the six-property API and conditional index validity rule, including
   independent `updatedDateTime` ownership.
3. Choose the systems that own policy content, revisions, effective dates,
   localization, policy types, stable section ids, trust/sanitization and
   publishing; ADR 0162 intentionally does not decide them.
4. Decide whether any future target generates a sticky/current-section index
   and who would own synchronization, focus relocation and announcements.
5. Confirm that Shopify's truthful title/body-only mapping is sufficient until
   a target-specific policy inventory and route architecture is approved.
6. Supply P3-specific Figma/reference artwork and real legal-content extremes;
   current nodes are generic Button shell evidence only.
7. Review the existing global Web CSS/runtime and full-theme Shopify baseline
   gaps separately. P3 adds no neutral runtime and remains inside its family
   budget.

## Readiness

`human-review-ready`: research, canonical implementation, truthful target
translation, responsive/interaction/accessibility evidence, documentation and
component-scoped automated gates are complete for stability review. Contract
remains `pilot`; no `stable` promotion was made.
