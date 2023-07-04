import { User } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import { NextResponse } from 'next/server'

export async function GET(request: Request, {params}: {params: {page:number, size:number}}) {
    //const users = await User.findAll({attributes: ['id', 'name', 'email', 'image']});
    const users = await findAllSequelizePagination({
        model: User,
        page: params.page,
        size: params.size,
        attributes: ['id', 'name', 'email', 'image']
    });
    console.log("Users: ", users, params);
    return NextResponse.json(users);
}