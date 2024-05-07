'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import {
  eCommerce,
  Product,
  PaymentInformation
} from '@piwikpro/react-piwik-pro'
import { useSnackbar } from 'notistack'
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import AddIcon from '@mui/icons-material/Add'
import InfoIcon from '@mui/icons-material/Info'
import ProductDetailView from '@/src/components/eCommerce/ProductDetailView'

const products: Product[] = [
  {
    sku: 'sku-1',
    name: 'Product 1',
    category: ['product-category', 'product-category-1'],
    brand: 'Brand 1',
    variant: 'Variant 1',
    price: 9.99,
    customDimensions: {
      1: 'value1',
      2: 'value2'
    }
  },
  {
    sku: 'sku-2',
    name: 'Product 2',
    category: ['product-category', 'product-category-2'],
    brand: 'Brand 2',
    variant: 'Variant 2',
    price: 19.98,
    customDimensions: {
      1: 'value1',
      2: 'value2'
    }
  },
  {
    sku: 'sku-3',
    name: 'Product 3',
    category: ['product-category', 'product-category-3'],
    brand: 'Brand 3',
    variant: 'Variant 3',
    price: 29.97,
    customDimensions: {
      1: 'value1',
      2: 'value2'
    }
  },
  {
    sku: 'sku-4',
    name: 'Product 4',
    category: ['product-category', 'product-category-4'],
    brand: 'Brand 4',
    variant: 'Variant 4',
    price: 39.96,
    customDimensions: {
      1: 'value1',
      2: 'value2'
    }
  },
  {
    sku: 'sku-5',
    name: 'Product 5',
    category: ['product-category', 'product-category-5'],
    brand: 'Brand 5',
    variant: 'Variant 5',
    price: 49.95,
    customDimensions: {
      1: 'value1',
      2: 'value2'
    }
  },
  {
    sku: 'sku-6',
    name: 'Product 6',
    category: ['product-category', 'product-category-6'],
    brand: 'Brand 6',
    variant: 'Variant 6',
    price: 59.94,
    customDimensions: {
      1: 'value1',
      2: 'value2'
    }
  }
]

const eCommerceExamples: FunctionComponent = () => {
  useEffect(() => {
    document.title = 'eCommerce Page'
  })

  const [cart, setCart] = useState<Product[]>([])
  const { enqueueSnackbar } = useSnackbar()

  const handlelAddToCart = (product: Product) => {
    enqueueSnackbar(`eCommerce.ecommerceAddToCart()`, { variant: 'success' })
    eCommerce.ecommerceAddToCart([
      {
        ...product,
        quantity: 1
      }
    ])

    setCart([
      ...cart,
      {
        ...product,
        quantity: 1
      }
    ])
  }

  const handleCheckout = () => {
    if (!cart.length) {
      alert('Please add some products to the cart first')
      return
    }

    const subTotal = cart.reduce((acc, product) => {
      if (product.price) {
        return acc + product.price
      }
      return acc
    }, 0)

    const tax = 10
    const shipping = 4
    const discount = 5

    const paymentInformation: PaymentInformation = {
      orderId: 'order-123',
      grandTotal: subTotal + tax + shipping - discount,
      subTotal,
      tax,
      shipping,
      discount
    }

    enqueueSnackbar(`eCommerce.ecommerceOrder()`, { variant: 'success' })
    eCommerce.ecommerceOrder(cart, paymentInformation)
  }

  const removeProduct = (product: Product) => {
    const newCart = cart.filter((item) => item.sku !== product.sku)
    setCart(newCart)
    enqueueSnackbar(`eCommerce.ecommerceRemoveFromCart()`, {
      variant: 'success'
    })
    eCommerce.ecommerceRemoveFromCart(newCart)
  }

  const increaseProductQuantity = (product: Product) => {
    const newCart = cart.map((item) => {
      if (item.sku === product.sku && item.quantity) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    const subTotal = cart.reduce((acc, product) => {
      if (product.price) {
        return acc + product.price
      }
      return acc
    }, 0)

    const tax = 10
    const shipping = 4
    const discount = 5

    setCart(newCart)
    enqueueSnackbar(`eCommerce.ecommerceCartUpdate()`, { variant: 'success' })
    eCommerce.ecommerceCartUpdate(newCart, subTotal + tax + shipping - discount)
  }

  const [productDetailViewOpen, setProductDetailViewOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductDetailViewOpen = (product: Product) => {
    setSelectedProduct(product)
    setProductDetailViewOpen(true)
    enqueueSnackbar(`eCommerce.ecommerceProductDetailView()`, {
      variant: 'success'
    })
    eCommerce.ecommerceProductDetailView([product])
  }

  return (
    <Grid container spacing={4}>
      <Grid xs={12} sm={7} item>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography fontWeight={500}>Product list</Typography>
          <List>
            {products.map((product) => {
              return (
                <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={product.name}
                    secondary={product.variant}
                  />
                  <Typography variant='body2'>${product.price}</Typography>
                  <Box ml={2}>
                    <IconButton
                      component={'span'}
                      color={'primary'}
                      onClick={() => handleProductDetailViewOpen(product)}
                    >
                      <InfoIcon />
                    </IconButton>
                    <IconButton
                      component={'span'}
                      color={'primary'}
                      onClick={() => handlelAddToCart(product)}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              )
            })}
          </List>
        </Paper>
      </Grid>
      <Grid xs={12} sm={5} item>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography fontWeight={500}>Checkout</Typography>
          <Grid item container direction='column' xs={12}>
            <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
              Payment details
            </Typography>
            <Grid item xs={12}>
              <List>
                {cart.map((product: Product, index) => {
                  return (
                    <ListItem key={index} sx={{ py: 1, px: 0 }}>
                      {product.quantity && (
                        <Typography variant='body2'>
                          {product.quantity} X &nbsp;
                        </Typography>
                      )}
                      <ListItemText
                        primary={product.name}
                        secondary={product.variant}
                      />
                      <Typography variant='body2'>${product.price}</Typography>
                      <Box ml={2}>
                        <IconButton
                          component={'span'}
                          color={'primary'}
                          onClick={() => increaseProductQuantity(product)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Box ml={2}>
                        <IconButton
                          component={'span'}
                          color={'primary'}
                          onClick={() => removeProduct(product)}
                        >
                          <RemoveShoppingCartIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item sm={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleCheckout} sx={{ ml: 1 }}>
              Place order
            </Button>
          </Box>
        </Paper>
      </Grid>

      <ProductDetailView
        product={selectedProduct}
        isOpen={productDetailViewOpen}
        close={() => setProductDetailViewOpen(false)}
      />
    </Grid>
  )
}

export default eCommerceExamples
