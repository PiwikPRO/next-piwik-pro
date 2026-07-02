'use client'

import { FunctionComponent } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const TrackContentButtons: FunctionComponent = () => {
  const { ContentTracking } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  return (
    <div>
      <button
        className='btn'
        onClick={() => {
          ContentTracking.trackContentImpression(
            'contentName',
            'contentPiece',
            'contentTarget'
          )
          enqueueSnackbar(
            "ContentTracking.trackContentImpression('contentName', 'contentPiece', 'contentTarget')"
          )
        }}
      >
        ContentTracking.trackContentImpression
      </button>
      <button
        className='btn'
        onClick={() => {
          ContentTracking.trackContentInteraction(
            'contentInteraction',
            'contentName',
            'contentPiece',
            'contentTarget'
          )
          enqueueSnackbar(
            "ContentTracking.trackContentInteraction('contentInteraction', 'contentName', 'contentPiece', 'contentTarget')"
          )
        }}
      >
        ContentTracking.trackContentInteraction
      </button>
    </div>
  )
}

export default TrackContentButtons
