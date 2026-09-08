import { Link } from 'react-router-dom';
import type { ComponentContract } from '../lib/contracts';
import { resolveStudioControlTokens, type StudioDefinition } from '../lib/studio';

/** Lists the editor's actual public surface, without a second list of values. */
export default function CustomizationReference({ contract, definition }: {
  contract: ComponentContract;
  definition: StudioDefinition;
}) {
  const rows = definition.groups.flatMap((group) => group.controls.flatMap((control) => {
    const tokens = resolveStudioControlTokens(control, contract);
    return tokens.length ? [{ group: group.label, id: control.id, label: control.label, tokens }] : [];
  }));
  if (!rows.length) return null;
  return <details className="docs-customization-reference">
    <summary>Visual customization ({rows.length} controls)</summary>
    <p><Link to={`/components/${contract.slug}?view=studio`}>Open Studio</Link> to edit these controls in a local preview. State-dependent colors follow the selected variant and state.</p>
    <div className="docs-contract-table-wrap">
      <table className="docs-contract-table">
        <thead><tr><th>Group</th><th>Control</th><th>Public tokens</th></tr></thead>
        <tbody>{rows.map((row) => <tr key={row.id} data-customization-control={row.id}>
          <td>{row.group}</td><td>{row.label}</td>
          <td>{row.tokens.map((token) => <div key={token}><code className="docs-contract-code">{token}</code></div>)}</td>
        </tr>)}</tbody>
      </table>
    </div>
  </details>;
}
