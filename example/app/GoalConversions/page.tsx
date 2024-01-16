import { Metadata, NextPage } from 'next'
import { PageData } from '@/types/pageData'
import utilStyles from '@/styles/utils.module.css'
import GoalConvetionsButton from '@/src/components/GoalConversions/GoalConvetionsButton'
import { Paper } from '@mui/material'

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
    <>
      <Paper sx={{ p: 2 }}>
        <article>
          <h1 className={utilStyles.headingXl}>{pageData.heading}</h1>
          <div>
            <p>{pageData.description}</p>
          </div>
          <h2 className={utilStyles.headingXl}>Import</h2>
          <div>
            <p>
              <code>
                {`import { usePiwikPro } from '@piwikpro/next-piwik-pro'`}
                <br />
                {'const { GoalConversions } = usePiwikPro()'}
              </code>
            </p>
          </div>
          <h2 className={utilStyles.headingXl}>Methods</h2>
          <div>
            <ul className={utilStyles.list}>
              {pageData.methods.map(({ usage, desc, method }) => (
                <li className={utilStyles.listItem} key={method}>
                  <code>{usage}</code> - {desc}
                </li>
              ))}
            </ul>
          </div>
          <h2 className={utilStyles.headingXl}>Sample usage</h2>
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
          <div>
            <GoalConvetionsButton />
          </div>
        </article>
      </Paper>
    </>
  )
}

export default GoalConversionsPage
