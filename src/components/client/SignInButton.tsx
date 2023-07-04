'use client'
import React from 'react'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function SignInButton() {
    const { status } = useSession();

    return (status === "loading"?
        <small>Loading...</small>
    : status === "authenticated" ?
        <button onClick={() => signOut()} className="py-3 px-6 rounded-md shadow-md text-white text-center bg-indigo-500 focus:shadow-none block md:inline">
            Sign out
        </button>
    :
        <Link href="/auth/signin" className="py-3 px-6 rounded-md shadow-md text-white text-center bg-indigo-500 focus:shadow-none block md:inline">
            Sign In
        </Link>

    )
}