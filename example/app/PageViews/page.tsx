import { Metadata, NextPage } from 'next'
import { PageData } from '@/types/pageData'
import PageViewsButton from '@/src/components/PageViews/PageViewsButton'
import { List, ListItem, ListItemText, Paper } from '@mui/material'

const getPageData = (): PageData => ({
  title: 'PageViews',
  heading: 'Send page views and virtual page views',
  description:
    'Page views are tracked automatically but method can be invoked manually with specified parameters.',
  methods: [
    {
      method: 'trackEvent',
      usage:
        'PageViews.trackEvent(category: string, action: string, name?: string | undefined, value?: number | undefined): void',
      desc: 'Tracks manual content impression event.'
    }
  ]
})

export const metadata: Metadata = {
  title: getPageData().title
}

const PageViewsPage: NextPage = () => {
  const pageData = getPageData()

  return (
    <>
      <Paper sx={{ p: 2 }}>
        <article>
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
                {'const { PageViews } = usePiwikPro()'}
              </code>
            </p>
          </div>
          <h2>Methods</h2>
          <div>
            <List>
              {pageData.methods.map(({ usage, desc, method }) => (
                <ListItem key={method}>
                  <ListItemText>
                    <code>{usage}</code> - {desc}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
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
          <div>
            <PageViewsButton />
          </div>
        </article>
      </Paper>
    </>
  )
}

export default PageViewsPage
