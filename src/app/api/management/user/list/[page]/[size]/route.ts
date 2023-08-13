import { UserService } from '@/services/UserService';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {page:number, size:number, search?:string}}) {
    console.log("search", request.nextUrl.searchParams.get("search"))
    const searchTerm = request.nextUrl.searchParams.get("search");
    const users = await UserService.search(searchTerm, null, params.page, params.size);
    console.log("Users: ", users, params);
    return NextResponse.json(users);
}