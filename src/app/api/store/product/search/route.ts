import { Variation } from '@/db';
import { VariationFilter } from '@/schemas/filterProduct';
import { productService } from '@/services/ProductService';
import { variationService } from '@/services/VariationService';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const id = parseInt(request.nextUrl.searchParams.get("id")!);

    const categoryParam = request.nextUrl.searchParams.get('category');
    const priceMinParam = request.nextUrl.searchParams.get('pricemin');
    const priceMaxParam = request.nextUrl.searchParams.get('pricemax');
    const variationsFilter: VariationFilter[] = [];
    
    const variations: Variation[] = await variationService.getAll({attributes: ['name']});
    for(const variation of variations){
        const variationParam = request.nextUrl.searchParams.get(variation.name);
        if(variationParam){
            variationsFilter.push({key: variation.name, values: variationParam.split(",")});
        }
    }

    const products = await productService.searchByFilters({
        category: categoryParam,
        priceMin: priceMinParam ? parseInt(priceMinParam) : undefined,
        priceMax: priceMaxParam ? parseInt(priceMaxParam) : undefined,
        variations: variationsFilter
    })

    return NextResponse.json(products);
}