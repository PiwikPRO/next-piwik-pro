import { Metadata, NextPage } from 'next'
import { PageData } from '@/types/pageData'
import GoalConversionsButton from '@/src/components/GoalConversions/GoalConversionsButton'

const getPageData = (): PageData => ({
  title: 'GoalConversions',
  heading: 'Goal Conversions',
  description:
    'Goals let you define important actions registered in your application and track conversions when the conditions for the action are fulfilled.',
  methods: [
    {
      method: 'trackGoal',
      usage:
        'GoalConversions.trackGoal(goalId: number | string, conversionValue: number, dimensions?: Object)',
      desc: 'Tracks manual goal conversion.'
    }
  ]
})

export const metadata: Metadata = {
  title: getPageData().title
}

const GoalConversionsPage: NextPage = () => {
  const pageData = getPageData()

  return (
    <div className='page-content'>
      <article>
        <h1>{pageData.heading}</h1>
        <p>{pageData.description}</p>
        <h2>Import</h2>
        <p>
          <code>
            {`import { usePiwikPro } from '@piwikpro/next-piwik-pro'`}
            <br />
            {'const { GoalConversions } = usePiwikPro()'}
          </code>
        </p>
        <h2>Methods</h2>
        <ul>
          {pageData.methods.map(({ usage, desc, method }) => (
            <li key={method}>
              <code>{usage}</code> - {desc}
            </li>
          ))}
        </ul>
        <h2>Sample usage</h2>
        <p>
          To see tracking methods usage please turn developers tools in your
          browser and track results on the console.
        </p>
        <p>
          You can use methods from that collection in page props for example{' '}
          <code>useEffect</code> (methods are invoked when the page starts) or
          as on example below on the button click using <code>onClick</code>{' '}
          prop.
        </p>
        <GoalConversionsButton />
      </article>
    </div>
  )
}

export default GoalConversionsPage
