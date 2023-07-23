'use client';
import FirstStep from "@/components/store/checkout/FirstStep";
import SecondStep from "@/components/store/checkout/SecondStep";
import { CartContext } from "@/components/store/context/MiniCartContext";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {

  //Lista de productos!
  const [cart, setCart] = useContext(CartContext)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(cart)
  }, [cart])

  return (
    <>
      <FirstStep products={products} />
      <SecondStep products={products} />
    </>
    );
}