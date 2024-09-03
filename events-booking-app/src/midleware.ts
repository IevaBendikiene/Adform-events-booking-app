import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked 'async' if using 'await'

export function midleware(request: NextRequest){
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path ==='/signup' || path === 'verifyemail'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
  // return NextResponse.redirect(new URL('/home', request.url))
}
export const config = {
  macther: [
    '/',
    '/profile',
    '/login',
    '/signup',
  ]
}