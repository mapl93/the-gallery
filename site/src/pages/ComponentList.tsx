import { Link } from 'react-router-dom';
import { getCategories, getComponentsByCategory } from '../lib/registry';
import { hasComponentContract } from '../lib/contracts';

const categories = getCategories();

export default function ComponentList() {
  return (
    <>
      <h1>Components</h1>
      <p>
        {categories.reduce((sum, c) => sum + c.count, 0)} components across{' '}
        {categories.length} categories. Click any component to see docs,
        previews, and installation instructions.
      </p>

      {categories.map((cat) => {
        const comps = getComponentsByCategory(cat.key);
        return (
          <section key={cat.key} id={cat.key} style={{ marginTop: 'var(--docs-space-xl)' }}>
            <h2>{cat.name}</h2>
            <p style={{ color: 'var(--docs-color-text-2)', marginBottom: 'var(--docs-space-md)' }}>
              {cat.description}
            </p>
            <div className="docs-component-grid">
              {comps.map((comp) => (
                <Link
                  key={comp.slug}
                  to={`/components/${comp.slug}`}
                  className="docs-component-card"
                >
                  <div className="docs-component-card__top">
                    <div className="docs-component-card__name">{comp.name}</div>
                    {hasComponentContract(comp.slug) && <span className="docs-component-card__badge">Contract</span>}
                  </div>
                  <div className="docs-component-card__selector">{comp.selector}</div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
