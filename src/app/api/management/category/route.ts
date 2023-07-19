import { ProductCategory } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const postData = await request.json()
    const productCategoryCreated = await ProductCategory.create(postData);
    console.log("ProductCategory Created", productCategoryCreated);
    return NextResponse.json(productCategoryCreated);
}