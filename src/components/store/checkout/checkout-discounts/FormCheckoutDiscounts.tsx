"use client"

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../../context/MiniCartContext";
import { enqueueSnackbar } from 'notistack';


const schema = yup.object({
    coupon: yup.string().min(3).max(20).required()
}).required();

export default function FormCheckoutDiscounts(props: { setCheckoutDiscounts: any, checkoutDiscounts: any }) {
    const { setCheckoutDiscounts, checkoutDiscounts } = props;

    const { register, handleSubmit, reset, setError, formState: { errors, isValid } } = useForm<any>();
    const { getTotalMiniCart: geTotalMinicart } = useContext(CartContext)
    
    const [errorCoupon, setErrorCoupon] = useState(false);
    const [couponApplied, setCouponApplied] = useState(false);

    // Check coupon
    const checkCoupon = async (data: any) => {
        const res = await fetch('/api/store/checkout-discounts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        return res.json();
      }

    // Submit
    const onSubmit = async (data: any) => {
        data.total = geTotalMinicart().total;
        checkCoupon(data).then((data) => {
            if(!data.error){
                console.log('DATA DEL DESCUENTO', data.couponData);
                setCheckoutDiscounts(data.couponData);
                enqueueSnackbar('¡Cupón aplicado!', { variant: 'success' });
                setCouponApplied(true);
            }
            console.log(data.error);
            setErrorCoupon(data.error);
            return;
        }).catch((error) => {
            console.log(error)
        });
    };

    // Clear coupon entry
    const clearCoupon = (e:any) => {
        e.preventDefault();
        setCouponApplied(false);
        reset({ coupon: "" });
        enqueueSnackbar('¡Cupón eliminado!', { variant: 'success' });
        setErrorCoupon(false);
        setCheckoutDiscounts({ discount: 0, coupon_id: '' });
    }

    // If the total changes and the order already has a discount, the discount is removed
    useEffect(() => {
        if(geTotalMinicart().total !== 0 && checkoutDiscounts.discount !== 0){
            setCheckoutDiscounts(0);
            setCouponApplied(false);
            reset({ coupon: "" });
            enqueueSnackbar('¡El total de la orden ha cambiado, se ha eliminado el descuento!', { variant: 'info' });
        }
    }
    ,[geTotalMinicart().total])

    return (
        <div>
            <form>
                <div className="max-w-sm flex items-center border rounded-md p-1">
                    <input
                        {...register("coupon")}
                        id="coupon" 
                        name="coupon"
                        type="text"
                        placeholder="Cupón de descuento"
                        className="w-full p-2.5 outline-none"
                    />
                    <button
                        className="p-2.5 rounded-md text-white bg-indigo-600 outline-none shadow-md focus:shadow-none sm:px-5"
                        onClick={
                            couponApplied ? (e) => clearCoupon(e) : handleSubmit(onSubmit)
                        }
                    >
                        {couponApplied ? 'Quitar' : 'Aplicar'}
                    </button>
                </div>
                <p className="text-xs text-red-600 mt-2">{errorCoupon}</p>
            </form>
        </div>
    )
}