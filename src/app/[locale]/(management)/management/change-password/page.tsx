import MuiBox from '@/components/client/MuiBox'
import ChangePasswordForm from '@/components/management/change-password/ChangePasswordForm'
import PageHeader from '@/components/management/paperbase/PageHeader'
import React from 'react'

export default function ChangePasswordPage() {
    return (<>
        <PageHeader title="Cambiar Contraseña" />
        <MuiBox className="p-10 flex justify-center">
            <ChangePasswordForm />
        </MuiBox>
    </>)
}
