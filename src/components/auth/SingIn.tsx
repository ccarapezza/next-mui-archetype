'use client'
import React, { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { ClientSafeProvider, LiteralUnion, getProviders, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProvidersForms from '@/components/auth/ProvidersForms'
import type { BuiltInProviderType } from "next-auth/providers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug, faBugSlash, faClose, faKey, faSkull, faSkullCrossbones, faStop, faStopwatch } from '@fortawesome/free-solid-svg-icons'

export default function SignIn() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const { status } = useSession();
    const errorMessage = searchParams.get('error')
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    useEffect(() => {
        getProviders().then((providersIncomming) => {
            setProviders(providersIncomming)
        })
    }, []);

    useEffect(() => {
        if (status === "authenticated") {
            console.log("Already authenticated. Redirecting...")
            router.push('/')
        }
    }, [status, router]);

    const getNextAuthErrorMessage = (error: string) => {
        switch (error) {
            case 'Signin':
                return 'Session expired. Please sign in again.';
            case 'OAuthSignin':
                return 'Session expired. Please sign in again.';
            case 'OAuthCallback':
                return 'Could not sign in. Please try again.';
            case 'OAuthCreateAccount':
                return 'Could not create account. Please try again.';
            case 'EmailCreateAccount':
                return 'Could not create account. Please try again.';
            case 'Callback':
                return 'Could not sign in. Please try again.';
            case 'OAuthAccountNotLinked':
                return 'Could not sign in. Please try again.';
            case 'EmailSignin':
                return 'Could not sign in. Please try again.';
            case 'CredentialsSignin':
                return 'Could not sign in. Please check the details you provided are correct.';
            default:
                return 'An error occurred. Please try again.';
        }
    }

    return (
        <main className="w-full max-w-md mx-auto">
            {errorMessage &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <FontAwesomeIcon icon={faKey} className='mr-2' /><span className="block sm:inline">{getNextAuthErrorMessage(errorMessage)}</span>
                </div>
            }
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Iniciar sesión</h1>
                        <p className="mt-2 text-sm text-tertiary">
                            ¿Aún no tienes una cuenta?&nbsp;
                            <Link className="text-primary decoration-2 hover:underline font-medium" href="/auth/signup">
                                Registrate aquí
                            </Link>
                        </p>
                    </div>

                    <div className="mt-5">
                        {providers ? <ProvidersForms providers={providers} /> : <p>Cargando...</p>}
                    </div>
                </div>
            </div>
        </main>
    )
}
