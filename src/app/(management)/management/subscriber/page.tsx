import MuiDataGrid from '@/components/client/DataGrid';
import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { GridColDef } from '@mui/x-data-grid';
import React from 'react'
import { subscriberService } from '@/services/SubscriberService';
import ListmonkComponent from './ListmonkComponent';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig()

const fetchSubscriberListData = async (page: number, size: number, search: string) => {
    return await subscriberService.search(search, page, size);
};

export default async function SubscriberPage({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchSubscriberListData(paginationParams.page, paginationParams.size, searchParams.search);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1
        }
    ];

    

    return (<>
        <PageHeader title="Suscriptores" />
        <MuiBox className="p-10">
            <ListmonkComponent authorizationString={`${publicRuntimeConfig.listmonkUser}:${publicRuntimeConfig.listmonkPassword}`} listmonkUrl={publicRuntimeConfig.listmonkUrl} />
        </MuiBox>
    </>)
}
