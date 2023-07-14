import { EmailTemplate } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("EmailTemplate GET request received", params.id); // "EmailTemplate GET request received
    const user = await EmailTemplate.findByPk(params.id, {attributes: ['id', 'name', 'template']});
    return NextResponse.json(user);
}

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    const { name, template } = await request.json()
    const roleUpdated = await EmailTemplate.update({name, template}, {where: {id: params.id}});
    console.log("EmailTemplate Updated", roleUpdated);
    return NextResponse.json(roleUpdated);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    console.log("EmailTemplate Deleting");
    const roleDeleted = await EmailTemplate.destroy({where: {id: params.id}});
    console.log("EmailTemplate Deleted", roleDeleted);
    return NextResponse.json(roleDeleted);
}