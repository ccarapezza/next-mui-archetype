"use client"
import { yupResolver } from "@hookform/resolvers/yup";
import PaymentsAndShipping from "./PaymentsAndShipping";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface OrderFormGuest {
  name: string
  lastName: string
  phone: number
  email: string
}

const schema = yup.object({
  name: yup.string().min(3).max(50).required(),
  lastName: yup.string().min(3).max(50).required(),
  phone: yup.number().required(),
  email: yup.string().email().min(3).max(50).required(),
}).required();


export default function () {

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<OrderFormGuest>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: OrderFormGuest) => {
    console.log('Submiteado', data);
  };

  return (
    <>
      <div className="border p-4">
        <div className="mb-4">
          <p className="mb-4 text-gray-800 font-medium">Completa tus datos para finalizar la compra:</p>
          <div className="flex justify-around max-md:block">
            <form className="px-4 w-2/4 max-md:w-full max-md:px-2 max-md:pb-4">
              <div>
                <label className="block py-3 text-gray-800">
                  Nombre
                </label>
                <div className="flex items-center p-2 border rounded-md">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Nombre"
                    id="firstName"
                    className="w-full p-1 text-gray-500 outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block py-3 text-gray-800">
                  Apellido
                </label>
                <div className="flex items-center p-2 border rounded-md">
                  <input
                    {...register("lastName")}
                    type="text"
                    placeholder="Apellido"
                    id="lastName"
                    className="w-full p-1 text-gray-500 outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block py-3 text-gray-800">
                  Teléfono
                </label>
                <div className="flex items-center p-2 border rounded-md">
                  <input
                    {...register("phone")}
                    type="number"
                    placeholder="11 2222-2222"
                    id="phone"
                    className="w-full p-1 text-gray-500 outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block py-3 text-gray-800">
                  Email
                </label>
                <div className="flex items-center p-2 border rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-400 w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="tuemail@gmail.com"
                    id="email"
                    className="w-full p-1 ml-3 text-gray-500 outline-none bg-transparent"
                  />
                </div>
              </div>
            </form>
            <PaymentsAndShipping />
          </div>
        </div>
        <div className="flex justify-end">
          <button type='submit' disabled={!isValid} className="rounded bg-primary px-5 py-3 text-gray-100 transition hover:bg-tertiary font-bold text-lg disabled:bg-gray-300"
            onClick={handleSubmit(onSubmit)}
          >FINALIZAR COMPRA</button>
        </div>
      </div>
    </>
  )
}