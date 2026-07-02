import { Metadata, NextPage } from 'next'
import { PageData } from '@/types/pageData'
import PageViewsButton from '@/src/components/PageViews/PageViewsButton'

const getPageData = (): PageData => ({
  title: 'PageViews',
  heading: 'Send page views and virtual page views',
  description:
    'Page views are tracked automatically but method can be invoked manually with specified parameters.',
  methods: [
    {
      method: 'trackPageView',
      usage: 'PageViews.trackPageView(customPageTitle?: string): void',
      desc: 'Tracks page view of the page that the function was run on.'
    }
  ]
})

export const metadata: Metadata = {
  title: getPageData().title
}

const PageViewsPage: NextPage = () => {
  const pageData = getPageData()

  return (
    <div className='page-content'>
      <article>
        <h1>{pageData.heading}</h1>
        <p>{pageData.description}</p>
        <h2>Import</h2>
        <p>
          <code>
            {`import { usePiwikPro } from '@piwikpro/next-piwik-pro'`}
            <br />
            {'const { PageViews } = usePiwikPro()'}
          </code>
        </p>
        <h2>Methods</h2>
        <ul>
          {pageData.methods.map(({ usage, desc, method }) => (
            <li key={method}>
              <code>{usage}</code> - {desc}
            </li>
          ))}
        </ul>
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
        <PageViewsButton />
      </article>
    </div>
  )
}

export default PageViewsPage
