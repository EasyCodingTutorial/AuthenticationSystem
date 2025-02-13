import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"


// Lets Protect Users & Admins Routes
export async function middleware (req:NextRequest){
   const token = await getToken({req})

    if(!token){
        return NextResponse.redirect(new URL('/', req.url))
    }

    // Role Based Auth
    const {pathname} = req.nextUrl;

    // Admin Routes
    const adminRoutes = [
        '/Admin'
    ]

    // Check if User is Trying To Access The Admin Routes
    if(adminRoutes.some((route) => pathname.startsWith(route))){
        if(!token.isAdmin){
            return NextResponse.redirect(new URL('/Home', req.url))
        }
    }

    return NextResponse.next()




}


export const config = {
    matcher: [
        '/Admin',
        '/Home'
    ]
}