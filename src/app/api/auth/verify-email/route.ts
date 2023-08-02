import { User, VerificationToken } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

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
        const userUpdated = await user.save();

        await verificationToken.destroy();

        return NextResponse.json(userUpdated, { status: 200 });
    } catch (error: any) {
        console.log("error", error);
        //return a generic error
        return NextResponse.json({ error: "Error creating user!" }, { status: 400 });
    }
}