'use client'

import React, {FunctionComponent, useEffect} from 'react'
import {usePiwikPro} from '@piwikpro/next-piwik-pro'

type Props = {
  title: string
}

const CustomEventButton: FunctionComponent<Props> = ({title}) => {
  const {CustomEvent} = usePiwikPro()

  useEffect(() => {
    // function trackEvent(category: string, action: string, name?: string | undefined, value?: number | undefined): void
    CustomEvent.trackEvent('Post', title)
  }, [])

  return (
    <button
      onClick={() => {
        CustomEvent.trackEvent('Button', title)
      }}
    >
      CustomEvent.trackEvent
    </button>
  )
}

export default CustomEventButton