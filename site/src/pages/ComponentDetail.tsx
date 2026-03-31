import { Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComponent, getCategories, getComponentsByCategory } from '../lib/registry';
import { getComponentExamples } from '../lib/examples';
import ComponentPreview from '../components/ComponentPreview';
import { getMdxPage } from '../content';
import { mdxComponents } from '../components/MdxComponents';

function CompHeader({ comp, cat }: { comp: ReturnType<typeof getComponent> & {}; cat?: { name: string } }) {
  return (
    <div className="docs-comp-header">
      <div className="docs-comp-header__breadcrumb">
        <Link to="/components">Components</Link>
        <span> / </span>
        <Link to={`/components#${comp.category}`}>{cat?.name ?? comp.category}</Link>
        <span> / </span>
        <span>{comp.name}</span>
      </div>
      <h1>{comp.name}</h1>
      <p className="docs-comp-header__desc">{comp.description}</p>
      <div
        className="docs-install-pill"
        role="button"
        tabIndex={0}
        onClick={() => { navigator.clipboard.writeText(`npx the-gallery add ${comp.slug}`); }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigator.clipboard.writeText(`npx the-gallery add ${comp.slug}`); }}
        title="Click to copy"
      >
        <code>npx the-gallery add {comp.slug}</code>
        <svg className="docs-install-pill__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5V3a1.5 1.5 0 0 0-1.5-1.5H3A1.5 1.5 0 0 0 1.5 3v6A1.5 1.5 0 0 0 3 10.5h2.5" />
        </svg>
      </div>
    </div>
  );
}

function CompNav({ comp }: { comp: ReturnType<typeof getComponent> & {} }) {
  const siblings = getComponentsByCategory(comp.category);
  const idx = siblings.findIndex((c) => c.slug === comp.slug);
  return (
    <div className="docs-comp-nav" style={{ marginTop: 'var(--docs-space-xl)', display: 'flex', gap: 'var(--docs-space-md)' }}>
      {idx > 0 && (
        <Link to={`/components/${siblings[idx - 1].slug}`} className="btn btn--outline">
          ← {siblings[idx - 1].name}
        </Link>
      )}
      {idx < siblings.length - 1 && (
        <Link to={`/components/${siblings[idx + 1].slug}`} className="btn btn--outline" style={{ marginLeft: 'auto' }}>
          {siblings[idx + 1].name} →
        </Link>
      )}
    </div>
  );
}

export default function ComponentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const comp = slug ? getComponent(slug) : undefined;

  if (!comp) {
    return (
      <>
        <h1>Component not found</h1>
        <p>No component matches "{slug}".</p>
        <Link to="/components">← Back to all components</Link>
      </>
    );
  }

  const cat = getCategories().find((c) => c.key === comp.category);
  const MdxContent = getMdxPage(comp.slug);

  // ── MDX page (rich docs) ──────────────────────────────────
  if (MdxContent) {
    return (
      <>
        <CompHeader comp={comp} cat={cat} />
        <Suspense fallback={<p style={{ color: 'var(--docs-color-text-2)' }}>Loading…</p>}>
          <MdxContent components={mdxComponents} />
        </Suspense>
        <CompNav comp={comp} />
      </>
    );
  }

  // ── Auto-generated fallback ───────────────────────────────
  const examples = getComponentExamples(comp.slug) ?? { preview: `<div class="${comp.selector}">${comp.name}</div>` };

  return (
    <>
      <CompHeader comp={comp} cat={cat} />

      {/* Preview */}
      <h2>Preview</h2>
      <ComponentPreview html={examples.preview} label={comp.name} interaction={examples.interaction} />

      {/* Variants */}
      {examples.variants && Object.keys(examples.variants).length > 0 && (
        <>
          <h2>Variants</h2>
          {comp.variants && (
            <div className="docs-variant-tags">
              {comp.variants.map((v) => (
                <span key={v} className="docs-variant-tag">{v}</span>
              ))}
            </div>
          )}
          {Object.entries(examples.variants).map(([name, html]) => (
            <ComponentPreview key={name} html={html} label={name} />
          ))}
        </>
      )}

      {/* Sizes */}
      {examples.sizes && Object.keys(examples.sizes).length > 0 && (
        <>
          <h2>Sizes</h2>
          {comp.sizes && (
            <div className="docs-variant-tags">
              {comp.sizes.map((s) => (
                <span key={s} className="docs-variant-tag">{s}</span>
              ))}
            </div>
          )}
          {Object.entries(examples.sizes).map(([name, html]) => (
            <ComponentPreview key={name} html={html} label={name} />
          ))}
        </>
      )}

      {/* Dependencies */}
      {comp.dependencies.length > 0 && (
        <>
          <h2>Dependencies</h2>
          <ul>
            {comp.dependencies.map((dep) => (
              <li key={dep}>
                <Link to={`/components/${dep}`}>{dep}</Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Tokens */}
      {comp.tokens && Object.keys(comp.tokens).length > 0 && (
        <>
          <h2>Design Tokens</h2>
          <table className="docs-token-table">
            <thead>
              <tr><th>Category</th><th>Tokens</th></tr>
            </thead>
            <tbody>
              {Object.entries(comp.tokens).map(([cat, tokens]) => (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td>
                    {(tokens as string[]).map((t) => (
                      <code key={t} className="docs-inline-code" style={{ marginRight: 8 }}>{t}</code>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <CompNav comp={comp} />
    </>
  );
}
