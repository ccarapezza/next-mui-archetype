import { Product } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import { NextRequest, NextResponse } from 'next/server'
import { Op, WhereOptions } from 'sequelize';

export async function GET(request: NextRequest, {params}: {params: {page:number, size:number, search?:string}}) {
    console.log("search", request.nextUrl.searchParams.get("search"))
    const searchTerm = request.nextUrl.searchParams.get("search");
    let where : WhereOptions | undefined = undefined;
    if (searchTerm) {
        where = {
            name: {
                [Op.like]: `%${searchTerm}%`
            }
        }
    }
    const products = await findAllSequelizePagination({
        model: Product,
        page: params.page,
        size: params.size,
        attributes: ['id', 'name', 'description', 'categoryId'],
        include: ['category', 'items'],
        where
    });
    console.log(products, null, 2);
    return NextResponse.json(products);
}