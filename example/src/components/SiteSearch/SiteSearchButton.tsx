'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const SiteSearchButton: FunctionComponent = () => {
  const { SiteSearch } = usePiwikPro()

  useEffect(() => {
    // function trackSiteSearch(keyword: string, category?: string | undefined, searchCount?: number | undefined, dimensions?: Object | undefined): void
    SiteSearch.trackSiteSearch('keyword', 'category', 5)
  }, [])

  return (
    <Button
      variant='contained'
      sx={{ mt: 2 }}
      onClick={() => {
        SiteSearch.trackSiteSearch('keyword', 'button', 4)
      }}
    >
      SiteSearch.trackSiteSearch
    </Button>
  )
}

export default SiteSearchButton
