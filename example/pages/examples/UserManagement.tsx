import Layout from '../../components/layout'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetStaticProps
} from 'next'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import React, { useEffect, useState } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const pageData = {
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

  return {
    props: {
      pageData
    }
  }
}

const UserManagementPage: NextPage<
  InferGetServerSidePropsType<GetStaticProps>
> = ({ pageData }: { pageData: any }) => {
  const { UserManagement } = usePiwikPro()

  const [userId, setUserId] = useState<string>('')
  const [visitorId, setVisitorId] = useState<string>('')
  const [visitorInfo, setVisitorInfo] = useState<any>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      // function getUserId(): Promise<string>
      UserManagement.setUserId('UserId')

      // function getUserId(): Promise<string>
      const uId = await UserManagement.getUserId()
      setUserId(uId)

      // function getUserId(): Promise<string>
      const vId = await UserManagement.getVisitorId()
      setVisitorId(vId)

      // function getVisitorInfo(): Promise<any[]>
      const vInfo = await UserManagement.getVisitorInfo()
      setVisitorInfo(vInfo)

      // function resetUserId(): void
      UserManagement.resetUserId()
    }

    callAsyncMethods()
  }, [])

  return (
    <Layout>
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
              <br />
              {'const { UserManagement } = usePiwikPro()'}
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
        <h2>Examples results</h2>
        <div>
          <p>
            <code>UserManagement.getUserId()</code> - {userId}
          </p>
          <p>
            <code>UserManagement.getVisitorId()</code> - {visitorId}
          </p>
          <p>
            <code>UserManagement.getVisitorInfo()</code> -{' '}
            {JSON.stringify(visitorInfo)}
          </p>
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
          <button
            onClick={() => {
              UserManagement.setUserId('UserIdButton')
            }}
          >
            UserManagement.setUserId
          </button>
          <button
            onClick={() => {
              const callAsyncMethods = async () => {
                const uId = await UserManagement.getUserId()
                setUserId(uId)
              }

              callAsyncMethods()
            }}
          >
            UserManagement.getUserId
          </button>
          <button
            onClick={() => {
              const callAsyncMethods = async () => {
                const vId = await UserManagement.getVisitorId()
                setVisitorId(vId)
              }

              callAsyncMethods()
            }}
          >
            UserManagement.getVisitorId
          </button>
          <button
            onClick={() => {
              const callAsyncMethods = async () => {
                const vInfo = await UserManagement.getVisitorInfo()
                setVisitorInfo(vInfo)
              }

              callAsyncMethods()
            }}
          >
            UserManagement.getVisitorInfo
          </button>
          <button
            onClick={() => {
              UserManagement.resetUserId()
            }}
          >
            UserManagement.resetUserId
          </button>
        </div>
      </article>
    </Layout>
  )
}

export default UserManagementPage
