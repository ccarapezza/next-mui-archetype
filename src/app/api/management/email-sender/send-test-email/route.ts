import EmailUtil from '@/utils/EmailUtil';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { htmlContent , email }:{htmlContent: string, email: string} = await request.json();

    await EmailUtil.sendEmail({
        to: email,
        from: `carapezza.christian@gmail.com`,
        subject: "Test Email",
        html: htmlContent
    });

    console.log("Test Email Sent");

    return NextResponse.json("");
}