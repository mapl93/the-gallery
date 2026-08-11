# Article Card Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-08-10

Component: Article Card (`L1`, dependency order `115`)

## Outcome

Article Card now implements the owner-selected L1-A direction: one passive
native article composed from canonical Card and Badge, with one native Link
containing contextual media and the complete title as one destination.
Category, author, and future independent actions remain outside the Link; the
root has no delegated behavior.

Layout profile and Card surface are independent semantic axes. Explicit
`excerptLines: none | 2 | 3 | 4` visually fits the complete target-supplied
excerpt without mutating it. Loading composes canonical Skeleton externally;
L1 exposes no loading variant, `aria-busy`, placeholder markup, or runtime.

Exhibit and Studio use the same `ArticleCardArtwork`, fixture, DOM, source CSS,
and implementation. The final visual pass also corrected author-footer spacing
so the accepted 4px primary-Link focus ring no longer covers adjacent content.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One article-summary destination; not a feed, query, router, formatter, analytics client, image service, or loading controller. |
| Anatomy and composition | pass | Native article/heading/Link; canonical Card media/body/footer and passive Badge; optional parts omitted cleanly. |
| Variants, sizes, and states | pass | Five intrinsic layout profiles, three independent surfaces, complete/2/3/4-line excerpt fitting, optional/missing-content states, external loading boundary. |
| Public API and ownership | pass | Eleven stable semantic properties; target owns rank, route, data, locale, media policy, independent actions, and loading truth. |
| Tokens and hardcoded values | pass | Semantic typography/color/spacing tokens; Card/Badge retain their visuals; private container tracks/aspects remain internal. |
| Accessibility and motion | pass | One meaningful Link, no nested controls/root delegation, contextual alt, machine times, 4px focus with footer clearance, forced colors, zero L1 motion/runtime. |
| Responsive/content resilience | pass | Eight viewport captures, five profiles, localized RTL at 200px, effective 200% text, explicit clamps, and zero measured overflow. |
| Runtime and assets | pass | `0 B` L1 JavaScript; no request, observer, timer, storage, delegation, analytics, or component-owned asset. |
| Cross-target translation | pass with integration work | Neutral Web and Shopify Liquid implemented; live consumer/query/editor evidence remains target-owned. |
| Documentation and verification | pass | Owner response, ADR 0267, contract 0.3.0, registry, renderer, MDX, Studio, evidence, report, and matrix agree. |

## Decision Evidence

- HTML permits flow content in native anchors but forbids interactive
  descendants, supporting the selected media/body/title Link with independent
  destinations outside it:
  <https://html.spec.whatwg.org/dev/text-level-semantics.html#the-a-element>.
- HTML `article` and contextual headings supply the passive self-contained
  semantic boundary:
  <https://html.spec.whatwg.org/multipage/sections.html#the-article-element>.
- WAI Technique H2 supports combining adjacent image and text destinations to
  avoid redundant Links:
  <https://www.w3.org/WAI/WCAG22/Techniques/html/H2>.
- APG defines no generic Card widget or custom card keyboard model:
  <https://www.w3.org/WAI/ARIA/apg/patterns/>.
- CSS Overflow defines line clamp as visual overflow behavior, matching the
  non-destructive explicit fitting property:
  <https://drafts.csswg.org/css-overflow-4/#line-clamp>.
- Open UI documents Card diversity rather than one universal anatomy, while
  Radix separates generic Card surface from composition:
  <https://open-ui.org/components/card.research/> and
  <https://www.radix-ui.com/themes/docs/components/card>.
- Shopify's Article object exposes the verified title, URL, image, author,
  publication, excerpt, and content data used by the target snippet:
  <https://shopify.dev/docs/api/liquid/objects/article>.

These sources support the accepted native boundary and target ownership. None
requires a widget role, duplicated destination, root click delegation,
portable metadata schema, or internal loading state.

## Contract And Browser Evidence

- Contract `0.3.0` declares canonical `card` and `badge` dependencies, thirteen
  anatomy parts, five layout variants, three Card surfaces, complete/2/3/4-line
  fitting, eleven semantic properties, explicit external Skeleton ownership,
  zero neutral runtime, and Web/Shopify mappings.
- Batch 151 finds one passive `ARTICLE`, no root role/tabindex, one native Link,
  no nested interactive descendants, media and complete H2 inside the Link,
  category and author outside it, and one canonical Card media/body/footer.
- The fixture retains contextual image alt and machine-readable publication and
  duration values (`2026-07-12`, `PT6M`). No `aria-busy`, Skeleton class,
  placeholder descendant, or internal live region is emitted.
- Clicking the passive root does nothing. Pointer and Enter activate only the
  Link and produce honest adjacent Studio feedback without pretending to
  navigate or save target data.
- Focus is a solid `4px` outline. Its outer edge clears the author content, and
  forced colors retains both the focus indicator and Card boundary.
- `default`, `flat`, and `elevated` map to canonical Card classes and measured
  shadows. `elevated + editorial` proves surface and layout remain independent.
- Standard, featured, minimal, horizontal, and editorial render through one
  intrinsic source. Minimal omits media while preserving the destination.
- A 302-character excerpt stays 302 characters in DOM. `none` measures
  `240/240px`; 2, 3, and 4 line modes measure `48`, `72`, and `96px` client
  height while their complete `240px` scroll content remains available to DOM.
- Omitting media/category/metadata/excerpt/author leaves one valid Link and no
  empty optional wrappers. Blank title or destination fails closed; restoring
  the fixture restores exactly one root.
- At exact `512px`, Exhibit and Studio share normalized DOM hash `8680eb46` and
  selected computed-style hash `7bf1e286`.
- Mobile, Tablet, Desktop, and XL in both modes have zero root, part, and
  document overflow. Localized RTL at `200px` and effective `200%` text at
  `320px` remain contained.
- Reduced motion retains zero active transition/animation and zero running
  animation. Console and page-error sets are empty.
- The run used one page in `gallery-refinement`, reused a responsive external
  server, closed the owned browser immediately, and passed
  `evidence:assert-clean` while preserving the user-owned server.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Native article/heading/one-Link composition, canonical Card/Badge classes, intrinsic CSS, zero L1 JS. | implemented and evidenced |
| Shopify Liquid | `article-card` maps Article resource fields, explicit optional flags, heading rank, layout, Card surface, excerpt fitting, image priority, and passed blog label. | implemented; live section/block consumer pending |
| Hydrogen / headless | Project Article data into the same slots; target owns router, query, locale, images, and analytics. | contract-ready |
| React / Angular | Thin native renderer with target routing interception only where required. | planned |
| Webflow / Framer | CMS data mapped to the same explicit semantic axes and slots. | planned |
| Figma | Canonical Card/Badge composition with independent layout/surface/fitting states. | planned; current generic nodes are not visual approval |
| SwiftUI / Compose | One native destination with equivalent semantic composition and target appearance primitives. | translation documented |

Generated Web and Shopify CSS remain source-derived. Shopify query, schema,
editor lifecycle, localization, empty/error states, analytics, and first live
consumer remain explicit integration work rather than neutral L1 behavior.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| L1 CSS slice | `4,884 B` raw / `1,277 B` gzip | component observation | bounded; `0 B` runtime |
| Blog CSS | `33,021 B` raw / `5,603 B` gzip | `5,529 B` | documented family gap: `74 B` |
| Neutral Web component CSS | `535,334 B` raw / `71,879 B` gzip | `65,536 B` | documented global gap: `6,343 B` |
| Shared neutral runtime | `117,741 B` raw / `22,807 B` gzip | `8,192 B` | documented global gap; L1 delta `0 B` |
| Shopify L1 runtime | `0 B` | `0 B` observation | pass |

L1 SHA-256:
`ad0f8b6eacb40ad41919051986d9975022d95ac54ca9311e5086d7b8e2d6d76e`.
Blog CSS SHA-256:
`e563798f81e7a56bb5f55677728dae3be5058efe2f5a402b360b4698a5f00485`.
Neutral Web component CSS SHA-256:
`115e541eb2ad1778f31c766be97b0b0a6f14e4186324387cab1e25f2bada0cf3`.
Shared runtime SHA-256:
`0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`.

The program audit reports 18 surfaces, 10 passing, and 8 documented gaps with
zero undocumented gaps. L1 does not add JavaScript and does not hide the
existing Blog/global overages by changing their fixed v1 ceilings.

## Risks And Human Review

- Human review must approve the five layout profiles, three surfaces,
  typography, rhythm, crop, category overlay, footer clearance, and explicit
  2/3/4-line fitting in the captured viewports.
- Targets must keep interactive metadata outside the primary Link and ensure
  essential information does not exist only past a requested clamp point.
- A live Shopify consumer must prove query, schema, editor behavior, locale and
  date policy, image priority, analytics, and empty/error behavior.
- Figma nodes remain generic historical shells rather than L1-specific owner
  artwork or parity evidence.
- Blog-family and program CSS/runtime gaps remain documented remediation work;
  no budget was silently raised.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, static
previews, Neutral Web and Shopify adapters, native semantics, pointer/keyboard
activation, focus clearance, optional omission, fail-closed required content,
five layouts, three surfaces, non-destructive excerpt fitting, exact
Exhibit/Studio parity, four viewports, localized RTL/effective-200-percent
modes, dark, forced colors, reduced motion, deterministic performance,
generated-copy identity, temporary production build, visual inspection, diff
checks, `site/dist` cleanliness, and owned-resource cleanup are included in
Batch 151.

## Readiness Decision

`human-review-ready`. ADR 0267 resolves the neutral anatomy, loading boundary,
canonical composition, surface, and excerpt-fitting decisions. Implementation,
contract, documentation, evidence, and adapter mapping agree. L1 remains
`pilot`; no `stable` or live-target promotion was made.
