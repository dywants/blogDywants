/* eslint-disable prettier/prettier */
import Link from 'next/link';

import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import Metadata from 'components/Metadata';
import { authorPathByName } from 'lib/users';

import { FaMapPin } from 'react-icons/fa';
import styles from './PostCard.module.scss';

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories, isSticky = false, featuredImage } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('author')) {
    metadata.author = author;
  }

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }

  let postCardStyle = styles.postCard;

  if (isSticky) {
    postCardStyle = `${postCardStyle} ${styles.postCardSticky}`;
  }

  return (
    <div className={postCardStyle}>
      <div className={styles.headerImage}>
        {featuredImage ? (
          <img src={featuredImage.sourceUrl} alt={title} className={styles.image} />
        ) : <img src="/assets/images/home/test2.jpg" alt="" className={styles.image} />}
        <div className={styles.metaCategory}>
          {categories.map((category, index) => {
            return (
              <Link key={index} href={categoryPathBySlug(category.slug)}>
                <a className={styles.category}>{category.name}</a>
              </Link>
            );
          })}
        </div>
      </div>
      <div className={styles.bodyCard}>
        {isSticky && <FaMapPin aria-label="Sticky Post" />}
        <Metadata className={styles.postCardMetadata} {...metadata} />
        <Link href={postPathBySlug(slug)}>
          <a>
            <h3
              className={styles.postCardTitle}
              dangerouslySetInnerHTML={{
                __html: title,
              }}
            />
          </a>
        </Link>
        {excerpt && (
          <div
            className={styles.postCardContent}
            dangerouslySetInnerHTML={{
              __html: sanitizeExcerpt(excerpt),
            }}
          />
        )}
        {author && (
          <div className={styles.metadataAuthor}>
            <address className={styles.metaAuthor}>
              {author.avatar && (
                <img
                  width={author.avatar.width}
                  height={author.avatar.height}
                  src={author.avatar.url}
                  alt="Author Avatar"
                />
              )}
              By{' '}
              <Link href={authorPathByName(author.name)}>
                <a rel="author">{author.name}</a>
              </Link>
            </address>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
