'use client'

import React, { ReactElement, ReactNode, useContext } from 'react'
import Script from 'next/script'
import PiwikPro, * as PiwikProServices from '@piwikpro/react-piwik-pro'

const PiwikProContext = React.createContext(PiwikProServices)

export type PiwikProProviderProps = {
  containerId: string
  containerUrl: string
  nonce?: string
  children: ReactNode
}

export const PiwikProProvider: React.FC<PiwikProProviderProps> = ({
  children,
  containerId,
  containerUrl,
  nonce
}): ReactElement | null => {
  if (!containerId) {
    throw new Error('Empty containerId for Piwik Pro.')
  }

  if (!containerUrl) {
    throw new Error('Empty containerUrl for Piwik Pro.')
  }

  return (
    <>
      <Script
        id={`piwik-tag-manager-${containerId}`}
        strategy='afterInteractive'
        nonce={nonce}
      >
        {`${PiwikPro.getInitScript({
          containerId,
          containerUrl
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
