
import { imageContainerService } from '@/services/ImageContainerService';
import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest, {params}: {params: {key: string}}) {
    const {key} = params;
    await imageContainerService.deleteByKey(key);
    await S3BucketUtil.deleteFile({key: key, folder: S3BucketUtil.FOLDERS.MAIN_SLIDER});
    return NextResponse.json({message: "Image Deleted"}, { status: 200 });
}