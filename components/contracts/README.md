# Component Contracts

Component contracts are The Gallery's target-agnostic component source layer.

They describe what a component is before it becomes CSS, Liquid, React, SwiftUI, Compose, Figma, or another target implementation.

Current coverage is 183 validated contracts for 183 registry components.

Current contract shape:

```text
components/contracts/contract.schema.json
components/contracts/*.contract.json
```

Current pilots are:

```text
components/contracts/contract.schema.json
components/contracts/accordion.contract.json
components/contracts/account-dashboard.contract.json
components/contracts/account-settings.contract.json
components/contracts/address-book.contract.json
components/contracts/address-form.contract.json
components/contracts/alert.contract.json
components/contracts/announcement-bar.contract.json
components/contracts/announcement-extended.contract.json
components/contracts/article-body.contract.json
components/contracts/article-card.contract.json
components/contracts/article-hero.contract.json
components/contracts/artist-card.contract.json
components/contracts/artist-index.contract.json
components/contracts/artist-profile.contract.json
components/contracts/artist-statement.contract.json
components/contracts/auth-forms.contract.json
components/contracts/author-card.contract.json
components/contracts/avatar.contract.json
components/contracts/back-in-stock.contract.json
components/contracts/badge.contract.json
components/contracts/before-after.contract.json
components/contracts/blog-sidebar.contract.json
components/contracts/bottom-nav.contract.json
components/contracts/brand-story.contract.json
components/contracts/breadcrumb.contract.json
components/contracts/button-group.contract.json
components/contracts/button.contract.json
components/contracts/card.contract.json
components/contracts/care-instructions.contract.json
components/contracts/carousel.contract.json
components/contracts/cart-drawer.contract.json
components/contracts/cart-empty.contract.json
components/contracts/cart-line-item.contract.json
components/contracts/cart-note.contract.json
components/contracts/cart-page.contract.json
components/contracts/cart-summary.contract.json
components/contracts/cart-upsell.contract.json
components/contracts/filter-bar.contract.json
components/contracts/ceramics-faq.contract.json
components/contracts/ceramics-glossary.contract.json
components/contracts/certificate.contract.json
components/contracts/checkbox.contract.json
components/contracts/checkout-progress.contract.json
components/contracts/close-button.contract.json
components/contracts/collage-section.contract.json
components/contracts/collection-grid.contract.json
components/contracts/collection-hero.contract.json
components/contracts/collection-promo.contract.json
components/contracts/collection-story.contract.json
components/contracts/color-picker.contract.json
components/contracts/combobox.contract.json
components/contracts/coming-soon.contract.json
components/contracts/command-palette.contract.json
components/contracts/comments.contract.json
components/contracts/commission-form.contract.json
components/contracts/comparison-table.contract.json
components/contracts/contact-section.contract.json
components/contracts/context-menu.contract.json
components/contracts/cookie-consent.contract.json
components/contracts/countdown.contract.json
components/contracts/data-list.contract.json
components/contracts/data-table.contract.json
components/contracts/date-picker.contract.json
components/contracts/dimensions.contract.json
components/contracts/discount-field.contract.json
components/contracts/divider.contract.json
components/contracts/drawer.contract.json
components/contracts/dropdown-menu.contract.json
components/contracts/edition-badge.contract.json
components/contracts/empty-collection.contract.json
components/contracts/empty-state.contract.json
components/contracts/exhibition-page.contract.json
components/contracts/fab.contract.json
components/contracts/faq-section.contract.json
components/contracts/featured-collection.contract.json
components/contracts/field-wrapper.contract.json
components/contracts/fieldset.contract.json
components/contracts/file-upload.contract.json
components/contracts/filter-panel.contract.json
components/contracts/firing-info.contract.json
components/contracts/footer.contract.json
components/contracts/form.contract.json
components/contracts/free-shipping-bar.contract.json
components/contracts/gallery-grid.contract.json
components/contracts/gift-card.contract.json
components/contracts/gift-wrap.contract.json
components/contracts/glaze-guide.contract.json
components/contracts/header.contract.json
components/contracts/hero-section.contract.json
components/contracts/hero.contract.json
components/contracts/hover-card.contract.json
components/contracts/icon-button.contract.json
components/contracts/image-text.contract.json
components/contracts/inline-error.contract.json
components/contracts/input.contract.json
components/contracts/instagram-feed.contract.json
components/contracts/lightbox.contract.json
components/contracts/link.contract.json
components/contracts/logo-bar.contract.json
components/contracts/lookbook.contract.json
components/contracts/makers-mark.contract.json
components/contracts/marquee.contract.json
components/contracts/masonry-gallery.contract.json
components/contracts/material-library.contract.json
components/contracts/mega-menu.contract.json
components/contracts/mobile-menu.contract.json
components/contracts/modal.contract.json
components/contracts/multicolumn.contract.json
components/contracts/newsletter.contract.json
components/contracts/number-input.contract.json
components/contracts/order-detail.contract.json
components/contracts/order-history.contract.json
components/contracts/page-404.contract.json
components/contracts/pagination.contract.json
components/contracts/password-input.contract.json
components/contracts/password-reset.contract.json
components/contracts/payment-icons.contract.json
components/contracts/photo-reviews.contract.json
components/contracts/pin-input.contract.json
components/contracts/pickup-location-selector.contract.json
components/contracts/policy-page.contract.json
components/contracts/popover.contract.json
components/contracts/popup.contract.json
components/contracts/price.contract.json
components/contracts/process-timeline.contract.json
components/contracts/product-card.contract.json
components/contracts/product-form.contract.json
components/contracts/product-gallery.contract.json
components/contracts/product-info.contract.json
components/contracts/product-slider.contract.json
components/contracts/progress.contract.json
components/contracts/quantity-selector.contract.json
components/contracts/quick-view.contract.json
components/contracts/radio.contract.json
components/contracts/rating.contract.json
components/contracts/reading-progress.contract.json
components/contracts/related-articles.contract.json
components/contracts/review-card.contract.json
components/contracts/review-form.contract.json
components/contracts/review-highlights.contract.json
components/contracts/review-pagination.contract.json
components/contracts/review-summary.contract.json
components/contracts/review-toolbar.contract.json
components/contracts/rich-text-section.contract.json
components/contracts/scroll-area.contract.json
components/contracts/search-overlay.contract.json
components/contracts/segmented-control.contract.json
components/contracts/select.contract.json
components/contracts/share-buttons.contract.json
components/contracts/shipping-info.contract.json
components/contracts/size-chart.contract.json
components/contracts/skeleton.contract.json
components/contracts/slider.contract.json
components/contracts/social-proof.contract.json
components/contracts/spinner.contract.json
components/contracts/star-input.contract.json
components/contracts/star-rating.contract.json
components/contracts/stat.contract.json
components/contracts/stats-section.contract.json
components/contracts/steps.contract.json
components/contracts/sticky-atc.contract.json
components/contracts/store-locator.contract.json
components/contracts/studio-tour.contract.json
components/contracts/subscription-option.contract.json
components/contracts/switch.contract.json
components/contracts/table-of-contents.contract.json
components/contracts/tabs.contract.json
components/contracts/tag.contract.json
components/contracts/tags-input.contract.json
components/contracts/technique-explainer.contract.json
components/contracts/testimonials.contract.json
components/contracts/textarea.contract.json
components/contracts/timeline-primitive.contract.json
components/contracts/toast.contract.json
components/contracts/toggle.contract.json
components/contracts/tooltip.contract.json
components/contracts/trust-badges.contract.json
components/contracts/urgency.contract.json
components/contracts/variant-selector.contract.json
components/contracts/video-section.contract.json
components/contracts/view-toggle.contract.json
components/contracts/wishlist.contract.json
components/contracts/workshop-listing.contract.json
```

Contracts may include optional `behavior` entries for target-agnostic interaction requirements such as open state, dismissal, focus management, and required ARIA semantics. The behavior field describes what adapters must preserve; it does not prescribe one target implementation.

The docs site reads these contracts through `site/src/lib/contracts.ts` and renders them with `site/src/components/ContractSummary.tsx`.

## Commands

```sh
npm run validate:contracts
```

The validator checks each contract against current implementation facts:

- `registry.json`
- canonical CSS under `components/css/`
- component docs under `site/src/content/components/`
- public token definitions in `platforms/web/tokens.css`

Contracts are not generated target output. They are source files.

The neutral web adapter consumes these contracts when generating its manifest:

```sh
npm run build:adapter:web
npm run validate:adapter:web
```
