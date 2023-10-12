'use client'

import {Dispatch, FunctionComponent, SetStateAction, useEffect, useState} from 'react'
import {usePiwikPro} from '@piwikpro/next-piwik-pro'
import utilStyles from '@/styles/utils.module.css'

export type CustomDimensionButtonsProps = {
  customDimValue: string
  setCustomDimValue: Dispatch<SetStateAction<string>>
}

const CustomDimensionResults: FunctionComponent = () => {
  const {CustomDimensions} = usePiwikPro()

  const [customDimValue, setCustomDimValue] = useState<string>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      // function setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string): void
      CustomDimensions.setCustomDimensionValue(12, 'value')

      // function getCustomDimensionValue(customDimensionId: string | number): Promise<string>
      const cDimValue = await CustomDimensions.getCustomDimensionValue(12)
      setCustomDimValue(cDimValue)

      // function deleteCustomDimension(customDimensionId: string): void
      CustomDimensions.deleteCustomDimension('12')
    }

    callAsyncMethods()
  }, [])

  return (
    <div>
      <h2>Examples results</h2>
      <div>
        <p>
          <code>CustomDimensions.getCustomDimensionValue()</code> -
          {customDimValue}
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
      <button
        onClick={() => {
          CustomDimensions.setCustomDimensionValue(12, 'valueFromButton')
        }}
      >
        CustomDimensions.setCustomDimensionValue
      </button>
      <button
        onClick={() => {
          const callAsyncMethods = async () => {
            const cDimValue =
              await CustomDimensions.getCustomDimensionValue(12)
            setCustomDimValue(cDimValue)
          }

          callAsyncMethods()
        }}
      >
        CustomDimensions.getCustomDimensionValue
      </button>
      <button
        onClick={() => {
          CustomDimensions.deleteCustomDimension('12')
        }}
      >
        CustomDimensions.deleteCustomDimension
      </button>
    </div>
  )
}

export default CustomDimensionResults