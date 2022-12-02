import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import React, { useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const pageData = {
    title: 'PageViews',
    heading: 'Send page views and virtual page views',
    description:
      'Page views are tracked automatically but method can be invoked manually with specified parameters.',
    methods: [
      {
        method: 'trackEvent',
        usage:
          'PageViews.trackEvent(category: string, action: string, name?: string | undefined, value?: number | undefined): void',
        desc: 'Tracks manual content impression event.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const PageViewsPage: NextPage<
  InferGetServerSidePropsType<GetServerSideProps<{ pageData: any }>>
> = ({ pageData }: { pageData: any }) => {
  const { PageViews } = usePiwikPro()

  useEffect(() => {
    // function trackPageView(customPageTitle?: string | undefined): void
    PageViews.trackPageView('optional title')
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
              {'const { PageViews } = usePiwikPro()'}
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
              PageViews.trackPageView('optional title from button')
            }}
          >
            PageViews.trackPageView
          </button>
        </div>
      </article>
    </Layout>
  )
}

export default PageViewsPage
