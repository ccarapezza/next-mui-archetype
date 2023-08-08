'use client'
import React, { useState, createContext, useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage';
interface Props {
  children?: React.ReactNode
}
interface Product {
  name: string
  listPrice: number
  specialPrice: number
  sku: string
  quantity: number
  urlImageMain: string
  urlImageHover: string
  productNameUrl: string
}

export const CartContext = createContext({
  products: [] as any[],
  addProduct: (product: Product) => { },
  deleteProduct: (product: Product) => { },
  updateProductQuantity: (product: Product, quantity: number) => { },
  geTotalMinicart: () => {
    return { subtotal: 0, descuento: 0, total: 0 };
  },
});

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
  const updateProductQuantity = (product: Product, quantity: number) => {
    const listOfProducts = products.map((prod: any) => {
      if (prod.sku === product.sku) {
        return { ...prod, quantity: quantity }
      }
      return prod
    })
    setProducts([...listOfProducts])
  }

  const geTotalMinicart = () => {
    let total = 0;
    let subtotal = 0;
    let descuento = 0;
    products.forEach((product: Product) => {
      subtotal += product.quantity * product.listPrice;
      descuento += product.quantity * (product.listPrice - product.specialPrice);
      total += product.quantity * product.specialPrice;
    })
    return {
      subtotal,
      descuento,
      total
    };
  }

  // Saved to local storage
  useEffect(() => {
    setStoredValue(products);
  }, [products, setStoredValue]);

  return <CartContext.Provider value={{ products, addProduct, deleteProduct, updateProductQuantity, geTotalMinicart }}>
    {children}
  </CartContext.Provider>
}

