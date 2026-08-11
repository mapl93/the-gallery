# 0112. Resolved Empty State Composition And Heading Deferral

> Supersession note (2026-07-20): ADR 0236 resolves the deferred heading
> question. Required title content stays a native contextual heading selected by
> the host; heading rank is not a component property or Studio control. The
> remaining passive-composition decisions in this ADR stay accepted.

Status: Accepted

Date: 2026-07-14

## Context

ADR 0064 accepted Empty State as a resolved-absence composition with a required
title, optional message, optional decorative icon and one optional canonical
Button or Link action. The implementation still inherited heading weight and
line height from the surrounding docs page, used a hardcoded content gap, spent
almost all of a 200px container on desktop inline padding and presented a
navigation fixture as a no-op Button. Its Shopify snippet also hardcodes H3 in
drawer, cart-page and 404 contexts.

Heading rank communicates document structure, so one fixed rank cannot be
correct in every page, panel and dialog. The repository's open questions do not
yet decide whether contextual heading markup remains target-owned, becomes a
cross-target property or moves outside Empty State. That architecture choice
cannot be inferred from visual refinement work.

## Decision

- Empty State remains passive content shown after the target has resolved an
  absent result. It is not loading, progress, error diagnosis, permission policy,
  query/data ownership, onboarding flow or a live-region primitive.
- The public semantic API remains exactly required `title` plus optional
  `message`, decorative `icon` and one `action` composition slot. The action
  contains canonical Link for navigation or Button for a command; Empty State
  owns no action label, destination, callback or local action style.
- The static root remains an ordinary grouping element with no intrinsic role,
  live region, focus behavior or keyboard model. A qualifying dynamic no-results
  transition uses a target-owned Status owner that exists before its text
  changes. Route/page navigation uses normal document focus and headings.
- The icon remains decorative and hidden from accessibility. A meaningful
  illustration would require an alternative-text contract and is not silently
  added to the existing icon slot.
- Complete semantic H3 and body typography is applied to the title and message.
  The title class is element-agnostic so its visual presentation does not change
  when the native heading tag changes.
- Block padding retains the semantic section rhythm. Inline padding is privately
  capped by the actual container width; title, message and canonical action
  permit emergency wrapping without local or document overflow.
- The existing medium Stack token replaces the hardcoded content gap. Icon size,
  measure, inline-padding proportion, wrapping policy and centered alignment
  remain private composition details rather than new public API.
- Exhibit and Studio use the same `EmptyStateStudio` renderer and fixture. The
  shared navigation fixture composes the canonical Link. MDX fallback and
  guidance mirror that anatomy without declaring fixture values as defaults.
- Neutral source adds no listener, observer, timer, request, formatter, layout
  read or asset. Web and Shopify continue sharing generated CSS.
- Heading ownership is explicitly deferred. The recommended option is
  target-owned contextual native markup; alternatives are a public
  `headingLevel` property or ordinary title text with external section labeling.
  Shopify's fixed H3 usage remains a known adapter gap until the owner chooses.
- Empty State remains `pilot` and is not ready for human stability review while
  that architecture decision is open. This ADR accepts the safe technical
  refinement; it does not decide the deferred question.

## Performance

Empty State adds no neutral runtime. Deterministic level-9 gzip measures:

- Primitives CSS: `10,472 B` against the provisional `10.3 KiB` ceiling,
  leaving `75 B`.
- Neutral Web component CSS: `64,778 B` against `64 KiB`, leaving `758 B`.
- Shared neutral runtime: `10,171 B` against the provisional `8 KiB` ceiling,
  retaining its existing `1,979 B` exception and adding `0 B` for Empty State.

Relative to the Batch 27 baseline, Primitives decreases `71 B`, complete Web
component CSS decreases `21 B`, and runtime is unchanged. The CSS reduction
comes from local source simplification, not omitted Empty State behavior.

## Consequences

- Full-page and narrow-container consumers receive the same content hierarchy
  without importing target lifecycle, data, announcements or framework state.
- Long localized and unbroken title, message and action content remains contained
  at four viewport modes, 200% zoom and a 200px composition width.
- Link activation, focus indication, forced colors and reduced motion remain the
  responsibility of the canonical action component and user-agent semantics.
- Web can ship the refined candidate now; Shopify must preserve its current H3
  markup until the heading-owner decision authorizes an adapter change.
- Human review must still approve icon scale/tone, title/body hierarchy,
  centered alignment, spacing, measure and action treatment after architecture
  input resolves heading translation.
