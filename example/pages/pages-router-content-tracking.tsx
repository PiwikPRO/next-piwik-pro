import ContentTrackingPiwik from '@/src/components/ContentTracking/ContentTrackingPiwik'
import PiwikProProvider from '@piwikpro/next-piwik-pro'
import { appConfig } from '@/src/config'

export default function App() {
  return (
    <PiwikProProvider
      containerUrl={appConfig.containerUrl}
      containerId={appConfig.containerId}
    >
      <ContentTrackingPiwik />
    </PiwikProProvider>
  )
}
