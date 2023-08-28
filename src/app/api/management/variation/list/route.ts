import { Variation, VariationOption } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    
    const variations = await Variation.findAll({
        attributes: ['id', 'name'],
        include: [{
            model: VariationOption,
            attributes: ['id', 'value']
        }],
        order: [
            ['id', 'ASC']
        ]
    });

    return NextResponse.json(variations);
}