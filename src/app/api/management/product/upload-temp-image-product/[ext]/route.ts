import { NextRequest, NextResponse } from 'next/server'
import S3BucketUtil from '@/utils/S3BucketUtil';
import crypto from 'crypto';

export async function GET(request: NextRequest, {params}: {params: {ext: string}}) {
    const {ext} = params;
    const key = crypto.randomBytes(10).toString('hex');
    const keyWithExt = `${key}.${ext}`;
    
    const url = await S3BucketUtil.getPresignedUploadUrl({
        key: keyWithExt,
        contentType: `image/${ext}`,
        folder: S3BucketUtil.FOLDERS.TEMP,
    });

    return NextResponse.json({
        uploadUrl: url,
        key: keyWithExt,
    });
}