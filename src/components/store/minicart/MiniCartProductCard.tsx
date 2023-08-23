'use client'
import Image from 'next/image';
import { useContext } from 'react';
import { CartContext } from '../context/MiniCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import PriceFormatting from '@/components/management/product/PriceFormatting';
import { ProductToCart } from '@/schemas/product';

export default function MiniCartProductCard(props: { product: ProductToCart }) {

  const { product } = props;
  const { name, quantity, price, image } = product;

  const { deleteProduct, updateProductQuantity } = useContext(CartContext)

  return (
    <li className="flex items-center justify-between gap-4 px-2 py-1">
      <div className="flex ml-4">
        <Image
          src={image}
          alt={name}
          className="h-16 w-16 rounded object-cover"
          width={16}
          height={16}
        />

        <div className="flex flex-col justify-around ml-4">
          <h3 className="text-sm text-tertiary font-bold">{name}</h3>
          <div className="flex">
            <span className="text-gray-900 font-bold"><PriceFormatting value={quantity * price} /></span>
            {/* <span className="text-stone-500 line-through font-bold ml-4"><PriceFormatting  value={props.product.quantity * props.product.listPrice}/></span> */}
          </div>
        </div>
      </div>

      <div className='flex flex-col justify-around gap-2.5'>
        <div>
          <div className="flex items-center border border-gray-200 rounded">
            <button
              type="button"
              className="flex items-center justify-center w-8 h-8 leading-10 text-gray-600 transition hover:opacity-75"
              onClick={() => quantity === 1 ? deleteProduct(product) : updateProductQuantity(product, quantity - 1)}
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
        </div>
        <button className="text-gray-600 transition hover:text-red-600" onClick={() => deleteProduct(product)}>
          <FontAwesomeIcon icon={faTrash} className='text-tertiary' />
        </button>
      </div>
    </li>
  )
}