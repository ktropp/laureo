import {NextRequest, NextResponse} from 'next/server'
import {decrypt} from 'lib/session'
import {cookies} from 'next/headers'

// Specify protected and public routes
const protectedRoutes = ['/', '/styleguide']
const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
    // Check if there exists at least one user in the database
    try {
        const response = await fetch(`${req.nextUrl.origin}/api/check-install`)
        const data = await response.json()

        if (!data && !req.nextUrl.pathname.startsWith('/install')) {
            return NextResponse.redirect(new URL('/install', req.nextUrl))
        }else if (data && req.nextUrl.pathname.startsWith('/install')) {
            return NextResponse.redirect(new URL('/', req.nextUrl))
        }
    } catch (error) {
        console.error('Error checking installation status:', error)
    }

    // Check if the current route is protected or public
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    // Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Redirect to /dashboard if the user is authenticated
    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/')
    ) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}