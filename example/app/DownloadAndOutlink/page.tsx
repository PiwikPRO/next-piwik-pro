import {NextPage} from 'next'
import {PageData} from '@/types/pageData'
import Head from 'next/head'
import utilStyles from '@/styles/utils.module.css'
import DownloadAndOutlinkExamples from '@/src/components/DownloadAndOutlink/DownloadAndOutlinkExamples'

const getPageData = (): PageData => (
  {
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
)

const DownloadAndOutlinkPage: NextPage = () => {
  const pageData = getPageData()

  return (
    <>
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
              <br/>
              {'const { UserManagement } = usePiwikPro()'}
            </code>
          </p>
        </div>
        <h2 className={utilStyles.headingXl}>Methods</h2>
        <div>
          <ul className={utilStyles.list}>
            {pageData.methods.map(({usage, desc, method}) => (
              <li className={utilStyles.listItem} key={method}>
                <code>{usage}</code> - {desc}
              </li>
            ))}
          </ul>
        </div>
        <DownloadAndOutlinkExamples/>
      </article>
    </>
  )
}

export default DownloadAndOutlinkPage