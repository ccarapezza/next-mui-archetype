import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { shopOrderService } from '@/services/ShopOrderService';
import React from 'react'
import OrderDataGrid from './dataGrid';
import { OrderStatus } from '@/schemas/orderStatus';

const fetchPendingOrdersData = async (page: number, size: number) => {
    return await shopOrderService.getOrdersByStatus(OrderStatus.PaymentAccepted, page, size);
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

    return (<>
        <PageHeader title="Historial" />
        <MuiBox className="p-10">
            <OrderDataGrid rows={data.rows} rowCount={data.totalItems} />
        </MuiBox>
    </>)
}
