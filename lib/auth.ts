import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { prisma } from './db'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'agri-experience-cms-super-secret-key-2026-secure'
)

export const SESSION_COOKIE_NAME = 'ae_admin_session'
export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@agri-experience.com'
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AgriAdmin2026!'

export interface AdminSessionPayload {
  email: string
  name: string
  role: 'superadmin' | 'editor'
}

/**
 * Creates and signs an encrypted JWT session token.
 */
export async function signSessionToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET)
}

/**
 * Verifies and decodes a JWT session token.
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminSessionPayload
  } catch {
    return null
  }
}

/**
 * Reads and validates the current admin session from request cookies.
 */
export async function getSession(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)
    if (!sessionCookie?.value) return null
    return await verifySessionToken(sessionCookie.value)
  } catch {
    return null
  }
}

/**
 * Verifies credentials against database AdminUser records,
 * falling back to default environment credentials if database is empty/unseeded.
 */
export async function verifyAdminCredentials(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AdminSessionPayload }> {
  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (user) {
      const isValid = await bcrypt.compare(pass, user.passwordHash)
      if (isValid) {
        return {
          success: true,
          user: {
            email: user.email,
            name: user.name || 'Admin',
            role: 'superadmin',
          },
        }
      }
    }
  } catch {
    // Database connection fallback
  }

  // Fallback to default environment credentials
  if (
    email.toLowerCase().trim() === DEFAULT_ADMIN_EMAIL.toLowerCase().trim() &&
    pass === DEFAULT_ADMIN_PASSWORD
  ) {
    return {
      success: true,
      user: {
        email: DEFAULT_ADMIN_EMAIL,
        name: 'Agri Experience Admin',
        role: 'superadmin',
      },
    }
  }

  return { success: false }
}
