import {
  useEffect,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  ThumbsUp,
  Upload,
} from 'lucide-react';
import type { ComponentContract, ContractProperty } from '../../lib/contracts';
import type { StudioControl, StudioDefinition } from '../../lib/studio';
import StudioInspector, {
  type StudioPropertyValue,
  type StudioPropertyValues,
  type StudioSlotIconValues,
} from './StudioInspector';
import { editorialImage, editorialMedia } from './editorialMedia';

interface ReviewsStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'review-summary': {
    ratingValue: 4.5,
    scoreLabel: '4.5',
    ratingLabel: '4.5 out of 5 stars from 127 reviews',
    reviewCount: 127,
    reviewCountLabel: '127 reviews',
    distribution: true,
  },
  'star-rating': {
    ratingValue: 4.5,
    label: '4.5 out of 5 stars',
    size: 'lg',
  },
  'star-input': {
    label: 'Your rating',
    name: 'studio-rating',
    value: 4,
    required: false,
    disabled: false,
    describedBy: 'studio-rating-help',
  },
  'review-card': {
    author: 'Mara Vidal',
    date: 'July 8, 2026',
    avatar: true,
    verifiedStatus: true,
    rating: true,
    title: 'Quietly beautiful in daily use',
    body: 'The proportions feel considered, and the glaze changes gently as the light moves across it.',
    photos: true,
    helpfulLabel: 'Helpful',
    helpfulPressed: false,
    helpfulDisabled: false,
    helpfulCount: '18 people found this helpful',
    reply: true,
  },
  'review-highlights': {
    label: 'Common review themes',
    items: true,
  },
  'photo-reviews': {
    label: 'Customer review photos',
    items: true,
  },
  'review-form': {
    label: 'Write a review',
    rating: true,
    textField: true,
    reviewBody: true,
    photoUpload: true,
    classification: true,
    submitAction: true,
    status: true,
  },
  'review-toolbar': {
    label: 'Review controls',
    control: true,
    writeAction: true,
  },
  'review-pagination': {
    label: 'Review pages',
    controls: true,
  },
};

const distributionRows = [
  { label: '5 stars', count: 89, width: '70%' },
  { label: '4 stars', count: 25, width: '20%' },
  { label: '3 stars', count: 8, width: '6%' },
  { label: '2 stars', count: 3, width: '2%' },
  { label: '1 star', count: 2, width: '2%' },
];

const highlightItems = [
  ['Quality', '42'],
  ['Craftsmanship', '38'],
  ['Packaging', '21'],
  ['Color', '16'],
] as const;

const photoAlts = [
  'Customer photo of a glazed bowl on a dining table',
  'Customer photo showing the bowl rim and glaze detail',
  'Customer photo of the bowl beside serving utensils',
  'Customer photo showing the bowl in morning light',
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

function ratingNumber(value: StudioPropertyValue, fallback = 0): number {
  return typeof value === 'number' ? Math.max(0, Math.min(5, value)) : fallback;
}

function StarDisplay({ value, label, large = false }: { value: number; label: string; large?: boolean }) {
  return (
    <span
      className={`star-rating${large ? ' star-rating--lg' : ''}`}
      data-rating={value}
      role="img"
      aria-label={label}
    >
      {[1, 2, 3, 4, 5].map((position) => {
        const fill = value >= position ? 'true' : value >= position - 0.5 ? 'half' : undefined;
        return (
          <Star
            className="star-rating__star"
            data-filled={fill}
            fill="currentColor"
            aria-hidden="true"
            key={position}
          />
        );
      })}
    </span>
  );
}

interface StarInputProps {
  idPrefix: string;
  label: string;
  name: string;
  value: number | null;
  required?: boolean;
  disabled?: boolean;
  describedBy?: string;
  onChange: (value: number) => void;
}

function StarInput({ idPrefix, label, name, value, required, disabled, describedBy, onChange }: StarInputProps) {
  return (
    <fieldset className="star-input" data-value={value ?? undefined} aria-describedby={describedBy || undefined}>
      <legend className="star-input__legend">{label}</legend>
      {[1, 2, 3, 4, 5].map((rating) => (
        <label className="star-input__label" key={rating}>
          <input
            className="star-input__radio"
            id={`${idPrefix}-${rating}`}
            type="radio"
            name={name}
            value={rating}
            checked={value === rating}
            required={required}
            disabled={disabled}
            aria-label={`${rating} ${rating === 1 ? 'star' : 'stars'}`}
            onChange={() => onChange(rating)}
          />
          <Star className="star-input__indicator" fill="currentColor" aria-hidden="true" />
        </label>
      ))}
    </fieldset>
  );
}

export default function ReviewsStudio({ contract, definition }: ReviewsStudioProps) {
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
  const [feedback, setFeedback] = useState('');
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>(['Quality']);
  const [formRating, setFormRating] = useState<number | null>(4);
  const [reviewTitle, setReviewTitle] = useState('A thoughtful piece');
  const [reviewBody, setReviewBody] = useState('The form and glaze work beautifully together.');
  const [reviewTopic, setReviewTopic] = useState('product');
  const [fileLabel, setFileLabel] = useState('No photo selected');
  const [sortValue, setSortValue] = useState('recent');
  const [currentPage, setCurrentPage] = useState(2);

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
    setSelectedHighlights(['Quality']);
    setFormRating(4);
    setReviewTitle('A thoughtful piece');
    setReviewBody('The form and glaze work beautifully together.');
    setReviewTopic('product');
    setFileLabel('No photo selected');
    setSortValue('recent');
    setCurrentPage(2);
  }

  function updateValues(next: StudioPropertyValues) {
    setValues((current) => ({ ...current, ...next }));
    setFeedback('');
  }

  function renderSummary() {
    const rating = ratingNumber(values.ratingValue, 4.5);
    return (
      <section
        className="review-summary"
        data-rating={rating}
        data-review-count={typeof values.reviewCount === 'number' ? values.reviewCount : undefined}
        aria-label={String(values.ratingLabel || '') || undefined}
      >
        <div className="review-summary__average">
          <span className="review-summary__score">{String(values.scoreLabel)}</span>
          <StarDisplay value={rating} label={String(values.ratingLabel)} />
          <span className="review-summary__count">{String(values.reviewCountLabel)}</span>
        </div>
        {values.distribution === true && (
          <div className="review-summary__bars" aria-label="Rating distribution">
            {distributionRows.map((row) => (
              <div className="review-summary__bar-row" key={row.label}>
                <span className="review-summary__bar-label">{row.label}</span>
                <span className="review-summary__bar-track" aria-hidden="true">
                  <span className="review-summary__bar-fill" style={{ width: row.width }} />
                </span>
                <span className="review-summary__bar-count">{row.count}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  function renderStarRating() {
    return (
      <StarDisplay
        value={ratingNumber(values.ratingValue, 4.5)}
        label={String(values.label || '')}
        large={values.size === 'lg'}
      />
    );
  }

  function renderStarInput() {
    const describedBy = String(values.describedBy || '');
    return (
      <div className="docs-studio__reviews-star-input">
        <StarInput
          idPrefix={`${id}-rating`}
          label={String(values.label)}
          name={String(values.name) || `${id}-rating`}
          value={typeof values.value === 'number' ? values.value : null}
          required={values.required === true}
          disabled={values.disabled === true}
          describedBy={describedBy}
          onChange={(value) => updateValues({ value })}
        />
        {describedBy && <p className="docs-studio__reviews-note" id={describedBy}>Choose one rating from one through five.</p>}
      </div>
    );
  }

  function renderReviewCard() {
    const pressed = values.helpfulPressed === true;
    return (
      <article className="review-card">
        <header className="review-card__header">
          {values.avatar === true && (
            <img
              className="review-card__avatar docs-studio__reviews-avatar"
              src={editorialMedia.artistInStudio}
              alt={`${String(values.author)} working in a ceramics studio`}
            />
          )}
          <div className="review-card__meta">
            <span className="review-card__author">{String(values.author)}</span>
            {String(values.date || '') && <time className="review-card__date">{String(values.date)}</time>}
          </div>
          {values.verifiedStatus === true && <span className="review-card__verified"><BadgeCheck aria-hidden="true" />Verified purchase</span>}
        </header>
        {values.rating === true && <StarDisplay value={4.5} label="4.5 out of 5 stars" />}
        {String(values.title || '') && <h2 className="review-card__title">{String(values.title)}</h2>}
        <p className="review-card__body">{String(values.body)}</p>
        {values.photos === true && (
          <div className="review-card__photos" aria-label="Review photos">
            {photoAlts.slice(0, 3).map((alt, index) => (
              <span className="review-card__photo" key={alt}>
                <img className={`docs-studio__reviews-media docs-studio__reviews-media--${index + 1}`} src={editorialImage(index)} alt={alt} />
              </span>
            ))}
          </div>
        )}
        {(String(values.helpfulLabel || '') || String(values.helpfulCount || '')) && (
          <div className="review-card__actions">
            {String(values.helpfulLabel || '') && (
              <button
                className="review-card__helpful-btn"
                type="button"
                aria-pressed={pressed}
                disabled={values.helpfulDisabled === true}
                onClick={() => updateValues({ helpfulPressed: !pressed })}
              >
                <ThumbsUp aria-hidden="true" />{String(values.helpfulLabel)}
              </button>
            )}
            {String(values.helpfulCount || '') && <span className="review-card__helpful-count">{String(values.helpfulCount)}</span>}
          </div>
        )}
        {values.reply === true && (
          <aside className="review-card__reply">
            <div className="review-card__reply-label">Gallery reply</div>
            <p className="review-card__reply-body">Thank you for sharing how the piece lives in your space.</p>
          </aside>
        )}
      </article>
    );
  }

  function renderHighlights() {
    const toggle = (label: string) => {
      setSelectedHighlights((current) => current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]);
      setFeedback('Theme selection changed only in this Studio fixture; no reviews were filtered.');
    };
    return (
      <section className="review-highlights" aria-label={String(values.label || '') || undefined}>
        {values.items === true && highlightItems.map(([label, count]) => (
          <button
            className="review-highlights__tag"
            type="button"
            aria-pressed={selectedHighlights.includes(label)}
            onClick={() => toggle(label)}
            key={label}
          >
            {label}<span className="review-highlights__count">{count}</span>
          </button>
        ))}
      </section>
    );
  }

  function renderPhotoReviews() {
    return (
      <div className="photo-reviews" role="list" aria-label={String(values.label || '') || undefined}>
        {values.items === true && photoAlts.map((alt, index) => (
          <div className="photo-reviews__item" role="listitem" key={alt}>
            <img
              className={`photo-reviews__image docs-studio__reviews-media docs-studio__reviews-media--${index + 1}`}
              src={editorialImage(index)}
              alt={alt}
            />
          </div>
        ))}
      </div>
    );
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    setFileLabel(event.target.files?.[0]?.name || 'No photo selected');
  }

  function renderReviewForm() {
    const submit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFeedback('Review validated in this Studio fixture. Nothing was uploaded or submitted.');
    };
    return (
      <form className="review-form" aria-label={String(values.label || '') || undefined} onSubmit={submit}>
        <div className="review-form__fields">
          {values.rating === true && (
            <div className="review-form__group">
              <StarInput
                idPrefix={`${id}-form-rating`}
                label="Your rating"
                name={`${id}-form-rating`}
                value={formRating}
                required
                describedBy={`${id}-form-rating-help`}
                onChange={setFormRating}
              />
              <p className="docs-studio__reviews-note" id={`${id}-form-rating-help`}>Choose one rating.</p>
            </div>
          )}
          {values.textField === true && (
            <div className="input">
              <label className="input__label" htmlFor={`${id}-review-title`}>Review title</label>
              <div className="input__control">
                <input className="input__field" id={`${id}-review-title`} name="review-title" value={reviewTitle} onChange={(event) => setReviewTitle(event.target.value)} />
              </div>
              <span className="input__message">Summarize your experience.</span>
            </div>
          )}
          {values.reviewBody === true && (
            <div className="input input--warning">
              <label className="input__label" htmlFor={`${id}-review-body`}>Your review</label>
              <div className="input__control">
                <textarea
                  className="input__field textarea__field"
                  id={`${id}-review-body`}
                  name="review-body"
                  value={reviewBody}
                  data-resize="vertical"
                  data-min-lines="4"
                  aria-describedby={`${id}-review-body-message`}
                  onChange={(event) => setReviewBody(event.target.value)}
                />
              </div>
              <span className="input__message" id={`${id}-review-body-message`}>Review this text before submitting.</span>
            </div>
          )}
          {values.classification === true && (
            <div className="select select--success">
              <label className="select__label" htmlFor={`${id}-review-topic`}>Review topic</label>
              <select className="select__field" id={`${id}-review-topic`} name="review-topic" value={reviewTopic} onChange={(event) => setReviewTopic(event.target.value)}>
                <option value="product">Product</option>
                <option value="delivery">Delivery</option>
                <option value="service">Service</option>
              </select>
              <span className="select__message">Topic selected.</span>
            </div>
          )}
          {values.photoUpload === true && (
            <div className="file-upload">
              <input className="file-upload__input" id={`${id}-review-photo`} name="review-photo" type="file" accept="image/*" aria-describedby={`${id}-review-photo-hint`} onChange={handlePhotoChange} />
              <label htmlFor={`${id}-review-photo`}>
                <Upload className="file-upload__icon" aria-hidden="true" />
                <span className="file-upload__text">Add a review photo</span>
                <span className="file-upload__hint" id={`${id}-review-photo-hint`}>Local preview only. {fileLabel}</span>
              </label>
            </div>
          )}
        </div>
        {values.submitAction === true && <div className="review-form__actions"><button className="btn" type="submit">Submit review</button></div>}
        {values.status === true && <p className="review-form__status" role="status" aria-live="polite">{feedback}</p>}
      </form>
    );
  }

  function renderToolbar() {
    return (
      <div className="review-toolbar" role="toolbar" aria-label={String(values.label || '') || undefined}>
        {values.control === true && (
          <div className="review-toolbar__sort">
            <div className="select">
              <label className="select__label" htmlFor={`${id}-review-sort`}>Order reviews</label>
              <select
                className="select__field review-toolbar__sort-select"
                id={`${id}-review-sort`}
                value={sortValue}
                onChange={(event) => {
                  setSortValue(event.target.value);
                  setFeedback('Sort selection changed only in this Studio fixture; no reviews were fetched.');
                }}
              >
                <option value="recent">Most recent</option>
                <option value="rated">Highest rated</option>
                <option value="helpful">Most helpful</option>
              </select>
            </div>
          </div>
        )}
        {values.writeAction === true && (
          <button className="btn btn--outline review-toolbar__write-btn" type="button" onClick={() => setFeedback('Write-review action selected locally; no destination has been configured.')}>
            Write a review
          </button>
        )}
      </div>
    );
  }

  function renderPagination() {
    const selectPage = (page: number) => {
      setCurrentPage(page);
      setFeedback(`Page ${page} selected only in this Studio fixture; no reviews were fetched.`);
    };
    return (
      <nav className="review-pagination" aria-label={String(values.label)}>
        {values.controls === true && (
          <ul className="review-pagination__list">
            <li className="review-pagination__item">
              <button className="review-pagination__btn" type="button" aria-label="Previous review page" disabled={currentPage === 1} onClick={() => selectPage(currentPage - 1)}><ChevronLeft aria-hidden="true" /></button>
            </li>
            {[1, 2, 3, 4].map((page) => (
              <li className="review-pagination__item" key={page}>
                <button className="review-pagination__btn" type="button" aria-label={`Review page ${page}`} aria-current={currentPage === page ? 'page' : undefined} onClick={() => selectPage(page)}>{page}</button>
              </li>
            ))}
            <li className="review-pagination__item"><span className="review-pagination__ellipsis" aria-hidden="true">...</span></li>
            <li className="review-pagination__item">
              <button className="review-pagination__btn" type="button" aria-label="Next review page" disabled={currentPage === 4} onClick={() => selectPage(currentPage + 1)}><ChevronRight aria-hidden="true" /></button>
            </li>
          </ul>
        )}
      </nav>
    );
  }

  function renderPreview() {
    if (contract.slug === 'review-summary') return renderSummary();
    if (contract.slug === 'star-rating') return renderStarRating();
    if (contract.slug === 'star-input') return renderStarInput();
    if (contract.slug === 'review-card') return renderReviewCard();
    if (contract.slug === 'review-highlights') return renderHighlights();
    if (contract.slug === 'photo-reviews') return renderPhotoReviews();
    if (contract.slug === 'review-form') return renderReviewForm();
    if (contract.slug === 'review-toolbar') return renderToolbar();
    return renderPagination();
  }

  const showSharedFeedback = contract.slug !== 'review-form' && Boolean(feedback);

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
          onPropertiesChange={updateValues}
          onSlotIconChange={() => undefined}
          onStateChange={() => undefined}
          onTokenChange={(token, value) => setTokenOverrides((current) => ({ ...current, [token]: value }))}
          onReset={reset}
        />
        <section
          className={`docs-studio__stage docs-studio__stage--reviews docs-studio__stage--reviews-${contract.slug}`}
          aria-label={`${contract.name} preview`}
          style={tokenOverrides as CSSProperties}
        >
          <div className={`docs-studio__stage-inner docs-studio__reviews-stage-inner docs-studio__reviews-stage-inner--${contract.slug}`}>
            {renderPreview()}
            {showSharedFeedback && <p className="docs-studio__reviews-feedback" role="status" aria-live="polite">{feedback}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
