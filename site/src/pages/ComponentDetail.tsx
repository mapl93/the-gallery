import { Suspense } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { getComponent, getCategories, getComponentsByCategory } from '../lib/registry';
import { getComponentContract } from '../lib/contracts';
import { getStudioDefinition } from '../lib/studio';
import { getMdxPage } from '../content';
import { mdxComponents } from '../components/MdxComponents';
import ContractSummary from '../components/ContractSummary';
import { getStudioRenderer } from '../components/studio';
import ComponentModeSwitch, {
  type ComponentMode,
} from '../components/studio/ComponentModeSwitch';
import {
  ExhibitContractContext,
  ExhibitSharedRendererContext,
} from '../components/ExhibitDocument';

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
  const [searchParams, setSearchParams] = useSearchParams();
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
  const contract = getComponentContract(comp.slug);
  const studioDefinition = getStudioDefinition(comp.slug);
  const StudioRenderer = getStudioRenderer(comp.slug);
  const supportsStudio = Boolean(contract && studioDefinition && StudioRenderer);
  const mode: ComponentMode = supportsStudio && searchParams.get('view') === 'studio'
    ? 'studio'
    : 'exhibit';

  function handleModeChange(nextMode: ComponentMode) {
    const next = new URLSearchParams(searchParams);
    if (nextMode === 'studio') next.set('view', 'studio');
    else next.delete('view');
    setSearchParams(next);
  }

  if (mode === 'studio' && contract && studioDefinition && StudioRenderer) {
    return (
      <div className="docs-component-detail docs-component-detail--studio">
        <ComponentModeSwitch value={mode} onChange={handleModeChange} />
        <div
          id="component-view-panel"
          role="tabpanel"
          aria-labelledby="component-view-studio-tab"
        >
          <StudioRenderer contract={contract} definition={studioDefinition} />
        </div>
      </div>
    );
  }

  if (!MdxContent) {
    return (
      <>
        <CompHeader comp={comp} cat={cat} />

        <h2>Documentation Pending</h2>
        <p>
          This component is registered but does not yet have a canonical MDX page.
          Add <code>{`site/src/content/components/${comp.slug}.mdx`}</code> before publishing it as part of the system.
        </p>

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

        {comp.tokens && Object.keys(comp.tokens).length > 0 && (
          <>
            <h2>Design Tokens</h2>
            <table className="docs-token-table">
              <thead>
                <tr><th>Category</th><th>Tokens</th></tr>
              </thead>
              <tbody>
                {Object.entries(comp.tokens).map(([tokenCategory, tokens]) => (
                  <tr key={tokenCategory}>
                    <td>{tokenCategory}</td>
                    <td>
                      {(tokens as string[]).map((token) => (
                        <code key={token} className="docs-inline-code" style={{ marginRight: 8 }}>{token}</code>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {contract && <ContractSummary contract={contract} />}

        <CompNav comp={comp} />
      </>
    );
  }

  return (
    <div className="docs-component-detail docs-component-detail--exhibit">
      {supportsStudio && (
        <ComponentModeSwitch value={mode} onChange={handleModeChange} />
      )}

      <div
        className="docs-exhibit"
        id={supportsStudio ? 'component-view-panel' : undefined}
        role={supportsStudio ? 'tabpanel' : undefined}
        aria-labelledby={supportsStudio ? 'component-view-exhibit-tab' : undefined}
      >
        <header className="docs-exhibit__header">
          <h1>{comp.name}</h1>
        </header>

        <ExhibitContractContext.Provider value={contract ?? null}>
          <ExhibitSharedRendererContext.Provider
            value={contract && studioDefinition && StudioRenderer
              ? { contract, definition: studioDefinition, Renderer: StudioRenderer }
              : null}
          >
            <Suspense fallback={<p className="docs-exhibit__loading">Loading...</p>}>
              <MdxContent components={mdxComponents} />
            </Suspense>
          </ExhibitSharedRendererContext.Provider>
        </ExhibitContractContext.Provider>
      </div>
    </div>
  );
}
