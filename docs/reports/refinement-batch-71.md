# Refinement Batch 71 — Logo Bar / Trust Bar

Status: Research complete; implementation paused for architecture input

Date: 2026-07-15

Component: Logo Bar / Trust Bar (`S12`, dependency order `172`)

## Outcome

Batch 71 does not manufacture a marquee architecture from incomplete CSS. It
records a permanent dossier, source-backed audit, browser baseline and three
concrete ownership alternatives. S12 remains unchanged and `pilot` because
accepted ADR 0082 and Open Questions explicitly leave motion duplication,
controls, timing, direction, repetition, runtime and fallback unresolved.

The recommended v1 direction is static-only Logo Bar: a conditional named
section or generic root with a native ordered mark list, meaningful image/SVG
alternatives, optional native links and zero component runtime. Any moving track
should become a shared neutral Marquee dependency or a documented target-owned
profile after owner approval.

## Evidence

- Nine before captures cover paired Mobile, Tablet, Desktop and XL plus the
  Studio `Marquee` selection.
- Static Exhibit/Studio normalized DOM is exact (`395` characters, FNV-1a
  `9d8497df`) and contains at direct widths `200–1120px`.
- Studio's public `Marquee` control adds the modifier class but site CSS disables
  animation and the track contains only one semantic copy.
- Current Figma trace nodes show the Button pilot rather than Logo Bar and cannot
  support S12 visual decisions.
- Console is clean; official Shopify validation passes the unchanged Sections
  asset; no generated adapter or `site/dist` output was rebuilt.

## Program Position

The audit remains at 98 of 183 components ready for human review and advances
the dossier inventory to 112. Logo Bar is marked
`researched-decision-needed`, with before evidence only and an explicit
architecture-input queue.

See `docs/refinement/dossiers/logo-bar.md` and
`docs/reports/logo-bar-web-refinement-audit.md`.
