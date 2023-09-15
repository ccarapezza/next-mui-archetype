import { NextRequest, NextResponse } from 'next/server'
import { imageContainerService } from '@/services/ImageContainerService';

export async function GET(request: NextRequest, {params}: {params: {code: string}}) {
    const {code} = params;

    //get ImageContainer by code
    const imageContainer = await imageContainerService.getDtoByCode(code);
    if(!imageContainer){
        return NextResponse.json({ error: true, message: 'Invalid code' }, { status: 400 });
    }
    return NextResponse.json(imageContainer);
}