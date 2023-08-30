import { productCategoryService } from '@/services/ProductCategoryService';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    console.log("search", request.nextUrl.searchParams.get("search"))
    const searchTerm = request.nextUrl.searchParams.get("search");
    const productCategory = productCategoryService.searchCategoryTree(searchTerm);
    return NextResponse.json(productCategory);
}