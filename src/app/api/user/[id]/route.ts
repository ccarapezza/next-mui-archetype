import { User } from '@/db';
import { NextResponse } from 'next/server'

export async function GET(request: Request, {params}: {params: {id: string}}) {
    const user = await User.findByPk(params.id, {attributes: ['id', 'name', 'email', 'image']});
    return NextResponse.json(user);
}