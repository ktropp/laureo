import {NextRequest, NextResponse} from 'next/server'
import {decrypt} from 'lib/session'
import {cookies} from 'next/headers'
import {prisma} from 'lib/prisma'

// Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

export default async function middleware(req: NextRequest) {
    // Check if there exists at least one user in the database
    try {
        const userCount = await prisma.user.count()
        if (userCount === 0 && !req.nextUrl.pathname.startsWith('/install')) {
            return NextResponse.redirect(new URL('/install', req.nextUrl))
        }
    } catch (error) {
        console.error('Database connection error:', error)
        // In case of database connection error, we should still allow access to /install
        if (!req.nextUrl.pathname.startsWith('/install')) {
            return NextResponse.redirect(new URL('/install', req.nextUrl))
        }
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