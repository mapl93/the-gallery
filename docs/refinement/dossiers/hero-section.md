# Component Dossier: Hero Section

Status: `human-review-ready-deprecated-migration`

Contract: `components/contracts/hero-section.contract.json` (`0.4.0`,
`deprecated`)

Decision: `docs/decisions/0223-unified-hero-layout-media-and-rotation-contract.md`

## Outcome

S1 `hero-section` is no longer an independent component. The owner selected one
public Hero under G1, merging S1's full, split, text-only and fullscreen
composition with G1's Shopify identity and the accepted complete parallax and
slideshow capabilities.

S1 remains in the 183-component inventory only as a reviewed pre-v1 migration
record. It resolves to canonical `.hero`, uses the same `HeroArtwork` renderer
and fixture as G1, and owns no `.hero-section` CSS, JavaScript, Studio renderer,
Shopify section or target behavior.

## Migration Contract

| Former S1 concept | Canonical G1 mapping |
| --- | --- |
| `full`, `split`, `text-only` | `layout` |
| `fullscreen` | `height: fullscreen` |
| passive media | `mediaBehavior: none` |
| parallax hook | `mediaBehavior: parallax` with progressive CSS lifecycle |
| slideshow hook / slides | `mediaBehavior: slideshow` plus real `slides` and controls |
| eyebrow | `label` |
| subtitle | `description` |
| actions | canonical `actions` Button slot |

All remaining semantic properties, states, accessibility requirements and
target mappings are defined by `hero.contract.json`. No permanent compatibility
alias is promised after the pre-v1 migration window.

## Dependency And Target Boundary

- Button, Icon Button and Carousel are consumed through canonical Hero.
- Web uses canonical Marketing CSS and `theme.js` via a deprecated-forward
  contract record.
- Shopify consumers must use the G1 Hero section. S1 is intentionally marked
  unsupported/deprecated for Shopify so it cannot create a second adapter.
- React, Figma and future native targets must expose only canonical Hero.

## Accessibility, Responsive And Evidence Result

Because Exhibit and Studio route S1 through the exact same canonical renderer,
S1 inherits the verified required-title gate, coherent media omission,
container response, native controls, reduced-motion policy, localized status,
long-content resilience and four-viewport evidence. The final S1 captures live
beside G1 in `output/playwright/refinement-marketing/hero-0223/`.

## Risks And Review Boundary

- Documentation and consumers must migrate from `hero-section` to `hero` before
  the deprecated record is removed.
- S1 cannot be promoted to `stable`; it has no independent product identity.
- Human review applies to canonical Hero visuals and behavior, not to a second
  S1 implementation.

Detailed evidence is in
`docs/reports/hero-section-web-refinement-audit.md` and the canonical dossier
`docs/refinement/dossiers/hero.md`.
