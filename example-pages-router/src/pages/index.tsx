import Link from 'next/link'
import { Metadata } from 'next'
import React from 'react'

const EXAMPLES: string[] = [
  'ContentTracking',
  'CustomDimensions',
  'CustomEvent',
  'DataLayer',
  'DownloadAndOutlink',
  'eCommerce',
  'GoalConversions',
  'SiteSearch',
  'UserManagement',
  'PageViews'
]

export const metadata: Metadata = {
  title: 'Piwik PRO - Nextjs 13 examples'
}

const Home = () => {
  return (
    <>
      <section className='container mx-auto my-16'>
        <div className='prose mb-10'>
          <h2>Examples of usage </h2>
        </div>
        <ul className='menu bg-base-200 rounded-box w-56'>
          {EXAMPLES.map((id) => (
            <li key={id}>
              <Link href={`/${id}`}>{id}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Home
