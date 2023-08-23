import OrderLine from '@/db/models/OrderLine';
import ShopOrder from '@/db/models/ShopOrder';
import { authOptions } from '@/auth/authOptions';
import { ProductItem } from '@/db';
import { PlaceOrderDto } from '@/schemas/placeOrder';
import { userService } from '@/services/UserService';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import { Op } from 'sequelize';

export async function POST(request: NextRequest) {
    const placeOrderData : PlaceOrderDto = await request.json();
    const itemsIds = placeOrderData.orderItems.map(item => item.productItemId);
    
    /*
    const qtyItems:any = placeOrderData.orderItems.reduce((total: {itemId: number, qty: number}[], item) => {
        const totalEl = total.find((totalItem) => {
            if(totalItem.itemId === item.productItemId){
                totalItem.qty = totalItem.qty + item.qty;
                return true;
            }
            return false;
        });
        if(!totalEl){
            total.push({itemId: item.productItemId, qty: item.qty});
        }else{
            totalEl.qty = totalEl.qty + item.qty;
        }
        return total;
    }, []);
    */
    
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
        if(item){
            const qty = placeOrderData.orderItems.find(item => item.productItemId === itemId)?.qty!;
            if(item.stock < qty){
                outOfStock = true;
            }
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
        const session = await getServerSession(authOptions);
        const userLogged = session?.user?.email?await userService.getByEmail(session.user.email):null;
        //create shopOrder sequelize
        const shopOrder = await ShopOrder.create({
            orderDate: new Date(),
            orderTotal: orderTotal,
            userId: userLogged?userLogged.id:null,
            statusId: 1,//TODO: Obtener el status por defecto
        });
        //create orderLines sequelize
        const orderLines = itemsIds.map(async (itemId) => {
            const item = items.find(item => item.id === itemId);
            const qty = placeOrderData.orderItems.find(item => item.productItemId === itemId)?.qty!;
            const orderLine = await OrderLine.create({
                orderId: shopOrder.id,
                itemId: itemId,
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
    
        return NextResponse.json(response);
    }

}