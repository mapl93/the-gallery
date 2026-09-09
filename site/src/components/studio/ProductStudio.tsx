import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Mail,
  ShoppingBag,
  TriangleAlert,
  X,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import BackInStockArtwork from './BackInStockArtwork';
import type { BackInStockRequestState } from './BackInStockArtwork';
import PriceArtwork from './PriceArtwork';
import ProductCardArtwork from './ProductCardArtwork';
import ProductFormArtwork from './ProductFormArtwork';
import ProductGalleryArtwork from './ProductGalleryArtwork';
import { buildProductGalleryFixture } from './productGalleryFixture';
import QuantitySelectorArtwork from './QuantitySelectorArtwork';
import SegmentedControlArtwork from './SegmentedControlArtwork';
import SizeChartArtwork, {
  buildSizeChartFixture,
  SizeChartFixtureTable,
} from './SizeChartArtwork';
import SubscriptionOptionArtwork, {
  subscriptionPurchaseOptionFixture,
} from './SubscriptionOptionArtwork';

interface ProductStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'product-card': {
    title: 'Celadon Study No. 4', href: '#product', vendor: 'Lucia Ferrer',
    showVendor: true,
    description: "Hand-thrown stoneware with a satin celadon glaze, shaped and finished individually in Lucia Ferrer's Buenos Aires studio.",
    imageAlt: 'Celadon glazed stoneware vessel',
    mediaRatio: 'square', hoverImage: true, badges: true, quickLookAction: true, price: true, footer: false,
  },
  'product-gallery': {
    imageDetail: 'lightbox', loop: false,
  },
  'product-info': {
    title: 'Celadon Study No. 4', vendor: 'Lucia Ferrer', subtitle: 'One of one',
    price: true, description: true, metadata: true,
  },
  'variant-selector': {
    label: 'Glaze', optionLabel: 'Celadon', name: 'glaze', value: 'celadon',
    checked: true, required: true, groupDisabled: false, disabled: false,
    unavailable: false, unavailableText: 'Unavailable',
  },
  'product-form': {
    variantSelector: true, quantitySelector: true, submitLabel: 'Add to cart',
    submitDisabled: false, pending: false, feedback: false,
  },
  'product-slider': {
    title: 'Related works', previousLabel: 'Previous products', nextLabel: 'Next products',
    navigation: true, items: true,
  },
  'size-chart': {
    triggerLabel: 'Size guide', title: 'Size guide', dismissLabel: 'Close size guide',
    chart: true, unitControls: true, notes: true, open: true,
  },
  'back-in-stock': {
    heading: 'Join the waitlist', description: 'We will email you if this selected piece becomes purchasable in your current market.',
    label: 'Email address', value: '', placeholder: 'name@example.com',
    message: 'Availability notification only; marketing consent is separate.', variant: 'default',
    indicator: true, required: true, submitLabel: 'Notify me',
    form: true, requestState: 'idle', feedback: false,
  },
  'subscription-option': {
    legend: 'Purchase options',
    description: 'Choose one-time purchase or a recurring delivery plan.',
    name: 'purchase-option',
    options: true,
    selectedValue: 'one-time',
    oneTimePriceLabel: 'One-time price',
    checkoutChargeLabel: 'Due today',
    perDeliveryLabel: 'Per delivery',
    cadenceLabel: 'Cadence',
    required: true,
    disabled: false,
  },
};

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

const productSliderFixtures = [
  { title: 'Celadon Study No. 4', imageAlt: 'Celadon glazed stoneware vessel', price: '$102.00' },
  { title: 'Tall vessel with carved ash glaze', imageAlt: 'Tall carved stoneware vessel', price: '$138.00' },
  { title: 'Cuenco de gres', imageAlt: 'Cuenco de gres con esmalte claro', price: '$84.00' },
  { title: '茶碗 · Chawan', imageAlt: 'Hand-thrown chawan tea bowl', price: '¥12,800' },
  { title: 'Porcelain Fold', imageAlt: 'Folded white porcelain form', price: '€116.00' },
  { title: 'Night Archive No. 12', imageAlt: 'Dark glazed archival vessel', price: '$154.00' },
];

export default function ProductStudio({ contract, definition }: ProductStudioProps) {
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
  const [galleryId, setGalleryId] = useState('front');
  const [swatchValue, setSwatchValue] = useState('celadon');
  const [sizeValue, setSizeValue] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderCanPrevious, setSliderCanPrevious] = useState(false);
  const [sliderCanNext, setSliderCanNext] = useState(true);
  const [backInStockFeedback, setBackInStockFeedback] = useState('');
  const productFormFeedbackId = useId();
  const backInStockId = useId();
  const subscriptionOptionId = useId();
  const sizeChartId = useId();
  const sliderTitleId = useId();
  const sliderTrackId = useId();
  const sliderTrackRef = useRef<HTMLUListElement>(null);
  const sliderItemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const sliderPreviousRef = useRef<HTMLButtonElement>(null);
  const sliderNextRef = useRef<HTMLButtonElement>(null);

  const syncSliderFromScroll = useCallback(() => {
    const track = sliderTrackRef.current;
    const items = sliderItemRefs.current.filter((item): item is HTMLLIElement => item !== null);
    if (!track || items.length === 0) return;

    const rtl = getComputedStyle(track).direction === 'rtl';
    const trackRect = track.getBoundingClientRect();
    const trackEdge = rtl ? trackRect.right : trackRect.left;
    const nextIndex = items.reduce((closest, item, index) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs((rtl ? rect.right : rect.left) - trackEdge);
      return distance < closest.distance ? { index, distance } : closest;
    }, { index: 0, distance: Number.POSITIVE_INFINITY }).index;
    const firstRect = items[0].getBoundingClientRect();
    const lastRect = items[items.length - 1].getBoundingClientRect();
    const canPrevious = rtl ? firstRect.right > trackRect.right + 1 : firstRect.left < trackRect.left - 1;
    const canNext = rtl ? lastRect.left < trackRect.left - 1 : lastRect.right > trackRect.right + 1;
    const activeElement = document.activeElement;

    if ((!canPrevious && activeElement === sliderPreviousRef.current)
      || (!canNext && activeElement === sliderNextRef.current)) {
      track.focus({ preventScroll: true });
    }

    setSliderIndex(nextIndex);
    setSliderCanPrevious(canPrevious);
    setSliderCanNext(canNext);
  }, []);

  const selectSliderItem = useCallback((next: number) => {
    const normalized = Math.max(0, Math.min(productSliderFixtures.length - 1, next));
    setSliderIndex(normalized);
    sliderItemRefs.current[normalized]?.scrollIntoView({
      block: 'nearest',
      inline: 'start',
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  }, []);

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

  useEffect(() => {
    if (contract.slug !== 'product-slider' || values.items !== true) return undefined;
    const track = sliderTrackRef.current;
    if (!track) return undefined;
    const observer = new ResizeObserver(syncSliderFromScroll);
    observer.observe(track);
    track.addEventListener('scroll', syncSliderFromScroll, { passive: true });
    syncSliderFromScroll();
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', syncSliderFromScroll);
    };
  }, [contract.slug, syncSliderFromScroll, values.items]);

  useEffect(() => {
    if (contract.slug !== 'variant-selector') return;
    const fixtureValue = String(values.value || 'celadon');
    setSwatchValue((current) => {
      if (values.checked === true) return fixtureValue;
      if (current === fixtureValue) return 'ink';
      return current;
    });
  }, [contract.slug, values.checked, values.value]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setGalleryId('front');
    setSwatchValue('celadon');
    setSizeValue('M');
    setQuantity(1);
    setUnit('metric');
    setSliderIndex(0);
    setSliderCanPrevious(false);
    setSliderCanNext(true);
    setBackInStockFeedback('');
    sliderItemRefs.current[0]?.scrollIntoView({ block: 'nearest', inline: 'start', behavior: 'auto' });
  }

  function setBoolean(name: string, next: boolean) {
    setValues((current) => ({ ...current, [name]: next }));
  }

  function changeProperties(next: StudioPropertyValues) {
    setValues((current) => {
      if (contract.slug !== 'back-in-stock' || typeof next.requestState !== 'string') {
        return { ...current, ...next };
      }
      return {
        ...current,
        ...next,
        feedback: next.requestState === 'confirmed' || next.requestState === 'retryableError',
      };
    });
  }

  function currentState() {
    if (contract.slug === 'product-form') {
      if (values.pending === true) return 'pending';
      if (values.submitDisabled === true) return 'unavailable';
      if (values.feedback === true) return 'withFeedback';
      if (values.variantSelector === true && values.quantitySelector === true) return 'withSelection';
      if (values.variantSelector === true) return 'withVariant';
      if (values.quantitySelector === true) return 'withQuantity';
    }
    if (contract.slug === 'size-chart') return values.open === true ? 'open' : 'closed';
    if (contract.slug === 'back-in-stock') {
      const requestState = String(values.requestState || 'idle');
      if (requestState === 'submitting') return 'submitting';
      if (values.feedback === true && requestState === 'confirmed') return 'confirmed';
      if (values.feedback === true && requestState === 'retryableError') return 'retryableError';
      const variant = String(values.variant || 'default');
      return variant === 'default' ? 'idle' : `field${variant[0].toUpperCase()}${variant.slice(1)}`;
    }
    if (contract.slug === 'subscription-option') {
      if (values.disabled === true) return 'disabled';
      return values.selectedValue ? 'selected' : 'unselected';
    }
    if (contract.slug === 'product-slider') {
      if (!sliderCanPrevious && !sliderCanNext) return 'noOverflow';
      if (!sliderCanPrevious) return 'first';
      if (!sliderCanNext) return 'last';
      return 'middle';
    }
    return 'default';
  }

  function changeState(next: string) {
    if (contract.slug === 'product-form') {
      setValues((current) => ({
        ...current,
        variantSelector: ['withVariant', 'withSelection'].includes(next)
          ? true
          : ['default', 'withQuantity'].includes(next) ? false : current.variantSelector,
        quantitySelector: ['withQuantity', 'withSelection'].includes(next)
          ? true
          : ['default', 'withVariant'].includes(next) ? false : current.quantitySelector,
        submitDisabled: next === 'unavailable',
        pending: next === 'pending',
        feedback: next === 'withFeedback',
      }));
    }
    else if (contract.slug === 'size-chart') setBoolean('open', next === 'open');
    else if (contract.slug === 'back-in-stock') {
      const variant = next.startsWith('field')
        ? `${next.slice(5, 6).toLowerCase()}${next.slice(6)}`
        : 'default';
      const requestState = ['submitting', 'confirmed', 'retryableError'].includes(next)
        ? next
        : 'idle';
      setValues((current) => ({
        ...current,
        variant,
        requestState,
        feedback: next === 'confirmed' || next === 'retryableError',
      }));
      setBackInStockFeedback('');
    }
    else if (contract.slug === 'subscription-option') {
      setValues((current) => ({
        ...current,
        selectedValue: next === 'selected'
          ? 'plan-monthly'
          : next === 'unselected'
            ? ''
            : current.selectedValue,
        disabled: next === 'disabled',
      }));
    }
    else if (contract.slug === 'product-slider') {
      if (next === 'first' || next === 'default') selectSliderItem(0);
      else if (next === 'last') selectSliderItem(productSliderFixtures.length - 1);
      else if (next === 'middle') selectSliderItem(1);
    }
  }

  function renderProductCard(compact = false, index = 1) {
    return <ProductCardArtwork
      title={compact ? `Study No. ${index}` : String(values.title || 'Untitled')}
      href={String(values.href || '#product')}
      imageAlt={String(values.imageAlt || 'Studio product fixture')}
      mediaRatio={values.mediaRatio === 'portrait' ? 'portrait' : 'square'}
      mediaIndex={index}
      vendor={compact || values.showVendor === false ? '' : String(values.vendor || '')}
      description={compact ? '' : String(values.description || '')}
      hoverMediaIndex={!compact && values.hoverImage === true ? index + 1 : undefined}
      badgeLabel={!compact && values.badges === true ? 'New' : ''}
      quickLookLabel={!compact && values.quickLookAction === true ? `Quick look at ${String(values.title || 'product')}` : ''}
      currentPrice={`$${90 + index * 12}.00`}
      footerAction={!compact && values.footer === true ? <button className="btn btn--outline btn--sm" type="button">Save</button> : undefined}
      className={`docs-studio__product-card${compact ? ' docs-studio__product-card--compact' : ''}`}
    />;
  }

  function renderGallery() {
    return (
      <ProductGalleryArtwork
        className="docs-studio__product-gallery"
        media={buildProductGalleryFixture()}
        currentId={galleryId}
        imageDetail={values.imageDetail === 'none' ? 'none' : 'lightbox'}
        loop={values.loop === true}
        onCurrentIdChange={setGalleryId}
      />
    );
  }

  function renderProductInfo() {
    return (
      <section className="product-info docs-studio__product-info" data-product-info data-product-info-projection="variant">
        <header className="product-info__identity">
          {String(values.vendor || '') && <p className="product-info__vendor" dir="auto">{String(values.vendor)}</p>}
          <h2 className="product-info__title" dir="auto">{String(values.title)}</h2>
          {String(values.subtitle || '') && <p className="product-info__subtitle" dir="auto">{String(values.subtitle)}</p>}
        </header>
        <div className="product-info__price">
          <PriceArtwork currentPrice="$120.00" currentPriceLabel="Price" />
        </div>
        {values.description === true && (
          <div className="product-info__description">
            <p>Hand-thrown stoneware finished with a satin celadon glaze.</p>
            <p>Each work is unique. Review the <a href="#care" onClick={(event) => event.preventDefault()}>care guidance</a> before use.</p>
            <ul><li>Food safe</li><li>Finished by hand</li></ul>
          </div>
        )}
        {values.metadata === true && (
          <dl className="product-info__meta">
            <div><dt>Material</dt><dd dir="auto">Stoneware</dd></div>
            <div><dt>Dimensions</dt><dd dir="auto">28 × 16 cm</dd></div>
            <div><dt>Firing</dt><dd dir="auto">1,240 °C</dd></div>
            <div data-product-info-variant-field="sku"><dt>SKU</dt><dd dir="auto">CS-04-CEL</dd></div>
            <div data-product-info-variant-field="inventory"><dt>Inventory</dt><dd dir="auto">3</dd></div>
            <div data-product-info-variant-field="availability"><dt>Availability</dt><dd dir="auto">Available</dd></div>
          </dl>
        )}
      </section>
    );
  }

  function renderVariantSelector() {
    const fixtureValue = String(values.value || 'celadon');
    const colors = [
      { value: fixtureValue, label: String(values.optionLabel || 'Celadon'), fixture: true, surface: 'celadon' },
      ...[
        { value: 'ink', label: 'Ink', fixture: false, surface: 'ink' },
        { value: 'porcelain', label: 'Porcelain', fixture: false, surface: 'porcelain' },
        { value: 'ash', label: 'Ash', fixture: false, surface: 'ash' },
      ].filter((option) => option.value !== fixtureValue).slice(0, 3),
    ];
    const selectedSwatch = colors.find((option) => option.value === swatchValue)?.label ?? swatchValue;
    const swatchName = String(values.name || 'glaze');
    const selectSwatch = (value: string, fixture: boolean) => {
      setSwatchValue(value);
      if (contract.slug === 'variant-selector') {
        setValues((current) => ({ ...current, checked: fixture }));
      }
    };
    return (
      <div className="variant-selector docs-studio__variant-selector">
        <fieldset className="variant-selector__group" disabled={contract.slug === 'variant-selector' && values.groupDisabled === true}>
          <legend className="variant-selector__legend"><span className={`variant-selector__label${values.required === true ? ' variant-selector__label--required' : ''}`} dir="auto">{String(values.label || 'Glaze')}</span>: <span className="variant-selector__selection" aria-hidden="true" dir="auto">{selectedSwatch}</span></legend>
          <div className="variant-swatches">
            {colors.map((option, index) => {
              const unavailable = option.fixture ? values.unavailable === true : option.value === 'porcelain';
              const disabled = option.fixture ? values.disabled === true : option.value === 'ash';
              return (
              <label className={`variant-swatch${unavailable ? ' variant-swatch--unavailable' : ''}`} key={option.value}>
                <input className="variant-swatch__input" type="radio" name={swatchName} value={option.value} checked={swatchValue === option.value} required={contract.slug === 'product-form' ? index === 0 : option.fixture && values.required === true} disabled={disabled} onChange={() => selectSwatch(option.value, option.fixture)} />
                <span className={`variant-swatch__color tg-preview-swatch--${option.surface}`} />
                <span className="variant-swatch__label" dir="auto">{option.label}</span>
                {unavailable && <span className="variant-selector__option-status">, {String(values.unavailableText || 'Unavailable')}</span>}
                {disabled && <span className="variant-selector__option-status">, Unavailable combination</span>}
              </label>
              );
            })}
          </div>
        </fieldset>
        <fieldset className="variant-selector__group">
          <legend className="variant-selector__legend"><span className="variant-selector__label">Size</span>: <span className="variant-selector__selection" aria-hidden="true">{sizeValue}</span></legend>
          <div className="variant-pills">
            {['S', 'M', 'L', 'XL', 'XXL'].map((value, index) => {
              const unavailable = value === 'XL';
              const disabled = value === 'XXL';
              return <label className={`variant-pill${unavailable ? ' variant-pill--unavailable' : ''}`} key={value}><input className="variant-pill__input" type="radio" name="size" value={value} checked={sizeValue === value} required={contract.slug === 'product-form' && index === 0} disabled={disabled} onChange={() => setSizeValue(value)} /><span className="variant-pill__label">{value}</span>{unavailable && <span className="variant-selector__option-status">, {String(values.unavailableText || 'Unavailable')}</span>}{disabled && <span className="variant-selector__option-status">, Unavailable combination</span>}</label>;
            })}
          </div>
        </fieldset>
      </div>
    );
  }

  function renderProductForm() {
    const pending = values.pending === true;
    const selectionUnavailable = ['porcelain', 'ash'].includes(swatchValue) || sizeValue === 'XL';
    const merchandiseId = selectionUnavailable ? '' : `${swatchValue}-${sizeValue.toLowerCase()}`;
    const submitDisabled = values.submitDisabled === true || !merchandiseId;
    const feedback = pending
      ? 'Adding this work to your cart.'
      : values.submitDisabled === true
        ? 'This work is currently unavailable.'
        : selectionUnavailable
          ? 'This option combination is unavailable.'
          : `Selection ready: ${swatchValue}, ${sizeValue}.`;

    return (
      <ProductFormArtwork
        className="docs-studio__product-form"
        action="#cart"
        method="post"
        submitLabel={String(values.submitLabel)}
        submitDisabled={submitDisabled}
        pending={pending}
        feedback={values.feedback === true ? feedback : undefined}
        feedbackId={values.feedback === true ? productFormFeedbackId : undefined}
        onSubmit={(event) => event.preventDefault()}
        onReset={() => {
          setSwatchValue('celadon');
          setSizeValue('M');
          setQuantity(1);
        }}
        variantSelector={values.variantSelector === true ? renderVariantSelector() : undefined}
        quantitySelector={values.quantitySelector === true ? (
          <QuantitySelectorArtwork
            value={quantity}
            min={1}
            max={8}
            step={1}
            name="quantity"
            required
            accessibleLabel="Quantity"
            onValueChange={(value) => setQuantity(value ?? 1)}
          />
        ) : undefined}
        targetData={<input type="hidden" name="merchandise" value={merchandiseId} disabled={!merchandiseId} data-product-selection />}
        submitIcon={<ShoppingBag className="btn__icon btn__icon--leading" aria-hidden="true" />}
      />
    );
  }

  function renderSlider() {
    const title = String(values.title || '');
    return (
      <section className="carousel product-slider docs-studio__product-slider" aria-labelledby={sliderTitleId}>
        <div className="product-slider__header">
          <h2 className="product-slider__title" id={sliderTitleId} dir="auto">{title}</h2>
          {values.navigation === true && values.items === true && (
            <div className="product-slider__nav" role="group" aria-labelledby={sliderTitleId}>
              <button ref={sliderPreviousRef} className="icon-btn icon-btn--round carousel__nav-btn product-slider__nav-button product-slider__nav-button--previous" type="button" aria-label={String(values.previousLabel)} aria-controls={sliderTrackId} data-product-slider-previous disabled={!sliderCanPrevious} onClick={() => selectSliderItem(sliderIndex - 1)}><ChevronLeft className="icon-btn__icon" aria-hidden="true" /></button>
              <button ref={sliderNextRef} className="icon-btn icon-btn--round carousel__nav-btn product-slider__nav-button product-slider__nav-button--next" type="button" aria-label={String(values.nextLabel)} aria-controls={sliderTrackId} data-product-slider-next disabled={!sliderCanNext} onClick={() => selectSliderItem(sliderIndex + 1)}><ChevronRight className="icon-btn__icon" aria-hidden="true" /></button>
            </div>
          )}
        </div>
        {values.items === true && (
          <ul className="carousel__track product-slider__track" id={sliderTrackId} ref={sliderTrackRef} tabIndex={0} aria-labelledby={sliderTitleId}>
            {productSliderFixtures.map((item, index) => (
              <li className="carousel__slide product-slider__item" key={item.title} ref={(element) => { sliderItemRefs.current[index] = element; }}>
                <ProductCardArtwork title={item.title} href="#product" imageAlt={item.imageAlt} mediaIndex={index + 1} currentPrice={item.price} className="docs-studio__product-card docs-studio__product-card--compact" />
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  function renderSizeChart() {
    const fixture = buildSizeChartFixture(unit);
    const unitControls = values.unitControls === true ? (
      <SegmentedControlArtwork
        className="size-chart__units"
        groupLabel="Measurement unit"
        name={`${sizeChartId}-unit`}
        options={[
          { label: 'CM', value: 'metric' },
          { label: 'IN', value: 'imperial' },
        ]}
        value={unit}
        onValueChange={(next) => {
          if (next === 'metric' || next === 'imperial') setUnit(next);
        }}
      />
    ) : undefined;

    return (
      <SizeChartArtwork
        id={`${sizeChartId}-dialog`}
        className="docs-studio__product-size-chart"
        overlayClassName="docs-studio__preview-modal-overlay"
        dialogClassName="docs-studio__preview-modal"
        triggerLabel={String(values.triggerLabel || '')}
        title={String(values.title || '')}
        dismissLabel={String(values.dismissLabel || '')}
        open={values.open === true}
        onOpenChange={(next) => setBoolean('open', next)}
        closeIcon={<X className="close-btn__icon" aria-hidden="true" />}
        unitControls={unitControls}
        chart={values.chart === true ? (
          <SizeChartFixtureTable
            fixture={fixture}
            scrollLabel="Framed textile size chart scroll area"
          />
        ) : undefined}
        notes={values.notes === true ? (
          <>
            <p>Measurements are approximate because each work is finished by hand.</p>
            <p>Check the dimensions of your intended display space before choosing a size.</p>
          </>
        ) : undefined}
      />
    );
  }

  function validationIcon(variant: string) {
    if (variant === 'error') return CircleAlert;
    if (variant === 'success') return CircleCheck;
    if (variant === 'warning') return TriangleAlert;
    return Mail;
  }

  function renderBackInStock() {
    const variant = String(values.variant || 'default');
    const Indicator = validationIcon(variant);
    if (values.form !== true) return null;
    const requestState = String(values.requestState || 'idle') as BackInStockRequestState;
    const feedback = values.feedback === true ? (
      requestState === 'confirmed'
        ? 'Confirmed state preview: the provider accepted this availability request.'
        : requestState === 'retryableError'
          ? backInStockFeedback || 'Retryable error preview: no notification request was registered.'
          : backInStockFeedback || 'Target response preview: no notification request was sent.'
    ) : undefined;
    const submit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (requestState === 'submitting' || requestState === 'confirmed') return;
      setBackInStockFeedback('Preview target has no notification provider; no request was registered.');
      setValues((current) => ({ ...current, requestState: 'retryableError', feedback: true }));
    };

    return (
      <BackInStockArtwork
        id={`back-in-stock-${backInStockId.replace(/:/g, '')}`}
        heading={String(values.heading || '')}
        description={String(values.description || '')}
        emailLabel={String(values.label || '')}
        emailValue={String(values.value || '')}
        emailPlaceholder={String(values.placeholder || '')}
        emailMessage={String(values.message || '')}
        emailVariant={variant === 'error' || variant === 'success' || variant === 'warning' ? variant : 'default'}
        emailIndicator={values.indicator === true ? (
          <Indicator className="input__icon input__icon--trailing" aria-hidden="true" />
        ) : undefined}
        required={values.required === true}
        requestState={requestState}
        action="#back-in-stock-preview"
        method="post"
        targetData={(
          <>
            <input type="hidden" name="product" value="celadon-study-no-4" />
            <input type="hidden" name="variant" value="one-of-one" />
            <input type="hidden" name="market" value="gallery-preview" />
          </>
        )}
        submitLabel={String(values.submitLabel || '')}
        feedback={feedback}
        className="docs-studio__back-in-stock"
        onEmailChange={(event) => setValues((current) => ({ ...current, value: event.target.value }))}
        onSubmit={submit}
        onReset={() => {
          setValues((current) => ({ ...current, value: '', requestState: 'idle', feedback: false }));
          setBackInStockFeedback('');
        }}
      />
    );
  }

  function renderSubscription() {
    return (
      <form
        className="docs-studio__subscription-form"
        onSubmit={(event) => event.preventDefault()}
        onReset={() => setValues((current) => ({ ...current, selectedValue: 'one-time' }))}
      >
        <SubscriptionOptionArtwork
          idPrefix={`subscription-option-${subscriptionOptionId}`}
          className="docs-studio__subscription-option"
          legend={String(values.legend || '')}
          description={String(values.description || '')}
          name={String(values.name || '')}
          options={values.options === true ? subscriptionPurchaseOptionFixture : []}
          selectedValue={String(values.selectedValue || '')}
          oneTimePriceLabel={String(values.oneTimePriceLabel || '')}
          checkoutChargeLabel={String(values.checkoutChargeLabel || '')}
          perDeliveryLabel={String(values.perDeliveryLabel || '')}
          cadenceLabel={String(values.cadenceLabel || '')}
          required={values.required === true}
          disabled={values.disabled === true}
          onValueChange={(selectedValue) => setValues((current) => ({
            ...current,
            selectedValue,
          }))}
        />
      </form>
    );
  }

  function renderPreview() {
    if (contract.slug === 'product-card') return renderProductCard();
    if (contract.slug === 'product-gallery') return renderGallery();
    if (contract.slug === 'product-info') return renderProductInfo();
    if (contract.slug === 'variant-selector') return renderVariantSelector();
    if (contract.slug === 'product-form') return renderProductForm();
    if (contract.slug === 'product-slider') return renderSlider();
    if (contract.slug === 'size-chart') return renderSizeChart();
    if (contract.slug === 'back-in-stock') return renderBackInStock();
    return renderSubscription();
  }

  const overlay = contract.slug === 'size-chart';

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue={currentState()} tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={changeProperties} onSlotIconChange={() => undefined} onStateChange={changeState} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className={`docs-studio__stage${overlay ? ' docs-studio__stage--overlay' : ''}`} aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}><div className={`docs-studio__stage-inner docs-studio__product-stage-inner${contract.slug === 'product-slider' ? ' docs-studio__product-stage-inner--slider' : ''}`}>{renderPreview()}</div></section>
      </div>
    </div>
  );
}
