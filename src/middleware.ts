// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

/*
{ id: 1, name: 'admin' },
{ id: 2, name: 'user' },
{ id: 3, name: 'client' },
{ id: 4, name: 'marketing' },
{ id: 5, name: 'sales' },
{ id: 6, name: 'designer' }
*/

const urlAccess: { [key: string]: string[] } = {
    "/management": ["admin", "user"],
    "/management/categories": ["admin", "sales"],
    "/management/change-password": ["admin", "user"],
    "/management/customers": ["admin", "sales", "marketing"],
    "/management/email-templates": ["admin", "marketing"],
    "/management/my-profile": ["admin", "user"],
    "/management/orders": ["admin", "sales"],
    "/management/products": ["admin", "sales"],
    "/management/send-emails": ["admin", "marketing"],
    "/management/subscriber": ["admin", "marketing"],
    "/management/users": ["admin"],
}

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        //check if user is authorized to access the url
        const accessAuthorized = Object.keys(urlAccess).reduce((access, url) => {
            if (req.nextUrl.pathname.startsWith(url)) {
                const roles = req.nextauth.token?.roles as string[];
                //search if one elemnt of the array is in the other array
                if (!urlAccess[url].some((r) => roles?.includes(r))) {
                    return access && false;
                }
            }
            return access && true;
        }, true);

        if (!accessAuthorized) {
            console.log("Not authorized for this token: ", req.nextauth.token)
            return new NextResponse("You are not authorized!");
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            },
        },
    }
)



export const config = {
    matcher: [
        '/api/management/:function*',
        '/management/:function*'
    ]
};
