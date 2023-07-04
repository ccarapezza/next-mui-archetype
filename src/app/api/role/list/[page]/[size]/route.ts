import { Role } from '@/db';
import findAllSequelizePagination from '@/db/utils/pagination';
import { NextResponse } from 'next/server'

export async function GET(request: Request, {params}: {params: {page:number, size:number}}) {
    const roles = await findAllSequelizePagination({
        model: Role,
        page: params.page,
        size: params.size,
        attributes: ['id', 'name']
    });
    return NextResponse.json(roles);
}