import { useEffect, useMemo, useState, type CSSProperties, type MouseEvent as ReactMouseEvent } from 'react';
import { PackageSearch } from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialMedia } from './editorialMedia';
import ProductCardArtwork from './ProductCardArtwork';
import PaginationArtwork from './PaginationArtwork';
import ViewToggleArtwork, { type ViewToggleValue, viewToggleFixture } from './ViewToggleArtwork';
import CollectionPromoArtwork, { type CollectionPromoVariant } from './CollectionPromoArtwork';
import EmptyCollectionArtwork from './EmptyCollectionArtwork';
import CheckboxArtwork from './CheckboxArtwork';
import FilterPanelArtwork, { type FilterPanelCommitMode } from './FilterPanelArtwork';

interface CollectionStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'collection-hero': {
    title: 'Quiet Forms', description: 'A study in balance, texture, and useful objects.',
    count: '24 works', image: true, imageAlt: 'Stoneware vessels arranged in soft gallery light',
  },
  'collection-grid': { columns: 4, items: true },
  'filter-panel': {
    commitMode: 'immediate', label: 'Filter works', formAction: '/collections/quiet-forms',
    triggerLabel: 'Filters', dismissLabel: 'Close filters', applyLabel: 'Apply filters',
    cancelLabel: 'Cancel', activeFiltersLabel: 'Active filters', activeFilters: true,
    filterGroups: true, results: true,
  },
  pagination: { label: 'Collection pages', currentPage: 5, pageItems: true },
  'view-toggle': {
    ...viewToggleFixture,
  },
  'collection-promo': {
    variant: 'span-2', media: true, mediaAlt: 'Celadon vessels in the gallery', eyebrow: 'Curated edit',
    title: 'Objects for the daily ritual', ctaLabel: 'Explore the edit', href: '#collection-edit',
  },
  'empty-collection': {
    icon: true, title: 'No works found', message: 'Try removing a filter or exploring the full collection.', action: true,
  },
};

const collectionGridFixtures = [
  { title: 'Quiet Form No. 1', vendor: 'Lucia Ferrer', imageAlt: 'Celadon glazed stoneware vessel', mediaIndex: 1, currentPrice: '$102.00' },
  { title: 'Tall vessel with carved ash glaze', vendor: 'Mara Ortiz', imageAlt: 'Tall carved stoneware vessel', mediaIndex: 2, currentPrice: '$138.00', badgeLabel: 'New' },
  { title: 'Cuenco de gres', vendor: 'Taller Norte', imageAlt: 'Cuenco de gres con esmalte claro', mediaIndex: 3, currentPrice: 'ARS 98.000' },
  { title: '茶碗 · Chawan', vendor: 'Aiko Mori', imageAlt: 'Hand-thrown chawan tea bowl', mediaIndex: 4, currentPrice: '¥12,800' },
  { title: 'Porcelain Fold', vendor: 'The Gallery Studio', imageAlt: 'Folded white porcelain form', mediaIndex: 5, currentPrice: '€116.00' },
  { title: 'Night Archive No. 12', vendor: '', imageAlt: 'Dark glazed archival vessel', mediaIndex: 6, currentPrice: '$154.00' },
];

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'boolean' || property.type === 'slot') return false;
  if (property.type === 'number') return null;
  if (property.type === 'enum') {
    const source = property.valuesFrom === 'variants'
      ? contract.variants
      : property.valuesFrom === 'sizes'
        ? contract.sizes
        : null;
    return source?.find((option) => option.default)?.name ?? property.values?.[0] ?? null;
  }
  return '';
}

function initialFixtureValues(contract: ComponentContract): StudioPropertyValues {
  return {
    ...Object.fromEntries((contract.properties ?? []).map((property) => [property.name, defaultValue(contract, property)])),
    ...(fixtureValues[contract.slug] ?? {}),
  } as StudioPropertyValues;
}

function resolveTokens(control: StudioControl, contract: ComponentContract): string[] {
  if (!control.tokens) return [];
  const category = contract.tokens.public[control.tokens.category] ?? [];
  if (control.tokens.names) return control.tokens.names;
  const pattern = new RegExp(control.tokens.match ?? '$^');
  return category.filter((token) => pattern.test(token));
}

function CollectionMedia({ className = '', alt = '' }: { className?: string; alt?: string }) {
  return <img src={editorialMedia.tableware} alt={alt} className={`${className} docs-studio__collection-media`} />;
}

export default function CollectionStudio({ contract, definition }: CollectionStudioProps) {
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls.filter((control) => control.tokens).map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [compactPromoPreview, setCompactPromoPreview] = useState(false);
  const initialFilters = ['Stoneware', 'Available now'];
  const [committedFilters, setCommittedFilters] = useState(initialFilters);
  const [draftFilters, setDraftFilters] = useState(initialFilters);

  useEffect(() => {
    if (values.commitMode === 'immediate') setDraftFilters([...committedFilters]);
  }, [values.commitMode, committedFilters]);

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => [token, computed.getPropertyValue(token).trim()])));
    };
    const observer = new MutationObserver(read);
    read();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, [studioTokens]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setCompactPromoPreview(false);
    setCommittedFilters(initialFilters);
    setDraftFilters(initialFilters);
  }

  function setValue(name: string, value: StudioPropertyValue) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function renderHero() {
    const className = values.image === true ? 'collection-hero--with-image' : null;
    return (
      <section className={['collection-hero', className, 'docs-studio__collection-hero'].filter(Boolean).join(' ')}>
        {values.image === true && <CollectionMedia className="collection-hero__image" alt={String(values.imageAlt || '')} />}
        <div className="collection-hero__content">
          <h2 className="collection-hero__title">{String(values.title)}</h2>
          {String(values.description || '') && <p className="collection-hero__description">{String(values.description)}</p>}
          {String(values.count || '') && <p className="collection-hero__count">{String(values.count)}</p>}
        </div>
      </section>
    );
  }

  function renderGrid() {
    const columns = Math.max(2, Math.min(6, Number(values.columns) || 4));
    return (
      <div className="collection-grid docs-studio__collection-grid" data-columns={columns}>
        <ul className="collection-grid__items" role="list">
          {values.items === true && collectionGridFixtures.map((item, index) => (
            <li className="collection-grid__item" key={item.title}>
              <ProductCardArtwork
                {...item}
                href={`#work-${index + 1}`}
                className="docs-studio__product-card docs-studio__product-card--compact docs-studio__collection-card"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function toggleFilter(label: string) {
    const update = (current: string[]) => current.includes(label)
      ? current.filter((item) => item !== label)
      : [...current, label];
    if (values.commitMode === 'manual') {
      setDraftFilters(update);
    } else {
      setCommittedFilters(update);
      setDraftFilters(update);
    }
  }

  function removeFilter(label: string, event: ReactMouseEvent<HTMLButtonElement>) {
    const item = event.currentTarget.closest('.filter-panel__active-item');
    const panel = event.currentTarget.closest('.filter-panel');
    const nextAction = item?.nextElementSibling?.querySelector<HTMLButtonElement>('.tag__remove')
      ?? item?.previousElementSibling?.querySelector<HTMLButtonElement>('.tag__remove')
      ?? panel?.querySelector<HTMLInputElement>('.filter-group__options input:not(:disabled)');
    setCommittedFilters((current) => current.filter((itemLabel) => itemLabel !== label));
    setDraftFilters((current) => current.filter((itemLabel) => itemLabel !== label));
    requestAnimationFrame(() => nextAction?.focus());
  }

  function renderFilterGroups() {
    if (values.filterGroups !== true) return null;
    const selectedFilters = values.commitMode === 'manual' ? draftFilters : committedFilters;
    return (
      <>
        <fieldset className="filter-group">
          <legend className="filter-group__title">Material</legend>
          <div className="filter-group__options">
            {['Stoneware', 'Porcelain', 'Earthenware'].map((label) => (
              <label className="checkbox" key={label}>
                <input className="checkbox__input" type="checkbox" name="filter.material" value={label.toLowerCase()} checked={selectedFilters.includes(label)} onChange={() => toggleFilter(label)} />
                <span className="checkbox__label">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="filter-group">
          <legend className="filter-group__title">Availability</legend>
          <div className="filter-group__options">
            <label className="checkbox"><input className="checkbox__input" type="checkbox" name="filter.availability" value="available" checked={selectedFilters.includes('Available now')} onChange={() => toggleFilter('Available now')} /><span className="checkbox__label">Available now</span></label>
          </div>
        </fieldset>
      </>
    );
  }

  function renderFilterPanel() {
    return (
      <FilterPanelArtwork
        className="docs-studio__filter-panel"
        commitMode={(values.commitMode === 'manual' ? 'manual' : 'immediate') as FilterPanelCommitMode}
        label={String(values.label || '')}
        formAction={String(values.formAction || '')}
        triggerLabel={String(values.triggerLabel || '')}
        dismissLabel={String(values.dismissLabel || '')}
        applyLabel={String(values.applyLabel || '')}
        cancelLabel={String(values.cancelLabel || '')}
        activeFiltersLabel={String(values.activeFiltersLabel || '')}
        activeFilters={values.activeFilters === true && committedFilters.length > 0
          ? committedFilters.map((label) => (
              <li className="filter-panel__active-item" key={label}>
                <span className="tag">
                  <span className="tag__label">{label}</span>
                  <button className="tag__remove" type="button" aria-label={`Remove ${label}`} onClick={(event) => removeFilter(label, event)} />
                </span>
              </li>
            ))
          : undefined}
        filterGroups={renderFilterGroups()}
        results={values.results === true
          ? <div className="docs-studio__filter-results">24 matching works</div>
          : null}
        onSubmit={(event) => {
          event.preventDefault();
          if (values.commitMode === 'manual') setCommittedFilters([...draftFilters]);
        }}
        onReset={() => {
          setCommittedFilters(initialFilters);
          setDraftFilters(initialFilters);
        }}
        onCancel={() => setDraftFilters([...committedFilters])}
      />
    );
  }

  function renderPagination() {
    return (
      <PaginationArtwork
        className="docs-studio__pagination"
        label={String(values.label)}
        currentPage={Number(values.currentPage) || 1}
        pageItems={values.pageItems === true}
        onPageChange={(page) => setValue('currentPage', page)}
      />
    );
  }

  function renderViewToggle() {
    return (
      <form
        className="docs-studio__view-toggle-form"
        onSubmit={(event) => event.preventDefault()}
        onReset={() => setValue('activeView', 'grid')}
      >
        <ViewToggleArtwork
          className="docs-studio__view-toggle"
          groupLabel={String(values.groupLabel || '')}
          name={String(values.name || '')}
          gridLabel={String(values.gridLabel || '')}
          listLabel={String(values.listLabel || '')}
          activeView={(values.activeView === 'list' ? 'list' : 'grid') as ViewToggleValue}
          disabled={values.disabled === true}
          onViewChange={(value) => setValue('activeView', value)}
        />
      </form>
    );
  }

  function renderPromo() {
    return (
      <CollectionPromoArtwork
        className={['docs-studio__collection-promo', compactPromoPreview ? 'docs-studio__collection-promo--compact' : ''].filter(Boolean).join(' ')}
        variant={(values.variant === 'span-2' ? 'span-2' : 'default') as CollectionPromoVariant}
        media={values.media === true
          ? <CollectionMedia className="collection-promo__media" alt={String(values.mediaAlt || '')} />
          : undefined}
        eyebrow={String(values.eyebrow || '')}
        title={String(values.title || '')}
        ctaLabel={String(values.ctaLabel || '')}
        href={String(values.href || '')}
        onNavigate={(event) => event.preventDefault()}
      />
    );
  }

  function renderEmpty() {
    return (
      <EmptyCollectionArtwork
        className="docs-studio__empty-collection"
        title={String(values.title || '')}
        titleElement="h2"
        message={String(values.message || '')}
        icon={values.icon === true ? <PackageSearch /> : undefined}
        action={values.action === true ? <button className="btn" type="button">Clear filters</button> : undefined}
      />
    );
  }

  function renderPreview() {
    if (contract.slug === 'collection-hero') return renderHero();
    if (contract.slug === 'collection-grid') return renderGrid();
    if (contract.slug === 'filter-panel') return renderFilterPanel();
    if (contract.slug === 'pagination') return renderPagination();
    if (contract.slug === 'view-toggle') return renderViewToggle();
    if (contract.slug === 'collection-promo') return renderPromo();
    return renderEmpty();
  }

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className={['docs-studio__workspace', contract.slug === 'collection-grid' ? 'docs-studio__workspace--collection-grid' : ''].filter(Boolean).join(' ')}>
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue="default" tokenValues={tokenValues} activeTokens={activeTokens} fixtureControlsByGroup={contract.slug === 'collection-promo' ? { presentation: (<CheckboxArtwork label="Compact preview" checked={compactPromoPreview} onChange={(event) => setCompactPromoPreview(event.target.checked)} />) } : undefined} onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))} onSlotIconChange={() => undefined} onStateChange={() => undefined} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className="docs-studio__stage" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}><div className={['docs-studio__stage-inner', 'docs-studio__collection-stage-inner', contract.slug === 'collection-grid' ? 'docs-studio__collection-stage-inner--grid' : ''].filter(Boolean).join(' ')}>{renderPreview()}</div></section>
      </div>
    </div>
  );
}
