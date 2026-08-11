import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import {
  BadgeCheck,
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
import PaginationArtwork from './PaginationArtwork';
import RatingArtwork from './RatingArtwork';

interface ReviewsStudioProps {
  contract: ComponentContract;
  definition: StudioDefinition;
}

const emptySlotIcons: StudioSlotIconValues = { leading: '', trailing: '' };

const fixtureValues: Record<string, StudioPropertyValues> = {
  'review-summary': {
    ratingValue: 4.5,
    ratingDisplayValue: 4.5,
    scoreLabel: '4.5',
    ratingLabel: '4.5 out of 5 stars',
    reviewCount: 127,
    reviewCountLabel: '127 reviews',
    distribution: true,
    distributionLabel: 'Rating distribution',
  },
  'star-input': {
    label: 'Your rating',
    name: 'studio-rating',
    value: 4,
    variant: 'default',
    required: false,
    disabled: false,
    describedBy: 'studio-rating-help',
  },
  'review-card': {
    author: 'Mara Vidal',
    date: 'July 8, 2026',
    dateTime: '2026-07-08',
    avatar: true,
    verifiedStatus: true,
    rating: true,
    title: 'Quietly beautiful in daily use',
    body: 'The proportions feel considered, and the glaze changes gently as the light moves across it.',
    photos: true,
    photosLabel: 'Review photos',
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
    currentPage: 5,
    pageItems: true,
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

interface StarInputProps {
  idPrefix: string;
  label: string;
  name: string;
  value: number | null;
  variant?: 'default' | 'error' | 'success' | 'warning';
  required?: boolean;
  disabled?: boolean;
  describedBy?: string;
  onChange: (value: number) => void;
}

function StarInput({ idPrefix, label, name, value, variant = 'default', required, disabled, describedBy, onChange }: StarInputProps) {
  return (
    <fieldset
      className={`star-input${variant === 'default' ? '' : ` star-input--${variant}`}`}
      data-value={value ?? undefined}
      disabled={disabled}
      aria-invalid={variant === 'error' ? true : undefined}
      aria-describedby={describedBy || undefined}
    >
      <legend className="star-input__legend">{label}</legend>
      <span className="star-input__choices">
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
              onChange={() => onChange(rating)}
            />
            <span className="star-input__label-text">{rating} {rating === 1 ? 'star' : 'stars'}</span>
            <Star className="star-input__indicator" aria-hidden="true" />
          </label>
        ))}
      </span>
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
  const [formRating, setFormRating] = useState<number | null>(4);
  const [reviewTitle, setReviewTitle] = useState('A thoughtful piece');
  const [reviewBody, setReviewBody] = useState('The form and glaze work beautifully together.');
  const [reviewTopic, setReviewTopic] = useState('product');
  const [fileLabel, setFileLabel] = useState('No photo selected.');
  const [sortValue, setSortValue] = useState('recent');
  const reviewFormRef = useRef<HTMLFormElement>(null);

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
    reviewFormRef.current?.reset();
    setValues({ ...initialValues });
    setTokenOverrides({});
    setFeedback('');
    setFormRating(4);
    setReviewTitle('A thoughtful piece');
    setReviewBody('The form and glaze work beautifully together.');
    setReviewTopic('product');
    setFileLabel('No photo selected.');
    setSortValue('recent');
  }

  function updateValues(next: StudioPropertyValues) {
    setValues((current) => ({ ...current, ...next }));
    setFeedback('');
  }

  function renderSummary() {
    const rating = ratingNumber(values.ratingValue, 4.5);
    return (
      <figure
        className="review-summary"
        data-rating={rating}
        data-review-count={typeof values.reviewCount === 'number' ? values.reviewCount : undefined}
      >
        <figcaption className="review-summary__average">
          <span className="review-summary__score" aria-hidden="true">{String(values.scoreLabel)}</span>
          <RatingArtwork
            ratingValue={typeof values.ratingDisplayValue === 'number' ? values.ratingDisplayValue : Number.NaN}
            accessibleLabel={String(values.ratingLabel)}
          />
          <span className="review-summary__count">{String(values.reviewCountLabel)}</span>
        </figcaption>
        {values.distribution === true && (
          <ul className="review-summary__bars" aria-label={String(values.distributionLabel || '')}>
            {distributionRows.map((row) => (
              <li className="review-summary__bar-row" key={row.label}>
                <span className="review-summary__bar-label">{row.label}</span>
                <span className="review-summary__bar-track" aria-hidden="true">
                  <span className="review-summary__bar-fill" style={{ inlineSize: row.width }} />
                </span>
                <span className="review-summary__bar-count">{row.count}</span>
              </li>
            ))}
          </ul>
        )}
      </figure>
    );
  }

  function renderStarInput() {
    const describedBy = String(values.describedBy || '');
    const variant = ['error', 'success', 'warning'].includes(String(values.variant))
      ? values.variant as 'error' | 'success' | 'warning'
      : 'default';
    const feedback = {
      default: 'Choose one rating from one through five.',
      error: 'Choose a rating before continuing.',
      success: 'Rating selected.',
      warning: 'Review the selected rating before continuing.',
    }[variant];
    return (
      <div className="docs-studio__reviews-star-input">
        <StarInput
          idPrefix={`${id}-rating`}
          label={String(values.label)}
          name={String(values.name) || `${id}-rating`}
          value={typeof values.value === 'number' ? values.value : null}
          variant={variant}
          required={values.required === true}
          disabled={values.disabled === true}
          describedBy={describedBy}
          onChange={(value) => updateValues({ value })}
        />
        {describedBy && <p className="docs-studio__reviews-note" id={describedBy}>{feedback}</p>}
      </div>
    );
  }

  function renderReviewCard() {
    const pressed = values.helpfulPressed === true;
    const title = String(values.title || '');
    const date = String(values.date || '');
    const helpfulLabel = String(values.helpfulLabel || '');
    const helpfulCount = String(values.helpfulCount || '');
    const titleId = `${id}-review-title`;
    const helpfulCountId = `${id}-review-helpful-count`;
    return (
      <article className="review-card" aria-labelledby={title ? titleId : undefined}>
        <header className="review-card__header">
          {values.avatar === true && (
            <img
              className="review-card__avatar docs-studio__reviews-avatar"
              src={editorialMedia.artistInStudio}
              alt=""
            />
          )}
          <div className="review-card__meta">
            <span className="review-card__author">{String(values.author)}</span>
            {date && <time className="review-card__date" dateTime={String(values.dateTime || '') || undefined}>{date}</time>}
          </div>
          {values.verifiedStatus === true && <span className="review-card__verified"><BadgeCheck aria-hidden="true" />Verified purchase</span>}
        </header>
        {values.rating === true && (
          <RatingArtwork ratingValue={4.5} accessibleLabel="4.5 out of 5 stars" />
        )}
        {title && <h3 className="review-card__title" id={titleId}>{title}</h3>}
        <p className="review-card__body">{String(values.body)}</p>
        {values.photos === true && (
          <ul className="review-card__photos" aria-label={String(values.photosLabel)}>
            {photoAlts.slice(0, 3).map((alt, index) => (
              <li className="review-card__photo" key={alt}>
                <img className={`docs-studio__reviews-media docs-studio__reviews-media--${index + 1}`} src={editorialImage(index)} alt={alt} />
              </li>
            ))}
          </ul>
        )}
        {(helpfulLabel || helpfulCount) && (
          <div className="review-card__actions">
            {helpfulLabel && (
              <button
                className="review-card__helpful-btn"
                type="button"
                aria-pressed={pressed}
                aria-describedby={helpfulCount ? helpfulCountId : undefined}
                disabled={values.helpfulDisabled === true}
                onClick={() => updateValues({ helpfulPressed: !pressed })}
              >
                <ThumbsUp aria-hidden="true" />{helpfulLabel}
              </button>
            )}
            {helpfulCount && <span className="review-card__helpful-count" id={helpfulCountId}>{helpfulCount}</span>}
          </div>
        )}
        {values.reply === true && (
          <div className="review-card__reply">
            <div className="review-card__reply-label">Gallery reply</div>
            <p className="review-card__reply-body">Thank you for sharing how the piece lives in your space.</p>
          </div>
        )}
      </article>
    );
  }

  function renderHighlights() {
    return (
      <ul className="review-highlights" role="list" aria-label={String(values.label || '') || undefined}>
        {values.items === true && highlightItems.map(([label, count]) => (
          <li key={label}>
            <span className="review-highlights__tag">
              {label}
              <span className="review-highlights__count" aria-hidden="true">{count}</span>
              <span className="visually-hidden">{count} reviews</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }

  function renderPhotoReviews() {
    return (
      <ul className="photo-reviews" role="list" aria-label={String(values.label || '') || undefined}>
        {values.items === true && photoAlts.map((alt, index) => (
          <li className="photo-reviews__item" key={alt}>
            <img
              className={`photo-reviews__image docs-studio__reviews-media docs-studio__reviews-media--${index + 1}`}
              src={editorialImage(index)}
              alt={alt}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    );
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    setFileLabel(event.target.files?.[0]?.name || 'No photo selected.');
  }

  function renderReviewForm() {
    const submit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFeedback('The local documentation fixture received the submit request. Nothing was uploaded or persisted.');
    };
    const resetReviewFields = () => {
      setFormRating(4);
      setReviewTitle('A thoughtful piece');
      setReviewBody('The form and glaze work beautifully together.');
      setReviewTopic('product');
      setFileLabel('No photo selected.');
      setFeedback('');
    };
    return (
      <form ref={reviewFormRef} className="review-form" aria-label={String(values.label || '') || undefined} onSubmit={submit} onReset={resetReviewFields}>
        <div className="review-form__fields">
          {values.rating === true && (
            <div className="review-form__group">
              <StarInput
                idPrefix={`${id}-form-rating`}
                label="Your rating (required)"
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
                <input className="input__field" id={`${id}-review-title`} name="review-title" type="text" value={reviewTitle} aria-describedby={`${id}-review-title-message`} onChange={(event) => setReviewTitle(event.target.value)} />
              </div>
              <span className="input__message" id={`${id}-review-title-message`}>Summarize your experience.</span>
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
              <select className="select__field" id={`${id}-review-topic`} name="review-topic" value={reviewTopic} aria-describedby={`${id}-review-topic-message`} onChange={(event) => setReviewTopic(event.target.value)}>
                <option value="product">Product</option>
                <option value="delivery">Delivery</option>
                <option value="service">Service</option>
              </select>
              <span className="select__message" id={`${id}-review-topic-message`}>Topic selected.</span>
            </div>
          )}
          {values.photoUpload === true && (
            <label className={`file-upload${fileLabel === 'No photo selected.' ? '' : ' file-upload--selected'}`}>
              <input className="file-upload__input" id={`${id}-review-photo`} name="review-photo" type="file" accept="image/*" aria-labelledby={`${id}-review-photo-label`} aria-describedby={`${id}-review-photo-hint`} onChange={handlePhotoChange} />
              <Upload className="file-upload__icon" aria-hidden="true" />
              <span className="file-upload__text" id={`${id}-review-photo-label`}>Add a review photo</span>
              <span className="file-upload__hint" id={`${id}-review-photo-hint`}>This documentation fixture accepts image files; production policy is target-owned.</span>
              <span className="file-upload__status" role="status" data-empty-label="No photo selected.">{fileLabel}</span>
            </label>
          )}
        </div>
        {values.submitAction === true && <div className="review-form__actions"><button className="btn" type="submit">Submit review</button></div>}
        {values.status === true && <p className="review-form__status" role="status" aria-live="polite">{feedback}</p>}
      </form>
    );
  }

  function renderToolbar() {
    if (values.control !== true && values.writeAction !== true) return null;

    return (
      <div className="review-toolbar" role="group" aria-label={String(values.label || '') || undefined}>
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
    return (
      <PaginationArtwork
        className="review-pagination"
        label={String(values.label)}
        currentPage={Number(values.currentPage) || 1}
        pageItems={values.pageItems === true}
        onPageChange={(page) => {
          setValues((current) => ({ ...current, currentPage: page }));
          setFeedback(`Page ${page} selected only in this documentation fixture; no reviews were fetched.`);
        }}
      />
    );
  }

  function renderPreview() {
    if (contract.slug === 'review-summary') return renderSummary();
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
