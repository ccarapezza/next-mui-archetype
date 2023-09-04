import { ImageContainer } from '@/db';
import { ImageContainerDto } from '@/schemas/imageContainer';
import { imageContainerService } from '@/services/ImageContainerService';
import S3BucketUtil from '@/utils/S3BucketUtil';
import { NextRequest, NextResponse } from 'next/server'
//
export const IMAGE_CONTAINER_CODES = {
    HOME_IMAGE_1: 'home-image-1',
    HOME_IMAGE_2: 'home-image-2',
    HOME_IMAGE_3: 'home-image-3'
};

export async function POST(request: NextRequest) {
    const {
        code,
        key,
        title,
        buttonLabel,
        link
    } = await request.json();

    //check if code is valid
    if (!Object.values(IMAGE_CONTAINER_CODES).includes(code)) {
        return NextResponse.json({ error: true, message: 'Invalid code' }, { status: 400 });
    }

    //check if code is already used
    let imageContainer = await imageContainerService.getByCode(code) as ImageContainer;
    if (imageContainer) {
        //update existing image container
        imageContainer.key = key;
        imageContainer.title = title;
        imageContainer.buttonLabel = buttonLabel;
        imageContainer.link = link;
        imageContainer = await imageContainer.save();
    }else{
        //create new image container
        imageContainer = await imageContainerService.create({
            code,
            key,
            title,
            buttonLabel,
            link
        });
    }

    const imageContainerDto = (await imageContainer).toJSON<ImageContainerDto>();
    imageContainerDto.image = await S3BucketUtil.getSignedUrlByKey({
        key: imageContainerDto.key,
        folder: S3BucketUtil.FOLDERS.IMAGE_CONTAINER,
    });

    return NextResponse.json(imageContainerDto);
}