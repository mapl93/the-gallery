import { Link } from 'react-router-dom';
import { formatTokenValue, getTokens } from '../lib/tokens';

const light = getTokens('light', 'desktop');
const dark = getTokens('dark', 'desktop');
function value(tokens: typeof light, path: string) {
  const token = tokens.find((entry) => entry.path === path);
  return token ? formatTokenValue(token.resolved) : '—';
}

export default function Foundations() {
  return <>
    <h1>Foundations</h1>
    <p>Canonical token roles and the utility classes in <code>components/css/foundations.css</code>. Values below are read from the source for Desktop. The <Link to="/tokens">token catalogue</Link> includes all themes and viewports, alias definitions and source files.</p>
    <p><Link to="/foundations/control-pilot">Review the Input + Button coherence pilot →</Link></p>
    <h2 id="typography">Typography</h2>
    <p>Interface headings and body utilities apply their source family, weight, size and line height. Display and explicit article/prose compositions use editorial typography; embedded controls keep their UI family.</p>
    <table className="docs-token-table"><thead><tr><th>Class</th><th>Source role</th><th>Source size / line height</th><th>CSS behavior</th></tr></thead><tbody>
      {[['.display', 'display', 'Editorial family; source weight'], ['.heading-1', 'h1', 'UI family; source weight'], ['.heading-2', 'h2', 'UI family; source weight'], ['.heading-3', 'h3', 'UI family; source weight'], ['.body-lg', 'body.large', 'Source family, weight and line height'], ['.body', 'body.default', 'Source family, weight and line height'], ['.body-sm', 'body.small', 'Source family, weight and line height'], ['.caption', 'body.caption', 'Source family, weight and line height']].map(([className, role, behavior]) => <tr key={role}><td><code>{className}</code></td><td><code>typography.{role}</code></td><td>{value(light, `typography.${role}.size`)} / {value(light, `typography.${role}.lineHeight`)}</td><td>{behavior}</td></tr>)}
    </tbody></table>
    <h2 id="color">Color</h2>
    <p>These are source roles, not a list of guaranteed accessible combinations. Text utilities for accent and feedback mix the role with primary text to improve legibility on the matching primary surface.</p>
    <table className="docs-token-table"><thead><tr><th>Source role</th><th>Light</th><th>Dark</th></tr></thead><tbody>{['surface.primary', 'surface.secondary', 'text.primary', 'text.secondary', 'border.default', 'feedback.error.default', 'feedback.success.default'].map((role) => <tr key={role}><td><code>color.{role}</code></td><td>{value(light, `color.${role}`)}</td><td>{value(dark, `color.${role}`)}</td></tr>)}</tbody></table>
    {(['space', 'radius', 'shadow', 'motion'] as const).map((family) => <section key={family}><h2 id={family}>{family[0].toUpperCase() + family.slice(1)}</h2><div className="docs-token-scroll"><table className="docs-token-table"><thead><tr><th>Source role</th><th>Desktop / Light value</th></tr></thead><tbody>{light.filter((token) => token.path.startsWith(`${family}.`) && (family === 'radius' || token.layer !== 'primitives')).map((token) => <tr key={token.path}><td><code>{token.path}</code></td><td><code>{formatTokenValue(token.resolved)}</code></td></tr>)}</tbody></table></div></section>)}
    <h2 id="utilities">Utility boundaries</h2>
    <p>Spacing utilities use fixed 4 px steps backed by dimension primitives. Their numeric suffix is a step count, not a semantic scale index: <code>.p-8</code> stays 32 px at every viewport, while <code>space.scale.8</code> is 40 px on Mobile/Tablet and 64 px on Desktop/XL. Choose a utility for a fixed measure and a semantic role such as <code>space.section.md</code> for adaptive composition spacing. Existing values and class names are preserved. Use the relevant component contract when customizing controls. A private CSS variable is an implementation hook, not a promise of cross-platform support.</p>
  </>;
}
