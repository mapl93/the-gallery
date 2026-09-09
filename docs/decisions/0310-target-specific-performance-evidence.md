# 0310. Target-Specific Performance Evidence

Status: Accepted

Date: 2026-09-09

Owner direction: limits must belong to a target and have a demonstrable basis,
not an arbitrary Gallery-wide ceiling. This supersedes only the numeric budget
policy in ADRs 0088 and 0273, preserving modular copy-and-own delivery.

## Context

The latest component batches stopped at two internally defined ceilings: Web
tokens 64 KiB gzip and the largest Storytelling install 21 KiB gzip. Both were
already exceeded before those batches. Neither number was a target restriction
or evidence of an unacceptably slow page. Family ceilings were derived from a
historical worst case plus about ten percent; that is an internal growth guard,
not an external requirement. The owner explicitly rejected that basis for a gate.

## Decision

- Policy v3 at `docs/refinement/performance-budgets.json` names the target of
  every surface. The active scope stays neutral Web followed by a Shopify Online
  Store theme. No other adapter or distribution scope is introduced.
- Keep all 21 Web measurements and their exact delivery files. Retire numeric
  Gallery ceilings into `historicalReference`, without pass/fail comparisons.
  Observe Shopify token output and the full local CSS/JS asset inventories
  separately. Compatibility assets remain visible even if no page loads them.
- Every new byte rule requires classification, target, applicability, exact
  metric, threshold, official primary-source URL, source authority and verification
  date. Reviewers must check that the source supports the rule; validation enforces
  the presence of provenance, not its factual truth.
- `tool-guideline` means advisory. Only `platform-requirement` may be a required
  byte gate for its applicable target. Do not silently promote a configurable
  tool default or a historical reference to a mandatory platform restriction.
- Missing files, empty selections, invalid policy and measurement failures fail
  the command and cannot appear as zero-byte passes. Required failures cannot be
  bypassed with the former `--allow-gaps` option.
- Measure raw bytes and local gzip separately. Gzip uses `gzip -9 -n -c`, without
  filenames or timestamps. For multi-file installs, retain concatenation with
  newline separators as a comparison model; it is not the sum of separately
  compressed HTTP responses. Shared tokens remain outside each family slice.
- Reports label unverified page, upload and target-tool evidence explicitly.
  Observed or within-guideline does not mean fast, certified or release-ready.
- Passive-component runtime and asset ownership remain accepted architectural
  contracts. Removing arbitrary size ceilings does not remove those boundaries.

## Shopify source verification

Checked 2026-09-09 against official documentation and upstream Theme Check code:

- [Performance guide](https://shopify.dev/docs/storefronts/themes/best-practices/performance/finding-worst-offenders):
  local CSS 100,000 raw bytes and local JS 10,000 raw bytes are configurable,
  opt-in Theme Check defaults for themes.
- [AssetSizeCSS reference](https://shopify.dev/docs/storefronts/themes/tools/theme-check/checks/asset-size-css)
  still describes compressed size and CLI 2.x, conflicting with that guide.
  The [CSS check](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-common/src/checks/asset-size-css/index.ts),
  [JS check](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-common/src/checks/asset-size-javascript/index.ts),
  [file-size helpers](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-common/src/utils/file-utils.ts)
  and [Node filesystem implementation](https://github.com/Shopify/theme-tools/blob/main/packages/theme-check-node/src/NodeFileSystem.ts)
  resolve local measurements through filesystem size. Use raw bytes for this
  local inventory; do not generalize it to remote responses.
- These links describe upstream `main` as inspected on this date, not a pinned
  installed CLI build. The repository `.theme-check.yml` does not enable these
  checks. This inventory neither edits that configuration nor reproduces Theme
  Check's Liquid-reference traversal or executes Theme Check.
- [Theme platform limits](https://shopify.dev/docs/storefronts/themes/architecture/limits)
  apply to their specified files, package and structural units. They are separate
  from these CSS/JS guidelines. No package was built or uploaded here, and this
  asset report does not implement or certify all of those platform limits.
- Theme app extensions and Theme Store submissions have distinct applicability.
  Their requirements are not automatically gates for the current theme target.

## Consequences and acceptance

Component batches may continue after their relevant contract, functional and
resource-lifecycle checks. Keep the previous failing measurements in dated reports
with a supersession note rather than rewriting history as a performance success.
There are currently no required external byte rules encoded in this inventory;
real platform checks and release evidence remain separate and mandatory wherever
their delivery operation applies.

The generated token catalogue does contain repetition: `buildThemeBlocks` emits
all declarations and aliases at four viewports in each Light, system-Dark and
explicit-Dark scope. The Input label gap resolves to 4 px and appears twelve
times, while H1 genuinely changes by viewport. This concerns generated output,
not duplicated canonical token definitions or twelve conceptual theme modes.

Output deduplication remains a proposed optimization. Its acceptance is measured
size reduction plus unchanged computed values, aliases, theme islands, responsive
boundaries and consumer overrides. No 64 KiB or 21 KiB target is imposed, and no
generator, token, component, target asset or hosted Shopify change belongs to this
policy checkpoint.

Verify the audit with synthetic policy/asset fixtures covering target isolation,
unsourced limits, tool-versus-platform classification, raw/gzip units, dependency
closure, missing evidence and CLI exit status. Regenerate the real inventory and
validate the updated documentation. A passing command is not target certification.
