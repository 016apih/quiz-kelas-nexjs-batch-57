import { NextResponse } from "next/server";

export function middleware (req){
   const pathname = req.nextUrl.pathname;
   const isCookieExist = !!req.cookies.get('stoken');
   const isLoginPath = pathname.startsWith('/login');
   
   if(!isCookieExist && !isLoginPath && !['register'].includes(pathname)){
      console.log(isCookieExist, pathname, isLoginPath)
      return NextResponse.redirect(new URL('/login', req.url));
   }

   if(isCookieExist && isLoginPath){
      return NextResponse.redirect(new URL('/', req.url));
   }

   // return NextResponse.next();
}

export const config = {
   matcher: '/((?!api|_next|static|public|favicon.ico).*)'
}