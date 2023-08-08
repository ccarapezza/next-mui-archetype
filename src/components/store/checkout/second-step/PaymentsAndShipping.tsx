"use client"

import Image from "next/image"

export default function PaymentsAndShipping() {

  const paymentMethods = [
    { title: "one", paymentImg: "https://dummyimage.com/65x65/fff/0011ff&text=Opci%C3%B3n+1" },
    { title: "two", paymentImg: "https://dummyimage.com/65x65/fff/0011ff&text=Opci%C3%B3n+1" },
    { title: "three", paymentImg: "https://dummyimage.com/65x65/fff/0011ff&text=Opci%C3%B3n+1" }
  ]

  const shippingTypes = [
    { title: "one", paymentImg: "https://dummyimage.com/65x65/fff/0011ff&text=Opci%C3%B3n+1" },
    { title: "two", paymentImg: "https://dummyimage.com/65x65/fff/0011ff&text=Opci%C3%B3n+1" },
    { title: "three", paymentImg: "https://dummyimage.com/65x65/fff/0011ff&text=Opci%C3%B3n+1" }
  ]

  return (
    <div className="w-2/4 px-4 md:border-l max-md:w-full max-md:px-2 max-md:border-t">
      <h3 className="py-3 text-gray-800 font-medium">Una vez que finalices la compra nos pondremos en contacto a tu email.</h3>
      <div className="mt-4">
        <div className="mt-2">
          <h4 className="text-gray-800 font-medium">Medios de pago:</h4>
          <ul className="flex gap-4">
            {
              paymentMethods.map((pm, index) => (
                <li key={index}>
                  <Image src={pm.paymentImg} alt={pm.title} />
                </li>
              ))
            }
          </ul>
        </div>
        <div className="mt-2">
          <h4 className="text-gray-800 font-medium">Formas de envió:</h4>
          <ul className="flex gap-4">
            {
              shippingTypes.map((pm, index) => (
                <li key={index}>
                  <Image src={pm.paymentImg} alt={pm.title} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>

  )
}