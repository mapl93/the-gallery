import { getComponents, getCategories } from '../lib/registry';

const components = getComponents();
const categories = getCategories();

export default function Home() {
  return (
    <>
      <h1>The Gallery Design System</h1>
      <p>
        A platform-agnostic CSS component library for editorial e-commerce. Built
        with design tokens, BEM naming, and zero JavaScript dependencies.
      </p>

      <div className="docs-stats">
        <div>
          <div className="docs-stat__value">{components.length}</div>
          <div className="docs-stat__label">Components</div>
        </div>
        <div>
          <div className="docs-stat__value">{categories.length}</div>
          <div className="docs-stat__label">Categories</div>
        </div>
        <div>
          <div className="docs-stat__value">19</div>
          <div className="docs-stat__label">CSS Files</div>
        </div>
        <div>
          <div className="docs-stat__value">11,302</div>
          <div className="docs-stat__label">Lines of CSS</div>
        </div>
      </div>

      <h2>Quick Start</h2>
      <p>Install via the CLI or copy individual component files.</p>
      <div className="docs-code">
        <code>npx the-gallery add button</code>
      </div>
      <p style={{ marginTop: 8 }}>Or install everything:</p>
      <div className="docs-code">
        <code>npx the-gallery init</code>
      </div>

      <h2>Architecture</h2>
      <div className="docs-code">
        <code>{`components/css/
├── index.css          ← Entry point (@imports all files)
├── foundations.css     ← Token-powered utility classes
├── primitives.css     ← Buttons, badges, inputs, cards…
├── layout.css         ← Containers, grids, stacks, sidebar…
├── forms.css          ← Text fields, selects, file upload…
├── global.css         ← Header, footer, nav, mega menu…
├── product.css        ← Product cards, galleries, variants…
├── collection.css     ← Collection grids, filters, sorting…
├── cart.css           ← Cart drawer, line items, checkout…
├── account.css        ← Profile, orders, address forms…
├── blog.css           ← Article cards, author bios, TOC…
├── storytelling.css   ← Artist profiles, exhibitions, timeline…
├── marketing.css      ← Newsletter, banners, popups…
├── sections.css       ← Full-width sections, Instagram…
├── ceramics.css       ← Craft-specific: kiln log, glaze…
├── reviews.css        ← Star ratings, review cards…
├── pages.css          ← Store locator, about, contact…
└── coming-soon.css    ← Maintenance / launch page`}</code>
      </div>

      <h2>Design Principles</h2>
      <ul style={{ paddingLeft: 20, color: 'var(--docs-color-text-2)', lineHeight: 1.8 }}>
        <li><strong>Token-first</strong> — Every value references a design token. Change tokens to retheme.</li>
        <li><strong>BEM naming</strong> — <code className="docs-inline-code">.block__element--modifier</code> for predictable specificity.</li>
        <li><strong>Zero JS</strong> — Pure CSS with modern features: <code className="docs-inline-code">color-mix()</code>, <code className="docs-inline-code">{':has()'}</code>, <code className="docs-inline-code">{':focus-visible'}</code>.</li>
        <li><strong>Accessible</strong> — ARIA selectors style interactive states.</li>
        <li><strong>Platform-agnostic</strong> — Works with Shopify, Webflow, Framer, plain HTML.</li>
        <li><strong>Responsive</strong> — Mobile-first with breakpoints at 640 / 768 / 1024px.</li>
      </ul>

      <h2>Categories</h2>
      <div className="docs-categories">
        {categories.map((cat) => (
          <a href={`/components#${cat.key}`} className="docs-category-card" key={cat.key}>
            <div className="docs-category-card__name">{cat.name}</div>
            <div className="docs-category-card__desc">{cat.description}</div>
            <div className="docs-category-card__count">{cat.count} components</div>
          </a>
        ))}
      </div>
    </>
  );
}
