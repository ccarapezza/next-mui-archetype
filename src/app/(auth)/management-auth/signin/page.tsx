import React, { Suspense } from 'react'
import ManagementSignIn from '@/components/auth/ManagementSignIn'
import ManagementSingInHeader from '@/components/auth/providers/ManagementSingInHeader';

export default async function SignInPage() {

    return (<Suspense>
        <ManagementSingInHeader />
        <ManagementSignIn />
    </Suspense>)
}