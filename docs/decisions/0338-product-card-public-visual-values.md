# 0338. Product Card Public Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Apply ADR 0293 to Product Card with 13 component roles and 30 public values.
The shared inset aliases dimension.12 and continues to align Badge, body, Price,
Quick Look and footer. This supersedes ADR 0280's private-only value ownership,
preserving its approved alignment. Identity gap and additional description gap
remain separate inputs; their sum is the title-to-description separation.
Footer gaps, Badge stack gap, artist tracking/size factor, title weight,
description size factor, focus geometry and Quick Look entrance offset move to
source. Dimensions and weight reuse existing primitives where appropriate.

Expose the existing Card surface, border, radius and media-hover scale instead
of creating duplicate roles. Body typography is explicitly consumed on the root
so local token overrides reach inherited artist/title line height and weight.
The title retains its independent weight. Card resting shadow is preserved on
hover; Product Card does not inherit Card lift. Reduced motion now suppresses
primary-image hover scale as it already did focus scale and transitions.

Square/portrait proportions, two-line description, content visibility, stretched
navigation and Quick View coordination remain accepted contract responsibilities.
Opacity zero/one represents reveal state; full widths, stacking and clipping are
structural mechanics. Parent composition owns card width. Button, Badge and Price
own their complete APIs; this inventory does not flatten their catalogues into
Product Card. Existing stable status is retained, not newly awarded by this work.

## Acceptance

Compare initial geometry in both themes, narrow/wide layouts and square/portrait
states. Verify shared inset alignment in LTR/RTL, independent spacing/type/focus,
media scale and reduced motion, optional footer and artist visibility without
losing Price, Studio edit/reset and Exhibit discoverability. Validate source,
contracts, Studio, docs, generated adapters and a copied CLI consumer. Native
Quick View coordination and remote Shopify remain separate target evidence.
