# COMPONENTS.md — The Gallery Design System

> **Purpose**: Complete component specification for "The Gallery," a ceramic art e-commerce Shopify store. This document is the single source of truth for generating production-ready CSS and Liquid markup. Every component maps exclusively to Theme tokens (colors) and Breakpoint tokens (layout) — there is NO component token layer.

> **For AI agents**: Use this document to generate CSS with `--_` private custom property contracts, semantic HTML with BEM naming, and Shopify Liquid integration. Every token reference is explicit. Do not invent tokens — use only what is documented here.

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
| `--space-button-padding-y` | 10px | 10px | 12px | 12px |
| `--space-button-min-height` | 44px | 44px | 40px | 40px |
| `--space-button-gap` | 8px | 8px | 8px | 8px |
| `--space-button-icon-size` | 18px | 18px | 20px | 20px |
| `--typo-button-size` | 16px | 16px | 16px | 16px |
| `--typo-button-weight` | 600 | 600 | 600 | 600 |
| `--radius-button` | 8px | 8px | 8px | 8px |
| `--transition-button-duration` | 100ms | 100ms | 100ms | 100ms |

### Static Tokens (from Primitives, not theme/breakpoint dependent)

```
--font-family-body          /* Primary sans-serif */
--font-family-heading       /* Display serif */
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
| E | Collection | Collection Hero, Collection Grid, Collection Filters, Pagination |
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
  border: 1.5px solid var(--_check-border);
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
  outline: 4px solid var(--_check-focus);
  outline-offset: 0;
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
  outline: 4px solid var(--_radio-focus);
  outline-offset: 0;
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
  --_badge-radius: var(--radius-full);

  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: var(--_badge-radius);
  background: var(--_badge-bg);
  color: var(--_badge-text);
  font-family: var(--font-family-body);
  font-size: calc(var(--typo-body-size) * 0.75);
  font-weight: 600;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
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
  font-size: calc(var(--typo-body-size) * 0.875);
}

.tag:has(.tag__remove) {
  --_tag-padding-end: 8px;
}

.tag__label {
  min-width: 0;
  overflow-wrap: anywhere;
}

.tag__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--space-input-icon-size);
  height: var(--space-input-icon-size);
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.6;
}
.tag__remove:hover { opacity: 1; }
.tag__remove:focus-visible {
  outline: 2px solid var(--color-border-focus);
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

Display-only star rating for reviews.

```css
.rating {
  --_rating-filled: var(--color-text-accent);
  --_rating-empty: var(--color-border-subtle);
  --_rating-size: 16px;

  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.rating__stars {
  display: flex;
  gap: 2px;
}

.rating__star {
  width: var(--_rating-size);
  height: var(--_rating-size);
  color: var(--_rating-empty);
}
.rating__star--filled { color: var(--_rating-filled); }
.rating__star--half {
  position: relative;
  color: var(--_rating-empty);
}
.rating__star--half::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 50%;
  overflow: hidden;
  color: var(--_rating-filled);
}

.rating__count {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-secondary);
}
```

```html
<div class="rating" aria-label="Rating: 4.5 out of 5">
  <div class="rating__stars">
    {% for i in (1..5) %}
      {% if i <= rating_floor %}
        {% render 'icon', name: 'star-filled', class: 'rating__star rating__star--filled' %}
      {% elsif i == rating_ceil and rating_has_half %}
        {% render 'icon', name: 'star-half', class: 'rating__star rating__star--half' %}
      {% else %}
        {% render 'icon', name: 'star', class: 'rating__star' %}
      {% endif %}
    {% endfor %}
  </div>
  <span class="rating__count">({{ review_count }})</span>
</div>
```

---

### A12. Loading Skeleton

Placeholder shimmer for async content.

```css
.skeleton {
  --_skel-bg: var(--color-surface-secondary);
  --_skel-shine: var(--color-surface-primary);

  background: linear-gradient(
    90deg,
    var(--_skel-bg) 25%,
    var(--_skel-shine) 50%,
    var(--_skel-bg) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton--text { height: 1em; width: 80%; margin-bottom: 8px; }
.skeleton--title { height: 1.5em; width: 60%; margin-bottom: 12px; }
.skeleton--image { aspect-ratio: 1; width: 100%; border-radius: var(--radius-md); }
.skeleton--button { height: var(--space-button-min-height); width: 140px; border-radius: var(--radius-md); }
```

---

### A13. Empty State

For zero-result searches, empty carts, etc.

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-layout-section-gap);
  gap: 16px;
}

.empty-state__icon {
  width: 64px;
  height: 64px;
  color: var(--color-text-disabled);
}

.empty-state__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h3-size);
  color: var(--color-text-primary);
}

.empty-state__message {
  font-size: var(--typo-body-size);
  color: var(--color-text-secondary);
  max-width: 40ch;
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

---

### A14. Divider

```css
.divider {
  border: none;
  height: 1px;
  background: var(--color-border-subtle);
  margin: var(--space-layout-element-gap) 0;
}

.divider--decorative {
  height: 2px;
  background: var(--color-border-decorative);
}

.divider--section {
  margin: var(--space-layout-section-gap) 0;
}
```

---

### A15. Avatar

For artist profiles, review authors.

```css
.avatar {
  --_avatar-size: 40px;
  --_avatar-bg: var(--color-surface-secondary);
  --_avatar-text: var(--color-text-secondary);

  width: var(--_avatar-size);
  height: var(--_avatar-size);
  border-radius: var(--radius-full);
  overflow: hidden;
  flex-shrink: 0;
  background: var(--_avatar-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-family-body);
  font-weight: 600;
  color: var(--_avatar-text);
}

.avatar img { width: 100%; height: 100%; object-fit: cover; }
.avatar--sm { --_avatar-size: 32px; }
.avatar--lg { --_avatar-size: 56px; }
.avatar--xl { --_avatar-size: 80px; }
```

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

CSS-only tooltip using `::before`/`::after`.

```css
.tooltip {
  position: relative;
}

.tooltip::before,
.tooltip::after {
  position: absolute;
  bottom: 100%;
  left: 50%;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-fast) var(--easing-default);
}

.tooltip::before {
  content: attr(aria-label);
  transform: translateX(-50%) translateY(-8px);
  padding: 4px 10px;
  background: var(--color-surface-statement);
  color: var(--color-text-inverse);
  font-size: calc(var(--typo-body-size) * 0.75);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  z-index: var(--z-dropdown);
}

.tooltip::after {
  content: "";
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: var(--color-surface-statement);
}

.tooltip:hover::before,
.tooltip:hover::after,
.tooltip:focus-visible::before,
.tooltip:focus-visible::after {
  opacity: 1;
}
```

---

### B6. Accordion

```css
.accordion {
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.accordion__item + .accordion__item {
  border-top: 1px solid var(--color-border-subtle);
}

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px var(--space-layout-element-gap);
  border: none;
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family-body);
  font-size: var(--typo-body-size);
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: background var(--transition-fast) var(--easing-default);
}
.accordion__trigger:hover { background: var(--color-surface-secondary); }
.accordion__trigger:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: -2px;
}

.accordion__icon {
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  transition: transform var(--transition-base) var(--easing-default);
}
.accordion__trigger[aria-expanded="true"] .accordion__icon {
  transform: rotate(180deg);
}

.accordion__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--transition-base) var(--easing-default);
}
.accordion__trigger[aria-expanded="true"] + .accordion__panel {
  grid-template-rows: 1fr;
}
.accordion__panel-inner {
  overflow: hidden;
}
.accordion__content {
  padding: 0 var(--space-layout-element-gap) 16px;
  color: var(--color-text-secondary);
  font-size: var(--typo-body-size);
  line-height: var(--typo-body-line-height);
}
```

```html
<div class="accordion">
  <div class="accordion__item">
    <button class="accordion__trigger" aria-expanded="false"
            aria-controls="acc-details" id="acc-details-btn">
      Product Details
      {% render 'icon', name: 'chevron-down', class: 'accordion__icon' %}
    </button>
    <div class="accordion__panel" id="acc-details" role="region"
         aria-labelledby="acc-details-btn">
      <div class="accordion__panel-inner">
        <div class="accordion__content">
          {{ product.description }}
        </div>
      </div>
    </div>
  </div>
  <!-- Repeat for: Dimensions, Care Instructions, Shipping -->
</div>
```

---

### B7. Tabs

```css
.tabs__list {
  display: flex;
  border-bottom: 2px solid var(--color-border-subtle);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.tabs__tab {
  padding: 12px 20px;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  background: none;
  color: var(--color-text-secondary);
  font-family: var(--font-family-body);
  font-size: var(--typo-body-size);
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--transition-fast) var(--easing-default),
              border-color var(--transition-fast) var(--easing-default);
}
.tabs__tab:hover { color: var(--color-text-primary); }
.tabs__tab[aria-selected="true"] {
  color: var(--color-text-accent);
  border-bottom-color: var(--color-text-accent);
}
.tabs__tab:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: -2px;
}

.tabs__panel { padding: var(--space-layout-element-gap) 0; }
.tabs__panel[hidden] { display: none; }
```

```html
<div class="tabs">
  <div class="tabs__list" role="tablist" aria-label="Product information">
    <button class="tabs__tab" role="tab" aria-selected="true"
            aria-controls="tab-description" id="tab-btn-description">Description</button>
    <button class="tabs__tab" role="tab" aria-selected="false"
            aria-controls="tab-care" id="tab-btn-care">Care</button>
    <button class="tabs__tab" role="tab" aria-selected="false"
            aria-controls="tab-shipping" id="tab-btn-shipping">Shipping</button>
  </div>
  <div class="tabs__panel" role="tabpanel" id="tab-description"
       aria-labelledby="tab-btn-description">
    {{ product.description }}
  </div>
  <div class="tabs__panel" role="tabpanel" id="tab-care"
       aria-labelledby="tab-btn-care" hidden>
    {{ product.metafields.custom.care_instructions | metafield_tag }}
  </div>
</div>
```

---

### B8. Breadcrumb

```css
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: var(--space-layout-element-gap) 0;
  font-size: calc(var(--typo-body-size) * 0.875);
}

.breadcrumb__item { color: var(--color-text-secondary); }
.breadcrumb__link {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color var(--transition-fast) var(--easing-default);
}
.breadcrumb__link:hover { color: var(--color-text-accent); }
.breadcrumb__separator { color: var(--color-text-disabled); }
.breadcrumb__current { color: var(--color-text-primary); font-weight: 500; }
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

## C. GLOBAL COMPONENTS

---

### C1. Header

Sticky header with logo, navigation, search, cart icon. Collapses to hamburger on mobile.

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

  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-layout-container);
  min-height: 64px;
  background: var(--_header-bg);
  border-bottom: 1px solid var(--_header-border);
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

.header__cart-count {
  position: absolute;
  top: -4px;
  right: -4px;
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
@media (min-width: 768px) {
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
<header class="header" role="banner">
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
    <button class="btn btn--outline btn--icon-only"
            aria-label="Search" data-search-toggle>
      {% render 'icon', name: 'search' %}
    </button>

    <a href="/cart" class="btn btn--outline btn--icon-only"
       aria-label="Cart ({{ cart.item_count }} items)"
       data-cart-toggle style="position: relative;">
      {% render 'icon', name: 'shopping-bag' %}
      {% if cart.item_count > 0 %}
        <span class="header__cart-count" data-cart-count>{{ cart.item_count }}</span>
      {% endif %}
    </a>

    <button class="btn btn--outline btn--icon-only header__hamburger"
            aria-label="Menu" aria-expanded="false" data-mobile-menu-toggle>
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
  --_ann-text: var(--color-text-inverse);

  background: var(--_ann-bg);
  color: var(--_ann-text);
  text-align: center;
  padding: 8px var(--space-layout-container);
  font-size: calc(var(--typo-body-size) * 0.875);
  font-weight: 500;
}

.announcement a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}
```

```html
<!-- sections/announcement-bar.liquid -->
{% if section.settings.text != blank %}
<div class="announcement" role="region" aria-label="Announcement">
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

```css
.footer {
  --_footer-bg: var(--color-surface-secondary);
  --_footer-text: var(--color-text-secondary);
  --_footer-heading: var(--color-text-primary);
  --_footer-link: var(--color-text-secondary);
  --_footer-border: var(--color-border-subtle);

  background: var(--_footer-bg);
  border-top: 1px solid var(--_footer-border);
  padding: var(--space-layout-section-gap) var(--space-layout-container);
}

.footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-layout-grid-gap);
}

@media (min-width: 768px) {
  .footer__grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
}

.footer__heading {
  font-family: var(--font-family-heading);
  font-size: var(--typo-body-size);
  font-weight: 600;
  color: var(--_footer-heading);
  margin-bottom: 12px;
}

.footer__links { list-style: none; padding: 0; margin: 0; }
.footer__links li + li { margin-top: 8px; }
.footer__links a {
  color: var(--_footer-link);
  text-decoration: none;
  font-size: calc(var(--typo-body-size) * 0.875);
  transition: color var(--transition-fast) var(--easing-default);
}
.footer__links a:hover { color: var(--color-text-accent); }

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: var(--space-layout-section-gap);
  padding-top: var(--space-layout-element-gap);
  border-top: 1px solid var(--_footer-border);
  font-size: calc(var(--typo-body-size) * 0.75);
  color: var(--_footer-text);
}
```

---

### C4. Mobile Menu

Uses the Drawer component (B3) with `.drawer--left`.

```html
<!-- snippets/mobile-menu.liquid -->
<div class="drawer-overlay" data-mobile-menu-overlay>
  <div class="drawer drawer--left" data-mobile-menu aria-label="Mobile navigation">
    <div class="drawer__header">
      <span class="header__logo">{{ shop.name }}</span>
      <button class="btn btn--outline btn--icon-only"
              aria-label="Close menu" data-mobile-menu-close>
        {% render 'icon', name: 'x' %}
      </button>
    </div>
    <nav class="drawer__body">
      <ul class="mobile-nav">
        {% for link in linklists['main-menu'].links %}
          <li class="mobile-nav__item">
            <a class="mobile-nav__link" href="{{ link.url }}"
               {% if link.active %}aria-current="page"{% endif %}>
              {{ link.title }}
            </a>
          </li>
        {% endfor %}
      </ul>
    </nav>
  </div>
</div>
```

```css
.mobile-nav { list-style: none; padding: 0; margin: 0; }
.mobile-nav__item + .mobile-nav__item { border-top: 1px solid var(--color-border-subtle); }
.mobile-nav__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: var(--typo-body-size);
  font-weight: 500;
}
.mobile-nav__link[aria-current="page"] { color: var(--color-text-accent); }
```

---

### C5. Search Overlay

```css
.search-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  background: rgba(0, 0, 0, var(--opacity-overlay));
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 80px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--transition-base) var(--easing-default),
              visibility var(--transition-base);
}
.search-overlay.is-open { opacity: 1; visibility: visible; }

.search-box {
  width: min(600px, 90vw);
  background: var(--color-surface-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
  padding: var(--space-layout-element-gap);
}

.search-box__input {
  width: 100%;
  padding: 16px;
  border: 2px solid var(--color-border-focus);
  border-radius: var(--radius-md);
  font-size: var(--typo-h4-size);
  font-family: var(--font-family-body);
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
}

.search-results {
  margin-top: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.search-result {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: background var(--transition-fast) var(--easing-default);
}
.search-result:hover { background: var(--color-surface-secondary); }

.search-result__image {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-sm);
  object-fit: cover;
}
.search-result__title { font-weight: 500; }
.search-result__price { font-size: calc(var(--typo-body-size) * 0.875); color: var(--color-text-secondary); }
```

```html
<div class="search-overlay" data-search-overlay>
  <div class="search-box" role="search">
    <form action="/search" method="get">
      <input class="search-box__input" type="search" name="q"
             placeholder="Search for bowls, vases, glazes…"
             aria-label="Search" autocomplete="off" data-search-input>
    </form>
    <div class="search-results" data-search-results aria-live="polite">
      <!-- Predictive search results injected via JS -->
    </div>
  </div>
</div>
```

---

### C6. Cart Drawer

Uses Drawer (B3) with Shopify Cart API integration.

```css
.cart-item {
  display: flex;
  gap: 16px;
  padding: 16px 0;
}
.cart-item + .cart-item { border-top: 1px solid var(--color-border-subtle); }

.cart-item__image {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-sm);
  object-fit: cover;
  flex-shrink: 0;
}

.cart-item__details { flex: 1; }
.cart-item__title {
  font-weight: 500;
  color: var(--color-text-primary);
  text-decoration: none;
}
.cart-item__variant {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-secondary);
  margin-top: 2px;
}
.cart-item__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
}
.cart-item__remove {
  font-size: calc(var(--typo-body-size) * 0.75);
  color: var(--color-text-secondary);
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
}
.cart-item__remove:hover { color: var(--color-feedback-error-default); }

.cart-summary {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cart-summary__row {
  display: flex;
  justify-content: space-between;
  font-size: var(--typo-body-size);
  color: var(--color-text-secondary);
}
.cart-summary__total {
  font-size: var(--typo-h4-size);
  font-weight: 600;
  color: var(--color-text-primary);
}
```

```html
<!-- snippets/cart-drawer.liquid -->
<div class="drawer-overlay" data-cart-overlay></div>
<aside class="drawer" data-cart-drawer aria-label="Shopping cart">
  <div class="drawer__header">
    <h2 class="modal__title">Cart ({{ cart.item_count }})</h2>
    <button class="btn btn--outline btn--icon-only"
            aria-label="Close cart" data-cart-close>
      {% render 'icon', name: 'x' %}
    </button>
  </div>

  <div class="drawer__body">
    {% if cart.item_count == 0 %}
      {% render 'empty-state', icon: 'shopping-bag',
         title: 'Your cart is empty',
         message: 'Discover our handcrafted pieces.',
         cta_text: 'Shop Now', cta_url: '/collections/all' %}
    {% else %}
      {% for item in cart.items %}
        <div class="cart-item" data-cart-item="{{ item.key }}">
          <a href="{{ item.url }}">
            {{ item.image | image_url: width: 160 | image_tag:
               class: 'cart-item__image', alt: item.title, loading: 'lazy' }}
          </a>
          <div class="cart-item__details">
            <a class="cart-item__title" href="{{ item.url }}">{{ item.product.title }}</a>
            {% unless item.variant.title == 'Default Title' %}
              <p class="cart-item__variant">{{ item.variant.title }}</p>
            {% endunless %}
            <div class="cart-item__actions">
              {% render 'quantity-selector', item: item %}
              <span class="price__current">{{ item.final_line_price | money }}</span>
            </div>
            <button class="cart-item__remove" data-remove="{{ item.key }}">
              Remove
            </button>
          </div>
        </div>
      {% endfor %}
    {% endif %}
  </div>

  {% if cart.item_count > 0 %}
  <div class="drawer__footer">
    <div class="cart-summary">
      <div class="cart-summary__row cart-summary__total">
        <span>Total</span>
        <span>{{ cart.total_price | money }}</span>
      </div>
    </div>
    <p style="font-size: calc(var(--typo-body-size) * 0.75); color: var(--color-text-secondary); margin: 8px 0;">
      Shipping calculated at checkout
    </p>
    <a href="/checkout" class="btn btn--full">Checkout</a>
  </div>
  {% endif %}
</aside>
```

---

## D. PRODUCT COMPONENTS

---

### D1. Product Card

The primary browsing unit. Appears in collection grids, related products, and search results.

```css
.product-card {
  /* Extends .card — inherits card contract */
  --_card-bg: var(--color-surface-primary);
  --_card-border: var(--color-border-subtle);
  --_card-radius: var(--radius-md);
  --_card-shadow: var(--shadow-sm);

  position: relative;
  display: flex;
  flex-direction: column;
}

.product-card__media {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: var(--_card-radius) var(--_card-radius) 0 0;
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
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 1;
}

.product-card__quick-add {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity var(--transition-base) var(--easing-default),
              transform var(--transition-base) var(--easing-default);
}
.product-card:hover .product-card__quick-add {
  opacity: 1;
  transform: translateY(0);
}

.product-card__body {
  padding: 12px var(--space-layout-element-gap);
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-card__vendor {
  font-size: calc(var(--typo-body-size) * 0.75);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-card__title {
  font-family: var(--font-family-heading);
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

.product-card__subtitle {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-secondary);
}

.product-card__footer {
  padding: 0 var(--space-layout-element-gap) var(--space-layout-element-gap);
  display: flex;
  align-items: center;
  justify-content: space-between;
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

    {% if product.available and product.variants.size == 1 %}
      <div class="product-card__quick-add">
        <button class="btn btn--full btn--sm"
                data-quick-add="{{ product.variants.first.id }}">
          Quick Add
        </button>
      </div>
    {% endif %}
  </div>

  <div class="product-card__body">
    {% if product.vendor %}
      <span class="product-card__vendor">{{ product.vendor }}</span>
    {% endif %}
    <h3 class="product-card__title">
      <a href="{{ product.url | within: collection }}">{{ product.title }}</a>
    </h3>
    {% if product.metafields.custom.subtitle %}
      <span class="product-card__subtitle">{{ product.metafields.custom.subtitle }}</span>
    {% endif %}
  </div>

  <div class="product-card__footer">
    {% render 'price', product: product %}
    {% if product.metafields.reviews.rating %}
      {% render 'rating', rating: product.metafields.reviews.rating,
         count: product.metafields.reviews.rating_count %}
    {% endif %}
  </div>
</article>
```

---

### D2. Product Gallery

Full-width image gallery with thumbnails, zoom capability. Optimized for showing ceramic detail.

```css
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 768px) {
  .product-gallery {
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
  cursor: zoom-in;
}

.product-gallery__main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow) var(--easing-out);
}

/* CSS-only zoom on hover (desktop) */
@media (min-width: 768px) {
  .product-gallery__main:hover img {
    transform: scale(2);
    transform-origin: var(--_zoom-x, center) var(--_zoom-y, center);
  }
}

.product-gallery__thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 768px) {
  .product-gallery__thumbs {
    flex-direction: column;
    width: 80px;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 500px;
  }
}

.product-gallery__thumb {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity var(--transition-fast) var(--easing-default),
              border-color var(--transition-fast) var(--easing-default);
}
.product-gallery__thumb:hover { opacity: 0.8; }
.product-gallery__thumb[aria-selected="true"] {
  border-color: var(--color-border-focus);
  opacity: 1;
}
.product-gallery__thumb img { width: 100%; height: 100%; object-fit: cover; }

/* ── Mobile swipe indicators ── */
.product-gallery__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 8px 0;
}
@media (min-width: 768px) { .product-gallery__dots { display: none; } }

.product-gallery__dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-border-subtle);
  border: none;
  padding: 0;
  cursor: pointer;
}
.product-gallery__dot[aria-selected="true"] {
  background: var(--color-text-primary);
}
```

```html
<!-- snippets/product-gallery.liquid -->
<div class="product-gallery" data-product-gallery>
  <div class="product-gallery__main" data-gallery-main>
    {{ product.selected_or_first_available_variant.featured_image
       | default: product.featured_image
       | image_url: width: 1200
       | image_tag: class: 'product-gallery__main-image',
         alt: product.title, loading: 'eager',
         widths: '400,600,800,1000,1200',
         sizes: '(min-width: 768px) 50vw, 100vw' }}
  </div>

  <div class="product-gallery__thumbs" role="listbox" aria-label="Product images">
    {% for image in product.images %}
      <button class="product-gallery__thumb" role="option"
              aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
              data-gallery-thumb="{{ forloop.index0 }}">
        {{ image | image_url: width: 160 | image_tag:
           alt: image.alt | default: product.title, loading: 'lazy' }}
      </button>
    {% endfor %}
  </div>

  <div class="product-gallery__dots" role="tablist">
    {% for image in product.images %}
      <button class="product-gallery__dot"
              aria-selected="{% if forloop.first %}true{% else %}false{% endif %}"
              aria-label="Image {{ forloop.index }}"></button>
    {% endfor %}
  </div>
</div>
```

---

### D3. Product Info

Main product details block: title, price, description, variant selector, add to cart.

```css
.product-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-layout-element-gap);
}

.product-info__vendor {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.product-info__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h2-size);
  line-height: var(--typo-h2-line-height);
  color: var(--color-text-primary);
  margin: 0;
}

.product-info__subtitle {
  font-family: var(--font-family-accent);
  font-size: var(--typo-h4-size);
  color: var(--color-text-secondary);
  font-style: italic;
}

.product-info__description {
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
  color: var(--color-text-secondary);
}

.product-info__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-secondary);
}

.product-info__meta dt { font-weight: 600; color: var(--color-text-primary); }
.product-info__meta dd { margin: 0; }
```

```html
<!-- snippets/product-info.liquid -->
<div class="product-info">
  {% render 'breadcrumb', product: product, collection: collection %}

  {% if product.vendor %}
    <span class="product-info__vendor">{{ product.vendor }}</span>
  {% endif %}

  <h1 class="product-info__title">{{ product.title }}</h1>

  {% if product.metafields.custom.subtitle %}
    <p class="product-info__subtitle">{{ product.metafields.custom.subtitle }}</p>
  {% endif %}

  {% render 'price', product: product %}

  {% if product.metafields.reviews.rating %}
    {% render 'rating', rating: product.metafields.reviews.rating,
       count: product.metafields.reviews.rating_count %}
  {% endif %}

  <div class="product-info__description">
    {{ product.description }}
  </div>

  <dl class="product-info__meta">
    {% if product.metafields.custom.dimensions %}
      <div><dt>Dimensions</dt><dd>{{ product.metafields.custom.dimensions }}</dd></div>
    {% endif %}
    {% if product.metafields.custom.material %}
      <div><dt>Material</dt><dd>{{ product.metafields.custom.material }}</dd></div>
    {% endif %}
    {% if product.metafields.custom.weight %}
      <div><dt>Weight</dt><dd>{{ product.metafields.custom.weight }}</dd></div>
    {% endif %}
    {% if product.metafields.custom.glaze_type %}
      <div><dt>Glaze</dt><dd>{{ product.metafields.custom.glaze_type }}</dd></div>
    {% endif %}
  </dl>

  {% render 'product-form', product: product %}
</div>
```

---

### D4. Variant Selector

Handles color swatches (for glazes), size selection, and other options.

```css
.variant-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.variant-selector__group { display: flex; flex-direction: column; gap: 8px; }

.variant-selector__label {
  font-size: var(--typo-body-size);
  font-weight: 600;
  color: var(--color-text-primary);
}
.variant-selector__label span { font-weight: 400; color: var(--color-text-secondary); }

/* ── Swatch (for glazes/colors) ── */
.variant-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.variant-swatch {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-border-subtle);
  cursor: pointer;
  overflow: hidden;
  transition: border-color var(--transition-fast) var(--easing-default);
}
.variant-swatch:hover { border-color: var(--color-border-default); }
.variant-swatch input { position: absolute; opacity: 0; pointer-events: none; }
.variant-swatch input:checked + .variant-swatch__color {
  box-shadow: inset 0 0 0 2px var(--color-surface-primary);
}
.variant-swatch input:checked ~ .variant-swatch__ring {
  position: absolute;
  inset: -2px;
  border: 2px solid var(--color-border-focus);
  border-radius: var(--radius-full);
}
.variant-swatch input:focus-visible ~ .variant-swatch__ring {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.variant-swatch__color { width: 100%; height: 100%; border-radius: var(--radius-full); }

/* Swatch with image (glaze texture) */
.variant-swatch--image .variant-swatch__color {
  background-size: cover;
  background-position: center;
}

/* Swatch unavailable */
.variant-swatch--unavailable {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}
.variant-swatch--unavailable::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, transparent 45%, var(--color-text-disabled) 45%,
              var(--color-text-disabled) 55%, transparent 55%);
}

/* ── Pill selector (for sizes, styles) ── */
.variant-pills { display: flex; flex-wrap: wrap; gap: 8px; }

.variant-pill {
  padding: 8px 16px;
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  background: var(--color-surface-primary);
  color: var(--color-text-primary);
  font-size: calc(var(--typo-body-size) * 0.875);
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition-fast) var(--easing-default),
              border-color var(--transition-fast) var(--easing-default);
}
.variant-pill:hover { border-color: var(--color-border-strong); }
.variant-pill input { position: absolute; opacity: 0; pointer-events: none; }
.variant-pill:has(input:checked) {
  background: var(--color-surface-statement);
  color: var(--color-text-inverse);
  border-color: var(--color-surface-statement);
}
.variant-pill:has(input:focus-visible) {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
.variant-pill--unavailable {
  opacity: var(--opacity-disabled);
  text-decoration: line-through;
  cursor: not-allowed;
}
```

```html
<!-- snippets/variant-selector.liquid -->
{% for option in product.options_with_values %}
  <fieldset class="variant-selector__group">
    <legend class="variant-selector__label">
      {{ option.name }}: <span data-selected-value="{{ option.name }}">{{ option.selected_value }}</span>
    </legend>

    {% if option.name == 'Glaze' or option.name == 'Color' %}
      <div class="variant-swatches" role="radiogroup">
        {% for value in option.values %}
          <label class="variant-swatch {% unless product.options_by_name[option.name].values contains value %}variant-swatch--unavailable{% endunless %}"
                 aria-label="{{ value }}" title="{{ value }}">
            <input type="radio" name="{{ option.name }}"
                   value="{{ value }}"
                   {% if value == option.selected_value %}checked{% endif %}>
            <span class="variant-swatch__color"
                  style="background-color: {{ value | handleize | append: '-color' | default: '#ccc' }};">
            </span>
            <span class="variant-swatch__ring"></span>
          </label>
        {% endfor %}
      </div>
    {% else %}
      <div class="variant-pills" role="radiogroup">
        {% for value in option.values %}
          <label class="variant-pill">
            <input type="radio" name="{{ option.name }}"
                   value="{{ value }}"
                   {% if value == option.selected_value %}checked{% endif %}>
            {{ value }}
          </label>
        {% endfor %}
      </div>
    {% endif %}
  </fieldset>
{% endfor %}
```

---

### D5. Add to Cart (Product Form)

```css
.product-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.product-form__actions {
  display: flex;
  gap: 12px;
}

.product-form__submit {
  flex: 1;
  /* Extends .btn .btn--lg */
}

.product-form__wishlist {
  /* .btn .btn--outline .btn--icon-only .btn--lg */
}
```

```html
<!-- snippets/product-form.liquid -->
{% form 'product', product, data-product-form: '' %}
  <div class="product-form">
    {% render 'variant-selector', product: product %}

    <div style="display: flex; gap: 12px; align-items: flex-end;">
      {% render 'quantity-selector' %}
      <div class="price" style="margin-left: auto;">
        <span class="price__current" data-product-price>
          {{ product.selected_or_first_available_variant.price | money }}
        </span>
      </div>
    </div>

    <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}"
           data-variant-id>

    <div class="product-form__actions">
      <button class="btn btn--lg product-form__submit"
              type="submit"
              {% unless product.selected_or_first_available_variant.available %}
                disabled aria-disabled="true"
              {% endunless %}>
        {% if product.selected_or_first_available_variant.available %}
          Add to Cart — {{ product.selected_or_first_available_variant.price | money }}
        {% else %}
          Sold Out
        {% endif %}
      </button>
    </div>
  </div>
{% endform %}
```

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-layout-grid-gap);
  padding: var(--space-layout-section-gap) var(--space-layout-container);
}

@media (min-width: 768px)  { .collection-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .collection-grid { grid-template-columns: repeat(var(--grid-columns, 4), 1fr); } }
```

---

### E3. Collection Filters

```css
.filters {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: var(--space-layout-element-gap) 0;
}

.filters__bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.filters__active {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* ── Sort dropdown ── */
.filters__sort { /* extends .select */ }

/* ── Filter sidebar (desktop) / drawer (mobile) ── */
.filters__sidebar {
  display: none;
}
@media (min-width: 768px) {
  .filters__layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: var(--space-layout-grid-gap);
  }
  .filters__sidebar { display: block; }
}

.filter-group {
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border-subtle);
}

.filter-group__title {
  font-weight: 600;
  font-size: var(--typo-body-size);
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.filter-group__options { display: flex; flex-direction: column; gap: 8px; }

/* Swatch filter for glazes */
.filter-swatches { display: flex; flex-wrap: wrap; gap: 8px; }
.filter-swatch {
  /* Extends .variant-swatch but 32x32 */
  width: 32px;
  height: 32px;
}
```

```html
<div class="filters__bar">
  <div class="filters__active">
    {% for filter in collection.filters %}
      {% for value in filter.active_values %}
        <span class="tag">
          {{ value.label }}
          <a class="tag__remove" href="{{ value.url_to_remove }}"
             aria-label="Remove {{ value.label }}">
            {% render 'icon', name: 'x', size: 14 %}
          </a>
        </span>
      {% endfor %}
    {% endfor %}
  </div>

  <button class="btn btn--outline btn--sm filters__toggle"
          aria-label="Filters" data-filter-toggle>
    {% render 'icon', name: 'sliders' %} Filter
  </button>

  <div class="select filters__sort">
    <label class="select__label visually-hidden" for="sort-by">Sort by</label>
    <select class="select__field" id="sort-by" data-sort-select>
      {% for option in collection.sort_options %}
        <option value="{{ option.value }}"
          {% if option.value == collection.sort_by %}selected{% endif %}>
          {{ option.name }}
        </option>
      {% endfor %}
    </select>
  </div>
</div>
```

---

### E4. Pagination

```css
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: var(--space-layout-section-gap) 0;
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
  transition: background var(--transition-fast) var(--easing-default);
}

.pagination__link {
  color: var(--color-text-secondary);
}
.pagination__link:hover {
  background: var(--color-surface-secondary);
  color: var(--color-text-primary);
}

.pagination__current {
  background: var(--color-surface-statement);
  color: var(--color-text-inverse);
  font-weight: 600;
}

.pagination__ellipsis {
  color: var(--color-text-disabled);
  padding: 0 8px;
}
```

```html
{% if paginate.pages > 1 %}
<nav class="pagination" aria-label="Pagination">
  {% if paginate.previous %}
    <a class="pagination__link" href="{{ paginate.previous.url }}" aria-label="Previous page">
      {% render 'icon', name: 'chevron-left', size: 16 %}
    </a>
  {% endif %}

  {% for part in paginate.parts %}
    {% if part.is_link %}
      <a class="pagination__link" href="{{ part.url }}">{{ part.title }}</a>
    {% elsif part.title == paginate.current_page %}
      <span class="pagination__current" aria-current="page">{{ part.title }}</span>
    {% else %}
      <span class="pagination__ellipsis">…</span>
    {% endif %}
  {% endfor %}

  {% if paginate.next %}
    <a class="pagination__link" href="{{ paginate.next.url }}" aria-label="Next page">
      {% render 'icon', name: 'chevron-right', size: 16 %}
    </a>
  {% endif %}
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
  --_artist-bg: var(--color-surface-archival);

  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-layout-grid-gap);
  padding: var(--space-layout-section-gap) var(--space-layout-container);
  background: var(--_artist-bg);
}

@media (min-width: 768px) {
  .artist-profile { grid-template-columns: 1fr 1fr; align-items: center; }
}

.artist-profile__portrait {
  aspect-ratio: 3/4;
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.artist-profile__portrait img { width: 100%; height: 100%; object-fit: cover; }

.artist-profile__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-layout-element-gap);
}

.artist-profile__label {
  font-size: calc(var(--typo-body-size) * 0.75);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
}

.artist-profile__name {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h2-size);
  color: var(--color-text-primary);
  margin: 0;
}

.artist-profile__location {
  font-size: var(--typo-body-size);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 6px;
}

.artist-profile__bio {
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
  color: var(--color-text-secondary);
}

.artist-profile__philosophy {
  font-family: var(--font-family-accent);
  font-size: var(--typo-h4-size);
  font-style: italic;
  color: var(--color-text-accent);
  border-left: 3px solid var(--color-border-decorative);
  padding-left: 20px;
}
```

```html
<!-- sections/artist-profile.liquid -->
<section class="artist-profile">
  <div class="artist-profile__portrait">
    {% if section.settings.portrait %}
      {{ section.settings.portrait | image_url: width: 800 | image_tag:
         alt: section.settings.name, loading: 'lazy',
         widths: '400,600,800', sizes: '(min-width: 768px) 50vw, 100vw' }}
    {% endif %}
  </div>

  <div class="artist-profile__content">
    <span class="artist-profile__label">The Maker</span>
    <h2 class="artist-profile__name">{{ section.settings.name }}</h2>

    {% if section.settings.location %}
      <p class="artist-profile__location">
        {% render 'icon', name: 'map-pin', size: 16 %}
        {{ section.settings.location }}
      </p>
    {% endif %}

    <div class="artist-profile__bio">{{ section.settings.bio }}</div>

    {% if section.settings.philosophy %}
      <blockquote class="artist-profile__philosophy">
        {{ section.settings.philosophy }}
      </blockquote>
    {% endif %}

    {% if section.settings.cta_url %}
      <a href="{{ section.settings.cta_url }}" class="btn btn--outline">
        {{ section.settings.cta_text | default: 'View their work' }}
      </a>
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Artist Profile",
  "settings": [
    { "type": "image_picker", "id": "portrait", "label": "Portrait" },
    { "type": "text", "id": "name", "label": "Name" },
    { "type": "text", "id": "location", "label": "Location" },
    { "type": "richtext", "id": "bio", "label": "Biography" },
    { "type": "textarea", "id": "philosophy", "label": "Philosophy quote" },
    { "type": "url", "id": "cta_url", "label": "CTA link" },
    { "type": "text", "id": "cta_text", "label": "CTA text" }
  ],
  "presets": [{ "name": "Artist Profile" }]
}
{% endschema %}
```

---

### F2. Process Timeline

Visual narrative from raw clay to finished piece. Horizontal scroll on mobile, vertical on desktop.

```css
.process-timeline {
  padding: var(--space-layout-section-gap) var(--space-layout-container);
}

.process-timeline__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h2-size);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-layout-section-gap);
}

.process-timeline__track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 16px;
}
.process-timeline__track::-webkit-scrollbar { height: 4px; }
.process-timeline__track::-webkit-scrollbar-thumb {
  background: var(--color-border-subtle);
  border-radius: var(--radius-full);
}

@media (min-width: 768px) {
  .process-timeline__track {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    overflow: visible;
  }
}

.process-step {
  flex: 0 0 260px;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  position: relative;
}

@media (min-width: 768px) {
  .process-step { flex: 1; }
  /* Connecting line */
  .process-step:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 70px;
    right: -12px;
    width: 24px;
    height: 2px;
    background: var(--color-border-decorative);
  }
}

.process-step__number {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--color-surface-statement);
  color: var(--color-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: calc(var(--typo-body-size) * 0.875);
}

.process-step__image {
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: var(--radius-md);
  overflow: hidden;
}
.process-step__image img { width: 100%; height: 100%; object-fit: cover; }

.process-step__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-body-size);
  font-weight: 600;
  color: var(--color-text-primary);
}

.process-step__description {
  font-size: calc(var(--typo-body-size) * 0.875);
  color: var(--color-text-secondary);
  line-height: 1.5;
}
```

```html
<!-- sections/process-timeline.liquid -->
<section class="process-timeline">
  <h2 class="process-timeline__title">{{ section.settings.title | default: 'From Earth to Art' }}</h2>
  <div class="process-timeline__track">
    {% for block in section.blocks %}
      <div class="process-step" {{ block.shopify_attributes }}>
        <span class="process-step__number">{{ forloop.index }}</span>
        {% if block.settings.image %}
          <div class="process-step__image">
            {{ block.settings.image | image_url: width: 520 | image_tag:
               alt: block.settings.title, loading: 'lazy', widths: '260,520' }}
          </div>
        {% endif %}
        <h3 class="process-step__title">{{ block.settings.title }}</h3>
        <p class="process-step__description">{{ block.settings.description }}</p>
      </div>
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "Process Timeline",
  "settings": [
    { "type": "text", "id": "title", "label": "Heading", "default": "From Earth to Art" }
  ],
  "blocks": [
    {
      "type": "step",
      "name": "Step",
      "settings": [
        { "type": "image_picker", "id": "image", "label": "Image" },
        { "type": "text", "id": "title", "label": "Title" },
        { "type": "textarea", "id": "description", "label": "Description" }
      ]
    }
  ],
  "presets": [{
    "name": "Process Timeline",
    "blocks": [
      { "type": "step", "settings": { "title": "Clay Preparation" } },
      { "type": "step", "settings": { "title": "Wheel Throwing" } },
      { "type": "step", "settings": { "title": "Bisque Firing" } },
      { "type": "step", "settings": { "title": "Glazing" } },
      { "type": "step", "settings": { "title": "Final Kiln Firing" } }
    ]
  }]
}
{% endschema %}
```

---

### F3. Certificate of Authenticity

Digital COA card for artisan pieces.

```css
.coa {
  --_coa-bg: var(--color-surface-archival);
  --_coa-border: var(--color-border-decorative);
  --_coa-text: var(--color-text-primary);

  max-width: 480px;
  margin: 0 auto;
  padding: 32px;
  background: var(--_coa-bg);
  border: 2px solid var(--_coa-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.coa__header {
  font-family: var(--font-family-accent);
  font-size: calc(var(--typo-body-size) * 0.75);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}

.coa__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h3-size);
  color: var(--_coa-text);
  margin: 0 0 4px;
}

.coa__artist {
  font-family: var(--font-family-accent);
  font-size: var(--typo-h4-size);
  color: var(--color-text-accent);
  font-style: italic;
}

.coa__divider {
  width: 60px;
  height: 2px;
  background: var(--_coa-border);
  margin: 20px auto;
}

.coa__details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  text-align: left;
  font-size: calc(var(--typo-body-size) * 0.875);
}

.coa__detail-label {
  font-size: calc(var(--typo-body-size) * 0.75);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-secondary);
  margin-bottom: 2px;
}

.coa__detail-value {
  color: var(--_coa-text);
  font-weight: 500;
}

.coa__signature {
  font-family: var(--font-family-accent);
  font-size: var(--typo-h4-size);
  color: var(--_coa-text);
  margin-top: 24px;
}

.coa__qr {
  margin-top: 16px;
}
.coa__qr img { width: 80px; height: 80px; }
.coa__verify {
  font-size: calc(var(--typo-body-size) * 0.75);
  color: var(--color-text-disabled);
  margin-top: 4px;
}
```

```html
<!-- snippets/certificate-of-authenticity.liquid -->
<div class="coa">
  <p class="coa__header">Certificate of Authenticity</p>

  <h3 class="coa__title">{{ product.title }}</h3>
  <p class="coa__artist">by {{ product.vendor }}</p>

  <div class="coa__divider"></div>

  <div class="coa__details">
    {% if product.metafields.custom.medium %}
      <div>
        <p class="coa__detail-label">Medium</p>
        <p class="coa__detail-value">{{ product.metafields.custom.medium }}</p>
      </div>
    {% endif %}
    {% if product.metafields.custom.dimensions %}
      <div>
        <p class="coa__detail-label">Dimensions</p>
        <p class="coa__detail-value">{{ product.metafields.custom.dimensions }}</p>
      </div>
    {% endif %}
    {% if product.metafields.custom.year %}
      <div>
        <p class="coa__detail-label">Year</p>
        <p class="coa__detail-value">{{ product.metafields.custom.year }}</p>
      </div>
    {% endif %}
    {% if product.metafields.custom.edition %}
      <div>
        <p class="coa__detail-label">Edition</p>
        <p class="coa__detail-value">{{ product.metafields.custom.edition }}</p>
      </div>
    {% endif %}
    {% if product.metafields.custom.glaze_type %}
      <div>
        <p class="coa__detail-label">Glaze</p>
        <p class="coa__detail-value">{{ product.metafields.custom.glaze_type }}</p>
      </div>
    {% endif %}
    {% if product.metafields.custom.firing_temperature %}
      <div>
        <p class="coa__detail-label">Firing</p>
        <p class="coa__detail-value">{{ product.metafields.custom.firing_temperature }}</p>
      </div>
    {% endif %}
  </div>

  {% if product.vendor %}
    <p class="coa__signature">{{ product.vendor }}</p>
  {% endif %}

  <div class="coa__qr">
    <img src="{{ product.url | append: '.json' | md5 | prepend: 'https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=' | append: shop.url | append: product.url }}"
         alt="Verification QR code" width="80" height="80">
    <p class="coa__verify">Scan to verify authenticity</p>
  </div>
</div>
```

---

### F4. Collection Story

Narrative context for each collection — why these pieces exist together.

```css
.collection-story {
  --_story-bg: var(--color-surface-primary);

  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-layout-grid-gap);
  padding: var(--space-layout-section-gap) var(--space-layout-container);
}

@media (min-width: 768px) {
  .collection-story { grid-template-columns: 1fr 1fr; align-items: center; }
  .collection-story--reversed .collection-story__media { order: 2; }
}

.collection-story__media {
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 4/3;
}
.collection-story__media img { width: 100%; height: 100%; object-fit: cover; }

.collection-story__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.collection-story__label {
  font-size: calc(var(--typo-body-size) * 0.75);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-accent);
}

.collection-story__title {
  font-family: var(--font-family-heading);
  font-size: var(--typo-h2-size);
  color: var(--color-text-primary);
  margin: 0;
}

.collection-story__text {
  font-size: var(--typo-article-size);
  line-height: var(--typo-article-line-height);
  color: var(--color-text-secondary);
}

.collection-story__inspiration {
  font-family: var(--font-family-accent);
  font-size: var(--typo-h4-size);
  font-style: italic;
  color: var(--color-text-accent);
  padding-left: 20px;
  border-left: 3px solid var(--color-border-decorative);
}
```

```html
<!-- sections/collection-story.liquid -->
<section class="collection-story {% if section.settings.reverse %}collection-story--reversed{% endif %}">
  <div class="collection-story__media">
    {% if section.settings.image %}
      {{ section.settings.image | image_url: width: 960 | image_tag:
         alt: section.settings.title, loading: 'lazy',
         widths: '480,720,960', sizes: '(min-width: 768px) 50vw, 100vw' }}
    {% endif %}
  </div>
  <div class="collection-story__content">
    <span class="collection-story__label">{{ section.settings.label | default: 'The Story' }}</span>
    <h2 class="collection-story__title">{{ section.settings.title }}</h2>
    <div class="collection-story__text">{{ section.settings.text }}</div>
    {% if section.settings.quote %}
      <blockquote class="collection-story__inspiration">{{ section.settings.quote }}</blockquote>
    {% endif %}
    {% if section.settings.cta_url %}
      <a href="{{ section.settings.cta_url }}" class="btn btn--outline">
        {{ section.settings.cta_text | default: 'Explore Collection' }}
      </a>
    {% endif %}
  </div>
</section>

{% schema %}
{
  "name": "Collection Story",
  "settings": [
    { "type": "image_picker", "id": "image", "label": "Image" },
    { "type": "text", "id": "label", "label": "Label", "default": "The Story" },
    { "type": "text", "id": "title", "label": "Heading" },
    { "type": "richtext", "id": "text", "label": "Body text" },
    { "type": "textarea", "id": "quote", "label": "Inspiration quote" },
    { "type": "url", "id": "cta_url", "label": "CTA link" },
    { "type": "text", "id": "cta_text", "label": "CTA text" },
    { "type": "checkbox", "id": "reverse", "label": "Reverse layout", "default": false }
  ],
  "presets": [{ "name": "Collection Story" }]
}
{% endschema %}
```

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
