"use client"

export default function () {

  return (
    <div className="pt-8">
      <p className="flex justify-between items-center my-2 text-gray-800 font-medium">Subtotal: <span>$2000</span></p>
      <p className="flex justify-between items-center my-2 text-gray-800 font-medium">Descuentos: <span>$1000</span></p>
      <p className="flex justify-between items-center my-2 text-gray-900 text-xl border-t pt-2 font-bold">Total: <span>$2000</span></p>
    </div>
  )
}