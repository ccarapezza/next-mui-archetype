import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession, signOut } from 'next-auth/react';
import { faSignIn, faSignOut, faSpinner } from '@fortawesome/free-solid-svg-icons'

function AuthSection() {
    const { status } = useSession();

    return (status === "loading"?
        <FontAwesomeIcon icon={faSpinner} pulse className='text-gray dark:text-white'/>
    : status === "authenticated" ?
        <button onClick={() => signOut()} className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-tertiary hover:bg-primary active:bg-tertiary rounded-full md:inline-flex text-white bg-tertiary-600 hover:bg-tertiary-700">
            Sign out
            <FontAwesomeIcon icon={faSignOut} className='pl-1' />
        </button>
    :
        <>
            <Link href="/auth/signup" className="block text-gray-700 dark:text-gray-300 hover:text-gray-900">
                Sign up
            </Link>
            <Link href="/auth/signin" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex text-white bg-tertiary-600 hover:bg-tertiary-700">
                Log in
                <FontAwesomeIcon icon={faSignIn} />
            </Link>
        </>
    )
}

export default AuthSection