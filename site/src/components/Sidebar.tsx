import { NavLink } from 'react-router-dom';
import { getCategories, getComponentsByCategory } from '../lib/registry';

const categories = getCategories();

export default function Sidebar() {
  return (
    <aside className="docs-sidebar">
      <NavLink className="docs-sidebar__title" to="/">
        The Gallery <span>v0.3</span>
      </NavLink>

      <div className="docs-sidebar__group">
        <div className="docs-sidebar__label">Getting Started</div>
        <NavLink className="docs-sidebar__link" to="/" end>Overview</NavLink>
        <NavLink className="docs-sidebar__link" to="/foundations">Foundations</NavLink>
        <NavLink className="docs-sidebar__link" to="/components">Components</NavLink>
        <NavLink className="docs-sidebar__link" to="/tokens">Tokens</NavLink>
      </div>

      {categories.map((cat) => {
        const components = getComponentsByCategory(cat.key);
        return (
          <div className="docs-sidebar__group" key={cat.key}>
            <div className="docs-sidebar__label">
              {cat.name}
              <span className="docs-sidebar__count">{cat.count}</span>
            </div>
            {components.map((comp) => (
              <NavLink
                key={comp.slug}
                className="docs-sidebar__link"
                to={`/components/${comp.slug}`}
              >
                {comp.name}
              </NavLink>
            ))}
          </div>
        );
      })}
    </aside>
  );
}
