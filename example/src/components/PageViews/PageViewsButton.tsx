'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const PageViewsButton: FunctionComponent = () => {
  const { PageViews } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    PageViews.trackPageView('optional title')
  }, [])

  return (
    <button
      className='btn'
      onClick={() => {
        PageViews.trackPageView('optional title from button')
        enqueueSnackbar("PageViews.trackPageView('optional title from button')")
      }}
    >
      PageViews.trackPageView
    </button>
  )
}

export default PageViewsButton
