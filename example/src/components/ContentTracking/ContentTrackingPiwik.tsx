'use client'

import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { FunctionComponent, useEffect } from 'react'

const ContentTrackingPiwik: FunctionComponent = () => {
  const { ContentTracking } = usePiwikPro()

  useEffect(() => {
    ContentTracking.trackContentImpression(
      'contentName',
      'contentPiece',
      'contentTarget'
      )

    ContentTracking.trackContentInteraction(
      'contentInteraction',
      'contentName',
      'contentPiece',
      'contentTarget'
      )
  }, [])
  
  return (<></>)
}

export default ContentTrackingPiwik