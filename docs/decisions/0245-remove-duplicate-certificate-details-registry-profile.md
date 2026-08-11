# 0245. Remove Duplicate Certificate Details Registry Profile

Status: Accepted

Date: 2026-07-20

## Context

R11 Certificate Details had already been reduced to a zero-visual profile over
canonical F3 Certificate. Owner review accepted removing the duplicate identity
instead of preserving a second contract, selector, Studio entry and docs page
for the same record-presentation job.

The D9 identity split in ADR 0244 adds Store Locator. Removing R11 in the same
inventory migration preserves the intended v1 total of 183 components.

## Decision

- Remove `certificate-details` from registry, contract inventory, MDX discovery,
  Studio metadata/renderer routing, progress override and decision coverage.
- Remove `.certificate-details` from the Ceramics CSS ownership lists and do not
  retain a selector alias, profile root, adapter record or parallel behavior.
- Consumers map their truthful title, complete detail pairs, optional signature
  and optional descriptive verification Link directly to canonical Certificate.
- Historical dossier, audit and ADR 0211 remain migration evidence only; they are
  not active component source.
- Certificate remains `pilot`; removing a duplicate does not promote it to
  `stable` or imply human visual approval.

## Consequences

- Ceramics decreases from 14 to 13 registry components; Product increases from
  10 to 11 through Store Locator; the repository remains at 183.
- Generated manifests and certification reports no longer carry R11.
- There is one source, renderer, contract and adapter boundary for certificates.
