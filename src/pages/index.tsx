import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiUser3Line } from 'react-icons/ri'

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import Prismic from '@prismicio/client'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react';
import { useRouter } from 'next/router';

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

export default function Home({ postsPagination }: HomeProps) {
  const [ posts, setPosts ] = useState(postsPagination?.results || [])
  const [ nextPage, setNextPage ] = useState<string | null>(postsPagination.next_page)


  const loadMore = async () => {
    const response = await fetch(nextPage)
    const data = await response.json()

    setPosts(state => [ ...state, ...data.results ])
    setNextPage(data.next_page)
  }

  return (
    <>
      <Head>
        <title>Posts | Spacetraveling </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.postList}>


          {posts.map(post => {
            return (
              <Link key={post.uid} href={`/post/${post.uid}`}>
                <div className={styles.postContent}>
                  <strong>{post.data.title}</strong>
                  <p>{post.data.subtitle}</p>
                  <div className={styles.postInfo}>
                    <div>
                      <AiOutlineCalendar />
                      <time>
                        {format(new Date(post.first_publication_date), 'dd MMM yyyy').toLocaleLowerCase()}
                      </time>
                    </div>
                    <div>
                      <RiUser3Line />
                      <span>{post.data.author}</span>
                    </div>

                  </div>
                </div>
              </Link>

            )
          })}
          {nextPage && (
            <div onClick={loadMore} className={styles.loadMore}>
              <span>Carregar mais posts</span>
            </div>
          )}

        </div>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.subtitle', 'publication.author'],
    pageSize: 1,
  });


  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  return {
    props: {
      postsPagination: {
        // next_page: postsResponse.total_pages > postsResponse.page ? postsResponse.page + 1 : null,
        next_page: postsResponse.next_page,
        results
      }
    }
  }
};
