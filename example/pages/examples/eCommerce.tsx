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
    title: 'eCommerce',
    heading: 'User Management',
    description: 'Allow api calls to interact with visitor data.',
    methods: [
      {
        method: 'addEcommerceItem',
        usage:
          'eCommerce.addEcommerceItem(productSKU: string, productName: string, productCategory: string | string[], productPrice: number, productQuantity: number)',
        desc: 'Adds a product to a virtual shopping cart. If a product with the same SKU is in the cart, it will be removed first. Does not send any data to the Collecting & Processing Pipeline.'
      },
      {
        method: 'removeEcommerceItem',
        usage: 'eCommerce.removeEcommerceItem(productSKU: string)',
        desc: '  Removes a product with the provided SKU from a virtual shopping cart. If multiple units of that product are in the virtual cart, all of them will be removed. Does not send any data to the Collecting & Processing Pipeline.'
      },
      {
        method: 'clearEcommerceCart',
        usage: 'eCommerce.clearEcommerceCart()',
        desc: 'Removes all items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline.'
      },
      {
        method: 'getEcommerceItems',
        usage: 'eCommerce.getEcommerceItems()',
        desc: 'Returns a copy of items from a virtual shopping cart. Does not send any data to the Collecting & Processing Pipeline'
      },
      {
        method: 'trackEcommerceOrder',
        usage: 'eCommerce.trackEcommerceOrder()',
        desc: 'Tracks a successfully placed e-commerce order with items present in a virtual cart (registered using addEcommerceItem).'
      },
      {
        method: 'trackEcommerceCartUpdate',
        usage: 'eCommerce.trackEcommerceCartUpdate(cartAmount: number)',
        desc: 'Tracks items present in a virtual shopping cart (registered with addEcommerceItem)'
      },
      {
        method: 'setEcommerceView',
        usage:
          'eCommerce.setEcommerceView(productSKU: string, productName?: string, productCategory?: string[], productPrice?: string)',
        desc: 'Tracks product or category view. Must be followed by a page view.'
      }
    ]
  }

  return {
    props: {
      pageData
    }
  }
}

const ECommercePage: NextPage<InferGetServerSidePropsType<GetStaticProps>> = ({
  pageData
}: {
  pageData: any
}) => {
  const { eCommerce } = usePiwikPro()

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
              {'const { eCommerce } = usePiwikPro()'}
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
          </button>{' '}
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
      </article>
    </Layout>
  )
}

export default ECommercePage
