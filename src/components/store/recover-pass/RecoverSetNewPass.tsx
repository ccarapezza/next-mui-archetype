
"use client"
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface SetNewPassForm {
    password: string,
    cpassword: string
}

const schema = yup.object({
    password: yup.string().min(3).max(20).required(),
    cpassword: yup.string().min(3).max(20).required()
}).required();

export default function RecoverSetNewPass() {

    const router = useRouter();
    const pathname = usePathname();
    const segments = pathname.split('/');
    const token = segments[segments.length - 1];


    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm<SetNewPassForm>({
        resolver: yupResolver(schema)
    });


    const setNewPassword = async (data: SetNewPassForm) => {
        
        if (data.password !== data.cpassword) {
            setError('cpassword', {
                type: 'manual',
                message: 'Las contraseñas deben coincidir!'
            })
            return;
        }

        const newPassAndToken = {
            password: data.password,
            token: token
        }

        //Respuesta de API!
        let response = true;
        if(response){
            console.log('INFO PARA LA API', newPassAndToken);
            router.push(`/`);
        }else{
            setError('cpassword', {
                type: 'manual',
                message: 'Ha ocurrido un error al cambiar la contraseña'
            })
        }

    }

    return (
        <section className="w-full max-w-md mx-auto mt-14">
            <div className="mx-3 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 md:mx-4">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h2 className="block text-2xl font-bold text-primary text-center">Generar Contraseña</h2>
                    </div>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="max-w-md px-4 mx-auto mt-5">
                        <div>
                            <div>
                                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Nueva contraseña</label>
                                <div className="relative">
                                    <input {...register("password")} type="password" id="password" name="password" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="password-error" />
                                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                    </div>
                                </div>
                                <p className="text-xs text-red-600 mt-2">{errors.password?.message}</p>
                            </div>

                            <div>
                                <label htmlFor="cpassword" className="block text-sm mb-2 dark:text-white">Confirmar contraseña</label>
                                <div className="relative">
                                    <input {...register("cpassword")} type="password" id="cpassword" name="cpassword" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="confirm-password-error" />
                                    <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                    </div>
                                </div>
                                <p className="text-xs text-red-600 mt-2">{errors.cpassword?.message}</p>
                            </div>

                        </div>
                    </form>
                    <div className="flex justify-center mt-4">
                        <button type='submit' disabled={!isValid} className="rounded bg-primary px-3 py-2 text-gray-100 transition hover:bg-tertiary font-bold disabled:bg-gray-300"
                            onClick={handleSubmit(setNewPassword)}
                        >Cambiar contraseña</button>
                    </div>
                </div>
            </div>
        </section>
    )
}