import ComponentPreview from './ComponentPreview';
import type { Interaction } from './ComponentPreview';
import { Link } from 'react-router-dom';

/** Live component preview — use in MDX as <Preview html="..." /> */
function Preview({ html, label, interaction }: { html: string; label?: string; interaction?: Interaction }) {
  return <ComponentPreview html={html} label={label} interaction={interaction} />;
}

/** Do / Don't comparison blocks */
function DoDont({ children }: { children: React.ReactNode }) {
  return <div className="docs-dodont">{children}</div>;
}

function Do({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-dodont__item docs-dodont__item--do">
      <div className="docs-dodont__label">✓ Do</div>
      <div className="docs-dodont__content">{children}</div>
    </div>
  );
}

function Dont({ children }: { children: React.ReactNode }) {
  return (
    <div className="docs-dodont__item docs-dodont__item--dont">
      <div className="docs-dodont__label">✗ Don't</div>
      <div className="docs-dodont__content">{children}</div>
    </div>
  );
}

/** Prop / API table row */
function PropTable({ children }: { children: React.ReactNode }) {
  return (
    <table className="docs-token-table">
      <thead>
        <tr><th>Prop / Class</th><th>Type</th><th>Default</th><th>Description</th></tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

/** Callout / tip block */
function Callout({ type = 'info', children }: { type?: 'info' | 'warning' | 'tip'; children: React.ReactNode }) {
  const icons = { info: 'ℹ️', warning: '⚠️', tip: '💡' };
  return (
    <div className={`docs-callout docs-callout--${type}`}>
      <span className="docs-callout__icon">{icons[type]}</span>
      <div className="docs-callout__content">{children}</div>
    </div>
  );
}

/**
 * Custom components available in all MDX files.
 * MDX will use these for standard HTML elements AND as custom components.
 */
export const mdxComponents = {
  // Custom components for MDX authors
  Preview,
  DoDont,
  Do,
  Dont,
  PropTable,
  Callout,
  // Override standard elements for consistent styling
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return <Link to={href} {...props}>{children}</Link>;
    }
    return <a href={href} {...props}>{children}</a>;
  },
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    if (className?.startsWith('language-')) {
      return (
        <div className="docs-code">
          <code {...props}>{children}</code>
        </div>
      );
    }
    return <code className="docs-inline-code" {...props}>{children}</code>;
  },
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <table className="docs-token-table" {...props}>{children}</table>
  ),
};
