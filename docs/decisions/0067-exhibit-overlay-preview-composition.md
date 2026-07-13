# 0067. Exhibit Overlay Preview Composition

Status: Accepted

Date: 2026-07-12

## Context

Overlay components need a bounded canvas inside Exhibit so they do not cover
the documentation application. The Modal preview previously placed its
overlay inside a shrink-to-fit wrapper shared with the trigger, causing the
dialog to inherit an unusably narrow presentation.

## Decision

- Exhibit overlay previews use the site-owned `overlay` preview layout.
- The trigger and overlay are siblings inside a full-width preview stage. The
  trigger never owns or constrains the overlay geometry.
- Modal starts visible so the component itself remains the artwork shown on
  first load.
- While the overlay is visible, its trigger is visually hidden. Closing the
  overlay reveals the trigger so the user can open it again.
- The overlay is bounded by the preview stage rather than the application
  viewport. This preserves Exhibit isolation while exercising the canonical
  Modal CSS and interaction states.
- This composition is documentation-site behavior and does not change Modal's
  target-agnostic contract or consumer default visibility.

## Consequences

- Modal remains inspectable at a useful width on desktop and mobile.
- The docs preview demonstrates close and reopen behavior without making the
  trigger part of the dialog's layout.
- Future full-screen overlay previews can opt into the same layout explicitly
  without changing small inline component previews.
