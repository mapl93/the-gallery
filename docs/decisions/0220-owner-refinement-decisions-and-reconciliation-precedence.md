# ADR 0220: Owner Refinement Decisions And Reconciliation Precedence

- Status: Accepted
- Date: 2026-07-20
- Decision owners: The Gallery owner and repository maintainers
- Related: `docs/refinement/owner-decision-responses.md`,
  `docs/refinement/decision-coverage.json`, ADRs 0088–0219

## Context

The four component-refinement packets documented technically viable proposals
for 67 components that still required product, aesthetic, commercial or
architecture input. The owner reviewed those questions one by one. Several
accepted answers intentionally differ from the packet recommendation or from a
provisional component-specific ADR written before owner review.

The repository needs one explicit precedence rule so later implementation does
not mistake a historical proposal code for the accepted direction, repeat an
already resolved question, or promote an unreconciled candidate.

## Decision

`docs/refinement/owner-decision-responses.md` is the normative owner-decision
ledger for the 67 covered component decisions. The four packets remain evidence
and proposal history. Their codes describe the proposed options; they do not
override the accepted wording in the ledger.

When a ledger decision conflicts with an earlier provisional ADR, contract,
registry entry, renderer, fixture, canonical CSS/JavaScript implementation or
target mapping, the ledger controls the boundary to reconcile. The earlier
artifact remains historical evidence until it is amended, superseded, migrated
or removed through normal repository changes.

Reconciliation proceeds in dependency order and must preserve the standing
rules:

1. Canonical source remains target-agnostic and is consumed by Exhibit and
   Studio through the same renderer, fixture and implementation.
2. Composed components consume canonical dependencies rather than duplicate
   their markup, behavior or state ownership.
3. Target-owned services and commercial consequences remain target-owned unless
   the accepted ledger explicitly changes that boundary.
4. Store Locator is added and duplicate Certificate Details is removed, keeping
   the intended v1 registry inventory at 183. Prose is a Foundations style
   contract and does not add a registry component.
5. Recorded owner acceptance authorizes implementation and review preparation;
   it is not final visual approval and never promotes a component to `stable`.
6. A component joins the human-review queue only after its accepted direction is
   reflected in source, contracts, Studio metadata, target translation,
   validation and required visual/interaction evidence.

## Consequences

- The decision-coverage manifest records all four packets as
  `owner-decisions-recorded` and links the normative ledger.
- Progress reports distinguish “owner decision recorded” from “ready for human
  review.” The existing 116 ready candidates do not become 183 merely because
  the questions were answered.
- Packet proposal codes remain useful traceability metadata but must not be
  displayed as though they were the selected owner answer.
- Conflicting provisional ADRs are reconciled as their components enter the
  dependency-ordered implementation batches; no bulk semantic rewrite is
  inferred without source and validation evidence.
