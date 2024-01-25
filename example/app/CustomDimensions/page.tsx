import { PageData } from '@/types/pageData'
import CustomDimensionResults from '@/src/components/CustomDimensions/CustomDimensionResults'
import { Metadata, NextPage } from 'next'
import { List, ListItem, ListItemText, Paper } from '@mui/material'

const getPageData = (): PageData => ({
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
})

export const metadata: Metadata = {
  title: getPageData().title
}

const CustomDimensionsPage: NextPage = () => {
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
                {'const { CustomDimensions } = usePiwikPro()'}
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

          <CustomDimensionResults />
        </article>
      </Paper>
    </>
  )
}

export default CustomDimensionsPage
