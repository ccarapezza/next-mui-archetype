import { authOptions } from '@/auth/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

const JS_NO_CACHE_FILE = 'main.e0d4075d.js';
const LISTMONK_API_PATH = '/api/management/listmonk/api/';
const LISTMONK_ADMIN_PATH = '/api/management/listmonk/admin/';

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
    const path = params?.path?.join("/");
    const url = `${process.env.LOCAL_LISTMONK_URL}${path?"/".concat(path):""}${request?.nextUrl?.search?request?.nextUrl?.search:""}`;
    const session = await getServerSession(authOptions);
    const roles = session?.user?.roles;
    const isAdmin = roles?.includes("ADMIN");

    try {
        const response = await fetch(url,{
            cache: url.endsWith(JS_NO_CACHE_FILE)?'no-cache':'default'
        });

        let contentType;
        let responseReturn;

        if(path?.endsWith(".js")){
            contentType = "application/javascript";
            responseReturn = await response.text();
            responseReturn = responseReturn.replace(/\/api\//g, LISTMONK_API_PATH).replace(/\/admin\//g, LISTMONK_ADMIN_PATH);
        }else if(path?.endsWith(".css")){
            contentType = "text/css";
            responseReturn = await response.text();
            responseReturn = responseReturn.replace(/\/api\//g, LISTMONK_API_PATH).replace(/\/admin\//g, LISTMONK_ADMIN_PATH);
            if(!isAdmin){
                responseReturn = responseReturn.concat('.menu-list li:last-child{display: none;}');
            }
        }else if(path?.endsWith(".png")){
            contentType = "image/png";
            responseReturn = await response.blob();
        }else if(path?.endsWith(".svg")){
            contentType = "image/svg+xml";
            responseReturn = await response.blob();
        }else if(path?.endsWith(".woff2")){
            contentType = "font/woff2";
            responseReturn = await response.blob();
        }else{
            contentType = "text/html"
            responseReturn = await response.text();
            responseReturn = responseReturn.replace(/\/api\//g, LISTMONK_API_PATH).replace(/\/admin\//g, LISTMONK_ADMIN_PATH);
        }

        //return the file
        return new Response(responseReturn, {
            headers: {
                'Content-Type': contentType,
            },
        });
    }catch(error){
        console.error(error);
        const message = "Servicio no disponible!, por favor intente nuevamente mas tarde. Si el problema persiste contacte al administrador.";
        return new Response(
            `<html>
                <body>
                    <p style="font-weight: bold; color: rgb(220,0,0); margin-left: 15px; margin-top: 15px">${message}</p>
                </body>
            </html>`,
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            }
        );
    }
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
    const session = await getServerSession(authOptions);
    const roles = session?.user?.roles;
    const isAdmin = roles?.includes("ADMIN");
    const path = params?.path?.join("/");
    const url = `${process.env.LOCAL_LISTMONK_URL}${path?"/".concat(path):""}${request?.nextUrl?.search?request?.nextUrl?.search:""}`;

    if(url.endsWith("/preview")){
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'text/html'
            }
        });

        const responseReturn = await response.text();

        return new Response(responseReturn, {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    }

    if(url.endsWith("/api/media")){
        const data = await request.formData();
        const response = await fetch(url,{
            method: 'POST',
            body: data
        });
        const jsonResponse = await response.json();
        return NextResponse.json(jsonResponse, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    if(url.includes("/api/settings") && !isAdmin){
        return new Response("Forbidden", {
            status: 403,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const data = await request.json();
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();
    return NextResponse.json(jsonResponse, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
    const path = params?.path?.join("/");
    const url = `${process.env.LOCAL_LISTMONK_URL}${path?"/".concat(path):""}${request?.nextUrl?.search?request?.nextUrl?.search:""}`;
    const data = await request.json();

    const response = await fetch(url,{
        cache: 'no-cache',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const jsonResponse = await response.json();
    return NextResponse.json(jsonResponse, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
    const path = params?.path?.join("/");
    const url = `${process.env.LOCAL_LISTMONK_URL}${path?"/".concat(path):""}${request?.nextUrl?.search?request?.nextUrl?.search:""}`;

    const response = await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const jsonResponse = await response.json();    
    return NextResponse.json(jsonResponse, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}