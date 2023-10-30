import { authOptions } from '@/auth/authOptions';
import { CustomerContact } from '@/db';
import EmailSenderContext from '@/utils/email/EmailSenderContext';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {

    const session = await getServerSession(authOptions);
    const userName = session?.user?.name ? session?.user?.name : null;
    const { statusId, answer, email } = await request.json()
    const owner = userName;

    const faqUpdate = await CustomerContact.update({ statusId, answer, owner }, { where: { id: params.id } });

    EmailSenderContext.sendEmail({
        to: email,
        from: process.env.EMAIL_USER!,
        subject: 'Respuesta a su consulta N° ' + params.id,
        html: answer
    });

    return NextResponse.json(faqUpdate);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const faqDelete = await CustomerContact.destroy({ where: { id: params.id } });
    console.log("Contacto Deleted", faqDelete);
    return NextResponse.json(faqDelete);
}