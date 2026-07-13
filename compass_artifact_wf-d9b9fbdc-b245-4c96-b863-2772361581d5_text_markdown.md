# The Gallery: complete design system component inventory

**This inventory contains every UI component needed to ship a production-ready, accessible, high-converting art ceramics e-commerce store with an editorial blog section.** The list synthesizes component audits of five leading Shopify themes (Horizon, Dawn, Prestige, Impulse, Minimalista), six major design systems (Polaris, Radix, Chakra UI, shadcn/ui, Ant Design, Material UI), and current best-practice research from Baymard Institute, Nielsen Norman Group, and WCAG 2.2 guidelines. Components are organized into 13 functional categories. Base framework: Shopify Horizon.

---

## 1. Design tokens and foundations

These are not components per se but the systematic underpinnings every component inherits. They must be defined before any component work begins.

**Typography tokens**
- Display / headline typeface (Swiss sans-serif — Helvetica Neue, Suisse Int'l, Akzidenz-Grotesk, or similar)
- Body / reading typeface (clean sans-serif or editorial serif for long-form)
- Monospace typeface (for metadata, code blocks, technical specs)
- Type scale (H1–H6, body-lg, body, body-sm, caption, overline, blockquote, pull-quote)
- Line height scale
- Letter-spacing scale
- Font-weight scale (regular, medium, semibold, bold)
- Responsive type scaling rules (fluid or breakpoint-based)

**Color tokens**
- Primary palette (1–2 accent colors plus black and white)
- Neutral / gray scale (50–950)
- Surface colors (card, section, overlay backgrounds)
- Text colors (primary, secondary, tertiary, disabled, inverse)
- Interactive colors (link, hover, active, visited, focus-ring)
- Semantic colors (success, warning, error, info)
- Color scheme system (light mode, dark mode, and per-section overrides)

**Spacing and layout tokens**
- Spacing scale (4 px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128)
- Container max-widths (narrow / content ~720 px, default ~1080 px, wide ~1280 px, full-bleed)
- 12-column responsive grid (12-col desktop, 8-col tablet, 4-col mobile)
- Gutter widths per breakpoint
- Section vertical padding tokens
- Responsive breakpoints (mobile, tablet, desktop, wide)
- Baseline grid alignment (optional, Swiss-style)
- Asymmetric grid presets (Swiss-inspired offset column layouts)

**Border, radius, and shadow tokens**
- Border-width scale
- Border-radius scale (none, sm, md, lg, full/pill)
- Elevation / box-shadow scale (0–5)

**Motion and animation tokens**
- Duration scale (fast 100 ms, normal 200 ms, slow 300 ms, glacial 500 ms)
- Easing curves (ease-out, ease-in-out, spring)
- Scroll-triggered animation presets (fade-in, slide-up, reveal, parallax)
- Reduced-motion overrides (respects `prefers-reduced-motion`)

**Iconography**
- Icon style definition (minimal line, consistent stroke, Swiss-informed)
- Icon sizing scale (16, 20, 24, 32, 40 px)

**Aspect ratio tokens**
- Predefined ratios (1:1, 4:3, 3:4, 16:9, 9:16, 2:3, 3:2)

---

## 2. Primitive / foundational components

These atomic building blocks compose every higher-level component.

**Layout primitives**
- Box (generic container with token-based styling props)
- Flex (flexbox wrapper)
- Grid (CSS grid wrapper)
- Stack / VStack / HStack (vertical and horizontal stacking with gap)
- Container (max-width centered wrapper)
- Bleed (negative-margin breakout)
- Aspect Ratio container
- Divider / Separator (horizontal and vertical)
- Spacer (empty spacing block)
- Scroll Area (custom scrollbar container)
- Section wrapper (padding, color scheme, full-width toggle)

**Typography primitives**
- Heading (H1–H6, mapped to semantic and visual levels)
- Text (body, caption, overline variants)
- Link / Anchor (inline, standalone, nav)
- Blockquote / Pull Quote
- Code / Code Block (with copy button)
- Kbd (keyboard key indicator)
- Mark / Highlight
- List (ordered, unordered, definition)
- Prose / Rich Text renderer (renders CMS HTML with design-system styles)
- Drop cap (editorial first-letter treatment)

**Button and action primitives**
- Button (primary, secondary, outline / ghost, destructive, text-link)
- Button Group
- Icon Button (square, round)
- Close Button
- Toggle / Toggle Group
- Floating Action Button (e.g., back-to-top)

**Form / input primitives**
- Text Input
- Textarea
- Number Input (stepper with +/−)
- Password Input (with visibility toggle)
- Select (native and custom styled)
- Combobox / Autocomplete
- Checkbox
- Checkbox Group
- Radio / Radio Group
- Switch
- Slider / Range Slider (single and dual handle)
- Date Picker
- Color Picker / Color Swatch
- File Upload / Drop Zone
- Pin Input / OTP Input
- Tags Input
- Rating (star selector)
- Segmented Control
- Label
- Field wrapper (label + input + help text + error)
- Fieldset
- Form (validation, submission handling)
- Inline Error message

**Data display primitives**
- Badge (status, count, custom)
- Tag / Chip (removable, clickable)
- Avatar (image, initials, fallback)
- Icon (wrapper component for SVG icon library)
- Thumbnail / Image (responsive, lazy-loaded, blur-up placeholder)
- Stat / Statistic (number + label)
- Data List / Description List (key-value pairs)
- Table (sortable, responsive, with pagination support)
- Timeline (vertical)
- Card (generic composable card wrapper)

**Feedback primitives**
- Alert / Banner (info, success, warning, error; dismissible)
- Toast / Snackbar (stackable, auto-dismiss, action link)
- Progress Bar (determinate, indeterminate)
- Progress Circle / Ring
- Spinner / Loading indicator
- Skeleton (text line, rectangle, circle, page-level skeleton)
- Empty State (icon, message, action)

**Overlay primitives**
- Modal / Dialog (standard, alert/confirm variant)
- Drawer / Sheet (left, right, bottom)
- Popover (anchored content popup)
- Tooltip (text, rich content)
- Hover Card (preview on hover)
- Dropdown Menu
- Context Menu
- Command Palette (⌘K search/action bar)

**Navigation primitives**
- Tabs (horizontal, with underline / pill indicator)
- Breadcrumb
- Pagination (numbered, prev/next, load-more variant)
- Steps / Stepper (horizontal, vertical)
- Menu / Menubar
- Navigation Menu (for mega-nav subcomponents)
- Skip Navigation Link
- Back to Top button

**Disclosure primitives**
- Accordion / Collapsible (single and group)
- Carousel / Slider (with dots, arrows, swipe; accessible pause)
- Collapsible (simple expand/collapse)

**Utility primitives**
- Portal (render outside DOM tree)
- Visually Hidden (screen-reader-only content)
- Focus Trap
- Scroll Lock
- Theme Provider / Config Provider
- Direction Provider (LTR/RTL)
- Presence / Transition (enter/exit animation wrapper)
- Responsive Show/Hide (conditional render by breakpoint)

---

## 3. Navigation components

**Header system**
- Header (top-level site header wrapper)
- Sticky / condensed header (shrinks on scroll)
- Transparent header (overlays hero; toggles opaque on scroll)
- Logo (configurable placement, size, light/dark variants)
- Desktop navigation links bar
- Mega Menu (multi-column with images, collection links, promotional blocks)
- Dropdown Menu (simple nested)
- Mobile Menu / Drawer Navigation (full-screen or slide-in, accordion sub-levels)
- Header utility bar (account, wishlist, search, cart icons)
- Cart icon with dynamic item count badge
- Wishlist / Favorites icon
- Account icon (logged-in / logged-out states)
- Search icon / trigger (opens predictive search overlay)
- Currency / country selector
- Language selector

**Footer system**
- Footer (multi-column layout: menus, newsletter, info, social)
- Footer navigation columns (configurable link lists)
- Footer newsletter signup form
- Footer social media icon links
- Footer payment method icons (Visa, Mastercard, PayPal, Apple Pay, etc.)
- Footer trust badges / security certifications
- Footer legal links (privacy, terms, accessibility statement)
- Footer contact info block
- Footer copyright bar
- Footer promotion block (optional CTA or brand message)

**Breadcrumbs**
- Breadcrumb bar (Home > Collection > Product; linked, with current page)

**Search system**
- Predictive search overlay (autocomplete with product thumbnails, prices, collections, blog posts, trending/recent queries)
- Search results page (filterable, with tabs for products / pages / blog posts)
- Search empty / no-results state (suggestions, popular items, spell-check)
- Search within blog
- Search promotional dropdown (featured products/collections in search)
- Visual search (image-based, emerging — future-ready slot)

---

## 4. Product components

**Product card system**
- Product Card — standard (image, title, price, color swatches, badge, quick-add)
- Product Card — hover state (secondary image reveal, quick-view trigger)
- Product Card — minimal (image + title only, gallery aesthetic)
- Product Card — horizontal (image left, details right, for list views)
- Product Card — featured / large (hero-sized for spotlights)
- Product Card skeleton / loading state
- Product Badges (Sale, New, Bestseller, Sold Out, Limited Edition, One of a Kind, Pre-order, Handmade, Artist Pick — custom via metafields)
- Color Swatch preview on card
- Quick Add button on card (adds default variant to cart)
- Quick View trigger on card (opens modal with product details)

**Product media gallery**
- Product Image Gallery — thumbnail strip (vertical or horizontal)
- Product Image Gallery — carousel / slider
- Product Image Gallery — grid (2-column, stacked)
- Product Image Gallery — horizontal scroll
- Product Image Gallery — stacked / scroll-through
- Product Image Gallery — single with thumbnails below
- Image Zoom (hover zoom on desktop, pinch-to-zoom on mobile, loupe)
- Image Lightbox / Fullscreen viewer (with prev/next, counter)
- Product Video player (hosted or YouTube/Vimeo, with custom poster frame)
- 3D Model Viewer (Shopify model-viewer integration)
- 360° product spin (turntable rotation)
- Image rollover / swap (hover to show alternate angle)
- Lifestyle / context photo indicators

**Product information components**
- Product Title (H1)
- Product Subtitle / Tagline (metafield-driven)
- Price Display (regular price, compare-at / strikethrough for sale, unit price)
- Price per unit (for multi-quantity or weight-based items)
- Sale / discount percentage badge
- Variant Selector — button group (size, material, color as pills)
- Variant Selector — dropdown
- Color Swatches (with text labels for accessibility)
- Size Chart modal / drawer
- Quantity Selector (stepper +/−, inline editable)
- Add to Cart button (prominent, high-contrast, loading/success states)
- Buy Now / Dynamic Checkout button (Shop Pay, Apple Pay, Google Pay)
- Pre-order button
- Back-in-Stock alert signup (email/SMS input)
- Product Availability / Stock Status display
- Low Stock indicator ("Only 3 left")
- Sold Out state (with back-in-stock CTA)
- Vendor / Brand display (linked)
- SKU display
- Product Description (rich text, scannable)
- Product Details Accordion / Tabs (collapsible rows: Description, Specifications, Shipping, Care)
- Product Specifications table (structured dimensions, weight, capacity, material)
- Shipping information block (estimated delivery, free-shipping threshold)
- Return policy summary (inline or linked)
- Store Pickup availability block
- Subscription / recurring purchase option
- Share Button (social share: X, Facebook, Pinterest, email, copy link)
- Wishlist / Save button (heart toggle)
- Print product page button (optional)

**Product social proof**
- Star Rating summary (average + review count, anchor-linked to reviews)
- Customer Reviews section (sortable/filterable by rating, recency, verified purchase)
- Individual Review card (star rating, reviewer name, date, text, verified badge)
- Photo / Video reviews (customer-submitted UGC within review)
- Review highlights / AI-extracted themes ("great quality," "beautiful glaze")
- Brand reply to review
- Review helpfulness voting ("Was this helpful?")
- Write a Review form (star selector, text, photo/video upload)
- Third-party review badge (Trustpilot, Google Reviews)

**Product recommendations and cross-sell**
- Complementary Products block ("Frequently bought together")
- Related Products carousel ("You may also like")
- Recently Viewed Products carousel
- "Complete the Set" block (matching pieces — mug + bowl + plate)
- Cross-sell / Upsell drawer or inline block

**Ceramics-specific product components**
- Dimensions Display (height, width, depth, diameter, weight — metric/imperial toggle)
- Scale Reference image or indicator (product shown next to hand, ruler, common object)
- Material / Clay Body description block (Stoneware, Porcelain, Earthenware, Raku)
- Glaze Information block (glaze name, description, food-safe badge)
- Firing Technique block (kiln type, temperature, method)
- Care Instructions icon row (microwave safe, dishwasher safe, food safe, hand wash, oven safe)
- Care Instructions expandable section (full care details + downloadable PDF)
- "Handmade variations" disclaimer block
- Capacity / Volume display (oz / ml for functional pieces)
- Maker's Mark / Signature close-up image
- "Story Behind This Piece" narrative block (per-product editorial content)
- Limited Edition indicator (edition number / total produced)
- "One of a Kind" badge
- Custom / Commission Request CTA

---

## 5. Collection / catalog components

- Collection Page Header / Banner (title, description, optional hero image with overlay)
- Collection Description block
- Subcollection Navigation (horizontal links or pills for child collections)
- Product Grid (configurable 2/3/4/5 columns, responsive)
- Product List view (horizontal cards)
- Grid / List view toggle
- Filter Bar — horizontal (above grid, inline filter pills)
- Filter Sidebar — vertical (slide-out or persistent sidebar)
- Filter types: checkbox list, color swatches, price range slider, size buttons, material, technique
- Active Filter chips (with remove / clear-all actions)
- Filter result count ("Showing 24 of 156 products")
- Product count per filter option ("Black (45)")
- Sort By selector (price low/high, newest, bestselling, alphabetical, featured)
- Pagination — numbered pages
- Pagination — "Load More" button
- Pagination — Infinite scroll (with caution; preserve scroll position)
- Collection Promo blocks (inline promotional tiles within the grid)
- Empty Collection state (message, suggested collections, search prompt)
- Collection skeleton / loading state (grid of product card skeletons)

---

## 6. Cart and checkout components

**Cart drawer / page**
- Cart Drawer (slide-out panel triggered by add-to-cart or cart icon)
- Cart Page (full-page layout)
- Cart Line Item (thumbnail, title, selected variants, unit price, quantity, line total, remove)
- Quantity Selector (stepper +/−, inline editable, within cart)
- Remove Item button (clear, accessible — not just an icon)
- Cart Note field (gift message / order instructions textarea)
- Cart Subtotal display
- Estimated Tax display
- Estimated Shipping Cost display
- Discount / Promo Code field (input + apply button, with success/error state)
- Applied Discount display (with remove option)
- Free Shipping Progress Bar ("You're $12 away from free shipping!")
- Cart Upsell / Cross-sell block ("Frequently bought together" or "Add gift wrapping")
- Cart Terms & Conditions checkbox
- Dynamic Checkout buttons in cart (Shop Pay, Apple Pay, Google Pay)
- "Continue Shopping" link
- Checkout button (primary CTA)
- Empty Cart state (message, suggested products, CTA to shop)
- Cart persistence indicator (items saved across sessions)
- Gift wrapping option toggle
- Gift message input
- Estimated Delivery Date display
- Save for Later / Move to Wishlist action
- Cart notification toast ("Item added to cart" with undo)

**Checkout components** (Shopify-managed, but extensible)
- Checkout Progress indicator / Step bar
- Guest Checkout option
- Customer Information form (email, name, address with autocomplete)
- Address Autocomplete (Google Places or similar integration)
- Shipping Method selector (with estimated dates and prices)
- Payment Method selector (credit card, PayPal, express wallets, BNPL)
- Express Checkout buttons (Apple Pay, Google Pay, Shop Pay — above fold)
- Order Summary sidebar (persistent items, quantities, pricing breakdown)
- Transparent Cost Breakdown (subtotal, shipping, taxes, discounts, total)
- Inline Form Validation (real-time, descriptive error messages with `aria-live`)
- Security Reassurance block (trust badges, "secure checkout" near payment fields)
- Order Confirmation page (order number, items, total, delivery estimate, account creation prompt)
- Social Login options (Google, Facebook, Apple)
- Checkout header (simplified — no main navigation, non-clickable logo)

---

## 7. Account components

- Login page / form (email, password, "Forgot password" link, social login)
- Register page / form (name, email, password, marketing opt-in)
- Password Reset flow (request form, email sent confirmation, reset form)
- Account Dashboard (overview: recent orders, saved addresses, account details)
- Order History list (order number, date, status, total, "View details" link)
- Order Detail page (items, tracking, status timeline, totals, reorder action)
- Order Tracking status (visual progress: confirmed → shipped → in transit → delivered)
- Address Book (list of saved addresses, add/edit/delete, set default)
- Address Form (name, street, city, state, zip, country — with autocomplete)
- Account Details edit form (name, email, password change)
- Wishlist / Saved Items page (grid of saved products with remove and add-to-cart)
- Reorder button (one-click reorder of previous purchase)
- Loyalty / Rewards dashboard (points balance, tier, available rewards) — app-block-ready
- Referral Program section (shareable link, referral history) — app-block-ready
- Shop App Sign-in integration (Shopify accounts)

---

## 8. Blog and editorial components

**Blog index / listing page**
- Blog Index Hero / Header (title, subtitle, optional featured image)
- Blog Index Description / Intro text
- Featured / Pinned Article (large card, full-width or 2/3 width, editorial layout)
- Article Grid (2/3/4 column, responsive)
- Article List view (horizontal cards)
- Article Masonry layout
- Blog Pagination (numbered, "Load More", infinite scroll)
- Blog Empty state

**Article card variants**
- Article Card — standard (image, category tag, title, excerpt, date, reading time)
- Article Card — large / featured (hero-sized, overlay text on image)
- Article Card — minimal (text-only with category + date, Swiss-style)
- Article Card — horizontal (image left, text right)
- Article Card — editorial (asymmetric layout, oversized typography, offset image)
- Article Card — with author avatar + name
- Article Card hover state (subtle animation, image zoom, underline reveal)
- Article Card skeleton / loading state

**Blog navigation and filtering**
- Category Navigation bar (horizontal pills/tabs, sticky; mobile dropdown)
- Tag Cloud / Tag list
- Active Category / Tag indicator with reset option
- Author filter (dropdown or avatar row)
- Date / Archive filter (month/year)
- Sort selector (newest, oldest, most popular, featured)
- Search within blog (input with instant results)
- Active filter chips (with clear/remove)
- Blog Breadcrumbs
- Blog Sidebar (optional: recent posts, categories, tags, newsletter, about)
- Blog Archive page (chronological by year/month)
- Author Index page (grid of contributors)
- Individual Author page (bio, photo, list of their articles)

**Article page components**
- Article Hero — full-width image (with optional parallax)
- Article Hero — text overlay on image
- Article Hero — split layout (image + title/meta side by side)
- Article Hero — text-only (bold typographic treatment, no image — Swiss)
- Article Hero — video background
- Article Title (large editorial H1)
- Article Subtitle / Deck (secondary headline)
- Article Metadata bar (published date, updated date, reading time, category badge)
- Author Byline — inline (avatar, name, role, link to author page)
- Reading Progress Bar (fixed top, thin horizontal, color-matched)
- Estimated Reading Time indicator
- Table of Contents (sticky sidebar or collapsible top, auto-generated from headings)
- "Back to Top" floating button

**Article body content blocks**
- Rich Text block (paragraphs, bold, italic, links — with Prose styling)
- Drop Cap (editorial first-letter)
- Heading hierarchy (H2, H3, H4 with clear typographic scale)
- Horizontal Rule / Section Divider
- Single Image block (full-width, with caption, credit, alt text)
- Image Pair / Side-by-side
- Image Grid / Gallery (2/3/4 column within article)
- Image Carousel / Slideshow (within article, with navigation)
- Full-bleed Image break (edge-to-edge, breaks out of content column)
- Image with Lightbox / Zoom
- Pull Quote / Blockquote (oversized typography, optional attribution)
- Highlighted Callout box (tip, note, warning — icon + background color)
- Inline Product Mention card (product image, name, price, "Shop" CTA)
- Shoppable Product Embed block (mini product card within article body)
- Video Embed (YouTube/Vimeo, responsive, custom poster frame)
- Self-hosted Video Player (custom controls)
- Audio Player / Podcast Embed
- Code Block (monospace, syntax highlighting, copy button)
- Table (responsive, striped rows)
- Ordered and Unordered Lists (styled bullets/numbers)
- Definition List / Glossary
- Numbered Steps / How-to block
- Timeline block (vertical, within article)
- Accordion / Expandable content block
- Footnotes with superscript references
- Figure with figcaption (semantic)
- Embedded Social Media post (Instagram, X/Twitter)
- Map Embed
- Before/After Image Slider (useful for ceramics process content)
- Download / Resource block (PDF, care guide — with icon and file info)
- Data Visualization / Chart embed
- Comparison block (side-by-side with labels)
- Infographic embed

**Article engagement components**
- Social Share buttons (fixed sidebar or inline — X, Facebook, Pinterest, LinkedIn, email, copy link)
- Sticky Share bar (follows scroll on desktop)
- Print Article button
- Bookmark / Save Article button
- Like / Reaction button (optional)
- Comment Section (native or third-party)
- Comment Form (name, email, body)
- Comment Reply threading
- Comment Count indicator

**Article related content**
- Related Articles section (3–4 cards, algorithmic or manual)
- Next / Previous Article navigation (thumbnail + title)
- "More from this Category" section
- "Most Popular Articles" section
- "Editor's Picks" section
- Inline Related Article card (mid-article suggestion)

**Article footer elements**
- Tag list (clickable pills)
- Category badge
- Author Bio card — full (avatar, name, role, bio, social links, link to more articles)
- Author Bio card — compact (inline, avatar + name + one-line bio)

**Blog newsletter / CTA components**
- Inline Newsletter Signup — mid-article
- End-of-Article Newsletter Signup (contextual messaging)
- Full-width Newsletter section (between grid rows)
- Content Upgrade / Lead Magnet CTA ("Download our Ceramics Care Guide")
- Blog Sidebar newsletter widget
- Floating Newsletter bar (bottom of screen)
- Content Preference selector (subscribe to specific categories)
- RSS Feed link

---

## 9. Marketing and conversion components

**Announcement bar**
- Single Announcement Bar (text + optional link, dismissible)
- Rotating Announcement Bar (multiple messages, auto-cycle)
- Countdown Announcement Bar (timer for sale/launch/shipping cutoff)
- Announcement Bar with CTA button
- Announcement Bar — sticky (remains on scroll)
- Announcement Bar — color variants (sale, info, new arrival)

**Popups and overlays**
- Newsletter Popup (timed, scroll-triggered, exit-intent; with incentive)
- Welcome Popup (first-time visitors)
- Age Verification Popup
- Promotional Popup (discount, event, new collection)
- Cookie Consent banner
- Slide-in notification (corner)

**Email and SMS capture**
- Full-width Email Signup banner (heading + input + button)
- Split Email Signup section (image + form)
- Minimal Email Signup (single-line inline)
- Email Signup with incentive (discount, free guide)
- Email + SMS combined signup
- Popup Email Signup (timed, scroll, exit-intent)
- Sticky Bottom Bar email signup
- Email Signup with preference checkboxes

**Social proof and trust**
- Trust Badges row (handmade, free shipping, secure checkout, satisfaction guarantee)
- Payment Method icons bar
- Security Certification badges (SSL, PCI compliance)
- Money-back Guarantee badge
- Free Returns badge
- Shipping Guarantee display
- Warranty information display
- "As Seen In" press/media logos bar
- Industry Awards / Certifications badges
- Customer Count / Orders Fulfilled stat ("10,000+ happy customers")
- Real-time Purchase Notifications ("Sarah from London just purchased…")
- Live Visitor Count ("89 people viewing this now")
- Recent Purchase Count ("42 bought in last 48 hours")

**Testimonials**
- Single Testimonial (large quote, attribution, avatar)
- Testimonial Carousel / Slider
- Testimonial Grid (2–3 columns)
- Testimonial with Star Rating
- Testimonial with Product photo
- Video Testimonial embed
- Testimonial Banner (full-width, overlaid quote)
- Press / Media Quote section
- Customer Photo + Review (UGC-style)
- Testimonial Marquee (auto-scrolling horizontal)

**Urgency and scarcity**
- Low Stock indicator ("Only 3 left")
- Countdown Timer section (for launches, sales, events)
- Limited Edition badge
- "Selling Fast" indicator
- Free Shipping Countdown / Progress Bar
- Sale End Date display
- Back-in-Stock Alert signup

**Live support**
- Live Chat widget (with availability indicator)
- Chatbot launcher
- "Ask a Question" form/modal
- Click-to-Call button (mobile)
- WhatsApp / SMS support button

**Notification components**
- Price Drop alert signup (for wishlist items)
- Back-in-Stock notification signup
- New Collection announcement signup
- Post-purchase Review Request (email-triggered or on-site)

---

## 10. Content sections (page builder)

These are the configurable, drag-and-drop page sections for the Shopify theme editor.

**Hero sections**
- Hero — full-width image (background image, overlaid text, CTA)
- Hero — full-width video (autoplay muted loop, text overlay)
- Hero — split / image + text (left/right reversible)
- Hero — slideshow / carousel (multiple slides, auto-advance, dots/arrows)
- Hero — text-only (oversized Swiss typography, no image)
- Hero — parallax image
- Hero — double grid / split (two panels)
- Hero — triple grid (three panels)
- Hero — asymmetric (off-grid image placement, Swiss-inspired)
- Hero — full-screen (100vh, centered content)
- Hero — with scrolling marquee text
- Hero — with embedded email signup form
- Hero — with countdown timer
- Hero — minimal (logo/mark centered, single line of text)
- Hero — mobile-specific image override

**Featured collection sections**
- Featured Collection — product grid (2/3/4 columns)
- Featured Collection — carousel / horizontal slider
- Featured Collection — single product spotlight (large image + details)
- Featured Collection — editorial (story text + product grid)
- Featured Collection — masonry
- Featured Collection — tabbed (multiple collections, tab-switchable)
- Collection List section (collection cards with images)
- Mini Collection block (3–4 products, compact)
- Featured Product section (single product hero treatment)

**Image with text sections**
- Image with Text — standard (image left / text right, reversible)
- Image with Text — stacked (image top / text bottom)
- Image with Text — full-width overlay
- Image with Text — 50/50 split
- Image with Text — 60/40 or 40/60 split
- Image with Text — offset / overlapping (image bleeds behind text)
- Image with Text — editorial quote overlay
- Image with Text — with CTA button
- Multicolumn section (2–4 columns: icon/image + heading + text per column)
- Multirow section (alternating image + text rows)

**Gallery and media sections**
- Image Gallery Grid (2/3/4 columns, with lightbox)
- Masonry Gallery
- Collage section (mixed-size image grid)
- Media Grid (images, videos, products mixed)
- Lookbook section (shoppable pins / image hotspots)
- Lookbook Carousel (full-width swipeable)
- Before / After Image Slider
- Fullscreen Gallery / Slideshow
- Panorama Collection display (wide horizontal scroll)
- Video Section — popup (thumbnail + play button, opens modal)
- Video Section — inline (embedded with text alongside)
- Video Section — full-width cinematic (autoplay background)
- Video Gallery (multiple videos, grid or carousel)

**Storytelling and brand sections**
- Brand Story — split (image + narrative text)
- Brand Story — timeline (vertical chronological milestones)
- Brand Values section (icon + heading + description columns)
- Founder / Team section (portraits, names, roles, bios)
- Mission Statement section (large centered text)
- "Our Process" section (numbered steps with images)
- "Why Choose Us" / Differentiators section
- Sustainability / Ethics section
- Brand Video section
- Awards / Certifications section
- Pull Quote / Blockquote section (large centered editorial text)
- Rich Text section (heading + body + optional button)
- Scrolling Text / Marquee section

**Social and community sections**
- Instagram Feed Grid (6–8 posts, linked)
- Instagram Feed Carousel
- Social Proof banner (follower count, UGC callout)
- User-Generated Content Gallery (tagged photos)
- Hashtag Campaign section
- Social Media Icons bar

**Informational sections**
- FAQ / Accordion section (question + expandable answer)
- FAQ — split layout (categories left, Q&A right)
- FAQ with search
- FAQ with contact CTA
- Contact Form section (name, email, subject, message, custom fields)
- Contact Info section (address, phone, email, hours)
- Contact with Map embed
- Store Locator with search
- Shipping / Returns Info bar (icon + text columns)
- Size Guide section

**Comparison and data sections**
- Feature Comparison Table (products side by side)
- Material Comparison Table (relevant for ceramics)
- Stats / Animated Counter section (3–4 columns: number + label)
- Stats with icons
- Logo Bar / Marquee ("As Seen In" / press logos, grayscale)
- Logo Grid (2 rows)
- Logo Carousel (auto-scrolling)
- Partner / Stockist logos section

**Additional page-builder sections**
- Recently Viewed Products section
- "Shop the Look" section
- Gift Guide section
- Countdown Timer section (product launch, sale, event)
- Product Bundle section
- Seasonal / Promotional Banner
- Rewards / Loyalty Program promo section
- Custom Liquid / HTML section
- Spacer / Empty Space section
- Divider section
- Page Embed section

---

## 11. Utility, feedback, and system components

**Modals and drawers**
- Modal / Dialog (standard content modal)
- Alert Dialog (confirmation/destructive action)
- Drawer / Sheet (slide-in panel — left, right, bottom)
- Lightbox (image/video viewer with navigation)
- Quick View modal (product details overlay)

**Notifications and feedback**
- Toast / Snackbar ("Item added to cart," "Saved to wishlist" — stackable, auto-dismiss)
- Notification Banner (site-wide, custom position, dismissible)
- Inline Success message
- Inline Error message
- Form Validation error summary
- Screen Reader live-region announcements (`aria-live`)

**Loading and progressive states**
- Skeleton Screen — product card
- Skeleton Screen — product page
- Skeleton Screen — article card
- Skeleton Screen — full page
- Skeleton — text lines
- Skeleton — thumbnail / image
- Spinner / Loading indicator (inline and full-page)
- Progress Bar (for multi-step flows, file uploads)
- Optimistic UI update states (instant visual feedback before server confirmation)
- Progressive Image loading (LQIP blur-up → full resolution)
- Lazy Loading wrapper (native `loading="lazy"` with intersection observer fallback)

**Error and empty states**
- 404 Page (illustrated, search prompt, suggested links)
- Empty Collection state
- Empty Cart state
- Empty Wishlist state
- Empty Search Results state (suggestions, popular items)
- Empty Blog state
- Generic Error state (message, retry action)
- Offline / Connection Error state

**System pages**
- Password Page (store locked / coming soon)
- Gift Card Page (code display, balance, apply-to-cart)
- Policy Pages template (privacy, terms, refund, shipping)
- Maintenance / Coming Soon page

**Accessibility utilities**
- Skip Navigation link
- Focus Ring / Focus Indicator (visible, high-contrast)
- Focus Trap (for modals, drawers)
- Screen Reader-only text (Visually Hidden)
- ARIA live regions (for AJAX cart updates, filter changes, search results)
- Reduced Motion wrapper (respects `prefers-reduced-motion`)
- High Contrast mode support
- Keyboard shortcut hints

**Performance utilities**
- Responsive Image component (`srcset`, `sizes`, WebP/AVIF with fallback)
- Aspect Ratio container (prevents CLS)
- Prefetch / Preload link hints
- Code-split component loader
- Third-party script lazy loader (analytics, chat, etc.)
- Service Worker registration (PWA-ready)

---

## 12. Mobile-specific components and patterns

These are not separate components but mobile-optimized variants and behaviors that must be designed and built.

- Sticky Add to Cart bar (fixed bottom — appears when main ATC scrolls out of view; includes product name, price, ATC button)
- Sticky Add to Cart with variant-selection slide-up drawer
- Bottom Navigation bar (4–5 tabs: Home, Shop, Search, Cart, Account)
- Mobile Mega Menu (full-screen drawer with accordion sub-levels)
- Mobile Filter UI (bottom sheet or full-screen overlay)
- Swipe Gestures on product image gallery
- Swipe to dismiss on drawers
- Horizontal scrollable product carousels (thumb-friendly)
- Touch-friendly filter and sort controls
- Numeric keypad triggers for phone, ZIP, credit card inputs
- Pull-to-refresh (for PWA)
- Thumb-zone optimized CTA placement
- Mobile search — full-screen overlay
- Collapsible product description sections (accordion by default on mobile)
- Floating checkout button on cart page

---

## 13. Art ceramics specialty components

**Artist / maker profile**
- Artist Hero section (full-width studio portrait, name, title, one-line philosophy)
- Artist Bio card (portrait, name, location, medium, short bio, "View Work" CTA)
- Artist Extended Biography section (editorial long-form with inline studio images)
- Artist Grid / Index page (all makers, filterable by technique/medium)
- Artist Statement section (large typographic treatment)
- Artist CV / Exhibition History section (timeline or list)
- Artist Social links and external portfolio links
- Artist Signature / Maker's Mark display
- "Meet the Maker" narrative page template

**Process / behind-the-scenes**
- Process Section — numbered steps (image + description: clay → forming → drying → bisque → glazing → firing)
- Studio Tour section (image gallery or video walkthrough)
- "From Clay to Cup" visual journey (horizontal scroll or vertical timeline)
- Kiln / Firing Process explainer (image + text, firing types)
- Raw Materials showcase (images of clay, glazes, tools with labels)
- Work-in-Progress gallery (pieces at various stages)
- Time-lapse Video section
- "A Day in the Studio" photo essay component

**Exhibition / collection story**
- Exhibition Hero section (title, dates, description, key image)
- Exhibition Landing Page template (curatorial statement, featured works, installation photos)
- Collection Story section (narrative + product imagery, editorial layout)
- Collection Lookbook section (full-page images, minimal text)
- Past Exhibitions archive (grid with dates, thumbnails)
- Curatorial / Collection Notes section
- Exhibition Event details (date, time, location, RSVP button)
- Opening Night / Event gallery section

**Material and technique education**
- Material Library section (clay types with image, description, properties)
- Glaze Guide section (glaze swatches/samples with names and descriptions)
- Technique Explainer section (wheel throwing, handbuilding, slab, coiling — with images/video)
- Firing Types explainer (oxidation, reduction, raku, wood-fire — with before/after)
- Material Sourcing / Sustainability section
- Ceramics Glossary section (accordion or linked terms)
- Material / Finish interactive selector (click glaze to filter products)
- Clay and Properties Comparison Table

**Care and education**
- Care Instructions icon row (microwave, dishwasher, food safe, oven safe, hand wash)
- Care Instructions expandable section (full details)
- Downloadable Care Card (PDF) component
- Material-specific Care tabs (stoneware vs. porcelain)
- "How to Repair" section (kintsugi guidance)
- Ceramics Care FAQ accordion
- Care Guide article template

**Ceramics-specific shipping and packaging**
- Fragile Item Shipping policy block ("Museum-quality packaging")
- Insurance Policy display ("All shipments insured for full value")
- Damage Resolution policy block
- Sustainable Packaging messaging block
- Handling / Production Time indicator (handmade items may need lead time)

**Community and engagement**
- Workshop / Class listings section
- Custom / Commission Request form
- Gift Wrapping option (artisanal/branded packaging)
- Gift Card / Certificate page
- "Story Behind This Piece" per-product narrative block
- New Collection preview / Early Access signup

---

## 13 categories, ~470 distinct components

This inventory covers every layer of the design system, from the lowest-level tokens and primitives through the highest-level page templates and specialty sections. Components were validated against **Shopify Horizon, Dawn, Prestige, Impulse, and Minimalista** themes; **Polaris, Radix, Chakra UI, shadcn/ui, Ant Design, and Material UI** component libraries; and conversion-optimization research from **Baymard Institute** (30,000+ usability scores), **Nielsen Norman Group**, and **WCAG 2.2 AA** guidelines. The list prioritizes components that drive measurable conversion impact (sticky mobile ATC bars yield **8–15% conversion lift**; guest checkout prevents the **26% abandonment** caused by forced registration; accessible sites see **27% higher conversion**) while maintaining the clean, minimalist, gallery-inspired editorial aesthetic of The Gallery design system.