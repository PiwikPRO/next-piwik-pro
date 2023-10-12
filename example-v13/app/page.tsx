import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import React from 'react'
import Link from 'next/link'

const EXAMPLES: string[] = [
  'ContentTracking',
  'CustomDimensions',
  'CustomEvent',
  'DataLayer',
  'DownloadAndOutlink',
  'eCommerce',
  'GoalConversions',
  'SiteSearch'
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Piwik Pro - Nextjs 13 examples</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Examples of usage </h2>
        <ul className={utilStyles.list}>
          {EXAMPLES.map((id) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/examples/${id}`}>
                {id}
              </Link>
              <br/>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
