# 0253. Passive Social Proof Toast Profile And Shopify Omission

Status: Accepted

Date: 2026-07-21

Builds on: ADRs 0098 and 0172

## Context

ADR 0172 refined G10 into a canonical Toast profile but deferred whether it
should remain a v1 component, become a recipe/list, and which layer owns its
commercial truth and lifecycle.

The owner selected G10-A. Social Proof remains separately discoverable and may
present at most one verified, current and privacy-approved activity statement.
The target, never the visual base, owns the event and appearance lifecycle.

## Decision

- G10 remains a `pilot` Social Proof profile of canonical Toast and canonical
  Close Button; it is not a second notification primitive or an in-flow list.
- Required content is one trimmed, self-contained, target-verified and
  privacy-approved activity statement.
- Optional content is relevant target-supplied media, target-authored time copy
  and canonical dismissal with a non-empty localized name.
- G10 invents no person, location, product, timestamp, purchase or activity
  detail. Static/editor fixture content is always marked Example-only.
- Default/static Social Proof has no `status`, `alert`, live-region role or
  focus movement. Marketing activity is never assertive.
- The target owns authoritative source, event qualification, freshness, expiry,
  stale/error withdrawal, privacy, anonymisation or consent, localization,
  placement and the complete appearance lifecycle.
- The target's canonical Toast service owns viewport, queue, deduplication,
  rate, recurrence, timing, duration, pause/stop/hide, focus/window pause,
  Escape, persistence, removal and subsequent focus. G10 adds no provider or
  neutral runtime.
- A target must not present the same recent-sale fact simultaneously through
  inline Urgency and floating Social Proof.
- Shopify v1 omits G10 until a verified provider or authoritative data source
  and its event/privacy/lifecycle policy are selected and certified. Theme
  Liquid, merchant-entered `live` copy or example data cannot satisfy this
  requirement.
- G10 may enter human visual/stability review, but provider evidence,
  production placement and G10-specific design evidence remain gates. The
  component is not promoted to `stable`.

## Consequences

- Existing canonical composition and Batch 93 evidence remain valid without
  DOM, CSS, renderer or runtime changes.
- Neutral targets can copy the presentation safely without receiving a hidden
  tracking/provider system.
- Shopify's absence is an intentional v1 correctness policy, not missing
  fallback behavior.
- Final media prominence, time treatment, measure, Close prominence, stacking
  and placement remain human-review decisions.

## References

- <https://www.w3.org/TR/wai-aria-1.2/#status>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://open-ui.org/components/toast.research/>
- <https://www.radix-ui.com/primitives/docs/components/toast>
- <https://shopify.dev/docs/storefronts/themes/store/requirements>
