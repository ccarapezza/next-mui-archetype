import OrderLine from '@/db/models/OrderLine';
import ShopOrder from '@/db/models/ShopOrder';
import DiscountsApplied from '@/db/models/DiscountsApplied';
import { authOptions } from '@/auth/authOptions';
import { CheckoutDiscounts, ContactForm, ProductItem } from '@/db';
import { PlaceOrderDto } from '@/schemas/placeOrder';
import { userService } from '@/services/UserService';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import { Op } from 'sequelize';

const INITIAL_STATUS_ID = 1;

export async function POST(request: NextRequest) {
    const placeOrderData: PlaceOrderDto = await request.json();
    const itemsIds = placeOrderData.orderItems.map(item => item.productItemId);

    const items = await ProductItem.findAll({
        where: {
            id: {
                [Op.in]: itemsIds,
            }
        },
    });

    let outOfStock = false;

    const orderTotal = itemsIds.reduce((total, itemId) => {
        const item = items.find(item => item.id === itemId);
        if (item) {
            const qty = placeOrderData.orderItems.find(item => item.productItemId === itemId)?.qty!;
            if (item.stock < qty) {
                outOfStock = true;
            }
            return total + (item.price * qty);
        }
        return total;
    }, 0);

    if (outOfStock) {
        return NextResponse.json({
            error: "Out of stock",
        }, {
            status: 400,
        });
    } else {
        const session = await getServerSession(authOptions);
        const userLogged = session?.user?.email ? await userService.getByEmail(session.user.email) : null;
        //create contactForm sequelize
        const contactForm = await ContactForm.create({
            name: placeOrderData.contactForm.name,
            lastName: placeOrderData.contactForm.lastName,
            phone: placeOrderData.contactForm.phone,
            email: placeOrderData.contactForm.email
        });
        //create shopOrder sequelize
        const shopOrder = await ShopOrder.create({
            orderDate: new Date(),
            orderTotal: orderTotal,
            userId: userLogged ? userLogged.id : null,
            statusId: INITIAL_STATUS_ID,
            contactFormId: contactForm.id,
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
        //Validate coupon
        const getCoupon = await CheckoutDiscounts.findOne({
            where: {
                id: {
                    [Op.like]: placeOrderData.checkoutDiscountsId,
                },
                active: true
            }
        });

        if (getCoupon) {
            const isGlobal = getCoupon.application_type === 'global';
            const isForUsers = getCoupon.application_type === 'forUsers';
            const isForLimitedUsers = getCoupon.application_type === 'forLimitedUsers';

            const shouldApplyDiscount =
                (isGlobal || (isForUsers && userLogged !== null) || (isForLimitedUsers && getCoupon.uses_per_user > 0));

            if (shouldApplyDiscount) {
                const userConditionMet = isForUsers ? userLogged !== null : true;
                const limitedUsersConditionMet = isForLimitedUsers ? (await getDiscountsAppliedCount(getCoupon.id, userLogged?.id)) < getCoupon.uses_per_user : true;

                if (userConditionMet && limitedUsersConditionMet) {
                    await DiscountsApplied.create({
                        checkoutDiscountsId: getCoupon.id,
                        orderId: shopOrder.id,
                        userId: userLogged ? userLogged.id : null,
                    });
                }
            }
        }
        
        const response = {
            outOfStock: outOfStock,
            shopOrder: shopOrder,
            orderLines: orderLines,
        };

        return NextResponse.json(response);
    }
    async function getDiscountsAppliedCount(checkoutDiscountsId: any, userId: any) {
        const discountsApplied = await DiscountsApplied.findAll({
            where: {
                checkoutDiscountsId,
                userId,
            },
        });
        return discountsApplied.length;
    }

}