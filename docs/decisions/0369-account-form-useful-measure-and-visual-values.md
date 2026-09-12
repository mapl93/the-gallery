# 0369. Account Form Useful Measure And Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

The owner selected option A from the measured Auth/Password Reset alternatives:
440px means useful form content. The outer maximum adds both horizontal padding
sides and remains constrained by the parent. Existing responsive layout padding
bases stay intact, with independent public horizontal and vertical factors.
A narrow embedding can reduce its padding factor; the maximum is not a forced
minimum or a guarantee of 440px in every parent.

Apply ADR 0293 with 21 source roles (12 Auth, 9 Reset): useful maximum, independent
padding/section-gap factors, title weight and Reset icon size. The 440px measure
is an accepted component decision, not an invented global primitive. Gap factors
retain system bases; icon size and weights alias existing primitives. Preserve
native 700 title weight explicitly; this width approval does not silently adopt
another heading aesthetic. Body family and weight are consumed on the shell.

Contracts, registry, Studio and shared Exhibit expose the same 29/25 public-value
inventories. Remove Studio's width/padding/max-width bypass for these two roots.
The surrounding preview still supplies available space and may constrain the
useful form exactly as a consumer would. No change to other Account wrappers.

Auth and recovery semantics, validation, native inputs and provider/session
truth keep their owners (ADR 0258). Generated Web and Shopify outputs update,
but copies require explicit adoption and current Shopify accounts remain hosted.
No new layer, mode, platform, runtime or maturity promotion.

## Evidence

`docs/reports/2026-09-12-auth-form-values-checkpoint.md` records the installed
consumer, visual comparison, customization, Studio and local behavior evidence.
