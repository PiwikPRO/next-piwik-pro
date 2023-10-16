import { ReactNode } from 'react'

export interface PiwikProProps {
  accountName?: string
  containerId?: string
  containerUrl?: string
  children?: ReactNode
  nonce?: string
}
