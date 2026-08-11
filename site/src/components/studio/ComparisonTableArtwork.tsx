import { useId } from 'react';
import CheckboxArtwork from './CheckboxArtwork';
import RadioArtwork from './RadioArtwork';

export type ComparisonInteraction = 'passive' | 'selectable';
export type ComparisonSelectionMode = 'single' | 'multiple';

export interface ComparisonAlternativeAction {
  kind: 'link' | 'button';
  label: string;
  href?: string;
}

export interface ComparisonAlternative {
  id: string;
  label: string;
  highlighted?: boolean;
  claim?: string;
  action?: ComparisonAlternativeAction;
}

export type ComparisonCell =
  | { kind: 'text'; text: string }
  | { kind: 'status'; included: boolean; text: string };

export interface ComparisonCriterion {
  id: string;
  label: string;
  cells: Record<string, ComparisonCell>;
}

export interface ComparisonTableFixture {
  caption: string;
  alternatives: ComparisonAlternative[];
  criteria: ComparisonCriterion[];
}

interface ComparisonTableArtworkProps {
  title?: string;
  fixture?: ComparisonTableFixture | null;
  interaction?: ComparisonInteraction;
  selectionMode?: ComparisonSelectionMode;
  selectedId?: string;
  selectedIds?: string[];
  onSelectionChange?: (selection: string | string[]) => void;
  className?: string;
}

const comparisonTableFixture: ComparisonTableFixture = {
  caption: 'Finish qualities and available actions for Satin, Gloss, and Raw',
  alternatives: [
    {
      id: 'satin',
      label: 'Satin',
      highlighted: true,
      claim: 'Gallery choice',
      action: { kind: 'link', label: 'View Satin', href: '/collections/satin-finish' },
    },
    {
      id: 'gloss',
      label: 'Gloss',
      action: { kind: 'button', label: 'Request sample' },
    },
    { id: 'raw', label: 'Raw' },
  ],
  criteria: [
    {
      id: 'reflection',
      label: 'Soft reflection',
      cells: {
        satin: { kind: 'status', included: true, text: 'Included' },
        gloss: { kind: 'status', included: false, text: 'Not included' },
        raw: { kind: 'status', included: false, text: 'Not included' },
      },
    },
    {
      id: 'dishwasher',
      label: 'Dishwasher suitable',
      cells: {
        satin: { kind: 'status', included: true, text: 'Included' },
        gloss: { kind: 'status', included: true, text: 'Included' },
        raw: { kind: 'status', included: false, text: 'Not included' },
      },
    },
    {
      id: 'surface',
      label: 'Surface character',
      cells: {
        satin: { kind: 'text', text: 'Low sheen' },
        gloss: { kind: 'text', text: 'Reflective' },
        raw: { kind: 'text', text: 'Tactile clay' },
      },
    },
  ],
};

export function buildComparisonTableFixture(): ComparisonTableFixture {
  return {
    caption: comparisonTableFixture.caption,
    alternatives: comparisonTableFixture.alternatives.map((alternative) => ({
      ...alternative,
      action: alternative.action ? { ...alternative.action } : undefined,
    })),
    criteria: comparisonTableFixture.criteria.map((criterion) => ({
      ...criterion,
      cells: Object.fromEntries(Object.entries(criterion.cells).map(([id, cell]) => (
        [id, { ...cell }]
      ))),
    })),
  };
}

function StatusCell({ cell }: { cell: Extract<ComparisonCell, { kind: 'status' }> }) {
  return (
    <span className="comparison-table__status">
      <span
        className={cell.included ? 'comparison-table__check' : 'comparison-table__cross'}
        aria-hidden="true"
      >
        {cell.included ? '✓' : '×'}
      </span>
      <span className="visually-hidden">{cell.text}</span>
    </span>
  );
}

export default function ComparisonTableArtwork({
  title = '',
  fixture = null,
  interaction = 'passive',
  selectionMode = 'single',
  selectedId = '',
  selectedIds = [],
  onSelectionChange = () => undefined,
  className = '',
}: ComparisonTableArtworkProps) {
  const uid = useId().replace(/:/g, '');
  const visibleTitle = title.trim();
  const alternatives = fixture?.alternatives.filter((alternative) => (
    alternative.id.trim() && alternative.label.trim()
  )) ?? [];
  const criteria = fixture?.criteria.filter((criterion) => criterion.label.trim()) ?? [];

  if (!fixture?.caption.trim() || alternatives.length === 0 || criteria.length === 0) {
    return null;
  }

  const selectable = interaction === 'selectable';
  const multiple = selectable && selectionMode === 'multiple';
  const Root = visibleTitle ? 'section' : 'div';
  const titleId = visibleTitle ? `comparison-${uid}-title` : undefined;
  const captionId = `comparison-${uid}-caption`;
  const selectionName = `comparison-${uid}-selection`;
  const selectedSet = new Set(selectedIds);
  const hasActions = alternatives.some((alternative) => (
    alternative.action?.label.trim()
    && (alternative.action.kind === 'button' || alternative.action.href?.trim())
  ));
  const scrollLabel = visibleTitle
    ? `${visibleTitle} table scroll area`
    : 'Comparison table scroll area';

  function selectMultiple(alternativeId: string, checked: boolean) {
    const next = new Set(selectedIds);
    if (checked) next.add(alternativeId);
    else next.delete(alternativeId);
    onSelectionChange(alternatives.filter((alternative) => next.has(alternative.id)).map((alternative) => alternative.id));
  }

  function renderAlternativeChoice(alternative: ComparisonAlternative) {
    if (!selectable) {
      return <span className="comparison-table__alternative-name" dir="auto">{alternative.label}</span>;
    }

    if (multiple) {
      return (
        <CheckboxArtwork
          label={alternative.label}
          checked={selectedSet.has(alternative.id)}
          name={`${selectionName}[]`}
          value={alternative.id}
          describedBy={captionId}
          className="comparison-table__choice"
          onChange={(event) => selectMultiple(alternative.id, event.currentTarget.checked)}
        />
      );
    }

    return (
      <RadioArtwork
        label={alternative.label}
        name={selectionName}
        value={alternative.id}
        checked={selectedId === alternative.id}
        describedBy={captionId}
        className="comparison-table__choice"
        onCheckedChange={(checked) => checked && onSelectionChange(alternative.id)}
      />
    );
  }

  return (
    <Root
      className={['comparison-table', className.trim() || null].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
      data-interaction={interaction}
      data-selection-mode={selectionMode}
    >
      <div className="comparison-table__inner">
        {visibleTitle && (
          <h2 className="comparison-table__title" id={titleId}>{visibleTitle}</h2>
        )}
        <div
          className="comparison-table__scroll table-wrapper"
          tabIndex={0}
          aria-label={scrollLabel}
        >
          <table className="comparison-table__table table">
            <caption className="visually-hidden" id={captionId}>{fixture.caption}</caption>
            <thead>
              <tr>
                <th scope="col">Quality</th>
                {alternatives.map((alternative) => (
                  <th
                    className={alternative.highlighted ? 'comparison-table__highlight' : undefined}
                    scope="col"
                    key={alternative.id}
                  >
                    <span className="comparison-table__alternative">
                      {renderAlternativeChoice(alternative)}
                      {alternative.claim?.trim() && (
                        <span className="comparison-table__claim" dir="auto">{alternative.claim}</span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion) => (
                <tr key={criterion.id}>
                  <th scope="row" dir="auto">{criterion.label}</th>
                  {alternatives.map((alternative) => {
                    const cell = criterion.cells[alternative.id];
                    return (
                      <td
                        className={alternative.highlighted ? 'comparison-table__highlight' : undefined}
                        key={alternative.id}
                      >
                        {!cell ? '—' : cell.kind === 'status' ? (
                          <StatusCell cell={cell} />
                        ) : (
                          <span dir="auto">{cell.text}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
            {hasActions && (
              <tfoot>
                <tr>
                  <th scope="row">Actions</th>
                  {alternatives.map((alternative) => {
                    const action = alternative.action;
                    const label = action?.label.trim() ?? '';
                    return (
                      <td
                        className={alternative.highlighted ? 'comparison-table__highlight' : undefined}
                        key={alternative.id}
                      >
                        {!label ? null : action?.kind === 'link' && action.href?.trim() ? (
                          <a className="link link--subtle comparison-table__action" href={action.href}>{label}</a>
                        ) : action?.kind === 'button' ? (
                          <button className="btn btn--outline btn--sm comparison-table__action" type="button">{label}</button>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </Root>
  );
}
