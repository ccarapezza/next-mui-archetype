'use client'
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../context/MiniCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faClose } from '@fortawesome/free-solid-svg-icons';
import PriceFormatting from '@/components/management/product/PriceFormatting';
import { ProductToCart } from '@/schemas/product';
import { enqueueSnackbar } from 'notistack';

export default function MiniCartProductCard(props: { product: ProductToCart }) {

  const { product } = props;
  const { name, quantity, price, image, variations } = product;

  const { deleteProduct, updateProductQuantity } = useContext(CartContext)

  const handleDeleteProduct = (product: ProductToCart) => {
    deleteProduct(product)
    enqueueSnackbar('Producto eliminado del carrito', {
      variant: 'error',
    });
  }

  return (
    <li className="flex items-center justify-between gap-4 px-2 py-1">
      <div className="flex ml-4 w-full">
        <Image
          src={image}
          alt={name}
          className="h-20 w-16 rounded object-cover"
          width={64}
          height={64}
        />

        <div className="flex flex-col justify-around ml-4 w-full">
          <div className='flex justify-between'>
            <h3 className="text-sm text-tertiary font-bold">{name}</h3>
            <button className="text-gray-600 transition hover:text-red-600" onClick={() => handleDeleteProduct(product)}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className='flex justify-between'>
            <div className="flex items-center border border-gray-200 rounded">
              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
                onClick={() => quantity === 1 ? handleDeleteProduct(product) : updateProductQuantity(product, quantity - 1)}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>

              <input
                type="number"
                id="quantity"
                value={String(quantity)}
                onChange={(e) => updateProductQuantity(product, parseInt(e.target.value))}
                className="h-8 w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
              />

              <button
                type="button"
                className="flex items-center justify-center w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
                onClick={() => updateProductQuantity(product, quantity + 1)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className='flex items-center'>
              {
                variations?.map((variation: any, i: number) => {
                  return (
                    <div key={i} className='ml-2'>
                      {
                        variation.name === 'Color' ?
                          <div className={`flex items-center justify-center w-4 h-4 rounded-full border border-gray`}>
                            <div className='w-4 h-4 rounded-full border'
                              style={{ backgroundColor: variation.value }}
                            >
                            </div>
                          </div>
                          :
                          <div className={`flex items-center justify-center px-2 rounded-md border text-tertiary font-semibold text-gray border-gray'`}>
                            {variation.value}
                          </div>
                      }
                    </div>
                  )
                }
                )
              }
            </div>
          </div>
          <div className="flex justify-end">
            <span className="text-gray-900 font-bold"><PriceFormatting value={quantity * price} /></span>
          </div>
        </div>
      </div>
    </li>
  )
}