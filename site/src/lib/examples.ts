/**
 * examples.ts – Live HTML examples for every component in The Gallery.
 * Uses the actual CSS selectors from the component stylesheets.
 */

export interface ComponentInteraction {
  selector: string;
  toggle: string;
  triggerLabel: string;
  startVisible?: boolean;
}

export interface ComponentExamples {
  preview: string;
  variants?: Record<string, string>;
  sizes?: Record<string, string>;
  interaction?: ComponentInteraction;
}

const examples: Record<string, ComponentExamples> = {

  /* ═══════════════════════════════════════════════════════════
     PRIMITIVES  (primitives.css)
     ═══════════════════════════════════════════════════════════ */

  button: {
    preview: `<button class="btn">Default</button> <button class="btn btn--secondary">Secondary</button> <button class="btn btn--outline">Outline</button> <button class="btn btn--link">Link</button> <button class="btn btn--danger">Danger</button>`,
    variants: {
      primary: `<button class="btn">Primary Button</button>`,
      secondary: `<button class="btn btn--secondary">Secondary Button</button>`,
      outline: `<button class="btn btn--outline">Outline Button</button>`,
      link: `<button class="btn btn--link">Link Button</button>`,
      danger: `<button class="btn btn--danger">Danger Button</button>`,
    },
    sizes: {
      sm: `<button class="btn btn--sm">Small</button>`,
      default: `<button class="btn">Default</button>`,
      lg: `<button class="btn btn--lg">Large</button>`,
    },
  },

  "button-group": {
    preview: `<div class="btn-group"><button class="btn btn--outline">Left</button><button class="btn btn--outline">Center</button><button class="btn btn--outline">Right</button></div>`,
  },

  "close-button": {
    preview: `<button class="close-btn" aria-label="Close">&times;</button>`,
  },

  "icon-button": {
    preview: `<button class="icon-btn" aria-label="Settings"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="3"/><path d="M10 1v2m0 14v2M1 10h2m14 0h2"/></svg></button>`,
    variants: {
      sm: `<button class="icon-btn icon-btn--sm" aria-label="Small"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="3"/></svg></button>`,
      lg: `<button class="icon-btn icon-btn--lg" aria-label="Large"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="4"/></svg></button>`,
      round: `<button class="icon-btn icon-btn--round" aria-label="Round"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="3"/></svg></button>`,
      filled: `<button class="icon-btn icon-btn--filled" aria-label="Filled"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="3"/></svg></button>`,
    },
  },

  input: {
    preview: `<div class="input" style="max-width:320px;"><label class="input__label">Name</label><input class="input__field" type="text" placeholder="Enter your name" /></div>`,
    variants: {
      default: `<div class="input" style="max-width:320px;"><label class="input__label">Default</label><input class="input__field" type="text" placeholder="Placeholder" /></div>`,
      error: `<div class="input input--error" style="max-width:320px;"><label class="input__label">With error</label><input class="input__field" type="text" value="Invalid" /><span class="input__message">This field is required</span></div>`,
      success: `<div class="input input--success" style="max-width:320px;"><label class="input__label">Success</label><input class="input__field" type="text" value="Valid" /></div>`,
    },
  },

  select: {
    preview: `<div class="select" style="max-width:320px;"><label class="select__label">Country</label><select class="select__field"><option>Choose an option</option><option>Argentina</option><option>Mexico</option><option>Spain</option></select></div>`,
  },

  textarea: {
    preview: `<div style="max-width:400px;"><label class="input__label" style="display:block;margin-bottom:4px;">Message</label><textarea class="textarea__field" rows="3" placeholder="Write something…"></textarea></div>`,
  },

  checkbox: {
    preview: `<label class="checkbox"><input class="checkbox__input" type="checkbox" checked /><span class="checkbox__label">Accept terms</span></label>
<label class="checkbox"><input class="checkbox__input" type="checkbox" /><span class="checkbox__label">Subscribe to newsletter</span></label>`,
  },

  radio: {
    preview: `<fieldset style="border:none;padding:0;"><label class="radio"><input class="radio__input" type="radio" name="demo" checked /><span class="radio__label">Option A</span></label>
<label class="radio"><input class="radio__input" type="radio" name="demo" /><span class="radio__label">Option B</span></label></fieldset>`,
  },

  badge: {
    preview: `<span class="badge">Default</span> <span class="badge badge--success">Success</span> <span class="badge badge--warning">Warning</span> <span class="badge badge--error">Error</span>`,
    variants: {
      info: `<span class="badge">Info</span>`,
      success: `<span class="badge badge--success">Success</span>`,
      warning: `<span class="badge badge--warning">Warning</span>`,
      error: `<span class="badge badge--error">Error</span>`,
    },
  },

  tag: {
    preview: `<span class="tag">Ceramic <button class="tag__remove" aria-label="Remove">&times;</button></span> <span class="tag">Handmade <button class="tag__remove" aria-label="Remove">&times;</button></span>`,
  },

  price: {
    preview: `<span class="price"><span class="price__current">$120.00</span></span>
<span class="price price--on-sale"><span class="price__compare">$150.00</span> <span class="price__current">$120.00</span></span>`,
  },

  "quantity-selector": {
    preview: `<div class="qty"><button class="qty__btn" aria-label="Decrease">−</button><input class="qty__input" type="number" value="1" min="1" /><button class="qty__btn" aria-label="Increase">+</button></div>`,
  },

  rating: {
    preview: `<div class="rating"><div class="rating__stars"><span class="rating__star rating__star--filled">★</span><span class="rating__star rating__star--filled">★</span><span class="rating__star rating__star--filled">★</span><span class="rating__star rating__star--filled">★</span><span class="rating__star">★</span></div><span class="rating__count">(24)</span></div>`,
  },

  skeleton: {
    preview: `<div class="skeleton" style="width:200px;height:16px;margin-bottom:8px;"></div><div class="skeleton" style="width:160px;height:16px;margin-bottom:8px;"></div><div class="skeleton skeleton--circle" style="width:48px;height:48px;"></div>`,
  },

  "empty-state": {
    preview: `<div class="empty-state" style="max-width:400px;"><div class="empty-state__icon">📦</div><h3 class="empty-state__heading">Nothing here yet</h3><p class="empty-state__text">Start browsing to discover unique artisan pieces.</p><a class="empty-state__cta btn" href="#">Explore</a></div>`,
  },

  divider: {
    preview: `<hr class="divider" /><hr class="divider divider--spaced" />`,
  },

  avatar: {
    preview: `<span class="avatar avatar--sm">A</span> <span class="avatar">B</span> <span class="avatar avatar--lg">C</span> <span class="avatar avatar--xl">D</span>`,
    sizes: {
      sm: `<span class="avatar avatar--sm">SM</span>`,
      default: `<span class="avatar">MD</span>`,
      lg: `<span class="avatar avatar--lg">LG</span>`,
      xl: `<span class="avatar avatar--xl">XL</span>`,
    },
  },

  tooltip: {
    preview: `<span class="tooltip"><button class="btn btn--outline">Hover me</button><span class="tooltip__content">Tooltip text</span></span>`,
  },

  chip: {
    preview: `<span class="chip">Filter A</span> <span class="chip is-selected">Filter B</span> <span class="chip">Filter C</span>`,
  },

  alert: {
    preview: `<div class="alert alert--info"><span class="alert__icon">ℹ️</span><div class="alert__content"><p class="alert__title">Info</p><p class="alert__message">This is an informational message.</p></div><button class="alert__dismiss" aria-label="Dismiss">&times;</button></div>`,
    variants: {
      info: `<div class="alert alert--info"><span class="alert__icon">ℹ️</span><div class="alert__content"><p class="alert__title">Info</p><p class="alert__message">Informational alert.</p></div></div>`,
      success: `<div class="alert alert--success"><span class="alert__icon">✓</span><div class="alert__content"><p class="alert__title">Success</p><p class="alert__message">Operation completed.</p></div></div>`,
      warning: `<div class="alert alert--warning"><span class="alert__icon">⚠</span><div class="alert__content"><p class="alert__title">Warning</p><p class="alert__message">Please review.</p></div></div>`,
      error: `<div class="alert alert--error"><span class="alert__icon">✕</span><div class="alert__content"><p class="alert__title">Error</p><p class="alert__message">Something went wrong.</p></div></div>`,
    },
  },

  toast: {
    preview: `<div class="toast is-visible" role="alert" style="position:relative;"><span class="toast__icon">✓</span><div class="toast__content"><p class="toast__title">Saved</p><p class="toast__message">Your changes have been saved.</p></div><button class="toast__close" aria-label="Dismiss">&times;</button></div>`,
    interaction: { selector: '.toast', toggle: 'is-visible', triggerLabel: 'Show Toast' },
    variants: {
      info: `<div class="toast toast--info is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Info toast.</p></div></div>`,
      success: `<div class="toast toast--success is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Success toast.</p></div></div>`,
      error: `<div class="toast toast--error is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Error toast.</p></div></div>`,
      warning: `<div class="toast toast--warning is-visible" role="alert" style="position:relative;"><div class="toast__content"><p class="toast__message">Warning toast.</p></div></div>`,
    },
  },

  progress: {
    preview: `<div class="progress" style="max-width:400px;"><div class="progress__label">Loading… <span class="progress__value">65%</span></div><div class="progress__track"><div class="progress__bar" style="width:65%"></div></div></div>`,
    variants: {
      bar: `<div class="progress" style="max-width:400px;"><div class="progress__label">Progress <span class="progress__value">65%</span></div><div class="progress__track"><div class="progress__bar" style="width:65%"></div></div></div>`,
      circle: `<div class="progress-circle" style="width:80px;height:80px;"><svg viewBox="0 0 36 36"><circle class="progress-circle__bg" cx="18" cy="18" r="15.9" fill="none" stroke-width="3"/><circle class="progress-circle__fill" cx="18" cy="18" r="15.9" fill="none" stroke-width="3" stroke-dasharray="65 35"/></svg><span class="progress-circle__text">65%</span></div>`,
      indeterminate: `<div class="progress progress--indeterminate" style="max-width:400px;"><div class="progress__track"><div class="progress__bar"></div></div></div>`,
    },
  },

  spinner: {
    preview: `<span class="spinner"></span> <span class="spinner spinner--lg"></span>`,
    sizes: {
      sm: `<span class="spinner spinner--sm"></span>`,
      default: `<span class="spinner"></span>`,
      lg: `<span class="spinner spinner--lg"></span>`,
      xl: `<span class="spinner spinner--xl"></span>`,
    },
  },

  "key-value": {
    preview: `<dl class="data-list"><div class="data-list__item"><dt class="data-list__key">Material</dt><dd class="data-list__value">Stoneware</dd></div><div class="data-list__item"><dt class="data-list__key">Dimensions</dt><dd class="data-list__value">12 × 8 cm</dd></div><div class="data-list__item"><dt class="data-list__key">Weight</dt><dd class="data-list__value">450g</dd></div></dl>`,
  },

  "data-list": {
    preview: `<dl class="data-list"><div class="data-list__item"><dt class="data-list__key">Material</dt><dd class="data-list__value">Stoneware</dd></div><div class="data-list__item"><dt class="data-list__key">Glaze</dt><dd class="data-list__value">Celadon</dd></div></dl>`,
    variants: {
      vertical: `<dl class="data-list"><div class="data-list__item"><dt class="data-list__key">Material</dt><dd class="data-list__value">Stoneware</dd></div><div class="data-list__item"><dt class="data-list__key">Glaze</dt><dd class="data-list__value">Celadon</dd></div></dl>`,
      horizontal: `<dl class="data-list data-list--horizontal"><div class="data-list__item"><dt class="data-list__key">Material</dt><dd class="data-list__value">Stoneware</dd></div><div class="data-list__item"><dt class="data-list__key">Glaze</dt><dd class="data-list__value">Celadon</dd></div></dl>`,
    },
  },

  "data-table": {
    preview: `<div class="table-wrapper"><table class="table"><thead><tr><th>Name</th><th>Type</th><th>Origin</th></tr></thead><tbody><tr><td>Celadon Vase</td><td>Stoneware</td><td>Japan</td></tr><tr><td>Raku Bowl</td><td>Earthenware</td><td>Korea</td></tr><tr><td>Porcelain Cup</td><td>Porcelain</td><td>China</td></tr></tbody></table></div>`,
    variants: {
      striped: `<div class="table-wrapper"><table class="table table--striped"><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody><tr><td>Vase</td><td>$120</td></tr><tr><td>Bowl</td><td>$80</td></tr><tr><td>Plate</td><td>$65</td></tr></tbody></table></div>`,
      hover: `<div class="table-wrapper"><table class="table table--hover"><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody><tr><td>Vase</td><td>$120</td></tr><tr><td>Bowl</td><td>$80</td></tr></tbody></table></div>`,
      sortable: `<div class="table-wrapper"><table class="table"><thead><tr><th><button class="table__sort-btn">Name <span class="table__sort-icon">↕</span></button></th><th>Price</th></tr></thead><tbody><tr><td>Vase</td><td>$120</td></tr><tr><td>Bowl</td><td>$80</td></tr></tbody></table></div>`,
    },
  },

  table: {
    preview: `<div class="table-wrapper"><table class="table"><thead><tr><th>Product</th><th>Price</th><th>Stock</th></tr></thead><tbody><tr><td>Ceramic Vase</td><td>$120</td><td>12</td></tr><tr><td>Stoneware Bowl</td><td>$85</td><td>8</td></tr></tbody></table></div>`,
  },

  stat: {
    preview: `<div class="stat-group" style="display:flex;gap:24px;"><div class="stat"><span class="stat__value">1,234</span><span class="stat__label">Orders</span><span class="stat__change stat__change--up">+12%</span></div><div class="stat"><span class="stat__value">$45.2K</span><span class="stat__label">Revenue</span><span class="stat__change stat__change--down">-3%</span></div></div>`,
  },

  "timeline-primitive": {
    preview: `<div class="timeline"><div class="timeline__item timeline__item--active"><span class="timeline__date">2024</span><h4 class="timeline__title">Founded</h4><p class="timeline__content">Studio established in Buenos Aires.</p></div><div class="timeline__item"><span class="timeline__date">2025</span><h4 class="timeline__title">First Collection</h4><p class="timeline__content">Launched the artisan ceramic line.</p></div></div>`,
  },

  link: {
    preview: `<a class="link" href="#">Default Link</a> &nbsp; <a class="link link--subtle" href="#">Subtle Link</a> &nbsp; <a class="link link--nav" href="#">Nav Link</a>`,
    variants: {
      default: `<a class="link" href="#">Default Link</a>`,
      subtle: `<a class="link link--subtle" href="#">Subtle Link</a>`,
      nav: `<a class="link link--nav" href="#">Nav Link</a>`,
    },
  },

  toggle: {
    preview: `<div class="toggle-group"><button class="toggle toggle--active">Grid</button><button class="toggle">List</button></div>`,
  },

  fab: {
    preview: `<div style="position:relative;min-height:80px;display:flex;align-items:center;justify-content:center;"><button class="fab fab--visible" aria-label="Scroll to top" style="position:relative;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5m-7 7l7-7 7 7"/></svg></button></div>`,
    interaction: { selector: '.fab', toggle: 'fab--visible', triggerLabel: 'Show FAB' },
  },

  /* ═══════════════════════════════════════════════════════════
     LAYOUT  (layout.css)
     ═══════════════════════════════════════════════════════════ */

  card: {
    preview: `<div class="card" style="max-width:320px;"><div class="card__media"><img src="https://placehold.co/320x200/f5f0eb/1a1a1a?text=Card" alt="Card" /></div><div class="card__body" style="padding:16px;"><h3>Card Title</h3><p>Card body content.</p></div></div>`,
    variants: {
      default: `<div class="card" style="max-width:280px;padding:16px;"><h3>Default Card</h3><p>Standard card with shadow.</p></div>`,
      flat: `<div class="card card--flat" style="max-width:280px;padding:16px;"><h3>Flat Card</h3><p>No shadow variant.</p></div>`,
      elevated: `<div class="card card--elevated" style="max-width:280px;padding:16px;"><h3>Elevated Card</h3><p>Extra shadow.</p></div>`,
    },
  },

  modal: {
    preview: `<div class="modal-overlay" aria-hidden="false" style="position:relative;min-height:300px;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div class="modal" style="position:relative;"><div class="modal__header"><h2 class="modal__title">Modal Title</h2></div><div class="modal__body" style="padding:16px;"><p>Modal content here.</p></div><div class="modal__footer" style="padding:16px;display:flex;gap:8px;justify-content:flex-end;"><button class="btn btn--outline">Cancel</button><button class="btn">Confirm</button></div></div></div>`,
    interaction: { selector: '.modal-overlay', toggle: 'attr:aria-hidden=false', triggerLabel: 'Open Modal', startVisible: true },
  },

  drawer: {
    preview: `<div class="drawer-overlay is-open" style="position:relative;min-height:300px;background:rgba(0,0,0,0.2);"><div class="drawer is-open" style="position:absolute;right:0;top:0;bottom:0;width:320px;"><div class="drawer__header"><h2>Drawer</h2><button class="drawer__close">&times;</button></div><div class="drawer__body"><p>Drawer content here.</p></div><div class="drawer__footer"><button class="btn">Done</button></div></div></div>`,
    interaction: { selector: '.drawer-overlay, .drawer', toggle: 'is-open', triggerLabel: 'Open Drawer', startVisible: true },
  },

  accordion: {
    preview: `<div class="accordion"><div class="accordion__item"><button class="accordion__trigger" aria-expanded="true"><span>Section One</span><svg class="accordion__icon" width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><div class="accordion__panel"><div class="accordion__content"><p>Content for section one.</p></div></div></div><div class="accordion__item"><button class="accordion__trigger" aria-expanded="false"><span>Section Two</span><svg class="accordion__icon" width="16" height="16" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button></div></div>`,
  },

  tabs: {
    preview: `<div class="tabs"><div class="tabs__list" role="tablist"><button class="tabs__tab" role="tab" aria-selected="true">Tab 1</button><button class="tabs__tab" role="tab">Tab 2</button><button class="tabs__tab" role="tab">Tab 3</button></div><div class="tabs__panel" role="tabpanel"><p>Content for Tab 1.</p></div></div>`,
  },

  breadcrumb: {
    preview: `<nav class="breadcrumb" aria-label="Breadcrumb"><a class="breadcrumb__link" href="#">Home</a><span> / </span><a class="breadcrumb__link" href="#">Collection</a><span> / </span><span aria-current="page">Product</span></nav>`,
  },

  pagination: {
    preview: `<nav class="pagination" aria-label="Pagination"><a class="pagination__link" href="#">&laquo; Prev</a><a class="pagination__link" href="#">1</a><span class="pagination__current">2</span><a class="pagination__link" href="#">3</a><span class="pagination__ellipsis">…</span><a class="pagination__link" href="#">10</a><a class="pagination__link" href="#">Next &raquo;</a></nav>`,
  },

  popover: {
    preview: `<div class="popover popover--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Trigger</button><div class="popover__content" style="position:relative;margin-top:8px;"><div class="popover__arrow"></div><p class="popover__title">Popover</p><p>Some additional content.</p></div></div>`,
    interaction: { selector: '.popover', toggle: 'popover--open', triggerLabel: 'Toggle Popover', startVisible: true },
  },

  "hover-card": {
    preview: `<div class="hover-card" style="position:relative;display:inline-block;"><a href="#">Hover me</a><div class="hover-card__content" style="position:relative;margin-top:8px;padding:16px;"><p>Hover card content with details.</p></div></div>`,
  },

  "dropdown-menu": {
    preview: `<div class="dropdown dropdown--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Menu ▾</button><div class="dropdown__menu" style="position:relative;margin-top:4px;"><button class="dropdown__item">Edit</button><button class="dropdown__item">Duplicate</button><div class="dropdown__separator"></div><button class="dropdown__item">Delete</button></div></div>`,
    interaction: { selector: '.dropdown', toggle: 'dropdown--open', triggerLabel: 'Open Menu', startVisible: true },
    variants: {
      default: `<div class="dropdown dropdown--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Actions</button><div class="dropdown__menu" style="position:relative;"><button class="dropdown__item">Edit</button><button class="dropdown__item">Share</button></div></div>`,
      danger: `<div class="dropdown dropdown--open" style="position:relative;display:inline-block;"><button class="btn btn--outline">Actions</button><div class="dropdown__menu" style="position:relative;"><button class="dropdown__item dropdown__item--danger">Delete</button></div></div>`,
    },
  },

  "context-menu": {
    preview: `<div class="context-menu context-menu--open" style="position:relative;display:inline-block;padding:12px;border-radius:8px;"><button class="dropdown__item">Copy</button><button class="dropdown__item">Paste</button><div class="dropdown__separator"></div><button class="dropdown__item">Inspect</button></div>`,
    interaction: { selector: '.context-menu', toggle: 'context-menu--open', triggerLabel: 'Show Menu', startVisible: true },
  },

  "command-palette": {
    preview: `<div class="command-palette command-palette--open" style="position:relative;max-width:480px;"><input class="cmd-palette__input" type="text" placeholder="Type a command…" /><div class="cmd-palette__results"><button class="cmd-palette__item">Go to Products</button><button class="cmd-palette__item">Go to Orders</button></div></div>`,
    interaction: { selector: '.command-palette', toggle: 'command-palette--open', triggerLabel: 'Open Palette', startVisible: true },
  },

  lightbox: {
    preview: `<div class="lightbox lightbox--open" style="position:relative;min-height:200px;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;"><img src="https://placehold.co/400x300/f5f0eb/1a1a1a?text=Lightbox" alt="Lightbox" style="max-width:100%;" /><button class="lightbox__close" style="position:absolute;top:8px;right:8px;color:#fff;">&times;</button></div>`,
    interaction: { selector: '.lightbox', toggle: 'lightbox--open', triggerLabel: 'Open Lightbox', startVisible: true },
  },

  carousel: {
    preview: `<div class="carousel" style="max-width:400px;overflow:hidden;"><div class="carousel__track" style="display:flex;gap:16px;"><div class="carousel__slide" style="min-width:100%;"><img src="https://placehold.co/400x250/f5f0eb/1a1a1a?text=Slide+1" alt="Slide 1" style="width:100%;border-radius:8px;" /></div></div></div>`,
  },

  "scroll-area": {
    preview: `<div class="scroll-area" style="max-height:120px;overflow:auto;max-width:300px;border:1px solid var(--color-border-default);border-radius:8px;padding:12px;"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.</p></div>`,
  },

  steps: {
    preview: `<div class="steps"><div class="steps__item steps__item--done"><span class="steps__indicator">✓</span><span class="steps__label">Step 1</span></div><div class="steps__item steps__item--active"><span class="steps__indicator">2</span><span class="steps__label">Step 2</span></div><div class="steps__item"><span class="steps__indicator">3</span><span class="steps__label">Step 3</span></div></div>`,
    variants: {
      horizontal: `<div class="steps"><div class="steps__item steps__item--done"><span class="steps__indicator">✓</span><span class="steps__label">Done</span></div><div class="steps__item steps__item--active"><span class="steps__indicator">2</span><span class="steps__label">Current</span></div></div>`,
      vertical: `<div class="steps steps--vertical"><div class="steps__item steps__item--done"><span class="steps__indicator">✓</span><span class="steps__label">Done</span></div><div class="steps__item steps__item--active"><span class="steps__indicator">2</span><span class="steps__label">Current</span></div></div>`,
    },
  },

  /* ═══════════════════════════════════════════════════════════
     FORMS  (forms.css)
     ═══════════════════════════════════════════════════════════ */

  "switch": {
    preview: `<label class="switch"><input type="checkbox" class="switch__input" checked /><span class="switch__track"><span class="switch__thumb"></span></span><span class="switch__label">Enable notifications</span></label>`,
    sizes: {
      sm: `<label class="switch switch--sm"><input type="checkbox" class="switch__input" checked /><span class="switch__track"><span class="switch__thumb"></span></span><span class="switch__label">Small</span></label>`,
      default: `<label class="switch"><input type="checkbox" class="switch__input" checked /><span class="switch__track"><span class="switch__thumb"></span></span><span class="switch__label">Default</span></label>`,
      lg: `<label class="switch switch--lg"><input type="checkbox" class="switch__input" checked /><span class="switch__track"><span class="switch__thumb"></span></span><span class="switch__label">Large</span></label>`,
    },
  },

  slider: {
    preview: `<div class="slider" style="max-width:320px;"><label class="slider__label">Volume</label><input type="range" class="slider__input" min="0" max="100" value="60" /><span class="slider__value">60</span></div>`,
    variants: {
      single: `<div class="slider" style="max-width:320px;"><label class="slider__label">Single</label><input type="range" class="slider__input" min="0" max="100" value="50" /></div>`,
      range: `<div class="range-slider" style="max-width:320px;"><label>Price Range</label><div class="range-slider__track"><div class="range-slider__fill" style="left:20%;width:60%;"></div></div><input class="range-slider__input" type="range" min="0" max="500" value="100" /><input class="range-slider__input" type="range" min="0" max="500" value="400" /></div>`,
    },
  },

  combobox: {
    preview: `<div class="combobox combobox--open" style="max-width:320px;position:relative;"><input class="combobox__input" type="text" placeholder="Search…" value="Cer" /><div class="combobox__listbox" style="position:relative;"><div class="combobox__option" data-highlighted>Ceramic</div><div class="combobox__option">Celadon</div></div></div>`,
    interaction: { selector: '.combobox', toggle: 'combobox--open', triggerLabel: 'Open Combobox', startVisible: true },
  },

  "date-picker": {
    preview: `<div class="datepicker" style="max-width:300px;"><div class="datepicker__calendar"><div class="datepicker__header"><button class="datepicker__nav-btn">&lsaquo;</button><span class="datepicker__month-year">March 2026</span><button class="datepicker__nav-btn">&rsaquo;</button></div><div class="datepicker__weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div><div class="datepicker__grid"><button class="datepicker__day">28</button><button class="datepicker__day datepicker__day--today">29</button><button class="datepicker__day datepicker__day--selected">30</button><button class="datepicker__day">31</button></div></div></div>`,
  },

  "color-picker": {
    preview: `<div class="color-picker" style="display:flex;gap:8px;"><label class="color-swatch"><input class="color-swatch__input" type="radio" name="color" checked /><span class="color-swatch__fill" style="background:#c4a882;"></span><span class="color-swatch__label">Sand</span></label><label class="color-swatch"><input class="color-swatch__input" type="radio" name="color" /><span class="color-swatch__fill" style="background:#5a7d6f;"></span><span class="color-swatch__label">Sage</span></label><label class="color-swatch"><input class="color-swatch__input" type="radio" name="color" /><span class="color-swatch__fill" style="background:#2c3e50;"></span><span class="color-swatch__label">Slate</span></label></div>`,
  },

  "file-upload": {
    preview: `<div class="file-upload" style="max-width:400px;"><input class="file-upload__input" type="file" id="demo-upload" /><label for="demo-upload"><span class="file-upload__icon">📁</span><span class="file-upload__text">Click to upload or drag and drop</span><span class="file-upload__hint">PNG, JPG up to 10MB</span></label></div>`,
  },

  "pin-input": {
    preview: `<div class="pin-input"><input class="pin-input__field pin-input__field--filled" type="text" maxlength="1" value="4" /><input class="pin-input__field pin-input__field--filled" type="text" maxlength="1" value="2" /><input class="pin-input__field" type="text" maxlength="1" /><input class="pin-input__field" type="text" maxlength="1" /></div>`,
  },

  "tags-input": {
    preview: `<div class="tags-input" style="max-width:360px;"><span class="tags-input__tag">Ceramic <button class="tags-input__remove">&times;</button></span><span class="tags-input__tag">Handmade <button class="tags-input__remove">&times;</button></span><input class="tags-input__field" type="text" placeholder="Add tag…" /></div>`,
  },

  "segmented-control": {
    preview: `<div class="segmented"><label class="segmented__item"><input class="segmented__input" type="radio" name="seg" checked /><span class="segmented__label">Day</span></label><label class="segmented__item"><input class="segmented__input" type="radio" name="seg" /><span class="segmented__label">Week</span></label><label class="segmented__item"><input class="segmented__input" type="radio" name="seg" /><span class="segmented__label">Month</span></label></div>`,
  },

  "field-wrapper": {
    preview: `<div class="field" style="max-width:320px;"><label class="field__label">Email</label><input class="input__field" type="email" placeholder="you@example.com" /></div>`,
  },

  fieldset: {
    preview: `<fieldset class="fieldset" style="max-width:400px;"><legend class="fieldset__legend">Shipping Address</legend><div class="field"><label class="field__label">Street</label><input class="input__field" type="text" /></div></fieldset>`,
  },

  form: {
    preview: `<form class="form" style="max-width:400px;"><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" placeholder="Your name" /></div><div class="field"><label class="field__label">Email</label><input class="input__field" type="email" placeholder="you@example.com" /></div><button class="btn" type="submit">Submit</button></form>`,
  },

  "number-input": {
    preview: `<div class="number-input" style="max-width:200px;"><label class="field__label">Quantity</label><div style="display:flex;align-items:center;gap:8px;"><button class="qty__btn">−</button><input class="qty__input" type="number" value="1" min="0" /><button class="qty__btn">+</button></div></div>`,
  },

  "password-input": {
    preview: `<div class="password-input" style="max-width:320px;"><label class="field__label">Password</label><div style="position:relative;"><input class="input__field" type="password" value="secret123" /><button class="password-input__toggle" aria-label="Show password" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);">👁</button></div></div>`,
  },

  "inline-error": {
    preview: `<span class="inline-error">This field is required</span>`,
  },

  /* ═══════════════════════════════════════════════════════════
     PRODUCT  (product.css)
     ═══════════════════════════════════════════════════════════ */

  "product-card": {
    preview: `<article class="product-card" style="max-width:280px;"><a class="product-card__media" href="#"><img class="product-card__image" src="https://placehold.co/400x500/f5f0eb/1a1a1a?text=Product" alt="Ceramic Vase" /></a><div class="product-card__body"><span class="product-card__vendor">The Gallery</span><h3 class="product-card__title"><a href="#">Artisan Ceramic Vase</a></h3><div class="product-card__footer"><span class="price"><span class="price__current">$120.00</span></span></div></div></article>`,
  },

  "product-gallery": {
    preview: `<div class="product-gallery" style="max-width:400px;"><div class="product-gallery__main"><img src="https://placehold.co/400x400/f5f0eb/1a1a1a?text=Main" alt="Product" /></div><div class="product-gallery__thumbs"><button class="product-gallery__thumb" aria-selected="true"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=1" alt="Thumb 1" /></button><button class="product-gallery__thumb"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=2" alt="Thumb 2" /></button><button class="product-gallery__thumb"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=3" alt="Thumb 3" /></button></div></div>`,
  },

  "product-info": {
    preview: `<div class="product-info" style="max-width:480px;"><span class="product-info__vendor">The Gallery Studio</span><h1 class="product-info__title">Handcrafted Ceramic Vase</h1><p class="product-info__subtitle">Limited Edition – No. 42 of 100</p><p class="product-info__description">Each piece is hand-thrown on the potter's wheel, making every vase truly unique.</p></div>`,
  },

  "product-form": {
    preview: `<div class="product-form" style="max-width:400px;"><div class="variant-selector"><span class="variant-selector__label">Size</span><div style="display:flex;gap:8px;margin:8px 0;"><button class="variant-pill">S</button><button class="variant-pill variant-pill--selected">M</button><button class="variant-pill">L</button></div></div><div class="product-form__actions" style="margin-top:16px;display:flex;gap:8px;"><button class="btn" style="flex:1;">Add to Cart</button></div></div>`,
  },

  "product-slider": {
    preview: `<div class="product-slider"><div class="product-slider__header"><h2 class="product-slider__title">You May Also Like</h2></div><div class="product-slider__track" style="display:flex;gap:16px;overflow:hidden;"><article class="product-card" style="min-width:200px;"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=1" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Vase</h3><span class="price"><span class="price__current">$90</span></span></div></article><article class="product-card" style="min-width:200px;"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=2" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Bowl</h3><span class="price"><span class="price__current">$75</span></span></div></article></div></div>`,
  },

  "variant-selector": {
    preview: `<div class="variant-selector"><span class="variant-selector__label">Size</span><div style="display:flex;gap:8px;margin-top:8px;"><button class="variant-pill">S</button><button class="variant-pill variant-pill--selected">M</button><button class="variant-pill">L</button><button class="variant-pill variant-pill--unavailable">XL</button></div></div>`,
  },

  "size-chart": {
    preview: `<div class="size-chart"><button class="size-chart__trigger"><svg width="16" height="16" viewBox="0 0 16 16"><rect x="1" y="4" width="14" height="8" fill="none" stroke="currentColor"/></svg> Size Guide</button><div class="size-chart__drawer is-open" style="position:relative;opacity:1;visibility:visible;"><div class="size-chart__panel" style="position:relative;transform:none;"><h3>Size Guide</h3><table class="docs-token-table"><thead><tr><th>Size</th><th>Chest</th><th>Length</th></tr></thead><tbody><tr><td>S</td><td>36"</td><td>27"</td></tr><tr><td>M</td><td>38"</td><td>28"</td></tr><tr><td>L</td><td>40"</td><td>29"</td></tr></tbody></table></div></div></div>`,
    interaction: { selector: '.size-chart__drawer', toggle: 'is-open', triggerLabel: 'Open Size Chart', startVisible: true },
  },

  "back-in-stock": {
    preview: `<div class="back-in-stock" style="max-width:400px;"><h4 class="back-in-stock__heading">Notify me when available</h4><p class="back-in-stock__text">Enter your email and we'll let you know when this item is back.</p><form class="back-in-stock__form"><input class="back-in-stock__input" type="email" placeholder="your@email.com" /><button class="back-in-stock__submit" type="submit">Notify Me</button></form></div>`,
  },

  "store-pickup": {
    preview: `<div class="store-pickup" aria-expanded="true" style="max-width:400px;"><button class="store-pickup__toggle"><span class="store-pickup__toggle-icon">📍</span> Store Pickup Available</button><div class="store-pickup__content"><div class="store-pickup__location"><span class="store-pickup__status-icon" style="color:green;">●</span><span class="store-pickup__location-name">Buenos Aires Studio</span><span class="store-pickup__location-detail">Usually ready in 2 hours</span></div></div></div>`,
  },

  "subscription-option": {
    preview: `<div class="subscription-option is-selected" style="max-width:400px;"><div class="subscription-option__header"><div class="subscription-option__radio"></div><span class="subscription-option__label">Subscribe &amp; Save</span><span class="subscription-option__price">$102.00</span></div></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     COLLECTION  (collection.css)
     ═══════════════════════════════════════════════════════════ */

  "collection-hero": {
    preview: `<div class="collection-hero" style="padding:32px;"><h1 class="collection-hero__title">Artisan Ceramics</h1><p class="collection-hero__description">Handcrafted pieces from independent studios around the world.</p><span class="collection-hero__count">42 products</span></div>`,
  },

  "collection-grid": {
    preview: `<div class="collection-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;"><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=1" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Vase</h3></div></article><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=2" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Bowl</h3></div></article><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=3" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Plate</h3></div></article></div>`,
  },

  filters: {
    preview: `<div class="filters"><div class="filters__bar"><div class="filter-group"><button class="filter-group__title">Category</button></div><div class="filter-group"><button class="filter-group__title">Price</button></div><div class="filter-group"><button class="filter-group__title">Color</button></div></div></div>`,
  },

  "view-toggle": {
    preview: `<div class="view-toggle"><button class="view-toggle__btn is-active" aria-pressed="true" aria-label="Grid"><svg width="18" height="18" viewBox="0 0 18 18"><rect x="1" y="1" width="7" height="7" fill="currentColor" rx="1"/><rect x="10" y="1" width="7" height="7" fill="currentColor" rx="1"/><rect x="1" y="10" width="7" height="7" fill="currentColor" rx="1"/><rect x="10" y="10" width="7" height="7" fill="currentColor" rx="1"/></svg></button><button class="view-toggle__btn" aria-pressed="false" aria-label="List"><svg width="18" height="18" viewBox="0 0 18 18"><rect x="1" y="2" width="16" height="3" fill="currentColor" rx="1"/><rect x="1" y="7.5" width="16" height="3" fill="currentColor" rx="1"/><rect x="1" y="13" width="16" height="3" fill="currentColor" rx="1"/></svg></button></div>`,
  },

  "collection-promo": {
    preview: `<div class="collection-promo" style="position:relative;max-width:400px;"><div class="collection-promo__media"><img src="https://placehold.co/400x250/f5f0eb/1a1a1a?text=Promo" alt="" style="width:100%;" /></div><div class="collection-promo__overlay"></div><div class="collection-promo__content"><span class="collection-promo__eyebrow">New Arrival</span><h3 class="collection-promo__title">Spring Collection</h3><a class="collection-promo__cta" href="#">Shop Now</a></div></div>`,
    variants: {
      default: `<div class="collection-promo" style="max-width:300px;"><div class="collection-promo__content"><h3 class="collection-promo__title">Promo Default</h3></div></div>`,
      "span-2": `<div class="collection-promo collection-promo--span-2" style="max-width:600px;"><div class="collection-promo__content"><h3 class="collection-promo__title">Promo Span 2</h3></div></div>`,
    },
  },

  "empty-collection": {
    preview: `<div class="empty-collection"><div class="empty-collection__icon">☐</div><h2 class="empty-collection__heading">No products found</h2><p class="empty-collection__text">Try adjusting your filters or browse our full catalog.</p><a class="empty-collection__cta" href="#">Browse All</a></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     REVIEWS  (reviews.css)
     ═══════════════════════════════════════════════════════════ */

  "star-rating": {
    preview: `<div class="star-rating"><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star">★</span></div>`,
    variants: {
      default: `<div class="star-rating"><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star">★</span><span class="star-rating__star">★</span></div>`,
      lg: `<div class="star-rating star-rating--lg"><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-half">★</span></div>`,
    },
  },

  "star-input": {
    preview: `<div class="star-input"><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="1" /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="2" /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="3" /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="4" checked /><span>★</span></label><label class="star-input__label"><input class="star-input__radio" type="radio" name="star" value="5" /><span>★</span></label></div>`,
  },

  "review-summary": {
    preview: `<div class="review-summary" style="max-width:360px;"><div class="review-summary__average"><span class="review-summary__score">4.5</span><div class="star-rating"><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-half">★</span></div><span class="review-summary__count">127 reviews</span></div><div class="review-summary__bars"><div class="review-summary__bar-row"><span class="review-summary__bar-label">5</span><div class="review-summary__bar-track"><div class="review-summary__bar-fill" style="width:70%;"></div></div><span class="review-summary__bar-count">89</span></div><div class="review-summary__bar-row"><span class="review-summary__bar-label">4</span><div class="review-summary__bar-track"><div class="review-summary__bar-fill" style="width:20%;"></div></div><span class="review-summary__bar-count">25</span></div><div class="review-summary__bar-row"><span class="review-summary__bar-label">3</span><div class="review-summary__bar-track"><div class="review-summary__bar-fill" style="width:5%;"></div></div><span class="review-summary__bar-count">8</span></div></div></div>`,
  },

  "review-card": {
    preview: `<article class="review-card" style="max-width:480px;"><div class="review-card__header"><img class="review-card__avatar" src="https://i.pravatar.cc/40?img=12" alt="" /><div class="review-card__meta"><span class="review-card__author">María G.</span><span class="review-card__date">March 15, 2026</span></div><span class="review-card__verified">✓ Verified</span></div><div class="star-rating" style="margin-bottom:8px;"><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span><span class="star-rating__star is-filled">★</span></div><h4 class="review-card__title">Absolutely beautiful piece</h4><p class="review-card__body">The craftsmanship is incredible. Each detail is perfect.</p><div class="review-card__actions"><button class="review-card__helpful-btn">👍 Helpful</button><span class="review-card__helpful-count">12</span></div></article>`,
  },

  "review-highlights": {
    preview: `<div class="review-highlights"><button class="review-highlights__tag is-active" aria-pressed="true">Quality <span class="review-highlights__count">42</span></button><button class="review-highlights__tag">Craftsmanship <span class="review-highlights__count">38</span></button><button class="review-highlights__tag">Packaging <span class="review-highlights__count">21</span></button></div>`,
  },

  "photo-reviews": {
    preview: `<div class="photo-reviews" style="display:flex;gap:8px;"><div class="photo-reviews__item"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=1" alt="Review photo" /></div><div class="photo-reviews__item"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=2" alt="Review photo" /></div><div class="photo-reviews__item"><img src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=3" alt="Review photo" /></div></div>`,
  },

  "review-form": {
    preview: `<div class="review-form" style="max-width:480px;"><div class="review-form__group"><label class="review-form__label">Rating</label><div class="star-input"><label class="star-input__label"><input class="star-input__radio" type="radio" name="rf" value="5" checked /><span>★</span></label></div></div><div class="review-form__group"><label class="review-form__label">Your Review</label><textarea class="review-form__textarea" rows="3" placeholder="Share your experience…"></textarea></div><button class="btn">Submit Review</button></div>`,
  },

  "review-toolbar": {
    preview: `<div class="review-toolbar"><div class="review-toolbar__sort"><label>Sort by</label><select class="review-toolbar__sort-select"><option>Most Recent</option><option>Highest Rated</option><option>Most Helpful</option></select></div><button class="review-toolbar__write-btn btn btn--outline">Write a Review</button></div>`,
  },

  "review-pagination": {
    preview: `<div class="review-pagination"><button class="review-pagination__btn">1</button><button class="review-pagination__btn" aria-current="page">2</button><button class="review-pagination__btn">3</button></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     MARKETING  (marketing.css)
     ═══════════════════════════════════════════════════════════ */

  hero: {
    preview: `<div class="hero" style="position:relative;min-height:300px;display:flex;align-items:center;justify-content:center;background:#f5f0eb;"><div class="hero__content" style="text-align:center;"><span class="hero__label">New Collection</span><h1 class="hero__title" style="font-size:2rem;">Artisan Ceramics</h1><p class="hero__description">Handcrafted with care, designed for life.</p><button class="btn">Shop Now</button></div></div>`,
  },

  newsletter: {
    preview: `<div class="newsletter" style="max-width:480px;"><h3 class="newsletter__title">Stay in the loop</h3><p class="newsletter__description">New collections, artist stories, and studio access.</p><form style="display:flex;gap:8px;"><input class="input__field" type="email" placeholder="your@email.com" style="flex:1;" /><button class="btn">Subscribe</button></form></div>`,
  },

  "newsletter-form": {
    preview: `<div class="newsletter" style="max-width:480px;"><h3 class="newsletter__title">Stay in the loop</h3><p class="newsletter__description">New collections, artist stories, studio access.</p><form style="display:flex;gap:8px;"><input class="input__field" type="email" placeholder="your@email.com" style="flex:1;" /><button class="btn">Subscribe</button></form></div>`,
  },

  testimonials: {
    preview: `<div class="testimonials" style="max-width:600px;"><h2 class="testimonials__title">What our customers say</h2><div class="testimonials__grid" style="display:grid;gap:16px;"><div class="testimonial"><blockquote class="testimonial__quote">"The craftsmanship is exceptional. Each piece tells a story."</blockquote><div class="testimonial__author"><span class="testimonial__name">María García</span><span class="testimonial__detail">Collector</span></div></div></div></div>`,
  },

  popup: {
    preview: `<div class="popup-overlay" data-open style="position:relative;min-height:200px;background:rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div class="popup" style="position:relative;padding:24px;max-width:360px;"><button class="popup__close">&times;</button><h3 class="popup__title">10% Off Your First Order</h3><p class="popup__text">Sign up now and get a welcome discount.</p><form style="display:flex;gap:8px;"><input class="input__field" type="email" placeholder="Email" style="flex:1;" /><button class="btn">Get Offer</button></form></div></div>`,
    interaction: { selector: '.popup-overlay', toggle: 'attr:data-open=', triggerLabel: 'Show Popup', startVisible: true },
    variants: {
      default: `<div class="popup" style="position:relative;padding:24px;max-width:300px;border:1px solid var(--color-border-default);border-radius:12px;"><h3 class="popup__title">Default Popup</h3><p class="popup__text">Centered overlay popup.</p></div>`,
      split: `<div class="popup popup--split" style="position:relative;max-width:500px;display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--color-border-default);border-radius:12px;overflow:hidden;"><div class="popup__media" style="background:#f5f0eb;min-height:150px;"></div><div style="padding:24px;"><h3 class="popup__title">Split Popup</h3><p class="popup__text">With media side.</p></div></div>`,
      slide: `<div class="popup popup--slide" style="position:relative;padding:24px;max-width:300px;border:1px solid var(--color-border-default);border-radius:12px;"><h3 class="popup__title">Slide Popup</h3><p class="popup__text">Slides in from edge.</p></div>`,
    },
  },

  "trust-badges": {
    preview: `<div class="trust-badges" style="display:flex;gap:16px;"><div class="trust-badge"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span>Secure Checkout</span></div><div class="trust-badge"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 12H4m8-8v16"/></svg><span>Free Shipping</span></div></div>`,
    variants: {
      default: `<div class="trust-badges" style="display:flex;gap:16px;"><div class="trust-badge"><span>🔒 Secure</span></div><div class="trust-badge"><span>🚚 Free Shipping</span></div></div>`,
      compact: `<div class="trust-badges trust-badges--compact" style="display:flex;gap:8px;"><div class="trust-badge"><span>🔒</span></div><div class="trust-badge"><span>🚚</span></div></div>`,
    },
  },

  "payment-icons": {
    preview: `<div class="payment-icons" style="display:flex;gap:8px;"><span style="padding:4px 8px;border:1px solid var(--color-border-default);border-radius:4px;font-size:12px;">Visa</span><span style="padding:4px 8px;border:1px solid var(--color-border-default);border-radius:4px;font-size:12px;">MC</span><span style="padding:4px 8px;border:1px solid var(--color-border-default);border-radius:4px;font-size:12px;">Amex</span></div>`,
  },

  countdown: {
    preview: `<div class="countdown" style="display:flex;gap:12px;"><div class="countdown__segment"><span class="countdown__number">02</span><span class="countdown__label">Days</span></div><span class="countdown__separator">:</span><div class="countdown__segment"><span class="countdown__number">14</span><span class="countdown__label">Hours</span></div><span class="countdown__separator">:</span><div class="countdown__segment"><span class="countdown__number">38</span><span class="countdown__label">Min</span></div></div>`,
    variants: {
      default: `<div class="countdown" style="display:flex;gap:12px;"><div class="countdown__segment"><span class="countdown__number">05</span><span class="countdown__label">Days</span></div><span class="countdown__separator">:</span><div class="countdown__segment"><span class="countdown__number">12</span><span class="countdown__label">Hours</span></div></div>`,
      inline: `<div class="countdown countdown--inline" style="display:flex;gap:8px;"><div class="countdown__segment"><span class="countdown__number">05</span><span class="countdown__label">d</span></div><div class="countdown__segment"><span class="countdown__number">12</span><span class="countdown__label">h</span></div></div>`,
      cards: `<div class="countdown countdown--cards" style="display:flex;gap:12px;"><div class="countdown__segment"><span class="countdown__number">05</span><span class="countdown__label">Days</span></div><div class="countdown__segment"><span class="countdown__number">12</span><span class="countdown__label">Hours</span></div></div>`,
    },
  },

  urgency: {
    preview: `<div class="urgency"><span class="urgency__text">🔥 Only 3 left in stock!</span></div>`,
    variants: {
      "low-stock": `<div class="urgency urgency--low-stock">Only 3 left in stock!</div>`,
      "selling-fast": `<div class="urgency urgency--selling-fast"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="4"/></svg> Selling fast — 24 sold in the last hour</div>`,
      viewers: `<div class="urgency urgency--viewers">👀 15 people are viewing this right now</div>`,
      "recent-sale": `<div class="urgency urgency--recent-sale">Someone in Buenos Aires just purchased this!</div>`,
    },
  },

  "cookie-consent": {
    preview: `<div class="cookie-banner" data-visible style="position:relative;"><div class="cookie-banner__inner"><p class="cookie-banner__text">We use cookies for a better experience. <a href="#">Learn more</a></p><div class="cookie-banner__actions"><button class="btn">Accept</button><button class="btn btn--outline">Preferences</button></div></div></div>`,
    interaction: { selector: '.cookie-banner', toggle: 'attr:data-visible=', triggerLabel: 'Show Banner', startVisible: true },
  },

  "social-proof": {
    preview: `<div class="social-proof" data-visible style="position:relative;max-width:320px;display:flex;align-items:center;gap:12px;padding:12px;border-radius:8px;"><img class="social-proof__image" src="https://placehold.co/48x48/f5f0eb/1a1a1a?text=P" alt="" style="border-radius:4px;" /><div><p class="social-proof__text">Someone in Buenos Aires purchased <strong>Artisan Vase</strong></p><span class="social-proof__time">2 min ago</span></div><button class="social-proof__close">&times;</button></div>`,
    interaction: { selector: '.social-proof', toggle: 'attr:data-visible=', triggerLabel: 'Show Notification', startVisible: true },
  },

  "announcement-extended": {
    preview: `<div class="announcement-bar--countdown" style="padding:12px;text-align:center;background:var(--color-surface-secondary);">🎉 Sale ends in <strong>2d 14h 38m</strong> — Free shipping on all orders!</div>`,
    variants: {
      countdown: `<div class="announcement-bar--countdown" style="padding:12px;text-align:center;">Sale ends in 2d 14h 38m!</div>`,
      rotating: `<div class="announcement-bar--rotating" style="padding:12px;text-align:center;"><div class="announcement-bar__slides"><div class="announcement-bar__slide">Free shipping over $150</div></div></div>`,
      dismissible: `<div class="announcement-bar--dismissible" style="padding:12px;text-align:center;position:relative;">Limited offer! <button class="announcement-bar__dismiss" style="position:absolute;right:12px;">&times;</button></div>`,
    },
  },

  /* ═══════════════════════════════════════════════════════════
     GLOBAL  (global.css)
     ═══════════════════════════════════════════════════════════ */

  header: {
    preview: `<header class="header" style="position:relative;"><a class="header__logo" href="#">The Gallery</a><nav style="display:flex;gap:16px;"><a class="header__nav-link" href="#" aria-current="page">Shop</a><a class="header__nav-link" href="#">Artists</a><a class="header__nav-link" href="#">About</a></nav><div class="header__actions"><button class="header__cart-count">0</button></div></header>`,
  },

  footer: {
    preview: `<footer class="footer" style="position:relative;"><div class="footer__grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;"><div><h4 class="footer__heading">Shop</h4><nav class="footer__links"><a href="#">New Arrivals</a><a href="#">Collections</a></nav></div><div><h4 class="footer__heading">About</h4><nav class="footer__links"><a href="#">Our Story</a><a href="#">Artists</a></nav></div><div><h4 class="footer__heading">Support</h4><nav class="footer__links"><a href="#">FAQ</a><a href="#">Contact</a></nav></div></div><div class="footer__bottom">© 2026 The Gallery</div></footer>`,
  },

  "announcement-bar": {
    preview: `<div class="announcement" style="position:relative;text-align:center;padding:8px;">Free shipping on orders over $150 ✦ Limited time offer</div>`,
  },

  "mobile-menu": {
    preview: `<nav style="max-width:300px;border:1px solid var(--color-border-default);border-radius:8px;padding:16px;"><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">Shop</a><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">Artists</a><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">About</a><a class="mobile-nav__link" href="#" style="display:block;padding:8px 0;">Contact</a></nav>`,
  },

  "search-overlay": {
    preview: `<div class="search-overlay" style="position:relative;padding:24px;background:var(--color-surface-primary);border:1px solid var(--color-border-default);border-radius:8px;max-width:480px;"><div class="search-box"><input class="search-box__input" type="search" placeholder="Search products…" /></div><div class="search-results" style="margin-top:16px;"><a class="search-result" href="#" style="display:flex;gap:12px;align-items:center;padding:8px 0;"><img class="search-result__image" src="https://placehold.co/48x48/f5f0eb/1a1a1a?text=V" alt="" style="border-radius:4px;" /><span>Artisan Vase</span></a></div></div>`,
  },

  "cart-drawer": {
    preview: `<div style="max-width:360px;border:1px solid var(--color-border-default);border-radius:8px;padding:16px;"><h3 style="margin-bottom:16px;">Your Cart</h3><div class="cart-item" style="display:flex;gap:12px;margin-bottom:16px;"><img class="cart-item__image" src="https://placehold.co/64x64/f5f0eb/1a1a1a?text=V" alt="" style="border-radius:4px;" /><div><h4 class="cart-item__title">Ceramic Vase</h4><span class="cart-item__variant">Large / White</span></div></div></div>`,
  },

  "mega-menu": {
    preview: `<div class="mega-menu is-open" style="position:relative;"><div class="mega-menu__inner" style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;padding:24px;border:1px solid var(--color-border-default);border-radius:8px;"><div><h4 class="mega-menu__heading">Collections</h4><a class="mega-menu__link" href="#">Vases</a><a class="mega-menu__link" href="#">Bowls</a></div><div><h4 class="mega-menu__heading">Artists</h4><a class="mega-menu__link" href="#">Featured</a><a class="mega-menu__link" href="#">All Artists</a></div><div class="mega-menu__promo"><img src="https://placehold.co/200x120/f5f0eb/1a1a1a?text=Promo" alt="" style="width:100%;border-radius:8px;" /></div></div></div>`,
    variants: {
      default: `<div class="mega-menu is-open" style="position:relative;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><h4 class="mega-menu__heading">Category</h4><a class="mega-menu__link" href="#">Link A</a></div>`,
      promo: `<div class="mega-menu is-open" style="position:relative;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><div class="mega-menu__promo"><img src="https://placehold.co/160x100/f5f0eb/1a1a1a?text=Promo" alt="" style="border-radius:8px;" /><span class="mega-menu__promo-title">New Collection</span></div></div>`,
      featured: `<div class="mega-menu is-open" style="position:relative;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><div class="mega-menu__featured"><div class="mega-menu__featured-item"><img class="mega-menu__featured-img" src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=F" alt="" style="border-radius:4px;" /><span class="mega-menu__featured-name">Featured Item</span></div></div></div>`,
    },
  },

  "bottom-nav": {
    preview: `<nav class="bottom-nav" style="position:relative;display:flex;justify-content:space-around;padding:8px 0;border-top:1px solid var(--color-border-default);"><a class="bottom-nav__item" href="#" aria-current="page"><span class="bottom-nav__icon">🏠</span><span class="bottom-nav__label">Home</span></a><a class="bottom-nav__item" href="#"><span class="bottom-nav__icon">🔍</span><span class="bottom-nav__label">Search</span></a><a class="bottom-nav__item" href="#"><span class="bottom-nav__icon">🛒</span><span class="bottom-nav__label">Cart</span><span class="bottom-nav__badge">2</span></a></nav>`,
  },

  /* ═══════════════════════════════════════════════════════════
     CART  (cart.css)
     ═══════════════════════════════════════════════════════════ */

  "cart-page": {
    preview: `<div class="cart-page" style="max-width:600px;"><div class="cart-page__header"><h1 class="cart-page__title">Your Cart</h1><span class="cart-page__count">2 items</span></div><a class="cart-page__continue" href="#">Continue Shopping</a></div>`,
  },

  "cart-line-item": {
    preview: `<div class="cart-line" style="max-width:500px;display:flex;gap:16px;padding:16px 0;border-bottom:1px solid var(--color-border-default);"><img class="cart-line__image" src="https://placehold.co/80x80/f5f0eb/1a1a1a?text=Item" alt="" style="border-radius:8px;" /><div style="flex:1;"><h4 class="cart-line__title">Artisan Ceramic Vase</h4><span class="cart-line__variant">Large / White</span><div class="cart-line__actions"><button class="cart-line__remove">Remove</button></div></div><span class="cart-line__price">$120.00</span></div>`,
  },

  "cart-summary": {
    preview: `<div class="cart-summary" style="max-width:360px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><h3 class="cart-summary__title">Order Summary</h3><div class="cart-summary__row"><span>Subtotal</span><span class="cart-summary__value">$240.00</span></div><div class="cart-summary__row"><span>Shipping</span><span class="cart-summary__value">Free</span></div><div class="cart-summary__divider"></div><div class="cart-summary__row cart-summary__row--total"><span>Total</span><span class="cart-summary__value">$240.00</span></div><button class="btn" style="width:100%;margin-top:16px;">Checkout</button></div>`,
  },

  "discount-field": {
    preview: `<div class="discount-field" style="max-width:360px;"><button class="discount-field__toggle">Have a discount code?</button><div class="discount-field__form" style="display:flex;gap:8px;margin-top:8px;"><input class="input__field" type="text" placeholder="Enter code" style="flex:1;" /><button class="btn btn--outline">Apply</button></div></div>`,
  },

  "free-shipping-bar": {
    preview: `<div class="shipping-bar" style="max-width:400px;"><p class="shipping-bar__text">$45 away from free shipping!</p><div class="shipping-bar__track"><div class="shipping-bar__fill" style="width:70%;"></div></div></div>`,
  },

  "cart-upsell": {
    preview: `<div class="cart-upsell" style="max-width:400px;"><h4 class="cart-upsell__title">You might also like</h4><div class="cart-upsell__items" style="display:flex;gap:12px;"><div class="cart-upsell__item"><img class="cart-upsell__item-image" src="https://placehold.co/64x64/f5f0eb/1a1a1a?text=U" alt="" style="border-radius:4px;" /><span class="cart-upsell__item-title">Vase Stand</span><span class="cart-upsell__item-price">$25</span></div></div></div>`,
  },

  "cart-empty": {
    preview: `<div class="cart-empty" style="text-align:center;padding:48px 24px;"><div class="cart-empty__icon">🛒</div><h2 class="cart-empty__title">Your cart is empty</h2><p class="cart-empty__message">Looks like you haven't added anything yet.</p><a class="btn" href="#">Start Shopping</a></div>`,
  },

  "quick-view": {
    preview: `<div class="quick-view" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:600px;padding:24px;border:1px solid var(--color-border-default);border-radius:12px;"><div class="quick-view__gallery"><img src="https://placehold.co/280x280/f5f0eb/1a1a1a?text=Product" alt="" style="width:100%;border-radius:8px;" /></div><div class="quick-view__info"><h3 class="quick-view__title">Ceramic Vase</h3><span class="quick-view__vendor">The Gallery</span><p class="quick-view__description">Hand-thrown stoneware vase.</p><a class="quick-view__full-link" href="#">View Full Details</a></div></div>`,
  },

  "sticky-atc": {
    preview: `<div class="sticky-atc" style="position:relative;"><div class="sticky-atc__inner" style="display:flex;align-items:center;gap:16px;padding:12px;border:1px solid var(--color-border-default);border-radius:8px;"><img class="sticky-atc__image" src="https://placehold.co/48x48/f5f0eb/1a1a1a?text=P" alt="" style="border-radius:4px;" /><div class="sticky-atc__info"><span class="sticky-atc__title">Ceramic Vase</span><span class="sticky-atc__price">$120</span></div><button class="btn">Add to Cart</button></div></div>`,
  },

  "cart-note": {
    preview: `<div class="cart-note" style="max-width:400px;"><button class="cart-note__toggle">Add order note</button><textarea class="cart-note__field" rows="3" placeholder="Special instructions…" style="width:100%;margin-top:8px;"></textarea></div>`,
  },

  "gift-wrap": {
    preview: `<div class="gift-wrap" style="max-width:400px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><label class="checkbox"><input class="checkbox__input" type="checkbox" /><span class="checkbox__label">Add gift wrapping (+$5.00)</span></label></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     ACCOUNT  (account.css)
     ═══════════════════════════════════════════════════════════ */

  "auth-forms": {
    preview: `<div class="auth" style="max-width:380px;"><div class="auth__header"><h2 class="auth__title">Sign In</h2><p class="auth__subtitle">Welcome back</p></div><form class="auth__form"><div class="field"><label class="field__label">Email</label><input class="input__field" type="email" placeholder="your@email.com" /></div><div class="field"><label class="field__label">Password</label><input class="input__field" type="password" placeholder="••••••••" /></div><button class="btn" style="width:100%;margin-top:12px;">Sign In</button></form></div>`,
  },

  "password-reset": {
    preview: `<div class="password-reset" style="max-width:380px;text-align:center;"><div class="password-reset__icon">🔑</div><h2 class="password-reset__title">Reset Password</h2><p class="password-reset__text">Enter your email to receive a reset link.</p><form style="margin-top:16px;"><input class="input__field" type="email" placeholder="your@email.com" style="width:100%;" /><button class="btn" style="width:100%;margin-top:12px;">Send Reset Link</button></form></div>`,
  },

  "account-dashboard": {
    preview: `<div class="account-dashboard" style="max-width:600px;"><div class="account-dashboard__header"><h1 class="account-dashboard__greeting">Hello, María</h1></div><div class="account-dashboard__grid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px;"><div class="account-card"><span class="account-card__icon">📦</span><h3 class="account-card__title">Orders</h3><p class="account-card__description">View order history</p></div><div class="account-card"><span class="account-card__icon">📍</span><h3 class="account-card__title">Addresses</h3><p class="account-card__description">Manage addresses</p></div></div></div>`,
  },

  "account-settings": {
    preview: `<div style="max-width:480px;"><h2>Account Settings</h2><form style="margin-top:16px;"><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" value="María García" /></div><div class="field" style="margin-top:12px;"><label class="field__label">Email</label><input class="input__field" type="email" value="maria@example.com" /></div><button class="btn" style="margin-top:16px;">Save Changes</button></form></div>`,
  },

  "order-history": {
    preview: `<div class="order-list" style="max-width:600px;"><div class="order-row" style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--color-border-default);"><span class="order-row__number">#1042</span><span class="order-row__date">Mar 15, 2026</span><span class="order-row__status order-row__status--delivered">Delivered</span><span class="order-row__total">$120.00</span></div><div class="order-row" style="display:flex;align-items:center;gap:16px;padding:12px 0;border-bottom:1px solid var(--color-border-default);"><span class="order-row__number">#1038</span><span class="order-row__date">Feb 28, 2026</span><span class="order-row__status order-row__status--shipped">Shipped</span><span class="order-row__total">$85.00</span></div></div>`,
  },

  "order-detail": {
    preview: `<div class="order-detail" style="max-width:500px;"><div class="order-detail__header"><h2 class="order-detail__title">Order #1042</h2></div><div class="order-tracking" style="display:flex;gap:24px;margin:16px 0;"><div class="order-tracking__step order-tracking__step--done"><span class="order-tracking__dot"></span><span class="order-tracking__label">Placed</span></div><div class="order-tracking__step order-tracking__step--done"><span class="order-tracking__dot"></span><span class="order-tracking__label">Shipped</span></div><div class="order-tracking__step order-tracking__step--active"><span class="order-tracking__dot"></span><span class="order-tracking__label">Delivered</span></div></div></div>`,
  },

  "address-book": {
    preview: `<div class="address-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:500px;"><div class="address-card address-card--default" style="padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><span class="address-card__default-tag">Default</span><p class="address-card__name">María García</p><p class="address-card__text">123 Studio Street<br/>Buenos Aires, Argentina</p><div class="address-card__actions"><button class="btn btn--outline btn--sm">Edit</button></div></div><div class="address-card address-card--new" style="padding:16px;border:1px dashed var(--color-border-default);border-radius:8px;text-align:center;display:flex;align-items:center;justify-content:center;"><span>+ Add Address</span></div></div>`,
  },

  "address-form": {
    preview: `<div class="address-form" style="max-width:400px;"><div class="address-form__row" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"><div class="field"><label class="field__label">First Name</label><input class="input__field" type="text" /></div><div class="field"><label class="field__label">Last Name</label><input class="input__field" type="text" /></div></div><div class="field" style="margin-top:12px;"><label class="field__label">Address</label><input class="input__field" type="text" /></div></div>`,
  },

  wishlist: {
    preview: `<div class="wishlist" style="max-width:500px;"><div class="wishlist__header"><h2 class="wishlist__title">My Wishlist</h2></div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:16px;"><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=W1" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Ceramic Vase</h3></div></article></div></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     BLOG  (blog.css)
     ═══════════════════════════════════════════════════════════ */

  "article-card": {
    preview: `<article class="article-card" style="max-width:320px;"><a class="article-card__media" href="#"><img src="https://placehold.co/400x240/f5f0eb/1a1a1a?text=Article" alt="" /></a><div class="article-card__body"><span class="article-card__category">Studio Life</span><h3 class="article-card__title"><a href="#">Behind the Kiln</a></h3><p class="article-card__excerpt">An inside look at the ceramic process.</p></div></article>`,
    variants: {
      standard: `<article class="article-card" style="max-width:280px;"><a class="article-card__media" href="#"><img src="https://placehold.co/280x170/f5f0eb/1a1a1a?text=Standard" alt="" /></a><div class="article-card__body"><h3 class="article-card__title"><a href="#">Standard Card</a></h3></div></article>`,
      featured: `<article class="article-card article-card--featured" style="max-width:480px;"><a class="article-card__media" href="#"><img src="https://placehold.co/480x280/f5f0eb/1a1a1a?text=Featured" alt="" /></a><div class="article-card__body"><h3 class="article-card__title"><a href="#">Featured Card</a></h3></div></article>`,
      minimal: `<article class="article-card article-card--minimal" style="max-width:280px;"><div class="article-card__body"><h3 class="article-card__title"><a href="#">Minimal Card</a></h3><p class="article-card__excerpt">No image variant.</p></div></article>`,
      horizontal: `<article class="article-card article-card--horizontal" style="max-width:480px;"><a class="article-card__media" href="#"><img src="https://placehold.co/160x120/f5f0eb/1a1a1a?text=H" alt="" /></a><div class="article-card__body"><h3 class="article-card__title"><a href="#">Horizontal</a></h3></div></article>`,
      editorial: `<article class="article-card article-card--editorial" style="max-width:320px;"><div class="article-card__body"><h3 class="article-card__title"><a href="#">Editorial Style</a></h3></div></article>`,
    },
  },

  "article-hero": {
    preview: `<div class="article-hero article-hero--image" style="position:relative;min-height:250px;"><div class="article-hero__bg"><img src="https://placehold.co/800x300/f5f0eb/1a1a1a?text=Hero" alt="" style="width:100%;height:100%;object-fit:cover;" /></div><div class="article-hero__overlay"></div><div class="article-hero__content" style="position:relative;padding:32px;"><span class="article-hero__category">Studio Life</span><h1 class="article-hero__title" style="font-size:1.75rem;">Behind the Kiln: A Day in the Studio</h1><div class="article-hero__meta">March 20, 2026</div></div></div>`,
    variants: {
      full: `<div class="article-hero article-hero--image" style="position:relative;min-height:200px;background:#f5f0eb;padding:32px;"><h1 class="article-hero__title">Full Image Hero</h1></div>`,
      split: `<div class="article-hero article-hero--split" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;"><div class="article-hero__media"><img src="https://placehold.co/300x200/f5f0eb/1a1a1a?text=Split" alt="" style="width:100%;" /></div><div class="article-hero__content" style="padding:16px;"><h1 class="article-hero__title">Split Hero</h1></div></div>`,
      "text-only": `<div class="article-hero article-hero--text" style="padding:32px;text-align:center;"><h1 class="article-hero__title">Text-Only Hero</h1><div class="article-hero__meta">March 2026</div></div>`,
    },
  },

  "article-body": {
    preview: `<div class="prose" style="max-width:600px;"><h2>The Art of Ceramics</h2><p>Each piece begins as a lump of clay, transformed through hours of careful work into a functional piece of art.</p><blockquote>"Clay remembers everything."<cite>— Traditional saying</cite></blockquote><h3>The Process</h3><p>From wedging to glazing, every step requires patience and precision.</p></div>`,
  },

  "author-card": {
    preview: `<div class="author-card" style="max-width:400px;display:flex;gap:16px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><img src="https://i.pravatar.cc/64?img=5" alt="" style="border-radius:50%;width:64px;height:64px;" /><div><span class="author-card__name" style="font-weight:600;">María García</span><p class="author-card__bio" style="font-size:14px;">Ceramic artist and studio founder based in Buenos Aires.</p></div></div>`,
    variants: {
      full: `<div class="author-card" style="max-width:400px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><span style="font-weight:600;">Full Author Card</span><p style="font-size:14px;">With complete bio and links.</p></div>`,
      compact: `<div class="author-card author-card--compact" style="display:flex;gap:8px;align-items:center;"><img src="https://i.pravatar.cc/32?img=5" alt="" style="border-radius:50%;width:32px;height:32px;" /><span style="font-weight:600;font-size:14px;">María G.</span></div>`,
    },
  },

  "category-nav": {
    preview: `<nav class="category-nav" style="display:flex;gap:12px;"><a href="#" style="padding:6px 12px;border:1px solid var(--color-border-default);border-radius:20px;font-size:14px;">All</a><a href="#" style="padding:6px 12px;background:var(--color-surface-inverse);color:var(--color-text-on-dark);border-radius:20px;font-size:14px;">Studio Life</a><a href="#" style="padding:6px 12px;border:1px solid var(--color-border-default);border-radius:20px;font-size:14px;">Techniques</a></nav>`,
  },

  "blog-sidebar": {
    preview: `<aside class="blog-sidebar" style="max-width:280px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><h3 style="margin-bottom:12px;">Popular Posts</h3><ul style="list-style:none;padding:0;"><li style="padding:8px 0;border-bottom:1px solid var(--color-border-default);"><a href="#">Behind the Kiln</a></li><li style="padding:8px 0;"><a href="#">Glaze Chemistry</a></li></ul></aside>`,
  },

  comments: {
    preview: `<div class="comments" style="max-width:500px;"><h3>Comments (3)</h3><div style="margin-top:16px;padding:12px 0;border-bottom:1px solid var(--color-border-default);"><p style="font-weight:600;font-size:14px;">Ana R.</p><p style="font-size:14px;">Beautiful article! Love learning about the process.</p></div></div>`,
  },

  "reading-progress": {
    preview: `<div class="reading-progress" style="position:relative;height:4px;background:var(--color-surface-secondary);border-radius:2px;"><div style="width:35%;height:100%;background:var(--color-text-accent);border-radius:2px;"></div></div>`,
  },

  "related-articles": {
    preview: `<div class="related-articles" style="max-width:600px;"><h3>Related Articles</h3><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:12px;"><article class="article-card"><a class="article-card__media" href="#"><img src="https://placehold.co/280x170/f5f0eb/1a1a1a?text=R1" alt="" /></a><div class="article-card__body"><h4 class="article-card__title"><a href="#">Glaze Chemistry</a></h4></div></article><article class="article-card"><a class="article-card__media" href="#"><img src="https://placehold.co/280x170/f5f0eb/1a1a1a?text=R2" alt="" /></a><div class="article-card__body"><h4 class="article-card__title"><a href="#">Studio Tour</a></h4></div></article></div></div>`,
  },

  "share-buttons": {
    preview: `<div class="share-buttons" style="display:flex;gap:8px;"><button class="btn btn--outline btn--sm">Twitter</button><button class="btn btn--outline btn--sm">Facebook</button><button class="btn btn--outline btn--sm">Copy Link</button></div>`,
    variants: {
      inline: `<div class="share-buttons share-buttons--inline" style="display:flex;gap:8px;"><button class="btn btn--outline btn--sm">Share</button></div>`,
      sticky: `<div class="share-buttons share-buttons--sticky" style="display:flex;flex-direction:column;gap:8px;"><button class="btn btn--outline btn--sm">T</button><button class="btn btn--outline btn--sm">F</button></div>`,
    },
  },

  "table-of-contents": {
    preview: `<nav class="toc" style="max-width:280px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><h4>Contents</h4><ul style="list-style:none;padding:0;margin-top:8px;font-size:14px;"><li style="padding:4px 0;"><a href="#">Introduction</a></li><li style="padding:4px 0;"><a href="#">The Process</a></li><li style="padding:4px 0;"><a href="#">Materials</a></li></ul></nav>`,
    variants: {
      default: `<nav class="toc" style="max-width:250px;padding:12px;border:1px solid var(--color-border-default);border-radius:8px;"><h4>TOC</h4></nav>`,
      sticky: `<nav class="toc toc--sticky" style="max-width:250px;padding:12px;border:1px solid var(--color-border-default);border-radius:8px;"><h4>Sticky TOC</h4></nav>`,
    },
  },

  /* ═══════════════════════════════════════════════════════════
     SECTIONS  (sections.css)
     ═══════════════════════════════════════════════════════════ */

  "hero-section": {
    preview: `<div class="hero-section" style="position:relative;min-height:300px;display:flex;align-items:center;justify-content:center;background:#f5f0eb;"><div class="hero-section__content" style="text-align:center;"><span class="hero-section__eyebrow">New Collection</span><h1 class="hero-section__title" style="font-size:2rem;">Artisan Ceramics</h1><p class="hero-section__subtitle">Handcrafted pieces for modern living.</p><div class="hero-section__actions"><button class="btn">Shop Now</button></div></div></div>`,
    variants: {
      full: `<div class="hero-section" style="min-height:200px;background:#f5f0eb;display:flex;align-items:center;justify-content:center;"><div class="hero-section__content" style="text-align:center;"><h1 class="hero-section__title">Full Hero</h1></div></div>`,
      split: `<div class="hero-section hero-section--split" style="display:grid;grid-template-columns:1fr 1fr;"><div class="hero-section__media" style="background:#f5f0eb;min-height:200px;"></div><div class="hero-section__content" style="padding:24px;"><h1 class="hero-section__title">Split Hero</h1></div></div>`,
      "text-only": `<div class="hero-section hero-section--text-only" style="padding:48px;text-align:center;"><div class="hero-section__content"><h1 class="hero-section__title">Text Only Hero</h1></div></div>`,
    },
  },

  "featured-collection": {
    preview: `<div class="featured-collection"><div class="featured-collection__header"><h2 class="featured-collection__title">Featured Collection</h2><a class="featured-collection__link" href="#">View All</a></div><div class="featured-collection__grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;"><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=1" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Vase</h3></div></article><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=2" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Bowl</h3></div></article><article class="product-card"><div class="product-card__media"><img class="product-card__image" src="https://placehold.co/200x250/f5f0eb/1a1a1a?text=3" alt="" /></div><div class="product-card__body"><h3 class="product-card__title">Plate</h3></div></article></div></div>`,
  },

  "image-text": {
    preview: `<div class="image-text" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:700px;"><div class="image-text__media"><img src="https://placehold.co/350x250/f5f0eb/1a1a1a?text=Image" alt="" style="width:100%;border-radius:8px;" /></div><div class="image-text__content"><span class="image-text__eyebrow">Our Story</span><h2 class="image-text__title">Crafted with Purpose</h2><p class="image-text__body">Every piece is made with intention, connecting the maker's hand to the everyday.</p><a class="image-text__cta btn" href="#">Learn More</a></div></div>`,
  },

  multicolumn: {
    preview: `<div class="multicolumn"><div class="multicolumn__header"><h2 class="multicolumn__title">Why Choose Us</h2></div><div class="multicolumn__grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;"><div class="multicolumn__item"><span class="multicolumn__icon">🏺</span><h3 class="multicolumn__item-title">Handmade</h3><p class="multicolumn__item-text">Every piece crafted by hand.</p></div><div class="multicolumn__item"><span class="multicolumn__icon">🌿</span><h3 class="multicolumn__item-title">Sustainable</h3><p class="multicolumn__item-text">Eco-friendly materials.</p></div><div class="multicolumn__item"><span class="multicolumn__icon">✨</span><h3 class="multicolumn__item-title">Unique</h3><p class="multicolumn__item-text">No two pieces alike.</p></div></div></div>`,
  },

  "gallery-grid": {
    preview: `<div class="gallery-grid"><div class="gallery-grid__header"><h2 class="gallery-grid__title">Gallery</h2></div><div class="gallery-grid__items" style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;"><div class="gallery-grid__item"><img src="https://placehold.co/200x200/f5f0eb/1a1a1a?text=1" alt="" style="width:100%;" /></div><div class="gallery-grid__item"><img src="https://placehold.co/200x200/f5f0eb/1a1a1a?text=2" alt="" style="width:100%;" /></div><div class="gallery-grid__item"><img src="https://placehold.co/200x200/f5f0eb/1a1a1a?text=3" alt="" style="width:100%;" /></div></div></div>`,
  },

  lookbook: {
    preview: `<div class="lookbook"><div class="lookbook__header"><h2 class="lookbook__title">Lookbook</h2></div><div class="lookbook__grid" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div class="lookbook__cell"><img src="https://placehold.co/300x200/f5f0eb/1a1a1a?text=Look+1" alt="" style="width:100%;" /><span class="lookbook__caption">Spring Collection</span></div><div class="lookbook__cell"><img src="https://placehold.co/300x200/f5f0eb/1a1a1a?text=Look+2" alt="" style="width:100%;" /><span class="lookbook__caption">Studio Series</span></div></div></div>`,
  },

  "video-section": {
    preview: `<div class="video-section" style="max-width:500px;"><div class="video-section__wrapper" style="position:relative;"><img class="video-section__poster" src="https://placehold.co/500x280/f5f0eb/1a1a1a?text=Video" alt="" style="width:100%;border-radius:8px;" /><button class="video-section__play" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"><svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.5)"/><polygon points="20,16 34,24 20,32" fill="white"/></svg></button></div><p class="video-section__caption">Watch our studio process</p></div>`,
  },

  "brand-story": {
    preview: `<div class="brand-story" style="max-width:700px;"><div class="brand-story__grid" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;"><div class="brand-story__media"><img src="https://placehold.co/300x250/f5f0eb/1a1a1a?text=Story" alt="" style="width:100%;border-radius:8px;" /></div><div class="brand-story__content"><span class="brand-story__eyebrow">Our Story</span><h2 class="brand-story__title">Born from Clay</h2><p class="brand-story__text">Founded in a small Buenos Aires studio, The Gallery brings artisan ceramics to the world.</p></div></div></div>`,
  },

  "faq-section": {
    preview: `<div class="faq-section" style="max-width:600px;"><div class="faq-section__header"><h2>Frequently Asked Questions</h2></div><div class="accordion"><div class="accordion__item"><button class="accordion__trigger" aria-expanded="true"><span>How do I care for ceramics?</span></button><div class="accordion__panel"><div class="accordion__content"><p>Hand wash with mild soap. Avoid extreme temperatures.</p></div></div></div><div class="accordion__item"><button class="accordion__trigger" aria-expanded="false"><span>Do you ship internationally?</span></button></div></div></div>`,
  },

  "before-after": {
    preview: `<div class="before-after" style="max-width:500px;display:grid;grid-template-columns:1fr 1fr;gap:4px;"><div><img src="https://placehold.co/250x200/d4c5b0/1a1a1a?text=Before" alt="Before" style="width:100%;border-radius:8px 0 0 8px;" /><span style="display:block;text-align:center;font-size:13px;margin-top:4px;">Before</span></div><div><img src="https://placehold.co/250x200/f5f0eb/1a1a1a?text=After" alt="After" style="width:100%;border-radius:0 8px 8px 0;" /><span style="display:block;text-align:center;font-size:13px;margin-top:4px;">After</span></div></div>`,
  },

  "collage-section": {
    preview: `<div class="collage-section" style="display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr 1fr;gap:8px;max-width:500px;"><div style="grid-row:span 2;"><img src="https://placehold.co/300x400/f5f0eb/1a1a1a?text=Main" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" /></div><div><img src="https://placehold.co/200x195/f5f0eb/1a1a1a?text=Top" alt="" style="width:100%;border-radius:8px;" /></div><div><img src="https://placehold.co/200x195/f5f0eb/1a1a1a?text=Bottom" alt="" style="width:100%;border-radius:8px;" /></div></div>`,
  },

  "comparison-table": {
    preview: `<div class="comparison-table" style="max-width:600px;"><div class="table-wrapper"><table class="table"><thead><tr><th>Feature</th><th>Basic</th><th>Premium</th></tr></thead><tbody><tr><td>Handmade</td><td>✓</td><td>✓</td></tr><tr><td>Certificate</td><td>—</td><td>✓</td></tr><tr><td>Gift Box</td><td>—</td><td>✓</td></tr></tbody></table></div></div>`,
  },

  "contact-section": {
    preview: `<div class="contact-section" style="max-width:500px;display:grid;grid-template-columns:1fr 1fr;gap:24px;"><div><h3>Get in Touch</h3><p style="font-size:14px;">Buenos Aires, Argentina<br/>hello@thegallery.co</p></div><form><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" /></div><div class="field" style="margin-top:8px;"><label class="field__label">Message</label><textarea class="textarea__field" rows="3"></textarea></div><button class="btn" style="margin-top:8px;">Send</button></form></div>`,
  },

  "instagram-feed": {
    preview: `<div class="instagram-feed" style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;max-width:500px;"><img src="https://placehold.co/120x120/f5f0eb/1a1a1a?text=1" alt="" style="width:100%;" /><img src="https://placehold.co/120x120/f5f0eb/1a1a1a?text=2" alt="" style="width:100%;" /><img src="https://placehold.co/120x120/f5f0eb/1a1a1a?text=3" alt="" style="width:100%;" /><img src="https://placehold.co/120x120/f5f0eb/1a1a1a?text=4" alt="" style="width:100%;" /></div>`,
  },

  "logo-bar": {
    preview: `<div class="logo-bar" style="display:flex;justify-content:center;gap:32px;align-items:center;padding:24px;"><span style="font-size:18px;opacity:0.5;font-weight:600;">Brand A</span><span style="font-size:18px;opacity:0.5;font-weight:600;">Brand B</span><span style="font-size:18px;opacity:0.5;font-weight:600;">Brand C</span><span style="font-size:18px;opacity:0.5;font-weight:600;">Brand D</span></div>`,
  },

  marquee: {
    preview: `<div class="marquee" style="overflow:hidden;white-space:nowrap;padding:12px 0;"><span style="display:inline-block;padding:0 32px;">Free Shipping on Orders $150+ ✦</span><span style="display:inline-block;padding:0 32px;">Handcrafted in Buenos Aires ✦</span><span style="display:inline-block;padding:0 32px;">Each Piece is Unique ✦</span></div>`,
  },

  "rich-text-section": {
    preview: `<div class="rich-text-section" style="max-width:600px;"><div class="prose"><h2>About Our Studio</h2><p>We create unique ceramic pieces that blend traditional craftsmanship with contemporary design.</p></div></div>`,
  },

  "shipping-info": {
    preview: `<div class="shipping-info" style="max-width:500px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;"><div><span style="font-size:24px;">🚚</span><p style="font-weight:600;font-size:14px;">Free Shipping</p><p style="font-size:13px;">Orders over $150</p></div><div><span style="font-size:24px;">↩️</span><p style="font-weight:600;font-size:14px;">Easy Returns</p><p style="font-size:13px;">30-day policy</p></div><div><span style="font-size:24px;">🔒</span><p style="font-weight:600;font-size:14px;">Secure Payment</p><p style="font-size:13px;">SSL encrypted</p></div></div>`,
  },

  "stats-section": {
    preview: `<div class="stats-section" style="display:flex;gap:32px;justify-content:center;padding:24px;"><div class="stat"><span class="stat__value">500+</span><span class="stat__label">Artisans</span></div><div class="stat"><span class="stat__value">10K+</span><span class="stat__label">Pieces Made</span></div><div class="stat"><span class="stat__value">25</span><span class="stat__label">Countries</span></div></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     STORYTELLING  (storytelling.css)
     ═══════════════════════════════════════════════════════════ */

  "artist-profile": {
    preview: `<div class="artist-profile" style="display:grid;grid-template-columns:200px 1fr;gap:24px;max-width:600px;"><div class="artist-profile__portrait" style="aspect-ratio:1;overflow:hidden;border-radius:8px;"><img src="https://placehold.co/200x200/f5f0eb/1a1a1a?text=Artist" alt="" style="width:100%;height:100%;object-fit:cover;" /></div><div class="artist-profile__content"><span class="artist-profile__label">Featured Artist</span><h2 class="artist-profile__name">María García</h2><span class="artist-profile__location">Buenos Aires, Argentina</span><p class="artist-profile__bio">Ceramic artist specializing in hand-thrown stoneware with traditional glazing techniques.</p></div></div>`,
  },

  "artist-card": {
    preview: `<div class="artist-card" style="max-width:280px;"><div class="artist-card__portrait"><img src="https://placehold.co/280x350/f5f0eb/1a1a1a?text=Artist" alt="" style="width:100%;border-radius:8px;" /></div><h3 class="artist-card__name">María García</h3><span class="artist-card__medium">Ceramics</span><span class="artist-card__location">Buenos Aires</span><span class="artist-card__piece-count">42 pieces</span></div>`,
  },

  "artist-index": {
    preview: `<div class="artist-index" style="max-width:600px;"><div class="artist-index__header"><h1 class="artist-index__heading">Our Artists</h1><p class="artist-index__intro">Meet the makers behind every piece.</p></div><div class="artist-index__filters" style="display:flex;gap:8px;margin:16px 0;"><button class="artist-index__filter-btn" aria-pressed="true">All</button><button class="artist-index__filter-btn">Ceramics</button><button class="artist-index__filter-btn">Textiles</button></div></div>`,
  },

  "artist-statement": {
    preview: `<div class="artist-statement" style="max-width:500px;padding:24px;border-left:3px solid var(--color-text-accent);"><blockquote style="font-style:italic;font-size:1.1rem;">"I believe every piece of clay carries the memory of the earth it came from."</blockquote><cite style="display:block;margin-top:8px;font-size:14px;">— María García</cite></div>`,
  },

  "process-timeline": {
    preview: `<div class="process-timeline" style="max-width:600px;"><h2 class="process-timeline__title">Our Process</h2><div class="process-timeline__track" style="display:flex;gap:24px;"><div class="process-step"><span class="process-step__number">1</span><h4 class="process-step__title">Shaping</h4><p class="process-step__description">Hand-thrown on the potter's wheel.</p></div><div class="process-step"><span class="process-step__number">2</span><h4 class="process-step__title">Glazing</h4><p class="process-step__description">Custom glazes applied by hand.</p></div><div class="process-step"><span class="process-step__number">3</span><h4 class="process-step__title">Firing</h4><p class="process-step__description">Kiln-fired for durability.</p></div></div></div>`,
  },

  certificate: {
    preview: `<div class="coa" style="max-width:400px;padding:24px;border:1px solid var(--color-border-default);border-radius:8px;"><div class="coa__header"><h3 class="coa__title">Certificate of Authenticity</h3><span class="coa__artist">María García</span></div><div class="coa__divider" style="border-top:1px solid var(--color-border-default);margin:16px 0;"></div><div class="coa__details"><dl style="display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:14px;"><dt class="coa__detail-label">Edition</dt><dd class="coa__detail-value">#42 of 100</dd><dt class="coa__detail-label">Material</dt><dd class="coa__detail-value">Stoneware</dd><dt class="coa__detail-label">Year</dt><dd class="coa__detail-value">2026</dd></dl></div></div>`,
  },

  "collection-story": {
    preview: `<div class="collection-story" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:700px;"><div class="collection-story__media"><img src="https://placehold.co/350x250/f5f0eb/1a1a1a?text=Collection" alt="" style="width:100%;border-radius:8px;" /></div><div class="collection-story__content"><span class="collection-story__label">Spring 2026</span><h2 class="collection-story__title">Earth & Water</h2><p class="collection-story__text">Inspired by the landscapes of Patagonia, this collection celebrates the raw beauty of nature.</p></div></div>`,
  },

  "masonry-gallery": {
    preview: `<div class="masonry-gallery" style="columns:3;gap:8px;max-width:500px;"><div class="masonry-gallery__item" style="break-inside:avoid;margin-bottom:8px;"><div class="gallery-piece"><img src="https://placehold.co/160x200/f5f0eb/1a1a1a?text=1" alt="" style="width:100%;border-radius:4px;" /></div></div><div class="masonry-gallery__item" style="break-inside:avoid;margin-bottom:8px;"><div class="gallery-piece"><img src="https://placehold.co/160x140/f5f0eb/1a1a1a?text=2" alt="" style="width:100%;border-radius:4px;" /></div></div><div class="masonry-gallery__item" style="break-inside:avoid;margin-bottom:8px;"><div class="gallery-piece"><img src="https://placehold.co/160x180/f5f0eb/1a1a1a?text=3" alt="" style="width:100%;border-radius:4px;" /></div></div></div>`,
  },

  "exhibition-page": {
    preview: `<div class="exhibition-page" style="max-width:600px;"><div class="exhibition-hero" style="position:relative;min-height:200px;background:#f5f0eb;border-radius:8px;display:flex;align-items:flex-end;padding:24px;"><div class="exhibition-hero__content"><span class="exhibition-hero__label">Current Exhibition</span><h1 class="exhibition-hero__title" style="font-size:1.5rem;">Earth Forms</h1><span class="exhibition-hero__dates">March 1 – April 30, 2026</span><span class="exhibition-hero__location">Buenos Aires Studio</span></div></div></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     CERAMICS  (ceramics.css)
     ═══════════════════════════════════════════════════════════ */

  "material-library": {
    preview: `<div class="material-library" style="max-width:600px;"><div class="material-library__header"><h2 class="material-library__title">Materials</h2></div><div class="material-library__grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;"><div class="material-card"><div class="material-card__swatch" style="aspect-ratio:1;background:#c4a882;border-radius:8px;"></div><div class="material-card__body"><h4 class="material-card__name">Stoneware</h4><span class="material-card__type">High-fire</span></div></div><div class="material-card"><div class="material-card__swatch" style="aspect-ratio:1;background:#e8ddd0;border-radius:8px;"></div><div class="material-card__body"><h4 class="material-card__name">Porcelain</h4><span class="material-card__type">High-fire</span></div></div></div></div>`,
  },

  "glaze-guide": {
    preview: `<div class="glaze-guide" style="max-width:400px;"><div class="glaze-guide__header"><h2 class="glaze-guide__title">Glaze Guide</h2></div><div class="glaze-guide__grid" style="display:flex;gap:16px;"><div class="glaze-swatch"><div class="glaze-swatch__circle" style="width:48px;height:48px;border-radius:50%;background:#5a7d6f;"></div><span class="glaze-swatch__name">Celadon</span><span class="glaze-swatch__code">#5a7d6f</span></div><div class="glaze-swatch"><div class="glaze-swatch__circle" style="width:48px;height:48px;border-radius:50%;background:#c4a882;"></div><span class="glaze-swatch__name">Sand</span><span class="glaze-swatch__code">#c4a882</span></div></div></div>`,
  },

  "technique-explainer": {
    preview: `<div class="technique-explainer" style="max-width:500px;"><div class="technique-explainer__header"><h2 class="technique-explainer__title">Raku Firing</h2></div><div class="technique-step"><span class="technique-step__number">1</span><h4 class="technique-step__name">Bisque Fire</h4><p class="technique-step__description">Initial firing at low temperature.</p></div><div class="technique-step"><span class="technique-step__number">2</span><h4 class="technique-step__name">Glaze & Re-fire</h4><p class="technique-step__description">Apply glaze and fire rapidly.</p></div></div>`,
  },

  "care-instructions": {
    preview: `<div class="care-instructions" style="max-width:400px;"><h3 class="care-instructions__title">Care Instructions</h3><div class="care-instructions__grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"><div class="care-item"><span class="care-item__icon">🧽</span><span class="care-item__label">Hand wash only</span></div><div class="care-item"><span class="care-item__icon">🌡️</span><span class="care-item__label">Avoid extreme heat</span></div><div class="care-item"><span class="care-item__icon">💧</span><span class="care-item__label">Dry thoroughly</span></div></div></div>`,
  },

  dimensions: {
    preview: `<div class="dimensions" style="max-width:400px;"><div class="dimensions__table"><dl><dt>Height</dt><dd>25 cm</dd><dt>Width</dt><dd>12 cm</dd><dt>Weight</dt><dd>450 g</dd></dl></div></div>`,
  },

  "firing-info": {
    preview: `<div class="firing-info" style="max-width:400px;"><h4 class="firing-info__title">Firing Details</h4><div class="firing-info__list"><div class="firing-info__item"><dt>Technique</dt><dd>High-fire reduction</dd></div><div class="firing-info__item"><dt>Temperature</dt><dd>1280°C / Cone 10</dd></div></div></div>`,
  },

  "ceramics-faq": {
    preview: `<div class="ceramics-faq" style="max-width:500px;"><h3>Ceramics FAQ</h3><div class="accordion"><div class="accordion__item"><button class="accordion__trigger" aria-expanded="true"><span>Is it microwave safe?</span></button><div class="accordion__panel"><div class="accordion__content"><p>Our stoneware is microwave safe for reheating.</p></div></div></div></div></div>`,
  },

  "ceramics-glossary": {
    preview: `<div class="ceramics-glossary" style="max-width:500px;"><h3>Glossary</h3><dl class="data-list"><div class="data-list__item"><dt class="data-list__key">Bisque</dt><dd class="data-list__value">Unglazed clay that has been fired once.</dd></div><div class="data-list__item"><dt class="data-list__key">Celadon</dt><dd class="data-list__value">Green-tinted glaze originating from East Asia.</dd></div></dl></div>`,
  },

  "certificate-details": {
    preview: `<div class="certificate-details" style="max-width:400px;padding:16px;border:1px solid var(--color-border-default);border-radius:8px;"><dl class="data-list"><div class="data-list__item"><dt class="data-list__key">Artist</dt><dd class="data-list__value">María García</dd></div><div class="data-list__item"><dt class="data-list__key">Edition</dt><dd class="data-list__value">#42 / 100</dd></div><div class="data-list__item"><dt class="data-list__key">Signed</dt><dd class="data-list__value">Yes</dd></div></dl></div>`,
  },

  "edition-badge": {
    preview: `<span class="edition-badge">Limited Edition #42 / 100</span>`,
    variants: {
      default: `<span class="edition-badge">Edition #42 / 100</span>`,
      limited: `<span class="edition-badge edition-badge--limited">Limited Edition #42 / 100</span>`,
    },
  },

  "makers-mark": {
    preview: `<div class="makers-mark" style="display:flex;align-items:center;gap:12px;"><img src="https://placehold.co/48x48/f5f0eb/1a1a1a?text=M" alt="Maker's mark" style="border-radius:50%;" /><div><span style="font-weight:600;">María García</span><span style="font-size:13px;display:block;">Buenos Aires Studio</span></div></div>`,
  },

  "commission-form": {
    preview: `<div class="commission-form" style="max-width:480px;"><h3>Request a Commission</h3><form style="margin-top:16px;"><div class="field"><label class="field__label">Name</label><input class="input__field" type="text" /></div><div class="field" style="margin-top:12px;"><label class="field__label">Description</label><textarea class="textarea__field" rows="3" placeholder="Describe your vision…"></textarea></div><button class="btn" style="margin-top:12px;">Submit Request</button></form></div>`,
  },

  "studio-tour": {
    preview: `<div class="studio-tour" style="max-width:500px;"><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;"><img src="https://placehold.co/240x180/f5f0eb/1a1a1a?text=Studio+1" alt="" style="width:100%;border-radius:8px;" /><img src="https://placehold.co/240x180/f5f0eb/1a1a1a?text=Studio+2" alt="" style="width:100%;border-radius:8px;" /></div><p style="margin-top:12px;">Visit our studio in Buenos Aires. Tours available by appointment.</p></div>`,
  },

  "workshop-listing": {
    preview: `<div class="workshop-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:500px;"><div class="card" style="padding:16px;"><h4>Intro to Wheel Throwing</h4><p style="font-size:14px;">Sat, April 5 · 2PM</p><span class="badge badge--success">Spots Available</span></div><div class="card" style="padding:16px;"><h4>Glaze Workshop</h4><p style="font-size:14px;">Sat, April 12 · 2PM</p><span class="badge badge--warning">Almost Full</span></div></div>`,
  },

  /* ═══════════════════════════════════════════════════════════
     PAGES  (pages.css, coming-soon.css)
     ═══════════════════════════════════════════════════════════ */

  "page-404": {
    preview: `<div class="page-404" style="text-align:center;padding:48px 24px;max-width:500px;"><div class="page-404__code">404</div><h1 class="page-404__heading">Page Not Found</h1><p class="page-404__text">The page you're looking for doesn't exist or has been moved.</p><div class="page-404__links" style="margin-top:16px;display:flex;gap:12px;justify-content:center;"><a class="page-404__link btn" href="#">Go Home</a><a class="page-404__link btn btn--outline" href="#">Contact Us</a></div></div>`,
  },

  "gift-card": {
    preview: `<div class="gift-card" style="max-width:400px;text-align:center;"><div class="gift-card__visual" style="background:#f5f0eb;padding:32px;border-radius:12px;"><span class="gift-card__brand" style="font-weight:600;">The Gallery</span><span class="gift-card__amount" style="display:block;font-size:2rem;margin:8px 0;">$100</span></div><h2 class="gift-card__heading" style="margin-top:16px;">Your Gift Card</h2><div class="gift-card__code-wrapper" style="margin-top:8px;"><code class="gift-card__code" style="font-size:18px;letter-spacing:2px;">GIFT-ABCD-1234</code></div></div>`,
  },

  "policy-page": {
    preview: `<div class="policy-page" style="max-width:600px;"><div class="policy-page__header"><h1 class="policy-page__title">Privacy Policy</h1><span class="policy-page__date">Last updated: March 2026</span></div><div class="policy-page__body" style="margin-top:16px;"><h2>Information We Collect</h2><p>We collect information you provide directly, including name and email address.</p></div></div>`,
  },

  "checkout-progress": {
    preview: `<div class="checkout-progress" style="display:flex;align-items:center;gap:16px;"><div class="checkout-progress__step" data-status="complete"><div class="checkout-progress__indicator">✓</div><span class="checkout-progress__label">Cart</span></div><div class="checkout-progress__step" data-status="current"><div class="checkout-progress__indicator">2</div><span class="checkout-progress__label">Shipping</span></div><div class="checkout-progress__step"><div class="checkout-progress__indicator">3</div><span class="checkout-progress__label">Payment</span></div></div>`,
  },

  "coming-soon": {
    preview: `<div class="coming-soon" style="position:relative;min-height:300px;display:flex;align-items:center;justify-content:center;background:#f5f0eb;border-radius:8px;"><div class="coming-soon__inner" style="text-align:center;"><h1 class="coming-soon__heading" style="font-size:1.75rem;">Coming Soon</h1><p class="coming-soon__subtitle">Something exciting is brewing in the studio.</p><form class="coming-soon__form" style="display:flex;gap:8px;margin-top:16px;"><input class="coming-soon__input" type="email" placeholder="your@email.com" /><button class="coming-soon__submit btn">Notify Me</button></form></div></div>`,
  },
};

/** Get the full example object for a component. */
export function getComponentExamples(slug: string): ComponentExamples | null {
  return examples[slug] ?? null;
}

/** Legacy helper — returns just the preview HTML. */
export function getExample(slug: string): string | null {
  return examples[slug]?.preview ?? null;
}

export default examples;
