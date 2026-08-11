# 0165. Native Testimonial Quotation And Target Record Composition

Status: Accepted

Date: 2026-07-16

## Context

G3 Testimonials already described a passive repeated quotation collection with
optional Avatar composition, but its targets did not share one complete
implementation.

The shared docs renderer always emitted a section and H2 even though title was
optional, allowed its required items slot to disappear while retaining an empty
root, and replaced available native list elements with `role=list` and
`role=listitem`. Canonical CSS changed columns at page viewport widths while
Studio privately forced two columns and collapsed them at a different docs-only
container threshold.

Card identity wrappers remained inline, causing name and supporting detail to
run together in historical evidence. CSS also generated the decorative opening
mark, used incomplete type profiles and retained hardcoded physical padding,
gaps, font weight and computed detail size.

Shopify had a dedicated merchant section but rendered generic cards and
paragraphs rather than the contract's quotation/attribution semantics. It
always emitted an unnamed section and fallback heading, rendered invalid empty
records and reported only planned adapter maturity.

The refinement must establish the stable passive document structure without
inventing a universal testimonial record object, source-verification service,
content-governance workflow or interaction model.

## Decision

- Testimonials remains a separately discoverable `pilot` Marketing composition
  with optional canonical Avatar dependency and no neutral runtime.
- Contract version advances to `0.3.0` and retains two semantic properties:
  optional `title` and required target-owned `items` composition.
- At least one item with non-empty quoted words and a visible non-empty author
  name is a render precondition. Invalid records are omitted; zero valid items
  omits the complete root.
- A non-empty title produces a native thematic section named by its visible
  contextual heading. An untitled collection uses a generic `div`, not an
  unnamed section.
- The collection is a native `ul`; each item is a native `li` containing one
  `figure`, one `blockquote` for the quoted words and one external `figcaption`
  for attribution. No redundant list roles are authored.
- A person's name is visible text and is not marked up with HTML `cite`, which
  represents the title of a creative work. A target may still supply a native
  `blockquote[cite]` URL or work title inside its record composition.
- The optional opening quotation mark becomes explicit target-localized markup
  with `aria-hidden="true"`. It may be omitted without altering semantics and
  adds no public property.
- Optional Avatar consumes the canonical passive component. When adjacent text
  supplies the same identity, native image alt is empty and initials are
  `aria-hidden`, following ADR 0113. Testimonials adds no image loading,
  fallback, initials derivation or Avatar styling API.
- Canonical CSS owns complete typography, logical containment, private maximum
  measure and root-container-responsive one/two/three-column composition.
  Studio's column overrides are removed.
- Section inset, card rhythm, surface, radius and type use existing semantic
  tokens. Private maximum measure and container thresholds are implementation
  details, not consumer properties.
- Semantic line-height tokens remain the normal baseline; relative `em`
  minimums prevent overlap when consumers enlarge title, quote, name or detail
  text without proportionally changing absolute line-height tokens.
- Targets own testimonial records, source URLs, verification, consent,
  moderation, localization, ordering, publication, image delivery, loading,
  empty/error state, legal disclosure, analytics and update-announcement policy.
- Shopify's existing section becomes an implemented target adapter. It filters
  invalid blocks, maps valid records to native list/quotation/attribution
  anatomy, preserves editor attributes, uses a unique optional heading id,
  keeps redundant adjacent Avatar image alt empty, localizes schema metadata
  and adds no script.
- Exhibit and Studio continue to use one `MarketingStudio` renderer, fixture,
  initial DOM and canonical CSS.
- No generated docs output under `site/dist` is rebuilt.

## External Evidence

- The HTML Standard defines `blockquote` as content quoted from another source,
  requires attribution outside it and explicitly demonstrates
  `figure` + `blockquote` + `figcaption` for a quote and attribution.
- HTML sectioning guidance describes `section` as a thematic grouping that
  typically has a heading, supporting a generic root when optional title is
  absent.
- HTML semantic guidance demonstrates that a person's name is not a creative
  work title and must not be marked up with `cite` for that purpose.
- WAI image guidance recommends empty alternative text when adjacent text
  already supplies the same information.
- APG defines no Testimonial widget or keyboard model.
- Open UI's comparative component matrix contains no converged Testimonial
  component.
- Radix and Polaris supply optional Avatar/layout primitives but no universal
  Testimonial composite or record lifecycle.

These sources support native passive composition. They do not approve The
Gallery's final visual candidate, record governance or target content model.

## Performance

Testimonials retains a `0 B` neutral component-runtime budget. It owns no
listener, observer, timer, request, client, formatter, custom element, bundled
asset or layout read.

Marketing remains subject to its permanent `4.1 KiB` (`4,198 B`) gzip ceiling.
The global Neutral Web CSS and shared runtime keep their existing explicitly
reported program-level gaps; this decision does not raise either ceiling.

Final deterministic level-9 gzip measures are:

- G3 slice: `821 B`, up `252 B` from its `569 B` baseline;
- Marketing: `4,146 B`, leaving `52 B` under the `4,198 B` ceiling;
- generated Neutral Web component CSS: `67,751 B`, a program-level `2,215 B`
  gap against `65,536 B` and a `181 B` batch delta; and
- shared neutral runtime: `10,501 B`, retaining its program-level `2,309 B`
  gap and adding `0 B` for G3.

## Target Translation

- Neutral Web uses conditional titled-section semantics, native list,
  figure/blockquote/figcaption items, optional canonical Avatar and intrinsic
  CSS with zero G3 runtime.
- Shopify maps reorderable merchant blocks and image delivery into the same
  structure while filtering invalid records and retaining editor metadata.
- Webflow maps a CMS collection list and target record fields into canonical
  classes and native quotation markup.
- React and Angular render target-owned record arrays without mirroring them in
  G3 state; target props/state and content governance remain external.
- Figma maps an optional title and repeated quote/author/Avatar slots after a
  corrected G3-specific visual reference exists.
- SwiftUI and Compose use native passive collections and accessible identity
  grouping rather than copied DOM or private CSS geometry.

## Open Product And Human Boundary

This decision intentionally does not approve:

- author consent, source verification, moderation, edit disclosure, dates,
  organization/legal claims, ordering, analytics or publication workflow;
- a universal testimonial-record schema or required source URL, image, role,
  rating or date;
- automatic Avatar fallback or initials derivation;
- a Carousel, auto-rotation, pagination, active item, link, control or live
  update model;
- final measure, thresholds, column density, padding, surface, radius,
  typography, italic treatment, quote mark, Avatar prominence or fixture copy;
  or
- promotion from `pilot` to `stable`.

## Consequences

- Quoted words and attribution now have one native, target-independent semantic
  boundary across docs and Shopify.
- Exhibit and Studio no longer use separate responsive column rules.
- Empty and malformed target content cannot create unnamed/blank semantic
  shells.
- Avatar remains canonical and optional without importing its unresolved
  fallback decisions into G3.
- Responsive density and card geometry stay private and coherent rather than
  expanding the public API.
- Human visual approval and G3-specific reference evidence remain necessary
  before stability review; no `stable` promotion occurs automatically.
