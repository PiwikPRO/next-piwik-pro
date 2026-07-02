'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { usePiwikPro } from '@piwikpro/next-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'

const CustomDimensionResults: FunctionComponent = () => {
  const { CustomDimensions } = usePiwikPro()
  const { enqueueSnackbar } = useSnackbar()

  const [customDimValue, setCustomDimValue] = useState<string>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      // function setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string): void
      CustomDimensions.setCustomDimensionValue(12, 'value')

      // function getCustomDimensionValue(customDimensionId: string | number): Promise<string>
      const cDimValue = await CustomDimensions.getCustomDimensionValue(12)
      setCustomDimValue(cDimValue ?? '')

      // function deleteCustomDimension(customDimensionId: string): void
      CustomDimensions.deleteCustomDimension('12')
    }

    callAsyncMethods()
  }, [])

  return (
    <div>
      <h2>Examples results</h2>
      <p>
        <code>CustomDimensions.getCustomDimensionValue()</code> -{' '}
        {customDimValue}
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
      <button
        className='btn'
        onClick={() => {
          CustomDimensions.setCustomDimensionValue(12, 'valueFromButton')
          enqueueSnackbar(
            "CustomDimensions.setCustomDimensionValue(12, 'valueFromButton')"
          )
        }}
      >
        CustomDimensions.setCustomDimensionValue
      </button>
      <button
        className='btn'
        onClick={() => {
          const callAsyncMethods = async () => {
            const cDimValue = await CustomDimensions.getCustomDimensionValue(12)
            setCustomDimValue(cDimValue ?? '')
            enqueueSnackbar('CustomDimensions.getCustomDimensionValue(12)')
          }

          callAsyncMethods()
        }}
      >
        CustomDimensions.getCustomDimensionValue
      </button>
      <button
        className='btn'
        onClick={() => {
          CustomDimensions.deleteCustomDimension('12')
          enqueueSnackbar("CustomDimensions.deleteCustomDimension('12')")
        }}
      >
        CustomDimensions.deleteCustomDimension
      </button>
    </div>
  )
}

export default CustomDimensionResults
