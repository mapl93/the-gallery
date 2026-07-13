import type {
  ComponentContract,
  ContractAdapter,
  ContractAnatomyPart,
  ContractBehavior,
  ContractOption,
  ContractState,
} from '../lib/contracts';

function InlineCode({ children }: { children: string }) {
  return <code className="docs-contract-code">{children}</code>;
}

function StatusBadge({ value }: { value: string }) {
  return <span className={`docs-contract-badge docs-contract-badge--${value}`}>{value}</span>;
}

function OptionList({ title, options }: { title: string; options: ContractOption[] }) {
  return (
    <div className="docs-contract-block">
      <h3>{title}</h3>
      <div className="docs-contract-option-list">
        {options.map((option) => (
          <div className="docs-contract-option" key={option.name}>
            <div className="docs-contract-option__head">
              <span>{option.name}</span>
              {option.default && <StatusBadge value="default" />}
            </div>
            {option.className && <InlineCode>{option.className}</InlineCode>}
            <p>{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnatomyTable({ anatomy }: { anatomy: ContractAnatomyPart[] }) {
  return (
    <div className="docs-contract-table-wrap">
      <table className="docs-contract-table">
        <thead>
          <tr>
            <th>Part</th>
            <th>Selector</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {anatomy.map((part) => (
            <tr key={part.name}>
              <td>{part.name}</td>
              <td>{part.selector ? <InlineCode>{part.selector}</InlineCode> : 'none'}</td>
              <td>{part.required ? 'yes' : 'no'}{part.generated ? ' / generated' : ''}</td>
              <td>{part.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StateTable({ states }: { states: ContractState[] }) {
  return (
    <div className="docs-contract-table-wrap">
      <table className="docs-contract-table">
        <thead>
          <tr>
            <th>State</th>
            <th>Selectors</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state.name}>
              <td>{state.name}</td>
              <td>
                <div className="docs-contract-code-list">
                  {state.selectors.map((selector) => <InlineCode key={selector}>{selector}</InlineCode>)}
                </div>
              </td>
              <td>{state.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BehaviorTable({ behavior }: { behavior: ContractBehavior[] }) {
  if (behavior.length === 0) return null;

  return (
    <div className="docs-contract-block">
      <h3>Behavior</h3>
      <div className="docs-contract-table-wrap">
        <table className="docs-contract-table">
          <thead>
            <tr>
              <th>Behavior</th>
              <th>Contract</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {behavior.map((item) => {
              const contractItems = [
                ...(item.selectors ?? []),
                ...(item.attributes ?? []),
                ...(item.events ?? []),
              ];

              return (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>
                    <div className="docs-contract-code-list">
                      {contractItems.map((value) => <InlineCode key={value}>{value}</InlineCode>)}
                    </div>
                  </td>
                  <td>{item.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TokenTable({ tokens }: { tokens: Record<string, string[]> }) {
  return (
    <div className="docs-contract-table-wrap">
      <table className="docs-contract-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Public Tokens</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(tokens).map(([category, values]) => (
            <tr key={category}>
              <td>{category}</td>
              <td>
                <div className="docs-contract-code-list">
                  {values.map((token) => <InlineCode key={token}>{token}</InlineCode>)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdapterTable({ adapters }: { adapters: Record<string, ContractAdapter> }) {
  return (
    <div className="docs-contract-table-wrap">
      <table className="docs-contract-table">
        <thead>
          <tr>
            <th>Target</th>
            <th>Status</th>
            <th>Kind</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(adapters).map(([target, adapter]) => (
            <tr key={target}>
              <td>{target}</td>
              <td><StatusBadge value={adapter.status} /></td>
              <td>{adapter.kind}</td>
              <td>{adapter.notes ?? 'none'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContractReference({ contract }: { contract: ComponentContract }) {
  const publicTokenCount = Object.values(contract.tokens.public)
    .reduce((total, tokens) => total + tokens.length, 0);
  const webStatus = contract.adapters.web?.status ?? 'unsupported';

  return (
    <dl className="docs-contract-reference" aria-label="Contract reference">
      <div>
        <dt>Maturity</dt>
        <dd><StatusBadge value={contract.status} /></dd>
      </div>
      <div>
        <dt>Contract</dt>
        <dd><InlineCode>{contract.contractVersion}</InlineCode></dd>
      </div>
      <div>
        <dt>Selector</dt>
        <dd><InlineCode>{contract.source.css.selector}</InlineCode></dd>
      </div>
      <div>
        <dt>Web target</dt>
        <dd><StatusBadge value={webStatus} /></dd>
      </div>
      <div>
        <dt>Public tokens</dt>
        <dd>{publicTokenCount}</dd>
      </div>
    </dl>
  );
}

export default function ContractSummary({ contract }: { contract: ComponentContract }) {
  return (
    <section className="docs-contract" aria-labelledby="component-contract">
      <div className="docs-contract__header">
        <div>
          <span className="docs-contract__eyebrow">Component Contract</span>
          <h2 id="component-contract">Contract</h2>
          <p>{contract.summary}</p>
        </div>
        <div className="docs-contract__meta">
          <StatusBadge value={contract.status} />
          <InlineCode>{contract.contractVersion}</InlineCode>
        </div>
      </div>

      <div className="docs-contract-source">
        <div>
          <span>Registry</span>
          <InlineCode>{contract.source.registry}</InlineCode>
        </div>
        <div>
          <span>CSS</span>
          <InlineCode>{contract.source.css.file}</InlineCode>
        </div>
        <div>
          <span>Selector</span>
          <InlineCode>{contract.source.css.selector}</InlineCode>
        </div>
      </div>

      <div className="docs-contract-block">
        <h3>Anatomy</h3>
        <AnatomyTable anatomy={contract.anatomy} />
      </div>

      <div className="docs-contract-grid">
        <OptionList title="Variants" options={contract.variants} />
        <OptionList title="Sizes" options={contract.sizes} />
      </div>

      <div className="docs-contract-block">
        <h3>States</h3>
        <StateTable states={contract.states} />
      </div>

      <BehaviorTable behavior={contract.behavior ?? []} />

      <div className="docs-contract-block">
        <h3>Tokens</h3>
        <TokenTable tokens={contract.tokens.public} />
      </div>

      <div className="docs-contract-grid">
        <div className="docs-contract-block">
          <h3>Accessibility</h3>
          <ul className="docs-contract-list">
            {contract.accessibility.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="docs-contract-block">
          <h3>Adapters</h3>
          <AdapterTable adapters={contract.adapters} />
        </div>
      </div>
    </section>
  );
}
