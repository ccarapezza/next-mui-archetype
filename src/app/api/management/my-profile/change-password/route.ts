import { authOptions } from "@/auth/authOptions";
import { userService } from "@/services/UserService";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { VerificationToken } from "@/db";
import EmailSenderContext from '@/utils/email/EmailSenderContext';

export async function PUT(request: NextRequest) {
    const { currentPassword, newPassword } = await request.json();
    const session = await getServerSession(authOptions);
    const user = session?.user?.email ? await userService.getByEmail(session.user.email) : null;
    if (!user) {
        return NextResponse.json({
            error: "No user logged in",
        }, {
            status: 400,
        });
    }

    if(!bcrypt.compareSync(currentPassword, user?.password!)){
        return NextResponse.json({
            error: "Current password is incorrect",
        }, {
            status: 401
        });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();

    //Generate verifiation code
    //generate token hash to verify email
    const token = bcrypt.hashSync(new Date().getTime().toString().concat(user?.email!), 10).replace(/[^a-zA-Z0-9]/g, '');
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//1 day

    const verificationToken = await VerificationToken.create({
        identifier: user?.email,
        token: token,
        expires
    });

    try {
        console.log("TOKEN:",`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/verify-email?token=${verificationToken.token}`);
        await EmailSenderContext.sendVerificationEmail({
            email: user?.email!,
            token: verificationToken.token
        })
    } catch (error) {
        console.error('Error sending email:', error);
        //throw error is dev environment
        if (process.env.NODE_ENV !== 'development')
            throw error;
    }


    return NextResponse.json({ message: "Password changed successfully" });
}