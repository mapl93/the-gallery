# 0361. Workshop And Commission Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

ADR 0293 exposes eight Workshop Listing roles: card minimum width, media ratio,
schedule accent share, body/footer/metadata gaps, footer top padding and border
thickness. Defaults preserve 15rem, 3:2 media, the 80% accent mix, half of the
shared element gap and dimension.1. Card, Price, Badge and Button continue to
own their composed visual and semantic contracts (ADR 0207). Intrinsic grid
fitting remains; no column ceiling or workshop-record model is introduced.

Commission Form exposes six roles for its 40rem measure, section gap, outer
padding, header gap, field gap and action gap. Factors retain the shared grid
or element gap and preserve defaults. The existing 28rem container query stacks
actions; native fields, upload and Buttons retain ownership (ADR 0208). No
submission, transport, consent, booking or file-service policy is inferred.

Profiles now contain 23/18 public values. Contract, registry and Studio expose
the complete inventory, with Exhibit derived from that metadata. Independent
font/color/spacing roles use individual Studio controls rather than misleading
X/Y pair labels. The Workshop page's obsolete forward-looking Figma requirement
is removed under the accepted Web/Shopify scope.

Studio's broad child width rule previously overrode Commission Form's canonical
measure. That rule now excludes Commission Form. These two Studio inner frames
also inherit the grid-gap token instead of replacing it with a site-local clamp,
so default and edited spacing come from the same canonical input as consumers.
Other Ceramics previews retain their current rules for separate verification.

Both generated targets are updated. Both components remain pilot; copy-and-own
consumers explicitly adopt CSS/tokens. Target data, services and editor readiness
remain pending and are not certified by this visual checkpoint.

## Evidence

See `docs/reports/2026-09-12-workshop-commission-checkpoint.md` for default
comparisons, independent controls, Studio corrections and local form semantics.
