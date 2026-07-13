import { getComponents, getCategories } from '../lib/registry';
import { getComponentContracts } from '../lib/contracts';

const components = getComponents();
const categories = getCategories();
const contracts = getComponentContracts();

export default function Home() {
  return (
    <>
      <h1>The Gallery Design System</h1>
      <p>
        A platform-agnostic design system for editorial e-commerce. The repo is
        the source of truth for tokens, component contracts, target adapters,
        registry metadata, documentation, and copy-and-own distribution.
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
          <div className="docs-stat__value">{contracts.length}</div>
          <div className="docs-stat__label">Contracts</div>
        </div>
        <div>
          <div className="docs-stat__value">5</div>
          <div className="docs-stat__label">Target Tiers</div>
        </div>
      </div>

      <div className="docs-feature-grid">
        <a className="docs-feature-card" href="/architecture">
          <span className="docs-feature-card__label">Model</span>
          <h3>Architecture</h3>
          <p>See how repo source becomes tokens, contracts, adapters, target outputs, and consumer-owned code.</p>
        </a>
        <a className="docs-feature-card" href="/contracts">
          <span className="docs-feature-card__label">Source</span>
          <h3>Contracts</h3>
          <p>Browse the component contracts that define anatomy, variants, states, behavior, tokens, and adapters.</p>
        </a>
        <a className="docs-feature-card" href="/adapters">
          <span className="docs-feature-card__label">Targets</span>
          <h3>Adapters</h3>
          <p>Inspect the generated neutral web adapter bundle, manifest, load order, and coverage.</p>
        </a>
        <a className="docs-feature-card" href="/tokens">
          <span className="docs-feature-card__label">Values</span>
          <h3>Tokens</h3>
          <p>Inspect the value layer that feeds web, Shopify, design tools, and future native targets.</p>
        </a>
        <a className="docs-feature-card" href="/components">
          <span className="docs-feature-card__label">Gallery</span>
          <h3>Components</h3>
          <p>Explore previews, usage guidance, API notes, and contracts for individual components.</p>
        </a>
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

      <h2>Current Web Adapter</h2>
      <div className="docs-code">
        <code>{`platforms/web/
├── index.css          ← Complete neutral web stylesheet entry
├── tokens.css         ← Generated token target from tokens/source
├── components.css     ← Generated component CSS bundle
├── theme.js           ← Shared progressive enhancement
└── adapter.manifest.json

components/css/
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
        <li><strong>Progressive enhancement</strong> — CSS first, with shared JS only where behavior needs state.</li>
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
