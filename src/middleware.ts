// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

const urlAccess: { [key: string]: string[] } = {
    "/management": ["admin", "user"],
    "/management/categories": ["user"],
    "/management/change-password": ["user"],
    "/management/customers": ["user"],
    "/management/email-templates": ["user"],
    "/management/my-profile": ["user"],
    "/management/orders": ["user"],
    "/management/products": ["user"],
    "/management/send-emails": ["user"],
    "/management/subscriber": ["user"],
    "/management/users": ["admin"],
    "/management/roles": ["admin"],
}

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log(req.nextauth)
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
