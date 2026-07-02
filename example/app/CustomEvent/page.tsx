import { PageData } from '@/types/pageData'
import CustomEventButton from '@/src/components/CustomEvent/CustomEventButton'
import { Metadata, NextPage } from 'next'

const getPageData = (): PageData => ({
  title: 'CustomEvent',
  heading: 'Send Custom Events',
  description:
    'Content Tracking lets you track custom events not defined in rest of methods.',
  methods: [
    {
      method: 'trackEvent',
      usage:
        'CustomEvent.trackEvent(category: string, action: string, name?: string | undefined, value?: number | undefined): void',
      desc: 'Tracks manual content impression event.'
    }
  ]
})

export const metadata: Metadata = {
  title: getPageData().title
}

const CustomEventPage: NextPage = () => {
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
            {'const { CustomEvent } = usePiwikPro()'}
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
        <CustomEventButton title={pageData.title} />
      </article>
    </div>
  )
}

export default CustomEventPage
