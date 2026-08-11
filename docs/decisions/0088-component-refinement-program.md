# 0088. Component Refinement Program

Status: Accepted

Date: 2026-07-13

## Context

The repository has 183 registry components, 183 contracts, 183 Studio definitions,
shared Exhibit/Studio renderers, and a passing structural web-certification matrix.
That coverage does not by itself prove that every component has been researched,
stress-tested, performance-bounded, translated across targets, or prepared for a
human stability decision.

The v1.0.0 refinement goal requires a repeatable process that can proceed in
dependency-safe batches without turning external references into source, exposing
private implementation details as API, or promoting contracts automatically.

## Decision

- `docs/COMPONENT-REFINEMENT.md` is the permanent pre-certification rubric.
- Every component receives a dossier before implementation changes in its review
  batch.
- Program state is separate from contract maturity. The program uses `baseline`,
  `researched`, `refined`, `evidence-ready`, `human-review-ready`, and `approved`.
- Only explicit human approval may assign `approved` or promote a contract to
  `stable`.
- The generated refinement report reads identity, dependencies, and contract
  status from canonical registry and certification sources. It stores only
  component-specific progress overrides rather than copying the registry.
- Review order is topological, with the owner-requested phase priority used only
  to choose among dependency-ready components. Button, Select, and Product Card
  form an explicit calibration batch.
- Four Exhibit and Studio viewport modes are required: Mobile, Tablet, Desktop,
  and XL.
- v1 performance budgets use the current canonical gzip sizes as baselines and
  bounded ceilings. Exceeding a ceiling creates a review gap; it does not authorize
  automatic source rewriting.
- Before/after evidence must hold route, renderer, fixture, state, theme, browser,
  and viewport constant.

## Consequences

- Existing 183/183 structural passes remain valid but are no longer mistaken for
  full refinement.
- Research, implementation, evidence, and human approval become separately visible
  in one global matrix.
- Later batches can reuse accepted rules without repeating owner decisions.
- Open product and architecture questions remain explicit blockers where they
  change public meaning or ownership.
- `site/dist` is not part of the refinement source or evidence workflow.
