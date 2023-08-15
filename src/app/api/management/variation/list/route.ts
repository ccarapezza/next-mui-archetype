import { Variation, VariationOption } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    
    const variations = await Variation.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: VariationOption,
            attributes: ['id', 'value']
        }],
    });

    return NextResponse.json(variations);
}