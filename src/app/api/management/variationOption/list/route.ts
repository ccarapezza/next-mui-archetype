import { VariationOption } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    
    const variationsOptions = await VariationOption.findAll({
        attributes: ['value'],
        include: ['variation'],
    });

    return NextResponse.json(variationsOptions);
}