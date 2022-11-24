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
import React, { useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const pageData = {
    title: 'CustomDimensions',
    heading: 'Custom Dimensions',
    description:
      'Collection of methods to manage custom dimensions through the Piwik PRO API.',
    methods: [
      {
        method: 'setCustomDimensionValue',
        usage:
          'CustomDimensions.setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string)',
        desc: 'Sets a custom dimension value to be used later.'
      },
      {
        method: 'deleteCustomDimension',
        usage:
          'CustomDimensions.deleteCustomDimension(customDimensionId: string)',
        desc: 'Removes a custom dimension with the specified ID.'
      },
      {
        method: 'getCustomDimensionValue',
        usage:
          'CustomDimensions.getCustomDimensionValue(customDimensionId: string | number)',
        desc: 'Returns the value of a custom dimension with the specified ID.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const CustomDimensionsPage: NextPage<
  InferGetServerSidePropsType<GetStaticProps>
> = ({ pageData }: { pageData: any }) => {
  const { CustomDimensions } = usePiwikPro()

  const [customDimValue, setCustomDimValue] = useState<string>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      // function setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string): void
      CustomDimensions.setCustomDimensionValue(12, 'value')

      // function getCustomDimensionValue(customDimensionId: string | number): Promise<string>
      const cDimValue = await CustomDimensions.getCustomDimensionValue(12)
      setCustomDimValue(cDimValue)

      // function deleteCustomDimension(customDimensionId: string): void
      CustomDimensions.deleteCustomDimension(12)
    }

    callAsyncMethods()
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
              {'const { CustomDimensions } = usePiwikPro()'}
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
        <h2>Examples results</h2>
        <div>
          <p>
            <code>CustomDimensions.getCustomDimensionValue()</code> -
            {customDimValue}
          </p>
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
              CustomDimensions.setCustomDimensionValue(12, 'valueFromButton')
            }}
          >
            CustomDimensions.setCustomDimensionValue
          </button>
          <button
            onClick={() => {
              const callAsyncMethods = async () => {
                const cDimValue =
                  await CustomDimensions.getCustomDimensionValue(12)
                setCustomDimValue(cDimValue)
              }

              callAsyncMethods()
            }}
          >
            CustomDimensions.getCustomDimensionValue
          </button>
          <button
            onClick={() => {
              CustomDimensions.deleteCustomDimension(12)
            }}
          >
            CustomDimensions.deleteCustomDimension
          </button>
        </div>
      </article>
    </Layout>
  )
}

export default CustomDimensionsPage
