import {render} from '@testing-library/react'
import IndexPage from '@/app/page.tsx'

it('renders homepage unchanged', () => {
  const {container} = render(<IndexPage/>)
  expect(container).toMatchSnapshot()
})