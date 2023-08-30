import { User } from '@/db';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import emailUtil from '@/utils/EmailUtil';

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    try{
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if(!user){
            return NextResponse.json({ error: "User not found!" }, { status: 400 });
        }

        if(!user?.emailVerified){
            return NextResponse.json({ error: "Email not verified!" }, { status: 400 });
        }
        
        //create temporal password
        const temporalPassword = Math.random().toString(36).slice(-8)
        user.password = bcrypt.hashSync(temporalPassword, 10);

        console.log(`New Temporal Password for ${user.email}: `, temporalPassword);

        const userUpdated = await user.save();

        console.log('%Sending new password...', 'color: green');
        try {
            await emailUtil.sendWelcomeEmail({
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

        return NextResponse.json({email: email}, { status: 200 });
    } catch (error: any) {
        console.log("error", error);
        //return a generic error
        return NextResponse.json({ error: "Error creating user!" }, { status: 400 });
    }
}