import { ProductCategory } from '@/db';
import { ProductCategoryService } from '@/services/ProductCategoryService';
import { NextRequest, NextResponse } from 'next/server'
import { Op, WhereOptions } from 'sequelize';

export async function GET(request: NextRequest) {
    console.log("search", request.nextUrl.searchParams.get("search"))
    const searchTerm = request.nextUrl.searchParams.get("search");
    const productCategory = ProductCategoryService.searchCategoryTree(searchTerm);
    return NextResponse.json(productCategory);
}