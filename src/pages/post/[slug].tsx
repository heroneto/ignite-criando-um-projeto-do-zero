import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiUser3Line } from 'react-icons/ri'
import { BiTimeFive } from 'react-icons/bi'
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post() {
  return (
    <>
      <Head>
        <title>Post | como-utilizar-hooks</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.banner}>
          <img src='/Banner.jpg' alt='banner' />
        </div>
        
        <article className={styles.postContent}>
          <div>
            <strong >
            Criando um app CRA do zero
            </strong>
            <div className={styles.postInfo}>
              <div>
                <AiOutlineCalendar />
                <time>15 Mar 2021</time>
              </div>
              <div>
                <RiUser3Line />
                <span>Joseph Oliveira</span>
              </div>
                <BiTimeFive />
                <span>4 min</span>
              <div>
                
              </div>
            </div>
            {/* HERE POST DATA */}
          </div>
        </article>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
