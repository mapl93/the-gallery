import webSummaryJson from '../../../platforms/web/adapter.summary.json';
import shopifySummaryJson from '../../../platforms/shopify/adapter.summary.json';

interface WebAdapterSummary {
  target: {
    id: string;
    name: string;
    kind: string;
    status: string;
    description: string;
  };
  outputs: Record<string, string | string[]>;
  loadOrder: Array<{
    type: string;
    path: string;
    required: boolean;
    reason: string;
  }>;
  policy: Record<string, string>;
  stats: {
    components: number;
    implementedComponents: number;
    componentsWithBehavior: number;
    cssFiles: number;
    uniquePublicTokens: number;
  };
  categoryCoverage: Array<{
    category: string;
    count: number;
  }>;
  sampleComponents: Array<{
    slug: string;
    name: string;
    category: string;
    selector: string;
    source: {
      contract: string;
      css: string;
      docs: string;
    };
    adapter: {
      status: string;
      kind: string;
      notes?: string;
    };
  }>;
}

interface ShopifyAdapterSummary {
  target: {
    id: string;
    name: string;
    kind: string;
    status: string;
    description: string;
  };
  outputs: Record<string, string | string[]>;
  loadOrder: Record<string, string[]>;
  policy: Record<string, string>;
  stats: {
    components: number;
    contractImplemented: number;
    contractPlanned: number;
    targetReady: number;
    cssReady: number;
    classLevelComponents: number;
    dedicatedTemplateComponents: number;
    dedicatedLiquidReady: number;
    dedicatedLiquidMissing: number;
    sectionAdapters: number;
    snippetAdapters: number;
    themeBlockAdapters: number;
    schemaRequired: number;
    schemaReady: number;
    schemaMissing: number;
    schemaInvalid: number;
    dataRequired: number;
    dataReady: number;
    dataMissing: number;
    templateCompositionRequired: number;
    templateCompositionReady: number;
    editorPreviewRequired: number;
    editorPreviewReady: number;
    behaviorRequired: number;
    behaviorAccepted: number;
    liquidMatched: number;
    plannedWithLiquid: number;
    implementedMissingRequiredLiquid: number;
    cssAssets: number;
    liquidFiles: number;
    templateJsonFiles: number;
  };
  maturityModel: {
    id: string;
    levels: string[];
    strategies: Record<string, string>;
    layers: Record<string, string>;
  };
  categoryCoverage: Array<{
    category: string;
    total: number;
    cssReady: number;
    liquidMatched: number;
    dedicatedLiquidReady: number;
    schemaReady: number;
    dataReady: number;
    templateCompositionReady: number;
    editorPreviewReady: number;
    contractImplemented: number;
    targetReady: number;
  }>;
  warningCount: number;
  warningLimit: number;
  warnings: Array<{
    type: string;
    slug: string;
    message: string;
  }>;
  sampleComponents: Array<{
    slug: string;
    name: string;
    category: string;
    selector: string;
    source: {
      contract: string;
      css: string;
      cssOutput: string;
      docs: string;
    };
    contractAdapter: {
      status: string;
      kind: string;
      notes?: string;
    };
    maturity: {
      model: string;
      level: string;
      ready: boolean;
      strategy: string;
      layers: {
        css: { required: boolean; status: string; source: string; output: string };
        liquid: { required: boolean; status: string; files: string[] };
        schema: { required: boolean; status: string };
        data: { required: boolean; status: string };
        behavior: { required: boolean; status: string; contractItems: number; owner: string };
        templateComposition: { required: boolean; status: string };
        editorPreview: { required: boolean; status: string };
      };
    };
    liquid: {
      status: string;
      files: string[];
    };
  }>;
}

const webSummary = webSummaryJson as WebAdapterSummary;
const shopifySummary = shopifySummaryJson as ShopifyAdapterSummary;

const outputEntries = Object.entries(webSummary.outputs);
const policyEntries = Object.entries(webSummary.policy);
const shopifyOutputEntries = Object.entries(shopifySummary.outputs);
const shopifyPolicyEntries = Object.entries(shopifySummary.policy);

function formatOutputValue(value: string | string[]) {
  return Array.isArray(value) ? value.join('\n') : value;
}

export default function Adapters() {
  return (
    <>
      <h1>Adapters</h1>
      <p>
        Adapters translate The Gallery source into target-ready files. The first explicit component adapter is
        the neutral web target; Shopify now has an executable adapter manifest and validation layer as well.
      </p>
      <p>
        Target-ready means target-native. An adapter must use the platform's real rendering, editor,
        configuration, data, behavior, accessibility, and distribution surfaces instead of only shipping styles.
      </p>

      <h2>{webSummary.target.name}</h2>
      <div className="docs-stats">
        <div>
          <div className="docs-stat__value">{webSummary.stats.components}</div>
          <div className="docs-stat__label">Components</div>
        </div>
        <div>
          <div className="docs-stat__value">{webSummary.stats.componentsWithBehavior}</div>
          <div className="docs-stat__label">With Behavior</div>
        </div>
        <div>
          <div className="docs-stat__value">{webSummary.stats.cssFiles}</div>
          <div className="docs-stat__label">CSS Sources</div>
        </div>
        <div>
          <div className="docs-stat__value">{webSummary.stats.uniquePublicTokens}</div>
          <div className="docs-stat__label">Public Tokens</div>
        </div>
      </div>

      <div className="docs-feature-grid">
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Target</span>
          <h3>{webSummary.target.kind}</h3>
          <p>{webSummary.target.description}</p>
        </section>
        {policyEntries.map(([name, value]) => (
          <section className="docs-feature-card" key={name}>
            <span className="docs-feature-card__label">Policy</span>
            <h3>{name}</h3>
            <p>{value}</p>
          </section>
        ))}
      </div>

      <h2>Outputs</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Output</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {outputEntries.map(([name, filePath]) => (
              <tr key={name}>
                <td>{name}</td>
                <td><code className="docs-contract-code">{filePath}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Load Order</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Path</th>
              <th>Required</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {webSummary.loadOrder.map((item) => (
              <tr key={item.path}>
                <td>{item.type}</td>
                <td><code className="docs-contract-code">{item.path}</code></td>
                <td>{item.required ? 'yes' : 'optional'}</td>
                <td>{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Build</h2>
      <div className="docs-code">
        <code>{`npm run build:adapter:web
npm run validate:adapter:web`}</code>
      </div>

      <h2>Coverage By Category</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Components</th>
            </tr>
          </thead>
          <tbody>
            {webSummary.categoryCoverage.map(({ category, count }) => (
              <tr key={category}>
                <td>{category}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Manifest Sample</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Selector</th>
              <th>CSS Source</th>
              <th>Contract</th>
              <th>Adapter</th>
            </tr>
          </thead>
          <tbody>
            {webSummary.sampleComponents.map((component) => (
              <tr key={component.slug}>
                <td>{component.name}</td>
                <td><code className="docs-contract-code">{component.selector}</code></td>
                <td><code className="docs-contract-code">{component.source.css}</code></td>
                <td><code className="docs-contract-code">{component.source.contract}</code></td>
                <td><span className={`docs-contract-badge docs-contract-badge--${component.adapter.status}`}>{component.adapter.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>{shopifySummary.target.name}</h2>
      <div className="docs-stats">
        <div>
          <div className="docs-stat__value">{shopifySummary.stats.components}</div>
          <div className="docs-stat__label">Components</div>
        </div>
        <div>
          <div className="docs-stat__value">{shopifySummary.stats.targetReady}</div>
          <div className="docs-stat__label">Target Ready</div>
        </div>
        <div>
          <div className="docs-stat__value">{shopifySummary.stats.dedicatedLiquidReady}/{shopifySummary.stats.dedicatedTemplateComponents}</div>
          <div className="docs-stat__label">Liquid Templates</div>
        </div>
        <div>
          <div className="docs-stat__value">{shopifySummary.stats.schemaReady}/{shopifySummary.stats.schemaRequired}</div>
          <div className="docs-stat__label">Schema Ready</div>
        </div>
        <div>
          <div className="docs-stat__value">{shopifySummary.stats.dataReady}/{shopifySummary.stats.dataRequired}</div>
          <div className="docs-stat__label">Data Ready</div>
        </div>
      </div>

      <div className="docs-feature-grid">
        <section className="docs-feature-card">
          <span className="docs-feature-card__label">Target</span>
          <h3>{shopifySummary.target.kind}</h3>
          <p>{shopifySummary.target.description}</p>
        </section>
        {shopifyPolicyEntries.map(([name, value]) => (
          <section className="docs-feature-card" key={name}>
            <span className="docs-feature-card__label">Policy</span>
            <h3>{name}</h3>
            <p>{value}</p>
          </section>
        ))}
      </div>

      <h2>Shopify Maturity Model</h2>
      <p>
        Shopify maturity is evaluated with <code>{shopifySummary.maturityModel.id}</code>. CSS is required for every
        component; dedicated Liquid is required only when the component is not an embedded class contract.
      </p>
      <p>
        For Shopify sections and blocks, target-ready also includes schema/settings, Shopify data mapping, Theme
        Editor behavior, and template composition where those platform features apply.
      </p>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Rule</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(shopifySummary.maturityModel.layers).map(([layer, rule]) => (
              <tr key={layer}>
                <td>{layer}</td>
                <td>{rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Strategy</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(shopifySummary.maturityModel.strategies).map(([strategy, meaning]) => (
              <tr key={strategy}>
                <td><code className="docs-contract-code">{strategy}</code></td>
                <td>{meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Shopify Outputs</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Output</th>
              <th>Path</th>
            </tr>
          </thead>
          <tbody>
            {shopifyOutputEntries.map(([name, value]) => (
              <tr key={name}>
                <td>{name}</td>
                <td><code className="docs-contract-code">{formatOutputValue(value)}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Shopify Load Order</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Layout</th>
              <th>Assets</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(shopifySummary.loadOrder).map(([layout, assets]) => (
              <tr key={layout}>
                <td>{layout}</td>
                <td><code className="docs-contract-code">{assets.join('\n')}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Shopify Build</h2>
      <div className="docs-code">
        <code>{`npm run build:adapter:shopify
npm run validate:adapter:shopify`}</code>
      </div>

      <h2>Shopify Coverage By Category</h2>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Total</th>
              <th>CSS Ready</th>
              <th>Liquid Templates</th>
              <th>Schema Ready</th>
              <th>Data Ready</th>
              <th>Editor Ready</th>
              <th>Contract Implemented</th>
              <th>Target Ready</th>
            </tr>
          </thead>
          <tbody>
            {shopifySummary.categoryCoverage.map((category) => (
              <tr key={category.category}>
                <td>{category.category}</td>
                <td>{category.total}</td>
                <td>{category.cssReady}</td>
                <td>{category.dedicatedLiquidReady}</td>
                <td>{category.schemaReady}</td>
                <td>{category.dataReady}</td>
                <td>{category.editorPreviewReady}</td>
                <td>{category.contractImplemented}</td>
                <td>{category.targetReady}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Shopify Maturity Warnings</h2>
      <p>
        These warnings are adapter maturity signals, not build failures. Embedded class contracts can be ready without
        a dedicated Liquid root; warnings focus on dedicated Shopify templates that need contract reconciliation.
      </p>
      {shopifySummary.warningCount > shopifySummary.warnings.length ? (
        <p>
          Showing {shopifySummary.warnings.length} of {shopifySummary.warningCount} maturity warnings.
        </p>
      ) : null}
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Component</th>
              <th>Warning</th>
            </tr>
          </thead>
          <tbody>
            {shopifySummary.warnings.map((warning) => (
              <tr key={`${warning.type}-${warning.slug}`}>
                <td>{warning.slug}</td>
                <td>{warning.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
