import { FaqEditor } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, {params}: {params: {id: string}}) {
    const { ask, answer } = await request.json()
    const faqUpdate = await FaqEditor.update({ask, answer}, {where: {id: params.id}});
    console.log("FAQ Updated", faqUpdate);
    return NextResponse.json(faqUpdate);
}

export async function DELETE(request: NextRequest, {params}: {params: {id: string}}) {
    const faqDelete = await FaqEditor.destroy({where: {id: params.id}});
    console.log("FAQ Deleted", faqDelete);
    return NextResponse.json(faqDelete);
}