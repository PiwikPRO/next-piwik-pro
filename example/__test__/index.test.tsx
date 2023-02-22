import Home from '../pages/index'
import { render, screen } from '@testing-library/react'
import React from 'react'

describe('Index', () => {
  it('should render home page without examples', () => {
    // when
    render(<Home ids={[]} />)

    // then
    const examplesList = screen.queryAllByRole('link')
    expect(examplesList).toHaveLength(0)
  })

  it('should render home page with examples', () => {
    // given
    const ids = ['ContentTracking', 'DataLayer']

    // when
    render(<Home ids={ids} />)

    // then
    const examplesNames = screen
      .getAllByRole('link')
      .map((elem) => elem.getAttribute('href'))

    expect(examplesNames).toEqual([
      '/examples/ContentTracking',
      '/examples/DataLayer'
    ])
  })
})
