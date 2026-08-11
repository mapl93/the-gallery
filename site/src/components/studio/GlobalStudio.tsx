import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import {
  ChevronRight,
  Grid2X2,
  Heart,
  Home,
  Menu,
  Package,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import CartLineItemArtwork from './CartLineItemArtwork';
import AnnouncementArtwork, { type AnnouncementMode } from './AnnouncementArtwork';
import { editorialMedia } from './editorialMedia';

interface GlobalStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  header: {
    logo: true,
    logoHref: '#home',
    navigationLabel: 'Primary navigation',
    navigation: true,
    actions: true,
    cartCount: '2',
    mobileMenuTrigger: true,
  },
  'announcement-bar': {
    message: true,
    countdown: true,
    messages: true,
    label: 'Gallery announcements',
    dismissLabel: 'Dismiss announcement',
    previousLabel: 'Previous announcement',
    nextLabel: 'Next announcement',
    pauseLabel: 'Pause announcements',
    playLabel: 'Play announcements',
    counterTemplate: '{current}/{total}',
    statusTemplate: 'Message {current} of {total}',
  },
  'announcement-extended': {
    message: true,
    countdown: true,
    messages: true,
    label: 'Gallery announcements',
    dismissLabel: 'Dismiss announcement',
    previousLabel: 'Previous announcement',
    nextLabel: 'Next announcement',
    pauseLabel: 'Pause announcements',
    playLabel: 'Play announcements',
    counterTemplate: '{current}/{total}',
    statusTemplate: 'Message {current} of {total}',
  },
  footer: {
    linkGroups: true,
    brand: true,
    metadata: true,
  },
  'mobile-menu': {
    items: true,
  },
  'search-overlay': {
    open: true,
    title: 'Search The Gallery',
    dismissLabel: 'Close search',
    inputLabel: 'Search artists, works, and collections',
    query: '',
    placeholder: 'Search artists, works, and collections',
    results: true,
  },
  'cart-drawer': {
    lineItems: true,
    summary: true,
  },
  'mega-menu': {
    label: 'Collections menu',
    open: true,
    columns: true,
    promo: true,
    featured: true,
  },
  'bottom-nav': {
    label: 'Mobile navigation',
    items: true,
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
    ...Object.fromEntries((contract.properties ?? []).map((property) => (
      [property.name, defaultValue(contract, property)]
    ))),
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

function preventNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

function FixtureImage({ className, alt }: { className: string; alt: string }) {
  return <img className={className} src={editorialMedia.ceramicsShelves} alt={alt} />;
}

export default function GlobalStudio({ contract, definition }: GlobalStudioProps) {
  const id = useId().replace(/:/g, '');
  const initialValues = useMemo(() => initialFixtureValues(contract), [contract]);
  const studioTokens = useMemo(() => [...new Set(definition.groups.flatMap((group) => (
    group.controls.flatMap((control) => resolveTokens(control, contract))
  )))], [definition, contract]);
  const activeTokens = useMemo(() => Object.fromEntries(definition.groups.flatMap((group) => (
    group.controls
      .filter((control) => control.tokens)
      .map((control) => [control.id, resolveTokens(control, contract)[0] ?? null])
  ))), [definition, contract]);
  const [values, setValues] = useState<StudioPropertyValues>(initialValues);
  const [baseTokenValues, setBaseTokenValues] = useState<Record<string, string>>({});
  const [tokenOverrides, setTokenOverrides] = useState<Record<string, string>>({});
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [quantities, setQuantities] = useState({ celadon: 1, incense: 1 });
  const [removedLines, setRemovedLines] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');
  const overlayTriggerRef = useRef<HTMLButtonElement>(null);
  const announcementTriggerRef = useRef<HTMLButtonElement>(null);
  const overlayPanelRef = useRef<HTMLElement>(null);
  const overlayInitialFocusRef = useRef<HTMLElement>(null);
  const overlayReturnFocusRef = useRef<HTMLElement | null>(null);
  const overlayWasOpenRef = useRef(false);
  const megaMenuRef = useRef<HTMLElement>(null);
  const megaMenuWasOpenRef = useRef(false);

  const managedOverlayOpen = contract.slug === 'mobile-menu' || contract.slug === 'cart-drawer'
    ? drawerOpen
    : contract.slug === 'search-overlay' && values.open === true;

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

  useEffect(() => {
    setValues(initialValues);
    setDrawerOpen(true);
    setQuantities({ celadon: 1, incense: 1 });
    setRemovedLines([]);
    setFeedback('');
  }, [initialValues]);

  useEffect(() => {
    if (contract.slug !== 'mobile-menu'
        && contract.slug !== 'search-overlay'
        && contract.slug !== 'cart-drawer') return undefined;

    if (managedOverlayOpen) {
      overlayWasOpenRef.current = true;
      const frame = requestAnimationFrame(() => {
        (overlayInitialFocusRef.current ?? overlayPanelRef.current)?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (!overlayWasOpenRef.current) return undefined;
    overlayWasOpenRef.current = false;
    const returnTarget = overlayReturnFocusRef.current?.isConnected
      ? overlayReturnFocusRef.current
      : overlayTriggerRef.current;
    overlayReturnFocusRef.current = null;
    const frame = requestAnimationFrame(() => returnTarget?.focus());
    return () => cancelAnimationFrame(frame);
  }, [contract.slug, managedOverlayOpen]);

  useEffect(() => {
    if (contract.slug !== 'mega-menu') return undefined;
    const open = values.open === true;

    if (open) {
      megaMenuWasOpenRef.current = true;
      return undefined;
    }

    if (!megaMenuWasOpenRef.current) return undefined;
    megaMenuWasOpenRef.current = false;
    if (!megaMenuRef.current?.contains(document.activeElement)) return undefined;
    const frame = requestAnimationFrame(() => overlayTriggerRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [contract.slug, values.open]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function updateValues(next: StudioPropertyValues) {
    setValues((current) => ({ ...current, ...next }));
  }

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setDrawerOpen(true);
    setQuantities({ celadon: 1, incense: 1 });
    setRemovedLines([]);
    setFeedback('');
  }

  function closePropertyOverlay() {
    updateValues({ open: false });
    setFeedback(`${contract.name} closed in this local preview.`);
  }

  function openPropertyOverlay() {
    if (contract.slug === 'search-overlay') rememberOverlayInvoker();
    updateValues({ open: true });
    setFeedback(`${contract.name} opened in this local preview.`);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setFeedback(`${contract.name} closed in this local preview.`);
  }

  function openDrawer() {
    if (contract.slug === 'mobile-menu' || contract.slug === 'cart-drawer') rememberOverlayInvoker();
    setDrawerOpen(true);
    setFeedback(`${contract.name} opened in this local preview.`);
  }

  function rememberOverlayInvoker() {
    const activeElement = document.activeElement;
    overlayReturnFocusRef.current = activeElement instanceof HTMLElement && activeElement !== document.body
      ? activeElement
      : null;
  }

  function handleManagedOverlayKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (contract.slug === 'mobile-menu' || contract.slug === 'cart-drawer') closeDrawer();
      if (contract.slug === 'search-overlay') closePropertyOverlay();
      return;
    }

    if (event.key !== 'Tab') return;
    const panel = overlayPanelRef.current;
    if (!panel) return;
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>([
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(','))).filter((element) => (
      !element.hidden && element.getAttribute('aria-hidden') !== 'true'
    ));

    if (focusable.length === 0) {
      event.preventDefault();
      panel.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;
    if (event.shiftKey && (activeElement === first || !panel.contains(activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleMegaMenuKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Escape' || values.open !== true) return;
    event.preventDefault();
    closePropertyOverlay();
  }

  function renderHeader() {
    return (
      <header className="header docs-studio__global-header">
        {values.logo === true && (
          <a
            className="header__logo"
            href={String(values.logoHref || '#home')}
            aria-label={String(values.logoLabel || '') || undefined}
            onClick={preventNavigation}
          >
            The Gallery
          </a>
        )}
        {values.navigation === true && (
          <nav className="header__nav" aria-label={String(values.navigationLabel || '') || undefined}>
            <a className="header__nav-link" href="#collection" aria-current="page" onClick={preventNavigation}>Collection</a>
            <a className="header__nav-link" href="#artists" onClick={preventNavigation}>Artists</a>
            <a className="header__nav-link" href="#journal" onClick={preventNavigation}>Journal</a>
          </nav>
        )}
        <div className="header__actions">
          {values.actions === true && (
            <>
              <button className="btn btn--outline btn--icon-only header__action docs-studio__global-icon-action" type="button" aria-label="Search" onClick={() => setFeedback('Search action selected locally.')}>
                <Search className="btn__icon" aria-hidden="true" />
              </button>
              <button className="btn btn--outline btn--icon-only header__action docs-studio__global-icon-action" type="button" aria-label="Account" onClick={() => setFeedback('Account action selected locally.')}>
                <User className="btn__icon" aria-hidden="true" />
              </button>
              <button
                className="btn btn--outline btn--icon-only header__action docs-studio__global-icon-action"
                type="button"
                aria-label={String(values.cartCount || '') ? `Cart, ${String(values.cartCount)} items` : 'Cart'}
                onClick={() => setFeedback('Cart action selected locally.')}
              >
                <ShoppingBag className="btn__icon" aria-hidden="true" />
                {String(values.cartCount || '') && <span className="header__cart-count" aria-hidden="true">{String(values.cartCount)}</span>}
              </button>
            </>
          )}
          {values.mobileMenuTrigger === true && (
            <button
              className="btn btn--outline btn--icon-only header__action header__hamburger docs-studio__global-header-menu"
              type="button"
              aria-label="Open menu"
              onClick={() => setFeedback('Menu trigger selected locally.')}
            >
              <Menu className="btn__icon" aria-hidden="true" />
            </button>
          )}
        </div>
      </header>
    );
  }

  function renderAnnouncement() {
    if (values.visible !== true) {
      return (
        <button
          ref={announcementTriggerRef}
          className="btn docs-studio__global-reopen"
          type="button"
          onClick={() => {
            updateValues({ visible: true });
            setFeedback('Announcement restored in this target-simulated preview.');
          }}
        >
          Show announcement
        </button>
      );
    }

    return (
      <AnnouncementArtwork
        mode={String(values.mode || 'static') as AnnouncementMode}
        label={String(values.label || '')}
        message={values.message === true}
        countdown={values.countdown === true}
        messages={values.messages === true}
        visible={values.visible === true}
        dismissible={values.dismissible === true}
        dismissLabel={String(values.dismissLabel || '')}
        autoplay={values.autoplay === true}
        autoplayInterval={Number(values.autoplayInterval) || 6000}
        previousLabel={String(values.previousLabel || '')}
        nextLabel={String(values.nextLabel || '')}
        pauseLabel={String(values.pauseLabel || '')}
        playLabel={String(values.playLabel || '')}
        counterTemplate={String(values.counterTemplate || '')}
        statusTemplate={String(values.statusTemplate || '')}
        onNavigate={preventNavigation}
        onDismissRequest={() => {
          updateValues({ visible: false });
          setFeedback('Announcement dismissal requested and reconciled by the preview target.');
          requestAnimationFrame(() => requestAnimationFrame(() => announcementTriggerRef.current?.focus()));
        }}
      />
    );
  }

  function renderFooter() {
    return (
      <footer className="footer docs-studio__global-footer">
        {values.linkGroups === true && (
          <div className="footer__grid">
            {values.brand === true && (
              <div className="footer__brand">
                <h2 className="footer__heading" id={`${id}-footer-brand`}>The Gallery</h2>
                <p className="footer__copy">Objects and stories shaped by independent artists.</p>
              </div>
            )}
            {[
              ['Explore', 'New works', 'Artists'],
              ['Visit', 'Exhibitions', 'Journal'],
              ['Support', 'Shipping', 'Contact'],
            ].map(([heading, first, second]) => (
              <nav className="footer__group" aria-labelledby={`${id}-footer-${heading.toLowerCase()}`} key={heading}>
                <h2 className="footer__heading" id={`${id}-footer-${heading.toLowerCase()}`}>{heading}</h2>
                <ul className="footer__links">
                  <li><a className="footer__link" href={`#${first}`} onClick={preventNavigation}>{first}</a></li>
                  <li><a className="footer__link" href={`#${second}`} onClick={preventNavigation}>{second}</a></li>
                </ul>
              </nav>
            ))}
          </div>
        )}
        {values.metadata === true && (
          <div className="footer__bottom">
            <span className="footer__meta">© 2026 The Gallery</span>
            <span className="footer__meta">Buenos Aires · Worldwide</span>
          </div>
        )}
      </footer>
    );
  }

  function renderMobileItems() {
    return values.items === true ? (
      <ul className="mobile-nav">
        {['Collection', 'Artists', 'Exhibitions', 'Journal'].map((item, index) => (
          <li className="mobile-nav__item" key={item}>
            <a
              className="mobile-nav__link"
              href={`#${item.toLowerCase()}`}
              aria-current={index === 0 ? 'page' : undefined}
              onClick={preventNavigation}
            >
              <span>{item}</span>
              <ChevronRight aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    ) : null;
  }

  function renderMobileMenu() {
    return (
      <div className="docs-studio__global-overlay-surface">
        {!drawerOpen ? (
          <button
            ref={overlayTriggerRef}
            className="btn docs-studio__global-reopen"
            type="button"
            aria-haspopup="dialog"
            aria-controls={`${id}-mobile-menu`}
            aria-expanded="false"
            onClick={openDrawer}
          >
            <Menu className="btn__icon btn__icon--leading" aria-hidden="true" />Open mobile menu
          </button>
        ) : (
          <>
            <div className="drawer-overlay is-open docs-studio__global-drawer-overlay" aria-hidden="false" />
            <aside
              ref={(node) => { overlayPanelRef.current = node; }}
              className="drawer drawer--left is-open docs-studio__global-drawer"
              id={`${id}-mobile-menu`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-mobile-menu-title`}
              tabIndex={-1}
              onKeyDown={handleManagedOverlayKeyDown}
            >
              <header className="drawer__header">
                <h2 className="drawer__title" id={`${id}-mobile-menu-title`}>Menu</h2>
                <button
                  ref={(node) => { overlayInitialFocusRef.current = node; }}
                  className="close-btn drawer__close"
                  type="button"
                  aria-label="Close mobile menu"
                  onClick={closeDrawer}
                >
                  <X className="close-btn__icon" aria-hidden="true" />
                </button>
              </header>
              <nav className="drawer__body" aria-label="Mobile navigation">
                {renderMobileItems()}
              </nav>
            </aside>
          </>
        )}
      </div>
    );
  }

  function renderSearchOverlay() {
    const open = values.open === true;
    const query = String(values.query || '');
    const title = String(values.title || 'Search');
    const dismissLabel = String(values.dismissLabel || 'Close search');
    return (
      <div className="docs-studio__global-overlay-surface">
        {!open ? (
          <button
            ref={overlayTriggerRef}
            className="btn docs-studio__global-reopen"
            type="button"
            aria-haspopup="dialog"
            aria-controls={`${id}-search-overlay`}
            aria-expanded="false"
            onClick={openPropertyOverlay}
          >
            <Search className="btn__icon btn__icon--leading" aria-hidden="true" />Open search
          </button>
        ) : (
          <div
            ref={(node) => { overlayPanelRef.current = node; }}
            className="search-overlay is-open docs-studio__global-search"
            id={`${id}-search-overlay`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-search-title`}
            tabIndex={-1}
            onKeyDown={handleManagedOverlayKeyDown}
          >
            <form className="search-box" role="search" onSubmit={(event) => event.preventDefault()}>
              <div className="search-box__header">
                <h2 className="search-box__title" id={`${id}-search-title`}>{title}</h2>
                <button className="close-btn search-box__close" type="button" aria-label={dismissLabel} onClick={closePropertyOverlay}>
                  <X className="close-btn__icon" aria-hidden="true" />
                </button>
              </div>
              <label className="visually-hidden search-box__label" htmlFor={`${id}-search-input`}>
                {String(values.inputLabel || '')}
              </label>
              <input
                ref={(node) => { overlayInitialFocusRef.current = node; }}
                className="search-box__input"
                id={`${id}-search-input`}
                type="search"
                value={query}
                placeholder={String(values.placeholder || '') || undefined}
                onChange={(event) => updateValues({ query: event.target.value })}
              />
              {values.results === true && (
                <ul className="search-results" aria-label="Preview results">
                  {[
                    ['Moon Jar No. 4', '$180.00'],
                    ['Celadon Study', '$120.00'],
                    ['Soft Geometry', '$210.00'],
                  ].map(([resultTitle, price], index) => (
                    <li className="search-results__item" key={resultTitle}>
                      <a className="search-result" href={`#result-${index}`} onClick={preventNavigation}>
                        <FixtureImage className={`search-result__image docs-studio__global-media docs-studio__global-media--${index + 1}`} alt={`${resultTitle} ceramic work`} />
                        <span className="search-result__content">
                          <span className="search-result__title">{resultTitle}</span>
                          <span className="search-result__price">{price}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
        )}
      </div>
    );
  }

  function renderCartDrawer() {
    const celadonVisible = values.lineItems === true && !removedLines.includes('celadon');
    const incenseVisible = values.lineItems === true && !removedLines.includes('incense');
    const empty = !celadonVisible && !incenseVisible;
    const subtotal = (celadonVisible ? 120 * quantities.celadon : 0)
      + (incenseVisible ? 84 * quantities.incense : 0);

    function removeLine(line: 'celadon' | 'incense', productName: string) {
      setRemovedLines((current) => current.includes(line) ? current : [...current, line]);
      setFeedback(`${productName} removed from the local preview.`);
      requestAnimationFrame(() => {
        const nextAction = overlayPanelRef.current?.querySelector<HTMLElement>('.cart-line__remove');
        (nextAction ?? overlayInitialFocusRef.current)?.focus();
      });
    }

    function updateQuantity(
      line: 'celadon' | 'incense',
      productName: string,
      max: number,
      nextValue: number | null,
    ) {
      const next = Math.min(max, Math.max(1, nextValue ?? 1));
      setQuantities((current) => ({ ...current, [line]: next }));
      setFeedback(`${productName} quantity changed to ${next} in the local preview.`);
    }

    return (
      <div className="docs-studio__global-overlay-surface">
        {!drawerOpen ? (
          <button
            ref={overlayTriggerRef}
            className="btn docs-studio__global-reopen"
            type="button"
            aria-haspopup="dialog"
            aria-controls={`${id}-cart-drawer`}
            aria-expanded="false"
            onClick={openDrawer}
          >
            <ShoppingBag className="btn__icon btn__icon--leading" aria-hidden="true" />Open cart drawer
          </button>
        ) : (
          <>
            <div className="drawer-overlay is-open docs-studio__global-drawer-overlay" aria-hidden="false" />
            <aside
              ref={(node) => { overlayPanelRef.current = node; }}
              className="drawer is-open docs-studio__global-drawer docs-studio__global-cart-drawer"
              id={`${id}-cart-drawer`}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-cart-title`}
              tabIndex={-1}
              onKeyDown={handleManagedOverlayKeyDown}
            >
              <header className="drawer__header">
                <h2 className="drawer__title" id={`${id}-cart-title`}>Your cart</h2>
                <button
                  ref={(node) => { overlayInitialFocusRef.current = node; }}
                  className="close-btn drawer__close"
                  type="button"
                  aria-label="Close cart drawer"
                  onClick={closeDrawer}
                >
                  <X className="close-btn__icon" aria-hidden="true" />
                </button>
              </header>
              <div className="drawer__body">
                {empty ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="cart-lines">
                    {celadonVisible && (
                      <CartLineItemArtwork
                        lineKey="celadon"
                        title="Celadon bowl"
                        href="#celadon-bowl"
                        onNavigate={preventNavigation}
                        details="Medium · Moss glaze"
                        imageSrc={editorialMedia.ceramicsShelves}
                        imageAlt=""
                        imageClassName="docs-studio__global-media docs-studio__global-media--1"
                        currentPrice={`$${(120 * quantities.celadon).toFixed(2)}`}
                        currentPriceLabel="Price"
                        quantity={quantities.celadon}
                        quantityMin={1}
                        quantityMax={8}
                        quantityName="updates[celadon]"
                        onQuantityChange={(next) => updateQuantity('celadon', 'Celadon bowl', 8, next)}
                        removeLabel="Remove"
                        removeAccessibleLabel="Remove Celadon bowl from cart"
                        onRemove={() => removeLine('celadon', 'Celadon bowl')}
                      />
                    )}
                    {incenseVisible && (
                      <CartLineItemArtwork
                        lineKey="incense"
                        title="Incense holder"
                        href="#incense-holder"
                        onNavigate={preventNavigation}
                        details="Small · Cloud glaze"
                        imageSrc={editorialMedia.ceramicsShelves}
                        imageAlt=""
                        imageClassName="docs-studio__global-media docs-studio__global-media--2"
                        currentPrice={`$${(84 * quantities.incense).toFixed(2)}`}
                        currentPriceLabel="Price"
                        quantity={quantities.incense}
                        quantityMin={1}
                        quantityMax={6}
                        quantityName="updates[incense]"
                        onQuantityChange={(next) => updateQuantity('incense', 'Incense holder', 6, next)}
                        removeLabel="Remove"
                        removeAccessibleLabel="Remove Incense holder from cart"
                        onRemove={() => removeLine('incense', 'Incense holder')}
                      />
                    )}
                  </ul>
                )}
              </div>
              {values.summary === true && !empty && (
                <footer className="drawer__footer">
                  <dl className="cart-drawer__summary">
                    <div className="cart-drawer__summary-row"><dt>Subtotal</dt><dd><bdi>${subtotal.toFixed(2)}</bdi></dd></div>
                    <div className="cart-drawer__summary-row cart-drawer__summary-total"><dt>Total</dt><dd><bdi>${subtotal.toFixed(2)}</bdi></dd></div>
                  </dl>
                </footer>
              )}
              <p className="visually-hidden" role="status" aria-live="polite">{feedback}</p>
            </aside>
          </>
        )}
      </div>
    );
  }

  function renderMegaMenu() {
    const open = values.open === true;
    return (
      <div className="docs-studio__global-mega-shell" onKeyDown={handleMegaMenuKeyDown}>
        <div className="docs-studio__global-mega-trigger-row">
          <span>The Gallery</span>
          <button
            ref={overlayTriggerRef}
            className="btn btn--outline btn--sm"
            type="button"
            aria-expanded={open}
            aria-controls={`${id}-mega-menu`}
            onClick={open ? closePropertyOverlay : openPropertyOverlay}
          >
            {open ? 'Close collections' : 'Open collections'}
          </button>
        </div>
        <nav
          ref={(node) => { megaMenuRef.current = node; }}
          className={`mega-menu docs-studio__global-mega${open ? ' is-open' : ''}`}
          id={`${id}-mega-menu`}
          aria-label={String(values.label || '')}
          aria-hidden={!open}
          inert={!open}
        >
          <div className="docs-studio__global-mega-close-row">
            <span>Explore</span>
            <button className="close-btn docs-studio__global-overlay-close" type="button" aria-label="Close collections menu" onClick={closePropertyOverlay}>
              <X className="close-btn__icon" aria-hidden="true" />
            </button>
          </div>
          <div className="mega-menu__inner">
            {values.columns === true && (
              <>
                {[
                  ['Collections', 'New works', 'Vessels', 'Sculpture'],
                  ['Artists', 'Mara Vidal', 'Noa Kim', 'Lucía Serra'],
                ].map(([heading, ...links]) => (
                  <section className="mega-menu__column" aria-labelledby={`${id}-mega-${heading.toLowerCase()}`} key={heading}>
                    <h2 className="mega-menu__heading" id={`${id}-mega-${heading.toLowerCase()}`}>{heading}</h2>
                    <ul className="mega-menu__list">
                      {links.map((link, index) => (
                        <li className="mega-menu__list-item" key={link}>
                          <a className="mega-menu__link" href={`#${link}`} aria-current={heading === 'Collections' && index === 0 ? 'page' : undefined} onClick={preventNavigation}>{link}</a>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </>
            )}
            {values.promo === true && (
              <a className="mega-menu__promo docs-studio__global-mega-promo" href="#studio-visit" onClick={preventNavigation}>
                <FixtureImage className="docs-studio__global-media docs-studio__global-media--3" alt="" />
                <span className="mega-menu__promo-content">
                  <span className="mega-menu__promo-title">Summer studio</span>
                  <span className="mega-menu__promo-link">Enter exhibition</span>
                </span>
              </a>
            )}
            {values.featured === true && (
              <ul className="mega-menu__featured" aria-label="Featured destinations">
                {['Quiet forms', 'New rituals'].map((name, index) => (
                  <li className="mega-menu__featured-entry" key={name}>
                    <a className="mega-menu__featured-item" href={`#featured-${index}`} onClick={preventNavigation}>
                      <FixtureImage className={`mega-menu__featured-img docs-studio__global-media docs-studio__global-media--${index + 1}`} alt="" />
                      <span className="mega-menu__featured-name">{name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }

  function renderBottomNav() {
    return (
      <div className="docs-studio__global-phone-surface">
        <div className="docs-studio__global-phone-content">
          <span>Collection view</span>
          <strong>Works for daily rituals</strong>
        </div>
        <nav className="bottom-nav docs-studio__global-bottom-nav" aria-label={String(values.label || '')}>
          {values.items === true && (
            <ul className="bottom-nav__list">
              {[
                { label: 'Home', Icon: Home, current: true },
                { label: 'Browse', Icon: Grid2X2 },
                { label: 'Saved', Icon: Heart },
                { label: 'Orders', Icon: Package },
                { label: 'Cart', Icon: ShoppingBag, badge: '2' },
              ].map(({ label, Icon, current, badge }) => (
                <li className="bottom-nav__entry" key={label}>
                  <a
                    className="bottom-nav__item"
                    href={`#${label.toLowerCase()}`}
                    aria-current={current ? 'page' : undefined}
                    aria-label={badge ? `${label}, ${badge} items` : undefined}
                    onClick={preventNavigation}
                  >
                    <Icon className="bottom-nav__icon" aria-hidden="true" />
                    <span className="bottom-nav__label">{label}</span>
                    {badge && <span className="bottom-nav__badge" aria-hidden="true">{badge}</span>}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    );
  }

  function renderPreview() {
    if (contract.slug === 'header') return renderHeader();
    if (contract.slug === 'announcement-bar' || contract.slug === 'announcement-extended') return renderAnnouncement();
    if (contract.slug === 'footer') return renderFooter();
    if (contract.slug === 'mobile-menu') return renderMobileMenu();
    if (contract.slug === 'search-overlay') return renderSearchOverlay();
    if (contract.slug === 'cart-drawer') return renderCartDrawer();
    if (contract.slug === 'mega-menu') return renderMegaMenu();
    return renderBottomNav();
  }

  function currentState() {
    if (contract.slug === 'announcement-bar' || contract.slug === 'announcement-extended') {
      return values.visible !== true ? 'closed' : String(values.mode || 'static');
    }
    if (contract.slug === 'search-overlay') return values.open === true ? 'open' : 'closed';
    if (contract.slug === 'mega-menu') return values.open === true ? 'openClass' : 'closed';
    return 'default';
  }

  const overlayStage = ['mobile-menu', 'search-overlay', 'cart-drawer', 'mega-menu'].includes(contract.slug);

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue={currentState()}
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={updateValues}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section
          className={`docs-studio__stage docs-studio__stage--global docs-studio__stage--global-${contract.slug}${overlayStage ? ' docs-studio__stage--overlay' : ''}`}
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__global-stage-inner docs-studio__global-stage-inner--${contract.slug}`}>
            {renderPreview()}
            {feedback && contract.slug !== 'cart-drawer' && <p className="docs-studio__global-feedback" role="status" aria-live="polite">{feedback}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
