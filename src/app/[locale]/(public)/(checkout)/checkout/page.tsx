'use client';
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/store/context/MiniCartContext";
import EmptyCart from "@/components/store/checkout/EmptyCart";
import FirstStep from "@/components/store/checkout/FirstStep";
import SecondStep from "@/components/store/checkout/SecondStep";
import LoadingUI from "@/components/main-ui/LoadingUI";

export default function Checkout() {

  const { products } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [checkoutDiscounts, setCheckoutDiscounts] = useState({ value: 0, coupon_id: null, coupon_type: null })

  useEffect(() => {
    setQuantity(products.length);
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  return (
    <>
      {
        quantity === 0
          ?
          <>
            {
              !loaded
                ?
                <LoadingUI />
                :
                <EmptyCart />
            }
          </>

          :
          <>
            <FirstStep products={products} checkoutDiscounts={checkoutDiscounts} setCheckoutDiscounts={setCheckoutDiscounts} />
            <SecondStep checkoutDiscountsId={checkoutDiscounts.coupon_id} />
          </>
      }
    </>
  );
}