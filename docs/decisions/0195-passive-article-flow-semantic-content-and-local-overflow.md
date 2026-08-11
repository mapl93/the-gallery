# 0195. Passive Article Flow, Semantic Content, And Local Overflow

Status: Accepted

Date: 2026-07-17

## Context

Article Body exposed one required rich-content slot plus an optional drop cap,
but Exhibit and Studio serialized different roots and fixtures. Studio emitted
an `article.prose` and site-only padding while MDX emitted `div.prose`. The
fixture placed attribution inside `blockquote cite`, direct tables owned their
own scrolling, media layouts depended on fixed/viewport dimensions, and no
Shopify mapping existed. The neutral component otherwise requires no widget or
runtime behavior.

HTML gives paragraphs, headings, lists, block quotations, figures/captions,
preformatted code, and tables native semantics. It requires quotation
attribution outside `blockquote`; figure plus figcaption can associate a quote
and its attribution. WAI guidance preserves contextual heading ranks, image
meaning, and table header relationships. WCAG reflow permits local scrolling
for genuinely two-dimensional content but not page-wide overflow. APG and Open
UI define no Prose widget. Mature systems likewise keep typography/rich-text
presentation separate from document ownership and interactive state.

The repository also contains three unresolved architecture conflicts: both
Foundations and Blog own incompatible `.prose` rules; the legacy
`.prose__product-embed` duplicates Product Card/Price behavior; and
`.prose__full-bleed` previously escaped arbitrary containers through viewport
width. Those choices cannot be resolved as incidental L3 refinements.

## Decision

- L3 is one passive, non-landmark `.prose` flow container for a required
  non-empty target-owned semantic content slot. The surrounding target owns the
  article/page boundary, document title, heading context, CMS and publishing.
- `content` remains required and `dropCap` remains the only optional public
  presentation property accepted by ADR 0079. Empty content omits the complete
  root. L3 has no controlled/uncontrolled state or neutral runtime.
- Targets preserve native paragraphs, contextual headings, lists, emphasis,
  links, block quotations, figures/captions, pre/code, and data tables. L3 does
  not parse, sanitize, edit, infer, generate, fetch, format, highlight, track,
  or mutate authored content.
- Quoted content alone belongs inside `blockquote`. Pull-quote attribution sits
  outside it as the figcaption of a containing figure; `cite` identifies a work
  title, not a person. Static callouts remain ordinary grouped content without
  an implied alert/status role.
- Wide code and genuinely two-dimensional data use a separate, explicitly
  named, keyboard-focusable `.prose__overflow` wrapper. Native pre/code and
  table/caption/header/cell semantics remain intact. The prose root and page do
  not become horizontal scroll containers or focus stops.
- Source presentation uses logical dimensions, existing semantic tokens, one
  named inline-size container, intrinsically stacking media collections,
  complete wrapping, visible link/overflow focus, forced-colors safety, and no
  authored L3 motion. Drop-cap decoration collapses to ordinary text at very
  narrow component widths.
- `ArticleBodyArtwork` and `ArticleBodyFixture` are the shared Exhibit/Studio
  renderer and specimen. The root is `div.prose`, Studio adds no L3 padding or
  semantic wrapper, and missing content renders nothing.
- Shopify receives a passive reusable snippet mapping supplied trusted content
  or native `article.content` to the same root/drop-cap contract. It does not
  rewrite HTML, inject commerce, own a section/template/schema, or add runtime.
- The prior viewport breakout becomes a contained compatibility fallback.
  Actual full-bleed ownership remains an explicit host-layout question.
- Duplicate `.prose` source ownership, canonical commerce-island composition,
  selector migration, actual full-bleed ownership, final visuals, and the first
  Shopify consumer remain open. This ADR records safe behavior without choosing
  those architecture or product answers.
- Contract and Studio metadata advance to `0.2.0`, remain `pilot`, and cannot
  become `stable` without the open decisions and explicit human review.

## Consequences

- Exhibit, Studio, Neutral Web, and Shopify now share one root/drop-cap boundary
  and truthfully keep article/document lifecycle in the composing target.
- Quotation, figure, code, and table fixtures provide valid semantic evidence;
  narrow, RTL, zoomed, localized, user-spaced, forced-color, and keyboard use no
  longer depend on viewport escapes or site-only padding.
- Targets that cannot emit named overflow wrappers must treat wide table/code
  support as incomplete rather than making all prose scrollable.
- Static authored callouts do not create false live announcements, while urgent
  dynamic target experiences may still compose the appropriate status system.
- L3 remains `refined-decision-needed`, not human-review-ready for stability,
  until one `.prose` source owner, commerce composition, breakout policy,
  selector compatibility, visual art direction, and owner evidence are chosen.

## References

- <https://html.spec.whatwg.org/multipage/grouping-content.html>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-pre-element>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element>
- <https://html.spec.whatwg.org/multipage/tables.html#the-table-element>
- <https://www.w3.org/WAI/tutorials/page-structure/headings/>
- <https://www.w3.org/WAI/tutorials/images/>
- <https://www.w3.org/WAI/tutorials/tables/>
- <https://www.w3.org/WAI/WCAG21/Understanding/reflow>
- <https://www.w3.org/WAI/WCAG21/Understanding/text-spacing>
- <https://www.w3.org/WAI/WCAG21/Understanding/resize-text>
- <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://open-ui.org/components/>
- <https://www.radix-ui.com/themes/docs/components/text>
- <https://www.radix-ui.com/themes/docs/components/blockquote>
- <https://www.radix-ui.com/themes/docs/components/callout>
- <https://polaris-react.shopify.com/components/typography/text>
- <https://github.com/tailwindlabs/tailwindcss-typography>
- <https://shopify.dev/docs/api/liquid/objects/article>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates/article>
