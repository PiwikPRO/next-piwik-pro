import { Box, Container, Grid } from '@mui/material'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import PiwikProProvider from '@piwikpro/next-piwik-pro'
import Snackbar from '@/providers/Snackbar'
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
          <AppRouterCacheProvider>
            <Box sx={{ display: 'flex' }}>
              <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Snackbar>{children}</Snackbar>
                </Grid>
              </Container>
            </Box>
          </AppRouterCacheProvider>
        </body>
      </html>
    </PiwikProProvider>
  )
}
