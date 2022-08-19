import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { GetStaticProps } from 'next'
import React from 'react'
import { getAllPostIds } from '../lib/posts'
import Link from 'next/link'

export default function Home({ ids: examples }: { ids: string[] }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Examples of usage </h2>
        <ul className={utilStyles.list}>
          {examples.map((id) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/examples/${id}`}>
                <a>{id}</a>
              </Link>
              <br />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const examples = getAllPostIds()

  return {
    props: {
      ids: examples
    }
  }
}
