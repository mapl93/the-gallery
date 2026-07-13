import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import {
  ChevronRight,
  Grid2X2,
  Heart,
  Home,
  Menu,
  Minus,
  Package,
  Plus,
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

interface GlobalStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  header: {
    logo: true,
    logoHref: '#home',
    logoLabel: 'The Gallery home',
    navigationLabel: 'Primary navigation',
    navigation: true,
    actions: true,
    cartCount: '2',
    mobileMenuTrigger: true,
  },
  'announcement-bar': {
    label: 'Gallery announcement',
    message: true,
  },
  footer: {
    linkGroups: true,
    metadata: true,
  },
  'mobile-menu': {
    items: true,
  },
  'search-overlay': {
    open: true,
    inputLabel: 'Search the gallery',
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
  return <img className={className} src={transparentImage} alt={alt} />;
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
  const [quantity, setQuantity] = useState(1);
  const [removed, setRemoved] = useState(false);
  const [feedback, setFeedback] = useState('');

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
    setQuantity(1);
    setRemoved(false);
    setFeedback('');
  }, [initialValues]);

  const tokenValues = { ...baseTokenValues, ...tokenOverrides };

  function updateValues(next: StudioPropertyValues) {
    setValues((current) => ({ ...current, ...next }));
  }

  function reset() {
    setValues({ ...initialValues });
    setTokenOverrides({});
    setDrawerOpen(true);
    setQuantity(1);
    setRemoved(false);
    setFeedback('');
  }

  function closePropertyOverlay() {
    updateValues({ open: false });
    setFeedback(`${contract.name} closed in this local preview.`);
  }

  function openPropertyOverlay() {
    updateValues({ open: true });
    setFeedback(`${contract.name} opened in this local preview.`);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setFeedback(`${contract.name} closed in this local preview.`);
  }

  function openDrawer() {
    setDrawerOpen(true);
    setFeedback(`${contract.name} opened in this local preview.`);
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
              <button className="docs-studio__global-icon-action" type="button" aria-label="Search" onClick={() => setFeedback('Search action selected locally.')}>
                <Search aria-hidden="true" />
              </button>
              <button className="docs-studio__global-icon-action" type="button" aria-label="Account" onClick={() => setFeedback('Account action selected locally.')}>
                <User aria-hidden="true" />
              </button>
              <button className="docs-studio__global-icon-action" type="button" aria-label="Cart" onClick={() => setFeedback('Cart action selected locally.')}>
                <ShoppingBag aria-hidden="true" />
                {String(values.cartCount || '') && <span className="header__cart-count">{String(values.cartCount)}</span>}
              </button>
            </>
          )}
          {values.mobileMenuTrigger === true && (
            <button
              className="btn btn--outline btn--icon-only header__hamburger docs-studio__global-header-menu"
              type="button"
              aria-label="Open menu"
              aria-expanded="false"
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
    return (
      <section className="announcement" aria-label={String(values.label || '') || undefined}>
        {values.message === true && (
          <span>Complimentary shipping on selected works. <a href="#shipping" onClick={preventNavigation}>View details</a></span>
        )}
      </section>
    );
  }

  function renderFooter() {
    return (
      <footer className="footer docs-studio__global-footer">
        {values.linkGroups === true && (
          <div className="footer__grid">
            <section>
              <h2 className="footer__heading">The Gallery</h2>
              <p className="docs-studio__global-footer-copy">Objects and stories shaped by independent artists.</p>
            </section>
            {[
              ['Explore', 'New works', 'Artists'],
              ['Visit', 'Exhibitions', 'Journal'],
              ['Support', 'Shipping', 'Contact'],
            ].map(([heading, first, second]) => (
              <nav aria-label={heading} key={heading}>
                <h2 className="footer__heading">{heading}</h2>
                <ul className="footer__links">
                  <li><a href={`#${first}`} onClick={preventNavigation}>{first}</a></li>
                  <li><a href={`#${second}`} onClick={preventNavigation}>{second}</a></li>
                </ul>
              </nav>
            ))}
          </div>
        )}
        {values.metadata === true && (
          <div className="footer__bottom">
            <span>© 2026 The Gallery</span>
            <span>Buenos Aires · Worldwide</span>
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
        {!drawerOpen && (
          <button className="btn docs-studio__global-reopen" type="button" onClick={openDrawer}>
            <Menu className="btn__icon btn__icon--leading" aria-hidden="true" />Open mobile menu
          </button>
        )}
        <div className={`drawer-overlay docs-studio__global-drawer-overlay${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen} />
        <aside className={`drawer drawer--left docs-studio__global-drawer${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen} aria-labelledby={`${id}-mobile-menu-title`}>
          <header className="drawer__header">
            <h2 id={`${id}-mobile-menu-title`}>Menu</h2>
            <button className="drawer__close" type="button" aria-label="Close mobile menu" onClick={closeDrawer}>
              <X aria-hidden="true" />
            </button>
          </header>
          <nav className="drawer__body" aria-label="Mobile navigation">
            {renderMobileItems()}
          </nav>
        </aside>
      </div>
    );
  }

  function renderSearchOverlay() {
    const open = values.open === true;
    const query = String(values.query || '');
    return (
      <div className="docs-studio__global-overlay-surface">
        {!open && (
          <button className="btn docs-studio__global-reopen" type="button" onClick={openPropertyOverlay}>
            <Search className="btn__icon btn__icon--leading" aria-hidden="true" />Open search
          </button>
        )}
        <section className={`search-overlay docs-studio__global-search${open ? ' is-open' : ''}`} aria-hidden={!open}>
          <div className="search-box">
            <div className="docs-studio__global-overlay-heading">
              <h2>Search</h2>
              <button className="docs-studio__global-overlay-close" type="button" aria-label="Close search" onClick={closePropertyOverlay}>
                <X aria-hidden="true" />
              </button>
            </div>
            <input
              className="search-box__input"
              type="search"
              aria-label={String(values.inputLabel || '')}
              value={query}
              placeholder={String(values.placeholder || '') || undefined}
              onChange={(event) => updateValues({ query: event.target.value })}
            />
            {values.results === true && (
              <div className="search-results" aria-label="Preview results">
                {[
                  ['Moon Jar No. 4', '$180.00'],
                  ['Celadon Study', '$120.00'],
                  ['Soft Geometry', '$210.00'],
                ].map(([title, price], index) => (
                  <a className="search-result" href={`#result-${index}`} onClick={preventNavigation} key={title}>
                    <FixtureImage className={`search-result__image docs-studio__global-media docs-studio__global-media--${index + 1}`} alt={`${title} ceramic work`} />
                    <span>
                      <span className="search-result__title">{title}</span>
                      <span className="search-result__price">{price}</span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  function renderQuantity() {
    return (
      <div className="qty" role="group" aria-label="Quantity">
        <button className="qty__btn qty__btn--decrement" type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((current) => Math.max(1, current - 1))}>
          <Minus className="qty__icon" aria-hidden="true" />
        </button>
        <input className="qty__input" type="number" min={1} value={quantity} aria-label="Quantity" onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} />
        <button className="qty__btn qty__btn--increment" type="button" aria-label="Increase quantity" onClick={() => setQuantity((current) => current + 1)}>
          <Plus className="qty__icon" aria-hidden="true" />
        </button>
      </div>
    );
  }

  function renderCartDrawer() {
    const subtotal = 120 * quantity + (removed ? 0 : 84);
    return (
      <div className="docs-studio__global-overlay-surface">
        {!drawerOpen && (
          <button className="btn docs-studio__global-reopen" type="button" onClick={openDrawer}>
            <ShoppingBag className="btn__icon btn__icon--leading" aria-hidden="true" />Open cart drawer
          </button>
        )}
        <div className={`drawer-overlay docs-studio__global-drawer-overlay${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen} />
        <aside className={`drawer docs-studio__global-drawer docs-studio__global-cart-drawer${drawerOpen ? ' is-open' : ''}`} aria-hidden={!drawerOpen} aria-labelledby={`${id}-cart-title`}>
          <header className="drawer__header">
            <h2 id={`${id}-cart-title`}>Your cart</h2>
            <button className="drawer__close" type="button" aria-label="Close cart drawer" onClick={closeDrawer}>
              <X aria-hidden="true" />
            </button>
          </header>
          <div className="drawer__body">
            {values.lineItems === true && (
              <div aria-label="Cart items">
                <article className="cart-item">
                  <FixtureImage className="cart-item__image docs-studio__global-media docs-studio__global-media--1" alt="Celadon stoneware bowl" />
                  <div className="cart-item__details">
                    <a className="cart-item__title" href="#celadon-bowl" onClick={preventNavigation}>Celadon bowl</a>
                    <div className="cart-item__variant">Medium · Moss glaze</div>
                    <span className="price"><span className="price__current">$120.00</span></span>
                    <div className="cart-item__actions">
                      {renderQuantity()}
                    </div>
                  </div>
                </article>
                {!removed && (
                  <article className="cart-item">
                    <FixtureImage className="cart-item__image docs-studio__global-media docs-studio__global-media--2" alt="Porcelain incense holder" />
                    <div className="cart-item__details">
                      <a className="cart-item__title" href="#incense-holder" onClick={preventNavigation}>Incense holder</a>
                      <div className="cart-item__variant">Small · Cloud glaze</div>
                      <span className="price"><span className="price__current">$84.00</span></span>
                      <div className="cart-item__actions">
                        <button className="cart-item__remove" type="button" onClick={() => {
                          setRemoved(true);
                          setFeedback('Incense holder removed from the local preview.');
                        }}>Remove</button>
                      </div>
                    </div>
                  </article>
                )}
              </div>
            )}
          </div>
          {values.summary === true && (
            <footer className="drawer__footer">
              <div className="cart-summary">
                <div className="cart-summary__row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="cart-summary__row cart-summary__total"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
              </div>
            </footer>
          )}
        </aside>
      </div>
    );
  }

  function renderMegaMenu() {
    const open = values.open === true;
    return (
      <div className="docs-studio__global-mega-shell">
        <div className="docs-studio__global-mega-trigger-row">
          <span>The Gallery</span>
          {!open && <button className="btn btn--outline btn--sm" type="button" aria-expanded="false" onClick={openPropertyOverlay}>Open collections</button>}
        </div>
        <nav className={`mega-menu docs-studio__global-mega${open ? ' is-open' : ''}`} aria-label={String(values.label || '')} aria-hidden={!open}>
          <div className="docs-studio__global-mega-close-row">
            <span>Explore</span>
            <button className="docs-studio__global-overlay-close" type="button" aria-label="Close collections menu" onClick={closePropertyOverlay}>
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="mega-menu__inner">
            {values.columns === true && (
              <>
                {[
                  ['Collections', 'New works', 'Vessels', 'Sculpture'],
                  ['Artists', 'Mara Vidal', 'Noa Kim', 'Lucía Serra'],
                ].map(([heading, ...links]) => (
                  <div className="mega-menu__column" key={heading}>
                    <h2 className="mega-menu__heading">{heading}</h2>
                    {links.map((link, index) => <a className="mega-menu__link" href={`#${link}`} aria-current={heading === 'Collections' && index === 0 ? 'page' : undefined} onClick={preventNavigation} key={link}>{link}</a>)}
                  </div>
                ))}
              </>
            )}
            {values.promo === true && (
              <a className="mega-menu__promo docs-studio__global-mega-promo" href="#studio-visit" aria-label="Visit the summer studio exhibition" onClick={preventNavigation}>
                <FixtureImage className="docs-studio__global-media docs-studio__global-media--3" alt="Summer studio exhibition installation" />
                <span className="mega-menu__promo-content">
                  <span className="mega-menu__promo-title">Summer studio</span>
                  <span className="mega-menu__promo-link">Enter exhibition</span>
                </span>
              </a>
            )}
            {values.featured === true && (
              <div className="mega-menu__featured" aria-label="Featured destinations">
                {['Quiet forms', 'New rituals'].map((name, index) => (
                  <a className="mega-menu__featured-item" href={`#featured-${index}`} onClick={preventNavigation} key={name}>
                    <FixtureImage className={`mega-menu__featured-img docs-studio__global-media docs-studio__global-media--${index + 1}`} alt={`${name} collection`} />
                    <span className="mega-menu__featured-name">{name}</span>
                  </a>
                ))}
              </div>
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
          {values.items === true && [
            { label: 'Home', Icon: Home, current: true },
            { label: 'Browse', Icon: Grid2X2 },
            { label: 'Saved', Icon: Heart },
            { label: 'Orders', Icon: Package },
            { label: 'Cart', Icon: ShoppingBag, badge: '2' },
          ].map(({ label, Icon, current, badge }) => (
            <a className="bottom-nav__item" href={`#${label.toLowerCase()}`} aria-current={current ? 'page' : undefined} onClick={preventNavigation} key={label}>
              <Icon className="bottom-nav__icon" aria-hidden="true" />
              <span className="bottom-nav__label">{label}</span>
              {badge && <span className="bottom-nav__badge" aria-label={`${badge} items`}>{badge}</span>}
            </a>
          ))}
        </nav>
      </div>
    );
  }

  function renderPreview() {
    if (contract.slug === 'header') return renderHeader();
    if (contract.slug === 'announcement-bar') return renderAnnouncement();
    if (contract.slug === 'footer') return renderFooter();
    if (contract.slug === 'mobile-menu') return renderMobileMenu();
    if (contract.slug === 'search-overlay') return renderSearchOverlay();
    if (contract.slug === 'cart-drawer') return renderCartDrawer();
    if (contract.slug === 'mega-menu') return renderMegaMenu();
    return renderBottomNav();
  }

  function currentState() {
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
            {feedback && <p className="docs-studio__global-feedback" role="status" aria-live="polite">{feedback}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
