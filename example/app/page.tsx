import Link from 'next/link'
import { Metadata } from 'next'

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

export const metadata: Metadata = {
  title: 'Piwik PRO - Next.js examples'
}

const Home = () => {
  return (
    <div className='home-content'>
      <h1>Examples of usage</h1>
      <nav className='nav-list'>
        {EXAMPLES.map((id) => (
          <Link key={id} className='nav-link' href={`/${id}`}>
            {id}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default Home
