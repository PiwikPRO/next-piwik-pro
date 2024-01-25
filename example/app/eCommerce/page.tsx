import { Metadata, NextPage } from 'next'
import ECommerceExamples from '@/src/components/eCommerce/eCommerceExamples'
import { PageData } from '@/types/pageData'
import { List, ListItem, ListItemText, Paper } from '@mui/material'

const getPageData = (): PageData => ({
  title: 'eCommerce',
  heading: 'User Management',
  description:
    'Collection of methods to handle eCommerce events through the Piwik PRO API.',
  methods: [
    {
      method: 'ecommerceAddToCart',
      usage: 'ecommerce.ecommerceAddToCart(products: Product[])',
      desc: 'Tracks action of adding products to a cart.'
    },
    {
      method: 'ecommerceRemoveFromCart',
      usage: 'ecommerce.ecommerceRemoveFromCart(products: Product[])',
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
      <Paper sx={{ p: 2 }}>
        <article>
          <h1>{pageData.heading}</h1>
          <div>
            <p>{pageData.description}</p>
          </div>
          <h2>Import</h2>
          <div>
            <p>
              <code>
                {`import { usePiwikPro } from '@piwikpro/next-piwik-pro'`}
                <br />
                {'const { eCommerce } = usePiwikPro()'}
              </code>
            </p>
          </div>
          <h2>Methods</h2>
          <div>
            <List>
              {pageData.methods.map(({ usage, desc, method }) => (
                <ListItem key={method}>
                  <ListItemText>
                    <code>{usage}</code> - {desc}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </div>
          <ECommerceExamples />
        </article>
      </Paper>
    </>
  )
}

export default eCommercePage
