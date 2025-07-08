'server-only'
import {SignJWT, jwtVerify} from 'jose'
import {SessionPayload} from 'lib/definitions'
import {cookies} from 'next/headers'
import {prisma} from "./prisma";

const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
    throw new Error('SESSION_SECRET environment variable is not set')
}
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
    // Convert Date to ISO string for proper serialization
    const serializedPayload = {
        userId: payload.userId,
        expiresAt: payload.expiresAt.toISOString()
    }
    return new SignJWT(serializedPayload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const {payload} = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session: ' + error)
    }
}

export async function createSession(userId: number, remember: boolean = false) {
    // Set different expiration times based on remember preference
    const expiresAt = new Date(Date.now() + (remember
            ? 30 * 24 * 60 * 60 * 1000  // 30 days for "remember me"
            : 24 * 60 * 60 * 1000       // 24 hours for regular session
    ))
    const session = await encrypt({userId, expiresAt})
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}

export async function currentUser() {
    // Decrypt the session from the cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    // Get user
    const currentUser = await prisma.user.findUnique({
        where: {
            id: session?.userId
        },
        select: {
            id: true,
            email: true,
            role: true,
            name: true,
            surname: true
        }
    })
    return currentUser
}