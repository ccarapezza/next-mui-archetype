'use client'
import React, { useState, createContext, useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage';
interface Props {
  children?: React.ReactNode
}

export const CartContext = createContext<any[]>([]);;

export default function MiniCartProvider({ children }: Props) {

  const [storedValue, setStoredValue] = useLocalStorage('products', [] as any[]);
  const [products, setProducts] = useState(storedValue);

  // Add product to cart
  const addProduct = (product: any) => {
    if (products.find((prod: any) => prod.sku === product.sku)) {
      const listOfProducts = products.map((prod: any) => {
        if (prod.sku === product.sku) {
          return { ...prod, quantity: prod.quantity + 1 }
        }
        return prod
      })
      return setProducts([...listOfProducts])
    }
    setProducts([...products, product])
  }

  // Delete product from cart
  const deleteProduct = (product: any) => {
    const listOfProducts = products.filter((el: any) => el.sku !== product.sku)
    setProducts([...listOfProducts])
  }

  // Update product quantity
  const updateProductQuantity = (product: any, quantity: number) => {
    const listOfProducts = products.map((prod: any) => {
      if (prod.sku === product.sku) {
        return { ...prod, quantity: quantity }
      }
      return prod
    })
    setProducts([...listOfProducts])
  }

  // Saved to local storage
  useEffect(() => {
    setStoredValue(products);
  }, [products, setProducts]);

  return <CartContext.Provider value={[products, addProduct, deleteProduct, updateProductQuantity]}>
    {children}
  </CartContext.Provider>
}

