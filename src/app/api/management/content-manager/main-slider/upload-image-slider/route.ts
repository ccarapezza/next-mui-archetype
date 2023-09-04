import { SliderImageDto } from '@/schemas/sliderImage';
import { SliderImageService, sliderImageService } from '@/services/SliderImageService';
import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { key } = await request.json();

    const sliderImageCreated = await sliderImageService.create({
        key,
        visible: true,
    });

    const sliderImageDto = (await sliderImageCreated).toJSON<SliderImageDto>();
    sliderImageDto.image = await S3BucketUtil.getSignedUrlByKey({
        key: sliderImageDto.key,
        folder: S3BucketUtil.FOLDERS.MAIN_SLIDER,
    });

    return NextResponse.json(sliderImageDto);
}

export async function PUT(request: NextRequest) {
    const { key, link, visible } = await request.json();

    const sliderImageUpdated = sliderImageService.updateByKey(
        key,
        {
            link,
            visible
        }
    );
    return NextResponse.json((await sliderImageUpdated));
}