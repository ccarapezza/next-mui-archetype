import { Role, User, VerificationToken } from '@/db';
import { Op } from "sequelize";
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs';
import EmailUtil from '@/utils/EmailUtil';

export async function POST(request: NextRequest) {
    const userData = await request.json()
    //check if user exist
    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { email: userData.email! },
                { name: userData.name }
            ]
        }
    });

    if (existingUser) {
        return NextResponse.json({ error: "Email or Username already exists!" }, { status: 400 });
    }

    //generate token hash to verify email
    const token = bcrypt.hashSync(new Date().getTime().toString().concat(userData?.email!), 10).replace(/[^a-zA-Z0-9]/g, '');
    const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//1 day

    const verificationToken = await VerificationToken.create({
        identifier: userData?.email,
        token: token,
        expires
    });

    try {
        await EmailUtil.sendVerificationEmail({
            email: userData?.email!,
            token: verificationToken.token
        })
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }

    //create user
    const createdUser = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
    });
    const clientRole = await Role.findOne({
        where: {
            name: "admin"
        }
    });
    await createdUser.addRole(clientRole!);

    return NextResponse.json(createdUser, { status: 200 });
}