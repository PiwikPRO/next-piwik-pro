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
    title: 'ContentTracking',
    heading: 'Content Tracking Service',
    description:
      'Content Tracking lets you track what content is visible on your site and how users interact with it.',
    methods: [
      {
        method: 'trackContentImpression',
        usage:
          'ContentTracking.trackContentImpression(contentName: string, contentPiece: string, contentTarget: string)',
        desc: 'Tracks manual content impression event.'
      },
      {
        method: 'trackContentInteraction',
        usage:
          'ContentTracking.trackContentInteraction(contentInteraction: string, contentName: string, contentPiece: string, contentTarget: string)',
        desc: 'Tracks manual content interaction event.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const ContentTrackingPage: NextPage<
  InferGetServerSidePropsType<GetStaticProps>
> = ({ pageData }: { pageData: any }) => {
  const { ContentTracking } = usePiwikPro()

  useEffect(() => {
    // function trackContentImpression(contentName: string, contentPiece: string, contentTarget: string): void
    ContentTracking.trackContentImpression(
      'contentName',
      'contentPiece',
      'contentTarget'
    )
    // function trackContentInteraction(contentInteraction: string, contentName: string, contentPiece: string, contentTarget: string): void
    ContentTracking.trackContentInteraction(
      'contentInteraction',
      'contentName',
      'contentPiece',
      'contentTarget'
    )
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
              {'const { ContentTracking } = usePiwikPro()'}
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
              ContentTracking.trackContentImpression(
                'contentName',
                'contentPiece',
                'contentTarget'
              )
            }}
          >
            ContentTracking.trackEvent
          </button>
          <button
            onClick={() => {
              ContentTracking.trackContentInteraction(
                'contentInteraction',
                'contentName',
                'contentPiece',
                'contentTarget'
              )
            }}
          >
            ContentTracking.trackContentInteraction
          </button>
        </div>
      </article>
    </Layout>
  )
}

export default ContentTrackingPage
