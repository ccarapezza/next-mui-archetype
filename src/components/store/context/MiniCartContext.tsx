'use client'
import React, { useState, createContext, useEffect } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage';
import { ProductToCart } from '@/schemas/product';
interface Props {
  children?: React.ReactNode
}

export const CartContext = createContext({
  products: [] as ProductToCart[],
  addProduct: (product: ProductToCart) => { },
  deleteProduct: (product: ProductToCart) => { },
  updateProductQuantity: (product: ProductToCart, quantity: number) => { },
  geTotalMinicart: () => {
    return { subtotal: 0, descuento: 0, total: 0 };
  },
  emptyMinicart: () => { }
});

export default function MiniCartProvider({ children }: Props) {

  const [storedValue, setStoredValue] = useLocalStorage('products', [] as ProductToCart[]);
  const [products, setProducts] = useState(storedValue);

  // Add product to cart
  const addProduct = (product: ProductToCart) => {
    if (products.find((prod: any) => prod.itemId === product.itemId)) {
      const listOfProducts = products.map((prod: ProductToCart) => {
        if (prod.itemId === product.itemId) {
          return { ...prod, quantity: prod.quantity + product.quantity }
        }
        return prod
      })
      return setProducts([...listOfProducts])
    }
    setProducts([...products, product])
  }

  // Delete product from cart
  const deleteProduct = (product: ProductToCart) => {
    const listOfProducts = products.filter((el: ProductToCart) => el.itemId !== product.itemId)
    setProducts([...listOfProducts])
  }

  // Update product quantity
  const updateProductQuantity = (product: ProductToCart, quantity: number) => {
    const listOfProducts = products.map((prod: ProductToCart) => {
      if (prod.itemId === product.itemId) {
        return { ...prod, quantity }
      }
      return prod
    })
    setProducts([...listOfProducts])
  }

  const geTotalMinicart = () => {
    let total = 0;
    let subtotal = 0;
    let descuento = 0;
    products.forEach((product: ProductToCart) => {
      subtotal += product.quantity * product.price;
      // descuento += product.quantity * (product.listPrice - product.specialPrice);
      total += product.quantity * product.price;
    })
    return {
      subtotal,
      descuento,
      total
    };
  }

  const emptyMinicart = () => {
    setProducts([]);
  }

  // Saved to local storage
  useEffect(() => {
    setStoredValue(products);
  }, [products, setStoredValue]);

  return <CartContext.Provider value={{ products, addProduct, deleteProduct, updateProductQuantity, geTotalMinicart, emptyMinicart }}>
    {children}
  </CartContext.Provider>
}

