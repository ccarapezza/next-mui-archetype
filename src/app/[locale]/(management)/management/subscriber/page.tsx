import MuiDataGrid from '@/components/client/DataGrid';
import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import React from 'react'
import ListmonkComponent from './ListmonkComponent';

export default async function SubscriberPage() {
    return (<>
        <PageHeader title="Administración suscripciones" />
        <ListmonkComponent />
    </>)
}