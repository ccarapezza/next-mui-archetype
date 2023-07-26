import MuiBox from '@/components/client/MuiBox'
import EntityTableToolbar from '@/components/management/EntityTableToolbar'
import PageHeader from '@/components/management/paperbase/PageHeader'
import React from 'react'

export default function() {
    return (<>
        <PageHeader title="Products" />
        <MuiBox className="p-10">
            <EntityTableToolbar newButtonLabel="Create new Product" newEntityPath="/management/products/new"/>
        </MuiBox>
    </>)
}
