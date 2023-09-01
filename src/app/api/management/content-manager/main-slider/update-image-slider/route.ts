import { SliderImageService, sliderImageService } from '@/services/SliderImageService';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, {params}: {params: {key: string, link: string, visible: boolean}}) {
    const { key, link, visible } = params;

    const sliderImageUpdated = sliderImageService.updateByKey(
        key,
        {
            link,
            visible,
        }
    );

    return NextResponse.json((await sliderImageUpdated));
}