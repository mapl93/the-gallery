# 0152. Brand Story As An Image With Text Profile

Status: Accepted

Date: 2026-07-15

## Context

S8 Brand Story and S3 Image with Text both represented one target-owned media
asset followed by an optional eyebrow, required heading, required rich
narrative, and responsive media/content layout. Brand Story independently
implemented its own grid, media containment, source order, typography,
spacing, crop behavior, responsive rule, and target mapping. Its only distinct
part was an optional editorial signature.

This duplication contradicted the repository rule that compound profiles
consume canonical components. It also produced implementation drift. The
Brand Story section was not named by its required heading, the renderer did not
enforce required media/title/body, visible signature text had a redundant
replacement label, natural-ratio media dominated the docs stages, and XL
container padding consumed all content width in narrow direct embeddings.
Viewport, generic container, and Studio-specific rules competed over stacking
and media height.

ADR 0147 has already refined Image with Text as the canonical passive,
container-responsive media-and-narrative composition. ADR 0131 keeps Artist
Statement separate as a first-person artist-authored narrative, while ADR 0126
keeps Collection Story collection-scoped. ADR 0142 establishes the accepted
profile pattern by making Studio Tour consume canonical Process Timeline.

HTML section/footer/image semantics, WAI structure and image guidance, Open UI
research, Radix composition, Polaris Media Card guidance, and Shopify
section/settings APIs support a native passive profile. No APG or Open UI
Brand Story widget exists and no evidence supports a parallel focus model,
runtime, grid implementation, or media lifecycle.

## Decision

- Brand Story remains a separately discoverable `pilot` component and becomes
  a contextual profile of canonical Image with Text.
- Registry and contract add `image-text` as the sole direct dependency.
- The neutral Web root layers `.brand-story` on `.image-text`. Media, content,
  eyebrow, title, and body use canonical Image with Text anatomy and styling.
- Brand Story consumes one fixed default Image with Text presentation. It does
  not expose Image with Text's `variant` or `action` properties.
- Target-owned media, a non-empty visible title, and non-empty rich body are
  required. Invalid required composition is omitted rather than producing an
  unnamed or incomplete section.
- The visible contextual heading receives a target-unique id and names the
  native section through `aria-labelledby`. Heading rank remains target- and
  document-owned.
- Media remains first in DOM/source order. Canonical Image with Text owns
  intrinsic response, private `4 / 3` review-candidate crop, content measure,
  type, color, surface, and spacing.
- The optional eyebrow remains canonical Image with Text content and is
  omitted when blank.
- Brand Story adds only an optional `.brand-story__signature` section footer.
  It may contain target-owned visible text or media and is omitted completely
  when absent.
- The signature is editorial presentation, not authentication, proof,
  verified authorship, approval, or a cryptographic signature. Visible text
  receives no redundant replacement `aria-label`; signature-image alternatives
  depend on target purpose and context.
- The obsolete `.brand-story__grid`, `.brand-story__media`,
  `.brand-story__content`, `.brand-story__eyebrow`, `.brand-story__title`, and
  `.brand-story__text` anatomy and CSS are removed without compatibility
  aliases.
- Site-owned Brand Story layout, media-height, wrapping, signature, and
  responsive repairs are removed. Site CSS may still provide fixture media but
  cannot own S8 implementation behavior.
- Exhibit and Studio use one Sections renderer, fixture, validity rule,
  target-unique title association, canonical anatomy, and initial DOM.
- Brand Story owns no controlled/uncontrolled state, focus model, event,
  listener, observer, request, timer, layout read, animation, custom element,
  asset, or runtime.
- Shopify gains a localized addable Brand Story section. A documented shared
  Liquid snippet owns canonical Image with Text validation/markup and is
  consumed by both the existing Image with Text section and the Brand Story
  profile. Shopify image objects, focal points, rich text, editor settings, and
  signature media fields remain target-owned.
- The Shopify inventory recognizes literal class consumption and exact
  target-native file names matching a component slug. This preserves adapter
  evidence when a section delegates its canonical root to a shared snippet.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  may prepare S8 for human review but cannot approve its aesthetics, product
  identity, or promote it to `stable`.

## External Evidence

- HTML defines `section` as thematic content normally identified by a heading.
- HTML defines `footer` relative to its nearest sectioning ancestor and permits
  authorship, related, and closing information without inventing a widget role.
- HTML and WAI image guidance make alternative text depend on purpose and
  context; decorative or redundant imagery can use an empty alternative.
- WAI page-structure guidance favors descriptive headings and meaningful native
  relationships over extra application semantics.
- Open UI Card research shows no interoperable Brand Story anatomy or behavior.
- Radix composition favors consuming canonical leaf behavior and keeping the
  final native element responsible for semantics.
- Polaris Media Card treats media as context for text that must remain
  understandable by itself; its admin actions/dismissal are not part of S8.
- Shopify provides `image_picker`, `richtext`, `image_tag`, focal-point
  preservation, localized section schema, and presets as target-native data
  and editor surfaces.

These sources support native composition and canonical reuse. They do not
approve The Gallery's crop, density, visual balance, signature medium, final
content model, or commercial identity.

## Performance

Brand Story has a `0 B` runtime budget. Consolidation removes duplicated grid,
media, type, spacing, breakpoint, and docs-only rules. The optional signature
adds only passive CSS and target-owned content.

The permanent Sections ceiling remains `6,861 B` gzip. S8 must create or
preserve headroom rather than raise that ceiling. Full Neutral Web component
CSS and shared runtime retain their existing explicit global gaps.

Shopify image processing and responsive candidates remain target data/browser
work and do not authorize a neutral loader, request, observer, or layout read.

## Target Translation

- Neutral Web uses one `.brand-story.image-text` named section, canonical media
  and narrative anatomy, plus optional signature footer.
- Shopify uses a dedicated localized editor section that delegates canonical
  Image with Text validation/markup to a shared snippet and supplies an optional
  text or image signature.
- Webflow consumes the canonical CSS profile with target-authored native
  content.
- React and Angular use a thin profile around their canonical Image with Text
  projection and render nothing for invalid required input.
- Figma uses an instance/profile of reviewed Image with Text plus optional
  signature only after browser visual approval.
- SwiftUI and Compose use target-native adaptive media/narrative composition
  and optional attribution footer semantics.

## Open Human And Product Boundary

This decision intentionally does not approve:

- the inherited `4 / 3` crop, split balance, content measure, padding curve,
  typography, color, surface, rhythm, or narrow/wide transition;
- the signature medium, cap, typography, wording, or whether it should normally
  be present;
- additional alignment, image-side, density, surface, heading-rank,
  signature-type, link, action, or layout properties;
- a shared brand record, Shopify metaobject, CMS schema, analytics model, or
  content governance policy;
- whether Brand Story remains a separately discoverable commercial component
  after v1 consumers can compose Image with Text directly;
- component-specific Figma variants or framework/native implementations; or
- promotion from `pilot` to `stable`.

## Consequences

- The repository has one media-and-narrative implementation instead of an S8
  fork.
- The dependency graph makes canonical composition explicit.
- Narrow embedded Brand Story instances no longer lose their content width to
  a duplicated page-container inset.
- Native document structure remains understandable without CSS, JavaScript,
  media, or assistive-technology repair.
- Signature presentation cannot be mistaken for verification or hidden behind
  redundant ARIA labelling.
- Shopify retains a distinct merchant-facing Brand Story identity while reusing
  canonical Liquid structure.
- Human review remains responsible for visual identity, product value, and
  stability.
