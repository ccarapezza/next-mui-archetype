import { VariationOption } from '@/db';
import { VariationOptionDto } from '@/schemas/variationOption';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const postData = await request.json()
    const variationOptions = await VariationOption.create({
        value: postData.value,
        variationId: postData.variationId
    });
    console.log("Variation Option Created", variationOptions);
    return NextResponse.json(variationOptions.toJSON<VariationOptionDto>());
}