# Shopify Back In Stock App Block Boundary

Status: app-block host implemented; provider installation and live proof
required

Decision: D8-A / ADR 0243

## Scope

The Gallery theme supplies the canonical Back In Stock visual/state contract
and a Main Product host for Shopify app blocks. It does not store requests,
observe inventory or send notifications. Those capabilities require an
installed Shopify application/provider.

This boundary intentionally avoids a theme-owned customer, metafield or
metaobject registration database. Theme files are not an availability-delivery
service and must not claim provider acceptance from a local submit event.

## Main Product Host

`sections/main-product.liquid`:

- declares one `@app` block type and renders each installed app block with
  `render block` plus `block.shopify_attributes` on the host wrapper;
- publishes `data-current-variant-id` from
  `product.selected_or_first_available_variant.id`;
- publishes `data-current-market-id` from `localization.market.id`; and
- keeps the app block inside `data-product-render`, the one bounded region
  replaced after option selection.

`assets/product-coordinator.js` copies both identities from every Section
Rendering response and emits `tg:product-variant-change` with `variantId`,
`marketId`, `optionValueIds` and `productUrl` after the new app-block DOM is in
place. An app extension should use server-rendered current context as its source
of truth and may use that event only for target runtime coordination.

## Required Provider Projection

An installed provider app block is compatible when it:

1. renders nothing unless it has one exact selected variant, current market and
   valid provider configuration;
2. independently decides notification eligibility from its inventory authority
   instead of equating one Shopify quantity flag with universal availability;
3. renders one `.back-in-stock` root, visible contextual heading and named
   native `.back-in-stock__form`;
4. composes canonical `.input`/`.input__field.back-in-stock__input` and
   `.btn.back-in-stock__submit` markup;
5. sends exact variant and market context using provider-owned names and
   encoding;
6. drives `data-state` only from `idle`, `submitting`, `confirmed` or
   `retryable-error` provider truth;
7. maps submitting to form/Button `aria-busy`, read-only email and disabled
   submit; maps confirmed to read-only email, disabled submit and adjacent
   `role=status`; and maps retryable error to editable email, enabled submit and
   adjacent `role=alert`;
8. retains the complete form and submitted context after confirmation;
9. separates availability-service notice/consent from any optional marketing
   opt-in; and
10. owns verification, idempotency, deduplication, abuse controls, retention,
    deletion, delivery, retry, expiry, stale-record handling and unsubscribe.

Provider assets should be loaded through the theme app extension so newly
rendered app-block markup is enhanced without injecting duplicate scripts on
every Section Rendering replacement.

## State Matrix

| Provider result | Root state | Email | Submit | Feedback |
| --- | --- | --- | --- | --- |
| No request | `idle` | editable | enabled | absent or truthful non-result help |
| Request in flight | `submitting` | read-only | busy + disabled | optional progress status, never success |
| Accepted | `confirmed` | read-only | disabled | required truthful adjacent `role=status` |
| Failed and retryable | `retryable-error` | editable | enabled | required truthful adjacent `role=alert` |

Field syntax/required validation remains canonical Input behavior and is not a
provider-confirmed state.

## Theme Editor And Live Certification

Before claiming a concrete provider integration is release-ready, verify:

- installation, add/remove/reorder and app-block settings in the Theme Editor;
- unavailable selected variants across at least two markets;
- option changes, browser history and Section Rendering replacement;
- stale/aborted requests and exact variant/market registration payloads;
- native invalid email, submitting duplicate prevention, confirmed retention,
  retryable error and retry;
- service notice, marketing separation and locale translations;
- provider verification/deduplication/abuse/retention/unsubscribe behavior;
- mobile, tablet, desktop and XL presentation plus RTL, 200 percent text,
  keyboard, screen-reader status, forced colors and reduced motion; and
- no duplicate app scripts, listeners, registrations or announcements after
  repeated variant changes and Theme Editor events.

The generated Shopify adapter may report the D8 class/app-host projection as
implemented. That does not certify any uninstalled provider or its operational
policies.
