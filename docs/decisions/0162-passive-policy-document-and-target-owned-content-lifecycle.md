# 0162. Passive Policy Document And Target-Owned Content Lifecycle

Status: Accepted

Date: 2026-07-16

## Context

P3 Policy Page Template presents one complete legal document. Its initial
implementation could render without required title/body content, flattened the
documentation heading hierarchy, rendered exact fixture dates as generic text,
allowed an unnamed table-of-contents landmark, duplicated Link states, removed
ordered-list markers, used a viewport breakpoint and retained Studio-only
geometry. Its static MDX fallback also nested a second `main` and a second
`article` and used an inert destination.

ADR 0084 already limits P3 to title, optional update metadata, optional table of
contents and one required semantic body while keeping CMS, revision, effective-
date, localization, policy-type and source ownership open. HTML, WAI, WCAG,
Open UI, Radix, Polaris, USWDS and Shopify provide enough evidence to refine
document semantics without resolving those open product and architecture
questions.

## Decision

- P3 is one passive, self-contained legal document composition. It is not a
  CMS, editor, policy generator, revision ledger, consent surface, legal-advice
  system, sanitizer, parser, localization pipeline or source API.
- A valid composition requires a non-empty visible `title` and non-empty
  semantic `body`. Missing either omits the complete root.
- The contextual root is a title-labelled native `article` inside Exhibit and
  Studio's existing document `main`. Standalone targets host that article
  inside their own single `main`. Heading rank remains target- and document-
  owned; canonical classes are element-agnostic.
- Optional `updatedDate` remains target-formatted visible text. New optional
  `updatedDateTime` is an independent exact machine-readable value. Targets use
  `time[datetime]` only when both are supplied and never parse localized text.
  A machine value alone renders nothing; visible-only metadata remains ordinary
  text rather than invalid time markup.
- A table of contents is optional and valid only with non-empty `tocTitle` and
  target-owned `tocItems`. It uses a named native `nav`, native ordered list and
  canonical Link anchors. Each fragment must resolve to one unique body section
  in matching order. Incomplete index composition is omitted.
- Generation, synchronization, sticky placement, active-section tracking,
  smooth scrolling, focus relocation and announcements remain target-owned and
  do not enter the neutral contract.
- The body remains one required target-owned semantic slot preserving authored
  paragraphs, contextual headings, lists, emphasis, quotations, figures,
  links, tables, code, dates and media. Targets own legal accuracy, trust,
  sanitization, parsing, revisions, effective dates, localization, policy
  inventory, identifiers, external-link policy, media and publishing.
- Rich Text Section is adjacent rather than a dependency: it represents a
  bounded section inside another page, while P3 represents the complete policy
  document with header and optional in-page navigation. P3 directly depends on
  Link for table-of-contents navigation.
- Prose reflows intrinsically. Tables wrap by default; genuinely two-
  dimensional content may use an explicit target-named keyboard-scrollable
  `.policy-page__overflow` wrapper without making the article or ordinary prose
  focusable.
- Canonical CSS uses logical properties, semantic tokens and a named inline-
  size container. Readable measure, scroll offset, quotation border and other
  visual composition values remain private.
- Exhibit and Studio use the same `PagesStudio` renderer, fixture, omission
  rules, DOM and canonical CSS. Studio no longer adds P3 layout geometry.
- P3 owns zero neutral state, listener, observer, request, timer, formatter,
  parser, sanitizer, generated id, active tracker, authored motion, asset or
  JavaScript. The Pages + Coming Soon ceiling remains `5.3 KiB` (`5,427 B`).
- Shopify receives a reusable strict snippet mapping one supplied Liquid
  `policy` object's real title and body. Shopify's documented object has no
  update date or index data, and its theme-template inventory exposes no policy
  template type, so the adapter omits those regions and does not invent a
  template, route, date, section ids or cross-target policy inventory.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  can prepare human review but cannot approve visual values, the new six-
  property API, open content lifecycle decisions or stability.

## External Evidence

- HTML defines `article` as a complete self-contained composition, `nav` as
  links to pages or page parts, and `time[datetime]` as an exact machine-
  readable equivalent independent of localized visible text.
- WAI and WCAG require programmatically determinable document relationships,
  descriptive headings and links, visible keyboard focus, text resizing and
  reflow; two-dimensional tables may scroll without forcing surrounding prose
  to scroll horizontally.
- WAI-ARIA APG and Open UI define no Policy Page widget or keyboard model.
- Radix composition preserves accessible native leaf ownership; Polaris keeps
  visual type independent from the semantically appropriate element.
- USWDS recommends in-page navigation only for sufficiently long structured
  pages and requires link text to match section headings.
- Shopify Liquid exposes `policy` title, body, id and URL plus target-owned shop
  policy inventory, but no update date or table-of-contents relationship.

## Performance

P3 adds no neutral JavaScript or bundled asset. Before refinement its slice is
`816 B` deterministic gzip; complete Pages + Coming Soon is `3,783 B` against
the permanent `5,427 B` ceiling, leaving `1,644 B`. The batch must fund semantic
body coverage and intrinsic containment inside that existing family room and
keep shared runtime unchanged.

## Target Translation

- Neutral Web uses a contextual labelled article, optional independent date
  pair, optional named ordered Link navigation, target-owned semantic body and
  zero runtime.
- Shopify maps one actual Liquid `policy` object through a reusable snippet and
  omits optional data the object does not expose.
- Webflow consumes source-identical Pages CSS and supplies trusted CMS content,
  dates and index relationships.
- React and Angular use thin native wrappers and children without adding an
  HTML parser, CMS or state store.
- Figma should expose required title/body and optional date/index composition
  after the owner supplies P3-specific visual evidence.
- SwiftUI and Compose use platform document, heading, link and accessibility
  semantics while the target owns content and routing.

## Open Human Boundary

This decision intentionally does not approve:

- final article measure, title/body scale, divider, update tone, TOC surface,
  inset, numbering, content rhythm, quotation/table/code treatment or scroll
  offset;
- `updatedDateTime` or the complete six-property API for stable v1;
- CMS, revision, effective-date, localization, policy-type, stable-id, legal,
  trust, sanitizer, link, media, route or publishing policy;
- generated, sticky or current-section navigation;
- the registered generic Button Figma nodes as P3-specific evidence;
- framework/native implementations; or
- promotion from `pilot` to `stable`.

## Consequences

- Incomplete data no longer leaves an invalid legal-document shell.
- Exact date semantics are available without parsing localized display text.
- Optional navigation is named, ordered, canonical and relationally valid.
- Body structure remains native and portable while content lifecycle remains
  with the owning target.
- Exhibit and Studio retain one renderer and canonical visual implementation.
- Shopify maps real platform facts without pretending to own policy routes or
  manufacturing missing metadata.
- ADR 0084 remains authoritative for unresolved policy-content ownership; this
  ADR refines the safe document contract without answering those questions.
