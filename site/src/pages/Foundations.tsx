export default function Foundations() {
  return (
    <>
      <h1>Foundations</h1>
      <p>
        The design tokens and utility classes that power every component. These
        are defined in <code className="docs-inline-code">foundations.css</code>.
      </p>

      <h2 id="typography">Typography</h2>
      <table className="docs-token-table">
        <thead><tr><th>Class</th><th>Font</th><th>Size</th><th>Weight</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">.text-display-lg</code></td><td>var(--font-display)</td><td>3.5rem</td><td>300</td></tr>
          <tr><td><code className="docs-inline-code">.text-display</code></td><td>var(--font-display)</td><td>2.5rem</td><td>300</td></tr>
          <tr><td><code className="docs-inline-code">.text-heading-lg</code></td><td>var(--font-heading)</td><td>2rem</td><td>500</td></tr>
          <tr><td><code className="docs-inline-code">.text-heading</code></td><td>var(--font-heading)</td><td>1.5rem</td><td>500</td></tr>
          <tr><td><code className="docs-inline-code">.text-heading-sm</code></td><td>var(--font-heading)</td><td>1.25rem</td><td>500</td></tr>
          <tr><td><code className="docs-inline-code">.text-body-lg</code></td><td>var(--font-body)</td><td>1.125rem</td><td>400</td></tr>
          <tr><td><code className="docs-inline-code">.text-body</code></td><td>var(--font-body)</td><td>1rem</td><td>400</td></tr>
          <tr><td><code className="docs-inline-code">.text-body-sm</code></td><td>var(--font-body)</td><td>0.875rem</td><td>400</td></tr>
          <tr><td><code className="docs-inline-code">.text-caption</code></td><td>var(--font-body)</td><td>0.75rem</td><td>400</td></tr>
          <tr><td><code className="docs-inline-code">.text-overline</code></td><td>var(--font-body)</td><td>0.75rem</td><td>500 / uppercase</td></tr>
        </tbody>
      </table>

      <h2 id="color">Color</h2>
      <table className="docs-token-table">
        <thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">--color-bg</code></td><td>#FAFAF8</td><td>#1A1A1A</td></tr>
          <tr><td><code className="docs-inline-code">--color-surface</code></td><td>#FFFFFF</td><td>#2A2A2A</td></tr>
          <tr><td><code className="docs-inline-code">--color-text</code></td><td>#1A1A1A</td><td>#F5F5F0</td></tr>
          <tr><td><code className="docs-inline-code">--color-text-2</code></td><td>#6B6B6B</td><td>#A0A0A0</td></tr>
          <tr><td><code className="docs-inline-code">--color-border</code></td><td>#E5E5E0</td><td>#3A3A3A</td></tr>
          <tr><td><code className="docs-inline-code">--color-primary</code></td><td>#2C2C2C</td><td>#F5F5F0</td></tr>
          <tr><td><code className="docs-inline-code">--color-accent</code></td><td>#8B4513</td><td>#CD853F</td></tr>
          <tr><td><code className="docs-inline-code">--color-error</code></td><td>#B91C1C</td><td>#F87171</td></tr>
          <tr><td><code className="docs-inline-code">--color-success</code></td><td>#15803D</td><td>#4ADE80</td></tr>
        </tbody>
      </table>

      <h2 id="spacing">Spacing</h2>
      <table className="docs-token-table">
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">--space-xs</code></td><td>0.25rem (4px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-sm</code></td><td>0.5rem (8px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-md</code></td><td>1rem (16px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-lg</code></td><td>1.5rem (24px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-xl</code></td><td>2rem (32px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-2xl</code></td><td>3rem (48px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-3xl</code></td><td>4rem (64px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-4xl</code></td><td>6rem (96px)</td></tr>
          <tr><td><code className="docs-inline-code">--space-section</code></td><td>8rem (128px)</td></tr>
        </tbody>
      </table>

      <h2 id="radius">Border Radius</h2>
      <table className="docs-token-table">
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">--radius-sm</code></td><td>2px</td></tr>
          <tr><td><code className="docs-inline-code">--radius-md</code></td><td>4px</td></tr>
          <tr><td><code className="docs-inline-code">--radius-lg</code></td><td>8px</td></tr>
          <tr><td><code className="docs-inline-code">--radius-xl</code></td><td>12px</td></tr>
          <tr><td><code className="docs-inline-code">--radius-full</code></td><td>9999px</td></tr>
        </tbody>
      </table>

      <h2 id="shadows">Shadows</h2>
      <table className="docs-token-table">
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">--shadow-sm</code></td><td>0 1px 2px rgba(0,0,0,.05)</td></tr>
          <tr><td><code className="docs-inline-code">--shadow-md</code></td><td>0 4px 6px rgba(0,0,0,.07)</td></tr>
          <tr><td><code className="docs-inline-code">--shadow-lg</code></td><td>0 10px 15px rgba(0,0,0,.1)</td></tr>
          <tr><td><code className="docs-inline-code">--shadow-xl</code></td><td>0 20px 25px rgba(0,0,0,.1)</td></tr>
        </tbody>
      </table>

      <h2 id="motion">Motion</h2>
      <table className="docs-token-table">
        <thead><tr><th>Token</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">--motion-duration-micro</code></td><td>100ms</td></tr>
          <tr><td><code className="docs-inline-code">--motion-duration-standard</code></td><td>200ms</td></tr>
          <tr><td><code className="docs-inline-code">--motion-duration-moderate</code></td><td>300ms</td></tr>
          <tr><td><code className="docs-inline-code">--motion-duration-emphasis</code></td><td>500ms</td></tr>
          <tr><td><code className="docs-inline-code">--motion-curve-standard</code></td><td>cubic-bezier(.4,0,.2,1)</td></tr>
          <tr><td><code className="docs-inline-code">--motion-curve-enter</code></td><td>cubic-bezier(0,0,.2,1)</td></tr>
          <tr><td><code className="docs-inline-code">--motion-curve-exit</code></td><td>cubic-bezier(.4,0,1,1)</td></tr>
          <tr><td><code className="docs-inline-code">--motion-transition-feedback</code></td><td>200ms cubic-bezier(0,0,.2,1) 0ms</td></tr>
          <tr><td><code className="docs-inline-code">--transition-base</code></td><td>Compatibility alias for --motion-duration-standard</td></tr>
          <tr><td><code className="docs-inline-code">--easing-out</code></td><td>Compatibility alias for --motion-curve-enter</td></tr>
        </tbody>
      </table>

      <h2 id="layout">Layout</h2>
      <table className="docs-token-table">
        <thead><tr><th>Class</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">.container</code></td><td>Max-width container with auto margins</td></tr>
          <tr><td><code className="docs-inline-code">.stack</code></td><td>Vertical flex with gap (--stack-gap)</td></tr>
          <tr><td><code className="docs-inline-code">.cluster</code></td><td>Horizontal flex-wrap with gap</td></tr>
          <tr><td><code className="docs-inline-code">.sidebar-layout</code></td><td>Sidebar + content (CSS Grid)</td></tr>
          <tr><td><code className="docs-inline-code">.grid</code></td><td>Auto-fill responsive grid</td></tr>
          <tr><td><code className="docs-inline-code">.switcher</code></td><td>Row → column at breakpoint</td></tr>
        </tbody>
      </table>

      <h2 id="prose">Prose</h2>
      <table className="docs-token-table">
        <thead><tr><th>Class</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code className="docs-inline-code">.prose</code></td><td>Rich text formatting for articles and long-form content.</td></tr>
          <tr><td><code className="docs-inline-code">.prose--lg</code></td><td>Larger prose (1.125rem base).</td></tr>
          <tr><td><code className="docs-inline-code">.prose--sm</code></td><td>Compact prose (0.875rem base).</td></tr>
        </tbody>
      </table>
    </>
  );
}
