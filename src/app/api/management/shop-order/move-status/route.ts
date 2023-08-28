import { shopOrderService } from '@/services/ShopOrderService';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
    const {shopOrderId, statusId} = await request.json();
    if(shopOrderId&&shopOrderId){
        const shopOrderUpdated = await shopOrderService.moveToStatus(shopOrderId, statusId);
        if (shopOrderUpdated) {
            return NextResponse.json(shopOrderUpdated);
        }
    }
    return NextResponse.error();
}