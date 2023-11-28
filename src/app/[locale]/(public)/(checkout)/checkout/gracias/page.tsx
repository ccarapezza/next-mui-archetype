'use client'
import Link from "next/link"
import Image from 'next/image'

export default function OrderThankYou() {

    return (
        <main>
            <div className="mx-auto px-4 flex items-center justify-center h-[50vh] md:px-8">
                <div className="flex flex items-center justify-center flex-col gap-2 max-w-lg mx-auto space-y-3 text-center">
                    <Image src={"/logos/NEXT-Store-logo.png"} alt='Float UI logo' width={200} height={200} className="text-center"/>
                    <h3 className="text-primary font-semibold text-2xl">
                        GRACIAS POR TU COMPRA
                    </h3>
                    <p className="text-gray-600">
                        En breve un asesor se comunicará contigo para finalizar la compra.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link href="/" className="block py-2 px-4 text-white font-medium bg-primary duration-150 hover:bg-tertiary active:bg-tertiary rounded-lg">
                            VOLVER AL INICIO
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}