"use client"
import Link from "next/link"

export default () => {
  return (
    <div className="max-w-screen-xl px-4 py-2 mx-auto sm:px-6 sm:py-8 lg:px-8 text-center">
      <h2 className="text-xl font-bold text-gray-900 sm:text-3xl mb-4 text-center">¡Tú carrito está vacío!</h2>
      <p className="max-w-md mx-auto mt-4 mb-10 text-gray-500">Para seguir comprando, navegar por las categorías del sitio o buscar un producto.</p>
      <Link
        className="rounded bg-gray-700 px-5 py-3 text-gray-100 transition hover:bg-gray-600 font-bold text-lg disabled:bg-gray-300"
        href="/"
      >
        ELEGIR PRODUCTOS
      </Link>
    </div>
  )
}