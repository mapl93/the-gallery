# 0362. Ceramics Context Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

ADR 0293 exposes 29 geometry/spacing roles across Ceramics Glossary (12), Studio
Tour (8) and Ceramics Care FAQ (9). Profiles now contain 25/22/24 public values.
Dimensions retain existing rem defaults; the Glossary letter rule aliases
dimension.2. Spacing factors retain their existing element/section/gutter bases,
including the existing 0.3333 factors. Tour eyebrow tracking retains 0.1em and
supplementary media retains 16:9 as its initial ratio.

Glossary owns outer/image measures, introduction/group/letter rhythm, rule
thickness, scroll offset and image/related-link spacing. Tour owns header measure
and rhythm, eyebrow tracking, supplementary-media geometry and caption spacing.
FAQ owns outer/header measures and rhythm plus contact-surface/link spacing.
Accordion, Link and Process Timeline retain their respective contracts. No
alphabet navigation, category filter, tour navigation or media playback is added.

The duplicate mobile Glossary inset rule is removed so its new factor applies
at every width. Care Instructions' existing mobile base changes with density,
but now multiplies the same public padding factor as its wide layout. Defaults
remain unchanged; this corrects the mobile customization bypass from ADR 0356.

Studio inherits canonical spacing for these three inner frames instead of
replacing it with site clamps. The generic illustrative-media minimum height is
removed for Glossary/Tour so a narrower image can retain its actual aspect ratio.
Existing multi-value token controls become individually named controls. Tour's
MDX fallback replaces four invalid GIF placeholders with the same local image
assets selected by Studio. These are demonstration assets, not component tokens.

Glossary typography remains a pending owner choice: its title and letters still
use native weight 700 and inherited line height, unlike explicit system heading
roles. This geometry checkpoint preserves those defaults; it does not claim
complete type reconciliation. A browser-only system-heading comparison is saved.

Both generated targets update; components remain pilot. Consumers explicitly
adopt tokens/CSS. No source mode, new runtime or Shopify data/editor decision.

## Evidence

See `docs/reports/2026-09-12-ceramics-context-checkpoint.md` for 920 baseline
comparisons, controls, image validity, keyboard behavior and cleanup.
