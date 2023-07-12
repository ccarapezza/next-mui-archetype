import Subscriber from '@/db/models/Subscriber';
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(request: NextRequest) {
    const { email } = await request.json();
    const subscriber = await Subscriber.findOne({ where: { email } });
    if (subscriber) {
        await subscriber.destroy();
        return NextResponse.json({ message: "Email unsubscribed!" }, { status: 200 });
    } else {
        return NextResponse.json({ error: "Email not subscribed!" }, { status: 400 });
    }
}