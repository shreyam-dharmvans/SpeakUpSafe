import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
    let token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    //  console.log(token)
    let url = request.nextUrl;
    //  console.log(url)


    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }



    if (token &&
        (url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify'))
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // if (token != null && url.pathname.startsWith('/logout')) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    return NextResponse.next();

}


export const config = {
    matcher: ['/dashboard/:path*', '/sign-up', '/verify/:path*', '/sign-in']
}