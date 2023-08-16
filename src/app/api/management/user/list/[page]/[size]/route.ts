import { userService } from '@/services/UserService';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {page:number, size:number, search?:string}}) {
    const searchTerm = request.nextUrl.searchParams.get("search");
    const users = await userService.search(searchTerm, null, params.page, params.size);
    return NextResponse.json(users);
}