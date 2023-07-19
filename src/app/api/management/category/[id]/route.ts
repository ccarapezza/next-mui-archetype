import { ProductCategory } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("ProductCategory GET request received", params.id); // "ProductCategory GET request received
    const user = await ProductCategory.findByPk(params.id, {attributes: ['id', 'name'], include: ['parentCategory']});
    return NextResponse.json(user);
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    const { name, parentId } = await request.json()
    const roleUpdated = await ProductCategory.update({name, parentId}, {where: {id: params.id}});
    console.log("ProductCategory Updated", roleUpdated);
    return NextResponse.json(roleUpdated);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("ProductCategory Deleting");
    const roleDeleted = await ProductCategory.destroy({where: {id: params.id}});
    console.log("ProductCategory Deleted", roleDeleted);
    return NextResponse.json(roleDeleted);
}