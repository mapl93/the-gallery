import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
} from 'react';
import {
  Copy,
  Link2,
  Mail,
  MessageCircle,
  Reply,
  ThumbsUp,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';

interface BlogStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const transparentImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'/%3E";
const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'article-card': {
    variant: 'standard',
    title: 'Inside the quiet rhythm of a working studio',
    href: '#studio-rhythm',
    media: true,
    imageAlt: 'Stoneware forms arranged on a studio workbench',
    category: 'Studio notes',
    metadata: true,
    excerpt: 'A morning shaped by clay, repetition, and the small decisions that give each vessel its character.',
    author: true,
  },
  'article-hero': {
    variant: 'full',
    backgroundMedia: true,
    splitMedia: true,
    category: 'Process journal',
    title: 'What the kiln teaches us about patience',
    metadata: true,
  },
  'article-body': { content: true, dropCap: false },
  'reading-progress': { indicator: true },
  'table-of-contents': {
    variant: 'default',
    label: 'Article contents',
    title: 'In this article',
    items: true,
  },
  'author-card': {
    variant: 'full',
    avatar: true,
    name: 'Marina Paz',
    role: 'Ceramic artist and writer',
    bio: 'Marina writes about material practice, studio rituals, and the lives objects gather through use.',
    links: true,
  },
  'category-nav': { label: 'Blog categories', items: true },
  'blog-sidebar': { sections: true },
  'share-buttons': { variant: 'inline', actions: true },
  'related-articles': { title: 'Continue reading', articles: true },
  comments: { title: 'Conversation', count: '2 comments', thread: true, composer: true },
};

const relatedArticleFixtures = [
  { title: 'A field guide to ash glazes', category: 'Materials' },
  { title: 'The tools that earn a permanent place', category: 'Studio notes' },
  { title: 'Firing a small batch with intention', category: 'Process' },
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

function variantClass(contract: ComponentContract, value: StudioPropertyValue): string | null {
  return contract.variants.find((option) => option.name === value)?.className?.replace(/^\./, '') ?? null;
}

function BlogMedia({ index = 1, className = '', alt = '' }: { index?: number; className?: string; alt?: string }) {
  return (
    <img
      src={transparentImage}
      alt={alt}
      className={`${className} docs-studio__blog-media docs-studio__blog-media--${index}`}
    />
  );
}

export default function BlogStudio({ contract, definition }: BlogStudioProps) {
  const id = useId();
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
  const [feedback, setFeedback] = useState('');
  const [commentDraft, setCommentDraft] = useState('');

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
    setFeedback('');
    setCommentDraft('');
  }

  function inspect(event: MouseEvent<HTMLElement>, label: string) {
    event.preventDefault();
    setFeedback(`${label} is available for inspection; its destination and data remain target-owned.`);
  }

  function renderArticleCard() {
    const className = variantClass(contract, values.variant);
    const href = String(values.href || '#article');
    const category = String(values.category || '');
    const categoryNode = category ? <span className="badge article-card__category">{category}</span> : null;
    return (
      <article className={['article-card', className, 'docs-studio__article-card'].filter(Boolean).join(' ')}>
        {values.media === true && (
          <a className="article-card__media" href={href} onClick={(event) => inspect(event, 'Article media link')}>
            <BlogMedia alt={String(values.imageAlt || '')} />
            {categoryNode}
          </a>
        )}
        <div className="article-card__body">
          {values.media !== true && categoryNode}
          {values.metadata === true && <div className="article-card__meta"><time dateTime="2026-07-12">July 12, 2026</time><span className="article-card__meta-separator">/</span><span>6 min read</span></div>}
          <h2 className="article-card__title"><a href={href} onClick={(event) => inspect(event, 'Article title link')}>{String(values.title)}</a></h2>
          {String(values.excerpt || '') && <p className="article-card__excerpt">{String(values.excerpt)}</p>}
          {values.author === true && <div className="article-card__author"><span className="article-card__author-name">By Marina Paz</span></div>}
        </div>
      </article>
    );
  }

  function renderArticleHero() {
    const className = variantClass(contract, values.variant);
    const isFull = values.variant === 'full';
    const isSplit = values.variant === 'split';
    return (
      <header className={[
        'article-hero',
        className,
        'docs-studio__article-hero',
        isFull && values.backgroundMedia !== true ? 'docs-studio__article-hero--without-media' : null,
      ].filter(Boolean).join(' ')}>
        {isFull && values.backgroundMedia === true && <div className="article-hero__bg"><BlogMedia alt="Kiln shelves holding newly fired stoneware" /></div>}
        {isFull && values.backgroundMedia === true && <div className="article-hero__overlay" />}
        {isSplit && values.splitMedia === true && <div className="article-hero__media"><BlogMedia index={2} alt="A ceramic artist checking a glazed vessel" /></div>}
        <div className="article-hero__content">
          {String(values.category || '') && <div className="article-hero__category">{String(values.category)}</div>}
          <h2 className="article-hero__title">{String(values.title)}</h2>
          {values.metadata === true && <div className="article-hero__meta"><span>By Marina Paz</span><time dateTime="2026-07-12">July 12, 2026</time><span>7 min read</span></div>}
        </div>
      </header>
    );
  }

  function renderArticleBody() {
    return (
      <article className={`prose docs-studio__article-body${values.dropCap === true ? ' prose--drop-cap' : ''}`}>
        {values.content === true && (
          <>
            <p>Before the studio wakes, the clay is already responding to weather, moisture, and the memory of yesterday's hands.</p>
            <h2>Learning through repetition</h2>
            <p>Making the same form again is never truly repetition. Each pass reveals a different pressure point and a more economical gesture.</p>
            <blockquote>Attention is part of the material.<cite>Marina Paz, studio notes</cite></blockquote>
            <h3>Keeping useful records</h3>
            <p>Small observations become a practical archive: firing curves, glaze thickness, and the character of a rim after one more pull.</p>
          </>
        )}
      </article>
    );
  }

  function renderReadingProgress() {
    return (
      <div className="reading-progress docs-studio__reading-progress">
        {values.indicator === true && <div className="reading-progress__bar docs-studio__reading-progress-bar" />}
      </div>
    );
  }

  function renderTableOfContents() {
    const className = variantClass(contract, values.variant);
    const items = [
      ['Arrival at the studio', ''],
      ['Learning through repetition', 'toc__item--h3'],
      ['Keeping useful records', 'toc__item--h3'],
    ];
    return (
      <nav className={['toc', className, 'docs-studio__toc'].filter(Boolean).join(' ')} aria-label={String(values.label || '') || undefined}>
        {String(values.title || '') && <h2 className="toc__title">{String(values.title)}</h2>}
        {values.items === true && (
          <ol className="toc__list">
            {items.map(([label, itemClass], index) => (
              <li className={['toc__item', itemClass].filter(Boolean).join(' ')} key={label}>
                <a className={`toc__link${index === 0 ? ' toc__link--active' : ''}`} href={`#section-${index + 1}`} onClick={(event) => inspect(event, 'Heading link')}>{label}</a>
              </li>
            ))}
          </ol>
        )}
      </nav>
    );
  }

  function renderAuthorCard() {
    const className = variantClass(contract, values.variant);
    return (
      <section className={['author-card', className, 'docs-studio__author-card'].filter(Boolean).join(' ')}>
        {values.avatar === true && <span className="avatar avatar--lg author-card__avatar docs-studio__blog-avatar" aria-hidden="true">MP</span>}
        <div className="author-card__info">
          <h2 className="author-card__name">{String(values.name)}</h2>
          {String(values.role || '') && <div className="author-card__role">{String(values.role)}</div>}
          {String(values.bio || '') && <p className="author-card__bio">{String(values.bio)}</p>}
          {values.links === true && (
            <div className="author-card__links">
              <a className="btn btn--outline btn--sm" href="mailto:studio@example.com" onClick={(event) => inspect(event, 'Author email link')}><Mail className="btn__icon btn__icon--leading" aria-hidden="true" />Email</a>
              <a className="btn btn--link btn--sm" href="#author-profile" onClick={(event) => inspect(event, 'Author profile link')}><Link2 className="btn__icon btn__icon--leading" aria-hidden="true" />Profile</a>
            </div>
          )}
        </div>
      </section>
    );
  }

  function renderCategoryNav() {
    const categories = [
      ['All stories', '28'],
      ['Studio notes', '9'],
      ['Materials', '7'],
      ['Process', '12'],
    ];
    return (
      <nav className="category-nav docs-studio__category-nav" aria-label={String(values.label)}>
        {values.items === true && categories.map(([label, count], index) => (
          <a
            className={`category-nav__item${index === 0 ? ' category-nav__item--active' : ''}`}
            href={`#category-${index + 1}`}
            aria-current={index === 0 ? 'page' : undefined}
            onClick={(event) => inspect(event, 'Category item')}
            key={label}
          >
            {label}<span className="category-nav__count">{count}</span>
          </a>
        ))}
      </nav>
    );
  }

  function renderBlogSidebar() {
    return (
      <aside className="blog-sidebar docs-studio__blog-sidebar">
        {values.sections === true && (
          <>
            <section className="blog-sidebar__section">
              <h2 className="blog-sidebar__title">Recent notes</h2>
              <ul className="blog-sidebar__list">
                {['The case for slower tools', 'Testing a new ash glaze', 'What survives the firing'].map((label, index) => (
                  <li className="blog-sidebar__list-item" key={label}><a className="blog-sidebar__link" href={`#recent-${index + 1}`} onClick={(event) => inspect(event, 'Sidebar article link')}>{label}</a></li>
                ))}
              </ul>
            </section>
            <section className="blog-sidebar__section">
              <h2 className="blog-sidebar__title">Explore tags</h2>
              <div className="tag-cloud">
                {['Stoneware', 'Glaze', 'Kiln', 'Tools'].map((label) => (
                  <a className="tag tag-cloud__item" href={`#tag-${label.toLowerCase()}`} onClick={(event) => inspect(event, 'Tag link')} key={label}><span className="tag__label">{label}</span></a>
                ))}
              </div>
            </section>
          </>
        )}
      </aside>
    );
  }

  function renderShareButtons() {
    const className = variantClass(contract, values.variant);
    const actions = [
      { label: 'Copy link', icon: Copy },
      { label: 'Email', icon: Mail },
      { label: 'Share', icon: Link2 },
    ];
    return (
      <div className="docs-studio__share-fixture">
        <div className={['share-buttons', className].filter(Boolean).join(' ')}>
          {values.actions === true && actions.map(({ label, icon: Icon }) => (
            <button className="btn btn--outline btn--sm" type="button" onClick={(event) => inspect(event, `${label} action`)} key={label}><Icon className="btn__icon btn__icon--leading" aria-hidden="true" />{label}</button>
          ))}
        </div>
      </div>
    );
  }

  function renderRelatedCard(title: string, category: string, index: number) {
    return (
      <article className="article-card docs-studio__related-card" key={title}>
        <a className="article-card__media" href={`#related-${index + 1}`} onClick={(event) => inspect(event, 'Related article link')}><BlogMedia index={index + 1} alt={`${title} article illustration`} /><span className="badge article-card__category">{category}</span></a>
        <div className="article-card__body"><h3 className="article-card__title"><a href={`#related-${index + 1}`} onClick={(event) => inspect(event, 'Related article link')}>{title}</a></h3></div>
      </article>
    );
  }

  function renderRelatedArticles() {
    return (
      <section className="related-articles docs-studio__related-articles">
        {String(values.title || '') && <h2 className="related-articles__title">{String(values.title)}</h2>}
        {values.articles === true && <div className="related-articles__grid docs-studio__related-grid">{relatedArticleFixtures.map((article, index) => renderRelatedCard(article.title, article.category, index))}</div>}
      </section>
    );
  }

  function renderComment(author: string, initials: string, text: string, nested = false) {
    return (
      <article className="comment" key={author}>
        <span className="avatar comment__avatar docs-studio__blog-avatar" aria-hidden="true">{initials}</span>
        <div className="comment__body">
          <header className="comment__header"><span className="comment__author">{author}</span><time className="comment__date" dateTime="2026-07-12">Today</time></header>
          <p className="comment__text">{text}</p>
          <div className="comment__actions">
            <button className="comment__action-btn" type="button" onClick={(event) => inspect(event, `${nested ? 'Nested ' : ''}reply action`)}><Reply aria-hidden="true" />Reply</button>
            <button className="comment__action-btn" type="button" onClick={(event) => inspect(event, 'Appreciation action')}><ThumbsUp aria-hidden="true" />Appreciate</button>
          </div>
        </div>
      </article>
    );
  }

  function renderComments() {
    function submit(event: FormEvent) {
      event.preventDefault();
      setFeedback(commentDraft.trim()
        ? 'Comment text is available for inspection; posting and persistence remain target-owned.'
        : 'Enter a comment to inspect the composer.');
    }
    return (
      <section className="comments docs-studio__comments">
        <h2 className="comments__title">{String(values.title)} {String(values.count || '') && <span className="comments__count">{String(values.count)}</span>}</h2>
        {values.thread === true && (
          <div className="docs-studio__comment-thread">
            {renderComment('Ana Ruiz', 'AR', 'The notes about repetition feel true in every material practice.')}
            <div className="comment__replies">{renderComment('Marina Paz', 'MP', 'Exactly. Repetition creates enough quiet to notice what changed.', true)}</div>
          </div>
        )}
        {values.composer === true && (
          <form className="comment-form" onSubmit={submit}>
            <h3 className="comment-form__title">Join the conversation</h3>
            <div className="input docs-studio__comment-field">
              <label className="input__label" htmlFor={`${id}-comment`}>Comment</label>
              <div className="input__control"><textarea className="input__field textarea__field" id={`${id}-comment`} rows={4} value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} /></div>
            </div>
            <button className="btn" type="submit"><MessageCircle className="btn__icon btn__icon--leading" aria-hidden="true" />Preview comment</button>
          </form>
        )}
      </section>
    );
  }

  function renderPreview() {
    if (contract.slug === 'article-card') return renderArticleCard();
    if (contract.slug === 'article-hero') return renderArticleHero();
    if (contract.slug === 'article-body') return renderArticleBody();
    if (contract.slug === 'reading-progress') return renderReadingProgress();
    if (contract.slug === 'table-of-contents') return renderTableOfContents();
    if (contract.slug === 'author-card') return renderAuthorCard();
    if (contract.slug === 'category-nav') return renderCategoryNav();
    if (contract.slug === 'blog-sidebar') return renderBlogSidebar();
    if (contract.slug === 'share-buttons') return renderShareButtons();
    if (contract.slug === 'related-articles') return renderRelatedArticles();
    return renderComments();
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
          onPropertiesChange={(next) => {
            setValues((current) => ({ ...current, ...next }));
            setFeedback('');
          }}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section className="docs-studio__stage docs-studio__stage--blog" aria-label={`${contract.name} preview`} style={tokenOverrides as CSSProperties}>
          <div className={`docs-studio__stage-inner docs-studio__blog-stage-inner docs-studio__blog-stage-inner--${contract.slug}`}>
            {renderPreview()}
            <p className="docs-studio__blog-feedback" role="status" aria-live="polite">{feedback}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
