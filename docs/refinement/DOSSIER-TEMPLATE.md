# Component Dossier: <Name>

Status: `baseline | researched | refined | evidence-ready | human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/<slug>.contract.json`

## Recommendation

Lead with the recommended Gallery direction, readiness result, and any blocking
owner or architecture decision.

## Purpose And Limits

- Purpose.
- Primary use cases.
- When to use an adjacent component instead.
- Explicit non-goals and target-owned behavior.

## Current Gallery Baseline

Record registry identity, dependencies, contract version/status, canonical CSS,
properties, anatomy, variants, sizes, states, behavior, public tokens, Studio,
Exhibit, Web, Shopify, and current evidence.

## External Evidence

Use direct links to primary or attributable sources. Summarize rather than copy.

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| Web standard |  |  |
| WAI-ARIA APG |  |  |
| Open UI |  |  |
| Radix |  |  |
| Polaris |  |  |
| Other pertinent reference |  |  |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |

Document canonical dependencies and any duplicated markup or behavior.

## Variant, Size, State, And Mode Matrix

Include validation, open/closed, selected, disabled, busy, theme, forced colors,
motion, and responsive modes when applicable. Mark unsupported combinations.

## Public API And State Ownership

List properties, attributes, content, slots, events, omission behavior, invalid
combinations, and controlled/uncontrolled strategy.

## Token And Value Audit

Classify public tokens, private `--_` variables, hardcoded literals, icon geometry,
and consumer-owned values. Do not promote literals automatically.

## Visual And Content Audit

Record typography, spacing, dimensions, iconography, borders, color, alignment,
wrapping, empty/long/localized/extreme content, and media behavior.

## Accessibility And Interaction

Record semantics, accessible names/descriptions, keyboard, focus, pointer/touch,
validation, announcements, contrast, forced colors, and reduced motion.

## Responsive And Performance

Record Mobile, Tablet, Desktop, XL, container behavior, DOM/runtime work, CSS/JS
impact, assets, layout reads, observers, and relevant family budget.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web |  |  |
| Shopify |  |  |
| React / Angular |  |  |
| Figma |  |  |
| SwiftUI / Compose |  |  |

## Exhibit And Studio Parity

Record renderer, fixture, initial state, controls, canonical CSS usage, and any
site-only presentation classes. Site classes may size or contain a preview; they
must not recreate component visuals or behavior.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |

## Evidence And Validation

List before/after artifacts, browser cases, validation commands, and measured
results.

## Risks And Open Questions

Separate blocking owner decisions, target-owned follow-up, and non-blocking debt.

## Readiness Decision

State `not ready` or `human-review-ready`. Never write `stable` without explicit
human approval.
