import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, {params}: {params: {key: string}}) {
    const {key} = params;
    const url = await S3BucketUtil.getSignedUrlByKey({ key: key! });
    console.log("url", url);
    return NextResponse.json({url});
}