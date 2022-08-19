import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetStaticProps
} from 'next'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import React, { useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const pageData = {
    title: 'SiteSearch',
    heading: 'Site Search Service',
    description:
      'Site search tracking gives you insights into how visitors interact with the search engine on your website - what they search for and how many results they get back.',
    methods: [
      {
        method: 'trackSiteSearch',
        usage:
          'SiteSearch.trackSiteSearch(keyword: string, category?: string, searchCount?: number, dimensions?: Object)',
        desc: 'Tracks search requests on a website.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const SiteSearchPage: NextPage<InferGetServerSidePropsType<GetStaticProps>> = ({
  pageData
}: {
  pageData: any
}) => {
  const { SiteSearch } = usePiwikPro()

  useEffect(() => {
    // function trackSiteSearch(keyword: string, category?: string | undefined, searchCount?: number | undefined, dimensions?: Object | undefined): void
    SiteSearch.trackSiteSearch('keyword', 'category', 5)
  }, [])

  return (
    <Layout>
      <Head>
        <title>{pageData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{pageData.heading}</h1>
        <div>
          <p>{pageData.description}</p>
        </div>
        <h2 className={utilStyles.headingXl}>Import</h2>
        <div>
          <p>
            <code>
              {`import { usePiwikPro } from '@piwikpro/next-piwik-pro'`}
              <br />
              {'const { SiteSearch } = usePiwikPro()'}
            </code>
          </p>
        </div>
        <h2 className={utilStyles.headingXl}>Methods</h2>
        <div>
          <ul className={utilStyles.list}>
            {pageData.methods.map(({ usage, desc, method }) => (
              <li className={utilStyles.listItem} key={method}>
                <code>{usage}</code> - {desc}
              </li>
            ))}
          </ul>
        </div>
        <h2 className={utilStyles.headingXl}>Sample usage</h2>
        <p>
          To see tracking methods usage please turn developers tools in your
          browser and track results on the console.
        </p>
        <p>
          You can use methods from that collection in page props for example{' '}
          <code>useEffect</code> (methods are invoked when the page starts) or
          as on example below on the button click using <code>onClick</code>{' '}
          prop.
        </p>
        <div>
          <button
            onClick={() => {
              SiteSearch.trackSiteSearch('keyword', 'button', 4)
            }}
          >
            SiteSearch.trackSiteSearch
          </button>
        </div>
      </article>
    </Layout>
  )
}

export default SiteSearchPage
