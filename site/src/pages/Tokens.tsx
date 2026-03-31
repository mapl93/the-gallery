import { primitiveTokens, semanticTokens } from '../lib/tokens';

function isColor(value: string) {
  return /^#|^rgb|^hsl|^oklch/i.test(value);
}

function TokenTable({ title, tokens, id }: { title: string; tokens: { path: string; value: string; type?: string }[]; id: string }) {
  if (tokens.length === 0) return null;
  return (
    <>
      <h2 id={id}>{title} ({tokens.length})</h2>
      <table className="docs-token-table">
        <thead>
          <tr><th>Token</th><th>Value</th><th>Preview</th></tr>
        </thead>
        <tbody>
          {tokens.map((t) => (
            <tr key={t.path}>
              <td><code className="docs-inline-code">{t.path}</code></td>
              <td><code className="docs-inline-code">{t.value}</code></td>
              <td>
                {isColor(t.value) && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 20,
                      height: 20,
                      borderRadius: 4,
                      backgroundColor: t.value,
                      border: '1px solid var(--docs-color-border)',
                      verticalAlign: 'middle',
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function Tokens() {
  const primColors = primitiveTokens.filter((t) => t.type === 'color' || isColor(t.value));
  const primSpacing = primitiveTokens.filter((t) => t.type === 'spacing' || t.path.includes('space'));
  const primTypography = primitiveTokens.filter((t) => t.type === 'fontFamilies' || t.type === 'fontWeights' || t.type === 'fontSize' || t.type === 'lineHeights' || t.type === 'letterSpacing' || t.path.includes('font'));
  const primOther = primitiveTokens.filter((t) => !primColors.includes(t) && !primSpacing.includes(t) && !primTypography.includes(t));

  const semColors = semanticTokens.filter((t) => t.type === 'color' || isColor(t.value));
  const semOther = semanticTokens.filter((t) => !semColors.includes(t));

  return (
    <>
      <h1>Design Tokens</h1>
      <p>
        All design tokens extracted from the Figma Tokens JSON files. These tokens
        define the visual language of the system: colors, spacing, typography,
        shadows, and more.
      </p>

      <h2 style={{ marginTop: 'var(--docs-space-xl)' }}>Primitive Tokens</h2>
      <p>Raw values that form the foundation. These are not used directly in components — semantic tokens reference them.</p>

      <TokenTable title="Colors" tokens={primColors} id="prim-colors" />
      <TokenTable title="Spacing" tokens={primSpacing} id="prim-spacing" />
      <TokenTable title="Typography" tokens={primTypography} id="prim-typography" />
      <TokenTable title="Other" tokens={primOther} id="prim-other" />

      <h2 style={{ marginTop: 'var(--docs-space-xl)' }}>Semantic Tokens (Light)</h2>
      <p>Meaningful aliases that reference primitives. Components use these tokens.</p>

      <TokenTable title="Colors" tokens={semColors} id="sem-colors" />
      <TokenTable title="Other" tokens={semOther} id="sem-other" />
    </>
  );
}
