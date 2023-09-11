import { FaqEditor } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log("POST request", request.body);
    
    const postData = await request.json()
    const faqCreated = await FaqEditor.create(postData);
    console.log("FAQ Creada!!!", faqCreated);
    return NextResponse.json(faqCreated);
}