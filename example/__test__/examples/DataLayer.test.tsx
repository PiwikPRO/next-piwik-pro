import DataLayerPage from '../../pages/examples/DataLayer'
import { render, screen, act, fireEvent } from '@testing-library/react'
import React from 'react'

const dataLayerPush = jest.fn()

jest.mock('@piwikpro/next-piwik-pro', () => {
  return {
    usePiwikPro: () => ({
      DataLayer: {
        push: dataLayerPush
      }
    })
  }
})

describe('DataLayer', () => {
  const pageData = {
    title: 'Data Layer Title',
    heading: 'Data Layer Heading',
    description: 'Data Layer description',
    methods: [
      {
        method: 'push',
        usage: 'DataLayer.push(dataLayerObject: Object)',
        desc: 'Adds an event to a data layer.'
      }
    ]
  }
  beforeEach(() => {
    dataLayerPush.mockReset()
  })

  it('should render properly', () => {
    // when
    render(<DataLayerPage pageData={pageData} />)

    // then
    expect(screen.getByRole('button').textContent).toEqual('DataLayer.push')
    screen.getByRole('heading', {
      name: /data layer heading/i
    })
    expect(dataLayerPush).toBeCalledTimes(1)
  })

  it('should push event to data layer', async () => {
    // given
    render(<DataLayerPage pageData={pageData} />)
    const pushButton = screen.getByRole('button')
    expect(pushButton).toBeDefined()

    // when
    await act(async () => {
      fireEvent.click(pushButton)
    })

    // then
    expect(dataLayerPush).toBeCalledTimes(2)
  })
})
