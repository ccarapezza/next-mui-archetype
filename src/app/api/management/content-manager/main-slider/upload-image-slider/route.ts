import { SliderImageService, sliderImageService } from '@/services/SliderImageService';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, {params}: {params: {key: string, link: string}}) {
    const { key, link } = params;

    const sliderImageCreated = sliderImageService.create({
        key,
        link,
        visible: true,
    });

    return NextResponse.json((await sliderImageCreated).toJSON());
}