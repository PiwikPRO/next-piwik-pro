import { Metadata, NextPage } from 'next'
import ECommerceExamples from '@/src/components/eCommerce/eCommerceExamples'
import { PageData } from '@/types/pageData'

const getPageData = (): PageData => ({
  title: 'eCommerce',
  heading: 'eCommerce',
  description:
    'Collection of methods to handle eCommerce events through the Piwik PRO API.',
  methods: [
    {
      method: 'ecommerceAddToCart',
      usage: 'eCommerce.ecommerceAddToCart(products: Product[])',
      desc: 'Tracks action of adding products to a cart.'
    },
    {
      method: 'ecommerceRemoveFromCart',
      usage: 'eCommerce.ecommerceRemoveFromCart(products: Product[])',
      desc: 'Tracks action of removing a products from a cart.'
    },
    {
      method: 'ecommerceOrder',
      usage:
        'eCommerce.ecommerceOrder(products: Product[], paymentInformation: PaymentInformation)',
      desc: 'Tracks conversion (including products and payment details).'
    },
    {
      method: 'ecommerceCartUpdate',
      usage:
        "eCommerce.ecommerceCartUpdate(products: Product[], grandTotal: PaymentInformation['grandTotal'])",
      desc: 'Tracks current state of a cart.'
    },
    {
      method: 'ecommerceProductDetailView',
      usage: 'eCommerce.ecommerceProductDetailView(products: Product[])',
      desc: 'Tracks product or category view. Must be followed by a page view.'
    }
  ]
})

export const metadata: Metadata = {
  title: getPageData().title
}

const eCommercePage: NextPage = () => {
  const pageData = getPageData()
  return (
    <>
      <div className='page-content'>
        <article>
          <h1>{pageData.heading}</h1>
          <p>{pageData.description}</p>
          <h2>Import</h2>
          <p>
            <code>
              {`import { usePiwikPro } from '@piwikpro/next-piwik-pro'`}
              <br />
              {'const { eCommerce } = usePiwikPro()'}
            </code>
          </p>
          <h2>Methods</h2>
          <ul>
            {pageData.methods.map(({ usage, desc, method }) => (
              <li key={method}>
                <code>{usage}</code> - {desc}
              </li>
            ))}
          </ul>
        </article>
      </div>
      <ECommerceExamples />
    </>
  )
}

export default eCommercePage
