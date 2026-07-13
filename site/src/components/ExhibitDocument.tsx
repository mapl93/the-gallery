import {
  Children,
  Fragment,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import {
  Accessibility,
  BookOpen,
  Braces,
  Info,
  Shapes,
  type LucideIcon,
} from 'lucide-react';
import type { ComponentContract } from '../lib/contracts';
import type { StudioDefinition } from '../lib/studio';
import { ContractReference } from './ContractSummary';

type ExhibitSectionKey =
  | 'overview'
  | 'presentation'
  | 'guidelines'
  | 'accessibility'
  | 'specification';

interface ExhibitSectionDefinition {
  key: ExhibitSectionKey;
  label: string;
  icon: LucideIcon;
}

interface ParsedExhibit {
  artwork: ReactNode | null;
  sections: Array<ExhibitSectionDefinition & { content: ReactNode[] }>;
}

const sectionDefinitions: ExhibitSectionDefinition[] = [
  { key: 'overview', label: 'Overview', icon: Info },
  { key: 'presentation', label: 'Presentation', icon: Shapes },
  { key: 'guidelines', label: 'Guidelines', icon: BookOpen },
  { key: 'accessibility', label: 'Accessibility', icon: Accessibility },
  { key: 'specification', label: 'Specification', icon: Braces },
];

const canonicalHeadingAliases: Record<ExhibitSectionKey, string[]> = {
  overview: ['overview'],
  presentation: ['presentation'],
  guidelines: ['usage guidelines', 'guidelines'],
  accessibility: ['accessibility'],
  specification: ['api reference', 'references', 'reference', 'specification'],
};

export const ExhibitContractContext = createContext<ComponentContract | null>(null);

interface ExhibitSharedRenderer {
  Renderer: ComponentType<{
    contract: ComponentContract;
    definition: StudioDefinition;
  }>;
  contract: ComponentContract;
  definition: StudioDefinition;
}

export const ExhibitSharedRendererContext = createContext<ExhibitSharedRenderer | null>(null);

function normalizeHeading(value: string): string {
  return value.trim().toLowerCase();
}

function nodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (!isValidElement<{ children?: ReactNode }>(node)) return '';
  return Children.toArray(node.props.children).map(nodeText).join('');
}

function sectionForHeading(title: string): ExhibitSectionKey {
  const heading = normalizeHeading(title);

  if (heading === 'overview') return 'overview';
  if (heading.includes('accessibility')) return 'accessibility';
  if (heading.includes('guideline') || heading.includes('usage in')) return 'guidelines';
  if (
    heading.includes('reference')
    || heading.includes('specification')
    || heading.includes('anatomy')
    || heading.includes('dependenc')
  ) return 'specification';

  return 'presentation';
}

function isCanonicalHeading(title: string, section: ExhibitSectionKey): boolean {
  return canonicalHeadingAliases[section].includes(normalizeHeading(title));
}

function isArtworkPreview(node: ReactNode): boolean {
  if (!isValidElement(node) || typeof node.type === 'string') return false;
  return (node.type as { exhibitRole?: string }).exhibitRole === 'artwork-preview';
}

function flattenDocumentNodes(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((node) => {
    if (isValidElement<{ children?: ReactNode }>(node) && node.type === Fragment) {
      return flattenDocumentNodes(node.props.children);
    }
    return [node];
  });
}

function unwrapMdxDocument(children: ReactNode): ReactNode {
  const roots = Children.toArray(children);
  if (roots.length !== 1) return children;

  const root = roots[0];
  if (
    !isValidElement<Record<string, unknown>>(root)
    || typeof root.type !== 'function'
    || !('components' in root.props)
  ) return children;

  // MDX passes its generated, hook-free document function as the wrapper child.
  return (root.type as (props: Record<string, unknown>) => ReactNode)(root.props);
}

function isSubheading(node: ReactNode): boolean {
  return isValidElement(node) && node.type === 'h3';
}

function hasVisibleContent(node: ReactNode): boolean {
  return typeof node === 'string' ? node.trim().length > 0 : node !== null;
}

function pruneEmptySubsections(nodes: ReactNode[]): ReactNode[] {
  return nodes.filter((node, index) => {
    if (!isSubheading(node)) return hasVisibleContent(node);

    let nextIndex = index + 1;
    while (nextIndex < nodes.length && !isSubheading(nodes[nextIndex])) nextIndex += 1;
    return nodes.slice(index + 1, nextIndex).some(hasVisibleContent);
  });
}

function parseDocument(children: ReactNode): ParsedExhibit {
  const grouped = Object.fromEntries(
    sectionDefinitions.map(({ key }) => [key, [] as ReactNode[]]),
  ) as Record<ExhibitSectionKey, ReactNode[]>;
  let currentSection: ExhibitSectionKey = 'overview';
  let artwork: ReactNode | null = null;
  let subheadingIndex = 0;

  for (const node of flattenDocumentNodes(unwrapMdxDocument(children))) {
    if (isValidElement<{ children?: ReactNode }>(node) && node.type === 'h2') {
      const title = nodeText(node.props.children);
      currentSection = sectionForHeading(title);

      if (!isCanonicalHeading(title, currentSection)) {
        grouped[currentSection].push(
          <h3 key={`exhibit-subheading-${subheadingIndex}`}>{title}</h3>,
        );
        subheadingIndex += 1;
      }
      continue;
    }

    if (isArtworkPreview(node)) {
      if (!artwork) artwork = node;
      continue;
    }

    grouped[currentSection].push(node);
  }

  return {
    artwork,
    sections: sectionDefinitions
      .map((definition) => ({
        ...definition,
        content: pruneEmptySubsections(grouped[definition.key]),
      }))
      .filter((section) => section.content.length > 0 || section.key === 'specification'),
  };
}

export default function ExhibitDocument({ children }: { children: ReactNode }) {
  const contract = useContext(ExhibitContractContext);
  const sharedRenderer = useContext(ExhibitSharedRendererContext);
  const parsed = useMemo(() => parseDocument(children), [children]);
  const firstSection = parsed.sections[0]?.key ?? 'overview';
  const [activeSection, setActiveSection] = useState<ExhibitSectionKey>(firstSection);
  const sectionNodes = useRef<Partial<Record<ExhibitSectionKey, HTMLElement | null>>>({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top));
      const key = visible[0]?.target.getAttribute('data-exhibit-section') as ExhibitSectionKey | null;
      if (key) setActiveSection(key);
    }, {
      rootMargin: '-18% 0px -62% 0px',
      threshold: [0, 0.1, 0.5],
    });

    for (const section of parsed.sections) {
      const node = sectionNodes.current[section.key];
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [parsed.sections]);

  function revealSection(key: ExhibitSectionKey) {
    setActiveSection(key);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    sectionNodes.current[key]?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }

  return (
    <div className="docs-exhibit__document">
      <nav className="docs-exhibit__index" aria-label="Component information">
        {parsed.sections.map(({ key, label, icon: Icon }) => (
          <button
            className={activeSection === key ? 'is-active' : undefined}
            type="button"
            key={key}
            aria-label={label}
            aria-pressed={activeSection === key}
            data-label={label}
            title={label}
            onClick={() => revealSection(key)}
          >
            <Icon aria-hidden="true" />
          </button>
        ))}
      </nav>

      <div className="docs-exhibit__specifications">
        {parsed.sections.map(({ key, label, content }) => (
          <section
            className="docs-exhibit__section"
            id={`exhibit-${key}`}
            key={key}
            ref={(node) => { sectionNodes.current[key] = node; }}
            data-exhibit-section={key}
            aria-labelledby={`exhibit-${key}-title`}
          >
            <h2 id={`exhibit-${key}-title`}>{label}</h2>
            <div className="docs-exhibit__section-body">
              {content}
              {key === 'specification' && contract && (
                <ContractReference contract={contract} />
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="docs-exhibit__artwork" aria-label="Component exhibit">
        {sharedRenderer ? (
          <div className="docs-exhibit__shared-renderer">
            <sharedRenderer.Renderer
              contract={sharedRenderer.contract}
              definition={sharedRenderer.definition}
            />
          </div>
        ) : (
          parsed.artwork ?? (
            <p className="docs-exhibit__empty">Canonical preview pending</p>
          )
        )}
      </div>
    </div>
  );
}
