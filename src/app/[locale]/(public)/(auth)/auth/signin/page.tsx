import React, { Suspense } from 'react'
import { getProviders } from 'next-auth/react'
import SignIn from '@/components/auth/SingIn'
import LoadingUI from '@/components/main-ui/LoadingUI';

export default async function SignInPage() {
    return (<SignIn />
    )
}
