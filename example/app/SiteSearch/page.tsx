import { Metadata, NextPage } from 'next'
import { PageData } from '@/types/pageData'
import utilStyles from '@/styles/utils.module.css'
import SiteSearchButton from '@/src/components/SiteSearch/SiteSearchButton'
import { Paper } from '@mui/material'

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
    <>
      <Paper sx={{ p: 2 }}>
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
                {'const { SiteSearch } = usePiwikPro()'}
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
            <SiteSearchButton />
          </div>
        </article>
      </Paper>
    </>
  )
}

export default SiteSearchPage
