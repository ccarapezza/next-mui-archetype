import { Subscriber } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

//create new subscriber with sequelize and return or if has error and error Check if email is already subscribed and returns an error or return a generic error
export async function POST(request: NextRequest) {
    const { email } = await request.json();
    //create new subscriber with sequelize
    try {
        const subscriberCreated = await Subscriber.create({ email });
        return NextResponse.json(subscriberCreated, { status: 200 });
    } catch (error: any) {
        console.log("error", error);
        //error Check if email is already subscribed
        if (error?.name === "SequelizeUniqueConstraintError") {
            return NextResponse.json({ error: "El email ya se encuentra suscripto!" }, { status: 400 });
        }
        //return a generic error
        return NextResponse.json({ error: "Error subscribing email!" }, { status: 400 });
    }
}