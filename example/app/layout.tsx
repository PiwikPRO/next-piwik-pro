'use client'

import PiwikProProvider from '@piwikpro/next-piwik-pro'
import { SnackbarProvider } from 'notistack'
import { Box, Container, Grid } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
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
          <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            maxSnack={10}
          >
            <AppRouterCacheProvider>
              <Box sx={{ display: 'flex' }}>
                <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    {children}
                  </Grid>
                </Container>
              </Box>
            </AppRouterCacheProvider>
          </SnackbarProvider>
        </body>
      </html>
    </PiwikProProvider>
  )
}
