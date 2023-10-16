import {NextPage} from 'next'
import {PageData} from '@/types/pageData'
import Head from 'next/head'
import utilStyles from '@/styles/utils.module.css'
import UserManagementExamples from '@/src/components/UserManagement/UserManagementExamples'

const getPageData = (): PageData => (
  {
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
  }
)

const UserManagementPage: NextPage = () => {
  const pageData = getPageData()

  return (
    <>
      <Head>
        <title>{pageData.title}</title>
      </Head>
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
              <br/>
              {'const { UserManagement } = usePiwikPro()'}
            </code>
          </p>
        </div>
        <h2 className={utilStyles.headingXl}>Methods</h2>
        <div>
          <ul className={utilStyles.list}>
            {pageData.methods.map(({usage, desc, method}) => (
              <li className={utilStyles.listItem} key={method}>
                <code>{usage}</code> - {desc}
              </li>
            ))}
          </ul>
        </div>
        <UserManagementExamples/>
      </article>
    </>
  )
}

export default UserManagementPage