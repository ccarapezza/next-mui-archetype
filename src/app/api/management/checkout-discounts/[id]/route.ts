import { CheckoutDiscounts } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { active } = await request.json()
    const checkoutDiscountsUpdate = await CheckoutDiscounts.update({ active }, { where: { id: params.id } });
    console.log("CheckoutDiscounts active Updated", checkoutDiscountsUpdate);
    return NextResponse.json(checkoutDiscountsUpdate);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const checkoutDiscountsUpdated = await CheckoutDiscounts.update(
        { deletedAt: new Date() },
        { where: { id: params.id } }
    );
    console.log("CheckoutDiscounts Soft Deleted", checkoutDiscountsUpdated);
    return NextResponse.json(checkoutDiscountsUpdated);
}