import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
} from 'react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import ArticleBodyArtwork, { ArticleBodyFixture } from './ArticleBodyArtwork';
import ArticleCardArtwork from './ArticleCardArtwork';
import ArticleHeroArtwork from './ArticleHeroArtwork';
import AuthorCardArtwork, {
  AuthorCardAvatarFixture,
  AuthorCardLinksFixture,
  authorCardFixture,
} from './AuthorCardArtwork';
import BlogSidebarArtwork, {
  BlogSidebarFixture,
  blogSidebarFixture,
} from './BlogSidebarArtwork';
import FilterBarArtwork, { filterBarFixtureOptions } from './FilterBarArtwork';
import CommentSectionArtwork, {
  CommentComposerFixture,
  CommentOrderFixture,
  CommentPaginationFixture,
  CommentThreadFixture,
  commentsFixture,
  updateCommentReactionFixture,
  type CommentArtworkRecord,
} from './CommentSectionArtwork';
import RelatedArticlesArtwork, {
  buildRelatedArticlesFixture,
} from './RelatedArticlesArtwork';
import ShareActionsArtwork, {
  buildShareActionsFixture,
  type ShareActionArtworkItem,
} from './ShareActionsArtwork';
import { ReadingProgressFixture } from './ReadingProgressArtwork';
import TableOfContentsArtwork, {
  tableOfContentsFixtureItems,
} from './TableOfContentsArtwork';
import { editorialImage } from './editorialMedia';

interface BlogStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'article-card': {
    variant: 'standard',
    surface: 'default',
    title: 'Inside the quiet rhythm of a working studio',
    href: '#studio-rhythm',
    media: true,
    imageAlt: 'Stoneware forms arranged on a studio workbench',
    category: 'Studio notes',
    metadata: true,
    excerpt: 'A morning shaped by clay, repetition, and the small decisions that give each vessel its character.',
    excerptLines: 'none',
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
  'reading-progress': {
    mode: 'controlled',
    value: 44,
    targetId: 'reading-progress-article',
    scrollRootId: 'reading-progress-scroll-root',
  },
  'table-of-contents': {
    placement: 'sticky',
    label: 'In this article',
    title: 'In this article',
    items: true,
    currentSectionId: 'article-repetition',
  },
  'author-card': {
    variant: 'full',
    avatar: true,
    name: authorCardFixture.name,
    role: authorCardFixture.role,
    bio: authorCardFixture.bio,
    links: true,
  },
  'filter-bar': {
    mode: 'single',
    label: 'Filter stories',
    name: 'topic',
    options: true,
    selectedValues: ['studio-notes'],
    disabled: false,
    describedBy: '',
  },
  'blog-sidebar': { label: blogSidebarFixture.label, sections: true },
  'share-buttons': {
    variant: 'inline',
    label: 'Share this studio note',
    actions: true,
  },
  'related-articles': { title: 'Continue reading', articles: true },
  comments: {
    title: 'Conversation',
    count: '24 comments',
    orderControl: true,
    thread: true,
    pagination: true,
    composer: true,
  },
};

function defaultValue(contract: ComponentContract, property: ContractProperty): StudioPropertyValue {
  if ('defaultValue' in property) return property.defaultValue ?? null;
  if (property.type === 'string-list') return [];
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
      src={editorialImage(index)}
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
  const [commentRecords, setCommentRecords] = useState<readonly CommentArtworkRecord[]>(commentsFixture);
  const [commentPage, setCommentPage] = useState(1);
  const [commentOrder, setCommentOrder] = useState('oldest');

  useEffect(() => {
    if (contract.slug !== 'filter-bar') return undefined;

    const synchronizeFromUrl = () => {
      const key = String(values.name || 'topic').trim();
      if (!key) return;
      const url = new URL(window.location.href);
      const validValues = new Set(filterBarFixtureOptions.map((option) => option.value));
      const urlSelection = url.searchParams.getAll(key).filter((value) => validValues.has(value));
      const fallbackSelection = Array.isArray(initialValues.selectedValues)
        ? initialValues.selectedValues
        : [];
      const nextSelection = (url.searchParams.has(key) ? urlSelection : fallbackSelection)
        .slice(0, values.mode === 'multiple' ? undefined : 1);

      setValues((current) => {
        const currentSelection = Array.isArray(current.selectedValues)
          ? current.selectedValues
          : [];
        return currentSelection.length === nextSelection.length
          && currentSelection.every((value, index) => value === nextSelection[index])
          ? current
          : { ...current, selectedValues: nextSelection };
      });
    };

    synchronizeFromUrl();
    window.addEventListener('popstate', synchronizeFromUrl);
    return () => window.removeEventListener('popstate', synchronizeFromUrl);
  }, [contract.slug, initialValues, values.mode, values.name]);

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
    setCommentRecords(commentsFixture);
    setCommentPage(1);
    setCommentOrder('oldest');
    if (contract.slug === 'filter-bar') {
      const key = String(values.name || 'topic').trim();
      const url = new URL(window.location.href);
      if (key) url.searchParams.delete(key);
      window.history.replaceState(window.history.state, '', url);
    }
  }

  function updateFilterQuery(selectedValues: readonly string[], method: 'push' | 'replace' = 'push') {
    const key = String(values.name || '').trim();
    if (!key) return;
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    if (selectedValues.length === 0) {
      url.searchParams.set(key, '');
    } else {
      selectedValues.forEach((value) => url.searchParams.append(key, value));
    }
    window.history[method === 'push' ? 'pushState' : 'replaceState'](
      window.history.state,
      '',
      url,
    );
  }

  function inspect(event: MouseEvent<HTMLElement>, label: string) {
    event.preventDefault();
    setFeedback(`${label} is available for inspection; its destination and data remain target-owned.`);
  }

  function renderArticleCard() {
    const className = variantClass(contract, values.variant);
    const variant = String(values.variant || 'standard');
    const href = String(values.href ?? '');
    return (
      <ArticleCardArtwork
        title={String(values.title || '')}
        href={href}
        variant={variant}
        surface={String(values.surface || 'default')}
        className={className ?? ''}
        media={values.media === true ? <BlogMedia alt={String(values.imageAlt || '')} /> : null}
        category={String(values.category || '')}
        metadata={values.metadata === true ? (
          <>
            <time dateTime="2026-07-12">July 12, 2026</time>
            <span className="article-card__meta-separator" aria-hidden="true">/</span>
            <time dateTime="PT6M">6 min read</time>
          </>
        ) : null}
        excerpt={String(values.excerpt || '')}
        excerptLines={String(values.excerptLines || 'none')}
        author={values.author === true ? <span className="article-card__author-name" dir="auto">By Marina Paz</span> : null}
        onNavigate={(event) => inspect(event, 'Article title link')}
      />
    );
  }

  function renderArticleHero() {
    const className = variantClass(contract, values.variant);
    return (
      <ArticleHeroArtwork
        title={String(values.title || '')}
        variant={String(values.variant || 'full')}
        className={className ?? ''}
        backgroundMedia={values.backgroundMedia === true ? <BlogMedia alt="Kiln shelves holding newly fired stoneware" /> : null}
        splitMedia={values.splitMedia === true ? <BlogMedia index={2} alt="A ceramic artist checking a glazed vessel" /> : null}
        category={String(values.category || '')}
        metadata={values.metadata === true ? (
          <>
            <span dir="auto">By Marina Paz</span>
            <span className="article-hero__meta-separator" aria-hidden="true">/</span>
            <time dateTime="2026-07-12">July 12, 2026</time>
            <span className="article-hero__meta-separator" aria-hidden="true">/</span>
            <time dateTime="PT7M">7 min read</time>
          </>
        ) : null}
      />
    );
  }

  function renderArticleBody() {
    return (
      <ArticleBodyArtwork
        content={values.content === true ? <ArticleBodyFixture /> : null}
        dropCap={values.dropCap === true}
      />
    );
  }

  function renderReadingProgress() {
    return (
      <ReadingProgressFixture
        mode={values.mode === 'automatic' ? 'automatic' : 'controlled'}
        value={Number(values.value ?? 0)}
        targetId={String(values.targetId || '')}
        scrollRootId={String(values.scrollRootId || '')}
      />
    );
  }

  function renderTableOfContents() {
    return (
      <TableOfContentsArtwork
        label={String(values.label || '')}
        title={String(values.title || '')}
        items={values.items === true ? tableOfContentsFixtureItems : []}
        currentSectionId={String(values.currentSectionId || '')}
        placement={String(values.placement || 'sticky')}
        className="docs-studio__toc"
        onNavigate={(event) => inspect(event, 'Heading link')}
      />
    );
  }

  function renderAuthorCard() {
    const authorVariant = String(values.variant || 'full');
    return (
      <AuthorCardArtwork
        name={String(values.name || '')}
        avatar={values.avatar === true ? (
          <AuthorCardAvatarFixture compact={authorVariant === 'compact'} />
        ) : null}
        role={String(values.role || '')}
        bio={String(values.bio || '')}
        links={values.links === true ? (
          <AuthorCardLinksFixture onNavigate={(event, label) => inspect(event, label)} />
        ) : null}
        variant={authorVariant}
        className="docs-studio__author-card"
      />
    );
  }

  function renderFilterBar() {
    const selectedValues = Array.isArray(values.selectedValues)
      ? values.selectedValues
      : [];
    return (
      <FilterBarArtwork
        mode={values.mode === 'multiple' ? 'multiple' : 'single'}
        label={String(values.label || '')}
        name={String(values.name || '')}
        options={values.options === true ? filterBarFixtureOptions : []}
        selectedValues={selectedValues}
        disabled={values.disabled === true}
        describedBy={String(values.describedBy || '') || undefined}
        className="docs-studio__filter-bar"
        onSelectedValuesChange={(nextSelection) => {
          setValues((current) => ({ ...current, selectedValues: nextSelection }));
        }}
        onCommitRequest={(nextSelection) => {
          updateFilterQuery(nextSelection);
          setFeedback(nextSelection.length > 0
            ? `Filter request: ${nextSelection.join(', ')}. The target URL now reflects the controlled selection.`
            : 'Filter request: no selected values. The target URL now reflects the empty selection.');
        }}
      />
    );
  }

  function renderBlogSidebar() {
    return (
      <BlogSidebarArtwork
        label={String(values.label || '')}
        sections={values.sections === true ? (
          <BlogSidebarFixture onNavigate={(event, label) => inspect(event, label)} />
        ) : null}
        className="docs-studio__blog-sidebar"
      />
    );
  }

  function renderShareActions() {
    const sharePayload = {
      title: 'Inside the quiet rhythm of a working studio',
      text: 'A studio note from The Gallery.',
      url: 'https://example.com/studio-note',
    };
    const actions = buildShareActionsFixture().filter((action) => {
      if (action.id === 'native') {
        return typeof navigator.share === 'function'
          && (typeof navigator.canShare !== 'function' || navigator.canShare(sharePayload));
      }
      if (action.id === 'copy') {
        return typeof navigator.clipboard?.writeText === 'function';
      }
      return true;
    });

    async function requestShareAction(
      event: MouseEvent<HTMLButtonElement>,
      action: ShareActionArtworkItem,
    ) {
      event.preventDefault();
      if (action.id === 'copy') {
        try {
          await navigator.clipboard.writeText(sharePayload.url);
          setFeedback('Link copied after the target clipboard operation succeeded.');
        } catch {
          setFeedback('Copy failed. The target must provide an accessible fallback.');
        }
        return;
      }

      if (action.id === 'native') {
        try {
          await navigator.share(sharePayload);
          setFeedback('The target share operation completed.');
        } catch (error) {
          setFeedback(error instanceof DOMException && error.name === 'AbortError'
            ? 'Sharing was cancelled without changing the component.'
            : 'Sharing failed. The target must provide recovery or another explicit action.');
        }
        return;
      }

      setFeedback(`${action.label} request emitted to the target.`);
    }

    return (
      <div className="docs-studio__share-fixture">
        <ShareActionsArtwork
          label={String(values.label || '')}
          actions={values.actions === true ? actions : []}
          variant={String(values.variant || 'inline')}
          onActionRequest={(event, action) => void requestShareAction(event, action)}
          onNavigate={(event, action) => inspect(event, `${action.label} destination`)}
        />
      </div>
    );
  }

  function renderRelatedArticles() {
    return (
      <RelatedArticlesArtwork
        id={`${id}-related-articles`}
        title={String(values.title || '')}
        articles={values.articles === true
          ? buildRelatedArticlesFixture({ onNavigate: (event, label) => inspect(event, label) })
          : []}
        className="docs-studio__related-articles"
      />
    );
  }

  function renderComments() {
    function submit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setFeedback(commentDraft.trim()
        ? 'Comment text is available for inspection; posting and persistence remain target-owned.'
        : 'Enter a comment to inspect the composer.');
    }
    return (
      <CommentSectionArtwork
        id={`${id}-comments`}
        title={String(values.title || '')}
        count={String(values.count || '')}
        orderControl={values.orderControl === true ? (
          <CommentOrderFixture
            id={`${id}-comment-order`}
            value={commentOrder}
            onChange={(event) => {
              setCommentOrder(event.target.value);
              setCommentPage(1);
              setFeedback(`Comment order ${event.target.value} requested; the fixture target projected one authoritative record set.`);
            }}
          />
        ) : null}
        thread={values.thread === true ? (
          <CommentThreadFixture
            id={`${id}-comments`}
            records={commentOrder === 'newest' ? [...commentRecords].reverse() : commentRecords}
            onReactionRequest={(event, commentKey, reactionId) => {
              event.preventDefault();
              setCommentRecords((current) => updateCommentReactionFixture(current, commentKey, reactionId));
              setFeedback(`Reaction ${reactionId} requested; the fixture target returned the complete authoritative reaction array.`);
            }}
            onReply={(event, label) => inspect(event, label)}
          />
        ) : null}
        pagination={values.pagination === true ? (
          <CommentPaginationFixture
            currentPage={commentPage}
            onPageChange={(page) => {
              setCommentPage(page);
              setFeedback(`Comment page ${page} requested; records, URL, focus and announcements remain target-owned.`);
            }}
          />
        ) : null}
        composer={values.composer === true ? (
          <CommentComposerFixture
            id={`${id}-comment-composer`}
            value={commentDraft}
            onChange={(event) => setCommentDraft(event.target.value)}
            onSubmit={submit}
          />
        ) : null}
        className="docs-studio__comments"
      />
    );
  }

  function renderPreview() {
    if (contract.slug === 'article-card') return renderArticleCard();
    if (contract.slug === 'article-hero') return renderArticleHero();
    if (contract.slug === 'article-body') return renderArticleBody();
    if (contract.slug === 'reading-progress') return renderReadingProgress();
    if (contract.slug === 'table-of-contents') return renderTableOfContents();
    if (contract.slug === 'author-card') return renderAuthorCard();
    if (contract.slug === 'filter-bar') return renderFilterBar();
    if (contract.slug === 'blog-sidebar') return renderBlogSidebar();
    if (contract.slug === 'share-buttons') return renderShareActions();
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
            const nextSelection = next.mode === 'single' && Array.isArray(values.selectedValues)
              ? values.selectedValues.slice(0, 1)
              : null;
            setValues((current) => ({
              ...current,
              ...next,
              ...(nextSelection ? { selectedValues: nextSelection } : {}),
            }));
            if (nextSelection) updateFilterQuery(nextSelection, 'replace');
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
            {feedback && <p className="docs-studio__blog-feedback" role="status">{feedback}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
