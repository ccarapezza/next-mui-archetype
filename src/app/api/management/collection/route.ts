import { Collection, Product } from '@/db';
import { collectionService } from '@/services/CollectionService';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const {name, productsIds} = await request.json();
    const collectionCreated = collectionService.createCollection(name, productsIds);
    console.log("Collection Created", collectionCreated);
    return NextResponse.json(collectionCreated);
}