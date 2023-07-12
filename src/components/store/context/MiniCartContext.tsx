'use client'
import useLocalStorage from '@/hooks/useLocalStorage';
import React, { useState, createContext, useEffect } from 'react'

interface Props {
  children?: React.ReactNode
}

export const CartContext = createContext<any[]>([]);;

export default function MiniCartProvider({ children }: Props) {

  const [storedValue, setStoredValue] = useLocalStorage('products', [] as any[]);
  const [products, setProducts] = useState(storedValue);

  useEffect(() => {
    setStoredValue(products);
  }, [products]);

  return <CartContext.Provider value={[products, setProducts]}>
    {children}
  </CartContext.Provider>
}

