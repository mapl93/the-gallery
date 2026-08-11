# Component Dossier: Article Body / Prose

Status: `human-review-ready`

Target reviewed: Neutral Web long-form article content and Shopify Article
content projection

Contract: `components/contracts/article-body.contract.json` (`0.3.0`)

Accepted decisions: owner response L3-B and ADR 0269

## Recommendation And Accepted Direction

Foundations is the sole owner of the reusable public `.prose` style contract.
Article Body remains registry component L3 and explicitly consumes that
contract through one passive `.article-body.prose` root. L3 adds only
article-specific composition: optional drop cap, authored pull quote, passive
callout, media collections, local-overflow marker, and a canonical commerce
island.

Keep the root API at one required semantic `content` slot plus optional
`dropCap`. Product content inside the flow uses
`.prose-excluded.article-body__commerce-island` and canonical Product Card and
Price. Actual full-bleed layout belongs to the host outside Prose. Static
authored callouts remain ordinary content; targets compose canonical Alert only
for truthful alert/status behavior.

This direction is implemented and evidenced. L3 is ready for human visual
review, remains `pilot`, and is not automatically `stable`.

## Purpose, Uses, And Limits

- Presents trusted/sanitized long-form article content with a readable measure,
  semantic typography, figures, quotations, code, and tables.
- Extends generic Prose with article-specific editorial compositions without
  redefining the generic style contract.
- Supports canonical Product Card/Price islands without Prose descendant or
  inherited typography changing their contracts.
- Is not the surrounding `article`, page shell, editor, rich-block schema,
  parser, sanitizer, CMS, router, SEO/structured-data layer, syntax highlighter,
  reading-time calculator, full-bleed engine, or product data model.
- Does not infer heading ranks, image meaning, table relationships, link policy,
  callout urgency, product claims, localization, or content trust.
- Adds no listener, observer, timer, request, storage, asset, formatter,
  controlled state, or neutral runtime.

## Repository Baseline And Refinement Delta

The earlier source had two generic `.prose` implementations in Foundations and
Blog, legacy unscoped pull-quote/callout selectors, a bespoke product embed, and
a contained full-bleed hook. Its documentation still described those hooks as
unresolved compatibility behavior.

The accepted refinement now:

- moves every generic `.prose` rule to `components/css/foundations.css`;
- keeps Blog CSS to `.article-body` BEM extensions and bounded pre-v1 aliases;
- uses one shared `ArticleBodyArtwork` and `ArticleBodyFixture` in Exhibit and
  Studio;
- fails closed for null/whitespace content and emits a non-landmark `div`;
- composes canonical Product Card and Price inside `.prose-excluded`;
- resets the exclusion wrapper to the Gallery body typography baseline so
  inherited Prose size/line-height cannot leak into canonical children;
- removes current full-bleed and bespoke product-embed hooks from source,
  fixture, contract, and documentation;
- preserves native authored headings, lists, quotation, figure/caption,
  pre/code, and table relationships;
- keeps only named local code/data overflow focusable;
- maps trusted Shopify Article content without parsing or rewriting it;
- retains zero L3 JavaScript and zero L3-owned motion.

The registry remains 183 components. Foundational Prose is infrastructure, not
a second component identity.

## Standards And Mature-System Evidence

| Source | Evidence | The Gallery direction |
| --- | --- | --- |
| [HTML grouping content](https://html.spec.whatwg.org/multipage/grouping-content.html) | Paragraphs, lists, quotations, figures, preformatted content, and related native elements already carry document meaning. | Preserve supplied semantic HTML rather than invent a rich-block widget model. |
| [HTML blockquote](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element) | Attribution does not belong inside quoted content; `cite` identifies a work. | Pull quote uses figure + blockquote + outside figcaption; person and cited work stay distinct. |
| [HTML figure](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) | Figure associates self-contained content with optional caption. | Keep media/quote captions native and contextual. |
| [HTML tables](https://html.spec.whatwg.org/multipage/tables.html#the-table-element) | Caption, row/column headers, and scopes expose data relationships. | Preserve authored table semantics and wrap only when two-dimensional overflow requires it. |
| [WAI headings](https://www.w3.org/WAI/tutorials/page-structure/headings/) | Heading levels communicate page structure. | Target supplies contextual ranks; L3 never generates or promotes them. |
| [WAI images](https://www.w3.org/WAI/tutorials/images/) | Alternative text depends on the image's purpose in context. | Target owns useful alt or explicit empty alt; caption does not replace alt. |
| [WAI tables](https://www.w3.org/WAI/tutorials/tables/) | Header/data associations are essential for non-visual navigation. | Keep caption, thead/tbody, th/td, and scope relationships intact. |
| [WCAG Reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow) | Reading content should reflow without page-level two-dimensional scrolling. | Use intrinsic measure and permit local overflow only for code/data that cannot reflow. |
| [WCAG Text Spacing](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing) | User spacing overrides must not clip or hide content. | Avoid fixed heights/clamps and test complete rich content at 320px. |
| [WCAG Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Keyboard-operable links and scroll regions need visible focus. | Preserve native Link focus and 4px local-overflow focus. |
| [APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines no Prose/Article Body widget or custom keyboard model. | Use native document semantics with no root role, tabindex, live region, or roving focus. |
| [Open UI components](https://open-ui.org/components/) | Open UI defines no consensus Prose component schema. | Keep authored HTML as the stable cross-target content contract. |
| [Radix typography](https://www.radix-ui.com/themes/docs/theme/typography) | Mature typography systems separate semantic element choice from visual scale. | Style contextual elements but leave semantic rank/content to the host. |
| [Radix Callout](https://www.radix-ui.com/themes/docs/components/callout) | Alert semantics are opt-in for content requiring immediate attention. | Keep static article callouts passive. |
| [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography) | A mature Prose profile uses one root and an explicit exclusion boundary. | Keep one Foundation owner and a deterministic `.prose-excluded` island. |
| [Polaris Text](https://polaris-react.shopify.com/components/typography/text) | Visual variants can be mapped independently from semantic elements. | Do not infer authored heading ranks from Gallery typography. |
| [Shopify Liquid Article](https://shopify.dev/docs/api/liquid/objects/article) | Article exposes target-owned rendered content. | Project trusted `article.content`; target owns policy, parsing, custom blocks, and data. |

The stable consensus is native document semantics, readable tokenized flow,
contextual accessibility, local overflow for irreducible two-dimensional
content, and explicit child-component boundaries. There is no consensus for a
component-specific rich-block JSON API or Prose widget behavior.

## Anatomy And Composition

| Part | Required | Semantic mapping | Owner |
| --- | --- | --- | --- |
| Root | yes | `div.article-body.prose` | L3 boundary + Foundation Prose; host owns article/page |
| Content | yes | target-authored native children | target content/trust; Foundation rhythm |
| Pull quote | no | `figure.article-body__pull-quote > blockquote + figcaption` | target quote/source + L3 composition |
| Pull-quote attribution | no | `figcaption.article-body__pull-quote-attribution` | target attribution/work + L3 presentation |
| Callout | no | passive `.article-body__callout` group | target meaning + L3 presentation |
| Callout icon | no | decorative or target-labelled asset | target meaning + L3 placement |
| Image pair/grid | no | authored figures/media | target order/alt/crop + L3 intrinsic tracks |
| Local overflow | no | named focusable `.prose__overflow.article-body__overflow` | target label/content + Foundation scrolling/focus |
| Commerce island | no | `.prose-excluded.article-body__commerce-island` | L3 boundary + canonical Product Card/Price |

Dependencies are canonical Product Card and Price. Foundations Prose is a style
contract rather than a registry dependency. No Product Card, Price, Alert, or
full-bleed markup is duplicated by L3.

## Variant, Size, State, And Content Matrix

| Dimension | Certified behavior |
| --- | --- |
| Default | One passive readable semantic flow; no root role or focus stop. |
| Drop cap off/on | Optional visual first letter; wide uses logical float and <=18rem returns to ordinary text. |
| Empty/null/whitespace | Shared renderer omits the complete root. |
| Heading depth | Target supplies contextual H2-H6; no generated rank. |
| Pull quote | Quote remains inside blockquote; attribution is outside in figcaption. |
| Callout note/tip/warning | Static visual presentation only; no implicit alert/status/live behavior. |
| Figure/media | Contextual alt/caption, intrinsic inline containment, no viewport breakout. |
| Code/data | Named focusable wrapper scrolls only when content exceeds its local measure. |
| Commerce | Canonical Product Card/Price leaf styles equal their direct canonical baseline. |
| Short/long/localized | Complete short, long, unbroken, RTL, and extreme content remains present. |
| Effective 200% / text spacing | Root/document remain non-overflowing at 320px; local table overflow remains available. |
| Light/dark/forced colors | Semantic/system colors preserve text, borders, and focus. |
| Reduced motion | Zero L3 motion; canonical child motion also resolves to zero under reduced motion. |

There is one intrinsic size. Measure, rhythm, media minimum, commerce maximum,
border widths, icon size, and narrow threshold are private composition values.

## Public API And State Ownership

| Property | Type/default | Ownership |
| --- | --- | --- |
| `content` | required slot | Target-owned non-empty trusted/sanitized semantic long-form content. |
| `dropCap` | boolean / `false` | Optional visual first-letter treatment; meaning and source text are unchanged. |

L3 has no events or controlled/uncontrolled state. Targets replace content
through their own publishing/data lifecycle. Authored subparts remain content,
not root properties.

## Token, Value, Runtime, And Asset Audit

- Foundation Prose consumes article/H2-H4/body-small typography, semantic text,
  surface/border/focus colors, radius, and stack/layout spacing.
- L3 extensions consume accent/body/heading typography, feedback/surface/text/
  border colors, radius, and stack/layout spacing declared in contract 0.3.0.
- Private Foundation variables own readable measure, border width, and wide-data
  minimum. Private L3 variables own media minimum, commerce maximum, editorial
  rule/callout widths, and icon size.
- `45rem`, `36rem`, `18rem`, `20rem`, `12rem`, drop-cap scale, aspect ratio,
  and border widths are private validated composition values, not public API.
- `.prose-excluded` restores canonical Gallery body font/color/wrapping before
  child contracts apply; it exposes no consumer control.
- L3 adds `0 B` JavaScript, zero listeners/observers/layout reads, zero owned
  asset requests, and zero authored animation.

## Accessibility, Interaction, And Responsive Requirements

- Keep the surrounding article/page and contextual heading hierarchy host-owned.
- Preserve native lists, links, figure/caption, blockquote, pre/code, and table
  relationships in authored order.
- Keep pull-quote attribution outside blockquote and static callouts free of
  alert/status/live semantics.
- Name local overflow regions, add `tabindex="0"` only when local code/data may
  need keyboard scrolling, and preserve a 4px focus indicator.
- Keep the root/page non-scrollable horizontally; only named local regions may
  exceed their inline measure.
- Preserve complete text at 200px RTL, effective 200% at 320px, user text
  spacing, dark, forced colors, and reduced motion.
- Keep canonical child Links and any future controls native and outside Prose
  descendant styling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | `div.article-body.prose`, semantic children, BEM extensions, exclusion island, local overflow, zero L3 JS. | implemented and evidenced |
| Shopify Liquid | Passive snippet maps trusted supplied content or `article.content`; optional drop cap; empty omission. | implemented; live article section/template and custom-block policy pending |
| Hydrogen / headless | Framework-approved trusted/sanitized Article HTML plus explicit canonical islands. | contract-ready; query/cache/router/image policy target-owned |
| React / Angular | Thin passive children/slot renderer with no base state. | planned |
| Webflow / Framer | CMS rich-text root receives Prose/Article Body classes; explicit canonical islands only. | copied CSS ready; CMS allowlist/wrappers pending |
| Figma | Article flow specimen with type hierarchy, drop cap, quote/callout, media, overflow, and canonical product island. | planned; generic historical nodes are not approval |
| SwiftUI / Compose | Native attributed/document content and explicit child components. | translation documented; native dynamic type/table evidence pending |

Shopify content trust, image rewriting, custom blocks, product selection, locale,
SEO, editor lifecycle, and full-bleed host composition remain target-owned.

## Exhibit And Studio Parity

- Renderer: `site/src/components/studio/ArticleBodyArtwork.tsx`.
- Fixture: exported `ArticleBodyFixture` shared by both surfaces.
- Root: identical `.article-body.prose`; optional drop cap maps to
  `.article-body--drop-cap`.
- Required content control is checked and disabled in Studio; empty/whitespace
  behavior is verified through direct renderer calls.
- Studio metadata owns control grouping and token presentation only.
- Site presentation contains the preview but does not recreate L3 or canonical
  child visuals.
- At 620px, normalized DOM hashes match `6376077c`; selected computed styles
  match `40aea370`.

## Evidence And Validation

Batch 153 verifies:

- eight visual captures: Exhibit and Studio at Mobile, Tablet, Desktop, and XL;
- native passive root, authored headings/lists/links, valid quote attribution,
  passive callout, contextual media, pre/code, captioned/scoped table, and two
  named focusable overflow regions;
- one canonical Product Card plus Price inside one Prose-excluded island;
- direct versus embedded canonical leaf-style parity `54f43a31` / `54f43a31`;
- no legacy fixture classes, full-bleed hook, bespoke product embed, live region,
  L3 motion, console issue, page error, root overflow, or document overflow;
- visible 4px Link/overflow focus and keyboard table scrolling (`94/376`);
- wide logical drop cap and narrow ordinary-text fallback;
- short content, localized unbroken RTL at 200px, effective 200% at 320px,
  text spacing, dark, forced colors, and reduced motion;
- one browser page, closed owned session, preserved external server, and clean
  resource gate.

Machine results and screenshots are in
`output/playwright/refinement-batch-153/`. Baseline visual evidence remains in
`output/playwright/refinement-batch-104/before/`.

Validation includes registry/docs, 183 contracts, 183 Studio definitions,
254 static previews with zero errors, TypeScript `--noEmit`, Web/Shopify
adapter validation, token compatibility, temporary production build outside
`site/dist`, generated-copy identity, deterministic performance, and browser
evidence.

## Performance

| Surface | Current | Ceiling | Result |
| --- | ---: | ---: | --- |
| L3 CSS slice | `4,056 B` raw / `1,154 B` gzip | component observation | bounded; `0 B` runtime |
| Foundations family | `4,963 B` gzip | `5,427 B` | pass; `464 B` headroom |
| Blog family | `4,972 B` gzip | `5,529 B` | pass; `557 B` headroom |
| Neutral component CSS | `71,773 B` gzip | `65,536 B` | existing documented gap `6,237 B` |
| Shared runtime | `22,807 B` gzip | `8,192 B` | existing documented gap; L3 delta `0 B` |

L3 SHA-256:
`946db44d04ef88909e5703cd39862093dcdac1e89c31c9e47ed0b2356b0ef160`.
Foundations-family SHA-256:
`2acce7559c6aee84726899ca4b1282ec6125580261dd5c3eb50e034c739e9a99`.
Blog SHA-256:
`55619483d74b5bcaebb8dceeb493e3aa6a222584668d5de209390fd81876ac2b`.
Neutral component CSS SHA-256:
`3d4974a8e18956039a96f560f7fff3fc83fec9dbacbd330a0821be5e8f8c69d6`.
Runtime SHA-256:
`0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`.

The program audit reports 18 surfaces, 11 passing, seven documented gaps, and
zero undocumented gaps. No ceiling was raised.

## Remaining Risks And Human Review

- Human review must approve readable measure, type hierarchy/rhythm, drop cap,
  pull quote, callout, figure/caption, code/table, commerce-island placement,
  link treatment, and all four viewports.
- Legacy pull-quote/callout aliases must be removed before the public v1
  contract freezes; they are not used by current fixture/docs.
- A live Shopify consumer must prove content trust/sanitization policy, article
  section/template/schema/editor behavior, image rewriting, table/code wrappers,
  canonical product selection, locale, SEO, analytics, and empty/error states.
- Actual full-bleed siblings remain the host's layout responsibility.
- L3-specific Figma artwork remains missing; generic nodes are not approval.
- Seven global/family performance gaps remain documented program work; L3 adds
  no runtime and both affected local families pass.

No unresolved aesthetic, commercial, or architectural choice blocks human
review of this candidate.

## Readiness Decision

`human-review-ready`. Owner direction, source ownership, public API, native
semantics, canonical dependencies, token/value audit, local overflow,
responsive/content extremes, accessibility, cross-target mapping, exact
Exhibit/Studio parity, performance, and evidence agree. L3 remains `pilot`; no
`stable` or live-target promotion was made.
