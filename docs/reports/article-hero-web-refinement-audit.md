# Article Hero Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-08-10

Component: Article Hero (`L2`, dependency order `116`)

## Outcome

Article Hero now closes the owner-selected L2-A direction: one passive native
article-introduction header with a required contextual heading, optional target
media/category/metadata, three intrinsic editorial variants, and one mandatory
safe no-media fallback for full and split.

Missing selected media removes background/overlay/empty-track assumptions and
retains complete title/metadata in readable normal flow. Unsupported variants
normalize to full before that state is calculated, closing an inverse-on-
transparency failure path. The root remains unframed and L2 adds no runtime.

Exhibit and Studio consume the same `ArticleHeroArtwork`, fixture, DOM, source
CSS, and implementation. Shopify maps its native Article resource into the same
anatomy while media and content policy remain target-owned.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive article introduction; not article/page shell, Card, action surface, query, formatter, image service, SEO, or analytics. |
| Anatomy and composition | pass | Native header, private layout, conditional background/split media, visual-only overlay, content/category/heading/metadata. |
| Variants, sizes, and states | pass | Full, split, text-only; intrinsic 600/700px response; full/split safe no-media; malformed variant normalization; optional omission. |
| Public API and ownership | pass | Six stable semantic properties; host owns rank, crop/focal point, loading, links, metadata/locale/duration policy. |
| Tokens and hardcoded values | pass | Semantic public type/color/rhythm; private overlay, measure, height, tracks, ratio, threshold, and interpolated padding. |
| Accessibility and motion | pass | Native document semantics, contextual alt, machine times, hidden overlay/separators, no widget/focus/live behavior, zero L2 motion/runtime. |
| Responsive/content resilience | pass | Eight viewport captures, all variants/fallbacks, RTL 200px, effective 200% text, dark, forced colors, zero measured overflow. |
| Contrast | pass for fixture | Conservative white-title contrast measures 7.81:1 over all-white image composite and 21:1 over black; every live crop still needs target evidence. |
| Cross-target translation | pass with integration work | Neutral Web and Shopify Liquid implemented; live section/template and image policy remain target-owned. |
| Documentation and verification | pass | Owner response, ADR 0268, contract 0.3.0, registry, renderer, MDX, Studio, evidence, report, and matrix agree. |

## Decision Evidence

- HTML defines `header` as introductory content that does not create its own
  section: <https://html.spec.whatwg.org/multipage/sections.html#the-header-element>.
- Heading rank follows the surrounding document hierarchy:
  <https://html.spec.whatwg.org/multipage/sections.html#headings-and-outlines>.
- WAI image guidance makes alternative text contextual rather than dependent on
  visual placement: <https://www.w3.org/WAI/tutorials/images/>.
- WCAG contrast and reflow require readable content over effective backgrounds
  and narrow effective widths:
  <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html> and
  <https://www.w3.org/WAI/WCAG21/Understanding/reflow.html>.
- APG and Open UI define no Hero widget or custom keyboard model:
  <https://www.w3.org/WAI/ARIA/apg/patterns/> and
  <https://open-ui.org/components/>.
- Shopify's Article object exposes the verified title/image/author/publication
  fields used by the Liquid target:
  <https://shopify.dev/docs/api/liquid/objects/article>.

The references establish native introductory semantics, complete heading,
contextual media, contrast/reflow, and target-owned data. They do not require a
Hero role, Card surface, action model, or universal media policy.

## Contract And Browser Evidence

- Contract `0.3.0` declares ten anatomy parts, three variants, one fluid size,
  private no-media state, six semantic properties, eight behavior boundaries,
  public tokens, zero neutral runtime, and explicit adapter ownership.
- Batch 152 finds one passive `HEADER`, no role/tabindex, exactly one H2 in the
  docs context, no interactive or live descendants, contextual image alt,
  `aria-hidden=true` overlay, machine times `2026-07-12` / `PT7M`, and hidden
  visual separators.
- Split measures one `600px` column below the private threshold and two
  `350px` columns at `700px`.
- Split without media emits no media and one content column with normal title
  color. Full without media emits no background/overlay, has zero effective
  media minimum height, and uses normal title color. Text-only is centered,
  media-free, and never receives the fallback class.
- Omitting category/metadata removes both wrappers. Blank title fails closed
  with no L2 root.
- At exact `640px`, Exhibit and Studio share normalized DOM hash `c8a1c099`
  and selected computed-style hash `c148679a`.
- Mobile, Tablet, Desktop, and XL in both modes have zero root, part, and
  document overflow. Localized RTL at `200px` and effective `200%` text at
  `320px` remain complete and contained.
- White title over the conservative all-white image plus 68% black scrim
  composite measures `7.81:1`; over black it measures `21:1`.
- Dark mode preserves on-image presentation. Forced colors uses system text and
  Canvas overlay with zero overflow. Reduced motion retains zero active
  transition/animation and zero running animation.
- Console warnings/errors and page errors are empty. The run used one page,
  closed its owned `gallery-refinement` browser, preserved the responsive
  user-owned server, and passed `evidence:assert-clean`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Neutral Web | Native header/contextual heading, target slots, private fallback, named-container CSS, zero L2 JS. | implemented and evidenced |
| Shopify Liquid | `article-hero` maps Article title/image/author/date plus explicit variant, heading, label, visibility, alt policy, loading, and sizes. | implemented; live consumer pending |
| Hydrogen / headless | Project Article data into the same slots; target owns query/router/image/locale/cache. | contract-ready |
| React / Angular | Thin passive renderer preserving host hierarchy and media composition. | planned |
| Webflow / Framer | CMS mapping to the same three variants and safe media state. | planned |
| Figma | Full/split/text-only, no-media, crop, overlay, long-content states. | planned; generic nodes are not approval |
| SwiftUI / Compose | Native introductory layout with equivalent safe fallback. | translation documented |

Generated Web/Shopify/Webflow CSS remains source-derived. Shopify query,
section/template schema, editor lifecycle, focal point, image priority/sizes,
locale, SEO, analytics, and empty/error behavior remain integration work.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| L2 CSS slice | `5,272 B` raw / `1,123 B` gzip | component observation | bounded; `0 B` runtime |
| Blog CSS | `33,021 B` raw / `5,603 B` gzip | `5,529 B` | documented family gap: `74 B` |
| Neutral Web component CSS | `535,334 B` raw / `71,879 B` gzip | `65,536 B` | documented global gap: `6,343 B` |
| Shared neutral runtime | `117,741 B` raw / `22,807 B` gzip | `8,192 B` | documented global gap; L2 delta `0 B` |
| Shopify L2 runtime | `0 B` | `0 B` observation | pass |

L2 SHA-256:
`5ad7a6f665cc569d46842d73b0c7a7e4ae8b9edbeb47cbf6adcb43a2eeb586fd`.
Blog CSS SHA-256:
`e563798f81e7a56bb5f55677728dae3be5058efe2f5a402b360b4698a5f00485`.
Neutral Web component CSS SHA-256:
`115e541eb2ad1778f31c766be97b0b0a6f14e4186324387cab1e25f2bada0cf3`.
Shared runtime SHA-256:
`0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`.

The program audit reports 18 surfaces, 10 passing, 8 documented gaps, and zero
undocumented gaps. L2 adds no JavaScript and no ceiling was raised.

## Risks And Human Review

- Human review must approve full/split/text-only art direction, crop, focal
  point, text-safe area, display scale/line breaks, rhythm, minimum height,
  overlay density, and both no-media fallbacks.
- The 200px RTL stress state remains complete and non-overflowing but exposes
  intentionally extreme display density for human judgment.
- Every live full-image consumer must prove contrast across its actual crops;
  the fixture result is evidence for the implementation, not universal images.
- A live Shopify consumer must prove query/schema/editor/image/locale/SEO/
  analytics and empty/error behavior.
- L2-specific Figma artwork remains missing; generic registered nodes do not
  prove parity or approval.
- Blog-family and global CSS/runtime gaps remain documented remediation work.

## Validation

Registry/docs, all 183 contracts and Studio definitions, TypeScript, static
previews, Neutral Web and Shopify adapters, native semantics, three variants,
safe no-media states, malformed variant normalization, optional omission,
blank-title fail-closed behavior, exact Exhibit/Studio parity, four viewports,
localized RTL/effective-200-percent modes, conservative contrast, dark, forced
colors, reduced motion, deterministic performance, generated-copy identity,
temporary production build, visual inspection, diff checks, `site/dist`
cleanliness, and owned-resource cleanup are included in Batch 152.

## Readiness Decision

`human-review-ready`. ADR 0268 resolves the variant, missing-media, neutral
surface, and target ownership questions. Implementation, contract,
documentation, evidence, and adapters agree. L2 remains `pilot`; no `stable` or
live-target promotion was made.
