import { User, VerificationToken } from '@/db';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import EmailSenderContext from '@/utils/email/EmailSenderContext';

export async function POST(request: NextRequest) {
    const { token } = await request.json();

    try{
        //get VerificationToken
        const verificationToken = await VerificationToken.findOne({
            where: {
                token
            }
        });
        console.log("verificationToken", verificationToken)
        const user = await User.findOne({
            where: {
                email: verificationToken?.identifier
            }
        });

        if(!verificationToken || !user){
            return NextResponse.json({ error: "Token not found!" }, { status: 400 });
        }

        console.log("verificationToken", verificationToken);
        console.log("user", user)
        const now = new Date();
        console.log("TIME NOW:", now);
        console.log("VerificationToken:", verificationToken?.expires);
        

        if(verificationToken?.expires?.getTime()! < new Date().getTime()){
            return NextResponse.json({ error: "Token expired!" }, { status: 400 });
        }

        user.emailVerified = new Date();

        //create temporal password
        const temporalPassword = Math.random().toString(36).slice(-8)
        console.log(`New Temporal Password for user ${user.name} (${user.email}): ${temporalPassword}`);
        user.password = bcrypt.hashSync(temporalPassword, 10);

        const userUpdated = await user.save();

        console.log('%Sending verification email...', 'color: green');
        try {
            await EmailSenderContext.sendWelcomeEmail({
                email: user.email,
                url: `${process.env.NEXT_PUBLIC_URL}/auth/signin`,
                temporalPassword: temporalPassword,
            })
        } catch (error) {
            console.error('Error sending email:', error);
            if (process.env.NODE_ENV !== 'development') {
                throw error;
            }
        }

        await verificationToken.destroy();

        return NextResponse.json(userUpdated.toJSON(), { status: 200 });
    } catch (error: any) {
        console.log("error", error);
        //return a generic error
        return NextResponse.json({ error: "Error creating user!" }, { status: 400 });
    }
}