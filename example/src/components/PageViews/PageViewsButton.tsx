'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const PageViewsButton: FunctionComponent = () => {
  const { PageViews } = usePiwikPro()

  useEffect(() => {
    // function trackPageView(customPageTitle?: string | undefined): void
    PageViews.trackPageView('optional title')
  }, [])

  return (
    <Button
      variant='contained'
      sx={{ mt: 2 }}
      onClick={() => {
        PageViews.trackPageView('optional title from button')
      }}
    >
      PageViews.trackPageView
    </Button>
  )
}

export default PageViewsButton
