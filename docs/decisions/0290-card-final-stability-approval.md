# 0290. Card Final Stability Approval

Status: Accepted

Date: 2026-08-25

## Context

Card completed its technical refinement and live human review across Exhibit
and Studio. Earlier accepted decisions retained its fine-pointer Hover treatment
(ADR 0284), established canonical Card-family composition boundaries (ADR
0285), and replaced the site-only pseudo-placeholder plus loose `32px` inset
with one shared editorial fixture and compact `16px` inset (ADR 0287). The
shared Studio inspector was subsequently corrected to expose understandable
numeric, token, and structured shadow controls (ADRs 0288 and 0289).

After reviewing the resulting component live in Light and Dark modes, the owner
explicitly approved Card and requested the next component. The maturity change
must remain scoped to Card; specialized components require their own human
review even when they compose this stable base.

## Decision

- Promote the Card contract from `pilot` to `stable`.
- Retain Card as a passive compositional surface with the public `variant`
  property only. Consumer content and semantics remain child composition.
- Retain Default, Flat, and Elevated as the complete variant axis and Default
  plus Hover as an independent state axis.
- Retain the accepted fine-pointer lift, shadow progression, optional media
  zoom, coarse-pointer fallback, and reduced-motion safeguards.
- Retain the shared licensed editorial fixture for documentation and the
  canonical compact `--tg-space-component-xs` content inset.
- Retain the reviewed radius, border, media proportion, body/footer hierarchy,
  focus preservation, content resilience, forced-colors treatment, and
  Light/Dark presentation as the v1 Neutral Web baseline.
- Exhibit and Studio continue to consume the same registered renderer, fixture,
  canonical classes, and implementation. Studio owns only customization
  presentation, including the structured shadow editor.
- Do not promote Product Card, Article Card, Author Card, Artist Card, Review,
  Gift Card, or any other related component through this decision.

## Consequences

- Card becomes the fifth human-approved `stable` component in the current
  182-component inventory.
- Generated Neutral Web and Shopify adapter metadata plus refinement reports
  must be regenerated from the stable canonical contract.
- The next human-review candidate is determined independently by the canonical
  dependency order.
- Future changes to generic whole-card navigation, new semantic properties, or
  the accepted visual baseline require a new explicit decision.
