'use client'

import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useEffect } from 'react'

export default function ContentTracking() {
  const { ContentTracking } = usePiwikPro()
  
  useEffect(() => {
    // function trackContentImpression(contentName: string, contentPiece: string, contentTarget: string): void
    ContentTracking.trackContentImpression(
      'contentName',
      'contentPiece',
      'contentTarget'
      )
    // function trackContentInteraction(contentInteraction: string, contentName: string, contentPiece: string, contentTarget: string): void
    ContentTracking.trackContentInteraction(
      'contentInteraction',
      'contentName',
      'contentPiece',
      'contentTarget'
      )
  }, [])
  
  return (
    <div>ContentTracking</div>
  )
}