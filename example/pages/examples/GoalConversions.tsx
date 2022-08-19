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
    title: 'GoalConversions',
    heading: 'Goal Conversions',
    description:
      'Goals let you define important actions registered in your application and track conversions when the conditions for the action are fulfilled.',
    methods: [
      {
        method: 'trackGoal',
        usage:
          'GoalConversions.trackGoal(goalId: number | string, conversionValue: number, dimensions?: Object)',
        desc: 'Tracks manual goal conversion.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const GoalConversionsPage: NextPage<
  InferGetServerSidePropsType<GetStaticProps>
> = ({ pageData }: { pageData: any }) => {
  const { GoalConversions } = usePiwikPro()

  useEffect(() => {
    // function trackGoal(goalId: string | number, conversionValue: number, dimensions?: Object | undefined): void
    GoalConversions.trackGoal(1, 30)
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
              {'const { GoalConversions } = usePiwikPro()'}
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
              GoalConversions.trackGoal(2, 40)
            }}
          >
            GoalConversions.trackGoal
          </button>
        </div>
      </article>
    </Layout>
  )
}

export default GoalConversionsPage
