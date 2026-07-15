import { describe, it, expect, vi } from 'vitest'

vi.mock('next/script', () => ({
  __esModule: true,
  default: ({ children }: any) => children
}))

import * as NextPiwikPro from '../index'

describe('public surface of @piwikpro/next-piwik-pro', () => {
  it('default export is the PiwikProProvider component', () => {
    expect(NextPiwikPro.default).toBeDefined()
    expect(NextPiwikPro.default.name).toBe('PiwikProProvider')
  })

  it('exposes the usePiwikPro hook', () => {
    expect(typeof NextPiwikPro.usePiwikPro).toBe('function')
  })
})
