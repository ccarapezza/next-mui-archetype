import { authOptions } from "@/auth/authOptions";
import { userService } from "@/services/UserService";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function PUT(request: NextRequest) {
    const { newEmail, password } = await request.json();
    const session = await getServerSession(authOptions);
    const user = session?.user?.email ? await userService.getByEmail(session.user.email) : null;
    if (!user) {
        return NextResponse.json({
            error: "No user logged in",
        }, {
            status: 400,
        });
    }

    if(!bcrypt.compareSync(password, user?.password!)){
        return NextResponse.json({
            error: "Password is incorrect",
        }, {
            status: 401
        });
    }

    user.email = newEmail;
    await user.save();
    return NextResponse.json({ message: "Email changed successfully" });

}