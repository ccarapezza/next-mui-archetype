import { Role } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const postData = await request.json()
    const roleCreated = await Role.create(postData);
    console.log("Role Created", roleCreated);
    return NextResponse.json(roleCreated);
}