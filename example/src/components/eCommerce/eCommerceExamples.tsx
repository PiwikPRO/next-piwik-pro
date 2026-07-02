'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import {
  eCommerce,
  Product,
  PaymentInformation
} from '@piwikpro/react-piwik-pro'
import { useSnackbar } from '@/providers/Snackbar'
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
  }, [])

  const [cart, setCart] = useState<Product[]>([])
  const { enqueueSnackbar } = useSnackbar()

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productDetailViewOpen, setProductDetailViewOpen] = useState(false)

  const handleAddToCart = (product: Product) => {
    enqueueSnackbar('eCommerce.ecommerceAddToCart()')
    eCommerce.ecommerceAddToCart([{ ...product, quantity: 1 }], {
      currencyCode: 'USD'
    })

    if (cart.some((item) => item.sku === product.sku)) {
      setCart(
        cart.map((item) =>
          item.sku === product.sku
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        )
      )
      return
    }

    setCart([...cart, { ...product, quantity: 1 }])
  }

  const removeProduct = (product: Product) => {
    const newCart = cart.filter((item) => item.sku !== product.sku)
    setCart(newCart)
    enqueueSnackbar('eCommerce.ecommerceRemoveFromCart()')
    eCommerce.ecommerceRemoveFromCart([{ ...product, quantity: 1 }], {
      currencyCode: 'USD'
    })
  }

  const increaseProductQuantity = (product: Product) => {
    const newCart = cart.map((item) =>
      item.sku === product.sku && item.quantity
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )

    const grandTotal = newCart.reduce(
      (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1),
      0
    )

    setCart(newCart)
    enqueueSnackbar('eCommerce.ecommerceCartUpdate()')
    eCommerce.ecommerceCartUpdate(newCart, grandTotal, {
      currencyCode: 'USD'
    })
  }

  const handleCheckout = () => {
    if (!cart.length) {
      alert('Please add some products to the cart first')
      return
    }

    const subTotal = cart.reduce(
      (acc, product) => (product.price ? acc + product.price : acc),
      0
    )

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

    enqueueSnackbar('eCommerce.ecommerceOrder()')
    eCommerce.ecommerceOrder(cart, paymentInformation, { currencyCode: 'USD' })
  }

  const handleProductDetailViewOpen = (product: Product) => {
    setSelectedProduct(product)
    setProductDetailViewOpen(true)
    enqueueSnackbar('eCommerce.ecommerceProductDetailView()')
    eCommerce.ecommerceProductDetailView([product], { currencyCode: 'USD' })
  }

  return (
    <div className='columns-2'>
      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title'>Product list</h2>
          <div className='overflow-x-auto'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Details</th>
                  <th>Add to cart</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.sku}>
                    <th>
                      {product.name}
                      <br />
                      <small>{product.variant}</small>
                    </th>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className='btn btn-sm'
                        onClick={() => handleProductDetailViewOpen(product)}
                      >
                        details
                      </button>
                    </td>
                    <td>
                      <button
                        className='btn btn-sm'
                        onClick={() => handleAddToCart(product)}
                      >
                        add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='card'>
        <div className='card-body'>
          <h2 className='card-title'>Cart</h2>
          {cart.length ? (
            <div className='overflow-x-auto mb-5'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product.sku}>
                      <th>
                        {product.name}
                        <br />
                        <small>{product.variant}</small>
                      </th>
                      <td>{product.quantity}</td>
                      <td>${product.price}</td>
                      <td>
                        <button
                          className='btn btn-sm'
                          onClick={() => increaseProductQuantity(product)}
                        >
                          + quantity
                        </button>
                        <button
                          className='btn btn-sm'
                          onClick={() => removeProduct(product)}
                        >
                          remove from cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Cart is empty</p>
          )}
          {cart.length > 0 && (
            <div className='card-actions justify-end'>
              <button className='btn btn-sm' onClick={handleCheckout}>
                Place order
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductDetailView
        product={selectedProduct}
        isOpen={productDetailViewOpen}
        close={() => setProductDetailViewOpen(false)}
      />
    </div>
  )
}

export default eCommerceExamples
