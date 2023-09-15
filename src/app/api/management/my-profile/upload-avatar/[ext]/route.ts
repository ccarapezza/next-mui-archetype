import { NextRequest, NextResponse } from 'next/server'
import S3BucketUtil from '@/utils/S3BucketUtil';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/authOptions';
import { userService } from '@/services/UserService';

export async function GET(request: NextRequest, {params}: {params: {ext: string}}) {
    const {ext} = params;
    //get user id
    const session = await getServerSession(authOptions);
    const user = session?.user?.email?await userService.getByEmail(session.user.email):null;
    const key = user?.id;
    if(!key){
        return NextResponse.json({
            error: "No user logged in",
        }, {
            status: 400,
        });
    }
    const keyWithExt = `${key}.${ext}`;

    const url = await S3BucketUtil.getPresignedUploadUrl({
        key: `${S3BucketUtil.FOLDERS.AVATARS}/${keyWithExt}`,
        contentType: `image/${ext}`,
    });

    return NextResponse.json({
        uploadUrl: url,
        key: keyWithExt,
    });
}