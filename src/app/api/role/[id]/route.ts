import { Role } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("Role GET request received", params.id); // "Role GET request received
    const user = await Role.findByPk(params.id, {attributes: ['id', 'name']});
    return NextResponse.json(user);
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    const { name } = await request.json()
    const roleUpdated = await Role.update({name}, {where: {id: params.id}});
    console.log("Role Updated", roleUpdated);
    return NextResponse.json(roleUpdated);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("Role Deleting");
    const roleDeleted = await Role.destroy({where: {id: params.id}});
    console.log("Role Deleted", roleDeleted);
    return NextResponse.json(roleDeleted);
}