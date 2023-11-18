import { Collection } from '@/db';
import { collectionService } from '@/services/CollectionService';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("Collection GET request received", params.id); // "Collection GET request received
    const collections = await Collection.findByPk(params.id, {attributes: ['id', 'name'], include: ['products']});
    console.log("Collection Found", collections);
    return NextResponse.json(collections);
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("Collection PUT request received", params.id); // "Collection PUT request received
    const {name, productsIds} = await request.json();
    const collectionUpdated = await collectionService.updateCollection(parseInt(params.id), name, productsIds);
    console.log("Collection Updated", collectionUpdated);
    return NextResponse.json(collectionUpdated);   
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("Collection Deleting");
    const collectionDeleted = await Collection.destroy({where: {id: params.id}});
    console.log("Collection Deleted", collectionDeleted);
    return NextResponse.json(collectionDeleted);
}