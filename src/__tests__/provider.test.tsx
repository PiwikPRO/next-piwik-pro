import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StrictMode } from 'react'

vi.mock('@piwikpro/react-piwik-pro', () => ({
  __esModule: true,
  default: {
    getInitScript: vi.fn(() => 'INIT_SCRIPT_BODY'),
    initialize: vi.fn()
  },
  Miscellaneous: { setTrackingSourceProvider: vi.fn() },
  DataLayer: { setDataLayerName: vi.fn() }
}))

vi.mock('next/script', () => ({
  __esModule: true,
  default: ({ children, id, strategy, nonce }: any) => (
    <script id={id} data-strategy={strategy} nonce={nonce}>
      {children}
    </script>
  )
}))

import { PiwikProProvider } from '../core'
import PiwikPro, { Miscellaneous, DataLayer } from '@piwikpro/react-piwik-pro'
import { VERSION } from '../version'

const CONTAINER_ID = 'test-container-id'
const CONTAINER_URL = 'https://example.piwik.pro'

beforeEach(() => vi.clearAllMocks())

describe('PiwikProProvider', () => {
  describe('validation', () => {
    it('throws when containerId is empty', () => {
      expect(() =>
        render(
          <PiwikProProvider containerId='' containerUrl={CONTAINER_URL}>
            <div />
          </PiwikProProvider>
        )
      ).toThrow('Empty containerId for Piwik PRO.')
    })

    it('throws when containerUrl is empty', () => {
      expect(() =>
        render(
          <PiwikProProvider containerId={CONTAINER_ID} containerUrl=''>
            <div />
          </PiwikProProvider>
        )
      ).toThrow('Empty containerUrl for Piwik PRO.')
    })
  })

  describe('script injection', () => {
    it('renders the tag-manager Script with the container id, strategy and nonce', () => {
      const { container } = render(
        <PiwikProProvider
          containerId={CONTAINER_ID}
          containerUrl={CONTAINER_URL}
          nonce='nonce-abc'
        >
          <div />
        </PiwikProProvider>
      )

      const script = container.querySelector(
        `script#piwik-tag-manager-${CONTAINER_ID}`
      )
      expect(script).not.toBeNull()
      expect(script).toHaveAttribute('data-strategy', 'afterInteractive')
      expect(script).toHaveAttribute('nonce', 'nonce-abc')
      expect(script?.textContent).toContain('INIT_SCRIPT_BODY')
    })

    it('builds the init script from the container settings', () => {
      render(
        <PiwikProProvider
          containerId={CONTAINER_ID}
          containerUrl={CONTAINER_URL}
          dataLayerName='myDataLayer'
        >
          <div />
        </PiwikProProvider>
      )

      expect(PiwikPro.getInitScript).toHaveBeenCalledWith(
        expect.objectContaining({
          containerId: CONTAINER_ID,
          containerUrl: CONTAINER_URL,
          dataLayerName: 'myDataLayer'
        })
      )
    })
  })

  describe('initialization side effects', () => {
    it('tags the tracking source provider as "nextjs" with the package version', () => {
      render(
        <PiwikProProvider containerId={CONTAINER_ID} containerUrl={CONTAINER_URL}>
          <div />
        </PiwikProProvider>
      )

      expect(Miscellaneous.setTrackingSourceProvider).toHaveBeenCalledWith(
        'nextjs',
        VERSION
      )
    })

    it('sets the data layer name only when one is provided', () => {
      const { unmount } = render(
        <PiwikProProvider containerId={CONTAINER_ID} containerUrl={CONTAINER_URL}>
          <div />
        </PiwikProProvider>
      )
      expect(DataLayer.setDataLayerName).not.toHaveBeenCalled()
      unmount()

      render(
        <PiwikProProvider
          containerId={CONTAINER_ID}
          containerUrl={CONTAINER_URL}
          dataLayerName='myDataLayer'
        >
          <div />
        </PiwikProProvider>
      )
      expect(DataLayer.setDataLayerName).toHaveBeenCalledWith('myDataLayer')
    })

    it('runs the init side effects only once across re-renders', () => {
      const { rerender } = render(
        <StrictMode>
          <PiwikProProvider
            containerId={CONTAINER_ID}
            containerUrl={CONTAINER_URL}
          >
            <div />
          </PiwikProProvider>
        </StrictMode>
      )

      rerender(
        <StrictMode>
          <PiwikProProvider
            containerId={CONTAINER_ID}
            containerUrl={CONTAINER_URL}
          >
            <div />
          </PiwikProProvider>
        </StrictMode>
      )

      expect(
        (Miscellaneous.setTrackingSourceProvider as Mock).mock.calls
      ).toHaveLength(1)
    })
  })

  it('renders its children', () => {
    render(
      <PiwikProProvider containerId={CONTAINER_ID} containerUrl={CONTAINER_URL}>
        <span>tracked content</span>
      </PiwikProProvider>
    )

    expect(screen.getByText('tracked content')).toBeInTheDocument()
  })
})
