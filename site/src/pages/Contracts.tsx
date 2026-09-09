import { Link } from 'react-router-dom';
import { getComponentContracts } from '../lib/contracts';
import { getComponent } from '../lib/registry';

const contracts = getComponentContracts();
const behaviorContracts = contracts.filter((contract) => (contract.behavior ?? []).length > 0);
const webImplemented = contracts.filter((contract) => contract.adapters.web?.status === 'implemented');
const targets = Array.from(new Set(contracts.flatMap((contract) => Object.keys(contract.adapters)))).sort();

const shape = [
  ['Anatomy', 'Root, parts, generated elements, and required or optional structure.'],
  ['Variants', 'Visual and behavioral options such as success, error, left, or default.'],
  ['States', 'CSS-selectable states such as hover, selected, expanded, open, hidden, or focus-visible.'],
  ['Behavior', 'Target-agnostic interaction requirements such as keyboard, focus, dismissal, and ARIA state.'],
  ['Tokens', 'Public customization API that target adapters must preserve.'],
  ['Accessibility', 'Required semantic, keyboard, and assistive technology behavior.'],
  ['Adapters', 'Target support status for Web and Shopify.'],
];

export default function Contracts() {
  return (
    <>
      <h1>Component Contracts</h1>
      <p>
        Contracts are The Gallery's target-agnostic component source layer. They
        describe what each component is before it becomes CSS, Liquid, React,
        Shopify Liquid or Web implementation.
      </p>

      <div className="docs-stats">
        <div>
          <div className="docs-stat__value">{contracts.length}</div>
          <div className="docs-stat__label">Contracts</div>
        </div>
        <div>
          <div className="docs-stat__value">{behaviorContracts.length}</div>
          <div className="docs-stat__label">With Behavior</div>
        </div>
        <div>
          <div className="docs-stat__value">{webImplemented.length}</div>
          <div className="docs-stat__label">Web Implemented</div>
        </div>
        <div>
          <div className="docs-stat__value">{targets.length}</div>
          <div className="docs-stat__label">Targets</div>
        </div>
      </div>

      <h2>Contract Shape</h2>
      <div className="docs-feature-grid">
        {shape.map(([name, description]) => (
          <section className="docs-feature-card" key={name}>
            <span className="docs-feature-card__label">Field</span>
            <h3>{name}</h3>
            <p>{description}</p>
          </section>
        ))}
      </div>

      <h2>Inventory</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Status</th>
              <th>Category</th>
              <th>Behavior</th>
              <th>Tokens</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract) => {
              const component = getComponent(contract.slug);
              const tokenCount = Object.values(contract.tokens.public).reduce((sum, values) => sum + values.length, 0);
              return (
                <tr key={contract.slug}>
                  <td>
                    <Link to={`/components/${contract.slug}`}>{contract.name}</Link>
                  </td>
                  <td><span className={`docs-contract-badge docs-contract-badge--${contract.status}`}>{contract.status}</span></td>
                  <td>{component?.category ?? contract.category}</td>
                  <td>{contract.behavior?.length ?? 0}</td>
                  <td>{tokenCount}</td>
                  <td><code className="docs-contract-code">{contract.source.css.file}</code></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Select Versus Combobox</h2>
      <div className="docs-feature-grid">
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Native</span>
          <h3>Select</h3>
          <p>Use Select for finite, known choices where native browser behavior is enough.</p>
        </section>
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Custom</span>
          <h3>Combobox</h3>
          <p>Use Combobox when users need typing, filtering, autocomplete, async results, or richer option matching.</p>
        </section>
      </div>

      <h2>Validation</h2>
      <p>
        Contract validation compares the contract files against <code className="docs-inline-code">registry.json</code>,
        canonical CSS, component MDX pages, and public web token definitions.
      </p>
      <div className="docs-code">
        <code>npm run validate:contracts</code>
      </div>
    </>
  );
}
