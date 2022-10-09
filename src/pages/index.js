/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable prettier/prettier */
import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import Pagination from 'components/Pagination';

import styles from 'styles/pages/Home.module.scss';
import asides from '../components/Aside/aside.module.scss';
import SubscribeForm from 'components/SubscribeForm/SubscribeForm';

export default function Home({ posts, pagination }) {
  const { metadata = {} } = useSite();
  const { title } = metadata;

  return (
      <Layout>
        <WebsiteJsonLd siteTitle={title} />
        <Header>
          <div className={styles.wrapperHeader}>
            <h1>Blog</h1>
            <p>Bienvenue sur notre blog</p>
          </div>
        </Header>

        <Section>
          <Container>
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <h2 className="sr-only">Posts</h2>
                <ul className={styles.posts}>
                  {posts.map((post) => {
                    return (
                      <li key={post.slug}>
                        <PostCard post={post} />
                      </li>
                    );
                  })}
                </ul>
              </div>
              <aside className={styles.side}>
                <section className={asides.asidePopularPost}>
                  <h2>Popular Post</h2>
                  <div className={asides.cardPopularPost}>
                    <img src='/assets/images/home/test2.jpg' alt="image post"/>
                    <div className={asides.cardTitle}>
                      <h3>13 things i’d Tell Any NewTravler </h3>
                      <span>08 January 2021</span>
                    </div>
                  </div>
                  <div className={asides.cardPopularPost}>
                    <img src='/assets/images/home/test2.jpg'/>
                    <div className={asides.cardTitle}>
                      <h3>13 things i’d Tell Any NewTravler </h3>
                      <span>08 January 2021</span>
                    </div>
                  </div>
                </section>
                <section className={asides.newsletter}>
                  <SubscribeForm/>
                </section>
              </aside>
            </div>
            {pagination && (
              <Pagination
                addCanonical={false}
                currentPage={pagination?.currentPage}
                pagesCount={pagination?.pagesCount}
                basePath={pagination?.basePath}
              />
            )}
          </Container>
        </Section>
      </Layout>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'archive',
  });
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/posts',
      },
    },
  };
}
