
import { authOptions } from '@/auth/authOptions';
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth';
import { userService } from '@/services/UserService';
import S3BucketUtil from '@/utils/S3BucketUtil';

export async function PUT(request: NextRequest) {
    const { key } = await request.json();
    const session = await getServerSession(authOptions);
    const user = session?.user?.email ? await userService.getByEmail(session.user.email) : null;
    if (!user) {
        return NextResponse.json({
            error: "No user logged in",
        }, {
            status: 400,
        });
    }
    user.image = key;
    await user.save();

    const jsonUser = user.toJSON();

    jsonUser.image = await S3BucketUtil.getSignedUrlByKey({
        folder: S3BucketUtil.FOLDERS.AVATARS,
        key: key,
    });

    return NextResponse.json(jsonUser);
}