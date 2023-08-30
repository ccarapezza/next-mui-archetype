'use client'
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/MiniCartContext';
import MiniCartList from './MiniCartList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faClose } from '@fortawesome/free-solid-svg-icons';
import MiniCartTotalizer from './MiniCartTotalizer';

export default function MiniCart() {

  const [openMiniCart, setOpenMiniCart] = useState(false)
  const { products } = useContext(CartContext)
  const [quantity, setQuantity] = useState(null as number | null)
  useEffect(() => {
    if (quantity === null) {
      setOpenMiniCart(false);
      setQuantity(products.length);
    } else {
      setQuantity(products.length);
      setOpenMiniCart(true);
    }
  }, [products, quantity])

  return (
    <>
      {/* Trigger Minicart */}
      <div className="text-xl cursor-pointer h-8 flex items-center justify-center w-8 relative"
        onClick={() => {
          setOpenMiniCart(true)
        }}>
        {
          quantity != null && quantity > 0 ?
            <span
              className='text-tertiary bg-white rounded-full'
              style={{
                padding: "0px 4px",
                fontSize: "15px",
                fontWeight: "600",
                border: "2px solid #322F30",
                lineHeight: "1",
                position: "absolute",
                bottom: "18px",
                left: "17px",
              }}>
              {quantity}
            </span>
            :
            <span>
            </span>
        }
        <FontAwesomeIcon className='text-tertiary hover:text-primary' icon={faCartShopping} />
      </div>
      {/* Modal Minicart */}
      {
        openMiniCart ?
          (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setOpenMiniCart(false)}></div>
              <div className="flex items-left">
                <div className="flex flex-col justify-between w-full max-w-lg mx-auto bg-white shadow-lg h-screen absolute right-0">
                  <div>
                    <div className="flex items-center justify-between p-4 border-b">
                      <h4 className="text-lg text-stone-500 font-bold">
                        Tú Carrito:
                      </h4>
                      <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                        onClick={() => setOpenMiniCart(false)}
                      >
                        <FontAwesomeIcon icon={faClose} className='w-6 h-6' />
                      </button>
                    </div>
                    {
                      quantity != null && quantity > 0 ?
                        <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                          <MiniCartList products={products} />
                        </div>
                        :
                        <div className="flex items-center justify-center h-full">
                          <p className='text-stone-500 font-bold text-lg'>¡Tú carrito está vacío!</p>
                        </div>
                    }
                  </div>
                  <MiniCartTotalizer quantity={quantity} />
                </div>
              </div>
            </div>
          )
          : ''
      }
    </>
  )
}