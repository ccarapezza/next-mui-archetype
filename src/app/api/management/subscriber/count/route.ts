import { Subscriber } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const subscribers = await Subscriber.count();
    return NextResponse.json(subscribers);
}