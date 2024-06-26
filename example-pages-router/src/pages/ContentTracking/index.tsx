import ContentTrackingPiwik from '@/components/ContentTracking/ContentTrackingPiwik'
import { NextPage } from 'next'
import { PageData } from '@/types/pageData'
import TrackContentButtons from '@/components/ContentTracking/TrackContentButtons'

const getPageData = (): PageData => ({
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
})

export const metadata = {
  title: getPageData().title
}

const ContentTrackingPage: NextPage = () => {
  const pageData = getPageData()

  return (
    <>
      <section className='container mx-auto my-16'>
        <ContentTrackingPiwik />
        <article className='prose'>
          <h1>{pageData.heading}</h1>
          <div>
            <p>{pageData.description}</p>
          </div>
          <h2>Import</h2>
          <div>
            <p>
              <code>
                {`import { usePiwikPro } from '@piwikpro/next-piwik-pro'`}
                <br />
                {'const { ContentTracking } = usePiwikPro()'}
              </code>
            </p>
          </div>
          <h2>Methods</h2>
          <div>
            <ul className='menu bg-base-200 rounded-box'>
              {pageData.methods.map(({ usage, desc, method }) => (
                <li key={method}>
                  <button className='btn'>
                    <code>{usage}</code> - {desc}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <h2>Sample usage</h2>
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
          <TrackContentButtons />
        </article>
      </section>
    </>
  )
}

export default ContentTrackingPage
