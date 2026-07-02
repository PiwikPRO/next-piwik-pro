'use client'

import { FunctionComponent, useEffect } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

type Props = {
  title: string
}

const CustomEventButton: FunctionComponent<Props> = ({ title }) => {
  const { CustomEvent } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    // function trackEvent(category: string, action: string, name?: string | undefined, value?: number | undefined): void
    CustomEvent.trackEvent('Post', title)
  }, [])

  return (
    <button
      className='btn'
      onClick={() => {
        CustomEvent.trackEvent('Button', title)
        enqueueSnackbar(`CustomEvent.trackEvent('Button', '${title}')`)
      }}
    >
      CustomEvent.trackEvent
    </button>
  )
}

export default CustomEventButton
