import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { shopOrderService } from '@/services/ShopOrderService';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react'
import OrderDataGrid from './dataGrid';
import { OrderStatus } from '@/schemas/orderStatus';

const fetchPendingOrdersData = async (page: number, size: number) => {
    return await shopOrderService.getOrdersByStatus(OrderStatus.Pending, page, size);
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
            field: 'contactForm.name',
            headerName: 'Contact Name',
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
        <PageHeader title="Ordenes Pendientes" />
        <MuiBox className="p-10">
            <OrderDataGrid rows={data.rows} rowCount={data.totalItems} />
        </MuiBox>
    </>)
}
