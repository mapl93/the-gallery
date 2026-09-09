# 0325. Timeline Geometry And Link Decoration Tokens

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with twelve Timeline and five Link source roles, reusing shared
semibold/medium weights and existing semantic colors. Timeline exposes 27 public
roles; Link exposes twelve. No new layer, target, mode or component runtime.

Timeline's visible text starts 44px from the marker origin. Previously this was
split between a 24px root inset and 20px item inset, with independently hardcoded
marker/connector offsets. Replace the private layout with one derived inset:
marker size + outer ring + content gap (10 + 2 + 32). The item has no second inset.
Visible text, marker and connector placement remains unchanged by default; the
root/item internal boxes intentionally change and are not claimed to be identical.

Expose marker size/border/ring/top offset, content and entry gaps, connector width
and clearance after the marker ring, metadata row/column/bottom gaps and title
bottom gap. Derive connector centering and start from those roles. Its end remains
the entry boundary; the final connector is omitted. Forced colors replace colors
while respecting configured geometry. Preserve status ownership, visible labels,
single current entry and the legacy current class.

Do not expose the obsolete root/item inset pair or derived private offsets as
independent public tokens. They describe one geometric relationship. Consumers
must choose coherent border/marker dimensions and adopt the canonical reset along
with the updated CSS/token slice. This supersedes ADR 0065's initial token inventory
while preserving ADR 0066's use of shared semantic status colors.

Link exposes underline width/offset and focus width/offset/radius; Nav reuses the
medium weight. Its inline typography still follows the surrounding text. Variant rules set text-decoration-line instead of the shorthand, which formerly
reset thickness to auto in Subtle/Nav. Subtle hover now respects the same authored
width as Default (initially 1px), instead of returning to browser auto thickness.
Native
hover/focus, target/rel and current-page semantics stay independent. The two inputs
to its 70% accent / 30% primary mixture are separately editable in Studio, alongside
Subtle text. Timeline's former Marker fill label becomes Marker border to match
its actual surface-primary consumption. Neither swatch promises to equal a derived
mixed result or certify contrast for every choice.

## Acceptance

Compare visible Timeline geometry in eight width/theme matrices, including all
six statuses, while recording the internal inset normalization separately. Verify
independent marker/connector geometry, spacing, RTL/long content, forced colors,
Studio/reset and copy-and-own adoption. For Link, verify three variants, native
hover/focus/navigation, inherited typography, custom decoration, color inputs,
reduced motion, Studio/reset and an existing canonical Link composition.

Structural and local browser evidence do not promote pilot maturity or certify
remote Shopify behavior. Component source CSS remains target-agnostic.
