'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const SiteSearchButton: FunctionComponent = () => {
  const { SiteSearch } = usePiwikPro()

  useEffect(() => {
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
