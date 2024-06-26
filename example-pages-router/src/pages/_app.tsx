'use client'

import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import { PiwikProProvider } from '@/providers/PiwikPROProvider'
import { appConfig } from '@/config'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PiwikProProvider
      containerUrl={appConfig.containerUrl}
      containerId={appConfig.containerId}
      // optional config options
      // dataLayerName='my-data-layer'
      // nonce=''
    >
      <Component {...pageProps} />;
    </PiwikProProvider>
  )
}
