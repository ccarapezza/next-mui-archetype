import { ProductItem } from '@/db';
import OrderLine from '@/db/models/OrderLine';
import ShopOrder from '@/db/models/ShopOrder';
import { PlaceOrderDto } from '@/schemas/placeOrder';
import { NextRequest, NextResponse } from 'next/server'
import { Op } from 'sequelize';

export async function POST(request: NextRequest) {
    const placeOrderData : PlaceOrderDto = await request.json();
    const itemsIds = placeOrderData.orderItems.map(item => item.productItemId);

    const qtyItems:any = placeOrderData.orderItems.reduce((total: number[], item) => {
        total[item.productItemId] = item.qty;
        return total;
    }, []);

    const items = await ProductItem.findAll({
        where: {
            id:{
                [Op.in]: itemsIds,
            }
        },
    });

    let outOfStock = false;

    const orderTotal = itemsIds.reduce((total, itemId) => {
        const item = items.find(item => item.id === itemId);
        const qty = qtyItems[itemId];

        if(item && item.stock < qty){
            outOfStock = true;
            return total + (item.price * qty);
        }
        return total;
    }, 0);

    if(outOfStock){
        return NextResponse.json({
            error: "Out of stock",
        }, {
            status: 400,
        });
    }else{
        //create shopOrder sequelize
        const shopOrder = await ShopOrder.create({
            orderDate: new Date(),
            orderTotal: orderTotal,
            userId: null,//TODO: Obtener el usuario logueado
            statusId: 1,//TODO: Obtener el status por defecto
        });
        //create orderLines sequelize
        const orderLines = itemsIds.map(async (itemId) => {
            const item = items.find(item => item.id === itemId);
            const qty = qtyItems[itemId];
            const orderLine = await OrderLine.create({
                orderId: shopOrder.id,
                productItemId: itemId,
                qty: qty,
                price: item?.price,
            });
            return orderLine;
        });
    
        const response = {
            outOfStock: outOfStock,
            shopOrder: shopOrder,
            orderLines: orderLines,
        };
    
        return NextResponse.json({});
    }

}