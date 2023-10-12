'use client'

import {FunctionComponent, useEffect, useState} from 'react'
import {usePiwikPro} from '@piwikpro/next-piwik-pro'
import utilStyles from '@/styles/utils.module.css'

const eCommerceExamples: FunctionComponent = () => {
  const {eCommerce} = usePiwikPro()

  const [eCommerceItems, setECommerceInfo] = useState<any>('')

  useEffect(() => {
    const callAsyncMethods = async () => {
      // function addEcommerceItem(productSKU: string, productName: string, productCategory: string | string[], productPrice: number, productQuantity: number): void
      eCommerce.addEcommerceItem('1', 'ProductName', 'Items', 69, 1)

      // function getEcommerceItems(): Promise<object>
      const ecItem = await eCommerce.getEcommerceItems()
      setECommerceInfo(ecItem)

      // function removeEcommerceItem(productSKU: string): void
      eCommerce.removeEcommerceItem('1')

      // function trackEcommerceOrder(orderId: string, orderGrandTotal: number, orderSubTotal?: number | undefined, orderTax?: number | undefined, orderShipping?: number | undefined, orderDiscount?: number | undefined): void
      eCommerce.trackEcommerceOrder('id', 50)

      // function trackEcommerceCartUpdate(cartAmount: number): void
      eCommerce.trackEcommerceCartUpdate(2)

      // function setEcommerceView(productSKU: string, productName?: string | undefined, productCategory?: string[] | undefined, productPrice?: string | undefined): void
      eCommerce.setEcommerceView('1')

      // function clearEcommerceCart(): void
      eCommerce.clearEcommerceCart()
    }

    callAsyncMethods()
  }, [])

  return (
    <>
      <h2>Examples results</h2>
      <div>
        <p>
          <code>eCommerce.getEcommerceItems()</code> -{' '}
          {JSON.stringify(eCommerceItems)}
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
            eCommerce.addEcommerceItem('2', 'Button', 'Items', 12, 1)
          }}
        >
          eCommerce.addEcommerceItem
        </button>
        <button
          onClick={() => {
            eCommerce.removeEcommerceItem('1')
          }}
        >
          eCommerce.removeEcommerceItem
        </button>
        <button
          onClick={() => {
            eCommerce.trackEcommerceOrder('id', 50)
          }}
        >
          eCommerce.trackEcommerceOrder
        </button>
        <button
          onClick={() => {
            eCommerce.trackEcommerceCartUpdate(2)
          }}
        >
          eCommerce.trackEcommerceCartUpdate
        </button>
        <button
          onClick={() => {
            eCommerce.setEcommerceView('1')
          }}
        >
          eCommerce.setEcommerceView
        </button>
        <button
          onClick={() => {
            eCommerce.clearEcommerceCart()
          }}
        >
          eCommerce.clearEcommerceCart
        </button>
        {' '}
        <button
          onClick={() => {
            const callAsyncMethods = async () => {
              const ecItem = await eCommerce.getEcommerceItems()
              setECommerceInfo(ecItem)
            }

            callAsyncMethods()
          }}
        >
          eCommerce.getEcommerceItems
        </button>
      </div>
    </>
  )
}

export default eCommerceExamples