import { ProductCategory } from '@/db';
import { NextRequest, NextResponse } from 'next/server'
import { Op, WhereOptions } from 'sequelize';

export async function GET(request: NextRequest) {
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
    const productCategory = await ProductCategory.findAll({
        attributes: ['id', 'name', 'parentId'],
        include: ['parentCategory'],
    });

    return NextResponse.json(productCategory);
}