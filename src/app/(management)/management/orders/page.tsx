import MuiDataGrid from '@/components/client/DataGrid';
import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { shopOrderService } from '@/services/ShopOrderService';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react'

const fetchPendingOrdersData = async (page: number, size: number) => {
    return await shopOrderService.getPendingOrders(page, size);
};

export default async function OrdersPage({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchPendingOrdersData(paginationParams.page, paginationParams.size);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Order Nº',
            flex: 1
        },
        {
            field: 'orderDate',
            headerName: 'Order Date',
            flex: 1
        },
        {
            field: "orderTotal",
            headerName: "Total",
            flex: 1
        }
    ];
    return (<>
        <PageHeader title="Orders" />
        <MuiBox className="p-10">
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} />
        </MuiBox>
    </>)
}
