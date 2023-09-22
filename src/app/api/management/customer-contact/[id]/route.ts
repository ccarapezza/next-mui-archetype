import { authOptions } from '@/auth/authOptions';
import { CustomerContact } from '@/db';
import { userService } from '@/services/UserService';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    const userName = session?.user?.name ? session?.user?.name : null;
    const { statusId, answer } = await request.json()
    const owner = userName;
    const faqUpdate = await CustomerContact.update({ statusId, answer, owner }, { where: { id: params.id } });
    console.log("Contacto Updated", faqUpdate);
    return NextResponse.json(faqUpdate);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const faqDelete = await CustomerContact.destroy({ where: { id: params.id } });
    console.log("Contacto Deleted", faqDelete);
    return NextResponse.json(faqDelete);
}