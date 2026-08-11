import { Children, type MouseEvent, type ReactNode } from 'react';
import { Link2, Mail } from 'lucide-react';

interface AuthorCardArtworkProps {
  name: string;
  avatar?: ReactNode;
  role?: string;
  bio?: string;
  links?: ReactNode;
  variant?: 'full' | 'compact' | string;
  className?: string;
}

interface AuthorCardAvatarFixtureProps {
  compact?: boolean;
}

interface AuthorCardLinksFixtureProps {
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>, label: string) => void;
}

function hasRenderableContent(content: ReactNode): boolean {
  return Children.toArray(content).some((node) => (
    typeof node !== 'string' || node.trim().length > 0
  ));
}

export const authorCardFixture = {
  name: 'Marina Paz',
  role: 'Ceramic artist and writer',
  bio: 'Marina writes about material practice, studio rituals, and the lives objects gather through use.',
};

export default function AuthorCardArtwork({
  name,
  avatar,
  role = '',
  bio = '',
  links,
  variant = 'full',
  className = '',
}: AuthorCardArtworkProps) {
  const authorName = name.trim();
  if (!authorName) return null;

  const compact = variant === 'compact';
  const authorRole = role.trim();
  const authorBio = bio.trim();
  const hasLinks = hasRenderableContent(links);

  return (
    <div
      className={[
        'author-card',
        compact ? 'author-card--compact' : null,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
    >
      {hasRenderableContent(avatar) && avatar}
      <div className="author-card__info">
        <p className="author-card__name" dir="auto">{authorName}</p>
        {authorRole && <p className="author-card__role" dir="auto">{authorRole}</p>}
        {!compact && authorBio && <p className="author-card__bio" dir="auto">{authorBio}</p>}
        {!compact && hasLinks && <div className="author-card__links">{links}</div>}
      </div>
    </div>
  );
}

export function AuthorCardAvatarFixture({ compact = false }: AuthorCardAvatarFixtureProps) {
  return (
    <span
      className={[
        'avatar',
        compact ? null : 'avatar--lg',
        'author-card__avatar',
        'docs-studio__blog-avatar',
      ].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      MP
    </span>
  );
}

export function AuthorCardLinksFixture({ onNavigate }: AuthorCardLinksFixtureProps) {
  const navigate = (event: MouseEvent<HTMLAnchorElement>, label: string) => {
    onNavigate?.(event, label);
  };

  return (
    <>
      <a
        className="link link--nav author-card__link"
        href="mailto:studio@example.com"
        rel="author"
        dir="auto"
        onClick={(event) => navigate(event, 'Author email link')}
      >
        <Mail size={18} aria-hidden="true" />
        Email
      </a>
      <a
        className="link link--nav author-card__link"
        href="#author-profile"
        rel="author"
        dir="auto"
        onClick={(event) => navigate(event, 'Author profile link')}
      >
        <Link2 size={18} aria-hidden="true" />
        Profile
      </a>
    </>
  );
}
