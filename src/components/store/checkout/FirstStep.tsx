"use client"
import SummaryProducts from './first-step/SummaryProducts';
import TotalToPay from './first-step/TotalToPay';

export default function FirstStep(props: { products: any[], checkoutDiscounts: any, setCheckoutDiscounts: any }) {
    const { products, checkoutDiscounts, setCheckoutDiscounts } = props;

    return (
        <div className="max-w-screen-xl px-4 py-2 mx-auto sm:px-6 sm:py-8 lg:px-8">
            <h2 className="text-xl font-bold text-primary sm:text-3xl mb-5">Mi Carrito</h2>
            <div className="border p-4">
                <SummaryProducts cart={products} />
                <TotalToPay checkoutDiscounts={checkoutDiscounts} setCheckoutDiscounts={setCheckoutDiscounts}/>
            </div>
        </div>
    )
}