import React, { Suspense } from 'react'
import ManagementSignIn from '@/components/auth/ManagementSignIn'

export default async function SignInPage() {

    return (<Suspense>
        <ManagementSignIn />
    </Suspense>)
}
