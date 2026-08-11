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

## 2026-07-17 Refinement Addendum

The browser statements above record the earlier pilot fixture and are not the
current U8/U9 certification result. Subsequent dependency-ordered refinement
supersedes them as follows:

- Wishlist is now a passive target-controlled labelled collection of canonical
  Product Cards and optional canonical Empty State. Remove is a named command,
  not `aria-pressed`; saved state, mutation, count transition, focus/status,
  privacy, and persistence are target-owned.
- Account Settings is now a passive heading-labelled section shell. Its shared
  fixture composes one explicit profile Form and independent immediate
  Switches; it has no global Save behavior or internal status/persistence
  claim. Account schema, Form boundaries, consent, and persistence remain
  target-owned.

The current component evidence lives in
`docs/reports/wishlist-web-refinement-audit.md` and
`docs/reports/account-settings-web-refinement-audit.md`. Both remain `pilot`
and `refined-decision-needed`; neither is promoted to `stable`.
