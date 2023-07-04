import React from 'react'
import { getProviders } from 'next-auth/react'
import SignIn from '@/components/auth/SingIn'

export default async function SignInPage() {
    const providers = await getProviders();

    return (
        <SignIn providers={providers!} />
    )
}
