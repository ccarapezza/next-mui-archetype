"use client"
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/MiniCartContext";
import PriceFormatting from "@/components/management/product/PriceFormatting";
import FormCheckoutDiscounts from '../checkout-discounts/FormCheckoutDiscounts';

export default function TotalToPay(props: { checkoutDiscounts: any, setCheckoutDiscounts: any }) {
  const { checkoutDiscounts, setCheckoutDiscounts } = props;
  const { getTotalMiniCart: geTotalMinicart } = useContext(CartContext)

  const [totalToPay, setTotalToPay] = useState({ descuento: 0, total: 0, subtotal: 0 });

  //Subtract coupon discount if it is a percentage or amount and also obtain the discount amount
  const calculateTotalToPay = () => {
    let total = geTotalMinicart().total - checkoutDiscounts.value;
    if (checkoutDiscounts.coupon_type === 'fixedAmount') {
      total = geTotalMinicart().total - checkoutDiscounts.value;
    } else if (checkoutDiscounts.coupon_type === 'percentage') {
      total = geTotalMinicart().total - (geTotalMinicart().total * (checkoutDiscounts.value / 100));
    }
    return {
      total: total,
      subtotal: geTotalMinicart().subtotal,
      descuento: checkoutDiscounts.coupon_type === 'fixedAmount' ? checkoutDiscounts.value : (geTotalMinicart().total * (checkoutDiscounts.value / 100))
    };
  }

  useEffect(() => {
    setTotalToPay(calculateTotalToPay());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutDiscounts, geTotalMinicart])



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
        checkoutDiscounts.value > 0 ?
          <p className="flex justify-between items-center my-2 text-gray-800 font-medium">
            Cupón de descuento: <span> - <PriceFormatting value={totalToPay.descuento} /></span>
          </p>
          :
          <></>
      }
      <p className="flex justify-between items-center my-2 text-gray-900 text-xl border-t pt-2 font-bold">
        Total: <PriceFormatting value={totalToPay.total} />
      </p>
      <div>
        <FormCheckoutDiscounts checkoutDiscounts={checkoutDiscounts} setCheckoutDiscounts={setCheckoutDiscounts} />
      </div>
    </div>
  )
}
