const layers = [
  {
    name: 'Governance',
    responsibility: 'Decisions, standards, naming, versioning, and review rules.',
    example: 'ADRs, AGENTS.md, schema docs',
  },
  {
    name: 'Token Source',
    responsibility: 'Target-agnostic design values and modes.',
    example: 'tokens/source with DTCG-style $value/$type',
  },
  {
    name: 'Component Contracts',
    responsibility: 'Target-agnostic anatomy, variants, states, behavior, tokens, and accessibility.',
    example: 'components/contracts/button.contract.json',
  },
  {
    name: 'Target Adapters',
    responsibility: 'Translation rules and implementation details for each platform.',
    example: 'Web CSS/runtime and Shopify Liquid',
  },
  {
    name: 'Distribution',
    responsibility: 'Registry, docs, CLI, packages, and release artifacts.',
    example: 'the-gallery add button --target shopify',
  },
];

const flow = [
  'Repo Source',
  'Tokens + Contracts + Registry',
  'Compilers + Adapters',
  'Target Outputs',
  'Consumer-Owned Code',
];

export default function Architecture() {
  return (
    <>
      <h1>Architecture</h1>
      <p>
        The Gallery is the source of truth for a platform-agnostic design system.
        Web and Shopify consume the source model. The delivery plan completes the Web
        system first and ends with Shopify integration.
      </p>

      <h2>North Star</h2>
      <div className="docs-flow" aria-label="The Gallery architecture flow">
        {flow.map((step, index) => (
          <div className="docs-flow__item" key={step}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <h2>Layer Responsibilities</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Responsibility</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            {layers.map((layer, index) => (
              <tr key={layer.name}>
                <td>{index}. {layer.name}</td>
                <td>{layer.responsibility}</td>
                <td>{layer.example}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Source And Targets</h2>
      <div className="docs-feature-grid">
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Source</span>
          <h3>Repo Source</h3>
          <p>The repo owns tokens, component contracts, registry metadata, documentation, and adapter rules.</p>
        </section>
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Values</span>
          <h3>Tokens</h3>
          <p>DTCG-style token source defines primitive, semantic, component, theme, and viewport values.</p>
        </section>
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Structure</span>
          <h3>Contracts</h3>
          <p>Contracts describe what a component is before it becomes Web CSS or Shopify Liquid.</p>
        </section>
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Output</span>
          <h3>Adapters</h3>
          <p>Adapters translate source decisions into platform files while preserving copy-and-own behavior.</p>
        </section>
      </div>

      <h2>Target Priority</h2>
      <ol className="docs-ordered-list">
        <li><strong>Web foundation:</strong> vanilla CSS, HTML, and progressive enhancement.</li>
        <li><strong>Shopify:</strong> native Liquid composition, brand controls, theme-editor behavior, and verified consumer delivery.</li>
      </ol>

      <h2>Current Implementation Facts</h2>
      <div className="docs-code">
        <code>{`tokens/source/           DTCG-style token source
platforms/web/tokens.css  Neutral web token target
platforms/web/index.css   Neutral web adapter entry
platforms/web/adapter.manifest.json  Neutral web adapter manifest
components/contracts/     Target-agnostic component contracts
components/css/           Current web/CSS adapter implementation
registry.json             Component manifest for docs and CLI
site/                     Documentation and component gallery
platforms/shopify/        Shopify target implementation`}</code>
      </div>
    </>
  );
}
