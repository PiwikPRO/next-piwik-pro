import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('next/script', () => ({
  __esModule: true,
  default: ({ children }: any) => <script>{children}</script>
}))

import { PiwikProProvider } from '../core'
import { usePiwikPro } from '../core'
import type { ReactNode } from 'react'

// The tracking services exposed by @piwikpro/react-piwik-pro (via
// tracking-base-library).
const EXPECTED_SERVICES = [
  'PageViews',
  'CustomEvent',
  'ContentTracking',
  'CookieManagement',
  'CustomDimensions',
  'DownloadAndOutlink',
  'eCommerce',
  'GoalConversions',
  'SiteSearch',
  'UserManagement',
  'DataLayer',
  'ErrorTracking',
  'CrossDomainTracking',
  'ClientConfiguration',
  'Heartbeat',
  'Miscellaneous'
] as const

describe('usePiwikPro', () => {
  it('exposes every tracking service via the default context value', () => {
    const { result } = renderHook(() => usePiwikPro())

    for (const service of EXPECTED_SERVICES) {
      expect(result.current[service]).toBeDefined()
    }
  })

  it('exposes the tracking services when read under a provider', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PiwikProProvider
        containerId='test-id'
        containerUrl='https://example.piwik.pro'
      >
        {children}
      </PiwikProProvider>
    )

    const { result } = renderHook(() => usePiwikPro(), { wrapper })

    for (const service of EXPECTED_SERVICES) {
      expect(result.current[service]).toBeDefined()
    }
  })
})
