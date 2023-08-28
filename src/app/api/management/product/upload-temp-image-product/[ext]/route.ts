import { NextRequest, NextResponse } from 'next/server'
import S3BucketUtil from '@/utils/S3BucketUtil';
import crypto from 'crypto';

export async function GET(request: NextRequest, {params}: {params: {ext: string}}) {
    console.log("upload-image-product!!!!!!!!")
    const {ext} = params;
    const key = crypto.randomBytes(32).toString('hex');
    const keyWithExt = `${key}.${ext}`;

    console.log("A ver", keyWithExt, ext, "image/" + ext, "image/" + ext === "image/jpg");

    const url = await S3BucketUtil.getPresignedUploadUrl({
        key: `temp/${keyWithExt}`,
        contentType: `image/${ext}`,
    });

    return NextResponse.json({
        uploadUrl: url,
        key: keyWithExt,
    });
}