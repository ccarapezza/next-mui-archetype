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
    //Get total and total less discount
    data.rows.forEach((row: any) => {
        const { discountsApplied } = row;
    
        if (discountsApplied) {
            const { checkout_discounts } = discountsApplied;
            const { coupon_type, value: discountValue } = checkout_discounts;
            const total = row.orderTotal;
    
            if (coupon_type === "percentage") {
                row.orderTotal = total - (total * discountValue / 100);
            } else if (coupon_type === "fixedAmount") {
                row.orderTotal = total - discountValue;
            }
        }
    });

    return (<>
        <PageHeader title="Historial" />
        <MuiBox className="p-10">
            <OrderDataGrid rows={data.rows} rowCount={data.totalItems} />
        </MuiBox>
    </>)
}
