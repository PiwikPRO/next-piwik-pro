import {FunctionComponent, useEffect} from 'react'
import {usePiwikPro} from '@piwikpro/next-piwik-pro'

const PageViewsButton: FunctionComponent = () => {
  const {PageViews} = usePiwikPro()

  useEffect(() => {
    // function trackPageView(customPageTitle?: string | undefined): void
    PageViews.trackPageView('optional title')
  }, [])

  return (
    <button
      onClick={() => {
        PageViews.trackPageView('optional title from button')
      }}
    >
      PageViews.trackPageView
    </button>
  )
}

export default PageViewsButton