import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  return NextResponse.redirect(new URL('/auth/login', request.url))
}
 

export const config = {
  matcher: '/dashboard',
}