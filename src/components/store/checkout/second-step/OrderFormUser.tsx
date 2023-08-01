"use client"

import PaymentsAndShipping from "./PaymentsAndShipping";

export default function (props: { data: any }) {
  const { user } = props.data;

  return (
    <>
      <div className="border p-4">
        <div className="flex justify-around max-md:block">
          <div className="px-4 w-2/4 max-md:w-full max-md:px-2 max-md:pb-4">
            <h4 className="py-3 text-gray-800 font-medium">Datos de contacto para la compra:</h4>
            <p className="mb-4">Nombre: <span className="font-bold capitalize"> {user.name}</span></p>
            <p className="mb-4">Email: <span className="font-bold"> {user.email}</span></p>
          </div>
          <PaymentsAndShipping />
        </div>
        <div className="flex justify-end">
          <button className="rounded bg-primary px-5 py-3 text-gray-100 transition hover:bg-tertiary font-bold text-lg">FINALIZAR COMPRA</button>
        </div>
      </div>
    </>
  )
}