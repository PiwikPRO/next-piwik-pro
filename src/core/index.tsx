'use client'

import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useRef
} from 'react'
import Script from 'next/script'
import PiwikPro, * as PiwikProServices from '@piwikpro/react-piwik-pro'
import type { InitOptions } from '@piwikpro/react-piwik-pro'
import { VERSION } from '../version'

const PiwikProContext = React.createContext(PiwikProServices)

export type PiwikProProviderProps = {
  containerId: string
  containerUrl: string
  children: ReactNode
} & InitOptions

export const PiwikProProvider: React.FC<PiwikProProviderProps> = ({
  children,
  containerId,
  containerUrl,
  nonce,
  dataLayerName
}): ReactElement | null => {
  const hasInitialized = useRef(false)
  if (!containerId) {
    throw new Error('Empty containerId for Piwik PRO.')
  }

  if (!containerUrl) {
    throw new Error('Empty containerUrl for Piwik PRO.')
  }

  useEffect(() => {
    if (hasInitialized.current) return

    if (typeof window !== 'undefined') {
      PiwikProServices.Miscellaneous.setTrackingSourceProvider(
        'nextjs',
        VERSION
      )
    }

    if (dataLayerName) {
      PiwikProServices.DataLayer.setDataLayerName(dataLayerName)
    }

    hasInitialized.current = true
  }, [])

  return (
    <>
      <Script
        id={`piwik-tag-manager-${containerId}`}
        strategy='afterInteractive'
        nonce={nonce}
      >
        {`${PiwikPro.getInitScript({
          containerId,
          containerUrl,
          dataLayerName
        })}
    `}
      </Script>

      <PiwikProContext.Provider value={PiwikProServices}>
        {children}
      </PiwikProContext.Provider>
    </>
  )
}

export const usePiwikPro = (): typeof PiwikProServices => {
  return useContext(PiwikProContext)
}
