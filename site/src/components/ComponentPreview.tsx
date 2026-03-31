import { useState, useRef, useCallback, useId } from 'react';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatHtml(html: string): string {
  const selfClosing = new Set(['br','hr','img','input','meta','link','area','base','col','embed','source','track','wbr']);
  let result = '';
  let indent = 0;
  const raw = html.replace(/\s*\n\s*/g, ' ').trim();
  const tokens = raw.split(/(<[^>]+>)/).filter(Boolean);
  for (const token of tokens) {
    if (token.startsWith('</')) {
      indent = Math.max(0, indent - 1);
      result += '  '.repeat(indent) + token + '\n';
    } else if (token.startsWith('<')) {
      result += '  '.repeat(indent) + token + '\n';
      const tag = token.replace(/<\/?/, '').split(/[\s>/]/)[0].toLowerCase();
      if (!token.endsWith('/>') && !selfClosing.has(tag)) {
        indent++;
      }
    } else {
      const text = token.trim();
      if (text) {
        result += '  '.repeat(indent) + text + '\n';
      }
    }
  }
  return result.trimEnd();
}

export interface Interaction {
  /** Selector for the element(s) to toggle */
  selector: string;
  /** CSS class to toggle, or 'attr:name=value' for attributes */
  toggle: string;
  /** Button label */
  triggerLabel: string;
  /** If true, start in the "on" state */
  startVisible?: boolean;
}

interface Props {
  html: string;
  label?: string;
  interaction?: Interaction;
}

export default function ComponentPreview({ html, label = 'Preview', interaction }: Props) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [active, setActive] = useState(interaction?.startVisible ?? false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const handleToggle = useCallback(() => {
    if (!interaction || !canvasRef.current) return;
    const next = !active;
    setActive(next);
    const els = canvasRef.current.querySelectorAll(interaction.selector);
    els.forEach((el) => {
      if (interaction.toggle.startsWith('attr:')) {
        const [attr, val] = interaction.toggle.slice(5).split('=');
        if (next) el.setAttribute(attr, val ?? '');
        else el.removeAttribute(attr);
      } else {
        el.classList.toggle(interaction.toggle, next);
      }
    });
  }, [active, interaction]);

  return (
    <div className="docs-preview">
      <div className="docs-preview__toolbar">
        <span>{label}</span>
        <div className="docs-preview__toolbar-tabs">
          {interaction && (
            <button
              className={`docs-preview__tab docs-preview__tab--trigger${active ? ' is-active' : ''}`}
              onClick={handleToggle}
            >
              {active ? 'Hide' : interaction.triggerLabel}
            </button>
          )}
          <button
            className={`docs-preview__tab${tab === 'preview' ? ' is-active' : ''}`}
            onClick={() => setTab('preview')}
          >
            Preview
          </button>
          <button
            className={`docs-preview__tab${tab === 'code' ? ' is-active' : ''}`}
            onClick={() => setTab('code')}
          >
            Code
          </button>
        </div>
      </div>
      <div
        ref={canvasRef}
        className="docs-preview__canvas"
        id={`${id}-canvas`}
        style={{ display: tab === 'preview' ? undefined : 'none' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div
        className={`docs-preview__code${tab === 'code' ? ' is-visible' : ''}`}
        id={`${id}-code`}
      >
        <code dangerouslySetInnerHTML={{ __html: escapeHtml(formatHtml(html)) }} />
      </div>
    </div>
  );
}
