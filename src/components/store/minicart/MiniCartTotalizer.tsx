'use client'
import PriceFormatting from "@/components/management/product/PriceFormatting"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "../context/MiniCartContext"

export default function MiniCartTotalizer(props: { quantity: number | null }) {

    const { getTotalMiniCart: geTotalMinicart } = useContext(CartContext)
    const { quantity } = props

    return (
        <>
            {
                quantity !=null && quantity > 0 ?
                    <div className="space-y-2 p-4 mt-3 mb-4 text-center border-t text-lg">
                        <div className="flex justify-between px-2 py-1">
                            <span className="text-stone-500 font-bold">Subtotal:</span>
                            <span className="text-stone-500 font-bold"><PriceFormatting value={geTotalMinicart().subtotal} /></span>
                        </div>
                        {
                            geTotalMinicart().descuento > 0 ?
                                <div className="flex justify-between px-2 py-1">
                                    <span className="text-stone-500 font-bold">Descuentos:</span>
                                    <span className="text-stone-500 font-bold">- <PriceFormatting value={geTotalMinicart().descuento} /></span>
                                </div>
                                :
                                <></>
                        }
                        <div className="flex justify-between px-2 py-1">
                            <span className="text-tertiary font-bold">Total:</span>
                            <span className="text-tertiary font-bold"><PriceFormatting value={geTotalMinicart().total} /></span>
                        </div>
                        <Link
                            href="/checkout"
                            className="block rounded bg-primary px-5 py-3 text-gray-100 transition hover:bg-tertiary font-bold text-lg"
                        >
                            FINALIZAR COMPRA
                        </Link>
                    </div>
                    :
                    <></>
            }</>
    )
}