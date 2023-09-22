'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from 'next/navigation';



const schema = yup.object({
    name: yup.string().min(3).max(50).required(),
    lastname: yup.string().min(3).max(50).required(),
    email: yup.string().email().min(3).max(50).required(),
    message: yup.string().min(3).max(500).required(),
}).required();

export default function ContactMain() {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<any>({
        resolver: yupResolver(schema)
    });

    const saveCustomerData = async (customerData: any) => {
        const res = await fetch('/api/management/customer-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
        return res.json();
    };

    // Submit
    const onSubmit = async (data: any) => {
        saveCustomerData(data).then((response) => {
            console.log("response", response);
            enqueueSnackbar('¡Su consulta se envió exitosamente!', { variant: 'success' });
            router.push('/');
        }).catch((error) => {
            console.log("error", error);
            enqueueSnackbar('No se pudo enviar su consulta!', { variant: 'error' });
        }).finally(() => {
        });
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-4 py-10 lg:px-6">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg py-4 px-6 border border-gray-200 rounded-xl">
                    <div>
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Contacto
                        </h2>
                        <h5 className="mt-2 text-gray-900">Completa el formulario, te contestaremos a la brevedad.</h5>
                    </div>

                    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-lg">
                        <form action="#" method="POST">
                            <div className="mt-0">
                                <label className="block py-3 text-gray-800">
                                    Nombre
                                </label>
                                <div className="flex items-center p-2 border rounded-md">
                                    <input
                                        {...register("name")}
                                        type="text"
                                        placeholder="Nombre"
                                        id="name"
                                        className="w-full p-1 text-gray-500 outline-none bg-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mt-0">
                                <label className="block py-3 text-gray-800">
                                    Apellido
                                </label>
                                <div className="flex items-center p-2 border rounded-md">
                                    <input
                                        {...register("lastname")}
                                        type="text"
                                        placeholder="Apellido"
                                        id="lastname"
                                        className="w-full p-1 text-gray-500 outline-none bg-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mt-0">
                                <label className="block py-3 text-gray-800">
                                    Teléfono
                                </label>
                                <div className="flex items-center p-2 border rounded-md">
                                    <input
                                        {...register("phone")}
                                        type="number"
                                        placeholder="Teléfono"
                                        id="phone"
                                        className="w-full p-1 text-gray-500 outline-none bg-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mt-0">
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

                            <div className="mt-0">
                                <label className="block py-3 text-gray-800">
                                    Mensaje
                                </label>
                                <div className="flex items-center p-2 border rounded-md">
                                    <textarea
                                        {...register("message")}
                                        placeholder="Mensaje"
                                        id="message"
                                        className="w-full p-1 text-gray-500 outline-none bg-transparent"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded bg-primary px-5 py-3 text-gray-100 transition hover:bg-tertiary font-bold text-lg disabled:bg-gray-300"
                                    disabled={!isValid}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
