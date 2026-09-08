# 0284. Card Fine-Pointer Hover Treatment

Status: Accepted

Date: 2026-08-25

## Context

During the live human review of Card, the owner compared a stationary surface,
a shadow-only response, and the existing fine-pointer treatment. The existing
treatment was preferred. Card must still keep Variant and State independent,
must not require hover to reveal information, and must remain safe for reduced
motion and input modes without hover.

## Decision

- Card retains one independent public Hover state that combines with the
  selected Default, Flat, or Elevated variant.
- On hover-capable fine pointers, Default and Elevated lift by `2px`. Default
  advances from the small to medium shadow and Elevated advances from the
  medium to large shadow.
- Flat remains stationary and shadowless on hover.
- An optional image inside canonical Card media may scale to `1.03` on the same
  fine-pointer hover.
- Coarse and non-hover pointers keep the resting presentation. Reduced-motion
  mode removes Card/media transitions and all hover transforms.
- Hover remains decorative: it does not reveal required content, add a click
  contract, or make a passive Card interactive.
- Specialized Card compositions may deliberately suppress or replace the base
  hover only through their own recorded component decision. Product Card keeps
  its already accepted stationary surface while continuing to compose the
  canonical Card shell.

## Consequences

- Card requires no animation library or component JavaScript for this behavior.
- Studio exposes Default and Hover separately from Default, Flat, and Elevated
  variants and renders their intersections without publishing combined states.
- The hover treatment is human-approved, but Card remains `pilot` until the
  owner approves the complete component after live review.
