import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiUser3Line } from 'react-icons/ri'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Posts | Spacetraveling </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.postList}>

          <Link href={'/post/como-utilizar-hooks'}>
            <div className={styles.postContent}>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <div className={styles.postInfo}>
                <div>
                  <AiOutlineCalendar />
                  <time>
                    15 Mar 2021
                  </time>
                </div>
                <div>
                  <RiUser3Line />
                  <span>Joseph Oliveira</span>
                </div>

              </div>
            </div>
          </Link>

          <Link href={'/post/como-utilizar-hooks'}>
            <div className={styles.postContent}>
              <strong>Como utilizar Hooks</strong>
              <p>Pensando em sincronização em vez de ciclos de vida.</p>
              <div className={styles.postInfo}>
                <div>
                  <AiOutlineCalendar />
                  <time>
                    15 Mar 2021
                  </time>
                </div>
                <div>
                  <RiUser3Line />
                  <span>Joseph Oliveira</span>
                </div>

              </div>
            </div>
          </Link>


        </div>
      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
