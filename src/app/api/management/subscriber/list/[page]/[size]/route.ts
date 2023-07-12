import { Subscriber } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import { NextRequest, NextResponse } from 'next/server'
import { Op, WhereOptions } from 'sequelize';

export async function GET(request: NextRequest, {params}: {params: {page:number, size:number, search?:string}}) {
    const searchTerm = request.nextUrl.searchParams.get("search");
    let where : WhereOptions | undefined = undefined;
    if (searchTerm) {
        where = {
            email: {
                [Op.like]: `%${searchTerm}%`
            }
        }
    }
    const subscribers = await findAllSequelizePagination({
        model: Subscriber,
        page: params.page,
        size: params.size,
        attributes: ['id', 'email'],
        where
    });
    return NextResponse.json(subscribers);
}