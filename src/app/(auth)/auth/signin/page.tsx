import React, { Suspense } from 'react'
import { getProviders } from 'next-auth/react'
import SignIn from '@/components/auth/SingIn'

export default async function SignInPage() {
    const providers = await getProviders();

    return (<Suspense>
        <SignIn providers={providers!} />
    </Suspense>
    )
}
