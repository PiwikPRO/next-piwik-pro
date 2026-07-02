import { Metadata, NextPage } from 'next'
import { PageData } from '@/types/pageData'
import UserManagementExamples from '@/src/components/UserManagement/UserManagementExamples'

const getPageData = (): PageData => ({
  title: 'UserManagement',
  heading: 'User Management',
  description: 'Allow api calls to interact with user data.',
  methods: [
    {
      method: 'getUserId',
      usage: 'UserManagement.getUserId()',
      desc: 'The function that will return user ID.'
    },
    {
      method: 'setUserId',
      usage: 'UserManagement.setUserId(userId: string)',
      desc: 'User ID is an additional parameter that allows you to aggregate data. When set up, you will be able to search through sessions by this parameter, filter reports through it or create Multi attribution reports using User ID.'
    },
    {
      method: 'resetUserId',
      usage: 'UserManagement.resetUserId()',
      desc: 'Clears previously set userID, e.g. when visitor logs out.'
    },
    {
      method: 'getVisitorId',
      usage: 'UserManagement.getVisitorId()',
      desc: 'Returns 16-character hex ID of the visitor.'
    },
    {
      method: 'getVisitorInfo',
      usage: 'UserManagement.getVisitorInfo()',
      desc: 'Returns 16-character hex ID of the visitor.'
    }
  ]
})

export const metadata: Metadata = {
  title: getPageData().title
}

const UserManagementPage: NextPage = () => {
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
            {'const { UserManagement } = usePiwikPro()'}
          </code>
        </p>
        <h2>Methods</h2>
        <ul>
          {pageData.methods.map(({ usage, desc }) => (
            <li key={usage}>
              <code>{usage}</code> - {desc}
            </li>
          ))}
        </ul>
        <UserManagementExamples />
      </article>
    </div>
  )
}

export default UserManagementPage
