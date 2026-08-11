# Article Body / Prose Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-08-10

Component: Article Body / Prose (`L3`, dependency order `117`)

## Outcome

Article Body now closes owner-selected L3-B. Foundations is the sole owner of
the reusable `.prose` contract; L3 explicitly consumes it through
`.article-body.prose` and owns only article-specific BEM extensions.

The component remains a passive fail-closed non-landmark flow with required
target-owned semantic content and optional drop cap. Pull quotes, static
callouts, media collections, named local overflow, and canonical Product Card /
Price commerce islands are reconciled without a rich-block schema or runtime.

The bespoke product embed and full-bleed hooks are gone. Actual full bleed is a
host-layout sibling outside Prose. Legacy pull-quote/callout aliases remain only
for the accepted pre-v1 migration cycle.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive long-form flow; not article/page, CMS, parser, sanitizer, editor, SEO, breakout, product model, or formatter. |
| Anatomy and composition | pass | `.article-body.prose`, native authored elements, Article Body BEM extensions, local overflow, canonical commerce island. |
| States, variants, sizes, modes | pass | Default + optional drop cap, fail-closed empty, passive callouts, intrinsic media, local code/data overflow, one fluid size. |
| Public API and state | pass | Required `content`, optional `dropCap`; no events or controlled/uncontrolled state. |
| Canonical dependencies | pass | Product Card and Price render canonically inside `.prose-excluded`; no duplicate markup/behavior. |
| Tokens and hardcoded values | pass | Public semantic type/color/rhythm; private measure, widths, tracks, drop-cap geometry, and exclusion baseline. |
| Accessibility and keyboard | pass | Native hierarchy, valid attribution/table semantics, passive callout, named regions, 4px focus, local keyboard scrolling, no live behavior. |
| Responsive/content resilience | pass | Eight captures; short, localized RTL 200px, effective 200%, text spacing, dark, forced colors, reduced motion; zero root/document overflow. |
| Runtime and performance | pass locally | Zero L3 JS/assets/observers; Foundations and Blog families both below ceilings. |
| Cross-target translation | pass with integration work | Neutral Web and Shopify snippet implemented; live consumer policy remains target-owned. |
| Documentation and verification | pass | Owner response, ADR 0269, contract 0.3.0, registry, renderer, MDX, Studio, evidence, report, and matrix agree. |

## Decision Evidence

- HTML native grouping, quotation, figure, pre/code, and table semantics remain
  the stable content model:
  <https://html.spec.whatwg.org/multipage/grouping-content.html> and
  <https://html.spec.whatwg.org/multipage/tables.html#the-table-element>.
- WAI guidance keeps heading rank, image alternatives, and table relationships
  contextual:
  <https://www.w3.org/WAI/tutorials/page-structure/headings/>,
  <https://www.w3.org/WAI/tutorials/images/>, and
  <https://www.w3.org/WAI/tutorials/tables/>.
- WCAG reflow, text spacing, resize, and focus require complete narrow content
  and visible keyboard focus:
  <https://www.w3.org/WAI/WCAG21/Understanding/reflow>,
  <https://www.w3.org/WAI/WCAG21/Understanding/text-spacing>, and
  <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>.
- APG and Open UI define no Prose widget or replacement focus model:
  <https://www.w3.org/WAI/ARIA/apg/patterns/> and
  <https://open-ui.org/components/>.
- Tailwind Typography demonstrates a single Prose root plus explicit excluded
  islands; Radix/Polaris keep semantic elements and visual typography
  composable rather than inventing a long-form widget schema:
  <https://github.com/tailwindlabs/tailwindcss-typography>,
  <https://www.radix-ui.com/themes/docs/theme/typography>, and
  <https://polaris-react.shopify.com/components/typography/text>.
- Shopify Article provides target-owned rendered content:
  <https://shopify.dev/docs/api/liquid/objects/article>.

## Contract And Browser Evidence

- Contract `0.3.0` declares ten anatomy parts, one default variant, one fluid
  size, five documented states, two semantic properties, twelve behavior
  boundaries, Product Card/Price dependencies, zero neutral runtime, and
  explicit adapter ownership.
- Batch 153 finds one passive `DIV.article-body.prose`, no root role/tabindex,
  authored H2/H3 hierarchy, five paragraphs, three list items, two native
  Links, valid figure/blockquote/outside figcaption attribution, passive
  callout, two contextual images, pre/code, captioned table, four column scopes,
  two row scopes, and two named focusable overflow regions.
- Null and whitespace omit the root. Text plus drop cap produces exactly
  `article-body prose article-body--drop-cap`. The required Studio content slot
  remains checked and disabled.
- One Product Card and one Price are inside one Prose-excluded island. Embedded
  and direct canonical leaf-style hashes both equal `54f43a31`, proving no
  Prose selector or inherited typography leak.
- Current fixture contains zero legacy alias classes, full-bleed hooks, bespoke
  product embeds, live regions, or L3 moving parts.
- Link focus and both local regions show 4px outlines. The code region fits at
  200px; the table region scrolls by keyboard to `94/376` without root/document
  overflow.
- Drop cap uses logical `inline-start` float when wide and returns to ordinary
  text below the private 18rem threshold.
- At exact 620px, Exhibit and Studio share DOM hash `6376077c` and selected
  computed-style hash `40aea370`.
- Mobile, Tablet, Desktop, and XL in both modes have zero root, ordinary-part,
  and document overflow. Localized unbroken RTL at 200px, effective 200% at
  320px, and text-spacing overrides remain complete and contained.
- Dark mode remains readable. Forced colors preserves system text/borders and a
  4px overflow outline. Reduced motion has zero non-zero motion and zero running
  animations.
- Console warnings/errors and page errors are empty. One page was used; the
  owned browser closed, the external server was preserved, and
  `evidence:assert-clean` passed.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Foundation Prose + Article Body BEM extensions + canonical exclusion island + zero L3 JS. | implemented and evidenced |
| Shopify Liquid | Trusted supplied content or `article.content`, optional drop cap, empty omission, no parsing/rewriting. | implemented; live consumer pending |
| Hydrogen / headless | Trusted/sanitized Article HTML and explicit canonical child islands. | contract-ready |
| React / Angular | Thin passive children/slot renderer. | planned |
| Webflow / Framer | CMS rich text with Prose/Article Body root and explicit islands. | CSS copied; CMS integration pending |
| Figma | Long-form hierarchy, extensions, overflow, and canonical commerce composition. | planned; generic nodes are not approval |
| SwiftUI / Compose | Native document/attributed content plus native canonical children. | translation documented |

Generated Web, Shopify, and Webflow CSS is source-derived. Shopify trust,
section/template/schema/editor behavior, custom blocks, image rewriting,
product selection, locale, SEO, analytics, and empty/error handling remain
target work.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| L3 CSS slice | `4,056 B` raw / `1,154 B` gzip | component observation | bounded; `0 B` runtime |
| Foundations family | `4,963 B` gzip | `5,427 B` | pass; `464 B` headroom |
| Blog family | `4,972 B` gzip | `5,529 B` | pass; `557 B` headroom |
| Neutral Web component CSS | `71,773 B` gzip | `65,536 B` | documented global gap `6,237 B` |
| Shared neutral runtime | `22,807 B` gzip | `8,192 B` | documented global gap; L3 delta `0 B` |
| Shopify L3 runtime | `0 B` | `0 B` observation | pass |

L3 SHA-256:
`946db44d04ef88909e5703cd39862093dcdac1e89c31c9e47ed0b2356b0ef160`.
Foundations-family SHA-256:
`2acce7559c6aee84726899ca4b1282ec6125580261dd5c3eb50e034c739e9a99`.
Blog SHA-256:
`55619483d74b5bcaebb8dceeb493e3aa6a222584668d5de209390fd81876ac2b`.
Neutral Web component CSS SHA-256:
`3d4974a8e18956039a96f560f7fff3fc83fec9dbacbd330a0821be5e8f8c69d6`.
Runtime SHA-256:
`0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`.

The program audit reports 18 surfaces, 11 passing, seven documented gaps, and
zero undocumented gaps. The audit therefore retains its non-zero program-gap
exit while L3's affected families pass. No ceiling was raised.

## Risks And Human Review

- Human review must approve measure, typography/rhythm, drop cap, pull quote,
  callout, media/caption, code/table, Link treatment, commerce-island placement,
  and four-viewport presentation.
- Remove bounded legacy pull-quote/callout aliases before the public v1
  contract freezes.
- A live Shopify consumer must prove content trust, section/template/schema/
  editor behavior, image rewriting, table/code wrappers, product selection,
  locale, SEO, analytics, and empty/error states.
- Actual full-bleed placement remains host-layout work outside Prose.
- L3-specific Figma artwork remains missing; generic nodes do not prove parity.
- Seven documented program performance gaps remain remediation work.

No unresolved product or architecture decision blocks human review.

## Validation

Registry/docs, all 183 contracts and Studio definitions, 254 static previews,
TypeScript, Neutral Web and Shopify adapters, token compatibility, source-copy
identity, native semantics, canonical child composition, empty/drop-cap states,
keyboard/focus, exact Exhibit/Studio parity, four viewports, localized RTL,
effective 200%, text spacing, dark, forced colors, reduced motion,
deterministic performance, temporary production build outside `site/dist`,
visual artifacts, and owned-resource cleanup are included in Batch 153.

## Readiness Decision

`human-review-ready`. ADR 0269 resolves generic Prose ownership, canonical
commerce islands, full-bleed ownership, passive callouts, and alias migration.
Implementation, contract, documentation, adapters, performance, and evidence
agree. L3 remains `pilot`; no `stable` or live-target promotion was made.
