import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import React, { useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const pageData = {
    title: 'DataLayer',
    heading: 'Data Layer',
    description:
      'A data layer is a data structure on your site or app where you can store data and access it with tools like Tag Manager. You can include any data you want in your data layer.',
    methods: [
      {
        method: 'push',
        usage: 'DataLayer.push(dataLayerObject: Object)',
        desc: 'Adds an event to a data layer.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const DataLayerPage: NextPage<
  InferGetServerSidePropsType<GetServerSideProps<{ pageData: any }>>
> = ({ pageData }: { pageData: any }) => {
  const { DataLayer } = usePiwikPro()

  useEffect(() => {
    // function push(data: any): any
    DataLayer.push({ data: 'data' })
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
              {'const { DataLayer } = usePiwikPro()'}
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
              DataLayer.push({ data: 'data' })
            }}
          >
            DataLayer.push
          </button>
        </div>
      </article>
    </Layout>
  )
}

export default DataLayerPage
