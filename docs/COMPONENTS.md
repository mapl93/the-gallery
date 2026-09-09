# COMPONENTS.md — The Gallery Design System

Current delivery scope (ADR 0303): **complete Web, then Shopify**. Figma is removed
from the plan, including artwork, feedback, synchronization and release gates.
References to its exports or pilot below are historical evidence only; other
platform ideas are outside the current delivery plan.

> **Authority**: Current component CSS, contracts, registry and Studio metadata are canonical together with `tokens/source/`. This long-form guide includes historical component specifications; examples below may predate accepted ADRs and must be checked against those sources.

> **Customization**: [ADR 0293](decisions/0293-public-visual-customization-coverage.md) requires the meaningful visual decisions of a component to be editable through its public token API and visible in documentation. Use shared tokens when they already express the decision; introduce component-scoped tokens for component-specific controls. CSS `--_` properties remain private wiring, not a reason to omit a requested customization control.

---

## Token Architecture Reference

### CSS Contract Pattern

Every component declares its dependencies as private custom properties (`--_` prefix) mapping to semantic tokens from Theme or Breakpoints:

```css
.component {
  /* ── Contract: color dependencies (Theme layer) ── */
  --_comp-bg: var(--color-surface-primary);
  --_comp-text: var(--color-text-primary);

  /* ── Contract: layout dependencies (Breakpoints layer) ── */
  --_comp-padding: var(--space-layout-component-padding);

  /* ── Application ── */
  background: var(--_comp-bg);
  color: var(--_comp-text);
  padding: var(--_comp-padding);
}
```

### Fixed utilities and adaptive spacing

ADR 0302 preserves two explicit vocabularies: `.p-8` is eight fixed 4px steps
(32px at every viewport); `space.scale.8` is a semantic scale index (40px on
Mobile/Tablet, 64px on Desktop/XL). Utility values reference fixed dimension
primitives; semantic layout, section, stack and component roles may adapt.
Choose by intent, never by matching the numeric suffix. Public component
customization continues through the component contract and token catalogue.

### Interface and editorial typography

ADR 0300 applies the existing ADR 0277 boundary to the shared source/output:
H1–H3 use the UI family and their own source weights; Display is an explicit
editorial role. `.prose`, Article Hero and Article Body consume the editorial
family, while `.prose-excluded` resets embedded components to UI typography.
Body utilities apply source family, weight and line height instead of inheriting
an unrelated parent style. Source values, not this historical guide, are canonical.

### Available Theme Tokens (Color — per mode: Light / Dark)

| Group | Pattern | Examples |
|-------|---------|----------|
| Surface | `--color-surface-{primary,secondary,archival,statement}` | Page bg, card bg, parchment bg, hero bg |
| Text | `--color-text-{primary,secondary,accent,inverse,disabled}` | Body copy, captions, links, text on dark, greyed out |
| Border | `--color-border-{default,strong,subtle,focus,decorative}` | Cards, dividers, faint lines, focus rings, ornamental |
| Feedback | `--color-feedback-{info,success,warning,error}-{bg,default,hover,pressed}` | Toasts, validation, badges |
| Shadow | `--shadow-{sm,md,lg,xl,2xl}` | Elevation levels |
| Button | `--color-button-{primary,secondary,link,outline,danger}-{text,border,bg}-{default,hover,active}` | All button variant colors |
| Input | `--color-input-{default,error,success,warning,validation}-{unfocused,hover,focused,disabled}-{label,placeholder,value,message,bg,inner-border,outer-border,icon}` | All input state colors |

### Available Breakpoint Tokens (Layout — per mode: Mobile / Tablet / Desktop / XL)

| Group | Pattern | Examples |
|-------|---------|----------|
| Typography | `--typo-{display,h1,h2,h3,h4,body,article}-{size,line-height,letter-spacing,weight}` | Responsive type scale |
| Layout | `--space-layout-{container,section-gap,element-gap,grid-gap,touch-target}` | Structural spacing |
| Grid | `--grid-{columns,column-gap,row-gap}` | Responsive grid config |
| Input Layout | `--space-input-{padding-x,padding-y,margin-bottom,icon-size,label-size,value-size,message-size}` | Input component sizing |

### Responsive Button Tokens (migrated from former components.tokens.json)

These button tokens must resolve in every viewport mode:

| Token | Mobile | Tablet | Desktop | XL |
|-------|--------|--------|---------|----|
| `--space-button-padding-x` | 16px | 16px | 20px | 24px |
| `--space-button-padding-y` | 10px | 10px | 10px | 10px |
| `--space-button-min-height` | 46px | 46px | 46px | 46px |
| `--space-button-gap` | 8px | 8px | 8px | 8px |
| `--space-button-icon-size` | 18px | 18px | 20px | 20px |
| `--typo-button-size` | 16px | 16px | 16px | 16px |
| `--typo-button-weight` | 600 | 600 | 600 | 600 |
| `--radius-button` | 8px | 8px | 8px | 8px |
| `--transition-button-duration` | 100ms | 100ms | 100ms | 100ms |

### Static Tokens (from Primitives, not theme/breakpoint dependent)

```
--font-family-body          /* Primary sans-serif */
--font-family-heading       /* Interface heading family */
--font-family-article       /* Editorial article/prose family */
--font-family-accent        /* Handwritten / artisan feel */
--font-family-mono          /* Code / technical */
--radius-none | sm | md | lg | full
--opacity-disabled: 0.5
--opacity-overlay: 0.6
--transition-fast: 100ms
--transition-base: 200ms
--transition-slow: 300ms
--easing-default: cubic-bezier(0.4, 0, 0.2, 1)
--easing-in: cubic-bezier(0.4, 0, 1, 1)
--easing-out: cubic-bezier(0, 0, 0.2, 1)
--z-dropdown: 1000
--z-sticky: 1050
--z-overlay: 1100
--z-modal: 1200
--z-toast: 1300
```

---

## Naming Conventions

- **CSS classes**: BEM — `.block__element--modifier` (e.g., `.btn--secondary`, `.product-card__image`)
- **Liquid files**: `sections/` for top-level sections, `snippets/` for reusable partials
- **Private props**: `--_block-property` (e.g., `--_btn-bg`, `--_card-padding`)
- **States**: Use native CSS pseudo-classes (`:hover`, `:focus-visible`, `:active`, `:disabled`, `[aria-expanded]`, `[aria-selected]`)
- **Responsive**: Token values change per breakpoint — CSS references stay the same

---

## Component Catalog

### Category Map

| # | Category | Components |
|---|----------|-----------|
| A | UI Primitives | Button, Input, Select, Textarea, Checkbox, Radio, Badge, Tag, Price, Quantity Selector, Rating Stars, Loading Skeleton, Empty State, Divider, Avatar |
| B | Layout Primitives | Card, Modal, Drawer, Toast, Tooltip, Accordion, Tabs, Breadcrumb |
| C | Global | Header, Footer, Announcement Bar, Mobile Menu, Search Overlay, Cart Drawer |
| D | Product | Product Card, Product Gallery, Product Info, Variant Selector, Add to Cart, Reviews, Related Products, Recently Viewed |
| E | Collection | Collection Hero, Collection Grid, Filter Panel, Pagination |
| F | Art & Storytelling | Artist Profile, Process Timeline, Certificate of Authenticity, Collection Story, Studio Visit |
| G | Marketing | Hero Banner, Newsletter, Testimonials, Social Proof, Instagram Feed |

---

## A. UI PRIMITIVES

---

### A1. Button

5 variants × 3 sizes × 6 states. The foundation of all interactive actions.

#### CSS Contract

```css
.btn {
  /* ── Color contract (Theme) ── */
  --_btn-bg: var(--color-button-primary-bg-default);
  --_btn-text: var(--color-button-primary-text-default);
  --_btn-border: var(--color-button-primary-border-default);

  /* ── Layout contract (Breakpoints) ── */
  --_btn-padding-x: var(--space-button-padding-x);
  --_btn-padding-y: var(--space-button-padding-y);
  --_btn-min-h: var(--space-button-min-height);
  --_btn-gap: var(--space-button-gap);
  --_btn-icon-size: var(--space-button-icon-size);

  /* ── Static (Primitives) ── */
  --_btn-radius: var(--radius-button);
  --_btn-font: var(--font-family-body);
  --_btn-transition: var(--transition-button-duration) var(--easing-button);

  /* ── Application ── */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--_btn-gap);
  padding: var(--_btn-padding-y) var(--_btn-padding-x);
  min-height: var(--_btn-min-h);
  background: var(--_btn-bg);
  color: var(--_btn-text);
  border: 1px solid var(--_btn-border);
  border-radius: var(--_btn-radius);
  font-family: var(--_btn-font);
  font-size: var(--typo-button-size);
  font-weight: var(--typo-button-weight);
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--_btn-transition),
              color var(--_btn-transition),
              border-color var(--_btn-transition),
              box-shadow var(--_btn-transition);
}

.btn__icon {
  display: block;
  width: var(--_btn-icon-size);
  height: var(--_btn-icon-size);
  flex-shrink: 0;
}

/* ── States ── */
.btn:hover {
  --_btn-bg: var(--color-button-primary-bg-hover);
  --_btn-text: var(--color-button-primary-text-hover);
  --_btn-border: var(--color-button-primary-border-hover);
}
.btn:active {
  --_btn-bg: var(--color-button-primary-bg-active);
  --_btn-text: var(--color-button-primary-text-active);
  --_btn-border: var(--color-button-primary-border-active);
}
.btn:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.btn:disabled:not([aria-busy="true"]),
.btn[aria-disabled="true"]:not([aria-busy="true"]) {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
.btn:disabled,
.btn[aria-disabled="true"],
.btn[aria-busy="true"] {
  pointer-events: none;
}
.btn[aria-busy="true"]::before,
.btn[aria-busy="true"]::after {
  box-sizing: border-box;
  display: block;
  width: var(--_btn-icon-size);
  height: var(--_btn-icon-size);
  flex: 0 0 auto;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: var(--radius-full);
  animation: btn-spin 0.6s linear infinite;
}
.btn[aria-busy="true"]::before { content: ""; }
.btn[aria-busy="true"]::after { content: none; }

.btn[aria-busy="true"] .btn__icon--leading,
.btn[aria-busy="true"] .btn__icon:not(.btn__icon--leading):not(.btn__icon--trailing) {
  display: none;
}

.btn[aria-busy="true"][data-loading-position="trailing"]::before,
.btn[aria-busy="true"]:not([data-loading-position]):has(.btn__icon--trailing):not(:has(.btn__icon--leading))::before {
  content: none;
}
.btn[aria-busy="true"][data-loading-position="trailing"]::after,
.btn[aria-busy="true"]:not([data-loading-position]):has(.btn__icon--trailing):not(:has(.btn__icon--leading))::after {
  content: "";
}
.btn[aria-busy="true"][data-loading-position="trailing"] .btn__icon--leading,
.btn[aria-busy="true"][data-loading-position="trailing"] .btn__icon:not(.btn__icon--leading):not(.btn__icon--trailing),
.btn[aria-busy="true"]:not([data-loading-position]):has(.btn__icon--trailing):not(:has(.btn__icon--leading)) .btn__icon--leading,
.btn[aria-busy="true"]:not([data-loading-position]):has(.btn__icon--trailing):not(:has(.btn__icon--leading)) .btn__icon:not(.btn__icon--leading):not(.btn__icon--trailing) {
  display: block;
}
.btn[aria-busy="true"][data-loading-position="trailing"] .btn__icon--trailing,
.btn[aria-busy="true"]:not([data-loading-position]):has(.btn__icon--trailing):not(:has(.btn__icon--leading)) .btn__icon--trailing {
  display: none;
}
@keyframes btn-spin {
  to { transform: rotate(360deg); }
}

/* ── Variants (override contract) ── */
.btn--secondary {
  --_btn-bg: var(--color-button-secondary-bg-default);
  --_btn-text: var(--color-button-secondary-text-default);
  --_btn-border: var(--color-button-secondary-border-default);
}
.btn--secondary:hover {
  --_btn-bg: var(--color-button-secondary-bg-hover);
  --_btn-text: var(--color-button-secondary-text-hover);
  --_btn-border: var(--color-button-secondary-border-hover);
}
.btn--secondary:active {
  --_btn-bg: var(--color-button-secondary-bg-active);
  --_btn-text: var(--color-button-secondary-text-active);
  --_btn-border: var(--color-button-secondary-border-active);
}

.btn--outline {
  --_btn-bg: transparent;
  --_btn-text: var(--color-button-outline-text-default);
  --_btn-border: var(--color-button-outline-border-default);
}
.btn--outline:hover {
  --_btn-bg: var(--color-button-outline-bg-hover);
  --_btn-text: var(--color-button-outline-text-hover);
  --_btn-border: var(--color-button-outline-border-hover);
}
.btn--outline:active {
  --_btn-bg: var(--color-button-outline-bg-active);
  --_btn-text: var(--color-button-outline-text-active);
  --_btn-border: var(--color-button-outline-border-active);
}

.btn--link {
  --_btn-bg: var(--color-button-link-bg-default);
  --_btn-text: var(--color-button-link-text-default);
  --_btn-border: var(--color-button-link-border-default);
  --_btn-padding-x: 0;
  --_btn-padding-y: 0;
  --_btn-min-h: auto;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.btn--link:hover {
  --_btn-bg: var(--color-button-link-bg-hover);
  --_btn-text: var(--color-button-link-text-hover);
  --_btn-border: var(--color-button-link-border-hover);
}
.btn--link:active {
  --_btn-bg: var(--color-button-link-bg-active);
  --_btn-text: var(--color-button-link-text-active);
  --_btn-border: var(--color-button-link-border-active);
}

.btn--danger {
  --_btn-bg: var(--color-button-danger-bg-default);
  --_btn-text: var(--color-button-danger-text-default);
  --_btn-border: var(--color-button-danger-border-default);
}
.btn--danger:hover {
  --_btn-bg: var(--color-button-danger-bg-hover);
  --_btn-text: var(--color-button-danger-text-hover);
  --_btn-border: var(--color-button-danger-border-hover);
}
.btn--danger:active {
  --_btn-bg: var(--color-button-danger-bg-active);
  --_btn-text: var(--color-button-danger-text-active);
  --_btn-border: var(--color-button-danger-border-active);
}

/* ── Sizes ── */
.btn--sm {
  --_btn-padding-x: calc(var(--space-button-padding-x) * 0.75);
  --_btn-padding-y: calc(var(--space-button-padding-y) * 0.75);
  --_btn-min-h: calc(var(--space-button-min-height) - 8px);
  font-size: calc(var(--typo-button-size) * 0.875);
}
.btn--lg {
  --_btn-padding-x: calc(var(--space-button-padding-x) * 1.25);
  --_btn-padding-y: calc(var(--space-button-padding-y) * 1.25);
  --_btn-min-h: calc(var(--space-button-min-height) + 8px);
  font-size: calc(var(--typo-button-size) * 1.125);
}

/* ── Icon-only ── */
.btn--icon-only {
  --_btn-padding-x: var(--_btn-padding-y);
  aspect-ratio: 1;
}

/* ── Full-width ── */
.btn--full { width: 100%; }
```

#### Responsive Behavior

Tokens `--space-button-*` change per breakpoint. No CSS media queries needed — the contract adapts automatically. On Mobile, `min-height: 44px` ensures touch targets. On Desktop, `min-height: 40px` is acceptable.

#### HTML / Liquid

```html
<!-- Button element -->
<button class="btn" type="button">
  Add to Cart
</button>

<!-- Link styled as button -->
<a href="{{ product.url }}" class="btn btn--secondary">
  View Details
</a>

<!-- Disabled links keep aria-disabled but omit href -->
<a class="btn btn--secondary" role="link" aria-disabled="true">
  Unavailable
</a>

<!-- Loading state (set via JS) -->
<button class="btn" type="button" aria-busy="true" disabled>
  Add to Cart
</button>

<!-- Icon + label -->
<button class="btn btn--outline">
  {% render 'icon', name: 'cart', class: 'btn__icon btn__icon--leading' %}
  <span>Cart ({{ cart.item_count }})</span>
</button>

<!-- Icon-only -->
<button class="btn btn--outline btn--icon-only" aria-label="Search">
  {% render 'icon', name: 'search', class: 'btn__icon btn__icon--leading' %}
</button>
```

#### Accessibility

- Always provide visible focus ring via `:focus-visible`
- Disabled links keep `role="link"` and `aria-disabled="true"` but omit `href`
- Busy buttons compose `aria-busy="true"` with `disabled`; busy links keep `role="link"` but omit `href`
- `data-loading-position="leading|trailing"` optionally overrides automatic loading placement
- `aria-label` required for icon-only buttons
- Minimum touch target: 44×44px (Mobile), 40×40px (Desktop)

---

### A2. Input (Text)

Four variants (default, error, success, warning) with explicit default, hover,
focus-visible, disabled, and focused validation states.

#### CSS Contract

```css
.input {
  /* ── Color contract (Theme) ── */
  --_input-bg: var(--color-input-default-unfocused-bg);
  --_input-border: var(--color-input-default-unfocused-inner-border);
  --_input-hover-border: var(--color-input-default-hover-inner-border);
  --_input-outer-border: var(--color-input-default-unfocused-outer-border);
  --_input-text: var(--color-input-default-unfocused-value);
  --_input-placeholder: var(--color-input-default-unfocused-placeholder);
  --_input-label: var(--color-input-default-unfocused-label);
  --_input-message: var(--color-input-default-unfocused-message);
  --_input-icon: var(--color-input-default-unfocused-icon);

  /* ── Layout contract (Breakpoints) ── */
  --_input-padding-x: var(--space-input-padding-x);
  --_input-padding-y: var(--space-input-padding-y);
  --_input-margin-bottom: var(--space-input-margin-bottom);
  --_input-icon-size: var(--space-input-icon-size);
  --_input-icon-gap: var(--space-input-icon-gap);
  --_input-label-size: var(--typo-input-label-size);
  --_input-label-line-height: var(--typo-input-label-line-height);
  --_input-value-size: var(--typo-input-value-size);
  --_input-value-line-height: var(--typo-input-value-line-height);
  --_input-message-size: var(--typo-input-message-size);
  --_input-message-line-height: var(--typo-input-message-line-height);

  /* ── Static ── */
  --_input-radius: var(--radius-md);
  --_input-transition: var(--transition-fast) var(--easing-default);

  position: relative;
  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
  gap: 4px;
  margin-bottom: var(--_input-margin-bottom);
}

.input__label {
  font-size: var(--_input-label-size);
  line-height: var(--_input-label-line-height);
  font-weight: 500;
  color: var(--_input-label);
}

.input__control {
  position: relative;
  width: 100%;
  min-width: 0;
}

.input__field {
  width: 100%;
  padding: var(--_input-padding-y) var(--_input-padding-x);
  background: var(--_input-bg);
  color: var(--_input-text);
  border: 1px solid var(--_input-border);
  border-radius: var(--_input-radius);
  font-family: var(--font-family-body);
  font-size: var(--_input-value-size);
  line-height: var(--_input-value-line-height);
  outline: 4px solid transparent;
  outline-offset: 0;
  transition: border-color var(--_input-transition),
              outline-color var(--_input-transition),
              background var(--_input-transition);
}

.input__field::placeholder {
  color: var(--_input-placeholder);
}

.input__message {
  font-size: var(--_input-message-size);
  line-height: var(--_input-message-line-height);
  color: var(--_input-message);
}

.input__icon {
  position: absolute;
  top: 50%;
  display: block;
  width: var(--_input-icon-size);
  height: var(--_input-icon-size);
  transform: translateY(-50%);
  color: var(--_input-icon);
  pointer-events: none;
}
.input__icon--leading { left: var(--_input-padding-x); }
.input__icon--trailing { right: var(--_input-padding-x); }
.input__control:has(.input__icon--leading) .input__field {
  padding-left: calc(var(--_input-padding-x) + var(--_input-icon-size) + var(--_input-icon-gap));
}
.input__control:has(.input__icon--trailing) .input__field {
  padding-right: calc(var(--_input-padding-x) + var(--_input-icon-size) + var(--_input-icon-gap));
}

/* ── States ── */
.input__field:hover {
  --_input-border: var(--color-input-default-hover-inner-border);
  --_input-bg: var(--color-input-default-hover-bg);
}

.input__field:focus-visible {
  --_input-border: var(--color-input-default-focused-inner-border);
  --_input-outer-border: var(--color-input-default-focused-outer-border);
  outline-color: var(--_input-outer-border);
}

.input__field:disabled {
  --_input-bg: var(--color-input-default-disabled-bg);
  --_input-border: var(--color-input-default-disabled-inner-border);
  --_input-text: var(--color-input-default-disabled-value);
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

/* ── Variants ── */
.input--error {
  --_input-border: var(--color-input-error-unfocused-inner-border);
  --_input-hover-border: var(--color-input-error-unfocused-inner-border);
  --_input-label: var(--color-input-error-unfocused-label);
  --_input-message: var(--color-input-error-unfocused-message);
  --_input-icon: var(--color-input-error-unfocused-icon);
}
.input--error .input__field:focus-visible {
  --_input-border: var(--color-input-error-focused-inner-border);
  --_input-outer-border: var(--color-input-error-focused-outer-border);
  outline-color: var(--_input-outer-border);
}

.input--success {
  --_input-border: var(--color-input-success-unfocused-inner-border);
  --_input-hover-border: var(--color-input-success-unfocused-inner-border);
  --_input-label: var(--color-input-success-unfocused-label);
  --_input-message: var(--color-input-success-unfocused-message);
  --_input-icon: var(--color-input-success-unfocused-icon);
}
.input--success .input__field:focus-visible {
  --_input-border: var(--color-input-success-focused-inner-border);
  --_input-outer-border: var(--color-input-success-focused-outer-border);
  outline-color: var(--_input-outer-border);
}

.input--warning {
  --_input-border: var(--color-input-warning-unfocused-inner-border);
  --_input-hover-border: var(--color-input-warning-unfocused-inner-border);
  --_input-label: var(--color-input-warning-unfocused-label);
  --_input-message: var(--color-input-warning-unfocused-message);
  --_input-icon: var(--color-input-warning-unfocused-icon);
}
.input--warning .input__field:focus-visible {
  --_input-border: var(--color-input-warning-focused-inner-border);
  --_input-outer-border: var(--color-input-warning-focused-outer-border);
  outline-color: var(--_input-outer-border);
}
```

#### HTML / Liquid

```html
<div class="input">
  <label class="input__label" for="email">Email</label>
  <div class="input__control">
    <svg class="input__icon input__icon--leading" aria-hidden="true"><!-- icon --></svg>
    <input class="input__field" type="email" id="email"
           placeholder="you@example.com" autocomplete="email">
  </div>
</div>

<!-- With message (error state) -->
<div class="input input--error">
  <label class="input__label" for="email">Email</label>
  <div class="input__control">
    <input class="input__field" type="email" id="email"
           aria-invalid="true" aria-describedby="email-error">
    <svg class="input__icon input__icon--trailing" aria-hidden="true"><!-- icon --></svg>
  </div>
  <p class="input__message" id="email-error" role="alert">
    Please enter a valid email
  </p>
</div>

<!-- Disabled -->
<div class="input">
  <label class="input__label" for="sku">SKU</label>
  <input class="input__field" type="text" id="sku" disabled
         value="{{ product.selected_variant.sku }}">
</div>
```

#### Accessibility

- `<label>` always linked via `for`/`id`
- `aria-invalid="true"` on error
- `aria-describedby` linking field to message
- `role="alert"` on error messages for screen reader announcement
- Visible focus ring via `outline`

---

### A3. Select

Same token contract as Input, with dropdown-specific additions.

#### CSS Contract

```css
.select {
  /* ── Inherits full input contract ── */
  --_input-bg: var(--color-input-default-unfocused-bg);
  --_input-border: var(--color-input-default-unfocused-inner-border);
  --_input-hover-border: var(--color-input-default-hover-inner-border);
  --_input-outer-border: var(--color-input-default-focused-outer-border);
  --_input-text: var(--color-input-default-unfocused-value);
  --_input-label: var(--color-input-default-unfocused-label);
  --_input-message: var(--color-input-default-unfocused-message);
  --_input-padding-x: var(--space-input-padding-x);
  --_input-padding-y: var(--space-input-padding-y);
  --_input-radius: var(--radius-md);
  --_input-label-size: var(--typo-input-label-size);
  --_input-label-line-height: var(--typo-input-label-line-height);
  --_input-value-size: var(--typo-input-value-size);
  --_input-value-line-height: var(--typo-input-value-line-height);
  --_input-message-size: var(--typo-input-message-size);
  --_input-message-line-height: var(--typo-input-message-line-height);
  --_select-indicator: var(--color-input-default-unfocused-icon);
  --_select-panel-padding: 4px;
  --_input-transition: var(--transition-fast) var(--easing-default);

  display: inline-flex;
  flex-direction: column;
  max-width: 100%;
  gap: 4px;
  margin-bottom: var(--space-input-margin-bottom);
}

.select__control { position: relative; min-width: 0; }
.select__message {
  font-size: var(--_input-message-size);
  line-height: var(--_input-message-line-height);
  color: var(--_input-message);
}

.select__field {
  appearance: none;
  padding: var(--_input-padding-y) calc(var(--_input-padding-x) + 24px) var(--_input-padding-y) var(--_input-padding-x);
  background-color: var(--_input-bg);
  /* Lucide ChevronDown geometry used by the no-JavaScript fallback. */
  background-image: url("data:image/svg+xml,...");
  background-position: right var(--_input-padding-x) center;
  background-repeat: no-repeat;
  background-size: 16px;
  color: var(--_input-text);
  border: 1px solid var(--_input-border);
  border-radius: var(--_input-radius);
  font-family: var(--font-family-body);
  font-size: var(--_input-value-size);
  line-height: var(--_input-value-line-height);
  outline: 4px solid transparent;
  outline-offset: 0;
  cursor: pointer;
  transition: border-color var(--_input-transition),
              outline-color var(--_input-transition),
              background-color var(--_input-transition),
              color var(--_input-transition);
}

/* States mirror .input__field */
.select__field:hover:not(:disabled) {
  --_input-bg: var(--color-input-default-hover-bg);
  --_input-border: var(--_input-hover-border);
}
.select__field:focus-visible {
  --_input-border: var(--color-input-default-focused-inner-border);
  --_input-outer-border: var(--color-input-default-focused-outer-border);
  outline-color: var(--_input-outer-border);
}

.select--error {
  --_input-border: var(--color-input-error-unfocused-inner-border);
  --_input-hover-border: var(--color-input-error-unfocused-inner-border);
  --_input-label: var(--color-input-error-unfocused-label);
  --_input-message: var(--color-input-error-unfocused-message);
  --_select-indicator: var(--color-input-error-unfocused-icon);
}
.select--success {
  --_input-border: var(--color-input-success-unfocused-inner-border);
  --_input-hover-border: var(--color-input-success-unfocused-inner-border);
  --_input-label: var(--color-input-success-unfocused-label);
  --_input-message: var(--color-input-success-unfocused-message);
  --_select-indicator: var(--color-input-success-unfocused-icon);
}
.select--warning {
  --_input-border: var(--color-input-warning-unfocused-inner-border);
  --_input-hover-border: var(--color-input-warning-unfocused-inner-border);
  --_input-label: var(--color-input-warning-unfocused-label);
  --_input-message: var(--color-input-warning-unfocused-message);
  --_select-indicator: var(--color-input-warning-unfocused-icon);
}
.select--error .select__field:focus-visible {
  outline-color: var(--color-input-error-focused-outer-border);
}
.select--success .select__field:focus-visible {
  outline-color: var(--color-input-success-focused-outer-border);
}
.select--warning .select__field:focus-visible {
  outline-color: var(--color-input-warning-focused-outer-border);
}
.select__field:disabled {
  --_input-bg: var(--color-input-default-disabled-bg);
  --_input-border: var(--color-input-default-disabled-inner-border);
  --_input-text: var(--color-input-default-disabled-value);
  --_select-indicator: var(--color-input-default-disabled-value);
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

/* Added only after progressive enhancement succeeds */
.select__native { display: none; }
.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding-right: var(--_input-padding-x);
  background-image: none;
}
.select__indicator,
.select__option-check { width: 16px; height: 16px; }
.select__listbox {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: var(--z-dropdown);
  width: max-content;
  min-width: 100%;
  max-width: min(360px, calc(100vw - 32px));
  max-height: 240px;
  overflow: auto;
  padding: var(--_select-panel-padding);
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}
.select__option {
  min-height: 44px;
  padding: 10px calc(var(--_input-padding-x) + 24px) 10px var(--_input-padding-x);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}
.select__option-check {
  top: 50%;
  right: calc(var(--_input-padding-x) - var(--_select-panel-padding));
  transform: translateY(-50%);
}
.select__option[hidden] { display: none; }
.select__option:hover,
.select__option[data-highlighted] {
  background: var(--color-surface-secondary);
}
```

#### HTML / Liquid

```html
<div class="select">
  <label class="select__label" for="glaze">Glaze Color</label>
  <select class="select__field" id="glaze" name="glaze">
    <option value="" hidden selected>Choose a glaze…</option>
    {% for value in product.options_by_name['Glaze'].values %}
      <option value="{{ value }}"
        {% if value == product.selected_variant.option1 %}selected{% endif %}>
        {{ value }}
      </option>
    {% endfor %}
  </select>
</div>
```

The shared `theme.js` enhances this native markup into `.select__control`,
`.select__trigger`, `.select__value`, `.select__indicator`, `.select__listbox`,
`.select__option`, and `.select__option-check`. The native field remains the submitted value and
the visible fallback when JavaScript is absent. The trigger is intrinsic unless
the consumer defines a width; the listbox independently grows to fit its options
up to its viewport-safe maximum. Error, Success, and Warning use
`.select--error`, `.select--success`, and `.select--warning`; feedback uses
`.select__message` with `aria-describedby`, and only Error requires
`aria-invalid="true"` on the native field.

---

### A4. Textarea

Inherits the Input contract and exposes vertical, horizontal, or bidirectional
native resizing. Vertical is the default.

```css
.textarea__field {
  /* Inherits all .input__field styles */
  resize: vertical;
  min-height: 120px;
}

.textarea__field[data-resize="horizontal"] { resize: horizontal; }
.textarea__field[data-resize="both"] { resize: both; }
.textarea__field[data-min-lines] { min-height: var(--_textarea-min-height, 120px); }
.textarea__field[data-max-lines] { max-height: var(--_textarea-max-height, none); }
```

```html
<div class="input">
  <label class="input__label" for="message">Personal message for the piece</label>
  <textarea class="input__field textarea__field" id="message"
            rows="4" maxlength="500"
            placeholder="Add a dedication or special instructions…"></textarea>
  <p class="input__message">{{ 500 | minus: message.length }} characters remaining</p>
</div>
```

Use `data-resize="horizontal"` or `data-resize="both"` on the native textarea
to opt into another direction. Omit the attribute for the default vertical
behavior. `data-min-lines` and `data-max-lines` accept positive whole numbers;
the shared progressive enhancer calculates their height constraints from the
field's computed typography and box metrics. The default minimum is four lines
and an omitted maximum remains unbounded.

---

### A5. Checkbox

ADR 0304 exposes border/focus dimensions and Check/Minus indicator size/color.
The canonical mask rendering and validation derivations live in
`components/css/primitives.css`; the excerpt below is illustrative.

#### CSS Contract

```css
.checkbox {
  --_check-size: var(--space-input-icon-size);
  --_check-gap: var(--space-input-icon-gap);
  --_check-bg: var(--color-input-default-unfocused-bg);
  --_check-border: var(--color-input-default-unfocused-inner-border);
  --_check-hover-border: var(--color-input-default-hover-inner-border);
  --_check-active: var(--color-button-primary-bg-default);
  --_check-text: var(--color-text-primary);
  --_check-focus: var(--color-input-default-focused-outer-border);
  --_check-radius: var(--radius-sm);

  display: flex;
  align-items: flex-start;
  gap: var(--_check-gap);
  cursor: pointer;
}

.checkbox__input {
  appearance: none;
  width: var(--_check-size);
  height: var(--_check-size);
  flex-shrink: 0;
  border: var(--border-checkbox-width) solid var(--_check-border);
  border-radius: var(--_check-radius);
  background: var(--_check-bg);
  cursor: pointer;
  transition: background var(--transition-fast) var(--easing-default),
              border-color var(--transition-fast) var(--easing-default);
}

.checkbox__input:checked {
  background: var(--_check-active);
  border-color: var(--_check-active);
  background-image: url("data:image/svg+xml,..."); /* checkmark SVG */
  background-size: 14px;
  background-position: center;
  background-repeat: no-repeat;
}

.checkbox:hover .checkbox__input:not(:disabled) { --_check-border: var(--_check-hover-border); }
.checkbox__input:focus-visible {
  outline: var(--border-input-focus-ring-width) solid var(--_check-focus);
  outline-offset: var(--border-input-focus-ring-offset);
}

.checkbox__label {
  font-size: var(--typo-body-size);
  color: var(--_check-text);
  line-height: var(--_check-size);
}
```

```html
<label class="checkbox">
  <input class="checkbox__input" type="checkbox" name="gift_wrap" value="1">
  <span class="checkbox__label">Gift wrap this piece (+$5)</span>
</label>
```

---

### A6. Radio

Native mutually exclusive choice. Radio reuses the accepted choice-control
validation boundary from Checkbox while retaining native named-group behavior.

```css
.radio {
  --_radio-size: var(--space-input-icon-size);
  --_radio-gap: var(--space-input-icon-gap);
  --_radio-active: var(--color-button-primary-bg-default);
  --_radio-focus: var(--color-input-default-focused-outer-border);
}
.radio__input {
  width: var(--_radio-size);
  height: var(--_radio-size);
  border-radius: var(--radius-full);
}
.radio__input:checked {
  border-color: var(--_radio-active);
  box-shadow: inset 0 0 0 4px var(--_radio-active);
}
.radio__input:focus-visible {
  outline: var(--border-input-focus-ring-width) solid var(--_radio-focus);
  outline-offset: var(--border-input-focus-ring-offset);
}
```

```html
<fieldset class="fieldset">
  <legend class="fieldset__legend">Fulfillment method</legend>
  <label class="radio">
    <input class="radio__input" type="radio" name="fulfillment" value="pickup">
    <span class="radio__label">Gallery pickup</span>
  </label>
</fieldset>
```

Default, Error, Success, and Warning are visual validation variants independent
from checked state. Radio owns native input ARIA; Field Wrapper owns feedback
content.

---

### A7. Badge

Small passive status indicators for product states. Badge is non-interactive;
`role="status"` is opt-in only for content that changes dynamically.

```css
.badge {
  --_badge-bg: var(--color-feedback-info-bg);
  --_badge-text: var(--color-feedback-info-default);

  display: inline-flex;
  align-items: center;
  max-inline-size: 100%;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  background: var(--_badge-bg);
  color: var(--_badge-text);
  font-family: var(--font-family-body);
  font-size: var(--typo-caption-size);
  font-weight: 600;
  line-height: var(--typo-caption-line-height);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  overflow-wrap: anywhere;
}

.badge--success { --_badge-bg: var(--color-feedback-success-bg); --_badge-text: var(--color-feedback-success-default); }
.badge--warning { --_badge-bg: var(--color-feedback-warning-bg); --_badge-text: var(--color-feedback-warning-default); }
.badge--error   { --_badge-bg: var(--color-feedback-error-bg);   --_badge-text: var(--color-feedback-error-default); }
```

```html
<span class="badge badge--success">In Stock</span>
<span class="badge badge--warning">Last One</span>
<span class="badge badge--error">Sold Out</span>
<span class="badge">Limited Edition</span> <!-- info/default -->
```

---

### A8. Tag

Compact labels for filters, categories, and applied facets, with an optional
native remove button. The consuming target owns the removal state update and
announcement.

```css
.tag {
  --_tag-bg: var(--color-surface-secondary);
  --_tag-text: var(--color-text-secondary);
  --_tag-border: var(--color-border-subtle);
  --_tag-focus: var(--color-border-focus);
  --_tag-remove-size: max(var(--space-input-icon-size), 24px);
  --_tag-padding-start: 12px;
  --_tag-padding-end: 12px;

  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px var(--_tag-padding-end) 4px var(--_tag-padding-start);
  border: 1px solid var(--_tag-border);
  border-radius: var(--radius-full);
  background: var(--_tag-bg);
  color: var(--_tag-text);
  font-family: var(--font-family-body);
  font-size: var(--typo-body-sm-size);
  line-height: var(--typo-body-sm-line-height);
  max-inline-size: 100%;
}

.tag:has(.tag__remove) {
  --_tag-padding-end: 8px;
}

.tag__label {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.tag__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  inline-size: var(--_tag-remove-size);
  block-size: var(--_tag-remove-size);
  flex: 0 0 var(--_tag-remove-size);
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.6;
}
@media (hover: hover) and (pointer: fine) {
  .tag__remove:hover { opacity: 1; }
}
.tag__remove:focus-visible {
  outline: 2px solid var(--_tag-focus);
  outline-offset: 2px;
}
```

```html
<span class="tag">
  <span class="tag__label">Stoneware</span>
  <button class="tag__remove" type="button" aria-label="Remove Stoneware filter"></button>
</span>
```

---

### A9. Price Display

Handles regular, compare-at (sale), and sold-out pricing.

```css
.price {
  --_price-color: var(--color-text-primary);
  --_price-sale-color: var(--color-feedback-error-default);
  --_price-compare-color: var(--color-text-disabled);

  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--font-family-body);
  font-weight: 600;
}

.price__current {
  color: var(--_price-color);
  font-size: var(--typo-h4-size);
}

.price--on-sale .price__current {
  color: var(--_price-sale-color);
}

.price__compare {
  color: var(--_price-compare-color);
  font-size: var(--typo-body-size);
  text-decoration: line-through;
}

.price__unit {
  color: var(--color-text-secondary);
  font-size: calc(var(--typo-body-size) * 0.875);
  font-weight: 400;
}
```

```html
<!-- Regular price -->
<div class="price">
  <span class="price__current">{{ product.price | money }}</span>
</div>

<!-- Sale price -->
<div class="price price--on-sale">
  <span class="price__current">{{ product.price | money }}</span>
  <span class="price__compare">{{ product.compare_at_price | money }}</span>
</div>

<!-- Price with unit -->
<div class="price">
  <span class="price__current">{{ product.price | money }}</span>
  <span class="price__unit">per piece</span>
</div>
```

Error, Success, and Warning use `.checkbox--error`, `.checkbox--success`, and
`.checkbox--warning` on the wrapping label. Native `checked`, `disabled`, and
`required` remain on the input. `data-indeterminate="true"` progressively
initializes the native `indeterminate` property; it does not create a third form
value. Field Wrapper owns associated helper or validation messages.

---

### A10. Quantity Selector

```css
.qty {
  --_qty-bg: var(--color-input-default-unfocused-bg);
  --_qty-border: var(--color-input-default-unfocused-inner-border);
  --_qty-text: var(--color-text-primary);
  --_qty-btn-text: var(--color-text-secondary);

  display: inline-flex;
  align-items: center;
  border: 1px solid var(--_qty-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.qty__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--space-button-min-height);
  height: var(--space-button-min-height);
  padding: 0;
  border: none;
  background: var(--_qty-bg);
  color: var(--_qty-btn-text);
  cursor: pointer;
  transition: background var(--transition-fast) var(--easing-default);
}
.qty__btn:hover { background: var(--color-surface-secondary); }
.qty__btn:disabled { opacity: var(--opacity-disabled); cursor: not-allowed; }

.qty__input {
  width: 48px;
  padding: 4px;
  border: none;
  border-left: 1px solid var(--_qty-border);
  border-right: 1px solid var(--_qty-border);
  background: var(--_qty-bg);
  color: var(--_qty-text);
  text-align: center;
  font-family: var(--font-family-body);
  font-size: var(--typo-body-size);
  -moz-appearance: textfield;
}
.qty__input::-webkit-inner-spin-button { display: none; }
```

```html
<div class="qty" role="group" aria-label="Quantity">
  <button class="qty__btn" type="button" aria-label="Decrease quantity"
          onclick="this.parentElement.querySelector('input').stepDown()">
    {% render 'icon', name: 'minus', size: 16 %}
  </button>
  <input class="qty__input" type="number" name="quantity"
         value="1" min="1" max="{{ product.selected_variant.inventory_quantity }}"
         aria-label="Quantity">
  <button class="qty__btn" type="button" aria-label="Increase quantity"
          onclick="this.parentElement.querySelector('input').stepUp()">
    {% render 'icon', name: 'plus', size: 16 %}
  </button>
</div>
```

---

### A11. Rating Stars

Compact display-only rating projection. The target resolves raw rating data into
full, half, and empty anatomy; neutral Web adds no formatter or runtime.

```css
.rating {
  --_rating-filled: var(--color-text-accent);
  --_rating-empty: var(--color-text-secondary);
  --_rating-size: var(--typo-body-size);

  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  max-inline-size: 100%;
}

.rating__stars {
  display: inline-flex;
  flex: 0 0 auto;
  direction: ltr;
  gap: 0.125rem;
}

.rating__star {
  inline-size: var(--_rating-size);
  block-size: var(--_rating-size);
  color: var(--_rating-empty);
}
.rating__star--filled { color: var(--_rating-filled); }
.rating__star--half {
  position: relative;
  color: var(--_rating-empty);
}
.rating__star--half::before {
  content: "★";
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  inline-size: 50%;
  overflow: hidden;
  color: var(--_rating-filled);
}

.rating__count {
  color: var(--color-text-secondary);
  font-family: var(--font-family-body);
  font-size: var(--typo-body-sm-size);
  line-height: var(--typo-body-sm-line-height);
  overflow-wrap: anywhere;
}
```

```html
<span class="rating">
  <span class="rating__stars" role="img" aria-label="3.5 out of 5 stars">
    <span class="rating__star rating__star--filled" aria-hidden="true">★</span>
    <span class="rating__star rating__star--filled" aria-hidden="true">★</span>
    <span class="rating__star rating__star--filled" aria-hidden="true">★</span>
    <span class="rating__star rating__star--half" aria-hidden="true">☆</span>
    <span class="rating__star" aria-hidden="true">☆</span>
  </span>
  <span class="rating__count" dir="auto">24 reviews</span>
</span>
```

Keep the optional count outside the star image so it remains independently
readable. Full, half, and empty states use solid, partial-fill, and outline form
in addition to color. Use Star Input for value entry.

---

### A12. Loading Skeleton

Decorative loading geometry. Skeleton owns only the visual shape; the target
owns dimensions, the real content region's busy lifecycle, optional localized
Status text, data/errors, and atomic replacement.

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-secondary) 25%,
    var(--color-surface-primary) 50%,
    var(--color-surface-secondary) 75%
  );
  background-size: 200%;
  animation: skeleton-shimmer 1.5s linear 3;
  border-radius: var(--radius-sm);
  max-width: 100%;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200%; }
  100% { background-position: -200%; }
}

.skeleton--text { height: 1em; width: 80%; }
.skeleton--title { height: 1.5em; width: 60%; }
.skeleton--image { aspect-ratio: 1; width: 100%; border-radius: var(--radius-md); }
.skeleton--button { height: var(--space-button-min-height); width: 140px; border-radius: var(--radius-md); }
.skeleton--circle { border-radius: var(--radius-full); }

@media (prefers-reduced-motion: reduce), (forced-colors: active) {
  .skeleton {
    animation: none;
    background: var(--color-surface-secondary);
  }
}

@media (forced-colors: active) {
  .skeleton { background: GrayText; }
}
```

```html
<section aria-busy="true" aria-labelledby="orders-title">
  <h2 id="orders-title">Orders</h2>
  <div class="skeleton skeleton--text" aria-hidden="true"></div>
</section>
<p class="visually-hidden" role="status">Loading orders</p>
```

The target returns `aria-busy` to `false` or removes it after replacement.
Skeleton has no loading boolean, Status role, accessible name, events, focus,
keyboard model, dimensions API, or neutral runtime.

---

### A13. Empty State

For zero-result searches, empty carts, etc.

```css
.empty-state {
  display: grid;
  justify-items: center;
  min-width: 0;
  width: 100%;
  text-align: center;
  padding: var(--space-layout-section-gap) min(var(--space-layout-section-gap), 20%);
  gap: var(--tg-space-stack-md);
}

.empty-state__icon {
  inline-size: 64px;
  aspect-ratio: 1;
  color: var(--color-text-disabled);
}

.empty-state .empty-state__title {
  max-width: 24ch;
  overflow-wrap: anywhere;
  font: var(--tg-typography-h3-weight) var(--typo-h3-size)/var(--typo-h3-line-height) var(--font-family-heading);
  color: var(--color-text-primary);
}

.empty-state__message {
  max-width: 40ch;
  overflow-wrap: anywhere;
  font: var(--tg-typography-body-default-weight) var(--typo-body-size)/var(--typo-body-line-height) var(--font-family-body);
  color: var(--color-text-secondary);
}
```

```html
<div class="empty-state">
  {% render 'icon', name: 'shopping-bag', class: 'empty-state__icon' %}
  <h2 class="empty-state__title">Your cart is empty</h2>
  <p class="empty-state__message">Looks like you haven't found the perfect piece yet.</p>
  <a href="/collections/all" class="btn">Explore the Collection</a>
</div>
```

The target chooses a native heading rank that fits the surrounding page,
section, panel, or dialog. `title` supplies required non-empty content; the
heading rank is supplied by the owning host under ADR 0236 and is not a public
component or Studio property. Initial empty
content is ordinary document content. When a search, filter, or destructive
update dynamically produces the empty state, the target owns any pre-existing
Status announcement and focus policy. The optional action is one canonical
Button or Link slot: use a Link for navigation and a Button for a command.

---

### A14. Divider

```css
.divider {
  width: 100%;
  border: none;
  height: 1px;
  background: var(--color-border-subtle);
  margin: 0;
}

.divider--decorative {
  height: 2px;
  background: var(--color-border-decorative);
}

.divider[data-orientation="vertical"] {
  align-self: stretch;
  width: 1px;
  height: 100%;
}
```

Divider owns the rule only. Parent layout composition owns all surrounding
spacing. The independent `semantics` property controls whether the rule is
visual-only or exposed as a structural separator; it intentionally has no
visual effect.

---

### A15. Avatar

For artist profiles, review authors.

```css
.avatar {
  --_avatar-size: 40px;
  box-sizing: border-box;
  inline-size: var(--_avatar-size);
  block-size: var(--_avatar-size);
  border-radius: var(--radius-full);
  overflow: hidden;
  flex: 0 0 var(--_avatar-size);
  background: var(--color-surface-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  font-family: var(--font-family-body);
  font-weight: var(--tg-font-weight-semibold);
  line-height: 1;
  color: var(--color-text-secondary);
}

.avatar > img { display: block; inline-size: 100%; block-size: 100%; object-fit: cover; }
.avatar--sm { --_avatar-size: 32px; }
.avatar--lg { --_avatar-size: 56px; }
.avatar--xl { --_avatar-size: 80px; }
```

Avatar is passive. Targets explicitly author either a native image with
contextual `alt` or short pre-derived initials. Standalone initials use one named
image role; initials or images beside the same visible name are hidden/null-alt
to avoid duplicate identity. Actionable avatars compose canonical Link or Button
outside the Avatar root. Automatic image fallback and initials typography
scaling remain open architecture decisions.

---

## B. LAYOUT PRIMITIVES

---

### B1. Card (Base)

Foundation component for Product Card, Collection Card, and content cards.

```css
.card {
  --_card-bg: var(--color-surface-primary);
  --_card-border: var(--color-border-subtle);
  --_card-radius: var(--radius-md);
  --_card-shadow: var(--shadow-sm);
  --_card-padding: var(--space-layout-element-gap);

  background: var(--_card-bg);
  border: 1px solid var(--_card-border);
  border-radius: var(--_card-radius);
  box-shadow: var(--_card-shadow);
  overflow: hidden;
  transition: box-shadow var(--transition-base) var(--easing-default),
              transform var(--transition-base) var(--easing-default);
}

.card:hover {
  --_card-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card__media {
  position: relative;
  overflow: hidden;
}
.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) var(--easing-out);
}
.card:hover .card__media img {
  transform: scale(1.03);
}

.card__body {
  padding: var(--_card-padding);
}

.card__footer {
  padding: 0 var(--_card-padding) var(--_card-padding);
}

/* ── Variants ── */
.card--flat {
  --_card-shadow: none;
  --_card-border: transparent;
}
.card--flat:hover { --_card-shadow: none; transform: none; }

.card--elevated { --_card-shadow: var(--shadow-md); }
.card--elevated:hover { --_card-shadow: var(--shadow-lg); }
```

---

### B2. Modal

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: rgba(0, 0, 0, var(--opacity-overlay));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-layout-element-gap);
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-base) var(--easing-default),
              visibility var(--transition-base);
}
.modal-overlay[aria-hidden="false"] {
  opacity: 1;
  visibility: visible;
}

.modal {
  --_modal-bg: var(--color-surface-primary);
  --_modal-radius: var(--radius-lg);
  --_modal-shadow: var(--shadow-2xl);
  --_modal-padding: var(--space-layout-element-gap);

  background: var(--_modal-bg);
  border-radius: var(--_modal-radius);
  box-shadow: var(--_modal-shadow);
  width: 100%;
  max-width: 560px;
  max-height: 85vh;
  overflow-y: auto;
  transform: translateY(16px);
  transition: transform var(--transition-base) var(--easing-out);
}
.modal-overlay[aria-hidden="false"] .modal {
  transform: translateY(0);
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--_modal-padding);
  border-bottom: 1px solid var(--color-border-subtle);
}

.modal__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h3-size);
  color: var(--color-text-primary);
  margin: 0;
}

.modal__close {
  /* Use .btn--icon-only .btn--outline */
}

.modal__body { padding: var(--_modal-padding); }

.modal__footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding: var(--_modal-padding);
  border-top: 1px solid var(--color-border-subtle);
}
```

```html
<div class="modal-overlay" aria-hidden="true" role="dialog"
     aria-labelledby="modal-title" aria-modal="true">
  <div class="modal">
    <div class="modal__header">
      <h2 class="modal__title" id="modal-title">Size Guide</h2>
      <button class="btn btn--outline btn--icon-only"
              aria-label="Close" data-modal-close>
        {% render 'icon', name: 'x' %}
      </button>
    </div>
    <div class="modal__body">
      <!-- Content -->
    </div>
    <div class="modal__footer">
      <button class="btn" data-modal-close>Got it</button>
    </div>
  </div>
</div>
```

#### Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Trap focus inside modal when open
- Close on Escape key
- Return focus to trigger element on close

---

### B3. Drawer (Side Panel)

Used for Cart Drawer and Mobile Menu.

```css
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: rgba(0, 0, 0, var(--opacity-overlay));
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-base) var(--easing-default),
              visibility var(--transition-base);
}
.drawer-overlay.is-open { opacity: 1; visibility: visible; }

.drawer {
  --_drawer-bg: var(--color-surface-primary);
  --_drawer-width: min(400px, 85vw);
  --_drawer-shadow: var(--shadow-2xl);
  --_drawer-padding: var(--space-layout-element-gap);

  position: fixed;
  top: 0;
  right: 0;
  z-index: var(--z-modal);
  width: var(--_drawer-width);
  height: 100dvh;
  background: var(--_drawer-bg);
  box-shadow: var(--_drawer-shadow);
  transform: translateX(100%);
  transition: transform var(--transition-base) var(--easing-out);
  display: flex;
  flex-direction: column;
}
.drawer.is-open { transform: translateX(0); }

.drawer--left { right: auto; left: 0; transform: translateX(-100%); }
.drawer--left.is-open { transform: translateX(0); }

.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--_drawer-padding);
  border-bottom: 1px solid var(--color-border-subtle);
  flex-shrink: 0;
}

.drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--_drawer-padding);
}

.drawer__footer {
  padding: var(--_drawer-padding);
  border-top: 1px solid var(--color-border-subtle);
  flex-shrink: 0;
}
```

---

### B4. Toast / Notification

```css
.toast {
  --_toast-bg: var(--color-surface-primary);
  --_toast-border: var(--color-border-default);
  --_toast-text: var(--color-text-primary);
  --_toast-icon: var(--color-feedback-info-default);

  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: var(--z-toast);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  max-width: 380px;
  background: var(--_toast-bg);
  border: 1px solid var(--_toast-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  transform: translateY(16px);
  opacity: 0;
  transition: transform var(--transition-base) var(--easing-out),
              opacity var(--transition-base);
}
.toast.is-visible { transform: translateY(0); opacity: 1; }

.toast--success { --_toast-border: var(--color-feedback-success-default); --_toast-icon: var(--color-feedback-success-default); }
.toast--error   { --_toast-border: var(--color-feedback-error-default);   --_toast-icon: var(--color-feedback-error-default); }
.toast--warning { --_toast-border: var(--color-feedback-warning-default); --_toast-icon: var(--color-feedback-warning-default); }

.toast__icon { width: 20px; height: 20px; color: var(--_toast-icon); flex-shrink: 0; margin-top: 2px; }
.toast__content { flex: 1; }
.toast__title { font-weight: 600; color: var(--_toast-text); margin-bottom: 4px; }
.toast__message { font-size: calc(var(--typo-body-size) * 0.875); color: var(--color-text-secondary); }
.toast__close { /* btn--icon-only */ }
```

```html
<div class="toast toast--success is-visible" role="alert" aria-live="polite">
  {% render 'icon', name: 'check-circle', class: 'toast__icon' %}
  <div class="toast__content">
    <p class="toast__title">Added to cart</p>
    <p class="toast__message">Matcha Bowl — Sage Glaze</p>
  </div>
  <button class="btn btn--link btn--icon-only" aria-label="Dismiss"
          data-toast-close>
    {% render 'icon', name: 'x', size: 16 %}
  </button>
</div>
```

---

### B5. Tooltip

Tooltip supplements, but never replaces, a trigger's accessible name. Render its
short, non-interactive text as an explicit `role="tooltip"` node and associate it
with `aria-describedby`. Targets own unique IDs, delayed opening, collision-aware
positioning, and Escape dismissal. Hovering the content must not dismiss it.

```html
<span class="tooltip">
  <button class="btn btn--outline tooltip__trigger" type="button"
          aria-describedby="material-tooltip">Material details</button>
  <span class="tooltip__content" id="material-tooltip" role="tooltip">
    View material details
  </span>
</span>
```

---

### B6. Accordion

Each native trigger belongs inside a heading and owns one panel through synchronized
`aria-expanded`, `aria-controls`, and IDs. Collapsed panels use the native `hidden`
attribute so their descendants leave rendering and the focus order. The consuming
target coordinates whether a group allows one or multiple expanded items.

```html
<div class="accordion">
  <div class="accordion__item">
    <h3 class="accordion__heading">
      <button class="accordion__trigger" type="button" aria-expanded="false"
              aria-controls="acc-details" id="acc-details-btn">
        <span>Product details</span>
        <svg class="accordion__icon" aria-hidden="true"><!-- chevron --></svg>
      </button>
    </h3>
    <div class="accordion__panel" id="acc-details" role="region"
         aria-labelledby="acc-details-btn" hidden>
      <div class="accordion__panel-inner">
        <div class="accordion__content"><!-- description --></div>
      </div>
    </div>
  </div>
</div>
```

---

### B7. Tabs

Tabs v1 is a horizontal, labelled tablist with one selected enabled tab, roving
`tabindex`, and one visible associated panel. Targets implement Arrow Left/Right,
Home, End, and automatic or manual activation; direction-aware navigation follows
the rendered direction. Disabled tabs are skipped. Panels remain programmatically
focusable so Tab can move from the active tab into its content.

```html
<div class="tabs" data-activation="automatic">
  <div class="tabs__list" role="tablist" aria-label="Product information">
    <button class="tabs__tab" role="tab" aria-selected="true"
            aria-controls="tab-description" id="tab-btn-description">Description</button>
    <button class="tabs__tab" role="tab" aria-selected="false"
            aria-controls="tab-care" id="tab-btn-care" tabindex="-1">Care</button>
  </div>
  <div class="tabs__panel" role="tabpanel" id="tab-description"
       aria-labelledby="tab-btn-description" tabindex="0"><!-- description --></div>
  <div class="tabs__panel" role="tabpanel" id="tab-care"
       aria-labelledby="tab-btn-care" tabindex="0" hidden><!-- care --></div>
</div>
```

---

### B8. Breadcrumb

```css
.breadcrumb {
  --_breadcrumb-gap: calc(var(--space-layout-element-gap) * 0.25);
  width: 100%;
  min-width: 0;
  padding-block: calc(var(--space-layout-element-gap) * 0.5);
  font-family: var(--font-family-body);
  font-size: var(--typo-body-sm-size);
  line-height: var(--typo-body-sm-line-height);
}
.breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0 var(--_breadcrumb-gap);
  margin: 0;
  padding: 0;
  list-style: none;
}
.breadcrumb__item { display: inline-flex; align-items: center; gap: var(--_breadcrumb-gap); min-width: 0; }
.breadcrumb__link {
  display: inline-flex;
  align-items: center;
  min-block-size: var(--space-layout-touch-target);
  color: var(--color-text-secondary);
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color var(--transition-fast) var(--easing-default);
}
.breadcrumb__link:hover { color: var(--color-text-accent); }
.breadcrumb__link:focus-visible { outline: 2px solid var(--color-border-focus); outline-offset: 2px; }
.breadcrumb__separator { color: var(--color-text-disabled); }
.breadcrumb__current { color: var(--color-text-primary); font-weight: 500; overflow-wrap: anywhere; }
```

```html
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol class="breadcrumb__list">
    <li class="breadcrumb__item">
      <a class="breadcrumb__link" href="/">Home</a>
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumb__item">
      <a class="breadcrumb__link" href="{{ collection.url }}">{{ collection.title }}</a>
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumb__item">
      <span class="breadcrumb__current" aria-current="page">{{ product.title }}</span>
    </li>
  </ol>
</nav>
```

---

### B9. Popover

Popover is non-modal and has no default ARIA role. A native Button owns the
relationship and the panel uses semantics derived from its actual content.
Capable Web targets should prefer the HTML Popover API for top-layer,
light-dismiss, and close-request behavior; class-driven targets map the same
state through `.popover--open` and implement dismissal/focus restoration.

```html
<button class="btn btn--outline" type="button"
        popovertarget="artwork-details">Artwork details</button>
<div class="popover" id="artwork-details" popover="auto">
  <span class="popover__arrow" aria-hidden="true"></span>
  <p class="popover__title">Stoneware vessel</p>
  <div class="popover__content">
    Hand-thrown and finished with a satin celadon glaze.
  </div>
</div>
```

Do not add `role="dialog"` or `aria-haspopup="dialog"` from appearance alone.
Non-modal Popover preserves natural Tab order; targets own anchor geometry,
collision handling, and controlled/uncontrolled `open` state.
`showArrow` defaults to `true`; when it is false, omit `.popover__arrow` or set
its native `hidden` attribute. The arrow is decorative and does not alter
semantics or behavior. The former Hover Card identity was consolidated into
Popover by ADR 0286; passive destination previews now use this same surface and
must keep the complete information available through an accessible path.

---

### B11. Dropdown Menu

Dropdown Menu v1 is a Button-triggered list of immediate commands. It uses the
APG Menu Button model: focus enters the menu on open, one menuitem owns roving
`tabindex`, arrows/Home/End navigate, Escape returns focus, Tab exits without a
trap, and selection/outside interaction close. Checkable items, radio groups,
submenus, and navigation menus are not part of this v1 contract.

```html
<div class="dropdown dropdown--open">
  <button class="btn btn--outline" id="artwork-actions-trigger" type="button"
          aria-haspopup="menu" aria-expanded="true"
          aria-controls="artwork-actions">Actions</button>
  <div class="dropdown__menu" id="artwork-actions" role="menu"
       aria-labelledby="artwork-actions-trigger">
    <div class="dropdown__group" role="group"
         aria-labelledby="artwork-actions-label">
      <div class="dropdown__label" id="artwork-actions-label">Artwork</div>
      <button class="dropdown__item" type="button" role="menuitem"
              tabindex="0">Edit artwork</button>
      <button class="dropdown__item" type="button" role="menuitem"
              tabindex="-1" aria-disabled="true" data-disabled>
        Export certificate
      </button>
    </div>
    <div class="dropdown__separator" role="separator"></div>
    <div class="dropdown__group" role="group"
         aria-label="Destructive actions">
      <button class="dropdown__item dropdown__item--danger" type="button"
              role="menuitem" tabindex="-1">Delete artwork</button>
    </div>
  </div>
</div>
```

Icons are decorative when a text label exists. Shortcut hints use
`aria-keyshortcuts` only when the shortcut is implemented. Disabled items may
remain in composite focus according to target convention but never activate.

---

## C. GLOBAL COMPONENTS

---

### C1. Header

Sticky site masthead with brand, target-owned navigation and canonical actions. Its existing 48rem compact/expanded threshold follows the Header container rather than the viewport.

#### CSS Contract

```css
.header {
  --_header-bg: var(--color-surface-primary);
  --_header-border: var(--color-border-subtle);
  --_header-text: var(--color-text-primary);
  --_header-link: var(--color-text-secondary);
  --_header-link-hover: var(--color-text-accent);
  --_header-height: var(--space-layout-touch-target);
  --_header-padding: var(--space-layout-element-gap);
  --_header-min-height: 4rem;

  position: sticky;
  inset-block-start: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--_header-padding);
  container-name: header;
  container-type: inline-size;
  padding-inline: var(--space-layout-container);
  min-height: max(var(--_header-height), var(--_header-min-height));
  background: var(--_header-bg);
  border-block-end: 1px solid var(--_header-border);
}

.header__logo {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h3-size);
  color: var(--_header-text);
  text-decoration: none;
}
.header__logo img { height: 32px; width: auto; }

.header__nav {
  display: none; /* Hidden on mobile, shown via breakpoint */
}

.header__nav-link {
  color: var(--_header-link);
  text-decoration: none;
  font-size: var(--typo-body-size);
  font-weight: 500;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: color var(--transition-fast) var(--easing-default),
              border-color var(--transition-fast) var(--easing-default);
}
.header__nav-link:hover,
.header__nav-link[aria-current="page"] {
  color: var(--_header-link-hover);
  border-bottom-color: var(--_header-link-hover);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header__action { position: relative; flex: 0 0 auto; }
.header__hamburger { display: inline-flex; }

.header__cart-count {
  position: absolute;
  inset-block-start: -4px;
  inset-inline-end: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--radius-full);
  background: var(--color-button-primary-bg-default);
  color: var(--color-button-primary-text-default);
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── Responsive ── */
@container header (min-width: 48rem) {
  .header__nav {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  .header__hamburger { display: none; }
}
```

#### Liquid Structure

```html
<!-- sections/header.liquid -->
<header class="header">
  <a class="header__logo" href="/" aria-label="{{ shop.name }}">
    {% if section.settings.logo %}
      {{ section.settings.logo | image_url: width: 200 | image_tag:
         alt: shop.name, loading: 'eager', width: 200 }}
    {% else %}
      {{ shop.name }}
    {% endif %}
  </a>

  <nav class="header__nav" aria-label="Main navigation">
    {% for link in linklists[section.settings.menu].links %}
      {% if link.links.size > 0 %}
        {% render 'mega-menu', link: link %}
      {% else %}
        <a class="header__nav-link" href="{{ link.url }}"
           {% if link.active %}aria-current="page"{% endif %}>
          {{ link.title }}
        </a>
      {% endif %}
    {% endfor %}
  </nav>

  <div class="header__actions">
    <button class="btn btn--outline btn--icon-only header__action"
            type="button" aria-label="Search" data-search-toggle>
      {% render 'icon', name: 'search' %}
    </button>

    <a href="/cart" class="btn btn--outline btn--icon-only header__action"
       aria-label="Cart ({{ cart.item_count }} items)"
       data-cart-toggle>
      {% render 'icon', name: 'shopping-bag' %}
      {% if cart.item_count > 0 %}
        <span class="header__cart-count" data-cart-count aria-hidden="true">{{ cart.item_count }}</span>
      {% endif %}
    </a>

    <button class="btn btn--outline btn--icon-only header__action header__hamburger"
            type="button" aria-label="Menu" aria-expanded="false" data-mobile-menu-toggle>
      {% render 'icon', name: 'menu' %}
    </button>
  </div>
</header>

{% schema %}
{
  "name": "Header",
  "settings": [
    { "type": "image_picker", "id": "logo", "label": "Logo" },
    { "type": "link_list", "id": "menu", "label": "Menu", "default": "main-menu" }
  ]
}
{% endschema %}
```

---

### C2. Announcement Bar

```css
.announcement {
  --_ann-bg: var(--color-surface-statement);
  --_ann-text: var(--color-text-primary);

  background: var(--_ann-bg);
  color: var(--_ann-text);
  text-align: center;
  padding-block: 0.5rem;
  padding-inline: var(--space-layout-container);
  font-size: var(--typo-body-sm-size);
  line-height: var(--typo-body-sm-line-height);
  font-weight: 500;
}

.announcement__link,
.announcement a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

```html
<!-- sections/announcement-bar.liquid -->
{% if section.settings.text != blank %}
<div class="announcement">
  {{ section.settings.text }}
</div>
{% endif %}

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    { "type": "richtext", "id": "text", "label": "Announcement text" }
  ]
}
{% endschema %}
```

---

### C3. Footer

Footer is one body-scoped native content-info landmark. It owns container-responsive
composition and interaction presentation; targets own the actual destinations,
brand context, legal text, locale, and optional services.

```css
.footer {
  container-name: footer;
  container-type: inline-size;
  padding: var(--space-layout-section-gap) var(--space-layout-container);
}
.footer__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-layout-grid-gap);
}
@container footer (min-width: 48rem) {
  .footer__grid {
    grid-template-columns: minmax(0, 2fr) repeat(3, minmax(0, 1fr));
  }
}
```

Use one or more `.footer__group` `nav` regions named by visible
`.footer__heading` elements with `aria-labelledby`. Native lists contain
`.footer__link` anchors. `.footer__brand` and `.footer__bottom` are ordinary
content, not extra navigation landmarks. Do not add a redundant
`role="contentinfo"` to the body-scoped `footer`.

The canonical links keep secondary text at rest and use primary text plus an
accent underline on hover, preserving contrast. Body-small and caption tokens
replace calculated type sizes; long localized content wraps rather than
expanding the container.

---

### C4. Mobile Menu

Mobile Menu is a direct-link navigation list composed as the content slot of
Drawer (B3) with `.drawer--left`. It does not own another `open` property or
duplicate dialog lifecycle.

```html
<div class="drawer-overlay is-open" aria-hidden="false"></div>
<aside class="drawer drawer--left is-open" role="dialog" aria-modal="true"
       aria-labelledby="mobile-menu-title">
    <div class="drawer__header">
      <h2 class="drawer__title" id="mobile-menu-title">Menu</h2>
      <button class="close-btn drawer__close" type="button"
              aria-label="Close mobile menu">
        <span class="close-btn__icon" aria-hidden="true">×</span>
      </button>
    </div>
    <nav class="drawer__body" aria-label="Mobile navigation">
      <ul class="mobile-nav">
        <li class="mobile-nav__item">
          <a class="mobile-nav__link" href="/collections" aria-current="page">Collection</a>
        </li>
        <li class="mobile-nav__item">
          <a class="mobile-nav__link" href="/artists">Artists</a>
        </li>
      </ul>
    </nav>
</aside>
```

Use native `nav > ul > li > a` semantics. Ordinary site navigation is not an
ARIA menu widget: do not add `menu`, `menubar`, `menuitem`, roving focus, or
arrow-key behavior. Drawer owns title, Close Button, focus containment,
`Escape`, inertness, and restoration. The v1 Mobile Menu certifies direct links;
nested disclosures and close-after-navigation policy remain target decisions.

---

### C5. Search Overlay

Search Overlay is a named modal dialog. The visible title, native search form,
native input label, and canonical Close Button are required; results are an
optional target-owned slot.

```html
<div class="search-overlay is-open" role="dialog" aria-modal="true"
     aria-labelledby="search-title">
  <form class="search-box" role="search" action="/search" method="get">
    <div class="search-box__header">
      <h2 class="search-box__title" id="search-title">Search The Gallery</h2>
      <button class="close-btn search-box__close" type="button" aria-label="Close search">
        <span class="close-btn__icon" aria-hidden="true">×</span>
      </button>
    </div>
    <label class="visually-hidden search-box__label" for="search-query">
      Search artists, works, and collections
    </label>
    <input class="search-box__input" id="search-query" type="search" name="q"
           placeholder="Search artists, works, and collections">
    <ul class="search-results" aria-label="Search results">
      <li class="search-results__item">
        <a class="search-result" href="/products/moon-jar">
          <span class="search-result__content">
            <span class="search-result__title">Moon Jar</span>
          </span>
        </a>
      </li>
    </ul>
  </form>
</div>
```

Opening moves focus to the query, contains `Tab` and `Shift+Tab`, and closing
on `Escape` or the named action restores focus logically. Closed content must
not remain focusable. Targets own background inertness, page scroll locking,
provider requests, cancellation, ranking, truthful loading/empty/error status,
and live-announcement policy. Linked results remain native list/link content;
Search Overlay does not imply a combobox.

---

### C6. Cart Drawer

Uses Drawer (B3) and canonical Cart Line Item (K2). Cart Drawer owns only its
compact description-list summary; it must not define a parallel line anatomy.

```html
<aside class="drawer" role="dialog" aria-modal="true"
       aria-labelledby="cart-title" data-cart-drawer>
  <div class="drawer__header">
    <h2 class="drawer__title" id="cart-title">Cart</h2>
    <!-- canonical Close Button -->
  </div>
  <div class="drawer__body">
    <ul class="cart-lines">
      <li class="cart-line">
        <!-- optional media, required identity and Price,
             optional Quantity Selector and Button actions -->
      </li>
    </ul>
  </div>
  <footer class="drawer__footer">
    <dl class="cart-drawer__summary">
      <div class="cart-drawer__summary-row cart-drawer__summary-total">
        <dt>Total</dt>
        <dd><bdi>$204.00</bdi></dd>
      </div>
    </dl>
  </footer>
</aside>
```

Drawer owns modal lifecycle. Cart Line Item owns each record's semantic
composition. The commerce target owns line keys, data, quantities, mutations,
formatted totals, empty/error/status content, focus after removal, checkout, and
persistence.

---

## D. PRODUCT COMPONENTS

---

### D1. Product Card

The primary browsing unit. Appears in collection grids, related products, and
search results. ADRs 0276, 0278, 0279, and 0280 own the current hierarchy, optional
artist line, required Price, compact media-overlay Quick Look request, UI
typography, and stationary Card surface. The
canonical implementation is `components/css/product.css`; the excerpt below
shows only the component-specific profile.

```css
.product-card {
  --_product-card-media-ratio: 1;
  --_product-card-content-inset: 12px;

  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card__media {
  position: relative;
  aspect-ratio: var(--_product-card-media-ratio);
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) var(--easing-out);
}

/* Show second image on hover (lifestyle/detail shot) */
.product-card__image--hover {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity var(--transition-base) var(--easing-default);
}
.product-card:hover .product-card__image--hover { opacity: 1; }
.product-card:hover .product-card__image--primary { transform: scale(1.03); }

.product-card__badges {
  position: absolute;
  inset-block-start: var(--_product-card-content-inset);
  inset-inline-start: var(--_product-card-content-inset);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
}

.product-card__body {
  padding: var(--_product-card-content-inset) var(--_product-card-content-inset) 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.product-card__vendor {
  font-size: calc(var(--typo-body-size) * 0.75);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-card__title {
  font-family: var(--font-family-body);
  font-size: var(--typo-body-size);
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0;
}
.product-card__title a {
  color: inherit;
  text-decoration: none;
}
/* Stretch link to cover entire card */
.product-card__title a::after {
  content: "";
  position: absolute;
  inset: 0;
}

.product-card__description {
  display: -webkit-box;
  margin-top: 10px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  font-size: calc(var(--typo-body-size) * 0.875);
  line-height: var(--typo-body-line-height);
  color: var(--color-text-secondary);
}

.product-card__price {
  padding: var(--_product-card-content-inset) var(--_product-card-content-inset) 0;
  min-width: 0;
}
.product-card__price:last-child {
  padding-bottom: var(--_product-card-content-inset);
}

.product-card__footer {
  padding: var(--_product-card-content-inset);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.product-card__quick-look {
  position: absolute;
  inset-inline-start: var(--_product-card-content-inset);
  inset-block-end: var(--_product-card-content-inset);
  z-index: 2;
  inline-size: max-content;
  max-inline-size: calc(100% - var(--_product-card-content-inset) - var(--_product-card-content-inset));
  opacity: 1;
  pointer-events: auto;
}

@media (hover: hover) and (pointer: fine) {
  .product-card__quick-look {
    opacity: 0;
    pointer-events: none;
    transform: translateY(8px);
  }
  .product-card:hover .product-card__quick-look,
  .product-card:focus-within .product-card__quick-look {
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }
}
```

```html
<!-- snippets/product-card.liquid -->
<article class="product-card card">
  <div class="product-card__media">
    {% if product.available == false %}
      <div class="product-card__badges">
        <span class="badge badge--error">Sold Out</span>
      </div>
    {% elsif product.compare_at_price > product.price %}
      <div class="product-card__badges">
        <span class="badge badge--warning">Sale</span>
      </div>
    {% endif %}

    {{ product.featured_image | image_url: width: 600 | image_tag:
       class: 'product-card__image product-card__image--primary',
       alt: product.title, loading: 'lazy', widths: '300,450,600' }}

    {% if product.images[1] %}
      {{ product.images[1] | image_url: width: 600 | image_tag:
         class: 'product-card__image product-card__image--hover',
         alt: product.title, loading: 'lazy', widths: '300,450,600' }}
    {% endif %}

    <div class="product-card__quick-look">
      <button class="btn btn--sm" type="button"
              aria-label="Quick look at {{ product.title }}"
              data-quick-look="{{ product.handle }}">
        Quick look
      </button>
    </div>
  </div>

  <div class="product-card__body">
    {% if show_vendor != false and product.vendor %}
      <span class="product-card__vendor">{{ product.vendor }}</span>
    {% endif %}
    <h3 class="product-card__title">
      <a href="{{ product.url | within: collection }}">{{ product.title }}</a>
    </h3>
    {% if product.description != blank %}
      <span class="product-card__description">{{ product.description | strip_html }}</span>
    {% endif %}
  </div>

  <div class="product-card__price">
    {% render 'price', product: product %}
  </div>

</article>
```

---

### D2. Product Gallery

Finite product media composition with one featured image, optional thumbnail
Buttons, optional compact pagination and supplementary fine-pointer
magnification. The collection/current index belongs to the target adapter.

```css
.product-gallery {
  container: product-gallery / inline-size;
  min-inline-size: 0;
}

.product-gallery__layout {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@container product-gallery (min-width: 48rem) {
  .product-gallery__layout {
    flex-direction: row-reverse;
    gap: 16px;
  }
}

.product-gallery__main {
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--color-surface-secondary);
}

.product-gallery__main img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) var(--easing-out);
}

@media (hover: hover) and (pointer: fine) {
  @container product-gallery (min-width: 48rem) {
    .product-gallery__main { cursor: zoom-in; }
    .product-gallery__main:hover img { transform: scale(2); }
  }
}

.product-gallery__thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@container product-gallery (min-width: 48rem) {
  .product-gallery__thumbs {
    flex-direction: column;
    inline-size: 80px;
    overflow-y: auto;
    overflow-x: hidden;
    max-block-size: 500px;
  }
}

.product-gallery__thumb {
  inline-size: 64px;
  block-size: 64px;
  flex-shrink: 0;
  padding: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  opacity: 0.6;
}
.product-gallery__thumb[aria-current="true"] {
  border-color: var(--color-border-focus);
  opacity: 1;
}
.product-gallery__thumb img { width: 100%; height: 100%; object-fit: cover; }

.product-gallery__dots {
  display: flex;
  justify-content: center;
}
@container product-gallery (min-width: 48rem) { .product-gallery__dots { display: none; } }

.product-gallery__dot {
  display: grid;
  place-items: center;
  inline-size: var(--space-layout-touch-target);
  block-size: var(--space-layout-touch-target);
  border-radius: var(--radius-full);
  background: transparent;
  border: none;
}
.product-gallery__dot::before {
  content: "";
  inline-size: 8px;
  block-size: 8px;
  border-radius: inherit;
  background: var(--color-border-subtle);
}
.product-gallery__dot[aria-current="true"]::before {
  background: var(--color-text-primary);
}
```

```html
<div class="product-gallery" data-product-gallery>
  <div class="product-gallery__layout">
    <div class="product-gallery__main" data-gallery-main>
      <img src="front.jpg" alt="Celadon vessel, front view">
    </div>
    <div class="product-gallery__thumbs" role="group" aria-label="Product media views">
      <button class="product-gallery__thumb" type="button"
              aria-label="Show product view: Front view" aria-current="true"
              data-gallery-index="0" data-gallery-src="front.jpg"
              data-gallery-alt="Celadon vessel, front view">
        <img src="front-thumb.jpg" alt="">
      </button>
    </div>
    <div class="product-gallery__dots" role="group" aria-label="Product media pages">
      <button class="product-gallery__dot" type="button"
              aria-label="Show product view: Front view" aria-current="true"
              data-gallery-index="0"></button>
    </div>
  </div>
</div>
```

The neutral Web enhancement synchronizes the featured image and current state
only for authored `data-product-gallery` markup. Framework adapters may own
controlled state and omit that marker. See the canonical contract and Shopify
snippet for responsive source and localization details. Video, model, AR and
Lightbox behavior remain target-native composition decisions.

---

### D3. Product Info

Passive product details composition: identity, canonical Price, semantic rich
description, and name-value metadata. Breadcrumb, Rating, Product Form, inventory,
apps, structured data, variant synchronization, and update announcements belong
to the owning product-page or quick-view composition.

```css
.product-info {
  --_product-info-identity-gap: calc(var(--space-layout-element-gap) * 0.25);
  --_product-info-content-gap: calc(var(--space-layout-element-gap) * 0.5);
  display: grid;
  gap: var(--space-layout-element-gap);
  min-inline-size: 0;
}

.product-info .product-info__identity {
  display: grid;
  gap: var(--_product-info-identity-gap);
}

.product-info .product-info__vendor {
  margin: 0;
  font-size: var(--typo-body-sm-size);
  line-height: var(--typo-body-sm-line-height);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  overflow-wrap: anywhere;
}

.product-info .product-info__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h2-size);
  font-weight: 600;
  line-height: var(--typo-h2-line-height);
  color: var(--color-text-primary);
  margin: 0;
  padding: 0;
  border: 0;
  overflow-wrap: anywhere;
}

.product-info .product-info__subtitle {
  margin: 0;
  font-family: var(--font-family-accent);
  font-size: var(--typo-h4-size);
  line-height: var(--typo-h4-line-height);
  color: var(--color-text-secondary);
  font-style: italic;
  overflow-wrap: anywhere;
}

.product-info .product-info__price { overflow-wrap: anywhere; }

.product-info .product-info__description {
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
  color: var(--color-text-secondary);
  overflow-wrap: anywhere;
}

.product-info .product-info__description > :where(h2, h3, h4, p, ul, ol) {
  margin-block: 0;
}

.product-info .product-info__description > :where(h2, h3, h4) {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h4-size);
  font-weight: 600;
  line-height: var(--typo-h4-line-height);
  color: var(--color-text-primary);
}

.product-info .product-info__description > * + * {
  margin-block-start: var(--_product-info-content-gap);
}

.product-info .product-info__description :where(ul, ol) {
  padding-inline-start: 1.25em;
  list-style: revert;
}

.product-info .product-info__description :where(a) {
  color: var(--color-text-primary);
  text-decoration: underline;
}

.product-info .product-info__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 9rem), 1fr));
  gap: var(--_product-info-content-gap) var(--space-layout-element-gap);
  min-inline-size: 0;
  margin: 0;
  font-size: var(--typo-body-sm-size);
  line-height: var(--typo-body-sm-line-height);
  color: var(--color-text-secondary);
}

.product-info .product-info__meta > div {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--_product-info-identity-gap);
}

.product-info .product-info__meta dt,
.product-info .product-info__meta dd {
  min-inline-size: 0;
  overflow-wrap: anywhere;
}

.product-info .product-info__meta dt {
  font-weight: 600;
  color: var(--color-text-primary);
}

.product-info .product-info__meta dd { margin: 0; }
```

```html
<!-- snippets/product-info.liquid -->
<section class="product-info">
  <header class="product-info__identity">
    {% if product.vendor != blank %}
      <p class="product-info__vendor" dir="auto">{{ product.vendor | escape }}</p>
    {% endif %}
    <h1 class="product-info__title" dir="auto">{{ product.title | escape }}</h1>
    {% if product.metafields.custom.subtitle.value != blank %}
      <p class="product-info__subtitle" dir="auto">
        {{ product.metafields.custom.subtitle.value | escape }}
      </p>
    {% endif %}
  </header>

  <div class="product-info__price">
    {% render 'price', product: product %}
  </div>

  {% if product.description != blank %}
    <div class="product-info__description">
      {{ product.description }}
    </div>
  {% endif %}

  {% if product.metafields.custom.dimensions.value != blank %}
  <dl class="product-info__meta">
    <div>
      <dt>{{ 'products.meta.dimensions' | t }}</dt>
      <dd dir="auto">{{ product.metafields.custom.dimensions.value | escape }}</dd>
    </div>
  </dl>
  {% endif %}
</section>
```

The production Shopify snippet conditionally maps all supported metadata fields.
The shortened example demonstrates the required semantic group. Product-wide
versus selected-variant Price and one live-update announcement policy remain
target-owned decisions.

---

### D4. Variant Selector

Composes product options as native fieldset/legend radio groups. Swatches and
pills share the same native value, keyboard, event, validity, FormData, and reset
owner. Commercial unavailability is independent from native `disabled`; the
owning product target resolves complete combinations and coordinated updates.

```css
.variant-selector {
  --_variant-gap: calc(var(--space-layout-element-gap) * 0.5);
  --_variant-option-gap: calc(var(--space-layout-element-gap) * 0.25);
  display: grid;
  gap: var(--_variant-gap);
  min-inline-size: 0;
}

.variant-selector__group {
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}
.variant-selector__legend {
  margin-block-end: var(--_variant-option-gap);
  padding: 0;
  font-family: var(--font-family-body);
  font-size: var(--typo-body-size);
  line-height: var(--typo-body-line-height);
  font-weight: 600;
}
.variant-selector__selection { font-weight: 400; color: var(--color-text-secondary); }

.variant-swatches,
.variant-pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--_variant-option-gap);
}

.variant-swatch {
  position: relative;
  display: grid;
  place-items: center;
  inline-size: var(--space-layout-touch-target);
  block-size: var(--space-layout-touch-target);
}
.variant-swatch__input,
.variant-pill__input {
  position: absolute;
  inline-size: 1px;
  block-size: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
.variant-pill {
  position: relative;
  display: inline-grid;
  place-items: center;
  min-inline-size: var(--space-layout-touch-target);
  min-block-size: var(--space-layout-touch-target);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
}
```

```html
<!-- snippets/variant-selector.liquid -->
{% for option in product.options_with_values %}
  <fieldset class="variant-selector__group">
    <legend class="variant-selector__legend">
      <span class="variant-selector__label">{{ option.name | escape }}</span>:
      <span class="variant-selector__selection" aria-hidden="true" data-selected-value>
        {{ option.selected_value | escape }}
      </span>
    </legend>

    <div class="variant-pills">
      {% for option_value in option.values %}
        <label class="variant-pill{% unless option_value.available %} variant-pill--unavailable{% endunless %}">
          <input class="variant-pill__input" type="radio"
                 name="options[{{ option.name | escape }}]"
                 value="{{ option_value.name | escape }}"
                 data-option-value-id="{{ option_value.id }}"
                 {% if option_value.selected %}checked{% endif %} required>
          <span class="variant-pill__label">{{ option_value.name | escape }}</span>
          {% unless option_value.available %}
            <span class="variant-selector__option-status">, {{ 'products.options.unavailable' | t }}</span>
          {% endunless %}
        </label>
      {% endfor %}
    </div>
  </fieldset>
{% endfor %}
```

The production Shopify snippet chooses swatch presentation from native swatch
data and carries contextual option-value metadata. It intentionally does not
disable every unavailable value. One target controller must still reconcile all
groups and synchronize Product Form, URL, Price, media, inventory, selling plans,
and a single localized update status. See ADR 0116.

---

### D5. Add to Cart (Product Form)

```css
.product-form {
  --_product-form-gap: var(--space-layout-element-gap);
  display: grid;
  gap: var(--_product-form-gap);
  min-inline-size: 0;
}

.product-form > .variant-selector,
.product-form > .qty,
.product-form__actions {
  min-inline-size: 0;
}

.product-form > .qty {
  justify-self: start;
}

.product-form__message {
  margin: 0;
  overflow-wrap: anywhere;
}

.product-form__actions {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--_product-form-gap) * 0.75);
}

.product-form__submit {
  flex: 1 1 16rem;
  min-inline-size: min(100%, 12rem);
}
```

```html
<form class="product-form" action="/cart/add" method="post">
  <!-- Canonical Variant Selector and Quantity Selector compositions -->
  <input type="hidden" name="merchandise" value="resolved-id">
  <div class="product-form__actions">
    <button class="btn btn--lg product-form__submit"
            type="submit" name="intent" value="add">
      Add to cart
    </button>
  </div>
</form>
```

Product Form is the native purchase-submission boundary, not a product-state
store. Named canonical children own their current values, validity and reset.
One target coordinator must resolve option groups to a purchasable merchandise
identifier and synchronize availability, quantity rules, Price, media, inventory,
URL, selling plans, pending state and target feedback before submission.

The target may allow native navigation or intercept the same `FormData`. Ajax,
Cart Drawer updates, errors, retry, focus, announcements and analytics remain
target-owned. Product Form does not repeat the Price owned by Product Info.

---

### D6. Related Products / Recently Viewed

```css
.product-slider {
  position: relative;
}

.product-slider__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-layout-element-gap);
}

.product-slider__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h3-size);
  color: var(--color-text-primary);
}

.product-slider__nav { display: flex; gap: 8px; }

.product-slider__track {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(50% - 8px);
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.product-slider__track::-webkit-scrollbar { display: none; }
.product-slider__track > * { scroll-snap-align: start; }

@media (min-width: 768px) {
  .product-slider__track { grid-auto-columns: calc(33.333% - 11px); }
}
@media (min-width: 1024px) {
  .product-slider__track { grid-auto-columns: calc(25% - 12px); }
}
```

```html
<!-- sections/related-products.liquid -->
<section class="product-slider" aria-label="Related products">
  <div class="product-slider__header">
    <h2 class="product-slider__title">{{ section.settings.title | default: 'You may also like' }}</h2>
    <div class="product-slider__nav">
      <button class="btn btn--outline btn--icon-only btn--sm"
              aria-label="Previous" data-slider-prev>
        {% render 'icon', name: 'chevron-left' %}
      </button>
      <button class="btn btn--outline btn--icon-only btn--sm"
              aria-label="Next" data-slider-next>
        {% render 'icon', name: 'chevron-right' %}
      </button>
    </div>
  </div>

  <div class="product-slider__track" data-slider-track>
    {% for product in recommendations.products limit: 8 %}
      {% render 'product-card', product: product %}
    {% endfor %}
  </div>
</section>
```

---

## E. COLLECTION COMPONENTS

---

### E1. Collection Hero

```css
.collection-hero {
  --_hero-bg: var(--color-surface-archival);
  --_hero-text: var(--color-text-primary);

  position: relative;
  padding: var(--space-layout-section-gap) var(--space-layout-container);
  background: var(--_hero-bg);
  text-align: center;
  overflow: hidden;
}

.collection-hero--with-image {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.collection-hero--with-image::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
.collection-hero--with-image .collection-hero__content { z-index: 2; }
.collection-hero--with-image { --_hero-text: var(--color-text-inverse); }

.collection-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.collection-hero__content { max-width: 680px; margin: 0 auto; }

.collection-hero__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-display-size);
  line-height: var(--typo-display-line-height);
  color: var(--_hero-text);
  margin: 0 0 16px;
}

.collection-hero__description {
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
  color: var(--_hero-text);
  opacity: 0.9;
}

.collection-hero__count {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--_hero-text);
  opacity: 0.7;
  margin-top: 12px;
}
```

```html
<!-- sections/collection-hero.liquid -->
<section class="collection-hero {% if collection.image %}collection-hero--with-image{% endif %}">
  {% if collection.image %}
    {{ collection.image | image_url: width: 1920 | image_tag:
       class: 'collection-hero__image', alt: collection.title,
       loading: 'eager', widths: '768,1024,1440,1920',
       sizes: '100vw' }}
  {% endif %}
  <div class="collection-hero__content">
    <h1 class="collection-hero__title">{{ collection.title }}</h1>
    {% if collection.description != blank %}
      <div class="collection-hero__description">{{ collection.description }}</div>
    {% endif %}
    <p class="collection-hero__count">{{ collection.products_count }} pieces</p>
  </div>
</section>
```

---

### E2. Collection Grid

```css
.collection-grid {
  --_collection-grid-columns: var(--grid-columns, 4);
  container: collection-grid / inline-size;
}

.collection-grid__items {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-layout-grid-gap);
  margin: 0;
  padding: var(--space-layout-section-gap) var(--space-layout-container);
  list-style: none;
}

.collection-grid__item { min-inline-size: 0; }

@container collection-grid (min-width: 20rem) {
  .collection-grid__items { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@container collection-grid (min-width: 48rem) {
  .collection-grid__items { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@container collection-grid (min-width: 64rem) {
  .collection-grid__items {
    grid-template-columns: repeat(var(--_collection-grid-columns), minmax(0, 1fr));
  }
}
```

Use a neutral root with a native `ul.collection-grid__items` and one
`li.collection-grid__item` per canonical Product Card. This is a passive
document list, not an ARIA grid widget; filtering, sorting, pagination, empty
recovery and result announcements belong to the parent or target adapter.

---

### E3. Filter Panel

Filter Panel is one named native GET form and one canonical control tree. The
same tree is an adjacent non-modal panel when its own container is coherent and
a canonical modal Drawer when constrained. Never render separate desktop and
mobile forms, and never use viewport width as the sole switch.

```html
<div class="filter-panel filter-panel--immediate"
     data-filter-panel data-commit-mode="immediate">
  <div class="filter-panel__toolbar">
    <button class="btn filter-panel__trigger" type="button"
            aria-haspopup="dialog" aria-controls="filters-surface"
            aria-expanded="false" data-filter-panel-trigger>
      Filters
    </button>
  </div>

  <ul class="filter-panel__active" aria-label="Active filters">
    <li class="filter-panel__active-item">
      <span class="tag">
        <span class="tag__label">Stoneware</span>
        <button class="tag__remove" type="button"
                aria-label="Remove Stoneware"></button>
      </span>
    </li>
  </ul>

  <div class="filter-panel__layout">
    <div class="drawer-overlay filter-panel__overlay"
         data-filter-panel-overlay aria-hidden="true"></div>
    <div class="drawer drawer--left filter-panel__surface"
         id="filters-surface" data-filter-panel-surface
         aria-labelledby="filters-title">
      <header class="drawer__header filter-panel__header">
        <h2 class="drawer__title filter-panel__title"
            id="filters-title">Filter works</h2>
        <button class="close-btn drawer__close filter-panel__close"
                type="button" aria-label="Close filters"
                data-filter-panel-close></button>
      </header>
      <form class="filter-panel__form" action="/collection" method="get"
            aria-label="Filter works">
        <div class="drawer__body filter-panel__body">
          <fieldset class="filter-group">
            <legend class="filter-group__title">Material</legend>
            <div class="filter-group__options">
              <label class="checkbox">
                <input class="checkbox__input" type="checkbox"
                       name="filter.material" value="stoneware">
                <span class="checkbox__label">Stoneware</span>
              </label>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
    <div class="filter-panel__results"><!-- target results --></div>
  </div>
</div>
```

Expose `immediate | manual` commitment, with Immediate default. Manual mode adds
canonical Apply and Cancel actions around one target-owned draft projection.
The target owns filter data, query serialization, URL/history, requests,
pending/error/empty status, result replacement, focus and pagination reset.
Groups remain visible in v1; sort and result count belong to the parent
collection composition. See ADR 0250 and the component contract for the full
surface and event lifecycle.

---

### E4. Pagination

```css
.pagination {
  padding: var(--space-layout-section-gap) 0;
}

.pagination__list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}

.pagination__list,
.pagination__item {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pagination__link,
.pagination__current {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--space-button-min-height);
  height: var(--space-button-min-height);
  padding: 0 12px;
  border-radius: var(--radius-md);
  font-size: var(--typo-body-size);
  text-decoration: none;
}

.pagination__link {
  color: var(--color-text-secondary);
}
.pagination__link:hover {
  background: var(--color-surface-secondary);
}

.pagination__current {
  background: var(--color-button-primary-bg-default);
  color: var(--color-button-primary-text-default);
  font-weight: 600;
}

.pagination__ellipsis {
  color: var(--color-text-disabled);
  padding: 0 8px;
}

.pagination:dir(rtl) svg { scale: -1 1; }
```

```html
{% if paginate.pages > 1 %}
<nav class="pagination" aria-label="Pagination" data-current-page="{{ paginate.current_page }}">
  <ul class="pagination__list">
    {% if paginate.previous %}
      <li class="pagination__item">
        <a class="link link--subtle pagination__link" href="{{ paginate.previous.url }}" aria-label="Previous page">
          {% render 'icon', name: 'chevron-left', size: 16 %}
        </a>
      </li>
    {% endif %}

    {% for part in paginate.parts %}
      {% if part.is_link %}
        <li class="pagination__item"><a class="link link--subtle pagination__link" href="{{ part.url }}">{{ part.title }}</a></li>
      {% elsif part.title == paginate.current_page %}
        <li class="pagination__item"><span class="pagination__current" aria-current="page">{{ part.title }}</span></li>
      {% else %}
        <li class="pagination__item" aria-hidden="true"><span class="pagination__ellipsis" aria-hidden="true">…</span></li>
      {% endif %}
    {% endfor %}

    {% if paginate.next %}
      <li class="pagination__item">
        <a class="link link--subtle pagination__link" href="{{ paginate.next.url }}" aria-label="Next page">
          {% render 'icon', name: 'chevron-right', size: 16 %}
        </a>
      </li>
    {% endif %}
  </ul>
</nav>
{% endif %}
```

---

## F. ART & STORYTELLING COMPONENTS

These are what differentiate "The Gallery" from a generic Shopify store.

---

### F1. Artist Profile

Showcases the maker behind the pieces. Storytelling is critical for artisan e-commerce.

```css
.artist-profile {
  padding: var(--space-layout-section-gap) var(--space-layout-container);
  background: var(--color-surface-archival);
  color: var(--color-text-secondary);
  container-type: inline-size;
}

.artist-profile__layout {
  display: grid;
  gap: var(--space-layout-grid-gap);
}

@container (min-width: 36rem) {
  .artist-profile__layout--split {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
  }
}

.artist-profile__portrait {
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.artist-profile__portrait img { width: 100%; height: 100%; object-fit: cover; }

.artist-profile__content {
  min-width: 0;
  overflow-wrap: anywhere;
  display: grid;
  gap: var(--space-layout-element-gap);
}

.artist-profile__label {
  font-size: var(--typo-caption-size);
  line-height: var(--typo-caption-line-height);
  font-weight: var(--tg-typography-body-caption-weight);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.artist-profile .artist-profile__name {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: var(--font-family-heading);
  font-size: var(--typo-h2-size);
  line-height: var(--typo-h2-line-height);
  font-weight: var(--tg-typography-h2-weight);
  color: var(--color-text-primary);
}

.artist-profile__location {
  font-size: var(--typo-body-size);
  line-height: var(--typo-body-line-height);
}

.artist-profile__bio {
  display: grid;
  gap: 1em;
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
}

.artist-profile__philosophy {
  font-family: var(--font-family-accent);
  font-size: var(--typo-h4-size);
  line-height: var(--typo-h4-line-height);
  font-style: italic;
  color: color-mix(in srgb, var(--color-text-accent) 70%, var(--color-text-primary));
  border-inline-start: 3px solid var(--color-border-decorative);
  padding-inline-start: var(--space-layout-element-gap);
}

.artist-profile__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-layout-element-gap);
}
```

```html
{% liquid
  assign artist_name = section.settings.name
  if artist_name == blank
    assign artist_name = 'artist_profile.default_name' | t
  endif
  assign portrait_alt = section.settings.portrait.alt | default: artist_name
  if section.settings.portrait_decorative
    assign portrait_alt = ''
  endif
  assign action_label = section.settings.cta_text
  if action_label == blank
    assign action_label = 'artist_profile.default_action' | t
  endif
  assign heading_id = 'ArtistProfile-' | append: section.id | append: '-Name'
%}

<section class="artist-profile" aria-labelledby="{{ heading_id }}">
  <div class="artist-profile__layout{% if section.settings.portrait != blank %} artist-profile__layout--split{% endif %}">
    {% if section.settings.portrait != blank %}
      <div class="artist-profile__portrait">
        {{ section.settings.portrait | image_url: width: 1200 | image_tag:
          alt: portrait_alt,
          loading: 'lazy',
          widths: '360, 540, 720, 960, 1200',
          sizes: '(min-width: 768px) 50vw, 100vw'
        }}
      </div>
    {% endif %}

    <div class="artist-profile__content">
      {% if section.settings.label != blank %}
        <p class="artist-profile__label">{{ section.settings.label | escape }}</p>
      {% endif %}
      <h2 class="artist-profile__name" id="{{ heading_id }}">{{ artist_name | escape }}</h2>
      {% if section.settings.location != blank %}
        <p class="artist-profile__location">{{ section.settings.location | escape }}</p>
      {% endif %}
      {% if section.settings.bio != blank %}
        <div class="artist-profile__bio">{{ section.settings.bio }}</div>
      {% endif %}
      {% if section.settings.philosophy != blank %}
        <blockquote class="artist-profile__philosophy">{{ section.settings.philosophy | escape }}</blockquote>
      {% endif %}
      {% if section.settings.cta_url != blank %}
        <div class="artist-profile__actions">
          <a class="btn btn--outline" href="{{ section.settings.cta_url }}">{{ action_label | escape }}</a>
        </div>
      {% endif %}
    </div>
  </div>
</section>

{% schema %}
{
  "name": "t:sections.artist_profile.name",
  "settings": [
    { "type": "image_picker", "id": "portrait", "label": "t:sections.artist_profile.settings.portrait" },
    { "type": "checkbox", "id": "portrait_decorative", "label": "t:sections.artist_profile.settings.portrait_decorative", "default": false },
    { "type": "text", "id": "label", "label": "t:sections.artist_profile.settings.label" },
    { "type": "text", "id": "name", "label": "t:sections.artist_profile.settings.name" },
    { "type": "text", "id": "location", "label": "t:sections.artist_profile.settings.location" },
    { "type": "richtext", "id": "bio", "label": "t:sections.artist_profile.settings.biography" },
    { "type": "textarea", "id": "philosophy", "label": "t:sections.artist_profile.settings.philosophy" },
    { "type": "url", "id": "cta_url", "label": "t:sections.artist_profile.settings.action_url" },
    { "type": "text", "id": "cta_text", "label": "t:sections.artist_profile.settings.action_label" }
  ],
  "presets": [{ "name": "t:sections.artist_profile.name" }]
}
{% endschema %}
```

---

### F2. Process Timeline

Passive ordered narrative from raw material to finished work. The canonical CSS
is `components/css/storytelling.css`; the semantic contract is
`components/contracts/process-timeline.contract.json`, and ADR 0124 owns the
intrinsic one-row lane decision.

The root is a native section named by its visible contextual heading. The track
is a native ordered list with direct list items. Equal implicit tracks share
available inline space above a private readable minimum; when supplied steps do
not fit, only the track scrolls horizontally with native snap. Do not reintroduce
viewport breakpoints, wrapped grid rows, custom scrollbars, synthetic scroll-key
handlers, progress/current-step state, or target-neutral process records.

Step titles are required; image and description regions are optional and omitted
when absent. The visible marker mirrors native list order and uses
`aria-hidden="true"` to prevent duplicate announcement. Images retain
target-authored informative or decorative alternatives. The logical connector
is decorative and never carries sequence alone.

```html
<section class="process-timeline" aria-labelledby="process-title">
  <h2 class="process-timeline__title" id="process-title">From earth to kiln</h2>
  <ol class="process-timeline__track" role="list" tabindex="0" aria-labelledby="process-title">
    <li class="process-step">
      <span class="process-step__number" aria-hidden="true">1</span>
      <div class="process-step__image">
        <img src="gather.jpg" alt="Local clay and mineral samples on a worktable">
      </div>
      <h3 class="process-step__title">Gather</h3>
      <p class="process-step__description">Local minerals are selected for body and glaze.</p>
    </li>
    <li class="process-step">
      <span class="process-step__number" aria-hidden="true">2</span>
      <h3 class="process-step__title">Form</h3>
    </li>
  </ol>
</section>
```

Shopify implements the same anatomy in
`platforms/shopify/sections/process-timeline.liquid`:

- one merchant-reorderable section block per direct `li`;
- `block.shopify_attributes` on that item;
- target-unique section/track/heading association;
- optional image and description omission;
- media-library alt fallback plus an explicit decorative-image setting;
- localized schema labels and title/step fallbacks;
- no section JavaScript or target-owned scroll state.

---

### F3. Certificate of Authenticity

Passive, self-contained presentation for a target-owned certificate record.
Certificate does not create or validate records, signatures, verification
destinations, proof, issuer trust, or authenticity guarantees.

The required title names a native `article`. Optional metadata uses a native
`dl` with direct grouped `dt`/`dd` pairs. A signature is rendered only from a
real target-owned signature value. Verification is rendered only as a native
descriptive link when the target supplies a real destination; optional QR or
other media is redundant to the visible link text.

```html
<article class="coa" aria-labelledby="certificate-title">
  <p class="coa__header">Certificate of authenticity</p>
  <h2 class="coa__title" id="certificate-title">Moon Jar No. 07</h2>
  <p class="coa__artist">Marina Paz</p>
  <div class="coa__divider" aria-hidden="true"></div>
  <dl class="coa__details">
    <div class="coa__detail">
      <dt class="coa__detail-label">Medium</dt>
      <dd class="coa__detail-value">Stoneware and ash glaze</dd>
    </div>
    <div class="coa__detail">
      <dt class="coa__detail-label">Record</dt>
      <dd class="coa__detail-value">TG-MP-2026-007</dd>
    </div>
  </dl>
  <p class="coa__signature" aria-label="Signature: Marina Paz">Marina Paz</p>
  <a class="coa__verification" href="/certificates/TG-MP-2026-007">
    <span class="coa__qr" aria-hidden="true"><!-- target media --></span>
    <span class="coa__verify">View certificate record TG-MP-2026-007</span>
  </a>
</article>
```

`.coa` is an inline-size container. Its detail grid changes intrinsically
between two and one columns without depending on the page viewport. Complete
typography, spacing, description-list resets, link focus, forced-color support,
and content containment live in `components/css/storytelling.css`.

Shopify implements the same boundary in
`platforms/shopify/snippets/certificate-of-authenticity.liquid`:

- current product/metafield facts map to localized native detail groups;
- the product vendor remains attribution and is never relabelled as signature;
- signature and verification inputs are explicit optional target parameters;
- no third-party QR request or generated authenticity claim is emitted;
- missing detail, signature, verification, or media regions are omitted.

---

### F4. Collection Story

Collection Story presents one focused narrative as a native section associated
with its visible contextual heading. The required inner
`.collection-story__layout` owns responsive composition; add
`.collection-story__layout--with-media` only when the optional media region is
present. The root is a named inline-size container, so the media/text split is
based on the component's actual host width instead of the page viewport.

`reversed` remains a boolean visual-layout property through
`.collection-story--reversed`. It changes only the intrinsic two-column visual
placement and never changes media-before-content source order. Without media,
the narrative stays one centered capped column and no empty grid track is
reserved.

Use the contextual heading for `aria-labelledby`, target-authored informative
or empty image alt, `blockquote` only for a genuine quotation, and an ordinary
action group composed from canonical Button or native target controls. Optional
media, label, quotation, and actions are omitted completely when absent.
Collection Story has no local state or JavaScript runtime.

Shopify implements the same boundary in
`platforms/shopify/sections/collection-story.liquid`: localized editor settings,
merchant image alt/decorative intent and focal-point preservation, conditional
anatomy, a target-unique heading id, canonical Button action and source-safe
visual reversal. The action slot remains target-owned; ADR 0080 requires explicit
human/product review before adding a formal public Button dependency.

---

### F5. Gallery / Masonry View

Art-first presentation, larger images than standard product grid.

```css
.masonry-gallery {
  padding: var(--space-layout-section-gap) var(--space-layout-container);
  columns: 1;
  column-gap: var(--space-layout-grid-gap);
}
@media (min-width: 768px)  { .masonry-gallery { columns: 2; } }
@media (min-width: 1024px) { .masonry-gallery { columns: 3; } }

.masonry-gallery__item {
  break-inside: avoid;
  margin-bottom: var(--space-layout-grid-gap);
}

.gallery-piece {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: pointer;
}

.gallery-piece img {
  width: 100%;
  display: block;
  transition: transform var(--transition-slow) var(--easing-out);
}
.gallery-piece:hover img { transform: scale(1.02); }

.gallery-piece__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity var(--transition-base) var(--easing-default);
}
.gallery-piece:hover .gallery-piece__overlay { opacity: 1; }

.gallery-piece__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-body-size);
  color: var(--color-text-inverse);
  font-weight: 500;
}

.gallery-piece__price {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-inverse);
  opacity: 0.8;
}
```

---

## G. MARKETING COMPONENTS

---

### G1. Hero Banner

```css
.hero {
  --_hero-min-h: 400px;
  --_hero-text: var(--color-text-inverse);

  position: relative;
  min-height: var(--_hero-min-h);
  display: flex;
  align-items: center;
  padding: var(--space-layout-section-gap) var(--space-layout-container);
  overflow: hidden;
}

@media (min-width: 768px) { .hero { --_hero-min-h: 560px; } }
@media (min-width: 1024px) { .hero { --_hero-min-h: 640px; } }

.hero__media {
  position: absolute;
  inset: 0;
}
.hero__media img,
.hero__media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 100%);
}

.hero__content {
  position: relative;
  z-index: 1;
  max-width: 560px;
}

.hero__label {
  font-size: calc(var(--typo-body-size) * 0.75);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--_hero-text);
  opacity: 0.8;
  margin-bottom: 12px;
}

.hero__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-display-size);
  line-height: var(--typo-display-line-height);
  color: var(--_hero-text);
  margin: 0 0 16px;
}

.hero__description {
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
  color: var(--_hero-text);
  opacity: 0.9;
  margin-bottom: 24px;
}

.hero__actions { display: flex; flex-wrap: wrap; gap: 12px; }
```

```html
<!-- sections/hero.liquid -->
<section class="hero">
  <div class="hero__media">
    {% if section.settings.video %}
      {{ section.settings.video | video_tag: autoplay: true, loop: true,
         muted: true, playsinline: true }}
    {% elsif section.settings.image %}
      {{ section.settings.image | image_url: width: 1920 | image_tag:
         alt: section.settings.title, loading: 'eager',
         widths: '768,1024,1440,1920', sizes: '100vw',
         fetchpriority: 'high' }}
    {% endif %}
  </div>
  <div class="hero__overlay"></div>
  <div class="hero__content">
    {% if section.settings.label %}
      <p class="hero__label">{{ section.settings.label }}</p>
    {% endif %}
    <h1 class="hero__title">{{ section.settings.title }}</h1>
    {% if section.settings.description %}
      <p class="hero__description">{{ section.settings.description }}</p>
    {% endif %}
    <div class="hero__actions">
      {% if section.settings.cta_url %}
        <a href="{{ section.settings.cta_url }}" class="btn btn--lg">
          {{ section.settings.cta_text | default: 'Shop Now' }}
        </a>
      {% endif %}
      {% if section.settings.cta2_url %}
        <a href="{{ section.settings.cta2_url }}" class="btn btn--outline btn--lg"
           style="--_btn-text: var(--color-text-inverse); --_btn-border: var(--color-text-inverse);">
          {{ section.settings.cta2_text }}
        </a>
      {% endif %}
    </div>
  </div>
</section>
```

---

### G2. Newsletter Signup

```css
.newsletter {
  --_newsletter-bg: var(--color-surface-secondary);

  padding: var(--space-layout-section-gap) var(--space-layout-container);
  background: var(--_newsletter-bg);
  text-align: center;
}

.newsletter__content { max-width: 500px; margin: 0 auto; }

.newsletter__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h3-size);
  color: var(--color-text-primary);
  margin: 0 0 8px;
}

.newsletter__description {
  font-size: var(--typo-body-size);
  color: var(--color-text-secondary);
  margin-bottom: 24px;
}

.newsletter__form {
  display: flex;
  gap: 8px;
}

.newsletter__input {
  flex: 1;
  /* Extends .input__field */
}

.newsletter__note {
  font-size: calc(var(--typo-body-size) * 0.75);
  color: var(--color-text-disabled);
  margin-top: 12px;
}
```

```html
<!-- sections/newsletter.liquid -->
<section class="newsletter">
  <div class="newsletter__content">
    <h2 class="newsletter__title">{{ section.settings.title | default: 'From the Studio' }}</h2>
    <p class="newsletter__description">
      {{ section.settings.description | default: 'New pieces, process stories, and studio updates.' }}
    </p>
    {% form 'customer', id: 'newsletter-form' %}
      <input type="hidden" name="contact[tags]" value="newsletter">
      <div class="newsletter__form">
        <input class="input__field newsletter__input" type="email"
               name="contact[email]" placeholder="Your email"
               aria-label="Email address" required autocomplete="email">
        <button class="btn" type="submit">Subscribe</button>
      </div>
    {% endform %}
    <p class="newsletter__note">No spam. Unsubscribe anytime.</p>
  </div>
</section>
```

---

### G3. Testimonials

```css
.testimonials {
  padding: var(--space-layout-section-gap) var(--space-layout-container);
}

.testimonials__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h2-size);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-layout-section-gap);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-layout-grid-gap);
}
@media (min-width: 768px) { .testimonials__grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .testimonials__grid { grid-template-columns: repeat(3, 1fr); } }

.testimonial {
  padding: 24px;
  background: var(--color-surface-secondary);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.testimonial__quote {
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
  color: var(--color-text-primary);
  font-style: italic;
}
.testimonial__quote::before { content: "\201C"; font-size: 2em; line-height: 0; color: var(--color-text-accent); }

.testimonial__author {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
}

.testimonial__name {
  font-weight: 600;
  font-size: var(--typo-body-size);
  color: var(--color-text-primary);
}

.testimonial__detail {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-secondary);
}
```

---

## Utility Classes

```css
/* ── Visually hidden (accessible) ── */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ── Container ── */
.container {
  width: 100%;
  max-width: var(--space-layout-container);
  margin: 0 auto;
  padding: 0 16px;
}

/* ── Section spacing ── */
.section { padding: var(--space-layout-section-gap) 0; }

/* ── Text alignment ── */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

/* ── Skip to content (accessibility) ── */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 12px 24px;
  background: var(--color-surface-statement);
  color: var(--color-text-inverse);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
  font-weight: 600;
  text-decoration: none;
  transition: top var(--transition-fast) var(--easing-default);
}
.skip-link:focus { top: 0; }
```

---

## Shopify Section Schema Summary

For the Shopify theme customizer, every section should expose relevant settings. Here is the recommended `{% schema %}` structure for key sections:

| Section | Key Settings | Blocks |
|---------|-------------|--------|
| Header | logo, menu link_list | — |
| Announcement Bar | text (richtext) | — |
| Hero | image/video, title, description, 2 CTAs | — |
| Collection Hero | (auto from collection object) | — |
| Collection Grid | columns, products_per_page | — |
| Product Page | (composed of snippets) | — |
| Artist Profile | portrait, name, location, bio, quote, CTA | — |
| Process Timeline | title | step (image, title, description) |
| Collection Story | image, label, title, text, quote, CTA, reverse | — |
| Newsletter | title, description | — |
| Testimonials | title | testimonial (quote, author name, detail, avatar) |
| Related Products | title, collection override | — |
| Footer | menu link_lists, social links, payment icons | column (heading, menu) |

---

## File Organization

```
theme/
├── assets/
│   ├── base.css              /* Reset, tokens import, utilities */
│   ├── primitives.css        /* UI primitives: btn, input, select, etc. */
│   ├── layout-primitives.css /* card, modal, drawer, toast, accordion, tabs */
│   ├── global.css            /* header, footer, announcement, mobile-menu, search */
│   ├── product.css           /* product-card, gallery, info, variant-selector, form */
│   ├── collection.css        /* collection-hero, grid, filters, pagination */
│   ├── storytelling.css      /* artist, process, coa, collection-story, masonry */
│   └── marketing.css         /* hero, newsletter, testimonials */
├── sections/
│   ├── header.liquid
│   ├── announcement-bar.liquid
│   ├── hero.liquid
│   ├── collection-hero.liquid
│   ├── artist-profile.liquid
│   ├── process-timeline.liquid
│   ├── collection-story.liquid
│   ├── newsletter.liquid
│   ├── testimonials.liquid
│   ├── related-products.liquid
│   └── footer.liquid
├── snippets/
│   ├── icon.liquid
│   ├── product-card.liquid
│   ├── product-gallery.liquid
│   ├── product-info.liquid
│   ├── product-form.liquid
│   ├── variant-selector.liquid
│   ├── price.liquid
│   ├── rating.liquid
│   ├── quantity-selector.liquid
│   ├── breadcrumb.liquid
│   ├── certificate-of-authenticity.liquid
│   ├── cart-drawer.liquid
│   ├── mobile-menu.liquid
│   ├── search-overlay.liquid
│   └── empty-state.liquid
└── layout/
    └── theme.liquid           /* Loads all CSS, includes header/footer -->
```

---

## Token Dependency Summary

Every token referenced in this document must exist in the system. Here is the complete list:

### Theme Layer (~205 tokens, verified)
All `--color-surface-*`, `--color-text-*`, `--color-border-*`, `--color-feedback-*`, `--shadow-*`, `--color-button-*`, and `--color-input-*` tokens are used throughout.

### Breakpoints Layer (111 + ~25 new = ~136 tokens)
All `--typo-*`, `--space-layout-*`, `--grid-*`, `--space-input-*` tokens are used. **New tokens to add:**
- `--space-button-padding-x`
- `--space-button-padding-y`
- `--space-button-min-height`
- `--space-button-gap`
- `--space-button-icon-size`

### Primitives (static, always available)
`--font-family-{body,heading,accent,mono}`, `--radius-{none,sm,md,lg,full}`, `--opacity-{disabled,overlay}`, `--transition-{fast,base,slow}`, `--easing-{default,in,out}`, `--z-{dropdown,sticky,overlay,modal,toast}`
