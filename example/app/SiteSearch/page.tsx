import { Metadata, NextPage } from 'next'
import { PageData } from '@/types/pageData'
import SiteSearchButton from '@/src/components/SiteSearch/SiteSearchButton'

const getPageData = (): PageData => ({
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
})

export const metadata: Metadata = {
  title: getPageData().title
}

const SiteSearchPage: NextPage = () => {
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
            {'const { SiteSearch } = usePiwikPro()'}
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
        <SiteSearchButton />
      </article>
    </div>
  )
}

export default SiteSearchPage
