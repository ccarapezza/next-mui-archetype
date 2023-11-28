import { CheckoutDiscounts } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log("POST request", request.body);
    const postData = await request.json()
    const checkoutDiscountsCreated = await CheckoutDiscounts.create(postData);
    console.log("Cupon Creado!!!", checkoutDiscountsCreated);
    return NextResponse.json(checkoutDiscountsCreated);
}