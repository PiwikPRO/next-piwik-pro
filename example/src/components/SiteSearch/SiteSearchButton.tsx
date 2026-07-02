'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const SiteSearchButton: FunctionComponent = () => {
  const { SiteSearch } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    SiteSearch.trackSiteSearch('keyword', 'category', 5)
  }, [])

  return (
    <button
      className='btn'
      onClick={() => {
        SiteSearch.trackSiteSearch('keyword', 'button', 4)
        enqueueSnackbar("SiteSearch.trackSiteSearch('keyword', 'button', 4)")
      }}
    >
      SiteSearch.trackSiteSearch
    </button>
  )
}

export default SiteSearchButton
