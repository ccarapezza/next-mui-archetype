import { authOptions } from '@/auth/authOptions';
import { CheckoutDiscounts, DiscountsApplied } from '@/db';
import { userService } from '@/services/UserService';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import { Op } from 'sequelize';


export async function POST(request: NextRequest) {

    const postData = await request.json();
    const { coupon, total } = postData;
    //Logged in user verification
    const session = await getServerSession(authOptions);
    const userName = session?.user?.name ? session?.user?.name : false;
    const userLogged = session?.user?.email ? await userService.getByEmail(session.user.email) : null;

    //Find if the discount coupon exists in checkout discounts
    const getCoupon = await CheckoutDiscounts.findOne({
        where: {
            coupon: {
                [Op.like]: coupon,
            },
            active: true
        }
    });

    if (!getCoupon) {
        return NextResponse.json({
            error: '¡El cupón no existe!'
        });
    }

    const isUserLoggedIn = userName !== false;

    if (getCoupon.application_type === 'global' ||
        (getCoupon.application_type === 'forUsers' && isUserLoggedIn) ||
        (getCoupon.application_type === 'forLimitedUsers' && isUserLoggedIn && getCoupon.uses_per_user > 0)) {

        if (getCoupon.application_type === 'forLimitedUsers') {
            const getCosa = await DiscountsApplied.findAll({
                where: {
                    checkoutDiscountsId: getCoupon.id,
                    userId: userLogged ? userLogged.id : null,
                }
            });

            if (getCosa.length >= getCoupon.uses_per_user) {
                return NextResponse.json({
                    error: 'Este cupón ya fue utilizado!'
                });
            }
        }

        return NextResponse.json({
            value: getCoupon.value,
            coupon_id: getCoupon.id,
            coupon_type: getCoupon.coupon_type
        });

    } else {
        return NextResponse.json({
            error: 'Debes iniciar sesión para utilizar este cupón.'
        });
    }
}
