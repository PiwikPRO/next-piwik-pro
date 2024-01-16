'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import PiwikProProvider from '@piwikpro/next-piwik-pro'
import { SnackbarProvider } from 'notistack'
import { Box, Container, Grid } from '@mui/material'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <PiwikProProvider
      containerUrl={process.env.NEXT_PUBLIC_CONTAINER_URL}
      containerId={process.env.NEXT_PUBLIC_CONTAINER_ID}
    >
      <html lang='en'>
        <body>
          <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            maxSnack={10}
          >
            <Box sx={{ display: 'flex' }}>
              <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  {children}
                </Grid>
              </Container>
            </Box>
          </SnackbarProvider>
        </body>
      </html>
    </PiwikProProvider>
  )
}
