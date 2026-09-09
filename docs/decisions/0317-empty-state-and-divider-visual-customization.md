# 0317. Empty State And Divider Visual Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue the owner-requested public visual customization policy (ADR 0293) with
Empty State and Divider. Replace six CSS choices with source-backed roles while
preserving the default appearance and accepted semantic composition boundaries.

Empty State exposes independent inline padding, following section-md by default;
decorative icon size (64px); and maximum title/message measures (24ch/40ch).
Existing block padding, content gap and typography/color controls remain. The
20% container cap and emergency wrapping remain rendering safeguards from ADR 0112;
requested inline padding can be lower while preserving readable narrow panels.
Heading rank remains host context, not a token/property. Enforce ADR 0236 in the
shared renderer at runtime too: unsupported or missing heading tags render no root.
TypeScript's constrained argument alone did not enforce that promise for JS data.

Divider exposes independent default/decorative thickness (1px/2px). Each role
applies to height horizontally and width vertically. Parent-owned spacing stays
zero; orientation and Purpose remain independent of the visual variant (ADR 0281).
Forced colors keeps its system surface. The previously approved default remains
stable; new custom brand values have not received separate human visual approval.

No additional components, semantic properties, targets, token source types,
neutral runtime, image policy or Figma work. Avatar's prior paired-scale decision
is being clarified separately; this checkpoint makes no Avatar changes.

## Acceptance and adoption

Verify default parity in all token matrices, editable dimensions and relative
measures, reset, narrow containment, native heading levels, both separator axes
and purposes, forced colors, Cart Empty and Empty Collection compositions.
Generate Web/Shopify and verify a CLI consumer. Existing copies adopt updates
explicitly. Consumers that customized both Empty State insets using only the
old section-gap alias should also set the new inline-padding role when migrating.
