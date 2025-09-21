
'use server'
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
const commonRoutes = ['/dashboard']
const authRoutes = ['/login','/signup']
const roleBasedAccess = {
    SUPER_ADMIN: [/^\/dashboard\/super_admin/],
    ADMIN: [/^\/dashboard\/admin/],
    STUDENT: [/^\/dashboard\/student/],
}
interface CustomJwtPayload extends JwtPayload {
    role?: string;
}


export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("nrc_acc")?.value

    
    const decoded: CustomJwtPayload | null = accessToken ? jwtDecode<CustomJwtPayload>(accessToken) : null;
    let role = decoded?.role ? decoded.role.toUpperCase() : null
    
    
    if (accessToken && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    
    if (!accessToken) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    
    if (role && roleBasedAccess[role as keyof typeof roleBasedAccess]) {
        const routes = roleBasedAccess[role as keyof typeof roleBasedAccess]

        if (routes.some(route => pathname.match(route))) {
            return NextResponse.next()
        }
    }

    // return NextResponse.redirect(new URL('/', request.url));
}

 
export const config = {
  matcher: ['/login','/lignup','/dashboard/:page*'],
}



