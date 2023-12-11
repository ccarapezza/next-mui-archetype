import { NextRequest, NextResponse } from 'next/server'
import { productService } from '@/services/ProductService';

export async function GET(request: NextRequest) {
    const page = parseInt(request.nextUrl.searchParams.get("page")!) || 1;
    const size = parseInt(request.nextUrl.searchParams.get("size")!) || 4;
    const q = request.nextUrl.searchParams.get("q");

    const searchResults = await productService.search(q, page, size);
    return NextResponse.json(searchResults);
}