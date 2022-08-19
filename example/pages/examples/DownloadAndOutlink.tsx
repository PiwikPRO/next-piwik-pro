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
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  const pageData = {
    title: 'DownloadAndOutlink',
    heading: 'Download and outlink Service',
    description:
      'Manually tracks outlink or download event with provided values.',
    methods: [
      {
        method: 'trackLink',
        usage:
          'DownloadAndOutlink.trackLink(url: string, linkType: string, customData?: object, callback?: (params: any) => void)',
        desc: 'Manually tracks outlink or download event with provided values.'
      },
      {
        method: 'enableLinkTracking',
        usage: 'DownloadAndOutlink.enableLinkTracking(enable: boolean)',
        desc: 'Enables or disables automatic link tracking. If enabled, left, right and middle clicks on links will be treated as opening a link. Opening a links to an external site (different domain) creates an outlink event. Opening a link to a downloadable file creates a download event.'
      },
      {
        method: 'setLinkClasses',
        usage: 'DownloadAndOutlink.setLinkClasses(classes: string[])',
        desc: 'Sets a list of class names that indicate whether a link is an outlink and not download.'
      },
      {
        method: 'setDownloadClasses',
        usage: 'DownloadAndOutlink.setDownloadClasses(classes: string[])',
        desc: 'Sets a list of class names that indicate whether a list is a download and not an outlink.'
      },
      {
        method: 'setDownloadExtensions',
        usage: 'DownloadAndOutlink.setDownloadExtensions(extensions: string[])',
        desc: 'Overwrites the list of file extensions indicating that a link is a download.'
      },
      {
        method: 'addDownloadExtensions',
        usage: 'DownloadAndOutlink.addDownloadExtensions(extensions: string[])',
        desc: 'Adds new extensions to the download extensions list.'
      },
      {
        method: 'removeDownloadExtensions',
        usage:
          'DownloadAndOutlink.removeDownloadExtensions(extensions: string[])',
        desc: 'Removes extensions from the download extensions list.'
      },
      {
        method: 'setLinkTrackingTimer',
        usage: 'DownloadAndOutlink.setLinkTrackingTimer(time: number)',
        desc: 'When a visitor produces an events and closes the page immediately afterwards, e.g. when opening a link, the request might get cancelled. To avoid loosing the last event this way, JavaScript Tracking Client will lock the page for a fraction of a second (if wait time hasn’t passed), giving the request time to reach the Collecting & Processing Pipeline.'
      },
      {
        method: 'getLinkTrackingTimer',
        usage: 'DownloadAndOutlink.getLinkTrackingTimer()',
        desc: 'Returns lock/wait time after a request set by setLinkTrackingTimer.'
      },
      {
        method: 'setIgnoreClasses',
        usage: 'DownloadAndOutlink.setIgnoreClasses(classes: string[])',
        desc: 'Set a list of class names that indicate a link should not be tracked.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const DownloadAndOutlinkPage: NextPage<
  InferGetServerSidePropsType<GetStaticProps>
> = ({ pageData }: { pageData: any }) => {
  const { DownloadAndOutlink } = usePiwikPro()

  const [linkTrackingTimer, setLinkTrackingTimer] = useState<string>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      // function trackLink(url: string, linkType: string, customData?: object | undefined, callback?: ((params: any) => void) | undefined): void
      DownloadAndOutlink.trackLink('http://localhost:3000', 'link')

      // function enableLinkTracking(enable: boolean): void
      DownloadAndOutlink.enableLinkTracking(true)

      // function setLinkClasses(classes: string[]): void
      DownloadAndOutlink.setLinkClasses(['this-is-an-outlink'])

      // function setDownloadClasses(classes: string[]): void
      DownloadAndOutlink.setDownloadClasses(['this-is-a-download'])

      // function setDownloadExtensions(extensions: string[]): void
      DownloadAndOutlink.setDownloadExtensions(['zip'])

      // function addDownloadExtensions(extensions: string[]): void
      DownloadAndOutlink.addDownloadExtensions(['7z'])

      // function removeDownloadExtensions(extensions: string[]): void
      DownloadAndOutlink.removeDownloadExtensions(['pdf', 'xlsx'])

      // function setLinkTrackingTimer(time: number): void
      DownloadAndOutlink.setLinkTrackingTimer(10)

      // function getLinkTrackingTimer(): Promise<string>
      const lTrackingTimer = await DownloadAndOutlink.getLinkTrackingTimer()
      setLinkTrackingTimer(lTrackingTimer)

      // function setIgnoreClasses(classes: string[]): void
      DownloadAndOutlink.setIgnoreClasses(['do-not-track'])
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
              {'const { UserManagement } = usePiwikPro()'}
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
            <code>DownloadAndOutlink.getLinkTrackingTimer()</code> -{' '}
            {linkTrackingTimer}
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
              DownloadAndOutlink.trackLink('http://localhost:3000', 'link')
            }}
          >
            DownloadAndOutlink.trackLink
          </button>
          <button
            onClick={() => {
              DownloadAndOutlink.enableLinkTracking(true)
            }}
          >
            DownloadAndOutlink.enableLinkTracking
          </button>
          <button
            onClick={() => {
              DownloadAndOutlink.setLinkClasses(['this-is-an-outlink'])
            }}
          >
            DownloadAndOutlink.setLinkClasses
          </button>
          <button
            onClick={() => {
              DownloadAndOutlink.setDownloadClasses(['this-is-a-download'])
            }}
          >
            DownloadAndOutlink.setDownloadClasses
          </button>
          <button
            onClick={() => {
              DownloadAndOutlink.addDownloadExtensions(['rar'])
            }}
          >
            DownloadAndOutlink.addDownloadExtensions - add RAR tracking
          </button>
          <button
            onClick={() => {
              DownloadAndOutlink.removeDownloadExtensions(['rar'])
            }}
          >
            DownloadAndOutlink.removeDownloadExtensions - remove RAR tracking
          </button>
          <button
            onClick={() => {
              DownloadAndOutlink.setIgnoreClasses(['do-not-track'])
            }}
          >
            DownloadAndOutlink.setIgnoreClasses
          </button>
          <button
            onClick={() => {
              DownloadAndOutlink.setLinkTrackingTimer(20)
            }}
          >
            DownloadAndOutlink.setLinkTrackingTimer
          </button>
          <button
            onClick={() => {
              const callAsyncMethods = async () => {
                const lTrackingTimer =
                  await DownloadAndOutlink.getLinkTrackingTimer()
                setLinkTrackingTimer(lTrackingTimer)
              }

              callAsyncMethods()
            }}
          >
            CustomDimensions.getCustomDimensionValue
          </button>
          <h2>Example download</h2>
          <div>
            <a href='/files/example.zip'>Download ZIP</a> - tracked download
            <br />
            <a href='/files/example.pdf'>Download PDF</a> - outlink
            <br />
            <a href='/files/example.rar'>Download RAR</a> - download tracked
            disabled by default, you can turn on/off by button
            <br />
            <a className='do-not-track' href='/files/example.xlsx'>
              Download XLXS
            </a>{' '}
            - download turned off by default using className
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default DownloadAndOutlinkPage
