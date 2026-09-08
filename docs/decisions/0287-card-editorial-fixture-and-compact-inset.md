# 0287. Card Editorial Fixture And Compact Inset

Status: Accepted

Date: 2026-08-25

## Context

During Card's live human review, the owner observed that the site-only gray
CSS drawing in the media region did not read as the image placeholder used by
the rest of the component gallery. The canonical Card body and footer also
inherited the `32px` layout element gap, making the text inset and the visual
distance between description and footer metadata feel excessive.

Card remains a target-agnostic compositional surface. The fixture correction
must not create a public media URL, image object, placeholder asset, or content
property. The spacing correction should reuse the accepted token source instead
of introducing an arbitrary literal or a new density axis.

## Decision

- Exhibit and Studio continue to mount one registered Card renderer and one
  identical fixture.
- That site-owned fixture renders the existing licensed
  `/media/editorial/textured-vase.jpg` asset as an informative native image with
  truthful alternative text. The former CSS-drawn pseudo-placeholder is removed.
- Fixture media remains documentation data only. Consumers and target adapters
  continue to own real media, alternative text, responsive sources, loading,
  failure, and lifecycle policy.
- Canonical Card maps its private `--_card-padding` to the existing
  `--tg-space-component-xs` token. This resolves to `16px` in the reviewed
  desktop mode instead of the former `32px` layout element gap.
- Body uses the compact inset on all sides. Footer uses the same logical sides
  and lower edge with no additional top padding, so the body-to-footer distance
  also reduces from `32px` to `16px`.
- The adjustment does not add a Card size, density, padding property, media
  property, component token, JavaScript, or target-specific CSS.
- Card remains `pilot` until the owner reviews and explicitly approves the
  complete refined component.

## Consequences

- The generic Card now visually matches the editorial fixture quality used by
  the broader Gallery site.
- Content, footer, and metadata retain one aligned inset with a denser hierarchy.
- Exhibit and Studio remain structurally identical because the change occurs in
  their shared renderer rather than in one view-specific preview.
- Neutral Web and Shopify copies must be regenerated from canonical Card CSS so
  consumers receive the compact inset.
- Specialized Card-family components continue to own intentional spacing
  overrides recorded by their own contracts and decisions.
