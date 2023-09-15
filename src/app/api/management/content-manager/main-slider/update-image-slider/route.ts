import { SliderImageService, sliderImageService } from '@/services/SliderImageService';
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest) {
    const { key, link, visible } = await request.json();

    const sliderImageUpdated = sliderImageService.updateByKey(
        key,
        {
            link,
            visible,
        }
    );

    return NextResponse.json((await sliderImageUpdated));
}