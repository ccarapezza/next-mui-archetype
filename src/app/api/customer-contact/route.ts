import { CustomerContact } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

const INITIAL_STATUS_ID = 1;
export async function POST(request: NextRequest) {

    const postData = await request.json()
    const customerMessage = await CustomerContact.create({
        name: postData.name,
        lastname: postData.lastname,
        phone: postData.phone,
        email: postData.email,
        message: postData.message,
        statusId: INITIAL_STATUS_ID,
    });
    console.log("Contacto Creado!!!", customerMessage);
    return NextResponse.json(customerMessage);
}