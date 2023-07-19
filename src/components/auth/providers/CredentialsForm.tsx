'use client'
import React from 'react'
import { signIn } from "next-auth/react"
import { ClientSafeProvider } from "next-auth/react/types"
import { useState } from 'react';
import { useParams } from 'next/navigation'
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

interface IRegisterForm {
    username: string,
    password: string,
}

const schema = yup.object({
    username: yup.string().min(3).max(150).required(),
    password: yup.string().min(3).max(20).required()
}).required();

export default function CredentialsForm({ provider }: { provider: ClientSafeProvider }) {
    const params = useParams()
    
    const [errorParam, setErrorParam] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
        resolver: yupResolver(schema)
    });
    const onSubmit = async (data: IRegisterForm) => {
        signIn(provider.id, { username: data.username, password: data.password,  });
    };

    useEffect(() => {
        const { error } = params;
        if (error) {
            setErrorParam(error as string);
        }
    }, [setErrorParam, params.error])

    return (<>
        {errorParam &&
            <small style={{ color: "red", display: "block", margin: "15px" }}>Usuario y/o contraseña incorrectos</small>
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-4">

                <div>
                    <label htmlFor="username" className="block text-sm mb-2 dark:text-white">Email address</label>
                    <div className="relative">
                        <input {...register("username")} type="text" id="username" name="username" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                        <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                            <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                        </div>
                    </div>
                    <small style={{ color: "red", display: "block", marginBottom: "15px" }}>{errors.username?.message}</small>
                </div>

                <div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                        <a className="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                    </div>
                    <div className="relative">
                        <input {...register("password")} type="password" id="password" name="password" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="password-error" />
                        <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                            <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                            </svg>
                        </div>
                    </div>
                    <small style={{ color: "red", display: "block", marginBottom: "15px" }}>{errors.password?.message}</small>
                </div>

                <div className="flex items-center">
                    <div className="flex">
                        <input id="remember-me" name="remember-me" type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3">
                        <label htmlFor="remember-me" className="text-sm dark:text-white">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">Sign in</button>
            </div>
        </form>
    </>)
}