import type {
  ChangeEventHandler,
  ElementType,
  FormEventHandler,
  MouseEvent,
  ReactNode,
} from 'react';
import { Heart, Lightbulb, MessageCircle, Reply } from 'lucide-react';
import AvatarArtwork from './AvatarArtwork';
import EmptyStateArtwork from './EmptyStateArtwork';
import PaginationArtwork from './PaginationArtwork';
import TextareaArtwork from './TextareaArtwork';

type CommentSectionHeadingLevel = 2 | 3 | 4 | 5 | 6;

interface CommentSectionArtworkProps {
  id: string;
  title: string;
  count?: string;
  orderControl?: ReactNode;
  thread: ReactNode;
  pagination?: ReactNode;
  composer?: ReactNode;
  headingLevel?: CommentSectionHeadingLevel;
  className?: string;
}

export interface CommentReactionArtworkItem {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
  selected: boolean;
  disabled: boolean;
}

export interface CommentArtworkRecord {
  key: string;
  author: string;
  initials: string;
  dateTime: string;
  dateLabel: string;
  text: string;
  reactions: readonly CommentReactionArtworkItem[];
  replies?: readonly CommentArtworkRecord[];
}

interface CommentThreadFixtureProps {
  id: string;
  records?: readonly CommentArtworkRecord[];
  onReactionRequest?: (
    event: MouseEvent<HTMLButtonElement>,
    commentKey: string,
    reactionId: string,
  ) => void;
  onReply?: (event: MouseEvent<HTMLButtonElement>, label: string) => void;
}

interface CommentComposerFixtureProps {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

interface CommentOrderFixtureProps {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

interface CommentPaginationFixtureProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface FlattenedReply {
  record: CommentArtworkRecord;
  replyToLabel?: string;
}

export const commentsFixture: readonly CommentArtworkRecord[] = [
  {
    key: 'ana-ruiz',
    author: 'Ana Ruiz',
    initials: 'AR',
    dateTime: '2026-07-12',
    dateLabel: 'Today',
    text: 'The notes about repetition feel true in every material practice.',
    reactions: [
      {
        id: 'like',
        label: "Like Ana Ruiz's comment",
        icon: <Heart aria-hidden="true" />,
        count: 4,
        selected: false,
        disabled: false,
      },
      {
        id: 'useful',
        label: "Mark Ana Ruiz's comment as useful",
        icon: <Lightbulb aria-hidden="true" />,
        count: 2,
        selected: true,
        disabled: false,
      },
    ],
    replies: [
      {
        key: 'marina-paz',
        author: 'Marina Paz',
        initials: 'MP',
        dateTime: '2026-07-12',
        dateLabel: 'Today',
        text: 'Exactly. Repetition creates enough quiet to notice what changed.',
        reactions: [
          {
            id: 'like',
            label: "Like Marina Paz's comment",
            icon: <Heart aria-hidden="true" />,
            count: 1,
            selected: false,
            disabled: false,
          },
        ],
        replies: [
          {
            key: 'leo-ibarra',
            author: 'Leo Ibarra',
            initials: 'LI',
            dateTime: '2026-07-12',
            dateLabel: 'Today',
            text: 'That quiet is where the smallest material decisions become visible.',
            reactions: [],
          },
        ],
      },
    ],
  },
] as const;

export function updateCommentReactionFixture(
  records: readonly CommentArtworkRecord[],
  commentKey: string,
  reactionId: string,
): readonly CommentArtworkRecord[] {
  return records.map((record) => ({
    ...record,
    reactions: record.key === commentKey
      ? record.reactions.map((reaction) => (
        reaction.id === reactionId && !reaction.disabled
          ? { ...reaction, selected: !reaction.selected }
          : reaction
      ))
      : record.reactions,
    replies: record.replies
      ? updateCommentReactionFixture(record.replies, commentKey, reactionId)
      : undefined,
  }));
}

function flattenReplies(
  records: readonly CommentArtworkRecord[],
  parentAuthor?: string,
): readonly FlattenedReply[] {
  return records.flatMap((record) => [
    {
      record,
      ...(parentAuthor ? { replyToLabel: `Replying to ${parentAuthor}` } : {}),
    },
    ...(record.replies?.length
      ? flattenReplies(record.replies, record.author)
      : []),
  ]);
}

function CommentFixtureArticle({
  rootId,
  record,
  replyToLabel,
  onReactionRequest,
  onReply,
}: {
  rootId: string;
  record: CommentArtworkRecord;
  replyToLabel?: string;
  onReactionRequest?: CommentThreadFixtureProps['onReactionRequest'];
  onReply?: CommentThreadFixtureProps['onReply'];
}) {
  const authorId = `${rootId}-${record.key}-author`;
  const dateId = `${rootId}-${record.key}-date`;
  const reactionsLabel = `Reactions to ${record.author}'s comment`;

  return (
    <article className="comment" aria-labelledby={`${authorId} ${dateId}`}>
      <AvatarArtwork
        name={record.author}
        content={record.initials}
        redundant
        className="comment__avatar"
      />
      <div className="comment__body">
        <header className="comment__header">
          <span className="comment__author" id={authorId} dir="auto">{record.author}</span>
          <time className="comment__date" id={dateId} dateTime={record.dateTime}>{record.dateLabel}</time>
        </header>
        <div className="comment__content">
          {replyToLabel ? <p className="comment__reply-to" dir="auto">{replyToLabel}</p> : null}
          <p className="comment__text" dir="auto">{record.text}</p>
        </div>
        {onReply || record.reactions.length > 0 ? (
          <footer className="comment__actions">
            {onReply ? (
              <button
                className="btn btn--link btn--sm comment__action"
                type="button"
                aria-label={`Reply to ${record.author}`}
                onClick={(event) => onReply(event, `Reply to ${record.author}`)}
              >
                <Reply className="btn__icon btn__icon--leading" aria-hidden="true" />
                Reply
              </button>
            ) : null}
            {record.reactions.length > 0 ? (
              <div className="comment__reactions" role="group" aria-label={reactionsLabel}>
                {record.reactions.map((reaction) => (
                  <button
                    className="toggle comment__reaction"
                    type="button"
                    aria-label={reaction.label}
                    aria-pressed={reaction.selected}
                    disabled={reaction.disabled}
                    data-reaction-id={reaction.id}
                    key={reaction.id}
                    onClick={(event) => onReactionRequest?.(event, record.key, reaction.id)}
                  >
                    {reaction.icon ? <span className="comment__reaction-icon" aria-hidden="true">{reaction.icon}</span> : <span>{reaction.label}</span>}
                    {reaction.count != null ? <span className="comment__reaction-count" aria-hidden="true">{reaction.count}</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </footer>
        ) : null}
      </div>
    </article>
  );
}

function CommentFixtureList({
  rootId,
  records,
  onReactionRequest,
  onReply,
}: {
  rootId: string;
  records: readonly CommentArtworkRecord[];
  onReactionRequest?: CommentThreadFixtureProps['onReactionRequest'];
  onReply?: CommentThreadFixtureProps['onReply'];
}) {
  return (
    <ol className="comments__thread">
      {records.map((record) => {
        const flattenedReplies = flattenReplies(record.replies ?? []);
        return (
          <li className="comments__item" key={record.key}>
            <CommentFixtureArticle
              rootId={rootId}
              record={record}
              onReactionRequest={onReactionRequest}
              onReply={onReply}
            />
            {flattenedReplies.length > 0 ? (
              <ol className="comment__replies">
                {flattenedReplies.map((reply) => (
                  <li className="comments__item" key={reply.record.key}>
                    <CommentFixtureArticle
                      rootId={rootId}
                      record={reply.record}
                      replyToLabel={reply.replyToLabel}
                      onReactionRequest={onReactionRequest}
                      onReply={onReply}
                    />
                  </li>
                ))}
              </ol>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function CommentThreadFixture({
  id,
  records = commentsFixture,
  onReactionRequest,
  onReply,
}: CommentThreadFixtureProps) {
  const rootId = id.trim();
  if (!rootId || records.length === 0) return null;
  return (
    <CommentFixtureList
      rootId={rootId}
      records={records}
      onReactionRequest={onReactionRequest}
      onReply={onReply}
    />
  );
}

export function CommentOrderFixture({ id, value, onChange }: CommentOrderFixtureProps) {
  const selectId = id.trim();
  if (!selectId) return null;
  return (
    <div className="select comments__order">
      <label className="select__label" htmlFor={selectId}>Order comments</label>
      <div className="select__control">
        <select
          className="select__field"
          id={selectId}
          name="comment-order"
          value={value}
          onChange={onChange}
        >
          <option value="oldest">Oldest first</option>
          <option value="newest">Newest first</option>
        </select>
      </div>
    </div>
  );
}

export function CommentPaginationFixture({
  currentPage,
  onPageChange,
}: CommentPaginationFixtureProps) {
  return (
    <PaginationArtwork
      className="comments__pagination"
      label="Comment pages"
      currentPage={currentPage}
      pageItems
      onPageChange={onPageChange}
    />
  );
}

export function CommentEmptyFixture() {
  return (
    <EmptyStateArtwork
      className="comments__empty"
      title="No comments yet"
      titleElement="h3"
      message="The conversation is ready when someone has something to add."
      icon={<MessageCircle aria-hidden="true" />}
    />
  );
}

export function CommentComposerFixture({
  id,
  value,
  onChange,
  onSubmit,
}: CommentComposerFixtureProps) {
  const rootId = id.trim();
  if (!rootId) return null;

  const titleId = `${rootId}-title`;
  return (
    <form className="comment-form" aria-labelledby={titleId} onSubmit={onSubmit}>
      <h3 className="comment-form__title" id={titleId}>Join the conversation</h3>
      <TextareaArtwork
        id={`${rootId}-message`}
        label="Comment"
        name="comment"
        value={value}
        required
        rows={4}
        onChange={onChange}
      />
      <button className="btn" type="submit">
        <MessageCircle className="btn__icon btn__icon--leading" aria-hidden="true" />
        Preview comment
      </button>
    </form>
  );
}

export default function CommentSectionArtwork({
  id,
  title,
  count = '',
  orderControl,
  thread,
  pagination,
  composer,
  headingLevel = 2,
  className = '',
}: CommentSectionArtworkProps) {
  const rootId = id.trim();
  const visibleTitle = title.trim();
  const visibleCount = count.trim();
  if (!rootId || !visibleTitle || thread == null || thread === false) return null;

  const Heading = `h${headingLevel}` as ElementType;
  const titleId = `${rootId}-title`;

  return (
    <section
      className={['comments', className.trim()].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <Heading className="comments__title" id={titleId} dir="auto">
        {visibleTitle}
        {visibleCount ? <span className="comments__count" dir="auto"> {visibleCount}</span> : null}
      </Heading>
      {orderControl ? <div className="comments__toolbar">{orderControl}</div> : null}
      {thread}
      {pagination ?? null}
      {composer ?? null}
    </section>
  );
}
