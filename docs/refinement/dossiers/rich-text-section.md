# Component Dossier: Rich Text Section

Status: `human-review-ready`

Target reviewed: Neutral Web with Webflow and Shopify translation

Contract: `components/contracts/rich-text-section.contract.json`

## Recommendation

Keep Rich Text Section as a passive, bounded narrative module for policies,
about pages, introductions, material notes, care guidance, and similar thematic
content inside a larger page. S15 owns an optional visible title, one required
target-owned semantic body, a readable measure, and section rhythm. The target
owns the actual copy, localization, heading rank, destinations, media meaning,
content trust, and publishing lifecycle.

Render a native `section` only when a non-empty visible title can name it with
`aria-labelledby`; otherwise render a generic `div`. Do not render `article` by
default: HTML reserves that element for complete, self-contained content that
could stand on its own. Omit the complete component when the required body is
absent instead of leaving an empty layout shell.

Do not make Article Body / Prose (`L3`) a dependency. Both profiles preserve
native document semantics, but they have different scopes. S15 is a concise
page-section profile. Article Body is an autonomous long-form editorial profile
that additionally owns drop caps, pull quotes, callouts, figures, full-bleed and
multi-image layouts, code, tables, and product embeds. Applying `.prose` to S15
would silently import those unrelated capabilities and couple a refined section
to an earlier unrefined component. Native paragraphs, headings, lists, quotes,
figures, and links remain target-owned HTML rather than Gallery component
dependencies.

Keep the public API at optional `title` and required `body`. Heading level,
maximum measure, inset, text alignment, rich-text editor schema, element allow
list, sanitization, breakpoint, block order, and link policy are target or
private concerns, not cross-target properties. The neutral component has no
events, controlled/uncontrolled state, JavaScript, or bundled asset.

For Shopify, implement a target-native merchant-editable section with a
section-level heading and required rich-text body. Keep the platform's
`richtext` value as the body source, emit the canonical S15 classes, omit empty
output, preserve translated schema labels, and add no component JavaScript.
Do not copy Dawn's alignment, full-width, color-scheme, animation, or multi-block
API into the neutral contract; those are reference-target choices rather than
stable Gallery semantics.

Human review must approve the final measure, title/body scale, vertical rhythm,
quotation, media and link treatment, and fixture. The registered
Figma nodes are Button-specific and therefore provide no S15 aesthetic
authority. The contract remains `pilot`; automated evidence must not promote it
to `stable`.

## Purpose And Limits

- Presents a bounded thematic narrative within a larger page or composition.
- Supports policies, about text, process notes, material/care guidance,
  editorial introductions, and similar content with a clear reading order.
- Preserves native paragraphs, contextual headings, ordered/unordered lists,
  emphasis, quotations/citations, figures/captions, images, and links when the
  target supplies them.
- Constrains typography and measure without flattening the document structure.
- Does not become a complete blog/article renderer, CMS, rich-text editor,
  portable-text schema, Markdown parser, sanitizer, or arbitrary HTML runtime.
- Does not own a page title, author/date metadata, table of contents, reading
  progress, drop cap, pull quote, callout, code block, data table, full-bleed
  media, gallery, product embed, or publication lifecycle.
- Does not decide legal wording, content accuracy, trust boundaries, external
  link behavior, image rights, localization, or policy freshness.
- Use Article Body when the content is a self-contained long-form publication
  or needs its advanced editorial compositions.

## Current Gallery Baseline

- Registry identity `S15`, category `sections`, selector
  `.rich-text-section`, no dependencies, dependency depth `0`, review order
  `175`, and phase `7`.
- Contract `0.2.0`, `pilot`: required root/body, optional title, one default
  variant/size, semantic-content and link-navigation behaviors, neutral Web CSS
  implemented, and Shopify planned.
- The public API contains optional `title` and required `body`; there is no
  event or state owner.
- Canonical CSS fixes a `740px` root maximum, uses full section padding,
  hardcodes title/body/heading/paragraph/media/quotation spacing, and uses a
  unitless `1.7` body line height rather than the semantic article line-height
  token.
- The body CSS covers only `h2`/`h3`, paragraphs, anchors, images, and
  blockquotes. Lists, `h4`, citations, figures/captions, native margin resets,
  text-underline offset, and complete semantic type tokens are absent.
- Shared section hardening already gives the root border-box containment,
  inline-size containment, long-string wrapping, media containment, and a
  visible two-pixel link focus outline.
- The live renderer always emits an `article`, including when the body is only
  a page fragment. It leaves an empty article shell when the required body slot
  is disabled and leaves an unnamed article when the optional title is absent.
- The fixture uses an `h2` title, paragraphs, a blockquote, an `h3`, and a link.
  The link prevents navigation only for docs evidence; this does not represent
  neutral S15 runtime.
- Exhibit and Studio already resolve the same `SectionsStudio` renderer and
  initial fixture. The MDX preview is fallback audit markup and currently uses
  a labelled `section`, so it disagrees with the live renderer's `article`.
- Studio exposes `title`, `body`, and public color/border/focus/radius tokens.
  A site-only blockquote overflow repair duplicates the canonical shared
  long-string rule and should not remain a visual implementation owner.
- The neutral Web manifest reports CSS implementation and no dependency. The
  Shopify manifest reports `css-ready`, missing Liquid/data, and a planned
  dedicated template.
- Deterministic level-9 baseline gzip is Sections `6,861 B`, generated neutral
  Web components `67,256 B`, and shared runtime `10,501 B`. Sections is exactly
  at its permanent `6,861 B` ceiling; S15 must recover bytes from its own old
  rules and add `0 B` neutral runtime.
- Registered Figma frame `943:7` is `02 / Component Detail - Studio` for
  Button, and inspector `1020:480` exposes Button label, icons, type, size,
  state, padding, gap, and related controls. These nodes are invalid as S15
  visual evidence. Current captures are under
  `output/playwright/batch74-rich-text-section/figma/`.
- Exhibit and Studio baseline root HTML is exactly equal at `509` characters.
  Both render `article`, omit `aria-labelledby`, and leave the visible title
  without an id. Clearing the title still leaves an unnamed `article`.
- At Mobile, Exhibit and Studio both resolve to `358px` width and `446.5px`
  height. Tablet is `736px` by `403.97px` on both surfaces. Desktop/XL layout
  context changes the available root width, while the normalized root HTML
  remains identical.
- Direct `200/320/520px` roots remain contained with matching client/scroll
  widths and body tracks of `131/251/451px`; wider requests remain bounded by
  their preview context. An Arabic RTL long title also remains contained.
- The link receives native focus with a visible `2px` outline and underline.
  The baseline browser recorded zero component errors or warnings.
- Browser baseline is under
  `output/playwright/batch74-rich-text-section/before/`, including all four
  viewports, link focus, direct `200px`, empty title, RTL long title, and
  `measurements.json`.
- Baseline used one `gallery-refinement` page and one agent-owned Vite server.
  Both were closed immediately; ports `4173/5173` and owned browser-process
  checks were empty after cleanup.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML sections](https://html.spec.whatwg.org/dev/sections.html) | `section` is a thematic grouping normally identified by a heading; `article` is complete, self-contained, and independently distributable or reusable. | Use a title-labelled section or a generic div. Do not emit article for an arbitrary page fragment. |
| [WAI content structure](https://www.w3.org/WAI/tutorials/page-structure/content/) | Native sections, paragraphs, lists, quotes, figures, images, and tables expose the document structure to assistive technologies and user styles. | Preserve target-authored semantic elements instead of converting rich content to decorative wrappers. |
| [WCAG 2.2 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | Structure communicated visually must be programmatically determinable; headings, lists, emphasis, and links require appropriate markup. | Semantic body content is a contract requirement, not an incidental fixture detail. |
| [WCAG 2.2 Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels) | Headings describe topic or purpose and help people locate and understand content. | Require descriptive authored headings when present and keep heading rank contextual. |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Text must reflow, resize without loss, maintain contrast, expose link purpose, and keep keyboard focus visible. | Use intrinsic containment, semantic colors, natural wrapping, descriptive native anchors, and visible focus. |
| [Open UI Text research](https://open-ui.org/components/text/) | Cross-system Text research finds no shared anatomy for a Rich Text Section and mostly catalogs leaf text presentation concepts. | Avoid inventing a widget model, keyboard behavior, or universal rich-text schema. |
| [Radix composition guidance](https://www.radix-ui.com/primitives/docs/guides/composition) | Changing the rendered element transfers responsibility for its semantics and accessibility; native defaults should be preserved. | Targets choose contextual heading elements and preserve native body markup rather than relying on generic divs plus ARIA repair. |
| [Polaris Text](https://polaris-react.shopify.com/components/typography/text?example=text-heading) | Presentation variants are separate from the semantically appropriate HTML element chosen through `as`. | Do not expose visual size as heading rank; title typography and target heading semantics remain separate. |
| [Shopify settings](https://shopify.dev/docs/storefronts/themes/architecture/settings) | Section and block schemas expose merchant-editable values and dynamic sources at the target layer. | Map title/body to target-native settings without making editor configuration the neutral component API. |
| [Shopify sections and blocks](https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks) | Sections are addable/reorderable page modules; blocks are appropriate when reorderable nested content improves usability. | S15 maps naturally to a Shopify section, but the neutral two-slot contract does not require Dawn's multi-block editor API. |
| [Shopify Dawn Rich Text](https://github.com/Shopify/dawn/blob/main/sections/rich-text.liquid) | Dawn uses a section tag and ordered heading/caption/richtext/button blocks with editor attributes plus target-specific alignment, width, color, padding, and animation settings. | Retain the section/richtext evidence; do not copy its broad presentation or button API into S15. |

WAI-ARIA APG does not define a Rich Text Section widget. S15 needs no custom
role, ARIA state, keyboard model, focus management, disclosure behavior, or
controlled state. Open UI and Radix similarly offer no corresponding composite;
native document semantics are the interoperable baseline.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when body valid | named `section.rich-text-section`; otherwise `div.rich-text-section` | S15 / target | Titled section uses the visible title as its accessible name. Untitled content does not create an unnamed section landmark. |
| Title | no | contextual heading `.rich-text-section__title` | target semantics, S15 presentation | Non-empty trimmed content only; target owns heading rank and unique id. |
| Body | yes | `.rich-text-section__body` containing native document elements | target content, S15 profile | Missing/invalid body omits the complete root. |
| Paragraph/emphasis | target-owned | `p`, `strong`, `em` | target | Meaning and authored order are preserved. |
| Nested heading | target-owned | contextual `h2`-`h6` | target | Must follow the surrounding document hierarchy; visual style does not select rank. |
| List | target-owned | `ul`/`ol` with `li` | target | Ordered meaning remains authored; S15 supplies only readable spacing/markers. |
| Quote | target-owned | `blockquote` with optional `cite` | target | Use quotation semantics only for quoted material; citation is visible when useful. |
| Figure/media | target-owned | `figure`, `img`, optional `figcaption` | target | Target owns source, dimensions, loading, alt, caption, and rights. |
| Link | target-owned | native `a[href]` | target | Descriptive name/destination; native activation and focus. |

S15 has no canonical component dependency. Native document elements are
platform semantics, not registry components. Article Body remains an adjacent
profile rather than a child; Button remains outside the two-property S15 scope.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One bounded narrative profile; no public variant modifier. |
| Size | One semantic title/body scale; no public size enum. |
| Titled | Native section named by visible title. |
| Untitled | Generic div; body remains semantic and readable. |
| Missing body | Omit the complete component. |
| Empty optional title | Omit title and use generic root; no empty heading/id. |
| Body elements absent | No reserved spacing for absent optional element types. |
| Link default/focus-visible/visited | Native anchor navigation, persistent underline, and explicit focus without hiding browser history semantics. |
| Long/localized/extreme | Wrap long words/URLs, retain authored structure, and avoid inline overflow. |
| RTL | Logical geometry and target `dir`; authored reading order remains unchanged. |
| 200% text | Reflow within the component container without clipping or horizontal page scroll. |
| Light/dark | Semantic tokens only; no fixed theme color. |
| Forced colors | Native text/link/outline remain perceivable; no decorative surface required for meaning. |
| Reduced motion | No authored animation or transition. |
| Controlled/uncontrolled | Not applicable; no value, selection, open state, or event. |

Unsupported combinations include a default article root, unnamed section,
empty root, title without body, body flattened to plain text, heading rank driven
by visual size, divs pretending to be headings/lists/quotes, fake links, hidden
focus, target sanitization in neutral runtime, viewport-swapped DOM, `.prose`
capabilities imported implicitly, and component-owned JavaScript.

## Public API And State Ownership

- `title` — optional trimmed visible string. When present, targets render a
  contextual heading with a unique id and name the native section from it.
- `body` — required target-owned semantic content slot. Targets may source it
  from trusted HTML, CMS portable content, Markdown output, framework children,
  Shopify `richtext`, or native attributed text, but parsing and trust remain
  target-owned.
- S15 exposes no `as`, heading level, title size, body size, alignment, width,
  max width, padding, gap, inset, color scheme, rich-text JSON, allowed tags,
  Markdown/HTML mode, sanitize flag, link target, image source, caption, CTA,
  block list, breakpoint, animation, or target editor setting.
- S15 emits no event and has no controlled/uncontrolled strategy. Native links
  and any future composed descendants retain their own contracts.

## Token And Value Audit

| Concern | Baseline fact | Refined result |
| --- | --- | --- |
| Title family/size | `--font-family-heading`, `--typo-h2-size` | Existing semantic H2 weight, size, line-height, family and primary color are public; heading rank remains target-owned. |
| Body type | `--typo-body-size` plus hardcoded `1.7` | Existing semantic Article body weight, size, line-height and family replace the numeric profile. |
| Text colors | Primary title/headings; secondary body; accent-mixed links | Semantic color ownership passes at `17.93:1`, `7.81:1`, and `5.88:1` in light mode; dark title/body pass at `17.18:1` and `12.09:1`. |
| Focus | Shared `--color-border-focus` outline | Visible `2px` focus and persistent underline remain canonical; thickness/offset are private. |
| Section spacing | `--space-layout-section-gap` and `--space-layout-container` | Public section rhythm/inset remain; the narrow inline inset is capped privately at `8%`. |
| Internal rhythm | `24/32/16/20px` literals | One private relative `1.25em` grid rhythm replaces per-element margins. |
| Measure | `740px` | Private `46.25rem` `max-inline-size` composes with shared `inline-size: 100%` and holds direct roots to `740px`. |
| Media radius | `--radius-md` | Removed from S15 public ownership; required base reset contains target media while targets own crop, radius and loading. |
| Border | `--color-border-default` on quotes | Logical `3px` start border with private inset; human visual review still owns the treatment. |
| Hardcoded structural values | Margin resets, `100%` media containment | Reset, `8%`, `46.25rem`, `1.25em`, `1.5em`, and `3px` remain validated private composition, not public API. |

No component-scoped public token is needed. Private measure, document rhythm,
focus geometry, quotation inset, and target media presentation remain
implementation details.

## Visual And Content Audit

- Title now has complete semantic family, size, line-height, weight and color;
  docs typography is explicitly prevented from overriding the shared renderer.
- Body now uses the semantic Article profile, a private `740px` maximum measure,
  and grid flow that adds no trailing child margin.
- Contextual `h2`-`h6` keep the heading family while native rank controls size;
  lists restore markers, quotations use logical inset/border, and target-owned
  citations/figures/media retain native semantics.
- Links keep a persistent underline, contrast-safe accent mix, descriptive copy,
  native activation/history and the shared visible focus treatment.
- Required base reset supplies block-level intrinsic media containment; S15 does
  not publish crop, radius, loading, caption or layout-shift policy.
- Test short copy, multiple paragraphs, nested headings, ordered/unordered
  lists, quote/cite, figure/caption, long URL, empty optional title, missing
  body, localized Arabic/Spanish/German, RTL, and extreme unbroken content.

## Accessibility And Interaction

- Titled root is a native thematic section named by its visible heading;
  untitled root is a generic div.
- Target heading rank follows the surrounding outline. S15 never derives the
  HTML heading level from title typography.
- Target-supplied lists, quotations, figures, images, emphasis, and links retain
  their native semantics and authored sequence.
- Informative images require useful alternative text; decorative images use an
  empty alternative. Captions do not replace an image alternative when the
  image conveys additional information.
- Link names and destinations are target-owned. Keyboard activation and history
  remain native; focus is visible in normal and forced-color modes.
- Text and links must pass theme contrast checks and remain available with user
  styles, forced colors, zoom, and 200% text.
- No ARIA widget role, `tabindex` on passive content, live region, roving focus,
  pointer handler, keyboard handler, or reduced-motion script is applicable.

## Responsive And Performance

- Test direct roots at `200`, `320`, `520`, `740`, `900`, and `1120px`, plus
  docs Mobile, Tablet, Desktop, and XL.
- Require root/body `scrollWidth === clientWidth`, a positive body content box,
  natural block flow, no clipped focus, and no viewport-only DOM or CSS branch.
- Test effective 200% text, RTL, long localized headings, long URLs, long
  unbroken words, and wide target media constrained to the body.
- Neutral S15 runtime budget is exactly `0 B`: no listener, observer, timer,
  request, parser, sanitizer, layout read, custom element, hydration, or asset.
- Sections remains capped at `6,861 B` deterministic gzip. Because the baseline
  is exactly at the ceiling, refinement must recover bytes from S15's existing
  literals/duplicated rules rather than raise the family budget.
- Generated Web components must not worsen the existing program-level `64 KiB`
  gap without measurement; shared runtime must not change for S15.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Conditional section/div, optional contextual heading, required semantic body slot, native anchors/media. | Implemented, generated, validated, browser-evidenced, and zero runtime. |
| Shopify | Addable localized section with heading and `richtext` settings, strict empty omission, canonical classes, and no JS. | Implemented and target-ready; official validation passes revision 3. |
| Webflow | Canonical CSS plus target-native Rich Text element/content source; wrapper semantics set from title presence. | Source-identical CSS regenerated; target composition remains consumer-owned. |
| React / Angular | Thin wrapper selecting section/div from title and rendering semantic children; no parser/store. | Planned. |
| Figma | Optional title and body text composition with bounded measure and semantic-content annotations; no implied HTML editor. | Planned; registered nodes incorrectly point to Button. |
| SwiftUI / Compose | Native vertical semantic text composition; links/media use platform-native accessibility and navigation. | Planned. |

## Exhibit And Studio Parity

- `SectionsStudio` is the single registered renderer for both Exhibit and
  Studio; the two surfaces must keep the same initial fixture and normalized
  root DOM.
- The initial fixture uses title plus body paragraphs, a nested heading,
  quotation with citation, list, and descriptive link so supported semantics
  are visible without becoming component defaults.
- Studio controls map `title` exactly once and the required `body` slot exactly
  once. Token controls may present only contract-public tokens.
- Disabling the required body must omit the component. Clearing the optional
  title must switch the root to an unlabelled generic div without changing body
  semantics.
- Site CSS may contain the preview canvas but must not own S15 typography,
  quote wrapping, responsive behavior, focus, or element spacing.
- The MDX preview remains a fallback audit example and must describe the same
  anatomy and omission semantics as the registered renderer.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Live root is always `article` for non-autonomous page content. | high | Resolved with title-labelled section or generic div. | standards / implementation |
| Missing required body leaves an empty shell. | high | Resolved through strict complete-root omission. | implementation |
| Optional title absence leaves an unnamed article/section semantic. | medium | Resolved with a generic div and no naming attributes. | standards / implementation |
| Baseline body profile lacks lists, citations, figures/captions, and complete type tokens. | medium | Resolved within the bounded semantic-body profile; target media/citation presentation remains private. | implementation |
| CSS uses physical quote inset and hardcoded rhythm/line height. | medium | Resolved with logical geometry, semantic type tokens and private relative rhythm. | implementation |
| Site CSS duplicates/overrides canonical presentation. | medium | Resolved by removing the quote repair and excluding Studio descendants from docs heading typography. | implementation |
| Shopify has CSS only. | high | Resolved with localized target-native `richtext` section and official validation. | target adapter |
| Article Body overlaps basic document elements but owns a much broader editorial profile. | architecture risk avoided | Keep profiles adjacent; do not import `.prose` or add a false registry dependency. | accepted dossier direction |
| Figma traceability resolves to Button. | review risk | Record the mismatch; require an S15-specific owner node for final aesthetic approval. | owner |

## Evidence And Validation

- Figma reference captures:
  `output/playwright/batch74-rich-text-section/figma/component-detail-studio.png`
  and `inspector-properties.png`.
- Before browser evidence: complete under
  `output/playwright/batch74-rich-text-section/before/` with `12` PNG captures
  and structured measurements.
- After browser evidence: complete under
  `output/playwright/batch74-rich-text-section/after/` with `18` PNG captures
  and structured `measurements.json`.
- Automatic gates include contract, Studio, docs, neutral Web adapter, Shopify
  adapter, component readiness, Exhibit/Studio parity, static previews,
  refinement report, deterministic gzip, source-copy identity, focused TypeScript
  checks, and `git diff --check`.
- Resource gate passed: `gallery-refinement` was one page; its browser and
  agent-owned Vite session were closed, and ports `4173/5173` plus owned process
  checks were empty afterward.
- `site/dist` remains untouched.

## Risks And Open Questions

- Blocking implementation decisions: none. Conditional section/div semantics,
  strict required-body omission, bounded scope, native content, zero runtime,
  and target ownership follow current standards and accepted Gallery policy.
- Human visual review remains required for measure, typography, spacing,
  quotation/media/link treatment, and fixture; the current Figma trace cannot
  supply that approval.
- A corrected S15-specific Figma component/detail node is owner follow-up, but
  it does not block technical human-review readiness.
- Target sanitization/trust, legal copy, link destination policy, media loading,
  and Shopify dynamic-source/editor governance remain explicitly target-owned.
- Article Body is still baseline-only and must be refined separately at its own
  review position; S15 must not pre-empt or redefine its advanced editorial API.

## Readiness Decision

`human-review-ready`. Research, canonical source refinement, target translation,
automated gates, paired evidence and explicit human-review questions are
complete. The incorrect Button Figma trace and aesthetic decisions remain human
work. The contract stays `pilot`; no stability promotion was made.
