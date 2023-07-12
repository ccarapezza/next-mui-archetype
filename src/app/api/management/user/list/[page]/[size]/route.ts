import { User } from '@/db';
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
    const users = await findAllSequelizePagination({
        model: User,
        page: params.page,
        size: params.size,
        attributes: ['id', 'name', 'email', 'image'],
        where
    });
    console.log("Users: ", users, params);
    return NextResponse.json(users);
}