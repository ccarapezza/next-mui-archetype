"use client"
import { useContext } from "react";
import { CartContext } from "../../context/MiniCartContext";
import PriceFormatting from "@/components/management/product/PriceFormatting";

export default function TotalToPay() {
  const { geTotalMinicart } = useContext(CartContext)

  return (
    <div className="pt-8">
      <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
        Subtotal: <PriceFormatting value={geTotalMinicart().subtotal}/>
      </p>
      {
        geTotalMinicart().descuento > 0 ?
          <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
            Descuentos: <PriceFormatting value={geTotalMinicart().descuento}/>
          </p>
          :
          <></>
      }
      <p className="flex justify-between items-center my-2 text-gray-900 text-xl border-t pt-2 font-bold">
        Total: <PriceFormatting value={geTotalMinicart().total}/>
      </p>
    </div>
  )
}
