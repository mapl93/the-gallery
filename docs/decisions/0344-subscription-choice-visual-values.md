# 0344. Subscription Choice Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Expose nine choice-level source roles for border width, padding/content/header
spacing, summary/recurring gaps and choice/metadata label weights. They alias
existing dimensions and weights or multiply the existing layout spacing role.
The profile completes 24 public values, including explicit body typography and
Radio diameter/label gap. Existing color/radius roles remain shared.

Radio diameter plus its label gap still determines text indentation. The header
row, amount summary and recurring metadata have independent semantic gaps,
initially the same 8px primitive. Editing Radio gap therefore changes its real
alignment without unintentionally changing every metadata gap. No private
calculation becomes a new exported token merely because it exists in CSS.

Fieldset, Radio, Price and Badge own their complete APIs. The single native group,
checked terms visibility, required/default/disabled semantics and target-formatted
commerce values from ADR 0246 remain unchanged. No neutral runtime or provider
integration. The existing fieldset container query owns stacking and inset
removal; no duplicated responsive token catalogue or new source mode.
The contract remains pilot.

## Acceptance

Preserve defaults in both themes and narrow/wide containers for one-time and
recurring selections. Verify independent spacing/weights/border and Radio-derived
inset, native keyboard/value/reset, required/disabled behavior, forced colors,
RTL, selected terms, Studio edits/reset and Exhibit references. Validate source,
contracts, Studio, catalogue, docs, actual CLI copy and generated adapters.
