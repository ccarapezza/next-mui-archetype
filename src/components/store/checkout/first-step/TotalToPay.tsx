"use client"
import { useContext } from "react";
import { CartContext } from "../../context/MiniCartContext";

export default function () {
  const { geTotalMinicart } = useContext(CartContext)

  return (
    <div className="pt-8">
      <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
        Subtotal: <span>{`$ ${geTotalMinicart().subtotal}`}</span>
      </p>
      <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
        Descuentos: <span>{`- $ ${geTotalMinicart().descuento}`}</span>
      </p>
      <p className="flex justify-between items-center my-2 text-gray-900 text-xl border-t pt-2 font-bold">
        Total: <span>{`$ ${geTotalMinicart().total}`}</span>
      </p>
    </div>
  )
}
