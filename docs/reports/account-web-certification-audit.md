# Account Web Certification Audit

Date: 2026-07-12

Scope: `auth-forms`, `password-reset`, `account-dashboard`, `order-history`,
`order-detail`, `address-book`, `address-form`, `wishlist`, and
`account-settings`.

## Automated Evidence

- Registry, token source, 183 contracts, 97 Studio definitions, and 183 MDX
  pages validate.
- The neutral web adapter validates with 183 components and zero manifest drift.
- The Shopify adapter validates with its existing maturity warnings.
- Static preview audit reports 0 errors across 284 previews.
- Component readiness reports 183 automated passes and 0 structural gaps.

## Browser Evidence

- Exhibit and Studio were checked for all nine components at 1280px and 390px:
  36 view combinations, 0 document overflows, and 0 artwork/stage overflows.
- All nine Studios were checked at 390px in dark mode with 0 overflows.
- Representative desktop and mobile captures were visually inspected for Auth
  Forms, Account Dashboard, Order Detail, Address Form, and Wishlist.
- Order Detail inspection found and corrected inline Cart Line Item title and
  variant flow before the adapters were rebuilt and rechecked.

## Interaction Evidence

- Auth submission reports local non-network feedback.
- Password Reset transitions to its optional success feedback.
- Dashboard and Order History fixtures preserve simulated navigation.
- Address Book add/edit actions announce local feedback.
- Address Form uses the canonical enhanced Select anatomy, changes country,
  keeps the listbox legible, and reports submit feedback.
- Wishlist toggles `aria-pressed` and updates the visible item count.
- Account Settings switches toggle and explicit submit reports feedback.

## Result

The Account category is technically complete for the current neutral-web pilot
cycle. All nine contracts remain `pilot`; promotion to `stable` still requires
the owner review and open product-boundary decisions documented in
`docs/OPEN-QUESTIONS.md`.
