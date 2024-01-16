import utilStyles from '@/styles/utils.module.css'
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

export default function Home() {
  return (
    <>
      <Paper sx={{ p: 2, width: '100%' }}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Examples of usage </h2>
          <List className={utilStyles.list}>
            {EXAMPLES.map((id) => (
              <ListItem className={utilStyles.listItem} key={id}>
                <ListItemButton>
                  <Link href={`/${id}`}>{id}</Link>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </section>
      </Paper>
    </>
  )
}
