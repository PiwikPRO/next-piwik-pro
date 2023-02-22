import Home from '../pages/index'
import { render } from '@testing-library/react'
import React from 'react'

describe('Index', () => {
  it('should render homepage unchanged', () => {
    // given
    const ids = ['DownloadAndOutlink', 'GoalConversions']

    // when
    const { container } = render(<Home ids={ids} />)

    // then
    expect(container).toMatchSnapshot()
  })
})
