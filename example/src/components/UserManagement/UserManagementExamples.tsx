'use client'

import utilStyles from '@/styles/utils.module.css'
import { FunctionComponent, useEffect, useState } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { Button } from '@mui/material'

const UserManagementExamples: FunctionComponent = () => {
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
    <>
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
        <code>useEffect</code> (methods are invoked when the page starts) or as
        on example below on the button click using <code>onClick</code> prop.
      </p>
      <div>
        <Button
          sx={{ ml: 2, mt: 2 }}
          variant='contained'
          onClick={() => {
            UserManagement.setUserId('UserIdButton')
          }}
        >
          UserManagement.setUserId
        </Button>
        <Button
          sx={{ ml: 2, mt: 2 }}
          variant='contained'
          onClick={() => {
            const callAsyncMethods = async () => {
              const uId = await UserManagement.getUserId()
              setUserId(uId)
            }

            callAsyncMethods()
          }}
        >
          UserManagement.getUserId
        </Button>
        <Button
          sx={{ ml: 2, mt: 2 }}
          variant='contained'
          onClick={() => {
            const callAsyncMethods = async () => {
              const vId = await UserManagement.getVisitorId()
              setVisitorId(vId)
            }

            callAsyncMethods()
          }}
        >
          UserManagement.getVisitorId
        </Button>
        <Button
          sx={{ ml: 2, mt: 2 }}
          variant='contained'
          onClick={() => {
            const callAsyncMethods = async () => {
              const vInfo = await UserManagement.getVisitorInfo()
              setVisitorInfo(vInfo)
            }

            callAsyncMethods()
          }}
        >
          UserManagement.getVisitorInfo
        </Button>
        <Button
          sx={{ ml: 2, mt: 2 }}
          variant='contained'
          onClick={() => {
            UserManagement.resetUserId()
          }}
        >
          UserManagement.resetUserId
        </Button>
      </div>
    </>
  )
}

export default UserManagementExamples
