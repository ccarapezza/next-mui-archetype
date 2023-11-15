import { Collection } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const postData = await request.json()
    const collectionCreated = await Collection.create(postData);
    console.log("Collection Created", collectionCreated);
    return NextResponse.json(collectionCreated);
}