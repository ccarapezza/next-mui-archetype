import { Role, User, VerificationToken } from '@/db';
import { NextRequest, NextResponse } from 'next/server'
import { Op } from "sequelize";
import bcrypt from 'bcryptjs';
import EmailUtil from '@/utils/EmailUtil';

export async function POST(request: NextRequest) {
    const { name, email, password } = await request.json();

    console.log("name", name);
    console.log("email", email);

    // check duplicate users
    const checkexisting = await User.findOne({
        where: {
            [Op.or]: [
                { email },
                { name }
            ]
        }
    });
    if (checkexisting) {
        return NextResponse.json({ error: "Email or Username already exists!" }, { status: 400 });
    }

    try {
        const createdUser = await User.create({ name, email, password: bcrypt.hashSync(password, 10) });
        const clientRole = await Role.findOne({
            where: {
                name: "client"
            }
        });
        await createdUser.addRole(clientRole!);

        console.log('%Sending verification email...', 'color: green');
        try {
            //generate token hash to verify email
            const token = bcrypt.hashSync(new Date().getTime().toString().concat(email), 10).replace(/[^a-zA-Z0-9]/g, '');
            const expires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);//1 day

            const verificationToken = await VerificationToken.create({
                identifier: email,
                token: token,
                expires
            });

            await EmailUtil.sendVerificationEmail({
                email,
                token: verificationToken.token
            })
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
        return NextResponse.json(createdUser, { status: 200 });
    } catch (error: any) {
        console.log("error", error);
        //return a generic error
        return NextResponse.json({ error: "Error creating user!" }, { status: 400 });
    }
}