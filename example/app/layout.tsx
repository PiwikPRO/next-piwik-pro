import './globals.css'

import PiwikProProvider from '@piwikpro/next-piwik-pro'
import Snackbar from '@/providers/Snackbar'
import NavigationDrawer from '@/src/components/NavigationDrawer'
import { appConfig } from '@/src/config'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <PiwikProProvider
      containerUrl={appConfig.containerUrl}
      containerId={appConfig.containerId}
      // optional config options
      // dataLayerName='my-data-layer'
      // nonce=''
    >
      <html lang='en'>
        <body>
          <Snackbar>
            <NavigationDrawer />
            <main className='main-content'>{children}</main>
          </Snackbar>
        </body>
      </html>
    </PiwikProProvider>
  )
}
