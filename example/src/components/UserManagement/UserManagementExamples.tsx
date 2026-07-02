'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const UserManagementExamples: FunctionComponent = () => {
  const { UserManagement } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  const [userId, setUserId] = useState<string>('')
  const [visitorId, setVisitorId] = useState<string>('')
  const [visitorInfo, setVisitorInfo] = useState<any>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      // function setUserId(userId: string): void
      UserManagement.setUserId('UserId')

      // function getUserId(): Promise<string>
      const uId = await UserManagement.getUserId()
      setUserId(uId)

      // function getVisitorId(): Promise<string>
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
    <div>
      <h2>Examples results</h2>
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
      <h2>Sample usage</h2>
      <p>
        To see tracking methods usage please turn developers tools in your
        browser and track results on the console.
      </p>
      <p>
        You can use methods from that collection in page props for example{' '}
        <code>useEffect</code> (methods are invoked when the page starts) or as
        on example below on the button click using <code>onClick</code> prop.
      </p>
      <div>
        <button
          className='btn'
          onClick={() => {
            UserManagement.setUserId('UserIdButton')
            enqueueSnackbar("UserManagement.setUserId('UserIdButton')")
          }}
        >
          UserManagement.setUserId
        </button>
        <button
          className='btn'
          onClick={() => {
            const callAsyncMethods = async () => {
              const uId = await UserManagement.getUserId()
              setUserId(uId)
              enqueueSnackbar('UserManagement.getUserId()')
            }

            callAsyncMethods()
          }}
        >
          UserManagement.getUserId
        </button>
        <button
          className='btn'
          onClick={() => {
            const callAsyncMethods = async () => {
              const vId = await UserManagement.getVisitorId()
              setVisitorId(vId)
              enqueueSnackbar('UserManagement.getVisitorId()')
            }

            callAsyncMethods()
          }}
        >
          UserManagement.getVisitorId
        </button>
        <button
          className='btn'
          onClick={() => {
            const callAsyncMethods = async () => {
              const vInfo = await UserManagement.getVisitorInfo()
              setVisitorInfo(vInfo)
              enqueueSnackbar('UserManagement.getVisitorInfo()')
            }

            callAsyncMethods()
          }}
        >
          UserManagement.getVisitorInfo
        </button>
        <button
          className='btn'
          onClick={() => {
            UserManagement.resetUserId()
            enqueueSnackbar('UserManagement.resetUserId()')
          }}
        >
          UserManagement.resetUserId
        </button>
      </div>
    </div>
  )
}

export default UserManagementExamples
