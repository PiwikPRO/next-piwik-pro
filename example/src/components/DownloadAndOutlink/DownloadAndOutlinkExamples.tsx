'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const DownloadAndOutlinkExamples: FunctionComponent = () => {
  const { DownloadAndOutlink } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  const [linkTrackingTimer, setLinkTrackingTimer] = useState<string>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      DownloadAndOutlink.trackLink('http://localhost:3000', 'link')

      DownloadAndOutlink.enableLinkTracking(true)

      DownloadAndOutlink.setLinkClasses(['this-is-an-outlink'])

      DownloadAndOutlink.setDownloadClasses(['this-is-a-download'])

      DownloadAndOutlink.setDownloadExtensions(['zip'])

      DownloadAndOutlink.addDownloadExtensions(['7z'])

      DownloadAndOutlink.removeDownloadExtensions(['pdf', 'xlsx'])

      DownloadAndOutlink.setLinkTrackingTimer(10)

      const lTrackingTimer = await DownloadAndOutlink.getLinkTrackingTimer()
      setLinkTrackingTimer(lTrackingTimer.toString())

      DownloadAndOutlink.setIgnoreClasses(['do-not-track'])
    }

    callAsyncMethods()
  }, [])

  return (
    <>
      <h2>Examples results</h2>
      <div>
        <p>
          <code>DownloadAndOutlink.getLinkTrackingTimer()</code> -{' '}
          {linkTrackingTimer}
        </p>
      </div>
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
            DownloadAndOutlink.trackLink('http://localhost:3000', 'link')
            enqueueSnackbar(
              "DownloadAndOutlink.trackLink('http://localhost:3000', 'link')"
            )
          }}
        >
          DownloadAndOutlink.trackLink
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.enableLinkTracking(true)
            enqueueSnackbar('DownloadAndOutlink.enableLinkTracking(true)')
          }}
        >
          DownloadAndOutlink.enableLinkTracking
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.setLinkClasses(['this-is-an-outlink'])
            enqueueSnackbar(
              "DownloadAndOutlink.setLinkClasses(['this-is-an-outlink'])"
            )
          }}
        >
          DownloadAndOutlink.setLinkClasses
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.setDownloadClasses(['this-is-a-download'])
            enqueueSnackbar(
              "DownloadAndOutlink.setDownloadClasses(['this-is-a-download'])"
            )
          }}
        >
          DownloadAndOutlink.setDownloadClasses
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.addDownloadExtensions(['rar'])
            enqueueSnackbar(
              'DownloadAndOutlink.addDownloadExtensions - add RAR tracking'
            )
          }}
        >
          DownloadAndOutlink.addDownloadExtensions - add RAR tracking
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.removeDownloadExtensions(['rar'])
            enqueueSnackbar(
              'DownloadAndOutlink.removeDownloadExtensions - remove RAR tracking'
            )
          }}
        >
          DownloadAndOutlink.removeDownloadExtensions - remove RAR tracking
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.setIgnoreClasses(['do-not-track'])
            enqueueSnackbar(
              "DownloadAndOutlink.setIgnoreClasses(['do-not-track'])"
            )
          }}
        >
          DownloadAndOutlink.setIgnoreClasses
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.setLinkTrackingTimer(20)
            enqueueSnackbar('DownloadAndOutlink.setLinkTrackingTimer(20)')
          }}
        >
          DownloadAndOutlink.setLinkTrackingTimer
        </button>
        <button
          className='btn'
          onClick={() => {
            const callAsyncMethods = async () => {
              const lTrackingTimer =
                await DownloadAndOutlink.getLinkTrackingTimer()
              setLinkTrackingTimer(lTrackingTimer.toString())
              enqueueSnackbar('DownloadAndOutlink.getLinkTrackingTimer()')
            }

            callAsyncMethods()
          }}
        >
          DownloadAndOutlink.getLinkTrackingTimer
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.addDownloadClasses(['this-is-a-download'])
            enqueueSnackbar(
              "DownloadAndOutlink.addDownloadClasses(['this-is-a-download'])"
            )
          }}
        >
          DownloadAndOutlink.addDownloadClasses - add download class
        </button>
        <button
          className='btn'
          onClick={() => {
            DownloadAndOutlink.removeDownloadClasses(['this-is-a-download'])
            enqueueSnackbar(
              "DownloadAndOutlink.removeDownloadClasses(['this-is-a-download'])"
            )
          }}
        >
          DownloadAndOutlink.removeDownloadClasses - remove download class
        </button>

        <h2>Example download</h2>
        <div>
          <a href='/files/example.zip'>Download ZIP</a> - tracked download
          <br />
          <a href='/files/example.pdf'>Download PDF</a> - outlink
          <br />
          <a href='/files/example.rar'>Download RAR</a> - download tracked
          disabled by default, you can turn on/off by button
          <br />
          <a className='do-not-track' href='/files/example.xlsx'>
            Download XLSX
          </a>{' '}
          - download turned off by default using className
          <br />
          <a className='this-is-a-download' href='/files/example.7z'>
            Download 7Z
          </a>{' '}
          - download or outlink depending on if the class name{' '}
          <code>this-is-a-download</code> is present
        </div>
      </div>
    </>
  )
}

export default DownloadAndOutlinkExamples
