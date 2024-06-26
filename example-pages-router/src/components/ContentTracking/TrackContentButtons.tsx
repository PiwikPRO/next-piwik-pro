'use client'

import { FunctionComponent } from 'react'
import { usePiwikPro } from '@/providers/PiwikPROProvider'

const TrackContentButtons: FunctionComponent = () => {
  const { ContentTracking } = usePiwikPro()

  return (
    <div>
      <button
        className='btn mr-5'
        onClick={() => {
          ContentTracking.trackContentImpression(
            'contentName',
            'contentPiece',
            'contentTarget'
          )
        }}
      >
        ContentTracking.trackEvent
      </button>
      <button
        className='btn mr-5'
        onClick={() => {
          ContentTracking.trackContentInteraction(
            'contentInteraction',
            'contentName',
            'contentPiece',
            'contentTarget'
          )
        }}
      >
        ContentTracking.trackContentInteraction
      </button>
    </div>
  )
}

export default TrackContentButtons
