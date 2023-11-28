import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <main>
            <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start mt-20 md:px-8">
                <div className="max-w-lg mx-auto space-y-3 text-center">
                    <h3 className="text-primary font-semibold">
                        404 | Oops!
                    </h3>
                    <p className="text-tertiary text-4xl font-semibold sm:text-5xl">
                        ¡Página no encontrada!
                    </p>
                    <p className="text-tertiary-600">
                        Lo sentimos, no pudimos encontrar la página que buscas!
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
