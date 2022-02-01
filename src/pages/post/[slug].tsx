import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { AiOutlineCalendar } from 'react-icons/ai'
import { RiUser3Line } from 'react-icons/ri'
import { BiTimeFive } from 'react-icons/bi'
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { RichText } from 'prismic-dom';
import React from 'react';

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
      };
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {

  console.log('post', post)
  return (
    <>
      <Head>
        <title>{post?.data.title}</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.banner}>
          <img src={post?.data.banner.url} alt='banner' />
        </div>

        <article className={styles.post}>
          <div>
            <strong>
              {post?.data.title}
            </strong>
            <div className={styles.postInfo}>
              <div>
                <AiOutlineCalendar />
                <time>{post?.first_publication_date}</time>
              </div>
              <div>
                <RiUser3Line />
                <span>{post?.data.author}</span>
              </div>
              <div>
                <BiTimeFive />
                <span>4 min</span>
              </div>
              <div>

              </div>
            </div>


            {post?.data.content.map(content => {
              return (
                <React.Fragment key={content.heading}>
                  <div className={styles.postContentHeading}>
                    <span>{content.heading}</span>
                  </div>
                  <div
                    className={styles.postContentText}
                    dangerouslySetInnerHTML={{ __html: content.body.text }}
                  />
                </React.Fragment>
              )
            })}


            {/* HERE POST DATA */}
          </div>
        </article>
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [
    ],
    fallback: true
  }
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('publication', String(slug), {});


  const { first_publication_date, data } = response

  const post = {
    first_publication_date: new Date(first_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    data: {
      title: data.title,
      banner: {
        url: data.banner.url
      },
      author: data.author,
      content: data.content.map(content => {
        return {
          heading: content.heading,
          body: {
            text: RichText.asHtml(content.body)
          }
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
