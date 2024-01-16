import Head from 'next/head'
import utilStyles from '@/styles/utils.module.css'
import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

const EXAMPLES: string[] = [
  'ContentTracking',
  'CustomDimensions',
  'CustomEvent',
  'DataLayer',
  'DownloadAndOutlink',
  'eCommerce',
  'GoalConversions',
  'SiteSearch',
  'UserManagement'
]

export const metadata: Metadata = {
  title: 'Piwik PRO - Nextjs 13 examples',
}

export default function Home() {
  return (
    <>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Examples of usage </h2>
        <ul className={utilStyles.list}>
          {EXAMPLES.map((id) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/${id}`}>
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
