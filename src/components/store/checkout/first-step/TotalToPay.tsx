"use client"
import { useContext } from "react";
import { CartContext } from "../../context/MiniCartContext";
import PriceFormatting from "@/components/management/product/PriceFormatting";
import FormCheckoutDiscounts from '../checkout-discounts/FormCheckoutDiscounts';

export default function TotalToPay(props: { checkoutDiscounts: any, setCheckoutDiscounts: any }) {
  const { checkoutDiscounts, setCheckoutDiscounts } = props;
  const { getTotalMiniCart: geTotalMinicart } = useContext(CartContext)

  //Restar descuento de cupón
  const totalToPay = () => {
    return geTotalMinicart().total - checkoutDiscounts.discount;
  }


  return (
    <div className="pt-8">
      <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
        Subtotal: <PriceFormatting value={geTotalMinicart().subtotal} />
      </p>
      {
        geTotalMinicart().descuento > 0 ?
          <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
            Descuentos: <PriceFormatting value={geTotalMinicart().descuento} />
          </p>
          :
          <></>
      }
      {
        checkoutDiscounts.discount > 0 ?
          <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
            Cupón de descuento: <span> - <PriceFormatting value={checkoutDiscounts.discount} /></span>
          </p>
          :
          <></>
      }
      <p className="flex justify-between items-center my-2 text-gray-900 text-xl border-t pt-2 font-bold">
        Total: <PriceFormatting value={totalToPay()} />
      </p>
      <div>
        <FormCheckoutDiscounts checkoutDiscounts={checkoutDiscounts} setCheckoutDiscounts={setCheckoutDiscounts} />
      </div>
    </div>
  )
}
