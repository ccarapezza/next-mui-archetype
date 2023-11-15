import { Collection } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("Collection GET request received", params.id); // "Collection GET request received
    const user = await Collection.findByPk(params.id, {attributes: ['id', 'name'], include: ['products']});
    return NextResponse.json(user);
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    const { name, parentId } = await request.json()
    const collectionUpdated = await Collection.update({name, parentId}, {where: {id: params.id}});
    console.log("Collection Updated", collectionUpdated);
    return NextResponse.json(collectionUpdated);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("Collection Deleting");
    const collectionDeleted = await Collection.destroy({where: {id: params.id}});
    console.log("Collection Deleted", collectionDeleted);
    return NextResponse.json(collectionDeleted);
}