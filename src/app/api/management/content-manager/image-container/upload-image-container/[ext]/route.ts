import { NextRequest, NextResponse } from 'next/server'
import S3BucketUtil from '@/utils/S3BucketUtil';
import crypto from 'crypto';

export async function GET(request: NextRequest, {params}: {params: {ext: string}}) {
    const {ext} = params;
    const key = crypto.randomBytes(32).toString('hex');
    const keyWithExt = `${key}.${ext}`;

    const url = await S3BucketUtil.getPresignedUploadUrl({
        key: `${S3BucketUtil.FOLDERS.IMAGE_CONTAINER}/${keyWithExt}`,
        contentType: `image/${ext}`,
    });

    return NextResponse.json({
        uploadUrl: url,
        key: keyWithExt,
    });
}