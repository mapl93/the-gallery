# 0131. Passive Container-Responsive Artist Statement Composition

Status: Accepted

Date: 2026-07-15

## Context

Artist Statement already exposed optional portrait, label, quotation and
signature around required artist identity and rich statement content. Its
baseline implementation did not fully encode that contract. The grid responded
to viewport width, while the docs site supplied a second container rule. A
narrow embedded candidate in a wide page therefore depended on host CSS to
reflow. When optional portrait media was absent at wide width, the statement
remained trapped in one stale grid track.

Canonical CSS used physical quote geometry, incomplete typography ownership and
unclassified pixel values. The shared fixture labelled visible signature text
with “Signed by”, implying a stronger meaning than the content established. The
registry described a biography even though Artist Profile already owns that
purpose. Shopify received generated CSS but no target-native section despite a
direct merchant-content mapping.

HTML provides a thematic section, contextual heading, rich flow content,
quotation and image semantics. WAI guidance makes image alternatives depend on
purpose. No WAI-ARIA APG or Open UI Artist Statement widget exists. Radix treats
media ratio as composition, Polaris keeps written content meaningful beside
media, and Shopify sections/settings provide target-native editor ownership.
The registered Figma reference contains the generic Button Studio prototype and
no Artist Statement artwork.

## Decision

- Artist Statement is a passive native section associated with the required
  contextual artist-name heading through a target-unique `aria-labelledby` and
  `id` pair. Heading rank belongs to the surrounding document.
- Artist name and rich statement body remain required. Targets reject or omit
  invalid public instances rather than present an unexplained empty statement.
- Portrait, editorial label, genuine quotation and editorial signature remain
  optional and are omitted completely when absent.
- The required inner layout is one column by default. When portrait media is
  rendered, adapters also emit
  `.artist-statement__layout--with-portrait`.
- The root establishes inline-size containment. A private `42rem` content-box
  threshold enables the one-third/two-thirds portrait split only when portrait
  exists. The portrait becomes sticky only in that wide mode. Source order
  remains portrait then narrative at every width.
- The private portrait ratio remains `3:4`, narrow portrait cap `18.75rem`,
  narrative measure `42rem`, signature image cap `12.5rem`, quote-rule
  thickness `max(2px, 0.125rem)`, wide track ratio `1:2`, split threshold and
  editorial tracking. They are implementation candidates, not public API.
- Targets own image source, intrinsic dimensions, responsive candidates, crop,
  focal point, loading and contextual alternative purpose. Informative media
  receives useful alt; decorative or redundant media uses `alt=""`.
- Highlighted quote uses native `blockquote` only when it is content quoted
  from the artist or another source. Attribution remains outside the quotation;
  no synthetic citation property is added.
- Signature is a target-owned text or media slot for editorial presentation.
  It does not assert authentication, proof, authorship verification or a
  cryptographic signature. Visible signature text receives no redundant
  replacement `aria-label`.
- The six public semantic properties remain `portrait`, `eyebrow`, `name`,
  `quote`, `body` and `signature`. Layout, threshold, portrait side, ratio,
  crop, sticky behavior, heading rank, signature medium, image fields and
  events do not become neutral properties.
- No Card, Artist Profile, Avatar, Button or Certificate dependency is added.
  The component owns no focus stop, controlled/uncontrolled state, listener,
  observer, request, live region, timer, animation or JavaScript runtime.
- Canonical CSS owns responsive layout, complete typography, logical spacing,
  rich-content rhythm, quote geometry, media fit and forced-color treatment.
  Docs-site responsive and signature-style repairs are removed.
- Exhibit and Studio continue to mount one renderer and fixture with exact
  initial markup. Fixture photography describes the scene without claiming the
  pictured person is the fictional artist.
- Shopify implements a localized merchant section. It maps portrait intent,
  label, name, quotation, rich body and optional text/image signature, preserves
  merchant image metadata, emits responsive images and adds no JavaScript. If
  required body content is absent, the public storefront omits the section;
  design mode may show localized editor guidance.
- Contract version advances to `0.2.0` and remains `pilot`. Automated evidence
  can make the component ready for human review; only explicit human approval
  may promote it to `stable`.

## Performance

Artist Statement adds no neutral runtime, component asset, listener, observer,
layout read, request or animation. Shopify image processing remains target data
and browser-native loading behavior. The permanent Storytelling `4.2 KiB`,
total component CSS `64 KiB` and shared runtime `8 KiB` gzip ceilings remain
unchanged. Existing or new overages must stay explicit.

## Open Human Boundary

This decision intentionally does not approve:

- the private portrait ratio/crop, narrow cap, sticky treatment, split ratio or
  `42rem` threshold;
- section inset, narrative measure, caption/name/body/quote hierarchy, quote
  rule, color pairing, vertical rhythm or signature treatment;
- additional alignment, portrait-position, density, surface, heading-rank,
  quote-attribution or signature-medium properties; or
- a shared artist record/metaobject, Figma component or framework/native
  adapter implementation.

## Consequences

- Narrow embedded candidates reflow from their own width without docs-only
  column corrections.
- Portrait-free statements use the available readable measure rather than
  retaining an empty grid track.
- Native semantics remain meaningful without image, CSS, JavaScript or
  framework state; sticky positioning stays visual-only.
- Editorial signatures cannot be mistaken for authenticity verification.
- Neutral Web, Exhibit, Studio and Shopify share one explicit optional-media
  composition while target data and image policy remain target-owned.
- Owner visual review still blocks `stable` and any new public aesthetic API.
