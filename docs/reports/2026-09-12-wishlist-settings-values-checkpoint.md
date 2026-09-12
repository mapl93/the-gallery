# Wishlist / Settings visual values checkpoint

Date: 2026-09-12. ADR 0372. Parent: `a84bd3a`.

15 source roles; public inventories 24/22.

## Evidence

- Fresh CLI dependency-closed consumer. 710 element comparisons preserve
  geometry, typography, colors, padding, margins, borders and radii across
  320/600/900/1200/1800px in Light/Dark.
- Wishlist gap 64px, grid gap 16px and bounded inset 60px apply. At unchanged
  viewport, a 300px parent yields a 15px inset with .05 share: the limit uses
  its own container. Narrow RTL fits; screenshot inspected.
- Settings maximum 480px, separator 3px, heading gap 16px and content gap 32px
  apply independently; final section retains zero separator.
- Studio Wishlist inset/removal-request feedback/reset and Settings 30rem
  measure, separator, immediate native Switch, explicit profile submission and
  reset pass. The demo states that no saved item/account setting was persisted.
  Shared Exhibit exposes the same token names.
- Source/Web/Shopify/docs/catalogue validation passes. One browser/tab/server;
  cleanup, resource gate and process scan pass; owned public fixture removed.

Ignored evidence: `output/playwright/wishlist-settings/` includes installed
provenance, old CSS, fixtures, harness/results and screenshot.

## Limits

No saved-item service, anonymous/account merge, real deletion, customer settings
mutation, consent record, hosted account UI, Shopify editor, screen reader or
deployment was tested. Child Product Card and Switch behavior is not fully
recertified. Account visual coverage is complete for this pass; all nine
contracts remain pilot and hosted-target evidence remains separate.
