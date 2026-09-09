# 0322. Alert, Spinner And Stat Visual Tokens

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with the existing semantic responsibilities of ADR 0063 and the
contrast derivations accepted in ADR 0292. Add seven Alert geometry roles, nine
Spinner geometry/motion roles and two Stat layout roles. Reuse shared semibold/bold
weights and linear easing instead of duplicating them. Totals: Alert 21, Spinner
15 and Stat 16 public visual roles.

Alert exposes content/padding/icon/title-gap/border geometry and title weight.
Its four severity variants still derive an 8% tint and a 75/25 feedback/primary-text
accent. Base surface/border aliases remain compatibility fallbacks; their controls
are inactive for the four severity variants, which overwrite those roles. Do not
invent a neutral variant or imply that a family input is the exact rendered accent.
Close Button retains ownership of dismissal appearance and native action.

Spinner exposes each diameter, ring thickness, duration, easing, two overlay
paddings and status gap. Preserve the 20% derived track tint and full-color leading
arc. The consumer owns its loading lifetime; reduced motion stops the animation.
Do not transfer Skeleton's bounded decorative-shimmer policy to an active loading
indicator without a product decision. Optional label/Status semantics stay intact.

Stat exposes content gap and requested group-column minimum, with the existing
container cap. Shared weights replace 700/600 literals; the 55/45 directional color
mix stays documented. Centering and OpenType switches keep their existing ownership.
Studio adds an optional site-owned three-metric fixture using complete StatArtwork
instances and a canonical Checkbox control, so group tokens can be exercised without
changing the initial single-metric preview or component properties.

## Acceptance

Verify default parity, source-to-installed-consumer overrides, all three Studio
surfaces/reset, group reflow, severity versus announcement semantics, Close Button
composition, all Spinner sizes and reduced motion, Stat directional wording and
shared weight roles. Preserve pilot status and explicit copy-and-own adoption.
Progress circular is a separate checkpoint following the owner's independent
pixel-diameter/stroke clarification.
