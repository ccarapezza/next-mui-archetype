// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: [
    '/api/management/:function*',
    '/management/:function*'
  ]
}

//TODO: add permissions to the routes
const URL_PERMISSIONS = {
  '/api/management': ['user'],
  '/api/admin': ['admin'],
}

export async function middleware(req: NextRequest) {
  const session = await getToken({req})
  if (!session) {
    return NextResponse.rewrite(new URL('/auth/signin', req.url))
  }

  return NextResponse.next();
}