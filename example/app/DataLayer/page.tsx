import { PageData } from '@/types/pageData'
import React from 'react'
import DataLayerButton from '@/src/components/DataLayer/DataLayerButton'
import { Metadata, NextPage } from 'next'
import { List, ListItem, ListItemText, Paper } from '@mui/material'

const getPageData = (): PageData => ({
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
})

export const metadata: Metadata = {
  title: getPageData().title
}

const DataLayerPage: NextPage = () => {
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
                {'const { DataLayer } = usePiwikPro()'}
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
            <DataLayerButton />
          </div>
        </article>
      </Paper>
    </>
  )
}

export default DataLayerPage
