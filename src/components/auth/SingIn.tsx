'use client'
import React, { use, useEffect } from 'react'
import Link from 'next/link'
import { ClientSafeProvider, LiteralUnion, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ProvidersForms from '@/components/auth/ProvidersForms'
import type { BuiltInProviderType } from "next-auth/providers";

export default function SignIn({providers}: {providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>}) {
    const router = useRouter();
    const { status } = useSession();
    
    useEffect(() => {
        if(status === "authenticated") {
          console.log("Already authenticated. Redirecting...")
          router.push('/')
        }
    }, [status, router]);
        
    return (
        <main className="w-full max-w-md mx-auto p-6">
            <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account yet?&nbsp;
                            <Link className="text-blue-600 decoration-2 hover:underline font-medium" href="/auth/signup">
                                Sign up here
                            </Link>
                        </p>
                    </div>

                    <div className="mt-5">
                        {providers?<ProvidersForms providers={providers}/>:<p>Loading...</p>}
                    </div>
                </div>
            </div>
            <Link className="block text-center mt-5 text-blue-600 decoration-2 hover:underline font-medium" href="/">
                Back to home
            </Link>
        </main>
    )
}
