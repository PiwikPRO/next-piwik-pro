import {FunctionComponent} from "react";
import {usePiwikPro} from "@piwikpro/next-piwik-pro";

const TrackContentButtons: FunctionComponent = () => {
  const {ContentTracking} = usePiwikPro()

  return (
    <div>
      <button
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