# 0157. Bounded Rich Text Section Semantics And Target-Owned Content

Status: Accepted

Date: 2026-07-16

## Context

S15 Rich Text Section is intended for bounded policy, about, process, material,
care, and similar narrative content inside a larger page. Its initial contract
exposed an optional title and required rich body, but the live renderer always
emitted `article`, never named the root from its visible title, and retained an
empty shell when the required body was absent. Canonical CSS covered only a
subset of the documented body semantics and duplicated one overflow repair in
Studio.

The adjacent Article Body / Prose component shares native paragraphs, headings,
lists, quotations, figures, and links, but its contract is independently
publishable long-form editorial content with drop cap, pull quote, callout,
full-bleed and multi-image layouts, code, tables, and product embeds. Making it
a dependency would import unrelated capability and couple S15 to an earlier
unrefined component.

HTML sectioning semantics, WAI content-structure guidance, WCAG information and
relationships, Open UI Text research, Radix native-element composition,
Polaris's separation of semantic element and visual text variant, Shopify
section/editor guidance, and Dawn's target-native rich-text section establish a
complete technical direction. The registered Figma references show Button and
cannot approve S15 aesthetics.

## Decision

- Rich Text Section is a passive bounded narrative module inside a larger page.
  It is not a complete article, CMS, editor, parser, sanitizer, document schema,
  or publication surface.
- A non-empty visible title creates a native `section.rich-text-section` named
  through `aria-labelledby` and a target-unique title id. Without a title,
  targets render a generic `div.rich-text-section`; S15 never defaults to an
  unnamed section or autonomous article.
- One non-empty semantic `body` slot is required. Missing body content omits the
  complete root instead of leaving an empty layout shell.
- Targets preserve native paragraphs, contextual headings, ordered/unordered
  lists, emphasis, quotations/citations, figures/captions, images, and links in
  authored order. Targets own content trust, sanitization, parsing, heading
  rank, destinations, external-link policy, media meaning/loading, localization,
  legal copy, and publishing.
- The public API remains optional `title` plus required `body`. Element type,
  heading rank, text size, alignment, measure, spacing, editor schema, allowed
  tags, blocks, breakpoint, color scheme, CTA, animation, and target settings do
  not become neutral properties.
- Article Body is an adjacent profile, not an S15 dependency. Shared native
  document elements are platform semantics; S15 does not consume `.prose`,
  drop-cap, callout, code, table, full-bleed, gallery, or product-embed behavior.
- S15 owns a private readable measure, flow rhythm, list/quotation inset, and
  quotation border width. Public tokens cover semantic title/body typography,
  text/border/focus colors, and section spacing; implementation literals do not
  become consumer API.
- Responsive behavior is intrinsic to component inline space and uses logical
  geometry. RTL, long/unbroken/localized content, zoom, text resizing, media,
  focus, forced colors, and user styles do not require alternate DOM or runtime.
- Rich Text Section has a `0 B` neutral runtime budget: no event, state store,
  listener, observer, request, timer, parser, sanitizer, layout read, authored
  motion, custom element, or bundled asset.
- Exhibit and Studio use the same `SectionsStudio` renderer, fixture, omission
  rule, conditional root, canonical CSS, and initial properties. Studio no
  longer owns a duplicate quotation-wrap repair.
- Shopify receives a target-native localized Section Adapter using an optional
  heading and required `richtext` body, strict empty omission, canonical class
  names, and zero component JavaScript. Dawn's alignment, full-width, color,
  animation, padding, caption, and button settings are not copied into the
  neutral contract.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  can prepare S15 for human review but cannot approve aesthetics, repair missing
  Figma evidence, or promote stability.

## External Evidence

- HTML defines `section` as a thematic grouping normally identified by a
  heading and `article` as complete, self-contained, independently distributable
  or reusable content.
- WAI content guidance and WCAG Info and Relationships require headings, lists,
  quotations, figures, links, and other visible structure to remain
  programmatically determinable.
- WCAG also requires descriptive headings, link purpose, visible focus,
  contrast, resizing, and reflow.
- Open UI Text research defines no interoperable Rich Text Section anatomy or
  widget behavior.
- Radix composition guidance preserves appropriate native elements and assigns
  accessibility responsibility when consumers substitute them.
- Polaris Text separates visual typography variants from the semantically
  appropriate native element.
- Shopify settings and sections/blocks expose target-native merchant-editable
  values without requiring those editor choices to become cross-target API.
- Dawn renders rich text as a Shopify section with ordered editor blocks and
  target-specific layout/presentation settings. It is reference evidence, not a
  template for Gallery identity or neutral API.

## Performance

Rich Text Section has no neutral JavaScript or bundled asset. The permanent
Sections ceiling remains `6,861 B` deterministic gzip and is not raised. S15
must recover room from its own obsolete literals and shared duplicate rules
while completing semantic typography and content coverage. Shopify performs one
bounded section render and adds no S15 script.

## Target Translation

- Neutral Web uses conditional `section`/`div`, an optional contextual heading,
  one required semantic body, native descendants, intrinsic CSS, and zero
  runtime.
- Webflow consumes source-identical canonical Sections CSS and maps its Rich
  Text content to the target-owned body.
- Shopify maps localized optional heading and required `richtext` settings to a
  target-native addable section with strict empty omission and zero runtime.
- React and Angular use thin conditional native wrappers and framework children;
  they do not introduce an HTML parser or aggregate state.
- Figma should expose optional title and a bounded body composition after the
  owner supplies an S15-specific reference.
- SwiftUI and Compose use native semantic text/link/media composition and
  platform accessibility without importing Web markup.

## Open Human Boundary

This decision intentionally does not approve:

- the final `46.25rem` measure, title/body scale, line length, section inset,
  flow rhythm, quotation inset/border, nested-element treatment, link color,
  focus geometry, or fixture;
- a complete article, rich-text editor, sanitizer, portable document schema,
  advanced editorial composition, or call-to-action API;
- target trust, legal, localization, link, media, or publishing policy;
- component-specific Figma evidence, because the registered nodes show Button;
- framework/native implementations; or
- promotion from `pilot` to `stable`.

## Consequences

- Consumers receive correct thematic/generic semantics instead of an unrelated
  autonomous article.
- Required content cannot leave an empty root and optional title omission does
  not create an unnamed landmark.
- Native rich-content structure remains available to assistive technologies,
  user styles, localization, and target renderers.
- S15 remains narrow enough to translate across Web, Shopify, Figma, and native
  targets without importing Article Body or exposing private layout details.
- Exhibit and Studio retain one renderer and canonical implementation.
- Human review remains responsible for visual identity, owner reference
  correction, content policy, and stability.
