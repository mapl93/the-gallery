import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import {
  PackageOpen,
  ShoppingBag,
  X,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import CartEmptyArtwork from './CartEmptyArtwork';
import CartLineItemArtwork from './CartLineItemArtwork';
import CartNoteArtwork from './CartNoteArtwork';
import CartPageArtwork from './CartPageArtwork';
import CartSummaryArtwork, { type CartSummaryRow } from './CartSummaryArtwork';
import CartUpsellArtwork from './CartUpsellArtwork';
import DiscountFieldArtwork from './DiscountFieldArtwork';
import FreeShippingBarArtwork from './FreeShippingBarArtwork';
import GiftWrapArtwork from './GiftWrapArtwork';
import ModalArtwork from './ModalArtwork';
import PriceArtwork from './PriceArtwork';
import ProductFormArtwork from './ProductFormArtwork';
import ProductGalleryArtwork from './ProductGalleryArtwork';
import { buildProductGalleryFixture } from './productGalleryFixture';
import StickyAtcArtwork from './StickyAtcArtwork';
import TextareaArtwork from './TextareaArtwork';
import { editorialMedia } from './editorialMedia';

interface CartStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'cart-page': {
    title: 'Your cart', count: '1 item', continueLabel: 'Continue shopping',
    continueHref: '#collection', lineItems: true, summary: true, summaryPlacement: 'sticky',
  },
  'cart-line-item': {
    media: true, title: 'Celadon Study No. 4', href: '#product', details: true,
    price: true, quantitySelector: true, removeAction: true, saveAction: true,
  },
  'cart-summary': {
    title: 'Order summary', rows: true, note: 'Taxes and shipping calculated at checkout.',
    checkoutLabel: 'Checkout', checkoutDisabled: false, checkoutBusy: false, express: true,
  },
  'discount-field': {
    toggleLabel: 'Add discount code', expanded: true, input: true, applyLabel: 'Apply',
    applyDisabled: false, applyBusy: false, appliedCodes: false,
  },
  'free-shipping-bar': {
    message: 'You are $35 away from free shipping.',
    accessibleLabel: 'Progress toward free shipping',
    value: 65,
    max: 100,
    valueText: '$65 of $100 toward free shipping',
  },
  'cart-upsell': {
    title: 'Complete the set', items: true,
  },
  'cart-empty': {
    icon: true, title: 'Your cart is empty',
    message: 'Explore the collection to find a work for your space.',
    actionLabel: 'Browse collection', href: '#collection',
  },
  'quick-view': {
    open: true, dismissLabel: 'Close quick view', gallery: true,
    title: 'Celadon Study No. 4', vendor: 'Lucia Ferrer', price: true,
    description: 'Hand-thrown stoneware finished with a satin celadon glaze.',
    productForm: true, fullLinkLabel: 'View full details', href: '#product',
  },
  'sticky-atc': {
    visible: true, image: true, imageAlt: 'Celadon glazed stoneware vessel',
    title: 'Celadon Study No. 4', price: true, actionLabel: 'Add to cart',
    productFormId: 'sticky-product-form-preview', actionDisabled: false, pending: false,
  },
  'cart-note': { toggleLabel: 'Add an order note', expanded: true, field: true },
  'gift-wrap': {
    selected: false,
    label: 'Add gift wrapping',
    price: true,
    name: 'gift_wrap',
    value: 'selected',
    describedBy: '',
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

function CartMedia({ className = '', alt = '' }: { className?: string; alt?: string }) {
  return <img src={editorialMedia.texturedVase} alt={alt} className={`${className} docs-studio__cart-media`} />;
}

export default function CartStudio({ contract, definition }: CartStudioProps) {
  const id = useId();
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
  const [quantity, setQuantity] = useState(1);
  const [lineRemoved, setLineRemoved] = useState(false);
  const [lineSaved, setLineSaved] = useState(false);
  const [summaryFeedback, setSummaryFeedback] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountCodes, setDiscountCodes] = useState(['STUDIO10', 'WELCOME5']);
  const [discountError, setDiscountError] = useState('');
  const [discountFeedback, setDiscountFeedback] = useState('');
  const [upsellAdded, setUpsellAdded] = useState(false);
  const [quickViewAdded, setQuickViewAdded] = useState(false);
  const [quickViewGalleryId, setQuickViewGalleryId] = useState('front');
  const [stickyFeedback, setStickyFeedback] = useState('');
  const [note, setNote] = useState('Please include a handwritten card.');

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

  function setValue(name: string, value: StudioPropertyValue) {
    setValues((current) => ({ ...current, [name]: value }));
  }

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setQuantity(1);
    setLineRemoved(false);
    setLineSaved(false);
    setSummaryFeedback('');
    setDiscountCode('');
    setDiscountCodes(['STUDIO10', 'WELCOME5']);
    setDiscountError('');
    setDiscountFeedback('');
    setUpsellAdded(false);
    setQuickViewAdded(false);
    setQuickViewGalleryId('front');
    setStickyFeedback('');
    setNote('Please include a handwritten card.');
  }

  function currentState() {
    if (contract.slug === 'discount-field') {
      if (discountError) return 'inputError';
      if (values.applyBusy === true) return 'applyBusy';
      if (values.applyDisabled === true) return 'applyDisabled';
      if (values.appliedCodes === true) return 'appliedCodes';
      return values.expanded === true ? 'open' : 'default';
    }
    if (contract.slug === 'free-shipping-bar') {
      const value = Number(values.value);
      const max = Number(values.max);
      return Number.isFinite(value) && Number.isFinite(max) && max > 0 && value >= max
        ? 'achieved'
        : 'default';
    }
    if (contract.slug === 'quick-view') return values.open === true ? 'open' : 'closed';
    if (contract.slug === 'sticky-atc') {
      if (values.pending === true) return 'pending';
      if (values.actionDisabled === true) return 'unavailable';
      return values.visible === true ? 'visible' : 'hidden';
    }
    return 'default';
  }

  function changeState(next: string) {
    if (contract.slug === 'discount-field') {
      setValues((current) => ({
        ...current,
        expanded: next !== 'default',
        applyDisabled: next === 'applyDisabled',
        applyBusy: next === 'applyBusy',
        appliedCodes: next === 'appliedCodes',
      }));
      setDiscountError(next === 'inputError' ? 'This code could not be applied. Check it and try again.' : '');
      if (next === 'inputError') setDiscountCode('INVALID');
    }
    else if (contract.slug === 'free-shipping-bar') {
      setValues((current) => {
        const authoredMax = Number(current.max);
        const max = Number.isFinite(authoredMax) && authoredMax > 0 ? authoredMax : 100;
        const achieved = next === 'achieved';
        return {
          ...current,
          value: achieved ? max : max * 0.65,
          message: achieved
            ? 'You qualify for free shipping.'
            : 'Continue adding items to qualify for free shipping.',
          valueText: achieved
            ? 'Free shipping threshold reached'
            : '65% of the free-shipping threshold',
        };
      });
    }
    else if (contract.slug === 'quick-view') setValue('open', next === 'open');
    else if (contract.slug === 'sticky-atc') {
      setValues((current) => ({
        ...current,
        visible: next !== 'hidden',
        actionDisabled: next === 'unavailable',
        pending: next === 'pending',
      }));
      setStickyFeedback('');
    }
  }

  function renderLineItem(
    useContractValues = true,
    onFixtureQuantityChange?: (value: number | null) => void,
  ) {
    const item = useContractValues ? values : {
      media: true,
      title: 'Celadon Study No. 4',
      href: '#product',
      details: true,
      price: true,
      quantitySelector: true,
      removeAction: true,
      saveAction: true,
    };

    if (lineRemoved) {
      return (
        <div className="docs-studio__cart-feedback">
          <p role="status">Celadon Study No. 4 was removed in the local preview.</p>
          <button className="btn btn--link" type="button" onClick={() => setLineRemoved(false)}>Restore preview item</button>
        </div>
      );
    }

    return (
      <>
        <ul className="cart-lines docs-studio__cart-lines">
          <CartLineItemArtwork
            className="docs-studio__cart-line"
            lineKey="celadon-study-4"
            title={String(item.title)}
            href={String(item.href || '')}
            onNavigate={(event) => event.preventDefault()}
            details={item.details === true ? 'Celadon / Medium' : undefined}
            imageSrc={item.media === true ? editorialMedia.texturedVase : ''}
            imageAlt=""
            imageClassName="docs-studio__cart-media"
            currentPrice={item.price === true ? '$120.00' : ''}
            currentPriceLabel="Sale price"
            compareAtPrice={item.price === true ? '$150.00' : ''}
            compareAtPriceLabel="Regular price"
            quantity={item.quantitySelector === true ? quantity : undefined}
            quantityMin={1}
            quantityMax={8}
            quantityName="updates[celadon-study-4]"
            onQuantityChange={item.quantitySelector === true
              ? (next) => {
                setQuantity(next ?? 1);
                onFixtureQuantityChange?.(next);
              }
              : undefined}
            removeLabel={item.removeAction === true ? 'Remove' : ''}
            removeAccessibleLabel={`Remove ${String(item.title)} from cart`}
            onRemove={() => setLineRemoved(true)}
            saveLabel={item.saveAction === true ? (lineSaved ? 'Saved for later' : 'Save for later') : ''}
            saveAccessibleLabel={lineSaved ? `${String(item.title)} is saved for later` : `Save ${String(item.title)} for later`}
            saveDisabled={lineSaved}
            onSave={() => setLineSaved(true)}
          />
        </ul>
        {lineSaved && <p className="docs-studio__cart-feedback" role="status">Celadon Study No. 4 was saved in the local preview.</p>}
      </>
    );
  }

  function renderSummary(useContractValues = true, cartQuantity = 1) {
    const summary = useContractValues ? values : {
      title: 'Order summary', rows: true, note: 'Taxes and shipping calculated at checkout.',
      checkoutLabel: 'Checkout', checkoutDisabled: false, checkoutBusy: false, express: true,
    };
    const formatMoney = (amount: number) => `$${amount.toFixed(2)}`;
    const rows: CartSummaryRow[] = summary.rows === true ? [
      { key: 'subtotal', label: 'Subtotal', value: formatMoney(150 * cartQuantity) },
      { key: 'discount', label: 'Studio member discount', value: `−${formatMoney(30 * cartQuantity)}` },
      { key: 'total', label: 'Estimated total', value: `${formatMoney(120 * cartQuantity)} USD`, total: true },
    ] : [];
    return (
      <>
        <CartSummaryArtwork
          id={`${id}-cart-summary`}
          className="docs-studio__cart-summary"
          title={String(summary.title)}
          rows={rows}
          note={String(summary.note || '')}
          checkoutLabel={String(summary.checkoutLabel)}
          checkoutDisabled={summary.checkoutDisabled === true}
          checkoutBusy={summary.checkoutBusy === true}
          onCheckout={() => setSummaryFeedback('Checkout was requested in the local preview.')}
          expressContent={summary.express === true ? (
            <>
              <div className="cart-summary__divider"><span>or pay with</span></div>
              <button className="btn btn--outline" type="button" onClick={() => setSummaryFeedback('Express checkout was requested in the local preview.')}>Express checkout</button>
            </>
          ) : undefined}
        />
        {summaryFeedback && <p className="docs-studio__cart-feedback" role="status">{summaryFeedback}</p>}
      </>
    );
  }

  function renderCartPage() {
    return (
      <CartPageArtwork
        id={`${id}-cart-page`}
        className="docs-studio__cart-page"
        title={String(values.title)}
        count={String(values.count || '')}
        continueLabel={String(values.continueLabel || '')}
        continueHref={String(values.continueHref || '')}
        summaryPlacement={String(values.summaryPlacement || 'sticky')}
        onContinue={(event) => event.preventDefault()}
        lineItems={values.lineItems === true ? renderLineItem(false, (next) => {
          const nextQuantity = next ?? 1;
          setValue('count', `${nextQuantity} ${nextQuantity === 1 ? 'item' : 'items'}`);
        }) : null}
        summary={values.summary === true ? renderSummary(false, quantity) : null}
      />
    );
  }

  function renderDiscount() {
    const apply = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (values.applyDisabled === true || values.applyBusy === true) return;
      const candidate = discountCode.trim();
      if (!candidate) return;
      if (candidate.toLocaleUpperCase() === 'INVALID') {
        setDiscountError('This code could not be applied. Check it and try again.');
        setDiscountFeedback('');
        return;
      }
      setDiscountCodes((current) => (
        current.some((code) => code.toLocaleLowerCase() === candidate.toLocaleLowerCase())
          ? current
          : [...current, candidate]
      ));
      setValues((current) => ({ ...current, appliedCodes: true, expanded: true }));
      setDiscountCode('');
      setDiscountError('');
      setDiscountFeedback(`${candidate} was applied in the local preview.`);
    };

    const remove = (key: string) => {
      const code = discountCodes.find((candidate) => candidate === key);
      const remaining = discountCodes.filter((candidate) => candidate !== key);
      setDiscountCodes(remaining);
      if (remaining.length === 0) setValue('appliedCodes', false);
      setDiscountFeedback(`${code || 'The code'} was removed in the local preview.`);
      requestAnimationFrame(() => document.getElementById(`${id}-discount-input`)?.focus());
    };

    return (
      <div className="docs-studio__discount-fixture">
        <DiscountFieldArtwork
          id={`${id}-discount`}
          className="docs-studio__discount-field"
          toggleLabel={String(values.toggleLabel)}
          expanded={values.expanded === true}
          inputPresent={values.input === true}
          inputLabel="Discount code"
          inputValue={discountCode}
          inputMessage={discountError}
          inputVariant={discountError ? 'error' : 'default'}
          applyLabel={String(values.applyLabel)}
          applyDisabled={values.applyDisabled === true}
          applyBusy={values.applyBusy === true}
          appliedCodes={values.appliedCodes === true ? discountCodes.map((code) => ({
            key: code,
            code,
            removeLabel: `Remove ${code} discount`,
          })) : []}
          onExpandedChange={(expanded) => setValue('expanded', expanded)}
          onInputChange={(event) => {
            setDiscountCode(event.target.value);
            if (discountError) setDiscountError('');
          }}
          onApply={apply}
          onRemove={remove}
        />
        {discountFeedback && <p className="docs-studio__cart-feedback" role="status">{discountFeedback}</p>}
      </div>
    );
  }

  function renderShippingBar() {
    return (
      <FreeShippingBarArtwork
        className="docs-studio__shipping-bar"
        message={String(values.message ?? '')}
        accessibleLabel={String(values.accessibleLabel ?? '')}
        value={Number(values.value)}
        max={Number(values.max)}
        valueText={String(values.valueText ?? '')}
      />
    );
  }

  function renderUpsell() {
    const itemTitle = 'Celadon incense holder';

    return (
      <>
        <CartUpsellArtwork
          id="cart-upsell-preview"
          className="docs-studio__cart-upsell"
          title={String(values.title ?? '')}
          items={values.items === true ? [{
            key: 'celadon-incense-holder',
            title: itemTitle,
            href: '#product',
            onNavigate: (event) => event.preventDefault(),
            imageSrc: editorialMedia.texturedVase,
            imageAlt: '',
            imageClassName: 'docs-studio__cart-media',
            currentPrice: '$34.00',
            currentPriceLabel: 'Price',
            actionLabel: 'Add',
            actionAccessibleLabel: `Add ${itemTitle} to cart`,
            onAction: () => setUpsellAdded(true),
          }] : []}
        />
        <span className="visually-hidden" role="status">
          {upsellAdded ? `${itemTitle} was added to the preview cart.` : ''}
        </span>
      </>
    );
  }

  function renderEmpty() {
    return (
      <CartEmptyArtwork
        className="docs-studio__cart-empty"
        title={String(values.title || '')}
        titleElement="h2"
        message={String(values.message || '')}
        icon={values.icon === true ? <PackageOpen /> : undefined}
        actionLabel={String(values.actionLabel || '')}
        href={String(values.href || '')}
        onAction={(event) => event.preventDefault()}
      />
    );
  }

  function renderQuickView() {
    const title = String(values.title || '').trim();
    const dismissLabel = String(values.dismissLabel || '').trim();
    const fullLinkLabel = String(values.fullLinkLabel || '').trim();
    const href = String(values.href || '').trim();
    const hasGallery = values.gallery === true;
    const hasPrice = values.price === true;
    const hasProductForm = values.productForm === true;
    const hasFullLink = Boolean(fullLinkLabel && href);
    if (!title || !dismissLabel || !hasGallery || !hasPrice || (!hasProductForm && !hasFullLink)) return null;
    const feedbackId = `${id}-quick-view-feedback`;

    return (
      <ModalArtwork
        id={`${id}-quick-view`}
        title={title}
        open={values.open === true}
        dismissLabel={dismissLabel}
        triggerLabel={`Open quick view for ${title}`}
        overlayClassName="quick-view-overlay docs-studio__preview-modal-overlay docs-studio__quick-view-overlay"
        className="quick-view docs-studio__quick-view"
        closeIcon={<X className="close-btn__icon" aria-hidden="true" />}
        initialFocus="title"
        onOpenChange={(open) => setValue('open', open)}
      >
        <div className="quick-view__layout">
          <div className="quick-view__gallery">
            <ProductGalleryArtwork
              className="docs-studio__quick-view-gallery"
              media={buildProductGalleryFixture()}
              currentId={quickViewGalleryId}
              imageDetail="none"
              onCurrentIdChange={setQuickViewGalleryId}
            />
          </div>
          <div className="quick-view__info">
            {String(values.vendor || '').trim() && <p className="quick-view__vendor" dir="auto">{String(values.vendor)}</p>}
            <div className="quick-view__price">
              <PriceArtwork currentPrice="$120.00" currentPriceLabel="Price" />
            </div>
            {String(values.description || '').trim() && <p className="quick-view__description" dir="auto">{String(values.description)}</p>}
            {hasProductForm && (
              <ProductFormArtwork
                className="quick-view__form"
                action="#cart"
                method="post"
                submitLabel="Add to cart"
                submitDisabled={quickViewAdded}
                feedback={quickViewAdded ? `${title} was added to the preview cart.` : undefined}
                feedbackId={quickViewAdded ? feedbackId : undefined}
                feedbackRole={quickViewAdded ? 'status' : undefined}
                targetData={<input type="hidden" name="merchandise" value="celadon-study-4" />}
                submitIcon={<ShoppingBag className="btn__icon btn__icon--leading" aria-hidden="true" />}
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!quickViewAdded) setQuickViewAdded(true);
                }}
              />
            )}
            {hasFullLink && <a className="link quick-view__full-link" href={href} onClick={(event) => event.preventDefault()}>{fullLinkLabel}</a>}
          </div>
        </div>
      </ModalArtwork>
    );
  }

  function renderStickyAtc() {
    const title = String(values.title || '').trim();
    const actionLabel = String(values.actionLabel || '').trim();
    const productFormId = String(values.productFormId || '').trim();
    if (!title || !actionLabel || !productFormId) return null;
    const unavailable = values.actionDisabled === true;
    const pending = values.pending === true;
    return (
      <>
        <div hidden>
          <ProductFormArtwork
            id={productFormId}
            action="#cart"
            method="post"
            submitLabel={actionLabel}
            submitDisabled={unavailable}
            pending={pending}
            targetData={<><input type="hidden" name="merchandise" value="celadon-study-4" /><input type="hidden" name="quantity" value="1" /></>}
            onSubmit={(event) => {
              event.preventDefault();
              setStickyFeedback(`${title} was added to the preview cart.`);
            }}
          />
        </div>
        {stickyFeedback && <p className="docs-studio__sticky-atc-status" role="status">{stickyFeedback}</p>}
        <StickyAtcArtwork
          className="docs-studio__sticky-atc"
          visible={values.visible === true}
          title={title}
          actionLabel={actionLabel}
          productFormId={productFormId}
          image={values.image === true ? <img className="sticky-atc__image" src={editorialMedia.texturedVase} alt={String(values.imageAlt || '')} /> : undefined}
          price={values.price === true ? <PriceArtwork currentPrice="$120.00" currentPriceLabel="Price" /> : undefined}
          actionDisabled={unavailable}
          pending={pending}
        />
      </>
    );
  }

  function renderCartNote() {
    const expanded = values.expanded === true;
    return (
      <CartNoteArtwork
        className="docs-studio__cart-note"
        toggleLabel={String(values.toggleLabel || '')}
        expanded={expanded}
        onExpandedChange={(nextExpanded) => setValue('expanded', nextExpanded)}
        field={values.field === true ? (
          <TextareaArtwork
            id={`${id}-cart-note`}
            className="cart-note__field"
            label="Order note"
            value={note}
            name="note"
            placeholder="Special instructions for this order"
            autoComplete="off"
            onChange={(event) => setNote(event.target.value)}
          />
        ) : undefined}
      />
    );
  }

  function renderGiftWrap() {
    const selected = values.selected === true;
    const disabled = values.disabled === true;
    return (
      <GiftWrapArtwork
        className="docs-studio__gift-wrap"
        label={String(values.label || '')}
        selected={selected}
        name={String(values.name || '')}
        value={String(values.value || 'on')}
        describedBy={String(values.describedBy || '') || undefined}
        disabled={disabled}
        price={values.price === true ? (
          <PriceArtwork currentPrice="+$8.00" currentPriceLabel="Gift wrapping surcharge" />
        ) : undefined}
        onSelectedChange={(nextSelected) => setValue('selected', nextSelected)}
      />
    );
  }

  function renderPreview() {
    if (contract.slug === 'cart-page') return renderCartPage();
    if (contract.slug === 'cart-line-item') return renderLineItem();
    if (contract.slug === 'cart-summary') return renderSummary();
    if (contract.slug === 'discount-field') return renderDiscount();
    if (contract.slug === 'free-shipping-bar') return renderShippingBar();
    if (contract.slug === 'cart-upsell') return renderUpsell();
    if (contract.slug === 'cart-empty') return renderEmpty();
    if (contract.slug === 'quick-view') return renderQuickView();
    if (contract.slug === 'sticky-atc') return renderStickyAtc();
    if (contract.slug === 'cart-note') return renderCartNote();
    return renderGiftWrap();
  }

  const stickyStage = contract.slug === 'sticky-atc';
  const overlayStage = contract.slug === 'quick-view';

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector definition={definition} contract={contract} values={values} slotIconValues={emptySlotIcons} stateValue={currentState()} tokenValues={tokenValues} activeTokens={activeTokens} onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))} onSlotIconChange={() => undefined} onStateChange={changeState} onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))} onReset={reset} />
        <section className={`docs-studio__stage${stickyStage ? ' docs-studio__stage--cart-sticky' : ''}${overlayStage ? ' docs-studio__stage--overlay' : ''}`} aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}><div className={`docs-studio__stage-inner docs-studio__cart-stage-inner docs-studio__cart-stage-inner--${contract.slug}`}>{renderPreview()}</div></section>
      </div>
    </div>
  );
}
