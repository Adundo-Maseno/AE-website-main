import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { prisma, isDatabaseConnected } from './db'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'agri-experience-cms-super-secret-key-2026-secure'
)

export const SESSION_COOKIE_NAME = 'ae_admin_session'
export const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@agri-experience.com'
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'AgriAdmin2026!'

const LOCAL_CREDENTIALS_PATH = path.join(process.cwd(), '.admin-credentials.json')

export interface AdminSessionPayload {
  email: string
  name: string
  role: 'superadmin' | 'editor'
}

export interface LocalAdminCredentials {
  email: string
  passwordHash: string
  name?: string
}

export function readLocalAdminCredentials(): LocalAdminCredentials | null {
  try {
    const raw = readFileSync(LOCAL_CREDENTIALS_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.email === 'string' && typeof parsed.passwordHash === 'string') {
      return parsed as LocalAdminCredentials
    }
  } catch {
    // File missing or unreadable
  }
  return null
}

export function writeLocalAdminCredentials(creds: LocalAdminCredentials): void {
  try {
    writeFileSync(LOCAL_CREDENTIALS_PATH, JSON.stringify(creds, null, 2), 'utf-8')
  } catch {
    // Ignore read-only filesystem errors
  }
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
 * Verifies credentials against database AdminUser records, then local credentials cache,
 * falling back to default environment credentials only if neither store has been initialized.
 */
export async function verifyAdminCredentials(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: AdminSessionPayload }> {
  const normalizedEmail = email.toLowerCase().trim()

  if (await isDatabaseConnected()) {
    try {
      const userCount = await prisma.adminUser.count()
      if (userCount > 0) {
        const user = await prisma.adminUser.findUnique({
          where: { email: normalizedEmail },
        })
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
          return {
            success: true,
            user: {
              email: user.email,
              name: user.name || 'Admin',
              role: 'superadmin',
            },
          }
        }
        return { success: false }
      }
    } catch {
      // Fall through to local/default store
    }
  }

  const localCreds = readLocalAdminCredentials()
  if (localCreds) {
    if (
      normalizedEmail === localCreds.email.toLowerCase().trim() &&
      (await bcrypt.compare(pass, localCreds.passwordHash))
    ) {
      return {
        success: true,
        user: {
          email: localCreds.email,
          name: localCreds.name || 'Agri Experience Admin',
          role: 'superadmin',
        },
      }
    }
    return { success: false }
  }

  // Fallback to default environment credentials
  if (
    normalizedEmail === DEFAULT_ADMIN_EMAIL.toLowerCase().trim() &&
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
