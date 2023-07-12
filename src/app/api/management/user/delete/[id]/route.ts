import { NextResponse } from 'next/server'

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
    return NextResponse.json("OK");
}