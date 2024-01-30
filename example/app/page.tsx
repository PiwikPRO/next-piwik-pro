import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { List, ListItem, ListItemButton, Paper } from '@mui/material'

const EXAMPLES: string[] = [
  'ContentTracking',
  'CustomDimensions',
  'CustomEvent',
  'DataLayer',
  'DownloadAndOutlink',
  'eCommerce',
  'GoalConversions',
  'SiteSearch',
  'UserManagement',
  'PageViews'
]

export const metadata: Metadata = {
  title: 'Piwik PRO - Nextjs 13 examples'
}

const Home = () => {
  return (
    <>
      <Paper sx={{ p: 2, width: '100%' }}>
        <section>
          <h2>Examples of usage </h2>
          <List>
            {EXAMPLES.map((id) => (
              <ListItem key={id}>
                <ListItemButton component={Link} href={`/${id}`}>
                  {id}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </section>
      </Paper>
    </>
  )
}

export default Home
