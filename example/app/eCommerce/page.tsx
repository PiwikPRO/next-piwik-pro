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
