import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiUser3Line } from 'react-icons/ri'
import { BiTimeFive } from 'react-icons/bi'
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Prismic from '@prismicio/client'

import React from 'react';
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useRouter } from 'next/router';
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

export default function Post({ post }: PostProps) {
  const router = useRouter()

  if(router.isFallback){
    return <div>Carregando...</div>
  }

  return (
    <>
      <Head>
        <title>{post?.data.title}</title>
      </Head>


      <main className={styles.container}>
        {post && (
          <>
            <div className={styles.banner}>
              <img src={post.data.banner.url} alt='banner' />
            </div>

            <article className={styles.post}>
              <div>
                <strong className={styles.postTitle}>
                  {post.data.title}
                </strong>
                <div className={styles.postInfo}>
                  <div>
                    <AiOutlineCalendar />
                    <time>  {post.first_publication_date && format(new Date(post.first_publication_date), 'dd MMM yyyy').toLocaleLowerCase()}</time>
                  </div>
                  <div>
                    <RiUser3Line />
                    <span>{post.data.author}</span>
                  </div>
                  <div>
                    <BiTimeFive />
                    <span>4 min</span>
                  </div>
                  <div>

                  </div>
                </div>


                {post.data.content.map(content => {
                  return (
                    <React.Fragment key={content.heading}>
                      <div className={styles.postContentHeading}>
                        <span>{content.heading}</span>
                      </div>
                      {content.body.map(body => (
                        <div
                          key={body.text}
                          className={styles.postContentText}
                          dangerouslySetInnerHTML={{ __html: body.text }}
                        />
                      ))}



                    </React.Fragment>
                  )
                })}
              </div>
            </article>
          </>
        )}

      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const prismic = getPrismicClient()
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.uid'],
    pageSize: 100
  })

  const staticPaths = response.results.map(res => {
    return {
      params: {
        slug: res.uid
      }
    }
  })

  

  return {
    paths: staticPaths,
    fallback: true
  }
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('publication', String(slug), {});


  const { first_publication_date, data } = response


  const post = {
    uid: response.uid,
    first_publication_date: first_publication_date,
    data: {
      title: data.title,
      subtitle: data.subtitle,
      banner: {
        url: data.banner.url
      },
      author: data.author,
      content: data.content.map(content => {
        return {
          heading: content.heading,
          body: content.body
        }
      })
    }
  }
  return {
    props: {
      post: post
    }
  }
};
