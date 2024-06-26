'use client'

import { FunctionComponent, useEffect } from 'react'

import { usePiwikPro } from '@/providers/PiwikPROProvider'

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

  return <></>
}

export default ContentTrackingPiwik
