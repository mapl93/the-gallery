# ADR 0411: Judge.me Review Provider

Status: Accepted (provider selection only; integration pending)

Date: 2026-09-13

## Decision

The owner selected Judge.me for the first Shopify store: “Vámonos con Judge Me.”
This resolves provider selection for that consumer. Judge.me is not a mandatory
dependency of the neutral Gallery components or of every copied Shopify theme.
Do not build a competing review service as part of this delivery.

The Gallery continues to own its tokens, contracts and presentation sources.
Judge.me is the selected authority for review records and its verification and
moderation workflow. Choosing the provider does not establish that every Gallery
Review capability can already be served by its API or widgets.

No paid plan, customer-message campaign, live theme publication, custom backend
or replacement of the canonical Review Form with a vendor widget is selected by
this decision. Those are separate implementation/configuration steps.

## Current evidence

- The connected store reports Argentina and ARS. Shop eligibility requires
  Shopify Payments, whose supported business-country list excludes Argentina.
  The integration must therefore use Judge.me's own review collection without
  depending on Shop syndication.
- A schema-validated read-only Shopify Admin query using
  `appByHandle(handle: "judgeme")` returned `Judge.me Reviews` with
  `installation: null`. Judge.me is not installed as of this checkpoint.
- `platforms/shopify/sections/main-product.liquid` already declares `@app` and
  renders app blocks. That is a possible host, not proof of Judge.me compatibility:
  variant changes replace product content and require app lifecycle verification.
- No dedicated Review Liquid implementation exists yet. Copied `reviews.css`
  provides presentation only; Studio records remain demonstration data.

## Integration investigation

| Surface | Documented capability or constraint | Acceptance evidence needed |
| --- | --- | --- |
| Published reviews | Judge.me documents a private read API and public widget APIs | Obtain only published product-specific records; never expose private credentials or reviewer contact data in theme assets |
| Gallery rendering | Data access and vendor widget customization are different interfaces | Verify the response shape and supported usage before promising the canonical Review, Summary and Toolbar UI |
| Verified purchase | Reviews created through the API cannot be marked verified | Preserve Judge.me's supported verification flow; do not derive a badge from a checked field, email or Studio fixture |
| Photos and videos | Create API supports hosted images, not video upload; list API omits video URLs and merchant replies | Check the documented widget-data alternative and actual store response before exposing dependent controls |
| Collection form | Vendor widget/email flow and custom POST have different capabilities | Decide the concrete submission path after inspecting the installed app; do not silently drop verification or replace the Gallery form |
| Counts and pagination | Partial pages are not complete aggregate data | Verify authoritative counts, filters, product IDs, page boundaries, empty and error states |
| Removal and export | API documentation lists deletion limitations for API-created records | Verify the admin/export/removal lifecycle before adopting a custom submission path |
| Theme integration | Existing Main Product app host can be reused | Test unpublished theme, Spanish, narrow layout, variant changes, editor refresh, duplicate widget/JSON-LD prevention and absent-app behavior |

The initial installation should evaluate the free plan. Do not start a paid trial
or subscription by assumption. API/plan eligibility and final presentation remain
unverified. Do not activate customer invitations or import historical orders for
email campaigns without owner authorization for that communication.

## Next checkpoint

1. Complete Judge.me installation with the merchant's review of its requested
   access. The installation action was stopped by automatic approval review;
   no permissions were granted and no subscription was started.
2. Inspect the installed app's available plan, collection settings and APIs.
3. Prepare one unpublished product-page integration and a capability mapping
   against the existing Gallery components. Resolve a genuine unsupported
   capability with the owner before changing the experience.
4. Validate the bounded integration before widening it. Source checks alone do
   not certify provider behavior or hosted Shopify delivery.

Unrelated Shopify work remains independent of this installation gate.

## Primary references

Checked 2026-09-13:

- [Judge.me API](https://judge.me/help/en/articles/8409180-using-judge-me-api)
- [Judge.me plans](https://judge.me/help/en/articles/8415450-judge-me-reviews-plans-and-pricing)
- [Judge.me integrations](https://judge.me/help/en/articles/8278390-build-integrations-with-judge-me)
- [Shop eligibility](https://help.shopify.com/en/manual/online-sales-channels/shop/eligibility/requirements)
- [Shopify Payments countries](https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries)
- [Shopify App lookup](https://shopify.dev/docs/api/admin-graphql/2026-07/queries/appByHandle)
