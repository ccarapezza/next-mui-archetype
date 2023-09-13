"use client"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useRouter } from 'next/navigation'
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

type RecoverPassEmail = {
    email: string
};

const schema = yup.object({
    email: yup.string().email().min(3).max(50).required(),
}).required();

export default function RecoverPassEmail() {

    const [sendMail, setSendMail] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<RecoverPassEmail>({
        resolver: yupResolver(schema)
    });

    const sendMailRecoverPassword = async (data: RecoverPassEmail) => {
        //Llamada a la API
        let token = '';
        if (data.email === 'hola@hola.com') {

            //Enviar email
            token = '123456789';
            setSendMail(true);
        } else {
            setError('email', {
                type: 'manual',
                message: 'El email ingresado no se encuentra registrado.'
            })
            enqueueSnackbar('El email ingresado no se encuentra registrado.', {
                variant: 'error',
            });
        }
    }

    return (
        <section className="w-full max-w-md mx-auto mt-14">
            <div className="mx-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 md:mx-4">
                {
                    sendMail
                        ?
                            <div className="p-4 sm:p-7">
                                <div>
                                    <h2 className="block text-2xl font-bold text-primary text-center">¡Email enviado!</h2>
                                    <h4 className="mt-4 text-sm text-tertiary">Te acabamos de enviar un mail para que puedas restablecer tu contraseña.</h4>
                                </div>
                            </div>
                        :
                            <div className="p-4 sm:p-7">
                                <div>
                                    <h2 className="block text-2xl font-bold text-primary text-center">Recuperar contraseña</h2>
                                    <h4 className="mt-4 text-sm text-tertiary">Ingresa tu email y te enviaremos un correo para restablecer la contraseña.</h4>
                                </div>
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="max-w-md mx-auto mt-5">
                                    <div>
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
                                    {errors.email && <p className="text-xs text-red-600 mt-2">{errors.email.message}</p>}
                                </form>
                                <div className="flex justify-center mt-4">
                                    <button type='submit' disabled={!isValid} className="rounded bg-primary px-3 py-2 text-gray-100 transition hover:bg-tertiary font-bold disabled:bg-gray-300"
                                        onClick={handleSubmit(sendMailRecoverPassword)}
                                    >Recuperar contraseña</button>
                                </div>
                            </div>
                }

            </div>
        </section>
    )
}