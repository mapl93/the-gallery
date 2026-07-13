import type { ComponentType } from 'react';
import type { ComponentContract } from '../../lib/contracts';
import type { StudioDefinition } from '../../lib/studio';
import ButtonStudio from './ButtonStudio';
import InputStudio from './InputStudio';
import SelectStudio from './SelectStudio';
import CheckboxStudio from './CheckboxStudio';
import RadioStudio from './RadioStudio';
import LabelPrimitiveStudio from './LabelPrimitiveStudio';
import QuantitySelectorStudio from './QuantitySelectorStudio';
import PriceStudio from './PriceStudio';
import PrimitiveActionStudio from './PrimitiveActionStudio';
import FeedbackDisplayStudio from './FeedbackDisplayStudio';
import EmptyStateStudio from './EmptyStateStudio';
import DividerStudio from './DividerStudio';
import AvatarStudio from './AvatarStudio';
import RatingStudio from './RatingStudio';
import SkeletonStudio from './SkeletonStudio';
import DataTableStudio from './DataTableStudio';
import DataListStudio from './DataListStudio';
import TimelinePrimitiveStudio from './TimelinePrimitiveStudio';
import LinkStudio from './LinkStudio';
import CardStudio from './CardStudio';
import OverlayStudio from './OverlayStudio';
import ToastStudio from './ToastStudio';
import DisclosureNavigationStudio from './DisclosureNavigationStudio';
import FloatingMenuStudio from './FloatingMenuStudio';
import OverlaySearchMediaStudio from './OverlaySearchMediaStudio';
import SequenceViewportStudio from './SequenceViewportStudio';
import AdvancedControlStudio from './AdvancedControlStudio';
import FormInfrastructureStudio from './FormInfrastructureStudio';
import ProductStudio from './ProductStudio';
import CollectionStudio from './CollectionStudio';
import CartStudio from './CartStudio';
import AccountStudio from './AccountStudio';
import BlogStudio from './BlogStudio';
import StorytellingStudio from './StorytellingStudio';
import MarketingStudio from './MarketingStudio';
import PagesStudio from './PagesStudio';
import ReviewsStudio from './ReviewsStudio';
import SectionsStudio from './SectionsStudio';
import GlobalStudio from './GlobalStudio';
import CeramicsStudio from './CeramicsStudio';

export interface StudioRendererProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const studioRenderers: Record<string, ComponentType<StudioRendererProps>> = {
  button: ButtonStudio,
  input: InputStudio,
  select: SelectStudio,
  textarea: InputStudio,
  checkbox: CheckboxStudio,
  radio: RadioStudio,
  badge: LabelPrimitiveStudio,
  tag: LabelPrimitiveStudio,
  'quantity-selector': QuantitySelectorStudio,
  price: PriceStudio,
  'button-group': PrimitiveActionStudio,
  'icon-button': PrimitiveActionStudio,
  'close-button': PrimitiveActionStudio,
  toggle: PrimitiveActionStudio,
  fab: PrimitiveActionStudio,
  alert: FeedbackDisplayStudio,
  progress: FeedbackDisplayStudio,
  spinner: FeedbackDisplayStudio,
  stat: FeedbackDisplayStudio,
  'empty-state': EmptyStateStudio,
  divider: DividerStudio,
  avatar: AvatarStudio,
  rating: RatingStudio,
  skeleton: SkeletonStudio,
  'data-table': DataTableStudio,
  'data-list': DataListStudio,
  'timeline-primitive': TimelinePrimitiveStudio,
  link: LinkStudio,
  card: CardStudio,
  modal: OverlayStudio,
  drawer: OverlayStudio,
  toast: ToastStudio,
  tooltip: DisclosureNavigationStudio,
  accordion: DisclosureNavigationStudio,
  tabs: DisclosureNavigationStudio,
  breadcrumb: DisclosureNavigationStudio,
  popover: FloatingMenuStudio,
  'hover-card': FloatingMenuStudio,
  'dropdown-menu': FloatingMenuStudio,
  'context-menu': FloatingMenuStudio,
  'command-palette': OverlaySearchMediaStudio,
  lightbox: OverlaySearchMediaStudio,
  steps: SequenceViewportStudio,
  carousel: SequenceViewportStudio,
  'scroll-area': SequenceViewportStudio,
  switch: AdvancedControlStudio,
  slider: AdvancedControlStudio,
  'color-picker': AdvancedControlStudio,
  'file-upload': AdvancedControlStudio,
  'pin-input': AdvancedControlStudio,
  'tags-input': AdvancedControlStudio,
  'segmented-control': AdvancedControlStudio,
  'number-input': AdvancedControlStudio,
  combobox: AdvancedControlStudio,
  'date-picker': AdvancedControlStudio,
  'password-input': AdvancedControlStudio,
  'field-wrapper': FormInfrastructureStudio,
  fieldset: FormInfrastructureStudio,
  'inline-error': FormInfrastructureStudio,
  form: FormInfrastructureStudio,
  'product-card': ProductStudio,
  'product-gallery': ProductStudio,
  'product-info': ProductStudio,
  'variant-selector': ProductStudio,
  'product-form': ProductStudio,
  'product-slider': ProductStudio,
  'size-chart': ProductStudio,
  'back-in-stock': ProductStudio,
  'store-pickup': ProductStudio,
  'subscription-option': ProductStudio,
  'collection-hero': CollectionStudio,
  'collection-grid': CollectionStudio,
  filters: CollectionStudio,
  pagination: CollectionStudio,
  'view-toggle': CollectionStudio,
  'collection-promo': CollectionStudio,
  'empty-collection': CollectionStudio,
  'cart-page': CartStudio,
  'cart-line-item': CartStudio,
  'cart-summary': CartStudio,
  'discount-field': CartStudio,
  'free-shipping-bar': CartStudio,
  'cart-upsell': CartStudio,
  'cart-empty': CartStudio,
  'quick-view': CartStudio,
  'sticky-atc': CartStudio,
  'cart-note': CartStudio,
  'gift-wrap': CartStudio,
  'auth-forms': AccountStudio,
  'password-reset': AccountStudio,
  'account-dashboard': AccountStudio,
  'order-history': AccountStudio,
  'order-detail': AccountStudio,
  'address-book': AccountStudio,
  'address-form': AccountStudio,
  wishlist: AccountStudio,
  'account-settings': AccountStudio,
  'article-card': BlogStudio,
  'article-hero': BlogStudio,
  'article-body': BlogStudio,
  'reading-progress': BlogStudio,
  'table-of-contents': BlogStudio,
  'author-card': BlogStudio,
  'category-nav': BlogStudio,
  'blog-sidebar': BlogStudio,
  'share-buttons': BlogStudio,
  'related-articles': BlogStudio,
  comments: BlogStudio,
  'artist-profile': StorytellingStudio,
  'process-timeline': StorytellingStudio,
  certificate: StorytellingStudio,
  'collection-story': StorytellingStudio,
  'masonry-gallery': StorytellingStudio,
  'artist-index': StorytellingStudio,
  'artist-card': StorytellingStudio,
  'exhibition-page': StorytellingStudio,
  'artist-statement': StorytellingStudio,
  hero: MarketingStudio,
  newsletter: MarketingStudio,
  testimonials: MarketingStudio,
  popup: MarketingStudio,
  'trust-badges': MarketingStudio,
  'payment-icons': MarketingStudio,
  countdown: MarketingStudio,
  urgency: MarketingStudio,
  'cookie-consent': MarketingStudio,
  'social-proof': MarketingStudio,
  'announcement-extended': MarketingStudio,
  'coming-soon': PagesStudio,
  'page-404': PagesStudio,
  'gift-card': PagesStudio,
  'policy-page': PagesStudio,
  'checkout-progress': PagesStudio,
  'review-summary': ReviewsStudio,
  'star-rating': ReviewsStudio,
  'star-input': ReviewsStudio,
  'review-card': ReviewsStudio,
  'review-highlights': ReviewsStudio,
  'photo-reviews': ReviewsStudio,
  'review-form': ReviewsStudio,
  'review-toolbar': ReviewsStudio,
  'review-pagination': ReviewsStudio,
  'hero-section': SectionsStudio,
  'featured-collection': SectionsStudio,
  'image-text': SectionsStudio,
  multicolumn: SectionsStudio,
  'gallery-grid': SectionsStudio,
  lookbook: SectionsStudio,
  'video-section': SectionsStudio,
  'brand-story': SectionsStudio,
  'faq-section': SectionsStudio,
  'contact-section': SectionsStudio,
  'stats-section': SectionsStudio,
  'logo-bar': SectionsStudio,
  'comparison-table': SectionsStudio,
  'shipping-info': SectionsStudio,
  'rich-text-section': SectionsStudio,
  'instagram-feed': SectionsStudio,
  'before-after': SectionsStudio,
  marquee: SectionsStudio,
  'collage-section': SectionsStudio,
  'material-library': CeramicsStudio,
  'glaze-guide': CeramicsStudio,
  'technique-explainer': CeramicsStudio,
  'care-instructions': CeramicsStudio,
  dimensions: CeramicsStudio,
  'firing-info': CeramicsStudio,
  'workshop-listing': CeramicsStudio,
  'commission-form': CeramicsStudio,
  'makers-mark': CeramicsStudio,
  'edition-badge': CeramicsStudio,
  'certificate-details': CeramicsStudio,
  'ceramics-glossary': CeramicsStudio,
  'studio-tour': CeramicsStudio,
  'ceramics-faq': CeramicsStudio,
  header: GlobalStudio,
  'announcement-bar': GlobalStudio,
  footer: GlobalStudio,
  'mobile-menu': GlobalStudio,
  'search-overlay': GlobalStudio,
  'cart-drawer': GlobalStudio,
  'mega-menu': GlobalStudio,
  'bottom-nav': GlobalStudio,
};

export function getStudioRenderer(slug: string): ComponentType<StudioRendererProps> | undefined {
  return studioRenderers[slug];
}
