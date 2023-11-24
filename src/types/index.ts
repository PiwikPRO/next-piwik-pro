import { ReactNode } from 'react'

export interface PiwikProProps {
  /** @deprecated This parameter has now been replaced by 'containerId'. The 'accountName' parameter is deprecated and will be removed in the future. */
  accountName?: string
  containerId?: string
  containerUrl?: string
  children?: ReactNode
  nonce?: string
}
