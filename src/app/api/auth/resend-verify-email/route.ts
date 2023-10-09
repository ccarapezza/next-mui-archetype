import { User, VerificationToken } from '@/db';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import EmailSenderContext from '@/utils/email/EmailSenderContext';

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    try{
        //get VerificationToken
        const verificationToken = await VerificationToken.findOne({
            where: {
                identifier: email
            }
        });
        console.log("verificationToken", verificationToken)
        if(verificationToken){
            const token = bcrypt.hashSync(new Date().getTime().toString().concat(email), 10).replace(/[^a-zA-Z0-9]/g, '');
            const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//1 day
            verificationToken.token = token;
            verificationToken.expires = expires;
            await verificationToken.save();

            EmailSenderContext.sendVerificationEmail({
                email: email!,
                token: verificationToken.token
            });
        }

        return NextResponse.json("Resend success!", { status: 200 });
    } catch (error: any) {
        console.log("error", error);
        //return a generic error
        return NextResponse.json({ error: "Error creating user!" }, { status: 400 });
    }
}