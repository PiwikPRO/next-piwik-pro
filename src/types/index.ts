import { ReactNode } from 'react'

export interface PiwikProProps {
  accountName: string
  containerId: string
  children?: ReactNode
  nonce?: string
}
