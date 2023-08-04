import React from 'react'
import { signIn } from "next-auth/react"
import { ClientSafeProvider } from "next-auth/react/types"

export default function GoogleForm({ provider, label = 'Inicia sesión con Google' , callbackUrl = '/' }: { provider: ClientSafeProvider, label?: string, callbackUrl?: string }) {
    return (

        <button onClick={() => { signIn(provider.id, { callbackUrl }) }} type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
            <img className="w-4 h-auto" width="46" height="47" src="/google.svg" />
            {label}
        </button>
    )
}