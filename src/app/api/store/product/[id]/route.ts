import { ProductDto } from '@/schemas/product';
import { productService } from '@/services/ProductService';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {

    const product = await productService.getDtoById(params.id);
    //obtain product by id
    if(product){
        return NextResponse.json(product);
    }

    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
}