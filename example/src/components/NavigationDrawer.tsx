'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const EXAMPLES: string[] = [
  'ContentTracking',
  'CustomDimensions',
  'CustomEvent',
  'DataLayer',
  'DownloadAndOutlink',
  'eCommerce',
  'GoalConversions',
  'SiteSearch',
  'UserManagement',
  'PageViews'
]

const NavigationDrawer: FunctionComponent = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (pathname === '/') {
    return null
  }

  return (
    <>
      <button
        className='menu-toggle'
        aria-label='Open menu'
        onClick={() => setIsOpen(true)}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          width='20'
          height='20'
        >
          <line x1='3' y1='6' x2='21' y2='6' />
          <line x1='3' y1='12' x2='21' y2='12' />
          <line x1='3' y1='18' x2='21' y2='18' />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className='drawer-overlay' onClick={() => setIsOpen(false)} />
          <aside className='drawer'>
            <button
              className='drawer-close'
              aria-label='Close menu'
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
            <nav className='nav-list'>
              {EXAMPLES.map((id) => (
                <Link key={id} className='nav-link' href={`/${id}`}>
                  {id}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </>
  )
}

export default NavigationDrawer
