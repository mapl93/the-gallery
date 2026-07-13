# Blog, Storytelling, And Marketing Web Certification Audit

Date: 2026-07-12

Scope: 11 Blog components, 9 Storytelling components, and 11 Marketing
components.

## Source And Documentation Evidence

- All 31 contracts expose reviewed semantic properties and target mappings while
  remaining `pilot`.
- Canonical Blog, Storytelling, and Marketing CSS now includes containment,
  responsive behavior, visible focus, touch targets, and reduced-motion
  handling using existing public tokens.
- All 31 MDX pages use the five canonical sections and one primary artwork.
  Inline styles and external preview assets were removed.
- All 31 components have validated Studio metadata and grouped interactive
  renderers using canonical component classes.
- ADRs 0079, 0080, and 0081 preserve unresolved product boundaries without
  promoting fixture behavior to public API.

## Automated Evidence

- Registry, token source, 183 contracts, 128 Studio definitions, and 183 MDX
  pages validate.
- Studio validation reports 570 semantic properties and 879 public-token
  references.
- Neutral web and Shopify adapters were rebuilt from canonical source; neutral
  web reports zero manifest drift.
- Component readiness reports 183 automated passes and zero structural gaps.
- Static preview audit reports zero errors across 259 previews.

## Browser Evidence

- Blog: 44 Exhibit/Studio desktop/mobile combinations, zero document or stage
  overflow.
- Storytelling: 36 Exhibit/Studio desktop/mobile combinations, zero document or
  stage overflow.
- Marketing: 44 Exhibit/Studio desktop/mobile combinations, zero document or
  stage overflow.
- All 31 Studios were checked at 390px in dark mode with zero overflow.
- Representative screenshots were visually inspected for Article Card, Artist
  Profile, Exhibition Page, Hero, Popup, and Cookie Consent.
- Visual inspection found and corrected an invalid local Hero placeholder and a
  Studio-only Cookie Consent geometry issue before final verification.

## Interaction Evidence

- Comments accepts local draft text and clearly leaves posting/persistence to
  the target.
- Artist Index updates a site-only `aria-pressed` fixture selection without
  claiming result synchronization.
- Newsletter submits locally without network activity and announces feedback.
- Popup, Cookie Consent, and Social Proof start visible, dismiss, reveal their
  sibling trigger, and reopen.
- Cookie Consent preference content toggles locally without defining a public
  consent-category model.

## Result

The three categories are technically complete for the current neutral-web pilot
cycle. Their 31 contracts remain `pilot`; promotion to `stable` still requires
owner review and resolution of the product-boundary questions recorded in
`docs/OPEN-QUESTIONS.md`.
