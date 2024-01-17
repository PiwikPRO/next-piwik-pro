import ContentTrackingPiwik from '@/src/components/ContentTracking/ContentTrackingPiwik'
import TrackContentButtons from '@/src/components/ContentTracking/TrackContentButtons'
import { PageData } from '@/types/pageData'
import { NextPage } from 'next'
import { List, ListItem, ListItemText, Paper } from '@mui/material'

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
      <Paper sx={{ p: 2 }}>
        <ContentTrackingPiwik />
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
                {'const { ContentTracking } = usePiwikPro()'}
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
          <TrackContentButtons />
        </article>
      </Paper>
    </>
  )
}

export default ContentTrackingPage
