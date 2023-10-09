import EmailSenderContext from '@/utils/email/EmailSenderContext';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { htmlContent , email }:{htmlContent: string, email: string} = await request.json();

    await EmailSenderContext.sendEmail({
        to: email,
        from: process.env.EMAIL_USER!,
        subject: "Test Email",
        html: htmlContent
    });

    console.log("Test Email Sent");

    return NextResponse.json("");
}