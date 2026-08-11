# Component Refinement Batch 32

Status: Product Form technically refined; target/owner input required

Date: 2026-07-14

Components: Product Form

## Outcome

Product Form's dossier, native ownership decision, contract, intrinsic CSS,
shared Exhibit/Studio renderer and Quantity artwork, Studio metadata, MDX,
Shopify initial Liquid, adapter inventory, generated targets, browser evidence,
and individual audit are reconciled. It remains `pilot` and is intentionally not
ready for human stability review until its commerce coordination, target purchase
lifecycle, product-scope, feedback, and visual decisions are made.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Browser Evidence Summary

- Baseline FormData had only option values. Refined FormData includes options,
  named Quantity, resolved fixture merchandise, and the activated submitter.
- Selection changes synchronize merchandise; reset restores selection, quantity,
  hidden data, and FormData. Native validity blocks an invalid submit.
- Unavailable removes unresolved merchandise from successful controls and
  disables the action. Pending preserves the label, exposes canonical busy state,
  and blocks repeat activation. Product Form contains no duplicate Price.
- Product Form and standalone Quantity Selector have identical core artwork
  structure. Exhibit and Studio form outerHTML is exactly equal at `3,737` chars.
- Four viewports plus localized 320px content, RTL, dark, forced colors, reduced
  motion, focus, component-level 200% zoom, and pending state are recorded in
  four before and fourteen after images.
- The focused 52px action has a 2px outline and `10.37:1` default text contrast;
  browser console errors/warnings are zero.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `5,311 B` | `5.2 KiB` | pass (`13 B` headroom; `+5 B` from Batch 31) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; no Product Form runtime) |
| Neutral Web components CSS | `65,423 B` | `64 KiB` | pass (`113 B` headroom; `-18 B` from Batch 31) |

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate. Shopify now detects the
  native Liquid form root and reports CSS/Liquid/data ready plus behavior target
  work, with its planned-status warning preserved.
- Temporary Vite build, native semantic/interaction probes, exact parity, four
  viewports, special media, long localized content, RTL, focus/contrast,
  deterministic gzip, structural/static-preview/refinement audits and explicit
  `site/dist` cleanliness pass.

## Required Target And Owner Input

1. Choose the product-page/quick-view coordinator for options, merchandise id,
   availability, quantity rules, Price/media/inventory/URL, selling plans,
   pending/result state, analytics, and one update status.
2. Choose Shopify native navigation, locale-aware Ajax with Cart Drawer/section
   refresh, or progressive use of both; assign error, retry, focus, announcement,
   cart-count, and rollback ownership.
3. Decide v1 accelerated checkout and supplementary-field scope.
4. Decide whether Quantity is omitted, fixed, or visible for one-of-one work.
5. Define unavailable/pending/success/error explanation, focus, and announcement
   policy for each target.
6. Provide or approve the Product Form visual reference and spacing, action,
   feedback, unavailable/pending, and narrow-layout direction.

## Program Progress

After regenerating the matrix, the program contains 183 components, 105
dependency edges, 73 dossiers and 63 components ready for human review. Product
Form is refined but blocked; only Button is human-approved. The next dependency-
safe component is Product Slider (review order 74).
