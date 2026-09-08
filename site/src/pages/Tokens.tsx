import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatTokenValue, getTokens, type TokenTheme, type TokenViewport } from '../lib/tokens';

export default function Tokens() {
  const [theme, setTheme] = useState<TokenTheme>('light');
  const [viewport, setViewport] = useState<TokenViewport>('desktop');
  const [query, setQuery] = useState('');
  const tokens = useMemo(() => getTokens(theme, viewport), [theme, viewport]);
  const matching = tokens.filter((token) => `${token.path} ${token.type} ${token.description}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <h1>Design Tokens</h1>
      <p>Live catalogue of the canonical <code>tokens/source/</code> files. Select one theme and viewport to inspect its effective definitions, aliases and resolved source values. This selection does not change the page theme.</p>
      <p>Web and Shopify consume this source. Webflow and Framer still use the legacy pipeline. Composite values shown here are source structures; each adapter owns their output format.</p>
      <div className="docs-token-filters">
        <label>Theme <select value={theme} onChange={(event) => setTheme(event.target.value as TokenTheme)}><option value="light">Light</option><option value="dark">Dark</option></select></label>
        <label>Viewport <select value={viewport} onChange={(event) => setViewport(event.target.value as TokenViewport)}>{(['mobile', 'tablet', 'desktop', 'xl'] as const).map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        <label>Find token <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      </div>
      <p aria-live="polite">{matching.length} of {tokens.length} tokens · {theme} / {viewport}</p>
      {(['primitives', 'semantics', 'components'] as const).map((layer) => {
        const rows = matching.filter((token) => token.layer === layer);
        if (!rows.length) return null;
        return <section key={layer}>
          <h2 id={layer}>{layer === 'primitives' ? 'Primitives' : layer === 'semantics' ? 'Semantic roles' : 'Public component decisions'} ({rows.length})</h2>
          <div className="docs-token-scroll"><table className="docs-token-table">
            <thead><tr><th>Token / type</th><th>Definition</th><th>Resolved value</th><th>Source</th></tr></thead>
            <tbody>{rows.map((token) => <tr key={token.path} data-token-path={token.path}>
              <td><code>{token.path}</code><br /><small>{token.type}</small>{token.description && <p>{token.description}</p>}</td>
              <td><code>{formatTokenValue(token.definition)}</code></td>
              <td>{token.type === 'color' && typeof token.resolved === 'string' && <span aria-hidden="true" className="docs-token-swatch" style={{ backgroundColor: token.resolved }} />}<code>{formatTokenValue(token.resolved)}</code></td>
              <td><code>{token.source}</code>{token.source !== token.baseSource && <><br /><small>Overrides {token.baseSource}</small></>}</td>
            </tr>)}</tbody>
          </table></div>
        </section>;
      })}
      <p>Component tokens represent intentional public customization. Private CSS properties beginning with <code>--_</code> are not automatically exportable tokens. See the <Link to="/foundations/control-pilot">Input + Button pilot</Link>.</p>
    </>
  );
}
