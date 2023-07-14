import { EmailTemplate, Role } from '@/db';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { name, template } = await request.json()
    const emailTemplateCreated = await EmailTemplate.create({ 
        name,
        template
    });
    console.log("EmailTemplate Created", emailTemplateCreated);
    return NextResponse.json(emailTemplateCreated);
}