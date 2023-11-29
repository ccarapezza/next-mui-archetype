'use client'
import React, { useState, createContext, useEffect } from 'react'
import useClientLocalStorage from '@/hooks/useClientLocalStorage';
import { ProductToCart } from '@/schemas/product';
import { enqueueSnackbar } from 'notistack';
interface Props {
  children?: React.ReactNode
}

export const CartContext = createContext({
  products: [] as ProductToCart[],
  addProduct: (product: ProductToCart) => { },
  deleteProduct: (product: ProductToCart) => { },
  updateProductQuantity: (product: ProductToCart, quantity: number) => { },
  getTotalMiniCart: () => {
    return { subtotal: 0, descuento: 0, total: 0 };
  },
  emptyMinicart: () => { },
  openMinicart: () => { },
  triggerOpenMiniCart: false
});

export default function MiniCartProvider({ children }: Props) {

  const [storedValue, setStoredValue] = useClientLocalStorage('products', [] as ProductToCart[]);
  const [products, setProducts] = useState(storedValue);
  const [triggerOpenMiniCart, setTriggerOpenMiniCart] = useState<boolean>(false);

  // Add product to cart
  const addProduct = (product: ProductToCart) => {
    if (products.find((prod: any) => prod.itemId === product.itemId)) {
      const listOfProducts = products.map((prod: ProductToCart) => {
        if (prod.itemId === product.itemId) {
          return { ...prod, quantity: prod.quantity + product.quantity }
        }
        return prod
      })
      enqueueSnackbar('Producto agregado al carrito', {
        variant: 'success',
      });
      return setProducts([...listOfProducts])
    }
    setProducts([...products, product])
    enqueueSnackbar('Producto agregado al carrito', {
      variant: 'success',
    });
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

  const getTotalMiniCart = () => {
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

  const openMinicart = () => {
    setTriggerOpenMiniCart(true);
  }

  useEffect(() => {
    if(triggerOpenMiniCart){
        setTriggerOpenMiniCart(false);
    }
  }, [triggerOpenMiniCart]);

  // Saved to local storage
  useEffect(() => {
    setStoredValue(products);
  }, [products, setStoredValue]);

  return <CartContext.Provider value={{ products, addProduct, deleteProduct, updateProductQuantity, getTotalMiniCart: getTotalMiniCart, emptyMinicart, openMinicart, triggerOpenMiniCart }}>
    {children}
  </CartContext.Provider>
}

