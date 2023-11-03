import { NextRequest, NextResponse } from 'next/server'

const NEWSLETTER_TAG = 'newsletter';

export async function POST(request: NextRequest) {
    const { email } = await request.json();

    const resLists = await fetch(`${process.env.LOCAL_LISTMONK_URL}/api/lists?per_page=all`)
    const resListsJson = await resLists.json();
    const newsletterList = resListsJson?.data.results.find((l: any) => l.tags.includes(NEWSLETTER_TAG));

    if(!newsletterList){
        return NextResponse.json({ error: "Error subscribing email!" }, { status: 400 });
    }

    const res = await fetch(`${process.env.LOCAL_LISTMONK_URL}/api/public/subscription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "list_uuids": [newsletterList.uuid],
        })
    });

    //create new subscriber with sequelize
    try {
        const subscriberCreatedResponse = await res.json();
        if(!res.ok){
            throw new Error("Error subscribing email!");
        }
        return NextResponse.json(subscriberCreatedResponse, { status: 200 });
    } catch (error: any) {
        //error Check if email is already subscribed
        if (error?.name === "SequelizeUniqueConstraintError") {
            return NextResponse.json({ error: "El email ya se encuentra suscripto!" }, { status: 400 });
        }
        //return a generic error
        return NextResponse.json({ error: "Error subscribing email!" }, { status: 400 });
    }
}