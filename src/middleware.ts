// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        if(token){
          return true;
        }else{
          return false;
        }
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
