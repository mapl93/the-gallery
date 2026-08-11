import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import type { ComponentContract } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import DataTableArtwork from './DataTableArtwork';

interface DataTableStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

type SortDirection = 'none' | 'ascending' | 'descending';

interface TableFixtureRow {
  name: string;
  material: string;
  available: number;
}

const fixtureRows: TableFixtureRow[] = [
  { name: 'Celadon Vase', material: 'Stoneware', available: 12 },
  { name: 'Raku Bowl', material: 'Earthenware', available: 7 },
  { name: 'Porcelain Cup', material: 'Porcelain', available: 24 },
  { name: 'Tea Caddy', material: 'Glazed clay', available: 5 },
];

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

export default function DataTableStudio({ contract, definition }: DataTableStudioProps) {
  const initialValues = useMemo<StudioPropertyValues>(() => ({
    // Caption copy is preview content, not the contract default.
    caption: 'Available gallery objects',
    striped: false,
    rowHover: false,
    sortable: false,
  }), []);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const slotIconValues = useMemo<StudioSlotIconValues>(() => ({
    leading: 'arrow-up-down',
    trailing: 'arrow-up-down',
  }), []);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [sortDirection, setSortDirection] = useState<SortDirection>('none');
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => (
        [token, computed.getPropertyValue(token).trim()]
      ))));
    };
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };
  const caption = typeof values.caption === 'string' ? values.caption : '';
  const sortable = values.sortable === true;
  const tableClasses = [
    'table',
    values.striped === true ? 'table--striped' : null,
    values.rowHover === true ? 'table--hover' : null,
  ].filter(Boolean).join(' ');
  const rows = useMemo(() => {
    if (sortDirection === 'none') return fixtureRows;
    return [...fixtureRows].sort((left, right) => {
      const comparison = left.name.localeCompare(right.name);
      return sortDirection === 'ascending' ? comparison : -comparison;
    });
  }, [sortDirection]);
  const SortIcon = sortDirection === 'ascending'
    ? ArrowUp
    : sortDirection === 'descending'
      ? ArrowDown
      : ArrowUpDown;

  function cycleSort() {
    setSortDirection((current) => (
      current === 'none' ? 'ascending' : current === 'ascending' ? 'descending' : 'ascending'
    ));
  }

  function reset() {
    setValues({ ...initialValues });
    setSortDirection('none');
    setTokenOverrides({});
  }

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={slotIconValues}
          stateValue={contract.states[0]?.name ?? 'default'}
          tokenValues={tokenValues}
          activeTokens={{
            'border-color': '--color-border-subtle',
            'focus-color': '--color-border-focus',
            'text-color': '--color-text-primary',
            'accent-surface': '--color-surface-secondary',
          }}
          onPropertiesChange={(next) => {
            setValues((current) => ({ ...current, ...next }));
            if (next.sortable === false) setSortDirection('none');
          }}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({
            ...current,
            [token]: value,
          }))}
          onReset={reset}
        />
        <section
          className="docs-studio__stage"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className="docs-studio__stage-inner docs-studio__preview-table">
            <DataTableArtwork
              caption={caption}
              wrapperLabel={caption ? `${caption} table scroll area` : 'Data table scroll area'}
              tableClassName={tableClasses.replace(/^table\s*/, '')}
            >
                <thead>
                  <tr>
                    <th scope="col" aria-sort={sortable ? sortDirection : undefined}>
                      {sortable ? (
                        <button className="table__sort-btn" type="button" onClick={cycleSort}>
                          Object
                          <SortIcon className="table__sort-icon" aria-hidden="true" />
                        </button>
                      ) : 'Object'}
                    </th>
                    <th scope="col">Material</th>
                    <th scope="col">Available</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.material}</td>
                      <td>{row.available}</td>
                    </tr>
                  ))}
                </tbody>
            </DataTableArtwork>
          </div>
        </section>
      </div>
    </div>
  );
}
