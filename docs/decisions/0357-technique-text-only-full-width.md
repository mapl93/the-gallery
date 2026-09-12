# 0357. Technique Text-Only Full Width

Status: Accepted

Date: 2026-09-12

## Decision

The owner selected full available width for Technique steps without media,
resolving ADR 0356's choice. Restrict the existing 30rem split/alternation rules
to steps with a direct `.technique-step__media` child. All other steps retain
the base single-column layout, including even steps. Required text still
precedes optional media in DOM order. No extra modifier, semantic property,
source token, mode or runtime is needed for presence-based layout.

The existing `--ratio-technique-text-share` applies to media/text splits only.
Mixed sequences and RTL preserve this boundary. Both generated targets follow
canonical CSS; consumers explicitly adopt the new component copy. The component
remains pilot. This approval resolves this specific editorial choice only.

## Evidence

See `docs/reports/2026-09-12-technique-full-width-checkpoint.md` for 160 baseline
media comparisons, 24 missing-media combinations, custom-share RTL behavior,
actual Studio composition, shared Exhibit controls and resource closure.
