'use client'

import { FunctionComponent, useEffect, useRef } from 'react'
import { Product } from '@piwikpro/react-piwik-pro'

type Props = {
  product: Product | null
  isOpen: boolean
  close: () => void
}

const ProductDetailView: FunctionComponent<Props> = ({
  product,
  isOpen,
  close
}) => {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  return (
    <dialog
      ref={ref}
      className='modal'
      onClose={close}
      onClick={(event) => {
        if (event.target === ref.current) close()
      }}
    >
      <div className='modal-box'>
        {product && (
          <>
            <h2 className='card-title'>{product.name}</h2>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>property</th>
                    <th>value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(product).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{JSON.stringify(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <div className='modal-action'>
          <button className='btn' onClick={close}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default ProductDetailView
