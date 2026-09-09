# 0320. Compact Action Token Customization

Status: Accepted

Date: 2026-09-09

## Context

The owner requires meaningful component customization through tokens (ADR 0293),
including independent size choices clarified in ADR 0319. Icon Button and Close
Button still fixed control/icon dimensions and focus geometry in CSS. Their
resting transparent fills could not be customized in Studio. Button Group overlapped
borders by a fixed 1px even when its Button children used a different public width.

## Decision

Expose eleven Icon Button source roles: three control/icon size pairs, border
width, focus width/offset and resting fill/border color. Preserve 32/40/48px with
16/20/24px icons as defaults, not mandatory ratios. Existing shared semantic colors,
radii, motion and disabled opacity remain public: 21 visual roles in total.

Expose five Close Button source roles: control size, icon size, focus width/offset
and resting fill. Preserve 32/20px defaults and its borderless treatment. Existing
semantic roles bring its total to thirteen. The containing surface continues to
own dismissal, Escape, motion and focus restoration under ADR 0062.

Button Group derives overlap from `--border-button-width`. Reuse that role alongside
its outer radius in the two-role group API; do not duplicate the child Button
catalogue. Uniform border overrides belong on the group. Conflicting per-child
widths require consumer-owned composition policy. Child count/labels remain the
site fixture under ADR 0291, not semantic properties or tokens.

Studio exposes the selected Icon Button preset's two dimensions; its simulated
focus reads the same public tokens as native focus. Resting transparent surfaces
use the shared alpha-aware color editor. Exhibit derives its reference from this
metadata. Centering, internal zero corners and focus stacking remain CSS mechanics.
No automatic size cap or accessibility certification follows from a token value.

## Acceptance

Verify default parity across theme/viewport matrices; independent dimensions,
transparent/custom surfaces, border and focus overrides in Studio and an installed
consumer; native keyboard activation/disabled, reduced motion, LTR/RTL joins,
one-child corners, full-width long labels and actual contextual composition.
Preserve all three pilot statuses. Regenerate Web/Shopify outputs; copy-and-own
consumers adopt them explicitly. No remote theme upload or new target is implied.
