# 0299. CLI Consumer File Protection

Status: Accepted

Date: 2026-09-08

## Context

Audit finding 9 showed that `add` recopied the complete installed dependency
slice, overwriting local CSS, token JSON and runtime customizations. The owner
approved preserving consumer changes and reviewing conflicts before writes.

## Decision

- Keep the existing Web dependency slices and package versioning model.
- Install the manifest's generated `tokens.css`, not legacy token JSON. Existing
  legacy files remain untouched; their customizations require an explicit manual
  translation before a consumer changes imports.
- Record source paths, SHA-256 upstream baselines and package provenance in
  consumer-owned `tg.install.json`. Hashes identify bytes even when the package
  version has not changed. This is install provenance, not a release policy.
- `add --dry-run` previews the entire plan without files, directories or prompts.
- Identical files are retained. Clean tracked files can accept upstream updates.
  Local-only changes are preserved with their previous baseline.
- Changes on both sides, differing files without a known baseline, locally
  removed managed files, path collisions and symbolic links stop the install
  before writing the planned files or config. There is no force-overwrite flag.
- After reviewing/merging one conflicting file, a consumer may pass its exact
  path through `--keep-local`. The CLI keeps its bytes and records the explicitly
  accepted upstream baseline; it does not infer semantic compatibility. Other
  conflicts still stop the install.
- A customized generated runtime entry is also a consumer file. If new behavior
  changes that entry, the conflict must be reconciled instead of silently
  replacing the entry or claiming the new component is installed.
- `diff` compares unique token, foundation, component, runtime and generated-entry
  files against their current upstream projection, with baseline-aware statuses
  and local/upstream content. It performs no writes.
- Existing identical legacy installations can adopt provenance. Differing old
  files never receive an invented baseline.

## Limits

The CLI does not merge consumer code, infer semantic compatibility, migrate old
brand JSON, publish packages or synchronize copies in the background. Preflight
prevents detected conflicts from partially installing a dependency graph; it is
not an operating-system transaction across arbitrary filesystem failures.

## Validation

`npm run validate:cli` exercises dependency closure plus temporary independent
consumer/upstream fixtures for fresh install, dry run, repeated install, local
CSS/tokens/runtime, upstream-only updates, simultaneous changes, unknown legacy
baselines, deleted files, links, invalid metadata and read-only diff.

See `docs/CLI.md` for consumer recovery instructions.
