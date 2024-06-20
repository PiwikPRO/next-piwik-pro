'use client'

import { SnackbarProvider } from 'notistack'

export default function Snackbar({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      maxSnack={10}
    >
      {children}
    </SnackbarProvider>
  )
}
