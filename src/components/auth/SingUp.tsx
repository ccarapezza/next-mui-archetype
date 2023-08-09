'use client'
import React, { Fragment } from 'react'
import * as yup from "yup";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { ClientSafeProvider, LiteralUnion, useSession } from "next-auth/react"
import Link from 'next/link'
import GoogleForm from './providers/GoogleForm';
import { signIn } from "next-auth/react"
import { BuiltInProviderType } from 'next-auth/providers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface IRegisterForm {
    username: string,
    email: string,
    password: string,
    cpassword: string
}

const schema = yup.object({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().min(3).max(50).required(),
    password: yup.string().min(3).max(20).required(),
    cpassword: yup.string().min(3).max(20).required()
}).required();

const signUp = async ({ name, email, password }:{ name: string, email: string, password: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });
    return res.json();
};

export default function SignUp({providers}: {providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>}) {
    const router = useRouter();
    const { status } = useSession();
    if (status === "authenticated") {
        console.log("Already authenticated. Redirecting...")
        router.push('/')
    }
    const [error, setError] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const [
        acceptTermAndCondition,
        setAcceptTermAndCondition
    ] = useState(false);

    const [
        subscribe,
        setSubscribe
    ] = useState(true);

    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: IRegisterForm) => {
        if (data.password !== data.cpassword) {
            setError("Password and Confirm Password must be same");
            return;
        }
        setIsFetching(true);
        signUp({
            name: data.username,
            email: data.email,
            password: data.password
        }).then((res) => {
            console.log(res);
            if(res.error){
                setError(res.error);
            }else{
                router.push('/verify-email?verification-sended=true');
            }
        }).catch((err) => {
            console.error(err);
            setError(err.message);
        }).finally(() => {
            setIsFetching(false);
        });
    };

    return (
        <main className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Registrarse</h1>
                        <p className="mt-2 text-sm text-tertiary">
                            ¿Ya tienes una cuenta?&nbsp;
                            <Link className="text-primary decoration-2 hover:underline font-medium" href="/auth/signin">
                                Iniciar sesión
                            </Link>
                        </p>
                    </div>

                    <div className="mt-5">

                    {error &&
                        <p className='mb-5'>
                            <small className='text-red-500'>{error}</small>
                        </p>
                    }

                    {providers && Object.values(providers).map((provider, index) => (
                        <Fragment key={provider?.name}>
                            {index!==0 &&
                                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">O</div>
                            }
                            {(() => {
                                switch (provider?.id) {
                                    case 'google':
                                        return <GoogleForm label='Regístrese con Google' provider={provider} />;
                                    case 'credentials':
                                        return (
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="grid gap-y-4">
                                                    <div>
                                                        <label htmlFor="username" className="block text-sm mb-2 dark:text-white">Nombre de Usuario</label>
                                                        <div className="relative">
                                                            <input {...register("username")} type="username" id="username" name="username" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                                <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-red-600 mt-2">{errors.username?.message}</p>
                                                    </div>
                    
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email</label>
                                                        <div className="relative">
                                                            <input {...register("email")} type="email" id="email" name="email" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                                <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-red-600 mt-2">{errors.email?.message}</p>
                                                    </div>
                    
                                                    <div>
                                                        <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Contraseña</label>
                                                        <div className="relative">
                                                            <input {...register("password")} type="password" id="password" name="password" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="password-error" />
                                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                                <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-red-600 mt-2">{errors.password?.message}</p>
                                                    </div>
                    
                                                    <div>
                                                        <label htmlFor="cpassword" className="block text-sm mb-2 dark:text-white">Confirmar Contraseña</label>
                                                        <div className="relative">
                                                            <input {...register("cpassword")} type="password" id="cpassword" name="cpassword" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="confirm-password-error" />
                                                            <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                                <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-red-600 mt-2">{errors.cpassword?.message}</p>
                                                    </div>
                    
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center cursor-pointer" onClick={(e)=>{setAcceptTermAndCondition(!acceptTermAndCondition)}}>
                                                            <div className="flex">
                                                                <input id="terms-and-conditions" name="terms-and-conditions" type="checkbox" checked={acceptTermAndCondition} onChange={(e)=>{}} className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                            </div>
                                                            <div className="ml-3">
                                                                <label htmlFor="terms-and-conditions" className="text-sm text-tertiary">Acepto los <a className="text-primary decoration-2 hover:underline font-medium" href="#">términos y condiciones</a></label>
                                                            </div>
                                                        </div>
                                                        {acceptTermAndCondition&&
                                                            <div className="flex items-center cursor-pointer" onClick={(e)=>{setSubscribe(!subscribe)}}>
                                                                <div className="flex">
                                                                    <input id="subscribe" name="subscribe" type="checkbox" checked={subscribe} onChange={(e)=>{}} className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                                                                </div>
                                                                <div className="ml-3">
                                                                    <label htmlFor="subscribe" className="text-sm dark:text-white">Suscribirse al newsletter</label>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                    
                                                    <button type="submit" disabled={!acceptTermAndCondition} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 disabled:bg-slate-300">Crear cuenta</button>
                                                </div>
                                            </form>
                                        );
                                    default:
                                        return <button onClick={() => {signIn(provider.id, {callbackUrl: '/'})}}>Regístrese con {provider.name}</button>
                                    }
                            })()}
                        </Fragment>
                    ))}
                    </div>
                </div>
            </div>
            <Link className="block text-center mt-5 text-primary decoration-2 hover:underline font-medium" href="/">
                Volver al Inicio
            </Link>
        </main>
    )
}
