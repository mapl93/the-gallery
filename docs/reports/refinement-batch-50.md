# Refinement Batch 50: Review Card

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 50 refines V4 Review Card as a self-contained, target-supplied review
article. Exhibit and Studio now share the same renderer and fixture for its
canonical Star Rating, contextual title, author metadata, machine-readable
date, optional photos, helpfulness action and associated reply.

The component does not own provider records, aggregation, verification,
moderation, localization, authentication, helpfulness persistence, photo
activation or structured data. Those remain explicit target boundaries.

## Safe Refinement

- The contract advances to `0.3.0` without promotion from `pilot`.
- `article`, contextual heading, `time[datetime]`, native photo-list and button
  semantics replace ambiguous or redundant markup.
- `dateTime` and conditionally required `photosLabel` are the only new public
  semantic properties; heading rank, provider identifiers, media geometry and
  private spacing remain outside the API.
- The helpfulness button exposes stable-label pressed state, native disabled
  behavior and a visible described count. Persistence and count reconciliation
  remain target-controlled.
- The reply remains associated content without creating an unnecessary
  complementary landmark.
- Complete existing typography tokens replace partial declarations and
  hardcoded line heights. The photo strip remains an intentional internal
  scroller.
- Canonical Reviews CSS was regenerated for Neutral Web, Shopify and Webflow.
  No neutral runtime was added and no placeholder provider Liquid was invented.

## Browser Evidence

- Exhibit and Studio normalized DOM is identical at Mobile, Tablet, Desktop
  and XL: `32e5dadb78b71d64735f1efec1f1bd779a7e82675ed67f91e0090ffc60eeaee4`.
- Enter, Space and pointer activation emit native clicks and update only the
  local Studio candidate state; the supplied count stays stable.
- Native disabled, keyboard focus, pressed hover, reduced motion, dark mode and
  forced colors were verified.
- The action target measures `95.39 x 44px`; light primary, secondary and
  pressed text measure `17.93:1`, `7.81:1` and `10.37:1` contrast.
- Full and minimal compositions pass. A `220px` RTL host at 200% type contains
  the card and its deliberate `256px` photo strip without parent or document
  overflow.
- The browser console is clean in the final route.

## Performance

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,781 B` | `3,788 B` | pass; `7 B` remaining |
| Shared neutral runtime | `10,565 B` | `8,192 B` | existing `2,373 B` program exception; `0 B` added |
| Neutral Web components CSS | `68,119 B` | `65,536 B` | current `2,583 B` program gap after full regeneration |

The family ceiling remains unchanged. Later review-family work must stay within
the remaining headroom or raise a separate architecture decision.

## Human Review Queue

1. Approve or revise title/reviewer hierarchy, density, photo crop and scroll,
   helpfulness emphasis, reply surface and separator.
2. Confirm whether helpfulness remains a reversible pressed request for v1.
3. Resolve the global A11 Rating versus V2 Star Rating identity separately.
4. Select provider, moderation, persistence and photo-activation policies per
   target before building Shopify or framework integrations.
5. Create Review Card-specific Figma artwork only after browser approval.

## Validation

Contracts, Studio, docs, TypeScript, temporary site build outside `site/dist`,
Neutral Web, Shopify, Webflow copies, official Shopify artifact validation,
source/generated CSS identity, static previews, structural certification,
Exhibit/Studio parity, refinement progress, four-viewports and special modes,
deterministic budgets and diff checks pass.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Program Position

After Batch 50, the program has 91 dossiers and 79 components flagged as ready
for human review. Review Highlights (V5, dependency order 152) is next.

See the detailed audit in
`docs/reports/review-card-web-refinement-audit.md` and the decision in
`docs/decisions/0135-self-contained-review-card-and-provider-owned-actions.md`.
