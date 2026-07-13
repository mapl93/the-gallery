import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface StorytellingStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'artist-profile': {
    portrait: true,
    label: 'Artist profile',
    name: 'Marina Paz',
    location: 'Mendoza, Argentina',
    biography: true,
    philosophy: 'I look for the point where useful objects begin to hold memory.',
    actions: true,
  },
  'process-timeline': {
    title: 'From earth to kiln',
    steps: true,
  },
  certificate: {
    label: 'Certificate of authenticity',
    title: 'Moon Jar No. 07',
    artist: 'Marina Paz',
    details: true,
    signature: true,
    verification: true,
  },
  'collection-story': {
    reversed: false,
    media: true,
    label: 'Collection story',
    title: 'Forms shaped by the foothills',
    body: true,
    inspiration: 'Each contour begins with the horizon and ends in the hand.',
    actions: true,
  },
  'masonry-gallery': { items: true },
  'artist-index': {
    title: 'Artists in residence',
    introduction: 'Meet the makers exploring clay, fiber, pigment, and form across the current programme.',
    filters: true,
    results: true,
  },
  'artist-card': {
    portrait: true,
    badge: 'New work',
    name: 'Marina Paz',
    medium: 'Ceramics and mixed clay',
    location: 'Mendoza, Argentina',
    pieceCount: '12 works',
  },
  'exhibition-page': {
    heroMedia: true,
    label: 'Current exhibition',
    title: 'A Measure of Quiet',
    dates: 'July 18 - September 6, 2026',
    location: 'The Gallery, South Room',
    description: true,
    details: true,
    works: true,
    artists: true,
  },
  'artist-statement': {
    portrait: true,
    eyebrow: 'Artist statement',
    name: 'Marina Paz',
    quote: 'A vessel becomes complete when it leaves room for daily life.',
    body: true,
    signature: true,
  },
};

const artistFixtures = [
  { name: 'Marina Paz', medium: 'Ceramics', location: 'Mendoza, Argentina', count: '12 works', tone: 1 },
  { name: 'Noa Kim', medium: 'Fiber and natural dye', location: 'Seoul, South Korea', count: '8 works', tone: 2 },
  { name: 'Iris Bell', medium: 'Painting', location: 'Glasgow, Scotland', count: '15 works', tone: 3 },
];

const galleryFixtures = [
  { title: 'Moon Jar No. 07', price: '$680', alt: 'Rounded white stoneware vessel with an irregular hand-finished rim', tone: 4 },
  { title: 'Terrace Study', price: '$420', alt: 'Low rust-colored ceramic bowl with a carved linear surface', tone: 5 },
  { title: 'Still Water Pair', price: '$540', alt: 'Pair of pale blue glazed cups arranged at different heights', tone: 6 },
  { title: 'Field Notes', price: '$760', alt: 'Tall charcoal vessel with a softly faceted profile', tone: 2 },
  { title: 'Morning Fold', price: '$390', alt: 'Folded cream textile sculpture resting on a low plinth', tone: 3 },
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

function StoryMedia({
  alt,
  className = '',
  tone = 1,
}: {
  alt: string;
  className?: string;
  tone?: number;
}) {
  return (
    <img
      src={transparentImage}
      alt={alt}
      className={`${className} docs-studio__story-media docs-studio__story-media--${tone}`}
    />
  );
}

function ArtistCardFixture({
  artist,
  showPortrait = true,
  badge = '',
}: {
  artist: typeof artistFixtures[number];
  showPortrait?: boolean;
  badge?: string;
}) {
  return (
    <article className="artist-card docs-studio__artist-card">
      {showPortrait && (
        <div className="artist-card__portrait">
          <StoryMedia
            tone={artist.tone}
            alt={`Portrait of ${artist.name} in their studio`}
          />
          {badge && <span className="artist-card__badge">{badge}</span>}
        </div>
      )}
      <h3 className="artist-card__name">{artist.name}</h3>
      <p className="artist-card__medium">{artist.medium}</p>
      <p className="artist-card__location">{artist.location}</p>
      <p className="artist-card__piece-count">{artist.count}</p>
    </article>
  );
}

export default function StorytellingStudio({ contract, definition }: StorytellingStudioProps) {
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
  const [fixtureArtistFilter, setFixtureArtistFilter] = useState('All');

  useEffect(() => {
    const read = () => {
      const computed = getComputedStyle(document.documentElement);
      setBaseTokenValues(Object.fromEntries(studioTokens.map((token) => [
        token,
        computed.getPropertyValue(token).trim(),
      ])));
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
    setFixtureArtistFilter('All');
  }

  function renderArtistProfile() {
    return (
      <section className="artist-profile docs-studio__artist-profile" aria-labelledby="storytelling-artist-profile-name">
        {values.portrait === true && (
          <div className="artist-profile__portrait">
            <StoryMedia tone={1} alt="Marina Paz standing beside shelves of unfinished ceramic vessels" />
          </div>
        )}
        <div className="artist-profile__content">
          {String(values.label || '') && <p className="artist-profile__label">{String(values.label)}</p>}
          <h2 className="artist-profile__name" id="storytelling-artist-profile-name">{String(values.name)}</h2>
          {String(values.location || '') && <p className="artist-profile__location">{String(values.location)}</p>}
          {values.biography === true && (
            <div className="artist-profile__bio">
              <p>Marina works between wheel-thrown stoneware and hand-built forms, following the subtle shifts that arrive through repetition.</p>
              <p>Her practice is grounded in local minerals, quiet utility, and the traces left by making.</p>
            </div>
          )}
          {String(values.philosophy || '') && <blockquote className="artist-profile__philosophy">{String(values.philosophy)}</blockquote>}
          {values.actions === true && (
            <nav className="artist-profile__actions" aria-label="Artist profile actions">
              <a className="btn btn--primary" href="#artist-works" onClick={(event) => event.preventDefault()}>View works</a>
              <a className="btn btn--outline" href="#artist-journal" onClick={(event) => event.preventDefault()}>Studio journal</a>
            </nav>
          )}
        </div>
      </section>
    );
  }

  function renderProcessTimeline() {
    const steps = [
      { title: 'Gather', description: 'Local clays and minerals are selected for body and glaze.', alt: 'Raw clay and mineral samples arranged on a wooden worktable', tone: 5 },
      { title: 'Form', description: 'Each piece is thrown slowly, then refined after resting overnight.', alt: 'Hands shaping a rounded clay vessel on a pottery wheel', tone: 1 },
      { title: 'Fire', description: 'A measured firing reveals the final surface and subtle tonal shifts.', alt: 'Stoneware pieces cooling on shelves inside an open kiln', tone: 2 },
    ];
    return (
      <section className="process-timeline docs-studio__process-timeline" aria-labelledby="storytelling-process-title">
        <h2 className="process-timeline__title" id="storytelling-process-title">{String(values.title)}</h2>
        {values.steps === true && (
          <ol className="process-timeline__track docs-studio__process-track" tabIndex={0} aria-label="Making process steps">
            {steps.map((step, index) => (
              <li className="process-step" key={step.title}>
                <span className="process-step__number" aria-hidden="true">{index + 1}</span>
                <div className="process-step__image"><StoryMedia tone={step.tone} alt={step.alt} /></div>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__description">{step.description}</p>
              </li>
            ))}
          </ol>
        )}
      </section>
    );
  }

  function renderCertificate() {
    const details = [
      ['Medium', 'Stoneware and ash glaze'],
      ['Dimensions', '28 x 24 x 24 cm'],
      ['Edition', 'Unique work'],
      ['Record', 'TG-MP-2026-007'],
    ];
    return (
      <article className="coa docs-studio__certificate" aria-labelledby="storytelling-certificate-title">
        {String(values.label || '') && <p className="coa__header">{String(values.label)}</p>}
        <h2 className="coa__title" id="storytelling-certificate-title">{String(values.title)}</h2>
        {String(values.artist || '') && <p className="coa__artist">{String(values.artist)}</p>}
        <div className="coa__divider" aria-hidden="true" />
        {values.details === true && (
          <dl className="coa__details">
            {details.map(([label, value]) => (
              <div key={label}>
                <dt className="coa__detail-label">{label}</dt>
                <dd className="coa__detail-value">{value}</dd>
              </div>
            ))}
          </dl>
        )}
        {values.signature === true && <p className="coa__signature" aria-label="Signed by Marina Paz">Marina Paz</p>}
        {values.verification === true && (
          <a className="coa__verify docs-studio__certificate-verify" href="#certificate-record" onClick={(event) => event.preventDefault()}>
            Verify certificate record TG-MP-2026-007
          </a>
        )}
      </article>
    );
  }

  function renderCollectionStory() {
    return (
      <section className={`collection-story docs-studio__collection-story${values.reversed === true ? ' collection-story--reversed' : ''}`} aria-labelledby="storytelling-collection-title">
        {values.media === true && (
          <div className="collection-story__media">
            <StoryMedia tone={6} alt="Pale ceramic vessels arranged against a sunlit foothill landscape" />
          </div>
        )}
        <div className="collection-story__content">
          {String(values.label || '') && <p className="collection-story__label">{String(values.label)}</p>}
          <h2 className="collection-story__title" id="storytelling-collection-title">{String(values.title)}</h2>
          {values.body === true && (
            <div className="collection-story__text">
              <p>This collection follows the broad line of the Andes through low bowls, generous jars, and surfaces that gather light.</p>
              <p>Every piece is made for use, carrying small variations as evidence of its passage through the studio.</p>
            </div>
          )}
          {String(values.inspiration || '') && <blockquote className="collection-story__inspiration">{String(values.inspiration)}</blockquote>}
          {values.actions === true && (
            <nav className="collection-story__actions" aria-label="Collection story actions">
              <a className="btn btn--primary" href="#collection-works" onClick={(event) => event.preventDefault()}>Explore works</a>
            </nav>
          )}
        </div>
      </section>
    );
  }

  function renderMasonryGallery() {
    return (
      <ul className="masonry-gallery docs-studio__masonry-gallery" aria-label="Artwork gallery">
        {values.items === true && galleryFixtures.map((piece) => (
          <li className="masonry-gallery__item" key={piece.title}>
            <figure className="gallery-piece docs-studio__gallery-piece">
              <StoryMedia tone={piece.tone} alt={piece.alt} />
              <figcaption className="gallery-piece__overlay">
                <span className="gallery-piece__title">{piece.title}</span>
                <span className="gallery-piece__price">{piece.price}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    );
  }

  function renderArtistIndex() {
    const filterLabels = ['All', 'Ceramics', 'Fiber', 'Painting'];
    return (
      <section className="artist-index docs-studio__artist-index" aria-labelledby="storytelling-artist-index-title">
        <header className="artist-index__header">
          <h2 className="artist-index__heading" id="storytelling-artist-index-title">{String(values.title)}</h2>
          {String(values.introduction || '') && <p className="artist-index__intro">{String(values.introduction)}</p>}
        </header>
        {values.filters === true && (
          <div className="artist-index__filters" role="group" aria-label="Artist medium preview filter">
            {filterLabels.map((label) => (
              <button
                className={`artist-index__filter-btn${fixtureArtistFilter === label ? ' is-active' : ''}`}
                type="button"
                aria-pressed={fixtureArtistFilter === label}
                onClick={() => setFixtureArtistFilter(label)}
                key={label}
              >
                {label}
              </button>
            ))}
          </div>
        )}
        {values.results === true && (
          <div className="artist-index__grid">
            {artistFixtures.map((artist) => <ArtistCardFixture artist={artist} key={artist.name} />)}
          </div>
        )}
      </section>
    );
  }

  function renderArtistCard() {
    const artist = {
      ...artistFixtures[0],
      name: String(values.name),
      medium: String(values.medium || ''),
      location: String(values.location || ''),
      count: String(values.pieceCount || ''),
    };
    return (
      <ArtistCardFixture
        artist={artist}
        showPortrait={values.portrait === true}
        badge={String(values.badge || '')}
      />
    );
  }

  function renderExhibitionPage() {
    const details = [
      ['Opening', 'July 18, 6-8 PM'],
      ['Hours', 'Tuesday-Saturday, 11 AM-6 PM'],
      ['Admission', 'Free'],
    ];
    return (
      <article className="exhibition-page docs-studio__exhibition-page" aria-labelledby="storytelling-exhibition-title">
        <header className="exhibition-hero docs-studio__exhibition-hero">
          {values.heroMedia === true && <div className="exhibition-hero__media"><StoryMedia tone={5} alt="Sculptural ceramic works displayed on low plinths in a bright gallery room" /></div>}
          {values.heroMedia === true && <div className="exhibition-hero__overlay" aria-hidden="true" />}
          <div className="exhibition-hero__content">
            {String(values.label || '') && <p className="exhibition-hero__label">{String(values.label)}</p>}
            <h2 className="exhibition-hero__title" id="storytelling-exhibition-title">{String(values.title)}</h2>
            {String(values.dates || '') && <p className="exhibition-hero__dates">{String(values.dates)}</p>}
            {String(values.location || '') && <p className="exhibition-hero__location">{String(values.location)}</p>}
          </div>
        </header>
        {(values.description === true || values.details === true) && (
          <section className="exhibition-info" aria-label="Exhibition information">
            {values.description === true && (
              <div className="exhibition-info__description">
                <p>A Measure of Quiet gathers artists whose work rewards sustained attention. Clay, fiber, and pigment become records of pressure, pause, and repetition.</p>
                <p>The exhibition asks how an object can hold stillness without becoming silent.</p>
              </div>
            )}
            {values.details === true && (
              <dl className="exhibition-info__sidebar">
                {details.map(([label, value]) => (
                  <div className="exhibition-info__detail" key={label}>
                    <dt className="exhibition-info__detail-label">{label}</dt>
                    <dd className="exhibition-info__detail-value">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        )}
        {values.works === true && (
          <section className="exhibition-works" aria-labelledby="storytelling-exhibition-works">
            <h3 className="exhibition-works__heading" id="storytelling-exhibition-works">Featured works</h3>
            <div className="exhibition-works__grid">
              {galleryFixtures.slice(0, 3).map((piece) => (
                <figure className="docs-studio__exhibition-work" key={piece.title}>
                  <StoryMedia tone={piece.tone} alt={piece.alt} />
                  <figcaption><strong>{piece.title}</strong><span>{piece.price}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
        {values.artists === true && (
          <section className="exhibition-artists" aria-labelledby="storytelling-exhibition-artists">
            <h3 className="exhibition-artists__heading" id="storytelling-exhibition-artists">Participating artists</h3>
            <ul className="exhibition-artists__list docs-studio__exhibition-artist-list">
              {artistFixtures.map((artist) => (
                <li className="exhibition-artists__item" key={artist.name}>
                  <StoryMedia className="exhibition-artists__avatar" tone={artist.tone} alt={`Portrait of ${artist.name}`} />
                  <span><span className="exhibition-artists__name">{artist.name}</span><span className="exhibition-artists__role">{artist.medium}</span></span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    );
  }

  function renderArtistStatement() {
    return (
      <section className="artist-statement docs-studio__artist-statement" aria-labelledby="storytelling-artist-statement-name">
        <div className="artist-statement__layout">
          {values.portrait === true && (
            <div className="artist-statement__portrait">
              <StoryMedia tone={1} alt="Marina Paz seated at a worktable beside a group of unfired vessels" />
            </div>
          )}
          <div className="artist-statement__content">
            {String(values.eyebrow || '') && <p className="artist-statement__eyebrow">{String(values.eyebrow)}</p>}
            <h2 className="artist-statement__name" id="storytelling-artist-statement-name">{String(values.name)}</h2>
            {String(values.quote || '') && <blockquote className="artist-statement__quote">{String(values.quote)}</blockquote>}
            {values.body === true && (
              <div className="artist-statement__body">
                <p>I make objects at the scale of ordinary rituals: pouring, gathering, holding, and sharing. Their forms begin with use, then open toward memory.</p>
                <p>Variation is not corrected away. A softened rim or a change in glaze records the decisions that made the work singular.</p>
              </div>
            )}
            {values.signature === true && <p className="artist-statement__signature docs-studio__story-signature" aria-label="Signed by Marina Paz">Marina Paz</p>}
          </div>
        </div>
      </section>
    );
  }

  function renderPreview() {
    if (contract.slug === 'artist-profile') return renderArtistProfile();
    if (contract.slug === 'process-timeline') return renderProcessTimeline();
    if (contract.slug === 'certificate') return renderCertificate();
    if (contract.slug === 'collection-story') return renderCollectionStory();
    if (contract.slug === 'masonry-gallery') return renderMasonryGallery();
    if (contract.slug === 'artist-index') return renderArtistIndex();
    if (contract.slug === 'artist-card') return renderArtistCard();
    if (contract.slug === 'exhibition-page') return renderExhibitionPage();
    return renderArtistStatement();
  }

  return (
    <div className="docs-studio">
      <h1 className="docs-studio__title">{contract.name}</h1>
      <div className="docs-studio__workspace">
        <StudioInspector
          definition={definition}
          contract={contract}
          values={values}
          slotIconValues={emptySlotIcons}
          stateValue="default"
          tokenValues={tokenValues}
          activeTokens={activeTokens}
          onPropertiesChange={(next) => setValues((current) => ({ ...current, ...next }))}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section
          className="docs-studio__stage docs-studio__stage--storytelling"
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__storytelling-stage-inner docs-studio__storytelling-stage-inner--${contract.slug}`}>
            {renderPreview()}
          </div>
        </section>
      </div>
    </div>
  );
}
