import { Children, type ReactNode } from 'react';
import { editorialMedia } from './editorialMedia';
import ProductCardArtwork from './ProductCardArtwork';

interface ArticleBodyArtworkProps {
  content: ReactNode;
  dropCap?: boolean;
  className?: string;
}

function hasRenderableContent(content: ReactNode): boolean {
  return Children.toArray(content).some((node) => (
    typeof node !== 'string' || node.trim().length > 0
  ));
}

export default function ArticleBodyArtwork({
  content,
  dropCap = false,
  className = '',
}: ArticleBodyArtworkProps) {
  if (!hasRenderableContent(content)) return null;

  return (
    <div
      className={[
        'article-body',
        'prose',
        dropCap ? 'article-body--drop-cap' : null,
        className.trim() || null,
      ].filter(Boolean).join(' ')}
    >
      {content}
    </div>
  );
}

export function ArticleBodyFixture() {
  return (
    <>
      <p>
        Before the studio wakes, clay is already responding to weather,
        moisture, and the memory of yesterday&apos;s hands. The{' '}
        <a href="#firing-records">kiln notebook</a> keeps those quiet changes visible.
      </p>

      <h2>Learning through repetition</h2>
      <p>
        Making the same form again is never truly repetition. Each pass reveals
        a different pressure point and a more economical gesture.
      </p>
      <ul>
        <li>Record the weight of the clay before throwing.</li>
        <li>Photograph the profile at leather-hard stage.</li>
        <li>Compare the fired rim before changing the next batch.</li>
      </ul>

      <figure className="article-body__pull-quote">
        <blockquote cite="https://example.com/studio-notes">
          <p>Attention is part of the material.</p>
        </blockquote>
        <figcaption className="article-body__pull-quote-attribution">
          Marina Paz, <cite>Studio Notes</cite>
        </figcaption>
      </figure>

      <div className="article-body__callout article-body__callout--note">
        <div>
          <strong>Studio note</strong>
          <p>Static authored guidance remains ordinary content, not an alert.</p>
        </div>
      </div>

      <figure>
        <img
          src={editorialMedia.ceramicsShelves}
          alt="Ceramic vessels arranged on open studio shelves"
        />
        <figcaption>Test forms grouped by clay body and firing temperature.</figcaption>
      </figure>

      <div className="prose-excluded article-body__commerce-island">
        <ProductCardArtwork
          title="Wheel-thrown stoneware vessel"
          href="#featured-vessel"
          imageAlt="Warm stoneware vessel with a softly faceted profile"
          mediaRatio="portrait"
          vendor="Marina Paz Studio"
          description="One of one"
          currentPrice="$180.00"
          currentPriceLabel="Price"
        />
      </div>

      <h3 id="firing-records">Keeping useful firing records</h3>
      <p>
        Small observations become a practical archive. A recipe name such as{' '}
        <code>ash-white-06</code> is useful only when the firing context travels with it.
      </p>

      <div className="prose__overflow article-body__overflow" role="region" aria-label="Glaze recipe code" tabIndex={0}>
        <pre><code>{'recipe = { clay: "stoneware", cone: 6, holdMinutes: 12, cooling: "slow" };'}</code></pre>
      </div>

      <div className="prose__overflow article-body__overflow" role="region" aria-label="Firing schedule" tabIndex={0}>
        <table>
          <caption>Sample firing schedule</caption>
          <thead>
            <tr>
              <th scope="col">Stage</th>
              <th scope="col">Temperature</th>
              <th scope="col">Rate</th>
              <th scope="col">Hold</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Candling</th>
              <td>93°C</td>
              <td>45°C/hour</td>
              <td>2 hours</td>
            </tr>
            <tr>
              <th scope="row">Maturity</th>
              <td>1222°C</td>
              <td>60°C/hour</td>
              <td>12 minutes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
