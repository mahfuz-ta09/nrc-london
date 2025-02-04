import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const commonRoutes = ['/Dashboard']
const authRoutes = ['/Login','/Signup']
const roleBasedAccess = {
    SUPER_ADMIN: [/^\/Dashboard\/super_admin/],
    ADMIN: [/^\/Dashboard\/admin/],
    STUDENT: [/^\/Dashboard\/student/],
}
type Role = {
    email?: string,
    role?: string,
    id?: string
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    let decoded = null
    if(accessToken){
        decoded = jwtDecode(accessToken)
    }
    const role=decoded?.role
    
    if(!accessToken){
        if(authRoutes.includes(pathname)) {
            return NextResponse.next()
        }else{
            return NextResponse.redirect(new URL('/Login', request.url))
        }
    }

    if(role && roleBasedAccess[role as keyof typeof roleBasedAccess]){
        const routes = roleBasedAccess[role as keyof typeof roleBasedAccess]
        console.log(routes)

        if(routes.some(route=>pathname.match(route))) return NextResponse.next()
    }

    // return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: ['/Login','/Signup','/Dashboard/:page*'],
}