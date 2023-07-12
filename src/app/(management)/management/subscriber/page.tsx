import MuiDataGrid from '@/components/client/DataGrid';
import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { GridColDef } from '@mui/x-data-grid';
import React from 'react'
import { headers } from "next/headers"

const fetchSubscriberListData = async (page: number, size: number, search: string) => {
    const querySearch = search?`?search=${search}`:"";
    const res = await fetch(`http://localhost:3000/api/management/subscriber/list/${page}/${size}${querySearch}`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
};

export default async function({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
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
        <PageHeader title="Subscribers" />
        <MuiBox className="p-10">
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} />
        </MuiBox>
    </>)
}
