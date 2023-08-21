import { User } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    const body = await request.json();
    const roleUpdated = await User.update(body, {where: {id: params.id}});
    console.log("User Updated", roleUpdated);
    return NextResponse.json(roleUpdated);
}