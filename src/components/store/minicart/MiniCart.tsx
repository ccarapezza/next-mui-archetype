'use client'
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/MiniCartContext';
import MiniCartList from './MiniCartList';
import Link from "next/link";

export default function () {

  const [state, setState] = useState(false)
  const [cart, setCart] = useContext(CartContext)
  const [quantity, setQuantity] = useState(0)

  const getTotal = () => {
    let total = 0;
    cart.forEach((product: any) => {
      total += product.price;
    })
    return total;
  }

  useEffect(() => {
    console.log(cart.length);
    setQuantity(cart.length);
  }, [cart])

  return (
    <>
      {/* Trigger Minicart */}
      <div className="text-xl cursor-pointer h-8 flex items-center justify-center w-8 relative"
        onClick={() => {
          setState(true)
        }}>
        {
          quantity > 0 ?
            <span
              className='text-gray-800 bg-white rounded-full'
              style={{
                padding: "0px 4px",
                fontSize: "15px",
                fontWeight: "600",
                border: "2px solid #1F2937",
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
        <FontAwesomeIcon icon={faCartShopping} />
      </div>
      {/* Trigger Minicart */}
      {
        state ?
          (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setState(false)}></div>
              <div className="flex items-left">
                <div className="flex flex-col justify-between w-full max-w-lg mx-auto bg-white shadow-lg h-screen absolute right-0">
                  <div>
                    <div className="flex items-center justify-between p-4 border-b">
                      <h4 className="text-lg text-stone-500 font-bold">
                        Tú Carrito:
                      </h4>
                      <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                        onClick={() => setState(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    {
                      quantity > 0 ?
                        <div className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                          <MiniCartList cart={cart} />
                        </div>
                        :
                        <div className="flex items-center justify-center h-full">
                          <p className='text-stone-500 font-bold text-lg'>¡Tú carrito está vacío!</p>
                        </div>
                    }

                  </div>
                  {
                    quantity > 0 ?
                      <div className="space-y-2 p-4 mt-3 mb-4 text-center border-t text-lg">
                        <div className="flex justify-between px-2 py-1">
                          <span className="text-stone-500 font-bold">Subtotal:</span>
                          <span className="text-stone-500 font-bold">{`$ ${getTotal()}`}</span>
                        </div>
                        <div className="flex justify-between px-2 py-1">
                          <span className="text-stone-500 font-bold">Descuentos:</span>
                          <span className="text-stone-500 font-bold">{`$0`}</span>
                        </div>
                        <div className="flex justify-between px-2 py-1">
                          <span className="text-gray-800 font-bold">Total:</span>
                          <span className="text-gray-600 font-bold">{`$ ${getTotal()}`}</span>
                        </div>
                        <Link
                          href="/checkout"
                          className="block rounded bg-gray-700 px-5 py-3 text-gray-100 transition hover:bg-gray-600 font-bold text-lg"
                        >
                          Finalizar Compra
                        </Link>
                      </div>
                      :
                      <></>
                  }
                </div>
              </div>
            </div>
          )
          : ''
      }
    </>
  )
}