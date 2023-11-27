import React from 'react'
import { getProviders } from 'next-auth/react'
import SignUp from '@/components/auth/SingUp'

export default async function SignInPage() {

    return (
        <SignUp />
    )
}