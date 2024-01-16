'use client'

import { FunctionComponent } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const TrackContentButtons: FunctionComponent = () => {
  const { ContentTracking } = usePiwikPro()

  return (
    <div>
      <Button
        variant='contained'
        sx={{ mt: 2, mr: 2 }}
        onClick={() => {
          ContentTracking.trackContentImpression(
            'contentName',
            'contentPiece',
            'contentTarget'
          )
        }}
      >
        ContentTracking.trackEvent
      </Button>
      <Button
        variant='contained'
        sx={{ mt: 2, mr: 2 }}
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
      </Button>
    </div>
  )
}

export default TrackContentButtons
