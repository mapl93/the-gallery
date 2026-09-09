# 0308. File Upload and Pin Input Visual Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with 24 public decisions in the existing component token layer:
17 for File Upload and 7 for Pin Input. Contracts, registry and Studio/Exhibit
reference the source decisions and shared semantic roles; Web and Shopify outputs
are generated. No contract is promoted to stable.

File Upload exposes minimum height, independent horizontal/vertical padding,
border width, compact geometry, icon size/gap, instruction and selected-status
weights, guidance/status gaps, preview spacing and thumbnail size/border. Shared
Input focus, typography, state colors, radii, opacity and timing retain their
existing roles. Dashed border treatment and full-surface native activation stay
implementation. Minimum height is a floor, not a fixed height. Its existing
320px compact query requires an ancestor query container; Studio provides one.

The optional Studio icon and image-preview toggles exercise existing optional
anatomy. Preview creation is target-owned under ADR 0095. The fixture creates
object URLs only for selected images and revokes them on change/reset/unmount.
Reset clears the native FileList as well as its visible status. It does not upload
files, add validation policy or alter capture/accept semantics.

Pin Input exposes normal/compact cell width, height and gap, plus character
weight. Shared Input border/focus and Field Wrapper labels/feedback remain
composed. The existing numeric independently focusable segments from ADR 0222
retain their 48×56px and 44×52px defaults. The compact threshold becomes 328px
(the six-cell default requires 6×48 + 5×8), avoiding the last-cell wrap at 326px
when removing the former site-only 40×48px override. Narrower containers or
customized dimensions may wrap; segment count remains behavior, not a token.

Studio's readonly paste guard now matches the shared enhancer. Authored empty
feedback is respected and neutral feedback uses the neutral Field Wrapper class.
Native form ownership, verification and submission boundaries do not change.

## Adoption

Copy-and-own consumers adopt compatible token and CSS outputs together, preserve
native markup, provide the intended query-container context, and inspect local
size overrides. Studio fixture changes do not become consumer runtime defaults.
Hosted Shopify, other browsers and human visual certification remain separate.
